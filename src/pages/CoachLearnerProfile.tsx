import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Activity, Calendar, FileText, Plus, ArrowLeft } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import ProgressBar from '../components/ui/ProgressBar';
import ActivityFeed from '../components/patterns/ActivityFeed';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import Button from '../components/core/Button';
import type { ActivityFeedItem } from '../components/patterns/ActivityFeed';
import { Container } from '../components/layout';
import { getApprenantById, dreyfusLabel } from '../data/apprenants';

const FALLBACK_LEARNER = {
  name: 'Isabelle Fontaine',
  initials: 'IF',
  level: 'Niveau 3 : Compétent',
  email: 'i.fontaine@example.com',
};

const COMPETENCES = [
  { label: 'Gestion de projet', fill: 72, fillColor: 'brand' as const },
  { label: 'Communication', fill: 85, fillColor: 'success' as const },
  { label: 'Leadership', fill: 48, fillColor: 'warm' as const },
  { label: 'Résolution de problèmes', fill: 60, fillColor: 'brand' as const },
  { label: 'Travail en équipe', fill: 91, fillColor: 'success' as const },
];

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
    <div className="flex flex-col gap-section">
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

      <Container width="wide" padding={false} className="px-stack md:px-section flex flex-col gap-section">
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

        {/* Progression Dreyfus par compétence */}
        <SectionCard
          title="Progression Dreyfus par compétence"
          titleIcon={<BookOpen size={18} />}
          description="Niveau d'acquisition évalué selon le modèle Dreyfus pour chaque compétence clé"
        >
          <div className="flex flex-col gap-stack">
            {COMPETENCES.map((comp) => (
              <div key={comp.label} className="flex flex-col gap-tight">
                <div className="flex items-center justify-between">
                  <span className="text-body-sm font-semibold text-ink-800">{comp.label}</span>
                  <span className="text-caption text-ink-400">{comp.fill} %</span>
                </div>
                <ProgressBar
                  value={comp.fill}
                  fill={comp.fillColor}
                  size="sm"
                />
              </div>
            ))}
          </div>
        </SectionCard>

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
      </Container>
    </div>
  );
}
