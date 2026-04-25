import React, { useState } from 'react';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { BookOpenCheck, UserPlus, Shield, Sparkles, Mail, Lock, UserRound, Circle } from 'lucide-react';
import '../styles/static-pages.css';

export const Signup: React.FC = () => {
  const [acceptTerms, setAcceptTerms] = useState(false);

  return (
    <div className="tls-page">
      <section className="tls-page__hero">
        <h1>Inscription</h1>
        <p>Créez votre compte pour démarrer un parcours personnalisé.</p>
      </section>
      <section className="tls-auth-shell">
        <Card className="tls-auth-card">
          <form className="tls-form">
            <div className="tls-field">
              <label>Nom complet</label>
              <div className="tls-input-icon">
                <UserRound size={14} />
                <input type="text" placeholder="Votre nom" />
              </div>
            </div>
            <div className="tls-field">
              <label>Email</label>
              <div className="tls-input-icon">
                <Mail size={14} />
                <input type="email" placeholder="vous@entreprise.com" />
              </div>
            </div>
            <div className="tls-field">
              <label>Mot de passe</label>
              <div className="tls-input-icon">
                <Lock size={14} />
                <input type="password" placeholder="********" />
              </div>
            </div>
            <label className="tls-auth-check">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(event) => setAcceptTerms(event.target.checked)}
              />
              J'accepte les conditions d'utilisation et la politique de confidentialite
            </label>
            <div className="tls-auth-actions">
              <Button type="submit"><UserPlus size={16} />Créer mon compte</Button>
              <Button type="button" variant="ghost">Deja inscrit ?</Button>
            </div>
            <div className="tls-auth-divider">
              <span />
              <p>ou continuer avec</p>
              <span />
            </div>
            <div className="tls-auth-socials">
              <button type="button" className="tls-auth-social-btn">
                <Circle size={14} />
                Google
              </button>
              <button type="button" className="tls-auth-social-btn">
                <Circle size={14} />
                LinkedIn
              </button>
            </div>
          </form>
        </Card>
        <aside className="tls-auth-aside">
          <div className="tls-auth-feature">
            <h4><BookOpenCheck size={16} /> Parcours recommandés</h4>
            <p>Une sélection initiale alignée avec votre profil et vos objectifs.</p>
          </div>
          <div className="tls-auth-feature">
            <h4><Shield size={16} /> Conformité entreprise</h4>
            <p>Gestion des accès et des espaces de collaboration dès l'activation.</p>
          </div>
          <div className="tls-pill"><Sparkles size={14} /> Phase design statique validée</div>
        </aside>
      </section>
    </div>
  );
};
