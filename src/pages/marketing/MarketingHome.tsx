/**
 * MarketingHome — DS-aligned redesign
 *
 * Direction : composants du DS (StatCard, IconFeatureCard, CardGrid, SectionHeader)
 * + motion primitives marketing (FadeInWhenVisible, MagneticButton, CountUp, Marquee…).
 *
 * Structure 8 sections :
 *   1. Hero           — brand gradient primary-700→900, chips, trust strip
 *   2. Marquee logos  — CountUp + défilement horizontal
 *   3. Nos 3 leviers  — SectionHeader + CardGrid + IconFeatureCard (warm/brand/sun)
 *   4. Product Demo   — TiltCard + InteractiveAppMockup
 *   5. Humains+outils — édito 2-col + squiggly underline draw-on-scroll
 *   6. Métriques      — SectionHeader + 4×StatCard (CountUp dans value)
 *   7. Témoignages    — SectionHeader + 3 cartes de citation
 *   8. CTA finale     — brand gradient + glassmorphic card
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Quote,
  CheckCircle2,
  GraduationCap,
  Smartphone,
  Compass,
  Users,
  Building2,
  BookOpen,
  TrendingUp,
  Star,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import {
  FadeInWhenVisible,
  MagneticButton,
  MarqueeRow,
  CountUp,
  InteractiveAppMockup,
  TiltCard,
} from '../../components/marketing/motion';
import { StatCard } from '../../components/ui/StatCard';
import { IconFeatureCard } from '../../components/ui/IconFeatureCard';
import { CardGrid } from '../../components/patterns/CardGrid';
import { SectionHeader } from '../../components/patterns/SectionHeader';
import { SEOHead } from './components/SEOHead';

// ⚠️ PLACEHOLDER — logos illustratifs.
const LOGOS = [
  'Renault',
  'BNP Paribas',
  'Capgemini',
  "L'Oréal",
  'Airbus',
  'Decathlon',
  'Orange',
  'Société Générale',
];

// ⚠️ PLACEHOLDER — Témoignages illustratifs.
const TESTIMONIALS = [
  {
    quote:
      "En 3 mois, on a doublé l'engagement et divisé par 2 le temps de conception. Nos formateurs sont devenus des architectes de parcours.",
    author: 'Camille Lefèvre',
    role: 'Directrice Formation, Renault',
    portrait:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80&auto=format&fit=crop',
  },
  {
    quote:
      "Le Passeport Dreyfus a changé notre façon de mesurer la montée en compétence. C'est la première fois qu'on a un vrai signal d'apprentissage.",
    author: 'Marc Daviau',
    role: 'Head of L&D, Capgemini',
    portrait:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80&auto=format&fit=crop',
  },
  {
    quote:
      "TLS fait ce que les LMS classiques promettent depuis 15 ans. La différence : ils l'ont vraiment fait.",
    author: 'Sophie Martin',
    role: "CHRO, L'Oréal",
    portrait:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80&auto=format&fit=crop',
  },
];

const HeroChevron: React.FC = () => {
  const reduced = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      animate={reduced ? undefined : { y: [0, 8, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      className="flex flex-col items-center gap-1 text-white/60"
    >
      <span className="font-body text-caption font-semibold uppercase tracking-widest">Scroll</span>
      <ChevronDown size={18} />
    </motion.div>
  );
};

export const MarketingHome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      <SEOHead
        title="The Learning Society — Transformez vos équipes en organisation Skills-Based"
        description="Méthode STRIDE, Learning App, Accompagnement : construisez une organisation Skills-Based qui apprend et s'adapte en continu."
        canonical="/marketing"
      />

      {/* ── 1. Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-page overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900">
        {/* Halo radial ambiant */}
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-pill bg-primary-500/30 blur-3xl" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-pill bg-accent-400/5 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          {/* Eyebrow chip */}
          <FadeInWhenVisible direction="up" delay={0.05}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-white/15 border border-white/25 backdrop-blur-glass-light shadow-xs">
              <Sparkles size={14} className="text-accent-400" />
              <span className="font-body text-caption font-semibold text-white tracking-wider uppercase">
                Skills-Based Organization · IA pédagogique · Passeport Compétences
              </span>
            </span>
          </FadeInWhenVisible>

          {/* Headline */}
          <FadeInWhenVisible direction="up" delay={0.15}>
            <h1 className="font-display font-extrabold text-white leading-[0.95] tracking-tight m-0 text-[clamp(2.5rem,6.5vw,5.5rem)] max-w-4xl">
              L'IA ne remplacera pas les formateurs.{' '}
              <span className="text-accent-400">Les formateurs qui maîtrisent l'IA, si.</span>
            </h1>
          </FadeInWhenVisible>

          {/* Subtitle */}
          <FadeInWhenVisible direction="up" delay={0.3}>
            <p className="font-body text-body-lg text-white/85 leading-relaxed m-0 max-w-2xl">
              Transformez vos talents en avantage compétitif durable. Parcours adaptatifs, Passeport
              de Compétences, matching IA — un cycle complet{' '}
              <strong className="text-white">Learn → Do → Match</strong>.
            </p>
          </FadeInWhenVisible>

          {/* CTAs */}
          <FadeInWhenVisible direction="up" delay={0.45}>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-stack">
              <MagneticButton strength={12}>
                <Link to="/marketing/formation">
                  <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                    Je veux me former
                  </Button>
                </Link>
              </MagneticButton>
              <Link to="/marketing/accompagnement">
                <Button variant="glass" size="lg" trailingIcon={<ArrowUpRight size={18} />}>
                  Je représente une entreprise
                </Button>
              </Link>
            </div>
          </FadeInWhenVisible>

          {/* Trust strip */}
          <FadeInWhenVisible direction="up" delay={0.6}>
            <div className="flex items-center gap-3 pt-stack">
              <div className="flex -space-x-2">
                {[
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&q=80&auto=format&fit=crop',
                ].map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className="w-8 h-8 rounded-pill object-cover border-2 border-white/30 shadow-sm"
                  />
                ))}
              </div>
              <span className="font-body text-caption font-semibold text-white/80">
                <CountUp to={200} suffix="+" className="font-bold text-white" /> formateurs certifiés
              </span>
            </div>
          </FadeInWhenVisible>

          {/* Scroll chevron */}
          <FadeInWhenVisible direction="none" delay={0.9}>
            <div className="pt-section">
              <HeroChevron />
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── 2. Marquee logos ──────────────────────────────────────────────────── */}
      <section className="border-b border-ink-100 py-stack-lg bg-gradient-to-b from-primary-50/40 to-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-stack">
          <p className="font-body text-caption text-ink-500 text-center uppercase tracking-widest font-semibold">
            <CountUp to={40} suffix="+" className="text-ink-900 font-bold" /> organisations leur font
            confiance
          </p>
          <MarqueeRow
            duration={50}
            items={LOGOS.map((name) => (
              <span
                key={name}
                className="font-display text-h3 font-bold text-ink-400 tracking-tight whitespace-nowrap"
              >
                {name}
              </span>
            ))}
          />
          <p className="font-body text-micro text-ink-400 text-center italic m-0">
            Logos illustratifs · partenaires confirmés communiqués prochainement.
          </p>
        </div>
      </section>

      {/* ── 3. Nos 3 leviers ──────────────────────────────────────────────────── */}
      <section className="py-page bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-section-lg">
          <FadeInWhenVisible direction="up">
            <SectionHeader
              variant="accent"
              tone="primary"
              size="lg"
              title="Trois leviers pour transformer votre organisation"
              subtitle="Formation, technologie et accompagnement — un cycle complet au service de la montée en compétences Skills-Based."
            />
          </FadeInWhenVisible>

          <CardGrid layout="default" gapSize="lg">
            <FadeInWhenVisible direction="up" delay={0}>
              <IconFeatureCard
                icon={<GraduationCap size={28} />}
                title="Formation certifiante"
                description="Formateurs Augmentés, méthode STRIDE, pédagogie active. Devenez architecte de l'apprentissage IA-augmenté."
                tone="warm"
                iconStyle="bubble"
                iconSize="lg"
                surface="tinted"
                onClick={() => navigate('/marketing/formation')}
              />
            </FadeInWhenVisible>

            <FadeInWhenVisible direction="up" delay={0.1}>
              <IconFeatureCard
                icon={<Smartphone size={28} />}
                title="Learning App SBO"
                description="Parcours adaptatifs, Passeport Dreyfus, coaching intégré. Une plateforme qui apprend avec vous et pour vous."
                tone="brand"
                iconStyle="bubble"
                iconSize="lg"
                surface="tinted"
                onClick={() => navigate('/marketing/learning-app')}
              />
            </FadeInWhenVisible>

            <FadeInWhenVisible direction="up" delay={0.2}>
              <IconFeatureCard
                icon={<Compass size={28} />}
                title="Accompagnement SBO"
                description="Conseil stratégique, déploiement sur mesure, pilotage Skills-Based. Avec vous, pas pour vous."
                tone="sun"
                iconStyle="bubble"
                iconSize="lg"
                surface="tinted"
                onClick={() => navigate('/marketing/accompagnement')}
              />
            </FadeInWhenVisible>
          </CardGrid>
        </div>
      </section>

      {/* ── 4. Interactive Product Demo ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-primary-50/30 to-white py-page">
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-page items-center">
            {/* Colonne texte */}
            <div className="flex flex-col gap-stack-lg">
              <FadeInWhenVisible direction="up">
                <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
                  La Learning App SBO
                </span>
              </FadeInWhenVisible>
              <FadeInWhenVisible direction="up" delay={0.1}>
                <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                  Essaie-la avant{' '}
                  <span className="text-accent-400">d'en parler à ton équipe</span>.
                </h2>
              </FadeInWhenVisible>
              <FadeInWhenVisible direction="up" delay={0.2}>
                <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-lg">
                  Pas besoin de demo call, pas besoin de slides. Clique sur les onglets de la
                  maquette, regarde l'app vivre, comprends en 30 secondes.
                </p>
              </FadeInWhenVisible>

              <FadeInWhenVisible direction="up" delay={0.3}>
                <ul className="flex flex-col gap-stack m-0 p-0 list-none pt-stack">
                  {[
                    'Passeport Compétences Dreyfus — Novice → Expert mesurable',
                    'Matching Talents-Projets par IA (recommandations contextuelles)',
                    'Coaching 1-1 intégré (messagerie, corrections, visio)',
                    'Journal de bord réflexif + Veille pédagogique IA-augmentée',
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <CheckCircle2 size={20} className="text-primary-600 shrink-0 mt-0.5" />
                      <span className="font-body text-body text-ink-800">{f}</span>
                    </li>
                  ))}
                </ul>
              </FadeInWhenVisible>

              <FadeInWhenVisible direction="up" delay={0.4}>
                <div className="flex items-center gap-3 pt-stack">
                  <Link to="/marketing/learning-app">
                    <Button variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                      Voir toutes les fonctionnalités
                    </Button>
                  </Link>
                </div>
              </FadeInWhenVisible>
            </div>

            {/* Colonne mockup */}
            <FadeInWhenVisible direction="left" delay={0.15}>
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-8 bg-gradient-to-br from-primary-100/40 via-accent-100/30 to-primary-50/40 blur-3xl pointer-events-none"
                />
                <TiltCard maxRotation={6} className="relative">
                  <InteractiveAppMockup />
                </TiltCard>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* ── 5. Humains + outils ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-secondary-50/20 to-white py-page">
        <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-page items-center">
          {/* Texte */}
          <div className="flex flex-col gap-stack-lg">
            <FadeInWhenVisible direction="up">
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                On n'apprend pas{' '}
                <span className="relative inline-block">
                  avec des outils.
                  <svg
                    aria-hidden
                    viewBox="0 0 200 12"
                    fill="none"
                    className="absolute -bottom-2 left-0 w-full text-accent-400"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      d="M2 8 Q 25 1, 50 6 T 100 6 T 150 6 T 198 6"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
                    />
                  </svg>
                </span>
                <br />
                On apprend <span className="text-accent-400">avec des humains</span> — accompagnés
                par des outils.
              </h2>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.2}>
              <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0 max-w-lg">
                Nos formateurs deviennent des architectes de l'apprentissage. Des pédagogues qui
                maîtrisent l'IA sans s'y soumettre. Des artisans qui combinent technologie et
                présence.
              </p>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.3}>
              <div className="flex flex-wrap items-center gap-3 pt-stack">
                <MagneticButton strength={12}>
                  <Link to="/marketing/formation">
                    <Button variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                      Devenir Formateur Augmenté
                    </Button>
                  </Link>
                </MagneticButton>
                <Link to="/marketing/magazine">
                  <Button variant="ghost" size="lg">
                    Lire le magazine
                  </Button>
                </Link>
              </div>
            </FadeInWhenVisible>
          </div>

          {/* Portrait + floating quote */}
          <FadeInWhenVisible direction="left" delay={0.2}>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-ink-100">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80&auto=format&fit=crop"
                  alt="Formatrice augmentée en session"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="absolute -bottom-6 -left-6 max-w-xs bg-white rounded-2xl shadow-2xl border border-ink-100 p-stack-lg flex flex-col gap-2"
              >
                <Quote size={20} className="text-primary-500" />
                <p className="font-display font-medium text-body text-ink-900 leading-snug m-0">
                  "Je ne forme plus, je crée des expériences."
                </p>
                <p className="font-body text-caption text-ink-500 m-0">Sophie, promotion 2026</p>
              </motion.div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── 6. Métriques ─────────────────────────────────────────────────────── */}
      <section className="py-page bg-gradient-to-b from-white to-primary-50/40">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-section-lg">
          <FadeInWhenVisible direction="up">
            <SectionHeader
              variant="default"
              tone="primary"
              size="lg"
              icon={TrendingUp}
              title="Des résultats mesurables"
              subtitle="Chaque chiffre raconte une transformation. La nôtre, et la vôtre."
            />
          </FadeInWhenVisible>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-stack-lg">
            {(
              [
                { to: 200, suffix: '+', label: 'formateurs certifiés', Icon: Users },
                { to: 40, suffix: '+', label: 'organisations clientes', Icon: Building2 },
                { to: 120, suffix: '+', label: 'modules pédagogiques', Icon: BookOpen },
                { to: 97, suffix: ' %', label: 'satisfaction apprenants', Icon: Star },
              ] as const
            ).map(({ to, suffix, label, Icon }, i) => (
              <FadeInWhenVisible key={label} direction="up" delay={i * 0.08}>
                <StatCard
                  tone="brand"
                  surface="tinted"
                  size="md"
                  icon={<Icon size={20} />}
                  value={<CountUp to={to} suffix={suffix} />}
                  label={label}
                />
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Témoignages ───────────────────────────────────────────────────── */}
      <section className="py-page bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-section-lg">
          <FadeInWhenVisible direction="up">
            <div className="flex flex-col gap-stack">
              <SectionHeader
                variant="accent"
                tone="warm"
                size="lg"
                title="Ce qu'ils en disent"
                subtitle="Les leaders L&D parlent mieux que nous."
              />
              <p className="font-body text-caption text-ink-400 italic m-0 pl-4">
                Témoignages illustratifs — de vrais retours clients seront publiés à mesure que les
                autorisations sont reçues.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack">
            {TESTIMONIALS.map(({ quote, author, role, portrait }, i) => (
              <FadeInWhenVisible key={author} direction="up" delay={i * 0.1}>
                <article className="h-full rounded-2xl bg-gradient-to-br from-white to-primary-50/40 border border-primary-100 p-6 flex flex-col gap-stack-lg hover:shadow-lg hover:border-primary-200 transition-all duration-base">
                  <Quote size={20} className="text-primary-400" />
                  <p className="font-body text-body text-ink-800 leading-relaxed m-0 flex-1">
                    "{quote}"
                  </p>
                  <div className="flex items-center gap-3 pt-stack border-t border-ink-100">
                    <img
                      src={portrait}
                      alt=""
                      className="w-10 h-10 rounded-pill object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="font-display font-bold text-body-sm text-ink-900">
                        {author}
                      </span>
                      <span className="font-body text-caption text-ink-500">{role}</span>
                    </div>
                  </div>
                </article>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. CTA finale — brand gradient + glassmorphic card ────────────────── */}
      <section className="py-page bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-pill bg-primary-500/25 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 flex flex-col items-center">
          <FadeInWhenVisible direction="up">
            <div className="w-full rounded-3xl bg-white/10 backdrop-blur-glass-heavy border border-white/20 shadow-2xl p-section-lg flex flex-col items-center text-center gap-stack-lg">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-white/15 border border-white/25">
                <Sparkles size={14} className="text-accent-400" />
                <span className="font-body text-caption font-semibold text-white tracking-wider uppercase">
                  30 jours pour déployer
                </span>
              </span>
              <h2 className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-extrabold text-white leading-[1.02] tracking-tight m-0">
                Prêt à démarrer votre{' '}
                <span className="text-accent-400">transformation SBO</span> ?
              </h2>
              <p className="font-body text-body-lg text-white/85 leading-relaxed m-0 max-w-prose">
                Échangeons 30 minutes pour comprendre vos enjeux et tracer le chemin le plus court
                vers l'impact.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-stack">
                <MagneticButton strength={14}>
                  <Link to="/marketing/contact">
                    <Button variant="warm" size="xl" trailingIcon={<ArrowRight size={20} />}>
                      Réserver un échange
                    </Button>
                  </Link>
                </MagneticButton>
                <Link to="/marketing/learning-app">
                  <Button variant="glass" size="xl">
                    Voir la démo
                  </Button>
                </Link>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
};

export default MarketingHome;
