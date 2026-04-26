import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { MessageCircleQuestion, Sparkles, Target } from 'lucide-react';
import '../styles/static-pages.css';

export const PreCoachingQuestionnaire: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tls-page">
    <section className="tls-editorial-hero">
      <span className="tls-editorial-eyebrow"><Sparkles size={12} /> Preparation coaching</span>
      <h1>Pre-Coaching Questionnaire</h1>
      <p className="tls-editorial-summary">Questionnaire de preparation avant session coaching pour orienter le temps d'echange sur vos priorites.</p>
    </section>
    <section className="tls-kpi-row">
      <div className="tls-kpi"><strong>3</strong><span>Questions principales</span></div>
      <div className="tls-kpi"><strong>10 min</strong><span>Temps de completion</span></div>
      <div className="tls-kpi"><strong>1:1</strong><span>Session personnalisee</span></div>
    </section>
    <section className="tls-content-layout">
      <div className="tls-content-main">
        <Card className="tls-section-card">
          <h3><MessageCircleQuestion size={16} /> Questionnaire de preparation</h3>
          <form className="tls-form">
            <div className="tls-field"><label>Objectif principal</label><textarea rows={4} placeholder="Votre objectif..." /></div>
            <div className="tls-field"><label>Contexte actuel</label><textarea rows={4} placeholder="Situation, challenge, impact..." /></div>
            <div className="tls-field"><label>Sujets prioritaires</label><textarea rows={4} placeholder="Sujets a aborder pendant la session..." /></div>
            <div className="tls-actions">
              <Button type="submit" onClick={() => navigate('/coaching/pre-questionnaire/response')}>Soumettre</Button>
              <Button type="button" variant="secondary" onClick={() => navigate('/coaching/booking')}>Retour reservation</Button>
            </div>
          </form>
        </Card>
      </div>
      <aside className="tls-content-aside tls-editorial-sticky">
        <Card className="tls-section-card">
          <h4><Target size={15} /> Conseils de reponse</h4>
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
};

