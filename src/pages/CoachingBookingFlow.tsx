import React from 'react';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { CalendarDays, Clock3, MapPin } from 'lucide-react';
import '../styles/static-pages.css';

export const CoachingBookingFlow: React.FC = () => (
  <div className="tls-page">
    <section className="tls-page__hero">
      <h1>Coaching Booking Flow</h1>
      <p>Reservation de session coaching: creneau, contexte, validation.</p>
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
          <Button>Confirmer la reservation</Button>
        </Card>
      </div>
      <aside className="tls-content-aside">
        <Card className="tls-section-card">
          <h4>Session choisie</h4>
          <ul className="tls-meta-list">
            <li><CalendarDays size={12} /> Mardi 14:30</li>
            <li><Clock3 size={12} /> 45 minutes</li>
            <li><MapPin size={12} /> Visioconference</li>
          </ul>
        </Card>
      </aside>
    </section>
  </div>
);

