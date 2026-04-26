import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { ArrowRight, BellRing, Mail, Newspaper } from 'lucide-react';
import '../styles/static-pages.css';

export const Newsletter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tls-page">
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><Newspaper size={12} /> Abonnement veille</span>
        <h1>Newsletter</h1>
        <p className="tls-editorial-summary">Abonnement, preferences et archives des editions, avec un layout editorial plus proche des references Figma.</p>
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
          <Card className="tls-section-card">
            <h3>Derniere edition publiee</h3>
            <p className="tls-muted">Consultez la derniere synthese hebdomadaire pour capter les tendances utiles en quelques minutes.</p>
            <Button onClick={() => navigate('/veille/weekly-newsletter')}>
              Ouvrir l'edition <ArrowRight size={14} />
            </Button>
          </Card>
        </div>
        <aside className="tls-content-aside tls-editorial-sticky">
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
};

