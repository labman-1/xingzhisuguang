# 媒体目录

每个实践站点使用与 `practiceSites[].id` 一致的目录名，并按用途分为：

- `photos/`：校园、合影和访谈现场原图；
- `backgrounds/`：专门制作的横幅或背景图；
- `thumbnails/`：与原图对应的缩略图。

成果展示媒体统一放在 `resources/presentations/<presentation-id>/`：

- `preview.pdf`：点击成果卡片后加载的站内预览文件；
- `cover.webp`：从 PDF 第一页生成的轻量封面，列表页只加载该文件。

`presentation-id` 使用小写英文、数字和连字符。不要在该目录中放入原始 PPT。

页面不会自动扫描本目录。新增文件后，仍需在 `src/content/index.js` 中显式配置路径、替代文本、图注和版权信息。

原始采访总结稿不属于公开媒体，统一存放在 `content/interviews/<site-id>/`，不要放入 `public/`。
