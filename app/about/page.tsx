export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-sm text-leaf-700">About</p>
      <h1 className="mt-3 text-4xl font-semibold text-leaf-900">关于我</h1>
      <div className="prose-life mt-8 rounded-3xl border border-leaf-200 bg-white p-8 shadow-sm">
        <p>这里将用于介绍个人背景、兴趣、技能、当前关注方向，以及 GitHub 等外部链接。</p>
        <p>Life Notes 会作为一个长期迭代的个人空间，记录学习、生活和审美。</p>
      </div>
    </div>
  );
}
