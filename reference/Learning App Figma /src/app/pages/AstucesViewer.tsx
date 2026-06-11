import { 
  X, 
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react';
import { useState } from 'react';
import imgImage from "figma:asset/e625c3a6a8f353a46dbb4a77fd385f7c7a72568b.png";
import imgImage1 from "figma:asset/a30891736d751bbdbb6126c20ce2674ea5c537a4.png";
import imgImage2 from "figma:asset/a3e7048f5ceb0ea136fc2c0f36823c087c8bd115.png";
import imgImage3 from "figma:asset/8d9e6534b3e629ac4559c36829d0d52458b58ec6.png";

interface AstucesViewerProps {
  contentId: number;
  onClose: () => void;
}

interface AstucesData {
  id: number;
  title: string;
  subtitle: string;
  tips: {
    id: number;
    number: number;
    title: string;
    description: string;
    image: string;
    badge: string;
  }[];
}

const getAstucesData = (id: number): AstucesData => {
  return {
    id,
    title: '💡 Astuces Pratiques',
    subtitle: 'Format scroll story pour astuces pratiques avec images',
    tips: [
      {
        id: 1,
        number: 1,
        title: 'Raccourcis Clavier',
        description: 'Gagnez du temps avec les raccourcis essentiels pour naviguer rapidement dans l\'application et optimiser votre workflow quotidien.',
        image: imgImage,
        badge: 'ASTUCE PRODUCTIVITÉ',
      },
      {
        id: 2,
        number: 2,
        title: 'Organisation des fichiers',
        description: 'Structurez vos projets avec une nomenclature claire et cohérente pour retrouver vos documents facilement et collaborer efficacement.',
        image: imgImage1,
        badge: 'ASTUCE ORGANISATION',
      },
      {
        id: 3,
        number: 3,
        title: 'Automatisation des tâches',
        description: 'Créez des templates réutilisables et des workflows automatisés pour gagner en efficacité et réduire les tâches répétitives.',
        image: imgImage2,
        badge: 'ASTUCE AUTOMATION',
      },
      {
        id: 4,
        number: 4,
        title: 'Collaboration en équipe',
        description: 'Utilisez les outils de partage et commentaires pour travailler efficacement avec votre équipe et maintenir une communication fluide.',
        image: imgImage3,
        badge: 'ASTUCE COLLABORATION',
      },
    ],
  };
};

export default function AstucesViewer({ 
  contentId, 
  onClose 
}: AstucesViewerProps) {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  
  const data = getAstucesData(contentId);
  const currentTip = data.tips[currentTipIndex];

  const handleNext = () => {
    if (currentTipIndex < data.tips.length - 1) {
      setCurrentTipIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentTipIndex > 0) {
      setCurrentTipIndex((prev) => prev - 1);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ 
        background: 'linear-gradient(176deg, rgb(232, 244, 247) 0%, rgb(255, 249, 238) 100%)',
      }}
    >
      <div className="min-h-screen py-8 px-8">
        <div className="max-w-4xl mx-auto pb-8">{/* pb-8 pour espace en bas */}
          {/* Header */}
          <div className="mb-8 flex items-start justify-between">
            <div className="flex-1">
              {/* Badge */}
              <div className="mb-4">
                <span 
                  className="px-3 py-1 rounded inline-block text-xs font-bold uppercase"
                  style={{
                    background: 'var(--accent)',
                    color: 'white',
                    letterSpacing: 'var(--tracking-wide)',
                  }}
                >
                  Astuces
                </span>
              </div>
              
              {/* Title */}
              <h1 
                className="mb-2"
                style={{ 
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                  fontFamily: 'var(--font-display)',
                  lineHeight: 'var(--leading-tight)',
                }}
              >
                {data.title}
              </h1>
              
              {/* Subtitle */}
              <p 
                style={{ 
                  fontSize: 'var(--text-sm)',
                  color: 'var(--muted-foreground)',
                }}
              >
                {data.subtitle}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/50 transition-colors"
            >
              <X className="w-6 h-6" style={{ color: 'var(--muted-foreground)' }} />
            </button>
          </div>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {data.tips.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTipIndex(index)}
                className="transition-all duration-300"
                style={{
                  width: index === currentTipIndex ? '40px' : '12px',
                  height: '12px',
                  borderRadius: '100px',
                  background: index === currentTipIndex 
                    ? 'var(--accent)' 
                    : 'var(--neutral-300)',
                }}
              />
            ))}
          </div>

          {/* Main Content Card */}
          <div 
            className="p-8 rounded-3xl mb-6 relative"
            style={{
              background: 'white',
              border: '3px solid var(--accent)',
              boxShadow: '0 8px 32px rgba(248, 176, 68, 0.2)',
            }}
          >
            {/* Number badge */}
            <div 
              className="absolute left-8 top-8 w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{
                background: 'var(--accent)',
              }}
            >
              <span 
                className="text-white"
                style={{ 
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-weight-bold)',
                }}
              >
                {currentTip.number}
              </span>
            </div>

            {/* Category badge */}
            <div className="mb-6 flex justify-end">
              <span 
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase"
                style={{
                  background: 'var(--accent)',
                  color: 'white',
                  letterSpacing: 'var(--tracking-wide)',
                }}
              >
                {currentTip.badge}
              </span>
            </div>

            {/* Image */}
            <div 
              className="rounded-2xl overflow-hidden mb-8"
              style={{ 
                height: '400px',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)',
              }}
            >
              <img 
                src={currentTip.image} 
                alt={currentTip.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title */}
            <h2 
              className="mb-4"
              style={{ 
                fontSize: 'var(--text-3xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--accent)',
                fontFamily: 'var(--font-display)',
              }}
            >
              {currentTip.title}
            </h2>

            {/* Description */}
            <p 
              style={{ 
                fontSize: 'var(--text-lg)',
                color: 'var(--foreground)',
                lineHeight: 'var(--leading-relaxed)',
              }}
            >
              {currentTip.description}
            </p>

            {/* Example list for first tip */}
            {currentTip.number === 1 && (
              <div className="mt-8 space-y-3">
                {[
                  'Ctrl+Shift+P : Ouvrir la palette de commandes',
                  'Ctrl+K : Recherche rapide de fichiers',
                  'Alt+Tab : Naviguer entre les fenêtres'
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-3 p-4 rounded-xl"
                    style={{
                      background: 'rgba(248, 176, 68, 0.1)',
                      border: '1px solid rgba(248, 176, 68, 0.3)',
                    }}
                  >
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--accent)' }}
                    >
                      <span 
                        className="text-white"
                        style={{ 
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-bold)',
                        }}
                      >
                        {idx + 1}
                      </span>
                    </div>
                    <p 
                      style={{ 
                        fontSize: 'var(--text-sm)',
                        color: 'var(--foreground)',
                      }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Example list for second tip */}
            {currentTip.number === 2 && (
              <div className="mt-8 space-y-3">
                {[
                  'Utilisez des dossiers par projet ou client',
                  'Nommez vos fichiers avec dates (YYYY-MM-DD)',
                  'Créez une structure logique et cohérente'
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-3 p-4 rounded-xl"
                    style={{
                      background: 'rgba(248, 176, 68, 0.1)',
                      border: '1px solid rgba(248, 176, 68, 0.3)',
                    }}
                  >
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--accent)' }}
                    >
                      <span 
                        className="text-white"
                        style={{ 
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-bold)',
                        }}
                      >
                        {idx + 1}
                      </span>
                    </div>
                    <p 
                      style={{ 
                        fontSize: 'var(--text-sm)',
                        color: 'var(--foreground)',
                      }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Example list for third tip */}
            {currentTip.number === 3 && (
              <div className="mt-8 space-y-3">
                {[
                  'Créez des templates pour vos documents récurrents',
                  'Utilisez des outils d\'automatisation (Zapier, Make)',
                  'Planifiez vos tâches répétitives'
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-3 p-4 rounded-xl"
                    style={{
                      background: 'rgba(248, 176, 68, 0.1)',
                      border: '1px solid rgba(248, 176, 68, 0.3)',
                    }}
                  >
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--accent)' }}
                    >
                      <span 
                        className="text-white"
                        style={{ 
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-bold)',
                        }}
                      >
                        {idx + 1}
                      </span>
                    </div>
                    <p 
                      style={{ 
                        fontSize: 'var(--text-sm)',
                        color: 'var(--foreground)',
                      }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Example list for fourth tip */}
            {currentTip.number === 4 && (
              <div className="mt-8 space-y-3">
                {[
                  'Utilisez les commentaires pour donner du feedback',
                  'Partagez vos documents avec des permissions adaptées',
                  'Organisez des points réguliers avec votre équipe'
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-3 p-4 rounded-xl"
                    style={{
                      background: 'rgba(248, 176, 68, 0.1)',
                      border: '1px solid rgba(248, 176, 68, 0.3)',
                    }}
                  >
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--accent)' }}
                    >
                      <span 
                        className="text-white"
                        style={{ 
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-bold)',
                        }}
                      >
                        {idx + 1}
                      </span>
                    </div>
                    <p 
                      style={{ 
                        fontSize: 'var(--text-sm)',
                        color: 'var(--foreground)',
                      }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div 
            className="p-6 rounded-2xl flex items-center justify-between"
            style={{
              background: 'white',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
            }}
          >
            <button
              onClick={handlePrevious}
              disabled={currentTipIndex === 0}
              className="px-5 py-2.5 rounded-xl flex items-center gap-2"
              style={{
                background: 'transparent',
                color: currentTipIndex === 0 ? 'var(--neutral-300)' : 'var(--muted-foreground)',
                opacity: currentTipIndex === 0 ? 0.4 : 1,
                cursor: currentTipIndex === 0 ? 'not-allowed' : 'pointer',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              <ChevronLeft className="w-4 h-4" />
              Précédent
            </button>

            <div 
              className="px-4 py-2 rounded-xl"
              style={{
                background: 'var(--neutral-100)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--foreground)',
              }}
            >
              {currentTipIndex + 1} / {data.tips.length}
            </div>

            {currentTipIndex < data.tips.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl flex items-center gap-2 hover:scale-105"
                style={{
                  background: 'var(--accent)',
                  color: 'white',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  boxShadow: '0 4px 12px rgba(248, 176, 68, 0.3)',
                }}
              >
                Suivant
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl flex items-center gap-2 hover:scale-105"
                style={{
                  background: 'var(--success)',
                  color: 'white',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
                }}
              >
                <Check className="w-4 h-4" />
                Terminer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}