import { useState } from 'react';
import Badge from '../components/Badge';
import { ButtonExternal, ButtonLink, buttonClasses } from '../components/Button';
import Icon from '../components/Icon';
import IntegrationNotice from '../components/IntegrationNotice';
import PageHero from '../components/PageHero';
import Section from '../components/Section';
import Seo from '../components/Seo';
import { integrations, site } from '../config/site';
import { productCategories, products, type Product, type ProductCategory } from '../content/products';

const accentStyles: Record<Product['accent'], string> = {
  ink: 'bg-ink-900 text-cream-100',
  finch: 'bg-finch-500 text-ink-950',
  sage: 'bg-ink-100 text-ink-900',
  cream: 'bg-cream-200 text-ink-900',
};

function ProductArt({ product }: { product: Product }) {
  // Simple generated "cover" so cards look finished before real product images exist.
  return (
    <div className={`relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-xl p-5 ${accentStyles[product.accent]}`}>
      <span className="text-xs font-semibold tracking-[0.14em] uppercase opacity-80">{product.category}</span>
      <div aria-hidden="true" className="absolute right-4 bottom-4 left-[64%] flex h-2/5 items-end gap-1.5 opacity-30">
        {[40, 65, 50, 85, 70].map((h, i) => (
          <span key={i} className="flex-1 rounded-t bg-current" style={{ height: `${h}%` }} />
        ))}
      </div>
      <p className="relative max-w-[58%] font-display text-xl leading-tight font-semibold">{product.name}</p>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const href = product.stanUrl || site.stanStoreUrl;
  const available = !product.placeholder && Boolean(href);

  return (
    <article className="card lift flex flex-col p-4" aria-labelledby={`p-${product.id}`}>
      <ProductArt product={product} />
      <div className="flex flex-1 flex-col px-2 pt-5 pb-2">
        <div className="flex flex-wrap items-center gap-2">
          {product.placeholder && <Badge tone="placeholder">Preview · In the works</Badge>}
          {product.price && !product.placeholder && <Badge tone="ink">{product.price}</Badge>}
        </div>
        <h3 id={`p-${product.id}`} className="mt-3 text-xl font-semibold">
          {product.name}
        </h3>
        <p className="mt-2 leading-relaxed text-ink-700">{product.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {product.highlights.map((h) => (
            <li key={h} className="rounded-full bg-cream-100 px-3 py-1 text-xs font-medium text-ink-800">
              {h}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-6">
          {available ? (
            <ButtonExternal href={href} variant="primary" className="w-full">
              View on Stan Store
              <Icon name="external" className="h-4 w-4" />
            </ButtonExternal>
          ) : (
            <span className={buttonClasses('secondary', 'w-full cursor-default opacity-70 hover:bg-white')} aria-disabled="true">
              Coming soon
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Shop() {
  const [filter, setFilter] = useState<ProductCategory | 'All'>('All');
  const visible = filter === 'All' ? products : products.filter((p) => p.category === filter);
  const allPlaceholders = products.every((p) => p.placeholder);

  return (
    <>
      <Seo
        title="Digital Shop: Financial Tools, Dashboards & Notion Systems"
        description="Dashboards, Notion systems, and financial tools from FINCH for small business owners who like to run their own numbers."
      />

      <PageHero
        eyebrow="Digital shop"
        title="Tools for owners who like to keep a hand on the numbers."
        intro={
          <p>
            Dashboards, Notion systems, and financial tools made by bookkeepers, for owners who want to see their
            numbers without building the spreadsheet from scratch.
          </p>
        }
      >
        {integrations.stanStore ? (
          <ButtonExternal href={site.stanStoreUrl} variant="primary">
            Visit the FINCH Stan Store
            <Icon name="external" className="h-4 w-4" />
          </ButtonExternal>
        ) : (
          <ButtonLink to="/free-tools" variant="primary">
            Take the 3-minute assessment while you wait
          </ButtonLink>
        )}
      </PageHero>

      <Section>
        <IntegrationNotice audience="dev" className="mb-8">
          Products below come from <code>src/content/products.ts</code>. Set <code>placeholder: false</code> and add a
          Stan Store link (or <code>stanStoreUrl</code> in <code>src/config/site.ts</code>) to make a product
          purchasable. Checkout happens on Stan Store, never on this site.
        </IntegrationNotice>

        {allPlaceholders && (
          <div className="mb-8 rounded-2xl border border-finch-300/60 bg-finch-50 p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <div>
              <p className="font-semibold text-ink-900">The shop opens soon.</p>
              <p className="mt-1 text-ink-700">
                What you see here is in the works, so nothing's for sale just yet. Want a heads-up when it opens?
              </p>
            </div>
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent('Let me know when the FINCH shop opens')}`}
              className="mt-4 inline-flex shrink-0 items-center gap-2 font-semibold text-finch-700 underline-offset-4 hover:underline sm:mt-0"
            >
              <Icon name="mail" className="h-4 w-4" />
              Email me when it opens
            </a>
          </div>
        )}

        <div role="group" aria-label="Filter products by category" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {(['All', ...productCategories] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={`min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold transition ${
                filter === c ? 'bg-ink-900 text-cream-50' : 'bg-cream-100 text-ink-800 hover:bg-cream-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? 'product' : 'products'}
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-16 grid gap-6 rounded-3xl bg-ink-900 p-8 text-cream-100 sm:p-12 md:grid-cols-[1.5fr_1fr] md:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-cream-50 sm:text-3xl">Would you rather not do it yourself?</h2>
            <p className="mt-3 leading-relaxed text-cream-200/85">
              Completely fair. Our bookkeeping services take the whole thing off your plate.
            </p>
          </div>
          <div className="md:text-right">
            <ButtonLink to="/bookkeeping" variant="light">
              See bookkeeping services
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
