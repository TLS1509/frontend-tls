import React from 'react';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { CalendarDays, PenSquare, BookOpen, ArrowRight, Search, Sparkles, Clock3 } from 'lucide-react';
import '../styles/static-pages.css';

const entries = [
  { id: 'j1', title: 'Semaine 14 - leadership', excerpt: "J'ai identifie mes points de friction en delegation.", date: '14 avril 2026', type: 'Reflexion' },
  { id: 'j2', title: 'Feedback equipe', excerpt: 'Les retours ont mis en avant la clarte des attentes.', date: '12 avril 2026', type: 'Coaching' },
];

export const Journal: React.FC = () => {
  return (
    <div className="tls-page">
      <section className="tls-page__hero">
        <h1>Journal</h1>
        <p>Capitalisez vos apprentissages et suivez votre progression réflexive.</p>
      </section>
      <div className="tls-actions">
        <Button><PenSquare size={16} />Ecrire une nouvelle entree</Button>
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
                <Button variant="secondary" size="sm"><BookOpen size={14} />Lire l'entree</Button>
                <Button variant="ghost" size="sm">Continuer <ArrowRight size={14} /></Button>
              </div>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
};
