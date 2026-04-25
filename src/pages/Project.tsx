import React from 'react';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Target, CheckCircle2, Clock3, FolderKanban } from 'lucide-react';
import '../styles/static-pages.css';

export const Project: React.FC = () => (
  <div className="tls-page">
    <section className="tls-page__hero">
      <h1>Projet Final</h1>
      <p>Vue dediee au projet de fin de parcours.</p>
    </section>
    <section className="tls-content-layout">
      <div className="tls-content-main">
        <Card className="tls-section-card">
          <h2><Target size={18} /> Plan de leadership applique</h2>
          <p className="tls-muted">Objectifs, livrables, feedbacks et progression du projet.</p>
          <div className="tls-placeholder-media">Zone projet: brief, contexte et livrable attendu</div>
          <div className="tls-actions">
            <Button>Commencer le projet</Button>
            <Button variant="secondary">Voir le brief</Button>
          </div>
        </Card>
      </div>
      <aside className="tls-content-aside">
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

