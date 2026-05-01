/**
 * Signup Page — New user account creation
 *
 * Features:
 * - Full name, email, password form fields
 * - Terms and conditions acceptance
 * - Social login options (Google, LinkedIn)
 * - Dark mode support via CSS tokens
 * - Fully accessible form components
 * - Form validation placeholders
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { FormGroup } from '../components/core/FormGroup';
import { Input } from '../components/core/Input';
import { ArrowRight, BookOpenCheck, Lock, Mail, Shield, Sparkles, UserPlus, UserRound } from 'lucide-react';
import '../styles/static-pages.css';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      console.log('Please accept terms and conditions');
      return;
    }
    // API call would happen here
    console.log('Signup attempt:', { fullName, email, password });
  };

  return (
    <div className="tls-page">
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><Sparkles size={12} /> Creation de compte</span>
        <h1>Inscription</h1>
        <p className="tls-editorial-summary">Creez votre compte pour demarrer un parcours personnalise et acceder a la veille premium.</p>
      </section>
      <section className="tls-auth-shell">
        <Card className="tls-auth-card">
          <form className="tls-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
            {/* Full Name Field */}
            <FormGroup
              label="Nom complet"
              hint="Votre prénom et nom de famille"
              id="fullname"
              required
            >
              <Input
                id="fullname"
                type="text"
                placeholder="Votre nom"
                leadingIcon={<UserRound size={14} />}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </FormGroup>

            {/* Email Field */}
            <FormGroup
              label="Email"
              hint="Entrez une adresse email valide"
              id="email"
              required
            >
              <Input
                id="email"
                type="email"
                placeholder="vous@entreprise.com"
                leadingIcon={<Mail size={14} />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>

            {/* Password Field */}
            <FormGroup
              label="Mot de passe"
              hint="Minimum 8 caractères avec majuscules et chiffres"
              id="password"
              required
            >
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                leadingIcon={<Lock size={14} />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>

            {/* Terms & Conditions */}
            <label className="check" style={{ margin: 'var(--s-2) 0' }}>
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(event) => setAcceptTerms(event.target.checked)}
                required
              />
              <span style={{ marginLeft: 'var(--s-2)', fontSize: 'var(--t-body-sm)', color: 'var(--text)', lineHeight: 1.5 }}>
                J'accepte les{' '}
                <a href="#" style={{ color: 'var(--tls-primary-600)', textDecoration: 'underline' }}>
                  conditions d'utilisation
                </a>{' '}
                et la{' '}
                <a href="#" style={{ color: 'var(--tls-primary-600)', textDecoration: 'underline' }}>
                  politique de confidentialite
                </a>
              </span>
            </label>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 'var(--s-3)', flexDirection: 'column' }}>
              <Button type="submit" disabled={!acceptTerms}>
                <UserPlus size={16} />
                Créer mon compte
              </Button>
              <Button type="button" variant="ghost" onClick={() => navigate('/auth/login')}>
                Deja inscrit ?
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
            <h4><BookOpenCheck size={16} /> Parcours recommandés</h4>
            <p>Une sélection initiale alignée avec votre profil et vos objectifs.</p>
          </div>
          <div className="tls-auth-feature">
            <h4><Shield size={16} /> Conformité entreprise</h4>
            <p>Gestion des accès et des espaces de collaboration dès l'activation.</p>
          </div>
          <div className="tls-pill"><Sparkles size={14} /> Phase design interactive validée</div>
          <Button variant="secondary" onClick={() => navigate('/auth/login')}>
            Aller a la connexion <ArrowRight size={14} />
          </Button>
        </aside>
      </section>
    </div>
  );
};
