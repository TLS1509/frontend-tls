import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { ArrowRight, BookOpen } from 'lucide-react';
import '../styles/static-pages.css';

export const Magazine: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tls-page">
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><BookOpen size={12} /> Edition magazine</span>
        <h1>Magazine</h1>
        <p className="tls-editorial-summary">Edition magazine TLS avec sections editoriales et navigation par numeros, dans une presentation premium.</p>
      </section>
      <section className="tls-grid tls-grid--wide">
        {[1, 2, 3].map((id) => (
          <Card key={id} className="tls-section-card">
            <div className="tls-editorial-cover">Cover edition #{id}</div>
            <div className="tls-stack">
              <h3>Edition #{id}</h3>
              <p className="tls-muted">Selection d'articles et tendances.</p>
              <Button size="sm" onClick={() => navigate('/veille/magazine-article/1')}>
                Ouvrir l'edition <ArrowRight size={14} />
              </Button>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
};

