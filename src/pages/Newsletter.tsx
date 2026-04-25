import React from 'react';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Mail, BellRing } from 'lucide-react';
import '../styles/static-pages.css';

export const Newsletter: React.FC = () => (
  <div className="tls-page">
    <section className="tls-page__hero">
      <h1>Newsletter</h1>
      <p>Abonnement, preferences et archives des editions.</p>
    </section>
    <section className="tls-content-layout">
      <div className="tls-content-main">
        <Card className="tls-section-card">
          <h3><Mail size={16} /> Preferences d'abonnement</h3>
          <div className="tls-form">
            <div className="tls-field"><label>Email</label><input type="email" placeholder="vous@entreprise.com" /></div>
            <div className="tls-field"><label>Frequence</label><input type="text" value="Hebdomadaire" readOnly /></div>
            <Button>Mettre a jour mes preferences</Button>
          </div>
        </Card>
      </div>
      <aside className="tls-content-aside">
        <Card className="tls-section-card">
          <h4><BellRing size={15} /> Archives recentes</h4>
          <div className="tls-related-list">
            <div className="tls-related-item"><strong>Semaine 17</strong><p className="tls-muted">IA & Pedagogie</p></div>
            <div className="tls-related-item"><strong>Semaine 16</strong><p className="tls-muted">Leadership apprenant</p></div>
          </div>
        </Card>
      </aside>
    </section>
  </div>
);

