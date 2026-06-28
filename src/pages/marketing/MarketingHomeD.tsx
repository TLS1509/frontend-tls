/**
 * Variant D: "Aquarelle pleine page"
 * Watercolour-reveal en boucle fixée derrière toute la page.
 * Parallax scroll : la vidéo dérive vers le haut au scroll -> effet "plonger dans l'aquarelle".
 * Même structure narrative que FullPage.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../../components/core/Button';

const CHAPTERS = [
  { num: '01', eyebrow: 'Point de départ', title: 'Vous arrivez avec vos intuitions.', body: "Pas besoin d'être expert IA. Juste curieux, motivé, prêt à expérimenter." },
  { num: '02', eyebrow: 'La découverte', title: 'Vous découvrez une autre manière.', body: 'Le Formateur Augmenté ne remplace rien. Il ajoute la personnalisation à grande échelle.' },
  { num: '03', eyebrow: 'La construction', title: 'Vous construisez vos parcours.', body: 'Concevoir des expériences qui transforment vraiment, avec un cadre pédagogique solide.' },
  { num: '04', eyebrow: 'La certification', title: 'Vous validez avec un Open Badge.', body: 'Un badge reconnu, délivré en partenariat avec C-Campus. La preuve concrète de ce que vous savez faire.' },
] as const;

const FadeIn: React.FC<{ delay?: number; children: React.ReactNode; className?: string }> = ({
  delay = 0, children, className = '',
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const MarketingHomeD: React.FC = () => (
    <div className="relative min-h-screen">

      {/* ── Image watercolour fixée en fond de toute la page ────────────── */}
      <div className="fixed inset-0 z-[1] pointer-events-none" aria-hidden>
        <img
          src="/images/bg-frames/watercolour-reveal-1s.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-ink-900/62" />
      </div>

      {/* ── Content (above background) ───────────────────────────────────── */}
      <div className="relative z-[2]">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-page relative">
        <FadeIn className="flex flex-col items-center text-center gap-stack-lg max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-tight px-4 py-1.5 rounded-pill bg-white/10 border border-white/20 text-white/75 font-body text-caption font-semibold backdrop-blur-sm">
            Formation · Certification · Communauté
          </span>
          <h1
            className="font-display font-extrabold text-white leading-[1.0] tracking-display m-0"
            style={{ fontSize: 'clamp(2.75rem, 7vw, 5.5rem)' }}
          >
            Les formateurs qui forment<br />
            <span className="text-accent-400">autrement.</span>
          </h1>
          <p className="font-body text-body-lg text-white/75 leading-relaxed m-0 max-w-2xl">
            The Learning Society forme des formateurs augmentés par l'IA.
            Pas pour remplacer leur pédagogie, mais pour la démultiplier.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-stack-xs pt-stack">
            <Link to="/marketing/formation">
              <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                Découvrir la formation
              </Button>
            </Link>
            <Link to="/marketing/contact">
              <Button variant="ghost" size="lg" className="!text-white hover:!bg-white/10 !border !border-white/30">
                Échanger 30 minutes
              </Button>
            </Link>
          </div>
        </FadeIn>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        >
          <span className="font-body text-caption text-white/30 uppercase tracking-widest">Défiler</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </section>

      {/* ── Conviction ───────────────────────────────────────────────────── */}
      <section className="py-section-lg bg-ink-900/40 backdrop-blur-sm border-t border-b border-white/10">
        <FadeIn className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-stack-lg">
          <p className="font-body text-caption font-bold text-accent-400 uppercase tracking-widest">Notre conviction</p>
          <h2
            className="font-display font-extrabold text-white leading-[1.15] tracking-tight m-0"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            On n'apprend pas avec des outils.<br />
            <span className="text-accent-400">On apprend avec des humains</span> : accompagnés par des outils.
          </h2>
        </FadeIn>
      </section>

      {/* ── Parcours ─────────────────────────────────────────────────────── */}
      <section className="py-page">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-section">
          <FadeIn className="flex flex-col gap-stack">
            <p className="font-body text-caption font-bold text-accent-400/80 uppercase tracking-widest">Le parcours</p>
            <h2
              className="font-display font-extrabold text-white leading-[1.05] tracking-display m-0"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
            >
              Votre chemin en 4 chapitres.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
            {CHAPTERS.map((c, i) => (
              <FadeIn key={c.num} delay={i * 0.08}>
                <article className="rounded-2xl bg-white/8 backdrop-blur-md border border-white/15 p-stack-lg flex flex-col gap-stack hover:bg-white/12 transition-colors duration-200">
                  <div className="flex items-start gap-stack-xs">
                    <span className="font-display font-extrabold text-white/20 leading-none tabular-nums" style={{ fontSize: '3.5rem' }}>{c.num}</span>
                    <span className="font-body text-caption font-bold text-accent-400 uppercase tracking-widest mt-2">{c.eyebrow}</span>
                  </div>
                  <h3 className="font-display font-extrabold text-white leading-tight m-0" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)' }}>{c.title}</h3>
                  <p className="font-body text-body text-white/65 leading-relaxed m-0">{c.body}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Résultats C-Campus ────────────────────────────────────────────── */}
      <section className="py-page bg-white/6 backdrop-blur-sm border-t border-white/10">
        <FadeIn className="max-w-5xl mx-auto px-6">
          <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-stack-lg flex flex-col md:flex-row items-center gap-section-lg">
            <div className="flex flex-col gap-stack flex-1">
              <span className="font-body text-caption font-bold text-white/50 uppercase tracking-widest">Notre ancrage</span>
              <p className="font-display font-extrabold text-white leading-tight m-0" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}>
                Déployé avec C-Campus, dès 2023.
              </p>
              <p className="font-body text-body text-white/65 leading-relaxed m-0 max-w-prose">
                En 2023, 578 apprenants formés avec un taux de satisfaction de +93 %.
              </p>
            </div>
            <div className="flex flex-col gap-stack-xs shrink-0">
              {['578 formés', '+93 % satisfaction', 'Open Badge certifié'].map((item) => (
                <span key={item} className="inline-flex items-center gap-stack-xs px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white/80 font-body text-body-sm font-semibold">
                  <CheckCircle size={14} className="text-accent-400 shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── Tarifs ───────────────────────────────────────────────────────── */}
      <section className="py-page">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-section">
          <FadeIn className="flex flex-col gap-stack items-center text-center max-w-2xl mx-auto">
            <Award size={32} className="text-accent-400" />
            <h2
              className="font-display font-extrabold text-white leading-[1.05] tracking-tight m-0"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
            >
              Une certification reconnue.
            </h2>
            <p className="font-body text-body-lg text-white/65 leading-relaxed m-0">
              Open Badge, en partenariat avec C-Campus. 7 modules, 8 semaines, coaching inclus.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack">
            {[
              { label: 'Découverte', price: 'Gratuit', desc: 'Accès au premier module + communauté.', cta: 'Commencer', highlight: false },
              { label: 'Certifiant', price: '249€', desc: 'Formation complète + Open Badge + coaching 1-1.', cta: "M'inscrire", highlight: true },
              { label: 'Sur mesure', price: 'Devis', desc: 'Programme adapté à votre organisation.', cta: 'Contacter', highlight: false },
            ].map((t) => (
              <FadeIn key={t.label}>
                <article
                  className={`rounded-2xl p-stack-lg flex flex-col gap-stack-lg h-full ${
                    t.highlight
                      ? 'bg-secondary-500/90 backdrop-blur-md border border-secondary-400/50 relative'
                      : 'bg-white/8 backdrop-blur-md border border-white/15'
                  }`}
                >
                  {t.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center px-3 py-1 rounded-pill bg-accent-400 text-ink-900 text-caption font-bold uppercase tracking-wider whitespace-nowrap">
                      Recommandé
                    </span>
                  )}
                  <div className="flex flex-col gap-tight">
                    <span className={`font-body text-caption font-bold uppercase tracking-wider ${t.highlight ? 'text-accent-300' : 'text-white/50'}`}>{t.label}</span>
                    <p className="font-display font-extrabold text-white m-0 leading-none" style={{ fontSize: '2.5rem' }}>{t.price}</p>
                  </div>
                  <p className={`font-body text-body leading-relaxed m-0 flex-1 ${t.highlight ? 'text-white/90' : 'text-white/65'}`}>{t.desc}</p>
                  <Link to="/marketing/formation">
                    <Button
                      variant={t.highlight ? 'warm' : 'ghost'}
                      size="md"
                      fullWidth
                      trailingIcon={<ArrowRight size={16} />}
                      className={t.highlight ? '' : '!text-white !border-white/30 hover:!bg-white/10'}
                    >
                      {t.cta}
                    </Button>
                  </Link>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ─────────────────────────────────────────────────────── */}
      <section className="py-page bg-ink-900/50 backdrop-blur-sm border-t border-white/10">
        <FadeIn className="max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <h2
            className="font-display font-extrabold text-white leading-[1.05] tracking-tight m-0"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
          >
            Une invitation.
          </h2>
          <p className="font-body text-body-lg text-white/70 leading-relaxed m-0 max-w-prose">
            Ce n'est pas un produit qu'on vend. C'est une posture qu'on partage.
            Si vous sentez que la formation peut être autre chose, on est faits pour se rencontrer.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-stack-xs pt-stack">
            <Link to="/marketing/contact">
              <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                Échanger 30 minutes
              </Button>
            </Link>
            <Link to="/marketing/magazine">
              <Button variant="ghost" size="lg" className="!text-white hover:!bg-white/10 !border !border-white/30">
                Lire le magazine d'abord
              </Button>
            </Link>
          </div>
        </FadeIn>
      </section>

      <div className="h-20" />
      </div>{/* end z-[2] content wrapper */}
    </div>
  );

export default MarketingHomeD;
