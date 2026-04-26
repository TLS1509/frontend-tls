import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { ArrowLeft, FileText, TrendingUp } from 'lucide-react';
import '../styles/static-pages.css';

export const Dossier: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tls-page">
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><FileText size={12} /> Dossier veille</span>
        <h1>Dossier: Transformation IA des parcours</h1>
        <p className="tls-editorial-summary">
          Analyse de fond des usages IA les plus robustes en formation, avec implications budgetaires, competences et gouvernance.
        </p>
        <div className="tls-editorial-meta">
          <span><TrendingUp size={12} /> Signal marche en acceleration</span>
        </div>
      </section>
      <section className="tls-content-layout">
        <div className="tls-content-main">
          <Card className="tls-section-card">
            <div className="tls-row">
              <h2 className="tls-section-title">Resume executif</h2>
              <Badge variant="warm">Dossier</Badge>
            </div>
            <p className="tls-muted">Structure statique: resume executif, enjeux, cas d'usage, recommandations.</p>
            <ul className="tls-list">
              <li>Contexte et signaux de marche</li>
              <li>Impacts organisationnels et competences</li>
              <li>Plan d'action en 90 jours</li>
            </ul>
            <div className="tls-actions">
              <Button variant="secondary" onClick={() => navigate('/veille')}><ArrowLeft size={14} /> Retour veille</Button>
              <Button>Telecharger PDF</Button>
            </div>
          </Card>
        </div>
        <aside className="tls-content-aside tls-editorial-sticky">
          <Card className="tls-section-card">
            <h4>Lectures complementaires</h4>
            <div className="tls-related-list">
              <div className="tls-related-item"><strong>Article detail</strong><p className="tls-muted">Futur du travail hybride</p></div>
              <div className="tls-related-item"><strong>Weekly recap</strong><p className="tls-muted">Synthese de la semaine</p></div>
            </div>
          </Card>
        </aside>
      </section>
    </div>
  );
};

