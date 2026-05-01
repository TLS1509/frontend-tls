import { useState } from 'react';
import { Eye, EyeOff, Sparkles, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

interface ResetPasswordPageProps {
  onNavigateToLogin?: () => void;
}

const authBg = {
  background: 'linear-gradient(90deg, #55a1b4, #164267)',
};
const authCard = {
  background: 'rgba(255, 255, 255, 0.88)',
  backdropFilter: 'blur(28px)',
  WebkitBackdropFilter: 'blur(28px)',
  border: '1px solid rgba(255, 255, 255, 0.7)',
  boxShadow: '0 24px 64px rgba(0, 0, 0, 0.14), 0 8px 24px rgba(0, 0, 0, 0.08)',
};
const authInput: React.CSSProperties = {
  background: '#f3f4f6',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  color: 'var(--foreground)',
};
const labelStyle: React.CSSProperties = {
  fontSize: 'var(--text-sm)',
  fontWeight: 'var(--font-weight-medium)',
  color: 'var(--foreground)',
  fontFamily: 'var(--font-body)',
};

export default function ResetPasswordPage({ onNavigateToLogin }: ResetPasswordPageProps) {
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const passwordStrength = (password: string) => {
    let s = 0;
    if (password.length >= 8) s++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) s++;
    if (password.match(/[0-9]/)) s++;
    if (password.match(/[^a-zA-Z0-9]/)) s++;
    return s;
  };
  const strength = passwordStrength(formData.password);
  const strengthColors = ['', '#EF4444', '#F59A5F', '#F8B044', '#4A8C6E'];
  const strengthLabels = ['', 'Faible', 'Moyen', 'Bon', 'Fort'];

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess(false);
    if (!formData.password || !formData.confirmPassword) { setError('Veuillez remplir tous les champs'); return; }
    if (formData.password.length < 8) { setError('Le mot de passe doit contenir au moins 8 caractères'); return; }
    if (formData.password !== formData.confirmPassword) { setError('Les mots de passe ne correspondent pas'); return; }
    if (strength < 3) { setError('Veuillez choisir un mot de passe plus fort'); return; }
    setSuccess(true);
    setTimeout(() => onNavigateToLogin?.(), 2500);
  };

  const reqCheck = (met: boolean) => (
    <span style={{ color: met ? 'var(--success)' : 'var(--muted-foreground)' }}>
      {met ? '✓' : '○'}
    </span>
  );

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0 -z-10" style={authBg} />
      <div className="absolute -top-32 left-1/3 w-[700px] h-[700px] rounded-full blur-3xl opacity-60 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(180, 230, 240, 0.55), transparent 65%)' }} />
      <div className="absolute bottom-0 -left-20 w-96 h-96 rounded-full blur-3xl opacity-50 animate-pulse pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(42, 140, 155, 0.4), transparent 65%)', animationDuration: '7s' }} />
      <div className="absolute top-10 right-10 w-72 h-72 rounded-full blur-3xl opacity-30 animate-pulse pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(100, 200, 215, 0.5), transparent 65%)', animationDuration: '5s', animationDelay: '1s' }} />

      {/* Card */}
      <div className="w-full max-w-[420px] relative">
        <div className="relative rounded-2xl p-8 md:p-10" style={authCard}>

          {/* Header */}
          <div className="text-center mb-7">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
              style={{ background: 'rgba(85, 161, 180, 0.12)', border: '1px solid rgba(85, 161, 180, 0.2)' }}>
              <Sparkles className="w-5 h-5" style={{ color: 'var(--primary)' }} />
            </div>
            <h2 className="mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)', fontSize: 'var(--text-xl)' }}>
              Nouveau mot de passe
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}>
              Choisissez un mot de passe fort pour sécuriser votre compte
            </p>
          </div>

          {!success ? (
            <>
              {/* Error */}
              {error && (
                <div className="mb-4 p-3 rounded-lg flex items-start gap-2"
                  style={{ background: 'rgba(169, 50, 38, 0.08)', border: '1px solid rgba(169, 50, 38, 0.2)' }}>
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--destructive)' }} />
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--destructive)' }}>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* New password */}
                <div>
                  <label htmlFor="password" className="block mb-1.5" style={labelStyle}>
                    Nouveau mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                    <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Minimum 8 caractères"
                      value={formData.password} onChange={(e) => handleChange('password', e.target.value)}
                      required className="w-full pl-10 pr-10" style={authInput} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
                      style={{ color: 'var(--muted-foreground)' }}>
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Strength */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div key={level} className="h-1 flex-1 rounded-full transition-all duration-300"
                            style={{ background: strength >= level ? strengthColors[strength] : 'rgba(0,0,0,0.1)' }} />
                        ))}
                      </div>
                      <p style={{ fontSize: 'var(--text-xs)', color: strength >= 3 ? 'var(--success)' : 'var(--muted-foreground)' }}>
                        {strengthLabels[strength] || 'Trop court'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm password */}
                <div>
                  <label htmlFor="confirmPassword" className="block mb-1.5" style={labelStyle}>
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                    <Input id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirmez votre mot de passe"
                      value={formData.confirmPassword} onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      required className="w-full pl-10 pr-10" style={authInput} />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
                      style={{ color: 'var(--muted-foreground)' }}>
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Requirements */}
                <div className="p-4 rounded-xl space-y-1.5"
                  style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.07)' }}>
                  <p style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)', marginBottom: '8px' }}>
                    Le mot de passe doit contenir :
                  </p>
                  {[
                    [formData.password.length >= 8, 'Au moins 8 caractères'],
                    [!!(formData.password.match(/[a-z]/) && formData.password.match(/[A-Z]/)), 'Majuscules et minuscules'],
                    [!!formData.password.match(/[0-9]/), 'Au moins un chiffre'],
                    [!!formData.password.match(/[^a-zA-Z0-9]/), 'Un caractère spécial (!@#$%^&*)'],
                  ].map(([met, label], i) => (
                    <div key={i} className="flex items-center gap-2">
                      {reqCheck(met as boolean)}
                      <span style={{ fontSize: 'var(--text-xs)', color: met ? 'var(--success)' : 'var(--muted-foreground)' }}>
                        {label as string}
                      </span>
                    </div>
                  ))}
                </div>

                <Button type="submit" className="w-full text-white transition-opacity hover:opacity-90"
                  style={{ background: 'var(--primary-800)', fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-semibold)' }}>
                  Réinitialiser le mot de passe
                </Button>
              </form>
            </>
          ) : (
            /* Success */
            <div className="p-6 rounded-xl text-center"
              style={{ background: 'rgba(74, 140, 110, 0.08)', border: '1px solid rgba(74, 140, 110, 0.2)' }}>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
                style={{ background: 'rgba(74, 140, 110, 0.12)' }}>
                <CheckCircle2 className="w-7 h-7" style={{ color: 'var(--success)' }} />
              </div>
              <h3 className="mb-2" style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', fontFamily: 'var(--font-display)' }}>
                Mot de passe réinitialisé !
              </h3>
              <p className="mb-2" style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)', fontFamily: 'var(--font-body)' }}>
                Votre mot de passe a été mis à jour avec succès.
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}>
                Vous allez être redirigé vers la page de connexion…
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-white/70" style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-body)' }}>
            © 2026 The Learning Society • Formation IA
          </p>
        </div>
      </div>
    </div>
  );
}