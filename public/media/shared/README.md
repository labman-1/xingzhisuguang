# 共享媒体占位约定

本目录只保存全站共享且已完成事实、版权、肖像与隐私核验的媒体。当前没有提交正式素材。

- 首页主视觉路径在 `src/content/index.js` 的 `projectProfile.heroImage` 配置，组件内不得写死路径。
- 优先提供 AVIF 与 WebP；建议宽度为 `768w`、`1280w`、`1920w`，并保留一个 WebP `src` 回退。
- `sources`、`srcSet`、`sizes`、`focalPoint`、`alt`、`caption`、`credit`、`sourceUrl` 均由内容模型填写。
- 文件名使用小写英文、数字和连字符，例如 `tao-xingzhi-hero-1280.avif`。
- 不提交未经授权的历史照片、人物肖像、未成年人影像、临时导出文件或伪造占位图。

示例配置仅用于说明字段，不代表素材已经存在：

```js
{
  src: 'media/shared/tao-xingzhi-hero-1920.webp',
  srcSet: [
    'media/shared/tao-xingzhi-hero-768.webp 768w',
    'media/shared/tao-xingzhi-hero-1280.webp 1280w',
    'media/shared/tao-xingzhi-hero-1920.webp 1920w',
  ],
  sources: [
    {
      type: 'image/avif',
      srcSet: [
        'media/shared/tao-xingzhi-hero-768.avif 768w',
        'media/shared/tao-xingzhi-hero-1280.avif 1280w',
        'media/shared/tao-xingzhi-hero-1920.avif 1920w',
      ],
    },
  ],
  sizes: '100vw',
  focalPoint: '50% 32%',
  alt: '经核验的具体画面描述',
  caption: '准确图注',
  credit: '摄影者或版权方',
  sourceUrl: 'https://可信来源页面',
}
```
