import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import '../styles/static-pages.css';

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tls-page">
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><Sparkles size={12} /> Nouveau mot de passe</span>
        <h1>Reset Password</h1>
        <p className="tls-editorial-summary">Definition d'un nouveau mot de passe apres validation email.</p>
      </section>
      <section className="tls-content-layout">
        <div className="tls-content-main">
          <Card className="tls-section-card">
            <h3><ShieldCheck size={16} /> Creer un mot de passe robuste</h3>
            <form className="tls-form">
              <div className="tls-field"><label>Nouveau mot de passe</label><input type="password" placeholder="********" /></div>
              <div className="tls-field"><label>Confirmer le mot de passe</label><input type="password" placeholder="********" /></div>
              <div className="tls-actions">
                <Button type="submit">Mettre a jour</Button>
                <Button type="button" variant="secondary" onClick={() => navigate('/auth/login')}>
                  <ArrowLeft size={14} /> Retour connexion
                </Button>
              </div>
            </form>
          </Card>
        </div>
        <aside className="tls-content-aside tls-editorial-sticky">
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
};

