import type { ReactNode } from 'react';
import type { PhotoName } from '../content/photos';
import Photo, { hasPhoto } from './Photo';

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  children?: ReactNode;
  /** Optional photo shown beside the text on larger screens. */
  photo?: PhotoName;
};

/** Hero used at the top of every interior page. */
export default function PageHero({ eyebrow, title, intro, children, photo }: PageHeroProps) {
  const withPhoto = photo && hasPhoto(photo);
  return (
    <div className="grain overflow-hidden border-b border-cream-300/60 bg-cream-100">
      <div
        className={`container-page py-14 sm:py-20 ${withPhoto ? 'grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14' : ''}`}
      >
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-[1.08] font-semibold sm:text-5xl">{title}</h1>
          <div className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-700">{intro}</div>
          {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>}
        </div>
        {withPhoto && (
          <Photo
            name={photo}
            priority
            sizes="(min-width: 1024px) 440px, 100vw"
            className="hidden aspect-[4/3] rounded-3xl shadow-[0_24px_48px_-28px_rgba(60,40,20,0.45)] sm:block lg:aspect-[4/4.4]"
          />
        )}
      </div>
    </div>
  );
}
