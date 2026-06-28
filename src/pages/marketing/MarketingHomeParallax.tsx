/**
 * Variante Parallax — vraie profondeur 3 couches par section :
 *   Couche 0 — blob ambiante (lente, 0.3x vitesse)
 *   Couche 1 — image "fenêtre" (0.85x, illusion de plan intermédiaire)
 *   Couche 2 — badge foreground (1.4x, avant-plan rapide)
 * Contenu calqué sur la homepage pour un rendu réaliste.
 */
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Quote, ShieldCheck, CreditCard, Globe } from 'lucide-react';
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Button } from '../../components/core/Button';
import { FadeInWhenVisible, MagneticButton } from '../../components/marketing/motion';
import { CinematicHero } from './components/CinematicHero';


const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const TRUST_SIGNALS = [
  { value: '578', label: 'apprenants formés', note: 'C-Campus 2023' },
  { value: '+93%', label: 'de satisfaction', note: 'C-Campus 2023' },
  { value: '1 grand groupe', label: 'français en production', note: 'depuis janvier 2026' },
  { value: '7 modules', label: 'de formation certifiante', note: '7h de pédagogie active' },
] as const;

const CHAPTERS = [
  {
    num: '01',
    eyebrow: 'La formation',
    title: 'Devenez Formateur Augmenté.',
    body: "7 modules, pédagogie active, méthode STRIDE. Une formation certifiante pour les formateurs qui veulent maîtriser l'IA sans s'y soumettre.",
    img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900&q=80&auto=format&fit=crop',
    blobColor: '#ffd4a8',
    badgeText: 'Formation certifiante · Open Badge',
    bg: 'bg-white',
    reverse: false,
  },
  {
    num: '02',
    eyebrow: 'La méthode',
    title: 'Des architectes de l\'apprentissage.',
    body: "La méthode STRIDE transforme des formateurs en concepteurs augmentés. Présence humaine + intelligence artificielle : c'est la posture, pas l'outil.",
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80&auto=format&fit=crop',
    blobColor: '#b9d7df',
    badgeText: 'Méthode STRIDE',
    bg: 'bg-primary-50/30',
    reverse: true,
  },
  {
    num: '03',
    eyebrow: 'La plateforme',
    title: 'Une app qui apprend avec vous.',
    body: "Passeport Dreyfus, matching IA, coaching 1-1, journal réflexif. La Learning App s'adapte à chaque profil et mesure la progression de Novice à Expert.",
    img: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=900&q=80&auto=format&fit=crop',
    blobColor: '#f8eec0',
    badgeText: 'Learning App · Passeport Dreyfus',
    bg: 'bg-white',
    reverse: false,
  },
  {
    num: '04',
    eyebrow: 'La communauté',
    title: '578 formateurs. Un réseau vivant.',
    body: "Certifiés, actifs, en production. Rejoindre TLS c'est rejoindre des pairs qui expérimentent, partagent et font évoluer la pédagogie augmentée ensemble.",
    img: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=900&q=80&auto=format&fit=crop',
    blobColor: '#b9d7df',
    badgeText: '+93% de satisfaction · C-Campus',
    bg: 'bg-secondary-50/30',
    reverse: true,
  },
] as const;

// ─── Section parallax full-bleed ───────────────────────────────────────────────
const ParallaxSection: React.FC<{
  num: string;
  eyebrow: string;
  title: string;
  body: string;
  img: string;
  blobColor: string;
  badgeText: string;
  bg: string;
  reverse: boolean;
}> = ({ num, eyebrow, title, body, img, blobColor, badgeText, reverse }) => {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Fond à 60% de la vitesse du scroll — effet profondeur immédiatement visible
  const bgY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  // Badge avant-plan — plus rapide que le contenu
  const badgeY = useTransform(scrollYProgress, [0, 1], [20, -30]);

  return (
    <section ref={ref} className="relative overflow-hidden min-h-[85vh] flex items-center">
      {/* Image plein écran — couche de fond lente */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY, scale: 1.35 }}
        aria-hidden
      >
        <img
          src={img}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Voile de lisibilité */}
      <div className="absolute inset-0 bg-ink-900/52 pointer-events-none" aria-hidden />
      {/* Tinte ambiante blob-color */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(ellipse 70% 70% at ${reverse ? '75%' : '25%'} 50%, ${blobColor}, transparent)`,
        }}
        aria-hidden
      />

      {/* Contenu texte */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-page w-full">
        <div className={`max-w-xl ${reverse ? 'ml-auto' : ''} flex flex-col gap-3`}>
          <span
            className="font-display font-extrabold text-white/10 leading-none select-none block"
            aria-hidden
            style={{ fontSize: 'clamp(5rem, 12vw, 9rem)' }}
          >
            {num}
          </span>
          <span className="font-body text-caption font-bold text-secondary-300 uppercase tracking-widest -mt-4 block">
            {eyebrow}
          </span>
          <h2
            className="font-display font-extrabold text-white leading-[1.05] tracking-display m-0"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
          >
            {title}
          </h2>
          <p className="font-body text-body-lg text-white/80 leading-relaxed m-0 max-w-md">
            {body}
          </p>
        </div>
      </div>

      {/* Badge avant-plan — vitesse différente */}
      <motion.div
        className="absolute bottom-8 left-8 inline-flex items-center gap-2 px-3 py-2 rounded-xl"
        style={{
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.8)',
          boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
          y: badgeY,
        }}
        aria-hidden
      >
        <span className="font-body text-caption font-semibold text-ink-800">{badgeText}</span>
      </motion.div>
    </section>
  );
};

// ─── Page ──────────────────────────────────────────────────────────────────────
export const MarketingHomeParallax: React.FC = () => (
  <div className="bg-white">

    {/* Hero */}
    <CinematicHero />

    {/* Lead-in */}
    <section className="py-section-lg bg-white">
      <div className="max-w-3xl mx-auto px-6 text-center flex flex-col gap-stack">
        <p className="font-body text-caption font-bold text-secondary-500 uppercase tracking-widest m-0">
          Le parcours
        </p>
        <h2
          className="font-display font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
        >
          Votre chemin en 4 étapes.
        </h2>
        <p className="font-body text-body text-ink-400 m-0">
          Chaque section révèle une couche de profondeur en scrollant.
        </p>
      </div>
    </section>

    {/* Sections parallax */}
    {CHAPTERS.map((c) => (
      <ParallaxSection key={c.num} {...c} />
    ))}

    {/* Stats réels C-Campus */}
    <section className="border-y border-ink-100 py-stack-lg bg-white">
      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-stack-lg">
        <p className="font-body text-caption text-ink-500 text-center font-semibold m-0">
          Résultats vérifiables · source C-Campus 2023
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
          {TRUST_SIGNALS.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center gap-tight">
              <span className="font-display text-h2 font-extrabold text-ink-900 tracking-display leading-none">
                {s.value}
              </span>
              <span className="font-body text-body-sm font-semibold text-ink-700">{s.label}</span>
              <span className="font-body text-micro text-ink-400">{s.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Manifeste pull-quote (dark) */}
    <section className="relative py-page overflow-hidden bg-ink-900">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(700px circle at 25% 30%, rgba(85, 161, 180, 0.32), transparent 55%),
            radial-gradient(600px circle at 75% 70%, rgba(248, 176, 68, 0.18), transparent 55%)
          `,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: GRAIN_SVG }}
      />
      <div className="relative max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-section">
        <FadeInWhenVisible direction="up">
          <Quote size={48} className="text-accent-400" />
        </FadeInWhenVisible>
        <FadeInWhenVisible direction="up" delay={0.1}>
          <p className="font-display text-[clamp(1.75rem,4.5vw,3.5rem)] font-medium text-white leading-[1.2] tracking-tight m-0">
            L'enjeu n'est pas de produire{' '}
            <span className="text-white/40">plus de contenu</span>.
            <br />
            C'est de produire des{' '}
            <span className="text-accent-400 font-bold italic">apprenants augmentés</span>.
          </p>
        </FadeInWhenVisible>
        <FadeInWhenVisible direction="up" delay={0.2}>
          <div className="flex items-center gap-stack-xs">
            <div className="w-12 h-px bg-white/30" />
            <span className="font-body text-caption text-white/60 tracking-widest uppercase font-semibold">
              Notre philosophie
            </span>
            <div className="w-12 h-px bg-white/30" />
          </div>
        </FadeInWhenVisible>
      </div>
    </section>

    {/* Qualité & financement */}
    <section className="py-stack-lg bg-white border-b border-ink-100">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
          {[
            { icon: <ShieldCheck size={22} />, bg: 'bg-primary-50 text-primary-700', title: 'Open Badge', desc: 'Certification numérique vérifiable, délivrée à l\'issue du parcours.' },
            { icon: <CreditCard size={22} />, bg: 'bg-secondary-50 text-secondary-700', title: 'Éligible OPCO', desc: 'Prise en charge possible via votre OPCO. Devis sur demande.' },
            { icon: <Globe size={22} />, bg: 'bg-accent-50 text-accent-700', title: '100% à distance', desc: 'Formation en ligne, accessible depuis partout, à votre rythme.' },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-stack p-stack rounded-2xl border border-ink-100 bg-white">
              <div className={`shrink-0 w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
                {item.icon}
              </div>
              <div className="flex flex-col gap-tight">
                <span className="font-display font-bold text-body-sm text-ink-900">{item.title}</span>
                <span className="font-body text-caption text-ink-500 leading-relaxed">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA finale */}
    <section className="relative py-page overflow-hidden bg-gradient-to-br from-primary-50/50 via-white to-accent-50/30">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-pill bg-primary-200/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-pill bg-accent-200/30 blur-3xl" />
      </div>
      <div className="relative max-w-3xl mx-auto px-6 text-center flex flex-col gap-stack-lg items-center">
        <FadeInWhenVisible direction="up">
          <h2
            className="font-display font-extrabold text-ink-900 leading-[1.02] tracking-tight m-0"
            style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}
          >
            Et si on en parlait{' '}
            <span className="text-primary-700">de vive voix</span> ?
          </h2>
        </FadeInWhenVisible>
        <FadeInWhenVisible direction="up" delay={0.1}>
          <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-prose">
            30 minutes pour comprendre vos enjeux et tracer le chemin le plus court vers l'impact.
            Pas de slides, pas de démo formatée. Juste une conversation.
          </p>
        </FadeInWhenVisible>
        <FadeInWhenVisible direction="up" delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-stack-xs pt-stack">
            <MagneticButton strength={14}>
              <Link to="/marketing/contact">
                <Button variant="primary" size="xl" trailingIcon={<ArrowRight size={20} />}>
                  Réserver un échange
                </Button>
              </Link>
            </MagneticButton>
            <Link to="/marketing/learning-app">
              <Button variant="ghost" size="xl" trailingIcon={<ArrowUpRight size={18} />}>
                Voir la démo
              </Button>
            </Link>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>


  </div>
);

export default MarketingHomeParallax;
