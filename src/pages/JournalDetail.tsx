import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { ArrowLeft, CalendarDays, Clock3, Tag, Sparkles } from 'lucide-react';
import '../styles/static-pages.css';

export const JournalDetail: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tls-page">
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><Sparkles size={12} /> Entree detail</span>
        <h1>Journal Detail</h1>
        <p className="tls-editorial-summary">Detail complet d'une entree du journal de bord, avec observations et plan d'action.</p>
      </section>
      <section className="tls-content-layout">
        <div className="tls-content-main">
          <Card className="tls-section-card">
            <h2>Semaine 14 - leadership</h2>
            <p className="tls-muted">Texte integral, tags et actions de suivi.</p>
            <div className="tls-related-list">
              <div className="tls-related-item"><strong>Observation</strong><p className="tls-muted">J'ai clarifie les attentes de l'equipe.</p></div>
              <div className="tls-related-item"><strong>Action suivante</strong><p className="tls-muted">Mettre en place un rituel de feedback hebdo.</p></div>
            </div>
            <div className="tls-actions">
              <Button variant="secondary" onClick={() => navigate('/journal')}><ArrowLeft size={14} /> Retour journal</Button>
              <Button onClick={() => navigate('/journal/new-entry')}>Nouvelle entree</Button>
            </div>
          </Card>
        </div>
        <aside className="tls-content-aside tls-editorial-sticky">
          <Card className="tls-section-card">
            <h4>Meta</h4>
            <ul className="tls-meta-list">
              <li><CalendarDays size={12} /> 25 avril 2026</li>
              <li><Clock3 size={12} /> 7 min de lecture</li>
              <li><Tag size={12} /> Leadership</li>
            </ul>
          </Card>
        </aside>
      </section>
    </div>
  );
};

