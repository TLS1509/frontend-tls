/**
 * HomeCinematicRevealV2 — creative-direction prototype "A — Cinematic Reveal".
 *
 * NOT wired into App.tsx. Standalone demonstration of one of 3 parallel
 * creative directions for the TLS marketing homepage (this is direction A;
 * B = Interface Choreography, C = Editorial Motion, built separately).
 *
 * ─── The idea ────────────────────────────────────────────────────────────
 * Treat TLS's own watercolor/aquarelle footage as a film title sequence: a
 * slow, single-layer camera push into the painted texture, a one-time word-
 * by-word title card reveal (not a scroll-triggered gimmick — it plays once,
 * like a film's opening credits), and a "seam" cut to the next scene that
 * matches the exact color of the aquarelle so the transition reads as a
 * deliberate edit, not a translucent scrim.
 *
 * ─── Why this is NOT parallax / NOT scroll-jacking ───────────────────────
 * - The hero video only gets scale + blur + opacity tied to ITS OWN scroll
 *   progress (useScroll target=heroRef). All of that motion happens on a
 *   single layer at a single rate — there is no second layer moving at a
 *   different speed relative to it, which is what makes parallax read as
 *   "layers sliding past each other." A camera push-in is one move, one
 *   layer, one rate.
 * - The native scroll is never captured, pinned, or hijacked. Every
 *   section scrolls normally; motion is driven by scroll progress readouts
 *   (useScroll/useTransform), not by trapping the wheel/touch event.
 * - The word-by-word title reveal (KineticHeadline) fires ONCE on load /
 *   first viewport entry — it is a load-in cinematic beat, not a repeating
 *   scroll-scrubbed effect.
 *
 * ─── Motion primitives reused (see src/components/marketing/motion/) ─────
 * - KineticHeadline  → word-by-word "film title card" rise for the H1.
 * - RevealMask       → directional clip-path wipe for the aquarelle stills
 *                       and the offer cards ("scene reveal" cut).
 * - FadeInWhenVisible → simple opacity/y fades for copy blocks.
 * - Stagger/StaggerItem → the offer chapter cards entrance.
 * - NoiseTexture     → subtle analog film-grain over the hero, reinforces
 *                       the "cinematic" register without extra deps.
 * - MagneticButton   → primary CTA micro-interaction (as in production Home).
 *
 * Everything gates on useReducedMotion(): when reduced motion is on, the
 * hero shows the static poster frame at rest (no scale/blur/opacity ramp),
 * KineticHeadline/RevealMask degrade to plain opacity fades (already built
 * into those primitives), and the aquarelle strip shows its final frame
 * immediately instead of cross-fading.
 *
 * Copy is reused verbatim/adapted from the approved production copy in
 * src/pages/marketing/MarketingHome.tsx — no invented metrics, no fictional
 * clients, "vous" register, verb+object CTAs.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, CheckCircle2, GraduationCap, Compass } from 'lucide-react';
import { Button } from '../../../components/core/Button';
import {
  KineticHeadline,
  RevealMask,
  FadeInWhenVisible,
  Stagger,
  StaggerItem,
  MagneticButton,
  NoiseTexture,
} from '../../../components/marketing/motion';

// ─── 1. Cinematic hero — title-card reveal over a slow camera push ─────────

const CinematicHero: React.FC = () => {
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

  // Single-layer scroll-tied "camera push": scale + blur + opacity all read
  // from the SAME scrollYProgress, at the SAME rate — one move, not a
  // multi-speed parallax stack.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 1.08]);
  const blur = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 6]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.7, 1], reduced ? [1, 1, 1] : [1, 0.55, 0.18]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], reduced ? [1, 1] : [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], reduced ? [0, 0] : [0, -40]);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] overflow-hidden bg-ink-900">
      {/* Scene layer — video or poster, single-rate push-in */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ scale, opacity: sceneOpacity, filter }}
        aria-hidden
      >
        {reduced ? (
          <img
            src="/images/bg-frames/watercolour-reveal-7s.jpg"
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
            poster="/images/bg-frames/watercolour-reveal-7s.jpg"
            className="absolute inset-0 w-full h-full object-cover"
            tabIndex={-1}
          >
            <source src="/videos/watercolour-reveal-8s.mp4" type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/* Film grain — reinforces the title-sequence register */}
      <NoiseTexture opacity={0.05} />

      {/* Letterbox bars — subtle film-frame device, top and bottom, static */}
      <div aria-hidden className="absolute top-0 inset-x-0 h-[6vh] min-h-[24px] bg-black/70 pointer-events-none" />
      <div aria-hidden className="absolute bottom-0 inset-x-0 h-[6vh] min-h-[24px] bg-black/70 pointer-events-none" />

      {/* Scrim for legibility — vignette, not a flat wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 55%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.78) 100%)',
        }}
      />

      <div className="relative min-h-[100dvh] flex items-center justify-center">
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="w-full max-w-page mx-auto px-6 py-page text-center flex flex-col items-center gap-stack-lg"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: reduced ? 0 : 0.15 }}
            className="font-body text-caption tracking-[0.2em] uppercase text-white/60 m-0"
          >
            The Learning Society
          </motion.p>

          <h1 className="font-display font-extrabold text-white leading-[0.98] tracking-display m-0 [text-wrap:balance] max-w-[24ch] text-[clamp(3rem,7vw,5.5rem)]">
            <KineticHeadline text="Vos formateurs," delay={reduced ? 0 : 0.35} />
            <br />
            <span className="text-accent-400">
              <KineticHeadline text="augmentés par l'IA." delay={reduced ? 0 : 0.62} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: reduced ? 0.1 : 1.15, ease: 'easeOut' }}
            className="font-body text-body-lg text-white/85 leading-relaxed m-0 max-w-[62ch]"
          >
            The Learning Society aide organisations et professionnels à maîtriser
            l'IA en formation : une formation certifiante, une Learning App
            adaptative et un accompagnement sur mesure. Sans perdre l'humain au centre.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: reduced ? 0.2 : 1.35, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-stack-xs pt-stack"
          >
            <MagneticButton strength={14}>
              <Button to="/website/accompagnement" variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                Je représente une entreprise
              </Button>
            </MagneticButton>
            <Button to="/website/learning-app" variant="glass" size="lg" trailingIcon={<ArrowUpRight size={18} />}>
              Me former
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── 2. The cut — aquarelle strip as a scene transition, seam-matched ──────
//
// Three stills wipe into view in sequence (RevealMask, once-only, staggered
// delays — not scroll-scrubbed, not parallax). The final still's dominant
// tone (warm amber) becomes the seam gradient into section 3, so the cut
// reads as an intentional edit rather than a translucent overlay.

const STILLS = [
  { src: '/images/bg-frames/aquarelle-orange-teal-5s.jpg', caption: 'Une pédagogie qui se réinvente' },
  { src: '/images/bg-frames/aquarelle-dore-ambre-3s.jpg', caption: 'Un formateur augmenté, jamais remplacé' },
  { src: '/images/bg-frames/aquarelle-orange-teal-7s.jpg', caption: 'Une preuve de compétence, mesurable' },
];

const CinematicCut: React.FC = () => {
  return (
    <section className="relative bg-ink-900 py-section-lg overflow-hidden">
      <div className="max-w-wide mx-auto px-6 flex flex-col gap-section-lg">
        <FadeInWhenVisible>
          <h2 className="max-w-4xl mx-auto text-center font-display font-bold text-white leading-[1.15] tracking-tight m-0 [text-wrap:balance] text-[clamp(1.5rem,3.2vw,2.25rem)]">
            L'IA ne remplace pas le formateur. Elle l'aide à aller plus loin :
            à personnaliser, à mesurer, et à rendre du temps au métier qui
            compte vraiment.
          </h2>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-lg">
          {STILLS.map((s, i) => (
            <RevealMask key={s.src} direction="up" delay={i * 0.15} duration={0.85} margin="-100px">
              <figure className="m-0 flex flex-col gap-stack">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-white/10">
                  <img src={s.src} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)' }}
                  />
                </div>
                <figcaption className="font-body text-body-sm text-white/70 text-center m-0">
                  {s.caption}
                </figcaption>
              </figure>
            </RevealMask>
          ))}
        </div>
      </div>

      {/* Seam — matches the warm amber tone of the aquarelle stills, cuts
          into the secondary-50 background of the next section below. */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(255,243,235,0.6) 70%, #FFF3EB 100%)' }}
      />
    </section>
  );
};

// ─── 3. Chapter cards — the offer, staged like film chapter titles ─────────

type Offer = {
  tag: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  link: string;
  cta: string;
};

const OFFERS: Offer[] = [
  {
    tag: 'Formation',
    icon: <GraduationCap size={24} />,
    title: 'Formation certifiante',
    desc: "Formateurs Augmentés, méthode STRIDE, pédagogie active. Devenez architecte de l'apprentissage IA-augmenté.",
    link: '/website/learning-app',
    cta: 'Voir la formation',
  },
  {
    tag: 'Conseil',
    icon: <Compass size={24} />,
    title: 'Accompagnement',
    desc: 'Conseil stratégique, déploiement sur mesure, pilotage de la montée en compétences. Avec vous, pas pour vous.',
    link: '/website/accompagnement',
    cta: "Voir l'accompagnement",
  },
];

const LEARNING_APP_FEATURES = [
  'Passeport Dreyfus mesurable',
  'Matching Talents-Projets par IA',
  'Coaching 1-1 intégré',
];

const ChapterOffers: React.FC = () => {
  return (
    <section className="relative py-section-lg bg-secondary-50">
      <div className="max-w-wide mx-auto px-6 flex flex-col gap-section-lg">
        <FadeInWhenVisible>
          <div className="max-w-3xl flex flex-col gap-stack">
            <p className="font-body text-caption tracking-[0.2em] uppercase text-secondary-700 m-0">
              Trois chapitres
            </p>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
              Trois façons de <span className="text-secondary-600">former à l'ère de l'IA.</span>
            </h2>
            <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0">
              Une plateforme d'apprentissage, une formation certifiante et un
              accompagnement stratégique, vers la même destination : une
              organisation qui apprend vraiment.
            </p>
          </div>
        </FadeInWhenVisible>

        <Stagger className="grid grid-cols-1 lg:grid-cols-5 lg:grid-rows-2 gap-stack-lg" staggerDelay={0.12}>
          {/* Learning App — the feature chapter, shown first */}
          <StaggerItem direction="up" className="lg:col-span-3 lg:row-span-2">
            <Link
              to="/website/learning-app"
              className="group relative flex h-full min-h-[420px] lg:min-h-[560px] flex-col justify-between gap-section overflow-hidden rounded-2xl bg-gradient-to-br from-primary-800 via-primary-900 to-ink-900 p-stack-lg lg:p-section-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-brand-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
            >
              <div aria-hidden className="absolute -top-24 -right-24 w-96 h-96 rounded-pill bg-primary-500/25 blur-3xl pointer-events-none group-hover:bg-primary-400/35 transition-colors duration-700" />
              <div aria-hidden className="absolute -bottom-20 -left-20 w-72 h-72 rounded-pill bg-accent-400/12 blur-3xl pointer-events-none" />

              <div className="relative flex flex-col gap-stack-lg">
                <span className="font-body text-caption tracking-[0.2em] uppercase text-white/50 m-0">
                  Chapitre I
                </span>
                <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-white leading-[1.1] m-0 max-w-md">
                  La Learning App qui <span className="text-accent-400">apprend avec vous</span>.
                </h3>
                <p className="font-body text-body-lg text-white/70 leading-relaxed m-0 max-w-md">
                  Parcours adaptatifs, Passeport Dreyfus, coaching intégré, matching IA. Une expérience apprenante de bout en bout.
                </p>
              </div>

              <div className="relative flex flex-col gap-stack-lg">
                <ul className="flex flex-col gap-stack-xs m-0 p-0 list-none">
                  {LEARNING_APP_FEATURES.map((f) => (
                    <li key={f} className="flex items-center gap-stack-xs">
                      <CheckCircle2 size={15} className="text-accent-400 shrink-0" />
                      <span className="font-body text-body-sm text-white/80">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-stack-xs text-accent-400 font-semibold">
                  <span>Explorer la Learning App</span>
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-base" />
                </div>
              </div>
            </Link>
          </StaggerItem>

          {OFFERS.map((o, i) => (
            <StaggerItem key={o.title} direction="up" className="lg:col-span-2">
              <Link
                to={o.link}
                className="group relative flex h-full min-h-[260px] flex-col justify-between gap-stack-lg overflow-hidden rounded-2xl border border-secondary-200 bg-white p-stack-lg transition-all duration-500 hover:-translate-y-1 hover:border-secondary-300 hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500"
              >
                <div aria-hidden className="absolute -bottom-20 -right-20 w-72 h-72 rounded-pill bg-secondary-100/60 blur-3xl pointer-events-none" />
                <div className="relative flex flex-col gap-stack">
                  <span className="font-body text-micro tracking-[0.2em] uppercase text-secondary-500 m-0">
                    {`Chapitre ${i === 0 ? 'II' : 'III'}`}
                  </span>
                  <div className="inline-flex w-12 h-12 rounded-xl bg-secondary-100 items-center justify-center text-secondary-700 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-base">
                    {o.icon}
                  </div>
                  <h3 className="font-display text-h3 font-bold text-ink-900 m-0 leading-tight">{o.title}</h3>
                  <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">{o.desc}</p>
                </div>
                <div className="relative flex items-center gap-stack-xs text-secondary-700 font-semibold text-body-sm">
                  <span>{o.cta}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-base" />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

// ─── Page ───────────────────────────────────────────────────────────────

export const HomeCinematicRevealV2: React.FC = () => {
  return (
    <div className="bg-secondary-50">
      <CinematicHero />
      <CinematicCut />
      <ChapterOffers />
    </div>
  );
};

export default HomeCinematicRevealV2;
