import React from 'react';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { CircleCheck, CircleDashed, UserRound } from 'lucide-react';
import '../styles/static-pages.css';

export const Onboarding: React.FC = () => (
  <div className="tls-page">
    <section className="tls-page__hero">
      <h1>Onboarding</h1>
      <p>Flow d'entree utilisateur pour personnaliser l'experience d'apprentissage.</p>
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
          <Button>Continuer</Button>
        </Card>
      </div>
      <aside className="tls-content-aside">
        <Card className="tls-section-card">
          <h4>Progression onboarding</h4>
          <ul className="tls-meta-list">
            <li><CircleCheck size={12} /> Profil de base</li>
            <li><CircleDashed size={12} /> Objectifs</li>
            <li><CircleDashed size={12} /> Preferences de rythme</li>
            <li><CircleDashed size={12} /> Confirmation finale</li>
          </ul>
        </Card>
      </aside>
    </section>
  </div>
);

