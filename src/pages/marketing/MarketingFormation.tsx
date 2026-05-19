/**
 * MarketingFormation — Immersive Fusion (Phase 1.3)
 *
 * Tone: warm dominant (Devenir Formateur Augmenté), primary accent on details.
 * Reuses Phase 1.0 motion primitives. 100% Tailwind, semantic spacing.
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
  MeshGradientBg,
  FadeInWhenVisible,
  MagneticButton,
  GradientText,
  CountUp,
  ParallaxLayer,
} from '../../components/marketing/motion';

const MODULES = [
  {
    n: '01',
    title: "Comprendre l'IA pour mieux l'enseigner",
    desc: "Fondamentaux de l'IA générative, LLMs et leurs usages pédagogiques. Vocabulaire commun, cartographie des outils.",
    duration: '2h',
  },
  {
    n: '02',
    title: 'Maîtriser le Prompt Engineering',
    desc: "Techniques avancées pour concevoir des instructions efficaces et reproductibles. Library de prompts pédagogiques.",
    duration: '4h',
  },
  {
    n: '03',
    title: 'Concevoir des formations augmentées',
    desc: "Intégrer l'IA dans la conception pédagogique sans perdre l'intention humaine. Méthodologie STRIDE.",
    duration: '6h',
  },
  {
    n: '04',
    title: "Animer avec l'IA en séance",
    desc: "Utilisation live de l'IA : démonstrations, quiz adaptatifs, feedback instantané. Posture et timing.",
    duration: '3h',
  },
  {
    n: '05',
    title: 'Automatiser les tâches administratives',
    desc: "Emails, comptes-rendus, évaluations, fiches de suivi — l'IA comme assistant invisible.",
    duration: '2h',
  },
  {
    n: '06',
    title: "Mesurer l'impact des formations IA",
    desc: 'KPIs, tableaux de bord, A/B testing pédagogique. Boucle damélioration continue.',
    duration: '3h',
  },
  {
    n: '07',
    title: 'Éthique, biais et responsabilité numérique',
    desc: 'RGPD, propriété intellectuelle, biais algorithmiques. La posture du formateur augmenté responsable.',
    duration: '3h',
  },
];

const TARGETS = [
  {
    icon: <BookOpen size={28} />,
    role: 'Formateurs',
    desc: "Vous concevez et animez des formations et souhaitez intégrer l'IA à vos pratiques sans perdre votre signature pédagogique.",
    tone: 'from-primary-500 to-primary-700',
  },
  {
    icon: <BarChart3 size={28} />,
    role: 'Responsables formation',
    desc: "Vous pilotez la stratégie formation d'une organisation et cherchez à moderniser durablement votre approche.",
    tone: 'from-secondary-500 to-secondary-600',
  },
  {
    icon: <Wand2 size={28} />,
    role: 'Concepteurs pédagogiques',
    desc: "Vous créez des contenus et parcours d'apprentissage et voulez exploiter les nouvelles possibilités de l'IA générative.",
    tone: 'from-accent-400 to-secondary-500',
  },
];

const PRICING = [
  {
    name: 'Autonome',
    price: '249€',
    desc: 'Pour démarrer à ton rythme.',
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
    desc: 'Le plus choisi · certification reconnue.',
    features: [
      'Tout le plan Autonome',
      'Open Badge certifiant',
      'Évaluations corrigées',
      'Accès à vie aux mises à jour',
      'Groupe d\'échange live (×2/mois)',
    ],
    cta: "S'inscrire — certifiant",
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
      'Feedback personnalisé sur tes projets',
      'Accès prioritaire aux nouveaux modules',
      'Support direct par email',
    ],
    cta: "S'inscrire — coaching",
    variant: 'primary' as const,
    highlight: false,
  },
];

const FAQ = [
  {
    q: "Faut-il déjà connaître l'IA pour suivre la formation ?",
    a: "Non, la formation part des bases et progresse graduellement. Le module 1 te donne toutes les clés pour comprendre l'IA générative, même sans pré-requis technique.",
  },
  {
    q: 'La formation est-elle éligible au CPF ou OPCO ?',
    a: 'La formation est réalisée en partenariat avec C-Campus, organisme certifié Qualiopi. La prise en charge OPCO est possible selon ton secteur — contacte-nous pour vérifier ton éligibilité.',
  },
  {
    q: 'Quelle est la durée de la formation ?',
    a: 'Environ 23 heures de contenu réparties sur 7 modules. En autonome, tu progresses à ton rythme. En certifiant, des sessions live bi-mensuelles rythment l\'apprentissage sur 8 semaines.',
  },
  {
    q: "Qu'est-ce qu'un Open Badge ?",
    a: "Un Open Badge 2.0 est une certification numérique vérifiable, reconnue par des employeurs et plateformes professionnelles (LinkedIn, France Compétences). Il atteste de tes compétences avec une preuve cryptographique.",
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
      <div className="hidden md:flex items-center justify-end gap-2 mb-stack">
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
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-6 px-6 -mx-6 pb-stack"
        style={{ scrollbarWidth: 'thin' }}
      >
        {MODULES.map((m, i) => (
          <motion.article
            key={m.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="snap-start shrink-0 w-80 rounded-2xl bg-white border border-ink-100 p-stack-lg flex flex-col gap-stack shadow-sm hover:shadow-lg hover:border-secondary-200 transition-all duration-base"
          >
            <div className="flex items-start justify-between">
              <span className="font-display text-h1 font-extrabold text-secondary-500 leading-none tracking-tight">
                {m.n}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-pill bg-secondary-50 text-secondary-700 text-caption font-bold">
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
            <div className="pt-stack border-t border-ink-100 flex items-center gap-2">
              <span className="font-body text-caption font-semibold text-secondary-600">
                Module {m.n}
              </span>
              <ArrowRight size={14} className="text-secondary-500 ml-auto" />
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
    <div className="flex flex-col gap-2">
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
      {/* ── 1. Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-page overflow-hidden bg-gradient-to-br from-secondary-50 via-white to-accent-50/40">
        <MeshGradientBg tone="warm" intensity="normal" />

        <ParallaxLayer amplitude={60} className="absolute -top-10 -right-20 pointer-events-none" aria-hidden>
          <div className="w-80 h-80 rounded-pill bg-secondary-200/30 blur-3xl" />
        </ParallaxLayer>

        <div className="relative max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <FadeInWhenVisible direction="up">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-white border border-secondary-200 shadow-xs">
              <Award size={14} className="text-secondary-600" />
              <span className="font-body text-caption font-semibold text-secondary-700 tracking-wider uppercase">
                Programme certifiant · Open Badge 2.0
              </span>
            </span>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.1}>
            <h1 className="font-display font-extrabold text-ink-900 leading-[0.95] tracking-tight m-0 text-[clamp(2.75rem,7vw,5.5rem)] max-w-4xl">
              Deviens{' '}
              <GradientText
                from="from-secondary-500"
                via="via-secondary-600"
                to="to-accent-500"
                duration={10}
              >
                Formateur Augmenté
              </GradientText>
              .
            </h1>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.2}>
            <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0 max-w-2xl">
              7 modules, 23 heures, 8 semaines. Une certification reconnue,
              en partenariat avec C-Campus. Coaching 1-1 inclus dans le plan Premium.
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-stack">
              <MagneticButton strength={14}>
                <a href="#pricing">
                  <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                    Voir les tarifs
                  </Button>
                </a>
              </MagneticButton>
              <a href="#modules">
                <Button variant="ghost" size="lg" trailingIcon={<ChevronDown size={18} />}>
                  Découvrir le programme
                </Button>
              </a>
            </div>
          </FadeInWhenVisible>

          {/* Metric strip */}
          <FadeInWhenVisible direction="up" delay={0.4}>
            <div className="grid grid-cols-3 gap-stack-lg pt-section pb-stack border-t border-secondary-100 mt-stack-lg max-w-2xl">
              {[
                { value: 7, suffix: '', label: 'modules' },
                { value: 23, suffix: 'h', label: 'de contenu' },
                { value: 200, suffix: '+', label: 'certifiés' },
              ].map((m) => (
                <div key={m.label} className="flex flex-col items-center text-center">
                  <CountUp
                    to={m.value}
                    suffix={m.suffix}
                    className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-extrabold text-secondary-700 leading-none"
                  />
                  <span className="font-body text-caption text-ink-600 mt-1 uppercase tracking-wider font-semibold">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── 2. Module Timeline ──────────────────────────────────────────────── */}
      <section id="modules" className="py-page bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-section">
          <div className="flex flex-col gap-stack max-w-3xl">
            <FadeInWhenVisible direction="up">
              <span className="font-body text-caption font-bold text-secondary-600 uppercase tracking-widest">
                Le programme
              </span>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                7 modules pour bâtir ta posture.
              </h2>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.1}>
              <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl">
                Du fondamental à l'expert. Chaque module combine théorie, atelier pratique
                et mise en situation supervisée. Scrolle horizontalement pour explorer.
              </p>
            </FadeInWhenVisible>
          </div>
          <ModuleTimeline />
        </div>
      </section>

      {/* ── 3. Pour qui ─────────────────────────────────────────────────────── */}
      <section className="py-page bg-gradient-to-b from-white via-secondary-50/30 to-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-section">
          <div className="flex flex-col gap-stack max-w-3xl">
            <FadeInWhenVisible direction="up">
              <span className="font-body text-caption font-bold text-secondary-600 uppercase tracking-widest">
                Pour qui ?
              </span>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Trois profils, une même{' '}
                <GradientText
                  from="from-secondary-500"
                  via="via-secondary-600"
                  to="to-accent-500"
                >
                  ambition
                </GradientText>
                .
              </h2>
            </FadeInWhenVisible>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-lg">
            {TARGETS.map((t, i) => (
              <FadeInWhenVisible key={t.role} direction="up" delay={i * 0.1}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className="h-full rounded-3xl bg-white border border-ink-100 p-stack-lg flex flex-col gap-stack-lg shadow-sm hover:shadow-xl hover:border-secondary-200 transition-shadow duration-base"
                >
                  <span
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${t.tone} text-white shadow-md`}
                  >
                    {t.icon}
                  </span>
                  <h3 className="font-display text-h3 font-bold text-ink-900 leading-tight m-0">
                    {t.role}
                  </h3>
                  <p className="font-body text-body text-ink-600 leading-relaxed m-0">
                    {t.desc}
                  </p>
                </motion.article>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Pricing ──────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-page bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-section">
          <div className="flex flex-col gap-stack items-center text-center max-w-3xl mx-auto">
            <FadeInWhenVisible direction="up">
              <span className="font-body text-caption font-bold text-secondary-600 uppercase tracking-widest">
                Tarification
              </span>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Trois plans, un Open Badge.
              </h2>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.1}>
              <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0">
                Choisis le rythme qui te ressemble. Tu peux toujours évoluer.
              </p>
            </FadeInWhenVisible>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack items-stretch pt-stack">
            {PRICING.map((p, i) => (
              <FadeInWhenVisible key={p.name} direction="up" delay={i * 0.1}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className={`relative h-full rounded-3xl p-stack-lg flex flex-col gap-stack-lg ${
                    p.highlight
                      ? 'bg-gradient-to-br from-secondary-500 to-secondary-600 text-white shadow-2xl md:scale-105 z-base'
                      : 'bg-white border border-ink-200 shadow-sm hover:shadow-lg hover:border-ink-300 transition-shadow duration-base'
                  }`}
                >
                  {p.highlight && (
                    <motion.span
                      initial={{ opacity: 0, y: -8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, type: 'spring', stiffness: 240 }}
                      className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-pill bg-accent-400 text-ink-900 text-caption font-bold uppercase tracking-wider shadow-lg whitespace-nowrap"
                    >
                      <Sparkles size={12} />
                      Recommandé
                    </motion.span>
                  )}
                  <div className="flex flex-col gap-1">
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
                  <ul className="flex flex-col gap-2 m-0 p-0 list-none flex-1">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className={`flex items-start gap-2 font-body text-body-sm ${
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
                { icon: <Shield size={16} />, label: 'Qualiopi · C-Campus' },
                { icon: <Award size={16} />, label: 'Open Badge 2.0' },
                { icon: <GraduationCap size={16} />, label: 'CPF / OPCO éligible' },
                { icon: <Users size={16} />, label: '200+ certifiés' },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex items-center gap-2 px-stack py-1 rounded-pill bg-ink-50 border border-ink-100"
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
      <section className="py-page bg-gradient-to-b from-white via-primary-50/30 to-white">
        <div className="max-w-3xl mx-auto px-6 flex flex-col gap-section">
          <div className="flex flex-col gap-stack max-w-2xl">
            <FadeInWhenVisible direction="up">
              <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
                Questions fréquentes
              </span>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Toutes tes questions, sans détour.
              </h2>
            </FadeInWhenVisible>
          </div>
          <FaqAccordion />
        </div>
      </section>

      {/* ── 6. Final CTA ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary-600 via-secondary-500 to-accent-400 py-page">
        <MeshGradientBg tone="warm" intensity="intense" />
        <div className="relative max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <FadeInWhenVisible direction="up">
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-extrabold text-white leading-[1.05] tracking-tight m-0">
              Prête à rejoindre la promo de septembre ?
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.1}>
            <p className="font-body text-body-lg text-white/90 leading-relaxed m-0 max-w-prose">
              On échange 30 minutes pour comprendre ton contexte et te recommander le bon parcours.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-stack">
              <MagneticButton strength={14}>
                <Link to="/marketing/contact">
                  <Button
                    variant="ghost"
                    size="xl"
                    trailingIcon={<ArrowRight size={20} />}
                    className="!bg-white !text-secondary-700 hover:!bg-accent-50 !border-0 shadow-2xl"
                  >
                    Réserver un échange
                  </Button>
                </Link>
              </MagneticButton>
              <Link to="/marketing/learning-app">
                <Button
                  variant="ghost"
                  size="xl"
                  trailingIcon={<ArrowUpRight size={20} />}
                  className="!text-white hover:!bg-white/10 !border !border-white/40"
                >
                  Voir la plateforme
                </Button>
              </Link>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
};

export default MarketingFormation;
