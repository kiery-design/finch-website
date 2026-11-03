import Assessment from '../components/assessment/Assessment';
import Badge from '../components/Badge';
import Icon, { type IconName } from '../components/Icon';
import PageHero from '../components/PageHero';
import Section, { SectionHeading } from '../components/Section';
import Seo from '../components/Seo';

const upcoming: { icon: IconName; name: string; body: string }[] = [
  { icon: 'chart', name: 'Profit snapshot calculator', body: 'A quick way to estimate monthly profit from your revenue and expenses.' },
  { icon: 'shield', name: 'Tax set-aside planner', body: 'Plan how much of each payment to set aside, using the percentage your tax pro recommends.' },
  { icon: 'calendar', name: 'Bookkeeping routine checklist', body: 'A weekly and monthly checklist for keeping your books current.' },
];

export default function FreeTools() {
  return (
    <>
      <Seo
        title="Free Business Clarity Assessment"
        description="Take FINCH's free Business Clarity Assessment. Answer a few quick questions about your finances, bookkeeping, and operations, and get personalized recommendations. No email required."
      />

      <PageHero
        eyebrow="Free tools"
        title="See where your business stands in a few minutes"
        intro={
          <p>
            The Business Clarity Assessment looks at four areas of your business and gives you practical, personalized
            next steps. It's free, private, and doesn't require an email address.
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
          title="More free tools are in development"
          intro="We're building more simple tools to help you understand your numbers. Check back soon."
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
