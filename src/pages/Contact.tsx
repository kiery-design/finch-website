import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, ButtonExternal } from '../components/Button';
import Icon from '../components/Icon';
import IntegrationNotice from '../components/IntegrationNotice';
import PageHero from '../components/PageHero';
import Section from '../components/Section';
import Seo from '../components/Seo';
import { integrations, site } from '../config/site';
import { EMAIL_PATTERN, buildMailto, submitForm } from '../lib/forms';

const topics = [
  { value: 'bookkeeping', label: 'Monthly bookkeeping' },
  { value: 'cleanup', label: 'Cleanup or catch-up' },
  { value: 'products', label: 'The digital shop' },
  { value: 'other', label: 'Something else' },
] as const;

type Fields = { name: string; email: string; business: string; topic: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = 'idle' | 'sending' | 'success' | 'error' | 'mailto';

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = 'Who should we reply to?';
  if (!f.email.trim()) e.email = 'Please enter your email address.';
  else if (!EMAIL_PATTERN.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (!f.message.trim()) e.message = 'A sentence or two is plenty.';
  return e;
}

export default function Contact() {
  const [params] = useSearchParams();
  const initialTopic = topics.some((t) => t.value === params.get('topic')) ? params.get('topic')! : 'bookkeeping';

  const [fields, setFields] = useState<Fields>({ name: '', email: '', business: '', topic: initialTopic, message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const live = integrations.contactForm;

  const update = (key: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Quietly ignore bots that fill in the hidden honeypot field.
    const honeypot = e.currentTarget.elements.namedItem('bot-field') as HTMLInputElement | null;
    if (honeypot?.value) return;
    const found = validate(fields);
    setErrors(found);
    const firstError = (Object.keys(found) as (keyof Fields)[])[0];
    if (firstError) {
      document.getElementById(`contact-${firstError}`)?.focus();
      return;
    }

    const topicLabel = topics.find((t) => t.value === fields.topic)?.label ?? fields.topic;

    if (!live) {
      // No form service connected: hand off to the visitor's own email app.
      const body = [
        fields.message.trim(),
        '',
        '---',
        `Name: ${fields.name.trim()}`,
        `Email: ${fields.email.trim()}`,
        fields.business.trim() ? `Business: ${fields.business.trim()}` : '',
        `Topic: ${topicLabel}`,
      ]
        .filter((l, i, arr) => l !== '' || arr[i - 1] !== '')
        .join('\n');
      window.location.href = buildMailto(site.email, `FINCH inquiry: ${topicLabel}`, body);
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      await submitForm(site.contactForm.provider, site.contactForm.endpoint, 'contact', {
        name: fields.name.trim(),
        email: fields.email.trim(),
        business: fields.business.trim(),
        topic: topicLabel,
        message: fields.message.trim(),
        'bot-field': '',
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const fieldProps = (key: keyof Fields) => ({
    id: `contact-${key}`,
    name: key,
    value: fields[key],
    onChange: update(key),
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `contact-${key}-error` : undefined,
    className: 'field-input',
  });

  const errorText = (k: keyof Fields) =>
    errors[k] ? (
      <p id={`contact-${k}-error`} className="mt-1.5 text-sm text-red-700">
        {errors[k]}
      </p>
    ) : null;

  return (
    <>
      <Seo
        title="Contact FINCH"
        description="Talk to FINCH about monthly bookkeeping, cleanup, or the digital shop. Email hello@workwithfinch.com or send a short note here."
      />

      <PageHero
        eyebrow="Contact"
        title="Let's talk about your books."
        photo="contactHero"
        intro={
          <p>
            A few sentences is plenty: what the business does, where the books stand, and what you'd like off your
            plate. We'll reply by email.
          </p>
        }
      />

      <Section className="!pt-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
          {/* Direct contact */}
          <aside className="space-y-5">
            <div className="card p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-finch-100 text-finch-700">
                <Icon name="mail" className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-2xl font-semibold">Prefer email?</h2>
              <p className="mt-2 text-ink-700">Write to us directly. It goes to the same place.</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-4 inline-block text-lg font-semibold break-all text-ink-900 underline decoration-finch-500 decoration-2 underline-offset-4 hover:text-finch-700"
              >
                {site.email}
              </a>
            </div>

            {integrations.booking && (
              <div className="card p-7">
                <h2 className="text-xl font-semibold">Prefer to pick a time?</h2>
                <p className="mt-2 text-ink-700">Grab a slot on the calendar and skip the back-and-forth.</p>
                <ButtonExternal href={site.bookingUrl} variant="primary" className="mt-5 w-full">
                  <Icon name="calendar" className="h-4 w-4" />
                  Book a consultation
                </ButtonExternal>
              </div>
            )}

            <div className="rounded-2xl bg-cream-100 p-7">
              <h2 className="font-sans text-base font-semibold">Not sure what to write? Try:</h2>
              <ul className="mt-3 space-y-2 text-ink-700">
                {[
                  'What the business does and roughly how big it is',
                  'Where the books stand (current, a bit behind, “it’s complicated”)',
                  'What you use now: QuickBooks, Xero, a spreadsheet, a shoebox',
                ].map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-finch-600" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Form */}
          <div className="card p-6 sm:p-9">
            <h2 className="text-2xl font-semibold">Send a note</h2>

            {!live && (
              <IntegrationNotice className="mt-4">
                This form isn't connected to our inbox yet. Clicking <strong>Open in email app</strong> drafts your message
                in your own email program, ready to send to {site.email}.
              </IntegrationNotice>
            )}

            {status === 'success' ? (
              <div role="status" className="mt-6 rounded-xl bg-ink-50 p-6">
                <p className="font-semibold text-ink-900">Got it. Thanks for writing.</p>
                <p className="mt-1 text-ink-700">We'll reply by email.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="mt-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="field-label">
                      Name <span className="text-finch-700" aria-hidden="true">*</span>
                    </label>
                    <input type="text" autoComplete="name" required {...fieldProps('name')} />
                    {errorText('name')}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="field-label">
                      Email <span className="text-finch-700" aria-hidden="true">*</span>
                    </label>
                    <input type="email" autoComplete="email" required {...fieldProps('email')} />
                    {errorText('email')}
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-business" className="field-label">
                      Business name <span className="font-normal text-ink-600">(optional)</span>
                    </label>
                    <input type="text" autoComplete="organization" {...fieldProps('business')} />
                  </div>
                  <div>
                    <label htmlFor="contact-topic" className="field-label">
                      What's this about?
                    </label>
                    <select {...fieldProps('topic')}>
                      {topics.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="field-label">
                    Message <span className="text-finch-700" aria-hidden="true">*</span>
                  </label>
                  <textarea rows={6} required {...fieldProps('message')} />
                  {errorText('message')}
                </div>

                {/* Honeypot for spam bots: hidden from people and assistive tech. */}
                <div className="hidden" aria-hidden="true">
                  <label>
                    Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <p className="text-sm text-ink-600">
                  <span aria-hidden="true">*</span> Required fields
                </p>

                <Button type="submit" variant="primary" className="w-full sm:w-auto" disabled={status === 'sending'}>
                  {live ? (status === 'sending' ? 'Sending…' : 'Send message') : 'Open in email app'}
                  <Icon name={live ? 'arrowRight' : 'external'} className="h-4 w-4" />
                </Button>

                {status === 'mailto' && (
                  <p role="status" className="text-sm text-ink-700">
                    Your email app should open with your message ready to send. If nothing happened, email us directly
                    at{' '}
                    <a href={`mailto:${site.email}`} className="font-semibold underline">
                      {site.email}
                    </a>
                    .
                  </p>
                )}
                {status === 'error' && (
                  <p role="alert" className="text-sm text-red-700">
                    Sorry, your message couldn't be sent. Please try again or email {site.email} directly.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
