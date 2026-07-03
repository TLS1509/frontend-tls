/**
 * AppLanding — Page de présentation + inscription à la learning app TLS.
 * Route publique : /inscription
 * Register : BRAND (marketing-tier) — design = produit sur cette surface.
 * Direction : C "Illustrated Glass" + B "le système qui se montre".
 * Craft : mesh-gradient + grain, reveal staggé (framer-motion), double-bezel
 *         signup card, button-in-button physics, InteractiveAppMockup live.
 * Réutilise les primitives motion de src/components/marketing/motion/.
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  BookOpen,
  CalendarCheck,
  Sparkles,
  ArrowRight,
  Check,
  Lightbulb,
  Brain,
  BadgeCheck,
  Users,
  MousePointerClick,
} from 'lucide-react';
import { TlsLogo } from '../components/ui/TlsLogo';
import { Button } from '../components/core/Button';
import {
  MeshGradientBg,
  NoiseTexture,
  MagneticButton,
  FadeInWhenVisible,
  InteractiveAppMockup,
  KineticHeadline,
  RevealMask,
  ScrollProgress,
} from '../components/marketing/motion';

/* ─── Types ───────────────────────────────────────────────────────────────── */

interface FeatureCard {
  icon: React.ReactNode;
  tone: 'brand' | 'warm' | 'sun';
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
}

interface Step {
  number: string;
  title: string;
  description: string;
}

interface Trust {
  icon: React.ReactNode;
  label: string;
}

/* ─── Data ────────────────────────────────────────────────────────────────── */

const FEATURES: FeatureCard[] = [
  {
    icon: <BookOpen size={22} />,
    tone: 'brand',
    eyebrow: 'Espace Parcours',
    title: 'Formez-vous sur vos cas réels',
    description: "Des parcours IA adaptatifs, pas des vidéos passives. Chaque leçon s'ancre dans un projet réel de votre organisation.",
    items: ['Parcours sur-mesure par compétence', 'Leçons courtes + exercices pratiques', 'Progression vérifiable et traçable'],
  },
  {
    icon: <CalendarCheck size={22} />,
    tone: 'warm',
    eyebrow: 'Espace Coaching',
    title: 'Un coach dédié, pas un chatbot',
    description: "Sessions 1:1 avec un expert qui corrige, oriente et accélère. L'IA prépare, l'humain accompagne.",
    items: ['Réservation en 2 clics', 'Corrections personnalisées', 'Feedback actionnable post-session'],
  },
  {
    icon: <Lightbulb size={22} />,
    tone: 'sun',
    eyebrow: 'Espace Réflexion',
    title: 'Capitalisez ce que vous apprenez',
    description: 'Journal de bord + Passeport de Compétences : chaque prise de conscience devient une preuve concrète de progression.',
    items: ["Journal d'apprentissage guidé", 'Passeport de Compétences', 'Validation sur projets réels'],
  },
];

const STEPS: Step[] = [
  {
    number: '01',
    title: 'Créez votre compte',
    description: 'Inscription en 2 minutes. Questionnaire de positionnement IA pour calibrer votre parcours.',
  },
  {
    number: '02',
    title: 'Commencez votre parcours',
    description: 'Leçons courtes, exercices pratiques, coaching 1:1 — tout aligné sur vos objectifs réels.',
  },
  {
    number: '03',
    title: 'Validez vos compétences',
    description: 'Passeport de Compétences, Open Badges, preuves exportables. La preuve de ce que vous savez faire.',
  },
];

// Preuves qualitatives — zéro métrique inventée (cf. brand-voice §11, non-négociable)
const TRUST: Trust[] = [
  { icon: <BadgeCheck size={16} />, label: 'RGPD · IA éthique' },
  { icon: <Users size={16} />, label: 'Coaching humain 1:1' },
  { icon: <Check size={16} />, label: 'Validé sur projets réels' },
];

/* ─── Tone maps ───────────────────────────────────────────────────────────── */

const FEATURE_TONE: Record<FeatureCard['tone'], { card: string; icon: string; eyebrow: string; bullet: string }> = {
  brand: {
    card: 'bg-primary-50 border border-primary-200',
    icon: 'bg-primary-100 text-primary-700',
    eyebrow: 'text-primary-600',
    bullet: 'text-primary-500',
  },
  warm: {
    card: 'bg-secondary-50 border border-secondary-200',
    icon: 'bg-secondary-100 text-secondary-600',
    eyebrow: 'text-secondary-600',
    bullet: 'text-secondary-500',
  },
  sun: {
    card: 'bg-accent-50 border border-accent-200',
    icon: 'bg-accent-100 text-accent-500',
    eyebrow: 'text-accent-500',
    bullet: 'text-accent-400',
  },
};

/* ─── Sub-components ──────────────────────────────────────────────────────── */

const Pill: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-pill font-body text-caption font-semibold ${className}`}>
    {children}
  </span>
);

/**
 * LandingCta — bouton marketing avec button-in-button (icône nichée dans son
 * propre cercle) + press physics. Self-contained à la landing (brand register).
 * tone="warm" : orange sur fond clair (hero). tone="gold" : jaune TLS sur fond sombre (CTA section).
 */
const LANDING_CTA_TONE = {
  warm: { btn: 'bg-secondary-500 hover:bg-secondary-600 shadow-warm-md text-white', icon: 'bg-white/20', focus: 'focus-visible:outline-white' },
  gold: { btn: 'bg-accent-400 hover:bg-accent-500 shadow-sun-sm text-ink-900', icon: 'bg-ink-900/10', focus: 'focus-visible:outline-accent-400' },
} as const;

const LandingCta: React.FC<{
  children: React.ReactNode;
  type?: 'submit' | 'button';
  onClick?: () => void;
  fullWidth?: boolean;
  tone?: keyof typeof LANDING_CTA_TONE;
}> = ({ children, type = 'submit', onClick, fullWidth = false, tone = 'warm' }) => {
  const t = LANDING_CTA_TONE[tone];
  return (
    <button
      type={type}
      onClick={onClick}
      className={`group inline-flex items-center justify-between gap-3 h-12 pl-6 pr-2 rounded-pill font-body font-semibold text-body active:scale-[0.98] transition-[background-color,transform] duration-base ease-emphasis focus-visible:outline-2 focus-visible:outline-offset-2 ${t.btn} ${t.focus} ${fullWidth ? 'w-full' : ''}`}
    >
      <span>{children}</span>
      <span className={`w-8 h-8 rounded-full ${t.icon} flex items-center justify-center shrink-0 transition-transform duration-base ease-emphasis group-hover:translate-x-0.5`}>
        <ArrowRight size={16} />
      </span>
    </button>
  );
};

/* ─── Main component ──────────────────────────────────────────────────────── */

const AppLanding: React.FC = () => {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const [email, setEmail] = useState('');
  const [emailBottom, setEmailBottom] = useState('');

  // Hero scroll-shrink — le hero recule (scale + fade + remontée) en scrollant vers le mockup.
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 520], [1, 0.93], { clamp: true });
  const heroOpacity = useTransform(scrollY, [0, 440], [1, 0], { clamp: true });
  const heroY = useTransform(scrollY, [0, 520], [0, -36], { clamp: true });
  const heroStyle = reduce ? undefined : { scale: heroScale, opacity: heroOpacity, y: heroY };

  const handleSignup = (e: React.FormEvent, emailVal: string) => {
    e.preventDefault();
    if (!emailVal.trim()) return;
    navigate(`/auth/signup?email=${encodeURIComponent(emailVal.trim())}`);
  };

  // Hero stagger
  const heroContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
  };
  const heroItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col font-body">

      {/* Scroll progress — fine barre sous la nav */}
      <ScrollProgress topClass="top-14" />

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-sticky h-14 flex items-center justify-between px-6 md:px-10 bg-white/80 backdrop-blur-glass-light border-b border-ink-100">
        <Link to="/website" className="flex items-center gap-2">
          <TlsLogo variant="primary" className="h-7 w-7" />
          <span className="font-display font-bold text-body-sm text-ink-900 tracking-snug hidden sm:inline">
            The Learning Society
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to="/auth/login"
            className="font-body text-body-sm text-ink-600 hover:text-ink-900 transition-colors hidden sm:inline"
          >
            Se connecter
          </Link>
          <Button variant="primary" size="sm" onClick={() => navigate('/auth/signup')}>
            Démarrer
          </Button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white pt-28 pb-20 md:pt-36 md:pb-28 px-6 md:px-10">
        {/* Atmosphère : grain film léger sur fond clair */}
        <NoiseTexture opacity={0.025} />

        <motion.div style={heroStyle} className="relative z-10 max-w-page mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-20">

          {/* Left: copy (staggered reveal) */}
          <motion.div
            className="flex flex-col gap-6 flex-1 max-w-xl"
            variants={heroContainer}
            initial={reduce ? false : 'hidden'}
            animate={reduce ? false : 'show'}
          >
            <motion.div variants={heroItem}>
              <Pill className="bg-primary-50 text-primary-700 border border-primary-200 self-start">
                <Sparkles size={12} />
                Skills-Based Organisation
              </Pill>
            </motion.div>

            {/* H1 — KineticHeadline par ligne (masque qui se lève). Plain <h1> : coupe
                la propagation de variants du container parent, KineticHeadline gère sa propre révélation. */}
            <h1
              className="font-display font-extrabold text-ink-900 leading-[0.92] tracking-display m-0"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
            >
              <span className="block"><KineticHeadline text="Formez-vous." delay={0.1} /></span>
              <span className="block"><KineticHeadline text="Pratiquez." delay={0.22} /></span>
              <span className="block text-accent-400"><KineticHeadline text="Validez." delay={0.34} /></span>
            </h1>

            <motion.p
              variants={heroItem}
              className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-md"
            >
              Alignez vos compétences réelles et vos projets. L'IA amplifie, l'humain accompagne.
            </motion.p>

            {/* Preuves qualitatives (zéro métrique inventée) */}
            <motion.div variants={heroItem} className="flex flex-wrap gap-x-5 gap-y-2 pt-2">
              {TRUST.map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-ink-500 font-body text-body-sm">
                  <span className="text-primary-500">{icon}</span>
                  {label}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: signup card — double-bezel (tray + core) */}
          <motion.div
            className="w-full lg:w-auto lg:min-w-[380px] flex-shrink-0"
            initial={reduce ? false : { opacity: 0, y: 28, scale: 0.97 }}
            animate={reduce ? false : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Outer tray */}
            <div className="bg-white border border-primary-100 rounded-3xl p-2 shadow-brand-md">
              {/* Inner core */}
              <div className="bg-primary-50/60 border border-primary-100 rounded-[18px] p-6 md:p-7 flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <span className="font-display font-bold text-ink-900 text-h4 m-0">Commencer gratuitement</span>
                  <span className="font-body text-body-sm text-ink-500">Accès complet · Aucune carte requise</span>
                </div>

                <form onSubmit={(e) => handleSignup(e, email)} className="flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    aria-label="Adresse email"
                    className="h-12 px-4 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder:text-ink-400 font-body text-body-sm focus:outline-none focus:border-primary-400 transition-all shadow-xs"
                  />
                  <LandingCta fullWidth>Créer mon compte</LandingCta>
                </form>

                <p className="font-body text-micro text-ink-400 text-center m-0">
                  Déjà inscrit ?{' '}
                  <Link to="/auth/login" className="text-primary-600 hover:text-primary-800 underline underline-offset-2 transition-colors">
                    Se connecter
                  </Link>
                </p>

                {/* Trust signals — postures défendables uniquement */}
                <div className="flex items-center gap-3 pt-3 border-t border-ink-100">
                  {[
                    { icon: <BadgeCheck size={14} />, label: 'RGPD conforme' },
                    { icon: <Brain size={14} />, label: 'IA éthique' },
                    { icon: <Users size={14} />, label: 'Coaching humain' },
                  ].map(({ icon, label }) => (
                    <div key={label} className="flex items-center gap-1 text-ink-500 font-body text-micro">
                      {icon}
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── LE SYSTÈME QUI SE MONTRE (mockup live) ── */}
      <section className="relative py-section-lg px-6 md:px-10 bg-ink-50 overflow-hidden">
        <div className="relative z-10 max-w-page mx-auto flex flex-col gap-stack-lg">
          <FadeInWhenVisible direction="up">
            <div className="flex flex-col gap-tight text-center max-w-xl mx-auto">
              <span className="inline-flex items-center justify-center gap-1.5 font-body text-caption font-semibold text-primary-600">
                <MousePointerClick size={14} />
                Essayez, c'est interactif
              </span>
              <h2 className="font-display font-bold text-ink-900 text-h2 m-0 tracking-headline">
                <KineticHeadline text="Voyez la plateforme en action" />
              </h2>
              <p className="font-body text-body text-ink-600 m-0">
                Parcours, coaching, journal, veille — explorez chaque espace sans créer de compte.
              </p>
            </div>
          </FadeInWhenVisible>

          <RevealMask direction="up" delay={0.1} className="max-w-4xl mx-auto w-full">
            <InteractiveAppMockup />
          </RevealMask>
        </div>
      </section>

      {/* ── 3 ESPACES ── */}
      <section className="py-section-lg px-6 md:px-10 bg-white">
        <div className="max-w-page mx-auto flex flex-col gap-section">

          <FadeInWhenVisible direction="up">
            <div className="flex flex-col gap-tight text-center max-w-xl mx-auto">
              <span className="font-body text-caption font-semibold text-primary-600">
                Une plateforme, trois espaces
              </span>
              <h2 className="font-display font-bold text-ink-900 text-h2 m-0 tracking-headline text-balance">
                Tout ce dont vos équipes ont besoin
              </h2>
              <p className="font-body text-body text-ink-600 m-0">
                Formation · Accompagnement · Validation — alignés sur vos projets réels.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((feat, i) => {
              const tones = FEATURE_TONE[feat.tone];
              return (
                <FadeInWhenVisible key={feat.eyebrow} direction="up" delay={i * 0.1}>
                  <div
                    className={`group h-full flex flex-col gap-4 p-6 rounded-2xl shadow-card hover:shadow-card-lift hover:-translate-y-1 transition-[transform,box-shadow] duration-base ease-emphasis ${tones.card}`}
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-base ease-emphasis group-hover:scale-105 ${tones.icon}`}>
                      {feat.icon}
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className={`font-body text-caption font-semibold uppercase tracking-wider ${tones.eyebrow}`}>
                        {feat.eyebrow}
                      </span>
                      <h3 className="font-display font-bold text-ink-900 text-h4 m-0 leading-snug">
                        {feat.title}
                      </h3>
                    </div>
                    <p className="font-body text-body-sm text-ink-600 m-0 leading-relaxed flex-1">
                      {feat.description}
                    </p>
                    <ul className="flex flex-col gap-2 m-0 p-0 list-none">
                      {feat.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 font-body text-caption text-ink-700">
                          <Check size={14} className={`mt-0.5 shrink-0 ${tones.bullet}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeInWhenVisible>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section className="py-section-lg px-6 md:px-10 bg-ink-50">
        <div className="max-w-page mx-auto flex flex-col gap-section">

          <FadeInWhenVisible direction="up">
            <div className="flex flex-col gap-tight text-center max-w-xl mx-auto">
              <span className="font-body text-caption font-semibold text-primary-600">
                Simple à démarrer
              </span>
              <h2 className="font-display font-bold text-ink-900 text-h2 m-0 tracking-headline text-balance">
                De l'inscription aux premiers résultats
              </h2>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop) */}
            <div
              aria-hidden
              className="hidden md:block absolute top-8 left-[calc(16.67%+16px)] right-[calc(16.67%+16px)] h-px bg-ink-200 z-0"
            />
            {STEPS.map((step, i) => (
              <FadeInWhenVisible key={step.number} direction="up" delay={i * 0.12} className="relative z-[1]">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-primary-200 flex items-center justify-center shadow-sm">
                    <span className="font-display font-bold text-primary-600 text-h4 m-0 leading-none tabular-nums">
                      {step.number}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display font-bold text-ink-900 text-h4 m-0">{step.title}</h3>
                    <p className="font-body text-body-sm text-ink-600 m-0 leading-relaxed max-w-xs mx-auto">
                      {step.description}
                    </p>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── SBO POSITIONING STRIP ── */}
      <section className="py-section px-6 md:px-10 bg-white border-y border-ink-100">
        <div className="max-w-page mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <FadeInWhenVisible direction="left" className="max-w-lg">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Brain size={20} className="text-primary-500 shrink-0" />
                <span className="font-body text-caption font-semibold text-primary-600 uppercase tracking-wider">
                  Skills-Based Organisation
                </span>
              </div>
              <h2 className="font-display font-bold text-ink-900 text-h3 m-0 tracking-headline text-balance">
                Apprendre, appliquer, prouver : la boucle Learn → Do → Match
              </h2>
              <p className="font-body text-body text-ink-600 m-0 leading-relaxed">
                Vos équipes progressent sur des projets réels, vos RH obtiennent des données compétences fiables, votre organisation alloue mieux les talents.
              </p>
            </div>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="right" className="shrink-0">
            <div className="flex flex-col gap-3">
              {[
                'Compétences validées sur projets réels',
                'Passeport de Compétences exportable',
                'Intégration SIRH & données compétences',
                'Coaching humain + IA éthique',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-primary-600" />
                  </div>
                  <span className="font-body text-body-sm text-ink-700">{item}</span>
                </div>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="relative py-section-lg px-6 md:px-10 bg-gradient-to-br from-ink-950 via-primary-900 to-ink-900 overflow-hidden">
        <MeshGradientBg tone="brand" intensity="subtle" />
        <NoiseTexture opacity={0.04} />

        <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center gap-6 text-center">
          <span className="font-body text-caption font-semibold text-white/55">
            Prêt à commencer ?
          </span>
          <h2 className="font-display font-extrabold text-white text-h2 m-0 tracking-headline leading-tight text-balance">
            Formez-vous sur vos projets réels, pas sur des vidéos
          </h2>
          <p className="font-body text-body text-white/75 m-0 leading-relaxed">
            Accès complet pour démarrer. Aucune carte de crédit.
          </p>

          <form onSubmit={(e) => handleSignup(e, emailBottom)} className="w-full flex flex-col sm:flex-row items-center gap-3 max-w-md">
            <input
              type="email"
              required
              value={emailBottom}
              onChange={(e) => setEmailBottom(e.target.value)}
              placeholder="votre@email.com"
              aria-label="Adresse email"
              className="flex-1 w-full h-12 px-4 rounded-xl bg-white/8 border border-white/20 text-white placeholder:text-white/40 font-body text-body-sm focus:outline-none focus:bg-white/12 focus:border-white/40 transition-all"
            />
            <MagneticButton strength={12}>
              <LandingCta tone="gold">Créer mon compte</LandingCta>
            </MagneticButton>
          </form>

          <p className="font-body text-micro text-white/55 m-0">
            En créant un compte, vous acceptez nos{' '}
            <Link to="/website/cgv-cgu" className="underline underline-offset-2 hover:text-white transition-colors">
              CGU
            </Link>{' '}
            et notre{' '}
            <Link to="/website/politique-confidentialite" className="underline underline-offset-2 hover:text-white transition-colors">
              politique de confidentialité
            </Link>.
          </p>
        </div>
      </section>

      {/* ── FOOTER MINIMAL ── */}
      <footer className="py-6 px-6 md:px-10 bg-ink-950 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <TlsLogo variant="light" className="h-5 w-5" />
          <span className="font-body text-caption text-white/50">
            © {new Date().getFullYear()} The Learning Society
          </span>
        </div>
        <div className="flex items-center gap-5">
          <Link to="/website/mentions-legales" className="font-body text-caption text-white/50 hover:text-white transition-colors">
            Mentions légales
          </Link>
          <Link to="/website/politique-confidentialite" className="font-body text-caption text-white/50 hover:text-white transition-colors">
            Confidentialité
          </Link>
          <Link to="/website/contact" className="font-body text-caption text-white/50 hover:text-white transition-colors">
            Contact
          </Link>
        </div>
      </footer>

    </div>
  );
};

export default AppLanding;
