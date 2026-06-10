import Link from 'next/link';
import { Leaf, Music2 } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-leaf-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2 text-base font-semibold text-leaf-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-leaf-200 text-leaf-900">
            <Leaf size={18} />
          </span>
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm text-leaf-700 transition hover:bg-leaf-100 hover:text-leaf-900">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/music" className="flex items-center gap-2 rounded-full border border-leaf-200 bg-white px-4 py-2 text-sm text-leaf-700 shadow-sm transition hover:border-leaf-300 hover:text-leaf-900">
          <Music2 size={16} />
          <span className="hidden sm:inline">Music</span>
        </Link>
      </div>
    </header>
  );
}
