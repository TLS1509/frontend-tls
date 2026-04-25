import React from 'react';
import { Card } from '../components/core/Card';
import '../styles/static-pages.css';

export const MagazineArticle: React.FC = () => (
  <div className="tls-page">
    <section className="tls-page__hero">
      <h1>Magazine Article</h1>
      <p>Article detaille du magazine avec mise en page longue.</p>
    </section>
    <section className="tls-content-layout">
      <div className="tls-content-main">
        <Card className="tls-section-card">
          <h2>Tendances EdTech 2026</h2>
          <div className="tls-placeholder-media">Hero image article magazine</div>
          <p className="tls-muted">Contenu premium statique, relie plus tard aux donnees CMS.</p>
          <ul className="tls-list">
            <li>Panorama des usages en formation continue.</li>
            <li>Nouvelles attentes des apprenants adultes.</li>
            <li>Outillage IA a adopter progressivement.</li>
          </ul>
        </Card>
      </div>
      <aside className="tls-content-aside">
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

