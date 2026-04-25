import React from 'react';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { ArrowLeft, Clock3, Tag, CalendarDays, UserRound, Link2 } from 'lucide-react';
import '../styles/static-pages.css';

export const VeilleContent: React.FC = () => (
  <div className="tls-page">
    <section className="tls-page__hero">
      <h1>Veille - Contenu</h1>
      <p>Sous-page detaillee d'un contenu editorial depuis le hub Veille.</p>
    </section>
    <section className="tls-content-layout">
      <div className="tls-content-main">
        <Card className="tls-section-card">
          <div className="tls-row">
            <span className="tls-pill"><Tag size={14} /> IA & Pedagogie</span>
            <span className="tls-micro"><Clock3 size={12} /> 8 min</span>
          </div>
          <h2>IA generative en formation: applications concretes</h2>
          <p className="tls-muted">Article detaille avec contexte, analyse et pistes d'implementation.</p>
          <div className="tls-placeholder-media">Zone contenu principal / visuel / embed</div>
          <div className="tls-actions">
            <Button variant="secondary"><ArrowLeft size={14} /> Retour a la veille</Button>
            <Button><Link2 size={14} /> Ouvrir la source</Button>
          </div>
        </Card>
      </div>
      <aside className="tls-content-aside">
        <Card className="tls-section-card">
          <h4>Metadonnees</h4>
          <ul className="tls-meta-list">
            <li><UserRound size={12} /> The Learning Society</li>
            <li><CalendarDays size={12} /> 25 avril 2026</li>
            <li><Clock3 size={12} /> Lecture 8 min</li>
          </ul>
        </Card>
        <Card className="tls-section-card">
          <h4>Contenus relies</h4>
          <div className="tls-related-list">
            <div className="tls-related-item"><strong>Dossier IA</strong><p className="tls-muted">Approfondissement thematique</p></div>
            <div className="tls-related-item"><strong>Tutorial video</strong><p className="tls-muted">Prompt engineering</p></div>
          </div>
        </Card>
      </aside>
    </section>
  </div>
);

