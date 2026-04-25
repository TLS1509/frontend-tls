import React from 'react';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Sparkles } from 'lucide-react';
import '../styles/static-pages.css';

export const JournalNewEntry: React.FC = () => (
  <div className="tls-page">
    <section className="tls-page__hero">
      <h1>Journal - Nouvelle Entree</h1>
      <p>Creation d'une nouvelle entree guidee.</p>
    </section>
    <section className="tls-content-layout">
      <div className="tls-content-main">
        <Card className="tls-section-card">
          <h3><Sparkles size={16} /> Creation guidee</h3>
          <form className="tls-form">
            <div className="tls-field"><label>Titre</label><input type="text" placeholder="Titre de votre entree" /></div>
            <div className="tls-field"><label>Contenu</label><textarea rows={7} placeholder="Votre reflexion..." /></div>
            <Button type="submit">Enregistrer</Button>
          </form>
        </Card>
      </div>
      <aside className="tls-content-aside">
        <Card className="tls-section-card">
          <h4>Prompts utiles</h4>
          <ul className="tls-list">
            <li>Qu'ai-je appris aujourd'hui ?</li>
            <li>Quel blocage dois-je traiter ?</li>
            <li>Quelle action concrete demain ?</li>
          </ul>
        </Card>
      </aside>
    </section>
  </div>
);

