import { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  Save,
  Sparkles,
  Heart,
  Smile,
  Meh,
  Frown,
  Zap,
  BookOpen,
  Target,
  Lightbulb,
  Clock,
  Tag,
  Wand2,
  Check,
  X
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { BackgroundBlobs } from '../components/ui/background-blobs';
import OptimizedSidebar from '../components/ui/optimized-sidebar';

interface JournalFreeEntryPageProps {
  onNavigate: (page: 'dashboard' | 'parcours' | 'coaching' | 'learning-space' | 'profile' | 'veille' | 'entreprise-dashboard' | 'journal' | 'account') => void;
  onLogout: () => void;
  initialTemplate?: 'free' | 'learning' | 'coaching' | 'insight';
}

const templates = [
  {
    id: 'free',
    icon: Sparkles,
    label: 'Réflexion Libre',
    color: 'var(--primary)',
    prompt: 'Qu\'est-ce qui occupe mon esprit aujourd\'hui ?',
    placeholder: 'Écrivez librement vos pensées, réflexions, découvertes du jour...',
  },
  {
    id: 'learning',
    icon: BookOpen,
    label: 'Apprentissage',
    color: 'var(--secondary)',
    prompt: 'Qu\'ai-je appris aujourd\'hui ?',
    placeholder: 'Décrivez ce que vous avez découvert, compris ou expérimenté dans vos cours...',
  },
  {
    id: 'coaching',
    icon: Target,
    label: 'Session Coaching',
    color: 'var(--accent)',
    prompt: 'Quels insights ai-je tirés de ma session ?',
    placeholder: 'Notez les prises de conscience, actions à mettre en place, objectifs clarifiés...',
  },
  {
    id: 'insight',
    icon: Lightbulb,
    label: 'Moment Eurêka',
    color: 'var(--primary)',
    prompt: 'Quelle idée m\'a illuminé ?',
    placeholder: 'Capturez cette idée brillante avant qu\'elle ne s\'envole...',
  },
];

const moods = [
  { id: 'excited', icon: Zap, label: 'Énergisé', color: 'var(--accent)' },
  { id: 'happy', icon: Smile, label: 'Heureux', color: 'var(--secondary)' },
  { id: 'calm', icon: Heart, label: 'Serein', color: 'var(--primary)' },
  { id: 'neutral', icon: Meh, label: 'Neutre', color: 'var(--muted-foreground)' },
  { id: 'thoughtful', icon: Frown, label: 'Pensif', color: 'var(--muted-foreground)' },
];

const quickTags = [
  'IA Générative',
  'Prompts',
  'Pédagogie',
  'Objectifs',
  'Réflexion',
  'Insight',
  'Challenge',
  'Succès',
  'Question',
  'Action',
];

const inspirationalPrompts = [
  'Quelle est la chose la plus importante que j\'ai apprise cette semaine ?',
  'Comment puis-je appliquer ce que j\'ai appris dans ma pratique ?',
  'Quel obstacle ai-je surmonté récemment ?',
  'Qu\'est-ce qui m\'inspire en ce moment dans l\'IA ?',
  'Quelle compétence veux-je développer en priorité ?',
  'Comment ai-je progressé depuis le début de mon parcours ?',
];

export default function JournalFreeEntryPage({ onNavigate, onLogout, initialTemplate }: JournalFreeEntryPageProps) {
  // ✅ Set initial template based on prop, default to first template
  const getInitialTemplate = () => {
    if (initialTemplate) {
      const found = templates.find(t => t.id === initialTemplate);
      return found || templates[0];
    }
    return templates[0];
  };
  
  const [selectedTemplate, setSelectedTemplate] = useState(getInitialTemplate());
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [wordCount, setWordCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showPromptSuggestion, setShowPromptSuggestion] = useState(false);

  // Word count
  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [content]);

  // Auto-save simulation
  useEffect(() => {
    if (content.length > 0 || title.length > 0) {
      const timer = setTimeout(() => {
        setIsSaving(true);
        setTimeout(() => {
          setIsSaving(false);
          setLastSaved(new Date());
        }, 500);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [content, title]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSave = () => {
    // Logique de sauvegarde
    console.log('Saving entry:', { title, content, mood: selectedMood, tags: selectedTags, template: selectedTemplate.id });
    onNavigate('journal');
  };

  const randomPrompt = inspirationalPrompts[Math.floor(Math.random() * inspirationalPrompts.length)];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <BackgroundBlobs />

      <div className="flex h-screen">
        {/* Optimized Sidebar */}
        <OptimizedSidebar
          currentPage="journal"
          onNavigate={onNavigate}
          onLogout={onLogout}
          userHasEnterpriseAccess={true}
        />

        {/* Main Content - Full Width Zen Writing Experience */}
        <main className="flex-1 overflow-y-auto">
          {/* Minimal Top Bar */}
          <div 
            className="sticky top-0 z-30 px-8 py-4 border-b"
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(20px)',
              borderColor: 'rgba(255, 255, 255, 0.3)',
            }}
          >
            <div className="flex items-center justify-between max-w-5xl mx-auto">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => onNavigate('journal')}
                  className="p-2 rounded-xl transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                  }}
                >
                  <ArrowLeft className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
                </button>
                <div>
                  <h2 style={{ color: 'var(--foreground)' }}>Nouvelle entrée</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-3 h-3" style={{ color: 'var(--muted-foreground)' }} />
                    <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                      {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Auto-save indicator */}
                {isSaving ? (
                  <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
                    Sauvegarde...
                  </div>
                ) : lastSaved ? (
                  <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    <Check className="w-3 h-3" style={{ color: 'var(--accent)' }} />
                    Sauvegardé
                  </div>
                ) : null}

                {/* Word count */}
                <div className="text-sm px-3 py-1.5 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.5)', color: 'var(--muted-foreground)' }}>
                  {wordCount} {wordCount > 1 ? 'mots' : 'mot'}
                </div>

                {/* Save button */}
                <Button
                  onClick={handleSave}
                  className="gap-2"
                  style={{ 
                    background: 'var(--gradient-primary)',
                    color: 'white',
                    border: 'none',
                  }}
                >
                  <Save className="w-4 h-4" />
                  Publier
                </Button>
              </div>
            </div>
          </div>

          {/* Writing Area */}
          <div className="max-w-5xl mx-auto px-8 py-12">
            {/* Template Selection */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Wand2 className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                <h4 className="text-sm" style={{ color: 'var(--foreground)' }}>Type d'entrée</h4>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {templates.map((template) => {
                  const Icon = template.icon;
                  const isSelected = selectedTemplate.id === template.id;
                  return (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template)}
                      className="p-4 rounded-2xl text-left transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                      style={{
                        background: isSelected 
                          ? 'rgba(255, 255, 255, 0.8)' 
                          : 'rgba(255, 255, 255, 0.5)',
                        backdropFilter: 'blur(10px)',
                        border: isSelected 
                          ? `2px solid ${template.color}` 
                          : '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: isSelected 
                          ? `0 8px 24px ${template.color}33` 
                          : '0 4px 12px rgba(0, 0, 0, 0.05)',
                      }}
                    >
                      {isSelected && (
                        <div 
                          className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ background: template.color }}
                        >
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                        style={{ background: `${template.color}22` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: template.color }} />
                      </div>
                      <p className="text-sm" style={{ color: 'var(--foreground)' }}>{template.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inspirational Prompt Suggestion */}
            {!showPromptSuggestion && (
              <button
                onClick={() => setShowPromptSuggestion(true)}
                className="mb-6 px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(248, 176, 68, 0.15)',
                  border: '1px solid rgba(248, 176, 68, 0.3)',
                  color: 'var(--accent)',
                }}
              >
                <Sparkles className="w-4 h-4" />
                Besoin d'inspiration ?
              </button>
            )}

            {showPromptSuggestion && (
              <div 
                className="mb-6 p-6 rounded-2xl relative overflow-hidden"
                style={{
                  background: 'rgba(248, 176, 68, 0.1)',
                  border: '1px solid rgba(248, 176, 68, 0.3)',
                }}
              >
                <button
                  onClick={() => setShowPromptSuggestion(false)}
                  className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-white/50 transition-all"
                >
                  <X className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                </button>
                <div className="flex items-start gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--accent)' }}
                  >
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs mb-2" style={{ color: 'var(--accent)' }}>💡 Suggestion de réflexion</p>
                    <p style={{ color: 'var(--foreground)' }}>{randomPrompt}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Main Writing Card */}
            <div 
              className="rounded-3xl p-8 mb-6 relative overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Glow effect */}
              <div 
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20 blur-3xl"
                style={{ background: selectedTemplate.color }}
              />

              <div className="relative z-10">
                {/* Prompt */}
                <div className="mb-6 pb-6 border-b" style={{ borderColor: 'rgba(0, 0, 0, 0.05)' }}>
                  <p className="text-sm mb-2" style={{ color: 'var(--muted-foreground)' }}>
                    Question de réflexion
                  </p>
                  <p className="text-lg" style={{ color: selectedTemplate.color }}>
                    {selectedTemplate.prompt}
                  </p>
                </div>

                {/* Title Input */}
                <input
                  type="text"
                  placeholder="Donnez un titre à votre entrée..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full mb-6 px-0 py-3 bg-transparent outline-none text-2xl placeholder:text-gray-400"
                  style={{ 
                    color: 'var(--foreground)',
                    borderBottom: '2px solid rgba(0, 0, 0, 0.1)',
                  }}
                />

                {/* Content Textarea */}
                <textarea
                  placeholder={selectedTemplate.placeholder}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full min-h-[400px] px-0 py-4 bg-transparent outline-none resize-none placeholder:text-gray-400 leading-relaxed"
                  style={{ 
                    color: 'var(--foreground)',
                    fontSize: '1.05rem',
                    lineHeight: '1.8',
                  }}
                />
              </div>
            </div>

            {/* Mood Selector */}
            <div 
              className="rounded-2xl p-6 mb-6"
              style={{
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                <h4 className="text-sm" style={{ color: 'var(--foreground)' }}>Comment vous sentez-vous ?</h4>
              </div>
              <div className="flex items-center gap-3">
                {moods.map((mood) => {
                  const Icon = mood.icon;
                  const isSelected = selectedMood === mood.id;
                  return (
                    <button
                      key={mood.id}
                      onClick={() => setSelectedMood(mood.id)}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 hover:scale-110 relative"
                      style={{
                        background: isSelected 
                          ? 'rgba(255, 255, 255, 0.9)' 
                          : 'rgba(255, 255, 255, 0.5)',
                        border: isSelected 
                          ? `2px solid ${mood.color}` 
                          : '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: isSelected 
                          ? `0 4px 16px ${mood.color}33` 
                          : 'none',
                      }}
                    >
                      <Icon 
                        className="w-6 h-6" 
                        style={{ color: isSelected ? mood.color : 'var(--muted-foreground)' }} 
                      />
                      <span 
                        className="text-xs"
                        style={{ color: isSelected ? mood.color : 'var(--muted-foreground)' }}
                      >
                        {mood.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tags */}
            <div 
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                <h4 className="text-sm" style={{ color: 'var(--foreground)' }}>Tags</h4>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--primary-50)', color: 'var(--primary)' }}>
                  {selectedTags.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className="px-3 py-1.5 rounded-lg text-sm transition-all duration-300 hover:scale-105"
                      style={{
                        background: isSelected 
                          ? 'var(--gradient-primary)' 
                          : 'rgba(255, 255, 255, 0.7)',
                        color: isSelected ? 'white' : 'var(--foreground)',
                        border: isSelected 
                          ? 'none' 
                          : '1px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: isSelected 
                          ? '0 4px 12px rgba(85, 161, 180, 0.3)' 
                          : 'none',
                      }}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom spacing */}
            <div className="h-20" />
          </div>
        </main>
      </div>
    </div>
  );
}
