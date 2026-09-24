import React, { useState } from 'react';
import { Map, Sparkles, CheckCircle2, Circle, Clock, Target, ChevronRight } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { MetaPill } from '../components/ui/MetaPill';
import { StatCard } from '../components/ui/StatCard';
import { AITransparencyLabel } from '../components/ui/AITransparencyLabel';
import { AIOverrideButton } from '../components/ui/AIOverrideButton';
import { usePrivacyStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
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
      // La validation d'un jalon est une décision humaine (coach ou manager) :
      // aucune quantité d'exercices ne la « déclenche ».
      'Tu es à 62 % du jalon Analyse D3. Deux exercices de plus cette semaine te donneraient de quoi présenter ce jalon à ton coach, qui décide de sa validation.',
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
  // Rejet d'une suggestion IA (PRODUCT.md : chaque recommandation d'IA se
  // rejette). Même motif que la fiche apprenant du coach : on masque la
  // suggestion et on trace la décision humaine dans le journal IA persisté.
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const logAIDecision = usePrivacyStore((st) => st.logAIDecision);
  const ignorer = (s: AISuggestion, reason?: string) => {
    setDismissed((prev) => new Set([...prev, s.id]));
    logAIDecision({
      id: `aidec-${s.id}-${Date.now()}`,
      userId: MOCK_USER_ID,
      actorId: MOCK_USER_ID,
      type: 'ai_override',
      recId: s.id,
      recLabel: s.conseil,
      reason,
      timestamp: new Date().toISOString(),
    });
  };
  const suggestions = AI_SUGGESTIONS.filter((s) => !dismissed.has(s.id));

  return (
    <PageShell width="wide" noPadTop={false}>
      {/* Hero */}
      <EditorialHero
        tone="flat"
        eyebrow={{ label: 'Passeport · Roadmap' }}
        title="Ma Roadmap Compétences"
        summary="Visualise ta trajectoire de progression vers tes objectifs Dreyfus."
        /* Une page de consultation : pas d'aplat (arbitrage n°19). Modifier
           les objectifs est l'action de contexte de la feuille de route. */
        trailing={
          <div className="flex items-center gap-stack-xs flex-wrap">
            <Button emphasis="soft" size="sm">
              Modifier les objectifs
            </Button>
            <Button emphasis="ghost" size="sm">
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

        {/* Parcours vers D4 — titre de section (h2 28) sur la page ; la frise
            dans une carte. Chaque étape : son nom en corps 16/600 (il était en
            League Spartan 16/600, ni titre ni corps), son état en Badge, sa
            description en ink-700 (ink-500 est la couleur des placeholders).
            Le Badge de niveau (« D3 ») répétait le titre de l'étape : retiré. */}
        <section className="flex flex-col gap-stack">
          <SectionHeader title="Parcours vers D4" />
          <Card>
            <ol className="relative flex flex-col">
              {JALONS.map((jalon, index) => {
                const cfg = JALON_STATUS_CONFIG[jalon.status];
                const isLast = index === JALONS.length - 1;

                return (
                  <li key={jalon.id} className="relative flex gap-stack">
                    {/* Pastille (20) centrée sur la première ligne (26) : 3 px. */}
                    <div className="flex flex-col items-center shrink-0 w-7">
                      <div
                        className={[
                          'w-5 h-5 mt-[3px] rounded-pill border-2 shrink-0 z-base',
                          cfg.dotClass,
                        ].join(' ')}
                      />
                      {!isLast && (
                        <div className={['flex-1 w-0.5 border-l-2 mt-1', cfg.lineClass].join(' ')} />
                      )}
                    </div>

                    <div className={['flex flex-col gap-stack-3xs min-w-0', isLast ? '' : 'pb-stack-lg'].join(' ')}>
                      <div className="flex items-center gap-stack-xs flex-wrap">
                        <span className="text-body font-semibold text-ink-900">
                          {jalon.title}
                        </span>
                        <Badge variant={cfg.badgeVariant} size="compact">
                          {JALON_BADGE_LABEL[jalon.status]}
                        </Badge>
                      </div>
                      <p className="text-body text-ink-700 max-w-prose">{jalon.description}</p>
                      <div className="flex items-center gap-stack-3xs text-caption text-ink-600 tabular-nums">
                        <Clock size={14} aria-hidden />
                        <span>Cible : {jalon.targetDate}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Card>
        </section>

        {/* Suggestions IA — l'étincelle et l'étiquette « Recommandé par l'IA »
            restent (DESIGN.md § 10) ; les suggestions sont des objets qu'on
            accepte ou rejette une à une : des cartes, sans carte autour. La
            compétence est une donnée (MetaPill), le conseil un texte à lire
            (ink-700, largeur de lecture). */}
        <section className="flex flex-col gap-stack">
          <SectionHeader
            title="Suggestions IA"
            icon={Sparkles}
            variant="minimal"
            action={<AITransparencyLabel variant="recommended" size="sm" />}
          />
          <div className="flex flex-col gap-stack-sm">
            {suggestions.length === 0 && (
              <p className="text-body text-ink-700">
                Tu as ignoré toutes les suggestions de cette page.
              </p>
            )}
            {suggestions.map((s) => (
              <Card key={s.id} variant="tinted" tone="primary" className="flex flex-col gap-stack-xs">
                <div className="flex items-start justify-between gap-stack-xs flex-wrap">
                  <p className="text-body font-semibold text-ink-900 flex-1 min-w-0">{s.conseil}</p>
                  <MetaPill text={s.competence} tone="primary" className="shrink-0" />
                </div>
                <p className="text-body text-ink-700 max-w-prose">{s.detail}</p>
                <div className="mt-stack-sm flex justify-end gap-stack-xs flex-wrap">
                  <AIOverrideButton label="Ignorer" onOverride={(reason) => ignorer(s, reason)} size="sm" />
                  {/* L'action de la carte (`soft`), en pastille blanche sur
                      la carte teintée (`neutral`). */}
                  <Button emphasis="soft" tone="neutral" size="sm" trailingIcon={<ChevronRight size={14} />}>
                    Explorer
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
    </PageShell>
  );
}
