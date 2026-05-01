import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { Compass, Home, Search, LayoutGrid, Zap, HelpCircle } from 'lucide-react';
import '../styles/figma-missing-pages.css';
import '../styles/static-pages.css';

/**
 * Static 404 — Learner-centric with friendly illustration and suggested next steps
 */
export const Error404: React.FC = () => {
  const navigate = useNavigate();

  const suggestions = [
    {
      icon: <Home size={20} />,
      title: 'Tableau de bord',
      desc: 'Retourner à votre espace personnel',
      action: () => navigate('/dashboard'),
      variant: 'primary',
    },
    {
      icon: <Search size={20} />,
      title: 'Parcours disponibles',
      desc: 'Explorer tous les cursus d\'apprentissage',
      action: () => navigate('/learning-paths'),
      variant: 'secondary',
    },
    {
      icon: <Zap size={20} />,
      title: 'Veille & Ressources',
      desc: 'Découvrir vidéos et contenus récents',
      action: () => navigate('/veille'),
      variant: 'secondary',
    },
    {
      icon: <HelpCircle size={20} />,
      title: 'Support & Questions',
      desc: 'Contacter notre équipe d\'assistance',
      action: () => navigate('/messages'),
      variant: 'secondary',
    },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--s-6)',
      }}
    >
      {/* Hero section */}
      <div
        style={{
          textAlign: 'center',
          maxWidth: '520px',
          marginBottom: 'var(--s-12)',
        }}
      >
        {/* Large icon with gradient background */}
        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--tls-primary-50) 0%, var(--tls-orange-50) 100%)',
            border: '2px solid var(--tls-primary-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto var(--s-8)',
            color: 'var(--tls-primary-600)',
            boxShadow: 'var(--shadow-md), 0 12px 32px rgba(85,161,180,0.2)',
            transition: 'all var(--dur-2)'
          }}
        >
          <Compass size={56} strokeWidth={1.5} />
        </div>

        {/* Error code */}
        <div
          style={{
            fontSize: 'clamp(4rem, 10vw, 6rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, var(--tls-primary-300), var(--tls-orange-200))',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            margin: '0 0 var(--s-4) 0',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          404
        </div>

        <h1
          style={{
            fontSize: 'var(--t-h2)',
            fontWeight: 700,
            color: 'var(--text)',
            margin: '0 0 var(--s-3) 0',
          }}
        >
          Oups, page non trouvée
        </h1>

        <p
          style={{
            fontSize: 'var(--t-body)',
            color: 'var(--text-muted)',
            margin: '0 0 var(--s-8) 0',
            lineHeight: 1.6,
          }}
        >
          La page demandée n&apos;existe pas ou a été déplacée. Pas de problème, nous vous proposons ces raccourcis utiles.
        </p>
      </div>

      {/* Suggested next steps — 2x2 grid on desktop, single column mobile */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'var(--s-6)',
          width: '100%',
          maxWidth: '960px',
          marginBottom: 'var(--s-10)',
        }}
      >
        {suggestions.map((item, idx) => (
          <button
            key={idx}
            onClick={item.action}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 'var(--s-3)',
              padding: 'var(--s-5)',
              borderRadius: 'var(--r-xl)',
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              cursor: 'pointer',
              transition: 'all var(--dur-2)',
              textAlign: 'left',
              fontFamily: 'inherit',
              boxShadow: 'var(--shadow-sm)'
            }}
            onMouseEnter={(e) => {
              const card = e.currentTarget as HTMLButtonElement;
              card.style.borderColor = 'var(--tls-primary-300)';
              card.style.boxShadow = 'var(--shadow-lg)';
              card.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              const card = e.currentTarget as HTMLButtonElement;
              card.style.borderColor = 'var(--border)';
              card.style.boxShadow = 'var(--shadow-sm)';
              card.style.transform = 'translateY(0)';
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--r-lg)',
                background: idx === 0 ? 'var(--tls-primary-50)' : idx === 1 ? 'var(--tls-yellow-50)' : idx === 2 ? 'var(--tls-orange-50)' : 'rgba(85,161,180,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: idx === 0 ? 'var(--tls-primary-600)' : idx === 1 ? 'var(--tls-yellow-600)' : idx === 2 ? 'var(--tls-orange-600)' : 'var(--tls-primary-600)',
              }}
            >
              {item.icon}
            </div>
            <div>
              <h3
                style={{
                  margin: '0 0 var(--s-1) 0',
                  fontSize: 'var(--t-body-sm)',
                  fontWeight: 700,
                  color: 'var(--text)',
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 'var(--t-caption)',
                  color: 'var(--text-muted)',
                  lineHeight: 1.5,
                }}
              >
                {item.desc}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Primary action */}
      <Button onClick={() => navigate('/dashboard')} leadingIcon={<Home size={16} />}>
        Retour au tableau de bord
      </Button>
    </div>
  );
};
