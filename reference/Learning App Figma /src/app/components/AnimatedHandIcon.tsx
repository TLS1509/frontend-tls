import React from 'react';
import { Hand } from 'lucide-react';

interface AnimatedHandIconProps {
  size?: number;
  color?: string;
}

export default function AnimatedHandIcon({ 
  size = 32,
  color = 'var(--primary)'
}: AnimatedHandIconProps) {
  return (
    <>
      <style>
        {`
          @keyframes gentleWave {
            0%, 100% { 
              transform: rotate(0deg) scale(1); 
            }
            25% { 
              transform: rotate(12deg) scale(1.05); 
            }
            50% { 
              transform: rotate(0deg) scale(1); 
            }
            75% { 
              transform: rotate(-12deg) scale(1.05); 
            }
          }

          .hand-wave-icon {
            animation: gentleWave 3s ease-in-out infinite;
            transform-origin: bottom center;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
          }
        `}
      </style>

      <Hand 
        size={size} 
        className="hand-wave-icon"
        style={{ 
          color: color,
          strokeWidth: 2,
        }} 
      />
    </>
  );
}
