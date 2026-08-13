import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const projectRoot = join(import.meta.dirname, '..');
const interviewsRoot = join(projectRoot, 'content', 'interviews');
const outputPath = join(projectRoot, 'src', 'content', 'interviewArticles.js');

function parseFrontmatter(source, relativePath) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) throw new Error(`采访文章缺少 frontmatter：${relativePath}`);

  const metadata = {};
  match[1].split(/\r?\n/).forEach((line) => {
    const separator = line.indexOf(':');
    if (separator < 0) return;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    if (key) metadata[key] = value;
  });

  return { metadata, body: source.slice(match[0].length).trim() };
}

function parseArticle(source, relativePath) {
  const { metadata, body } = parseFrontmatter(source, relativePath);
  const lines = body.split(/\r?\n/);
  const lead = [];
  const sections = [];
  let closingQuote = '';
  let currentSection = null;
  let paragraphLines = [];

  const flushParagraph = () => {
    const paragraph = paragraphLines.join(' ').trim();
    paragraphLines = [];
    if (!paragraph) return;
    if (currentSection) currentSection.paragraphs.push(paragraph);
    else lead.push(paragraph);
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      return;
    }
    if (line.startsWith('# ')) return;
    if (line.startsWith('## ')) {
      flushParagraph();
      currentSection = { title: line.slice(3).trim(), paragraphs: [] };
      sections.push(currentSection);
      return;
    }
    if (line.startsWith('> ')) {
      flushParagraph();
      closingQuote = line.slice(2).trim();
      return;
    }
    paragraphLines.push(line);
  });
  flushParagraph();

  const siteId = metadata.siteId;
  if (!siteId || !metadata.title || lead.length === 0 || sections.length === 0) {
    throw new Error(`采访文章字段或正文不完整：${relativePath}`);
  }
  if (metadata.privacy !== 'anonymized') {
    throw new Error(`采访发布稿必须标记为 anonymized：${relativePath}`);
  }

  return {
    id: `${siteId}-interview-article`,
    topic: metadata.title,
    title: metadata.title,
    date: metadata.date,
    location: metadata.location,
    format: metadata.format || '采访记录',
    privacy: metadata.privacy,
    lead,
    sections,
    closingQuote,
    publishStatus: 'published',
  };
}

async function main() {
  const entries = await readdir(interviewsRoot, { withFileTypes: true });
  const siteDirectories = entries.filter((entry) => entry.isDirectory()).sort((a, b) =>
    a.name.localeCompare(b.name, 'en'),
  );
  const articles = {};

  for (const directory of siteDirectories) {
    const relativePath = `content/interviews/${directory.name}/interview-article.md`;
    const source = await readFile(join(interviewsRoot, directory.name, 'interview-article.md'), 'utf8');
    const article = parseArticle(source, relativePath);
    if (article.id !== `${directory.name}-interview-article`) {
      throw new Error(`siteId 与目录名不一致：${relativePath}`);
    }
    if (articles[directory.name]) throw new Error(`采访站点重复：${directory.name}`);
    articles[directory.name] = article;
  }

  const output = `// 此文件由 scripts/sync-interviews.mjs 根据 Markdown 发布稿生成，请勿直接编辑。\n\n` +
    `export const interviewArticlesBySiteId = Object.freeze(${JSON.stringify(articles, null, 2)});\n\n` +
    `export function getInterviewArticle(siteId) {\n` +
    `  const article = interviewArticlesBySiteId[siteId];\n` +
    `  if (!article) throw new Error(\`未找到采访文章：\${siteId}\`);\n` +
    `  return article;\n` +
    `}\n`;

  await writeFile(outputPath, output, 'utf8');
  console.log(`Interview articles synced (${Object.keys(articles).length} sites).`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
