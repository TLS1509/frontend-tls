import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { ArrowLeft, Sparkles } from 'lucide-react';
import '../styles/static-pages.css';

export const JournalFreeEntry: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tls-page">
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><Sparkles size={12} /> Capture rapide</span>
        <h1>Journal - Reflexion Libre</h1>
        <p className="tls-editorial-summary">Template libre pour capturer une idee, une observation ou un retour terrain en quelques minutes.</p>
      </section>
      <section className="tls-content-layout">
        <div className="tls-content-main">
          <Card className="tls-section-card">
            <div className="tls-field">
              <label>Note libre</label>
              <textarea rows={10} placeholder="Ecrivez votre reflexion..." />
            </div>
            <div className="tls-actions">
              <Button>Publier</Button>
              <Button variant="secondary">Brouillon</Button>
              <Button variant="ghost" onClick={() => navigate('/journal')}><ArrowLeft size={14} /> Retour</Button>
            </div>
          </Card>
        </div>
        <aside className="tls-content-aside tls-editorial-sticky">
          <Card className="tls-section-card">
            <h4>Aide-memoire</h4>
            <p className="tls-muted">Format libre: idee, feedback recu, action testee, resultat observe.</p>
          </Card>
        </aside>
      </section>
    </div>
  );
};

