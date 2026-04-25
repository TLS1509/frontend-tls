/**
 * Floating Navigation Button
 *
 * A fixed floating button in the bottom-right corner that links to the Pages Index
 * Accessible from any page in the application
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/floating-nav.css';

export const FloatingNavButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      className="floating-nav-button"
      onClick={() => navigate('/pages-index')}
      title="Accéder à l'index des pages"
      aria-label="Accéder à l'index des pages"
    >
      <span className="floating-nav-icon">📖</span>
    </button>
  );
};
