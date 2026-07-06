/**
 * HomeEditorialMotionV2 — Direction C : "Editorial Motion" (prototype, non wired).
 *
 * Un des 3 partis pris de direction créative pour la homepage TLS, construits
 * en parallèle par 3 agents différents (A = Cinematic Reveal, B = Interface
 * Choreography, C = celui-ci). Ce fichier est autonome et n'est PAS importé
 * dans App.tsx — c'est un prototype de revue, pas une page routée.
 *
 * Thèse créative : le sentiment "cinématique" vient de la RETENUE et du RYTHME,
 * pas de la densité d'effets. Pense pages produit Apple, site Anthropic.
 *   - Hero : espace neutre blanc/ink en majorité, UN seul moment saturé (teal),
 *     typographie large mais raisonnable (pas de clamp() démesuré).
 *   - Très peu d'éléments animés simultanément : un élément entre, se pose,
 *     PUIS le suivant apparaît. Séquence > simultanéité.
 *   - La boucle Apprendre → Pratiquer → Valider (copy réelle de
 *     SkillMapSection.tsx) racontée via StickyScrollStory : un visuel épinglé,
 *     des panneaux de texte qui avancent au scroll — discret et skippable,
 *     PAS du scroll-jack (le scroll natif continue, rien n'est piégé).
 *
 * Contraintes strictes respectées :
 *   - Aucun ParallaxLayer / effet de parallax (vitesses divergentes entre
 *     couches) — rejeté explicitement par l'utilisateur ailleurs dans ce projet.
 *   - Aucun scroll-jacking / scroll-trap. StickyScrollStory avance le contenu
 *     par seuils de scroll croisés ; le scroll reste natif et interruptible.
 *   - Tout est gated sur useReducedMotion() — état final statique immédiat.
 *   - Pas de gradient text (bg-clip-text), pas de ghost-card (border + shadow
 *     large sur le même élément), pas d'eyebrow répété sur chaque section,
 *     pas de marqueurs numérotés décoratifs, pas de rounded-full, pas de hex
 *     hardcodé ni de bg-[var(...)] arbitraire — uniquement les classes tokens.
 *   - Copy 100% reprise/adaptée de MarketingHome.tsx et SkillMapSection.tsx —
 *     aucune métrique inventée, aucun client fictif.
 */

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../components/core/Button';
import {
  FadeInWhenVisible,
  MagneticButton,
  StickyScrollStory,
  type StoryPanel,
} from '../../../components/marketing/motion';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── 1. Hero — retenue : espace neutre, un seul moment teal, séquence lente ──

const Hero: React.FC = () => {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Le seul mouvement lié au scroll dans le hero : le mot souligné teal se
  // "règle" légèrement (pas de parallax de couches, une seule valeur liée au
  // scroll progress du hero lui-même, désactivée en reduced-motion).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const underlineScale = useTransform(scrollYProgress, [0, 0.6], reduced ? [1, 1] : [1, 1.06]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 0.55]);

  // Séquence d'entrée : chaque élément attend que le précédent se soit posé.
  // Pas de simultanéité — c'est la signature de cette direction.
  const STEP = 0.55; // secondes entre chaque étape de la séquence
  const t = (n: number) => (reduced ? 0 : n * STEP);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] bg-white flex items-center overflow-hidden"
    >
      {/* Le seul moment saturé de tout le hero : un bloc teal discret, posé
          en arrière-plan à droite — jamais animé en boucle, jamais un blob
          qui dérive (ça serait un parallax déguisé). Statique, structurel. */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-1/3 lg:w-[38%] bg-primary-50 hidden md:block"
      />
      <motion.div
        aria-hidden
        initial={reduced ? { scaleY: 1 } : { scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: t(0) }}
        style={{ transformOrigin: 'top' }}
        className="absolute inset-y-0 right-0 w-1/3 lg:w-[38%] bg-primary-600 hidden md:block [clip-path:polygon(30%_0,100%_0,100%_100%,0_100%)]"
      />

      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative w-full max-w-wide mx-auto px-6 py-page"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-section items-center">
          <div className="md:col-span-8 flex flex-col gap-stack-lg">
            <motion.span
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: t(0) }}
              className="font-body text-caption font-bold text-ink-500 uppercase tracking-widest"
            >
              Formation · Learning App · Accompagnement
            </motion.span>

            <h1 className="font-display font-extrabold text-ink-900 leading-[1.05] tracking-display m-0 [text-wrap:balance] text-[clamp(2.75rem,6vw,4.5rem)]">
              <motion.span
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: t(1) }}
                className="block"
              >
                Vos formateurs,
              </motion.span>
              <motion.span
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: t(2) }}
                className="relative inline-block"
              >
                augmentés par l'IA
                <motion.span
                  aria-hidden
                  style={{ scaleX: underlineScale, transformOrigin: 'left' }}
                  className="absolute left-0 -bottom-1 h-[0.2em] w-full bg-primary-200/70 -z-10"
                />
              </motion.span>
              .
            </h1>

            <motion.p
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: t(3) }}
              className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-[52ch]"
            >
              The Learning Society aide organisations et professionnels à
              maîtriser l'IA en formation : une formation certifiante, une
              Learning App adaptative et un accompagnement sur mesure. Sans
              perdre l'humain au centre.
            </motion.p>

            <motion.div
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: t(4) }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-stack-xs pt-stack"
            >
              <MagneticButton strength={12}>
                <Button
                  to="/website/accompagnement"
                  variant="primary"
                  size="lg"
                  trailingIcon={<ArrowRight size={18} />}
                >
                  Je représente une entreprise
                </Button>
              </MagneticButton>
              <Button
                to="/website/learning-app"
                variant="outline"
                size="lg"
                trailingIcon={<ArrowUpRight size={18} />}
              >
                Me former
              </Button>
            </motion.div>
          </div>

          {/* Colonne droite : volontairement quasi-vide sur le bloc teal —
              le calme EST le point. Une seule ligne de repère éditorial. */}
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: t(2) }}
            className="hidden md:flex md:col-span-4 justify-end"
          >
            <p className="font-display text-white/90 text-h4 font-semibold leading-snug text-right max-w-[16ch] [text-wrap:balance] m-0">
              Une méthode. Pas un buzzword.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

// ─── 2. Conviction — une seule affirmation, fond blanc, rien d'autre ─────────

const Conviction: React.FC = () => (
  <section className="relative bg-white border-t border-ink-100">
    <div className="max-w-wide mx-auto px-6 py-page">
      <FadeInWhenVisible>
        <h2 className="max-w-4xl mx-auto text-center font-display font-bold text-ink-900 leading-[1.15] tracking-tight m-0 [text-wrap:balance] text-[clamp(1.5rem,3.2vw,2.25rem)]">
          L'IA ne remplace pas le formateur. Elle l'aide à aller plus loin :
          à personnaliser, à mesurer, et à rendre du temps au métier qui
          compte vraiment.
        </h2>
      </FadeInWhenVisible>
    </div>
  </section>
);

// ─── 3. Boucle Apprendre → Pratiquer → Valider, en StickyScrollStory ─────────
// Copy reprise mot pour mot des CAPTIONS de SkillMapSection.tsx (03/07/2026).

const LOOP_PANELS: StoryPanel[] = [
  {
    eyebrow: 'Apprendre',
    title: 'Apprendre, à votre rythme.',
    body: "Un parcours adaptatif qui part de votre niveau réel (échelle Dreyfus) et vous fait progresser sur ce qui compte pour votre métier : pas un catalogue de vidéos à consommer.",
  },
  {
    eyebrow: 'Pratiquer',
    title: 'Mettre en pratique, sur du concret.',
    body: "Vous appliquez immédiatement sur vos propres projets. La compétence se construit en faisant, et se prouve sur un livrable réel : accompagné, jamais seul.",
  },
  {
    eyebrow: 'Valider',
    title: 'Valoriser, et faire matcher.',
    body: "Chaque acquis enrichit un passeport de compétences vérifiable. Des preuves lisibles, prêtes à relier les bonnes compétences aux bons projets.",
  },
];

const STEP_TONE: { bg: string; ring: string; label: string }[] = [
  { bg: 'bg-primary-600', ring: 'ring-primary-200', label: 'Apprendre' },
  { bg: 'bg-secondary-500', ring: 'ring-secondary-200', label: 'Pratiquer' },
  { bg: 'bg-accent-400', ring: 'ring-accent-200', label: 'Valider' },
];

/**
 * Visuel épinglé : un seul cercle qui se recompose sobrement d'une étape à
 * l'autre (couleur + libellé), plutôt qu'un diagramme chargé. La sobriété du
 * visuel est le point — il n'y a qu'UN élément qui change à la fois.
 */
const LoopVisual: React.FC<{ activeIndex: number }> = ({ activeIndex }) => {
  const reduced = useReducedMotion();
  const step = STEP_TONE[activeIndex];

  return (
    <div className="relative flex items-center justify-center w-full aspect-square max-w-sm">
      <div className="relative w-56 h-56 sm:w-64 sm:h-64">
        {/* Anneau de progression discret — 3 segments, un par étape */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full -rotate-90" aria-hidden>
          {STEP_TONE.map((_, i) => {
            const gap = 6;
            const segLen = 360 / STEP_TONE.length - gap;
            const start = i * (360 / STEP_TONE.length);
            const circumference = 2 * Math.PI * 88;
            const segFraction = segLen / 360;
            return (
              <circle
                key={i}
                cx="100"
                cy="100"
                r="88"
                fill="none"
                stroke="currentColor"
                strokeWidth={i === activeIndex ? 4 : 2.5}
                strokeLinecap="round"
                strokeDasharray={`${circumference * segFraction} ${circumference}`}
                strokeDashoffset={-((start / 360) * circumference)}
                className={i === activeIndex ? 'text-primary-600' : 'text-ink-200'}
                style={{ transition: reduced ? 'none' : 'stroke 0.4s ease, stroke-width 0.4s ease' }}
              />
            );
          })}
        </svg>

        {/* Centre : pastille tone-aware, un seul changement de couleur/texte à la fois */}
        <div className="absolute inset-8 rounded-pill flex items-center justify-center">
          <motion.div
            key={activeIndex}
            initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: EASE }}
            className={`w-full h-full rounded-pill ${step.bg} flex flex-col items-center justify-center gap-tight text-white`}
          >
            <span className="font-body text-micro font-bold uppercase tracking-widest text-white/70">
              Étape {activeIndex + 1} / {STEP_TONE.length}
            </span>
            <span className="font-display text-h4 font-bold">{step.label}</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const LearnDoMatchStory: React.FC = () => (
  <section className="relative bg-ink-50">
    <div className="max-w-wide mx-auto px-6 pt-page">
      <FadeInWhenVisible>
        <div className="max-w-2xl flex flex-col gap-stack">
          <h2 className="font-display font-extrabold text-ink-900 leading-[1.1] tracking-tight m-0 [text-wrap:balance] text-[clamp(1.75rem,3.6vw,2.75rem)]">
            Former, pratiquer, valider.
          </h2>
          <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0">
            Une boucle d'apprentissage complète, de la théorie à la preuve
            concrète de compétence.
          </p>
        </div>
      </FadeInWhenVisible>
    </div>

    <StickyScrollStory
      panels={LOOP_PANELS}
      visual={(activeIndex) => <LoopVisual activeIndex={activeIndex} />}
      eyebrowToneClass="text-primary-600"
      className="pb-page"
    />
  </section>
);

// ─── 4. CTA finale — seule autre saturation de couleur de la page ────────────

const ClosingCTA: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();
  const show = inView || reduced;

  const features = [
    'Parcours adaptatifs avec progression Dreyfus',
    'Coaching 1-1 intégré',
    "Journal de bord réflexif, augmenté par l'IA",
  ];

  return (
    <section ref={ref} className="relative bg-white border-t border-ink-100">
      <div className="max-w-wide mx-auto px-6 py-page">
        <div className="relative overflow-hidden rounded-2xl bg-primary-700 px-6 py-page sm:px-section-lg">
          <motion.div
            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative flex flex-col gap-stack-lg max-w-content"
          >
            <h2 className="font-display font-extrabold text-white leading-[1.1] tracking-tight m-0 [text-wrap:balance] text-[clamp(1.9rem,4vw,3rem)]">
              Discutons de vos enjeux, pas de la hype.
            </h2>
            <p className="font-body text-body-lg text-white/80 leading-relaxed m-0 max-w-xl">
              Trente minutes pour comprendre votre contexte et tracer le
              chemin le plus court vers l'impact. Sans engagement.
            </p>
            <ul className="flex flex-col gap-stack-xs m-0 p-0 list-none">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-stack-xs">
                  <CheckCircle2 size={16} className="text-accent-400 shrink-0" />
                  <span className="font-body text-body-sm text-white/80">{f}</span>
                </li>
              ))}
            </ul>
            <div className="pt-stack">
              <MagneticButton strength={14}>
                <Button
                  to="/website/contact"
                  variant="secondary"
                  size="xl"
                  trailingIcon={<ArrowRight size={20} />}
                >
                  Réserver un échange
                </Button>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────

export const HomeEditorialMotionV2: React.FC = () => {
  return (
    <div className="bg-white">
      <Hero />
      <Conviction />
      <LearnDoMatchStory />
      <ClosingCTA />
    </div>
  );
};

export default HomeEditorialMotionV2;
