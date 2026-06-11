/**
 * MarketingDossiers : index des dossiers (contenus de fond, sourcés).
 * Lane light + warm, DS TLS, reveal local visible-par-défaut, pas de GradientText.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Library } from 'lucide-react';
import { MeshGradientBg } from '../../components/marketing/motion';
import { DOSSIERS } from '../../data/marketingDossiers';

const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className,
}) => (
  <motion.div
    className={className}
    initial={{ y: 26 }}
    whileInView={{ y: 0 }}
    viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export const MarketingDossiers: React.FC = () => {
  const featured = DOSSIERS.find((d) => d.featured) ?? DOSSIERS[0];
  const rest = DOSSIERS.filter((d) => d.slug !== featured?.slug);

  return (
    <main className="bg-white">
      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-page overflow-hidden bg-gradient-to-br from-secondary-50 via-white to-accent-50/40">
        <MeshGradientBg tone="warm" intensity="subtle" />
        <div className="relative max-w-medium mx-auto px-6 flex flex-col gap-stack">
          <Reveal>
            <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
              Ressources · Dossiers
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display font-extrabold text-ink-900 leading-[1.0] tracking-tight m-0 text-[clamp(2.5rem,7vw,5rem)] max-w-4xl">
              Le fond, pas le bruit.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-body text-body-lg text-ink-600 max-w-2xl m-0">
              Des analyses longues et sourcées sur les compétences, l'IA et la transformation des
              organisations. Chaque dossier cite ses sources. Aucune donnée inventée.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Dossiers ────────────────────────────────────────────────────────── */}
      <section className="py-page bg-white">
        <div className="max-w-page mx-auto px-6 flex flex-col gap-section-lg">
          {/* Featured */}
          {featured && (
            <Reveal>
              <Link
                to={`/dossiers/${featured.slug}`}
                className="group block rounded-3xl overflow-hidden border border-ink-100 bg-white shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-base"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className={`relative min-h-[220px] bg-gradient-to-br ${featured.cover} p-section flex items-end`}>
                    <span className="inline-flex items-center px-3 py-1 rounded-pill bg-white/80 backdrop-blur-glass text-ink-800 font-body text-caption font-bold uppercase tracking-wider">
                      À la une
                    </span>
                  </div>
                  <div className="p-section lg:p-section-lg flex flex-col justify-center gap-stack">
                    <div className="flex items-center gap-stack flex-wrap font-body text-caption text-ink-500">
                      <span className="inline-flex items-center gap-1.5"><Calendar size={13} />{featured.date}</span>
                      <span className="inline-flex items-center gap-1.5"><Clock size={13} />{featured.readTime}</span>
                      <span className="inline-flex items-center gap-1.5"><Library size={13} />{featured.sourceCount} sources</span>
                    </div>
                    <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-ink-900 leading-[1.1] tracking-tight m-0 group-hover:text-primary-700 transition-colors duration-base">
                      {featured.title}
                    </h2>
                    <p className="font-body text-body text-ink-600 leading-relaxed m-0">
                      {featured.summary}
                    </p>
                    <span className="inline-flex items-center gap-1.5 font-body text-body-sm font-semibold text-primary-700 mt-1">
                      Lire le dossier
                      <ArrowRight size={16} className="transition-transform duration-base group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Rest */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stack">
              {rest.map((d, i) => (
                <Reveal key={d.slug} delay={i * 0.06}>
                  <Link to={`/dossiers/${d.slug}`} className="group block h-full">
                    <article className="h-full flex flex-col rounded-2xl overflow-hidden border border-ink-100 bg-white shadow-sm hover:shadow-lg hover:border-primary-200 transition-all duration-base">
                      <div className={`h-28 bg-gradient-to-br ${d.cover}`} />
                      <div className="p-stack-lg flex flex-col gap-stack flex-1">
                        <div className="flex items-center gap-stack flex-wrap font-body text-caption text-ink-500">
                          <span className="inline-flex items-center gap-1"><Clock size={11} />{d.readTime}</span>
                          <span className="inline-flex items-center gap-1"><Library size={11} />{d.sourceCount} sources</span>
                        </div>
                        <h3 className="font-display text-h4 font-bold text-ink-900 leading-tight m-0 group-hover:text-primary-700 transition-colors duration-fast">
                          {d.title}
                        </h3>
                        <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0 flex-1">
                          {d.summary}
                        </p>
                      </div>
                    </article>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default MarketingDossiers;
