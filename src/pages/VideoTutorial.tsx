import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { ArrowLeft, PlayCircle, Clock3, Video } from 'lucide-react';
import '../styles/static-pages.css';

export const VideoTutorial: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tls-page">
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><Video size={12} /> Tutoriel video</span>
        <h1>Construire un prompt structure en 5 etapes</h1>
        <p className="tls-editorial-summary">
          Sequence pratique orientee execution: cadrage, exemples, validation et iteration sur des cas reel de formation.
        </p>
        <div className="tls-editorial-meta">
          <span><Clock3 size={12} /> 12 min</span>
        </div>
      </section>
      <section className="tls-content-layout">
        <div className="tls-content-main">
          <div className="tls-editorial-cover">Player video 16:9</div>
          <Card className="tls-section-card">
            <h2 className="tls-section-title">Transcript & points cles</h2>
            <p className="tls-muted">Transcript, notes et points cles de la video.</p>
            <div className="tls-actions">
              <Button variant="secondary" onClick={() => navigate('/veille')}><ArrowLeft size={14} /> Retour veille</Button>
              <Button><PlayCircle size={16} /> Lire la video</Button>
            </div>
          </Card>
        </div>
        <aside className="tls-content-aside tls-editorial-sticky">
          <Card className="tls-section-card">
            <h4>Chapitres</h4>
            <ul className="tls-meta-list">
              <li><Clock3 size={12} /> 00:00 Introduction</li>
              <li><Clock3 size={12} /> 03:10 Cadre de prompt</li>
              <li><Clock3 size={12} /> 08:45 Exemples pratiques</li>
            </ul>
          </Card>
        </aside>
      </section>
    </div>
  );
};

