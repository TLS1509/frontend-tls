import { useState } from 'react';
import { 
  Eye,
  EyeOff,
  Sparkles,
  Mail,
  Lock,
  AlertCircle,
  Star,
  Check
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';

interface PMProLoginPageProps {
  onLogin: () => void;
  onNavigateToOffers?: () => void;
  onNavigateToForgotPassword?: () => void;
}

const membershipStatus = {
  type: 'active', // 'active' | 'expired' | 'trial'
  plan: 'Académie Pro',
  message: '',
};

const benefits = [
  'Accès illimité à tous les parcours IA',
  'Sessions coaching en direct',
  'Certificats professionnels',
];

export default function PMProLoginPage({ onLogin, onNavigateToOffers, onNavigateToForgotPassword }: PMProLoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    
    if (!email.includes('@')) {
      setError('Email invalide');
      return;
    }
    
    onLogin();
  };

  const getStatusMessage = () => {
    switch (membershipStatus.type) {
      case 'expired':
        return {
          text: 'Votre abonnement a expiré',
          color: 'rgba(237, 132, 58, 0.15)', // orange
          borderColor: 'rgba(237, 132, 58, 0.3)',
          textColor: '#F8B044',
        };
      case 'trial':
        return {
          text: 'Bienvenue ! Profitez de votre essai gratuit',
          color: 'rgba(34, 197, 94, 0.15)', // green
          borderColor: 'rgba(34, 197, 94, 0.3)',
          textColor: '#22C55E',
        };
      default:
        return null;
    }
  };

  const statusMessage = getStatusMessage();

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4">
      {/* Gradient Background */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: [
            'radial-gradient(circle at 0% 0%, rgba(85, 161, 180, 0.65) 0%, rgba(58, 112, 125, 0.45) 45%, rgba(45, 87, 97, 0.25) 70%, rgba(31, 62, 69, 0.05) 100%)',
            'linear-gradient(145deg, var(--primary-300) 0%, var(--primary-600) 45%, var(--primary-800) 75%, var(--primary-900) 100%)',
          ].join(', '),
        }}
      />
      
      {/* Animated blobs */}
      <div 
        className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-30 blur-3xl animate-pulse"
        style={{
          background: 'radial-gradient(circle, var(--primary-300), transparent)',
          animationDuration: '4s',
        }}
      />
      <div 
        className="absolute bottom-20 left-20 w-80 h-80 rounded-full opacity-20 blur-3xl animate-pulse"
        style={{
          background: 'radial-gradient(circle, var(--accent-300), transparent)',
          animationDuration: '6s',
          animationDelay: '1s',
        }}
      />

      {/* Login Card */}
      <div className="w-full max-w-md relative">
        <div 
          className="relative rounded-2xl p-8 md:p-10"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <Badge 
              className="mb-3"
              style={{ 
                background: 'linear-gradient(135deg, var(--accent), var(--secondary))',
                color: 'white',
                border: 'none',
              }}
            >
              <Star className="w-3 h-3 mr-1" />
              Espace Membre
            </Badge>
            <h1 className="text-white mb-2">Accédez à votre espace membre</h1>
            <p className="text-white/80" style={{ fontSize: 'var(--text-sm)' }}>
              Connectez-vous pour profiter de tous vos avantages
            </p>
          </div>

          {/* Status Message */}
          {statusMessage && (
            <div 
              className="mb-6 p-4 rounded-lg flex items-start gap-3"
              style={{
                background: statusMessage.color,
                border: `1px solid ${statusMessage.borderColor}`,
              }}
            >
              <AlertCircle 
                className="w-5 h-5 flex-shrink-0 mt-0.5" 
                style={{ color: statusMessage.textColor }}
              />
              <p className="text-sm" style={{ color: statusMessage.textColor }}>
                {statusMessage.text}
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div 
              className="mb-6 p-4 rounded-lg flex items-start gap-3"
              style={{
                background: 'rgba(212, 24, 61, 0.15)',
                border: '1px solid rgba(212, 24, 61, 0.3)',
              }}
            >
              <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-white/90 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Votre email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  required
                  className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/30 pl-12"
                  style={{
                    backdropFilter: 'blur(10px)',
                  }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-white/90 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  required
                  className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/30 pl-12 pr-12"
                  style={{
                    backdropFilter: 'blur(10px)',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/90 transition-tls"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-white/80 cursor-pointer">
                <input
                  type="checkbox"
                  checked={stayLoggedIn}
                  onChange={(e) => setStayLoggedIn(e.target.checked)}
                  className="mr-2 rounded"
                  style={{
                    accentColor: 'var(--primary)',
                  }}
                />
                Rester connecté sur cet appareil
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-white/90 hover:bg-white text-foreground transition-tls"
              style={{
                backdropFilter: 'blur(10px)',
              }}
            >
              Se connecter
            </Button>
          </form>

          {/* Forgot password */}
          <div className="text-center mt-4">
            <button 
              type="button"
              onClick={onNavigateToForgotPassword}
              className="text-white/80 hover:text-white text-sm transition-tls hover:underline"
            >
              Mot de passe oublié ?
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 text-white/60 bg-transparent">Pas encore membre ?</span>
            </div>
          </div>

          {/* Membership teaser */}
          <div 
            className="rounded-xl p-5 mb-4"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <h3 className="text-white mb-3 text-sm">Rejoignez la communauté Learning App</h3>
            <div className="space-y-2 mb-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-white/80">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--success)' }} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            <Button
              onClick={onNavigateToOffers}
              variant="outline"
              className="w-full border-white/40 text-white hover:bg-white/10"
            >
              Découvrir nos offres
            </Button>
          </div>

          {/* Footer links */}
          <div className="flex items-center justify-center gap-4 text-xs text-white/60">
            <button className="hover:text-white/80 transition-tls">CGV</button>
            <span>•</span>
            <button className="hover:text-white/80 transition-tls">Support</button>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="mt-8 text-center">
          <p className="text-white/60 text-xs">
            © 2024 The Learning Society • Formation IA
          </p>
        </div>
      </div>
    </div>
  );
}