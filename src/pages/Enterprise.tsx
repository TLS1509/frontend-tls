import React, { useState } from 'react';
import { Card, CardTitle, CardDesc, Button, Badge } from '../components';
import {
  Building2,
  Users,
  TrendingUp,
  Clock,
  BarChart2,
  Download,
  Mail,
  UserPlus,
  CheckCircle2,
  Circle,
  ChevronRight,
} from 'lucide-react';

/* ── Mock data ──────────────────────────────────────────────────────────── */

const TEAM_MEMBERS = [
  { name: 'Claire Dupont',  role: 'Manager',          progress: 82, lastActive: 'Aujourd\'hui' },
  { name: 'Marc Leroy',     role: 'Consultant Senior', progress: 67, lastActive: 'Hier' },
  { name: 'Julie Petit',    role: 'Analyste',          progress: 45, lastActive: 'Il y a 3 jours' },
  { name: 'Thomas Renaud',  role: 'Chef de projet',    progress: 91, lastActive: 'Aujourd\'hui' },
];

const ACCESS_USERS = [
  { name: 'Claire Dupont',  email: 'claire@entreprise.fr',  role: 'Admin',   status: 'active' },
  { name: 'Marc Leroy',     email: 'marc@entreprise.fr',    role: 'Membre',  status: 'active' },
  { name: 'Julie Petit',    email: 'julie@entreprise.fr',   role: 'Membre',  status: 'active' },
  { name: 'Sophie Martin',  email: 'sophie@entreprise.fr',  role: 'Invité',  status: 'pending' },
];

const REPORTS = [
  {
    title: 'Formation mensuelle',
    desc: 'Synthèse des heures de formation, modules suivis et taux de complétion par collaborateur.',
    icon: BarChart2,
    period: 'Avril 2026',
  },
  {
    title: 'Engagement équipe',
    desc: 'Analyse des connexions, interactions coaching et progression des compétences clés.',
    icon: TrendingUp,
    period: 'Q1 2026',
  },
];

/* ── Component ──────────────────────────────────────────────────────────── */

export const Enterprise: React.FC = () => {
  const [inviteOpen, setInviteOpen] = useState(false);

  return (
    <div className="tls-page">

      {/* ── Glass Hero ─────────────────────────────────────────────────── */}
      <section className="tls-editorial-hero">
        <div className="tls-row" style={{ alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--s-4)' }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <span className="tls-editorial-eyebrow">
              <Building2 size={13} />
              Tableau de bord entreprise
            </span>
            <h1 style={{ marginTop: 'var(--s-2)', marginBottom: 'var(--s-2)' }}>Espace Entreprise</h1>
            <p className="tls-editorial-summary">
              Pilotez la formation de votre équipe, gérez les accès et suivez les indicateurs clés
              en temps réel.
            </p>
          </div>
          <Badge variant="brand">Premium Enterprise</Badge>
        </div>

        {/* KPI pills */}
        <div className="tls-editorial-meta" style={{ gap: 'var(--s-3)', marginTop: 'var(--s-2)' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--s-2)',
              padding: 'var(--s-2) var(--s-4)',
              background: 'var(--glass-fill-strong)',
              border: '1px solid var(--overlay-brand-xs)',
              borderRadius: 'var(--r-pill)',
              fontWeight: 600,
              color: 'var(--tls-primary-700)',
              fontSize: 'var(--t-caption)',
              backdropFilter: 'var(--backdrop-blur-light)',
            }}
          >
            <Users size={14} />
            24 collaborateurs actifs
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--s-2)',
              padding: 'var(--s-2) var(--s-4)',
              background: 'var(--glass-fill-strong)',
              border: '1px solid var(--overlay-brand-xs)',
              borderRadius: 'var(--r-pill)',
              fontWeight: 600,
              color: 'var(--text)',
              fontSize: 'var(--t-caption)',
              backdropFilter: 'var(--backdrop-blur-light)',
            }}
          >
            <Clock size={14} />
            456 h de formation
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--s-2)',
              padding: 'var(--s-2) var(--s-4)',
              background: 'var(--glass-fill-strong)',
              border: '1px solid var(--overlay-brand-xs)',
              borderRadius: 'var(--r-pill)',
              fontWeight: 600,
              color: 'var(--text)',
              fontSize: 'var(--t-caption)',
              backdropFilter: 'var(--backdrop-blur-light)',
            }}
          >
            <TrendingUp size={14} />
            72 % complétion
          </span>
        </div>
      </section>

      {/* ── Tableau de bord équipe ────────────────────────────────────── */}
      <section>
        <h2 style={{ margin: '0 0 var(--s-4)', fontSize: 'var(--t-h3)', fontWeight: 700, letterSpacing: '-0.02em' }}>
          Tableau de bord équipe
        </h2>

        {/* Stat cards */}
        <div className="feature-page__kpis" style={{ marginBottom: 'var(--s-4)' }}>
          <div className="feature-page__kpi">
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--r-lg)',
                background: 'var(--tls-primary-50)',
                color: 'var(--tls-primary-600)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Users size={20} />
            </div>
            <strong>24</strong>
            <span>Collaborateurs inscrits</span>
          </div>
          <div className="feature-page__kpi">
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--r-lg)',
                background: 'var(--overlay-brand-sm)',
                color: 'var(--tls-primary-600)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TrendingUp size={20} />
            </div>
            <strong>72 %</strong>
            <span>Taux de complétion</span>
          </div>
          <div className="feature-page__kpi">
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--r-lg)',
                background: 'var(--overlay-warm-sm)',
                color: 'var(--tls-orange-600)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Clock size={20} />
            </div>
            <strong>18</strong>
            <span>Sessions coaching</span>
          </div>
        </div>

        {/* Team list */}
        <Card style={{ padding: 'var(--s-6)', display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
          <div className="tls-row">
            <CardTitle>Membres de l'équipe</CardTitle>
            <span style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
              4 collaborateurs
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
            {TEAM_MEMBERS.map((m) => (
              <div
                key={m.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--s-4)',
                  padding: 'var(--s-3) var(--s-4)',
                  borderRadius: 'var(--r-xl)',
                  border: '1px solid var(--border)',
                  background: 'var(--bg)',
                  transition: 'background var(--dur-1)',
                }}
              >
                {/* Avatar initials */}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'var(--tls-primary-100)',
                    color: 'var(--tls-primary-700)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 'var(--t-caption)',
                    flexShrink: 0,
                  }}
                >
                  {m.name.split(' ').map((w) => w[0]).join('')}
                </div>
                {/* Name + role */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 'var(--t-body-sm)', color: 'var(--text)' }}>
                    {m.name}
                  </p>
                  <p style={{ margin: 0, fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
                    {m.role}
                  </p>
                </div>
                {/* Progress bar */}
                <div style={{ flex: 1, minWidth: 100, maxWidth: 180 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Progression</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--tls-primary-700)' }}>
                      {m.progress} %
                    </span>
                  </div>
                  <div
                    style={{
                      height: 6,
                      borderRadius: 'var(--r-pill)',
                      background: 'var(--tls-primary-100)',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${m.progress}%`,
                        height: '100%',
                        borderRadius: 'inherit',
                        background: 'linear-gradient(90deg, var(--tls-primary-400), var(--tls-primary-600))',
                        transition: 'width var(--dur-3)',
                      }}
                    />
                  </div>
                </div>
                {/* Last active */}
                <span
                  style={{
                    fontSize: 'var(--t-caption)',
                    color: 'var(--text-muted)',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {m.lastActive}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* ── Gestion des accès ─────────────────────────────────────────── */}
      <section>
        <div className="tls-row" style={{ marginBottom: 'var(--s-4)' }}>
          <h2 style={{ margin: 0, fontSize: 'var(--t-h3)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Gestion des accès
          </h2>
          <Button
            variant="primary"
            size="sm"
            leadingIcon={<UserPlus size={15} />}
            onClick={() => setInviteOpen((v) => !v)}
          >
            Inviter un collaborateur
          </Button>
        </div>

        {/* Invite form (inline toggle) */}
        {inviteOpen && (
          <Card
            style={{
              padding: 'var(--s-5)',
              marginBottom: 'var(--s-4)',
              border: '1px solid var(--overlay-brand-xl)',
              background: 'var(--g-glass-brand)',
            }}
          >
            <CardTitle style={{ marginBottom: 'var(--s-3)' }}>Inviter un nouveau collaborateur</CardTitle>
            <div style={{ display: 'flex', gap: 'var(--s-3)', flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div className="tls-field" style={{ flex: 1, minWidth: 200 }}>
                <label htmlFor="invite-email">Adresse e-mail</label>
                <input id="invite-email" type="email" placeholder="prenom.nom@entreprise.fr" />
              </div>
              <div className="tls-field" style={{ minWidth: 140 }}>
                <label htmlFor="invite-role">Rôle</label>
                <select
                  id="invite-role"
                  style={{
                    border: '1px solid var(--border-strong)',
                    borderRadius: 'var(--r-md)',
                    background: 'var(--surface)',
                    color: 'var(--text)',
                    padding: 'var(--s-3) var(--s-4)',
                    font: 'inherit',
                  }}
                >
                  <option>Membre</option>
                  <option>Admin</option>
                </select>
              </div>
              <Button variant="primary" size="sm">Envoyer l'invitation</Button>
              <Button variant="ghost" size="sm" onClick={() => setInviteOpen(false)}>Annuler</Button>
            </div>
          </Card>
        )}

        {/* User rows */}
        <Card style={{ padding: 'var(--s-6)', display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
          {ACCESS_USERS.map((u) => (
            <div
              key={u.email}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--s-4)',
                padding: 'var(--s-3) var(--s-4)',
                borderRadius: 'var(--r-xl)',
                border: '1px solid var(--border)',
                background: 'var(--bg)',
                flexWrap: 'wrap',
              }}
            >
              {/* Status icon */}
              <div style={{ flexShrink: 0 }}>
                {u.status === 'active' ? (
                  <CheckCircle2 size={18} style={{ color: 'var(--tls-primary-500)' }} />
                ) : (
                  <Circle size={18} style={{ color: 'var(--text-muted)' }} />
                )}
              </div>
              {/* Name + email */}
              <div style={{ flex: 1, minWidth: 160 }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 'var(--t-body-sm)', color: 'var(--text)' }}>
                  {u.name}
                </p>
                <p style={{ margin: 0, fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
                  {u.email}
                </p>
              </div>
              {/* Role badge */}
              <Badge
                variant={u.role === 'Admin' ? 'brand' : u.role === 'Invité' ? 'warm' : 'neutral'}
              >
                {u.role}
              </Badge>
              {/* Status badge */}
              <Badge variant={u.status === 'active' ? 'success' : 'warm'}>
                {u.status === 'active' ? 'Actif' : 'En attente'}
              </Badge>
              {/* Action */}
              <Button variant="ghost" size="sm" leadingIcon={<Mail size={14} />}>
                {u.status === 'pending' ? 'Renvoyer' : 'Contacter'}
              </Button>
            </div>
          ))}
        </Card>
      </section>

      {/* ── Rapports ──────────────────────────────────────────────────── */}
      <section>
        <h2 style={{ margin: '0 0 var(--s-4)', fontSize: 'var(--t-h3)', fontWeight: 700, letterSpacing: '-0.02em' }}>
          Rapports
        </h2>
        <div className="feature-page__grid">
          {REPORTS.map((r) => {
            const Icon = r.icon;
            return (
              <Card
                key={r.title}
                style={{
                  padding: 'var(--s-6)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--s-4)',
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform var(--dur-2), box-shadow var(--dur-2)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--s-4)' }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 'var(--r-lg)',
                      background: 'var(--tls-primary-50)',
                      color: 'var(--tls-primary-600)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <div>
                    <CardTitle style={{ marginBottom: 'var(--s-1)' }}>{r.title}</CardTitle>
                    <Badge variant="neutral">{r.period}</Badge>
                  </div>
                </div>
                <CardDesc>{r.desc}</CardDesc>
                <div style={{ marginTop: 'auto', display: 'flex', gap: 'var(--s-2)' }}>
                  <Button variant="secondary" size="sm" leadingIcon={<Download size={14} />}>
                    Télécharger
                  </Button>
                  <Button variant="ghost" size="sm" leadingIcon={<ChevronRight size={14} />}>
                    Aperçu
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

    </div>
  );
};
