import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, ArrowLeft, ShieldOff, ShieldCheck, Check } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import ActivityFeed from '../components/patterns/ActivityFeed';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import { MetaPill } from '../components/ui/MetaPill';
import Button from '../components/core/Button';
import { AITransparencyLabel } from '../components/ui/AITransparencyLabel';
import { AIOverrideButton } from '../components/ui/AIOverrideButton';
import { PageShell } from '../components/layout';
import type { ActivityFeedItem } from '../components/patterns/ActivityFeed';
import { getApprenantById, dreyfusLabel } from '../data/apprenants';
import { usePrivacyStore, usePasseportStore } from '../stores/persistence';
import { MOCK_COACH_ID } from '../data/analytics';
import { MOCK_COACH_ID as COACH_VALIDATOR_ID, MOCK_COACH } from '../data/coaching';
import { getCompetenceById, competencyLevel, isValidatedLevel, DREYFUS_LABELS } from '../data/competencies';
import type { DreyfusLevel } from '../types/learning';

const FALLBACK_LEARNER = {
  name: 'Isabelle Fontaine',
  initials: 'IF',
  level: 'Niveau 3 : Compétent',
  email: 'i.fontaine@example.com',
};

const DREYFUS_LEVELS: DreyfusLevel[] = [1, 2, 3, 4, 5];

/* Les leçons terminées ne portent plus leur gain (« +80 XP », « +60 XP ») :
   l'arbitrage n°18 retire l'XP, et la ligne dit déjà ce qui s'est passé. Le
   « Badge débloqué : Explorateur » (badge de plateforme, sans niveau validé)
   reste en l'état : question produit ouverte pour les vues coach. */
const ACTIVITY_ITEMS: ActivityFeedItem[] = [
  {
    id: 'a1',
    type: 'complete',
    title: 'Leçon terminée : Gestion du temps',
    timestamp: new Date('2026-05-13T09:00:00'),
    tone: 'success',
  },
  {
    id: 'a2',
    type: 'complete',
    title: 'Session coaching effectuée',
    description: 'Sujet : Préparation entretien annuel',
    timestamp: new Date('2026-05-12T14:30:00'),
    tone: 'primary',
  },
  {
    id: 'a3',
    type: 'achievement',
    title: 'Badge débloqué : Explorateur',
    description: 'Accès à 3 domaines de compétences',
    timestamp: new Date('2026-05-11T11:00:00'),
    tone: 'sun',
  },
  {
    id: 'a4',
    type: 'complete',
    title: 'Leçon terminée : Feedback constructif',
    timestamp: new Date('2026-05-10T16:00:00'),
    tone: 'success',
  },
  {
    id: 'a5',
    type: 'complete',
    title: 'Entrée journal complétée',
    description: 'Réflexion sur la semaine',
    timestamp: new Date('2026-05-09T18:00:00'),
    tone: 'primary',
  },
];

type SessionStatus = 'completed' | 'scheduled' | 'cancelled';

const SESSIONS: { id: string; date: string; subject: string; status: SessionStatus }[] = [
  {
    id: 's1',
    date: '12 mai 2026',
    subject: 'Préparation entretien annuel',
    status: 'completed',
  },
  {
    id: 's2',
    date: '5 mai 2026',
    subject: 'Bilan de mi-parcours',
    status: 'completed',
  },
  {
    id: 's3',
    date: '20 mai 2026',
    subject: 'Objectifs Q3',
    status: 'scheduled',
  },
];

const SESSION_BADGE_VARIANT: Record<SessionStatus, 'success' | 'info' | 'danger'> = {
  completed: 'success',
  scheduled: 'info',
  cancelled: 'danger',
};

const SESSION_BADGE_LABEL: Record<SessionStatus, string> = {
  completed: 'Réalisée',
  scheduled: 'Planifiée',
  cancelled: 'Annulée',
};

const AI_RECOMMENDATIONS = [
  {
    id: 'r1',
    title: 'Proposer un parcours Leadership avancé',
    rationale: 'Score Leadership à 48 % — progression lente depuis 3 semaines. Un parcours ciblé pourrait débloquer la progression.',
    confidence: 0.87,
    dismissed: false,
  },
  {
    id: 'r2',
    title: 'Planifier une session de suivi cette semaine',
    rationale: 'Aucune session depuis 18 jours. L\'analyse comportementale détecte un risque de décrochage.',
    confidence: 0.73,
    dismissed: false,
  },
  {
    id: 'r3',
    title: 'Ajouter un défi de communication publique',
    rationale: 'Score Communication à 85 % — proche du niveau Expert. Un défi avancé pourrait consolider l\'acquisition.',
    confidence: 0.64,
    dismissed: false,
  },
];

const STATUS_BADGE_VARIANT: Record<'active' | 'stuck' | 'ahead', 'success' | 'danger' | 'info'> = {
  active: 'success',
  stuck: 'danger',
  ahead: 'info',
};

const STATUS_BADGE_LABEL: Record<'active' | 'stuck' | 'ahead', string> = {
  active: 'Actif',
  stuck: 'En difficulté',
  ahead: 'En avance',
};

export default function CoachLearnerProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState('');
  const [dismissedRecs, setDismissedRecs] = useState<Set<string>>(new Set());
  const logAIDecision = usePrivacyStore((s) => s.logAIDecision);
  const getAIConsents = usePrivacyStore((s) => s.getAIConsents);

  // ── Passeport : validation coach/manager du niveau Dreyfus ──────────────────
  // Live binding (pas de snapshot) : getCompetencies(id) dans le render body → le
  // composant se re-render après validateCompetency et le badge bascule en « Validé ».
  const passeport = usePasseportStore();
  const learnerId = id ?? '';
  const competencies = passeport.getCompetencies(learnerId);
  const [validating, setValidating] = useState<string | null>(null); // competenceId ouvert
  const [pickedLevel, setPickedLevel] = useState<DreyfusLevel>(3);
  const [rationale, setRationale] = useState('');

  const openValidation = (competenceId: string, current: DreyfusLevel) => {
    setValidating(competenceId);
    setPickedLevel(current);
    setRationale('');
  };
  const submitValidation = (competenceId: string) => {
    passeport.validateCompetency({
      userId: learnerId,
      competenceId,
      competenceName: getCompetenceById(competenceId)?.label ?? competenceId,
      validatedLevel: pickedLevel,
      verifiedBy: COACH_VALIDATOR_ID,
      verifiedByName: MOCK_COACH.name,
      rationale: rationale.trim() || undefined,
    });
    setValidating(null);
    setRationale('');
  };
  // Le consentement IA appartient au sujet (l'apprenant). Si l'apprenant a désactivé
  // les recommandations IA dans ses préférences, le coach ne voit aucune suggestion
  // automatique générée à son sujet (RGPD / AI Act — consentement honoré, pas juste stocké).
  const aiRecoAllowed = getAIConsents(id ?? 'unknown').aiRecommendations;

  /** Trace une décision humaine de supervision IA (AI Act Art. 14) — append-only, persistée. */
  const logDecision = (
    rec: (typeof AI_RECOMMENDATIONS)[number],
    type: 'ai_override' | 'ai_accepted',
    reason?: string,
  ) => {
    setDismissedRecs((prev) => new Set([...prev, rec.id]));
    logAIDecision({
      id: `aidec-${rec.id}-${Date.now()}`,
      userId: id ?? 'unknown',
      actorId: MOCK_COACH_ID,
      type,
      recId: rec.id,
      recLabel: rec.title,
      reason,
      timestamp: new Date().toISOString(),
    });
  };

  const activeRecs = AI_RECOMMENDATIONS.filter((r) => !dismissedRecs.has(r.id));

  const apprenant = id ? getApprenantById(id) : undefined;
  const learner = apprenant
    ? {
        name: apprenant.name,
        initials: apprenant.initials,
        email: apprenant.email,
        level: dreyfusLabel(apprenant.dreyfusAvg),
        status: apprenant.status,
        role: apprenant.role,
      }
    : { ...FALLBACK_LEARNER, status: 'active' as const, role: 'Apprenant' };

  return (
    <PageShell width="page" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      {/* Le titre est la personne (« Fiche : » était un reste de libellé) ; le
          chapô dit son rôle. La carte d'identité ne répète plus ni le nom (en h2
          de 20 px) ni le rôle : elle garde ce qu'elle ajoute — l'avatar, le
          niveau, l'état et le contact. */}
      {/* Une fiche de consultation : aucune action ne vaut pour tout l'écran,
          donc aucun `solid` (arbitrage n°19). Chaque action appartient à sa
          rangée (valider un niveau, appliquer une recommandation) ou à son
          bloc (les notes) ; le retour est un `ghost` neutre, calé sur le bord
          du texte (`-ml-stack-md` rattrape son padding). */}
      <EditorialHero
        eyebrow="Coach · Apprenant"
        title={learner.name}
        summary={learner.role}
        tone="flat"
        trailing={
          <Button
            emphasis="ghost"
            tone="neutral"
            size="md"
            leadingIcon={<ArrowLeft size={16} />}
            onClick={() => navigate('/coach/apprenants')}
            className="-ml-stack-md"
          >
            Retour aux apprenants
          </Button>
        }
      />

      <Card className="flex flex-wrap items-center gap-x-stack-lg gap-y-stack">
        <Avatar
          initials={learner.initials}
          name={learner.name}
          size="xl"
          tint="warm"
        />
        <div className="flex flex-col gap-stack-xs min-w-0">
          <div className="flex flex-wrap items-center gap-stack-xs">
            <MetaPill text={learner.level} tone="primary" />
            <Badge variant={STATUS_BADGE_VARIANT[learner.status]}>{STATUS_BADGE_LABEL[learner.status]}</Badge>
          </div>
          <p className="text-caption text-ink-600">{learner.email}</p>
        </div>
      </Card>

      {/* Validation Dreyfus par compétence — coach / manager. Une section de la
          page : titre h2 hors de la carte, la phrase qui la cadre en sous-titre
          (16 ink-700, largeur de lecture). */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Progression Dreyfus par compétence"
          subtitle="Validez le niveau atteint par l'apprenant. Une validation coach/manager est une décision humaine : elle écrit le niveau validé et signe une preuve certifiante au Passeport (AI Act art. 22)."
          size="md"
        />
        {competencies.length === 0 ? (
          <p className="text-body text-ink-600">
            Aucune compétence évaluée dans le Passeport de {learner.name} pour l'instant.
          </p>
        ) : (
          <Card className="p-0">
            <ul className="flex flex-col divide-y divide-ink-100">
              {competencies.map((lc) => {
                const level = competencyLevel(lc);
                const validated = isValidatedLevel(lc);
                const compLabel = getCompetenceById(lc.competenceId)?.label ?? lc.competenceId;
                const isOpen = validating === lc.competenceId;
                return (
                  <li key={lc.competenceId} className="flex flex-col gap-stack px-stack-md sm:px-stack-lg py-stack">
                    <div className="flex flex-wrap items-center justify-between gap-stack">
                      {/* La compétence 16/600, puis son niveau — une donnée,
                          en MetaPill — et l'état de la validation, en Badge. */}
                      <div className="flex flex-col gap-stack-3xs min-w-0">
                        <span className="text-body font-semibold text-ink-900">{compLabel}</span>
                        <div className="flex flex-wrap items-center gap-stack-xs">
                          <MetaPill text={`D${level} · ${DREYFUS_LABELS[level]}`} tone="primary" />
                          {validated ? (
                            <Badge variant="success" size="compact">Validé</Badge>
                          ) : (
                            <Badge variant="neutral" size="compact">Auto-évalué</Badge>
                          )}
                        </div>
                      </div>
                      {/* Valider : l'action de la rangée (`soft`). Une fois le
                          niveau validé, revalider devient discret (`ghost`). */}
                      {!isOpen && (
                        <Button
                          emphasis={validated ? 'ghost' : 'soft'}
                          tone={validated ? 'brand' : 'warm'}
                          size="sm"
                          leadingIcon={<ShieldCheck size={14} />}
                          onClick={() => openValidation(lc.competenceId, level)}
                        >
                          {validated ? 'Revalider' : 'Valider le niveau'}
                        </Button>
                      )}
                    </div>

                    {isOpen && (
                      /* Le panneau de validation : libellés 16/600 ink-900 (ceux
                         d'un champ), 8 px entre un libellé et son contrôle, 16
                         entre deux groupes. Les boutons de niveau passent à 44 px
                         (arbitrage n°22) ; ils en faisaient 40. */
                      <div className="flex flex-col gap-stack p-stack rounded-lg border border-primary-100 bg-primary-50">
                        <div className="flex flex-col gap-stack-xs">
                          <span className="text-body font-semibold text-ink-900" id={`niveau-${lc.competenceId}`}>Niveau Dreyfus validé</span>
                          <div className="flex gap-stack-3xs" role="group" aria-labelledby={`niveau-${lc.competenceId}`}>
                            {DREYFUS_LEVELS.map((lvl) => (
                              <button
                                key={lvl}
                                type="button"
                                onClick={() => setPickedLevel(lvl)}
                                aria-pressed={pickedLevel === lvl}
                                className={[
                                  'flex-1 h-11 rounded-lg text-body font-semibold tabular-nums border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                                  pickedLevel === lvl
                                    ? 'bg-primary-700 text-white border-primary-700'
                                    : 'bg-white text-ink-700 border-ink-200 hover:border-primary-300',
                                ].join(' ')}
                              >
                                D{lvl}
                              </button>
                            ))}
                          </div>
                          <span className="text-caption text-ink-600">{DREYFUS_LABELS[pickedLevel]}</span>
                        </div>
                        <div className="flex flex-col gap-stack-xs">
                          <label className="text-body font-semibold text-ink-900" htmlFor={`rationale-${lc.competenceId}`}>
                            Motif / rubrique <span className="text-danger-fg">*</span>
                          </label>
                          <textarea
                            id={`rationale-${lc.competenceId}`}
                            className="w-full h-auto min-h-[72px] rounded-lg border border-ink-200 bg-white px-3 py-2 text-body text-ink-900 font-body placeholder:text-ink-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                            placeholder="Sur quelle preuve observable repose cette validation ? (mise en situation, livrable, JAC…)"
                            value={rationale}
                            onChange={(e) => setRationale(e.target.value)}
                            rows={2}
                          />
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-stack-sm">
                          <p className="text-caption text-ink-600 max-w-prose">
                            Validé par {MOCK_COACH.name} · une preuve certifiante est ajoutée au Passeport de l'apprenant.
                          </p>
                          {/* Une confirmation dépliée dans la page lui laisse
                              son `solid` : Valider en `soft`, Annuler en
                              `ghost` (convention d'AIOverrideButton). */}
                          <div className="flex items-center gap-stack-xs">
                            <Button emphasis="ghost" tone="neutral" size="sm" onClick={() => setValidating(null)}>
                              Annuler
                            </Button>
                            <Button
                              emphasis="soft"
                              tone="brand"
                              size="sm"
                              leadingIcon={<Check size={14} />}
                              disabled={!rationale.trim()}
                              onClick={() => submitValidation(lc.competenceId)}
                            >
                              Valider D{pickedLevel}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Card>
        )}
      </section>

      {/* Recommandations IA — gated sur le consentement IA de l'apprenant (RGPD / AI Act) */}
      {!aiRecoAllowed && (
        <section className="flex flex-col gap-stack">
          <SectionHeader
            title="Recommandations IA"
            subtitle="Suggestions générées par l'analyse comportementale."
            size="md"
          />
          <div className="flex items-start gap-stack-xs p-stack rounded-lg border border-ink-100 bg-ink-50">
            <span className="shrink-0 inline-flex items-center h-lh text-body text-ink-600" aria-hidden="true">
              <ShieldOff size={18} />
            </span>
            <p className="text-body text-ink-700 max-w-prose">
              {learner.name} a désactivé les recommandations IA dans ses préférences de
              confidentialité. Aucune suggestion automatique n'est générée pour cet apprenant.
            </p>
          </div>
        </section>
      )}
      {aiRecoAllowed && activeRecs.length > 0 && (
        /* Trois recommandations : des rangées dans une carte (plus trois
           cartes bordées dans une carte). Le motif se lit — 16 ink-700, il
           était en légende ink-500. La confiance est une donnée : « Confiance
           87 % » en légende, chiffre en tabulaire ; sa pastille posait des
           couleurs `*-border` absentes de @theme. */
        <section className="flex flex-col gap-stack">
          <SectionHeader
            title="Recommandations IA"
            subtitle="Suggestions générées par l'analyse comportementale. Vous pouvez les appliquer ou les rejeter avec un motif."
            size="md"
            action={<AITransparencyLabel variant="recommended" size="sm" />}
          />
          <Card className="p-0">
            <ul className="flex flex-col divide-y divide-ink-100">
              {activeRecs.map((rec) => {
                const pct = Math.round(rec.confidence * 100);
                return (
                  <li key={rec.id} className="flex flex-col gap-stack px-stack-md sm:px-stack-lg py-stack">
                    <div className="flex flex-col gap-stack-xs">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-stack gap-y-stack-3xs">
                        <span className="text-body font-semibold text-ink-900">{rec.title}</span>
                        <span className="text-caption text-ink-600 shrink-0">
                          Confiance <span className="font-semibold text-ink-900 tabular-nums">{pct}&nbsp;%</span>
                        </span>
                      </div>
                      <p className="text-body text-ink-700 max-w-prose">{rec.rationale}</p>
                    </div>
                    <div className="flex items-center justify-between gap-stack">
                      <Button
                        emphasis="soft"
                        size="sm"
                        onClick={() => logDecision(rec, 'ai_accepted')}
                      >
                        Appliquer
                      </Button>
                      <AIOverrideButton
                        label="Rejeter"
                        onOverride={(reason) => logDecision(rec, 'ai_override', reason)}
                        requireReason
                        size="sm"
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>
        </section>
      )}

      {/* Activité récente : le fil porte ses propres rangées bordées — pas de
          carte autour (une carte dans une carte). */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Activité récente" meta="Les 5 dernières actions enregistrées" size="md" />
        <ActivityFeed items={ACTIVITY_ITEMS} layout="timeline" timeFormat="relative" />
      </section>

      <section className="flex flex-col gap-stack">
        <SectionHeader title="Sessions coaching" subtitle="Historique et prochaines sessions planifiées." size="md" />
        <Card className="p-0">
          <ul className="flex flex-col divide-y divide-ink-100">
            {SESSIONS.map((session) => (
              <li key={session.id} className="flex items-center gap-stack px-stack-md sm:px-stack-lg py-stack-sm">
                <div className="flex flex-col gap-tight flex-1 min-w-0">
                  <span className="text-body font-semibold text-ink-900">{session.subject}</span>
                  <span className="text-caption text-ink-600 tabular-nums">{session.date}</span>
                </div>
                <Badge variant={SESSION_BADGE_VARIANT[session.status]}>
                  {SESSION_BADGE_LABEL[session.status]}
                </Badge>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Notes coach"
          subtitle="Vos observations et points de suivi : visibles uniquement par vous."
          size="md"
        />
        <Card className="flex flex-col gap-stack">
          <textarea
            aria-label="Note sur l'apprenant"
            className="w-full h-auto min-h-[120px] rounded-lg border border-ink-200 bg-ink-50 px-3.5 py-3 text-body text-ink-900 font-body placeholder:text-ink-500 focus:outline-none focus:border-primary-500 focus:bg-white transition-colors resize-none"
            placeholder="Écrivez ici vos observations sur l'apprenant, les points à travailler, les avancées notables…"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={5}
          />
          {/* Enregistrer, l'action du bloc, en `soft` ; « Ajouter une note »,
              qui vide le champ, en `ghost`. */}
          <div className="flex flex-wrap items-center justify-end gap-stack-xs">
            <Button
              emphasis="ghost"
              tone="brand"
              size="sm"
              leadingIcon={<Plus size={14} />}
              onClick={() => setNote('')}
            >
              Ajouter une note
            </Button>
            {note && (
              <Button emphasis="soft" tone="brand" size="sm" leadingIcon={<Plus size={14} />}>
                Enregistrer la note
              </Button>
            )}
          </div>
        </Card>
      </section>
    </PageShell>
  );
}
