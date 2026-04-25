import React from 'react';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { ShieldCheck } from 'lucide-react';
import '../styles/static-pages.css';

export const ResetPassword: React.FC = () => (
  <div className="tls-page">
    <section className="tls-page__hero">
      <h1>Reset Password</h1>
      <p>Definition d'un nouveau mot de passe apres validation email.</p>
    </section>
    <section className="tls-content-layout">
      <div className="tls-content-main">
        <Card className="tls-section-card">
          <h3><ShieldCheck size={16} /> Creer un mot de passe robuste</h3>
          <form className="tls-form">
            <div className="tls-field"><label>Nouveau mot de passe</label><input type="password" placeholder="********" /></div>
            <div className="tls-field"><label>Confirmer le mot de passe</label><input type="password" placeholder="********" /></div>
            <Button type="submit">Mettre a jour</Button>
          </form>
        </Card>
      </div>
      <aside className="tls-content-aside">
        <Card className="tls-section-card">
          <h4>Regles recommandees</h4>
          <ul className="tls-list">
            <li>Au moins 12 caracteres.</li>
            <li>Melanger lettres, chiffres et symboles.</li>
            <li>Eviter les mots evidents.</li>
          </ul>
        </Card>
      </aside>
    </section>
  </div>
);

