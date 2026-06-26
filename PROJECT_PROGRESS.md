# Life Notes 项目对话与需求进度总结

> 项目仓库：<https://github.com/zhoujie2001/life-notes>  
> 项目名称：`life-notes`  
> 当前定位：个人展示、心得学习、日常图片视频记录、音乐空间的个人博客网站  
> 当前阶段：核心内容系统与基础视觉已成型，数据库蓝图已完成，Vercel 部署问题暂时搁置

---

## 1. 项目起点

本项目的初始目标是：

通过从 0 开始在 GitHub 上创建一个个人博客网站，系统学习和实践现代 AI 辅助开发、前后端工程、内容管理、音乐播放器、部署与后续数据库能力。

最初提出的核心背景包括：

- 通过真实项目理解和运用前沿 AI 功能与应用
- 在 GitHub 上创建并持续迭代一个个人博客
- 博客需要具备前端、后端和基础博客功能
- 需要具备音乐播放能力
- 更多功能在持续探讨中逐步确定

---

## 2. 产品定位演进

### 2.1 站点名称与仓库

最终确定：

```text
仓库名：life-notes
GitHub 地址：https://github.com/zhoujie2001/life-notes
```

命名含义：

- `life`：生活、日常、成长、个人表达
- `notes`：学习笔记、心得、记录、沉淀

### 2.2 视觉风格

确定风格：

```text
极简、浅绿色、白色、生命力、活力、留白、通透
```

基础颜色体系：

```css
--bg: #FAFCFA;
--surface: #FFFFFF;
--primary: #A8D5BA;
--primary-soft: #CFEAD6;
--text: #24332A;
--text-muted: #5E7465;
--border: #E4EFE7;
```

### 2.3 内容定位

最终确定内容方向：

- 个人展示
- 心得记录
- 学习记录
- 日常记录
- 图片与视频记录
- 音乐空间

### 2.4 音乐定位

最终确定音乐方向：

- 全站背景 BGM
- 独立播放器专区
- 默认 BGM：森水垚《海边的曼彻斯特》

---

## 3. 技术路线决策

### 3.1 初始推荐技术栈

项目采用：

```text
Next.js + TypeScript + Tailwind CSS + MDX
```

后续数据库方向：

```text
PostgreSQL + Prisma
```

部署方向：

- GitHub 仓库管理源码
- GitHub Pages 展示静态主页
- Vercel 作为 Next.js 部署目标，但目前暂时搁置

### 3.2 内容管理策略

当前阶段采用文件驱动内容管理：

```text
Blog: content/posts/*.mdx
Moments: content/moments/*.mdx
Music: content/music.json
```

暂不立即将内容迁移到数据库。

原因：

- 便于 Git 版本管理
- 易于理解和维护
- 更适合早期学习与迭代
- 避免过早引入数据库、鉴权、后台管理等复杂度

---

## 4. 已完成的主要阶段

## 4.1 阶段一：启动方案与项目蓝图

已完成内容：

- 明确项目目标
- 明确 MVP 范围
- 明确技术栈
- 明确页面结构
- 明确音乐模块方向
- 明确迭代节奏

产出文档曾包括：

- `personal_blog_kickoff.md`
- `personal_blog_blueprint_v1.md`
- `personal_blog_tasks_v1.md`
- `life-notes_structure_v1.md`
- `life-notes_init_commands_v1.md`

这些早期文档用于确定项目基线。

---

## 4.2 阶段二：首版代码骨架

已生成并推送 Next.js 首版代码骨架。

核心结构：

```text
app/
components/
content/
lib/
public/
types/
```

首版页面包括：

```text
/              首页
/blog          博客列表页
/blog/[slug]   博客详情页
/moments       日常记录页
/moments/[slug] 日常记录详情页
/music         音乐专区页
/about         关于页
```

---

## 4.3 阶段三：MDX Blog 内容系统

已完成：

- `types/post.ts`
- `lib/posts.ts`
- `components/blog/post-card.tsx`
- `components/blog/tag-chip.tsx`
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`

能力：

- 扫描 `content/posts/*.mdx`
- 解析 frontmatter
- 自动生成 slug
- 计算阅读时间
- 按发布时间排序
- 渲染博客列表
- 渲染文章详情
- 支持标签、分类、摘要、发布时间

当前示例文章：

```text
content/posts/welcome-to-life-notes.mdx
content/posts/first-learning-note.mdx
```

---

## 4.4 阶段四：Moments 日常记录内容系统

已完成：

- `types/moment.ts`
- `lib/moments.ts`
- `components/moments/media-gallery.tsx`
- `components/moments/moment-card.tsx`
- `components/moments/moment-timeline.tsx`
- `app/moments/page.tsx`
- `app/moments/[slug]/page.tsx`

能力：

- 扫描 `content/moments/*.mdx`
- 解析 frontmatter
- 支持图片媒体
- 支持视频媒体
- 支持心情、地点、标签
- 时间线展示日常记录
- 单条 Moment 详情页

当前示例记录：

```text
content/moments/green-walk.mdx
content/moments/first-weekend.mdx
```

---

## 4.5 阶段五：音乐播放器系统

已完成全局音乐系统优化。

新增/更新：

```text
components/music/music-player-provider.tsx
components/music/global-audio-player.tsx
components/music/music-player-panel.tsx
components/music/playlist.tsx
app/music/page.tsx
content/music.json
```

能力：

- 全局共享播放状态
- 播放 / 暂停
- 上一首 / 下一首
- 播放进度条
- 音量控制
- 播放列表
- 独立音乐页
- 底部全局播放器
- 页面切换时保持播放器状态

当前音乐配置：

```text
森水垚《海边的曼彻斯特》
林间留白，占位曲目
晨光片刻，占位曲目
```

需要后续补充真实媒体文件：

```text
public/music/haibian-de-manchesite.mp3
public/images/music/haibian-de-manchesite.jpg
public/music/forest-placeholder.mp3
public/music/morning-placeholder.mp3
```

---

## 4.6 阶段六：首页内容聚合

已完成首页从静态骨架到真实内容聚合的升级。

首页现在读取：

```text
Blog: getAllPosts().slice(0, 3)
Moments: getAllMoments().slice(0, 2)
Music: getDefaultTrack() + getTracks()
```

首页模块包括：

1. Hero 主视觉区
2. 当前站点状态卡片
3. Blog / Moments / Music 三个入口卡片
4. 最新心得与学习
5. 近期日常记录
6. 默认音乐与播放列表入口

---

## 4.7 阶段七：视觉统一优化

已完成首页、博客页、记录页、音乐页的 UI 统一。

新增组件：

```text
components/ui/page-hero.tsx
components/ui/section-heading.tsx
components/ui/empty-state.tsx
```

优化点：

- 统一页面 Hero 区
- 统一区块标题
- 统一空状态
- 统一浅绿色视觉语言
- 统一圆角、边框、阴影、留白
- 移动端点击高亮优化

---

## 4.8 阶段八：GitHub Pages 静态主页

目标：让 `https://zhoujie2001.github.io/life-notes/` 可以访问到主页。

过程：

1. 先尝试通过 `github-pages/` 目录和 GitHub Actions 发布
2. 后发现 GitHub Pages 实际访问并非预期 index.html
3. 修复为在仓库根目录提供 `index.html`
4. 添加 `.nojekyll`
5. 删除可能干扰 Vercel 根目录识别的 `github-pages/` 目录和 Pages Actions

当前 GitHub Pages 建议配置：

```text
Deploy from a branch → main → /root
```

当前保留：

```text
index.html
.nojekyll
```

---

## 4.9 阶段九：Vercel 部署排查

Vercel 部署出现过错误：

```text
未检测到 Next.js 版本。请确保 package.json 文件中的 dependencies 或 devDependencies 中包含 next。
同时，请检查您的根目录设置是否与 package.json 文件的目录一致。
```

已做的修复：

1. 新增 `.eslintrc.json`
2. 新增 `next.config.js`
3. 新增 `package-lock.json`
4. 固定 Node 版本为 `20.x`
5. 调整 `vercel.json`
6. 将 `installCommand` 改为 `npm ci`
7. 使用公网 npm registry 重新生成 lockfile
8. 固定 Next 相关版本
9. 删除可能让 Vercel 误判根目录的 `github-pages/` 子目录
10. 新增 `VERCEL_DEPLOYMENT.md`

当前判断：

- 根目录 `package.json` 已包含 `next`
- 如果仍报未检测到 Next.js，优先检查 Vercel Root Directory 是否设置为仓库根目录

当前 Vercel 暂时搁置，后续可继续排查。

---

## 4.10 阶段十：数据库设计蓝图

已创建并推送：

```text
DATABASE_DESIGN.md
```

核心策略：

```text
先设计数据库模型 → 保持文件驱动内容系统 → 从低风险功能开始接入数据库
```

推荐数据库技术路线：

```text
PostgreSQL + Prisma
```

推荐数据库平台：

```text
Supabase 或 Neon
```

已规划模型：

### 内容模型

- Post
- Moment
- Track
- Media
- Category
- Tag
- PostTag
- MomentTag

### 互动与统计模型

- ViewEvent
- ViewCounter
- Comment
- Reaction

### 用户与后台模型

- User
- Account
- Session
- VerificationToken

### AI 功能预留模型

- AiSummary
- AiConversation
- AiMessage

推荐首个数据库功能：

```text
阅读量统计：ViewEvent + ViewCounter
```

---

## 5. 当前仓库关键文件

```text
app/
  page.tsx
  layout.tsx
  globals.css
  blog/page.tsx
  blog/[slug]/page.tsx
  moments/page.tsx
  moments/[slug]/page.tsx
  music/page.tsx
  about/page.tsx

components/
  blog/
  moments/
  music/
  layout/
  ui/

content/
  posts/
  moments/
  music.json

lib/
  posts.ts
  moments.ts
  music.ts
  site-config.ts
  utils.ts

types/
  post.ts
  moment.ts
  music.ts

DATABASE_DESIGN.md
VERCEL_DEPLOYMENT.md
README.md
index.html
.nojekyll
package.json
package-lock.json
vercel.json
```

---

## 6. 当前功能状态

| 模块 | 状态 | 说明 |
|---|---|---|
| GitHub 仓库 | 已完成 | 已多次推送，后续默认每次修改后 push |
| Next.js 项目骨架 | 已完成 | App Router + TypeScript + Tailwind |
| 首页 | 已完成第一版 | 已聚合 Blog / Moments / Music |
| Blog 系统 | 已完成第一版 | MDX 文件驱动 |
| Moments 系统 | 已完成第一版 | MDX + 图片/视频字段 |
| Music 系统 | 已完成第一版 | 全局播放器 + 独立音乐页 |
| 视觉统一 | 已完成第一版 | PageHero / SectionHeading / EmptyState |
| GitHub Pages | 已修复 | 根目录 index.html + .nojekyll |
| Vercel | 暂时搁置 | 已做多轮修复，仍需平台侧确认 Root Directory |
| 数据库设计 | 已完成蓝图 | 暂未实际接入数据库 |

---

## 7. 重要提交记录

```text
fed4d57 docs: add database design blueprint
479c9cc fix: clarify vercel root deployment path
d3b4ced fix: use public npm registry lockfile for deployment
4718d9d fix: stabilize nextjs build configuration
abaaa2f fix: expose github pages landing at repository root
badb19e style: unify core page visual details
797341a feat: aggregate latest content on homepage
5d8f7eb chore: configure github pages landing deployment
f6d3874 feat: enhance shared music player
590262b chore: add vercel deployment config
e7897b5 feat: scaffold life-notes blog site
```

---

## 8. 关键决策记录

### 8.1 内容暂不入库

当前 Blog、Moments、Music 继续文件驱动。

原因：

- 适合早期迭代
- 易于 Git 管理
- 降低复杂度
- 避免过早引入后台系统

### 8.2 数据库先从统计开始

首个数据库功能建议是：

```text
阅读量统计
```

而不是评论或后台管理。

原因：

- 风险低
- 不影响当前内容系统
- 可以验证数据库连接和部署环境变量

### 8.3 音乐系统采用全局 Provider

音乐播放器使用：

```text
MusicPlayerProvider
```

统一管理全站播放状态。

### 8.4 GitHub Pages 与 Next.js 分离

当前 GitHub Pages 只作为静态主页展示。

完整 Next.js 应用仍以后续 Vercel 部署为目标。

---

## 9. 当前待办与下一步建议

### 9.1 推荐下一步

建议进入：

```text
阅读量统计方案设计与实现
```

具体步骤：

1. 选择数据库平台：Supabase 或 Neon
2. 引入 Prisma
3. 创建 `ViewEvent` 与 `ViewCounter` 模型
4. 新增 API Route 记录访问
5. 在 Post / Moment 页面展示阅读量
6. 配置 `.env` 与线上环境变量

### 9.2 其他可选方向

也可以先做：

- 增加真实图片、视频、音乐资源
- 优化移动端导航
- 增加深色 / 浅色主题切换
- 继续修复 Vercel 部署
- 增加评论系统设计
- 增加站内搜索
- 增加 AI 摘要或问答能力

---

## 10. 当前项目阶段总结

Life Notes 已经从概念阶段进入可持续迭代阶段。

当前已经具备：

- 清晰的产品定位
- 明确的视觉风格
- 可运行的 Next.js 项目结构
- Blog 内容系统
- Moments 内容系统
- Music 播放系统
- 首页内容聚合
- GitHub Pages 静态入口
- 数据库设计蓝图

后续重点应从“页面和内容骨架”转向：

```text
数据能力、部署稳定性、真实内容填充、交互能力、AI 增强
```
