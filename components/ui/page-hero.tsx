import type { ReactNode } from 'react';

export function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-leaf-200 bg-white/80 p-8 shadow-soft md:p-10">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-leaf-200/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-12 h-44 w-44 rounded-full bg-leaf-100/80 blur-3xl" />
      <div className="relative">
        <p className="inline-flex rounded-full border border-leaf-200 bg-white px-4 py-2 text-sm text-leaf-700">{eyebrow}</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-leaf-900 md:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-leaf-700 md:text-lg">{description}</p>
        {children && <div className="mt-7">{children}</div>}
      </div>
    </section>
  );
}
