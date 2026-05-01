import { useState } from 'react';
import { 
  ChevronLeft,
  Bell,
  Lock,
  Globe,
  CreditCard,
  Shield,
  Mail,
  Smartphone,
  Eye,
  EyeOff,
  Save,
  Trash2,
  User,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { BackgroundBlobs } from '../components/ui/background-blobs';
import OptimizedSidebar from '../components/ui/optimized-sidebar';

interface AccountPageProps {
  onNavigate: (page: 'dashboard' | 'parcours' | 'coaching' | 'learning-space' | 'profile' | 'plan' | 'veille' | 'entreprise-dashboard' | 'account' | 'journal' | 'messages' | 'notifications' | 'leaderboard') => void;
  onLogout: () => void;
}

export default function AccountPage({ onNavigate, onLogout }: AccountPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    newsletter: false,
    courses: true,
    coaching: true,
  });

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with diffuse blobs */}
      <BackgroundBlobs />

      <div className="flex h-screen">
        {/* Sidebar */}
        <OptimizedSidebar
          currentPage="account"
          onNavigate={onNavigate}
          onLogout={onLogout}
          userHasEnterpriseAccess={true}
          userName="Admin1509"
          userEmail="padennery@me.com"
          userInitials="A"
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Top Bar */}
          <div 
            className="sticky top-0 z-30 px-8 py-4 border-b"
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(20px)',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
            }}
          >
            <div className="flex items-center justify-between">
              <button 
                onClick={() => onNavigate('profile')}
                className="flex items-center gap-2 hover:gap-3 transition-all"
                style={{ color: 'var(--foreground)' }}
              >
                <ChevronLeft className="w-5 h-5" />
                Retour au profil
              </button>
            </div>
          </div>

          {/* Content */}
          {/* ✅ CONTENEUR PRINCIPAL - Standard TLS harmonisé */}
          <div style={{
            maxWidth: '1152px',
            margin: '0 auto',
            padding: 'var(--space-10)',
            paddingBottom: 'var(--space-12)',
          }}>
            <h1 className="mb-2" style={{ color: 'var(--foreground)' }}>Paramètres du compte</h1>
            <p className="mb-8" style={{ color: 'var(--muted-foreground)' }}>
              Gérez vos informations personnelles et préférences
            </p>

            <Tabs defaultValue="general" className="w-full">
              <TabsList 
                className="mb-8 p-1.5 rounded-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                <TabsTrigger value="general" className="rounded-xl px-6">
                  <User className="w-4 h-4 mr-2" />
                  Général
                </TabsTrigger>
                <TabsTrigger value="security" className="rounded-xl px-6">
                  <Lock className="w-4 h-4 mr-2" />
                  Sécurité
                </TabsTrigger>
                <TabsTrigger value="notifications" className="rounded-xl px-6">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="billing" className="rounded-xl px-6">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Abonnement
                </TabsTrigger>
              </TabsList>

              {/* General Settings */}
              <TabsContent value="general">
                <div className="space-y-6">
                  {/* Profile Information */}
                  <div 
                    className="rounded-3xl p-8"
                    style={{
                      background: 'rgba(255, 255, 255, 0.6)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <h3 className="mb-6" style={{ color: 'var(--foreground)' }}>
                      Informations personnelles
                    </h3>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm mb-2" style={{ color: 'var(--foreground)' }}>
                            Prénom
                          </label>
                          <input 
                            type="text"
                            defaultValue="Admin"
                            className="w-full p-3 rounded-xl outline-none"
                            style={{
                              background: 'white',
                              border: '1px solid rgba(0, 0, 0, 0.1)',
                              color: 'var(--foreground)',
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-2" style={{ color: 'var(--foreground)' }}>
                            Nom
                          </label>
                          <input 
                            type="text"
                            defaultValue="User"
                            className="w-full p-3 rounded-xl outline-none"
                            style={{
                              background: 'white',
                              border: '1px solid rgba(0, 0, 0, 0.1)',
                              color: 'var(--foreground)',
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm mb-2" style={{ color: 'var(--foreground)' }}>
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
                          <input 
                            type="email"
                            defaultValue="admin@example.com"
                            className="w-full pl-10 pr-4 p-3 rounded-xl outline-none"
                            style={{
                              background: 'white',
                              border: '1px solid rgba(0, 0, 0, 0.1)',
                              color: 'var(--foreground)',
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm mb-2" style={{ color: 'var(--foreground)' }}>
                          Téléphone
                        </label>
                        <div className="relative">
                          <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
                          <input 
                            type="tel"
                            defaultValue="+33 6 12 34 56 78"
                            className="w-full pl-10 pr-4 p-3 rounded-xl outline-none"
                            style={{
                              background: 'white',
                              border: '1px solid rgba(0, 0, 0, 0.1)',
                              color: 'var(--foreground)',
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm mb-2" style={{ color: 'var(--foreground)' }}>
                          Langue
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
                          <select 
                            className="w-full pl-10 pr-4 p-3 rounded-xl outline-none appearance-none"
                            style={{
                              background: 'white',
                              border: '1px solid rgba(0, 0, 0, 0.1)',
                              color: 'var(--foreground)',
                            }}
                          >
                            <option>Français</option>
                            <option>English</option>
                            <option>Español</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <Button 
                        className="flex-1"
                        style={{ background: 'var(--primary)', color: 'white' }}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Enregistrer les modifications
                      </Button>
                      <Button variant="outline">
                        Annuler
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Security Settings */}
              <TabsContent value="security">
                <div className="space-y-6">
                  {/* Password */}
                  <div 
                    className="rounded-3xl p-8"
                    style={{
                      background: 'rgba(255, 255, 255, 0.6)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <h3 className="mb-6" style={{ color: 'var(--foreground)' }}>
                      Modifier le mot de passe
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm mb-2" style={{ color: 'var(--foreground)' }}>
                          Mot de passe actuel
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
                          <input 
                            type={showPassword ? 'text' : 'password'}
                            className="w-full pl-10 pr-12 p-3 rounded-xl outline-none"
                            style={{
                              background: 'white',
                              border: '1px solid rgba(0, 0, 0, 0.1)',
                              color: 'var(--foreground)',
                            }}
                          />
                          <button 
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
                            ) : (
                              <Eye className="w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm mb-2" style={{ color: 'var(--foreground)' }}>
                          Nouveau mot de passe
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
                          <input 
                            type={showPassword ? 'text' : 'password'}
                            className="w-full pl-10 pr-4 p-3 rounded-xl outline-none"
                            style={{
                              background: 'white',
                              border: '1px solid rgba(0, 0, 0, 0.1)',
                              color: 'var(--foreground)',
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm mb-2" style={{ color: 'var(--foreground)' }}>
                          Confirmer le nouveau mot de passe
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
                          <input 
                            type={showPassword ? 'text' : 'password'}
                            className="w-full pl-10 pr-4 p-3 rounded-xl outline-none"
                            style={{
                              background: 'white',
                              border: '1px solid rgba(0, 0, 0, 0.1)',
                              color: 'var(--foreground)',
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <Button 
                      className="w-full mt-6"
                      style={{ background: 'var(--primary)', color: 'white' }}
                    >
                      Modifier le mot de passe
                    </Button>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div 
                    className="rounded-3xl p-8"
                    style={{
                      background: 'rgba(255, 255, 255, 0.6)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: 'var(--primary-50)' }}
                        >
                          <Shield className="w-6 h-6" style={{ color: 'var(--primary)' }} />
                        </div>
                        <div>
                          <h3 className="mb-2" style={{ color: 'var(--foreground)' }}>
                            Authentification à deux facteurs
                          </h3>
                          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                            Ajoutez une couche de sécurité supplémentaire à votre compte
                          </p>
                        </div>
                      </div>
                      <Button variant="outline">
                        Activer
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Notifications Settings */}
              <TabsContent value="notifications">
                <div 
                  className="rounded-3xl p-8"
                  style={{
                    background: 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <h3 className="mb-6" style={{ color: 'var(--foreground)' }}>
                    Préférences de notifications
                  </h3>

                  <div className="space-y-6">
                    {[
                      { key: 'email', label: 'Notifications par email', description: 'Recevoir des emails de mise à jour' },
                      { key: 'push', label: 'Notifications push', description: 'Recevoir des notifications dans le navigateur' },
                      { key: 'newsletter', label: 'Newsletter hebdomadaire', description: 'Recevoir la newsletter chaque semaine' },
                      { key: 'courses', label: 'Nouveaux cours', description: 'Être notifié des nouveaux contenus' },
                      { key: 'coaching', label: 'Sessions de coaching', description: 'Rappels pour vos sessions' },
                    ].map((notif) => (
                      <div 
                        key={notif.key}
                        className="flex items-start justify-between p-4 rounded-2xl"
                        style={{
                          background: 'var(--muted)',
                          border: '1px solid rgba(0, 0, 0, 0.05)',
                        }}
                      >
                        <div className="flex-1">
                          <p className="mb-1" style={{ color: 'var(--foreground)' }}>
                            {notif.label}
                          </p>
                          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                            {notif.description}
                          </p>
                        </div>
                        <button
                          onClick={() => setNotifications(prev => ({
                            ...prev,
                            [notif.key]: !prev[notif.key as keyof typeof notifications]
                          }))}
                          className={`
                            w-12 h-6 rounded-full transition-colors relative
                            ${notifications[notif.key as keyof typeof notifications] 
                              ? 'bg-primary' 
                              : 'bg-muted-foreground/30'
                            }
                          `}
                          style={{
                            background: notifications[notif.key as keyof typeof notifications] 
                              ? 'var(--primary)' 
                              : 'var(--muted)',
                          }}
                        >
                          <div 
                            className={`
                              w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform
                              ${notifications[notif.key as keyof typeof notifications] 
                                ? 'translate-x-6' 
                                : 'translate-x-0.5'
                              }
                            `}
                            style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}
                          />
                        </button>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className="w-full mt-6"
                    style={{ background: 'var(--primary)', color: 'white' }}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Enregistrer les préférences
                  </Button>
                </div>
              </TabsContent>

              {/* Billing Settings */}
              <TabsContent value="billing">
                <div className="space-y-6">
                  {/* Current Plan */}
                  <div 
                    className="rounded-3xl p-8"
                    style={{
                      background: 'rgba(255, 255, 255, 0.6)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="mb-2" style={{ color: 'var(--foreground)' }}>
                          Abonnement actuel
                        </h3>
                        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                          Gérez votre abonnement et facturation
                        </p>
                      </div>
                      <Badge 
                        style={{ background: 'var(--primary)', color: 'white', border: 'none' }}
                      >
                        Premium
                      </Badge>
                    </div>

                    <div 
                      className="p-6 rounded-2xl mb-6"
                      style={{
                        background: 'var(--primary-50)',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                      }}
                    >
                      <p className="text-3xl mb-2" style={{ color: 'var(--foreground)' }}>
                        29€ <span className="text-lg" style={{ color: 'var(--muted-foreground)' }}>/mois</span>
                      </p>
                      <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                        Prochain paiement le 22 janvier 2025
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1">
                        Changer de plan
                      </Button>
                      <Button 
                        variant="outline"
                        style={{ color: 'var(--destructive)', borderColor: 'var(--destructive)' }}
                      >
                        Annuler l'abonnement
                      </Button>
                    </div>
                  </div>

                  {/* Delete Account */}
                  <div 
                    className="rounded-3xl p-8"
                    style={{
                      background: 'rgba(239, 68, 68, 0.05)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'var(--destructive-50)' }}
                      >
                        <Trash2 className="w-6 h-6" style={{ color: 'var(--destructive)' }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-2" style={{ color: 'var(--destructive)' }}>
                          Supprimer mon compte
                        </h3>
                        <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
                          Cette action est irréversible. Toutes vos données seront supprimées définitivement.
                        </p>
                        <Button 
                          variant="outline"
                          style={{ color: 'var(--destructive)', borderColor: 'var(--destructive)' }}
                        >
                          Supprimer mon compte
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}