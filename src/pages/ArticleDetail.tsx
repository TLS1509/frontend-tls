import React from 'react';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { CalendarDays, UserRound, Clock3, Share2 } from 'lucide-react';
import '../styles/static-pages.css';

export const ArticleDetail: React.FC = () => (
  <div className="tls-page">
    <section className="tls-page__hero">
      <h1>Article Detail</h1>
      <p>Lecture longue avec metadata, resume, sections et actions.</p>
    </section>
    <section className="tls-content-layout">
      <div className="tls-content-main">
        <Card className="tls-section-card">
          <div className="tls-row">
            <span className="tls-micro"><UserRound size={12} /> The Learning Society</span>
            <span className="tls-micro"><CalendarDays size={12} /> 25 avril 2026</span>
          </div>
          <h2>Le futur du travail hybride</h2>
          <p className="tls-muted">Resume introductif du sujet, enjeux principaux et angle editorial.</p>
          <div className="tls-placeholder-media">Hero media de l'article</div>
          <ul className="tls-list">
            <li>Contexte et tendances du travail distribue.</li>
            <li>Competences cles a renforcer en 2026.</li>
            <li>Framework pratique pour les equipes.</li>
          </ul>
          <Button size="sm"><Share2 size={14} /> Partager</Button>
        </Card>
      </div>
      <aside className="tls-content-aside">
        <Card className="tls-section-card">
          <h4>Infos de lecture</h4>
          <ul className="tls-meta-list">
            <li><Clock3 size={12} /> 10 min</li>
            <li><CalendarDays size={12} /> Mis a jour aujourd'hui</li>
          </ul>
        </Card>
      </aside>
    </section>
  </div>
);

