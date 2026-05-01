/**
 * AstucesViewer Page
 *
 * Interactive carousel viewer for tips, tricks, and practical advice.
 * Features:
 * - Story-style vertical scrolling
 * - Full-screen immersive experience
 * - Navigation between tips
 * - Topic badges and visual hierarchy
 *
 * Uses TLS design system components and tokens.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { X, ChevronUp, ChevronDown, Lightbulb } from 'lucide-react';

interface Astuce {
  id: number;
  number: number;
  title: string;
  description: string;
  category: string;
  emoji: string;
  background: 'primary' | 'warm' | 'sun';
}

const ASTUCES: Astuce[] = [
  {
    id: 1,
    number: 1,
    title: 'Raccourcis Clavier',
    description: 'Gagnez du temps avec les raccourcis essentiels pour naviguer rapidement dans l\'application et optimiser votre workflow quotidien.',
    category: 'PRODUCTIVITÉ',
    emoji: '⌨️',
    background: 'primary',
  },
  {
    id: 2,
    number: 2,
    title: 'Organisation des fichiers',
    description: 'Structurez vos projets avec une nomenclature claire et cohérente pour retrouver vos documents facilement et collaborer efficacement.',
    category: 'ORGANISATION',
    emoji: '📁',
    background: 'warm',
  },
  {
    id: 3,
    number: 3,
    title: 'Automatisation des tâches',
    description: 'Créez des templates réutilisables et des workflows automatisés pour gagner en efficacité et réduire les tâches répétitives.',
    category: 'AUTOMATION',
    emoji: '⚙️',
    background: 'sun',
  },
  {
    id: 4,
    number: 4,
    title: 'Collaboration en équipe',
    description: 'Utilisez les outils de partage et commentaires pour travailler efficacement avec votre équipe et maintenir une communication fluide.',
    category: 'COLLABORATION',
    emoji: '👥',
    background: 'primary',
  },
];

const getBgColors = (
  tone: 'primary' | 'warm' | 'sun'
): { bg: string; border: string; accent: string } => {
  switch (tone) {
    case 'primary':
      return {
        bg: 'var(--tls-primary-50)',
        border: 'var(--tls-primary-200)',
        accent: 'var(--tls-primary-500)',
      };
    case 'warm':
      return {
        bg: 'var(--tls-orange-50)',
        border: 'var(--tls-orange-200)',
        accent: 'var(--tls-orange-500)',
      };
    case 'sun':
      return {
        bg: 'var(--tls-yellow-50)',
        border: 'var(--tls-yellow-200)',
        accent: 'var(--tls-yellow-500)',
      };
  }
};

export const AstucesViewer: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentAstuce = ASTUCES[currentIndex];
  const colors = getBgColors(currentAstuce.background);

  const handleNext = () => {
    if (currentIndex < ASTUCES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const progress = ((currentIndex + 1) / ASTUCES.length) * 100;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--s-4)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Close Button */}
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        style={{
          position: 'absolute',
          top: 'var(--s-4)',
          right: 'var(--s-4)',
          zIndex: 10,
        }}
      >
        <X size={20} />
      </Button>

      {/* Progress Indicator */}
      <div
        style={{
          position: 'absolute',
          top: 'var(--s-4)',
          left: 'var(--s-4)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--s-2)',
          fontSize: 'var(--t-caption)',
          color: 'var(--text-muted)',
        }}
      >
        <div
          style={{
            width: 48,
            height: 4,
            background: 'var(--border-subtle)',
            borderRadius: 'var(--r-full)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: colors.accent,
              transition: 'width var(--dur-3)',
            }}
          />
        </div>
        <span>
          {currentIndex + 1}/{ASTUCES.length}
        </span>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: 'var(--container-narrow)',
          textAlign: 'center',
          gap: 'var(--s-6)',
        }}
      >
        {/* Large Emoji */}
        <div style={{ fontSize: 80 }}>{currentAstuce.emoji}</div>

        {/* Astuce Number */}
        <div
          style={{
            fontSize: 'var(--t-h4)',
            fontWeight: 600,
            color: colors.accent,
          }}
        >
          Astuce {currentAstuce.number}
        </div>

        {/* Title */}
        <h2
          style={{
            margin: 0,
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            color: 'var(--text)',
            lineHeight: 1.2,
          }}
        >
          {currentAstuce.title}
        </h2>

        {/* Description */}
        <p
          style={{
            margin: 0,
            fontSize: 'var(--t-body)',
            color: 'var(--text-muted)',
            lineHeight: 1.8,
            maxWidth: 500,
          }}
        >
          {currentAstuce.description}
        </p>

        {/* Category Badge */}
        <Badge
          variant={currentAstuce.background === 'primary' ? 'brand' : currentAstuce.background === 'warm' ? 'warm' : 'success'}
        >
          {currentAstuce.category}
        </Badge>

        {/* Tip Icon */}
        <div
          style={{
            marginTop: 'var(--s-4)',
            padding: 'var(--s-3)',
            background: colors.bg,
            border: `2px solid ${colors.border}`,
            borderRadius: 'var(--r-lg)',
            color: colors.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Lightbulb size={20} />
        </div>
      </div>

      {/* Navigation Arrows - Vertical */}
      <div
        style={{
          position: 'fixed',
          right: 'var(--s-4)',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--s-3)',
        }}
      >
        <Button
          variant="ghost"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          style={{
            opacity: currentIndex === 0 ? 0.3 : 1,
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          <ChevronUp size={20} />
        </Button>
        <Button
          variant="ghost"
          onClick={handleNext}
          disabled={currentIndex === ASTUCES.length - 1}
          style={{
            opacity: currentIndex === ASTUCES.length - 1 ? 0.3 : 1,
            cursor: currentIndex === ASTUCES.length - 1 ? 'not-allowed' : 'pointer',
          }}
        >
          <ChevronDown size={20} />
        </Button>
      </div>

      {/* Scroll Hint */}
      {currentIndex < ASTUCES.length - 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: 'var(--s-6)',
            fontSize: 'var(--t-caption)',
            color: 'var(--text-muted)',
            animation: 'pulse 2s infinite',
          }}
        >
          Ou utilisez les flèches pour naviguer
        </div>
      )}

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </div>
  );
};

export default AstucesViewer;
