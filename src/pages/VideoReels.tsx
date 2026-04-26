import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Badge } from '../components/ui/Badge';
import { ArrowLeft, Clapperboard, PlayCircle } from 'lucide-react';
import { Button } from '../components/core/Button';
import '../styles/static-pages.css';

export const VideoReels: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tls-page">
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><Clapperboard size={12} /> Format reel</span>
        <h1>Video Reels</h1>
        <p className="tls-editorial-summary">Flux de videos courtes type reels pour micro-learning, inspire du format mobile immersif Figma.</p>
      </section>
      <section className="tls-grid">
        {['Prompt tips', 'Weekly IA', 'Coach minute'].map((title) => (
          <Card key={title} className="tls-section-card">
            <div className="tls-editorial-cover">Preview reel vertical</div>
            <div className="tls-stack">
              <div className="tls-row">
                <h3>{title}</h3>
                <Badge variant="brand">2 min</Badge>
              </div>
              <p className="tls-muted">Carte reel statique avec titre, duree et engagement.</p>
              <Button size="sm"><PlayCircle size={14} /> Ouvrir</Button>
            </div>
          </Card>
        ))}
      </section>
      <div className="tls-actions">
        <Button variant="secondary" onClick={() => navigate('/veille')}><ArrowLeft size={14} /> Retour veille</Button>
      </div>
    </div>
  );
};

