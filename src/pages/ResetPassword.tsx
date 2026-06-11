/**
 * Reset Password Page : branded auth (deep teal glass dark layout).
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AuthShell,
  AuthPasswordField,
  AuthPrimaryButton,
  AuthGhostButton,
} from '../components/patterns/AuthShell';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (confirmPassword) {
      setPasswordMatch(value === confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setPasswordMatch(password === value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    console.log('Password reset with new password');
    navigate('/auth/login');
  };

  const confirmHasError = !passwordMatch && confirmPassword.length > 0;

  return (
    <AuthShell
      brand={{
        icon: <ShieldCheck size={24} strokeWidth={1.75} className="text-white" />,
        title: 'Réinitialiser ton mot de passe',
        subtitle: 'Choisis un mot de passe robuste',
      }}
      form={
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <AuthPasswordField
            label="Nouveau mot de passe"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            required
          />

          <AuthPasswordField
            label="Confirmer le mot de passe"
            placeholder="••••••••••••"
            value={confirmPassword}
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            error={confirmHasError ? 'Les mots de passe ne correspondent pas' : undefined}
            required
          />

          <div className="flex flex-col gap-3">
            <AuthPrimaryButton type="submit">Mettre à jour</AuthPrimaryButton>
            <AuthGhostButton onClick={() => navigate('/auth/login')}>
              Retour connexion
            </AuthGhostButton>
          </div>
        </form>
      }
      aside={
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-stack-xs">
            <CheckCircle2 size={18} className="text-white/85" />
            <h4 className="font-display text-body font-semibold text-white m-0">
              Règles recommandées
            </h4>
          </div>
          <ul className="m-0 pl-4 flex flex-col gap-1.5 text-body-sm text-white/75 list-disc">
            <li>Au moins 12 caractères.</li>
            <li>Mélanger lettres, chiffres et symboles.</li>
            <li>Éviter les mots évidents ou personnels.</li>
          </ul>
        </div>
      }
    />
  );
};

export default ResetPassword;
