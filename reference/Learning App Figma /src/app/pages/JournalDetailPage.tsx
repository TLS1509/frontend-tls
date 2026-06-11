import { 
  ArrowLeft,
  Edit,
  Trash2,
  BookOpen,
  BookMarked,
  Sparkles,
  Target,
  Lightbulb,
  Heart,
  Tag,
  Calendar,
  Clock
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { BackgroundBlobs } from '../components/ui/background-blobs';
import OptimizedSidebar from '../components/ui/optimized-sidebar';
import { journalEntries } from '../data/journalEntries';

interface JournalDetailPageProps {
  onNavigate: (page: 'dashboard' | 'parcours' | 'coaching' | 'learning-space' | 'profile' | 'veille' | 'entreprise-dashboard' | 'journal' | 'journal-new-entry' | 'journal-detail' | 'journal-free-entry' | 'account', entryId?: number) => void;
  onLogout: () => void;
  entryId?: number;
}

const templateConfig = {
  guided: {
    icon: BookOpen,
    label: 'Réflexion',
    color: 'var(--primary)',
    bgColor: 'var(--primary-lighter)',
  },
  free: {
    icon: Sparkles,
    label: 'Libre',
    color: 'var(--accent)',
    bgColor: 'var(--accent-lighter)',
  },
  learning: {
    icon: BookMarked,
    label: 'Apprentissage',
    color: 'var(--secondary)',
    bgColor: 'var(--secondary-lighter)',
  },
  coaching: {
    icon: Target,
    label: 'Coaching',
    color: 'var(--coral)',
    bgColor: 'var(--coral-lighter)',
  },
  insight: {
    icon: Lightbulb,
    label: 'Insight',
    color: 'var(--teal)',
    bgColor: 'var(--teal-lighter)',
  },
};

export default function JournalDetailPage({ onNavigate, onLogout, entryId }: JournalDetailPageProps) {
  // Find the entry by ID
  const entry = journalEntries.find(e => e.id === entryId) || journalEntries[0];
  const config = templateConfig[entry.templateType];
  const TemplateIcon = config.icon;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <BackgroundBlobs />

      <div className="flex h-screen">
        {/* Sidebar */}
        <OptimizedSidebar 
          currentPage="journal"
          onNavigate={onNavigate} 
          onLogout={onLogout}
          userHasEnterpriseAccess={true}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-8">
            {/* Back Button */}
            <button
              onClick={() => onNavigate('journal')}
              className="flex items-center gap-2 mb-6 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <ArrowLeft className="w-4 h-4" style={{ color: 'var(--foreground)' }} />
              <span style={{ color: 'var(--foreground)' }}>Retour au journal</span>
            </button>

            {/* Entry Card */}
            <div 
              className="rounded-3xl p-10 mb-8 relative overflow-hidden"
              style={{
                background: 'white',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Glow Effect */}
              <div 
                className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10 blur-3xl"
                style={{ background: config.color }}
              />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex-1">
                    <h1 
                      style={{ 
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-3xl)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--foreground)',
                        lineHeight: 'var(--leading-tight)',
                        margin: 0,
                        marginBottom: 'var(--space-4)',
                      }}
                    >
                      {entry.title}
                    </h1>

                    <div className="flex items-center gap-4 flex-wrap">
                      {/* Date */}
                      <div className="flex items-center gap-2" style={{ 
                        fontSize: 'var(--text-sm)',
                        color: 'var(--muted-foreground)',
                        fontFamily: 'var(--font-body)',
                      }}>
                        <Calendar className="w-4 h-4" />
                        <span>{entry.date.split(' à ')[0]}</span>
                      </div>
                      {/* Heure */}
                      <div className="flex items-center gap-2" style={{ 
                        fontSize: 'var(--text-sm)',
                        color: 'var(--muted-foreground)',
                        fontFamily: 'var(--font-body)',
                      }}>
                        <Clock className="w-4 h-4" />
                        <span>{entry.date.split(' à ')[1] || '00:00'}</span>
                      </div>
                      {/* Word count */}
                      <div style={{ 
                        fontSize: 'var(--text-sm)',
                        color: 'var(--muted-foreground)',
                        fontFamily: 'var(--font-body)',
                      }}>
                        {entry.wordCount} mots
                      </div>
                      {entry.mood && (
                        <div 
                          className="flex items-center gap-1.5 px-3 py-1 rounded-lg"
                          style={{
                            background: 'rgba(0, 0, 0, 0.05)',
                            fontSize: 'var(--text-sm)',
                            color: 'var(--muted-foreground)',
                            fontFamily: 'var(--font-body)',
                          }}
                        >
                          <Heart className="w-4 h-4" />
                          {entry.mood === 'excited' && 'Énergisé'}
                          {entry.mood === 'happy' && 'Heureux'}
                          {entry.mood === 'calm' && 'Serein'}
                          {entry.mood === 'thoughtful' && 'Pensif'}
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    {entry.tags && entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {entry.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs"
                            style={{
                              background: config.bgColor,
                              color: config.color,
                            }}
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Category Badge + Actions - Colonne droite */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', alignItems: 'flex-end' }}>
                    {/* Category Badge */}
                    <div 
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                        background: config.bgColor,
                        color: config.color,
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-semibold)',
                        fontFamily: 'var(--font-body)',
                        padding: 'var(--space-2) var(--space-4)',
                        borderRadius: 'var(--radius-full)',
                      }}
                    >
                      <TemplateIcon className="w-4 h-4" />
                      {config.label}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="gap-2"
                        onClick={() => {}}
                      >
                        <Edit className="w-4 h-4" />
                        Modifier
                      </Button>
                      <Button
                        variant="outline"
                        className="gap-2"
                        onClick={() => {}}
                        style={{ color: 'var(--destructive)' }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  {entry.content.split('\n\n').map((paragraph, idx) => {
                    // Check if paragraph is a heading (starts with **)
                    if (paragraph.startsWith('**')) {
                      const headingText = paragraph.replace(/\*\*/g, '');
                      return (
                        <h3 
                          key={idx} 
                          className="text-xl mb-4 mt-8"
                          style={{ color: config.color }}
                        >
                          {headingText}
                        </h3>
                      );
                    }
                    
                    return (
                      <p 
                        key={idx} 
                        className="mb-6 leading-relaxed"
                        style={{ color: 'var(--foreground)' }}
                      >
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

                {/* Questions & Answers for Guided Entries */}
                {entry.hasResponses && entry.questions && entry.questions.length > 0 && (
                  <div className="mt-12 pt-8 border-t" style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}>
                    <h2 
                      className="text-2xl mb-6"
                      style={{ color: 'var(--foreground)' }}
                    >
                      Questions de réflexion
                    </h2>
                    
                    <div className="space-y-8">
                      {entry.questions.map((qa, idx) => (
                        <div 
                          key={idx}
                          className="p-6 rounded-2xl"
                          style={{
                            background: config.bgColor,
                            border: `1px solid ${config.color}33`,
                          }}
                        >
                          <div 
                            className="flex items-start gap-3 mb-4"
                            style={{ color: config.color }}
                          >
                            <div 
                              className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                              style={{ background: config.color, color: 'white' }}
                            >
                              {idx + 1}
                            </div>
                            <p className="text-lg">{qa.question}</p>
                          </div>
                          <p 
                            className="ml-11 leading-relaxed"
                            style={{ color: 'var(--foreground)' }}
                          >
                            {qa.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
