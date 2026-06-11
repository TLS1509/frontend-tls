import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft, Play, Download, Clock, Eye } from "lucide-react";
import { useState } from "react";

export default function ArticleVideoPage() {
  const [currentTime, setCurrentTime] = useState(0);

  const chapters = [
    { time: "0:00", title: "Introduction à l'IA générative", duration: "2 min" },
    { time: "2:15", title: "Principes de base du prompt engineering", duration: "5 min" },
    { time: "7:45", title: "Techniques avancées", duration: "8 min" },
    { time: "15:30", title: "Cas pratiques et exemples", duration: "6 min" },
    { time: "21:45", title: "Erreurs courantes à éviter", duration: "4 min" }
  ];

  const resources = [
    { name: "Guide Prompt Engineering.pdf", size: "2.4 MB", type: "PDF" },
    { name: "Templates de prompts.docx", size: "156 KB", type: "DOCX" },
    { name: "Checklist.pdf", size: "890 KB", type: "PDF" }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="border-b border-border sticky top-20 bg-white/95 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <Button variant="ghost" className="gap-2" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4" />
            Retour au Mag'
          </Button>
        </div>
      </header>

      <article className="max-w-6xl mx-auto px-8 py-16">
        {/* Meta Info */}
        <div className="flex items-center gap-4 mb-8 text-sm" style={{ color: 'var(--neutral-600)' }}>
          <div className="flex items-center gap-2">
            <img 
              src="https://i.pravatar.cc/150?img=3" 
              alt="Phoenix Baker"
              className="w-10 h-10 rounded-full"
            />
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-semibold)' }}>
              Phoenix Baker
            </span>
          </div>
          <span>•</span>
          <span>19 Janvier 2025</span>
          <span>•</span>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>25 min</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>1.2K vues</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-6" style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'var(--text-5xl)',
          fontWeight: 'var(--font-weight-bold)',
          lineHeight: 'var(--leading-tight)'
        }}>
          Maîtriser le Prompt Engineering : Guide Complet en Vidéo
        </h1>

        {/* Tags */}
        <div className="flex gap-2 mb-8">
          <Badge className="bg-primary-50 text-primary-700 border-primary-200">Tutoriel</Badge>
          <Badge className="bg-secondary-50 text-secondary-700 border-secondary-200">Vidéo</Badge>
          <Badge className="bg-accent-50 text-accent-700 border-accent-200">IA</Badge>
        </div>

        {/* Video Player */}
        <div className="mb-12">
          <div className="aspect-video bg-neutral-900 relative group overflow-hidden" style={{ borderRadius: 'var(--radius-xl)' }}>
            {/* YouTube/Vimeo Embed Placeholder */}
            <img 
              src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200"
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <button className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
              </button>
            </div>
            
            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-4 text-white text-sm">
                <span style={{ fontFamily: 'var(--font-body)' }}>0:00 / 25:30</span>
                <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white" style={{ width: '35%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Stats */}
          <div className="flex items-center justify-between mt-6 p-4 bg-neutral-50" style={{ borderRadius: 'var(--radius-lg)' }}>
            <div className="text-center flex-1">
              <div className="text-2xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--font-weight-bold)', color: 'var(--primary-600)' }}>
                1.2K
              </div>
              <div className="text-sm" style={{ color: 'var(--neutral-600)', fontFamily: 'var(--font-body)' }}>
                Vues
              </div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center flex-1">
              <div className="text-2xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--font-weight-bold)', color: 'var(--primary-600)' }}>
                89%
              </div>
              <div className="text-sm" style={{ color: 'var(--neutral-600)', fontFamily: 'var(--font-body)' }}>
                Likes
              </div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center flex-1">
              <div className="text-2xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--font-weight-bold)', color: 'var(--primary-600)' }}>
                45
              </div>
              <div className="text-sm" style={{ color: 'var(--neutral-600)', fontFamily: 'var(--font-body)' }}>
                Commentaires
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-12">
          <h2 style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-weight-semibold)',
            marginBottom: 'var(--space-4)'
          }}>
            À propos de cette vidéo
          </h2>
          <p style={{ 
            fontSize: 'var(--text-base)', 
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--neutral-600)',
            fontFamily: 'var(--font-body)'
          }}>
            Dans ce tutoriel complet, découvrez comment maîtriser l'art du prompt engineering pour obtenir les meilleurs résultats de vos outils d'IA générative. Nous couvrirons les principes fondamentaux, les techniques avancées et les erreurs courantes à éviter.
          </p>
        </div>

        {/* Chapters */}
        <div className="mb-12">
          <h2 style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-weight-semibold)',
            marginBottom: 'var(--space-6)'
          }}>
            Chapitres
          </h2>
          <div className="space-y-2">
            {chapters.map((chapter, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-4 p-4 hover:bg-primary-50 transition-colors group"
                style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200 transition-colors">
                  <Play className="w-5 h-5 text-primary-700" />
                </div>
                <div className="flex-1 text-left">
                  <div style={{ 
                    fontFamily: 'var(--font-body)', 
                    fontWeight: 'var(--font-weight-medium)',
                    marginBottom: 'var(--space-1)'
                  }}>
                    {chapter.title}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-body)' }}>
                    {chapter.duration}
                  </div>
                </div>
                <div className="text-sm" style={{ 
                  color: 'var(--neutral-500)', 
                  fontFamily: 'var(--font-body)',
                  fontWeight: 'var(--font-weight-medium)'
                }}>
                  {chapter.time}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="mb-12 p-8" style={{ 
          background: 'var(--gradient-primary-soft)',
          borderRadius: 'var(--radius-xl)'
        }}>
          <h2 style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-weight-semibold)',
            marginBottom: 'var(--space-6)',
            color: 'var(--primary-800)'
          }}>
            📥 Ressources à télécharger
          </h2>
          <div className="space-y-3">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white"
                style={{ borderRadius: 'var(--radius-lg)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center text-xs" style={{ 
                    fontFamily: 'var(--font-display)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--primary-700)'
                  }}>
                    {resource.type}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-medium)' }}>
                      {resource.name}
                    </div>
                    <div className="text-sm" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-body)' }}>
                      {resource.size}
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Télécharger
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Transcript */}
        <div>
          <h2 style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-weight-semibold)',
            marginBottom: 'var(--space-6)'
          }}>
            Transcription
          </h2>
          <div className="prose max-w-none" style={{ fontFamily: 'var(--font-body)' }}>
            <p style={{ 
              fontSize: 'var(--text-base)', 
              lineHeight: 'var(--leading-relaxed)',
              color: 'var(--neutral-600)',
              marginBottom: 'var(--space-6)'
            }}>
              <strong>[0:00]</strong> Bonjour à tous et bienvenue dans ce tutoriel complet sur le prompt engineering. 
              Aujourd'hui, nous allons explorer ensemble comment formuler des prompts efficaces pour obtenir les 
              meilleurs résultats de vos outils d'IA générative.
            </p>
            <p style={{ 
              fontSize: 'var(--text-base)', 
              lineHeight: 'var(--leading-relaxed)',
              color: 'var(--neutral-600)',
              marginBottom: 'var(--space-6)'
            }}>
              <strong>[2:15]</strong> Commençons par les principes de base. Un bon prompt doit être clair, spécifique 
              et contextuel. Pensez à l'IA comme à un collaborateur intelligent : plus vous lui donnez d'informations 
              pertinentes, meilleurs seront les résultats.
            </p>
            <p style={{ 
              fontSize: 'var(--text-base)', 
              lineHeight: 'var(--leading-relaxed)',
              color: 'var(--neutral-600)',
              marginBottom: 'var(--space-6)'
            }}>
              <strong>[7:45]</strong> Passons maintenant aux techniques avancées. La technique du "role prompting" 
              consiste à demander à l'IA d'adopter un rôle spécifique. Par exemple : "Tu es un expert en pédagogie 
              avec 15 ans d'expérience..." Cette approche améliore significativement la qualité des réponses.
            </p>
          </div>
        </div>
      </article>

      {/* Related Videos */}
      <section className="bg-neutral-50 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-center mb-12" style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-4xl)',
            fontWeight: 'var(--font-weight-bold)'
          }}>
            Vidéos Similaires
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                style={{ borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)' }}
              >
                <div className="aspect-video bg-neutral-900 relative overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-${1600000000000 + i * 10000}?w=600`}
                    alt={`Video ${i}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                      <Play className="w-5 h-5 text-primary ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded" style={{ fontFamily: 'var(--font-body)' }}>
                    12:45
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm mb-3" style={{ color: 'var(--neutral-600)' }}>
                    Phoenix Baker • 850 vues
                  </div>
                  <h3 className="group-hover:text-primary transition-colors" style={{ 
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-weight-semibold)'
                  }}>
                    Tutoriel Vidéo {i}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
