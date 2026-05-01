import { useState, useEffect } from 'react';
import { 
  Plus,
  Search,
  BookMarked,
  BookOpen,
  Sparkles,
  Target,
  Lightbulb,
  Tag,
  Filter,
  Calendar,
  TrendingUp,
  PenLine,
  ArrowRight,
  Flame,
  Clock,
} from 'lucide-react';
import { BackgroundBlobs } from '../components/ui/background-blobs';
import OptimizedSidebar from '../components/ui/optimized-sidebar';
import { journalEntries } from '../data/journalEntries';
import { PageHeaderSimple } from '../components/common/PageHeaderSimple';
import { SectionHeader } from '../components/common/SectionHeader';

// ✅ Import upgraded components
import { EmptyState } from '../components/ui/empty-state';
import { ButtonEnhanced } from '../components/ui/button-enhanced';
import { Celebration } from '../components/ui/celebration';
import { useToast, ToastContainer } from '../components/ui/notification-toast';
import { SearchBarWithFilters } from '../components/common/SearchBarWithFilters';
import { journalFilters } from '../components/common/AdvancedFilterBar';

interface JournalPageProps {
  onNavigate: (page: 'dashboard' | 'parcours' | 'coaching' | 'learning-space' | 'profile' | 'veille' | 'entreprise-dashboard' | 'journal' | 'journal-detail' | 'journal-free-entry' | 'account', entryId?: number) => void;
  onLogout: () => void;
}

// Template configuration
const templateConfig = {
  guided: {
    icon: BookOpen,
    label: 'Réflexion',
    color: 'var(--primary)',
    bgColor: 'var(--primary-lighter)',
    emoji: '📚',
  },
  free: {
    icon: Sparkles,
    label: 'Libre',
    color: 'var(--accent)',
    bgColor: 'var(--accent-lighter)',
    emoji: '✨',
  },
  learning: {
    icon: BookMarked,
    label: 'Apprentissage',
    color: 'var(--secondary)',
    bgColor: 'var(--secondary-lighter)',
    emoji: '📖',
  },
  coaching: {
    icon: Target,
    label: 'Coaching',
    color: 'var(--coral)',
    bgColor: 'var(--coral-lighter)',
    emoji: '🎯',
  },
  insight: {
    icon: Lightbulb,
    label: 'Insight',
    color: 'var(--teal)',
    bgColor: 'var(--teal-lighter)',
    emoji: '💡',
  },
};

export default function JournalPageUpgraded({ onNavigate, onLogout }: JournalPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [filteredEntries, setFilteredEntries] = useState(journalEntries);
  const [showFirstEntryCelebration, setShowFirstEntryCelebration] = useState(false);

  // ✅ Toast notifications
  const { toasts, success, info, removeToast } = useToast();

  // Check if first entry (for celebration)
  useEffect(() => {
    const hasShownFirstEntry = localStorage.getItem('journal_first_entry_celebration');
    if (!hasShownFirstEntry && journalEntries.length === 1) {
      setShowFirstEntryCelebration(true);
      localStorage.setItem('journal_first_entry_celebration', 'true');
    }
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = journalEntries;

    // Search
    if (searchQuery) {
      filtered = filtered.filter(entry => 
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Type filter (from AdvancedFilterBar)
    const selectedTypes = activeFilters.type || [];
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(entry => selectedTypes.includes(entry.templateType));
    }

    // Period filter
    const period = activeFilters.period;
    if (period && period !== 'all') {
      const now = new Date();
      filtered = filtered.filter(entry => {
        const entryDate = new Date(entry.date);
        if (period === 'today') {
          return entryDate.toDateString() === now.toDateString();
        } else if (period === 'week') {
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return entryDate >= weekAgo;
        } else if (period === 'month') {
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return entryDate >= monthAgo;
        } else if (period === 'quarter') {
          const quarterAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          return entryDate >= quarterAgo;
        }
        return true;
      });
    }

    setFilteredEntries(filtered);
  }, [searchQuery, activeFilters]);

  // Stats
  const stats = {
    total: journalEntries.length,
    thisWeek: journalEntries.filter(e => {
      const entryDate = new Date(e.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return entryDate >= weekAgo;
    }).length,
    totalTags: new Set(journalEntries.flatMap(e => e.tags)).size,
    streak: 3, // Mock streak
  };

  const handleCreateEntry = (type: 'guided' | 'free') => {
    if (type === 'guided') {
      onNavigate('journal-free-entry');
    } else {
      onNavigate('journal-free-entry');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(to bottom right, var(--primary-50), white, var(--accent-50))' }}>
      <BackgroundBlobs />

      <div className="flex h-screen">
        <OptimizedSidebar 
          currentPage="journal"
          onNavigate={onNavigate} 
          onLogout={onLogout}
          userHasEnterpriseAccess={true}
          userName="Admin1509"
          userEmail="padennery@me.com"
          userInitials="A"
        />

        <main className="flex-1 overflow-y-auto">
          {/* ✅ CONTENEUR PRINCIPAL - Standard TLS harmonisé */}
          <div style={{
            maxWidth: '1152px',
            margin: '0 auto',
            padding: 'var(--space-10)',
            paddingBottom: 'var(--space-12)',
          }}>
            
            {/* ========== HEADER ========== */}
            <PageHeaderSimple
              title="Journal de bord"
              description="Conservez vos réflexions et capturez vos apprentissages clés"
              actions={
                journalEntries.length > 0 ? (
                  <ButtonEnhanced
                    variant="primary"
                    size="md"
                    icon={<Plus className="w-5 h-5" />}
                    onClick={() => handleCreateEntry('guided')}
                  >
                    Nouvelle entrée
                  </ButtonEnhanced>
                ) : undefined
              }
            />

            {/* ========== CATEGORY BUTTONS CONTAINER (Plus centré) ========== */}
            {journalEntries.length > 0 && (
              <div style={{
                maxWidth: '900px', // Container plus étroit que le 1152px de la page
                margin: '0 auto',
                marginBottom: 'var(--space-8)',
              }}>
                <div style={{ 
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--space-3)',
                  justifyContent: 'center',
                }}>
                  {/* Réflexions */}
                  <button 
                    className="transition-all duration-300"
                    style={{
                      background: activeFilters.type?.includes('guided') ? 'rgba(85, 161, 180, 0.12)' : 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: activeFilters.type?.includes('guided') ? '1.5px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.06)',
                      borderRadius: 'var(--radius-full)',
                      padding: 'var(--space-2) var(--space-4)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      const currentTypes = activeFilters.type || [];
                      const newTypes = currentTypes.includes('guided') 
                        ? currentTypes.filter(t => t !== 'guided')
                        : [...currentTypes, 'guided'];
                      setActiveFilters({ ...activeFilters, type: newTypes });
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px 0 rgba(85, 161, 180, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px 0 rgba(0, 0, 0, 0.06)';
                    }}
                  >
                    <BookOpen className="w-4 h-4" style={{ color: 'var(--primary)', strokeWidth: 2 }} />
                    <span style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--foreground)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}>
                      Réflexions
                    </span>
                    <span style={{ 
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--primary)',
                      fontWeight: 'var(--font-weight-bold)',
                      background: 'rgba(85, 161, 180, 0.1)',
                      padding: '2px var(--space-2)',
                      borderRadius: 'var(--radius-full)',
                    }}>
                      {journalEntries.filter(e => e.templateType === 'guided').length}
                    </span>
                  </button>

                  {/* Libres */}
                  <button 
                    className="transition-all duration-300"
                    style={{
                      background: activeFilters.type?.includes('free') ? 'rgba(248, 176, 68, 0.12)' : 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: activeFilters.type?.includes('free') ? '1.5px solid var(--accent)' : '1px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.06)',
                      borderRadius: 'var(--radius-full)',
                      padding: 'var(--space-2) var(--space-4)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      const currentTypes = activeFilters.type || [];
                      const newTypes = currentTypes.includes('free') 
                        ? currentTypes.filter(t => t !== 'free')
                        : [...currentTypes, 'free'];
                      setActiveFilters({ ...activeFilters, type: newTypes });
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px 0 rgba(248, 176, 68, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px 0 rgba(0, 0, 0, 0.06)';
                    }}
                  >
                    <Sparkles className="w-4 h-4" style={{ color: 'var(--accent)', strokeWidth: 2 }} />
                    <span style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--foreground)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}>
                      Libres
                    </span>
                    <span style={{ 
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--accent)',
                      fontWeight: 'var(--font-weight-bold)',
                      background: 'rgba(248, 176, 68, 0.1)',
                      padding: '2px var(--space-2)',
                      borderRadius: 'var(--radius-full)',
                    }}>
                      {journalEntries.filter(e => e.templateType === 'free').length}
                    </span>
                  </button>

                  {/* Apprentissages */}
                  <button 
                    className="transition-all duration-300"
                    style={{
                      background: activeFilters.type?.includes('learning') ? 'rgba(237, 132, 58, 0.12)' : 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: activeFilters.type?.includes('learning') ? '1.5px solid var(--secondary)' : '1px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.06)',
                      borderRadius: 'var(--radius-full)',
                      padding: 'var(--space-2) var(--space-4)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      const currentTypes = activeFilters.type || [];
                      const newTypes = currentTypes.includes('learning') 
                        ? currentTypes.filter(t => t !== 'learning')
                        : [...currentTypes, 'learning'];
                      setActiveFilters({ ...activeFilters, type: newTypes });
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px 0 rgba(237, 132, 58, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px 0 rgba(0, 0, 0, 0.06)';
                    }}
                  >
                    <BookMarked className="w-4 h-4" style={{ color: 'var(--secondary)', strokeWidth: 2 }} />
                    <span style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--foreground)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}>
                      Apprentissages
                    </span>
                    <span style={{ 
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--secondary)',
                      fontWeight: 'var(--font-weight-bold)',
                      background: 'rgba(237, 132, 58, 0.1)',
                      padding: '2px var(--space-2)',
                      borderRadius: 'var(--radius-full)',
                    }}>
                      {journalEntries.filter(e => e.templateType === 'learning').length}
                    </span>
                  </button>

                  {/* Coaching */}
                  <button 
                    className="transition-all duration-300"
                    style={{
                      background: activeFilters.type?.includes('coaching') ? 'rgba(244, 154, 118, 0.12)' : 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: activeFilters.type?.includes('coaching') ? '1.5px solid var(--coral)' : '1px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.06)',
                      borderRadius: 'var(--radius-full)',
                      padding: 'var(--space-2) var(--space-4)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      const currentTypes = activeFilters.type || [];
                      const newTypes = currentTypes.includes('coaching') 
                        ? currentTypes.filter(t => t !== 'coaching')
                        : [...currentTypes, 'coaching'];
                      setActiveFilters({ ...activeFilters, type: newTypes });
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px 0 rgba(244, 154, 118, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px 0 rgba(0, 0, 0, 0.06)';
                    }}
                  >
                    <Target className="w-4 h-4" style={{ color: 'var(--coral)', strokeWidth: 2 }} />
                    <span style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--foreground)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}>
                      Coaching
                    </span>
                    <span style={{ 
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--coral)',
                      fontWeight: 'var(--font-weight-bold)',
                      background: 'rgba(244, 154, 118, 0.1)',
                      padding: '2px var(--space-2)',
                      borderRadius: 'var(--radius-full)',
                    }}>
                      {journalEntries.filter(e => e.templateType === 'coaching').length}
                    </span>
                  </button>

                  {/* Insights */}
                  <button 
                    className="transition-all duration-300"
                    style={{
                      background: activeFilters.type?.includes('insight') ? 'rgba(157, 190, 186, 0.12)' : 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: activeFilters.type?.includes('insight') ? '1.5px solid var(--teal)' : '1px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.06)',
                      borderRadius: 'var(--radius-full)',
                      padding: 'var(--space-2) var(--space-4)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      const currentTypes = activeFilters.type || [];
                      const newTypes = currentTypes.includes('insight') 
                        ? currentTypes.filter(t => t !== 'insight')
                        : [...currentTypes, 'insight'];
                      setActiveFilters({ ...activeFilters, type: newTypes });
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px 0 rgba(157, 190, 186, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px 0 rgba(0, 0, 0, 0.06)';
                    }}
                  >
                    <Lightbulb className="w-4 h-4" style={{ color: 'var(--teal)', strokeWidth: 2 }} />
                    <span style={{ 
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--foreground)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}>
                      Insights
                    </span>
                    <span style={{ 
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--teal)',
                      fontWeight: 'var(--font-weight-bold)',
                      background: 'rgba(157, 190, 186, 0.1)',
                      padding: '2px var(--space-2)',
                      borderRadius: 'var(--radius-full)',
                    }}>
                      {journalEntries.filter(e => e.templateType === 'insight').length}
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* ========== SEARCH & FILTERS (900px centré) ========== */}
            {journalEntries.length > 0 && (
              <div style={{
                maxWidth: '900px',
                margin: '0 auto',
                marginBottom: 'var(--space-8)',
              }}>
                <SearchBarWithFilters
                  searchValue={searchQuery}
                  onSearchChange={setSearchQuery}
                  searchPlaceholder="Rechercher dans vos entrées..."
                  filters={journalFilters}
                  activeFilters={activeFilters}
                  onFilterChange={(filterId, value) => {
                    setActiveFilters({ ...activeFilters, [filterId]: value });
                  }}
                  onClearAllFilters={() => setActiveFilters({})}
                />
              </div>
            )}

            {/* ========== ENTRIES LIST CONTAINER (Plus centré) ========== */}
            {filteredEntries.length > 0 ? (
              <div style={{
                maxWidth: '900px', // Container plus étroit que le 1152px de la page
                margin: '0 auto',
              }}>
                <div className="grid grid-cols-1 gap-6">
                {filteredEntries.map((entry) => {
                  const template = templateConfig[entry.templateType];
                  const Icon = template.icon;

                  return (
                    <div
                      key={entry.id}
                      onClick={() => onNavigate('journal-detail', entry.id)}
                      className="rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 relative"
                      style={{
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
                      }}
                      onMouseEnter={(e) => {
                        const colorMap: any = {
                          'var(--primary)': 'rgba(85, 161, 180, 0.12)',
                          'var(--secondary)': 'rgba(237, 132, 58, 0.12)',
                          'var(--accent)': 'rgba(248, 176, 68, 0.12)',
                          'var(--coral)': 'rgba(244, 154, 118, 0.12)',
                          'var(--teal)': 'rgba(157, 190, 186, 0.12)',
                        };
                        const glowColor = colorMap[template.color] || 'rgba(85, 161, 180, 0.12)';
                        e.currentTarget.style.boxShadow = `0 12px 40px 0 rgba(0, 0, 0, 0.1), 0 0 40px 0 ${glowColor}, inset 0 1px 0 0 rgba(255, 255, 255, 0.9)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)';
                      }}
                    >
                      {/* Gradient Glow Background */}
                      <div 
                        className="absolute inset-0 opacity-20"
                        style={{
                          background: `radial-gradient(circle at 50% 0%, ${
                            template.color === 'var(--primary)' ? 'rgba(85, 161, 180, 0.15)' :
                            template.color === 'var(--secondary)' ? 'rgba(237, 132, 58, 0.15)' :
                            template.color === 'var(--accent)' ? 'rgba(248, 176, 68, 0.15)' :
                            template.color === 'var(--coral)' ? 'rgba(244, 154, 118, 0.15)' :
                            template.color === 'var(--teal)' ? 'rgba(157, 190, 186, 0.15)' :
                            'rgba(85, 161, 180, 0.15)'
                          } 0%, transparent 70%)`,
                          pointerEvents: 'none',
                        }}
                      />

                      <div style={{ position: 'relative', padding: 'var(--space-6)' }}>
                        {/* Header avec icône + meta */}
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'flex-start', 
                          justifyContent: 'space-between', 
                          gap: 'var(--space-4)',
                          marginBottom: 'var(--space-4)',
                        }}>
                          {/* Left: Icon + Content */}
                          <div style={{ display: 'flex', gap: 'var(--space-4)', flex: 1 }}>
                            {/* Icône plus grande */}
                            <div style={{ 
                              flexShrink: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                              <Icon className="w-10 h-10" style={{ color: template.color, strokeWidth: 1.5 }} />
                            </div>
                            
                            {/* Content: Category + Title + Date */}
                            <div style={{ flex: 1 }}>
                              {/* Category Badge */}
                              <span 
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: 'var(--space-1)',
                                  background: template.bgColor,
                                  color: template.color,
                                  fontSize: 'var(--text-xs)',
                                  fontWeight: 'var(--font-weight-semibold)',
                                  padding: 'var(--space-1) var(--space-2-5)',
                                  borderRadius: 'var(--radius-full)',
                                  marginBottom: 'var(--space-2)',
                                }}
                              >
                                {template.emoji} {template.label}
                              </span>
                              
                              {/* Title */}
                              <h3 
                                style={{ 
                                  fontFamily: 'var(--font-display)',
                                  fontSize: 'var(--text-xl)',
                                  fontWeight: 'var(--font-weight-bold)',
                                  color: 'var(--foreground)',
                                  lineHeight: 'var(--leading-tight)',
                                  margin: 0,
                                  marginBottom: 'var(--space-1-5)',
                                }}
                              >
                                {entry.title}
                              </h3>
                              
                              {/* Date */}
                              <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 'var(--space-1-5)',
                                fontSize: 'var(--text-sm)',
                                color: 'var(--muted-foreground)',
                              }}>
                                <Clock className="w-4 h-4" />
                                {entry.date}
                              </div>
                            </div>
                          </div>

                          {/* Right: Arrow */}
                          <ArrowRight 
                            className="w-5 h-5 transition-transform duration-300" 
                            style={{ 
                              color: template.color,
                              flexShrink: 0,
                              marginTop: 'var(--space-1)',
                            }}
                          />
                        </div>

                        {/* Excerpt - Aligné avec le contenu */}
                        <p 
                          style={{ 
                            fontSize: 'var(--text-base)',
                            color: 'var(--muted-foreground)',
                            lineHeight: 'var(--leading-relaxed)',
                            margin: 0,
                            marginLeft: 'calc(40px + var(--space-4))', // Aligné avec le titre (icon width + gap)
                            marginBottom: 'var(--space-4)',
                          }}
                        >
                          {entry.excerpt}
                        </p>

                        {/* Tags - Sans # */}
                        {entry.tags.length > 0 && (
                          <div style={{ 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: 'var(--space-2)',
                            marginLeft: 'calc(40px + var(--space-4))', // Aligné avec le titre
                          }}>
                            {entry.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                style={{
                                  background: 'rgba(0, 0, 0, 0.03)',
                                  backdropFilter: 'blur(10px)',
                                  fontSize: 'var(--text-xs)',
                                  color: 'var(--muted-foreground)',
                                  fontWeight: 'var(--font-weight-medium)',
                                  padding: 'var(--space-1) var(--space-2-5)',
                                  borderRadius: 'var(--radius-full)',
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              </div>
            ) : (
              <EmptyState
                icon={<BookMarked className="w-16 h-16" />}
                title={journalEntries.length === 0 ? "Commencez votre journal" : "Aucune entrée trouvée"}
                description={journalEntries.length === 0 
                  ? "Créez votre première entrée pour commencer à documenter votre parcours d'apprentissage"
                  : "Essayez d'ajuster vos filtres ou votre recherche"
                }
                action={journalEntries.length === 0 ? (
                  <div className="flex gap-3">
                    <ButtonEnhanced
                      variant="primary"
                      size="md"
                      icon={<BookOpen className="w-5 h-5" />}
                      onClick={() => handleCreateEntry('guided')}
                    >
                      Réflexion guidée
                    </ButtonEnhanced>
                    <ButtonEnhanced
                      variant="secondary"
                      size="md"
                      icon={<Sparkles className="w-5 h-5" />}
                      onClick={() => handleCreateEntry('free')}
                    >
                      Réflexion libre
                    </ButtonEnhanced>
                  </div>
                ) : undefined}
              />
            )}
          </div>
        </main>
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* First Entry Celebration */}
      {showFirstEntryCelebration && (
        <Celebration
          type="lesson-complete"
          onClose={() => setShowFirstEntryCelebration(false)}
        />
      )}
    </div>
  );
}