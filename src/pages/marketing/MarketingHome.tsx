import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Users,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Brain,
  Target,
  Award,
  Zap,
  TrendingUp,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import { AmbientBlobs } from '../../components/patterns/AmbientBlobs';
import { EditorialHero } from '../../components/patterns/EditorialHero';
import { SectionCard } from '../../components/patterns/SectionCard';
import { CardGrid } from '../../components/patterns/CardGrid';
import { SectionHeader } from '../../components/patterns/SectionHeader';
import { IconFeatureCard } from '../../components/ui/IconFeatureCard';
import { StatCard } from '../../components/ui/StatCard';
import { MetaPill } from '../../components/ui/MetaPill';
import { TrendingBadge } from '../../components/ui/Badge';

const STATS = [
  { label: 'Formateurs certifiés', value: '200+', sub: 'formateurs', tone: 'brand' as const },
  { label: 'Organisations accompagnées', value: '40+', sub: 'clients', tone: 'warm' as const },
  { label: 'Modules disponibles', value: '120+', sub: 'modules', tone: 'brand' as const },
  { label: 'Taux de satisfaction', value: '97%', sub: 'apprenants', tone: 'sun' as const },
];

const PILLARS = [
  {
    icon: <Sparkles size={32} />,
    title: 'Parcours Personnalisés',
    description: 'Exploitez la puissance de l\'IA pour concevoir des formations adaptées à chaque apprenant.',
    tone: 'brand' as const,
  },
  {
    icon: <Users size={32} />,
    title: 'Soutien d\'Experts',
    description: 'Bénéficiez de l\'accompagnement de nos formateurs et consultants certifiés.',
    tone: 'warm' as const,
  },
  {
    icon: <Lightbulb size={32} />,
    title: 'Savoir-faire & Innovation',
    description: 'Accédez à une expertise de pointe en pédagogie augmentée par l\'IA.',
    tone: 'sun' as const,
  },
];

const ARTICLES = [
  {
    title: 'Le Référentiel des 5 Piliers',
    category: 'Pédagogie',
    date: 'Mai 2026',
    summary: 'Comment structurer une approche pédagogique cohérente face à l\'essor des outils d\'IA.',
  },
  {
    title: 'L\'IA et le syndrome de la réponse facile',
    category: 'IA',
    date: 'Avril 2026',
    summary: 'Comprendre pourquoi la facilité apparente des outils IA peut nuire à l\'apprentissage profond.',
  },
  {
    title: 'Le « Digital Twin » de l\'apprenant',
    category: 'Innovation',
    date: 'Avril 2026',
    summary: 'Vers une modélisation fine du profil apprenant pour des formations vraiment adaptatives.',
  },
];

const APP_FEATURES = [
  'Parcours adaptatifs pilotés par l\'IA',
  'Journal de bord réflexif intégré',
  'Coaching 1-1 avec vos experts',
  'Gamification & badges de compétences',
];

export const MarketingHome: React.FC = () => (
  <div className="flex flex-col">

    {/* ── Hero ── */}
    <section className="relative overflow-hidden">
      <AmbientBlobs intensity="vivid" position="absolute" />
      <div className="relative z-base">
        <EditorialHero
          tone="brand"
          eyebrow={{ icon: <Sparkles size={14} />, label: 'La formation augmentée par l\'IA' }}
          title={
            <span>
              Transformez vos<br />
              <span className="opacity-90">pratiques pédagogiques</span>
            </span>
          }
          summary="Combinez intelligence artificielle et expertise humaine pour concevoir des formations impactantes, personnalisées et mesurables."
          trailing={
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/marketing/formation">
                <Button variant="glass" size="lg">
                  Voir la formation
                  <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/marketing/learning-app">
                <Button variant="glass" size="lg">
                  <span>Découvrir la Learning App</span>
                  <TrendingBadge type="new" size="sm" />
                </Button>
              </Link>
            </div>
          }
        />
      </div>
    </section>

    {/* ── Stats band ── */}
    <section className="bg-white border-b border-ink-100 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-stack-lg">
          {STATS.map(({ label, value, sub, tone }) => (
            <StatCard
              key={label}
              label={label}
              value={value}
              sub={sub}
              tone={tone}
              surface="tinted"
              size="md"
            />
          ))}
        </div>
      </div>
    </section>

    {/* ── 3 piliers ── */}
    <section className="py-section-lg bg-gradient-page-ambient">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-section">
        <SectionHeader
          variant="solid"
          tone="primary"
          size="lg"
          icon={<Users size={24} />}
          title="Un accompagnement qui combine l'IA et l'humain"
          subtitle="Trois dimensions complémentaires pour transformer durablement vos pratiques"
        />
        <CardGrid layout="default" gapSize="md">
          {PILLARS.map(({ icon, title, description, tone }) => (
            <IconFeatureCard
              key={title}
              icon={icon}
              title={title}
              description={description}
              tone={tone}
              iconStyle="bubble"
              iconSize="lg"
              surface="tinted"
            />
          ))}
        </CardGrid>
      </div>
    </section>

    {/* ── Nos deux offres ── */}
    <section className="py-section-lg bg-white">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-section">
        <SectionHeader
          variant="minimal"
          tone="warm"
          size="lg"
          icon={<Target size={24} />}
          title="Nos solutions"
          subtitle="Deux approches pour répondre à vos besoins"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
          {/* Formation */}
          <SectionCard
            tone="warm"
            titleIcon={<BookOpen size={20} />}
            title="Formation Formateur Augmenté"
            description="Maîtrisez l'intégration de l'IA dans vos pratiques pédagogiques avec notre certification reconnue."
            actions={
              <Link to="/marketing/formation">
                <Button variant="warm" size="md" trailingIcon={<ArrowRight size={16} />}>
                  Voir le programme
                </Button>
              </Link>
            }
          >
            <div className="flex flex-col gap-stack">
              <div className="flex flex-wrap gap-2">
                <MetaPill text="Certification Open Badge" tone="warm" />
                <MetaPill text="7 modules" tone="primary" />
                <MetaPill text="En partenariat C-Campus" tone="default" />
              </div>
              <div className="flex flex-col gap-2">
                {['Prompt Engineering', 'Conception pédagogique IA', 'Éthique & responsabilité'].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-body-sm text-ink-700">
                    <CheckCircle2 size={16} className="text-secondary-500 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <p className="text-body-sm text-ink-500 m-0">
                À partir de <span className="font-bold text-ink-900 text-body">249€</span>
              </p>
            </div>
          </SectionCard>

          {/* Accompagnement */}
          <SectionCard
            tone="primary"
            titleIcon={<Brain size={20} />}
            title="Accompagnement Sur Mesure"
            description="Des experts pour co-construire votre stratégie IA et concevoir des solutions adaptées à votre organisation."
            actions={
              <Link to="/marketing/accompagnement">
                <Button variant="primary" size="md" trailingIcon={<ArrowRight size={16} />}>
                  Prendre contact
                </Button>
              </Link>
            }
          >
            <div className="flex flex-col gap-stack">
              <div className="flex flex-wrap gap-2">
                <MetaPill text="Consulting" tone="primary" />
                <MetaPill text="Sur mesure" tone="default" />
                <MetaPill text="Devis personnalisé" tone="default" />
              </div>
              <div className="flex flex-col gap-2">
                {['Diagnostic & stratégie IA', 'Conception de parcours', 'Déploiement & mesure d\'impact'].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-body-sm text-ink-700">
                    <CheckCircle2 size={16} className="text-primary-500 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <p className="text-body-sm text-ink-500 m-0">
                Devis <span className="font-bold text-ink-900 text-body">personnalisé</span> selon vos besoins
              </p>
            </div>
          </SectionCard>
        </div>
      </div>
    </section>

    {/* ── Learning App teaser ── */}
    <section className="relative overflow-hidden">
      <EditorialHero
        tone="warm"
        eyebrow={{ icon: <Zap size={14} />, label: 'Nouveau' }}
        title="La Learning App"
        summary="Votre plateforme d'apprentissage intégrée : parcours adaptatifs, coaching IA, journal réflexif et gamification dans un seul outil."
        trailing={
          <div className="flex flex-col gap-stack pt-2">
            <div className="flex flex-col gap-2">
              {APP_FEATURES.map((f) => (
                <div key={f} className="flex items-center gap-2 text-white/90 text-body-sm">
                  <CheckCircle2 size={16} className="text-white/80 shrink-0" />
                  {f}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/marketing/learning-app">
                <Button variant="glass" size="lg" trailingIcon={<ArrowRight size={16} />}>
                  Découvrir la Learning App
                </Button>
              </Link>
            </div>
          </div>
        }
      />
    </section>

    {/* ── Articles récents ── */}
    <section className="py-section-lg bg-white">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-section">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <SectionHeader
            variant="accent"
            tone="neutral"
            size="lg"
            icon={<TrendingUp size={24} />}
            title="Nos dernières réflexions"
            subtitle="Explorations à la croisée de l'IA, de la pédagogie et de l'innovation"
          />
          <Link to="/marketing/magazine" className="shrink-0">
            <Button variant="ghost" size="sm" trailingIcon={<ArrowRight size={14} />}>
              Voir tous les articles
            </Button>
          </Link>
        </div>

        <CardGrid layout="default" gapSize="md">
          {ARTICLES.map(({ title, category, date, summary }) => (
            <Link key={title} to="/marketing/magazine" className="group block">
              <div className="bg-white border border-ink-200 rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-base h-full flex flex-col">
                {/* Placeholder image area */}
                <div className="h-44 bg-gradient-to-br from-primary-50 via-primary-100 to-accent-50 flex items-center justify-center">
                  <BookOpen size={40} className="text-primary-300" />
                </div>
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-2">
                    <MetaPill text={category} tone="primary" size="sm" />
                    <span className="text-caption text-ink-400">{date}</span>
                  </div>
                  <h3 className="font-display text-h4 font-bold text-ink-900 leading-tight m-0 group-hover:text-primary-700 transition-colors">
                    {title}
                  </h3>
                  <p className="text-body-sm text-ink-500 leading-relaxed m-0 flex-1">{summary}</p>
                  <div className="flex items-center gap-1 text-primary-600 text-body-sm font-semibold pt-1">
                    Lire l'article <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </CardGrid>
      </div>
    </section>

    {/* ── CTA final ── */}
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 py-section-lg">
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary-500 blur-[100px] opacity-20" />
        <span className="absolute -bottom-32 -right-16 w-80 h-80 rounded-full bg-accent-400 blur-[100px] opacity-10" />
      </div>
      <div className="relative z-base max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
        <div className="flex items-center gap-2">
          <Award size={20} className="text-accent-400" />
          <span className="text-caption font-bold text-accent-400 uppercase tracking-widest">Passez à l'action</span>
        </div>
        <h2 className="font-display text-h1 font-bold text-white leading-tight m-0">
          Prêt à transformer<br />votre approche ?
        </h2>
        <p className="text-body-lg text-white/70 m-0 max-w-prose">
          Rejoignez les formateurs et organisations qui ont déjà adopté la pédagogie augmentée par l'IA.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link to="/marketing/formation">
            <Button variant="glass" size="lg" trailingIcon={<ArrowRight size={16} />}>
              Voir la formation
            </Button>
          </Link>
          <Link to="/marketing/contact">
            <Button variant="glass" size="lg">
              Nous contacter
            </Button>
          </Link>
        </div>
      </div>
    </section>

  </div>
);

export default MarketingHome;
