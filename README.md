# Life Notes

一个极简、清新的个人博客网站，用于记录个人展示、心得学习、日常图片视频与音乐。

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- MDX

## Pages

- `/` Home
- `/blog` Blog
- `/moments` Moments
- `/music` Music
- `/about` About

## Getting Started

```bash
npm install
npm run dev
```

## Vercel Deployment

Vercel 项目根目录必须设置为仓库根目录：

```text
Root Directory: ./
Framework Preset: Next.js
Install Command: npm ci
Build Command: npm run build
Output Directory: .next
```

如果 Vercel 报错未检测到 Next.js 版本，通常说明 Root Directory 选错了，导致 Vercel 没有读取到根目录的 `package.json`。

## Content

### Blog Posts

文章放在：

```text
content/posts/*.mdx
```

### Moments

日常记录放在：

```text
content/moments/*.mdx
```

支持 frontmatter 字段：`title`、`summary`、`createdAt`、`mood`、`location`、`tags`、`media`。

`media` 支持图片和视频：

```yaml
media:
  - type: image
    src: /images/moments/example.jpg
    alt: 示例图片
  - type: video
    src: /video/example.mp4
    poster: /images/moments/example-poster.jpg
```

## Music

音乐列表由以下文件驱动：

```text
content/music.json
```

当前播放器支持：

- 全站共享播放状态
- 播放/暂停
- 上一首/下一首
- 播放进度条
- 音量控制
- 播放列表切换
- 页面切换时不中断播放

默认背景 BGM：森水垚《海边的曼彻斯特》。请将音频文件放入：

```text
public/music/haibian-de-manchesite.mp3
```

如有封面图，可放入：

```text
public/images/music/haibian-de-manchesite.jpg
```
