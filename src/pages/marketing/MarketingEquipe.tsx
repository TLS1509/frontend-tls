/**
 * MarketingEquipe — Team / About us — Premium Minimal (redesign)
 *
 * Direction: human, warm, founder-forward.
 * Suppression: MeshGradientBg, ParallaxLayer, GradientText.
 * Accents accent-400 sur 1-2 mots, fonds blanc/primary-50.
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Heart,
  Compass,
  BookOpen,
  Shield,
  Quote,
  Users,
  MapPin,
  Calendar,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import {
  FadeInWhenVisible,
  MagneticButton,
  CountUp,
  TiltCard,
} from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';

const TEAM = [
  {
    name: 'Chloé Mimault-Talagrand',
    initials: 'CM',
    role: 'Co-fondatrice · Managing Director',
    bio: "Pilote la stratégie, le développement commercial et les opérations de TLS. Construit la marque et les partenariats avec l'exigence que la transformation pédagogique mérite.",
    expertise: ['Stratégie', 'Développement', 'Opérations'],
  },
  {
    name: 'Pierre-Armand Dennery',
    initials: 'PAD',
    role: 'Co-fondateur · Directeur associé',
    bio: "15 ans en ingénierie pédagogique et transformation L&D. Architecte de la méthode STRIDE, il pilote la vision pédagogique, les missions clients et le développement de la Learning App.",
    expertise: ['Pédagogie IA', 'STRIDE', 'Transformation L&D'],
  },
];

const VALUES = [
  {
    icon: <Compass size={28} />,
    title: 'Pédagogie d\'abord',
    body: "L'outil sert l'intention, jamais l'inverse. Si une feature n'améliore pas l'apprentissage profond, on ne la livre pas.",
  },
  {
    icon: <Heart size={28} />,
    title: 'Présence augmentée, jamais remplacée',
    body: "Le formateur reste au centre. L'IA accélère, personnalise, libère du temps. Mais c'est l'humain qui transmet, accompagne, transforme.",
  },
  {
    icon: <Shield size={28} />,
    title: 'Éthique dans les fondations',
    body: "RGPD, biais algorithmiques : tout est intégré dès le design, jamais en patch. La confiance se construit, elle ne se promet pas.",
  },
  {
    icon: <BookOpen size={28} />,
    title: 'Apprendre en public',
    body: "On documente notre méthode, on partage nos erreurs, on publie nos référentiels Dreyfus et nos frameworks de compétences. La communauté apprend plus vite que les concurrents.",
  },
];

const TIMELINE = [
  { year: '2022', title: 'Fondation', desc: "Pierre-Armand Dennery et Chloé Mimault-Talagrand fondent The Learning Society (SAS, Paris 14e)." },
  { year: '2025', title: 'Premier parcours certifiant', desc: 'Lancement de la formation Formateur Augmenté par l\'IA (7 modules), en partenariat avec C-Campus. Open Badge reconnu sur LinkedIn, prise en charge OPCO éligible selon secteur.' },
  { year: '2026', title: 'Learning App + écosystème', desc: "Beta de la plateforme. Premier client entreprise en production depuis janvier 2026." },
];

export const MarketingEquipe: React.FC = () => {
  return (
    <div className="bg-white">
      <SEOHead
        title="Qui sommes-nous · Fondateurs & vision"
        description="Pierre-Armand Dennery et Chloé Mimault, co-fondateurs de The Learning Society. Experts pédagogie IA et transformation L&D — Paris, fondée en 2022."
        canonical="/website/equipe"
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-page overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900">
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-pill bg-primary-500/25 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-pill bg-secondary-500/10 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <FadeInWhenVisible direction="up">
            <span className="inline-flex items-center gap-stack-xs px-3 py-1.5 rounded-pill bg-white/15 border border-white/25 backdrop-blur-glass-light shadow-xs">
              <Users size={14} className="text-accent-400" />
              <span className="font-body text-caption font-semibold text-white tracking-wider uppercase">
                La Dream Team
              </span>
            </span>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.1}>
            <h1 className="font-display font-extrabold text-white leading-[0.98] tracking-tight m-0 text-[clamp(2.75rem,7vw,5.5rem)] max-w-4xl">
              On est{' '}
              <span className="text-accent-400">pédagogues</span>,<br />
              augmentés par l'IA.
            </h1>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.2}>
            <p className="font-body text-body-lg text-white/85 leading-relaxed m-0 max-w-2xl">
              Des praticiens qui ont construit de vraies organisations apprenantes, qui les accompagnent au quotidien et transmettent ce qu'ils ont appris.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.25}>
            <p className="font-display text-[clamp(1.1rem,2.5vw,1.5rem)] font-bold text-accent-400 leading-snug m-0 max-w-xl italic">
              « Pour que la formation se prouve sur le terrain. »
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-stack-lg pt-stack">
              <div className="flex items-center gap-stack-xs">
                <MapPin size={16} className="text-accent-400" />
                <span className="font-body text-body-sm text-white/85 font-semibold">Paris, France</span>
              </div>
              <div className="flex items-center gap-stack-xs">
                <Calendar size={16} className="text-accent-400" />
                <span className="font-body text-body-sm text-white/85 font-semibold">Fondée en 2022</span>
              </div>
              <div className="flex items-center gap-stack-xs">
                <Users size={16} className="text-accent-400" />
                <span className="font-body text-body-sm text-white/85 font-semibold">
                  <CountUp to={2} className="font-bold text-white" /> co-fondateurs
                </span>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── Manifesto / Values ────────────────────────────────────────────── */}
      <section className="py-page bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-section">
          <div className="flex flex-col gap-stack max-w-3xl">
            <FadeInWhenVisible direction="up">
              <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
                Notre manifeste
              </span>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Quatre convictions{' '}
                <span className="text-accent-400">qui nous guident</span>.
              </h2>
            </FadeInWhenVisible>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
            {VALUES.map((v, i) => (
              <FadeInWhenVisible key={v.title} direction="up" delay={i * 0.1}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className="h-full rounded-3xl bg-gradient-to-br from-white to-primary-50/30 border border-primary-100 p-stack-lg flex flex-col gap-stack-lg shadow-sm hover:shadow-xl hover:border-primary-200 transition-shadow duration-base"
                >
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-100 border border-primary-200 text-primary-700">
                    {v.icon}
                  </span>
                  <h3 className="font-display text-h3 font-extrabold text-ink-900 leading-tight m-0">
                    {v.title}
                  </h3>
                  <p className="font-body text-body text-ink-600 leading-relaxed m-0">
                    {v.body}
                  </p>
                </motion.article>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team grid ─────────────────────────────────────────────────────── */}
      <section className="py-page bg-gradient-to-b from-white via-primary-50/20 to-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-section">
          <div className="flex flex-col gap-stack max-w-3xl">
            <FadeInWhenVisible direction="up">
              <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
                L'équipe
              </span>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Les humains derrière TLS.
              </h2>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.1}>
              <p className="font-body text-caption text-ink-400 italic m-0">
                Portraits professionnels à venir.
              </p>
            </FadeInWhenVisible>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-lg max-w-3xl">
            {TEAM.map((m, i) => (
              <FadeInWhenVisible key={m.name} direction="up" delay={i * 0.08}>
                <TiltCard maxRotation={6} className="h-full">
                  <motion.article
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    className="h-full rounded-3xl bg-white border border-ink-100 overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:border-primary-200 transition-shadow duration-base"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                      <span className="font-display text-[clamp(3rem,8vw,5rem)] font-extrabold text-primary-400 select-none">
                        {m.initials}
                      </span>
                    </div>
                    <div className="p-stack-lg flex flex-col gap-stack flex-1">
                      <div className="flex flex-col gap-0.5">
                        <h3 className="font-display text-h4 font-extrabold text-ink-900 leading-tight m-0">
                          {m.name}
                        </h3>
                        <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-wider">
                          {m.role}
                        </span>
                      </div>
                      <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0 flex-1">
                        {m.bio}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-stack border-t border-ink-100">
                        {m.expertise.map((e) => (
                          <span
                            key={e}
                            className="inline-flex items-center px-2 py-0.5 rounded-pill bg-ink-50 text-ink-700 font-body text-micro font-semibold"
                          >
                            {e}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                </TiltCard>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────────────────── */}
      <section className="py-page bg-white">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-section">
          <div className="flex flex-col gap-stack max-w-3xl">
            <FadeInWhenVisible direction="up">
              <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
                Notre histoire
              </span>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Depuis 2022, trois étapes.
              </h2>
            </FadeInWhenVisible>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-stack-lg">
            <div
              aria-hidden
              className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-primary-200 via-primary-300 to-primary-200"
            />
            {TIMELINE.map((t, i) => (
              <FadeInWhenVisible key={t.year} direction="up" delay={i * 0.15}>
                <div className="relative flex flex-col gap-stack-lg">
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ type: 'spring', stiffness: 240, damping: 16, delay: i * 0.15 }}
                    className="relative inline-flex items-center justify-center w-20 h-20 rounded-pill bg-primary-100 border-2 border-primary-600 text-primary-700 font-display font-extrabold text-h4 ring-8 ring-white"
                  >
                    {t.year}
                  </motion.span>
                  <div className="flex flex-col gap-stack">
                    <h3 className="font-display text-h3 font-extrabold text-ink-900 leading-tight m-0">
                      {t.title}
                    </h3>
                    <p className="font-body text-body text-ink-600 leading-relaxed m-0">{t.desc}</p>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA — brand gradient ──────────────────────────────────────────── */}
      <section className="py-page bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-pill bg-primary-500/25 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 flex flex-col items-center">
          <FadeInWhenVisible direction="up">
            <div className="w-full rounded-3xl bg-white/10 backdrop-blur-glass-heavy border border-white/20 shadow-2xl p-section-lg flex flex-col items-center text-center gap-stack-lg">
              <Quote size={36} className="text-accent-400" />
              <blockquote className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-medium text-white leading-snug m-0 max-w-3xl italic">
                "On ne forme pas pour transmettre du contenu.
                On forme pour transformer des gens."
              </blockquote>
              <p className="font-body text-body text-white/60 m-0">L'équipe TLS, Paris</p>
              <div className="flex flex-wrap items-center justify-center gap-stack-xs pt-stack">
                <MagneticButton strength={12}>
                  <Link to="/website/contact">
                    <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                      Échanger avec nous
                    </Button>
                  </Link>
                </MagneticButton>
                <Link to="/website/methode">
                  <Button variant="glass" size="lg" trailingIcon={<Sparkles size={16} />}>
                    Découvrir notre méthode
                  </Button>
                </Link>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default MarketingEquipe;
