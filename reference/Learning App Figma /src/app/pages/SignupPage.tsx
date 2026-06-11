import { useState } from 'react';
import {
  Eye, EyeOff, Sparkles, Mail, Lock, User, AlertCircle, CheckCircle2,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

interface SignupPageProps {
  onSignup: () => void;
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

export default function SignupPage({ onSignup, onNavigateToLogin }: SignupPageProps) {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
    setError(''); setSuccess('');
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Veuillez remplir tous les champs'); return;
    }
    if (!formData.email.includes('@')) { setError('Email invalide'); return; }
    if (formData.password.length < 8) { setError('Le mot de passe doit contenir au moins 8 caractères'); return; }
    if (formData.password !== formData.confirmPassword) { setError('Les mots de passe ne correspondent pas'); return; }
    if (!acceptTerms) { setError("Vous devez accepter les conditions d'utilisation"); return; }
    setSuccess('Compte créé avec succès ! Redirection…');
    setTimeout(() => onSignup(), 1500);
  };

  const handleSocialSignup = () => onSignup();

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
      {/* Background */}
      <div className="absolute inset-0 -z-10" style={authBg} />
      <div className="absolute -top-32 left-1/3 w-[700px] h-[700px] rounded-full blur-3xl opacity-60 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(180, 230, 240, 0.55), transparent 65%)' }} />
      <div className="absolute bottom-0 -left-20 w-96 h-96 rounded-full blur-3xl opacity-50 animate-pulse pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(42, 140, 155, 0.4), transparent 65%)', animationDuration: '7s' }} />
      <div className="absolute top-10 right-10 w-72 h-72 rounded-full blur-3xl opacity-30 animate-pulse pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(100, 200, 215, 0.5), transparent 65%)', animationDuration: '5s', animationDelay: '1s' }} />

      {/* Card */}
      <div className="w-full max-w-[440px] relative my-8">
        <div className="relative rounded-2xl p-8 md:p-10" style={authCard}>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
              style={{ background: 'rgba(85, 161, 180, 0.12)', border: '1px solid rgba(85, 161, 180, 0.2)' }}>
              <Sparkles className="w-5 h-5" style={{ color: 'var(--primary)' }} />
            </div>
            <h2 className="mb-1.5" style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)', fontSize: 'var(--text-xl)' }}>
              The Learning App
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}>
              Créez votre compte pour commencer
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 rounded-lg flex items-start gap-2"
              style={{ background: 'rgba(169, 50, 38, 0.08)', border: '1px solid rgba(169, 50, 38, 0.2)' }}>
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--destructive)' }} />
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--destructive)' }}>{error}</p>
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-4 p-3 rounded-lg flex items-start gap-2"
              style={{ background: 'rgba(74, 140, 110, 0.1)', border: '1px solid rgba(74, 140, 110, 0.25)' }}>
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--success)' }} />
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--success)' }}>{success}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="firstName" className="block mb-1.5" style={labelStyle}>Prénom</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                  <Input id="firstName" type="text" placeholder="Prénom"
                    value={formData.firstName} onChange={(e) => handleChange('firstName', e.target.value)}
                    required className="w-full pl-10" style={authInput} />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-1.5" style={labelStyle}>Nom</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                  <Input id="lastName" type="text" placeholder="Nom"
                    value={formData.lastName} onChange={(e) => handleChange('lastName', e.target.value)}
                    required className="w-full pl-10" style={authInput} />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-1.5" style={labelStyle}>Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                <Input id="email" type="email" placeholder="votre@email.com"
                  value={formData.email} onChange={(e) => handleChange('email', e.target.value)}
                  required className="w-full pl-10" style={authInput} />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block mb-1.5" style={labelStyle}>Mot de passe</label>
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
              {/* Strength indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div key={level} className="h-1 flex-1 rounded-full transition-all duration-300" style={{
                        background: strength >= level ? strengthColors[strength] : 'rgba(0,0,0,0.1)',
                      }} />
                    ))}
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: strength >= 3 ? 'var(--success)' : 'var(--muted-foreground)' }}>
                    {strengthLabels[strength] || 'Trop court'}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block mb-1.5" style={labelStyle}>Confirmer le mot de passe</label>
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

            {/* Terms */}
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)}
                className="rounded mt-0.5" style={{ accentColor: 'var(--primary)', width: '15px', height: '15px', flexShrink: 0 }} />
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)', lineHeight: '1.5' }}>
                J'accepte les{' '}
                <button type="button" className="hover:underline" style={{ color: 'var(--primary)', fontWeight: 'var(--font-weight-medium)' }}>
                  conditions d'utilisation
                </button>
                {' '}et la{' '}
                <button type="button" className="hover:underline" style={{ color: 'var(--primary)', fontWeight: 'var(--font-weight-medium)' }}>
                  politique de confidentialité
                </button>
              </span>
            </label>

            {/* CTA */}
            <Button type="submit" className="w-full text-white transition-opacity hover:opacity-90"
              style={{ background: 'var(--primary-800)', fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-semibold)' }}>
              Créer mon compte
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 border-t" style={{ borderColor: 'rgba(0,0,0,0.1)' }} />
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}>
              ou continuer avec
            </span>
            <div className="flex-1 border-t" style={{ borderColor: 'rgba(0,0,0,0.1)' }} />
          </div>

          {/* Social */}
          <div className="space-y-3">
            <Button type="button" onClick={handleSocialSignup} variant="outline"
              className="w-full flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
              style={{ background: 'white', border: '1px solid rgba(0,0,0,0.12)', color: 'var(--foreground)', fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-medium)' }}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M19.9895 10.1871C19.9895 9.36767 19.9214 8.76973 19.7742 8.14966H10.1992V11.848H15.8195C15.7062 12.7671 15.0943 14.1512 13.7346 15.0813L13.7155 15.2051L16.7429 17.4969L16.9527 17.5174C18.8789 15.7789 19.9895 13.221 19.9895 10.1871Z" fill="#4285F4" />
                <path d="M10.1993 19.9313C12.9527 19.9313 15.2643 19.0454 16.9527 17.5174L13.7346 15.0813C12.8734 15.6682 11.7176 16.0779 10.1993 16.0779C7.50243 16.0779 5.21352 14.3395 4.39759 11.9366L4.27799 11.9466L1.13003 14.3273L1.08887 14.4391C2.76588 17.6945 6.21061 19.9313 10.1993 19.9313Z" fill="#34A853" />
                <path d="M4.39748 11.9366C4.18219 11.3166 4.05759 10.6521 4.05759 9.96565C4.05759 9.27909 4.18219 8.61473 4.38615 7.99466L4.38045 7.8626L1.19304 5.44366L1.08875 5.49214C0.397576 6.84305 0.000976562 8.36008 0.000976562 9.96565C0.000976562 11.5712 0.397576 13.0882 1.08875 14.4391L4.39748 11.9366Z" fill="#FBBC05" />
                <path d="M10.1993 3.85336C12.1142 3.85336 13.406 4.66168 14.1425 5.33717L17.0207 2.59107C15.253 0.985496 12.9527 0 10.1993 0C6.2106 0 2.76588 2.23672 1.08887 5.49214L4.38626 7.99466C5.21352 5.59183 7.50242 3.85336 10.1993 3.85336Z" fill="#EB4335" />
              </svg>
              Google
            </Button>
            <Button type="button" onClick={handleSocialSignup} variant="outline"
              className="w-full flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
              style={{ background: 'white', border: '1px solid rgba(0,0,0,0.12)', color: 'var(--foreground)', fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-medium)' }}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <rect width="20" height="20" rx="3" fill="#0A66C2" />
                <path d="M6.25 16.25H3.75V8.125H6.25V16.25ZM5 6.875C4.30964 6.875 3.75 6.31536 3.75 5.625C3.75 4.93464 4.30964 4.375 5 4.375C5.69036 4.375 6.25 4.93464 6.25 5.625C6.25 6.31536 5.69036 6.875 5 6.875ZM16.25 16.25H13.75V12.1875C13.75 11.0625 13.4375 10.3125 12.5 10.3125C11.5625 10.3125 11.25 11.0625 11.25 12.1875V16.25H8.75V8.125H11.25V9.375C11.5625 8.75 12.5 8.125 13.75 8.125C15.3125 8.125 16.25 9.0625 16.25 11.25V16.25Z" fill="white" />
              </svg>
              LinkedIn
            </Button>
          </div>

          {/* Login link */}
          <div className="text-center mt-6">
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}>
              Déjà un compte ?{' '}
              <button type="button" onClick={onNavigateToLogin} className="hover:underline transition-colors"
                style={{ color: 'var(--primary)', fontWeight: 'var(--font-weight-semibold)' }}>
                Se connecter
              </button>
            </p>
          </div>
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