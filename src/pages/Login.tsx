/**
 * Login Page : branded auth (deep teal glass dark layout).
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AuthShell,
  AuthDivider,
  AuthSocialButton,
  AuthInlineLink,
  AuthGoogleIcon,
  AuthLinkedinIcon,
  AuthField,
  AuthPasswordField,
  AuthPrimaryButton,
  AuthCheckbox,
} from '../components/patterns/AuthShell';
import { Mail } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Pas encore d'appel d'authentification côté front : la session vient de
  // WordPress. On mène donc au tableau de bord. Surtout, on ne journalise
  // rien — l'ancien console.log écrivait le mot de passe en clair.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    /* Passe typographique du 2026-09-24 : le h1 dit la tâche (« Connexion »),
       comme sur les quatre autres écrans d'auth — le logo porte la marque, et
       l'onglet ne s'intitule plus « The Learning Society · The Learning
       Society ». Le bouton principal est à 24 px des champs (contenu →
       action), le lien « Mot de passe oublié » en 600 (500 est la graisse des
       puces). */
    <AuthShell
      brand={{ title: 'Connexion' }}
      form={
        <form className="flex flex-col gap-stack" onSubmit={handleSubmit}>
          <AuthField
            label="Adresse email"
            icon={<Mail size={18} />}
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <AuthPasswordField
            label="Mot de passe"
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Remember + Forgot — la rangée passe à la ligne quand la place
              manque (375 px) : le lien descend, le libellé de la case ne se
              coupe plus en deux (« Se souvenir / de moi »). */}
          <div className="flex flex-wrap items-center justify-between gap-x-stack-xs gap-y-stack-xs">
            <AuthCheckbox
              checked={rememberMe}
              onChange={setRememberMe}
              label="Se souvenir de moi"
            />
            <button
              type="button"
              onClick={() => navigate('/auth/forgot-password')}
              className="shrink-0 bg-transparent border-0 p-0 cursor-pointer text-body font-semibold text-white hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 rounded-sm whitespace-nowrap"
            >
              Mot de passe oublié ?
            </button>
          </div>

          <AuthPrimaryButton type="submit" className="mt-stack-xs">Se connecter</AuthPrimaryButton>

          {/* Divider + Socials */}
          <AuthDivider>ou continuer avec</AuthDivider>
          <div className="grid grid-cols-2 gap-stack-xs">
            <AuthSocialButton icon={<AuthGoogleIcon />}>Google</AuthSocialButton>
            <AuthSocialButton icon={<AuthLinkedinIcon />}>LinkedIn</AuthSocialButton>
          </div>

          {/* Footer link */}
          <p className="text-center text-body text-white m-0 mt-1">
            Pas encore de compte ?{' '}
            <AuthInlineLink onClick={() => navigate('/auth/signup')}>
              Créer un compte
            </AuthInlineLink>
          </p>
        </form>
      }
    />
  );
};

export default Login;
