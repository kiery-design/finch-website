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
        description="FINCH is a small bookkeeping practice for business owners who’d rather spend their time on the business than on the books."
      />

      <PageHero
        eyebrow="About FINCH"
        title={founder ? `Hi, I'm ${founder.name}.` : 'Meet the person behind the books.'}
        photo="aboutHero"
        intro={
          founder ? (
            <div className="space-y-4">
              {founder.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          ) : (
            <p>
              FINCH is a small bookkeeping practice for business owners who'd rather spend their time on the business
              than on the books. When you work with FINCH, you work with a real person who knows your numbers, not a
              rotating support queue.
            </p>
          )
        }
      />

      <Section labelledBy="why-heading">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading id="why-heading" eyebrow="Why FINCH" title="Most owners don't need more advice. They need current books." />
          <div className="space-y-5 text-lg leading-relaxed text-ink-700">
            <p>
              Plenty of businesses are doing well and still can't say what they made last quarter. It's rarely a
              discipline problem. Bookkeeping is just the job that never feels urgent until the day it is.
            </p>
            <p>
              So FINCH does two things. For owners who want it handled, we do the{' '}
              <strong className="text-ink-900">bookkeeping</strong> every month and explain what it says. For owners who
              like to stay hands-on, we make <strong className="text-ink-900">digital tools</strong> that skip most of
              the setup. Either way, the numbers stop being a mystery.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="cream" labelledBy="values-heading">
        <SectionHeading id="values-heading" eyebrow="How we work" title="A few things you can count on" />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {values.map((v) => (
            <li key={v.title} className="lift rounded-2xl bg-white p-7 shadow-card">
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
            Sound like a good fit?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-cream-200/85">
            Send a note about your business, or take the 3-minute assessment first if you'd like to see where things
            stand.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink to="/contact?topic=bookkeeping" variant="accent">
              Talk to us about your books
            </ButtonLink>
            <ButtonLink to="/free-tools" variant="light">
              Take the 3-minute assessment
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
