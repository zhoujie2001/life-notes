# Life Notes 数据库设计蓝图

## 1. 当前结论

当前阶段进入数据库设计是合适的，但暂不建议立即把 Blog、Moments、Music 全部迁移到数据库。

推荐策略：

```text
先完成数据库模型设计 → 保持当前文件驱动内容系统 → 从低风险功能开始接入数据库
```

当前内容管理方式仍然保留：

| 内容 | 当前方式 | 是否立即迁移数据库 | 说明 |
|---|---|---:|---|
| Blog 文章 | `content/posts/*.mdx` | 否 | 适合 Git 版本管理，便于写作与回溯 |
| Moments 日常 | `content/moments/*.mdx` | 否 | 当前内容量小，文件驱动足够轻量 |
| Music 列表 | `content/music.json` | 否 | 配置型数据，暂不需要后台管理 |
| 静态页面 | TSX / HTML | 否 | 属于代码与页面结构 |

## 2. 数据库目标

数据库主要用于承载文件系统不擅长处理的数据：

1. 互动数据：评论、点赞、收藏、反馈
2. 统计数据：阅读量、访问事件、播放次数
3. 用户数据：登录用户、角色、权限
4. 后台数据：草稿、审核、发布记录
5. AI 数据：问答历史、摘要缓存、语义索引

## 3. 推荐技术路线

建议技术组合：

```text
PostgreSQL + Prisma
```

推荐原因：

- PostgreSQL 稳定、通用、适合长期维护
- Prisma 与 TypeScript / Next.js 结合自然
- Neon、Supabase、Vercel Postgres 等平台都支持 PostgreSQL
- 便于后续扩展评论、统计、AI、后台管理等功能

推荐优先级：

| 方案 | 适合场景 | 建议 |
|---|---|---|
| Supabase PostgreSQL | 学习数据库、可视化管理、未来可能加鉴权 | 推荐 |
| Neon PostgreSQL | 轻量、Serverless、Vercel 生态友好 | 推荐 |
| Vercel Postgres | 与 Vercel 集成 | 可选 |
| SQLite | 本地学习 | 不推荐作为线上主库 |

## 4. 数据库接入阶段规划

### 阶段 A：数据库设计阶段

目标：只设计，不立即接入生产功能。

产物：

- `DATABASE_DESIGN.md`
- 初版数据模型
- 接入顺序
- 数据边界说明

### 阶段 B：阅读量 / 访问统计

优先接入：

```text
ViewEvent / ViewCounter
```

原因：

- 不影响当前 MDX 内容系统
- 不需要用户登录
- 可以验证数据库连接、API Route、环境变量、部署链路
- 是后续数据分析与内容优化的基础

### 阶段 C：评论系统

接入：

```text
Comment
```

能力：

- 访客评论
- 审核状态
- 反垃圾策略
- 针对 Post / Moment 的评论列表

### 阶段 D：互动系统

接入：

```text
Reaction / Favorite
```

能力：

- 点赞
- 收藏
- 喜欢某首音乐
- 访客轻互动

### 阶段 E：用户与后台管理

接入：

```text
User / Account / Session
```

能力：

- 站主登录
- 管理后台
- 草稿管理
- 内容发布
- 评论审核

### 阶段 F：内容全面数据库化

当需要后台发布与在线编辑时，再考虑迁移：

```text
Post / Moment / Track
```

在此之前，MDX / JSON 仍是更轻量的内容管理方式。

## 5. 初版实体模型

## 5.1 Post

用于未来数据库化博客文章。

```text
Post
- id: string
- slug: string unique
- title: string
- summary: string
- content: text
- coverImage: string optional
- categoryId: string optional
- status: draft / published / archived
- publishedAt: datetime optional
- updatedAt: datetime
- readingTime: int optional
- isFeatured: boolean
```

当前阶段：暂不入库，继续使用 MDX。

## 5.2 Moment

用于未来数据库化日常记录。

```text
Moment
- id: string
- slug: string unique
- title: string
- summary: string optional
- content: text
- mood: string optional
- location: string optional
- status: draft / published / archived
- createdAt: datetime
- updatedAt: datetime
```

当前阶段：暂不入库，继续使用 MDX。

## 5.3 Track

用于未来数据库化音乐曲目。

```text
Track
- id: string
- title: string
- artist: string
- src: string
- coverImage: string optional
- description: text optional
- duration: int optional
- isDefaultBgm: boolean
- sortOrder: int
- createdAt: datetime
- updatedAt: datetime
```

当前阶段：暂不入库，继续使用 `content/music.json`。

## 5.4 Media

统一管理图片、视频、音频等媒体。

```text
Media
- id: string
- type: image / video / audio
- url: string
- alt: string optional
- poster: string optional
- width: int optional
- height: int optional
- duration: int optional
- source: local / external / cloud
- createdAt: datetime
```

未来可关联：

- Post
- Moment
- Track

## 5.5 Category

```text
Category
- id: string
- name: string
- slug: string unique
- type: post / moment / mixed
- createdAt: datetime
```

## 5.6 Tag

```text
Tag
- id: string
- name: string
- slug: string unique
- createdAt: datetime
```

关联表：

```text
PostTag
- postId
- tagId

MomentTag
- momentId
- tagId
```

## 6. 互动与统计模型

## 6.1 ViewEvent

记录访问事件。

```text
ViewEvent
- id: string
- targetType: post / moment / music
- targetSlug: string
- visitorId: string optional
- ipHash: string optional
- userAgent: string optional
- referrer: string optional
- createdAt: datetime
```

用途：

- 阅读量统计
- 日访问趋势
- 热门内容分析

## 6.2 ViewCounter

用于聚合访问次数，避免每次都扫描事件表。

```text
ViewCounter
- id: string
- targetType: post / moment / music
- targetSlug: string
- count: int
- updatedAt: datetime
```

建议：

- `ViewEvent` 记录明细
- `ViewCounter` 记录聚合结果

## 6.3 Comment

```text
Comment
- id: string
- targetType: post / moment
- targetSlug: string
- authorName: string
- authorEmail: string optional
- authorUrl: string optional
- content: text
- status: pending / approved / rejected / spam
- parentId: string optional
- createdAt: datetime
- updatedAt: datetime
```

默认建议：

```text
新评论先进入 pending，站主审核后展示。
```

## 6.4 Reaction

```text
Reaction
- id: string
- targetType: post / moment / track
- targetSlug: string
- type: like / heart / star
- visitorId: string optional
- createdAt: datetime
```

用途：

- 点赞
- 喜欢
- 收藏倾向

## 7. 用户与后台模型

## 7.1 User

```text
User
- id: string
- name: string
- email: string unique
- avatar: string optional
- role: owner / admin / visitor
- createdAt: datetime
- updatedAt: datetime
```

## 7.2 Auth 相关模型

如果后续使用 Auth.js / NextAuth，建议使用标准模型：

```text
Account
Session
VerificationToken
```

优先场景：

- 站主登录后台
- 评论审核
- 内容草稿管理

## 8. AI 功能预留模型

## 8.1 AiSummary

```text
AiSummary
- id: string
- targetType: post / moment
- targetSlug: string
- summary: text
- model: string
- createdAt: datetime
- updatedAt: datetime
```

用途：

- 文章摘要缓存
- 日常记录摘要

## 8.2 AiConversation

```text
AiConversation
- id: string
- userId: string optional
- title: string optional
- createdAt: datetime
- updatedAt: datetime
```

## 8.3 AiMessage

```text
AiMessage
- id: string
- conversationId: string
- role: user / assistant / system
- content: text
- createdAt: datetime
```

用途：

- 站内 AI 问答
- 内容检索问答
- 学习助手

## 9. 建议的 Prisma 初版方向

当正式接入数据库时，建议优先只实现：

```text
ViewEvent
ViewCounter
```

不要一开始就迁移 Post / Moment / Track。

原因：

- 风险最低
- 与当前文件驱动系统兼容
- 能验证数据库全链路
- 后续扩展评论和互动很自然

## 10. 环境变量规划

未来接入 Prisma / PostgreSQL 后需要：

```text
DATABASE_URL="postgresql://..."
```

如使用连接池，可能还需要：

```text
DIRECT_URL="postgresql://..."
```

部署平台需配置：

- 本地 `.env`
- Vercel Environment Variables
- 数据库平台连接串

## 11. 暂不做事项

当前阶段暂不建议：

- 立即开发后台管理
- 立即把文章从 MDX 迁移到数据库
- 立即做复杂用户系统
- 立即做全文搜索数据库
- 立即引入复杂权限体系

优先保持项目可控、可部署、可持续迭代。

## 12. 下一步建议

推荐下一步进入：

```text
阅读量统计方案设计与实现
```

具体内容：

1. 选择数据库平台：Supabase 或 Neon
2. 引入 Prisma
3. 创建 `ViewEvent` 与 `ViewCounter` 模型
4. 新增 API Route：记录访问
5. 在 Post / Moment 页面展示阅读量
6. 确认 Vercel 环境变量配置
