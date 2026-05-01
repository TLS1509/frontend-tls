import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Calendar,
  Eye,
  Clock,
  ExternalLink,
  Share2,
  Mail,
  Download,
  Copy,
  Check,
} from 'lucide-react';
import { BackgroundBlobs } from '../components/ui/background-blobs';
import OptimizedSidebar from '../components/ui/optimized-sidebar';
import { useToast, ToastContainer } from '../components/ui/notification-toast';

interface NewsletterPageProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  imageUrl?: string;
  videoUrl?: string;
  readTime: string;
  url?: string;
  curator: string;
}

export default function NewsletterPage({ onNavigate, onLogout }: NewsletterPageProps) {
  const [copied, setCopied] = useState(false);
  const { toasts, success, removeToast } = useToast();

  // Actualités de la semaine
  const newsletterData = {
    weekNumber: 8,
    year: 2026,
    publishDate: '22 février 2026',
    edition: 'Semaine #08 - Février 2026',
    featuredVideo: {
      title: 'Les nouveaux paradigmes de l\'apprentissage en ligne',
      description: 'Découvrez comment l\'IA transforme l\'éducation et les stratégies d\'apprentissage pour rester compétitif en 2026.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '12:45',
    },
    newsItems: [
      {
        id: 1,
        title: 'L\'essor du microlearning dans les entreprises tech',
        summary: 'Les géants de la tech adoptent massivement le microlearning pour former leurs équipes. Une révolution qui redéfinit la formation continue.',
        imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
        readTime: '5 min',
        url: 'https://example.com/article-1',
        curator: 'The Learning Society',
      },
      {
        id: 2,
        title: 'Comment l\'IA générative change la création de contenus pédagogiques',
        summary: 'Les outils d\'IA générative permettent désormais de créer du contenu éducatif personnalisé à grande échelle. Analyse des meilleures pratiques.',
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
        readTime: '7 min',
        url: 'https://example.com/article-2',
        curator: 'The Learning Society',
      },
      {
        id: 3,
        title: 'Les soft skills les plus recherchées en 2026',
        summary: 'Une étude mondiale révèle les compétences interpersonnelles les plus valorisées par les recruteurs et comment les développer efficacement.',
        imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=500&fit=crop',
        readTime: '6 min',
        url: 'https://example.com/article-3',
        curator: 'The Learning Society',
      },
    ],
  };

  const handleCopyHTML = () => {
    const htmlContent = generateNewsletterHTML();
    navigator.clipboard.writeText(htmlContent);
    setCopied(true);
    success('HTML copié dans le presse-papier !');
    setTimeout(() => setCopied(false), 2000);
  };

  const generateNewsletterHTML = () => {
    return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Learning Society - ${newsletterData.edition}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #1e293b; background: #f8fafc; }
    .container { max-width: 680px; margin: 0 auto; background: white; }
    .header { background: linear-gradient(135deg, #55A1B4 0%, #4a8fa0 100%); padding: 40px 32px; text-align: center; }
    .logo { font-family: 'League Spartan', sans-serif; font-size: 28px; font-weight: 800; color: white; margin-bottom: 8px; }
    .edition { font-size: 14px; color: rgba(255,255,255,0.9); font-weight: 500; }
    .content { padding: 32px; }
    .featured-video { margin-bottom: 40px; }
    .video-wrapper { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 16px; margin-bottom: 20px; }
    .video-wrapper iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
    .video-title { font-family: 'League Spartan', sans-serif; font-size: 24px; font-weight: 700; color: #1e293b; margin-bottom: 12px; }
    .video-description { font-size: 16px; color: #64748b; line-height: 1.7; }
    .news-item { margin-bottom: 32px; padding-bottom: 32px; border-bottom: 1px solid #e2e8f0; }
    .news-item:last-child { border-bottom: none; }
    .news-image { width: 100%; height: 240px; object-fit: cover; border-radius: 12px; margin-bottom: 16px; }
    .news-title { font-family: 'League Spartan', sans-serif; font-size: 20px; font-weight: 700; color: #1e293b; margin-bottom: 12px; }
    .news-summary { font-size: 15px; color: #64748b; line-height: 1.7; margin-bottom: 16px; }
    .news-meta { display: flex; align-items: center; gap: 12px; font-size: 13px; color: #94a3b8; }
    .read-more { display: inline-block; padding: 12px 24px; background: #55A1B4; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; }
    .footer { background: #f8fafc; padding: 32px; text-align: center; border-top: 1px solid #e2e8f0; }
    .footer-text { font-size: 13px; color: #64748b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">The Learning Society</div>
      <div class="edition">${newsletterData.edition}</div>
    </div>
    
    <div class="content">
      <div class="featured-video">
        <div class="video-wrapper">
          <iframe src="${newsletterData.featuredVideo.videoUrl}" frameborder="0" allowfullscreen></iframe>
        </div>
        <h2 class="video-title">${newsletterData.featuredVideo.title}</h2>
        <p class="video-description">${newsletterData.featuredVideo.description}</p>
      </div>
      
      ${newsletterData.newsItems.map(item => `
      <div class="news-item">
        ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.title}" class="news-image" />` : ''}
        <h3 class="news-title">${item.title}</h3>
        <p class="news-summary">${item.summary}</p>
        <div class="news-meta">
          <span>⏱️ ${item.readTime}</span>
          <span>•</span>
          <span>📝 ${item.curator}</span>
        </div>
        ${item.url ? `<a href="${item.url}" class="read-more">Lire l'article</a>` : ''}
      </div>
      `).join('')}
    </div>
    
    <div class="footer">
      <p class="footer-text">© 2026 The Learning Society - Vos actualités de la semaine</p>
      <p class="footer-text">Les meilleures ressources sélectionnées pour vous chaque semaine</p>
    </div>
  </div>
</body>
</html>`;
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <BackgroundBlobs />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <OptimizedSidebar onNavigate={onNavigate} onLogout={onLogout} currentPage="veille" />

      <div className="ml-20 min-h-screen">
        <div className="max-w-5xl mx-auto px-8 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => onNavigate('veille')}
              className="flex items-center gap-2 mb-6 px-4 py-2 rounded-xl transition-all duration-200 hover:translate-x-[-4px]"
              style={{
                background: 'rgba(255, 255, 255, 0.6)',
                border: '1px solid var(--border)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--foreground)',
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à la veille
            </button>

            <div className="flex items-center justify-between mb-6">
              <div>
                <h1
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 5vw, 3rem)',
                    fontWeight: 'var(--font-weight-extrabold)',
                    color: 'var(--foreground)',
                    lineHeight: 'var(--leading-tight)',
                  }}
                >
                  Actus de la semaine
                </h1>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-lg)',
                    color: 'var(--muted-foreground)',
                    marginTop: '8px',
                  }}
                >
                  {newsletterData.edition}
                </p>
              </div>

              <div className="flex gap-3">
                <motion.button
                  onClick={handleCopyHTML}
                  className="px-5 py-3 rounded-xl flex items-center gap-2"
                  style={{
                    background: copied ? 'var(--primary)' : 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid var(--border)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: copied ? 'white' : 'var(--foreground)',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copié !' : 'Copier HTML'}
                </motion.button>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2" style={{ color: 'var(--muted-foreground)' }}>
                <Calendar className="w-4 h-4" />
                <span style={{ fontFamily: 'var(--font-body)' }}>{newsletterData.publishDate}</span>
              </div>
            </div>
          </motion.div>

          {/* Newsletter Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'white',
              border: '1px solid var(--border)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
            }}
          >
            {/* Newsletter Header */}
            <div
              className="px-12 py-16 text-center"
              style={{
                background: 'linear-gradient(135deg, var(--primary) 0%, rgba(85, 161, 180, 0.85) 100%)',
              }}
            >
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  fontWeight: 'var(--font-weight-extrabold)',
                  color: 'white',
                  marginBottom: '8px',
                }}
              >
                The Learning Society
              </motion.h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-base)',
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                {newsletterData.edition}
              </p>
            </div>

            {/* Newsletter Content */}
            <div className="px-12 py-12">
              {/* Featured Video */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-16"
              >
                <div
                  className="mb-6 rounded-2xl overflow-hidden"
                  style={{
                    position: 'relative',
                    paddingBottom: '56.25%',
                    background: 'var(--muted)',
                  }}
                >
                  <img
                    src={newsletterData.featuredVideo.thumbnailUrl}
                    alt={newsletterData.featuredVideo.title}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0, 0, 0, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <div
                        style={{
                          width: 0,
                          height: 0,
                          borderLeft: '16px solid var(--primary)',
                          borderTop: '10px solid transparent',
                          borderBottom: '10px solid transparent',
                          marginLeft: '4px',
                        }}
                      />
                    </div>
                  </div>
                </div>

                <h3
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                    lineHeight: 'var(--leading-tight)',
                  }}
                >
                  {newsletterData.featuredVideo.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    color: 'var(--muted-foreground)',
                    lineHeight: '1.7',
                  }}
                >
                  {newsletterData.featuredVideo.description}
                </p>
              </motion.div>

              {/* News Items */}
              {newsletterData.newsItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="pb-12 mb-12"
                  style={{
                    borderBottom: index < newsletterData.newsItems.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full rounded-2xl mb-6"
                      style={{
                        height: '280px',
                        objectFit: 'cover',
                      }}
                    />
                  )}

                  <h4
                    className="mb-4"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                      lineHeight: 'var(--leading-tight)',
                    }}
                  >
                    {item.title}
                  </h4>

                  <p
                    className="mb-4"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-base)',
                      color: 'var(--muted-foreground)',
                      lineHeight: '1.7',
                    }}
                  >
                    {item.summary}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3" style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span style={{ fontFamily: 'var(--font-body)' }}>{item.readTime}</span>
                      </div>
                      <span>•</span>
                      <span style={{ fontFamily: 'var(--font-body)' }}>{item.curator}</span>
                    </div>

                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-200"
                        style={{
                          background: 'var(--primary)',
                          color: 'white',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          textDecoration: 'none',
                        }}
                      >
                        Lire l'article
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Newsletter Footer */}
            <div
              className="px-12 py-10 text-center"
              style={{
                background: 'var(--muted)',
                borderTop: '1px solid var(--border)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--muted-foreground)',
                  marginBottom: '4px',
                }}
              >
                © 2026 The Learning Society - Vos actualités de la semaine
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--muted-foreground)',
                }}
              >
                Les meilleures ressources sélectionnées pour vous chaque semaine
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
