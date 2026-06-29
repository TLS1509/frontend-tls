/**
 * MarketingFormation — Refined Minimal Premium Design (Phase Redesign)
 *
 * Tone: soft primary with minimal accents
 * Clean, minimalist, premium aesthetic with refined glassmorphism.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Award,
  Clock,
  Users,
  BookOpen,
  Wand2,
  BarChart3,
  Sparkles,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Shield,
  GraduationCap,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import {
  FadeInWhenVisible,
  MagneticButton,
  MarqueeRow,
  ScrollRevealCanvas,
  StickyScrollStory,
  type StoryPanel,
} from '../../components/marketing/motion';
import gradientTealOrangeBg from '../../../brand-assets/patterns/backgrounds/pattern_gradient-teal-orange_bg-v1.svg?url';
import { SEOHead } from './components/SEOHead';

// Module names aligned with the live site (thelearningsociety.fr/formation)
const MODULES = [
  {
    n: '01',
    title: "Le Formateur Augmenté par l'IA : Une Révolution Pédagogique",
    desc: "Fondamentaux de l'IA générative, des LLMs et de leurs usages pédagogiques. Vocabulaire commun, cartographie des outils du marché.",
    duration: '1h',
  },
  {
    n: '02',
    title: "Le Prompt Engineering pour le Formateur : Maîtriser la Communication avec l'IA",
    desc: "Techniques de prompt engineering pour concevoir des instructions efficaces et reproductibles. Library de prompts pédagogiques prêts à l'emploi.",
    duration: '1h',
  },
  {
    n: '03',
    title: "Choisir les bons outils d'IA en fonction de son contexte de formation",
    desc: "Panorama des outils IA pour la formation, critères de sélection, intégration dans votre stack pédagogique existant.",
    duration: '1h',
  },
  {
    n: '04',
    title: "Découvrir l'IA dans la Conception de Formation",
    desc: "Intégrer l'IA dans l'ingénierie pédagogique sans perdre l'intention humaine. Méthodologie STRIDE appliquée.",
    duration: '1h',
  },
  {
    n: '05',
    title: "Utiliser l'IA pour enrichir l'animation et l'accompagnement sans déshumaniser",
    desc: "Utilisation live de l'IA en séance : démonstrations, quiz adaptatifs, feedback instantané. Posture du formateur augmenté.",
    duration: '1h',
  },
  {
    n: '06',
    title: "Automatisation Augmentée par l'IA",
    desc: "Emails, comptes-rendus, évaluations, fiches de suivi : l'IA comme assistant invisible pour libérer votre temps.",
    duration: '1h',
  },
  {
    n: '07',
    title: "Éthique, responsabilité et accompagnement critique des apprenants avec l'IA",
    desc: 'RGPD, propriété intellectuelle, biais algorithmiques. La posture du formateur augmenté responsable et conforme.',
    duration: '1h',
  },
];

// "Public cible du parcours" — 4 profils from live site
const PUBLIC_CIBLE = [
  {
    icon: <BookOpen size={28} />,
    role: 'Formateurs / Animateurs',
    desc: "Vous concevez et animez des formations et souhaitez intégrer l'IA à vos pratiques sans perdre votre signature pédagogique.",
  },
  {
    icon: <BarChart3 size={28} />,
    role: 'Responsables Formation',
    desc: "Vous pilotez la stratégie formation d'une organisation et cherchez à moderniser durablement votre approche L&D.",
  },
  {
    icon: <Wand2 size={28} />,
    role: 'Concepteurs / Ingénieurs Pédagogiques',
    desc: "Vous créez des contenus et parcours d'apprentissage et voulez exploiter les nouvelles possibilités de l'IA générative.",
  },
  {
    icon: <Sparkles size={28} />,
    role: 'Débutants & Initiés IA',
    desc: "Vous commencez avec l'IA ou avez déjà quelques notions, et voulez structurer votre pratique pour l'appliquer à la formation.",
  },
];

// "Compétences clés développées" — derived from live site sections
const COMPETENCES_CLES = [
  "Maîtriser les fondamentaux de l'IA générative et son vocabulaire",
  'Concevoir des prompts pédagogiques reproductibles et efficaces',
  'Choisir et orchestrer les outils IA adaptés à votre contexte',
  "Intégrer l'IA dans l'ingénierie pédagogique (méthodologie STRIDE)",
  "Animer des séances augmentées par l'IA en présentiel et distanciel",
  "Automatiser les tâches administratives récurrentes (comptes rendus, bilans, quiz)",
  "Sécuriser votre pratique : RGPD, droits IA, propriété intellectuelle",
  "Adopter la posture du Formateur Augmenté et inscrire vos acquis dans votre Passeport de Compétences",
];

const PRICING = [
  {
    name: 'Autonome',
    price: '249€',
    desc: 'Pour démarrer à votre rythme.',
    features: [
      'Accès à tous les modules',
      'Ressources téléchargeables',
      'Forum de la communauté',
      'Certificat de complétion',
    ],
    cta: "S'inscrire",
    variant: 'ghost' as const,
    highlight: false,
  },
  {
    name: 'Certifiant',
    price: '369€',
    desc: 'Formation complète avec Open Badge certifiant.',
    features: [
      'Tout le plan Autonome',
      'Open Badge certifiant',
      'Évaluations corrigées',
      'Accès à vie aux mises à jour',
      'Groupe d\'échange live (×2/mois)',
    ],
    cta: "S'inscrire, certifiant",
    variant: 'warm' as const,
    highlight: true,
  },
  {
    name: 'Premium',
    price: '890€',
    desc: 'Coaching individuel inclus.',
    features: [
      'Tout le plan Certifiant',
      '3 sessions coaching individuel (60 min)',
      'Feedback personnalisé sur vos projets',
      'Accès prioritaire aux nouveaux modules',
      'Support direct par email',
    ],
    cta: "S'inscrire, coaching",
    variant: 'primary' as const,
    highlight: false,
  },
];

const FAQ = [
  {
    q: "Faut-il déjà connaître l'IA pour suivre la formation ?",
    a: "Non, la formation part des bases et progresse graduellement. Le module 1 vous donne toutes les clés pour comprendre l'IA générative, même sans pré-requis technique.",
  },
  {
    q: 'La formation est-elle éligible à une prise en charge OPCO ?',
    a: 'La formation est réalisée en partenariat avec C-Campus. La prise en charge OPCO est possible selon votre secteur. Contactez-nous pour vérifier votre éligibilité.',
  },
  {
    q: 'Quelle est la durée de la formation ?',
    a: "Environ 7 heures de contenu réparties sur 7 modules (1h par module), 100 % à distance. En autonome, vous progressez à votre rythme. En certifiant, des sessions live bi-mensuelles rythment l'apprentissage.",
  },
  {
    q: "Qu'est-ce qu'un Open Badge ?",
    a: "Un Open Badge est une certification numérique vérifiable, reconnue par des employeurs et plateformes professionnelles comme LinkedIn. Il atteste de vos compétences avec une preuve cryptographique.",
  },
  {
    q: 'Puis-je passer du plan Autonome au plan Certifiant ?',
    a: "Oui, le passage d'un plan à l'autre est possible à tout moment, avec un simple complément tarifaire.",
  },
];

// ─── Module Timeline (horizontal snap-scroll) ─────────────────────────────────
const ModuleTimeline: React.FC = () => {
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    if (!scrollerRef.current) return;
    const cardWidth = 320 + 16; // card w-80 + gap
    scrollerRef.current.scrollBy({ left: dir * cardWidth * 1.5, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Scroll controls — desktop only */}
      <div className="hidden md:flex items-center justify-end gap-stack-xs mb-stack">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Module précédent"
          className="w-11 h-11 rounded-pill border border-ink-200 bg-white text-ink-700 hover:bg-ink-50 hover:border-primary-300 flex items-center justify-center transition-colors duration-fast min-h-touch min-w-touch"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Module suivant"
          className="w-11 h-11 rounded-pill border border-ink-200 bg-white text-ink-700 hover:bg-ink-50 hover:border-primary-300 flex items-center justify-center transition-colors duration-fast min-h-touch min-w-touch"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Scroller */}
      <div
        ref={scrollerRef}
        className="flex gap-stack overflow-x-auto snap-x snap-mandatory scroll-px-6 px-6 -mx-6 pb-stack"
        style={{ scrollbarWidth: 'thin' }}
      >
        {MODULES.map((m, i) => (
          <motion.article
            key={m.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="snap-start shrink-0 w-80 rounded-2xl bg-white border border-ink-100 p-stack-lg flex flex-col gap-stack shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-base"
          >
            <div className="flex items-start justify-between">
              <span className="font-display text-h2 font-extrabold text-primary-600 leading-none tracking-tight">
                {m.n}
              </span>
              <span className="inline-flex items-center gap-tight px-2 py-1 rounded-lg bg-primary-50 text-primary-700 text-caption font-bold">
                <Clock size={12} />
                {m.duration}
              </span>
            </div>
            <h3 className="font-display text-h4 font-bold text-ink-900 leading-tight m-0">
              {m.title}
            </h3>
            <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0 flex-1">
              {m.desc}
            </p>
            <div className="pt-stack border-t border-ink-100 flex items-center gap-stack-xs">
              <span className="font-body text-caption font-semibold text-primary-600">
                Module {m.n}
              </span>
              <ArrowRight size={14} className="text-primary-600 ml-auto" />
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

// ─── FAQ Accordion ────────────────────────────────────────────────────────────
const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-stack-xs">
      {FAQ.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <FadeInWhenVisible key={item.q} direction="up" delay={i * 0.05}>
            <div
              className={`rounded-2xl border transition-all duration-base ${
                isOpen
                  ? 'bg-white border-primary-200 shadow-md'
                  : 'bg-ink-50/40 border-ink-100 hover:bg-white hover:border-ink-200'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full text-left px-stack-lg py-stack flex items-center gap-stack min-h-touch group"
              >
                <span
                  className={`flex-1 font-display font-bold text-body leading-snug ${
                    isOpen ? 'text-primary-700' : 'text-ink-900'
                  }`}
                >
                  {item.q}
                </span>
                <span
                  className={`shrink-0 w-8 h-8 rounded-pill flex items-center justify-center transition-colors duration-base ${
                    isOpen ? 'bg-primary-100 text-primary-700' : 'bg-white border border-ink-200 text-ink-600 group-hover:border-primary-300'
                  }`}
                  aria-hidden
                >
                  {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className="px-stack-lg pb-stack-lg pt-0">
                      <p className="font-body text-body text-ink-700 leading-relaxed m-0 max-w-prose">
                        {item.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeInWhenVisible>
        );
      })}
    </div>
  );
};

export const MarketingFormation: React.FC = () => {
  return (
    <div className="bg-white">
      <SEOHead
        title="Formation Formateur Augmenté par l'IA · Certifiante C-Campus"
        description="Formation IA pour formateurs et L&D : 7 modules, 7h en ligne, Open Badge certifiant, éligible OPCO. Partenariat C-Campus. À votre rythme."
        canonical="/marketing/formation"
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Course',
              name: "Formation Formateur Augmenté par l'IA",
              description:
                "Formation certifiante en IA pédagogique pour formateurs et professionnels L&D : 7 modules, 7h à distance, Open Badge vérifiable, éligible OPCO.",
              provider: {
                '@type': 'Organization',
                name: 'The Learning Society',
                url: 'https://thelearningsociety.fr',
              },
              courseMode: 'online',
              inLanguage: 'fr',
              timeRequired: 'PT7H',
              numberOfCredits: '7 modules',
              teaches: [
                "IA générative et prompts pédagogiques",
                "Ingénierie pédagogique augmentée par l'IA",
                "Méthode STRIDE pour la transformation pédagogique",
                "Outils IA adaptés aux formateurs",
              ],
              offers: [
                { '@type': 'Offer', name: 'Autonome', price: '249', priceCurrency: 'EUR' },
                { '@type': 'Offer', name: 'Certifiant', price: '369', priceCurrency: 'EUR' },
                { '@type': 'Offer', name: 'Premium', price: '890', priceCurrency: 'EUR' },
              ],
            },
            {
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: "Faut-il déjà connaître l'IA pour suivre la formation ?",
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: "Non, la formation part des bases et progresse graduellement. Le module 1 vous donne toutes les clés pour comprendre l'IA générative, même sans pré-requis technique.",
                  },
                },
                {
                  '@type': 'Question',
                  name: 'La formation est-elle éligible à une prise en charge OPCO ?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'La formation est réalisée en partenariat avec C-Campus. La prise en charge OPCO est possible selon votre secteur. Contactez-nous pour vérifier votre éligibilité.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Quelle est la durée de la formation ?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: "Environ 7 heures de contenu réparties sur 7 modules (1h par module), 100 % à distance. En autonome, vous progressez à votre rythme. En certifiant, des sessions live bi-mensuelles rythment l'apprentissage.",
                  },
                },
                {
                  '@type': 'Question',
                  name: "Qu'est-ce qu'un Open Badge ?",
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: "Un Open Badge est une certification numérique vérifiable, reconnue par des employeurs et plateformes professionnelles. Il atteste de vos compétences avec une preuve cryptographique.",
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Puis-je passer du plan Autonome au plan Certifiant ?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: "Oui, le passage d'un plan à l'autre est possible à tout moment, avec un simple complément tarifaire.",
                  },
                },
              ],
            },
          ],
        }}
      />
      {/* ── 1. Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-page overflow-hidden bg-gradient-to-b from-secondary-50/60 via-white to-white">
        {/* Ambient blobs — light, subtle */}
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-pill bg-secondary-100/50 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-pill bg-primary-100/40 blur-3xl" />
        </div>
        <FadeInWhenVisible direction="up">
          <div className="relative max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
            <span className="inline-flex items-center gap-stack-xs px-3 py-1.5 rounded-pill bg-secondary-50 border border-secondary-200 shadow-xs">
              <Award size={14} className="text-secondary-600" />
              <span className="font-body text-caption font-semibold text-secondary-700 tracking-wider uppercase">
                Programme certifiant · Open Badge
              </span>
            </span>

            <h1 className="font-display font-extrabold text-ink-900 leading-[0.95] tracking-tight m-0 text-[clamp(2.75rem,7vw,5.5rem)] max-w-4xl">
              Devenez <span className="text-secondary-600">Formateur Augmenté</span>.
            </h1>

            <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl">
              7 modules, 7 heures, 100 % à distance. Maîtrisez l'IA pédagogique,
              intégrez la méthode STRIDE et enrichissez votre Passeport de Compétences,
              en partenariat avec C-Campus.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-stack-xs pt-stack">
              <MagneticButton strength={14}>
                <a href="#pricing">
                  <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                    Voir les tarifs
                  </Button>
                </a>
              </MagneticButton>
              <a href="#modules">
                <Button variant="secondary" size="lg" trailingIcon={<ChevronDown size={18} />}>
                  Découvrir le programme
                </Button>
              </a>
            </div>

            {/* Metric strip — only verifiable course facts */}
            <div className="flex flex-wrap items-center justify-center gap-section pt-section pb-stack border-t border-ink-100 mt-stack-lg max-w-2xl">
              {[
                { display: '7', label: 'modules' },
                { display: '7h', label: 'de contenu' },
              ].map((m) => (
                <div key={m.label} className="flex flex-col items-center text-center">
                  <span className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-extrabold text-ink-900 leading-none tabular-nums">
                    {m.display}
                  </span>
                  <span className="font-body text-caption text-ink-500 mt-1 uppercase tracking-wider font-semibold">
                    {m.label}
                  </span>
                </div>
              ))}
              <span className="inline-flex items-center gap-tight px-3 py-1.5 rounded-pill bg-primary-50 border border-primary-200 text-primary-700 font-body text-caption font-semibold">
                <Award size={13} /> En partenariat avec C-Campus
              </span>
            </div>
          </div>
        </FadeInWhenVisible>
      </section>

      {/* ── 1b. Trust strip (MarqueeRow) ────────────────────────────────────── */}
      <div className="border-y border-ink-100 py-stack overflow-hidden bg-ink-50/40">
        <MarqueeRow
          duration={38}
          gapClassName="gap-10"
          edgeFade
          items={[
            <span key="modules" className="flex items-center gap-stack-xs font-body text-caption font-semibold text-ink-700 whitespace-nowrap">
              <span className="font-display font-extrabold text-secondary-500 text-body-sm">7 modules</span>
              <span className="text-ink-300">·</span> 7h de contenu
            </span>,
            <span key="badge" className="flex items-center gap-stack-xs font-body text-caption font-semibold text-ink-700 whitespace-nowrap">
              <Award size={14} className="text-secondary-500 shrink-0" />
              Open Badge certifiant
            </span>,
            <span key="ccampus" className="flex items-center gap-stack-xs font-body text-caption font-semibold text-ink-700 whitespace-nowrap">
              <span className="font-display font-extrabold text-primary-600 text-body-sm">C-Campus</span>
              <span className="text-ink-300">·</span> Qualiopi
            </span>,
            <span key="opco" className="flex items-center gap-stack-xs font-body text-caption font-semibold text-ink-700 whitespace-nowrap">
              <CheckCircle2 size={14} className="text-success-base shrink-0" />
              Éligible OPCO
            </span>,
            <span key="distanciel" className="flex items-center gap-stack-xs font-body text-caption font-semibold text-ink-700 whitespace-nowrap">
              <span className="font-display font-extrabold text-secondary-500 text-body-sm">100 %</span>
              <span className="text-ink-300">·</span> à distance
            </span>,
            <span key="auto" className="flex items-center gap-stack-xs font-body text-caption font-semibold text-ink-700 whitespace-nowrap">
              <GraduationCap size={14} className="text-primary-500 shrink-0" />
              À votre rythme
            </span>,
          ]}
        />
      </div>

      {/* ── 2. Module Programme — StickyScrollStory ─────────────────────────── */}
      <section id="modules" className="bg-white">
        {/* Section header */}
        <div className="max-w-7xl mx-auto px-6 pt-page pb-section-lg">
          <FadeInWhenVisible direction="up">
            <div className="flex flex-col gap-stack max-w-3xl">
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                7 modules pour bâtir votre posture.
              </h2>
              <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl">
                Du fondamental à l'expert. Chaque module combine théorie, atelier pratique
                et mise en situation supervisée.
              </p>
            </div>
          </FadeInWhenVisible>
        </div>

        {/* Sticky scroll — desktop; stack — mobile */}
        <StickyScrollStory
          panels={MODULES.map<StoryPanel>((m) => ({
            eyebrow: `Module ${m.n} · ${m.duration}`,
            title: m.title,
            body: m.desc,
          }))}
          eyebrowToneClass="text-secondary-600"
          visual={(i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="w-full max-w-[400px]"
            >
              <div className="rounded-3xl bg-gradient-to-br from-secondary-50 to-secondary-100 border border-secondary-200 p-10 flex flex-col items-center justify-center gap-stack-lg shadow-warm-md aspect-square">
                <span
                  aria-hidden
                  className="font-display font-extrabold text-secondary-200 leading-none tracking-tight select-none"
                  style={{ fontSize: 'clamp(5rem, 14vw, 8rem)' }}
                >
                  {MODULES[i].n}
                </span>
                <span className="inline-flex items-center gap-tight px-3 py-1.5 rounded-pill bg-secondary-500 text-white font-body text-caption font-bold">
                  <Clock size={12} />
                  {MODULES[i].duration}
                </span>
              </div>
            </motion.div>
          )}
          className="pb-page"
        />
      </section>

      {/* ── 3. Public cible du parcours (4 profils, depuis le live) ─────────── */}
      <section className="py-page bg-gradient-to-b from-primary-50/30 via-white to-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-section">
          <FadeInWhenVisible direction="up">
            <div className="flex flex-col gap-stack max-w-3xl">
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Quatre profils, une même <span className="text-accent-400">ambition</span>.
              </h2>
              <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl">
                Que vous commenciez avec l'IA ou que vous soyez déjà initié·e, le parcours
                s'adapte à votre niveau et à votre contexte professionnel.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-stack">
            {PUBLIC_CIBLE.map((t, i) => (
              <FadeInWhenVisible key={t.role} direction="up" delay={i * 0.08}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className="h-full rounded-2xl bg-gradient-to-br from-white to-secondary-50/30 border border-secondary-100 p-stack-lg flex flex-col gap-stack shadow-sm hover:shadow-lg hover:border-secondary-200 transition-all duration-base"
                >
                  <span
                    className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary-100 text-primary-600 shadow-sm"
                  >
                    {t.icon}
                  </span>
                  <h3 className="font-display text-h4 font-bold text-ink-900 leading-tight m-0">
                    {t.role}
                  </h3>
                  <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">
                    {t.desc}
                  </p>
                </motion.article>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3.5. Compétences clés développées (depuis le live) ──────────────── */}
      <section className="py-page bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-page items-center">
          <FadeInWhenVisible direction="up">
            <div className="flex flex-col gap-stack-lg">
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Les 8 compétences que <span className="text-accent-400">vous développez</span>.
              </h2>
              <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-md">
                À la fin du parcours, vous avez 8 compétences opérationnelles, validées
                par un Open Badge, inscrites dans votre Passeport de Compétences TLS,
                et déployables dès la semaine suivante.
              </p>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="left" delay={0.15}>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-stack-xs m-0 p-0 list-none">
              {COMPETENCES_CLES.map((c, i) => (
                <motion.li
                  key={c}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-primary-50/50 border border-primary-100"
                >
                  <CheckCircle2 size={18} className="text-primary-600 shrink-0 mt-0.5" />
                  <span className="font-body text-body-sm text-ink-800 leading-snug">{c}</span>
                </motion.li>
              ))}
            </ul>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── 3.75. Partenariat C-Campus (poids visuel dédié, depuis le live) ── */}
      <section className="py-page bg-gradient-to-b from-white to-primary-50 relative">
        <div className="relative max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-page items-center">
          <FadeInWhenVisible direction="up">
            <div className="flex flex-col gap-stack-lg">
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                En partenariat avec <span className="text-accent-400">C-Campus</span>.
              </h2>
              <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0 max-w-lg">
                Le parcours est réalisé 100 % à distance en partenariat avec
                <strong className="text-ink-900"> C-Campus</strong>.
                Votre Open Badge est reconnu sur LinkedIn.
                La prise en charge OPCO est ouverte selon votre secteur.
              </p>
              <ul className="flex flex-col gap-stack-xs m-0 p-0 list-none">
                {[
                  'Prise en charge OPCO éligible selon votre secteur',
                  'Open Badge vérifiable par cryptographie',
                  'Reconnaissance sur LinkedIn',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-stack-xs font-body text-body text-ink-700">
                    <CheckCircle2 size={18} className="text-primary-600 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="left" delay={0.25}>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative aspect-square max-w-sm mx-auto rounded-2xl bg-white border border-ink-100 p-section flex flex-col items-center justify-center gap-stack shadow-md hover:shadow-lg transition-shadow duration-base"
            >
              <div className="flex flex-col items-center gap-stack-lg text-center">
                <div className="w-16 h-16 rounded-lg bg-primary-50 flex items-center justify-center">
                  <Award size={32} className="text-primary-600" />
                </div>
                <div className="flex flex-col gap-tight">
                  <span className="font-display text-h2 font-extrabold text-ink-900 leading-none">
                    C-Campus
                  </span>
                  <span className="font-body text-caption text-ink-600 uppercase tracking-widest">
                    Partenaire certifiant
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-stack-xs pt-stack">
                  {['OPCO'].map((b) => (
                    <span
                      key={b}
                      className="inline-flex items-center px-2.5 py-1 rounded-lg bg-primary-50 border border-primary-200 text-primary-700 font-body text-caption font-bold uppercase tracking-wider"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── 3.9. Direction C — Illustrated Glass (scroll reveal test) ─────── */}
      <ScrollRevealCanvas
        bgSrc={gradientTealOrangeBg}
        height="120vh"
        revealDuration={0.65}
        edgeSoftness={12}
        overlay="bg-white/20"
      >
        {/* Content floats above the painting as it reveals */}
        <div className="h-full flex flex-col items-center justify-center px-6 gap-section max-w-6xl mx-auto w-full">
          <FadeInWhenVisible direction="up">
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight text-center m-0 max-w-3xl">
              Une méthode <span className="text-primary-600">bâtie</span> pour durer.
            </h2>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack w-full">
            {[
              {
                n: '1',
                title: 'Fondamentaux solides',
                body: "Vocabulaire, outils, limites de l'IA générative. Vous savez ce que vous faites et pourquoi.",
              },
              {
                n: '2',
                title: 'Méthode STRIDE',
                body: "L'ingénierie pédagogique augmentée par l'IA, sans perdre la cohérence ni l'intention humaine.",
              },
              {
                n: '3',
                title: 'Passeport certifiant',
                body: "Open Badge vérifiable, compétences inscrites dans votre passeport TLS.",
              },
            ].map((item, i) => (
              <FadeInWhenVisible key={item.n} direction="up" delay={i * 0.1}>
                <article className="rounded-2xl bg-white/70 backdrop-blur-glass-medium border border-white/60 shadow-card p-stack-lg flex flex-col gap-stack h-full">
                  <span className="font-display text-[2.5rem] font-extrabold text-primary-300 leading-none">
                    {item.n}
                  </span>
                  <h3 className="font-display text-h4 font-bold text-ink-900 leading-tight m-0">
                    {item.title}
                  </h3>
                  <p className="font-body text-body-sm text-ink-700 leading-relaxed m-0 flex-1">
                    {item.body}
                  </p>
                </article>
              </FadeInWhenVisible>
            ))}
          </div>
          <FadeInWhenVisible direction="up" delay={0.3}>
            <MagneticButton strength={12}>
              <a href="#pricing">
                <Button variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                  Voir les tarifs
                </Button>
              </a>
            </MagneticButton>
          </FadeInWhenVisible>
        </div>
      </ScrollRevealCanvas>

      {/* ── 4. Pricing ──────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-page bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-section">
          <FadeInWhenVisible direction="up">
            <div className="flex flex-col gap-stack items-center text-center max-w-3xl mx-auto">
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Trois plans, un Open Badge.
              </h2>
              <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0">
                Choisissez le rythme qui vous ressemble. Vous pouvez toujours évoluer.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack items-stretch pt-stack">
            {PRICING.map((p, i) => (
              <FadeInWhenVisible key={p.name} direction="up" delay={i * 0.1}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className={`relative h-full rounded-2xl p-stack-lg flex flex-col gap-stack-lg ${
                    p.highlight
                      ? 'bg-gradient-to-br from-secondary-500 to-secondary-600 text-white shadow-warm-md md:scale-105 z-base'
                      : 'bg-white border border-ink-200 shadow-card hover:shadow-card-hover hover:-translate-y-1 hover:border-ink-300 transition-all duration-base'
                  }`}
                >
                  {p.highlight && (
                    <motion.span
                      initial={{ opacity: 0, y: -8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, type: 'spring', stiffness: 240 }}
                      className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-tight px-3 py-1 rounded-pill bg-accent-400 text-ink-900 text-caption font-bold uppercase tracking-wider shadow-lg whitespace-nowrap"
                    >
                      <Sparkles size={12} />
                      Recommandé
                    </motion.span>
                  )}
                  <div className="flex flex-col gap-tight">
                    <span
                      className={`font-body text-caption font-bold uppercase tracking-wider ${
                        p.highlight ? 'text-accent-200' : 'text-secondary-600'
                      }`}
                    >
                      {p.name}
                    </span>
                    <p
                      className={`font-display text-[clamp(2.5rem,4vw,3.5rem)] font-extrabold m-0 leading-none ${
                        p.highlight ? 'text-white' : 'text-ink-900'
                      }`}
                    >
                      {p.price}
                    </p>
                    <p
                      className={`font-body text-body-sm m-0 mt-1 ${
                        p.highlight ? 'text-white/85' : 'text-ink-500'
                      }`}
                    >
                      {p.desc}
                    </p>
                  </div>
                  <ul className="flex flex-col gap-stack-xs m-0 p-0 list-none flex-1">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className={`flex items-start gap-stack-xs font-body text-body-sm ${
                          p.highlight ? 'text-white/95' : 'text-ink-700'
                        }`}
                      >
                        <CheckCircle2
                          size={16}
                          className={`shrink-0 mt-0.5 ${p.highlight ? 'text-accent-300' : 'text-primary-500'}`}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <MagneticButton strength={p.highlight ? 14 : 8} className="w-full">
                    <Link to="/marketing/contact">
                      <Button
                        variant={p.highlight ? 'ghost' : p.variant}
                        size="lg"
                        fullWidth
                        trailingIcon={<ArrowRight size={16} />}
                        className={
                          p.highlight
                            ? '!bg-white !text-secondary-700 hover:!bg-accent-50 !border-0'
                            : ''
                        }
                      >
                        {p.cta}
                      </Button>
                    </Link>
                  </MagneticButton>
                </motion.article>
              </FadeInWhenVisible>
            ))}
          </div>

          {/* Trust line */}
          <FadeInWhenVisible direction="up">
            <div className="flex flex-wrap items-center justify-center gap-stack-lg pt-stack">
              {[
                { icon: <Award size={16} />, label: 'C-Campus' },
                { icon: <Award size={16} />, label: 'Open Badge' },
                { icon: <GraduationCap size={16} />, label: 'OPCO éligible' },
                { icon: <Shield size={16} />, label: 'RGPD conforme' },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex items-center gap-stack-xs px-stack py-1 rounded-pill bg-ink-50 border border-ink-100"
                >
                  <span className="text-primary-700">{b.icon}</span>
                  <span className="font-body text-caption font-semibold text-ink-700">{b.label}</span>
                </div>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── 5. FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-page bg-white">
        <div className="max-w-3xl mx-auto px-6 flex flex-col gap-section">
          <div className="flex flex-col gap-stack max-w-2xl">
            <FadeInWhenVisible direction="up" delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Toutes vos questions, sans détour.
              </h2>
            </FadeInWhenVisible>
          </div>
          <FaqAccordion />
        </div>
      </section>

      {/* ── 6. Final CTA — warm gradient ──────────────────────────────────────── */}
      <section className="py-page bg-gradient-to-br from-secondary-600 via-secondary-700 to-primary-800 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-pill bg-secondary-500/25 blur-3xl" />
        </div>
        <FadeInWhenVisible direction="up">
          <div className="relative max-w-3xl mx-auto px-6 rounded-2xl bg-white/10 backdrop-blur-glass-heavy border border-white/20 p-section-lg flex flex-col items-center text-center gap-stack-lg">
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-extrabold text-white leading-[1.05] tracking-tight m-0">
              Prêt·e à rejoindre la prochaine promo ?
            </h2>
            <p className="font-body text-body-lg text-white/85 leading-relaxed m-0 max-w-prose">
              Nous échangeons 30 minutes pour comprendre votre contexte et vous recommander le bon parcours.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-stack-xs pt-stack">
              <MagneticButton strength={14}>
                <Link to="/marketing/contact">
                  <Button
                    variant="warm"
                    size="lg"
                    trailingIcon={<ArrowRight size={18} />}
                  >
                    Réserver un échange
                  </Button>
                </Link>
              </MagneticButton>
              <Link to="/marketing/learning-app">
                <Button
                  variant="glass"
                  size="lg"
                  trailingIcon={<ArrowUpRight size={18} />}
                >
                  Voir la plateforme
                </Button>
              </Link>
            </div>
          </div>
        </FadeInWhenVisible>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
    </div>
  );
};

export default MarketingFormation;
