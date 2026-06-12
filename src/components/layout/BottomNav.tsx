import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Map, PenLine, GraduationCap, BookOpenText } from 'lucide-react';

/**
 * BottomNav — primary mobile navigation (< md breakpoint).
 *
 * 5 tabs: Accueil · Parcours · Journal · Coaching · Veille
 * Fixed bottom, safe-area aware, glass surface.
 * Hidden on md+ (desktop uses Sidebar instead).
 */

interface Tab {
  label: string;
  icon: React.ElementType;
  href: string;
  match: string[];
}

const TABS: Tab[] = [
  {
    label: 'Accueil',
    icon: LayoutDashboard,
    href: '/',
    match: ['/', '/dashboard'],
  },
  {
    label: 'Parcours',
    icon: Map,
    href: '/learning-paths',
    match: ['/learning-paths', '/course', '/lesson'],
  },
  {
    label: 'Journal',
    icon: PenLine,
    href: '/journal',
    match: ['/journal'],
  },
  {
    label: 'Coaching',
    icon: GraduationCap,
    href: '/coaching',
    match: ['/coaching', '/coach'],
  },
  {
    label: 'Veille',
    icon: BookOpenText,
    href: '/veille',
    match: ['/veille', '/magazine', '/newsletter'],
  },
];

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (match: string[]) =>
    match.some((p) =>
      p === '/'
        ? location.pathname === '/'
        : location.pathname.startsWith(p)
    );

  return (
    <nav
      aria-label="Navigation principale"
      className={[
        'md:hidden',
        'fixed bottom-0 inset-x-0 z-sticky',
        'bg-white/95 backdrop-blur-glass-medium',
        'border-t border-ink-100',
        'shadow-[0_-2px_16px_rgba(0,0,0,0.06)]',
        'pb-safe-bottom',
      ].join(' ')}
    >
      <div className="flex items-stretch h-14">
        {TABS.map(({ label, icon: Icon, href, match }) => {
          const active = isActive(match);
          return (
            <button
              key={href}
              type="button"
              onClick={() => navigate(href)}
              aria-current={active ? 'page' : undefined}
              aria-label={label}
              className={[
                'flex-1 flex flex-col items-center justify-center gap-tight',
                'min-h-touch cursor-pointer transition-colors duration-fast',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                active ? 'text-primary-600' : 'text-ink-400 hover:text-ink-600',
              ].join(' ')}
            >
              <span
                className={[
                  'flex items-center justify-center w-12 h-6 rounded-pill transition-all duration-base',
                  active ? 'bg-primary-100' : 'bg-transparent',
                ].join(' ')}
              >
                <Icon
                  size={20}
                  strokeWidth={active ? 2.25 : 1.75}
                  aria-hidden="true"
                />
              </span>
              <span
                className={[
                  'font-body text-micro leading-none',
                  active ? 'font-semibold' : 'font-normal',
                ].join(' ')}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
