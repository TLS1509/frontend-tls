import React from 'react';

export default function EmojiWaveGlass() {
  return (
    <>
      <style>
        {`
          @keyframes waveHand {
            0%, 100% { 
              transform: rotate(0deg); 
            }
            10% { 
              transform: rotate(14deg); 
            }
            20% { 
              transform: rotate(-8deg); 
            }
            30% { 
              transform: rotate(14deg); 
            }
            40% { 
              transform: rotate(-4deg); 
            }
            50% { 
              transform: rotate(10deg); 
            }
            60% { 
              transform: rotate(0deg); 
            }
          }

          .emoji-glass-container {
            animation: waveHand 2.5s ease-in-out infinite;
            transform-origin: 70% 70%;
          }

          .emoji-glass-glow {
            position: absolute;
            top: -4px;
            left: -4px;
            right: -4px;
            bottom: -4px;
            background: linear-gradient(135deg, rgba(248, 176, 68, 0.3), rgba(237, 132, 58, 0.2));
            border-radius: var(--radius-xl);
            filter: blur(12px);
            opacity: 0.6;
            z-index: -1;
          }
        `}
      </style>

      <div 
        className="emoji-glass-container"
        style={{ 
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '56px',
          height: '56px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          boxShadow: '0 4px 16px 0 rgba(248, 176, 68, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)',
        }}
      >
        <div className="emoji-glass-glow" />
        <span 
          style={{ 
            fontSize: 'var(--text-2xl)',
            lineHeight: '1',
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
          }}
        >
          👋
        </span>
      </div>
    </>
  );
}
