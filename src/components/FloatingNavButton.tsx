/**
 * Floating Navigation Button
 *
 * A fixed floating speed-dial button in the bottom-right corner with menu options
 * - Pages Index: View all application pages
 * - Design System: Access the components/design system showcase
 * Accessible from any page in the application
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpenText, Palette } from 'lucide-react';
import '../styles/floating-nav.css';

export const FloatingNavButton: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      label: 'Design System',
      icon: <Palette size={18} />,
      path: '/components',
      color: 'var(--tls-primary-500)',
    },
    {
      label: 'Pages Index',
      icon: <BookOpenText size={18} />,
      path: '/pages-index',
      color: 'var(--tls-orange-500)',
    },
  ];

  return (
    <div className="floating-nav">
      {isOpen && (
        <div className="floating-nav__actions">
          {actions.map((action) => (
            <button
              key={action.label}
              className="floating-nav__action"
              onClick={() => {
                navigate(action.path);
                setIsOpen(false);
              }}
              title={action.label}
              aria-label={action.label}
              style={{ '--action-color': action.color } as React.CSSProperties}
            >
              <div className="floating-nav__action-icon">
                {action.icon}
              </div>
              <span className="floating-nav__action-label">{action.label}</span>
            </button>
          ))}
        </div>
      )}

      <button
        className={`floating-nav-button ${isOpen ? 'floating-nav-button--open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
      >
        <span className={`floating-nav-icon ${isOpen ? 'floating-nav-icon--close' : 'floating-nav-icon--default'}`}>
          {isOpen ? '✕' : '📖'}
        </span>
      </button>
    </div>
  );
};
