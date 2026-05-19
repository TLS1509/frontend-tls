import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Map,
  PenLine,
  MessageSquare,
  Trophy,
  Brain,
  BookOpen,
  Newspaper,
  CheckCircle2,
  Users,
  Layers,
  Zap,
  Mail,
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
import { FormGroup } from '../../components/core/FormGroup';
import { Input } from '../../components/core/Input';

const STATS = [
  { label: 'Modules disponibles', value: '120+', tone: 'brand' as const },
  { label: 'Formateurs actifs', value: '40+', tone: 'warm' as const },
  { label: 'Heures de contenu', value: '200h', tone: 'brand' as const },
  { label: 'Taux de complétion', value: '84%', tone: 'sun' as const },
];

const FEATURES_MAIN = [
  {
    icon: <Map size={32} />,
    title: 'Parcours Adaptatifs IA',
    description: 'Des parcours qui s\'ajustent en temps réel à votre niveau, vos objectifs et votre rythme d\'apprentissage.',
    pills: ['IA prédictive', 'Personnalisation', 'Multi-niveaux'],
    tone: 'brand' as const,
    features: ['Recommandations basées sur vos progrès', 'Contenu adapté à votre profil Dreyfus', 'Plans de développement sur mesure', 'Objectifs SMART intégrés'],
  },
  {
    icon: <PenLine size={32} />,
    title: 'Journal de Bord Réflexif',
    description: 'Un espace de réflexion structuré pour ancrer les apprentissages et développer votre pratique réflexive.',
    pills: ['Réflexion', 'Traces d\'apprentissage', 'Portfolio'],
    tone: 'warm' as const,
    features: ['Prompts de réflexion guidés', 'Historique de vos apprentissages', 'Export PDF de votre portfolio', 'Partage avec votre coach'],
  },
  {
    icon: <MessageSquare size={32} />,
    title: 'Coaching 1-1 Intégré',
    description: 'Accédez à vos coachs directement depuis la plateforme, avec le contexte de votre parcours.',
    pills: ['Coaching', 'Suivi personnalisé', 'Feedback expert'],
    tone: 'brand' as const,
    features: ['Messagerie directe avec votre coach', 'Sessions vidéo intégrées', 'Corrections de productions', 'Feedback sur vos exercices'],
  },
];

const FEATURE_TILES = [
  { icon: <Trophy size={28} />, title: 'Gamification', description: 'Badges, niveaux, classements pour rendre l\'apprentissage engageant.', tone: 'sun' as const },
  { icon: <Brain size={28} />, title: 'Flashcards IA', description: 'Révision en espace espacé avec des cartes générées par l\'IA.', tone: 'brand' as const },
  { icon: <Newspaper size={28} />, title: 'Veille intégrée', description: 'Curation de ressources et actualités dans votre domaine.', tone: 'warm' as const },
  { icon: <BookOpen size={28} />, title: 'Certifications', description: 'Open Badges et certifications reconnues à l\'issue de chaque parcours.', tone: 'sun' as const },
  { icon: <Layers size={28} />, title: 'Contenus variés', description: 'Vidéos, articles, podcasts, exercices pratiques dans un seul outil.', tone: 'brand' as const },
  { icon: <Users size={28} />, title: 'Communauté', description: 'Forums, groupes de pratique, co-apprentissage entre pairs.', tone: 'warm' as const },
  { icon: <Zap size={28} />, title: 'Chatbot IA', description: 'Assistant pédagogique disponible 24h/24 pour répondre à vos questions.', tone: 'sun' as const },
  { icon: <Sparkles size={28} />, title: 'Analytics apprenants', description: 'Visualisez vos progrès, identifiez vos forces et lacunes.', tone: 'brand' as const },
];

export const MarketingLearningApp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex flex-col">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <AmbientBlobs intensity="vivid" position="absolute" />
        <div className="relative z-base">
          <EditorialHero
            tone="brand"
            eyebrow={{ icon: <Sparkles size={14} />, label: 'Learning App — Accès anticipé' }}
            title={
              <span>
                Apprenez à votre rythme,<br />
                <span className="opacity-90">évoluez à votre niveau</span>
              </span>
            }
            summary="La plateforme d'apprentissage de The Learning Society : parcours adaptatifs IA, coaching intégré, journal réflexif et gamification dans un seul outil pensé pour les professionnels."
            trailing={
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link to="#early-access">
                  <Button variant="glass" size="lg" trailingIcon={<ArrowRight size={16} />}>
                    Demander un accès anticipé
                  </Button>
                </Link>
                <div className="flex items-center gap-2">
                  <TrendingBadge type="new" size="md" />
                  <span className="text-white/70 text-body-sm">En développement actif</span>
                </div>
              </div>
            }
          />
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-white border-b border-ink-100 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-stack-lg">
            {STATS.map(({ label, value, tone }) => (
              <StatCard
                key={label}
                label={label}
                value={value}
                tone={tone}
                surface="tinted"
                size="md"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Features principales (alternance) ── */}
      <section className="py-section-lg bg-gradient-page-ambient">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-page">
          <SectionHeader
            variant="solid"
            tone="primary"
            size="lg"
            icon={<Layers size={24} />}
            title="Tout ce dont vous avez besoin pour apprendre"
            subtitle="Une plateforme conçue pour les professionnels qui apprennent en contexte de travail"
          />

          {FEATURES_MAIN.map(({ icon, title, description, pills, tone, features }, idx) => (
            <div
              key={title}
              className={[
                'grid grid-cols-1 lg:grid-cols-2 gap-section items-center',
                idx % 2 === 1 ? 'lg:flex-row-reverse' : '',
              ].join(' ')}
            >
              {/* Visual side */}
              <div className={[
                'flex items-center justify-center min-h-64 rounded-2xl overflow-hidden',
                tone === 'brand'
                  ? 'bg-gradient-to-br from-primary-100 via-primary-50 to-white'
                  : 'bg-gradient-to-br from-secondary-100 via-secondary-50 to-white',
                idx % 2 === 1 ? 'lg:order-2' : '',
              ].join(' ')}>
                <div className={[
                  'p-8 rounded-2xl',
                  tone === 'brand' ? 'text-primary-400' : 'text-secondary-400',
                ].join(' ')}>
                  {React.cloneElement(icon as React.ReactElement, { size: 80, strokeWidth: 1 })}
                </div>
              </div>

              {/* Content side */}
              <div className={['flex flex-col gap-stack', idx % 2 === 1 ? 'lg:order-1' : ''].join(' ')}>
                <div className="flex flex-wrap gap-2">
                  {pills.map((p) => (
                    <MetaPill key={p} text={p} tone={tone === 'brand' ? 'primary' : 'warm'} />
                  ))}
                </div>
                <h3 className="font-display text-h2 font-bold text-ink-900 m-0 leading-tight">{title}</h3>
                <p className="text-body-lg text-ink-600 leading-relaxed m-0">{description}</p>
                <ul className="flex flex-col gap-2 list-none p-0 m-0">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-body-sm text-ink-700">
                      <CheckCircle2 size={16} className={tone === 'brand' ? 'text-primary-500 shrink-0' : 'text-secondary-500 shrink-0'} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Feature tiles grid ── */}
      <section className="py-section-lg bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-section">
          <SectionHeader
            variant="minimal"
            tone="primary"
            size="lg"
            icon={<Sparkles size={24} />}
            title="Et bien plus encore…"
            subtitle="Toutes les fonctionnalités dont un apprenant professionnel a besoin"
          />
          <CardGrid layout="square-tiles" gapSize="sm">
            {FEATURE_TILES.map(({ icon, title, description, tone }) => (
              <IconFeatureCard
                key={title}
                icon={icon}
                title={title}
                description={description}
                tone={tone}
                iconStyle="bubble"
                iconSize="md"
                surface="tinted"
              />
            ))}
          </CardGrid>
        </div>
      </section>

      {/* ── Early access CTA ── */}
      <section id="early-access" className="py-section-lg bg-gradient-to-br from-primary-700 via-primary-600 to-secondary-600">
        <div className="max-w-3xl mx-auto px-6 flex flex-col items-center gap-section">
          <div className="flex flex-col items-center text-center gap-stack">
            <div className="flex items-center gap-2">
              <Mail size={18} className="text-white/80" />
              <span className="text-caption font-bold text-white/80 uppercase tracking-widest">Accès anticipé</span>
            </div>
            <h2 className="font-display text-h1 font-bold text-white m-0 leading-tight">
              Soyez parmi les premiers
            </h2>
            <p className="text-body-lg text-white/75 m-0 max-w-prose">
              La Learning App est en développement actif. Inscrivez-vous pour être notifié en priorité et bénéficier d'un accès bêta exclusif.
            </p>
          </div>

          {submitted ? (
            <div className="bg-white/20 backdrop-blur-glass-light rounded-2xl p-6 flex flex-col items-center gap-3 text-center w-full max-w-md">
              <CheckCircle2 size={32} className="text-white" />
              <p className="text-body font-semibold text-white m-0">Merci ! Vous êtes sur la liste.</p>
              <p className="text-body-sm text-white/75 m-0">Nous vous contacterons dès que l'accès bêta sera disponible.</p>
            </div>
          ) : (
            <form
              className="w-full max-w-md flex flex-col gap-stack"
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            >
              <div className="flex flex-col gap-3">
                <FormGroup label="Email professionnel" id="access-email" required>
                  <Input
                    id="access-email"
                    type="email"
                    placeholder="vous@organisation.fr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label="Votre poste" id="access-role">
                  <Input id="access-role" placeholder="Formateur, Responsable L&D, Concepteur pédagogique…" />
                </FormGroup>
              </div>
              <Button type="submit" variant="glass" size="lg" fullWidth trailingIcon={<ArrowRight size={16} />}>
                Demander l'accès anticipé
              </Button>
              <p className="text-caption text-white/50 text-center m-0">
                Aucun spam. Désinscription en 1 clic.
              </p>
            </form>
          )}
        </div>
      </section>

    </div>
  );
};

export default MarketingLearningApp;
