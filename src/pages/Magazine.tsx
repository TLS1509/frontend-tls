import React from 'react';
import { Card } from '../components/core/Card';
import '../styles/static-pages.css';

export const Magazine: React.FC = () => (
  <div className="tls-page">
    <section className="tls-page__hero">
      <h1>Magazine</h1>
      <p>Edition magazine TLS avec sections editoriales.</p>
    </section>
    <section className="tls-grid tls-grid--wide">
      {[1, 2, 3].map((id) => (
        <Card key={id} className="tls-section-card">
          <div className="tls-placeholder-media">Cover edition #{id}</div>
          <div className="tls-stack">
            <h3>Edition #{id}</h3>
            <p className="tls-muted">Selection d'articles et tendances.</p>
          </div>
        </Card>
      ))}
    </section>
  </div>
);

