import React from 'react';
import { Map, Sparkles, CheckCircle2, Circle, Clock, Target, ChevronRight } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { AITransparencyLabel } from '../components/ui/AITransparencyLabel';
import { PageShell } from '../components/layout';

// ─── Mock data ────────────────────────────────────────────────────────────────

type JalonStatus = 'validated' | 'in-progress' | 'pending';

interface Jalon {
  id: string;
  title: string;
  competence: string;
  dreyfusLevel: string;
  targetDate: string;
  status: JalonStatus;
  description: string;
}

const JALONS: Jalon[] = [
  {
    id: 'j1',
    title: 'Leadership · D2 → D3',
    competence: 'Leadership',
    dreyfusLevel: 'D3',
    targetDate: '15 jan. 2026',
    status: 'validated',
    description: 'Maîtrise des fondamentaux du leadership en équipe.',
  },
  {
    id: 'j2',
    title: 'Communication · D3',
    competence: 'Communication',
    dreyfusLevel: 'D3',
    targetDate: '02 fév. 2026',
    status: 'validated',
    description: 'Communication claire, assertive et adaptée à tous niveaux.',
  },
  {
    id: 'j3',
    title: 'Analyse · D3',
    competence: 'Analyse',
    dreyfusLevel: 'D3',
    targetDate: '30 juin 2026',
    status: 'in-progress',
    description: 'Raisonnement analytique et résolution de problèmes complexes.',
  },
  {
    id: 'j4',
    title: 'Tech & Outils · D3',
    competence: 'Tech & Outils',
    dreyfusLevel: 'D3',
    targetDate: '15 juil. 2026',
    status: 'pending',
    description: 'Maîtrise des outils numériques avancés et des workflows techniques.',
  },
  {
    id: 'j5',
    title: 'Leadership · D4',
    competence: 'Leadership',
    dreyfusLevel: 'D4',
    targetDate: '01 sept. 2026',
    status: 'pending',
    description: 'Leadership transformationnel, influence systémique et mentoring.',
  },
  {
    id: 'j6',
    title: 'Communication · D4',
    competence: 'Communication',
    dreyfusLevel: 'D4',
    targetDate: '15 oct. 2026',
    status: 'pending',
    description: 'Communication stratégique et gestion des parties prenantes.',
  },
  {
    id: 'j7',
    title: 'Certification globale D4',
    competence: 'Toutes compétences',
    dreyfusLevel: 'D4',
    targetDate: '01 déc. 2026',
    status: 'pending',
    description: "Validation officielle du niveau D4 sur l'ensemble du référentiel.",
  },
];

interface AISuggestion {
  id: string;
  conseil: string;
  competence: string;
  detail: string;
}

const AI_SUGGESTIONS: AISuggestion[] = [
  {
    id: 's1',
    conseil: 'Consolide ton analyse avant de viser le D4',
    competence: 'Analyse',
    detail:
      'Tu es à 62 % du jalon Analyse D3. Deux exercices supplémentaires cette semaine suffiraient pour déclencher la validation.',
  },
  {
    id: 's2',
    conseil: 'Planifie une session coaching sur le Leadership D4',
    competence: 'Leadership',
    detail:
      "Ton historique montre un fort potentiel D4. Un coaching ciblé te permettrait d'atteindre le jalon 4 semaines plus tôt.",
  },
  {
    id: 's3',
    conseil: 'Explore les ressources Tech avancées',
    competence: 'Tech & Outils',
    detail:
      'Le module "Automatisation & IA pour managers" est directement aligné sur le jalon Tech D3. Durée : 45 min.',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const JALON_STATUS_CONFIG: Record<
  JalonStatus,
  { icon: React.ReactNode; dotClass: string; lineClass: string; badgeVariant: 'success' | 'brand' | 'neutral' }
> = {
  validated: {
    icon: <CheckCircle2 size={20} className="text-success-base" />,
    dotClass: 'bg-success-base border-success-base',
    lineClass: 'border-success-base/40',
    badgeVariant: 'success',
  },
  'in-progress': {
    icon: <Circle size={20} className="text-primary-500 fill-primary-100" />,
    dotClass: 'bg-primary-500 border-primary-500',
    lineClass: 'border-primary-200',
    badgeVariant: 'brand',
  },
  pending: {
    icon: <Circle size={20} className="text-ink-300" />,
    dotClass: 'bg-ink-100 border-ink-300',
    lineClass: 'border-ink-200',
    badgeVariant: 'neutral',
  },
};

const JALON_BADGE_LABEL: Record<JalonStatus, string> = {
  validated: 'Validé',
  'in-progress': 'En cours',
  pending: 'À venir',
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PasseportRoadmap() {
  return (
    <PageShell width="wide" noPadTop={false}>
      {/* Hero */}
      <EditorialHero
        tone="flat"
        eyebrow={{ label: 'Passeport · Roadmap' }}
        title="Ma Roadmap Compétences"
        summary="Visualise ta trajectoire de progression vers tes objectifs Dreyfus."
        trailing={
          <div className="flex items-center gap-stack-xs flex-wrap">
            <Button variant="ghost" size="sm">
              Modifier les objectifs
            </Button>
            <Button variant="glass" size="sm">
              Partager
            </Button>
          </div>
        }
      />

        {/* KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
          <StatCard
            label="Niveau actuel"
            value="D3.1"
            tone="brand"
            surface="tinted"
            icon={<Target size={20} />}
          />
          <StatCard
            label="Objectif cible"
            value="D4.0"
            tone="brand"
            surface="tinted"
            icon={<Map size={20} />}
          />
          <StatCard
            label="Jalons validés"
            value="3"
            sub="/7"
            tone="neutral"
            surface="card"
            icon={<CheckCircle2 size={20} />}
          />
          <StatCard
            label="Jours restants"
            value="124"
            tone="neutral"
            surface="card"
            icon={<Clock size={20} />}
          />
        </div>

        {/* Timeline roadmap */}
        <SectionCard
          title="Parcours vers D4"
          titleIcon={<Map size={18} />}
        >
          <div className="relative flex flex-col">
            {JALONS.map((jalon, index) => {
              const cfg = JALON_STATUS_CONFIG[jalon.status];
              const isLast = index === JALONS.length - 1;

              return (
                <div key={jalon.id} className="relative flex gap-stack">
                  {/* Vertical line + dot */}
                  <div className="flex flex-col items-center shrink-0 w-7">
                    <div
                      className={[
                        'w-5 h-5 rounded-full border-2 shrink-0 z-base',
                        cfg.dotClass,
                      ].join(' ')}
                    />
                    {!isLast && (
                      <div className={['flex-1 w-0.5 border-l-2 mt-1', cfg.lineClass].join(' ')} />
                    )}
                  </div>

                  {/* Content */}
                  <div className={['flex flex-col gap-tight pb-stack', isLast ? '' : ''].join(' ')}>
                    <div className="flex items-center gap-stack-xs flex-wrap">
                      <span className="font-display font-semibold text-body-sm text-ink-900">
                        {jalon.title}
                      </span>
                      <Badge variant={cfg.badgeVariant} size="sm">
                        {JALON_BADGE_LABEL[jalon.status]}
                      </Badge>
                      <Badge variant="neutral" size="sm">
                        {jalon.dreyfusLevel}
                      </Badge>
                    </div>
                    <p className="m-0 text-body-sm text-ink-500">{jalon.description}</p>
                    <div className="flex items-center gap-stack-xs text-caption text-ink-400">
                      <Clock size={12} aria-hidden />
                      <span>Cible : {jalon.targetDate}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>

        {/* IA suggestions */}
        <SectionCard
          title="Suggestions IA"
          titleIcon={<Sparkles size={18} />}
          headerAction={<AITransparencyLabel variant="recommended" size="sm" />}
        >
          <div className="flex flex-col gap-stack">
            {AI_SUGGESTIONS.map((s) => (
              <Card key={s.id} variant="tinted" tone="primary" className="p-stack flex flex-col gap-tight">
                <div className="flex items-start justify-between gap-stack-xs flex-wrap">
                  <p className="m-0 font-semibold text-body-sm text-ink-900 flex-1">{s.conseil}</p>
                  <Badge variant="brand" size="sm">{s.competence}</Badge>
                </div>
                <p className="m-0 text-body-sm text-ink-500 leading-relaxed">{s.detail}</p>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" trailingIcon={<ChevronRight size={14} />}>
                    Explorer
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </SectionCard>
    </PageShell>
  );
}
