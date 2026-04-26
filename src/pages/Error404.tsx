import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { Compass, Home, Search, LayoutGrid } from 'lucide-react';
import '../styles/figma-missing-pages.css';
import '../styles/static-pages.css';

/**
 * Static 404 — parity with figmamakedesignreact/src/app/pages/Error404Page.tsx
 */
export const Error404: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tls-error-page">
      <div className="tls-error-inner">
        <p className="tls-editorial-eyebrow">Navigation • Erreur</p>
        <div className="tls-error-code" aria-hidden="true">
          404
        </div>
        <div className="tls-error-icon-wrap">
          <Compass size={48} strokeWidth={1.5} />
        </div>
        <h1 className="tls-error-title">Page introuvable</h1>
        <p className="tls-error-desc">
          La page demandée n&apos;existe pas ou a été déplacée. Revenez au tableau de bord ou explorez les parcours.
        </p>
        <div className="tls-callout" style={{ textAlign: 'left', marginBottom: 'var(--s-6)' }}>
          <p style={{ marginTop: 0, marginBottom: 'var(--s-2)', fontWeight: 600 }}>Raccourcis utiles</p>
          <p className="tls-micro" style={{ marginBottom: 0 }}>
            Vous pouvez relancer votre parcours depuis l&apos;index des pages ou revenir au dashboard pour reprendre au
            bon endroit.
          </p>
        </div>
        <div className="tls-error-actions">
          <Button leadingIcon={<Home size={18} />} onClick={() => navigate('/dashboard')}>
            Tableau de bord
          </Button>
          <Button variant="secondary" leadingIcon={<Search size={18} />} onClick={() => navigate('/learning-paths')}>
            Parcours
          </Button>
          <Button variant="secondary" leadingIcon={<LayoutGrid size={18} />} onClick={() => navigate('/pages-index')}>
            Index des pages
          </Button>
        </div>
      </div>
    </div>
  );
};
