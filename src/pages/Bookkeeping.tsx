import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ButtonExternal, ButtonLink } from '../components/Button';
import Icon from '../components/Icon';
import PageHero from '../components/PageHero';
import Section, { SectionHeading } from '../components/Section';
import Seo from '../components/Seo';
import { integrations, site } from '../config/site';
import { bookkeepingFaqs, consultationSteps, idealClients, services } from '../content/services';

function ConsultCta({ variant = 'primary' }: { variant?: 'primary' | 'accent' }) {
  return integrations.booking ? (
    <ButtonExternal href={site.bookingUrl} variant={variant}>
      <Icon name="calendar" className="h-4 w-4" />
      Book a consultation
    </ButtonExternal>
  ) : (
    <ButtonLink to="/contact?topic=bookkeeping" variant={variant}>
      Talk to us about your books
    </ButtonLink>
  );
}

export default function Bookkeeping() {
  const { hash } = useLocation();

  // Support links like /bookkeeping#cleanup from the assessment results.
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' });
  }, [hash]);

  return (
    <>
      <Seo
        title="Bookkeeping Services for Small Businesses"
        description="Monthly bookkeeping, cleanup and catch-up, and financial reporting support for small business owners. Accurate books, explained in plain English."
      />

      <PageHero
        eyebrow="Bookkeeping services"
        title="Books you can trust. Reports you'll actually read."
        photo="bookkeepingHero"
        intro={
          <p>
            We handle the monthly work of keeping your books accurate, then tell you what the numbers are saying in
            plain English. If things have fallen behind, we start by catching you up.
          </p>
        }
      >
        <ConsultCta />
        <ButtonLink to="/free-tools" variant="secondary">
          Not sure what you need? Take the 3-minute assessment
        </ButtonLink>
      </PageHero>

      {/* Services */}
      <Section labelledBy="services-heading">
        <SectionHeading
          id="services-heading"
          eyebrow="Services"
          title="What we take off your plate"
          intro="Most people start with one of these. If you're not sure which, that's what the first conversation is for."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {services.map((s) => (
            <article key={s.id} id={s.id} className="card lift flex scroll-mt-28 flex-col p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-900 text-cream-50">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-2xl font-semibold">{s.name}</h3>
              <p className="mt-3 leading-relaxed text-ink-700">{s.summary}</p>
              <h4 className="mt-6 text-sm font-semibold tracking-wide text-ink-900 uppercase">Typically includes</h4>
              <ul className="mt-3 space-y-2.5">
                {s.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-ink-800">
                    <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-finch-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-7">
                <p className="rounded-xl bg-cream-100 p-4 text-sm leading-relaxed text-ink-800">
                  <strong className="font-semibold">A good fit if:</strong> {s.goodFit}
                </p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-ink-600">
          Every business is a little different, so we confirm the exact scope with you before any work starts.
        </p>
      </Section>

      {/* Who it's for */}
      <Section tone="cream" labelledBy="who-heading">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            id="who-heading"
            eyebrow="Who it's for"
            title="Who we work with"
            intro="Established small businesses with real transaction volume and better things to do than reconcile a credit card statement on a Sunday night."
          />
          <ul className="space-y-4">
            {idealClients.map((c) => (
              <li key={c} className="flex gap-4 rounded-2xl bg-white p-5 shadow-card">
                <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-finch-600" />
                <span className="leading-relaxed text-ink-800">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Process */}
      <Section labelledBy="process-heading">
        <SectionHeading
          id="process-heading"
          eyebrow="How it works"
          title="How to get started"
          align="center"
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {consultationSteps.map((step, i) => (
            <li key={step.title} className="relative rounded-2xl border border-cream-300/70 p-7">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-finch-500 font-display text-lg font-semibold text-ink-950">
                {i + 1}
              </span>
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-700">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-col items-center gap-3">
          <ConsultCta variant="accent" />
          <p className="text-sm text-ink-600">
            Or email{' '}
            <a href={`mailto:${site.email}`} className="font-medium text-ink-900 underline underline-offset-4">
              {site.email}
            </a>
          </p>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="cream" labelledBy="faq-heading">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading id="faq-heading" eyebrow="Questions" title="Common questions" />
          <div className="space-y-3">
            {bookkeepingFaqs.map((f) => (
              <details key={f.q} className="group rounded-2xl bg-white p-5 shadow-card open:pb-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cream-100 text-lg leading-none transition group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-ink-700">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
