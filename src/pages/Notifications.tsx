import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/core/Button';
import { Bell, CheckCheck, Clock3, Filter, BookOpen, MessageSquare, CalendarDays, Sparkles } from 'lucide-react';
import '../styles/static-pages.css';

const items = [
  { id: 'n1', title: 'Nouveau module disponible', body: 'Le parcours Leadership contient 2 nouvelles lecons.', type: 'info' as const },
  { id: 'n2', title: 'Rappel coaching', body: 'Votre session est planifiee demain a 14h.', type: 'warm' as const },
  { id: 'n3', title: 'Objectif atteint', body: 'Vous avez complete 5 jours consecutifs.', type: 'success' as const },
];

export const Notifications: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tls-page">
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><Sparkles size={12} /> Centre de notifications</span>
        <h1>Notifications</h1>
        <p className="tls-editorial-summary">Retrouvez les evenements importants de votre activite d'apprentissage avec tri par categorie.</p>
      </section>
      <div className="tls-actions">
        <Button size="sm"><CheckCheck size={14} />Tout marquer comme lu</Button>
        <span className="tls-pill"><Filter size={14} /> Toutes</span>
        <span className="tls-pill"><BookOpen size={14} /> Formations</span>
        <span className="tls-pill"><MessageSquare size={14} /> Messages</span>
        <span className="tls-pill"><CalendarDays size={14} /> Coaching</span>
      </div>
      <section className="tls-grid tls-grid--wide">
        {items.map((item) => (
          <Card key={item.id} className="tls-notification-card">
            <div className="tls-stack">
              <div className="tls-notification-card__head">
                <h3>{item.title}</h3>
                <Badge variant={item.type}>{item.type}</Badge>
              </div>
              <p className="tls-muted">{item.body}</p>
              <div className="tls-row">
                <span className="tls-micro"><Clock3 size={12} /> il y a 2h</span>
                <div className="tls-notification-card__actions">
                  <Button size="sm" variant="secondary"><Bell size={14} />Marquer comme lue</Button>
                  <Button size="sm" variant="ghost">Supprimer</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </section>
      <Card className="tls-section-card">
        <h3>Parametres rapides</h3>
        <p className="tls-muted">Ajustez vos preferences de canaux et de frequence pour reduire le bruit.</p>
        <div className="tls-actions">
          <Button variant="secondary" onClick={() => navigate('/settings')}>Configurer mes notifications</Button>
        </div>
      </Card>
    </div>
  );
};
