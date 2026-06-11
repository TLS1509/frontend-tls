/**
 * CinematicHero: Direction C « Illustrated Glass », the Home signature moment.
 *
 * Left  : type-led headline with a Ditto-style animated word-swap on the closing
 *         role, subheading, dual CTA (magnetic), condensed honest credentials.
 * Right : a floating double-bezel GLASS panel (Craft) that frames the TLS system
 *         itself: the Learn → Do → Match loop drawn as three nodes wired by
 *         hand-drawn organic paths that draw themselves on mount (Daydream),
 *         over breathing organic blobs (Phantom) and slow golden particles.
 *
 * This composite is the *motion stand-in*: it runs today with zero asset
 * dependency. When the real 10s hero video lands (Phase 1), it slots into the
 * same glass frame via a <video> element: the chrome stays identical.
 *
 * Discipline: GPU-safe (transform/opacity only), prefers-reduced-motion honored,
 * mobile stacks with no parallax/tilt. Illustration colors use the documented
 * Direction C palette as rgba (same convention as MeshGradientBg), not arbitrary
 * UI hex. Register = VOUS. No invented metric. Copy = draft, to validate.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../components/core/Button';
import { MeshGradientBg, MagneticButton } from '../../../components/marketing/motion';

const EASE_EMPHASIS = [0.22, 1, 0.36, 1] as const;
const EASE_SMOOTH = [0.25, 0.46, 0.45, 0.94] as const;

// Direction C palette (matches design tokens teal/orange/gold): illustration rgba.
const TEAL = 'rgba(85,161,180,1)';
const ORANGE = 'rgba(237,132,58,1)';
const GOLD = 'rgba(248,176,68,1)';

/** The closing role cycles: broadens "formateurs" to the whole learning craft. */
const SWAP_WORDS = ['forment', 'conçoivent', 'accompagnent', 'transmettent'];

/** Condensed honest credentials: no invented metric (FACTS-CANON). */
const CHIPS = ['Certifiant · Qualiopi', 'Open Badge vérifiable', 'Éligible OPCO'];

// ─── Word-swap (Ditto): one role word slides + blurs through the list ─────────
const WordSwap: React.FC = () => {
  const reduce = useReducedMotion();
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % SWAP_WORDS.length), 2600);
    return () => clearInterval(id);
  }, [reduce]);

  // Reserve width so the line never reflows as words change length.
  const longest = SWAP_WORDS.reduce((a, b) => (b.length > a.length ? b : a), '');

  return (
    <span className="relative inline-grid align-baseline" style={{ verticalAlign: 'baseline' }}>
      {/* invisible sizer holds the box at the widest word */}
      <span aria-hidden className="invisible col-start-1 row-start-1 text-primary-600">
        {longest}
      </span>
      <span className="col-start-1 row-start-1 relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={SWAP_WORDS[i]}
            className="inline-block text-primary-600 will-change-transform"
            initial={reduce ? false : { y: '0.5em', opacity: 0, filter: 'blur(6px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={reduce ? undefined : { y: '-0.5em', opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.55, ease: EASE_EMPHASIS }}
          >
            {SWAP_WORDS[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
};

// ─── A single Learn/Do/Match node inside the glass frame ──────────────────────
const SystemNode: React.FC<{
  label: string;
  cx: number;
  cy: number;
  color: string;
  delay: number;
  reduce: boolean;
}> = ({ label, cx, cy, color, delay, reduce }) => (
  <motion.g
    initial={reduce ? false : { opacity: 0, scale: 0.6 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.7, delay, ease: EASE_EMPHASIS }}
    style={{ transformOrigin: `${cx}px ${cy}px` }}
  >
    {/* soft halo */}
    <circle cx={cx} cy={cy} r={30} fill={color} opacity={0.14} />
    {/* breathing ring */}
    <motion.circle
      cx={cx}
      cy={cy}
      r={22}
      fill="white"
      stroke={color}
      strokeWidth={2}
      animate={reduce ? undefined : { scale: [1, 1.08, 1] }}
      transition={{ duration: 3.2, delay, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    />
    <circle cx={cx} cy={cy} r={6} fill={color} />
    <text
      x={cx}
      y={cy + 46}
      textAnchor="middle"
      className="font-display"
      style={{ fontSize: 15, fontWeight: 700, fill: 'rgba(31,62,69,0.92)', letterSpacing: '0.02em' }}
    >
      {label}
    </text>
  </motion.g>
);

// ─── Cinematic visual: the glass-framed system (video stand-in) ──────────────
const CinematicVisual: React.FC = () => {
  const reduce = useReducedMotion() ?? false;

  // Hand-drawn connector path Learn → Do → Match (organic, Daydream style).
  const pathLearnDo = 'M 78 96 C 130 60, 190 60, 232 112';
  const pathDoMatch = 'M 252 150 C 286 210, 250 250, 188 250';

  return (
    <div className="relative w-full aspect-[4/3.4] max-w-xl mx-auto">
      {/* Outer shell: double-bezel: tray + hairline + refraction */}
      <div className="absolute inset-0 rounded-[2.25rem] bg-white/40 ring-1 ring-ink-900/5 p-2 shadow-[0_30px_80px_-30px_rgba(31,62,69,0.35)] backdrop-blur-glass-light">
        {/* Inner core: frosted glass plate */}
        <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] bg-white/55 backdrop-blur-glass-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),inset_0_-1px_1px_rgba(31,62,69,0.04)]">
          {/* Breathing organic blobs behind the system (Phantom) */}
          <motion.div
            aria-hidden
            className="absolute -top-10 -left-8 w-2/3 h-2/3 rounded-pill blur-[60px]"
            style={{ background: 'rgba(85,161,180,0.30)' }}
            animate={reduce ? undefined : { x: [0, 24, 0], y: [0, 16, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-12 -right-6 w-2/3 h-2/3 rounded-pill blur-[60px]"
            style={{ background: 'rgba(248,176,68,0.26)' }}
            animate={reduce ? undefined : { x: [0, -20, 0], y: [0, -14, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* The system: Learn → Do → Match, drawn (Daydream) */}
          <svg
            viewBox="0 0 330 320"
            className="absolute inset-0 h-full w-full"
            fill="none"
            aria-label="La boucle Learn, Do, Match"
            role="img"
          >
            {/* connectors draw themselves on mount */}
            <motion.path
              d={pathLearnDo}
              stroke={TEAL}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeDasharray="6 9"
              opacity={0.5}
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, delay: 0.5, ease: EASE_SMOOTH }}
            />
            <motion.path
              d={pathDoMatch}
              stroke={GOLD}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeDasharray="6 9"
              opacity={0.55}
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, delay: 0.9, ease: EASE_SMOOTH }}
            />
            {/* return arc Match → Learn closes the loop */}
            <motion.path
              d="M 168 268 C 80 286, 40 200, 56 118"
              stroke={ORANGE}
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray="2 10"
              opacity={0.4}
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.3, delay: 1.3, ease: EASE_SMOOTH }}
            />

            <SystemNode label="Learn" cx={64} cy={92} color={TEAL} delay={0.2} reduce={reduce} />
            <SystemNode label="Do" cx={250} cy={128} color={ORANGE} delay={0.5} reduce={reduce} />
            <SystemNode label="Match" cx={166} cy={250} color={GOLD} delay={0.8} reduce={reduce} />
          </svg>

          {/* Floating glass status pill (Craft button-in-card detail) */}
          <motion.div
            className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-pill bg-white/70 px-3 py-1.5 ring-1 ring-ink-900/5 backdrop-blur-glass-light shadow-sm"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4, ease: EASE_EMPHASIS }}
          >
            <span className="relative flex h-2 w-2">
              <motion.span
                className="absolute inline-flex h-full w-full rounded-pill bg-primary-500"
                animate={reduce ? undefined : { scale: [1, 2.4], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-pill bg-primary-600" />
            </span>
            <span className="font-body text-caption font-semibold text-ink-700">Passeport vérifiable</span>
          </motion.div>
        </div>
      </div>

      {/* Golden particles drifting over the frame */}
      {!reduce &&
        [
          { left: '12%', top: '18%', d: 9, x: 14 },
          { left: '86%', top: '30%', d: 12, x: -16 },
          { left: '74%', top: '82%', d: 10, x: -10 },
          { left: '22%', top: '78%', d: 13, x: 12 },
          { left: '50%', top: '8%', d: 11, x: 8 },
        ].map((p, k) => (
          <motion.span
            key={k}
            aria-hidden
            className="pointer-events-none absolute h-1.5 w-1.5 rounded-pill"
            style={{ left: p.left, top: p.top, background: GOLD, boxShadow: '0 0 8px rgba(248,176,68,0.6)' }}
            animate={{ y: [0, -18, 0], x: [0, p.x, 0], opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: p.d, repeat: Infinity, ease: 'easeInOut', delay: k * 0.6 }}
          />
        ))}
    </div>
  );
};

/**
 * Entrance: opacity stays 1 always; only a one-shot translate settles to 0 on
 * mount. Transform-only means the hero can NEVER strand invisible (the codebase
 * P0 rule), even with a paused animation loop / reduced motion. Matches the
 * Editorial `Reveal` philosophy.
 */
const SettleIn: React.FC<{
  children: React.ReactNode;
  className?: string;
  from?: string;
  delay?: number;
}> = ({ children, className = '', from = 'translateY(16px)', delay = 0 }) => {
  const reduce = useReducedMotion();
  const [settled, setSettled] = React.useState(!!reduce);
  React.useEffect(() => {
    if (reduce) return;
    const id = requestAnimationFrame(() => setSettled(true));
    return () => cancelAnimationFrame(id);
  }, [reduce]);
  return (
    <div
      className={className}
      style={{
        transform: settled ? 'none' : from,
        transition: `transform 800ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

// ─── The cinematic hero ───────────────────────────────────────────────────────
export const CinematicHero: React.FC = () => {
  const reduce = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  // Gentle parallax: visual drifts up as the hero scrolls away (desktop only).
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-page-ambient-warm min-h-[92dvh] flex items-center"
    >
      <MeshGradientBg tone="warm" intensity="subtle" />

      <div className="relative w-full max-w-wide mx-auto px-6 py-section-lg lg:py-page">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-section lg:gap-page items-center">
          {/* ── Left: type, word-swap, CTA, chips (opacity-safe entrance) ─────── */}
          <SettleIn className="lg:col-span-6 flex flex-col gap-stack-lg" delay={80}>
            <h1 className="font-display font-extrabold text-ink-900 leading-[0.96] tracking-tight m-0 [text-wrap:balance] text-[clamp(2.6rem,6vw,5.25rem)]">
              Ce que l'IA change
              <br />
              pour ceux qui <WordSwap />.
            </h1>

            <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-xl">
              La formation certifiante et la plateforme qui apprennent aux
              formateurs à intégrer l'IA dans leur pédagogie. En gardant
              l'humain au centre.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-stack">
              <MagneticButton strength={14}>
                <Link to="/marketing/formation">
                  <Button variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                    Découvrir la formation
                  </Button>
                </Link>
              </MagneticButton>
              <Link to="/marketing/learning-app">
                <Button variant="ghost" size="lg" trailingIcon={<ArrowUpRight size={18} />}>
                  Explorer la plateforme
                </Button>
              </Link>
            </div>

            {/* Honest credential chips */}
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-stack m-0 p-0 list-none">
              {CHIPS.map((c) => (
                <li key={c} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-primary-600 shrink-0" />
                  <span className="font-body text-caption font-semibold text-ink-600">{c}</span>
                </li>
              ))}
            </ul>
          </SettleIn>

          {/* ── Right: cinematic glass system (parallax desktop, opacity-safe) ── */}
          <motion.div
            className="lg:col-span-6 lg:will-change-transform"
            style={reduce ? undefined : { y: visualY }}
          >
            <SettleIn from="translateX(32px)" delay={240}>
              <CinematicVisual />
            </SettleIn>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CinematicHero;
