import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { CalendarDays, PenSquare, BookOpen, ArrowRight, Search, Sparkles, Clock3 } from 'lucide-react';
import '../styles/static-pages.css';

const entries = [
  { id: 'j1', title: 'Semaine 14 - leadership', excerpt: "J'ai identifie mes points de friction en delegation.", date: '14 avril 2026', type: 'Reflexion' },
  { id: 'j2', title: 'Feedback equipe', excerpt: 'Les retours ont mis en avant la clarte des attentes.', date: '12 avril 2026', type: 'Coaching' },
];

export const Journal: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tls-page">
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><Sparkles size={12} /> Reflexion personnelle</span>
        <h1>Journal</h1>
        <p className="tls-editorial-summary">Capitalisez vos apprentissages et suivez votre progression reflexive avec un espace de prise de notes structure.</p>
      </section>
      <section className="tls-kpi-row">
        <div className="tls-kpi"><strong>12</strong><span>Entrees ce mois</span></div>
        <div className="tls-kpi"><strong>4</strong><span>Themes actifs</span></div>
        <div className="tls-kpi"><strong>78%</strong><span>Regularite hebdo</span></div>
      </section>
      <div className="tls-actions">
        <Button onClick={() => navigate('/journal/new-entry')}><PenSquare size={16} />Ecrire une nouvelle entree</Button>
        <Button variant="secondary" onClick={() => navigate('/journal/free-entry')}>Entree libre</Button>
      </div>
      <div className="tls-journal-toolbar">
        <label className="tls-journal-search">
          <Search size={14} />
          <input type="search" placeholder="Rechercher une entree..." />
        </label>
        <div className="tls-actions">
          <span className="tls-pill"><Sparkles size={14} /> Toutes</span>
          <span className="tls-pill"><BookOpen size={14} /> Reflexion</span>
          <span className="tls-pill"><Clock3 size={14} /> Coaching</span>
        </div>
      </div>
      <section className="tls-stack">
        {entries.map((entry) => (
          <Card key={entry.id} className="tls-journal-card">
            <div className="tls-stack">
              <div className="tls-row">
                <h3>{entry.title}</h3>
                <span className="tls-journal-card__meta"><CalendarDays size={12} />{entry.date}</span>
              </div>
              <span className="tls-journal-card__type">{entry.type}</span>
              <p className="tls-muted">{entry.excerpt}</p>
              <div className="tls-journal-card__actions">
                <Button variant="secondary" size="sm" onClick={() => navigate('/journal/detail/1')}><BookOpen size={14} />Lire l'entree</Button>
                <Button variant="ghost" size="sm" onClick={() => navigate('/journal/detail/1')}>Continuer <ArrowRight size={14} /></Button>
              </div>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
};
