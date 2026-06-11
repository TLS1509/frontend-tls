import { Bot, Sparkles } from 'lucide-react';

interface HelpButtonProps {
  onClick: () => void;
}

export function HelpButton({ onClick }: HelpButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        style={{
          background: 'var(--primary)',
          boxShadow: '0 8px 32px rgba(85, 161, 180, 0.4)',
          animation: 'pulse-slow 3s ease-in-out infinite',
        }}
        aria-label="Ouvrir l'assistant"
      >
        <Bot className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
        
        {/* Notification badge */}
        <div
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
          style={{
            background: 'var(--gradient-accent)',
            boxShadow: '0 2px 8px rgba(248, 176, 68, 0.4)',
          }}
        >
          <Sparkles className="w-3 h-3 text-white" />
        </div>
        
        {/* Tooltip */}
        <div 
          className="absolute right-full mr-3 px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          style={{
            background: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-weight-medium)',
          }}
        >
          💬 Besoin d'aide ?
        </div>

        {/* Glow ring */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            border: '2px solid rgba(255, 255, 255, 0.5)',
            animation: 'ping-slow 3s ease-out infinite',
          }}
        />
      </button>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 8px 32px rgba(85, 161, 180, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 12px 40px rgba(85, 161, 180, 0.6);
          }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}