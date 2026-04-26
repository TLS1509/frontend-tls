import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { CircleCheck, CircleDashed, UserRound, Sparkles, Compass } from 'lucide-react';
import '../styles/static-pages.css';

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tls-page">
    <section className="tls-editorial-hero">
      <span className="tls-editorial-eyebrow"><Sparkles size={12} /> Demarrage personalise</span>
      <h1>Onboarding</h1>
      <p className="tls-editorial-summary">Flow d'entree utilisateur pour personnaliser l'experience d'apprentissage selon vos objectifs.</p>
    </section>
    <section className="tls-content-layout">
      <div className="tls-content-main">
        <Card className="tls-section-card">
          <h3><UserRound size={16} /> Etape 1 sur 4</h3>
          <p className="tls-muted">Selection de vos objectifs et niveau actuel.</p>
          <div className="tls-form">
            <div className="tls-field"><label>Objectif principal</label><input type="text" placeholder="Ex: renforcer mon leadership" /></div>
            <div className="tls-field"><label>Niveau actuel</label><input type="text" placeholder="Debutant / Intermediaire / Avance" /></div>
          </div>
          <div className="tls-actions">
            <Button>Continuer</Button>
            <Button variant="secondary" onClick={() => navigate('/dashboard')}>Passer pour l'instant</Button>
          </div>
        </Card>
      </div>
      <aside className="tls-content-aside tls-editorial-sticky">
        <Card className="tls-section-card">
          <h4>Progression onboarding</h4>
          <ul className="tls-meta-list">
            <li><CircleCheck size={12} /> Profil de base</li>
            <li><CircleDashed size={12} /> Objectifs</li>
            <li><CircleDashed size={12} /> Preferences de rythme</li>
            <li><CircleDashed size={12} /> Confirmation finale</li>
          </ul>
        </Card>
        <Card className="tls-section-card">
          <h4><Compass size={15} /> A quoi ca sert ?</h4>
          <p className="tls-muted">Vos reponses alimentent les recommandations de contenus, le rythme propose et les suggestions de coaching.</p>
        </Card>
      </aside>
    </section>
  </div>
  );
};

