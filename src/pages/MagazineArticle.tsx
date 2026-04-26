import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { ArrowLeft, BookOpen, CalendarDays } from 'lucide-react';
import '../styles/static-pages.css';

export const MagazineArticle: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tls-page">
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><BookOpen size={12} /> Le mag du mois</span>
        <h1>Tendances EdTech 2026</h1>
        <p className="tls-editorial-summary">Panorama des tendances qui transforment la creation de contenus, l'accompagnement et l'evaluation des competences.</p>
        <div className="tls-editorial-meta">
          <span><CalendarDays size={12} /> Edition avril 2026</span>
        </div>
      </section>
      <section className="tls-content-layout">
        <div className="tls-content-main">
          <div className="tls-editorial-cover">Hero image article magazine</div>
          <Card className="tls-section-card">
            <h2 className="tls-section-title">A retenir</h2>
            <ul className="tls-list">
              <li>Panorama des usages en formation continue.</li>
              <li>Nouvelles attentes des apprenants adultes.</li>
              <li>Outillage IA a adopter progressivement.</li>
            </ul>
            <div className="tls-actions">
              <Button variant="secondary" onClick={() => navigate('/veille/magazine')}><ArrowLeft size={14} /> Retour magazine</Button>
            </div>
          </Card>
        </div>
        <aside className="tls-content-aside tls-editorial-sticky">
          <Card className="tls-section-card">
            <h4>Dans cette edition</h4>
            <div className="tls-related-list">
              <div className="tls-related-item"><strong>Interview expert</strong><p className="tls-muted">Vision 2027</p></div>
              <div className="tls-related-item"><strong>Case study</strong><p className="tls-muted">Deploiement entreprise</p></div>
            </div>
          </Card>
        </aside>
      </section>
    </div>
  );
};

