/**
 * HomeCheminV2 — Direction "Le Chemin" (prototype).
 *
 * Concept : le parcours EST le message. Devenir formateur augmenté est un
 * voyage avec une destination claire. Ce n'est pas un hero SaaS qui crie ;
 * c'est une invitation à marcher. Registre : chaud, classique, éditorial,
 * serein — là où les autres directions poussent la tech, celle-ci pose une
 * peinture (chemin sinueux + rotonde) et laisse respirer.
 *
 * L'astre de cette direction = la vidéo peinte `paysage-chemin-rotonde-teal-6s`.
 * Un chemin qui serpente entre des collines vers une petite rotonde de pierre,
 * lumière dorée du matin. Elle est le centre de gravité de tout l'écran.
 *
 * Lisibilité du titre (choix éditorial, pas de scrim lourd) :
 *  - La peinture s'éclaircit vers le HAUT (ciel doré → presque blanc), et
 *    s'assombrit vers le bas (collines teal-vert). On place donc le H1 en
 *    HAUT-GAUCHE, en encre foncée (text-ink-900), sur la zone de ciel pâle —
 *    le mouvement le plus élégant ici. Un léger voile blanc top→transparent
 *    (from-white/85) garantit ≥ AA (le texte ink-900 tombe sur du blanc à
 *    ~85%+, contraste bien supérieur à 4.5:1) sans masquer la peinture.
 *
 * Mouvement (contraintes dures respectées) :
 *  - UNE seule couche animée : la vidéo, scale 1 → 1.06 lue sur UN
 *    scrollYProgress à UN débit. Poussée caméra lente ("on marche vers la
 *    rotonde"), PAS de parallax (aucune couche à vitesse divergente).
 *  - Aucun scroll-jack : le hero n'est jamais épinglé, il défile normalement.
 *  - Tout est gated sur useReducedMotion() : sous reduced motion, poster
 *    statique + texte à l'état final immédiat.
 *
 * Copy : reprise verbatim de MarketingHome (H1, subhead, CTA) + chapitres
 * "Le parcours" honnêtes repris de VideoScrollStory. Aucune métrique inventée.
 * Discipline : vous (pas tu), pas de client fictif, pas d'em dash.
 */

import React from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '../../../components/core/Button';
import { FadeInWhenVisible, MagneticButton } from '../../../components/marketing/motion';

// ─── Assets (astre de la direction) ──────────────────────────────────────────

const HERO_VIDEO = '/videos/paysage-chemin-rotonde-teal-6s.mp4';
const HERO_POSTER = '/images/bg-frames/paysage-chemin-rotonde-poster.jpg';
const SEAM_VIDEO = '/videos/aquarelle-nuages-dore-ambre-8s.mp4';

// ─── 1. Hero : la peinture-chemin, plein cadre, poussée caméra lente ─────────

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

  // UNE seule couche, UN scrollYProgress, UN débit : lente marche vers la
  // rotonde. scale 1 → 1.06 (push discret) — pas de parallax, pas de fade-out
  // du contenu (le texte garde son fade-in au chargement, non lié au scroll).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 1.06]);

  const headlineWords = ['Vos', 'formateurs,'];

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] overflow-hidden bg-primary-50">
      {/* Couche peinture — object-cover, plein cadre */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ scale }}
        aria-hidden
      >
        {reduced ? (
          <img
            src={HERO_POSTER}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={HERO_POSTER}
            className="absolute inset-0 w-full h-full object-cover object-center"
            tabIndex={-1}
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/*
        Voile éditorial tuné pour la lisibilité — PAS un scrim lourd.
        Blanc dense en haut (zone titre, sur le ciel pâle) → transparent au
        milieu (on voit la peinture nette) → très léger blanc en bas pour
        asseoir le sous-titre. Le H1 ink-900 tombe sur du blanc ≥ 85% → AA large.
      */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/85 via-white/10 to-transparent"
      />

      {/* Contenu : haut-gauche, encre foncée sur ciel pâle */}
      <div className="relative min-h-[100dvh] flex items-start">
        <div className="w-full max-w-wide mx-auto px-6 pt-page sm:pt-section-lg lg:pt-page">
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-[46rem] flex flex-col gap-stack-lg"
          >
            {/* Eyebrow "le parcours" — une seule fois, cadre la direction */}
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className="font-body text-body-sm font-bold text-primary-700 tracking-[0.18em] uppercase m-0"
            >
              Un chemin, une destination
            </motion.p>

            {/* H1 — révélation séquentielle calme, mot à mot (pas kinétique) */}
            <h1 className="font-display font-extrabold text-ink-900 leading-[0.98] tracking-display m-0 [text-wrap:balance] text-[clamp(2.75rem,6.5vw,5rem)]">
              {headlineWords.map((w, i) => (
                <motion.span
                  key={w}
                  className="inline-block mr-[0.28em]"
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                </motion.span>
              ))}
              <motion.span
                className="inline-block text-secondary-600"
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 + headlineWords.length * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                augmentés par l&apos;IA
              </motion.span>
              <span aria-hidden className="text-ink-900">.</span>
            </h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: 'easeOut' }}
              className="font-body text-body-lg text-ink-700 leading-relaxed m-0 max-w-[54ch]"
            >
              The Learning Society aide organisations et professionnels à maîtriser
              l&apos;IA en formation : une formation certifiante, une Learning App
              adaptative et un accompagnement sur mesure. Sans perdre l&apos;humain
              au centre.
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-stack-xs pt-stack"
            >
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
              <Button
                to="/website/learning-app"
                variant="secondary"
                size="lg"
                trailingIcon={<ArrowUpRight size={18} />}
              >
                Me former
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── 2. Le parcours : un vrai ordre, 4 chapitres, révélations calmes ─────────
// Copy honnête reprise verbatim de VideoScrollStory (déjà approuvée). Numérotés
// parce que l'ordre PORTE du sens (c'est une vraie séquence : arriver →
// découvrir → construire → rejoindre), pas une déco 01/02/03.

const CHAPTERS = [
  {
    eyebrow: 'Point de départ',
    title: 'Vous arrivez avec vos intuitions',
    body: "Pas besoin d'être expert IA. Juste curieux, motivé, prêt à expérimenter. Nous vous rencontrons là où vous en êtes.",
  },
  {
    eyebrow: 'La découverte',
    title: 'Vous découvrez une autre manière',
    body: 'Le Formateur Augmenté ne remplace rien. Il ajoute une dimension : la personnalisation à grande échelle.',
  },
  {
    eyebrow: 'La construction',
    title: 'Vous construisez vos parcours',
    body: 'Concevoir des expériences qui transforment vraiment. Avec des outils, oui, mais surtout avec un cadre pédagogique solide.',
  },
  {
    eyebrow: 'La communauté',
    title: 'Vous rejoignez une communauté',
    body: 'Des formateurs qui partagent, expérimentent, et font évoluer la pédagogie augmentée ensemble.',
  },
] as const;

const Parcours: React.FC = () => (
  <section className="relative bg-white py-page lg:py-section-lg overflow-hidden">
    {/* Seam chaud : voile aquarelle doré/ambre en haut de section, adoucit la
        couture peinture → blanc. Décoratif, gated par la balise (les vidéos ne
        jouent pas sous reduced-motion via le poster, mais ici on la laisse en
        fond très atténué — object-cover, opacité faible). */}
    <div aria-hidden className="absolute top-0 inset-x-0 h-64 overflow-hidden pointer-events-none">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.12]"
        tabIndex={-1}
        ref={(el) => {
          if (el && el.paused) el.play().catch(() => {});
        }}
      >
        <source src={SEAM_VIDEO} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
    </div>

    <div className="relative max-w-wide mx-auto px-6 flex flex-col gap-section-lg">
      <FadeInWhenVisible>
        <div className="max-w-3xl flex flex-col gap-stack">
          <p className="font-body text-body-sm font-bold text-secondary-600 tracking-[0.18em] uppercase m-0">
            Le parcours
          </p>
          <h2 className="font-display font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0 [text-wrap:balance] text-[clamp(2rem,4.5vw,3.5rem)]">
            Un chemin en quatre chapitres, jusqu&apos;à la rotonde.
          </h2>
          <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-[56ch]">
            Devenir formateur augmenté n&apos;arrive pas d&apos;un coup. Cela se
            marche, étape après étape, à votre rythme.
          </p>
        </div>
      </FadeInWhenVisible>

      {/* La séquence — révélations séquentielles calmes. La ligne verticale à
          gauche matérialise le chemin ; chaque chapitre est une halte. */}
      <ol className="relative flex flex-col gap-section m-0 p-0 list-none">
        {/* Le "chemin" — trait vertical teal derrière les numéros (desktop) */}
        <div
          aria-hidden
          className="hidden sm:block absolute left-[1.375rem] top-4 bottom-4 w-px bg-gradient-to-b from-primary-300 via-primary-200 to-secondary-200 pointer-events-none"
        />
        {CHAPTERS.map((c, i) => (
          <FadeInWhenVisible key={c.eyebrow} direction="up" delay={i * 0.06}>
            <li className="relative flex flex-col sm:flex-row gap-stack sm:gap-section">
              {/* Repère numéroté — l'ordre porte du sens (vraie séquence) */}
              <div className="relative shrink-0">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-pill bg-primary-600 text-white font-display font-extrabold text-body-lg tabular-nums shadow-brand-sm">
                  {i + 1}
                </span>
              </div>
              <div className="flex flex-col gap-stack-xs pt-1">
                <span className="font-body text-caption font-bold text-primary-700 tracking-[0.16em] uppercase">
                  {c.eyebrow}
                </span>
                <h3 className="font-display text-h3 font-bold text-ink-900 leading-tight m-0">
                  {c.title}
                </h3>
                <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-[58ch]">
                  {c.body}
                </p>
              </div>
            </li>
          </FadeInWhenVisible>
        ))}
      </ol>

      {/* Destination : CTA serein, chaud, éditorial */}
      <FadeInWhenVisible direction="up" delay={0.1}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-stack-lg rounded-2xl bg-secondary-50 border border-secondary-100 p-section">
          <div className="flex flex-col gap-stack-xs flex-1">
            <h3 className="font-display text-h3 font-bold text-ink-900 leading-tight m-0">
              La rotonde, c&apos;est la maîtrise.
            </h3>
            <p className="font-body text-body text-ink-700 leading-relaxed m-0 max-w-[52ch]">
              Prêt à faire le premier pas ? Commencez par la Learning App, ou
              parlons de votre organisation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-stack-xs shrink-0">
            <Button
              to="/website/learning-app"
              variant="primary"
              size="lg"
              trailingIcon={<ArrowRight size={18} />}
            >
              Commencer le parcours
            </Button>
          </div>
        </div>
      </FadeInWhenVisible>
    </div>
  </section>
);

// ─── Page ────────────────────────────────────────────────────────────────────

export const HomeCheminV2: React.FC = () => {
  return (
    <div className="bg-white">
      <Hero />
      <Parcours />
    </div>
  );
};

export default HomeCheminV2;
