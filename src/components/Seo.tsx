import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { site } from '../config/site';

type SeoProps = { title: string; description: string; noindex?: boolean };

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Sets per-page <title>, description, canonical URL and social tags. */
export default function Seo({ title, description, noindex = false }: SeoProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
    const url = `${site.url}${pathname === '/' ? '/' : pathname}`;
    document.title = fullTitle;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('name', 'robots', noindex ? 'noindex' : 'index, follow');

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, noindex, pathname]);

  return null;
}
