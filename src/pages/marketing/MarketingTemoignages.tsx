/**
 * MarketingTemoignages — Case studies gallery — Premium Minimal (redesign)
 *
 * Direction: storytelling. Featured case study + filterable grid + impact metrics.
 * Suppression: MeshGradientBg, ParallaxLayer, GradientText, NoiseTexture.
 * Fonds blanc/primary-50. Accents accent-400.
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Award,
  ArrowUpRight,
  MessageSquare,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import {
  FadeInWhenVisible,
  MagneticButton,
} from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';

export const MarketingTemoignages: React.FC = () => {

  return (
    <div className="bg-white">
      <SEOHead
        title="Cas clients & témoignages"
        description="Nos premiers retours clients arrivent prochainement. Contactez-nous pour échanger avec des référents de missions en cours — formation, STRIDE, Learning App."
        canonical="/marketing/temoignages"
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-page overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900">
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-pill bg-primary-500/30 blur-3xl" />
          <div className="absolute top-0 right-0 w-[350px] h-[350px] rounded-pill bg-accent-400/5 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <FadeInWhenVisible direction="up">
            <span className="inline-flex items-center gap-stack-xs px-3 py-1.5 rounded-pill bg-white/15 border border-white/25 backdrop-blur-glass-light shadow-xs">
              <Sparkles size={14} className="text-accent-400" />
              <span className="font-body text-caption font-semibold text-white tracking-wider uppercase">
                Cas clients · histoires de transformation
              </span>
            </span>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.1}>
            <h1 className="font-display font-extrabold text-white leading-[0.98] tracking-tight m-0 text-[clamp(2.75rem,7vw,5.5rem)] max-w-4xl">
              Histoires de{' '}
              <span className="text-accent-400">transformation</span>.
            </h1>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.2}>
            <p className="font-body text-body-lg text-white/85 leading-relaxed m-0 max-w-2xl">
              Nos premiers retours clients arrivent prochainement. En attendant, contactez-nous
              pour échanger avec des référents de nos missions en cours.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.3}>
            <MagneticButton strength={12}>
              <Link to="/marketing/contact">
                <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                  Parler à un référent
                </Button>
              </Link>
            </MagneticButton>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── Placeholder + contact nudge ───────────────────────────────────── */}
      <section className="py-page bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <FadeInWhenVisible direction="up">
            <div className="rounded-3xl bg-gradient-to-br from-primary-50 to-white border border-primary-100 p-section-lg flex flex-col items-center text-center gap-stack-lg shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center">
                <MessageSquare size={28} className="text-primary-600" />
              </div>
              <div className="flex flex-col gap-stack max-w-prose">
                <h2 className="font-display text-h3 font-extrabold text-ink-900 leading-tight tracking-tight m-0">
                  Nos cas clients arrivent prochainement.
                </h2>
                <p className="font-body text-body text-ink-600 leading-relaxed m-0">
                  Nous publions les témoignages au fur et à mesure des autorisations de nos clients.
                  En attendant, nous pouvons vous mettre en contact avec des référents de missions en cours :
                  diagnostic, déploiement STRIDE ou Learning App.
                </p>
              </div>
              <MagneticButton strength={12}>
                <Link to="/marketing/contact">
                  <Button variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                    Parler à un référent
                  </Button>
                </Link>
              </MagneticButton>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── CTA — brand dark gradient ─────────────────────────────────────── */}
      <section className="py-page bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-pill bg-primary-500/25 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-pill bg-accent-400/5 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 flex flex-col items-center">
          <FadeInWhenVisible direction="up">
            <div className="w-full rounded-3xl bg-white/10 backdrop-blur-glass-heavy border border-white/20 shadow-2xl p-section-lg flex flex-col items-center text-center gap-stack-lg">
              <Award size={36} className="text-accent-400" />
              <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-extrabold text-white leading-[1.05] tracking-tight m-0">
                Votre équipe sera-t-elle la prochaine ?
              </h2>
              <p className="font-body text-body-lg text-white/80 leading-relaxed m-0 max-w-prose">
                Diagnostic gratuit de 90 min. Nous comprenons votre contexte, évaluons le potentiel
                et proposons un chemin.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-stack-xs pt-stack">
                <MagneticButton strength={12}>
                  <Link to="/marketing/contact">
                    <Button variant="warm" size="xl" trailingIcon={<ArrowRight size={20} />}>
                      Réserver un diagnostic
                    </Button>
                  </Link>
                </MagneticButton>
                <Link to="/marketing/methode">
                  <Button variant="glass" size="xl" trailingIcon={<ArrowUpRight size={20} />}>
                    Voir notre méthode
                  </Button>
                </Link>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default MarketingTemoignages;
