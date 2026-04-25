import React from 'react';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { PlayCircle, Clock3 } from 'lucide-react';
import '../styles/static-pages.css';

export const VideoTutorial: React.FC = () => (
  <div className="tls-page">
    <section className="tls-page__hero">
      <h1>Video Tutorial</h1>
      <p>Page de tutoriel video (player, notes, chapitres).</p>
    </section>
    <section className="tls-content-layout">
      <div className="tls-content-main">
        <Card className="tls-section-card">
          <div className="tls-row">
            <h2>Construire un prompt structure en 5 etapes</h2>
            <span className="tls-micro"><Clock3 size={12} /> 12 min</span>
          </div>
          <div className="tls-placeholder-media">Player video (placeholder)</div>
          <p className="tls-muted">Transcript, notes et points cles de la video.</p>
          <Button><PlayCircle size={16} /> Lire la video</Button>
        </Card>
      </div>
      <aside className="tls-content-aside">
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

