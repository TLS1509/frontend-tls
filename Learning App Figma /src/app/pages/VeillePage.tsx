import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search,
  Clock,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  X,
  Play,
  Download,
  FileText,
  BookOpen,
  TrendingUp,
  ArrowRight,
  User,
  Calendar,
  Eye,
  Newspaper,
  Video,
  FolderOpen,
} from 'lucide-react';
import { BackgroundBlobs } from '../components/ui/background-blobs';
import OptimizedSidebar from '../components/ui/optimized-sidebar';
import { useToast, ToastContainer } from '../components/ui/notification-toast';
import VideoTutorialPage from './VideoTutorialPage';
import VideoReelsPage from './VideoReelsPage';
import DossierPage from './DossierPage';
import MagazinePage from './MagazinePage';
import WeeklyNewsletterPage from './WeeklyNewsletterPage';
import { getVideosTutorielsPreviews, type VideoTutorielPreview } from '../data/veilleVideosData';
import { getDossiersPreviews, type DossierPreview } from '../data/veilleDossiersData';
import { getMagazinesPreviews, type MagazinePreview } from '../data/veilleMagData';
import { getAllWeeklyNewsItems, type WeeklyNewsItem } from '../data/weeklyNewsData';

interface VeillePageProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
  initialVideoId?: number;
  initialDossierId?: number;
  initialMagazineId?: number;
}

type CategoryFilter = 'all' | 'actu' | 'dossier' | 'tuto' | 'mag';
type ContentItem = (VideoTutorielPreview | DossierPreview | MagazinePreview | WeeklyNewsItem) & { type?: 'video' | 'dossier' | 'magazine' | 'weeklynews' };

export default function VeillePage({ onNavigate, onLogout, initialVideoId, initialDossierId, initialMagazineId }: VeillePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedVideos, setSavedVideos] = useState<Set<number>>(new Set());
  const [savedDossiers, setSavedDossiers] = useState<Set<number>>(new Set());
  const [savedMagazines, setSavedMagazines] = useState<Set<number>>(new Set());
  const [savedWeeklyNews, setSavedWeeklyNews] = useState<Set<number>>(new Set());
  const [selectedVideoId, setSelectedVideoId] = useState<number | null>(initialVideoId || null);
  const [selectedDossierId, setSelectedDossierId] = useState<number | null>(initialDossierId || null);
  const [selectedMagazineId, setSelectedMagazineId] = useState<number | null>(initialMagazineId || null);
  const [showNewsletterView, setShowNewsletterView] = useState(false);
  const [selectedVideoFormat, setSelectedVideoFormat] = useState<'horizontal' | 'vertical'>('horizontal');
  const { toasts, success, removeToast } = useToast();

  // Get all content (videos + dossiers + magazines + weekly news)
  const allVideos = getVideosTutorielsPreviews();
  const allDossiers = getDossiersPreviews();
  const allMagazines = getMagazinesPreviews();
  const allWeeklyNews = getAllWeeklyNewsItems().map(item => ({ ...item, type: 'weeklynews' as const }));
  const allContent: ContentItem[] = [...allVideos, ...allDossiers, ...allMagazines, ...allWeeklyNews];

  // Count by category
  const categoryCount = {
    all: allContent.length,
    tuto: allVideos.length,
    actu: allWeeklyNews.length,
    dossier: allDossiers.length,
    mag: allMagazines.length,
  };

  // Filter content
  const filteredContent = allContent
    .filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesCategory = false;
      if (selectedCategory === 'all') {
        matchesCategory = true;
      } else if (selectedCategory === 'tuto') {
        matchesCategory = item.type === 'video';
      } else if (selectedCategory === 'actu') {
        matchesCategory = item.type === 'weeklynews';
      } else if (selectedCategory === 'dossier') {
        matchesCategory = item.type === 'dossier';
      } else if (selectedCategory === 'mag') {
        matchesCategory = item.type === 'magazine';
      }
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // Sort by date (most recent first) only for "all" category
      if (selectedCategory === 'all' && a.publishDate && b.publishDate) {
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      }
      return 0;
    });

  const handleSaveItem = (itemId: number, itemType: 'video' | 'dossier' | 'magazine' | 'weeklynews', e?: React.MouseEvent) => {
    e?.stopPropagation();
    
    if (itemType === 'video') {
      const newSaved = new Set(savedVideos);
      if (newSaved.has(itemId)) {
        newSaved.delete(itemId);
        success('Retiré des favoris', 'La vidéo a été retirée de vos favoris', 2000);
      } else {
        newSaved.add(itemId);
        success('Vidéo sauvegardée', 'Retrouvez cette vidéo dans vos favoris', 2000);
      }
      setSavedVideos(newSaved);
    } else if (itemType === 'dossier') {
      const newSaved = new Set(savedDossiers);
      if (newSaved.has(itemId)) {
        newSaved.delete(itemId);
        success('Retiré des favoris', 'Le dossier a été retiré de vos favoris', 2000);
      } else {
        newSaved.add(itemId);
        success('Dossier sauvegardé', 'Retrouvez ce dossier dans vos favoris', 2000);
      }
      setSavedDossiers(newSaved);
    } else if (itemType === 'magazine') {
      const newSaved = new Set(savedMagazines);
      if (newSaved.has(itemId)) {
        newSaved.delete(itemId);
        success('Retiré des favoris', 'Le magazine a été retiré de vos favoris', 2000);
      } else {
        newSaved.add(itemId);
        success('Magazine sauvegardé', 'Retrouvez ce magazine dans vos favoris', 2000);
      }
      setSavedMagazines(newSaved);
    } else if (itemType === 'weeklynews') {
      const newSaved = new Set(savedWeeklyNews);
      if (newSaved.has(itemId)) {
        newSaved.delete(itemId);
        success('Retiré des favoris', 'L\'actu a été retirée de vos favoris', 2000);
      } else {
        newSaved.add(itemId);
        success('Actu sauvegardée', 'Retrouvez cette actu dans vos favoris', 2000);
      }
      setSavedWeeklyNews(newSaved);
    }
  };

  const handleItemClick = (itemId: number, itemType: 'video' | 'dossier' | 'magazine' | 'weeklynews', format?: 'horizontal' | 'vertical') => {
    if (itemType === 'video') {
      setSelectedVideoId(itemId);
      setSelectedVideoFormat(format || 'horizontal');
    } else if (itemType === 'dossier') {
      setSelectedDossierId(itemId);
    } else if (itemType === 'magazine') {
      setSelectedMagazineId(itemId);
    } else if (itemType === 'weeklynews') {
      // Show newsletter view instead of individual news detail
      setShowNewsletterView(true);
    }
  };

  const handleBackToList = () => {
    setSelectedVideoId(null);
    setSelectedDossierId(null);
    setSelectedMagazineId(null);
    setShowNewsletterView(false);
  };

  // If newsletter view is active, show WeeklyNewsletterPage
  if (showNewsletterView) {
    return (
      <WeeklyNewsletterPage
        onNavigate={onNavigate}
        onBack={handleBackToList}
        onLogout={onLogout}
      />
    );
  }

  // If video is selected, show VideoTutorialPage or VideoReelsPage based on format
  if (selectedVideoId) {
    if (selectedVideoFormat === 'vertical') {
      return (
        <VideoReelsPage
          videoId={selectedVideoId}
          onNavigate={onNavigate}
          onBack={handleBackToList}
          onLogout={onLogout}
        />
      );
    } else {
      return (
        <VideoTutorialPage
          videoId={selectedVideoId}
          onNavigate={onNavigate}
          onBack={handleBackToList}
          onLogout={onLogout}
        />
      );
    }
  }

  // If dossier is selected, show DossierPage
  if (selectedDossierId) {
    return (
      <DossierPage
        dossierId={selectedDossierId}
        onNavigate={onNavigate}
        onBack={handleBackToList}
        onLogout={onLogout}
      />
    );
  }

  // If magazine is selected, show MagazinePage
  if (selectedMagazineId) {
    return (
      <MagazinePage
        magazineId={selectedMagazineId}
        onNavigate={onNavigate}
        onBack={handleBackToList}
        onLogout={onLogout}
      />
    );
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--background)' }}>
      {/* Background Effects */}
      <BackgroundBlobs />

      {/* Sidebar */}
      <OptimizedSidebar currentPage="veille" onNavigate={onNavigate} onLogout={onLogout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-y-auto">
          <div
            style={{
              minHeight: '100%',
              background: 'var(--background)',
            }}
          >
            {/* Header with Glassmorphism */}
            <div
              className="sticky top-0 z-20 border-b"
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderColor: 'rgba(0, 0, 0, 0.06)',
              }}
            >
              <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
                {/* Title */}
                <div className="mb-6">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, var(--primary) 0%, #4a8fa0 100%)',
                          boxShadow: '0 4px 12px rgba(85, 161, 180, 0.2)',
                        }}
                      >
                        <Sparkles className="w-6 h-6" style={{ color: 'white' }} />
                      </div>
                      <div>
                        <h1
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'var(--text-3xl)',
                            fontWeight: 'var(--font-weight-bold)',
                            color: 'var(--foreground)',
                            margin: 0,
                            lineHeight: 1.2,
                          }}
                        >
                          Veille & Apprentissage
                        </h1>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-sm)',
                            color: 'var(--muted-foreground)',
                            margin: 0,
                            marginTop: '4px',
                          }}
                        >
                          {filteredContent.length} ressource{filteredContent.length > 1 ? 's' : ''} disponible{filteredContent.length > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    
                    <motion.button
                      onClick={() => setShowNewsletterView(true)}
                      className="px-6 py-3 rounded-xl flex items-center gap-2"
                      style={{
                        background: 'var(--primary)',
                        color: 'white',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(85, 161, 180, 0.3)',
                      }}
                      whileHover={{ scale: 1.05, boxShadow: '0 6px 20px rgba(85, 161, 180, 0.4)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <TrendingUp className="w-4 h-4" />
                      Actus de la semaine
                    </motion.button>
                  </div>
                </div>

                {/* Search Bar - Enhanced */}
                <div className="mb-6">
                  <div
                    className="relative flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-200"
                    style={{
                      background: 'rgba(255, 255, 255, 0.9)',
                      border: searchQuery ? '2px solid var(--primary)' : '1px solid var(--border)',
                      boxShadow: searchQuery ? '0 4px 16px rgba(85, 161, 180, 0.15)' : 'var(--shadow-sm)',
                    }}
                  >
                    <Search className="w-5 h-5" style={{ color: searchQuery ? 'var(--primary)' : 'var(--muted-foreground)' }} />
                    <input
                      type="text"
                      placeholder="Rechercher par titre, catégorie, thématique..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-base)',
                        color: 'var(--foreground)',
                      }}
                    />
                    {searchQuery && (
                      <motion.button
                        onClick={() => setSearchQuery('')}
                        className="p-1.5 rounded-lg transition-colors duration-200"
                        style={{
                          background: 'rgba(0, 0, 0, 0.05)',
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Category Filters - Improved Pills */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'all', label: 'Tout', icon: Sparkles },
                    { id: 'actu', label: 'Actus', icon: TrendingUp },
                    { id: 'tuto', label: 'Tutoriels', icon: Play },
                    { id: 'dossier', label: 'Dossiers', icon: FileText },
                    { id: 'mag', label: 'Le Mag', icon: BookOpen },
                  ].map(({ id, label, icon: Icon }) => {
                    const isActive = selectedCategory === id;
                    const count = categoryCount[id as CategoryFilter];
                    
                    return (
                      <motion.button
                        key={id}
                        onClick={() => setSelectedCategory(id as CategoryFilter)}
                        className="px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-200"
                        style={{
                          background: isActive 
                            ? 'var(--primary)' 
                            : 'rgba(255, 255, 255, 0.6)',
                          color: isActive ? 'white' : 'var(--foreground)',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          border: isActive ? 'none' : '1px solid var(--border)',
                          boxShadow: isActive ? '0 4px 12px rgba(85, 161, 180, 0.3)' : 'none',
                        }}
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{label}</span>
                        <span
                          className="px-2 py-0.5 rounded-full"
                          style={{
                            background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(85, 161, 180, 0.1)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 'var(--font-weight-semibold)',
                          }}
                        >
                          {count}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
              <AnimatePresence mode="wait">
                {filteredContent.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-16"
                  >
                    <div
                      className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                      style={{
                        background: 'rgba(85, 161, 180, 0.1)',
                      }}
                    >
                      <Search className="w-10 h-10" style={{ color: 'var(--primary)' }} />
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-xl)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--foreground)',
                        marginBottom: '8px',
                      }}
                    >
                      Aucun résultat trouvé
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-base)',
                        color: 'var(--muted-foreground)',
                      }}
                    >
                      Essayez de modifier vos filtres ou votre recherche
                    </p>
                  </motion.div>
                ) : (
                  // Unified Feed Layout for all categories
                  <motion.div
                    className="max-w-3xl mx-auto space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {filteredContent.map((item, index) => {
                      const itemType = item.type === 'video' ? 'video' : 
                                      item.type === 'dossier' ? 'dossier' : 
                                      item.type === 'magazine' ? 'magazine' : 
                                      'weeklynews';
                      
                      let isSaved = false;
                      if (itemType === 'video') {
                        isSaved = savedVideos.has(item.id);
                      } else if (itemType === 'dossier') {
                        isSaved = savedDossiers.has(item.id);
                      } else if (itemType === 'magazine') {
                        isSaved = savedMagazines.has(item.id);
                      } else if (itemType === 'weeklynews') {
                        isSaved = savedWeeklyNews.has(item.id);
                      }
                      
                      const videoFormat = itemType === 'video' ? (item as VideoTutorielPreview).format : undefined;
                      
                      return (
                        <FeedCard
                          key={`${itemType}-${item.id}`}
                          item={item}
                          itemType={itemType}
                          isSaved={isSaved}
                          onSave={(e) => handleSaveItem(item.id, itemType, e)}
                          onClick={() => handleItemClick(item.id, itemType, videoFormat)}
                          delay={index * 0.03}
                        />
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

// Feed Card Component - For "Tout" category timeline view
interface FeedCardProps {
  item: ContentItem;
  itemType: 'video' | 'dossier' | 'magazine' | 'weeklynews';
  isSaved: boolean;
  onSave: (e: React.MouseEvent) => void;
  onClick: () => void;
  delay: number;
}

function FeedCard({ item, itemType, isSaved, onSave, onClick, delay }: FeedCardProps) {
  const typeIcons = {
    video: Video,
    article: Newspaper,
    dossier: FolderOpen,
    magazine: BookOpen,
    weeklynews: TrendingUp,
  };

  const typeLabels = {
    video: 'Tutoriel',
    article: 'Article',
    dossier: 'Dossier',
    magazine: 'Magazine',
    weeklynews: 'Actu de la semaine',
  };

  const typeColors = {
    video: { primary: 'var(--secondary)', bg: 'rgba(237, 132, 58, 0.1)', text: 'var(--secondary)' },
    article: { primary: 'var(--primary)', bg: 'rgba(85, 161, 180, 0.1)', text: 'var(--primary)' },
    dossier: { primary: 'var(--accent)', bg: 'rgba(248, 176, 68, 0.1)', text: 'var(--accent)' },
    magazine: { primary: 'var(--primary)', bg: 'rgba(85, 161, 180, 0.1)', text: 'var(--primary)' },
    weeklynews: { primary: 'var(--primary)', bg: 'rgba(85, 161, 180, 0.1)', text: 'var(--primary)' },
  };

  const colors = typeColors[itemType] || typeColors.weeklynews;
  const Icon = typeIcons[itemType];
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`;
    
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.23, 1, 0.32, 1] }}
      onClick={onClick}
      className="group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        boxShadow: 'var(--shadow-sm)',
      }}
      whileHover={{ 
        y: -4, 
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
        borderColor: colors.primary,
        transition: { duration: 0.2 }
      }}
    >
      {/* Content Wrapper */}
      <div className="p-6">
        {/* Header: Type & Meta */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: colors.bg,
              }}
            >
              <Icon className="w-5 h-5" style={{ color: colors.text }} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: colors.text,
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--tracking-wide)',
                }}
              >
                {typeLabels[itemType]}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3 h-3" style={{ color: 'var(--muted-foreground)' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  {formatDate(item.publishDate)}
                </span>
              </div>
            </div>
          </div>

          {/* Bookmark */}
          <motion.button
            onClick={onSave}
            className="p-2 rounded-lg"
            style={{
              background: isSaved ? colors.bg : 'rgba(0, 0, 0, 0.04)',
              color: isSaved ? colors.text : 'var(--muted-foreground)',
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
          </motion.button>
        </div>

        {/* Title */}
        <h3
          className="mb-3 group-hover:text-[var(--primary)] transition-colors duration-200"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-weight-bold)',
            lineHeight: 'var(--leading-tight)',
            color: 'var(--foreground)',
          }}
        >
          {item.title}
        </h3>

        {/* Footer: Author & Read Time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" style={{ color: 'var(--muted-foreground)' }} />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--muted-foreground)',
                }}
              >
                The Learning Society
              </span>
            </div>
            {(item.readTime || (item as any).duration) && (
              <>
                <span style={{ color: 'var(--muted-foreground)' }}>•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" style={{ color: 'var(--muted-foreground)' }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    {item.readTime || (item as any).duration}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Arrow indicator */}
          <motion.div
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ color: colors.primary }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Enhanced Content Card Component - Différencié par type
interface ContentCardProps {
  item: ContentItem;
  itemType: 'video' | 'dossier' | 'magazine' | 'weeklynews';
  isSaved: boolean;
  onSave: (e: React.MouseEvent) => void;
  onClick: () => void;
  delay: number;
}

function ContentCard({ item, itemType, isSaved, onSave, onClick, delay }: ContentCardProps) {
  // Determine colors based on type
  const typeColors = {
    video: { primary: 'var(--accent)', bg: 'rgba(237, 132, 58, 0.08)', border: 'rgba(237, 132, 58, 0.2)' },
    article: { primary: 'var(--primary)', bg: 'rgba(85, 161, 180, 0.08)', border: 'rgba(85, 161, 180, 0.2)' },
    dossier: { primary: 'var(--secondary)', bg: 'rgba(248, 176, 68, 0.08)', border: 'rgba(248, 176, 68, 0.2)' },
    magazine: { primary: 'var(--primary)', bg: 'rgba(85, 161, 180, 0.08)', border: 'rgba(85, 161, 180, 0.2)' },
    weeklynews: { primary: 'var(--primary)', bg: 'rgba(85, 161, 180, 0.12)', border: 'var(--primary)' },
  };

  const colors = typeColors[itemType];

  // Render different card styles based on type
  if (itemType === 'video') {
    return <VideoCard item={item as VideoTutorielPreview} isSaved={isSaved} onSave={onSave} onClick={onClick} delay={delay} colors={colors} />;
  } else if (itemType === 'dossier') {
    return <DossierCard item={item as DossierPreview} isSaved={isSaved} onSave={onSave} onClick={onClick} delay={delay} colors={colors} />;
  } else if (itemType === 'magazine') {
    return <MagazineCard item={item as MagazinePreview} isSaved={isSaved} onSave={onSave} onClick={onClick} delay={delay} colors={colors} />;
  } else if (itemType === 'weeklynews') {
    return <WeeklyNewsCard item={item as WeeklyNewsItem} isSaved={isSaved} onSave={onSave} onClick={onClick} delay={delay} colors={colors} />;
  }
  
  return null;
}

// Video Card - Format Play Button with Icon Header
function VideoCard({ item, isSaved, onSave, onClick, delay, colors }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.23, 1, 0.32, 1] }}
      className="group cursor-pointer rounded-3xl overflow-hidden flex flex-col"
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-md)',
      }}
      whileHover={{ 
        y: -6, 
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.12)',
        transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] }
      }}
      onClick={onClick}
    >
      {/* Icon Header Zone */}
      <div
        className="flex items-center justify-center"
        style={{
          height: '200px',
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.primary}cc)`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative background pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.15) 0%, transparent 60%)',
          }}
        />
        <Video
          className="w-20 h-20 relative z-10"
          style={{ color: 'rgba(255, 255, 255, 0.95)', strokeWidth: 1.5 }}
        />
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <h3
          className="mb-3"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-weight-bold)',
            lineHeight: '1.2',
            color: 'var(--foreground)',
            minHeight: '3.5rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {item.title}
        </h3>

        {/* Instructor & Format */}
        <div className="flex items-center gap-1.5 mb-4">
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
            }}
          >
            Par The Learning Society
          </span>
          <span style={{ color: 'var(--muted-foreground)' }}>•</span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
            }}
          >
            {item.format}
          </span>
        </div>

        {/* Footer with Duration & CTA */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
            }}
          >
            {item.duration}
          </span>

          {/* Watch Button */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl"
            style={{
              background: colors.primary,
              color: 'white',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-semibold)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="w-4 h-4" />
            <span>Lire</span>
          </motion.button>
        </div>
      </div>

      {/* Bookmark Button - Floating */}
      <motion.button
        onClick={onSave}
        className="absolute top-4 right-4 p-2.5 rounded-xl"
        style={{
          background: isSaved ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          color: isSaved ? colors.primary : 'rgba(255, 255, 255, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
      </motion.button>
    </motion.div>
  );
}

// Weekly News Card - Special design for "Actus de la semaine"
function WeeklyNewsCard({ item, isSaved, onSave, onClick, delay, colors }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={onClick}
      className="group cursor-pointer rounded-2xl overflow-hidden flex flex-col h-full"
      style={{
        background: 'rgba(255, 255, 255, 0.9)',
        border: '2px solid',
        borderColor: colors.border,
        backdropFilter: 'blur(10px)',
      }}
      whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(85, 161, 180, 0.2)' }}
    >
      {/* Image with Gradient Overlay */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.imageUrl || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80'}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.4) 100%)',
          }}
        />
        
        {/* Badge "Actu de la semaine" */}
        <div
          className="absolute top-3 left-3 px-3 py-1.5 rounded-full flex items-center gap-2"
          style={{
            background: 'var(--primary)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <TrendingUp className="w-3.5 h-3.5 text-white" />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'white',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Actu de la semaine
          </span>
        </div>

        {/* Save Button */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onSave(e);
          }}
          className="absolute top-3 right-3 p-2 rounded-lg"
          style={{
            background: isSaved ? 'var(--primary)' : 'rgba(255, 255, 255, 0.9)',
            border: isSaved ? 'none' : '1px solid var(--border)',
            backdropFilter: 'blur(10px)',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isSaved ? (
            <BookmarkCheck className="w-4 h-4 text-white" />
          ) : (
            <Bookmark className="w-4 h-4" style={{ color: 'var(--foreground)' }} />
          )}
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Category Badge */}
        <div
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg mb-3 self-start"
          style={{
            background: 'rgba(248, 176, 68, 0.12)',
            border: '1px solid var(--accent-yellow)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--accent-yellow)',
            }}
          >
            {item.category}
          </span>
        </div>

        {/* Title */}
        <h3
          className="mb-3 transition-colors duration-200"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-lg)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--foreground)',
            lineHeight: 'var(--leading-tight)',
          }}
        >
          {item.title}
        </h3>

        {/* Summary */}
        <p
          className="mb-4 flex-1"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--muted-foreground)',
          }}
        >
          {item.summary?.substring(0, 120)}...
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-3 text-sm mb-4">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" style={{ color: 'var(--muted-foreground)' }} />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                color: 'var(--muted-foreground)',
              }}
            >
              {item.author || 'TLS'}
            </span>
          </div>
          <span style={{ color: 'var(--muted-foreground)' }}>•</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" style={{ color: 'var(--muted-foreground)' }} />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                color: 'var(--muted-foreground)',
              }}
            >
              {item.publishDate}
            </span>
          </div>
        </div>

        {/* Footer with Tags & Read Time */}
        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--muted-foreground)',
              }}
            >
              {item.readTime}
            </span>
          </div>

          {/* Read Button with Arrow */}
          <motion.div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{
              background: colors.bg,
              border: '1px solid',
              borderColor: colors.border,
            }}
            whileHover={{ x: 3 }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-semibold)',
                color: colors.primary,
              }}
            >
              Lire
            </span>
            <ArrowRight className="w-3.5 h-3.5" style={{ color: colors.primary }} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Dossier Card - Professional with Icon Header
function DossierCard({ item, isSaved, onSave, onClick, delay, colors }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.23, 1, 0.32, 1] }}
      className="group cursor-pointer rounded-3xl overflow-hidden flex flex-col"
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-md)',
      }}
      whileHover={{ 
        y: -6, 
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.12)',
        transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] }
      }}
      onClick={onClick}
    >
      {/* Icon Header Zone */}
      <div
        className="flex items-center justify-center"
        style={{
          height: '200px',
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.primary}cc)`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative background pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12) 0%, transparent 70%)',
          }}
        />
        <FolderOpen
          className="w-20 h-20 relative z-10"
          style={{ color: 'rgba(255, 255, 255, 0.95)', strokeWidth: 1.5 }}
        />
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <h3
          className="mb-3"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-weight-bold)',
            lineHeight: '1.2',
            color: 'var(--foreground)',
            minHeight: '3.5rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {item.title}
        </h3>

        {/* Author & Date */}
        <div className="flex items-center gap-1.5 mb-4">
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
            }}
          >
            Par The Learning Society
          </span>
          <span style={{ color: 'var(--muted-foreground)' }}>•</span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
            }}
          >
            {item.date}
          </span>
        </div>

        {/* Footer with Pages & CTA */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
            }}
          >
            {item.pages} pages
          </span>

          {/* Read Button */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl"
            style={{
              background: colors.primary,
              color: 'white',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-semibold)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="w-4 h-4" />
            <span>Lire</span>
          </motion.button>
        </div>
      </div>

      {/* Bookmark Button - Floating */}
      <motion.button
        onClick={onSave}
        className="absolute top-4 right-4 p-2.5 rounded-xl"
        style={{
          background: isSaved ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          color: isSaved ? colors.primary : 'rgba(255, 255, 255, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
      </motion.button>
    </motion.div>
  );
}

// Magazine Card - Editorial Style with Icon Header
function MagazineCard({ item, isSaved, onSave, onClick, delay, colors }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.23, 1, 0.32, 1] }}
      className="group cursor-pointer rounded-3xl overflow-hidden flex flex-col"
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-md)',
      }}
      whileHover={{ 
        y: -6, 
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.12)',
        transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] }
      }}
      onClick={onClick}
    >
      {/* Icon Header Zone */}
      <div
        className="flex items-center justify-center"
        style={{
          height: '200px',
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.primary}cc)`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative background pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 40% 60%, rgba(255,255,255,0.1) 0%, transparent 65%)',
          }}
        />
        <BookOpen
          className="w-20 h-20 relative z-10"
          style={{ color: 'rgba(255, 255, 255, 0.95)', strokeWidth: 1.5 }}
        />
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <h3
          className="mb-3"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-weight-bold)',
            lineHeight: '1.2',
            color: 'var(--foreground)',
            minHeight: '3.5rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {item.title}
        </h3>

        {/* Publish Date & Articles Count */}
        <div className="flex items-center gap-1.5 mb-4">
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
            }}
          >
            {item.publishDate}
          </span>
          <span style={{ color: 'var(--muted-foreground)' }}>•</span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
            }}
          >
            {item.articlesCount} articles
          </span>
        </div>

        {/* Footer with Pages & CTA */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
            }}
          >
            {item.pages} pages
          </span>

          {/* Read Button */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl"
            style={{
              background: colors.primary,
              color: 'white',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-semibold)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="w-4 h-4" />
            <span>Lire</span>
          </motion.button>
        </div>
      </div>

      {/* Bookmark Button - Floating */}
      <motion.button
        onClick={onSave}
        className="absolute top-4 right-4 p-2.5 rounded-xl"
        style={{
          background: isSaved ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          color: isSaved ? colors.primary : 'rgba(255, 255, 255, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
      </motion.button>
    </motion.div>
  );
}
