import React, { useState } from 'react';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import {
  Building2,
  Users,
  TrendingUp,
  Clock,
  Shield,
  Mail,
  Sparkles,
} from 'lucide-react';
import '../styles/static-pages.css';
import '../styles/static-pages.css';
import '../styles/figma-missing-pages.css';

type EnterpriseTab = 'overview' | 'users' | 'settings';

const MOCK_MEMBERS = [
  { name: 'Claire Dupont', email: 'claire@entreprise.fr', role: 'Manager', status: 'active' as const },
  { name: 'Marc Leroy', email: 'marc@entreprise.fr', role: 'Membre', status: 'active' as const },
  { name: 'Julie Petit', email: 'julie@entreprise.fr', role: 'Membre', status: 'invited' as const },
];

/**
 * Entreprise — static shell aligned with figmamakedesignreact EntreprisePageComplete (simplified)
 */
export const Enterprise: React.FC = () => {
  const [tab, setTab] = useState<EnterpriseTab>('overview');

  return (
    <div className="tls-page">
      <section className="tls-editorial-hero">
        <div className="tls-row" style={{ alignItems: 'flex-start' }}>
          <div>
            <h1>
              <Building2 size={22} style={{ verticalAlign: 'middle', marginRight: 8 }} />
              Espace entreprise
            </h1>
            <p className="tls-editorial-summary">Vue admin synthetique : KPI, equipe, parametres et pilotage des licences (donnees statiques pour design).</p>
          </div>
          <Badge variant="brand">Premium Enterprise</Badge>
        </div>
        <div className="tls-editorial-meta">
          <span><Sparkles size={12} /> 24 utilisateurs actifs</span>
          <span><Clock size={12} /> Suivi hebdomadaire</span>
        </div>
      </section>

      <div className="enterprise-tabs" role="tablist" aria-label="Sections entreprise">
        {(
          [
            { id: 'overview' as const, label: "Vue d'ensemble" },
            { id: 'users' as const, label: 'Équipe' },
            { id: 'settings' as const, label: 'Paramètres' },
          ] as const
        ).map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            data-active={tab === id ? 'true' : 'false'}
            className="enterprise-tab"
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <>
          <section className="enterprise-kpi-row">
            <div className="tls-kpi">
              <div className="tls-kpi-icon" style={{ background: 'var(--tls-primary-50)', color: 'var(--tls-primary-600)', marginBottom: 'var(--s-2)' }}>
                <Users size={20} />
              </div>
              <strong style={{ color: 'var(--tls-primary-700)' }}>24</strong>
              <span>Utilisateurs actifs</span>
            </div>
            <div className="tls-kpi">
              <div className="tls-kpi-icon" style={{ background: 'rgba(237,132,58,0.1)', color: 'var(--tls-orange-600)', marginBottom: 'var(--s-2)' }}>
                <TrendingUp size={20} />
              </div>
              <strong style={{ color: 'var(--tls-orange-600)' }}>456 h</strong>
              <span>Heures cumulées</span>
            </div>
            <div className="tls-kpi">
              <div className="tls-kpi-icon" style={{ background: 'rgba(234,192,74,0.12)', color: 'var(--tls-yellow-600)', marginBottom: 'var(--s-2)' }}>
                <Shield size={20} />
              </div>
              <strong style={{ color: 'var(--tls-yellow-600)' }}>72%</strong>
              <span>Complétion moyenne</span>
            </div>
          </section>
          <Card className="tls-section-card">
            <h3>
              <TrendingUp size={16} /> Activité récente
            </h3>
            <p className="tls-muted">Graphiques et exports seront branchés sur l&apos;API entreprise.</p>
            <div className="tls-placeholder-media" style={{ minHeight: 160 }}>
              Zone graphique (placeholder)
            </div>
          </Card>
        </>
      )}

      {tab === 'users' && (
        <Card className="tls-section-card">
          <div className="tls-row">
            <h3>
              <Users size={16} /> Membres
            </h3>
            <Button size="sm" variant="secondary">
              Inviter
            </Button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_MEMBERS.map((m) => (
                  <tr key={m.email}>
                    <td>{m.name}</td>
                    <td>{m.email}</td>
                    <td>{m.role}</td>
                    <td>{m.status === 'invited' ? 'Invité' : 'Actif'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === 'settings' && (
        <section className="tls-grid">
          <Card className="tls-section-card">
            <h3>
              <Shield size={16} /> Sécurité
            </h3>
            <p className="tls-muted">SSO, domaine vérifié, politique de mot de passe.</p>
            <Button size="sm" variant="secondary">
              Configurer
            </Button>
          </Card>
          <Card className="tls-section-card">
            <h3>
              <Mail size={16} /> Facturation
            </h3>
            <p className="tls-muted">Licences, renouvellement, contacts facturation.</p>
            <Button size="sm" variant="secondary">
              Voir
            </Button>
          </Card>
          <Card className="tls-section-card">
            <h3>
              <Clock size={16} /> Rétention des données
            </h3>
            <p className="tls-muted">Durées de conservation et export RGPD.</p>
            <Button size="sm" variant="secondary">
              Politique
            </Button>
          </Card>
        </section>
      )}
    </div>
  );
};
