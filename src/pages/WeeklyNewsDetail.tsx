import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { ArrowLeft, CalendarDays, Newspaper, TrendingUp } from 'lucide-react';
import '../styles/static-pages.css';

export const WeeklyNewsDetail: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tls-page">
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><Newspaper size={12} /> Actu de la semaine</span>
        <h1>Actu majeure: IA generative et formation</h1>
        <p className="tls-editorial-summary">
          L'essentiel de l'actualite en une page: impact, opportunites a court terme et actions recommandees.
        </p>
        <div className="tls-editorial-meta">
          <span><CalendarDays size={12} /> Semaine 17</span>
          <span><TrendingUp size={12} /> Priorite forte</span>
        </div>
      </section>
      <section className="tls-content-layout">
        <div className="tls-content-main">
          <div className="tls-editorial-cover">Visuel / extrait principal</div>
          <Card className="tls-section-card">
            <h2 className="tls-section-title">Pourquoi c'est important</h2>
            <p className="tls-muted">Resume actionnable de l'actualite et implications concretes pour les apprenants.</p>
            <div className="tls-actions">
              <Button variant="secondary" onClick={() => navigate('/veille/weekly-newsletter')}><ArrowLeft size={14} /> Retour newsletter</Button>
              <Button>Lire la source</Button>
            </div>
          </Card>
        </div>
        <aside className="tls-content-aside tls-editorial-sticky">
          <Card className="tls-section-card">
            <h4>Items associes</h4>
            <div className="tls-related-list">
              <div className="tls-related-item"><strong>Dossier complet</strong><p className="tls-muted">Approfondir le sujet</p></div>
              <div className="tls-related-item"><strong>Tutorial video</strong><p className="tls-muted">Mise en pratique</p></div>
            </div>
          </Card>
        </aside>
      </section>
    </div>
  );
};

