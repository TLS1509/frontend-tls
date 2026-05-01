import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { CalendarDays, CheckCircle2, Clock3, Sparkles } from 'lucide-react';

export const PreCoachingQuestionnaireResponse: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tls-page">
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><Sparkles size={12} /> Coaching prep</span>
        <h1>Questionnaire Response</h1>
        <p className="tls-editorial-summary">Vue de restitution des reponses envoyees au coach, utilisees pour personnaliser votre prochaine session.</p>
        <div className="tls-editorial-meta">
          <span><CalendarDays size={12} /> Session prevue mardi 14:30</span>
          <span><Clock3 size={12} /> Soumis il y a 2h</span>
        </div>
      </section>
      <section className="tls-content-layout">
        <div className="tls-content-main">
          <Card className="tls-section-card">
            <h3><CheckCircle2 size={16} /> Vos reponses</h3>
            <div className="tls-related-list">
              <div className="tls-related-item"><strong>Objectif</strong><p className="tls-muted">Mieux deleguer dans mon equipe</p></div>
              <div className="tls-related-item"><strong>Obstacle principal</strong><p className="tls-muted">Manque de clarte sur les responsabilites</p></div>
              <div className="tls-related-item"><strong>Sujet prioritaire</strong><p className="tls-muted">Cadre de suivi et feedback hebdomadaire</p></div>
            </div>
            <div className="tls-actions">
              <Button variant="secondary" onClick={() => navigate('/coaching/pre-questionnaire')}>Modifier mes reponses</Button>
              <Button onClick={() => navigate('/coaching')}>Retour coaching</Button>
            </div>
          </Card>
        </div>
        <aside className="tls-content-aside tls-editorial-sticky">
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
};

