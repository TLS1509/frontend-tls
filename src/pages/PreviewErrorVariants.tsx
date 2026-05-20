/**
 * PreviewErrorVariants — Page de comparaison Phase 19.2 / Error redesign
 *
 * 4 directions visuelles différentes pour 404, chacune avec un ton/copy mixé :
 *   1. Immersive Cinématique (Linear/Vercel) + ton Rassurant
 *   2. Editorial Split-screen (Stripe/Notion) + ton Humoristique
 *   3. Playful Illustration (GitHub/Dropbox) + ton Educational
 *   4. Glass Depth (Apple/Vision OS) + ton Premium Minimaliste
 *
 * Toutes ont parallax mouse-follow sur les éléments clés.
 * Route : /preview/error-variants
 *
 * ⚠️ Page éphémère — sera supprimée après que l'utilisateur ait choisi la direction.
 */

import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import {
  Compass,
  Home,
  Search,
  Zap,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Coffee,
  MapPin,
  BookOpen,
  Lightbulb,
  ArrowUpRight,
} from 'lucide-react';
import { Button } from '../components/core/Button';
import { AmbientBlobs } from '../components/patterns/AmbientBlobs';

/* ─── Shared parallax hook ──────────────────────────────────────────────── */

function useMouseParallax(strength = 20) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 18, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 80, damping: 18, mass: 0.5 });
  const reduce = useReducedMotion();

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return { x: springX, y: springY, handleMove, reset, reduce };
}

/* ─── Variant 1 : Immersive Cinematic + ton Rassurant ──────────────────── */

const Variant1Immersive: React.FC = () => {
  const navigate = useNavigate();
  const parallax = useMouseParallax(30);
  const codeX = useTransform(parallax.x, (v) => v * 1.2);
  const codeY = useTransform(parallax.y, (v) => v * 1.2);
  const subX = useTransform(parallax.x, (v) => v * 0.5);
  const subY = useTransform(parallax.y, (v) => v * 0.5);

  return (
    <section
      onMouseMove={parallax.handleMove}
      onMouseLeave={parallax.reset}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 flex items-center justify-center px-6"
    >
      {/* Animated mesh background blobs */}
      <motion.div
        aria-hidden
        animate={!parallax.reduce ? { x: [0, 30, 0], y: [0, -20, 0] } : undefined}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-32 -left-32 w-[720px] h-[720px] rounded-full bg-primary-400/30 blur-ambient"
      />
      <motion.div
        aria-hidden
        animate={!parallax.reduce ? { x: [0, -40, 0], y: [0, 30, 0] } : undefined}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -bottom-40 -right-40 w-[800px] h-[800px] rounded-full bg-accent-400/25 blur-ambient"
      />
      <motion.div
        aria-hidden
        animate={!parallax.reduce ? { scale: [1, 1.1, 1] } : undefined}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-secondary-400/15 blur-ambient"
      />

      <div className="relative z-base text-center max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={{ x: subX, y: subY }}
          className="font-mono text-caption font-bold uppercase tracking-[0.3em] text-white/70 inline-flex items-center gap-2"
        >
          <Compass size={14} /> Navigation perdue
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.2, 0, 0, 1.1] }}
          style={{ x: codeX, y: codeY }}
          className="font-display font-black text-white tracking-tighter leading-none my-6"
          aria-hidden
        >
          <span className="block text-[clamp(8rem,22vw,16rem)] bg-gradient-to-br from-white via-primary-100 to-accent-200 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(85,161,180,0.4)]">
            404
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ x: subX, y: subY }}
          className="font-display text-h1 font-bold text-white leading-tight mb-4 max-w-2xl mx-auto"
        >
          On vous remet sur la bonne route
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ x: subX, y: subY }}
          className="font-body text-body-lg text-white/75 leading-relaxed mb-10 max-w-xl mx-auto"
        >
          Cette page n'existe pas — peut-être un lien expiré, peut-être un détour. Aucun stress, voici par où repartir.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <Button
            size="lg"
            onClick={() => navigate('/dashboard')}
            className="!bg-white !text-primary-800 hover:!bg-white/90 !shadow-xl"
            trailingIcon={<ArrowRight size={18} />}
          >
            Tableau de bord
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={() => navigate('/learning-paths')}
            className="!text-white !border !border-white/30 hover:!bg-white/10"
          >
            Explorer les parcours
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── Variant 2 : Editorial Split + ton Humoristique ──────────────────── */

const Variant2Editorial: React.FC = () => {
  const navigate = useNavigate();
  const parallax = useMouseParallax(12);

  const suggestions = [
    { icon: <Home size={20} />, title: 'Retour au QG', desc: 'Le tableau de bord vous attend', to: '/dashboard', tone: 'primary' },
    { icon: <Search size={20} />, title: 'Une chasse au trésor ?', desc: 'Les parcours sont par ici', to: '/learning-paths', tone: 'sun' },
    { icon: <Zap size={20} />, title: 'On vous distrait', desc: 'Veille & ressources fraîches', to: '/veille', tone: 'warm' },
  ];

  return (
    <section
      onMouseMove={parallax.handleMove}
      onMouseLeave={parallax.reset}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-page-ambient flex items-center px-6 py-page"
    >
      <AmbientBlobs intensity="subtle" position="absolute" />

      <div className="relative z-base w-full max-w-page mx-auto grid grid-cols-1 lg:grid-cols-2 gap-section items-center">
        {/* LEFT — narrative */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0, 0, 0.2, 1] }}
          style={{ x: parallax.x, y: parallax.y }}
          className="flex flex-col gap-stack-lg"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-secondary-100 text-secondary-700 text-caption font-bold uppercase tracking-wider w-fit">
            <Coffee size={14} /> Erreur 404
          </span>

          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-ink-900 leading-[1.05] tracking-tight">
            On a tourné <span className="bg-gradient-to-r from-secondary-500 to-accent-500 bg-clip-text text-transparent">à gauche au mauvais croisement</span>.
          </h1>

          <p className="font-body text-body-lg text-ink-600 leading-relaxed max-w-xl">
            Vraisemblablement on s'est inspiré du GPS de votre oncle pour router cette page. Bonne nouvelle : on a quelques raccourcis discrets sous le tapis. Choisissez votre détour.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" onClick={() => navigate('/dashboard')} leadingIcon={<Home size={18} />}>
              Rentrer à la base
            </Button>
            <Button size="lg" variant="ghost" onClick={() => navigate(-1)}>
              Page précédente
            </Button>
          </div>
        </motion.div>

        {/* RIGHT — suggestion stack */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
          className="flex flex-col gap-stack-xs"
        >
          {suggestions.map((s, i) => (
            <motion.button
              key={i}
              variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}
              whileHover={{ x: 8 }}
              onClick={() => navigate(s.to)}
              className="group flex items-center gap-4 p-stack-lg rounded-2xl bg-white border border-ink-200 shadow-sm hover:shadow-lg hover:border-primary-300 text-left cursor-pointer min-h-touch focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 transition-shadow"
            >
              <div
                className={[
                  'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
                  s.tone === 'sun' && 'bg-accent-100 text-accent-700',
                  s.tone === 'warm' && 'bg-secondary-100 text-secondary-700',
                  s.tone === 'primary' && 'bg-primary-100 text-primary-700',
                ].filter(Boolean).join(' ')}
              >
                {s.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-body text-body font-bold text-ink-900 m-0">{s.title}</h3>
                <p className="font-body text-caption text-ink-500 m-0">{s.desc}</p>
              </div>
              <ArrowUpRight size={20} className="text-ink-400 group-hover:text-primary-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ─── Variant 3 : Playful Illustration + ton Educational ──────────────── */

const Variant3Playful: React.FC = () => {
  const navigate = useNavigate();
  const parallax = useMouseParallax(15);

  return (
    <section
      onMouseMove={parallax.handleMove}
      onMouseLeave={parallax.reset}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-accent-50 via-white to-secondary-50 flex flex-col items-center justify-center px-6 py-page"
    >
      <div className="relative z-base max-w-3xl text-center flex flex-col items-center gap-stack-lg">
        {/* Illustration custom — compass with shaking needle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          style={{ x: parallax.x, y: parallax.y }}
          className="relative"
        >
          <div className="relative w-44 h-44 rounded-full bg-white shadow-xl border-4 border-accent-300 flex items-center justify-center">
            <div className="absolute inset-4 rounded-full border-2 border-dashed border-secondary-300/50" />
            <motion.div
              animate={{ rotate: [0, -25, 18, -8, 5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
              className="absolute w-2 h-32 origin-bottom bottom-1/2"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[26px] border-b-secondary-500 drop-shadow-md" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-ink-900" />
            </motion.div>
            <span className="absolute top-2 font-display text-caption font-bold text-ink-500">N</span>
            <span className="absolute bottom-2 font-display text-caption font-bold text-ink-500">S</span>
            <span className="absolute left-2 font-display text-caption font-bold text-ink-500">O</span>
            <span className="absolute right-2 font-display text-caption font-bold text-ink-500">E</span>
          </div>
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-3 -right-6 w-10 h-10 rounded-full bg-secondary-500 flex items-center justify-center shadow-lg"
          >
            <span className="font-display text-body-sm font-black text-white">?</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col gap-tight"
        >
          <p className="inline-flex items-center gap-2 font-mono text-caption font-bold uppercase tracking-wider text-secondary-700 justify-center">
            <Lightbulb size={14} /> Erreur 404 · une opportunité
          </p>
          <h1 className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold text-ink-900 leading-tight tracking-tight">
            Parfois explorer <span className="italic text-secondary-600">précède</span> trouver.
          </h1>
          <p className="font-body text-body-lg text-ink-600 leading-relaxed max-w-xl mx-auto">
            Cette page n'existe pas — mais l'apprentissage non plus n'est jamais linéaire. Voici quelques pistes pour rebondir et apprendre quelque chose en chemin.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } } }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-stack w-full mt-stack"
        >
          {[
            { icon: <BookOpen size={20} />, title: 'Reprendre un parcours', to: '/learning-paths', tone: 'primary' },
            { icon: <Sparkles size={20} />, title: 'Découvrir des astuces', to: '/veille', tone: 'sun' },
            { icon: <MapPin size={20} />, title: 'Carte de la plateforme', to: '/dashboard', tone: 'warm' },
          ].map((s, i) => (
            <motion.button
              key={i}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => navigate(s.to)}
              className="group flex flex-col items-center gap-stack-xs p-stack-lg rounded-2xl bg-white border-2 border-dashed border-ink-200 hover:border-primary-300 text-center cursor-pointer min-h-touch focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 transition-colors"
            >
              <div
                className={[
                  'w-12 h-12 rounded-2xl flex items-center justify-center',
                  s.tone === 'sun' && 'bg-accent-100 text-accent-700',
                  s.tone === 'warm' && 'bg-secondary-100 text-secondary-700',
                  s.tone === 'primary' && 'bg-primary-100 text-primary-700',
                ].filter(Boolean).join(' ')}
              >
                {s.icon}
              </div>
              <p className="font-body text-body-sm font-bold text-ink-900 m-0">{s.title}</p>
            </motion.button>
          ))}
        </motion.div>

        <Button size="lg" variant="warm" onClick={() => navigate('/dashboard')} leadingIcon={<Home size={18} />} className="mt-4">
          Retour au tableau de bord
        </Button>
      </div>
    </section>
  );
};

/* ─── Variant 4 : Glass Depth + ton Premium Minimaliste ──────────────── */

const Variant4Glass: React.FC = () => {
  const navigate = useNavigate();
  const parallax = useMouseParallax(20);
  const tiltX = useTransform(parallax.y, [-20, 20], [4, -4]);
  const tiltY = useTransform(parallax.x, [-20, 20], [-4, 4]);
  const codeX = useTransform(parallax.x, (v) => v * 2.5);
  const codeY = useTransform(parallax.y, (v) => v * 2.5);

  return (
    <section
      onMouseMove={parallax.handleMove}
      onMouseLeave={parallax.reset}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-ink-100 via-white to-primary-50 flex items-center justify-center px-6 py-page"
    >
      {/* Massive watermark code in background */}
      <motion.div
        style={{ x: codeX, y: codeY }}
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span
          className="font-display font-black text-[clamp(20rem,45vw,40rem)] leading-none tracking-tighter bg-gradient-to-br from-primary-200/60 via-primary-300/40 to-accent-200/30 bg-clip-text text-transparent select-none"
        >
          404
        </span>
      </motion.div>

      {/* Glass card centered */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] }}
        style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }}
        className="relative z-base w-full max-w-xl"
      >
        <div className="rounded-3xl backdrop-blur-glass-heavy backdrop-saturate-[180%] bg-white/55 border border-white/70 shadow-[0_30px_80px_-20px_rgba(85,161,180,0.35),0_10px_30px_-10px_rgba(0,0,0,0.1)] p-page-lg flex flex-col items-center text-center gap-stack-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-white/60 border border-white/80 text-caption font-semibold text-ink-700">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-500" /> Page introuvable
          </div>

          <h1 className="font-display text-h1 font-bold text-ink-900 leading-tight tracking-tight">
            Cette page n'existe pas.
          </h1>

          <p className="font-body text-body text-ink-600 leading-relaxed">
            Vous pouvez revenir en arrière ou rejoindre votre espace.
          </p>

          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <Button size="lg" onClick={() => navigate('/dashboard')} trailingIcon={<ArrowRight size={18} />}>
              Tableau de bord
            </Button>
            <Button size="lg" variant="ghost" onClick={() => navigate(-1)}>
              Retour
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

/* ─── Page wrapper ─────────────────────────────────────────────────────── */

interface VariantSectionProps {
  number: number;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const VariantSection: React.FC<VariantSectionProps> = ({ number, title, subtitle, children }) => (
  <div className="relative">
    <div className="sticky top-0 z-tooltip flex items-center gap-stack-xs px-page py-stack-xs bg-ink-900/90 backdrop-blur-glass-light text-white border-b border-white/10">
      <span className="font-mono text-caption font-bold text-accent-400">#{number}</span>
      <span className="font-display text-body-sm font-bold">{title}</span>
      <span className="font-body text-caption text-white/60">— {subtitle}</span>
    </div>
    {children}
  </div>
);

export const PreviewErrorVariants: React.FC = () => {
  // Fix: page needs to occupy full width without sidebar squeeze
  // Done via the layout — this just renders the 4 stacked sections
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (wrapperRef.current) wrapperRef.current.scrollIntoView({ block: 'start' });
  }, []);

  return (
    <div ref={wrapperRef} className="w-full">
      <VariantSection number={1} title="Immersive Cinematic" subtitle="Linear / Vercel · ton rassurant">
        <Variant1Immersive />
      </VariantSection>
      <VariantSection number={2} title="Editorial Split-screen" subtitle="Stripe / Notion · ton humoristique">
        <Variant2Editorial />
      </VariantSection>
      <VariantSection number={3} title="Playful Illustration" subtitle="GitHub / Dropbox · ton educational">
        <Variant3Playful />
      </VariantSection>
      <VariantSection number={4} title="Glass Depth" subtitle="Apple / Vision OS · ton premium minimal">
        <Variant4Glass />
      </VariantSection>
    </div>
  );
};

export default PreviewErrorVariants;
