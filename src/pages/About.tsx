import { ButtonLink } from '../components/Button';
import Icon from '../components/Icon';
import PageHero from '../components/PageHero';
import Section, { SectionHeading } from '../components/Section';
import Seo from '../components/Seo';
import { founder, values } from '../content/about';

export default function About() {
  return (
    <>
      <Seo
        title="About FINCH"
        description="FINCH helps small business owners gain financial clarity, build better business systems, and feel more confident running their businesses."
      />

      <PageHero
        eyebrow="About FINCH"
        title="Financial clarity shouldn't feel out of reach"
        intro={
          <p>
            FINCH exists to help small business owners understand their numbers, organize how their business runs, and
            make decisions with confidence, without the jargon or the judgment.
          </p>
        }
      />

      <Section labelledBy="why-heading">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading id="why-heading" eyebrow="Why FINCH" title="Built for the owners doing it all" />
          <div className="space-y-5 text-lg leading-relaxed text-ink-700">
            <p>
              Most small business owners didn't start their business to do bookkeeping. They started it to serve
              clients, make things, and build something of their own. But the numbers still matter. Unclear finances
              lead to stress, guesswork, and missed opportunities.
            </p>
            <p>
              FINCH brings together two kinds of support: <strong className="text-ink-900">bookkeeping services</strong>{' '}
              for owners who want their books handled, and <strong className="text-ink-900">digital tools</strong> for
              owners who want to build clarity on their own. Both are designed around the same idea: clarity is
              something you can build, one practical step at a time.
            </p>
          </div>
        </div>
      </Section>

      {founder && (
        <Section tone="cream" labelledBy="founder-heading">
          <div className="max-w-3xl">
            <p className="eyebrow">Meet the founder</p>
            <h2 id="founder-heading" className="mt-3 text-3xl font-semibold sm:text-4xl">
              {founder.name}
            </h2>
            <p className="mt-1 text-ink-600">{founder.role}</p>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-700">
              {founder.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </Section>
      )}

      <Section tone={founder ? 'default' : 'cream'} labelledBy="values-heading">
        <SectionHeading id="values-heading" eyebrow="What we value" title="How FINCH works" />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {values.map((v) => (
            <li key={v.title} className="rounded-2xl bg-white p-7 shadow-card">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-finch-100 text-finch-700">
                <Icon name={v.icon} />
              </span>
              <h3 className="mt-4 text-xl font-semibold">{v.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-700">{v.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="about-cta-heading">
        <div className="rounded-3xl bg-ink-900 p-8 text-center sm:p-14">
          <h2 id="about-cta-heading" className="text-3xl font-semibold text-cream-50">
            Let's make your numbers make sense
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-cream-200/85">
            Start with the free assessment, or reach out to talk about bookkeeping support.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink to="/free-tools" variant="accent">
              Take the free assessment
            </ButtonLink>
            <ButtonLink to="/contact" variant="light">
              Get in touch
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
