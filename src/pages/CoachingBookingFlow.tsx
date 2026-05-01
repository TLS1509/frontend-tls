import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { CalendarDays, Clock3, MapPin, Sparkles, UserRound } from 'lucide-react';

export const CoachingBookingFlow: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tls-page">
    <section className="tls-editorial-hero">
      <span className="tls-editorial-eyebrow"><Sparkles size={12} /> Coaching personnalise</span>
      <h1>Coaching Booking Flow</h1>
      <p className="tls-editorial-summary">Reservation de session coaching: creneau, contexte, validation et questionnaire pre-session.</p>
    </section>
    <section className="tls-content-layout">
      <div className="tls-content-main">
        <Card className="tls-section-card">
          <h3><CalendarDays size={16} /> Choisir un creneau</h3>
          <p className="tls-muted">Interface statique de reservation, integration dynamique differée.</p>
          <div className="tls-related-list">
            <div className="tls-related-item"><strong>Lundi 09:00</strong><p className="tls-muted">Coach: Sarah Martin</p></div>
            <div className="tls-related-item"><strong>Mardi 14:30</strong><p className="tls-muted">Coach: Julien Morel</p></div>
          </div>
          <div className="tls-actions">
            <Button onClick={() => navigate('/coaching/pre-questionnaire')}>Confirmer la reservation</Button>
            <Button variant="secondary">Voir tous les creneaux</Button>
          </div>
        </Card>
      </div>
      <aside className="tls-content-aside tls-editorial-sticky">
        <Card className="tls-section-card">
          <h4>Session choisie</h4>
          <ul className="tls-meta-list">
            <li><CalendarDays size={12} /> Mardi 14:30</li>
            <li><Clock3 size={12} /> 45 minutes</li>
            <li><MapPin size={12} /> Visioconference</li>
            <li><UserRound size={12} /> Coach: Sarah Martin</li>
          </ul>
        </Card>
      </aside>
    </section>
  </div>
  );
};

