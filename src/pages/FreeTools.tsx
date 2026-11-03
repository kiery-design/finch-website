import Assessment from '../components/assessment/Assessment';
import Badge from '../components/Badge';
import Icon, { type IconName } from '../components/Icon';
import PageHero from '../components/PageHero';
import Section, { SectionHeading } from '../components/Section';
import Seo from '../components/Seo';

const upcoming: { icon: IconName; name: string; body: string }[] = [
  { icon: 'chart', name: 'Profit snapshot calculator', body: 'Plug in last month’s revenue and expenses and see what you actually kept.' },
  { icon: 'shield', name: 'Tax set-aside planner', body: 'Work out how much of each payment to set aside, using the percentage your tax professional gives you.' },
  { icon: 'calendar', name: 'Bookkeeping routine checklist', body: 'The weekly and monthly to-dos that keep the books from getting away from you.' },
];

export default function FreeTools() {
  return (
    <>
      <Seo
        title="Free Business Clarity Assessment"
        description="A free three-minute check-up for your business: 13 questions about your books, systems, and tax readiness, with a prioritized list of what to fix first. No email required."
      />

      <PageHero
        eyebrow="Free tools"
        title="A three-minute check-up for your business."
        photo="freeToolsHero"
        intro={
          <p>
            Thirteen questions about your books, your systems, and how ready you feel for tax season. You'll get a score
            across four areas and a short list of what to tackle first. No email required, and nobody will call you.
          </p>
        }
      />

      <Section className="!pt-10 sm:!pt-14">
        <div className="mx-auto max-w-3xl">
          <Assessment />
        </div>
      </Section>

      <Section tone="cream" labelledBy="more-tools-heading" className="no-print">
        <SectionHeading
          id="more-tools-heading"
          eyebrow="More on the way"
          title="A few more free tools are on the way"
          intro="Small, useful calculators for the questions that come up every month. They'll show up here when they're ready."
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {upcoming.map((t) => (
            <li key={t.name} className="rounded-2xl bg-white p-6 shadow-card">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cream-100 text-ink-800">
                  <Icon name={t.icon} />
                </span>
                <Badge tone="placeholder">Coming soon</Badge>
              </div>
              <h3 className="mt-4 font-sans text-lg font-semibold">{t.name}</h3>
              <p className="mt-1.5 leading-relaxed text-ink-700">{t.body}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
