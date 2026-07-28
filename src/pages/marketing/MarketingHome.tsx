/**
 * MarketingHome — homepage de production, `/website` (route index).
 *
 * Reconstruite le 28/07/2026 depuis le copy arbitré PAD-page-homepage.md
 * (docs/site/propositions-PAD/) : positionnement cabinet de conseil & studio
 * SBO. Structure PAD : Hero → Manifeste → Learn/Do/Match → Écosystème →
 * Réassurance → Double CTA (chaud RDV / froid La Vigie).
 *
 * Conservé de la version précédente : hero vidéo aquarelle full-bleed (le copy
 * PAD demande explicitement une "animation hero watercolor"), fade au scroll
 * sans scroll-jack, reduced-motion → poster statique.
 *
 * Écarts copy documentés :
 *  - "La Vigie SBO" → "La Vigie" (nom tranché en réunion 28/07, RECAP §1.5) ;
 *  - CTA hero "Évaluer votre maturité (2 min)" → sans durée (la spec
 *    autodiagnostic annonce 3 min ; on évite la contradiction).
 *
 * Discipline : vous (pas tu), pas de métrique inventée, pas de client nommé,
 * pas d'em dash, CTA verbe+objet, pas de parallax.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Compass,
  Gem,
  GraduationCap,
  Handshake,
  PenTool,
  Rocket,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import {
  FadeInWhenVisible,
  MagneticButton,
  MeshGradientBg,
  useMarketingToast,
} from '../../components/marketing/motion';
import { ScrollProgressIndicator } from '../../components/marketing/scroll-effects';
import { SEOHead } from './components/SEOHead';

// ─── 1. Hero — vidéo aquarelle full-bleed, positionnement SBO ────────────────

const Hero: React.FC = () => {
  const reduced = useReducedMotion();
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (reduced) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, [reduced]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 1.15]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.75, 1], reduced ? [1, 1, 1] : [1, 0.4, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] overflow-hidden bg-black">
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ scale, opacity: videoOpacity }}
        aria-hidden
      >
        {reduced ? (
          <img
            src="/marketing/assets/hero-watercolor.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/marketing/assets/hero-watercolor.webp"
            className="absolute inset-0 w-full h-full object-cover"
            tabIndex={-1}
          >
            <source src="/videos/aquarelle-hero-loop.mp4" type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/* Vignette de lisibilité concentrée derrière le texte, transparente aux
          bords : la vidéo reste riche en périphérie, le texte reste AA. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(120% 85% at 50% 52%, rgba(15,42,48,0.62) 0%, rgba(15,42,48,0.36) 44%, rgba(15,42,48,0) 78%)',
        }}
      />

      <div className="relative min-h-[100dvh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: 'easeOut' }}
          className="w-full max-w-page mx-auto px-6 py-page text-center flex flex-col items-center gap-stack-lg"
        >
          <p className="font-body text-body-sm font-bold text-white/85 m-0">
            Le cabinet de conseil & studio expert en Skills-Based Organization.
          </p>

          <h1 className="font-display font-extrabold text-white leading-[0.98] tracking-display m-0 [text-wrap:balance] max-w-[24ch] text-[clamp(2.75rem,6.5vw,5.25rem)]">
            Ne formez plus pour former.{' '}
            <span className="text-accent-400">Bâtissez votre moteur de performance.</span>
          </h1>

          <p className="font-body text-body-lg text-white/85 leading-relaxed m-0 max-w-[62ch]">
            The Learning Society accompagne les organisations dans leur
            transition vers un modèle centré sur les compétences. Conseil
            stratégique, création pédagogique sur-mesure et Intelligence
            Artificielle pour aligner enfin vos talents avec vos enjeux business.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-stack-xs pt-stack">
            <MagneticButton strength={14}>
              <Button to="/website/contact" variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                Échanger sur votre projet SBO
              </Button>
            </MagneticButton>
            <Button to="/website/diagnostic" variant="glass" size="lg" trailingIcon={<ArrowUpRight size={18} />}>
              Évaluer votre maturité
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── 2. Manifeste — bandeau teal, la conviction SBO ──────────────────────────

const BENEFICES = [
  { icon: <Rocket size={20} />, label: 'Agilité décuplée' },
  { icon: <Gem size={20} />, label: 'Capital humain révélé' },
  { icon: <Bot size={20} />, label: 'Symbiose Humain-IA' },
];

const Manifeste: React.FC = () => (
  <section className="relative bg-primary-700 text-white">
    <div aria-hidden className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-black/25 to-transparent pointer-events-none" />
    <div className="max-w-wide mx-auto px-6 py-page lg:py-section-lg flex flex-col gap-section-lg">
      <FadeInWhenVisible>
        <div className="max-w-4xl flex flex-col gap-stack-lg">
          <h2 className="font-display font-extrabold text-white leading-[1.06] tracking-tight m-0 [text-wrap:balance] text-[clamp(2rem,4.2vw,3.25rem)]">
            Le poste est mort. L'avenir appartient aux compétences.
          </h2>
          <p className="font-body text-body-lg text-white/85 leading-relaxed m-0 max-w-3xl">
            Face à l'obsolescence rapide des savoirs et à l'accélération de
            l'IA, les fiches de poste traditionnelles ne suffisent plus. Les
            organisations les plus performantes ne gèrent plus des titres :
            elles déploient des compétences fluides et actionnables. Bâtir une
            Skills-Based Organization, c'est arrêter de parier sur les diplômes
            pour se concentrer sur l'impact réel.
          </p>
        </div>
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.1}>
        <ul className="flex flex-col sm:flex-row flex-wrap gap-stack sm:gap-section m-0 p-0 list-none">
          {BENEFICES.map((b) => (
            <li key={b.label} className="flex items-center gap-stack-xs">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-pill bg-white/12 text-accent-300">
                {b.icon}
              </span>
              <span className="font-display text-body-lg font-bold text-white">{b.label}</span>
            </li>
          ))}
        </ul>
      </FadeInWhenVisible>
    </div>
  </section>
);

// ─── 3. Le moteur — Learn → Do → Match (vraie séquence, numérotée) ───────────

const ETAPES = [
  {
    num: '1',
    verbe: 'Learn',
    sousTitre: 'Acquérir',
    detail: "L'apprentissage ciblé via notre ingénierie pédagogique spécialisée.",
  },
  {
    num: '2',
    verbe: 'Do',
    sousTitre: 'Prouver',
    detail: "Application immédiate sur les projets réels de l'entreprise.",
  },
  {
    num: '3',
    verbe: 'Match',
    sousTitre: 'Allouer',
    detail:
      'Passeport de compétences dynamique et agents IA pour recommander la meilleure allocation de talents sur les futurs projets.',
  },
];

const Moteur: React.FC = () => (
  <section className="bg-white">
    <div className="max-w-wide mx-auto px-6 py-page flex flex-col gap-section-lg">
      <FadeInWhenVisible>
        <div className="max-w-3xl flex flex-col gap-stack">
          <h2 className="font-display font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0 [text-wrap:balance] text-[clamp(2rem,4.2vw,3.25rem)]">
            Le cycle <span className="text-primary-700">Learn → Do → Match</span> :
            la formation devient un actif stratégique.
          </h2>
        </div>
      </FadeInWhenVisible>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-stack-lg lg:gap-section">
        {ETAPES.map((e, i) => (
          <FadeInWhenVisible key={e.verbe} delay={i * 0.08} direction="up">
            <div className="flex h-full flex-col gap-stack border-t-2 border-primary-200 pt-stack-lg">
              <div className="flex items-baseline gap-stack-xs">
                <span className="font-display text-h1 font-extrabold text-primary-300 leading-none">
                  {e.num}
                </span>
                <h3 className="font-display text-h2 font-extrabold text-ink-900 m-0 leading-none">
                  {e.verbe}
                </h3>
                <span className="font-body text-body-sm font-bold text-primary-700">
                  {e.sousTitre}
                </span>
              </div>
              <p className="font-body text-body text-ink-600 leading-relaxed m-0">{e.detail}</p>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </div>
  </section>
);

// ─── 4. L'écosystème d'offres — 3 cartes + bandeau Learning App ──────────────

type Offre = {
  icon: React.ReactNode;
  title: string;
  role: string;
  desc: string;
  link: string;
  cta: string;
  toneClasses: {
    card: string;
    iconBubble: string;
    ctaText: string;
    outline: string;
  };
};

const OFFRES: Offre[] = [
  {
    icon: <Compass size={22} />,
    title: 'Accompagnement STRIDE',
    role: 'Audit & stratégie',
    desc:
      'La méthode en 6 étapes pour cadrer votre transition SBO et déployer vos premières solutions IA, avec des livrables tangibles à chaque jalon.',
    link: '/website/accompagnement',
    cta: 'Découvrir la méthode STRIDE',
    toneClasses: {
      card: 'border-primary-100 bg-gradient-to-br from-primary-50/60 via-white to-primary-100/30 hover:border-primary-300',
      iconBubble: 'bg-primary-100 text-primary-700',
      ctaText: 'text-primary-700',
      outline: 'focus-visible:outline-primary-500',
    },
  },
  {
    icon: <PenTool size={22} />,
    title: 'Le Studio IA & Pédagogie',
    role: 'Production & déploiement',
    desc:
      'Contenus pédagogiques sur-mesure, agents IA métiers et intégration dans votre écosystème : une production opérationnelle, clé en main.',
    link: '/website/studio',
    cta: 'Visiter le Studio',
    toneClasses: {
      card: 'border-secondary-100 bg-gradient-to-br from-secondary-50/60 via-white to-secondary-100/30 hover:border-secondary-300',
      iconBubble: 'bg-secondary-100 text-secondary-700',
      ctaText: 'text-secondary-700',
      outline: 'focus-visible:outline-secondary-500',
    },
  },
  {
    icon: <GraduationCap size={22} />,
    title: 'Upskilling L&D',
    role: 'Formation interne',
    desc:
      "Des projets d'upskilling sur-mesure qui commencent par habiliter vos concepteurs et formateurs, pilotés par la Learning App.",
    link: '/website/upskilling',
    cta: 'Former vos équipes',
    toneClasses: {
      card: 'border-accent-200/70 bg-gradient-to-br from-accent-50/60 via-white to-accent-100/30 hover:border-accent-300',
      iconBubble: 'bg-accent-100 text-accent-800',
      ctaText: 'text-accent-800',
      outline: 'focus-visible:outline-accent-500',
    },
  },
];

const Ecosysteme: React.FC = () => (
  <section className="relative bg-gradient-to-b from-white to-primary-50/30">
    <div className="max-w-wide mx-auto px-6 py-page flex flex-col gap-section-lg">
      <FadeInWhenVisible>
        <div className="max-w-3xl flex flex-col gap-stack">
          <h2 className="font-display font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0 [text-wrap:balance] text-[clamp(2rem,4.2vw,3.25rem)]">
            Tout ce dont vous avez besoin pour opérer votre transition SBO.
          </h2>
        </div>
      </FadeInWhenVisible>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-stack-lg">
        {OFFRES.map((o, i) => (
          <FadeInWhenVisible key={o.title} delay={i * 0.07} direction="up">
            <Link
              to={o.link}
              className={`group relative flex h-full min-h-[280px] flex-col justify-between gap-stack-lg overflow-hidden rounded-2xl border p-stack-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-offset-2 ${o.toneClasses.card} ${o.toneClasses.outline}`}
            >
              <div className="flex flex-col gap-stack">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${o.toneClasses.iconBubble} group-hover:scale-110 transition-transform duration-base`}>
                    {o.icon}
                  </span>
                  <span className="font-body text-caption font-bold text-ink-500">{o.role}</span>
                </div>
                <h3 className="font-display text-h3 font-bold text-ink-900 m-0 leading-tight">{o.title}</h3>
                <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">{o.desc}</p>
              </div>
              <span className={`flex items-center gap-stack-xs font-semibold text-body-sm ${o.toneClasses.ctaText}`}>
                {o.cta}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-base" />
              </span>
            </Link>
          </FadeInWhenVisible>
        ))}
      </div>

      {/* Bandeau SaaS — la Learning App comme moteur d'échelle */}
      <FadeInWhenVisible delay={0.1}>
        <Link
          to="/website/learning-app"
          className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-stack-lg overflow-hidden rounded-2xl bg-gradient-to-br from-primary-800 via-primary-900 to-ink-900 p-stack-lg sm:p-section transition-all duration-500 hover:-translate-y-1 hover:shadow-brand-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
        >
          <div aria-hidden className="absolute -top-24 -right-24 w-96 h-96 rounded-pill bg-primary-500/25 blur-3xl pointer-events-none group-hover:bg-primary-400/35 transition-colors duration-700" />
          <div className="relative flex flex-col gap-stack-xs max-w-2xl">
            <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-extrabold text-white leading-[1.1] m-0">
              Passez à l'échelle avec la <span className="text-accent-400">Learning App TLS</span>.
            </h3>
            <p className="font-body text-body text-white/70 leading-relaxed m-0">
              Veille continue, apprentissage par l'action et Passeport de
              compétences vivant : le logiciel qui opère votre modèle SBO au
              quotidien.
            </p>
          </div>
          <span className="relative flex shrink-0 items-center gap-stack-xs font-semibold text-accent-400">
            Découvrir la Learning App
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-base" />
          </span>
        </Link>
      </FadeInWhenVisible>
    </div>
  </section>
);

// ─── 5. Réassurance — expertise, fondateurs, partenaire C-Campus ─────────────

const Reassurance: React.FC = () => (
  <section className="bg-white border-t border-ink-100">
    <div className="max-w-wide mx-auto px-6 py-page">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-section items-start">
        <div className="lg:col-span-7 flex flex-col gap-stack-lg">
          <FadeInWhenVisible>
            <h2 className="font-display font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0 [text-wrap:balance] text-[clamp(2rem,4.2vw,3.25rem)]">
              L'alliance de l'ingénierie pédagogique de pointe et de
              l'Intelligence Artificielle.
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.08}>
            <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl">
              Fondée par Chloé Mimault et Pierre-Armand Dennery : la recherche
              en ingénierie pédagogique, l'architecture IA et la transformation
              des organisations, réunies dans une même structure experte.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.14}>
            <div>
              <Button to="/website/equipe" variant="ghost" size="md" trailingIcon={<ArrowRight size={16} />}>
                Rencontrer les fondateurs
              </Button>
            </div>
          </FadeInWhenVisible>
        </div>

        <FadeInWhenVisible delay={0.1} className="lg:col-span-5">
          <div className="flex items-start gap-stack rounded-2xl bg-primary-50 p-stack-lg">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
              <Handshake size={22} />
            </span>
            <div className="flex flex-col gap-stack-xs">
              <h3 className="font-display text-h4 font-bold text-ink-900 m-0 leading-tight">
                Partenaire stratégique de C-Campus
              </h3>
              <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">
                Référence française de l'ingénierie de formation et de l'AFEST,
                C-Campus certifie les dispositifs que nous concevons ensemble.
              </p>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </div>
  </section>
);

// ─── 6. Double CTA — bloc chaud (RDV B2B) + bloc froid (La Vigie) ────────────

const DoubleCta: React.FC = () => {
  const toast = useMarketingToast();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast('Merci, votre inscription à La Vigie est enregistrée.');
    setEmail('');
  };

  return (
    <section className="bg-white">
      <div className="max-w-wide mx-auto px-6 pt-stack pb-page">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-stack-lg">
          {/* Bloc chaud — B2B */}
          <FadeInWhenVisible className="lg:col-span-3">
            <div className="relative h-full overflow-hidden rounded-2xl bg-ink-900 text-white px-6 py-section-lg sm:px-section-lg">
              <MeshGradientBg tone="ink" intensity="subtle" />
              <div className="relative flex flex-col gap-stack-lg">
                <h2 className="font-display font-extrabold text-white leading-[1.04] tracking-tight m-0 [text-wrap:balance] text-[clamp(2rem,3.6vw,3rem)]">
                  Prêt à transformer votre organisation ?
                </h2>
                <p className="font-body text-body-lg text-white/80 leading-relaxed m-0 max-w-xl">
                  Trente minutes avec les fondateurs pour comprendre votre
                  contexte et tracer le chemin le plus court vers l'impact.
                  Sans engagement.
                </p>
                <div className="flex flex-wrap items-center gap-stack-xs pt-stack-xs">
                  <MagneticButton strength={16}>
                    <Button to="/website/contact" variant="secondary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                      Planifier un échange de 30 min
                    </Button>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Bloc froid — La Vigie */}
          <FadeInWhenVisible delay={0.08} className="lg:col-span-2">
            <div className="flex h-full flex-col justify-between gap-stack-lg rounded-2xl bg-primary-50 px-6 py-section-lg sm:px-stack-lg">
              <div className="flex flex-col gap-stack">
                <h2 className="font-display text-h3 font-bold text-ink-900 m-0 leading-tight">
                  Pas encore prêt ? Restez en veille.
                </h2>
                <p className="font-body text-body text-ink-600 leading-relaxed m-0">
                  Abonnez-vous à La Vigie pour recevoir nos meilleures analyses
                  sur l'IA, les compétences et le futur du travail.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-stack-xs">
                <label htmlFor="home-vigie-email" className="sr-only">
                  Votre adresse email professionnelle
                </label>
                <input
                  id="home-vigie-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email professionnel"
                  className="h-12 w-full rounded-pill border border-ink-200 bg-white px-5 font-body text-body text-ink-900 placeholder:text-ink-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                />
                <Button type="submit" variant="primary" size="lg" fullWidth trailingIcon={<ArrowRight size={18} />}>
                  S'abonner à La Vigie
                </Button>
                <Link
                  to="/website/vigie"
                  className="font-body text-caption text-primary-700 hover:text-primary-800 transition-colors duration-fast w-fit"
                >
                  Découvrir La Vigie
                </Link>
              </form>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};

export const MarketingHome: React.FC = () => (
  <div className="bg-white">
    <SEOHead
      title="The Learning Society · Cabinet de conseil & studio expert en Skills-Based Organization"
      description="Ne formez plus pour former. Conseil stratégique, création pédagogique sur-mesure et IA pour transformer votre organisation en Skills-Based Organization."
      canonical="/website"
      schema={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'The Learning Society',
        url: 'https://thelearningsociety.fr',
        logo: 'https://thelearningsociety.fr/favicon.svg',
        description:
          'Cabinet de conseil et studio expert en Skills-Based Organization : conseil stratégique STRIDE, studio IA & pédagogie, upskilling et Learning App.',
        foundingYear: 2022,
        address: {
          '@type': 'PostalAddress',
          streetAddress: '26 rue Olivier Noyer',
          addressLocality: 'Paris',
          postalCode: '75014',
          addressCountry: 'FR',
        },
        sameAs: ['https://www.linkedin.com/company/thelearningsociety'],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: 'contact@thelearningsociety.fr',
          availableLanguage: 'French',
        },
      }}
    />

    <ScrollProgressIndicator height={3} />

    <Hero />
    <Manifeste />
    <Moteur />
    <Ecosysteme />
    <Reassurance />
    <DoubleCta />
  </div>
);

export default MarketingHome;
