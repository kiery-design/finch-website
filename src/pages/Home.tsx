import { ButtonLink } from '../components/Button';
import Icon, { type IconName } from '../components/Icon';
import Section, { SectionHeading } from '../components/Section';
import Seo from '../components/Seo';
import { areas, questions } from '../content/assessment';

const painPoints: { icon: IconName; title: string; body: string }[] = [
  {
    icon: 'clock',
    title: '“My books are months behind.”',
    body: 'Cleanup and catch-up bookkeeping gets your records accurate and current so you can stop dreading them.',
  },
  {
    icon: 'chart',
    title: '“I don’t really know my numbers.”',
    body: 'Clear monthly reports, explained in plain language, so you know what is coming in, going out, and left over.',
  },
  {
    icon: 'layers',
    title: '“Everything lives in my head.”',
    body: 'Notion systems and dashboards that organize your clients, processes, and money in one place.',
  },
  {
    icon: 'shield',
    title: '“Tax season is a scramble.”',
    body: 'Organized, up-to-date books that are ready to hand off to your tax professional.',
  },
];

const approach = [
  { step: '01', title: 'Get clear', body: 'Understand where your business stands today, without judgment.' },
  { step: '02', title: 'Get organized', body: 'Put the books, systems, and routines in place that keep things running smoothly.' },
  { step: '03', title: 'Get confident', body: 'Make decisions from real numbers and spend less time worrying about them.' },
];

function HeroVisual() {
  const items = ['Transactions categorized', 'Accounts reconciled', 'Monthly report reviewed', 'Next month’s priorities set'];
  const bars = [38, 52, 46, 64, 58, 76];
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-md lg:mx-0">
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-finch-100 via-cream-100 to-ink-100" />
      <div className="card p-6 sm:p-7 sm:pb-12">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-ink-900">Monthly clarity check</p>
          <span className="rounded-full bg-ink-100 px-2.5 py-1 text-xs font-medium text-ink-700">Illustration</span>
        </div>
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
      <div className="card absolute -bottom-6 -left-4 hidden items-center gap-3 px-4 py-3 sm:flex">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-finch-100 text-finch-700">
          <Icon name="sparkle" className="h-5 w-5" />
        </span>
        <span className="text-sm font-medium text-ink-900">Less guessing, more knowing</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Seo
        title="FINCH | Bookkeeping & Business Tools for Small Business Owners"
        description="FINCH helps small business owners gain financial clarity with monthly bookkeeping, cleanup bookkeeping, financial reporting support, and practical digital tools."
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="container-page grid items-center gap-14 pt-12 pb-20 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pt-24 lg:pb-28">
          <div>
            <p className="eyebrow">Bookkeeping & business tools</p>
            <h1 className="mt-4 text-[2.6rem] leading-[1.05] font-semibold sm:text-6xl">
              Know your numbers. <span className="text-finch-600">Run your business</span> with confidence.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-700 sm:text-xl">
              FINCH helps small business owners get financial clarity, build better systems, and feel more confident
              about the business they're running, through thoughtful bookkeeping and practical digital tools.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/contact?topic=bookkeeping" variant="primary">
                Request a consultation
              </ButtonLink>
              <ButtonLink to="/free-tools" variant="secondary">
                Take the free assessment
                <Icon name="arrowRight" className="h-4 w-4" />
              </ButtonLink>
            </div>
            <p className="mt-4 text-sm text-ink-600">
              Free Business Clarity Assessment · About 3 minutes · No email required
            </p>
          </div>
          <HeroVisual />
        </div>
      </div>

      {/* Two offerings */}
      <Section tone="cream" labelledBy="offerings-heading">
        <SectionHeading
          id="offerings-heading"
          eyebrow="How FINCH helps"
          title="Two ways to get clear on your business"
          intro="Work with FINCH directly, or use FINCH tools on your own. Either way, the goal is the same: clarity you can act on."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="card flex flex-col p-7 sm:p-9">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-900 text-cream-50">
              <Icon name="ledger" className="h-6 w-6" />
            </span>
            <h3 className="mt-6 text-2xl font-semibold">Bookkeeping Services</h3>
            <p className="mt-3 leading-relaxed text-ink-700">
              Done-for-you bookkeeping that keeps your records accurate and gives you reports you can understand.
            </p>
            <ul className="mt-6 space-y-3">
              {['Monthly bookkeeping', 'Cleanup & catch-up bookkeeping', 'Financial reporting support'].map((s) => (
                <li key={s} className="flex items-center gap-3 text-ink-800">
                  <Icon name="check" className="h-5 w-5 text-finch-600" />
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <ButtonLink to="/bookkeeping" variant="primary" className="w-full sm:w-auto">
                Explore bookkeeping
              </ButtonLink>
            </div>
          </article>

          <article className="card flex flex-col p-7 sm:p-9">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-finch-500 text-ink-950">
              <Icon name="dashboard" className="h-6 w-6" />
            </span>
            <h3 className="mt-6 text-2xl font-semibold">Digital Products</h3>
            <p className="mt-3 leading-relaxed text-ink-700">
              Interactive tools and systems for owners who want to get organized and understand their numbers on their
              own schedule.
            </p>
            <ul className="mt-6 space-y-3">
              {['Interactive financial tools', 'Business dashboards & Notion systems', 'Operational resources'].map(
                (s) => (
                  <li key={s} className="flex items-center gap-3 text-ink-800">
                    <Icon name="check" className="h-5 w-5 text-finch-600" />
                    {s}
                  </li>
                ),
              )}
            </ul>
            <div className="mt-auto pt-8">
              <ButtonLink to="/shop" variant="accent" className="w-full sm:w-auto">
                Visit the digital shop
              </ButtonLink>
            </div>
          </article>
        </div>
      </Section>

      {/* Pain points */}
      <Section labelledBy="familiar-heading">
        <SectionHeading
          id="familiar-heading"
          eyebrow="Sound familiar?"
          title="You started a business to do the work you love, not to wrestle with spreadsheets."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {painPoints.map((p) => (
            <div key={p.title} className="flex gap-4 rounded-2xl border border-cream-300/70 bg-cream-50 p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-finch-100 text-finch-700">
                <Icon name={p.icon} />
              </span>
              <div>
                <h3 className="font-sans text-lg font-semibold">{p.title}</h3>
                <p className="mt-1.5 leading-relaxed text-ink-700">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Assessment intro */}
      <Section tone="ink" labelledBy="assessment-heading">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              id="assessment-heading"
              eyebrow="Free tool"
              title="How clear is your business, really?"
              intro={`The Business Clarity Assessment is ${questions.length} quick questions about your finances, bookkeeping habits, and day-to-day operations. You'll get a personalized snapshot and practical next steps right away.`}
              inverted
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink to="/free-tools" variant="accent" className="shrink-0 whitespace-nowrap">
                Start the free assessment
                <Icon name="arrowRight" className="h-4 w-4" />
              </ButtonLink>
              <span className="text-sm text-cream-200/80">No email required. Your answers stay in your browser.</span>
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
      </Section>

      {/* Approach */}
      <Section labelledBy="approach-heading">
        <SectionHeading
          id="approach-heading"
          eyebrow="The FINCH approach"
          title="Steady, practical progress"
          align="center"
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {approach.map((a) => (
            <li key={a.step} className="card p-7">
              <span className="font-display text-3xl text-finch-500">{a.step}</span>
              <h3 className="mt-3 text-xl font-semibold">{a.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-700">{a.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Final CTA */}
      <section aria-labelledby="cta-heading" className="pb-20 sm:pb-28">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-finch-100 px-6 py-12 text-center sm:px-12 sm:py-16">
            <div aria-hidden="true" className="absolute -top-16 -left-16 h-48 w-48 rounded-full bg-finch-300/40 blur-2xl" />
            <h2 id="cta-heading" className="relative text-3xl font-semibold sm:text-4xl">
              Ready for clearer numbers?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-lg text-ink-700">
              Tell us about your business and where you'd like more clarity. We'll take it from there.
            </p>
            <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink to="/contact?topic=bookkeeping" variant="primary">
                Request a consultation
              </ButtonLink>
              <ButtonLink to="/shop" variant="secondary">
                Browse digital tools
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
