import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Mail, CalendarDays, TrendingUp } from 'lucide-react';
import '../styles/static-pages.css';

export const WeeklyNewsletter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tls-page">
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><TrendingUp size={12} /> Recap hebdomadaire</span>
        <h1>Semaine 17 - IA & Pedagogie</h1>
        <p className="tls-editorial-summary">Highlights, top ressources et prochains evenements, dans un format editorial concis et actionnable.</p>
      </section>
      <section className="tls-content-layout">
        <div className="tls-content-main">
          <Card className="tls-section-card">
            <h2 className="tls-section-title">Cette semaine</h2>
            <ul className="tls-list">
              <li>Top 3 contenus Veille de la semaine</li>
              <li>Actions recommandees pour vos parcours</li>
              <li>Agenda coaching et communautaire</li>
            </ul>
            <Button onClick={() => navigate('/veille/weekly-news/1')}>Voir le detail</Button>
          </Card>
        </div>
        <aside className="tls-content-aside tls-editorial-sticky">
          <Card className="tls-section-card">
            <h4>Newsletter info</h4>
            <ul className="tls-meta-list">
              <li><Mail size={12} /> Edition email #17</li>
              <li><CalendarDays size={12} /> Publiee le lundi</li>
            </ul>
          </Card>
        </aside>
      </section>
    </div>
  );
};

