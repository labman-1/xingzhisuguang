# 行知溯光 · 人物志及成果展示

> 南京大学 2026 年暑期社会实践团队数字化成果交互站

**"循行知足迹，溯教育之光"** — 以陶行知先生生活教育理论为指引，走访南京六所学校，用镜头与文字记录当代教育一线对行知精神的传承与创新。

---

## 项目简介

本项目是南京大学"行知溯光"社会实践团队的人物志及成果展示静态网站。团队于 2026 年 6 月底至 7 月初，先后走访了南京市六所基层学校（从幼儿园到九年一贯制），围绕陶行知"生活即教育""社会即学校""教学做合一"三大核心理念展开实地调研。

网站以数字化交互形式展示六所学校的调研成果，包括校园环境影像、访谈视频及深度访谈文字记录。

### 六所调研学校

| 站次 | 日期 | 学校 | 访谈主题 |
|:---:|:---:|------|------|
| 第一站 | 6.29 | 五塘小学 | — |
| 第二站 | 7.1 | 燕子矶幼儿园 | 三力课程体系、开场白、困难和挑战、小先生制 |
| 第三站 | 7.2 | 晓庄小学 | — |
| 第四站 | 7.2 | 小市中心小学 | — |
| 第五站 | 7.3 | 南京晓庄实验学校 | — |
| 第六站 | 7.3 | 晓庄附属小学 | — |

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 18 |
| 构建工具 | Vite 5 |
| 样式方案 | Tailwind CSS v3（PostCSS 插件） |
| 字体 | Noto Sans SC（Google Fonts） |
| 路由 | 状态驱动 SPA（无外部路由依赖） |
| 部署 | GitHub Pages |

---

## 快速开始

```bash
# 1. 克隆仓库
git clone https://github.com/labman-1/xingzhisuguang.git
cd xingzhisuguang

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
# → 浏览器访问 http://localhost:5173/xingzhisuguang/
```

---

## 可用脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动 Vite 开发服务器（热更新） |
| `npm run build` | 生产构建，输出到 `dist/` |
| `npm run preview` | 本地预览生产构建 |
| `npm run deploy` | 构建并部署到 GitHub Pages（`gh-pages` 分支） |

---

## 项目结构

```
xingzhisuguang/
├── index.html                  # Vite 入口 HTML
├── package.json                # 项目配置与脚本
├── vite.config.js              # Vite 配置（base: '/xingzhisuguang/'）
├── tailwind.config.js          # Tailwind 配置（字体扩展）
├── postcss.config.js           # PostCSS 配置
├── .gitignore
├── public/
│   └── favicon.svg             # 网站图标
└── src/
    ├── main.jsx                # React DOM 挂载点
    ├── App.jsx                 # 根组件：状态驱动的视图路由
    ├── index.css               # 全局样式 + Tailwind 指令 + 字体导入
    ├── data/
    │   └── schools.js          # 六所学校静态数据源
    └── components/
        ├── Navbar.jsx          # 顶部导航栏（粘性定位 + 移动端适配）
        ├── Hero.jsx            # 首页头部：陶行知简介 + 三大理念
        ├── SchoolList.jsx      # 实践足迹卡片网格
        ├── SchoolCard.jsx      # 单张学校卡片（悬停微动效）
        ├── SchoolDetail.jsx    # 学校详情页容器
        ├── PhotoWall.jsx       # 校园环境照片墙（骨架屏占位）
        ├── VideoPlayer.jsx     # 访谈视频播放区（占位状态）
        ├── InterviewAccordion.jsx  # 访谈记录折叠面板
        ├── AboutPage.jsx       # 关于我们页面
        └── Footer.jsx          # 页脚
```

---

## 设计规范

### 色彩系统

| 角色 | Tailwind Class | 色值 | 使用场景 |
|------|---------------|------|------|
| 主色深 | `emerald-800` | `#065f46` | 导航栏背景、Hero 渐变 |
| 主色中 | `emerald-700` | `#047857` | Hero 渐变起始、标题 |
| 主色浅 | `emerald-100` | `#d1fae5` | 标签背景、高亮区域 |
| 强调色 | `amber-400/500` | `#fbbf24 / #f59e0b` | 导航激活态、CTA 元素 |
| 页面背景 | `slate-50` | `#f8fafc` | 全局背景 |
| 卡片背景 | `white` | `#ffffff` | 卡片、面板 |
| 正文 | `slate-800` | `#1e293b` | 主要文本 |
| 次要文本 | `slate-500/600` | `#64748b / #475569` | 描述、副标题 |
| 页脚 | `slate-900` | `#0f172a` | 页脚背景 |

### 字体

- **主字体**：Noto Sans SC（思源黑体简体中文），字重 300 / 400 / 500 / 700
- **加载方式**：Google Fonts CDN（`@import` 于 `index.css`）

---

## 数据维护指南

所有学校数据集中在 [src/data/schools.js](src/data/schools.js) 中维护。每所学校的数据结构如下：

```js
{
  id: 'yanziyou',           // 唯一标识（用于路由查找）
  name: '燕子矶幼儿园',       // 学校名称
  date: '7.1',              // 访问日期
  stage: '第二站',           // 站次标签
  logoPlaceholder: '燕',     // 校徽占位字（单字）
  intro: '...',             // 学校简介 / 调研概述
  photos: [],               // 照片 URL 数组（待补充）
  videos: {
    title: '...',           // 视频标题
    placeholder: '',        // 视频嵌入链接（B站/优酷 iframe URL，空字符串则显示占位）
  },
  interviews: [             // 访谈记录数组
    {
      id: 'yanziyou-shanli',
      topic: '三力课程体系',
      content: '访谈内容…（支持 \n 换行）',
    },
  ],
}
```

### 如何补充内容

1. **添加照片**：将图片上传至图床或放入 `public/` 目录，将 URL 填入对应学校的 `photos` 数组
2. **添加视频**：将 B站/优酷等平台的嵌入 iframe URL 填入 `videos.placeholder`
3. **补充访谈**：在对应学校的 `interviews` 数组中编辑 `content` 字段，支持 `\n` 换行
4. **添加新学校**：在 `schools` 数组中追加新对象即可，卡片和详情页会自动渲染

---

## 路由说明

本项目采用**状态驱动视图切换**（非 React Router），路由状态由 `App.jsx` 中的 `currentView` 和 `activeSchoolId` 管理：

- `currentView = 'home'` → 首页（Hero + 学校卡片列表）
- `currentView = 'detail'` → 学校详情页（根据 `activeSchoolId` 查找）
- `currentView = 'about'` → 关于我们

这种方案确保了 GitHub Pages 静态部署的零 404 兼容性，无需配置 SPA fallback。

---

## 部署

### 自动部署（GitHub Actions — 推荐）

> 待配置 `.github/workflows/deploy.yml`

### 手动部署

```bash
npm run deploy
```

该命令会执行 `vite build` 并将 `dist/` 目录推送到 `gh-pages` 分支。在 GitHub 仓库 Settings → Pages 中将 Source 设为 `gh-pages` 分支即可。

---

## 浏览器兼容性

支持所有现代浏览器（Chrome、Firefox、Safari、Edge 的最新两个大版本）。

---

## 团队

- **实践团队**：南京大学"行知溯光"暑期社会实践团队
- **开发**：南京大学工科试验班（线上 / 线下兼报方向）
- **指导教师**：（待补充）

---

## 许可证

本项目为南京大学学生社会实践成果展示用途，内容版权归"行知溯光"团队所有。

---

*"捧着一颗心来，不带半根草去。" —— 陶行知*
