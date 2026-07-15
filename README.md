# 行知溯光

南京大学“行知溯光”暑期社会实践团队的数字成果站。项目围绕陶行知教育思想，集中呈现人物志、五所学校与一所幼儿园的实践足迹、晓庄教育文脉、访谈影像与成果资源。

> 网站框架已经覆盖图文、视频、长访谈、专题页面、内容发布状态、自动校验和 GitHub Pages 部署。照片、成片、逐字稿等内容仍需在完成事实核对、授权与隐私检查后逐步发布。

## 功能范围

- 首页人物志：陶行知人物介绍、教育理念与实践入口。
- 实践足迹：六个教育实践点的卡片、走访日程和独立详情页。
- 学校详情：简介、教育理念标签、影像、视频和完整访谈记录。
- 行知文脉：书院及相关教育实践的专题内容。
- 成果资源：文章、视频、文档等成果的统一索引与学校关联。
- 关于我们：项目目标、团队分工和由内容数据派生的实践日程。
- 内容治理：草稿/发布状态、跨集合引用检查、重复 ID 和必填字段校验。
- 工程保障：ESLint、Vitest、内容校验、生产构建、CI 与 Pages 自动部署。

## 技术栈

| 类别 | 方案 |
| --- | --- |
| UI | React 18、lucide-react |
| 路由 | React Router 7 + `HashRouter` |
| 构建 | Vite 8 |
| 样式 | Tailwind CSS 3 + PostCSS |
| 测试 | Vitest 4、Testing Library、jest-dom、jsdom |
| 质量 | ESLint 10 flat config、Node 内容校验脚本 |
| 部署 | GitHub Actions + GitHub Pages |

项目统一使用 Node.js 22.13 或更高版本，版本入口见 `.nvmrc` 与 `package.json#engines`。

## 快速开始

```powershell
git clone https://github.com/labman-1/xingzhisuguang.git
cd xingzhisuguang
npm ci
npm run dev
```

开发地址以 Vite 终端输出为准。当前仓库部署子路径为 `/xingzhisuguang/`。

## 可用命令

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动本地开发服务器 |
| `npm run build` | 先校验内容，再生成 `dist/` 生产产物 |
| `npm run preview` | 本地预览生产产物 |
| `npm run lint` | 运行 ESLint，警告同样视为失败 |
| `npm run validate:content` | 校验内容结构、唯一性与跨集合引用 |
| `npm run test` | 以监听模式运行 Vitest |
| `npm run test:run` | 单次运行全部测试 |
| `npm run check` | 依次运行 lint、内容校验和测试 |
| `npm run deploy` | 完整检查、构建并手动发布到 `gh-pages` 分支 |

提交前至少执行：

```powershell
npm run check
npm run build
```

## 路由

网站使用 `HashRouter`，避免 GitHub Pages 在直接刷新深层 SPA 地址时返回 404。应用内路由保持清晰的资源语义，线上地址会带 `#/`：

| 应用路由 | GitHub Pages 示例 | 页面 |
| --- | --- | --- |
| `/` | `/xingzhisuguang/#/` | 首页 |
| `/sites/:siteId` | `/xingzhisuguang/#/sites/wutang` | 学校详情 |
| `/heritage` | `/xingzhisuguang/#/heritage` | 行知文脉 |
| `/resources` | `/xingzhisuguang/#/resources` | 成果资源 |
| `/about` | `/xingzhisuguang/#/about` | 关于我们 |
| `*` | — | 站内 404 |

`App.jsx` 只声明路由和全局布局，`main.jsx` 提供 `HashRouter`。测试时可用 `MemoryRouter` 注入任意初始路由。

## 项目结构

```text
xingzhisuguang/
├─ .github/workflows/       # CI 与 GitHub Pages 发布
├─ public/                  # favicon、robots.txt、Web App Manifest
├─ scripts/
│  └─ validate-content.mjs  # 可在 Node/CI 中直接运行的内容校验
├─ src/
│  ├─ components/           # 导航、卡片、媒体、访谈等可复用组件
│  ├─ content/              # 规范化内容集合、查询函数和校验器
│  ├─ hooks/                # 路由呈现等跨页面行为
│  ├─ pages/                # 路由级页面
│  ├─ App.jsx               # 路由表与全局布局
│  ├─ main.jsx              # React 入口与 HashRouter
│  └─ index.css             # Tailwind 与全局样式
├─ tests/                   # 内容、路由和关键组件测试
├─ eslint.config.js         # ESLint flat config
├─ index.html               # SEO/分享基础 meta
└─ vite.config.js           # Vite 与 Pages base 配置
```

## 内容模型

所有页面从 `src/content/index.js` 读取内容，不在组件中复制学校、日程或资源数据。主要导出如下：

| 导出 | 用途 |
| --- | --- |
| `practiceSites` | 六个教育实践点及详情内容 |
| `taoXingzhiProfiles` | 陶行知人物志条目 |
| `educationalIdeas` | 三项核心教育理念 |
| `academyHeritageEntries` | 书院及行知文脉专题 |
| `achievementResources` | 文章、视频、文档等成果资源 |
| `projectProfile` | 项目与团队公共信息 |
| `PUBLISH_STATUS` | 统一发布状态常量 |

页面应优先使用查询函数，而不是自行 `filter` 或 `find`：

- `getSiteById(siteId)`
- `getVisiblePracticeSites()`
- `getVisitSchedule()`
- `getVisibleProfiles()`
- `getVisibleEducationalIdeas()`
- `getVisibleHeritageEntries()`
- `getVisibleResources()`
- `getResourcesBySiteId(siteId)`
- `getResourceById(resourceId)`
- `getHeritageEntryById(entryId)`

`validateContentCollections()` 返回问题数组；`assertValidContent()` 在发现错误时抛出异常。CI 通过 `scripts/validate-content.mjs` 调用同一套规则，因此本地与线上检查口径一致。

### 媒体与访谈建议格式

照片建议使用结构化对象，务必提供准确的替代文本：

```js
{
  id: 'site-id-campus-01',
  src: 'media/site-id/campus.webp', // 相对部署根目录，兼容 GitHub Pages 子路径
  alt: '学生在校园劳动园中观察植物',
  caption: '校园劳动课程现场',
  credit: '实践团队',
  width: 1600,
  height: 1200,
  publishStatus: PUBLISH_STATUS.PUBLISHED,
}
```

视频支持三种发布方式：

```js
// 本地或 CDN 文件
{ id: 'interview-file', type: 'file', src: 'media/interview.mp4', title: '教师访谈', subtitles: [], publishStatus: PUBLISH_STATUS.PUBLISHED }

// 经审核允许嵌入的平台播放器
{ id: 'interview-embed', type: 'embed', src: 'https://player.example.com/...', title: '教师访谈', publishStatus: PUBLISH_STATUS.PUBLISHED }

// 跳转至外部发布页
{ id: 'interview-external', type: 'external', src: 'https://example.com/watch/...', title: '教师访谈', publishStatus: PUBLISH_STATUS.PUBLISHED }
```

访谈条目使用稳定 `id`、清晰 `topic`、完整 `content` 和明确的 `publishStatus`。折叠面板仅改变显示状态，不截断长文内容。

### 内容发布流程

1. 核对学校名称、日期、人物身份、引文和事实。
2. 确认照片、音视频、未成年人信息与第三方平台链接具备发布授权。
3. 在 `src/content/` 更新条目；未完成内容保持草稿状态，不用虚构文字填满页面。
4. 为照片补充具体 `alt`，为视频准备字幕或文字稿，为外链补充清晰标题。
5. 运行 `npm run validate:content` 和 `npm run test:run`。
6. 预览桌面端与移动端后再改为发布状态。

## 测试与持续集成

当前测试骨架覆盖：

- 内容集合校验、六个实践点 ID、查询函数和资源引用。
- 首页、学校详情、专题页、关于页与站内 404 路由。
- 导航菜单状态、学校卡片链接、照片元数据、三类视频和访谈折叠面板。

`.github/workflows/ci.yml` 在 push 与 pull request 时执行 `npm ci`、`npm run check` 和生产构建。`.github/workflows/deploy-pages.yml` 只在 `main` 推送或手动触发时上传 `dist/` 并部署到 `github-pages` 环境。

首次启用自动发布时，在仓库 **Settings → Pages → Build and deployment** 中将 Source 设为 **GitHub Actions**。

## SEO、分享与部署地址

`index.html` 已包含 description、canonical、Open Graph、Twitter Card、主题色和 manifest。当前没有经过团队确认的分享封面，因此没有设置 `og:image`；获得授权并生成合适尺寸的正式图片后再补充。

当前采用 `HashRouter`，应用内链接可以刷新和分享，但微信等不执行 JavaScript 的爬虫只能读取 `index.html` 中的站点级分享信息，无法为每个实践点生成不同的标题与摘要。若后续需要逐页分享卡片，应增加静态预渲染或迁移到支持服务端渲染的部署方案。

如果仓库名或部署域名变化，需要同步更新：

- `vite.config.js` 中的 `base`
- `index.html` 中的 canonical 与 `og:url`
- `public/site.webmanifest` 中的 `start_url` 与 `scope`

## 内容与版权

本项目用于南京大学学生社会实践成果展示。人物肖像、采访、学校材料、第三方文章与音视频的版权和授权状态应在发布前单独核验；仓库中不得提交账号凭据、访问令牌、内部原始资料或未经脱敏的个人信息。
