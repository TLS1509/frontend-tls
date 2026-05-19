import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Search,
  PenLine,
  Cog,
  Users,
  BarChart3,
  Shield,
  ChevronRight,
  Briefcase,
  Star,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import { AmbientBlobs } from '../../components/patterns/AmbientBlobs';
import { EditorialHero } from '../../components/patterns/EditorialHero';
import { SectionCard } from '../../components/patterns/SectionCard';
import { CardGrid } from '../../components/patterns/CardGrid';
import { SectionHeader } from '../../components/patterns/SectionHeader';
import { IconFeatureCard } from '../../components/ui/IconFeatureCard';
import { MetaPill } from '../../components/ui/MetaPill';
import { FormGroup } from '../../components/core/FormGroup';
import { Input } from '../../components/core/Input';

const SERVICES = [
  {
    icon: <Search size={28} />,
    title: 'Diagnostic & Stratégie',
    description: 'Audit de votre dispositif existant, identification des cas d\'usage IA prioritaires, feuille de route alignée sur vos résultats métier.',
    tone: 'brand' as const,
    pill: 'Stratégie',
  },
  {
    icon: <PenLine size={28} />,
    title: 'Conception Pédagogique',
    description: 'Conception de parcours blended/digital, création de prompts et contenus multimédias, ingénierie pédagogique augmentée.',
    tone: 'warm' as const,
    pill: 'Création',
  },
  {
    icon: <Cog size={28} />,
    title: 'Industrialisation & Outils',
    description: 'Déploiement d\'automatisations, mise en place de chartes qualité et de guidelines pour vos équipes.',
    tone: 'sun' as const,
    pill: 'Production',
  },
  {
    icon: <Users size={28} />,
    title: 'Animation & Coaching',
    description: 'Coaching d\'équipe pour l\'adoption de l\'IA, facilitation d\'ateliers et de communautés de pratique.',
    tone: 'brand' as const,
    pill: 'Accompagnement',
  },
  {
    icon: <BarChart3 size={28} />,
    title: 'Mesure d\'Impact',
    description: 'Mise en place de KPIs, tableaux de bord, A/B testing pédagogique et reporting d\'impact pour vos décideurs.',
    tone: 'warm' as const,
    pill: 'Analytics',
  },
  {
    icon: <Shield size={28} />,
    title: 'Conformité & Éthique',
    description: 'Encadrement RGPD, protection de la propriété intellectuelle, gouvernance de l\'IA responsable.',
    tone: 'sun' as const,
    pill: 'Gouvernance',
  },
];

const PROCESS = [
  {
    num: '01',
    title: 'Diagnostic',
    description: 'Rencontre d\'exploration (90 min), audit de votre dispositif existant, identification des cas d\'usage prioritaires. Livrable : rapport de diagnostic + recommandations stratégiques.',
    tone: 'text-primary-600',
    bg: 'bg-primary-50',
    border: 'border-primary-200',
  },
  {
    num: '02',
    title: 'Co-construction',
    description: 'Ateliers de co-conception, prototypage de solutions, formation des équipes impliquées. Livrable : parcours ou dispositif conçu et testé.',
    tone: 'text-secondary-600',
    bg: 'bg-secondary-50',
    border: 'border-secondary-200',
  },
  {
    num: '03',
    title: 'Déploiement',
    description: 'Mise en production, formation des utilisateurs finaux, suivi des indicateurs d\'impact. Livrable : solution déployée + tableau de bord de suivi.',
    tone: 'text-accent-600',
    bg: 'bg-accent-50',
    border: 'border-accent-200',
  },
];

const TESTIMONIALS = [
  {
    quote: 'L\'équipe TLS nous a permis de déployer notre première formation IA en 6 semaines. La rigueur pédagogique et la maîtrise des outils sont impressionnantes.',
    author: 'Directrice Formation, groupe industriel 500 pers.',
    stars: 5,
  },
  {
    quote: 'Le diagnostic initial a été une révélation : nous avions des doublons et des outils sous-utilisés. La feuille de route qu\'ils ont livrée a changé notre vision.',
    author: 'Responsable L&D, scale-up tech',
    stars: 5,
  },
];

export const MarketingAccompagnement: React.FC = () => (
  <div className="flex flex-col">

    {/* ── Hero ── */}
    <section className="relative overflow-hidden">
      <AmbientBlobs intensity="normal" position="absolute" />
      <div className="relative z-base">
        <EditorialHero
          tone="brand"
          eyebrow={{ icon: <Briefcase size={14} />, label: 'Consulting & Accompagnement' }}
          title="Co-construisons votre stratégie IA"
          summary="Des experts en pédagogie et en IA pour auditer votre dispositif, concevoir vos solutions et mesurer votre impact — de la stratégie au déploiement."
          trailing={
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="#contact-form">
                <Button variant="glass" size="lg" trailingIcon={<ArrowRight size={16} />}>
                  Demander un diagnostic
                </Button>
              </Link>
            </div>
          }
        />
      </div>
    </section>

    {/* ── Services ── */}
    <section className="py-section-lg bg-gradient-page-ambient">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-section">
        <SectionHeader
          variant="solid"
          tone="primary"
          size="lg"
          icon={<Briefcase size={24} />}
          title="6 domaines d'expertise"
          subtitle="Une offre modulaire et complémentaire pour répondre à tous vos besoins"
        />
        <CardGrid layout="default" gapSize="md">
          {SERVICES.map(({ icon, title, description, tone, pill }) => (
            <div key={title} className="bg-white border border-ink-200 rounded-2xl p-5 flex flex-col gap-3 hover:shadow-md hover:-translate-y-1 transition-all duration-base">
              <div className="flex items-start justify-between gap-2">
                <div className={[
                  'p-2.5 rounded-xl',
                  tone === 'brand' ? 'bg-primary-50 text-primary-500' :
                  tone === 'warm' ? 'bg-secondary-50 text-secondary-500' :
                  'bg-accent-50 text-accent-500',
                ].join(' ')}>
                  {icon}
                </div>
                <MetaPill text={pill} tone={tone === 'brand' ? 'primary' : tone === 'warm' ? 'warm' : 'sun'} size="sm" />
              </div>
              <h3 className="font-display text-h4 font-bold text-ink-900 m-0 leading-tight">{title}</h3>
              <p className="text-body-sm text-ink-600 leading-relaxed m-0">{description}</p>
            </div>
          ))}
        </CardGrid>
      </div>
    </section>

    {/* ── Processus ── */}
    <section className="py-section-lg bg-white">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-section">
        <SectionHeader
          variant="minimal"
          tone="primary"
          size="lg"
          icon={<ChevronRight size={24} />}
          title="Notre processus en 3 phases"
          subtitle="Une approche structurée pour garantir des résultats mesurables"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-lg relative">
          {/* Connector line desktop */}
          <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-primary-200 via-secondary-200 to-accent-200" aria-hidden />
          {PROCESS.map(({ num, title, description, tone, bg, border }) => (
            <div key={num} className={`relative flex flex-col gap-stack p-6 rounded-2xl border ${border} ${bg}`}>
              <span className={`font-display text-h1 font-black ${tone} leading-none`}>{num}</span>
              <h3 className="font-display text-h4 font-bold text-ink-900 m-0">{title}</h3>
              <p className="text-body-sm text-ink-600 leading-relaxed m-0">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Témoignages ── */}
    <section className="py-section-lg bg-gradient-page-ambient">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-section">
        <SectionHeader
          variant="accent"
          tone="warm"
          size="lg"
          icon={<Star size={24} />}
          title="Ce qu'en disent nos clients"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
          {TESTIMONIALS.map(({ quote, author, stars }) => (
            <SectionCard key={author}>
              <div className="flex flex-col gap-stack">
                <div className="flex gap-1">
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star key={i} size={16} className="fill-accent-400 text-accent-400" />
                  ))}
                </div>
                <blockquote className="text-body text-ink-800 leading-relaxed m-0 italic">
                  « {quote} »
                </blockquote>
                <p className="text-caption text-ink-500 m-0 font-semibold">{author}</p>
              </div>
            </SectionCard>
          ))}
        </div>
      </div>
    </section>

    {/* ── Formulaire contact ── */}
    <section id="contact-form" className="py-section-lg bg-white">
      <div className="max-w-3xl mx-auto px-6 flex flex-col gap-section">
        <SectionHeader
          variant="solid"
          tone="primary"
          size="lg"
          icon={<Briefcase size={24} />}
          title="Parlons de votre projet"
          subtitle="Décrivez votre contexte, nous vous répondons sous 48h"
        />
        <SectionCard>
          <form className="flex flex-col gap-stack" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
              <FormGroup label="Prénom et nom" id="name" required>
                <Input id="name" placeholder="Marie Dupont" />
              </FormGroup>
              <FormGroup label="Email professionnel" id="email" required>
                <Input id="email" type="email" placeholder="marie@organisation.fr" />
              </FormGroup>
            </div>
            <FormGroup label="Organisation" id="org">
              <Input id="org" placeholder="Nom de votre entreprise ou organisation" />
            </FormGroup>
            <FormGroup label="Votre besoin" id="need">
              <Input id="need" placeholder="Décrivez brièvement votre contexte et vos objectifs..." />
            </FormGroup>
            <div className="flex justify-end pt-2">
              <Button type="submit" variant="primary" size="lg" trailingIcon={<ArrowRight size={16} />}>
                Envoyer ma demande
              </Button>
            </div>
          </form>
        </SectionCard>
      </div>
    </section>

  </div>
);

export default MarketingAccompagnement;
