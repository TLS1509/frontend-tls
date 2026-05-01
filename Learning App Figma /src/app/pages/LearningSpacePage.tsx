import { useState } from 'react';
import { 
  Home,
  BookOpen,
  Calendar,
  User,
  Sparkles,
  BarChart3,
  FileText,
  Search,
  Filter,
  Star,
  Clock,
  Play,
  Users,
  TrendingUp,
  Award,
  Video,
  FileQuestion,
  Lightbulb,
  ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { BackgroundBlobs } from '../components/ui/background-blobs';

interface LearningSpacePageProps {
  onNavigate: (page: 'dashboard' | 'parcours' | 'coaching' | 'learning-space' | 'profile' | 'plan' | 'veille' | 'entreprise-dashboard') => void;
  onLogout: () => void;
}

const featuredContent = [
  {
    id: 1,
    title: 'Master Class : IA et Pédagogie',
    type: 'masterclass' as const,
    instructor: 'Sophie Martin',
    thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=500&fit=crop',
    duration: '2h30',
    students: 1240,
    rating: 4.9,
    date: 'Live demain 14h',
  },
  {
    id: 2,
    title: 'Workshop : Créer des prompts avancés',
    type: 'workshop' as const,
    instructor: 'Thomas Dubois',
    thumbnail: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?w=800&h=500&fit=crop',
    duration: '3h',
    students: 856,
    rating: 4.8,
    date: 'Vendredi 10h',
  },
];

const categories = [
  {
    id: 'all',
    name: 'Tous les contenus',
    icon: Sparkles,
    count: 245,
  },
  {
    id: 'courses',
    name: 'Cours',
    icon: BookOpen,
    count: 127,
  },
  {
    id: 'videos',
    name: 'Vidéos',
    icon: Video,
    count: 89,
  },
  {
    id: 'masterclass',
    name: 'Master Class',
    icon: Award,
    count: 12,
  },
  {
    id: 'workshop',
    name: 'Workshops',
    icon: Users,
    count: 17,
  },
];

const popularContent = [
  {
    id: 3,
    title: 'GPT-4 pour les formateurs : Guide complet',
    type: 'course',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
    duration: '8h',
    lessons: 24,
    level: 'Intermédiaire',
    rating: 4.9,
    students: 2340,
  },
  {
    id: 4,
    title: 'Automatiser vos contenus pédagogiques',
    type: 'course',
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
    duration: '6h',
    lessons: 18,
    level: 'Avancé',
    rating: 4.8,
    students: 1890,
  },
  {
    id: 5,
    title: 'IA éthique en formation',
    type: 'course',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop',
    duration: '5h',
    lessons: 15,
    level: 'Débutant',
    rating: 4.7,
    students: 1560,
  },
  {
    id: 6,
    title: 'Design d\'expérience avec l\'IA',
    type: 'course',
    thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop',
    duration: '10h',
    lessons: 30,
    level: 'Intermédiaire',
    rating: 4.9,
    students: 2100,
  },
];

const trendingTopics = [
  { id: 1, name: 'ChatGPT', trend: '+24%' },
  { id: 2, name: 'Prompt Engineering', trend: '+18%' },
  { id: 3, name: 'IA Pédagogique', trend: '+15%' },
  { id: 4, name: 'Automatisation', trend: '+12%' },
];

const navItems = [
  { icon: Home, label: 'Dashboard', page: 'dashboard' as const },
  { icon: BookOpen, label: 'Parcours', page: 'parcours' as const },
  { icon: Calendar, label: 'Coaching', page: 'coaching' as const },
  { icon: Sparkles, label: 'Learning Space', page: 'learning-space' as const, active: true },
  { icon: BarChart3, label: 'Mon Plan', page: 'plan' as const },
  { icon: FileText, label: 'Veille IA', page: 'veille' as const },
  { icon: User, label: 'Profil', page: 'profile' as const },
];

export default function LearningSpacePage({ onNavigate, onLogout }: LearningSpacePageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with diffuse blobs */}
      <BackgroundBlobs />

      <div className="flex h-screen">
        {/* Sidebar */}
        <aside 
          className="w-72 flex-shrink-0 p-6 border-r relative"
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Logo */}
          <div className="mb-12">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center relative"
                style={{
                  background: 'var(--gradient-primary)',
                  boxShadow: '0 8px 24px rgba(85, 161, 180, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                }}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 style={{ color: 'var(--foreground)' }}>Learning App</h2>
                <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Formation IA</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 mb-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => onNavigate(item.page)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                    ${item.active 
                      ? 'text-white shadow-lg' 
                      : 'hover:bg-white/40'
                    }
                  `}
                  style={item.active ? {
                    background: 'var(--gradient-primary)',
                    boxShadow: '0 8px 24px rgba(85, 161, 180, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  } : {
                    color: 'var(--foreground)',
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User card */}
          <div 
            className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
            }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                style={{ background: 'var(--gradient-primary)' }}
              >
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate" style={{ color: 'var(--foreground)' }}>Admin1509</p>
                <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Niveau 12</p>
              </div>
            </div>
          </div>
        </aside>

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
              <div>
                <h1 style={{ color: 'var(--foreground)' }}>Learning Space</h1>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  Explorez notre bibliothèque de contenus IA
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Search bar */}
                <div 
                  className="relative w-80"
                  style={{
                    background: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '12px',
                  }}
                >
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
                  <input 
                    type="text"
                    placeholder="Rechercher un contenu..."
                    className="w-full pl-10 pr-4 py-2.5 bg-transparent text-sm outline-none"
                    style={{ color: 'var(--foreground)' }}
                  />
                </div>

                <button 
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                  }}
                >
                  <Filter className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
                  <span style={{ color: 'var(--foreground)' }}>Filtres</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Categories */}
            <div className="grid grid-cols-5 gap-4 mb-8">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className="p-6 rounded-2xl text-center transition-all duration-300 hover:scale-105"
                    style={isActive ? {
                      background: 'var(--primary-50)',
                      border: '1px solid var(--primary)',
                    } : {
                      background: 'rgba(255, 255, 255, 0.6)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    <Icon 
                      className="w-8 h-8 mx-auto mb-3" 
                      style={{ color: isActive ? 'var(--primary)' : 'var(--foreground)' }} 
                    />
                    <p className="text-sm mb-1" style={{ color: 'var(--foreground)' }}>
                      {category.name}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                      {category.count} contenus
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Featured Content */}
                <div>
                  <h2 className="mb-6" style={{ color: 'var(--foreground)' }}>À la une</h2>
                  <div className="space-y-6">
                    {featuredContent.map((content) => (
                      <div
                        key={content.id}
                        className="rounded-3xl overflow-hidden hover:scale-102 transition-all duration-300 cursor-pointer"
                        style={{
                          background: 'rgba(255, 255, 255, 0.6)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        }}
                      >
                        <div className="relative h-64">
                          <img 
                            src={content.thumbnail}
                            alt={content.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute top-6 left-6">
                            <Badge 
                              style={{ 
                                background: content.type === 'masterclass' ? 'var(--secondary)' : 'var(--primary)', 
                                color: 'white', 
                                border: 'none' 
                              }}
                            >
                              {content.type === 'masterclass' ? '🎓 Master Class' : '🛠️ Workshop'}
                            </Badge>
                          </div>
                          <div className="absolute bottom-6 left-6 right-6">
                            <h3 className="text-white mb-2">{content.title}</h3>
                            <p className="text-white/80 text-sm mb-3">Par {content.instructor}</p>
                            <div className="flex items-center gap-4 text-white/90 text-sm">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {content.duration}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {content.students}
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-current" />
                                {content.rating}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2" style={{ color: 'var(--secondary)' }}>
                              <Play className="w-5 h-5" />
                              <span className="text-sm">{content.date}</span>
                            </div>
                            <Button 
                              style={{ background: 'var(--primary)', color: 'white' }}
                            >
                              S'inscrire
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Popular Content */}
                <div>
                  <h2 className="mb-6" style={{ color: 'var(--foreground)' }}>Contenus populaires</h2>
                  <div className="grid grid-cols-2 gap-6">
                    {popularContent.map((content) => (
                      <div
                        key={content.id}
                        className="group rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer"
                        style={{
                          background: 'rgba(255, 255, 255, 0.6)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        }}
                        onClick={() => onNavigate('parcours')}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={content.thumbnail}
                            alt={content.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div 
                              className="w-16 h-16 rounded-2xl flex items-center justify-center"
                              style={{ background: 'rgba(255, 255, 255, 0.9)' }}
                            >
                              <Play className="w-8 h-8" style={{ color: 'var(--primary)' }} />
                            </div>
                          </div>
                          <Badge 
                            className="absolute top-4 left-4"
                            style={{ background: 'var(--primary)', color: 'white', border: 'none' }}
                          >
                            {content.level}
                          </Badge>
                        </div>
                        <div className="p-6">
                          <h3 className="mb-3 line-clamp-2" style={{ color: 'var(--foreground)' }}>
                            {content.title}
                          </h3>
                          <div className="flex items-center gap-4 mb-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {content.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              {content.lessons} leçons
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-current" style={{ color: 'var(--accent)' }} />
                                <span style={{ color: 'var(--foreground)' }}>{content.rating}</span>
                              </div>
                              <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                                {content.students}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Trending Topics */}
                <div 
                  className="rounded-3xl p-8"
                  style={{
                    background: 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="w-6 h-6" style={{ color: 'var(--primary)' }} />
                    <h3 style={{ color: 'var(--foreground)' }}>Tendances</h3>
                  </div>
                  <div className="space-y-4">
                    {trendingTopics.map((topic) => (
                      <div
                        key={topic.id}
                        className="flex items-center justify-between p-4 rounded-xl hover:bg-white/40 transition-colors cursor-pointer"
                      >
                        <span style={{ color: 'var(--foreground)' }}>{topic.name}</span>
                        <Badge 
                          style={{ background: 'var(--success-50)', color: 'var(--success)', border: 'none' }}
                        >
                          {topic.trend}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div 
                  className="rounded-3xl p-8"
                  style={{
                    background: 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <h3 className="mb-6" style={{ color: 'var(--foreground)' }}>Vos statistiques</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                          Contenus suivis
                        </span>
                        <span style={{ color: 'var(--foreground)' }}>12</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                          Heures cette semaine
                        </span>
                        <span style={{ color: 'var(--foreground)' }}>8h</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                          Certificats obtenus
                        </span>
                        <span style={{ color: 'var(--success)' }}>5</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Card */}
                <div 
                  className="rounded-3xl p-8 text-center"
                  style={{
                    background: 'var(--primary-50)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(85, 161, 180, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Lightbulb className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--primary)' }} />
                  <h3 className="mb-2" style={{ color: 'var(--foreground)' }}>
                    Besoin de conseils ?
                  </h3>
                  <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
                    Nos experts peuvent vous aider à choisir le bon parcours
                  </p>
                  <Button 
                    className="w-full"
                    onClick={() => onNavigate('coaching')}
                    style={{ background: 'var(--primary)', color: 'white' }}
                  >
                    Réserver un coaching
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}