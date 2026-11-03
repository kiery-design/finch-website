import { photos, type PhotoName, type PhotoSlot } from '../content/photos';

/** True when a photo will render (a real photo, or a placeholder during local development). */
export function hasPhoto(name: PhotoName): boolean {
  return Boolean((photos[name] as PhotoSlot).src) || import.meta.env.DEV;
}

type PhotoProps = {
  name: PhotoName;
  className?: string;
  /** Responsive sizes hint, e.g. '(min-width: 1024px) 50vw, 100vw' */
  sizes?: string;
  /** Load immediately (use for the hero only). */
  priority?: boolean;
};

/**
 * Responsive, lazy-loaded photo with a warm tone behind it while it loads.
 * Renders nothing on the live site if the photo hasn't been added yet.
 */
export default function Photo({ name, className = '', sizes = '100vw', priority = false }: PhotoProps) {
  const p = photos[name] as PhotoSlot;

  if (!p.src) {
    if (!import.meta.env.DEV) return null;
    return (
      <div className={`grain relative overflow-hidden ${className}`} style={{ backgroundColor: p.tone }} aria-hidden="true">
        <span className="absolute top-3 left-3 rounded-full bg-ink-900/85 px-3 py-1 text-xs font-semibold text-cream-50">
          Photo: {p.brief}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor: p.tone }}>
      <picture>
        <source type="image/webp" srcSet={`${p.src}-800.webp 800w, ${p.src}-1600.webp 1600w`} sizes={sizes} />
        <img
          src={`${p.src}-1600.jpg`}
          alt={p.alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className="photo-img absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: p.position ?? 'center' }}
        />
      </picture>
    </div>
  );
}
