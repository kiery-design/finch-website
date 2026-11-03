import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navLinks } from '../config/site';
import { ButtonLink } from './Button';
import Icon from './Icon';
import Logo from './Logo';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu when the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Close with Escape and lock body scroll while the menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const desktopLinks = navLinks.filter((l) => l.to !== '/' && l.to !== '/contact');

  return (
    <header className="sticky top-0 z-40">
      {/* Blur lives on its own layer: backdrop-filter on <header> would trap the fixed mobile menu inside it. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 border-b border-cream-300/60 bg-cream-50/90 backdrop-blur supports-[backdrop-filter]:bg-cream-50/75"
      />
      <div className="container-page relative flex h-16 items-center justify-between gap-4">
        <Link to="/" className="rounded-lg" aria-label="FINCH home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {desktopLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-[0.95rem] font-medium transition ${
                      isActive ? 'bg-ink-100 text-ink-900' : 'text-ink-700 hover:bg-cream-200 hover:text-ink-900'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <ButtonLink to="/contact" variant="primary" className="!min-h-10 !px-5 !py-2 text-sm">
            Get in touch
          </ButtonLink>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-900 hover:bg-cream-200 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <Icon name={open ? 'close' : 'menu'} className="h-6 w-6" />
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-cream-300/60 bg-cream-50 lg:hidden"
        >
          <ul className="container-page flex flex-col py-4">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center justify-between border-b border-cream-200 py-4 font-display text-2xl ${
                      isActive ? 'text-finch-700' : 'text-ink-900'
                    }`
                  }
                >
                  {link.label}
                  <Icon name="arrowRight" className="h-5 w-5 opacity-50" />
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="container-page pb-10">
            <ButtonLink to="/free-tools" variant="accent" className="w-full">
              Take the 3-minute assessment
            </ButtonLink>
          </div>
        </nav>
      )}
    </header>
  );
}
