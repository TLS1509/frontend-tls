/**
 * MarketingEquipe : Team / About us (Phase P3.4)
 *
 * Direction: human, warm, founder-forward. Inspired by article "Sous le capot de la Dream Team".
 * Tone: warm dominant + brand accents.
 *
 * ⚠️ PLACEHOLDER CONTENT : team members are fictional placeholders.
 * Replace TEAM array, VALUES quotes, and FOUNDER_STORY with real data before production.
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
  MeshGradientBg,
  FadeInWhenVisible,
  ParallaxLayer,
  MagneticButton,
  GradientText,
  CountUp,
  TiltCard,
} from '../../components/marketing/motion';

// ⚠️ PLACEHOLDER : équipe fictive. Remplacer par les vrais membres avant production.
const TEAM = [
  {
    name: 'Alex Renaudin',
    role: 'Fondateur · Pédagogie augmentée',
    bio: "15 ans en ingénierie pédagogique. A piloté des transformations L&D chez 3 groupes du CAC 40 avant de fonder TLS.",
    portrait:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop',
    expertise: ['Pédagogie', 'Stratégie IA', 'Conduite du changement'],
    accent: 'from-primary-500 to-primary-700',
  },
  {
    name: 'Sarah Chen',
    role: 'Directrice Pédagogique · Conception IA',
    bio: 'Ancienne head of L&D dans la tech. Spécialiste de la conception de parcours blended-IA et de l\'évaluation par compétences.',
    portrait:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80&auto=format&fit=crop',
    expertise: ['Ingénierie péda', 'Open Badges', 'STRIDE'],
    accent: 'from-secondary-500 to-secondary-600',
  },
  {
    name: 'Karim Benazi',
    role: 'Lead Coach · Accompagnement',
    bio: "Coach pro certifié, 12 ans d'expérience. Anime nos communautés de pratique et nos cohortes certifiantes.",
    portrait:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&auto=format&fit=crop',
    expertise: ['Coaching 1-1', 'Facilitation', 'Mentorat'],
    accent: 'from-accent-400 to-secondary-500',
  },
  {
    name: 'Léa Marchetti',
    role: 'Product & IA · Learning App',
    bio: "Designer-développeuse, elle pilote la Learning App. Passionnée par les interfaces qui rendent l'apprentissage tangible.",
    portrait:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop',
    expertise: ['Product', 'UX', 'IA appliquée'],
    accent: 'from-primary-400 to-accent-400',
  },
  {
    name: 'Marc Daviau',
    role: 'Conseil & Stratégie · Grand compte',
    bio: 'Ex-consultant stratégie. Accompagne nos clients grands comptes sur leurs feuilles de route IA & formation.',
    portrait:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop',
    expertise: ['Stratégie', 'Diagnostic', 'Gouvernance'],
    accent: 'from-secondary-400 to-secondary-600',
  },
  {
    name: 'Sophie Martin',
    role: 'Recherche & Éthique IA',
    bio: "Veille active sur l'AI Act, la RGPD pédagogique et les biais algorithmiques. Conscience éthique de l'équipe.",
    portrait:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80&auto=format&fit=crop',
    expertise: ['Éthique IA', 'Conformité', 'Recherche'],
    accent: 'from-accent-400 to-primary-500',
  },
];

const VALUES = [
  {
    icon: <Compass size={28} />,
    title: 'Pédagogie d\'abord',
    body: "L'outil sert l'intention, jamais l'inverse. Si une feature n'améliore pas l'apprentissage profond, on ne la livre pas.",
    tone: 'from-primary-500 to-primary-700',
  },
  {
    icon: <Heart size={28} />,
    title: 'Présence augmentée, jamais remplacée',
    body: "Le formateur reste au centre. L'IA accélère, personnalise, libère du temps. Mais c'est l'humain qui transmet, accompagne, transforme.",
    tone: 'from-secondary-500 to-secondary-600',
  },
  {
    icon: <Shield size={28} />,
    title: 'Éthique dans les fondations',
    body: "RGPD, AI Act, biais algorithmiques : tout est intégré dès le design, jamais en patch. La confiance se construit, elle ne se promet pas.",
    tone: 'from-accent-400 to-secondary-500',
  },
  {
    icon: <BookOpen size={28} />,
    title: 'Apprendre en public',
    body: "On documente notre méthode, on partage nos erreurs, on publie nos référentiels. La communauté apprend plus vite que les concurrents.",
    tone: 'from-primary-400 to-accent-400',
  },
];

const TIMELINE = [
  { year: '2024', title: 'Naissance', desc: "Alex fonde TLS après 15 ans en L&D. Premier diagnostic chez un groupe industriel." },
  { year: '2025', title: 'Premier parcours certifiant', desc: 'Lancement de la formation Formateur Augmenté en partenariat avec C-Campus.' },
  { year: '2026', title: 'Learning App + écosystème', desc: 'Beta de la plateforme. 200+ formateurs certifiés, 40+ organisations accompagnées.' },
];

export const MarketingEquipe: React.FC = () => {
  return (
    <div className="bg-white">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-page overflow-hidden bg-gradient-to-br from-secondary-50 via-white to-accent-50/40">
        <MeshGradientBg tone="warm" intensity="subtle" />
        <ParallaxLayer amplitude={50} className="absolute top-1/3 -right-32 pointer-events-none" aria-hidden>
          <div className="w-80 h-80 rounded-pill bg-secondary-200/30 blur-3xl" />
        </ParallaxLayer>

        <div className="relative max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <FadeInWhenVisible direction="up">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-white border border-secondary-200 shadow-xs">
              <Users size={14} className="text-secondary-600" />
              <span className="font-body text-caption font-semibold text-secondary-700 tracking-wider uppercase">
                La Dream Team
              </span>
            </span>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.1}>
            <h1 className="font-display font-extrabold text-ink-900 leading-[0.98] tracking-tight m-0 text-[clamp(2.75rem,7vw,5.5rem)] max-w-4xl">
              On est{' '}
              <GradientText
                from="from-secondary-500"
                via="via-secondary-600"
                to="to-accent-500"
                duration={10}
              >
                pédagogues
              </GradientText>
              ,<br />
              augmentés par l'IA.
            </h1>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.2}>
            <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0 max-w-2xl">
              Une équipe d'experts en pédagogie, en IA appliquée et en accompagnement.
              Pas des consultants déconnectés. Des praticiens qui ont fait, qui font, et qui transmettent.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-stack-lg pt-stack">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-secondary-600" />
                <span className="font-body text-body-sm text-ink-700 font-semibold">Paris, France</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-secondary-600" />
                <span className="font-body text-body-sm text-ink-700 font-semibold">Fondée en 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-secondary-600" />
                <span className="font-body text-body-sm text-ink-700 font-semibold">
                  <CountUp to={6} className="font-bold" /> personnes
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
                <GradientText>qui nous guident</GradientText>.
              </h2>
            </FadeInWhenVisible>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
            {VALUES.map((v, i) => (
              <FadeInWhenVisible key={v.title} direction="up" delay={i * 0.1}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className="h-full rounded-3xl bg-white border border-ink-100 p-stack-lg flex flex-col gap-stack-lg shadow-sm hover:shadow-xl transition-shadow duration-base"
                >
                  <span
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${v.tone} text-white shadow-md`}
                  >
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
      <section className="py-page bg-gradient-to-b from-white via-secondary-50/30 to-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-section">
          <div className="flex flex-col gap-stack max-w-3xl">
            <FadeInWhenVisible direction="up">
              <span className="font-body text-caption font-bold text-secondary-600 uppercase tracking-widest">
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
                Présentation illustrative : la composition réelle de l'équipe sera publiée prochainement.
              </p>
            </FadeInWhenVisible>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-stack-lg">
            {TEAM.map((m, i) => (
              <FadeInWhenVisible key={m.name} direction="up" delay={i * 0.08}>
                <TiltCard maxRotation={6} className="h-full">
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className="h-full rounded-3xl bg-white border border-ink-100 overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:border-secondary-200 transition-shadow duration-base"
                >
                  <div className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br ${m.accent}`}>
                    <img
                      src={m.portrait}
                      alt={m.name}
                      className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-90"
                      loading="lazy"
                    />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-transparent" />
                  </div>
                  <div className="p-stack-lg flex flex-col gap-stack flex-1">
                    <div className="flex flex-col gap-0.5">
                      <h3 className="font-display text-h4 font-extrabold text-ink-900 leading-tight m-0">
                        {m.name}
                      </h3>
                      <span className="font-body text-caption font-bold text-secondary-700 uppercase tracking-wider">
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
              <span className="font-body text-caption font-bold text-warning-fg uppercase tracking-widest">
                Notre histoire
              </span>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Trois ans, trois étapes.
              </h2>
            </FadeInWhenVisible>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-stack-lg">
            <div
              aria-hidden
              className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-primary-300 via-secondary-300 to-accent-400"
            />
            {TIMELINE.map((t, i) => (
              <FadeInWhenVisible key={t.year} direction="up" delay={i * 0.15}>
                <div className="relative flex flex-col gap-stack-lg">
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ type: 'spring', stiffness: 240, damping: 16, delay: i * 0.15 }}
                    className="relative inline-flex items-center justify-center w-24 h-24 rounded-pill bg-gradient-to-br from-secondary-500 to-secondary-600 text-white font-display font-extrabold text-h3 shadow-xl ring-8 ring-white"
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

      {/* ── CTA : Rejoignez-nous ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-page bg-gradient-to-br from-ink-900 via-primary-900 to-ink-900">
        <MeshGradientBg tone="ink" intensity="intense" />
        <div className="relative max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <FadeInWhenVisible direction="up">
            <Quote size={36} className="text-accent-400" />
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.05}>
            <blockquote className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-medium text-white leading-snug m-0 max-w-3xl italic">
              "On ne forme pas pour transmettre du contenu.
              On forme pour transformer des gens."
            </blockquote>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.15}>
            <p className="font-body text-body text-white/70 m-0">: L'équipe TLS, Paris ✨</p>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.25}>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-stack">
              <MagneticButton strength={14}>
                <Link to="/marketing/contact">
                  <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                    Échanger avec nous
                  </Button>
                </Link>
              </MagneticButton>
              <Link to="/marketing/methode">
                <Button
                  variant="ghost"
                  size="lg"
                  trailingIcon={<Sparkles size={16} />}
                  className="!text-white hover:!bg-white/10 !border !border-white/30"
                >
                  Découvrir notre méthode
                </Button>
              </Link>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
};

export default MarketingEquipe;
