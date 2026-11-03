import { useId, useState, type FormEvent } from 'react';
import { integrations, site } from '../../config/site';
import { EMAIL_PATTERN, submitForm } from '../../lib/forms';
import { Button } from '../Button';
import IntegrationNotice from '../IntegrationNotice';

type Status = 'idle' | 'sending' | 'success' | 'error';

/**
 * Optional email signup shown after assessment results.
 * Hidden from visitors until `site.newsletter` is configured.
 */
export default function EmailSignup() {
  const id = useId();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  if (!integrations.newsletter) {
    return (
      <IntegrationNotice audience="dev">
        Optional email signup is hidden because no email service is connected. Set <code>newsletter</code> in{' '}
        <code>src/config/site.ts</code> to turn it on.
      </IntegrationNotice>
    );
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setStatus('sending');
    try {
      // The `bot-field` honeypot matches the hidden field Netlify expects. Real visitors leave it empty.
      await submitForm(site.newsletter.provider, site.newsletter.endpoint, 'newsletter', {
        email: email.trim(),
        source: 'clarity-assessment',
        'bot-field': '',
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="no-print card p-6 sm:p-8" aria-labelledby={`${id}-h`}>
      <h3 id={`${id}-h`} className="text-xl font-semibold">
        Want more practical tips? <span className="text-ink-600">(Optional)</span>
      </h3>
      <p className="mt-2 text-ink-700">
        Get occasional emails from FINCH with bookkeeping tips and new tools. Your results above are yours either way.
      </p>
      {status === 'success' ? (
        <p role="status" className="mt-5 rounded-xl bg-ink-50 p-4 font-medium text-ink-900">
          Thanks! You're on the list.
        </p>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-start">
          <div className="flex-1">
            <label htmlFor={`${id}-email`} className="sr-only">
              Email address
            </label>
            <input
              id={`${id}-email`}
              type="email"
              autoComplete="email"
              placeholder="you@yourbusiness.com"
              className="field-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `${id}-err` : undefined}
            />
            {error && (
              <p id={`${id}-err`} className="mt-1.5 text-sm text-red-700">
                {error}
              </p>
            )}
          </div>
          <Button type="submit" variant="primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Signing up…' : 'Sign up'}
          </Button>
        </form>
      )}
      {status === 'error' && (
        <p role="alert" className="mt-3 text-sm text-red-700">
          Something went wrong. Please try again, or email {site.email}.
        </p>
      )}
    </section>
  );
}
