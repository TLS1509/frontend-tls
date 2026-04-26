/**
 * Profile Page - User profile and settings
 */

import React, { useMemo, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Card } from '../components/core/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/core/Button';
import {
  Mail,
  ShieldCheck,
  UserRound,
  MapPin,
  Calendar,
  Flame,
  Trophy,
  Clock3,
  BookOpen,
  TrendingUp,
  Award,
  Star,
  Zap,
} from 'lucide-react';
import '../styles/feature-pages-modern.css';
import '../styles/static-pages.css';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'badges' | 'skills'>('overview');

  const recentActivity = useMemo(
    () => [
      { id: 'a1', title: 'Lecon completee: Prompt Engineering', date: "Aujourd'hui", tone: 'success' as const },
      { id: 'a2', title: 'Session coaching terminee', date: 'Hier', tone: 'info' as const },
      { id: 'a3', title: 'Badge Expert GPT debloque', date: 'Il y a 2 jours', tone: 'warm' as const },
    ],
    []
  );

  const badges = useMemo(
    () => [
      { id: 'b1', label: 'Pionnier IA', variant: 'sun' as const },
      { id: 'b2', label: 'Streak Master', variant: 'warm' as const },
      { id: 'b3', label: 'Expert GPT', variant: 'info' as const },
      { id: 'b4', label: 'Mentor', variant: 'neutral' as const },
    ],
    []
  );

  const skills = useMemo(
    () => [
      { id: 's1', label: 'Prompt Engineering', value: 95 },
      { id: 's2', label: 'IA Generative', value: 88 },
      { id: 's3', label: 'Pedagogie', value: 92 },
      { id: 's4', label: 'Veille Technologique', value: 85 },
    ],
    []
  );

  return (
    <div className="feature-page">
      <section className="tls-editorial-hero">
        <p className="tls-editorial-eyebrow">Account • Profil</p>
        <h1 style={{ margin: 0 }}>Profil utilisateur</h1>
        <p className="tls-editorial-summary">
          Vue complete de votre progression, vos badges et vos informations de compte.
        </p>
        <div className="tls-editorial-meta">
          <span className="tls-micro">
            <BookOpen size={12} style={{ marginRight: 4 }} />
            12 cours termines
          </span>
          <span className="tls-micro">
            <Clock3 size={12} style={{ marginRight: 4 }} />
            86h d apprentissage
          </span>
          <span className="tls-micro">
            <Flame size={12} style={{ marginRight: 4 }} />
            Streak 7 jours
          </span>
        </div>
      </section>

      {user && (
        <>
          <Card className="feature-page__profile-summary">
            <div className="feature-page__row">
              <div className="feature-page__stack">
                <h2>{user.name}</h2>
                <p className="feature-page__muted">{user.email}</p>
              </div>
              <Badge variant="sun">Niveau 12</Badge>
            </div>
            <div className="feature-page__chips">
              <span className="feature-page__chip"><Mail size={14} /> {user.email}</span>
              <span className="feature-page__chip"><MapPin size={14} /> Paris, France</span>
              <span className="feature-page__chip"><Calendar size={14} /> Membre depuis janvier 2024</span>
            </div>
            <p className="feature-page__muted">
              Passionne par l'IA generative et la pedagogie innovante. Focus sur les parcours a impact operationnel.
            </p>
          </Card>

          <section className="feature-page__kpis">
            <div className="feature-page__kpi"><span>Cours termines</span><strong><BookOpen size={16} /> 12</strong></div>
            <div className="feature-page__kpi"><span>Temps appris</span><strong><Clock3 size={16} /> 86h</strong></div>
            <div className="feature-page__kpi"><span>Streak</span><strong><Flame size={16} /> 7 jours</strong></div>
          </section>

          <section className="feature-page__tabs" role="tablist" aria-label="Sections du profil">
            <button
              type="button"
              className="feature-page__tab"
              data-active={activeTab === 'overview' ? 'true' : 'false'}
              onClick={() => setActiveTab('overview')}
            >
              <Trophy size={14} />
              Vue d'ensemble
            </button>
            <button
              type="button"
              className="feature-page__tab"
              data-active={activeTab === 'activity' ? 'true' : 'false'}
              onClick={() => setActiveTab('activity')}
            >
              <TrendingUp size={14} />
              Activite recente
            </button>
            <button
              type="button"
              className="feature-page__tab"
              data-active={activeTab === 'badges' ? 'true' : 'false'}
              onClick={() => setActiveTab('badges')}
            >
              <Award size={14} />
              Badges
            </button>
            <button
              type="button"
              className="feature-page__tab"
              data-active={activeTab === 'skills' ? 'true' : 'false'}
              onClick={() => setActiveTab('skills')}
            >
              <Zap size={14} />
              Competences
            </button>
          </section>

          {activeTab === 'overview' && (
            <section className="feature-page__grid">
              <Card variant="interactive">
                <div className="feature-page__stack">
                  <div className="feature-page__row">
                    <h3>Informations</h3>
                    <Button size="sm" variant="ghost">Modifier</Button>
                  </div>
                  <div className="feature-page__chips">
                    <span className="feature-page__chip"><UserRound size={14} /> {user.name}</span>
                    <span className="feature-page__chip"><Mail size={14} /> {user.email}</span>
                    <span className="feature-page__chip"><ShieldCheck size={14} /> ID {user.id}</span>
                  </div>
                  <div className="feature-page__chips">
                    <span className="feature-page__chip"><TrendingUp size={14} /> Top 5% apprenants IA</span>
                    <span className="feature-page__chip"><Trophy size={14} /> 2450 points XP</span>
                  </div>
                </div>
              </Card>

              <Card variant="interactive">
                <div className="feature-page__stack">
                  <h3>Roles</h3>
                  <div className="feature-page__chips">
                    {user.roles?.map((role: string) => (
                      <Badge key={role} variant="neutral">{role}</Badge>
                    ))}
                  </div>
                  <div className="feature-page__chips">
                    <Badge variant="success"><Award size={12} /> Badge Expert GPT</Badge>
                    <Badge variant="warm"><Star size={12} /> Pionnier IA</Badge>
                  </div>
                  <Button>Modifier le profil</Button>
                </div>
              </Card>

              <div className="tls-callout" style={{ gridColumn: '1 / -1' }}>
                <p style={{ marginTop: 0, marginBottom: 'var(--s-1)', fontWeight: 600 }}>Focus recommande</p>
                <p className="tls-micro" style={{ marginBottom: 0 }}>
                  Prioriser les modules IA Generative et Prompt Engineering pour atteindre le prochain palier.
                </p>
              </div>
            </section>
          )}

          {activeTab === 'activity' && (
            <section className="feature-page__stack">
              {recentActivity.map((item) => (
                <Card key={item.id} variant="interactive">
                  <div className="feature-page__row">
                    <div className="feature-page__stack">
                      <h3>{item.title}</h3>
                      <p className="feature-page__muted">{item.date}</p>
                    </div>
                    <Badge variant={item.tone}>{item.tone}</Badge>
                  </div>
                </Card>
              ))}
            </section>
          )}

          {activeTab === 'badges' && (
            <section className="feature-page__grid">
              {badges.map((badge) => (
                <Card key={badge.id} variant="interactive">
                  <div className="feature-page__stack">
                    <Badge variant={badge.variant}>{badge.label}</Badge>
                    <p className="feature-page__muted">Debloque durant votre progression recente.</p>
                  </div>
                </Card>
              ))}
            </section>
          )}

          {activeTab === 'skills' && (
            <section className="feature-page__stack">
              {skills.map((skill) => (
                <Card key={skill.id} variant="interactive">
                  <div className="feature-page__stack">
                    <div className="feature-page__row">
                      <h3>{skill.label}</h3>
                      <strong>{skill.value}%</strong>
                    </div>
                    <div className="feature-page__skill-track">
                      <span style={{ width: `${skill.value}%` }} />
                    </div>
                  </div>
                </Card>
              ))}
            </section>
          )}
        </>
      )}
    </div>
  );
};
