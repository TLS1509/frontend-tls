import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const VARIANTS = [
  { path: '/marketing', label: 'A — Fond page', exact: true },
  { path: '/marketing/hero-b', label: 'B — Cinematic' },
  { path: '/marketing/hero-c', label: 'C — Aquarelle scroll' },
];

export const VariantSwitcher: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-3 py-2 rounded-pill bg-ink-900/85 backdrop-blur-sm border border-white/10 shadow-lg">
      <span className="text-white/40 text-micro font-semibold pr-2 border-r border-white/10 mr-1">
        Variante
      </span>
      {VARIANTS.map(({ path, label, exact }) => {
        const isActive = exact ? pathname === '/marketing' : pathname === path;
        return (
          <Link key={path} to={path}>
            <span
              className={`px-3 py-1 rounded-pill text-micro font-semibold transition-all cursor-pointer select-none ${
                isActive
                  ? 'bg-white text-ink-900'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};
