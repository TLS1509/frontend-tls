/**
 * Homepage — hero immersif scroll-driven + sections lumineuses
 * Contenu canonique (FACTS-CANON.md + COPY-V2.md)
 */
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  motion, AnimatePresence,
  useReducedMotion, useScroll, useTransform,
} from 'framer-motion';
import {
  ArrowRight, BookOpen, Layers, Sparkles, Quote,
  CheckCircle2, Award,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import {
  FadeInWhenVisible, MagneticButton, CountUp,
} from '../../components/marketing/motion';

const EASE_EMPHASIS = [0.22, 1, 0.36, 1] as const;

// ─── Word swap ────────────────────────────────────────────────────────────────

const VERBS = ['forment', 'conçoivent', 'transmettent', 'accompagnent'];

const WordSwap: React.FC = () => {
  const reduce = useReducedMotion();
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % VERBS.length), 2800);
    return () => clearInterval(id);
  }, [reduce]);

  const longest = VERBS.reduce((a, b) => (b.length > a.length ? b : a), '');

  return (
    <span className="relative inline-grid align-baseline">
      <span aria-hidden className="invisible col-start-1 row-start-1 text-secondary-500">
        {longest}
      </span>
      <span className="col-start-1 row-start-1 relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={VERBS[i]}
            className="inline-block text-secondary-500 will-change-transform"
            initial={reduce ? false : { y: '0.5em', opacity: 0, filter: 'blur(6px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={reduce ? undefined : { y: '-0.5em', opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.55, ease: EASE_EMPHASIS as [number, number, number, number] }}
          >
            {VERBS[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
};

// ─── Floating app card ────────────────────────────────────────────────────────

const AppPreviewCard: React.FC<{ reduce: boolean }> = ({ reduce }) => (
  <motion.div
    className="relative w-full max-w-[300px] mx-auto"
    initial={reduce ? false : { opacity: 0, x: 36, y: 20 }}
    animate={{ opacity: 1, x: 0, y: 0 }}
    transition={{ duration: 0.9, delay: 0.4, ease: EASE_EMPHASIS as [number, number, number, number] }}
  >
    <div
      className="relative rounded-2xl"
      style={{
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.97)',
        boxShadow: '0 20px 56px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1)',
      }}
    >
      <div className="p-5 flex flex-col gap-3">

        <div className="flex items-center justify-between">
          <span className="font-body text-micro font-semibold text-ink-400 uppercase tracking-widest">
            Formation en cours
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-pill bg-primary-50 border border-primary-100">
            <span className="w-1.5 h-1.5 rounded-pill bg-accent-400" />
            <span className="font-body text-micro font-semibold text-primary-700">Module 3/5</span>
          </span>
        </div>

        <div className="flex flex-col gap-0.5">
          <p className="font-display font-bold text-ink-900 text-body-lg m-0 leading-tight">
            Formateur Augmenté
          </p>
          <p className="font-body text-caption text-ink-500 m-0">Pédagogie IA</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="font-body text-micro text-ink-400">Progression</span>
            <span className="font-body text-micro font-semibold text-secondary-600">67%</span>
          </div>
          <div className="h-1.5 rounded-pill overflow-hidden bg-ink-100">
            <motion.div
              className="h-full rounded-pill bg-secondary-500"
              initial={reduce ? false : { width: 0 }}
              animate={{ width: '67%' }}
              transition={{ duration: 1.2, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1 border-t border-ink-100">
          <div className="flex -space-x-1.5">
            {[
              { bg: 'rgba(85,161,180,0.22)', color: '#2F5F6A', label: 'M' },
              { bg: 'rgba(237,132,58,0.22)', color: '#C06920', label: 'S' },
            ].map(({ bg, color, label }) => (
              <div
                key={label}
                className="w-5 h-5 rounded-pill flex items-center justify-center text-[8px] font-bold border border-white"
                style={{ background: bg, color }}
              >
                {label}
              </div>
            ))}
          </div>
          <span className="font-body text-micro text-ink-400">+24 formateurs en cours</span>
        </div>

      </div>
    </div>

    {/* Badge flottant */}
    <motion.div
      className="absolute -bottom-4 -left-5 rounded-xl px-3 py-2 flex items-center gap-2 z-10"
      style={{
        background: 'rgba(255,255,255,0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(248,176,68,0.3)',
        boxShadow: '0 8px 24px rgba(248,176,68,0.18)',
      }}
      initial={reduce ? false : { opacity: 0, scale: 0.78, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.95, ease: EASE_EMPHASIS as [number, number, number, number] }}
    >
      <Award size={14} className="text-accent-500 shrink-0" />
      <span className="font-body text-caption font-semibold text-ink-800">Open Badge vérifié</span>
    </motion.div>

    {/* Notification coach */}
    <motion.div
      className="absolute -top-3 -right-4 rounded-xl px-3 py-2 flex items-center gap-2 z-10"
      style={{
        background: 'rgba(255,255,255,0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(85,161,180,0.22)',
        boxShadow: '0 8px 24px rgba(85,161,180,0.12)',
      }}
      initial={reduce ? false : { opacity: 0, scale: 0.78, y: -14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.2, ease: EASE_EMPHASIS as [number, number, number, number] }}
    >
      <div
        className="w-5 h-5 rounded-pill flex items-center justify-center text-[9px] font-bold shrink-0"
        style={{ background: 'rgba(85,161,180,0.22)', color: '#2F5F6A' }}
      >
        S
      </div>
      <div className="flex flex-col">
        <span className="font-body text-micro font-semibold text-ink-800 leading-none">Sophie · Coach</span>
        <span className="font-body text-micro text-ink-400 leading-none mt-0.5">Feedback reçu</span>
      </div>
      <span className="relative flex w-2 h-2 ml-0.5 shrink-0">
        <motion.span
          className="absolute inline-flex h-full w-full rounded-pill bg-primary-400"
          animate={reduce ? undefined : { scale: [1, 2.2], opacity: [0.65, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
        />
        <span className="relative inline-flex w-2 h-2 rounded-pill bg-primary-500" />
      </span>
    </motion.div>

  </motion.div>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const TRUST_CHIPS: string[] = [];

const OFFRES = [
  {
    icon: <BookOpen size={20} className="text-primary-600" />,
    tag: 'Apprendre',
    tagCls: 'bg-primary-50 text-primary-700 border-primary-100',
    title: "Le Formateur Augmenté par l'IA",
    detail: '7 modules · 7h à distance · Open Badge · Éligible OPCO',
    prix: 'À partir de 249 € HT',
    cta: 'Voir le programme',
    href: '/marketing/formation',
  },
  {
    icon: <Layers size={20} className="text-secondary-600" />,
    tag: 'Concevoir',
    tagCls: 'bg-secondary-50 text-secondary-700 border-secondary-100',
    title: 'Conseil & Studio STRIDE',
    detail: 'Audit · Conception · Déploiement · Méthode propriétaire',
    prix: 'Sur devis',
    cta: 'Présenter votre projet',
    href: '/marketing/accompagnement',
  },
  {
    icon: <Sparkles size={20} className="text-accent-500" />,
    tag: 'Déployer',
    tagCls: 'bg-accent-50 text-accent-600 border-accent-100',
    title: 'Learning App',
    detail: 'Parcours adaptatifs · Passeport compétences · Coaching · Bêta',
    prix: 'Accès anticipé gratuit',
    cta: 'Rejoindre la bêta',
    href: '/marketing/learning-app',
  },
] as const;

const CAMPUS_STATS = [
  { end: 578, suffix: '', label: 'professionnels formés en 2023' },
  { end: 93,  suffix: '%', label: 'de satisfaction' },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export const MarketingHomeImmersion: React.FC = () => {
  const reduce = useReducedMotion() ?? false;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY     = useTransform(scrollYProgress, [0, 1],   [0, -180]);
  const bgScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.1]);

  const contentOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const contentY       = useTransform(scrollYProgress, [0, 0.28], [0, -28]);

  return (
    <div className="bg-white">

      {/* ── HERO 200vh sticky ─────────────────────────────────────────── */}
      <div ref={containerRef} style={{ minHeight: '200vh' }}>
        <section className="sticky top-0 h-screen overflow-hidden" aria-label="Hero">

          {/* Fond aquarelle parallax */}
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={{
              y:     reduce ? undefined : bgY,
              scale: reduce ? undefined : bgScale,
            }}
            aria-hidden
          >
            <img
              src="/marketing/assets/hero-watercolor.webp"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-ink-900/62" aria-hidden />

          {/* Contenu — disparaît sur les premiers 28% du scroll */}
          <motion.div
            className="absolute inset-0 flex items-center"
            style={reduce ? undefined : { opacity: contentOpacity, y: contentY }}
          >
            <div className="w-full max-w-wide mx-auto px-6 py-page">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-section lg:gap-page items-center">

                {/* Gauche — texte */}
                <div className="lg:col-span-5 flex flex-col gap-stack-lg">

                  <motion.h1
                    className="font-display font-extrabold text-white leading-[0.96] tracking-display m-0 [text-wrap:balance]"
                    style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.75rem)' }}
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, ease: EASE_EMPHASIS as [number, number, number, number] }}
                  >
                    Ce que l'IA change<br />
                    pour ceux qui <WordSwap /><span>.</span>
                  </motion.h1>

                  <motion.p
                    className="font-body text-body-lg text-white/72 leading-relaxed m-0 max-w-[520px]"
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: 0.12, ease: EASE_EMPHASIS as [number, number, number, number] }}
                  >
                    Nous aidons les professionnels de la formation à intégrer
                    l'IA dans leur pédagogie, sans la dénaturer.
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap items-center gap-stack-xs pt-stack"
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: 0.22, ease: EASE_EMPHASIS as [number, number, number, number] }}
                  >
                    <MagneticButton strength={14}>
                      <Link to="/marketing/formation">
                        <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                          Voir la formation
                        </Button>
                      </Link>
                    </MagneticButton>
                    <Link to="/marketing/contact">
                      <Button
                        variant="ghost"
                        size="lg"
                        className="!text-white hover:!bg-white/10 !border !border-white/30"
                      >
                        Prendre rendez-vous
                      </Button>
                    </Link>
                  </motion.div>

                  <motion.ul
                    className="flex flex-wrap items-center gap-x-4 gap-y-2 m-0 p-0 list-none"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.38 }}
                  >
                    {TRUST_CHIPS.map((c) => (
                      <li key={c} className="inline-flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-primary-300 shrink-0" />
                        <span className="font-body text-caption font-semibold text-white/60">{c}</span>
                      </li>
                    ))}
                  </motion.ul>

                </div>

                {/* Droite — app card */}
                <div className="lg:col-span-7 flex justify-center lg:justify-end pt-section lg:pt-0">
                  <AppPreviewCard reduce={reduce} />
                </div>

              </div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            aria-hidden
          >
            <span className="font-body text-micro text-white/30 uppercase tracking-widest">Défiler</span>
            <motion.div
              className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
              animate={reduce ? undefined : { scaleY: [1, 0.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

        </section>
      </div>

      {/* ── OFFRES ────────────────────────────────────────────────────── */}
      <section className="py-page bg-white" aria-label="Nos offres">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-section">

          <FadeInWhenVisible direction="up">
            <h2
              className="font-display font-extrabold text-ink-900 leading-tight tracking-headline m-0 text-center"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)' }}
            >
              Trois façons de travailler ensemble.
            </h2>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack">
            {OFFRES.map((o, i) => (
              <FadeInWhenVisible key={o.tag} direction="up" delay={i * 0.08}>
                <article className="rounded-2xl bg-white border border-ink-100 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-base p-stack-lg flex flex-col gap-stack h-full group">
                  <div className="flex flex-col gap-stack-xs">
                    <div className="flex items-center gap-2">
                      {o.icon}
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-pill border text-caption font-semibold ${o.tagCls}`}>
                        {o.tag}
                      </span>
                    </div>
                    <h3
                      className="font-display font-extrabold text-ink-900 leading-tight m-0 tracking-snug"
                      style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)' }}
                    >
                      {o.title}
                    </h3>
                  </div>
                  <p className="font-body text-body-sm text-ink-500 leading-relaxed m-0 flex-1">{o.detail}</p>
                  <div className="flex flex-col gap-stack-xs">
                    <span className="font-body text-body-sm font-semibold text-ink-700">{o.prix}</span>
                    <Link to={o.href}>
                      <Button variant="secondary" size="sm" fullWidth trailingIcon={<ArrowRight size={14} />}>
                        {o.cta}
                      </Button>
                    </Link>
                  </div>
                </article>
              </FadeInWhenVisible>
            ))}
          </div>

        </div>
      </section>

      {/* ── DOCTRINE ──────────────────────────────────────────────────── */}
      <section className="py-page bg-primary-50/40 border-y border-primary-100/60">
        <FadeInWhenVisible direction="up" className="max-w-4xl mx-auto px-6 flex flex-col gap-section-lg items-center text-center">
          <div className="flex flex-col gap-stack-lg">
            <h2
              className="font-display font-extrabold text-ink-900 leading-[1.1] tracking-headline m-0"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              L'IA dans votre pratique pédagogique.<br />
              <span className="text-primary-600">Pas à la place de vous.</span>
            </h2>
            <p className="font-body text-body-lg text-ink-500 leading-relaxed m-0 max-w-2xl mx-auto">
              Les outils changent chaque mois. Les principes pédagogiques restent votre boussole.
              Notre approche part du modèle Dreyfus : novice à expert, par la pratique,
              par la mise en situation supervisée.
            </p>
          </div>
          <Link to="/marketing/accompagnement">
            <Button variant="primary" size="md" trailingIcon={<ArrowRight size={16} />}>
              La méthode STRIDE
            </Button>
          </Link>
        </FadeInWhenVisible>
      </section>

      {/* ── C-CAMPUS ──────────────────────────────────────────────────── */}
      <section className="py-page bg-white">
        <FadeInWhenVisible direction="up" className="max-w-4xl mx-auto px-6">
          <div className="rounded-2xl bg-gradient-to-br from-primary-700 to-primary-900 p-stack-lg flex flex-col md:flex-row items-center gap-section">

            <div className="flex flex-col gap-stack flex-1">
              <span className="font-body text-caption font-semibold text-primary-200 uppercase tracking-widest">
                Partenariat C-Campus
              </span>
              <p
                className="font-display font-extrabold text-white leading-tight m-0 tracking-headline"
                style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)' }}
              >
                En partenariat avec C-Campus depuis 2023.
              </p>
              <p className="font-body text-body text-white/60 leading-relaxed m-0 max-w-prose">
                The Learning Society est société partenaire de C-Campus.
                Le programme est accessible via votre OPCO.
              </p>
            </div>

            <div className="flex flex-col gap-3 shrink-0 w-full md:w-52">
              {CAMPUS_STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl bg-white/10 border border-white/20 px-5 py-3 flex flex-col gap-tight"
                >
                  <span className="font-display font-extrabold text-white leading-none" style={{ fontSize: '2rem' }}>
                    <CountUp end={s.end} suffix={s.suffix} />
                  </span>
                  <span className="font-body text-body-sm text-white/55 leading-snug">{s.label}</span>
                </div>
              ))}
              <p className="font-body text-micro text-white/35 m-0">* Stats C-Campus · formations de formateurs 2023</p>
            </div>

          </div>
        </FadeInWhenVisible>
      </section>

      {/* ── CITATION ──────────────────────────────────────────────────── */}
      <section className="py-page border-t border-ink-100">
        <FadeInWhenVisible direction="up" className="max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <Quote size={32} className="text-secondary-300" aria-hidden />
          <blockquote className="m-0">
            <p
              className="font-display font-extrabold text-ink-900 leading-[1.2] tracking-headline m-0"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
            >
              L'IA démultiplie ce que les formateurs font de mieux.
              STRIDE part de là.
            </p>
            <footer className="font-body text-body-sm text-ink-400 mt-stack">
              Pierre-Armand Dennery, co-fondateur · The Learning Society
            </footer>
          </blockquote>
        </FadeInWhenVisible>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────────────── */}
      <section className="py-page bg-gradient-to-br from-primary-700 to-primary-900" aria-label="Contact">
        <FadeInWhenVisible direction="up" className="max-w-2xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <h2
            className="font-display font-extrabold text-white leading-[1.05] tracking-headline m-0"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}
          >
            On parle de votre projet ?
          </h2>
          <p className="font-body text-body-lg text-white/70 leading-relaxed m-0">
            30 minutes pour comprendre vos enjeux, sans engagement.
          </p>
          <MagneticButton strength={12}>
            <Link to="/marketing/contact">
              <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                Réserver 30 minutes
              </Button>
            </Link>
          </MagneticButton>
        </FadeInWhenVisible>
      </section>

    </div>
  );
};

export default MarketingHomeImmersion;
