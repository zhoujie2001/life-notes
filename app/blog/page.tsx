import { PostCard } from '@/components/blog/post-card';
import { getAllPosts, getAllTags } from '@/lib/posts';

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-sm text-leaf-700">Blog</p>
      <h1 className="mt-3 text-4xl font-semibold text-leaf-900">心得与学习</h1>
      <p className="mt-4 max-w-2xl leading-8 text-leaf-700">这里用于沉淀学习笔记、阶段复盘和长期思考。所有文章由 `content/posts/*.mdx` 文件驱动。</p>

      {tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full border border-leaf-200 bg-white px-3 py-1 text-sm text-leaf-700">#{tag}</span>
          ))}
        </div>
      )}

      <div className="mt-10 grid gap-5">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        ) : (
          <div className="rounded-3xl border border-dashed border-leaf-300 bg-white/70 p-8 text-leaf-700">还没有文章。请在 `content/posts` 中新增 `.mdx` 文件。</div>
        )}
      </div>
    </div>
  );
}
