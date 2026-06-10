import Link from 'next/link';

export function SectionHeading({ eyebrow, title, href, action = '查看全部' }: { eyebrow: string; title: string; href?: string; action?: string }) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <div>
        <p className="text-sm text-leaf-700">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-leaf-900">{title}</h2>
      </div>
      {href && <Link href={href} className="hidden rounded-full border border-leaf-200 bg-white px-4 py-2 text-sm text-leaf-700 transition hover:bg-leaf-100 hover:text-leaf-900 sm:inline-flex">{action}</Link>}
    </div>
  );
}
