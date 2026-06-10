import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

export function SiteFooter() {
  return (
    <footer className="border-t border-leaf-200/70 bg-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 text-sm text-leaf-700 md:flex-row md:items-center md:justify-between">
        <p>在生活、学习与音乐之间，保留一些清澈的记录。</p>
        <div className="flex gap-4">
          <Link href={siteConfig.links.github}>GitHub</Link>
          <Link href={siteConfig.links.email}>Email</Link>
          <span>© {new Date().getFullYear()} Life Notes</span>
        </div>
      </div>
    </footer>
  );
}
