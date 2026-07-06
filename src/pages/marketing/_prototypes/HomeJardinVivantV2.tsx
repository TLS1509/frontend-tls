/**
 * HomeJardinVivantV2 — direction "Jardin vivant" (prototype hero marketing).
 *
 * Concept : le tableau de Jérôme Bosch "Le Jardin des délices", teinté dans le
 * teal TLS et animé d'une lente dérive de caméra, sert de métaphore à un
 * univers d'apprentissage vivant, riche, surréel. On le traite comme une
 * peinture vivante accrochée dans un musée — pas comme une stock video.
 *
 * Discipline reprise de MarketingHome :
 *  - vidéo full-bleed derrière le contenu, object-cover, autoPlay/muted/loop.
 *  - UNE seule transformation liée au scroll (scale 1→1.08 + fade), lue sur UN
 *    scrollYProgress à UN rythme = lent "camera push", PAS de parallaxe.
 *  - sous prefers-reduced-motion : poster statique, scale/opacity figés à 1,
 *    texte à son état final immédiatement.
 *  - scrim gradient réel (ink/teal, bas→haut + vignette gauche) pour garantir
 *    la lisibilité AA du texte clair sur la peinture chargée.
 *
 * Copy verbatim de MarketingHome (aucune métrique / client inventé).
 * Pas de gradient text, pas de parallaxe, pas de scroll-jack.
 */

import React from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Sparkles, Leaf } from 'lucide-react';
import { Button } from '../../../components/core/Button';
import {
  MagneticButton,
  KineticHeadline,
  FadeInWhenVisible,
} from '../../../components/marketing/motion';

const BOSCH_VIDEO = '/videos/bosch-jardin-terrestre-teal-15s.mp4';
const BOSCH_POSTER = '/images/bg-frames/bosch-jardin-terrestre-poster.jpg';
const AQUARELLE_VIDEO = '/videos/aquarelle-nuages-dore-ambre-8s.mp4';
const AQUARELLE_POSTER = '/images/bg-frames/aquarelle-dore-ambre-5s.jpg';

// ─── 1. Hero : le Jardin de Bosch, peinture vivante ──────────────────────────

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

  // UNE seule couche animée au scroll : lent "camera push" (scale + fondu).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 1.08]);
  const videoOpacity = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    reduced ? [1, 1, 1] : [1, 0.55, 0.15],
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden bg-primary-900"
    >
      {/* Couche 1 : la peinture vivante (vidéo Bosch teal) */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ scale, opacity: videoOpacity }}
        aria-hidden
      >
        {reduced ? (
          <img
            src={BOSCH_POSTER}
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
            poster={BOSCH_POSTER}
            className="absolute inset-0 w-full h-full object-cover"
            tabIndex={-1}
          >
            <source src={BOSCH_VIDEO} type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/*
       * Scrim de lisibilité (AA). Trois couches complémentaires, statiques :
       *  - vignette teal foncée bas→haut : ancre le texte et les CTA en bas.
       *  - dégradé latéral gauche→droite : renforce le côté texte (aligné gauche).
       *  - teinte ink globale légère : casse les mid-tones les plus clairs.
       * Gradients complexes sans équivalent Tailwind → inline style (exception
       * documentée du CLAUDE.md).
       */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(31,62,69,0.55) 0%, rgba(31,62,69,0.30) 32%, rgba(31,62,69,0.55) 72%, rgba(31,62,69,0.88) 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(100deg, rgba(15,36,41,0.80) 0%, rgba(15,36,41,0.45) 42%, rgba(15,36,41,0.10) 72%, rgba(15,36,41,0) 100%)',
        }}
      />

      {/* Cadre "musée" : filet doré discret en périphérie */}
      <div
        aria-hidden
        className="absolute inset-4 sm:inset-6 rounded-2xl border border-accent-400/25 pointer-events-none"
      />

      {/* Couche 2 : contenu texte, aligné à gauche, ancré bas de fold */}
      <div className="relative min-h-[100dvh] flex items-end">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="w-full max-w-page mx-auto px-6 sm:px-10 pb-page pt-page flex flex-col items-start gap-stack-lg"
        >
          {/* Eyebrow unique, honnête : le concept du jardin */}
          <span className="inline-flex items-center gap-stack-xs rounded-pill border border-accent-400/40 bg-primary-900/40 px-4 py-2 font-body text-body-sm text-accent-400 backdrop-blur-sm">
            <Leaf size={15} strokeWidth={2} />
            Un univers d'apprentissage vivant
          </span>

          <h1 className="font-display font-extrabold text-white leading-[0.98] tracking-display m-0 [text-wrap:balance] max-w-[20ch] text-[clamp(3rem,7vw,5.75rem)]">
            <KineticHeadline text="Vos formateurs," delay={0.5} />
            <br />
            <span className="text-accent-400">
              <KineticHeadline text="augmentés par l'IA." delay={0.75} />
            </span>
          </h1>

          <p className="font-body text-body-lg text-white/90 leading-relaxed m-0 max-w-[58ch]">
            The Learning Society aide organisations et professionnels à maîtriser
            l'IA en formation : une formation certifiante, une Learning App
            adaptative et un accompagnement sur mesure. Sans perdre l'humain au
            centre.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-stack-xs pt-stack">
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
                variant="glass"
                size="lg"
                trailingIcon={<ArrowUpRight size={18} />}
              >
                Me former
              </Button>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── 2. Le jardin comme métaphore : ce qui pousse dans cet univers ───────────

type Bloom = {
  icon: React.ReactNode;
  title: string;
  body: string;
};

const BLOOMS: Bloom[] = [
  {
    icon: <Sparkles size={22} strokeWidth={1.75} />,
    title: 'Une formation certifiante',
    body: "Comprendre l'IA en formation, sans jargon : des repères concrets pour vos formateurs et vos équipes pédagogiques.",
  },
  {
    icon: <Leaf size={22} strokeWidth={1.75} />,
    title: 'Une Learning App adaptative',
    body: "Un espace qui s'ajuste à chacun : parcours, ressources, veille et coaching, réunis dans un même monde vivant.",
  },
  {
    icon: <ArrowUpRight size={22} strokeWidth={1.75} />,
    title: 'Un accompagnement sur mesure',
    body: 'Nous avançons à vos côtés pour ancrer les usages dans la durée, au rythme de votre organisation.',
  },
];

const LivingWorld: React.FC = () => {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-primary-900 text-white">
      {/* Fond aquarelle doré/ambre en douceur, statique sous reduced-motion */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {reduced ? (
          <img
            src={AQUARELLE_POSTER}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster={AQUARELLE_POSTER}
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            tabIndex={-1}
          >
            <source src={AQUARELLE_VIDEO} type="video/mp4" />
          </video>
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(31,62,69,0.92) 0%, rgba(31,62,69,0.82) 100%)',
          }}
        />
      </div>

      {/* Seam : adoucit la coupure hero → section */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(15,36,41,0.7) 0%, rgba(15,36,41,0) 100%)' }}
      />

      <div className="relative max-w-wide mx-auto px-6 sm:px-10 py-page lg:py-section-lg">
        <FadeInWhenVisible>
          <div className="flex flex-col gap-stack max-w-3xl">
            <h2 className="font-display font-bold text-white leading-[1.1] tracking-tight m-0 [text-wrap:balance] text-[clamp(1.75rem,3.8vw,3rem)]">
              Un jardin où l'apprentissage prend vraiment racine.
            </h2>
            <p className="font-body text-body-lg text-white/80 leading-relaxed m-0 max-w-[60ch]">
              Trois leviers qui grandissent ensemble, comme un même écosystème
              vivant. On ne juxtapose pas des outils : on cultive un monde
              d'apprentissage cohérent, dans la durée.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="mt-section grid gap-stack-lg md:grid-cols-3">
          {BLOOMS.map((bloom, i) => (
            <FadeInWhenVisible key={bloom.title} delay={i * 0.1}>
              <article className="h-full flex flex-col gap-stack rounded-2xl border border-white/15 bg-primary-800/40 p-6 backdrop-blur-glass-light">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-400/15 text-accent-400">
                  {bloom.icon}
                </span>
                <h3 className="font-display font-bold text-white text-h4 leading-tight m-0">
                  {bloom.title}
                </h3>
                <p className="font-body text-body text-white/75 leading-relaxed m-0">
                  {bloom.body}
                </p>
              </article>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Page prototype ──────────────────────────────────────────────────────────

export const HomeJardinVivantV2: React.FC = () => (
  <main className="bg-primary-900">
    <Hero />
    <LivingWorld />
  </main>
);

export default HomeJardinVivantV2;
