import React from 'react';
import { Card } from '../components/core/Card';
import { Badge } from '../components/ui/Badge';
import '../styles/static-pages.css';

export const Dossier: React.FC = () => (
  <div className="tls-page">
    <section className="tls-page__hero">
      <h1>Dossier</h1>
      <p>Vue thematique approfondie avec sommaire et ressources associees.</p>
    </section>
    <section className="tls-content-layout">
      <div className="tls-content-main">
        <Card className="tls-section-card">
          <div className="tls-row">
            <h2>Dossier: Transformation IA des parcours</h2>
            <Badge variant="warm">Dossier</Badge>
          </div>
          <p className="tls-muted">Structure statique: resume executif, enjeux, cas d'usage, recommandations.</p>
          <ul className="tls-list">
            <li>Contexte et signaux de marche</li>
            <li>Impacts organisationnels et competences</li>
            <li>Plan d'action en 90 jours</li>
          </ul>
        </Card>
      </div>
      <aside className="tls-content-aside">
        <Card className="tls-section-card">
          <h4>Lectures complementaires</h4>
          <div className="tls-related-list">
            <div className="tls-related-item"><strong>Article detail</strong><p className="tls-muted">Futur du travail hybride</p></div>
            <div className="tls-related-item"><strong>Weekly recap</strong><p className="tls-muted">Synthese de la semaine</p></div>
          </div>
        </Card>
      </aside>
    </section>
  </div>
);

