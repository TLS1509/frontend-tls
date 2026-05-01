/**
 * BackgroundBlobs — Animated decorative blob shapes
 *
 * Creates 3 animated blob shapes with TLS gradients for page backgrounds.
 * Used as decorative overlay elements in hero sections and full-page layouts.
 *
 * Tokens:
 * - Gradients: var(--tls-primary-500), var(--tls-orange-500), var(--tls-yellow-400)
 * - Animations: var(--dur-3), var(--ease-standard)
 */

import React from 'react';

export const BackgroundBlobs: React.FC<{ variant?: 'default' | 'subtle' }> = ({ variant = 'default' }) => {
  const opacity = variant === 'subtle' ? 0.6 : 0.8;
  const blurAmount = variant === 'subtle' ? 60 : 80;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <style>
        {`
          @keyframes float-blob-1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 40px) scale(0.9); }
          }

          @keyframes float-blob-2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(-40px, 30px) scale(0.95); }
            66% { transform: translate(50px, -30px) scale(1.05); }
          }

          @keyframes float-blob-3 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(20px, 50px) scale(1.05); }
            66% { transform: translate(-50px, -20px) scale(0.95); }
          }

          .blob {
            position: absolute;
            border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
            filter: blur(${blurAmount}px);
            opacity: ${opacity};
            mix-blend-mode: multiply;
          }

          .blob-1 {
            width: 400px;
            height: 400px;
            background: linear-gradient(135deg, var(--tls-primary-500), var(--tls-primary-700));
            top: -100px;
            left: -100px;
            animation: float-blob-1 20s var(--ease-standard) infinite;
          }

          .blob-2 {
            width: 350px;
            height: 350px;
            background: linear-gradient(135deg, var(--tls-orange-500), var(--tls-orange-600));
            top: 100px;
            right: -50px;
            animation: float-blob-2 25s var(--ease-standard) infinite;
          }

          .blob-3 {
            width: 300px;
            height: 300px;
            background: linear-gradient(135deg, var(--tls-yellow-400), var(--tls-orange-500));
            bottom: -50px;
            left: 50%;
            animation: float-blob-3 22s var(--ease-standard) infinite;
          }
        `}
      </style>

      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
    </div>
  );
};

export default BackgroundBlobs;
