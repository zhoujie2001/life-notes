import { PostCard } from '@/components/blog/post-card';
import { EmptyState } from '@/components/ui/empty-state';
import { PageHero } from '@/components/ui/page-hero';
import { getAllPosts, getAllTags } from '@/lib/posts';

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <PageHero eyebrow="Blog" title="心得与学习" description="这里用于沉淀学习笔记、阶段复盘和长期思考。所有文章由 content/posts/*.mdx 文件驱动。" />

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
          <EmptyState>还没有文章。请在 `content/posts` 中新增 `.mdx` 文件。</EmptyState>
        )}
      </div>
    </div>
  );
}
