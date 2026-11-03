import { ButtonLink } from '../components/Button';
import Icon from '../components/Icon';
import Photo, { hasPhoto } from '../components/Photo';
import Reveal from '../components/Reveal';
import Seo from '../components/Seo';
import { areas, questions } from '../content/assessment';

const familiar = [
  {
    quote: '“I’ll catch up on the books this weekend.”',
    body: 'That was three weekends ago. A cleanup gets every account current in one go, so catching up stops being a standing plan.',
  },
  {
    quote: '“We had a good year. So where did the money go?”',
    body: 'Usually somewhere in Uncategorized. Monthly bookkeeping puts every transaction where it belongs while you still remember what it was, and your reports finally add up.',
  },
  {
    quote: '“My accountant needs what by when?”',
    body: 'Tax season moves a lot faster when the books were finished in January instead of the night before. We keep your records tidy and ready to hand to your tax professional.',
  },
  {
    quote: '“My system is a spreadsheet, three apps, and a sticky note.”',
    body: 'That’s what our Notion systems and dashboards are for: one place to keep the things you’re currently keeping in your head.',
  },
];

const month = [
  {
    step: '01',
    title: 'We do the unglamorous part.',
    body: 'Transactions get categorized, accounts get reconciled, and anything that looks off gets flagged instead of guessed at.',
  },
  {
    step: '02',
    title: 'You get reports you can actually read.',
    body: 'Your profit & loss and balance sheet, with a plain-English note on what changed and what’s worth a second look.',
  },
  {
    step: '03',
    title: 'You ask whatever you want.',
    body: '“What is this charge?” is a good question. So is “Can we afford to hire someone?” Both start with knowing your numbers, and that’s our job.',
  },
];

/** Shown when the hero photo hasn't been added yet. */
function HeroIllustration() {
  const items = ['Transactions categorized', 'Accounts reconciled', 'Monthly report reviewed', 'Questions answered'];
  const bars = [38, 52, 46, 64, 58, 76];
  return (
    <div className="card p-6 sm:p-7 sm:pb-12">
      <p className="text-sm font-semibold text-ink-900">This month</p>
      <div className="mt-6 flex h-28 items-end gap-2.5">
        {bars.map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t-lg ${i === bars.length - 1 ? 'bg-finch-500' : 'bg-ink-700/80'}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="mt-2 h-px bg-cream-300" />
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3 text-sm text-ink-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-900 text-cream-50">
              <Icon name="check" className="h-3.5 w-3.5" />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function HeroVisual() {
  return (
    <div aria-hidden={hasPhoto('homeHero') ? undefined : true} className="relative mx-auto w-full max-w-xl lg:mx-0">
      {hasPhoto('homeHero') ? (
        <Photo
          name="homeHero"
          priority
          sizes="(min-width: 1024px) 560px, 100vw"
          className="aspect-[5/4.4] rounded-[1.75rem] shadow-[0_30px_60px_-30px_rgba(60,40,20,0.45)]"
        />
      ) : (
        <HeroIllustration />
      )}
      <div aria-hidden="true" className="card absolute -bottom-6 -left-3 hidden items-center gap-3 px-4 py-3 sm:-left-7 sm:flex">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-finch-100 text-finch-700">
          <Icon name="check" className="h-5 w-5" />
        </span>
        <span>
          <span className="block text-sm font-semibold text-ink-900">Books reconciled</span>
          <span className="block text-[13px] text-ink-600">Everything matches the bank.</span>
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Seo
        title="FINCH | Bookkeeping & Business Tools for Small Business Owners"
        description="Monthly bookkeeping, cleanup, and readable financial reports for small business owners, plus practical tools for owners who like to run their own numbers."
      />

      {/* 1. Hero */}
      <div className="grain overflow-hidden bg-cream-100">
        <div className="container-page grid items-center gap-14 pt-12 pb-20 sm:pt-16 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:pt-20 lg:pb-24">
          <div>
            <p className="eyebrow">FINCH | Bookkeeping &amp; business tools</p>
            <h1 className="mt-4 text-[2.6rem] leading-[1.05] font-semibold sm:text-6xl">
              Bookkeeping for people with <em className="font-medium text-finch-600">a business to run.</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-700 sm:text-xl">
              FINCH keeps your books current and your reports readable, so the next time someone asks how business is
              going, you can answer with more than “busy.” And if you’d rather keep a hand on the numbers yourself, we
              make tools for that, too.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/contact?topic=bookkeeping" variant="primary">
                Talk to us about your books
              </ButtonLink>
              <ButtonLink to="/free-tools" variant="secondary">
                Take the 3-minute assessment
                <Icon name="arrowRight" className="h-4 w-4" />
              </ButtonLink>
            </div>
            <p className="mt-4 text-sm text-ink-600">Free, and no email required.</p>
          </div>
          <HeroVisual />
        </div>
      </div>

      {/* 2. Sound familiar */}
      <section aria-labelledby="familiar-heading" className="bg-cream-100 pt-8 pb-20 sm:pt-12 sm:pb-28">
        <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-18">
          <Reveal>
            <p className="eyebrow">Sound familiar?</p>
            <h2 id="familiar-heading" className="mt-3 text-3xl font-semibold sm:text-4xl">
              The business is doing fine. The books are another story.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-700">
              Most owners who reach out aren’t in trouble. They’re busy, and the books are the thing that keeps sliding
              to next week.
            </p>
          </Reveal>
          <ul className="border-b border-sand-200">
            {familiar.map((p, i) => (
              <li key={p.quote} className="border-t border-sand-200 py-6">
                <Reveal delay={i * 80}>
                  <h3 className="text-xl font-medium italic sm:text-2xl">{p.quote}</h3>
                  <p className="mt-2 leading-relaxed text-ink-700 sm:text-lg">{p.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Two ways */}
      <section aria-labelledby="offerings-heading" className="py-20 sm:py-28">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">How FINCH helps</p>
            <h2 id="offerings-heading" className="mt-3 text-3xl font-semibold sm:text-4xl">
              Hand it off, or do it yourself with better tools.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-700">
              Some owners want the books off their plate entirely. Others like being hands-on but are tired of rebuilding
              the system every quarter. We work with both.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-7 md:grid-cols-2">
            {[
              {
                photo: 'homeBookkeeping' as const,
                icon: 'ledger' as const,
                iconCls: 'bg-ink-900 text-cream-50',
                title: 'Bookkeeping Services',
                body: 'We take over the monthly work of categorizing, reconciling, and reporting, and we start with a cleanup if things have fallen behind. You get accurate books without having to become a bookkeeper.',
                items: ['Monthly bookkeeping', 'Cleanup & catch-up', 'Financial reporting support'],
                to: '/bookkeeping',
                cta: 'See bookkeeping services',
                variant: 'primary' as const,
              },
              {
                photo: 'homeDigital' as const,
                icon: 'dashboard' as const,
                iconCls: 'bg-finch-500 text-ink-950',
                title: 'Digital Products',
                body: 'Dashboards, Notion systems, and financial tools for owners who’d rather run their own numbers, minus the spreadsheet wrangling.',
                items: ['Financial tools', 'Dashboards & Notion systems', 'Operations resources'],
                to: '/shop',
                cta: 'Browse the shop',
                variant: 'accent' as const,
              },
            ].map((o, i) => (
              <Reveal key={o.title} delay={i * 120} className="h-full">
                <article className="card lift group flex h-full flex-col overflow-hidden">
                  {hasPhoto(o.photo) && (
                    <Photo name={o.photo} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[16/9]" />
                  )}
                  <div className="flex flex-1 flex-col p-7 sm:p-9">
                    {!hasPhoto(o.photo) && (
                      <span className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl ${o.iconCls}`}>
                        <Icon name={o.icon} className="h-6 w-6" />
                      </span>
                    )}
                    <h3 className="text-2xl font-semibold sm:text-[1.75rem]">{o.title}</h3>
                    <p className="mt-3 leading-relaxed text-ink-700">{o.body}</p>
                    <ul className="mt-6 space-y-3">
                      {o.items.map((s) => (
                        <li key={s} className="flex items-center gap-3 text-ink-800">
                          <Icon name="check" className="h-5 w-5 text-finch-600" />
                          {s}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-8">
                      <ButtonLink to={o.to} variant={o.variant} className="w-full sm:w-auto">
                        {o.cta}
                      </ButtonLink>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. A month with FINCH (replaces the old "note" and "approach" sections) */}
      <section aria-labelledby="month-heading" className="grain bg-sand-100 py-20 sm:py-28">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Working with FINCH</p>
            <h2 id="month-heading" className="mt-3 text-3xl font-semibold sm:text-4xl">
              Here’s what a month with FINCH looks like.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-700">From your side? Not much. That’s sort of the point.</p>
          </Reveal>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {month.map((m, i) => (
              <li key={m.step}>
                <Reveal delay={i * 120} className="border-t-2 border-finch-500 pt-6">
                  <span className="font-display text-[15px] text-finch-600">{m.step}</span>
                  <h3 className="mt-2 text-2xl leading-snug font-semibold">{m.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-700 sm:text-lg">{m.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal>
            <p className="mt-12 text-ink-700">
              <strong className="font-semibold text-ink-900">Behind right now?</strong> We start with a cleanup, so month
              one begins on solid ground.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 5. Assessment */}
      <section aria-labelledby="assessment-heading" className="bg-sand-100 px-4 pb-20 sm:px-8 sm:pb-28">
        <Reveal className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 rounded-[2rem] bg-ink-900 px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-2 lg:px-16">
            <div>
              <p className="eyebrow !text-finch-300">Free tool</p>
              <h2 id="assessment-heading" className="mt-3 text-3xl font-semibold !text-cream-50 sm:text-4xl">
                Not sure where you stand? Start here.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-cream-200">
                The Business Clarity Assessment is {questions.length} quick questions about your books, your systems, and
                how ready you feel for tax season. You’ll get a score and, more usefully, a short list of what to fix
                first.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink to="/free-tools" variant="accent" className="shrink-0 whitespace-nowrap">
                  Take the assessment
                  <Icon name="arrowRight" className="h-4 w-4" />
                </ButtonLink>
                <span className="text-sm text-cream-200/85">About 3 minutes. No email, no sales call.</span>
              </div>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {areas.map((a, i) => (
                <li key={a.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <span className="font-display text-sm text-finch-300">0{i + 1}</span>
                  <p className="mt-2 font-semibold text-cream-50">{a.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-cream-200/80">{a.short}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* 6. Closing */}
      <section aria-labelledby="cta-heading" className="px-4 py-20 sm:px-8 sm:py-28">
        <Reveal className="mx-auto max-w-6xl">
          <div
            className={`group grid overflow-hidden rounded-[2rem] bg-finch-100 ${hasPhoto('homeCta') ? 'md:grid-cols-2' : ''}`}
          >
            {hasPhoto('homeCta') && (
              <Photo name="homeCta" sizes="(min-width: 768px) 50vw, 100vw" className="min-h-64 md:min-h-[26rem]" />
            )}
            <div
              className={`flex flex-col justify-center px-6 py-12 sm:px-12 sm:py-16 ${hasPhoto('homeCta') ? '' : 'items-center text-center'}`}
            >
              <h2 id="cta-heading" className="text-3xl font-semibold sm:text-4xl">
                Ready when you are.
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-700">
                Tell us a little about your business and where the books stand today, even if the honest answer is “it’s
                complicated.” We’ll take it from there.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink to="/contact?topic=bookkeeping" variant="primary">
                  Talk to us about your books
                </ButtonLink>
                <ButtonLink to="/shop" variant="secondary">
                  Browse the shop
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
