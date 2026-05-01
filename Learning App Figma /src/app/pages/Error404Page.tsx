import { Home, Search, Beaker, Compass } from 'lucide-react';
import { BackgroundBlobs } from '../components/ui/background-blobs';

interface Error404PageProps {
  onNavigate: (page: 'dashboard' | 'parcours' | 'coaching' | 'learning-space' | 'profile' | 'veille' | 'entreprise-dashboard' | 'journal' | 'account' | 'test-lab') => void;
}

export default function Error404Page({ onNavigate }: Error404PageProps) {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <BackgroundBlobs />

      <div className="relative max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div 
          className="mb-8"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(6rem, 20vw, 12rem)',
            fontWeight: 'var(--font-weight-bold)',
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: '1',
            animation: 'float 3s ease-in-out infinite',
          }}
        >
          404
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div 
            className="w-24 h-24 rounded-3xl flex items-center justify-center"
            style={{
              background: 'rgba(85, 161, 180, 0.1)',
              border: '2px solid var(--primary-200)',
            }}
          >
            <Compass className="w-12 h-12" style={{ color: 'var(--primary)' }} />
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
          Page introuvable
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
          Oups ! La page que vous recherchez semble s'être égarée dans l'univers de l'apprentissage. 
          Mais ne vous inquiétez pas, nous allons vous ramener sur le bon chemin.
        </p>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('dashboard')}
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
            <Home className="w-5 h-5" />
            Retour au tableau de bord
          </button>

          <button
            onClick={() => onNavigate('parcours')}
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
            <Search className="w-5 h-5" />
            Explorer les parcours
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

        {/* Helpful links */}
        <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
          <p 
            className="mb-4"
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
            }}
          >
            Pages populaires :
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Parcours', page: 'parcours' as const },
              { label: 'Coaching', page: 'coaching' as const },
              { label: 'Journal', page: 'journal' as const },
              { label: 'Veille IA', page: 'veille' as const },
            ].map((link) => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className="px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                style={{
                  background: 'rgba(85, 161, 180, 0.1)',
                  border: '1px solid rgba(85, 161, 180, 0.2)',
                  color: 'var(--primary)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                {link.label}
              </button>
            ))}
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
