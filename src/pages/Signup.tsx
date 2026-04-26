import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { ArrowRight, BookOpenCheck, Lock, Mail, Shield, Sparkles, UserPlus, UserRound } from 'lucide-react';
import '../styles/static-pages.css';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [acceptTerms, setAcceptTerms] = useState(false);

  return (
    <div className="tls-page">
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><Sparkles size={12} /> Creation de compte</span>
        <h1>Inscription</h1>
        <p className="tls-editorial-summary">Creez votre compte pour demarrer un parcours personnalise et acceder a la veille premium.</p>
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
              <Button type="button" variant="ghost" onClick={() => navigate('/auth/login')}>Deja inscrit ?</Button>
            </div>
            <div className="tls-auth-divider">
              <span />
              <p>ou continuer avec</p>
              <span />
            </div>
            <div className="tls-auth-socials">
              <button type="button" className="tls-auth-social-btn">
                Continuer avec Google
              </button>
              <button type="button" className="tls-auth-social-btn">
                Continuer avec LinkedIn
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
          <Button variant="secondary" onClick={() => navigate('/auth/login')}>
            Aller a la connexion <ArrowRight size={14} />
          </Button>
        </aside>
      </section>
    </div>
  );
};
