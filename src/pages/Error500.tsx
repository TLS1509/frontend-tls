import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

/**
 * Static 500 — parity with figmamakedesignreact/src/app/pages/Error500Page.tsx
 */
export const Error500: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tls-error-page">
      <div className="tls-error-inner">
        <p className="tls-editorial-eyebrow">Système • Incident</p>
        <div className="tls-error-code tls-error-code--danger" aria-hidden="true">
          500
        </div>
        <div className="tls-error-icon-wrap tls-error-icon-wrap--danger">
          <AlertTriangle size={48} strokeWidth={1.5} />
        </div>
        <h1 className="tls-error-title">Erreur serveur</h1>
        <p className="tls-error-desc">
          Une erreur technique s&apos;est produite. Vous pouvez réessayer ou retourner au tableau de bord.
        </p>
        <div className="tls-callout" style={{ textAlign: 'left', marginBottom: 'var(--s-6)' }}>
          <p style={{ marginTop: 0, marginBottom: 'var(--s-2)', fontWeight: 600 }}>Diagnostic rapide (statique)</p>
          <p className="tls-micro" style={{ marginBottom: 0 }}>
            Code: 500 • Etat: notification équipe technique envoyée • Action recommandée: réessayer dans quelques
            instants.
          </p>
        </div>
        <div className="tls-error-actions">
          <Button leadingIcon={<RefreshCw size={18} />} onClick={() => window.location.reload()}>
            Réessayer
          </Button>
          <Button variant="secondary" leadingIcon={<Home size={18} />} onClick={() => navigate('/dashboard')}>
            Tableau de bord
          </Button>
        </div>
      </div>
    </div>
  );
};
