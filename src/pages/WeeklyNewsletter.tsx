import React from 'react';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Mail, CalendarDays } from 'lucide-react';
import '../styles/static-pages.css';

export const WeeklyNewsletter: React.FC = () => (
  <div className="tls-page">
    <section className="tls-page__hero">
      <h1>Weekly Newsletter</h1>
      <p>Recap hebdomadaire des meilleurs contenus et actions recommandees.</p>
    </section>
    <section className="tls-content-layout">
      <div className="tls-content-main">
        <Card className="tls-section-card">
          <h2>Semaine 17 - IA & Pedagogie</h2>
          <p className="tls-muted">Highlights, top ressources et prochains evenements.</p>
          <ul className="tls-list">
            <li>Top 3 contenus Veille de la semaine</li>
            <li>Actions recommandees pour vos parcours</li>
            <li>Agenda coaching et communautaire</li>
          </ul>
          <Button>Voir le detail</Button>
        </Card>
      </div>
      <aside className="tls-content-aside">
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

