import React from 'react';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import '../styles/static-pages.css';

export const JournalFreeEntry: React.FC = () => (
  <div className="tls-page">
    <section className="tls-page__hero">
      <h1>Journal - Reflexion Libre</h1>
      <p>Template libre pour capture rapide d'insights.</p>
    </section>
    <section className="tls-content-layout">
      <div className="tls-content-main">
        <Card className="tls-section-card">
          <div className="tls-field">
            <label>Note libre</label>
            <textarea rows={10} placeholder="Ecrivez votre reflexion..." />
          </div>
          <div className="tls-actions">
            <Button>Publier</Button>
            <Button variant="secondary">Brouillon</Button>
          </div>
        </Card>
      </div>
      <aside className="tls-content-aside">
        <Card className="tls-section-card">
          <h4>Aide-memoire</h4>
          <p className="tls-muted">Format libre: idee, feedback recu, action testee, resultat observe.</p>
        </Card>
      </aside>
    </section>
  </div>
);

