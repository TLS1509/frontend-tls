import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Target, BookOpen, ArrowLeft, Scale, PenLine } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { MetaPill } from '../components/ui/MetaPill';
import { Tabs } from '../components/ui/Tabs';
import { SkillBar } from '../components/ui/SkillBar';
import { AtrophieIndicator } from '../components/ui/AtrophieIndicator';
import { CompetencyRadar } from '../components/ui/CompetencyRadar';
import { StatCard } from '../components/ui/StatCard';
import { usePasseportStore } from '../stores/persistence';
import { getCompetenceById, domainLabel, competencyLevel, isValidatedLevel } from '../data/competencies';
import { MOCK_USER_ID } from '../data/passeport';
import type { CompetenceDomain } from '../types/learning';
import { PageShell } from '../components/layout';

const DREYFUS_DESC = [
  { level: 1, label: 'Novice',     desc: 'Applique des règles simples sans contexte.' },
  { level: 2, label: 'Apprenant',  desc: 'Reconnaît les situations récurrentes.' },
  { level: 3, label: 'Compétent',  desc: 'Planifie et adapte selon le contexte.' },
  { level: 4, label: 'Expert',     desc: 'Perçoit les situations de façon holistique.' },
  { level: 5, label: 'Maître',     desc: 'Intuition et excellence situationnelle.' },
] as const;

const TABS = [
  { id: 'progress', label: 'Progression' },
  { id: 'skills', label: 'Sous-compétences' },
  { id: 'activity', label: 'Activités' },
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

export default function PasseportCompetenceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('progress');
  const store = usePasseportStore();

  const competencies = store.getCompetencies(MOCK_USER_ID);
  const progressions = store.getProgressions(MOCK_USER_ID);
  const lc = competencies.find((c) => c.competenceId === id) ?? competencies[0];
  const ref = getCompetenceById(lc?.competenceId ?? '');

  const currentLevel = competencyLevel(lc);
  const levelValidated = isValidatedLevel(lc);
  const targetLevel = lc?.targetLevel ?? currentLevel;
  const daysSinceActivity = lc?.daysSinceActivity ?? 0;
  const domain = (ref?.domain ?? 'Soft') as CompetenceDomain;
  const label = ref?.label ?? (id ?? 'Compétence');
  const description = ref?.description ?? '';

  const progressPct = Math.round((currentLevel / targetLevel) * 100);

  // Progressions for this competency (activity tab)
  const competencyProgressions = progressions
    .filter((p) => p.competenceId === lc?.competenceId)
    .sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime())
    .slice(0, 5);

  // Preuves (EvidenceRef) de cette compétence, séparées par RÉGIME — partition
  // exhaustive, pour qu'aucune preuve ne devienne invisible quand une nouvelle
  // source apparaît (quiz, réflexion…) :
  //  - validations : dialogué/certifiant (coach/manager) → assertedLevel + verifiedBy
  //  - traces      : léger (SRS, quiz, réflexion) → n'affecte aucun niveau
  const competencyEvidence = store.getEvidence(MOCK_USER_ID, lc?.competenceId ?? '');
  const validations = competencyEvidence.filter((e) => e.regime !== 'light');
  const traces = competencyEvidence.filter((e) => e.regime === 'light');

  // Radar: sibling competencies in same domain for context
  const siblingCompetencies = competencies
    .map((c) => {
      const r = getCompetenceById(c.competenceId);
      return r ? { label: r.label, current: competencyLevel(c), target: c.targetLevel ?? competencyLevel(c) } : null;
    })
    .filter(Boolean)
    .slice(0, 6) as { label: string; current: number; target: number }[];

  return (
    /* Une seule colonne, un seul bord gauche : l'en-tête et le contenu vivent
       dans le même `PageShell`. Avant, le contenu était dans un conteneur à
       `px-section`, 32 px en retrait de l'en-tête. L'en-tête passe en `flat` :
       le ton du domaine (orange, or) peignait un bandeau saturé que la doctrine
       réserve au site ; le domaine est dit par le surtitre. */
    <PageShell width="wide">
      <EditorialHero
        eyebrow={`Passeport · ${domainLabel(domain)}`}
        title={label}
        summary={description || `Compétence du domaine ${domain} : suivi Dreyfus 1 à 5.`}
        tone="flat"
        trailing={
          <div className="flex flex-wrap items-center gap-stack-xs">
            <Button emphasis="outline" size="md" leadingIcon={<ArrowLeft size={16} />} onClick={() => navigate('/passeport')}>
              Retour
            </Button>
            <Button emphasis="soft" size="md" leadingIcon={<Target size={16} />}>
              Définir un objectif
            </Button>
          </div>
        }
      />

      {/* Où j'en suis : les chiffres, puis la calibration qui les lit. */}
      <section className="flex flex-col gap-stack">
        {/* KPI row — sans XP depuis le 2026-09-24 : « 320 XP · 180 pour D4 »
            faisait monter un niveau Dreyfus avec des points, ce que contredit la
            calibration juste en dessous (le niveau ne se valide qu'humainement)
            et PRODUCT.md. Le reste de la gamification est un arbitrage en cours. */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-stack">
          <StatCard
            value={`D${currentLevel}`}
            label={levelValidated ? 'Niveau validé' : 'Niveau auto-évalué'}
            delta={`→ D${targetLevel}`}
            deltaDirection="up"
            variant="brand"
            size="sm"
          />
          <StatCard
            value={`${progressPct}%`}
            label="Progression cible"
            size="sm"
          />
          <StatCard
            value={`${daysSinceActivity}j`}
            label="Dernière activité"
            size="sm"
          />
        </div>

        {/* Calibration : perception (auto-évaluée) vs niveau validé. C'est une
            phrase qu'on lit, pas une légende : corps 16, sous un intitulé, et
            l'icône sur la première ligne. Elle était en 13 px gris, coupée de
            deux tirets cadratins. */}
        {lc?.selfAssessedLevel != null && lc?.currentLevel != null && lc.selfAssessedLevel !== lc.currentLevel && (
          <div className="flex items-start gap-stack-sm rounded-xl border border-ink-200 bg-ink-50 p-stack-md">
            <span className="shrink-0 inline-flex items-center h-lh text-ink-700" aria-hidden="true">
              <Scale size={20} />
            </span>
            <div className="flex flex-col gap-stack-3xs min-w-0">
              <p className="text-body font-semibold text-ink-900">Calibration</p>
              <p className="text-body text-ink-700 max-w-prose">
                Tu t'étais auto-évalué·e à{' '}
                <strong className="font-semibold text-ink-900">D{lc.selfAssessedLevel}</strong>, le niveau validé est{' '}
                <strong className="font-semibold text-ink-900">D{lc.currentLevel}</strong>
                {lc.currentLevel > lc.selfAssessedLevel
                  ? ' : le regard externe te situe plus haut que ta perception.'
                  : ' : ta perception dépassait le niveau validé, un écart utile à travailler.'}
              </p>
            </div>
          </div>
        )}

        {/* Signal d'inactivité (> 90 j) : il vivait dans la carte « Progression XP ». */}
        <AtrophieIndicator
          daysSinceActivity={daysSinceActivity}
          currentLevel={currentLevel}
          size="md"
          className="self-start"
        />
      </section>

      {/* Échelle Dreyfus — une liste de cinq crans : des rangées dans une
          carte (arbitrage n°5), plus cinq cartes empilées dans une carte. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Échelle Dreyfus"
          subtitle="Ta position actuelle sur le parcours d'expertise"
        />
        <Card className="p-0 overflow-hidden">
          <ol className="divide-y divide-ink-100">
            {DREYFUS_DESC.map((d) => (
              <li
                key={d.level}
                aria-current={d.level === currentLevel ? 'step' : undefined}
                className={[
                  'flex items-start gap-stack px-stack-lg py-stack',
                  d.level === currentLevel ? 'bg-primary-50' : '',
                ].join(' ')}
              >
                <span className={[
                  'inline-flex items-center justify-center w-8 h-8 rounded-md text-caption font-bold tabular-nums shrink-0',
                  d.level === currentLevel ? 'bg-primary-700 text-white' : d.level < currentLevel ? 'bg-success-bg text-success-fg' : 'bg-ink-100 text-ink-700',
                ].join(' ')}>
                  D{d.level}
                </span>
                {/* 3 px : la pastille (32) se centre sur la première ligne (26). */}
                <div className="flex flex-col gap-stack-3xs min-w-0 mt-[3px]">
                  <div className="flex items-center gap-stack-xs flex-wrap">
                    <span className="text-body font-semibold text-ink-900">{d.label}</span>
                    {d.level === currentLevel && <Badge variant="info" size="compact">Ton niveau</Badge>}
                    {d.level === targetLevel && d.level !== currentLevel && <Badge variant="brand" size="compact">Objectif</Badge>}
                  </div>
                  <p className="text-body text-ink-700">{d.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </section>

      {/* Onglets : le composant, plus une rangée faite main dont l'onglet
          inactif était en ink-500 (la couleur des seuls placeholders). */}
      <div className="flex flex-col gap-section">
        <Tabs items={TABS} value={activeTab} onChange={setActiveTab} variant="underline" label="Détail de la compétence" />

        {activeTab === 'progress' && (
          <section className="flex flex-col gap-stack">
            <SectionHeader title="Radar compétences" />
            <Card>
              <CompetencyRadar axes={siblingCompetencies.length > 2 ? siblingCompetencies : [{ label, current: currentLevel, target: targetLevel }]} size="md" showLegend />
            </Card>
          </section>
        )}

        {activeTab === 'skills' && (
          <section className="flex flex-col gap-stack">
            <SectionHeader title="Compétences du même domaine" />
            <Card>
              <div className="flex flex-col gap-stack">
                {siblingCompetencies.map((sc) => (
                  <SkillBar key={sc.label} label={sc.label} value={(sc.current / 5) * 100} tone="brand" showValue />
                ))}
              </div>
            </Card>
          </section>
        )}

        {/* Activités : trois collections, chacune sous son titre de section,
            en rangées dans une carte. L'explication de chaque régime de preuve
            devient le sous-titre (16, ink-700) : elle était en légende grise
            à l'intérieur de la carte. Les types et les scores sont des
            données (MetaPill) ; seuls « validé », « Su » et « À revoir »
            disent un état (Badge). */}
        {activeTab === 'activity' && (
          <div className="flex flex-col gap-page">
            <section className="flex flex-col gap-stack">
              <SectionHeader title="Progressions récentes" />
              {competencyProgressions.length > 0 ? (
                <Card className="p-0 overflow-hidden">
                  <ul className="divide-y divide-ink-100">
                    {competencyProgressions.map((p) => (
                      <li key={p.id} className="flex items-center justify-between gap-stack px-stack-lg py-stack">
                        <div className="flex flex-col gap-stack-3xs min-w-0">
                          <span className="text-body font-semibold text-ink-900">{p.title}</span>
                          <span className="text-caption text-ink-600">{formatDate(p.occurredAt)}</span>
                        </div>
                        {p.newLevel && <MetaPill text={`D${p.newLevel}`} tone="success" className="shrink-0" />}
                      </li>
                    ))}
                  </ul>
                </Card>
              ) : (
                <p className="text-body text-ink-700">Aucune activité enregistrée pour cette compétence.</p>
              )}
            </section>

            {validations.length > 0 && (
              <section className="flex flex-col gap-stack">
                <SectionHeader
                  title="Validations"
                  subtitle="Preuves certifiantes : un coach ou un manager a validé ton niveau (décision humaine, art. 22)."
                />
                <Card className="p-0 overflow-hidden">
                  <ul className="divide-y divide-ink-100">
                    {validations.map((e) => (
                      <li key={e.id} className="flex items-center justify-between gap-stack px-stack-lg py-stack">
                        <div className="flex flex-col gap-stack-3xs min-w-0">
                          <span className="text-body font-semibold text-ink-900">{e.sourceLabel}</span>
                          <span className="text-caption text-ink-600">
                            {formatDate(e.occurredAt)}
                            {e.verifiedByName ? ` · validé par ${e.verifiedByName}` : ''}
                          </span>
                        </div>
                        {e.assertedLevel != null && (
                          <Badge variant="brand" size="compact" className="shrink-0">D{e.assertedLevel} validé</Badge>
                        )}
                      </li>
                    ))}
                  </ul>
                </Card>
              </section>
            )}

            {traces.length > 0 && (
              <section className="flex flex-col gap-stack">
                <SectionHeader
                  title="Traces d'apprentissage"
                  subtitle="Révisions, quiz et réflexions auto-déclarés. Ils nourrissent ta progression, sans changer le niveau validé : celui-ci ne s'obtient que par validation humaine."
                />
                <Card className="p-0 overflow-hidden">
                  <ul className="divide-y divide-ink-100">
                    {traces.map((e) => (
                      <li key={e.id} className="flex items-center justify-between gap-stack px-stack-lg py-stack">
                        <div className="flex flex-col gap-stack-3xs min-w-0">
                          <span className="text-body font-semibold text-ink-900">{e.sourceLabel}</span>
                          <span className="text-caption text-ink-600">
                            {formatDate(e.occurredAt)}
                            {e.retention ? ` · prochaine révision dans ${e.retention.intervalDays} j` : ''}
                          </span>
                        </div>
                        {e.retention ? (
                          <Badge variant={e.retention.rating === 'known' ? 'success' : 'neutral'} size="compact" className="shrink-0">
                            {e.retention.rating === 'known' ? 'Su' : 'À revoir'}
                          </Badge>
                        ) : e.score ? (
                          <MetaPill
                            text={`${e.score.correct}/${e.score.total}`}
                            tone={e.score.correct === e.score.total ? 'success' : 'info'}
                            className="shrink-0 tabular-nums"
                          />
                        ) : (
                          <MetaPill text={e.sourceType === 'reflection' ? 'Réflexion' : 'Activité'} tone="neutral" className="shrink-0" />
                        )}
                      </li>
                    ))}
                  </ul>
                </Card>
              </section>
            )}
          </div>
        )}
      </div>

      {/* Les deux actions de la page, sur le bord gauche comme tout le reste.
          Centrées, elles ouvraient un second axe au pied de la page. */}
      <div className="flex flex-wrap gap-stack-xs">
        <Button emphasis="soft" size="lg" leadingIcon={<BookOpen size={18} />}>
          Continuer ma progression
        </Button>
        {/* Boucle Passeport → Journal → Passeport : l'entrée publiée avec ce
            `competenceId` redépose une preuve légère sur cette compétence. */}
        <Button
          emphasis="soft" tone="warm"
          size="lg"
          leadingIcon={<PenLine size={18} />}
          onClick={() =>
            navigate(`/journal/new-entry?type=apprentissage&competenceId=${lc?.competenceId ?? ''}`)
          }
        >
          Réfléchir sur cette compétence
        </Button>
      </div>
    </PageShell>
  );
}
