import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

export const Error500: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4 py-8 relative overflow-hidden font-body">
      <div className="relative max-w-[640px] w-full text-center">

        {/* Eyebrow */}
        <p className="font-body text-caption font-bold uppercase tracking-[0.06em] text-primary-700 inline-flex items-center gap-1.5 m-0 mb-6">
          Système • Incident
        </p>

        {/* Error code */}
        <div
          className="font-display font-bold bg-gradient-to-br from-danger-base to-secondary-500 bg-clip-text text-transparent tracking-[-0.04em] mb-6"
          style={{ fontSize: 'clamp(5rem, 18vw, 10rem)', lineHeight: 1 }}
          aria-hidden="true"
        >
          500
        </div>

        {/* Icon */}
        <div
          className="w-24 h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center border-2 border-secondary-200 bg-danger-bg text-danger-fg"
        >
          <AlertTriangle size={48} strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h1 className="font-display text-h1 font-semibold text-ink-900 m-0 mb-3">
          Erreur serveur
        </h1>

        {/* Description */}
        <p className="font-body text-body-lg text-ink-500 leading-relaxed m-0 mb-8">
          Une erreur technique s&apos;est produite. Vous pouvez réessayer ou retourner au tableau de bord.
        </p>

        {/* Callout */}
        <div
          className="rounded-xl border border-accent-200 p-5 text-left mb-6 flex flex-col gap-2"
          style={{ background: 'linear-gradient(135deg, rgba(248, 176, 68, 0.14), rgba(248, 176, 68, 0.04))' }}
        >
          <p className="font-body text-body-sm font-semibold text-ink-900 m-0">
            Diagnostic rapide (statique)
          </p>
          <p className="font-body text-caption text-ink-500 m-0">
            Code: 500 • Etat: notification équipe technique envoyée • Action recommandée: réessayer dans quelques
            instants.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center">
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
