import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { ArrowLeft, Sparkles, Target } from 'lucide-react';
import '../styles/static-pages.css';

export const JournalNewEntry: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tls-page">
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><Sparkles size={12} /> Ecriture guidee</span>
        <h1>Journal - Nouvelle Entree</h1>
        <p className="tls-editorial-summary">Creation d'une nouvelle entree avec prompts pour structurer vos apprentissages.</p>
      </section>
      <section className="tls-content-layout">
        <div className="tls-content-main">
          <Card className="tls-section-card">
            <h3><Sparkles size={16} /> Creation guidee</h3>
            <form className="tls-form">
              <div className="tls-field"><label>Titre</label><input type="text" placeholder="Titre de votre entree" /></div>
              <div className="tls-field"><label>Contenu</label><textarea rows={7} placeholder="Votre reflexion..." /></div>
              <div className="tls-actions">
                <Button type="submit">Enregistrer</Button>
                <Button type="button" variant="secondary" onClick={() => navigate('/journal')}><ArrowLeft size={14} /> Retour</Button>
              </div>
            </form>
          </Card>
        </div>
        <aside className="tls-content-aside tls-editorial-sticky">
          <Card className="tls-section-card">
            <h4><Target size={15} /> Prompts utiles</h4>
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
};

