/**
 * FINCH site configuration
 * ------------------------------------------------------------------
 * This is the ONE file to edit when connecting outside services.
 * Every integration below is OFF by default. When a value is empty,
 * the site shows an honest fallback instead of pretending to work.
 *
 * Nothing here is secret. Do not put API keys in this file. Everything
 * in a Vite app ends up in the public JavaScript bundle.
 */

export type FormProvider =
  /** Not connected. The contact form opens the visitor's email app instead. */
  | 'none'
  /** Netlify Forms (free tier). Requires form detection enabled in Netlify. */
  | 'netlify'
  /** Any service that accepts a form POST and returns JSON (e.g. Formspree, Basin). */
  | 'endpoint';

export const site = {
  name: 'FINCH',
  url: 'https://workwithfinch.com',
  email: 'hello@workwithfinch.com',
  tagline: 'Financial clarity for small business owners.',

  /**
   * Your Stan Store URL, e.g. 'https://stan.store/yourhandle'.
   * Leave empty until ready. Shop buttons will read "Coming soon".
   */
  stanStoreUrl: '',

  /**
   * Optional scheduling link for consultations (Calendly, TidyCal, Google
   * appointment page, etc.). Leave empty to route people to the contact page.
   */
  bookingUrl: '',

  contactForm: {
    provider: 'none' as FormProvider,
    /** Only used when provider is 'endpoint'. */
    endpoint: '',
  },

  /**
   * Optional email signup on the Free Tools page. It stays hidden until it's configured.
   * provider 'endpoint' expects a URL that accepts a POST with an `email` field.
   */
  newsletter: {
    provider: 'none' as FormProvider,
    endpoint: '',
  },

  social: {
    instagram: '',
    linkedin: '',
  },
} as const;

export const integrations = {
  stanStore: site.stanStoreUrl.trim() !== '',
  booking: site.bookingUrl.trim() !== '',
  contactForm:
    site.contactForm.provider === 'netlify' ||
    (site.contactForm.provider === 'endpoint' && site.contactForm.endpoint.trim() !== ''),
  newsletter:
    site.newsletter.provider === 'netlify' ||
    (site.newsletter.provider === 'endpoint' && site.newsletter.endpoint.trim() !== ''),
};

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/bookkeeping', label: 'Bookkeeping' },
  { to: '/shop', label: 'Digital Shop' },
  { to: '/free-tools', label: 'Free Tools' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const;
