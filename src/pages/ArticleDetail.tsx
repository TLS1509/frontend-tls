import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { ArrowLeft, CalendarDays, UserRound, Clock3, Share2, Newspaper } from 'lucide-react';

export const ArticleDetail: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tls-page">
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><Newspaper size={12} /> Actu de la semaine</span>
        <h1>Le futur du travail hybride</h1>
        <p className="tls-editorial-summary">
          Comment les organisations combinent apprentissage continu, autonomie et rituels collaboratifs pour maintenir la performance des equipes distribuees.
        </p>
        <div className="tls-editorial-meta">
          <span><UserRound size={12} /> The Learning Society</span>
          <span><CalendarDays size={12} /> 25 avril 2026</span>
          <span><Clock3 size={12} /> 10 min</span>
        </div>
      </section>
      <section className="tls-content-layout">
        <div className="tls-content-main">
          <div className="tls-editorial-cover">Hero media de l'article</div>
          <Card className="tls-section-card">
            <h2 className="tls-section-title">Points essentiels</h2>
            <ul className="tls-list">
              <li>Contexte et tendances du travail distribue.</li>
              <li>Competences cles a renforcer en 2026.</li>
              <li>Framework pratique pour les equipes.</li>
            </ul>
            <div className="tls-callout">
              <p>
                Bon signal marche: les entreprises qui investissent sur le management asynchrone reduisent fortement la charge de coordination.
              </p>
            </div>
            <div className="tls-actions">
              <Button variant="secondary" onClick={() => navigate('/veille')}><ArrowLeft size={14} /> Retour veille</Button>
              <Button size="sm"><Share2 size={14} /> Partager</Button>
            </div>
          </Card>
        </div>
        <aside className="tls-content-aside tls-editorial-sticky">
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
};

