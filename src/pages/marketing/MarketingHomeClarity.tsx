/**
 * MarketingHomeClarity — variante LIGHT de la home marketing TLS.
 *
 * La home existante est sombre. Cette variante est entièrement claire :
 * fonds blancs / dégradés chauds doux, cartes blanches shadow-card,
 * texte ink-900. Hero vidéo light + voile bg-white/30.
 *
 * 8 sections : Hero · Conviction · Pour qui · 3 piliers · Méthode STRIDE ·
 * Auto-diagnostic · Preuve & équipe · CTA final + newsletter.
 *
 * 100% Tailwind tokens. Aucun route wiring (fichier autonome).
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  GraduationCap,
  Building2,
  Smartphone,
  Lightbulb,
  Target,
  Quote,
  CheckCircle2,
  Mail,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import { FadeInWhenVisible, MagneticButton } from '../../components/marketing/motion';
import { HeroSection, ConvictionSection, OffersSection, MethodSection, CtaSection } from '../../components/marketing/sections';

const FOCUS_RING =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500';

// ─── Hero (using HeroSection layout router) ──────────────────────────────────

const Hero: React.FC<{ reduce: boolean }> = ({ reduce }) => (
  <HeroSection layout="type-hero" animation={!reduce}>
    <FadeInWhenVisible className="flex flex-col items-center text-center gap-stack-lg">
      <h1 className="font-display font-extrabold text-ink-900 leading-[0.98] tracking-display m-0 [text-wrap:balance] max-w-[16ch] text-[clamp(2.4rem,6.4vw,4rem)]">
        L'IA au service des compétences
      </h1>
      <p className="font-body text-body-lg text-primary-600 font-semibold m-0">
        Pas l'inverse.
      </p>

      <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0 max-w-[60ch]">
        On aide les organisations et les pros de la formation à passer à une
        logique de compétences (Skills-Based Organization, ou SBO). L'IA comme
        accélérateur, sans dénaturer la pédagogie.
      </p>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-stack-xs pt-stack">
        <MagneticButton strength={14}>
          <Link to="/website/diagnostic" className={`inline-block rounded-pill ${FOCUS_RING}`}>
            <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
              Évaluer ma maturité SBO
            </Button>
          </Link>
        </MagneticButton>
        <Link to="/website/contact" className={`inline-block rounded-pill ${FOCUS_RING}`}>
          <Button variant="secondary" size="lg">
            Réserver 30 min
          </Button>
        </Link>
      </div>
    </FadeInWhenVisible>
  </HeroSection>
);

// ─── 2. Conviction (using ConvictionSection layout router) ───────────────────

const Conviction: React.FC = () => (
  <ConvictionSection layout="quote-led" tone="primary">
    <FadeInWhenVisible className="flex flex-col gap-stack-lg">
      <h2 className="font-display font-extrabold text-ink-900 tracking-tight m-0 [text-wrap:balance] text-[clamp(1.9rem,3.6vw,3rem)] leading-tight">
        Les outils changent chaque mois. Les compétences restent votre{' '}
        <span className="text-primary-600">boussole</span>.
      </h2>
      <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-[58ch] mx-auto">
        Passer d'une logique de postes à une logique de compétences, avec
        l'humain au centre. Les technologies évoluent vite. Vos compétences,
        elles, se cultivent et durent.
      </p>
    </FadeInWhenVisible>
  </ConvictionSection>
);

// ─── 3. Pour qui ──────────────────────────────────────────────────────────────

const Audience: React.FC = () => (
  <section className="bg-gradient-to-b from-secondary-50 to-white">
    <div className="max-w-page mx-auto px-6 py-page">
      <FadeInWhenVisible className="text-center max-w-[40ch] mx-auto mb-section">
        <p className="font-body text-caption font-semibold uppercase tracking-widest text-secondary-600 m-0">
          Pour qui
        </p>
        <h2 className="font-display font-extrabold text-ink-900 tracking-tight m-0 mt-stack text-[clamp(1.7rem,3vw,2.5rem)]">
          Deux chemins, une même logique
        </h2>
      </FadeInWhenVisible>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
        {/* Card A — warm */}
        <FadeInWhenVisible direction="up" delay={0.05}>
          <div className="h-full flex flex-col gap-stack-lg rounded-2xl bg-white border border-secondary-100 p-8 shadow-card hover:shadow-card-hover transition-shadow duration-base">
            <div className="flex items-center gap-stack-xs">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-secondary-50 text-secondary-600">
                <GraduationCap size={22} />
              </span>
              <h3 className="font-display font-bold text-ink-900 tracking-tight m-0 text-h4">
                Je me forme
              </h3>
            </div>
            <p className="font-body text-body text-ink-600 leading-relaxed m-0">
              Vous voulez intégrer l'IA dans votre pratique de formation, sans
              perdre votre exigence pédagogique.
            </p>
            <ul className="flex flex-col gap-stack-xs m-0 p-0 list-none">
              {['Formation Formateur Augmenté', 'Learning App (accès Solo)'].map((item) => (
                <li key={item} className="flex items-start gap-stack-xs font-body text-body text-ink-700">
                  <CheckCircle2 size={18} className="text-secondary-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/website/learning-app"
              className={`mt-auto inline-flex items-center gap-1.5 min-h-touch font-body font-semibold text-secondary-700 hover:text-secondary-800 rounded-pill ${FOCUS_RING}`}
            >
              Voir les parcours
              <ArrowRight size={16} />
            </Link>
          </div>
        </FadeInWhenVisible>

        {/* Card B — primary */}
        <FadeInWhenVisible direction="up" delay={0.12}>
          <div className="h-full flex flex-col gap-stack-lg rounded-2xl bg-white border border-primary-100 p-8 shadow-card hover:shadow-card-hover transition-shadow duration-base">
            <div className="flex items-center gap-stack-xs">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary-50 text-primary-600">
                <Building2 size={22} />
              </span>
              <h3 className="font-display font-bold text-ink-900 tracking-tight m-0 text-h4">
                Je transforme mon organisation
              </h3>
            </div>
            <p className="font-body text-body text-ink-600 leading-relaxed m-0">
              Vous pilotez la montée en compétences de vos équipes et cherchez une
              méthode qui s'applique directement à vos métiers.
            </p>
            <ul className="flex flex-col gap-stack-xs m-0 p-0 list-none">
              {['Méthode STRIDE', 'Upskilling L&D sur-mesure', 'Pass Pro équipes'].map((item) => (
                <li key={item} className="flex items-start gap-stack-xs font-body text-body text-ink-700">
                  <CheckCircle2 size={18} className="text-primary-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/website/accompagnement"
              className={`mt-auto inline-flex items-center gap-1.5 min-h-touch font-body font-semibold text-primary-700 hover:text-primary-800 rounded-pill ${FOCUS_RING}`}
            >
              Découvrir l'accompagnement
              <ArrowRight size={16} />
            </Link>
          </div>
        </FadeInWhenVisible>
      </div>
    </div>
  </section>
);

// ─── 4. Les 3 piliers ──────────────────────────────────────────────────────────

type Pillar = {
  tag: string;
  title: string;
  desc: string;
  link: string;
  cta: string;
  icon: React.ReactNode;
  accent: 'primary' | 'warm' | 'sun';
};

const PILLARS: Pillar[] = [
  {
    tag: 'Produit',
    title: 'La Learning App',
    desc: 'La plateforme qui suit vos compétences, vos parcours et votre passeport vérifiable.',
    link: '/website/learning-app',
    cta: 'Explorer la plateforme',
    icon: <Smartphone size={22} />,
    accent: 'primary',
  },
  {
    tag: 'Service',
    title: 'Accompagnement & Conseil',
    desc: 'Un upskilling L&D conçu avec vous, ancré dans vos métiers et vos enjeux réels.',
    link: '/website/accompagnement',
    cta: "Voir l'accompagnement",
    icon: <Lightbulb size={22} />,
    accent: 'warm',
  },
  {
    tag: 'Méthode',
    title: 'Expertise & Diagnostic',
    desc: 'Un regard structuré sur votre maturité Skills-Based et un plan d\'action clair.',
    link: '/website/methode',
    cta: 'Découvrir la méthode',
    icon: <Target size={22} />,
    accent: 'sun',
  },
];

const ACCENT: Record<
  Pillar['accent'],
  { border: string; chipBg: string; chipText: string; iconBg: string; iconText: string; link: string }
> = {
  primary: {
    border: 'border-primary-100',
    chipBg: 'bg-primary-50',
    chipText: 'text-primary-700',
    iconBg: 'bg-primary-50',
    iconText: 'text-primary-600',
    link: 'text-primary-700 hover:text-primary-800',
  },
  warm: {
    border: 'border-secondary-100',
    chipBg: 'bg-secondary-50',
    chipText: 'text-secondary-700',
    iconBg: 'bg-secondary-50',
    iconText: 'text-secondary-600',
    link: 'text-secondary-700 hover:text-secondary-800',
  },
  sun: {
    border: 'border-accent-200',
    chipBg: 'bg-accent-50',
    chipText: 'text-accent-700',
    iconBg: 'bg-accent-50',
    iconText: 'text-accent-600',
    link: 'text-accent-700 hover:text-accent-800',
  },
};

const Pillars: React.FC = () => {
  const [featured, ...rest] = PILLARS;
  const fa = ACCENT[featured.accent];

  return (
    <section className="bg-white">
      <div className="max-w-page mx-auto px-6 py-page">
        <FadeInWhenVisible className="text-center max-w-[40ch] mx-auto mb-section">
          <p className="font-body text-caption font-semibold uppercase tracking-widest text-primary-600 m-0">
            Notre approche
          </p>
          <h2 className="font-display font-extrabold text-ink-900 tracking-tight m-0 mt-stack text-[clamp(1.7rem,3vw,2.5rem)]">
            Trois façons d'avancer
          </h2>
        </FadeInWhenVisible>

        <div className="flex flex-col gap-stack-lg">
          {/* Featured: Learning App — le pilier produit, revenus récurrents */}
          <FadeInWhenVisible direction="up">
            <div
              className={`flex flex-col md:flex-row md:items-center gap-stack-lg rounded-2xl bg-primary-50/60 border ${fa.border} p-8 sm:p-9 shadow-card hover:shadow-card-hover transition-shadow duration-base`}
            >
              <span
                className={`inline-flex items-center justify-center w-14 h-14 shrink-0 rounded-xl ${fa.iconBg} ${fa.iconText}`}
              >
                {featured.icon}
              </span>
              <div className="flex flex-col gap-stack flex-1">
                <span
                  className={`self-start inline-flex px-2.5 py-0.5 rounded-pill ${fa.chipBg} ${fa.chipText} font-body text-micro font-semibold uppercase tracking-widest`}
                >
                  {featured.tag}
                </span>
                <h3 className="font-display font-bold text-ink-900 tracking-tight m-0 text-h3">
                  {featured.title}
                </h3>
                <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-prose">
                  {featured.desc}
                </p>
              </div>
              <Link
                to={featured.link}
                className={`shrink-0 inline-flex items-center gap-1.5 min-h-touch font-body font-semibold ${fa.link} rounded-pill ${FOCUS_RING}`}
              >
                {featured.cta}
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </FadeInWhenVisible>

          {/* Les 2 autres : côte à côte, taille secondaire */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
            {rest.map((p, i) => {
              const a = ACCENT[p.accent];
              return (
                <FadeInWhenVisible key={p.title} direction="up" delay={0.06 * (i + 1)}>
                  <div
                    className={`h-full flex flex-col gap-stack rounded-2xl bg-white border ${a.border} p-7 shadow-card hover:shadow-card-hover transition-shadow duration-base`}
                  >
                    <span
                      className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${a.iconBg} ${a.iconText}`}
                    >
                      {p.icon}
                    </span>
                    <span
                      className={`self-start inline-flex px-2.5 py-0.5 rounded-pill ${a.chipBg} ${a.chipText} font-body text-micro font-semibold uppercase tracking-widest`}
                    >
                      {p.tag}
                    </span>
                    <h3 className="font-display font-bold text-ink-900 tracking-tight m-0 text-h4">
                      {p.title}
                    </h3>
                    <p className="font-body text-body text-ink-600 leading-relaxed m-0">{p.desc}</p>
                    <Link
                      to={p.link}
                      className={`mt-auto inline-flex items-center gap-1.5 min-h-touch font-body font-semibold ${a.link} rounded-pill ${FOCUS_RING}`}
                    >
                      {p.cta}
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </FadeInWhenVisible>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── 5. Méthode STRIDE ──────────────────────────────────────────────────────────

const STRIDE: { step: string; gloss: string }[] = [
  { step: "S'orienter", gloss: 'Cadrer' },
  { step: 'Tester', gloss: 'Expérimenter' },
  { step: 'Réaliser', gloss: 'Produire' },
  { step: 'Intégrer', gloss: 'Ancrer' },
  { step: 'Déployer', gloss: 'Diffuser' },
  { step: 'Évoluer', gloss: 'Pérenniser' },
];

const Stride: React.FC = () => (
  <section className="bg-gradient-to-b from-white to-secondary-50">
    <div className="max-w-page mx-auto px-6 py-page">
      <FadeInWhenVisible className="text-center max-w-[42ch] mx-auto mb-section">
        <p className="font-body text-caption font-semibold uppercase tracking-widest text-primary-600 m-0">
          La méthode
        </p>
        <h2 className="font-display font-extrabold text-ink-900 tracking-tight m-0 mt-stack text-[clamp(1.7rem,3vw,2.5rem)]">
          STRIDE, six étapes pour avancer
        </h2>
      </FadeInWhenVisible>

      <FadeInWhenVisible>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-stack m-0 p-0 list-none">
          {STRIDE.map((s, i) => (
            <li
              key={s.step}
              className="flex items-center gap-stack rounded-xl bg-white border border-primary-100 p-5 shadow-card"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 shrink-0 rounded-pill bg-primary-50 text-primary-700 font-display font-bold text-body-lg">
                {i + 1}
              </span>
              <span className="flex flex-col">
                <span className="font-display font-bold text-ink-900 text-body-lg leading-tight">
                  {s.step}
                </span>
                <span className="font-body text-caption text-ink-500">{s.gloss}</span>
              </span>
            </li>
          ))}
        </ol>
      </FadeInWhenVisible>

      <FadeInWhenVisible className="mt-section text-center">
        <Link
          to="/website/methode"
          className={`inline-flex items-center gap-1.5 min-h-touch font-body font-semibold text-primary-700 hover:text-primary-800 rounded-pill ${FOCUS_RING}`}
        >
          La méthode STRIDE
          <ArrowRight size={16} />
        </Link>
      </FadeInWhenVisible>
    </div>
  </section>
);

// ─── 6. Auto-diagnostic teaser ──────────────────────────────────────────────────

const DIAG_LEVELS = ['Émergent', 'En route', 'Avancé', 'Pionnier SBO'];

const Diagnostic: React.FC = () => (
  <section className="bg-accent-50/40">
    <div className="max-w-page mx-auto px-6 py-page">
      <FadeInWhenVisible className="max-w-[44ch] mx-auto text-center flex flex-col items-center gap-stack-lg">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-white border border-accent-200 text-accent-700 font-body text-caption font-semibold">
          <Compass size={15} />
          Auto-diagnostic
        </span>

        <h2 className="font-display font-extrabold text-ink-900 tracking-tight m-0 [text-wrap:balance] text-[clamp(1.8rem,3.4vw,2.8rem)] leading-tight">
          Où en est votre organisation sur l'échelle{' '}
          <span className="text-secondary-600">Skills-Based</span> ?
        </h2>

        <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0 max-w-[52ch]">
          5 questions, 2 minutes. Recevez votre score de maturité et un parcours
          recommandé.
        </p>

        <ul className="flex flex-wrap items-center justify-center gap-stack-xs m-0 p-0 list-none">
          {DIAG_LEVELS.map((lvl) => (
            <li
              key={lvl}
              className="inline-flex px-3 py-1 rounded-pill bg-white border border-accent-200 font-body text-caption font-semibold text-ink-700"
            >
              {lvl}
            </li>
          ))}
        </ul>

        <MagneticButton strength={14}>
          <Link to="/website/diagnostic" className={`inline-block rounded-pill ${FOCUS_RING}`}>
            <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
              Évaluer ma maturité SBO
            </Button>
          </Link>
        </MagneticButton>
      </FadeInWhenVisible>
    </div>
  </section>
);

// ─── 7. Preuve & équipe ──────────────────────────────────────────────────────

const Proof: React.FC = () => (
  <section className="bg-white">
    <div className="max-w-page mx-auto px-6 py-page">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-page items-start">
        {/* Stats partenariat */}
        <FadeInWhenVisible direction="right">
          <div className="flex flex-col gap-stack-lg rounded-2xl bg-primary-50 border border-primary-100 p-8 shadow-card">
            <p className="font-body text-caption font-semibold uppercase tracking-widest text-primary-700 m-0">
              Partenariat C-Campus
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-lg">
              <div className="flex flex-col gap-tight">
                <span className="font-display font-extrabold text-primary-700 text-[clamp(2.4rem,5vw,3.4rem)] leading-none tracking-tight">
                  578
                </span>
                <span className="font-body text-body-sm text-ink-600">professionnels formés</span>
              </div>
              <div className="flex flex-col gap-tight">
                <span className="font-display font-extrabold text-secondary-600 text-[clamp(2.4rem,5vw,3.4rem)] leading-none tracking-tight">
                  +93 %
                </span>
                <span className="font-body text-body-sm text-ink-600">de satisfaction</span>
              </div>
            </div>
            <p className="font-body text-caption text-ink-500 m-0">
              Source : C-Campus, formations de formateurs 2023.
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Équipe + citation */}
        <FadeInWhenVisible direction="left" delay={0.08}>
          <div className="flex flex-col gap-stack-lg">
            <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0">
              Chloé Mimault et Pierre-Armand Dennery, formateurs et ingénieurs
              pédagogiques.
            </p>
            <figure className="flex flex-col gap-stack rounded-2xl bg-white border border-secondary-100 p-7 shadow-card m-0">
              <Quote size={28} className="text-secondary-400" />
              <blockquote className="font-display font-semibold text-ink-900 text-body-lg leading-snug m-0">
                L'IA démultiplie ce que les formateurs font de mieux.
              </blockquote>
              <figcaption className="font-body text-caption font-semibold text-ink-500">
                Pierre-Armand Dennery, co-fondateur
              </figcaption>
            </figure>
          </div>
        </FadeInWhenVisible>
      </div>
    </div>
  </section>
);

// ─── 8. CTA final + newsletter ──────────────────────────────────────────────────

const FinalCta: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <section className="bg-gradient-to-b from-secondary-50 to-accent-50/40">
      <div className="max-w-page mx-auto px-6 py-page">
        <FadeInWhenVisible className="text-center max-w-[44ch] mx-auto flex flex-col items-center gap-stack-lg">
          <h2 className="font-display font-extrabold text-ink-900 tracking-tight m-0 text-[clamp(1.9rem,3.6vw,3rem)] leading-tight">
            On parle de votre projet ?
          </h2>
          <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0 max-w-[48ch]">
            30 minutes pour comprendre vos enjeux, sans engagement.
          </p>
          <MagneticButton strength={14}>
            <Link to="/website/contact" className={`inline-block rounded-pill ${FOCUS_RING}`}>
              <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                Réserver 30 min
              </Button>
            </Link>
          </MagneticButton>
        </FadeInWhenVisible>

        {/* Newsletter La Vigie SBO */}
        <FadeInWhenVisible className="mt-page max-w-[34rem] mx-auto">
          <div className="rounded-2xl bg-white border border-secondary-100 p-7 shadow-card">
            <div className="flex items-center gap-stack-xs mb-stack">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-secondary-50 text-secondary-600">
                <Mail size={20} />
              </span>
              <div className="flex flex-col">
                <h3 className="font-display font-bold text-ink-900 m-0 text-h5">La Vigie SBO</h3>
                <p className="font-body text-caption text-ink-500 m-0">
                  Le point sur les compétences et l'IA.
                </p>
              </div>
            </div>

            {subscribed ? (
              <div
                className="flex items-center gap-stack-xs rounded-xl bg-primary-50 border border-primary-100 p-4"
                role="status"
              >
                <CheckCircle2 size={20} className="text-primary-600 shrink-0" />
                <p className="font-body text-body-sm text-ink-700 m-0">
                  C'est noté. Vous recevrez la prochaine édition.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-stack-xs">
                <label htmlFor="vigie-email" className="sr-only">
                  Votre adresse email
                </label>
                <input
                  id="vigie-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@exemple.fr"
                  className={`flex-1 min-h-touch rounded-pill bg-white border border-ink-200 px-5 font-body text-body-sm text-ink-900 placeholder:text-ink-400 focus:border-primary-400 focus:outline-none ${FOCUS_RING}`}
                />
                <Button type="submit" variant="primary" size="lg">
                  S'inscrire
                </Button>
              </form>
            )}

            <p className="font-body text-caption text-ink-400 m-0 mt-stack">
              Une édition tous les quinze jours. Désinscription en un clic.
            </p>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export const MarketingHomeClarity: React.FC = () => {
  const reduce = useReducedMotion() ?? false;

  return (
    <main className="bg-white">
      <Hero reduce={reduce} />
      <Conviction />
      <Audience />
      <Pillars />
      <Stride />
      <Diagnostic />
      <Proof />
      <FinalCta />
    </main>
  );
};

export default MarketingHomeClarity;
