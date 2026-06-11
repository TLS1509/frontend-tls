import { Home, RefreshCw, Beaker, AlertTriangle } from 'lucide-react';
import { BackgroundBlobs } from '../components/ui/background-blobs';

interface Error500PageProps {
  onNavigate: (page: 'dashboard' | 'test-lab') => void;
}

export default function Error500Page({ onNavigate }: Error500PageProps) {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <BackgroundBlobs />

      <div className="relative max-w-2xl w-full text-center">
        {/* 500 Number */}
        <div 
          className="mb-8"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(6rem, 20vw, 12rem)',
            fontWeight: 'var(--font-weight-bold)',
            background: 'linear-gradient(135deg, var(--destructive), var(--secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: '1',
            animation: 'float 3s ease-in-out infinite',
          }}
        >
          500
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div 
            className="w-24 h-24 rounded-3xl flex items-center justify-center"
            style={{
              background: 'rgba(220, 38, 38, 0.1)',
              border: '2px solid rgba(220, 38, 38, 0.3)',
            }}
          >
            <AlertTriangle className="w-12 h-12" style={{ color: 'var(--destructive)' }} />
          </div>
        </div>

        {/* Title */}
        <h1 
          className="mb-4"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-3xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--foreground)',
          }}
        >
          Erreur serveur
        </h1>

        {/* Message */}
        <p 
          className="mb-8"
          style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--muted-foreground)',
            lineHeight: '1.6',
          }}
        >
          Une erreur technique s'est produite sur nos serveurs. 
          Notre équipe a été automatiquement notifiée et travaille à résoudre le problème.
        </p>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
            style={{
              background: 'var(--gradient-primary)',
              color: 'white',
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-semibold)',
              boxShadow: '0 8px 24px rgba(85, 161, 180, 0.3)',
            }}
          >
            <RefreshCw className="w-5 h-5" />
            Réessayer
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--border)',
              color: 'var(--foreground)',
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-semibold)',
            }}
          >
            <Home className="w-5 h-5" />
            Retour au tableau de bord
          </button>

          <button
            onClick={() => onNavigate('test-lab')}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--border)',
              color: 'var(--foreground)',
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-semibold)',
            }}
          >
            <Beaker className="w-5 h-5" />
            Retour au Test Lab
          </button>
        </div>

        {/* Technical Details */}
        <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
          <div 
            className="p-6 rounded-2xl text-left"
            style={{
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--border)',
            }}
          >
            <h3 
              className="mb-3"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--foreground)',
              }}
            >
              Détails techniques
            </h3>
            <div 
              className="space-y-2"
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--muted-foreground)',
                fontFamily: 'monospace',
              }}
            >
              <p><strong>Code :</strong> 500 Internal Server Error</p>
              <p><strong>Timestamp :</strong> {new Date().toLocaleString('fr-FR')}</p>
              <p><strong>Status :</strong> L'équipe technique a été notifiée</p>
            </div>
          </div>

          {/* Support Card */}
          <div 
            className="mt-6 p-6 rounded-2xl"
            style={{
              background: 'rgba(85, 161, 180, 0.1)',
              border: '1px solid var(--primary-200)',
            }}
          >
            <p 
              className="mb-3"
              style={{
                fontSize: 'var(--text-base)',
                color: 'var(--foreground)',
                fontWeight: 'var(--font-weight-semibold)',
              }}
            >
              Besoin d'aide ?
            </p>
            <p 
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--muted-foreground)',
                marginBottom: '1rem',
              }}
            >
              Si le problème persiste, contactez notre équipe support
            </p>
            <a
              href="mailto:support@thelearningapp.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
              style={{
                background: 'var(--primary)',
                color: 'white',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                textDecoration: 'none',
              }}
            >
              📧 Contacter le support
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
