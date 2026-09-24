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
} from 'lucide-react';
import { TlsLogo } from '../components/ui/TlsLogo';
import { Button } from '../components/core/Button';
import { IconChip } from '../components/ui/IconChip';
import { CARD_HOVER } from '../lib/tone-classes';
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
    icon: <BookOpen size={20} />,
    tone: 'brand',
    eyebrow: 'Espace Parcours',
    title: 'Formez-vous sur vos cas réels',
    description: "Des parcours IA adaptatifs, pas des vidéos passives. Chaque leçon s'ancre dans un projet réel de votre organisation.",
    items: ['Parcours sur-mesure par compétence', 'Leçons courtes + exercices pratiques', 'Progression vérifiable et traçable'],
  },
  {
    icon: <CalendarCheck size={20} />,
    tone: 'warm',
    eyebrow: 'Espace Coaching',
    title: 'Un coach dédié, pas un chatbot',
    description: "Sessions 1:1 avec un expert qui corrige, oriente et accélère. L'IA prépare, l'humain accompagne.",
    items: ['Réservation en 2 clics', 'Corrections personnalisées', 'Feedback actionnable post-session'],
  },
  {
    icon: <Lightbulb size={20} />,
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
    description: 'Leçons courtes, exercices pratiques, coaching 1:1, tout aligné sur vos objectifs réels.',
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
    icon: 'bg-primary-100 text-primary-800',
    eyebrow: 'text-primary-800',
    bullet: 'text-primary-500',
  },
  warm: {
    card: 'bg-secondary-50 border border-secondary-200',
    icon: 'bg-secondary-100 text-secondary-600',
    eyebrow: 'text-secondary-700',
    bullet: 'text-secondary-500',
  },
  sun: {
    card: 'bg-accent-50 border border-accent-200',
    icon: 'bg-accent-100 text-accent-500',
    eyebrow: 'text-accent-700',
    bullet: 'text-accent-400',
  },
};

/* ─── Sub-components ──────────────────────────────────────────────────────── */

const Pill: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`inline-flex items-center gap-stack-2xs px-3 py-1 rounded-pill font-body text-caption font-semibold ${className}`}>
    {children}
  </span>
);

/**
 * LandingCta — bouton marketing avec button-in-button (icône nichée dans son
 * propre cercle) + press physics. Self-contained à la landing (brand register).
 * tone="warm" : orange sur fond clair (hero). tone="gold" : jaune TLS sur fond sombre (CTA section).
 */
const LANDING_CTA_TONE = {
  warm: { btn: 'bg-secondary-700 hover:bg-secondary-800 shadow-warm-md text-white', icon: 'bg-white/20', focus: 'focus-visible:outline-white' },
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
      className={`group inline-flex items-center justify-between gap-stack-sm h-12 pl-6 pr-2 rounded-pill font-body font-bold text-body active:scale-[0.98] transition-[background-color,transform] duration-base ease-emphasis focus-visible:outline-2 focus-visible:outline-offset-2 ${t.btn} ${t.focus} ${fullWidth ? 'w-full' : ''}`}
    >
      <span>{children}</span>
      <span className={`w-8 h-8 rounded-pill ${t.icon} flex items-center justify-center shrink-0 transition-transform duration-base ease-emphasis group-hover:translate-x-0.5`}>
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
    // L'e-mail passe par l'état du routeur, pas par l'URL : une donnée
    // personnelle n'a rien à faire dans l'historique ni dans les journaux.
    navigate('/auth/signup', { state: { email: emailVal.trim() } });
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
        <Link to="/website" className="flex items-center gap-stack-xs">
          <TlsLogo variant="primary" className="h-7 w-7" />
          <span className="font-display font-bold text-body text-ink-900 tracking-snug hidden sm:inline">
            The Learning Society
          </span>
        </Link>
        <div className="flex items-center gap-stack-sm">
          <Link
            to="/auth/login"
            className="font-body text-body text-ink-700 hover:text-ink-900 transition-colors"
          >
            Se connecter
          </Link>
          <Button emphasis="soft" size="sm" onClick={() => navigate('/auth/signup')}>
            Démarrer
          </Button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white pt-28 pb-20 md:pt-36 md:pb-28 px-6 md:px-10">
        {/* Atmosphère : grain film léger sur fond clair */}
        <NoiseTexture opacity={0.025} />

        <motion.div style={heroStyle} className="relative z-10 max-w-page mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-page lg:gap-20">

          {/* Left: copy (staggered reveal) */}
          <motion.div
            className="flex flex-col gap-stack-lg flex-1 max-w-xl"
            variants={heroContainer}
            initial={reduce ? false : 'hidden'}
            animate={reduce ? false : 'show'}
          >
            {/* Surtitre, titre et chapô forment un groupe (8, puis 12 — l'anatomie
                de PageHero) ; les preuves suivent à 32. Tout était espacé à 24 :
                le titre flottait à égale distance de ce qu'il introduit. */}
            <div className="flex flex-col">
            <motion.div variants={heroItem}>
              <Pill className="bg-primary-50 text-primary-800 border border-primary-200 self-start">
                <Sparkles size={14} />
                Skills-Based Organisation
              </Pill>
            </motion.div>

            {/* H1 — KineticHeadline par ligne (masque qui se lève). Plain <h1> : coupe
                la propagation de variants du container parent, KineticHeadline gère sa propre révélation.
                Passe typographique du 2026-09-24 : l'affiche d'une page d'acquisition
                prend la couche d'affiche du système (`text-section`, 32 → 52 px, son
                interligne et son serrage) au lieu d'un `style={{ fontSize: clamp(36 → 60) }}`
                et d'un interligne arbitraire à 0,92 ; en 700 (`font-bold`), pas en 800 :
                l'app n'a qu'un poids de titre (arbitrage n°12). */}
            <h1 className="mt-stack-xs font-display text-section font-bold text-ink-900">
              <span className="block"><KineticHeadline text="Formez-vous." delay={0.1} /></span>
              <span className="block"><KineticHeadline text="Pratiquez." delay={0.22} /></span>
              <span className="block text-accent-700"><KineticHeadline text="Validez." delay={0.34} /></span>
            </h1>

            <motion.p
              variants={heroItem}
              className="mt-stack-sm font-body text-body-lg text-ink-700 max-w-md"
            >
              Alignez vos compétences réelles et vos projets. L'IA amplifie, l'humain accompagne.
            </motion.p>
            </div>

            {/* Preuves qualitatives (zéro métrique inventée) */}
            <motion.div variants={heroItem} className="flex flex-wrap gap-x-stack-md gap-y-stack-xs pt-2">
              {TRUST.map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-stack-2xs text-ink-700 font-body text-body">
                  <span className="text-primary-700" aria-hidden="true">{icon}</span>
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
            <div className="bg-white border border-primary-100 rounded-xl p-2 shadow-brand-md">
              {/* Inner core */}
              {/* Coin intérieur concentrique : 20 (plateau) − 8 (retrait) − 1 (filet)
                  ≈ 10, et non 18 ; padding 24, le canon d'une carte. */}
              <div className="bg-primary-50/60 border border-primary-100 rounded-md p-stack-lg flex flex-col gap-stack-md">
                <div className="flex flex-col gap-stack-3xs">
                  <span className="font-display text-h3 text-ink-900">Commencer gratuitement</span>
                  <span className="font-body text-body text-ink-700">Accès complet · Aucune carte requise</span>
                </div>

                <form onSubmit={(e) => handleSignup(e, email)} className="flex flex-col gap-stack-sm">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    aria-label="Adresse email"
                    className="h-12 px-4 rounded-lg bg-white border border-ink-400 text-ink-900 placeholder:text-ink-500 font-body text-body focus:outline-none focus:border-primary-400 transition-all shadow-xs"
                  />
                  <LandingCta fullWidth>Créer mon compte</LandingCta>
                </form>

                <p className="font-body text-caption text-ink-600 text-center">
                  Déjà inscrit ?{' '}
                  <Link to="/auth/login" className="text-primary-800 hover:no-underline underline underline-offset-2 transition-colors">
                    Se connecter
                  </Link>
                </p>

                {/* Trust signals — postures défendables uniquement */}
                <div className="flex flex-wrap items-center gap-x-stack-sm gap-y-stack-3xs pt-stack-sm border-t border-ink-100">
                  {[
                    { icon: <BadgeCheck size={14} />, label: 'RGPD conforme' },
                    { icon: <Brain size={14} />, label: 'IA éthique' },
                    { icon: <Users size={14} />, label: 'Coaching humain' },
                  ].map(({ icon, label }) => (
                    <div key={label} className="flex items-center gap-stack-3xs text-ink-600 font-body text-caption">
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
      {/* Sections (passe typographique du 2026-09-24) : 48 au-dessus d'un titre
          de section, 24 en dessous ; plus de surtitre décoratif au-dessus de
          chaque titre (le tell nommé par la doctrine) ; h2 au pas du token (sans
          graisse ni serrage écrits à côté), chapô 18 ink-700. */}
      <section className="relative py-page px-6 md:px-10 bg-ink-50 overflow-hidden">
        <div className="relative z-10 max-w-page mx-auto flex flex-col gap-stack-lg">
          <FadeInWhenVisible direction="up">
            <div className="flex flex-col gap-stack-sm text-center max-w-xl mx-auto">
              <h2 className="font-display text-h2 text-ink-900 text-balance">
                <KineticHeadline text="Voyez la plateforme en action" />
              </h2>
              <p className="font-body text-body-lg text-ink-700">
                Parcours, coaching, journal, veille : explorez chaque espace sans créer de compte.
              </p>
            </div>
          </FadeInWhenVisible>

          <RevealMask direction="up" delay={0.1} className="max-w-4xl mx-auto w-full">
            <InteractiveAppMockup />
          </RevealMask>
        </div>
      </section>

      {/* ── 3 ESPACES ── */}
      <section className="py-page px-6 md:px-10 bg-white">
        <div className="max-w-page mx-auto flex flex-col gap-stack-lg">

          <FadeInWhenVisible direction="up">
            <div className="flex flex-col gap-stack-sm text-center max-w-xl mx-auto">
              <h2 className="font-display text-h2 text-ink-900 text-balance">
                Tout ce dont vos équipes ont besoin
              </h2>
              <p className="font-body text-body-lg text-ink-700">
                Formation, accompagnement et validation, alignés sur vos projets réels.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack">
            {FEATURES.map((feat, i) => {
              const tones = FEATURE_TONE[feat.tone];
              return (
                <FadeInWhenVisible key={feat.eyebrow} direction="up" delay={i * 0.1}>
                  <div
                    className={`group h-full flex flex-col gap-stack p-6 rounded-xl transition-colors duration-base ease-emphasis ${tones.card} ${CARD_HOVER[feat.tone]}`}
                  >
                    <div className={`w-11 h-11 rounded-lg flex items-center justify-center transition-transform duration-base ease-emphasis group-hover:scale-105 ${tones.icon}`}>
                      {feat.icon}
                    </div>
                    <div className="flex flex-col gap-stack-3xs">
                      {/* Surtitre de carte : 13 / 600 ink-600, en casse normale (il
                          était en capitales espacées, à la couleur du ton). */}
                      <span className="font-body text-caption font-semibold text-ink-600">
                        {feat.eyebrow}
                      </span>
                      <h3 className="font-display text-h3 text-ink-900">
                        {feat.title}
                      </h3>
                    </div>
                    <p className="font-body text-body text-ink-700 flex-1">
                      {feat.description}
                    </p>
                    <ul className="flex flex-col gap-stack-xs m-0 p-0 list-none">
                      {feat.items.map((item) => (
                        <li key={item} className="flex items-start gap-stack-xs font-body text-caption text-ink-700">
                          {/* Une ligne de haut : la coche se centre sur la première ligne. */}
                          <span className={`shrink-0 inline-flex items-center h-lh ${tones.bullet}`} aria-hidden="true">
                            <Check size={14} />
                          </span>
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
      <section className="py-page px-6 md:px-10 bg-ink-50">
        <div className="max-w-page mx-auto flex flex-col gap-section">

          <FadeInWhenVisible direction="up">
            <div className="flex flex-col text-center max-w-xl mx-auto">
              <h2 className="font-display text-h2 text-ink-900 text-balance">
                De l'inscription aux premiers résultats
              </h2>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-section relative">
            {/* Connector line (desktop) */}
            <div
              aria-hidden
              className="hidden md:block absolute top-8 left-[calc(16.67%+16px)] right-[calc(16.67%+16px)] h-px bg-ink-200 z-0"
            />
            {STEPS.map((step, i) => (
              <FadeInWhenVisible key={step.number} direction="up" delay={i * 0.12} className="relative z-[1]">
                <div className="flex flex-col items-center text-center gap-stack">
                  <div className="w-16 h-16 rounded-pill bg-white border-2 border-primary-200 flex items-center justify-center shadow-sm">
                    {/* Un chiffre d'étape est en Nunito tabulaire (doctrine, « Progression
                        et étapes ») ; en League Spartan, il se lisait comme un titre. */}
                    <span className="font-body font-semibold text-primary-800 text-body-lg tabular-nums">
                      {step.number}
                    </span>
                  </div>
                  <div className="flex flex-col gap-stack-3xs">
                    <h3 className="font-display text-h3 text-ink-900">{step.title}</h3>
                    <p className="font-body text-body text-ink-700 max-w-xs mx-auto">
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
      {/* Bande SBO : son titre est une section (h2 à 28, il était dessiné à 20) ;
          le surtitre en capitales redisait la pastille du hero. */}
      <section className="py-page px-6 md:px-10 bg-white border-y border-ink-100">
        <div className="max-w-page mx-auto flex flex-col md:flex-row items-center justify-between gap-section">
          <FadeInWhenVisible direction="left" className="max-w-lg">
            <div className="flex flex-col gap-stack-sm">
              <h2 className="font-display text-h2 text-ink-900 text-balance">
                Apprendre, appliquer, prouver : la boucle Learn → Do → Match
              </h2>
              <p className="font-body text-body text-ink-700 max-w-prose">
                Vos équipes progressent sur des projets réels, vos RH obtiennent des données compétences fiables, votre organisation alloue mieux les talents.
              </p>
            </div>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="right" className="shrink-0">
            <div className="flex flex-col gap-stack-sm">
              {[
                'Compétences validées sur projets réels',
                'Passeport de Compétences exportable',
                'Intégration SIRH & données compétences',
                'Coaching humain + IA éthique',
              ].map((item) => (
                <div key={item} className="flex items-center gap-stack-xs">
                  <IconChip size="xs" tone="brand">
                    <Check />
                  </IconChip>
                  <span className="font-body text-body text-ink-700">{item}</span>
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

        {/* Sur fond sombre : texte en blanc plein, la hiérarchie par la taille
            (règle des heros sombres, arbitrage n°8) ; plus de surtitre. */}
        <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center gap-stack-lg text-center">
          <div className="flex flex-col items-center gap-stack-sm">
            <h2 className="font-display text-white text-h2 text-balance">
              Formez-vous sur vos projets réels, pas sur des vidéos
            </h2>
            <p className="font-body text-body-lg text-white">
              Accès complet pour démarrer. Aucune carte de crédit.
            </p>
          </div>

          <form onSubmit={(e) => handleSignup(e, emailBottom)} className="w-full flex flex-col sm:flex-row items-center gap-stack-sm max-w-md">
            <input
              type="email"
              required
              value={emailBottom}
              onChange={(e) => setEmailBottom(e.target.value)}
              placeholder="votre@email.com"
              aria-label="Adresse email"
              className="flex-1 w-full h-12 px-4 rounded-lg bg-white/8 border border-white/40 text-white placeholder:text-white/75 font-body text-body focus:outline-none focus:bg-white/12 focus:border-white/40 transition-all"
            />
            <MagneticButton strength={12}>
              <LandingCta tone="gold">Créer mon compte</LandingCta>
            </MagneticButton>
          </form>

          <p className="font-body text-caption text-white">
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
      <footer className="py-6 px-6 md:px-10 bg-ink-950 flex flex-col sm:flex-row items-center justify-between gap-stack">
        <div className="flex items-center gap-stack-xs">
          <TlsLogo variant="light" className="h-5 w-5" />
          <span className="font-body text-caption text-white/80">
            © {new Date().getFullYear()} The Learning Society
          </span>
        </div>
        <div className="flex items-center gap-stack-md">
          <Link to="/website/mentions-legales" className="font-body text-caption text-white/80 hover:text-white transition-colors">
            Mentions légales
          </Link>
          <Link to="/website/politique-confidentialite" className="font-body text-caption text-white/80 hover:text-white transition-colors">
            Confidentialité
          </Link>
          <Link to="/website/contact" className="font-body text-caption text-white/80 hover:text-white transition-colors">
            Contact
          </Link>
        </div>
      </footer>

    </div>
  );
};

export default AppLanding;
