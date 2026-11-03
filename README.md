# FINCH Website (workwithfinch.com)

The official FINCH website: bookkeeping services and digital tools for small business owners.

Built with **React 19 + TypeScript + Vite + Tailwind CSS v4 + React Router**. It's a static site with no backend, no paid dependencies, and no API keys.

---

## What works today vs. what needs an outside service

| Feature | Status | Where to configure |
|---|---|---|
| All 6 pages, navigation, SEO titles & descriptions | ✅ Works | `src/components/Seo.tsx`, each page |
| Business Clarity Assessment (scoring + personalized recommendations) | ✅ Works fully in the browser, no email needed | `src/content/assessment.ts`, `src/lib/assessment.ts` |
| Print / save results as PDF | ✅ Works (browser print) | n/a |
| Contact form | ⚠️ **Not connected.** Opens the visitor's email app with the message pre-filled, and says so on the page | `site.contactForm` in `src/config/site.ts` |
| Optional email signup (after assessment) | ⚠️ **Hidden** until an email service is connected | `site.newsletter` in `src/config/site.ts` |
| Digital Shop "View on Stan Store" buttons | ⚠️ Show **Coming soon** until a Stan Store URL is added and products are marked non-placeholder | `site.stanStoreUrl`, `src/content/products.ts` |
| Consultation booking link | Optional. Without it, buttons go to the Contact page | `site.bookingUrl` |

When you run the site locally (`npm run dev`), dashed **"Dev note"** boxes show where integrations still need to be connected. They never appear on the live site.

---

## Run locally

Requires **Node.js 20.19+** (22 recommended; see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # type-check + production build into /dist
npm run preview    # serve the production build locally
npm run typecheck  # TypeScript only
```

---

## Push to GitHub

1. Create an empty repository on GitHub (e.g. `finch-website`). Don't add a README there.
2. In this project folder:

```bash
git init
git add .
git commit -m "Initial FINCH website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/finch-website.git
git push -u origin main
```

---

## Deploy to Netlify

1. Log in at [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project → GitHub**, and pick the repo.
2. Netlify reads `netlify.toml` automatically:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node 22, SPA redirects (so `/bookkeeping` works on refresh), security headers, and asset caching
3. Click **Deploy**. Every push to `main` redeploys automatically.

### Connect workwithfinch.com

1. Netlify → **Domain management → Add a domain** → `workwithfinch.com`.
2. Follow Netlify's DNS instructions at your domain registrar (either point nameservers to Netlify or add the A/CNAME records it shows).
3. HTTPS is provisioned automatically once DNS resolves.

---

## Connecting integrations later

All of these live in **`src/config/site.ts`**. Don't put secrets there, because everything in that file is public.

### Stan Store
```ts
stanStoreUrl: 'https://stan.store/your-handle',
```
Then in `src/content/products.ts`, for each real product set `placeholder: false` and optionally add `stanUrl` (a direct product link) and `price` (exactly as shown on Stan). Checkout always happens on Stan Store.

### Contact form: Netlify Forms (free tier)
1. In `site.ts`: `contactForm: { provider: 'netlify', endpoint: '' }`
2. In Netlify: **Site configuration → Forms → Enable form detection**, then redeploy. (`public/__forms.html` registers the form fields.)
3. Set up email notifications under **Forms → Form notifications**.
4. **Send a test message from the live site and confirm it arrives** before relying on it.

### Contact form: Formspree / Basin / similar
`contactForm: { provider: 'endpoint', endpoint: 'https://formspree.io/f/xxxxxxx' }`, then test on the live site.

### Email signup (Kit, MailerLite, Mailchimp, etc.)
Use `provider: 'netlify'` (collect into Netlify Forms, then export) or `provider: 'endpoint'` with a form URL that accepts a POST with an `email` field. Many providers have their own embed formats. You may need to adjust `src/lib/forms.ts` for a specific provider. Test before announcing.

### Booking link
`bookingUrl: 'https://calendly.com/...'` switches "Request a consultation" buttons to open your calendar.

---

## Editing content

| What | File |
|---|---|
| Bookkeeping services, who it's for, process steps, FAQs | `src/content/services.ts` |
| Shop products | `src/content/products.ts` |
| About page values + optional founder bio | `src/content/about.ts` (set `founder` to show a founder section) |
| Assessment questions, recommendations, result stages | `src/content/assessment.ts` |
| Colors & fonts | `@theme` block in `src/index.css` |
| Logo | `src/components/Logo.tsx` and `public/favicon.svg` |

**Content guardrails:** don't add testimonials, credentials, guarantees, pricing, or client results unless they're real and verified.

---

## Project structure

```
├── index.html               # Base HTML + default meta tags
├── netlify.toml             # Netlify build, redirects, headers
├── public/                  # favicon, robots.txt, sitemap.xml, Netlify form registration
└── src/
    ├── config/site.ts       # ← all integration settings
    ├── content/             # editable copy & data
    ├── lib/                 # assessment scoring, form submission helpers
    ├── components/          # Layout, Header, Footer, Button, Seo, etc.
    │   └── assessment/      # Assessment flow, results, optional email signup
    └── pages/               # Home, Bookkeeping, Shop, FreeTools, About, Contact, NotFound
```

## How the assessment works

- 1 profile question ("biggest challenge") + 12 scored questions (0–3 points each), 3 per area: Financial Visibility, Bookkeeping Habits, Systems & Operations, Confidence & Planning.
- Each area gets a percentage and a level (Needs attention < 40%, Developing < 70%, Strong).
- Recommendations come from rules in `src/lib/assessment.ts`. The visitor's biggest challenge leads (if it applies), followed by the weakest areas. Up to 4 are shown.
- Answers are kept only in the visitor's browser (`sessionStorage`) so a refresh doesn't lose progress. Nothing is sent anywhere.

## Notes & next steps

- **Social preview image:** add a 1200×630 `public/og-image.png` and an `og:image` tag in `index.html`.
- **Analytics (optional):** Netlify Analytics or a privacy-friendly option like Plausible can be added later.
- **Fonts** load from Google Fonts (Fraunces + Inter). To self-host, install `@fontsource` packages and remove the `<link>` in `index.html`.
- Page titles and descriptions are set per route in the browser. Google renders these. If you later need perfect link previews on every page, add prerendering.
