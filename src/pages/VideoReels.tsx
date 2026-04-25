import React from 'react';
import { Card } from '../components/core/Card';
import { Badge } from '../components/ui/Badge';
import '../styles/static-pages.css';

export const VideoReels: React.FC = () => (
  <div className="tls-page">
    <section className="tls-page__hero">
      <h1>Video Reels</h1>
      <p>Flux de videos courtes type reels pour micro-learning.</p>
    </section>
    <section className="tls-grid">
      {['Prompt tips', 'Weekly IA', 'Coach minute'].map((title) => (
        <Card key={title} className="tls-section-card">
          <div className="tls-placeholder-media">Preview reel</div>
          <div className="tls-stack">
            <div className="tls-row">
              <h3>{title}</h3>
              <Badge variant="brand">2 min</Badge>
            </div>
            <p className="tls-muted">Carte reel statique avec titre, duree et engagement.</p>
          </div>
        </Card>
      ))}
    </section>
  </div>
);

