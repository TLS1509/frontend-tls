/**
 * Variante Curseur interactif — 2 blobs (teal + orange) suivent le curseur
 * via spring physics framer-motion. Fond blanc/clair, design épuré.
 * Les cards s'inclinent légèrement vers le curseur (card tilt effect).
 */
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Lightbulb, BookOpen, Heart, Compass } from 'lucide-react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { Button } from '../../components/core/Button';


const CHAPTERS = [
  {
    num: '01',
    eyebrow: 'Point de départ',
    title: 'Vous arrivez avec vos intuitions.',
    body: "Pas besoin d'être expert IA. Juste curieux, motivé, prêt à expérimenter. Nous vous rencontrons là où vous en êtes.",
    icon: <Compass size={22} />,
  },
  {
    num: '02',
    eyebrow: 'La découverte',
    title: 'Vous découvrez une autre manière.',
    body: 'Le Formateur Augmenté ne remplace rien. Il ajoute une dimension : la personnalisation à grande échelle.',
    icon: <Lightbulb size={22} />,
  },
  {
    num: '03',
    eyebrow: 'La construction',
    title: 'Vous construisez vos parcours.',
    body: 'Concevoir des expériences qui transforment vraiment. Avec des outils, mais surtout un cadre pédagogique solide.',
    icon: <BookOpen size={22} />,
  },
  {
    num: '04',
    eyebrow: 'La communauté',
    title: 'Vous rejoignez une communauté.',
    body: '200+ formateurs certifiés qui partagent, expérimentent, et font évoluer la pédagogie augmentée ensemble.',
    icon: <Heart size={22} />,
  },
];

const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion() ?? false;

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springRY = useSpring(rotateY, { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateY.set(dx * 8);
    rotateX.set(-dy * 8);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      style={reduce ? {} : { rotateX: springRX, rotateY: springRY, transformPerspective: 800 }}
      className={`transition-shadow duration-200 ${hovered ? 'shadow-card-lift' : 'shadow-card'} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const MarketingHomeCursor: React.FC = () => {
  const reduce = useReducedMotion() ?? false;

  // Mouse position (raw)
  const mouseX = useMotionValue(
    typeof window !== 'undefined' ? window.innerWidth / 2 : 400
  );
  const mouseY = useMotionValue(
    typeof window !== 'undefined' ? window.innerHeight / 2 : 300
  );

  // Spring-smooth mouse
  const smoothX = useSpring(mouseX, { stiffness: 25, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 25, damping: 22 });

  // Blob 1 (teal, 600px) — center offset -300
  const blob1X = useTransform(smoothX, (x) => x - 300);
  const blob1Y = useTransform(smoothY, (y) => y - 300);

  // Blob 2 (orange, faster) — 180° offset + 100px
  const smoothX2 = useSpring(mouseX, { stiffness: 55, damping: 28 });
  const smoothY2 = useSpring(mouseY, { stiffness: 55, damping: 28 });
  const blob2X = useTransform(smoothX2, (x) => x - 200);
  const blob2Y = useTransform(smoothY2, (y) => y - 200);

  useEffect(() => {
    if (reduce) return;
    const handle = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, [mouseX, mouseY, reduce]);

  return (
    <div className="relative bg-white overflow-x-hidden">

      {/* ── Blobs curseur (fixed, au-dessus du contenu, pointer-events none) ── */}
      {/* Opacité faible + blur intense = wash ambient sans masquer le texte   */}
      {!reduce && (
        <>
          <motion.div
            className="fixed w-[700px] h-[700px] rounded-full pointer-events-none"
            style={{
              background: '#73AFBF',
              opacity: 0.13,
              filter: 'blur(140px)',
              x: blob1X,
              y: blob1Y,
              zIndex: 40,
            }}
            aria-hidden
          />
          <motion.div
            className="fixed w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background: '#ED843A',
              opacity: 0.12,
              filter: 'blur(110px)',
              x: blob2X,
              y: blob2Y,
              zIndex: 40,
            }}
            aria-hidden
          />
        </>
      )}

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-page">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-stack-lg">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-tight px-4 py-1.5 rounded-pill bg-primary-50 border border-primary-200 text-primary-700 font-body text-caption font-semibold"
          >
            Formation · Certification · Communauté
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-extrabold text-ink-900 leading-[1.0] tracking-display m-0"
            style={{ fontSize: 'clamp(2.75rem, 7vw, 5.5rem)' }}
          >
            Les formateurs qui<br />
            <span className="text-secondary-500">forment autrement.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl"
          >
            The Learning Society forme des formateurs augmentés par l'IA.
            Pas pour remplacer leur pédagogie, mais pour la démultiplier.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-stack-xs pt-stack"
          >
            <Link to="/marketing/formation">
              <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                Découvrir la formation
              </Button>
            </Link>
            <Link to="/marketing/contact">
              <Button variant="ghost" size="lg">
                Échanger 30 minutes
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Conviction ──────────────────────────────────────────────────── */}
      <section className="bg-secondary-500 py-section-lg relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-accent-400 blur-[80px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center flex flex-col gap-stack-lg">
          <p className="font-body text-caption font-bold text-accent-400 uppercase tracking-widest">
            Notre conviction
          </p>
          <h2
            className="font-display font-extrabold text-white leading-[1.15] tracking-tight m-0"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            On n'apprend pas avec des outils.<br />
            <span className="text-accent-400">On apprend avec des humains</span> : accompagnés par des outils.
          </h2>
        </div>
      </section>

      {/* ── Parcours : tilt cards ────────────────────────────────────────── */}
      <section className="py-page bg-ink-50/40">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-section">
          <div className="flex flex-col gap-stack">
            <p className="font-body text-caption font-bold text-secondary-600 uppercase tracking-widest">
              Le parcours
            </p>
            <h2
              className="font-display font-extrabold text-ink-900 leading-[1.05] tracking-display m-0"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
            >
              Votre chemin en 4 étapes.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
            {CHAPTERS.map((c) => (
              <TiltCard
                key={c.num}
                className="rounded-2xl bg-white border border-ink-100 p-stack-lg flex flex-col gap-stack cursor-default"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-secondary-50 text-secondary-600">
                    {c.icon}
                  </span>
                  <span
                    className="font-display font-extrabold text-ink-100 leading-none tabular-nums select-none"
                    style={{ fontSize: '3rem' }}
                  >
                    {c.num}
                  </span>
                </div>
                <div className="flex flex-col gap-tight">
                  <span className="font-body text-caption font-bold text-secondary-500 uppercase tracking-widest">
                    {c.eyebrow}
                  </span>
                  <h3 className="font-display font-extrabold text-ink-900 leading-tight m-0" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}>
                    {c.title}
                  </h3>
                </div>
                <p className="font-body text-body text-ink-600 leading-relaxed m-0">
                  {c.body}
                </p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── C-Campus ──────────────────────────────────────────────────────── */}
      <section className="py-page bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <TiltCard className="rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50/30 border border-primary-100 p-stack-lg flex flex-col md:flex-row items-center gap-section-lg">
            <div className="flex flex-col gap-stack flex-1">
              <span className="font-body text-caption font-bold text-secondary-600 uppercase tracking-widest">Notre ancrage</span>
              <p className="font-display text-h3 font-extrabold text-ink-900 leading-tight m-0">
                Déployé avec C-Campus, dès 2023.
              </p>
              <p className="font-body text-body text-ink-600 leading-relaxed m-0 max-w-prose">
                Les parcours TLS ont été déployés en partenariat avec C-Campus. En 2023, 578 apprenants formés avec un taux de satisfaction de +93 %.
              </p>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-tight px-3 py-1.5 rounded-pill bg-secondary-50 border border-secondary-200 text-secondary-700 font-body text-caption font-semibold">
                578 formés · +93 % satisfaction (C-Campus 2023)
              </span>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* ── Tarifs ────────────────────────────────────────────────────────── */}
      <section className="py-page bg-ink-50/30">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-section">
          <div className="flex flex-col gap-stack items-center text-center max-w-2xl mx-auto">
            <Award size={32} className="text-warning-fg" />
            <h2
              className="font-display font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
            >
              Une certification reconnue.
            </h2>
            <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0">
              Open Badge, en partenariat avec C-Campus. 7 modules, 8 semaines, coaching inclus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack">
            {[
              { label: 'Découverte', price: 'Gratuit', desc: 'Accès au premier module + communauté.', cta: 'Commencer', variant: 'ghost' as const },
              { label: 'Certifiant', price: '249€', desc: 'Formation complète + Open Badge + coaching 1-1.', cta: "M'inscrire", variant: 'warm' as const, highlight: true },
              { label: 'Sur mesure', price: 'Devis', desc: 'Programme adapté à votre organisation.', cta: 'Contacter', variant: 'ghost' as const },
            ].map((t) => (
              <TiltCard
                key={t.label}
                className={`rounded-2xl p-stack-lg flex flex-col gap-stack-lg relative ${
                  t.highlight
                    ? 'bg-gradient-to-br from-secondary-500 to-secondary-600 text-white'
                    : 'bg-white border border-ink-200'
                }`}
              >
                {t.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-tight px-3 py-1 rounded-pill bg-accent-400 text-ink-900 text-caption font-bold uppercase tracking-wider whitespace-nowrap">
                    Recommandé
                  </span>
                )}
                <div className="flex flex-col gap-tight">
                  <span className={`font-body text-caption font-bold uppercase tracking-wider ${t.highlight ? 'text-accent-300' : 'text-secondary-600'}`}>
                    {t.label}
                  </span>
                  <p className={`font-display text-h1 font-extrabold m-0 leading-none ${t.highlight ? 'text-white' : 'text-ink-900'}`}>
                    {t.price}
                  </p>
                </div>
                <p className={`font-body text-body leading-relaxed m-0 flex-1 ${t.highlight ? 'text-white/90' : 'text-ink-600'}`}>
                  {t.desc}
                </p>
                <Link to="/marketing/formation">
                  <Button variant={t.variant} size="md" fullWidth trailingIcon={<ArrowRight size={16} />}>
                    {t.cta}
                  </Button>
                </Link>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-page bg-gradient-to-br from-secondary-100/40 via-accent-50/30 to-white">
        <div className="max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <h2
            className="font-display font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
          >
            Une invitation.
          </h2>
          <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0 max-w-prose">
            Ce n'est pas un produit qu'on vend. C'est une posture qu'on partage.
            Si tu sens que la formation peut être autre chose, on est faits pour se rencontrer.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-stack-xs pt-stack">
            <Link to="/marketing/contact">
              <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                Échanger 30 minutes
              </Button>
            </Link>
            <Link to="/marketing/magazine">
              <Button variant="ghost" size="lg">
                Lire le magazine d'abord
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="h-20" />

    </div>
  );
};

export default MarketingHomeCursor;
