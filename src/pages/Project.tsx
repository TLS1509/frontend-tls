import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Target, CheckCircle2, Clock3, FolderKanban, Sparkles, Award } from 'lucide-react';

export const Project: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tls-page">
    <section className="tls-editorial-hero">
      <span className="tls-editorial-eyebrow"><Award size={12} /> Projet certifiant</span>
      <h1>Projet Final</h1>
      <p className="tls-editorial-summary">Vue dediee au projet de fin de parcours, avec livrables, preuves et soumission.</p>
      <div className="tls-editorial-meta">
        <span><Clock3 size={12} /> 80 min estimes</span>
        <span><Sparkles size={12} /> 5 etapes</span>
      </div>
    </section>
    <section className="tls-kpi-row">
      <div className="tls-kpi"><strong>1/5</strong><span>Etapes completees</span></div>
      <div className="tls-kpi"><strong>2</strong><span>Livrables ajoutes</span></div>
      <div className="tls-kpi"><strong>48h</strong><span>Feedback estimé</span></div>
    </section>
    <section className="tls-content-layout">
      <div className="tls-content-main">
        <Card className="tls-section-card">
          <h2><Target size={18} /> Plan de leadership applique</h2>
          <p className="tls-muted">Objectifs, livrables, feedbacks et progression du projet.</p>
          <div className="tls-placeholder-media">Zone projet: brief, contexte et livrable attendu</div>
          <div className="tls-callout">
            <p>Pour valider, documentez votre contexte, vos prompts, vos tests et votre plan de deploiement.</p>
          </div>
          <div className="tls-actions">
            <Button>Commencer le projet</Button>
            <Button variant="secondary" onClick={() => navigate('/learning-paths/1')}>Voir le brief</Button>
          </div>
        </Card>
      </div>
      <aside className="tls-content-aside tls-editorial-sticky">
        <Card className="tls-section-card">
          <h4><FolderKanban size={15} /> Checklist</h4>
          <ul className="tls-meta-list">
            <li><CheckCircle2 size={12} /> Cadrage termine</li>
            <li><Clock3 size={12} /> Prototype en cours</li>
            <li><Clock3 size={12} /> Feedback coach planifie</li>
          </ul>
        </Card>
      </aside>
    </section>
  </div>
  );
};

