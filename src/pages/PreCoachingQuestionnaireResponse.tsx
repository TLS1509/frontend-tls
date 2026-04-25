import React from 'react';
import { Card } from '../components/core/Card';
import { CheckCircle2 } from 'lucide-react';
import '../styles/static-pages.css';

export const PreCoachingQuestionnaireResponse: React.FC = () => (
  <div className="tls-page">
    <section className="tls-page__hero">
      <h1>Questionnaire Response</h1>
      <p>Vue de restitution des reponses envoyees au coach.</p>
    </section>
    <section className="tls-content-layout">
      <div className="tls-content-main">
        <Card className="tls-section-card">
          <h3><CheckCircle2 size={16} /> Vos reponses</h3>
          <p className="tls-muted">Recap statique en attente de branchement API.</p>
          <div className="tls-related-list">
            <div className="tls-related-item"><strong>Objectif</strong><p className="tls-muted">Mieux deleguer dans mon equipe</p></div>
            <div className="tls-related-item"><strong>Obstacle principal</strong><p className="tls-muted">Manque de clarte sur les responsabilites</p></div>
          </div>
        </Card>
      </div>
      <aside className="tls-content-aside">
        <Card className="tls-section-card">
          <h4>Statut</h4>
          <ul className="tls-meta-list">
            <li><CheckCircle2 size={12} /> Transmis au coach</li>
            <li><CheckCircle2 size={12} /> Pris en compte pour la session</li>
          </ul>
        </Card>
      </aside>
    </section>
  </div>
);

