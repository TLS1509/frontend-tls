import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { BookOpen, Clock3, Target, TrendingUp, Sparkles, Video, Award, Users, Search } from 'lucide-react';
import '../styles/static-pages.css';

export const LearningSpace: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tls-page">
    <section className="tls-editorial-hero">
      <span className="tls-editorial-eyebrow"><Sparkles size={12} /> Bibliotheque IA</span>
      <h1>Learning Space</h1>
      <p className="tls-editorial-summary">Hub central d'apprentissage: parcours, ressources, activites et objectifs avec recommandation personnalisee.</p>
      <label className="tls-journal-search">
        <Search size={14} />
        <input type="search" placeholder="Rechercher un contenu..." />
      </label>
    </section>

    <section className="tls-kpi-row">
      <div className="tls-kpi"><strong>3</strong><span>Parcours actifs</span></div>
      <div className="tls-kpi"><strong>12h</strong><span>Cette semaine</span></div>
      <div className="tls-kpi"><strong>74%</strong><span>Progression globale</span></div>
    </section>

    <section className="tls-content-layout">
      <div className="tls-content-main">
        <Card className="tls-section-card">
          <div className="tls-row">
            <h3><BookOpen size={16} /> Parcours en cours</h3>
            <Button size="sm" variant="secondary">Voir tout</Button>
          </div>
          <div className="tls-related-list">
            <div className="tls-related-item"><strong>Fondamentaux du leadership</strong><p className="tls-muted">65% complete - prochaine lecon: communication assertive</p></div>
            <div className="tls-related-item"><strong>Transformation digitale</strong><p className="tls-muted">20% complete - prochaine lecon: roadmap d'adoption</p></div>
          </div>
        </Card>

        <Card className="tls-section-card">
          <h3><Sparkles size={16} /> Recommandations personnalisees</h3>
          <div className="tls-grid">
            <div className="tls-related-item"><strong><Video size={14} /> Video tutorial</strong><p className="tls-muted">Prompt structure en 5 etapes</p></div>
            <div className="tls-related-item"><strong><Award size={14} /> Masterclass</strong><p className="tls-muted">IA et apprentissage hybride</p></div>
          </div>
          <Button size="sm" onClick={() => navigate('/learning-paths')}>Explorer les contenus</Button>
        </Card>
      </div>

      <aside className="tls-content-aside tls-editorial-sticky">
        <Card className="tls-section-card">
          <h4><Target size={15} /> Priorite du jour</h4>
          <p className="tls-muted">Completer la lecon "Feedback constructif" et prendre 1 note journal.</p>
          <Button size="sm">Commencer</Button>
        </Card>
        <Card className="tls-section-card">
          <h4><TrendingUp size={15} /> Activite recente</h4>
          <ul className="tls-meta-list">
            <li><Clock3 size={12} /> Lecon completee il y a 2h</li>
            <li><Clock3 size={12} /> Session coaching confirmee</li>
            <li><Clock3 size={12} /> Nouveau badge debloque</li>
          </ul>
        </Card>
        <Card className="tls-section-card">
          <h4><Users size={15} /> Formats populaires</h4>
          <div className="tls-related-list">
            <div className="tls-related-item"><strong>Workshops live</strong><p className="tls-muted">2 sessions cette semaine</p></div>
            <div className="tls-related-item"><strong>Ressources courtes</strong><p className="tls-muted">Micro-learning quotidien</p></div>
          </div>
        </Card>
      </aside>
    </section>
  </div>
  );
};

