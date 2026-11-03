import type { FormProvider } from '../config/site';

/**
 * Submit a form to the configured provider.
 * - 'netlify': posts URL-encoded data to "/" with form-name (Netlify Forms)
 * - 'endpoint': posts FormData to the given URL and expects a 2xx response
 * Throws on failure so the UI can show an error state.
 */
export async function submitForm(
  provider: FormProvider,
  endpoint: string,
  formName: string,
  data: Record<string, string>,
): Promise<void> {
  if (provider === 'netlify') {
    const body = new URLSearchParams({ 'form-name': formName, ...data }).toString();
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    if (!res.ok) throw new Error(`Form submission failed (${res.status})`);
    return;
  }

  if (provider === 'endpoint' && endpoint) {
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => fd.append(k, v));
    const res = await fetch(endpoint, { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`Form submission failed (${res.status})`);
    return;
  }

  throw new Error('No form provider is configured.');
}

/** Build a mailto: link with a pre-filled subject and body. */
export function buildMailto(to: string, subject: string, body: string): string {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
