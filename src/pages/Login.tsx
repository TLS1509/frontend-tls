import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import '../styles/static-pages.css';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="tls-page">
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><Sparkles size={12} /> Authentification</span>
        <h1>Connexion</h1>
        <p className="tls-editorial-summary">Retrouvez votre espace d'apprentissage, vos parcours en cours et vos recommandations personalisees.</p>
      </section>

      <section className="tls-auth-shell">
        <Card className="tls-auth-card">
          <form className="tls-form">
            <div className="tls-field">
              <label>Email</label>
              <div className="tls-input-icon">
                <Mail size={14} />
                <input type="email" placeholder="vous@thelearningsociety.com" />
              </div>
            </div>
            <div className="tls-field">
              <label>Mot de passe</label>
              <div className="tls-input-icon">
                <Lock size={14} />
                <input type={showPassword ? 'text' : 'password'} placeholder="********" />
                <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            <div className="tls-auth-inline">
              <label className="tls-auth-check">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                Se souvenir de moi
              </label>
              <button type="button" className="tls-auth-link" onClick={() => navigate('/auth/forgot-password')}>Mot de passe oublie ?</button>
            </div>
            <div className="tls-auth-actions">
              <Button type="submit">Se connecter</Button>
              <Button type="button" variant="ghost" onClick={() => navigate('/auth/signup')}>Creer un compte</Button>
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
            <h4><Sparkles size={16} /> Reprise instantanée</h4>
            <p>Continuez exactement là où vous vous êtes arrêté sur vos parcours.</p>
          </div>
          <div className="tls-auth-feature">
            <h4><ShieldCheck size={16} /> Accès sécurisé</h4>
            <p>Authentification renforcée et historique de connexions centralisé.</p>
          </div>
          <div className="tls-auth-feature">
            <h4><Mail size={16} /> Notifications ciblées</h4>
            <p>Recevez les rappels de sessions, ressources et échéances importantes.</p>
          </div>
          <div className="tls-pill"><Lock size={14} /> Version UI statique</div>
          <Button variant="secondary" onClick={() => navigate('/auth/signup')}>
            Creer un compte <ArrowRight size={14} />
          </Button>
        </aside>
      </section>
    </div>
  );
};
