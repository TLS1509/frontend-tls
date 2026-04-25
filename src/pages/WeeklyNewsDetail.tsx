import React from 'react';
import { Card } from '../components/core/Card';
import '../styles/static-pages.css';

export const WeeklyNewsDetail: React.FC = () => (
  <div className="tls-page">
    <section className="tls-page__hero">
      <h1>Weekly News Detail</h1>
      <p>Detail d'un item de la newsletter hebdomadaire.</p>
    </section>
    <section className="tls-content-layout">
      <div className="tls-content-main">
        <Card className="tls-section-card">
          <h2>Actu majeure: IA generative et formation</h2>
          <p className="tls-muted">Sous-page de detail statique, reference Figma preservee.</p>
          <div className="tls-placeholder-media">Visuel / extrait principal</div>
          <p className="tls-muted">Resume actionnable de l'actualite et implications concretes pour les apprenants.</p>
        </Card>
      </div>
      <aside className="tls-content-aside">
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

