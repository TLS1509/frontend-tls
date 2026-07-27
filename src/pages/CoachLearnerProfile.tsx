import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Activity, Calendar, FileText, Plus, ArrowLeft, Sparkles, ShieldOff, ShieldCheck, Check } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import ActivityFeed from '../components/patterns/ActivityFeed';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
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

const ACTIVITY_ITEMS: ActivityFeedItem[] = [
  {
    id: 'a1',
    type: 'complete',
    title: 'Leçon terminée : Gestion du temps',
    description: '+80 XP',
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
    description: '+60 XP',
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
      <EditorialHero
        eyebrow="Coach · Apprenant"
        title={`Fiche : ${learner.name}`}
        summary={`Suivi personnalisé de ${learner.name}. Historique des sessions, progression Dreyfus et notes pour accompagner sa progression.`}
        tone="flat"
        trailing={
          <Button
            variant="ghost"
            size="md"
            leadingIcon={<ArrowLeft size={16} />}
            onClick={() => navigate('/coach/apprenants')}
          >
            Retour aux apprenants
          </Button>
        }
      />

      <div className="flex flex-col gap-section">
        {/* Header apprenant */}
        <div className="flex items-center gap-stack-lg bg-white border border-ink-100 rounded-xl p-stack-lg shadow-xs">
          <Avatar
            initials={learner.initials}
            name={learner.name}
            size="xl"
            tint="warm"
          />
          <div className="flex flex-col gap-tight flex-1 min-w-0">
            <h2 className="text-h3 font-display font-bold text-ink-900">{learner.name}</h2>
            <p className="text-body-sm text-ink-500">{learner.role} · {learner.email}</p>
            <div className="flex flex-wrap items-center gap-stack-xs mt-1">
              <Badge variant="info">{learner.level}</Badge>
              <Badge variant={STATUS_BADGE_VARIANT[learner.status]}>{STATUS_BADGE_LABEL[learner.status]}</Badge>
            </div>
          </div>
        </div>

        {/* Validation Dreyfus par compétence — coach / manager */}
        <SectionCard
          title="Progression Dreyfus par compétence"
          titleIcon={<BookOpen size={18} />}
          description="Valide le niveau atteint par l'apprenant. Une validation coach/manager est une décision humaine : elle écrit le niveau validé et signe une preuve certifiante au Passeport (AI Act art. 22)."
        >
          {competencies.length === 0 ? (
            <p className="text-body-sm text-ink-500 m-0">
              Aucune compétence évaluée dans le Passeport de {learner.name} pour l'instant.
            </p>
          ) : (
            <div className="flex flex-col divide-y divide-ink-100">
              {competencies.map((lc) => {
                const level = competencyLevel(lc);
                const validated = isValidatedLevel(lc);
                const compLabel = getCompetenceById(lc.competenceId)?.label ?? lc.competenceId;
                const isOpen = validating === lc.competenceId;
                return (
                  <div key={lc.competenceId} className="flex flex-col gap-stack-xs py-stack">
                    <div className="flex items-center justify-between gap-stack">
                      <div className="flex flex-col gap-tight min-w-0">
                        <span className="text-body-sm font-semibold text-ink-800">{compLabel}</span>
                        <div className="flex items-center gap-stack-xs">
                          <span className="inline-flex items-center px-2 py-0.5 text-micro font-semibold rounded-pill bg-primary-50 text-primary-800">
                            D{level} · {DREYFUS_LABELS[level]}
                          </span>
                          {validated ? (
                            <Badge variant="success" size="sm">Validé</Badge>
                          ) : (
                            <Badge variant="neutral" size="sm">Auto-évalué</Badge>
                          )}
                        </div>
                      </div>
                      {!isOpen && (
                        <Button
                          variant={validated ? 'ghost' : 'secondary'}
                          size="sm"
                          leadingIcon={<ShieldCheck size={14} />}
                          onClick={() => openValidation(lc.competenceId, level)}
                        >
                          {validated ? 'Revalider' : 'Valider le niveau'}
                        </Button>
                      )}
                    </div>

                    {isOpen && (
                      <div className="flex flex-col gap-stack p-stack rounded-xl border border-primary-100 bg-primary-50">
                        <div className="flex flex-col gap-tight">
                          <span className="text-caption font-semibold text-ink-700">Niveau Dreyfus validé</span>
                          <div className="flex gap-tight">
                            {DREYFUS_LEVELS.map((lvl) => (
                              <button
                                key={lvl}
                                type="button"
                                onClick={() => setPickedLevel(lvl)}
                                aria-pressed={pickedLevel === lvl}
                                className={[
                                  'flex-1 h-10 rounded-lg text-body-sm font-semibold border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                                  pickedLevel === lvl
                                    ? 'bg-primary-600 text-white border-primary-600'
                                    : 'bg-white text-ink-600 border-ink-200 hover:border-primary-300',
                                ].join(' ')}
                              >
                                D{lvl}
                              </button>
                            ))}
                          </div>
                          <span className="text-micro text-ink-500">{DREYFUS_LABELS[pickedLevel]}</span>
                        </div>
                        <div className="flex flex-col gap-tight">
                          <label className="text-caption font-semibold text-ink-700" htmlFor={`rationale-${lc.competenceId}`}>
                            Motif / rubrique <span className="text-danger-fg">*</span>
                          </label>
                          <textarea
                            id={`rationale-${lc.competenceId}`}
                            className="w-full h-auto min-h-[72px] rounded-md border border-ink-200 bg-white px-3 py-2 text-body-sm text-ink-900 font-body placeholder:text-ink-400 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                            placeholder="Sur quelle preuve observable repose cette validation ? (mise en situation, livrable, JAC…)"
                            value={rationale}
                            onChange={(e) => setRationale(e.target.value)}
                            rows={2}
                          />
                        </div>
                        <div className="flex items-center justify-end gap-stack-xs">
                          <Button variant="ghost" size="sm" onClick={() => setValidating(null)}>
                            Annuler
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            leadingIcon={<Check size={14} />}
                            disabled={!rationale.trim()}
                            onClick={() => submitValidation(lc.competenceId)}
                          >
                            Valider D{pickedLevel}
                          </Button>
                        </div>
                        <p className="text-micro text-ink-400 m-0">
                          Validé par {MOCK_COACH.name} · une preuve certifiante est ajoutée au Passeport de l'apprenant.
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </SectionCard>

        {/* Recommandations IA — gated sur le consentement IA de l'apprenant (RGPD / AI Act) */}
        {!aiRecoAllowed && (
          <SectionCard
            title="Recommandations IA"
            titleIcon={<Sparkles size={18} />}
            description="Suggestions générées par l'analyse comportementale."
          >
            <div className="flex items-start gap-stack-xs p-stack rounded-xl border border-ink-100 bg-ink-50">
              <ShieldOff size={18} className="text-ink-400 mt-0.5 shrink-0" />
              <p className="text-body-sm text-ink-600">
                {learner.name} a désactivé les recommandations IA dans ses préférences de
                confidentialité. Aucune suggestion automatique n'est générée pour cet apprenant.
              </p>
            </div>
          </SectionCard>
        )}
        {aiRecoAllowed && activeRecs.length > 0 && (
          <SectionCard
            title="Recommandations IA"
            titleIcon={<Sparkles size={18} />}
            description="Suggestions générées par l'analyse comportementale. Tu peux les appliquer ou les rejeter avec un motif."
            headerAction={<AITransparencyLabel variant="recommended" size="sm" />}
          >
            <div className="flex flex-col gap-stack-xs">
              {activeRecs.map((rec) => {
                const pct = Math.round(rec.confidence * 100);
                const confCls =
                  pct >= 80
                    ? 'text-success-fg bg-success-bg border-success-border'
                    : pct >= 60
                      ? 'text-info-fg bg-info-bg border-info-border'
                      : 'text-warning-fg bg-warning-bg border-warning-border';
                return (
                  <div
                    key={rec.id}
                    className="flex flex-col gap-tight p-stack rounded-xl border border-ink-100 bg-white"
                  >
                    <div className="flex items-start justify-between gap-stack">
                      <div className="flex flex-col gap-tight flex-1 min-w-0">
                        <span className="text-body-sm font-semibold text-ink-900">{rec.title}</span>
                        <p className="text-caption text-ink-500 leading-relaxed">{rec.rationale}</p>
                      </div>
                      <span className={`inline-flex items-center text-micro font-medium px-1.5 py-0.5 rounded-xs border shrink-0 ${confCls}`}>
                        {pct}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-tight border-t border-ink-100 mt-1">
                      <Button
                        variant="primary"
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
                  </div>
                );
              })}
            </div>
          </SectionCard>
        )}

        {/* Activité récente */}
        <SectionCard
          title="Activité récente"
          titleIcon={<Activity size={18} />}
          description="Les 5 dernières actions enregistrées"
        >
          <ActivityFeed items={ACTIVITY_ITEMS} layout="timeline" timeFormat="relative" />
        </SectionCard>

        {/* Sessions coaching */}
        <SectionCard
          title="Sessions coaching"
          titleIcon={<Calendar size={18} />}
          description="Historique et prochaines sessions planifiées"
        >
          <ul className="flex flex-col divide-y divide-ink-100">
            {SESSIONS.map((session) => (
              <li key={session.id} className="flex items-center gap-stack py-3">
                <div className="flex flex-col gap-tight flex-1 min-w-0">
                  <span className="text-body-sm font-semibold text-ink-900">{session.subject}</span>
                  <span className="text-caption text-ink-500">{session.date}</span>
                </div>
                <Badge variant={SESSION_BADGE_VARIANT[session.status]}>
                  {SESSION_BADGE_LABEL[session.status]}
                </Badge>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Notes coach */}
        <SectionCard
          title="Notes coach"
          titleIcon={<FileText size={18} />}
          description="Tes observations et points de suivi : visibles uniquement par toi"
          actions={
            <Button
              variant="primary"
              size="sm"
              leadingIcon={<Plus size={14} />}
              onClick={() => setNote('')}
            >
              Ajouter une note
            </Button>
          }
        >
          <textarea
            className="w-full h-auto min-h-[120px] rounded-md border border-ink-200 bg-ink-50 px-3.5 py-3 text-body-sm text-ink-900 font-body placeholder:text-ink-400 focus:outline-none focus:border-primary-500 focus:bg-white transition-colors resize-none"
            placeholder="Écris ici tes observations sur l'apprenant, les points à travailler, les avancées notables…"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={5}
          />
          {note && (
            <div className="flex justify-end mt-stack">
              <Button variant="primary" size="sm" leadingIcon={<Plus size={14} />}>
                Enregistrer la note
              </Button>
            </div>
          )}
        </SectionCard>
      </div>
    </PageShell>
  );
}
