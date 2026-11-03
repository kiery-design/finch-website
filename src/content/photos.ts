/**
 * Site photography
 * ------------------------------------------------------------------
 * Each photo spot on the site is listed here. To add a photo:
 *   1. Put optimized files in /public/images/ named  <name>-800.webp, <name>-1600.webp
 *      and <name>-1600.jpg  (see README → "Adding photos")
 *   2. Set `src: '/images/<name>'` below (no extension).
 *
 * While `src` is empty, the live site quietly uses its photo-free layout.
 * In local development (`npm run dev`) a labeled placeholder shows instead,
 * so you can see where each photo will go.
 *
 * Only use photos you have the right to use (e.g. Unsplash License, Pexels
 * License, or your own). Record the source in `credit` for your records.
 */

export type PhotoSlot = {
  src?: string;
  alt: string;
  /** What the photo should show. Shown on the dev placeholder. */
  brief: string;
  /** Warm tone shown behind the photo while it loads. */
  tone: string;
  /** CSS object-position, e.g. 'center', '30% 50%' */
  position?: string;
  credit?: { name: string; url: string; license: string };
};

export const photos = {
  homeHero: {
    src: '/images/home-hero',
    alt: 'A laptop showing the FINCH website on a wooden desk, with a coffee mug, a plant, and a notebook nearby',
    brief: 'Laptop on oak desk, morning window light, coffee + notebook + greenery',
    tone: '#c7a47b',
    position: '18% 50%',
  },
  homeBookkeeping: {
    src: '/images/bookkeeping-papers',
    alt: 'Financial printouts, a pen, a calculator, and folders on a desk',
    brief: 'Tidy desk: notebook, calculator, folders',
    tone: '#d8c7ab',
    position: '55% 60%',
  },
  homeDigital: {
    src: '/images/reports-desk',
    alt: 'A notebook, a phone calculator, and printed charts on a desk in front of a laptop',
    brief: 'Tablet or laptop on a desk, calm and minimal',
    tone: '#c9cfc0',
    position: '50% 65%',
  },
  homeCta: {
    src: '',
    alt: 'A sunlit workspace with a plant by the window',
    brief: 'Sunlit workspace, plant by the window',
    tone: '#b9c2b0',
  },
  bookkeepingHero: {
    src: '/images/reports-desk',
    alt: 'A notebook, a phone calculator, and printed charts on a desk in front of a laptop',
    brief: 'Calm, organized desk detail',
    tone: '#d8c7ab',
    position: '45% 60%',
  },
  freeToolsHero: {
    src: '/images/coffee-desk',
    alt: 'A cup of coffee, a plant, and an open notebook on a wooden desk',
    brief: 'Coffee + open notebook, inviting',
    tone: '#e6d6bd',
    position: '40% 50%',
  },
  aboutHero: {
    src: '/images/founder-portrait',
    alt: "Portrait of FINCH's founder in a cozy home office",
    brief: 'Warm workspace, or a portrait of the founder',
    tone: '#cdbb9c',
    position: '50% 30%',
  },
  contactHero: {
    src: '',
    alt: 'A desk by a window with a mug and a notebook',
    brief: 'Desk by a window with a mug',
    tone: '#d9cbb3',
  },
} satisfies Record<string, PhotoSlot>;

export type PhotoName = keyof typeof photos;
