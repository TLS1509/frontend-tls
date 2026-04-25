import React from 'react';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { MessageCircleQuestion } from 'lucide-react';
import '../styles/static-pages.css';

export const PreCoachingQuestionnaire: React.FC = () => (
  <div className="tls-page">
    <section className="tls-page__hero">
      <h1>Pre-Coaching Questionnaire</h1>
      <p>Questionnaire de preparation avant session coaching.</p>
    </section>
    <section className="tls-content-layout">
      <div className="tls-content-main">
        <Card className="tls-section-card">
          <h3><MessageCircleQuestion size={16} /> Questionnaire de preparation</h3>
          <form className="tls-form">
            <div className="tls-field"><label>Objectif principal</label><textarea rows={4} placeholder="Votre objectif..." /></div>
            <div className="tls-field"><label>Contexte actuel</label><textarea rows={4} placeholder="Situation, challenge, impact..." /></div>
            <Button type="submit">Soumettre</Button>
          </form>
        </Card>
      </div>
      <aside className="tls-content-aside">
        <Card className="tls-section-card">
          <h4>Conseils de reponse</h4>
          <ul className="tls-list">
            <li>Soyez specifique sur votre objectif.</li>
            <li>Ajoutez un exemple concret recent.</li>
            <li>Indiquez le resultat attendu.</li>
          </ul>
        </Card>
      </aside>
    </section>
  </div>
);

