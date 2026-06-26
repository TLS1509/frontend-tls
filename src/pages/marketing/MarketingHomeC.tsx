/**
 * Variant C: "Pedagogical Warm"
 * Inspirations : Brilliant, Maven, MasterClass, Duolingo marketing.
 * Mood : Chaleureux humain, magazine-style éditorial, learner journeys prominents.
 * Identity TLS : warm secondary-500 dominant + brand teal accent, accent-400 yellow = insights.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Quote,
  BookOpen,
  Lightbulb,
  Award,
  Heart,
  Compass,
} from 'lucide-react';
import { Button } from '../../components/core/Button';

const JOURNEY = [
  {
    chapter: 'Chapitre 1',
    title: 'Vous arrivez avec vos intuitions',
    body: "Pas besoin d'être expert IA. Juste curieux, motivé, prêt à expérimenter. Nous vous rencontrons là où vous en êtes.",
    icon: <Compass size={28} />,
    img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80&auto=format&fit=crop',
  },
  {
    chapter: 'Chapitre 2',
    title: 'Vous découvrez une autre manière',
    body: 'Le Formateur Augmenté ne remplace rien. Il ajoute une dimension : la personnalisation à grande échelle.',
    icon: <Lightbulb size={28} />,
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&auto=format&fit=crop',
  },
  {
    chapter: 'Chapitre 3',
    title: 'Vous construisez vos parcours',
    body: 'Vous apprenez à concevoir des expériences qui transforment vraiment. Avec des outils, oui, mais surtout avec un cadre.',
    icon: <BookOpen size={28} />,
    img: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80&auto=format&fit=crop',
  },
  {
    chapter: 'Chapitre 4',
    title: 'Vous rejoignez une communauté',
    body: '200+ formateurs certifiés qui partagent, expérimentent, et font évoluer la pédagogie augmentée ensemble.',
    icon: <Heart size={28} />,
    img: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=80&auto=format&fit=crop',
  },
];


/** SVG decorative: line annotation style "marker" */
const SquigglyUnderline: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 200 12" fill="none" className={className} aria-hidden>
    <path d="M2 8 Q 25 1, 50 6 T 100 6 T 150 6 T 198 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const HandArrow: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 80 60" fill="none" className={className} aria-hidden>
    <path d="M5 15 Q 30 5, 50 25 T 75 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M65 45 L 75 50 L 70 42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
);

export const MarketingHomeC: React.FC = () => (
  <div className="bg-gradient-to-b from-secondary-50/30 via-white to-accent-50/20">

    {/* ── Hero: magazine éditorial asymétrique ───────────────────────────── */}
    <section className="relative pt-28 pb-page overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 -right-20 w-[500px] h-[500px] rounded-full bg-secondary-200/40 blur-[100px]" />
        <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-accent-200/30 blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-page items-center">
        <div className="flex flex-col gap-stack-lg">
          <span className="inline-flex items-center gap-stack-xs px-3 py-1 rounded-pill bg-accent-50 border border-accent-200 w-fit">
            <Sparkles size={14} className="text-accent-500" />
            <span className="font-body text-caption font-semibold text-warning-fg tracking-wider uppercase">
              Une école pour les formateurs augmentés
            </span>
          </span>

          <h1 className="font-display font-extrabold text-ink-900 leading-[1.02] tracking-tight m-0 text-[clamp(2.75rem,6.5vw,5rem)]">
            La formation,<br />
            <span className="relative inline-block">
              c'est humain.
              <SquigglyUnderline className="absolute -bottom-3 left-0 w-full text-accent-400" />
            </span><br />
            <span className="text-secondary-600">L'IA, c'est notre allié.</span>
          </h1>

          <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0 max-w-xl">
            Nous formons des architectes de l'apprentissage. Des pédagogues qui maîtrisent l'IA
            sans s'y soumettre. Des artisans qui combinent technologie et présence.
          </p>

          <div className="flex flex-wrap items-center gap-stack-xs pt-stack">
            <Link to="/marketing/formation">
              <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                Devenir Formateur Augmenté
              </Button>
            </Link>
            <Link to="/marketing/accompagnement">
              <Button variant="ghost" size="lg">
                Accompagnement sur mesure
              </Button>
            </Link>
          </div>
        </div>

        {/* Portrait card: single learner */}
        <div className="relative">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80&auto=format&fit=crop"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          {/* Floating quote card */}
          <div className="absolute -bottom-6 -left-6 max-w-xs bg-white rounded-2xl shadow-xl border border-ink-100 p-stack-lg flex flex-col gap-stack-xs">
            <Quote size={20} className="text-secondary-500" />
            <p className="font-display font-medium text-body text-ink-900 leading-snug m-0">
              "Je ne forme plus, je crée des expériences."
            </p>
            <p className="font-body text-caption text-ink-500 m-0">Sophie, promotion 2026</p>
          </div>
          {/* Accent badge top-right */}
          <div className="absolute -top-4 -right-4 bg-accent-400 text-ink-900 px-3 py-1.5 rounded-pill font-display font-bold text-caption uppercase tracking-wider shadow-md">
            Promo Septembre ouverte
          </div>
        </div>
      </div>
    </section>

    {/* ── Conviction band: manifesto ───────────────────────────────────────── */}
    <section className="bg-secondary-500 py-section-lg relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-accent-400 blur-[80px]" />
      </div>
      <div className="relative max-w-4xl mx-auto px-6 text-center flex flex-col gap-stack-lg">
        <p className="font-body text-caption font-bold text-accent-400 uppercase tracking-widest">
          Notre conviction
        </p>
        <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-extrabold text-white leading-[1.15] tracking-tight m-0">
          On n'apprend pas avec des outils.<br />
          <span className="text-accent-400">On apprend avec des humains</span>: accompagnés par des outils.
        </h2>
      </div>
    </section>

    {/* ── Journey: storyboard 4 chapitres ──────────────────────────────────── */}
    <section className="py-page bg-white">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-page">
        <div className="flex flex-col gap-stack items-center text-center max-w-2xl mx-auto">
          <span className="font-body text-caption font-bold text-secondary-600 uppercase tracking-widest">
            Le parcours
          </span>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
            Ton chemin en 4 chapitres.
          </h2>
        </div>

        <div className="flex flex-col gap-section-lg">
          {JOURNEY.map(({ chapter, title, body, icon, img }, i) => (
            <article
              key={chapter}
              className={`grid grid-cols-1 md:grid-cols-2 gap-page items-center ${i % 2 === 1 ? 'md:grid-flow-dense' : ''}`}
            >
              <div className={`flex flex-col gap-stack ${i % 2 === 1 ? 'md:col-start-2' : ''}`}>
                <span className="inline-flex items-center gap-stack-xs font-body text-caption font-bold text-secondary-600 uppercase tracking-widest">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-pill bg-secondary-100 text-secondary-700">
                    {icon}
                  </span>
                  {chapter}
                </span>
                <h3 className="font-display text-h2 font-extrabold text-ink-900 leading-tight m-0">
                  {title}
                </h3>
                <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0 max-w-md">
                  {body}
                </p>
                {i === 0 && (
                  <HandArrow className="text-accent-500 w-20 h-15 -mt-2 opacity-70" />
                )}
              </div>
              <div className={`aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-ink-100 ${i % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* ── Ancrage C-Campus ─────────────────────────────────────────────────── */}
    <section className="py-page bg-secondary-50/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-2xl bg-white border border-secondary-100 p-stack-lg flex flex-col md:flex-row items-center gap-section-lg">
          <div className="flex flex-col gap-stack flex-1">
            <span className="font-body text-caption font-bold text-secondary-600 uppercase tracking-widest">Notre ancrage</span>
            <p className="font-display text-h3 font-extrabold text-ink-900 leading-tight m-0">
              Déployé avec C-Campus, dès 2023.
            </p>
            <p className="font-body text-body text-ink-600 leading-relaxed m-0 max-w-prose">
              Les parcours TLS ont été déployés en partenariat avec C-Campus. En 2023, 578 apprenants formés avec un taux de satisfaction de +93 %.
            </p>
          </div>
          <div className="flex flex-col gap-stack-xs items-center md:items-end shrink-0">
            <span className="inline-flex items-center gap-tight px-3 py-1.5 rounded-pill bg-secondary-50 border border-secondary-200 text-secondary-700 font-body text-caption font-semibold">
              578 formés · +93 % satisfaction (C-Campus 2023)
            </span>
          </div>
        </div>
      </div>
    </section>

    {/* ── Pricing / certification offer ─────────────────────────────────────── */}
    <section className="py-page bg-white relative overflow-hidden">
      <div aria-hidden className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent-100/40 blur-[100px]" />
      <div className="relative max-w-5xl mx-auto px-6 flex flex-col gap-section">
        <div className="flex flex-col gap-stack items-center text-center max-w-2xl mx-auto">
          <Award size={32} className="text-warning-fg" />
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
            Une certification reconnue.
          </h2>
          <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0">
            Open Badge 2.0, en partenariat avec C-Campus. 7 modules, 8 semaines, coaching inclus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-stack">
          {[
            { label: 'Découverte', price: 'Gratuit', desc: 'Accès au premier module + communauté.', cta: 'Commencer', variant: 'ghost' as const },
            { label: 'Certifiant', price: '249€', desc: 'Formation complète + Open Badge + coaching 1-1.', cta: 'M\'inscrire', variant: 'warm' as const, highlight: true },
            { label: 'Sur mesure', price: 'Devis', desc: 'Programme adapté à votre organisation.', cta: 'Contacter', variant: 'ghost' as const },
          ].map((t) => (
            <article
              key={t.label}
              className={`rounded-2xl p-stack-lg flex flex-col gap-stack-lg ${
                t.highlight
                  ? 'bg-gradient-to-br from-secondary-500 to-secondary-600 text-white shadow-xl scale-105 relative'
                  : 'bg-white border border-ink-200'
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-tight px-3 py-1 rounded-pill bg-accent-400 text-ink-900 text-caption font-bold uppercase tracking-wider">
                  Recommandé
                </span>
              )}
              <div className="flex flex-col gap-tight">
                <span className={`font-body text-caption font-bold uppercase tracking-wider ${t.highlight ? 'text-accent-300' : 'text-secondary-600'}`}>
                  {t.label}
                </span>
                <p className={`font-display text-h1 font-extrabold m-0 leading-none ${t.highlight ? 'text-white' : 'text-ink-900'}`}>
                  {t.price}
                </p>
              </div>
              <p className={`font-body text-body leading-relaxed m-0 flex-1 ${t.highlight ? 'text-white/90' : 'text-ink-600'}`}>
                {t.desc}
              </p>
              <Link to="/marketing/formation">
                <Button variant={t.variant} size="md" fullWidth trailingIcon={<ArrowRight size={16} />}>
                  {t.cta}
                </Button>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* ── Final invitation: warm letter style ──────────────────────────────── */}
    <section className="py-page bg-gradient-to-br from-secondary-100/40 via-accent-50/30 to-white">
      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
          Une invitation.
        </h2>
        <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0 max-w-prose">
          Ce n'est pas un produit qu'on vend. C'est une posture qu'on partage.
          Si tu sens que la formation peut être autre chose qu'un déversement de contenu,
          on est faits pour se rencontrer.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-stack-xs pt-stack">
          <Link to="/marketing/contact">
            <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
              Échanger 30 minutes
            </Button>
          </Link>
          <Link to="/marketing/magazine">
            <Button variant="ghost" size="lg">
              Lire le magazine d'abord
            </Button>
          </Link>
        </div>
        <p className="font-body text-caption text-ink-500 m-0 mt-stack italic">
         : L'équipe TLS, depuis Paris ✨
        </p>
      </div>
    </section>

  </div>
);

export default MarketingHomeC;
