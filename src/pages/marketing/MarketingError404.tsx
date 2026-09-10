/**
 * MarketingError404 — Page non trouvée · Site marketing public
 *
 * Direction « Aurora Light » : fond blanc, 3 halos mix-blend-multiply,
 * chiffre 404 géant, pills de suggestion, 2 CTA.
 *
 * Nettoyage motion du 28/07/2026 : la page portait un parallaxe à la souris sur
 * six couches (halos, chiffre, sur-titre, bloc titre) et une pulsation infinie
 * sur chaque halo. Les deux sont retirés : une page d'erreur n'a pas besoin
 * d'animation perpétuelle. Reste l'entrée en cascade, qui sert la lecture. Les
 * halos deviennent un décor fixe.
 *
 * (29/07 : le motif « le parallaxe est un effet écarté » est retiré de ce
 * commentaire — l'interdit n'existe plus. Le retrait tient sur son autre motif,
 * la sobriété d'une page d'erreur. À rejouer avec la passe motion du site.)
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Home, BookOpen, Mail, ArrowRight } from 'lucide-react';
import { Button } from '../../components/core/Button';
import { SEOHead } from './components/SEOHead';

/* ── Navigation suggestions ───────────────────────────────────────────────── */

const SUGGESTIONS = [
  { icon: <Home size={16} />, label: 'Accueil', href: '/website' },
  { icon: <BookOpen size={16} />, label: 'La méthode', href: '/website/methode' },
  // « Formations » était le nom de la page supprimée du V1 le 03/07 : le libellé
  // avait survécu à la suppression, seule la destination avait été corrigée.
  { icon: <BookOpen size={16} />, label: 'Learning App', href: '/website/learning-app' },
  { icon: <Mail size={16} />, label: 'Contact', href: '/website/contact' },
];

/* ── Page ─────────────────────────────────────────────────────────────────── */

export const MarketingError404: React.FC = () => {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-white flex items-center justify-center px-6 py-page">
      <SEOHead
        title="Page introuvable · The Learning Society"
        description="Cette page n'existe pas ou a été déplacée."
        canonical="/website/404"
        noIndex
      />
      {/* Halos décoratifs fixes — primary en haut à gauche, secondary en bas à
          droite, accent au centre-haut. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-56 -left-56 w-[780px] h-[620px] rounded-pill bg-primary-100 blur-ambient mix-blend-multiply opacity-80"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 w-[680px] h-[560px] rounded-pill bg-secondary-100 blur-ambient mix-blend-multiply opacity-70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[15%] left-[45%] w-[440px] h-[440px] rounded-pill bg-accent-100 blur-ambient mix-blend-multiply opacity-50"
      />

      <div className="relative z-base text-center max-w-3xl w-full flex flex-col items-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ y: 14 }} animate={{ y: 0 }}
          transition={{ delay: 0.05, duration: 0.5 }}
          className="font-mono text-caption font-bold uppercase tracking-[0.3em] text-primary-400 inline-flex items-center gap-stack-xs mb-stack"
        >
          <Compass size={14} /> Page introuvable
        </motion.p>

        {/* Giant 404 */}
        <motion.div
          initial={{ scale: 0.88 }} animate={{ scale: 1 }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.2, 0, 0, 1.1] }}
          aria-hidden
          className="font-display font-black tracking-tighter leading-none mb-stack-lg"
        >
          <span className="block text-[clamp(7rem,20vw,14rem)] text-primary-700 drop-shadow-[0_2px_28px_rgba(85,161,180,0.14)]">
            404
          </span>
        </motion.div>

        {/* Title + description */}
        <motion.div
          initial={{ y: 18 }} animate={{ y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="flex flex-col items-center gap-stack-xs mb-10"
        >
          <h1 className="font-display text-h1 font-bold text-ink-900 leading-tight max-w-2xl">
            Cette page n'existe pas
          </h1>
          <p className="font-body text-body-lg text-ink-500 leading-relaxed max-w-xl">
            Le lien est peut-être obsolète ou l'adresse incorrecte. Voici par où reprendre.
          </p>
        </motion.div>

        {/* Pills suggestions */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07, delayChildren: 0.5 } },
          }}
          className="flex flex-wrap justify-center gap-stack-xs mb-10"
        >
          {SUGGESTIONS.map((s) => (
            <motion.div
              key={s.href}
              variants={{
                hidden: { y: 10 },
                visible: { y: 0, transition: { duration: 0.35, ease: [0, 0, 0.2, 1] } },
              }}
              whileHover={{ y: -2 }}
            >
              <Link
                to={s.href}
                className="inline-flex items-center gap-stack-xs px-4 py-2.5 rounded-pill bg-white border border-ink-200 text-ink-700 font-body text-body-sm font-bold hover:border-primary-300 hover:text-primary-700 hover:shadow-sm transition-all min-h-touch focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 shadow-xs"
              >
                <span className="text-primary-400">{s.icon}</span>
                {s.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ y: 14 }} animate={{ y: 0 }}
          transition={{ delay: 0.85, duration: 0.4 }}
          className="flex flex-wrap gap-stack-xs justify-center"
        >
          {/* `to` et non `window.location.href` : ce dernier rechargeait toute
              l'application au lieu de naviguer côté client. */}
          <Button size="lg" to="/website" trailingIcon={<ArrowRight size={18} />}>
            Retour à l'accueil
          </Button>
          <Button size="lg" variant="secondary" to="/website/contact">
            Nous contacter
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketingError404;
