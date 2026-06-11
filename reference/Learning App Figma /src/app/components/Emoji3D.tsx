import React from 'react';

interface Emoji3DProps {
  emoji?: string;
  size?: string;
}

export default function Emoji3D({ 
  emoji = '👋',
  size = 'var(--text-4xl)'
}: Emoji3DProps) {
  return (
    <>
      <style>
        {`
          @keyframes wave3D {
            0%, 100% { 
              transform: perspective(400px) rotateY(0deg) rotateX(0deg); 
            }
            10% { 
              transform: perspective(400px) rotateY(15deg) rotateX(-5deg); 
            }
            20% { 
              transform: perspective(400px) rotateY(-10deg) rotateX(5deg); 
            }
            30% { 
              transform: perspective(400px) rotateY(15deg) rotateX(-5deg); 
            }
            40% { 
              transform: perspective(400px) rotateY(-5deg) rotateX(3deg); 
            }
            50% { 
              transform: perspective(400px) rotateY(12deg) rotateX(-4deg); 
            }
            60% { 
              transform: perspective(400px) rotateY(0deg) rotateX(0deg); 
            }
          }

          .emoji-3d {
            animation: wave3D 2.5s ease-in-out infinite;
            display: inline-block;
            text-shadow: 
              2px 2px 4px rgba(0, 0, 0, 0.15),
              4px 4px 8px rgba(0, 0, 0, 0.1),
              -1px -1px 2px rgba(255, 255, 255, 0.5);
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
            transform-style: preserve-3d;
          }
        `}
      </style>

      <span 
        className="emoji-3d"
        style={{ 
          fontSize: size,
          lineHeight: '1',
        }}
      >
        {emoji}
      </span>
    </>
  );
}
