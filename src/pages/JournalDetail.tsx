import React from 'react';
import { Card } from '../components/core/Card';
import { CalendarDays, Clock3, Tag } from 'lucide-react';
import '../styles/static-pages.css';

export const JournalDetail: React.FC = () => (
  <div className="tls-page">
    <section className="tls-page__hero">
      <h1>Journal Detail</h1>
      <p>Detail complet d'une entree du journal de bord.</p>
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
        </Card>
      </div>
      <aside className="tls-content-aside">
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

