/**
 * MarketingRessources — Hub "Ressources" du site marketing TLS
 *
 * Route : /marketing/ressources
 * Liens internes : /marketing/magazine (articles), /marketing/equipe, /marketing/methode
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Users, Compass, ArrowRight, Library, Award } from 'lucide-react';
import { FadeInWhenVisible, MagneticButton } from '../../components/marketing/motion';
import { Button } from '../../components/core/Button';
import { SEOHead } from './components/SEOHead';
import { DOSSIERS } from '../../data/marketingDossiers';

const CARDS = [
  {
    to: '/marketing/magazine',
    icon: <Newspaper size={22} className="text-primary-700" />,
    iconBg: 'bg-primary-50 border-primary-100',
    title: 'Magazine',
    desc: "Articles, analyses et tendances EdTech. IA pédagogique, compétences, transformation L&D.",
    cta: 'Lire les articles',
    tone: 'primary' as const,
  },
  {
    to: '/marketing/methode',
    icon: <Compass size={22} className="text-secondary-700" />,
    iconBg: 'bg-secondary-50 border-secondary-100',
    title: 'Méthode STRIDE',
    desc: "Notre cadre de transformation pédagogique. Six étapes, pensées pour durer.",
    cta: 'Découvrir STRIDE',
    tone: 'warm' as const,
  },
  {
    to: '/marketing/equipe',
    icon: <Users size={22} className="text-accent-500" />,
    iconBg: 'bg-accent-50 border-accent-100',
    title: "L'équipe",
    desc: "Qui sommes-nous. Pierre-Armand Dennery et Chloé Mimault, co-fondateurs de TLS depuis 2022.",
    cta: "Voir l'équipe",
    tone: 'sun' as const,
  },
];

export const MarketingRessources: React.FC = () => {
  const featured = DOSSIERS.find((d) => d.featured) ?? DOSSIERS[0];

  return (
    <div className="bg-white">
      <SEOHead
        title="Ressources · Magazine, Méthode STRIDE, Équipe TLS"
        description="Dossiers de fond, articles EdTech, présentation de la méthode STRIDE et de l'équipe The Learning Society. Toutes nos ressources libres d'accès."
        canonical="/marketing/ressources"
      />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-page overflow-hidden bg-gradient-to-b from-primary-50/40 via-white to-white">
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-pill bg-primary-100/50 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-pill bg-accent-50/60 blur-3xl" />
        </div>

        <FadeInWhenVisible direction="up">
          <div className="relative max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
            <span className="inline-flex items-center gap-stack-xs px-3 py-1.5 rounded-pill bg-white border border-ink-100 shadow-xs">
              <Library size={14} className="text-primary-600" />
              <span className="font-body text-caption font-semibold text-ink-700 tracking-wider uppercase">
                Ressources libres d'accès
              </span>
            </span>

            <h1 className="font-display font-extrabold text-ink-900 leading-[0.97] tracking-tight m-0 text-[clamp(2.75rem,7vw,5.5rem)] max-w-4xl">
              Tout pour nourrir{' '}
              <span className="text-primary-600">votre réflexion</span>.
            </h1>

            <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl">
              Articles, méthode STRIDE, dossiers de fond. On documente ce qu'on apprend
              pour que vous n'ayez pas à le réinventer.
            </p>
          </div>
        </FadeInWhenVisible>
      </section>

      {/* ── Dossier à la une ───────────────────────────────────────────────── */}
      {featured && (
        <section className="py-section bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <FadeInWhenVisible direction="up">
              <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest mb-stack-lg block">
                Dossier à la une
              </span>
              <Link
                to={`/dossiers/${featured.slug}`}
                className="group block rounded-3xl overflow-hidden border border-ink-100 bg-white shadow-card hover:shadow-card-hover hover:border-primary-200 transition-all duration-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className={`relative min-h-[200px] bg-gradient-to-br ${featured.cover} p-8 flex items-end`}>
                    <span className="inline-flex items-center gap-tight px-3 py-1.5 rounded-pill bg-white/85 backdrop-blur-glass-light text-ink-800 font-body text-caption font-bold">
                      <Award size={13} /> {featured.sourceCount} sources · {featured.readTime}
                    </span>
                  </div>
                  <div className="p-8 flex flex-col justify-center gap-stack">
                    <h2 className="font-display text-h3 font-bold text-ink-900 leading-tight m-0 group-hover:text-primary-700 transition-colors duration-base">
                      {featured.title}
                    </h2>
                    <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">{featured.summary}</p>
                    <span className="inline-flex items-center gap-tight font-body text-body-sm font-semibold text-primary-700">
                      Lire le dossier
                      <ArrowRight size={16} className="transition-transform duration-base group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </FadeInWhenVisible>
          </div>
        </section>
      )}

      {/* ── Cards hub ──────────────────────────────────────────────────────── */}
      <section className="py-page bg-gradient-to-b from-white to-primary-50/20">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-section">
          <FadeInWhenVisible direction="up">
            <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
              Explorer par sujet.
            </h2>
          </FadeInWhenVisible>

          <div className="grid gap-stack-lg sm:grid-cols-3">
            {CARDS.map((c, i) => (
              <FadeInWhenVisible key={c.to} direction="up" delay={i * 0.07}>
                <Link
                  to={c.to}
                  className="group flex flex-col rounded-3xl border border-ink-100 bg-white p-stack-lg gap-stack-lg transition-all duration-base hover:shadow-card-hover hover:-translate-y-1 hover:border-primary-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                >
                  <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border ${c.iconBg}`}>
                    {c.icon}
                  </span>
                  <div className="flex flex-col gap-stack flex-1">
                    <h3 className="font-display text-h4 font-extrabold text-ink-900 leading-tight m-0 flex items-center gap-stack-xs">
                      {c.title}
                      <ArrowRight
                        size={16}
                        className="text-ink-300 transition-transform duration-base group-hover:translate-x-1 group-hover:text-primary-500"
                      />
                    </h3>
                    <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0 flex-1">
                      {c.desc}
                    </p>
                  </div>
                  <span className="font-body text-body-sm font-semibold text-primary-700 mt-auto">
                    {c.cta}
                  </span>
                </Link>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA section ────────────────────────────────────────────────────── */}
      <section className="py-page bg-white border-t border-ink-100">
        <FadeInWhenVisible direction="up" className="max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
            Prêt à passer à l'action ?
          </h2>
          <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-xl">
            La formation certifiante, la plateforme Learning App ou une mission STRIDE —
            parlons de votre contexte.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-stack-xs">
            <MagneticButton strength={12}>
              <Link to="/marketing/contact">
                <Button variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                  Nous contacter
                </Button>
              </Link>
            </MagneticButton>
            <Link to="/marketing/formation">
              <Button variant="secondary" size="lg">
                Voir la formation
              </Button>
            </Link>
          </div>
        </FadeInWhenVisible>
      </section>
    </div>
  );
};

export default MarketingRessources;
