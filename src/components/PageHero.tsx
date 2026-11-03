import type { ReactNode } from 'react';

type PageHeroProps = { eyebrow: string; title: ReactNode; intro: ReactNode; children?: ReactNode };

/** Hero used at the top of every interior page. */
export default function PageHero({ eyebrow, title, intro, children }: PageHeroProps) {
  return (
    <div className="relative overflow-hidden border-b border-cream-300/60 bg-cream-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-finch-100 blur-3xl"
      />
      <div className="container-page relative py-14 sm:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl leading-[1.08] font-semibold sm:text-5xl">{title}</h1>
        <div className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-700">{intro}</div>
        {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>}
      </div>
    </div>
  );
}
