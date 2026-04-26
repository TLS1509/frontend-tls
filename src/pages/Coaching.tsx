/**
 * Coaching Page - Coaching sessions and support
 *
 * Shows:
 * - Available coaching sessions
 * - Booking/scheduling options
 * - Coaching progress
 * - Coaching history
 */

import React from 'react';
import { Card } from '../components/core/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/core/Button';
import {
  CalendarClock,
  UserRound,
  Users,
  Mail,
  ExternalLink,
  Star,
  Video,
  FileText,
  Notebook,
  ArrowRight,
  Calendar,
  Clock3,
} from 'lucide-react';
import '../styles/feature-pages-modern.css';
import '../styles/static-pages.css';

interface CoachingSession {
  id: string;
  title: string;
  coachName: string;
  description: string;
  dateLabel: string;
  durationLabel: string;
  status: 'planned' | 'completed';
  questionnaire: boolean;
  report: boolean;
  journal: boolean;
}

const coach = {
  name: 'Sophie Martin',
  role: 'Expert IA & Pedagogie',
  bio: 'Specialiste IA generative et design pedagogique. Accompagnement 1:1 orienté mise en pratique.',
  rating: '4.9',
  sessions: '156',
  email: 'sophie.martin@thelearningsociety.com',
  linkedin: 'linkedin.com/in/sophiemartin',
};

const upcoming = {
  title: 'Session de coaching IA',
  dateLabel: 'Mardi 30 avril 2026',
  hourLabel: '14:00 - 15:00',
};

const sessions: CoachingSession[] = [
  {
    id: 'coaching-1',
    title: 'Introduction au prompt engineering',
    coachName: 'Sophie Martin',
    description: 'Fondamentaux ROLE-CONTEXT-TASK et structuration des demandes.',
    dateLabel: '15 decembre 2025',
    durationLabel: '1h',
    status: 'completed',
    questionnaire: true,
    report: true,
    journal: true,
  },
  {
    id: 'coaching-2',
    title: "Strategie d'implementation IA",
    coachName: 'Sophie Martin',
    description: "Integration IA dans vos parcours existants et priorisation des cas d'usage.",
    dateLabel: '8 decembre 2025',
    durationLabel: '1h',
    status: 'completed',
    questionnaire: true,
    report: true,
    journal: false,
  },
];

export const Coaching: React.FC = () => {
  return (
    <div className="feature-page">
      <section className="tls-editorial-hero">
        <p className="tls-editorial-eyebrow">Coaching Flow • Accompagnement</p>
        <h1 style={{ margin: 0 }}>Coaching 1:1</h1>
        <p className="tls-editorial-summary">
          Accompagnement individuel pour accelerer la mise en pratique sur vos cas reels.
        </p>
        <div className="tls-editorial-meta">
          <span className="tls-micro">
            <CalendarClock size={12} style={{ marginRight: 4 }} />
            1 session planifiee
          </span>
          <span className="tls-micro">
            <Star size={12} style={{ marginRight: 4 }} />
            Satisfaction moyenne 4.9/5
          </span>
          <span className="tls-micro">
            <Users size={12} style={{ marginRight: 4 }} />
            12 sessions realisees
          </span>
        </div>
      </section>

      <section className="feature-page__kpis">
        <div className="feature-page__kpi"><span>Session planifiee</span><strong>1</strong></div>
        <div className="feature-page__kpi"><span>Sessions realisees</span><strong>12</strong></div>
        <div className="feature-page__kpi"><span>Satisfaction moyenne</span><strong>4.9/5</strong></div>
      </section>

      <section className="feature-page__coaching-layout">
        <Card className="feature-page__coach-card feature-page__coach-card--sticky">
          <div className="feature-page__stack">
            <div className="feature-page__row">
              <h3>Votre coach</h3>
              <Badge variant="info">1:1</Badge>
            </div>
            <div className="feature-page__chips">
              <span className="feature-page__chip"><UserRound size={14} /> {coach.name}</span>
              <span className="feature-page__chip"><Star size={14} /> {coach.rating} / 5</span>
              <span className="feature-page__chip"><Users size={14} /> {coach.sessions} sessions</span>
            </div>
            <p className="feature-page__muted">{coach.role}</p>
            <p className="feature-page__muted">{coach.bio}</p>
            <div className="feature-page__stack">
              <a className="feature-page__link" href={`mailto:${coach.email}`}>
                <Mail size={14} />
                {coach.email}
              </a>
              <a className="feature-page__link" href={`https://${coach.linkedin}`} target="_blank" rel="noreferrer">
                <ExternalLink size={14} />
                LinkedIn
              </a>
            </div>
            <div className="tls-callout">
              <p style={{ marginTop: 0, marginBottom: 'var(--s-1)', fontWeight: 600 }}>Conseil preparation</p>
              <p className="tls-micro" style={{ marginBottom: 0 }}>
                Completez le questionnaire pre-session pour maximiser la valeur du rendez-vous.
              </p>
            </div>
          </div>
        </Card>

        <Card className="feature-page__upcoming-card" variant="interactive">
          <div className="feature-page__stack">
            <div className="feature-page__row">
              <h3>Prochaine session</h3>
              <Badge variant="success">Confirmee</Badge>
            </div>
            <p className="feature-page__muted">{upcoming.title}</p>
            <div className="feature-page__chips">
              <span className="feature-page__chip"><Calendar size={14} /> {upcoming.dateLabel}</span>
              <span className="feature-page__chip"><Clock3 size={14} /> {upcoming.hourLabel}</span>
              <span className="feature-page__chip"><Video size={14} /> Lien visio actif</span>
            </div>
            <div className="feature-page__actions-row">
              <Button>Rejoindre la session</Button>
              <Button variant="secondary">Reprogrammer</Button>
            </div>
          </div>
        </Card>
      </section>

      <section className="feature-page__stack">
        <div className="feature-page__row">
          <h2>Sessions passees</h2>
          <span className="feature-page__muted">{sessions.length} elements</span>
        </div>
        <div className="feature-page__stack">
          {sessions.map((session) => (
            <Card key={session.id} variant="interactive">
              <div className="feature-page__stack">
                <div className="feature-page__row">
                  <h3>{session.title}</h3>
                  <Badge variant={session.status === 'completed' ? 'success' : 'info'}>
                    {session.status === 'completed' ? 'Completee' : 'Planifiee'}
                  </Badge>
                </div>
                <p className="feature-page__muted">{session.description}</p>
                <div className="feature-page__chips">
                  <span className="feature-page__chip"><UserRound size={14} /> {session.coachName}</span>
                  <span className="feature-page__chip"><CalendarClock size={14} /> {session.dateLabel}</span>
                  <span className="feature-page__chip"><Clock3 size={14} /> {session.durationLabel}</span>
                </div>
                <div className="feature-page__actions-row">
                  {session.questionnaire && <Button variant="ghost" size="sm"><FileText size={14} /> Questionnaire</Button>}
                  {session.report && <Button variant="ghost" size="sm"><FileText size={14} /> Compte-rendu</Button>}
                  <Button variant="ghost" size="sm">
                    <Notebook size={14} />
                    {session.journal ? 'Voir ma note' : 'Ajouter une note'}
                  </Button>
                  <Button variant="secondary" size="sm">Ouvrir <ArrowRight size={14} /></Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
