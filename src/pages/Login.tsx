/**
 * Login Page — User authentication
 *
 * Features:
 * - Email/password authentication form
 * - Remember me toggle
 * - Forgot password link
 * - Social login options (Google, LinkedIn)
 * - Dark mode support via CSS tokens
 * - Fully accessible form components
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { FormGroup } from '../components/core/FormGroup';
import { Input } from '../components/core/Input';
import { ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck, Sparkles } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API call would happen here
    console.log('Login attempt:', { email, password, rememberMe });
  };

  return (
    <div className="tls-page">
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><Sparkles size={12} /> Authentification</span>
        <h1>Connexion</h1>
        <p className="tls-editorial-summary">Retrouvez votre espace d'apprentissage, vos parcours en cours et vos recommandations personalisees.</p>
      </section>

      <section className="tls-auth-shell">
        <Card className="tls-auth-card">
          <form className="tls-auth-form" onSubmit={handleSubmit}>
            {/* Email Field */}
            <FormGroup
              label="Email"
              hint="Entrez votre adresse email professionnelle"
              id="email"
              required
            >
              <Input
                id="email"
                type="email"
                placeholder="vous@thelearningsociety.com"
                leadingIcon={<Mail size={14} />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>

            {/* Password Field */}
            <FormGroup
              label="Mot de passe"
              hint="Entrez votre mot de passe sécurisé"
              id="password"
              required
            >
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                leadingIcon={<Lock size={14} />}
                trailingIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="tls-auth-icon-btn"
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>

            {/* Remember Me & Forgot Password */}
            <div className="tls-auth-inline">
              <label className="check tls-auth-remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <span>Se souvenir de moi</span>
              </label>
              <button
                type="button"
                onClick={() => navigate('/auth/forgot-password')}
                className="tls-auth-link"
              >
                Mot de passe oublie ?
              </button>
            </div>

            {/* Actions */}
            <div className="tls-auth-actions">
              <Button type="submit">Se connecter</Button>
              <Button type="button" variant="ghost" onClick={() => navigate('/auth/signup')}>
                Creer un compte
              </Button>
            </div>

            {/* Divider */}
            <div className="tls-auth-divider">
              <span />
              <p>ou continuer avec</p>
              <span />
            </div>

            {/* Social Logins */}
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
          <div className="tls-pill"><Lock size={14} /> Version UI interactive</div>
          <Button variant="secondary" onClick={() => navigate('/auth/signup')}>
            Creer un compte <ArrowRight size={14} />
          </Button>
        </aside>
      </section>
    </div>
  );
};
