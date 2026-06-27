/**
 * Homepage principale — fond aquarelle fixe, sections glass
 * Contenu canonique TLS (FACTS-CANON.md + COPY-V2.md)
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Layers, Sparkles, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../../components/core/Button';
import { VariantSwitcher } from './components/VariantSwitcher';

const FadeIn: React.FC<{ delay?: number; children: React.ReactNode; className?: string }> = ({
  delay = 0,
  children,
  className = '',
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const OFFRES = [
  {
    icon: <BookOpen size={22} />,
    tag: 'Apprendre',
    title: "Le Formateur Augmenté par l'IA",
    detail: '7 modules · 7h à distance · Open Badge · Éligible OPCO',
    prix: 'À partir de 249 € HT',
    cta: 'Voir le programme',
    href: '/marketing/formation',
  },
  {
    icon: <Layers size={22} />,
    tag: 'Concevoir',
    title: 'Conseil & Studio STRIDE',
    detail: 'Audit · Conception · Déploiement · Méthode propriétaire',
    prix: 'Sur devis',
    cta: 'Présenter votre projet',
    href: '/marketing/accompagnement',
  },
  {
    icon: <Sparkles size={22} />,
    tag: 'Déployer',
    title: 'Learning App',
    detail: 'Parcours adaptatifs · Passeport compétences · Coaching · Bêta',
    prix: 'Accès anticipé gratuit',
    cta: 'Rejoindre la bêta',
    href: '/marketing/learning-app',
  },
];

export const MarketingHomeFullPage: React.FC = () => (
  <div className="relative min-h-screen">

    {/* ── Image watercolour fixée en fond de toute la page ─────── */}
    <div className="fixed inset-0 z-[1] pointer-events-none" aria-hidden>
      <img
        src="/images/bg-frames/aquarelle-orange-teal-1s.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-ink-900/62" />
    </div>

    {/* ── Content (above background) ──────────────────────────── */}
    <div className="relative z-[2]">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-page relative">
        <FadeIn className="flex flex-col items-center text-center gap-stack-lg max-w-3xl mx-auto">
          <h1
            className="font-display font-extrabold text-white leading-[1.0] tracking-display m-0"
            style={{ fontSize: 'clamp(2.75rem, 7vw, 5.5rem)' }}
          >
            Maîtrisez l'IA<br />
            <span className="text-accent-400">dans vos formations.</span>
          </h1>
          <p className="font-body text-body-lg text-white/75 leading-relaxed m-0 max-w-2xl">
            Formation certifiante, conseil sur mesure et plateforme adaptative
            pour les professionnels de la formation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-stack-xs pt-stack">
            <Link to="/marketing/formation">
              <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                Découvrir le parcours
              </Button>
            </Link>
            <Link to="/marketing/contact">
              <Button
                variant="ghost"
                size="lg"
                className="!text-white hover:!bg-white/10 !border !border-white/30"
              >
                Prendre rendez-vous
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

      {/* ── 3 Offres ─────────────────────────────────────────── */}
      <section className="py-page bg-ink-900/35 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-section">
          <FadeIn>
            <h2
              className="font-display font-extrabold text-white leading-tight tracking-tight m-0 text-center"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)' }}
            >
              Trois façons de travailler avec vous.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack">
            {OFFRES.map((o, i) => (
              <FadeIn key={o.tag} delay={i * 0.08}>
                <article className="rounded-2xl bg-white/8 backdrop-blur-md border border-white/15 p-stack-lg flex flex-col gap-stack h-full hover:bg-white/12 transition-colors duration-200">
                  <div className="flex flex-col gap-stack-xs">
                    <div className="flex items-center gap-2 text-accent-400">
                      {o.icon}
                      <span className="font-body text-caption font-bold uppercase tracking-wider">{o.tag}</span>
                    </div>
                    <h3
                      className="font-display font-extrabold text-white leading-tight m-0"
                      style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)' }}
                    >
                      {o.title}
                    </h3>
                  </div>
                  <p className="font-body text-body-sm text-white/60 leading-relaxed m-0 flex-1">{o.detail}</p>
                  <div className="flex flex-col gap-stack-xs">
                    <span className="font-body text-body-sm font-semibold text-white/80">{o.prix}</span>
                    <Link to={o.href}>
                      <Button
                        variant="ghost"
                        size="sm"
                        fullWidth
                        trailingIcon={<ArrowRight size={14} />}
                        className="!text-white !border-white/25 hover:!bg-white/10"
                      >
                        {o.cta}
                      </Button>
                    </Link>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Doctrine ─────────────────────────────────────────── */}
      <section className="py-page">
        <FadeIn className="max-w-4xl mx-auto px-6 flex flex-col gap-section-lg items-center text-center">
          <div className="flex flex-col gap-stack-lg">
            <h2
              className="font-display font-extrabold text-white leading-[1.1] tracking-tight m-0"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              On ne forme pas à l'IA.<br />
              <span className="text-accent-400">On vous aide à l'intégrer dans votre métier.</span>
            </h2>
            <p className="font-body text-body-lg text-white/70 leading-relaxed m-0 max-w-2xl mx-auto">
              Les outils changent chaque mois. Les principes pédagogiques, eux, restent.
              On vous apprend à choisir et à cadrer ces outils, pas à suivre les tendances.
              Notre approche part du modèle Dreyfus : novice à expert, par la pratique,
              pas par la consommation passive de contenu.
            </p>
          </div>
          <Link to="/marketing/accompagnement">
            <Button
              variant="ghost"
              size="md"
              trailingIcon={<ArrowRight size={16} />}
              className="!text-white !border-white/25 hover:!bg-white/10"
            >
              La méthode STRIDE
            </Button>
          </Link>
        </FadeIn>
      </section>

      {/* ── Ancrage C-Campus ─────────────────────────────────── */}
      <section className="py-page bg-white/5 backdrop-blur-sm border-t border-white/10">
        <FadeIn className="max-w-4xl mx-auto px-6">
          <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-stack-lg flex flex-col md:flex-row items-center gap-section">

            <div className="flex flex-col gap-stack flex-1">
              <span className="font-body text-caption font-semibold text-white/45 uppercase tracking-widest">Partenariat C-Campus</span>
              <p
                className="font-display font-extrabold text-white leading-tight m-0"
                style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)' }}
              >
                Déployé avec C-Campus<br />depuis 2023.
              </p>
              <p className="font-body text-body text-white/60 leading-relaxed m-0 max-w-prose">
                The Learning Society est société partenaire de C-Campus.
                Le programme est accessible via votre OPCO.
              </p>
            </div>

            <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
              {[
                { value: '578', label: 'professionnels formés en 2023*' },
                { value: '+93 %', label: 'de satisfaction*' },
              ].map((s) => (
                <div
                  key={s.value}
                  className="rounded-xl bg-white/10 border border-white/20 px-5 py-3 flex flex-col gap-tight"
                >
                  <span className="font-display font-extrabold text-white leading-none" style={{ fontSize: '2rem' }}>{s.value}</span>
                  <span className="font-body text-body-sm text-white/55 leading-snug">{s.label}</span>
                </div>
              ))}
              <p className="font-body text-micro text-white/35 m-0 mt-1">* Stats C-Campus · formations de formateurs 2023</p>
            </div>

          </div>
        </FadeIn>
      </section>

      {/* ── Citation fondateur ───────────────────────────────── */}
      <section className="py-page">
        <FadeIn className="max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <Quote size={32} className="text-accent-400/60" />
          <blockquote className="m-0">
            <p
              className="font-display font-extrabold text-white leading-[1.2] tracking-tight m-0"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
            >
              L'IA n'est pas là pour remplacer les formateurs.
              Elle est là pour démultiplier ce qu'ils font de mieux.
            </p>
            <footer className="font-body text-body-sm text-white/45 mt-stack">
              Pierre-Armand Dennery, co-fondateur · The Learning Society
            </footer>
          </blockquote>
        </FadeIn>
      </section>

      {/* ── CTA final ─────────────────────────────────────────── */}
      <section className="py-page bg-ink-900/45 backdrop-blur-sm border-t border-white/10">
        <FadeIn className="max-w-2xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <h2
            className="font-display font-extrabold text-white leading-[1.05] tracking-tight m-0"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}
          >
            On parle de votre projet ?
          </h2>
          <p className="font-body text-body-lg text-white/65 leading-relaxed m-0">
            30 minutes pour comprendre vos enjeux, sans engagement.
          </p>
          <Link to="/marketing/contact">
            <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
              Réserver 30 minutes
            </Button>
          </Link>
        </FadeIn>
      </section>

      <div className="h-20" />
    </div>{/* end z-[2] content wrapper */}
    <VariantSwitcher />
  </div>
);

export default MarketingHomeFullPage;
