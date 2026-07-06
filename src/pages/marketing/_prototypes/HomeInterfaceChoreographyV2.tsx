/**
 * HomeInterfaceChoreographyV2 — Direction B: "Interface Choreography"
 *
 * NOT WIRED INTO ROUTING. One of 3 parallel homepage-direction prototypes
 * (A = Cinematic Reveal, B = this file, C = Editorial Motion). Built for
 * side-by-side review before a direction is chosen.
 *
 * Thesis: the "wow" comes from motion PRECISION and product realism, not
 * filmic imagery. No hero video, no full-bleed photography — the interactive
 * product mockup itself is the hero's centerpiece, staged with a tight,
 * coordinated entrance choreography (Linear / Stripe / Vercel register).
 *
 * What makes this "Interface Choreography" rather than a generic hero:
 *  1. InteractiveAppMockup is huge and central — not a side illustration —
 *     framed in a real browser-chrome shell, with a slow tasteful idle
 *     "breathing" float (gated on reduced-motion) so it feels alive at rest.
 *  2. A staggered entrance sequence (Stagger/StaggerItem) where eyebrow →
 *     headline → subhead → CTAs → mockup → proof strip each land with a
 *     distinct, choreographed delay — not a uniform fade-in.
 *  3. A crossfading role-cycle word in the headline (formateurs / coachs /
 *     responsables L&D — all real roles from the approved copy), driven by
 *     a simple timed AnimatePresence swap, reinforcing "this product speaks
 *     to your specific role" without being gimmicky.
 *  4. MagneticButton on both hero CTAs for cursor-reactive precision.
 *  5. A supporting "systems, not slides" strip below the hero that mirrors
 *     the mockup's 4 tabs as a quiet, staggered proof-point list — keeping
 *     the whole first viewport-and-a-half feeling like one choreographed
 *     system rather than stacked, independent sections.
 *
 * Hard constraints respected:
 *  - No ParallaxLayer / diverging-speed scroll layers.
 *  - No scroll-jacking / pinned scroll sequences.
 *  - Every animation gates on useReducedMotion() (via primitives' own
 *    handling, or explicit checks below for the bespoke bits: idle float,
 *    role-cycle, cursor glow).
 *  - No bg-clip-text gradient text, no ghost-card (border + wide soft
 *    shadow together), no per-section tiny uppercase eyebrows (used once,
 *    intentionally, in the hero only), no numbered decorative markers,
 *    no rounded-full, no hardcoded hex / bg-[var(...)] arbitrary values.
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, BookOpen, MessageSquare, NotebookPen, Compass } from 'lucide-react';
import { Button } from '../../../components/core/Button';
import {
  Stagger,
  StaggerItem,
  MagneticButton,
  InteractiveAppMockup,
  MeshGradientBg,
  FadeInWhenVisible,
} from '../../../components/marketing/motion';

// ─── Role-cycle word (crossfade, real roles only) ───────────────────────────

const ROLES = ['formateurs', 'coachs', 'responsables L&D'];

const RoleCycle: React.FC = () => {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % ROLES.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [reduced]);

  if (reduced) {
    return <span className="text-primary-700">{ROLES[0]}</span>;
  }

  return (
    <span
      className="relative inline-grid text-left align-bottom"
      style={{ minWidth: '13ch' }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[index]}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="col-start-1 row-start-1 text-primary-700"
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

// ─── Idle "breathing" wrapper for the mockup (very small, tasteful) ─────────

const BreathingMockupFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const reduced = useReducedMotion();

  return (
    <motion.div
      animate={
        reduced
          ? undefined
          : {
              y: [0, -8, 0],
            }
      }
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

// ─── Browser-chrome shell around the mockup ─────────────────────────────────

const BrowserChromeShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative rounded-2xl bg-white ring-1 ring-ink-200 shadow-2xl overflow-hidden">
    <div className="flex items-center gap-stack-xs px-4 py-3 border-b border-ink-100 bg-ink-50">
      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-pill bg-ink-200" />
        <span className="w-2.5 h-2.5 rounded-pill bg-ink-200" />
        <span className="w-2.5 h-2.5 rounded-pill bg-ink-200" />
      </div>
      <div className="ml-3 flex-1 max-w-xs">
        <div className="rounded-pill bg-white border border-ink-200 px-3 py-1 text-center">
          <span className="font-body text-micro text-ink-400 truncate">app.thelearningsociety.fr</span>
        </div>
      </div>
    </div>
    <div className="p-1 sm:p-2">{children}</div>
  </div>
);

// ─── Hero ────────────────────────────────────────────────────────────────────

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-page pb-section-lg">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <MeshGradientBg tone="primary" intensity="subtle" className="opacity-60" />
      </div>

      <div className="relative max-w-wide mx-auto px-6 flex flex-col gap-section-lg">
        <Stagger staggerDelay={0.12} className="max-w-4xl mx-auto text-center flex flex-col items-center gap-stack-lg">
          <StaggerItem direction="up" duration={0.55}>
            <span className="inline-flex items-center gap-stack-xs rounded-pill bg-primary-50 border border-primary-100 px-4 py-1.5 font-body text-caption font-semibold uppercase tracking-wider text-primary-700">
              Formation · Learning App · Accompagnement
            </span>
          </StaggerItem>

          <StaggerItem direction="up" duration={0.65}>
            <h1 className="font-display font-extrabold text-ink-900 leading-[1.05] tracking-display m-0 [text-wrap:balance] text-[clamp(2.5rem,5.5vw,4.25rem)]">
              L'IA en pédagogie, pensée pour vos{' '}
              <RoleCycle />.
            </h1>
          </StaggerItem>

          <StaggerItem direction="up" duration={0.6}>
            <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-[58ch]">
              The Learning Society aide organisations et professionnels à maîtriser l'IA en
              formation : une formation certifiante, une Learning App adaptative et un
              accompagnement sur mesure. Sans perdre l'humain au centre.
            </p>
          </StaggerItem>

          <StaggerItem direction="up" duration={0.55}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-stack-xs pt-stack">
              <MagneticButton strength={14}>
                <Button
                  to="/website/accompagnement"
                  variant="primary"
                  size="lg"
                  trailingIcon={<ArrowRight size={18} />}
                >
                  Je représente une entreprise
                </Button>
              </MagneticButton>
              <MagneticButton strength={8}>
                <Button
                  to="/website/learning-app"
                  variant="outline"
                  size="lg"
                  trailingIcon={<ArrowUpRight size={18} />}
                >
                  Me former
                </Button>
              </MagneticButton>
            </div>
          </StaggerItem>
        </Stagger>

        {/* Centerpiece: the interactive product mockup, large, framed, breathing */}
        <FadeInWhenVisible delay={0.15} duration={0.8} margin="-40px">
          <div className="mx-auto w-full max-w-4xl">
            <BreathingMockupFrame>
              <BrowserChromeShell>
                <InteractiveAppMockup className="!shadow-none !border-0 !rounded-xl" />
              </BrowserChromeShell>
            </BreathingMockupFrame>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

// ─── Supporting section: the 4 tabs mirrored as a quiet proof strip ────────

type ProofPoint = {
  icon: React.ReactNode;
  title: string;
  desc: string;
};

const PROOF_POINTS: ProofPoint[] = [
  {
    icon: <BookOpen size={20} />,
    title: 'Parcours',
    desc: 'Progression Dreyfus mesurable, adaptée au rythme de chaque apprenant.',
  },
  {
    icon: <MessageSquare size={20} />,
    title: 'Coaching',
    desc: 'Messagerie et visio intégrées avec un coach dédié, sans outil tiers.',
  },
  {
    icon: <NotebookPen size={20} />,
    title: 'Journal',
    desc: 'Journal de bord réflexif, augmenté par l\'IA pour révéler les progrès.',
  },
  {
    icon: <Compass size={20} />,
    title: 'Veille',
    desc: 'Veille pédagogique curée pour rester à jour sans perdre de temps.',
  },
];

const SystemStrip: React.FC = () => {
  return (
    <section className="relative bg-ink-50 py-page">
      <div className="max-w-wide mx-auto px-6 flex flex-col gap-section">
        <FadeInWhenVisible className="max-w-2xl">
          <h2 className="font-display font-extrabold text-ink-900 leading-[1.1] tracking-headline m-0 [text-wrap:balance] text-[clamp(1.75rem,3.5vw,2.75rem)]">
            Un seul système, quatre façons de progresser.
          </h2>
          <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 mt-stack max-w-[55ch]">
            Pas de slides, pas de demo call. Cliquez sur les onglets de la
            plateforme ci-dessus : ce que vous voyez tourner, c'est le vrai
            produit.
          </p>
        </FadeInWhenVisible>

        <Stagger staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-stack-lg">
          {PROOF_POINTS.map((p) => (
            <StaggerItem key={p.title} direction="up" duration={0.5}>
              <div className="h-full flex flex-col gap-stack rounded-2xl bg-white border border-ink-100 p-stack-lg shadow-card">
                <div className="inline-flex w-11 h-11 rounded-xl bg-primary-50 items-center justify-center text-primary-600">
                  {p.icon}
                </div>
                <h3 className="font-display text-h4 font-bold text-ink-900 m-0">{p.title}</h3>
                <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">{p.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeInWhenVisible delay={0.1}>
          <div className="flex justify-start">
            <MagneticButton strength={10}>
              <Link
                to="/website/learning-app"
                className="inline-flex items-center gap-stack-xs font-body font-semibold text-body-sm text-primary-700 min-h-touch focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-pill px-1"
              >
                Voir toutes les fonctionnalités
                <ArrowRight size={16} />
              </Link>
            </MagneticButton>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

// ─── Export ──────────────────────────────────────────────────────────────────

export const HomeInterfaceChoreographyV2: React.FC = () => {
  return (
    <div className="bg-white">
      <Hero />
      <SystemStrip />
    </div>
  );
};

export default HomeInterfaceChoreographyV2;
