/**
 * 批量处理照片：JPG/PNG → WebP，宽度 1600px，质量 80%
 *
 * 用法：
 *   node scripts/process-photos.mjs <源目录> <学校ID> [文件名前缀]
 *
 * 示例：
 *   node scripts/process-photos.mjs ~/Desktop/wutang-photos wutang campus
 *   → public/media/wutang/campus-01.webp, campus-02.webp, ...
 *
 *   node scripts/process-photos.mjs ~/Desktop/yanziyou yanziyou classroom
 *   → public/media/yanziyou/classroom-01.webp, classroom-02.webp, ...
 */

import { readdir, mkdir } from 'node:fs/promises';
import { extname, join, basename } from 'node:path';
import { existsSync } from 'node:fs';
import sharp from 'sharp';

const VALID_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.tiff', '.tif', '.bmp', '.gif']);
const TARGET_WIDTH = 1600;
const QUALITY = 80;

function usage() {
  console.log('用法: node scripts/process-photos.mjs <源目录> <学校ID> [文件名前缀]');
  console.log('');
  console.log('学校ID: wutang | yanziyou | xiaozhuang | xiaoshi | xiaozhuangshiyan | xiaozhuangfushu');
  console.log('文件名前缀 (可选，默认 "photo"): campus | classroom | activity | interview | ...');
  console.log('');
  console.log('示例:');
  console.log('  node scripts/process-photos.mjs ~/Desktop/wutang-photos wutang campus');
  console.log('  → public/media/wutang/campus-01.webp, campus-02.webp, ...');
}

async function main() {
  const sourceDir = process.argv[2];
  const schoolId = process.argv[3];
  const prefix = process.argv[4] || 'photo';

  if (!sourceDir || !schoolId) {
    usage();
    process.exit(1);
  }

  const validIds = ['wutang', 'yanziyou', 'xiaozhuang', 'xiaoshi', 'xiaozhuangshiyan', 'xiaozhuangfushu'];
  if (!validIds.includes(schoolId)) {
    console.error(`❌ 无效的学校ID: ${schoolId}`);
    console.error(`   有效值: ${validIds.join(', ')}`);
    process.exit(1);
  }

  if (!existsSync(sourceDir)) {
    console.error(`❌ 源目录不存在: ${sourceDir}`);
    process.exit(1);
  }

  // 确保目标目录存在
  const targetDir = join(import.meta.dirname, '..', 'public', 'media', schoolId);
  await mkdir(targetDir, { recursive: true });

  // 读取源目录中的所有图片文件
  const allFiles = await readdir(sourceDir);
  const imageFiles = allFiles
    .filter((f) => VALID_EXTENSIONS.has(extname(f).toLowerCase()))
    .sort();

  if (imageFiles.length === 0) {
    console.error(`❌ 源目录中没有找到图片文件 (支持: ${[...VALID_EXTENSIONS].join(', ')})`);
    process.exit(1);
  }

  console.log(`📸 找到 ${imageFiles.length} 张图片`);
  console.log(`   源目录: ${sourceDir}`);
  console.log(`   目标目录: ${targetDir}`);
  console.log('');

  let success = 0;
  let failed = 0;

  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    const inputPath = join(sourceDir, file);
    const num = String(i + 1).padStart(2, '0');
    const outputName = `${prefix}-${num}.webp`;
    const outputPath = join(targetDir, outputName);

    process.stdout.write(`  [${i + 1}/${imageFiles.length}] ${file} → ${outputName} ... `);

    try {
      const metadata = await sharp(inputPath).metadata();
      const resizeOptions = metadata.width > TARGET_WIDTH
        ? { width: TARGET_WIDTH, withoutEnlargement: true }
        : { withoutEnlargement: true };

      await sharp(inputPath)
        .resize(resizeOptions)
        .webp({ quality: QUALITY })
        .toFile(outputPath);

      const outputStats = await sharp(outputPath).metadata();
      const origKB = (metadata.size ?? 0) / 1024;
      const outKB = (outputStats.size ?? 0) / 1024;
      const ratio = origKB > 0 ? Math.round((1 - outKB / origKB) * 100) : 0;

      console.log(`✅ ${outputStats.width}×${outputStats.height}  ${outKB.toFixed(0)}KB  (减小 ${ratio}%)`);
      success++;
    } catch (err) {
      console.log(`❌ ${err.message}`);
      failed++;
    }
  }

  console.log('');
  console.log(`完成: ${success} 张成功${failed > 0 ? `, ${failed} 张失败` : ''}`);
  console.log(`输出目录: ${targetDir}`);
}

main().catch((err) => {
  console.error('致命错误:', err.message);
  process.exit(1);
});
