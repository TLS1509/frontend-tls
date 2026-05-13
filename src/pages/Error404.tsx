import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { Compass, Home, Search, Zap, HelpCircle } from 'lucide-react';

export const Error404: React.FC = () => {
  const navigate = useNavigate();

  const suggestions = [
    {
      icon: <Home size={20} />,
      title: 'Tableau de bord',
      desc: "Retourner à votre espace personnel",
      action: () => navigate('/dashboard'),
      iconBgClass: 'bg-primary-50',
      iconColorClass: 'text-primary-600',
    },
    {
      icon: <Search size={20} />,
      title: 'Parcours disponibles',
      desc: "Explorer tous les cursus d'apprentissage",
      action: () => navigate('/learning-paths'),
      iconBgClass: 'bg-accent-50',
      iconColorClass: 'text-accent-500',
    },
    {
      icon: <Zap size={20} />,
      title: 'Veille & Ressources',
      desc: 'Découvrir vidéos et contenus récents',
      action: () => navigate('/veille'),
      iconBgClass: 'bg-secondary-50',
      iconColorClass: 'text-secondary-500',
    },
    {
      icon: <HelpCircle size={20} />,
      title: 'Support & Questions',
      desc: "Contacter notre équipe d'assistance",
      action: () => navigate('/messages'),
      iconBgClass: 'bg-primary-50',
      iconColorClass: 'text-primary-600',
    },
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 font-body">

      {/* Hero */}
      <div className="text-center max-w-[520px] mb-12 flex flex-col items-center">

        {/* Compass icon */}
        <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-200 flex items-center justify-center mx-auto mb-8 text-primary-600 shadow-md">
          <Compass size={56} strokeWidth={1.5} />
        </div>

        {/* 404 gradient number */}
        <div
          className="font-display font-black bg-clip-text text-transparent bg-gradient-to-br from-primary-300 to-secondary-200 mb-4 tracking-tight"
          style={{ fontSize: 'clamp(4rem, 10vw, 6rem)', lineHeight: 1 }}
          aria-hidden="true"
        >
          404
        </div>

        <h1 className="font-display text-h2 font-bold text-ink-900 m-0 mb-3">
          Oups, page non trouvée
        </h1>
        <p className="font-body text-body text-ink-500 m-0 mb-8 leading-relaxed">
          La page demandée n&apos;existe pas ou a été déplacée. Pas de problème, nous vous proposons ces raccourcis utiles.
        </p>
      </div>

      {/* Suggestion grid */}
      <div className="grid gap-6 w-full max-w-[960px] mb-10" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        {suggestions.map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={item.action}
            className="flex flex-col items-start gap-3 p-5 rounded-xl border border-ink-200 bg-white cursor-pointer text-left shadow-sm hover:border-primary-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          >
            <div className={['w-10 h-10 rounded-lg flex items-center justify-center', item.iconBgClass, item.iconColorClass].join(' ')}>
              {item.icon}
            </div>
            <div>
              <h3 className="font-body text-body-sm font-bold text-ink-900 m-0 mb-1">{item.title}</h3>
              <p className="font-body text-caption text-ink-500 m-0 leading-relaxed">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Primary CTA */}
      <Button onClick={() => navigate('/dashboard')} leadingIcon={<Home size={16} />}>
        Retour au tableau de bord
      </Button>
    </div>
  );
};
