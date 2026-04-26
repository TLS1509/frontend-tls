import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { ArrowLeft, Clock3, Tag, CalendarDays, UserRound, Link2, Sparkles } from 'lucide-react';
import '../styles/static-pages.css';

export const VeilleContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tls-page">
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><Sparkles size={12} /> Veille & contenu</span>
        <h1>IA generative en formation: applications concretes</h1>
        <p className="tls-editorial-summary">
          Analyse rapide des cas d'usage les plus matures et des points d'attention pour deployer l'IA de facon pedagogiquement pertinente.
        </p>
        <div className="tls-editorial-meta">
          <span><Tag size={12} /> IA & Pedagogie</span>
          <span><Clock3 size={12} /> 8 min</span>
          <span><CalendarDays size={12} /> 25 avril 2026</span>
        </div>
      </section>

      <section className="tls-content-layout">
        <div className="tls-content-main">
          <div className="tls-editorial-cover">Visuel principal / video / capture de rapport</div>
          <Card className="tls-section-card">
            <h2 className="tls-section-title">Pourquoi ce contenu compte</h2>
            <p className="tls-muted">
              L'article met en perspective les gains observables sur l'engagement apprenant, la vitesse de production de contenus et la qualite des feedbacks.
            </p>
            <div className="tls-callout">
              <p>
                Point cle: l'impact est maximal quand l'IA est utilisee comme co-pilote du formateur, pas comme remplacement complet.
              </p>
            </div>
            <div className="tls-actions">
              <Button variant="secondary" onClick={() => navigate('/veille')}><ArrowLeft size={14} /> Retour a la veille</Button>
              <Button><Link2 size={14} /> Ouvrir la source</Button>
            </div>
          </Card>
        </div>
        <aside className="tls-content-aside tls-editorial-sticky">
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
};

