import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Users, Layers, BarChart3, ArrowRight, Calendar, Clock, Library } from 'lucide-react';
import { DOSSIERS } from '../../data/marketingDossiers';

/**
 * Hub Ressources: chapeaute Dossiers (fond, sourcé) + Blog (articles) + About us.
 * Clean restart 2026-06-10 ; enrichi 2026-06-10 avec les Dossiers (flagship = SBO).
 */

const CARDS = [
  {
    to: '/dossiers',
    icon: <Layers size={22} />,
    title: 'Dossiers',
    desc: 'Nos analyses de fond, longues et sourcées, sur les compétences et l’IA.',
  },
  {
    to: '/infographie-sbo',
    icon: <BarChart3 size={22} />,
    title: 'Infographie SBO',
    desc: 'Le passage du poste à la compétence, en version interactive et sourcée.',
  },
  {
    to: '/blog',
    icon: <Newspaper size={22} />,
    title: 'Blog',
    desc: "Nos articles sur l'IA, la pédagogie et la gestion des compétences.",
  },
  {
    to: '/about',
    icon: <Users size={22} />,
    title: 'About us',
    desc: "L'équipe, la mission et la vision de The Learning Society.",
  },
];

export const MarketingRessources: React.FC = () => {
  const featured = DOSSIERS.find((d) => d.featured) ?? DOSSIERS[0];

  return (
    <main className="pt-28 pb-24">
      <div className="max-w-medium mx-auto px-6">
        <header className="max-w-2xl mb-10">
          <p className="font-body text-body-sm font-semibold text-primary-600 mb-2">Ressources</p>
          <h1 className="font-display font-bold text-h1 text-ink-900 mb-4 text-balance">
            Tout pour nourrir votre réflexion.
          </h1>
          <p className="font-body text-body-lg text-ink-600">
            Dossiers de fond, articles et présentation de The Learning Society.
          </p>
        </header>

        {/* Dossier à la une */}
        {featured && (
          <Link
            to={`/dossiers/${featured.slug}`}
            className="group block rounded-3xl overflow-hidden border border-ink-100 bg-white shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-base mb-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className={`relative min-h-[180px] bg-gradient-to-br ${featured.cover} p-7 flex items-end`}>
                <span className="inline-flex items-center px-3 py-1 rounded-pill bg-white/80 backdrop-blur-glass text-ink-800 font-body text-caption font-bold uppercase tracking-wider">
                  Dossier à la une
                </span>
              </div>
              <div className="p-7 lg:p-8 flex flex-col justify-center gap-3">
                <div className="flex items-center gap-4 flex-wrap font-body text-caption text-ink-500">
                  <span className="inline-flex items-center gap-1.5"><Calendar size={13} />{featured.date}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock size={13} />{featured.readTime}</span>
                  <span className="inline-flex items-center gap-1.5"><Library size={13} />{featured.sourceCount} sources</span>
                </div>
                <h2 className="font-display text-h3 font-bold text-ink-900 leading-tight m-0 group-hover:text-primary-700 transition-colors duration-base">
                  {featured.title}
                </h2>
                <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">{featured.summary}</p>
                <span className="inline-flex items-center gap-1.5 font-body text-body-sm font-semibold text-primary-700 mt-1">
                  Lire le dossier
                  <ArrowRight size={16} className="transition-transform duration-base group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          {CARDS.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group rounded-2xl border border-ink-100 bg-white p-7 transition-all duration-base hover:shadow-md hover:-translate-y-1 hover:border-primary-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 text-primary-700 mb-5">
                {c.icon}
              </span>
              <h2 className="font-display font-bold text-h3 text-ink-900 mb-2 flex items-center gap-2">
                {c.title}
                <ArrowRight
                  size={18}
                  className="text-primary-500 transition-transform duration-base group-hover:translate-x-1"
                />
              </h2>
              <p className="font-body text-body text-ink-600">{c.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default MarketingRessources;
