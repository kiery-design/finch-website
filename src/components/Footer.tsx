import { Link } from 'react-router-dom';
import { navLinks, site } from '../config/site';
import Logo from './Logo';

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = Object.entries(site.social).filter(([, url]) => url);

  return (
    <footer className="bg-ink-950 text-cream-200">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo inverted />
          <p className="mt-4 max-w-sm leading-relaxed text-cream-200/80">
            Bookkeeping and practical business tools for owners who'd rather be running the business.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-5 inline-block font-medium text-finch-300 underline-offset-4 hover:underline"
          >
            {site.email}
          </a>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-sans text-sm font-semibold tracking-wider text-cream-50 uppercase">Explore</h2>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-cream-200/85 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-sm font-semibold tracking-wider text-cream-50 uppercase">Start here</h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link to="/free-tools" className="text-cream-200/85 hover:text-white">
                Business Clarity Assessment
              </Link>
            </li>
            <li>
              <Link to="/contact?topic=bookkeeping" className="text-cream-200/85 hover:text-white">
                Talk to us about your books
              </Link>
            </li>
            {socials.map(([name, url]) => (
              <li key={name}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="capitalize text-cream-200/85 hover:text-white">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-cream-200/60 sm:flex-row sm:justify-between">
          <p>© {year} FINCH. All rights reserved.</p>
          <p>The tools and content on this site are for general information only. They are not tax, legal, or investment advice.</p>
        </div>
      </div>
    </footer>
  );
}
