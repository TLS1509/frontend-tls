import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft, Twitter, Linkedin, Link2 } from "lucide-react";
import { useState } from "react";

export default function ArticleSidebarPage() {
  const [activeSection, setActiveSection] = useState("introduction");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const shareOnSocial = (platform: string) => {
    const url = window.location.href;
    window.open(
      platform === 'twitter' 
        ? `https://twitter.com/intent/tweet?url=${url}` 
        : `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      '_blank'
    );
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="border-b border-border sticky top-20 bg-white/95 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <Button variant="ghost" className="gap-2" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4" />
            Retour au Mag'
          </Button>
          <Button className="bg-primary hover:bg-primary-hover">
            S'abonner
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid lg:grid-cols-[240px_1fr] gap-16">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-8">
              {/* Table of Contents */}
              <nav>
                <h3 className="text-xs uppercase tracking-wider mb-4" style={{ 
                  fontFamily: 'var(--font-display)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--neutral-600)'
                }}>
                  Sommaire
                </h3>
                <div className="space-y-2">
                  {[
                    { id: 'introduction', label: 'Introduction' },
                    { id: 'outils', label: 'Outils & Technologies' },
                    { id: 'ressources', label: 'Autres Ressources' },
                    { id: 'conclusion', label: 'Conclusion' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full text-left py-2 px-3 rounded-lg text-sm transition-all ${
                        activeSection === item.id
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'hover:bg-neutral-50 text-neutral-600'
                      }`}
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </nav>

              {/* Share */}
              <div>
                <h3 className="text-xs uppercase tracking-wider mb-4" style={{ 
                  fontFamily: 'var(--font-display)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--neutral-600)'
                }}>
                  Partager
                </h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => shareOnSocial('twitter')}
                    className="hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2]"
                  >
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => shareOnSocial('linkedin')}
                    className="hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]"
                  >
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                    className="hover:bg-neutral-100"
                  >
                    <Link2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <article className="max-w-3xl">
            {/* Meta */}
            <div className="flex items-center gap-4 mb-8 text-sm" style={{ color: 'var(--neutral-600)' }}>
              <div className="flex items-center gap-2">
                <img 
                  src="https://i.pravatar.cc/150?img=2" 
                  alt="Olivia Rhye"
                  className="w-10 h-10 rounded-full"
                />
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-semibold)' }}>
                  Olivia Rhye
                </span>
              </div>
              <span>•</span>
              <span>20 Jan 2025</span>
              <span>•</span>
              <span>8 min de lecture</span>
            </div>

            {/* Title */}
            <h1 className="mb-6" style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 'var(--text-5xl)',
              fontWeight: 'var(--font-weight-bold)',
              lineHeight: 'var(--leading-tight)'
            }}>
              Comment la collaboration nous rend meilleurs designers
            </h1>

            {/* Subtitle */}
            <p className="mb-8" style={{ 
              fontSize: 'var(--text-xl)',
              lineHeight: 'var(--leading-relaxed)',
              color: 'var(--foreground)',
              fontFamily: 'var(--font-body)'
            }}>
              La collaboration est l'un des aspects les plus importants de la conception. Elle permet 
              aux designers de travailler ensemble pour créer des solutions innovantes et efficaces.
            </p>

            {/* Featured Image */}
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200"
              alt="Collaboration"
              className="w-full aspect-video object-cover mb-12"
              style={{ borderRadius: 'var(--radius-xl)' }}
            />

            {/* Content */}
            <div className="prose max-w-none space-y-8">
              <section id="introduction">
                <h2 style={{ 
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 'var(--font-weight-semibold)',
                  marginBottom: 'var(--space-4)'
                }}>
                  Introduction
                </h2>
                <p style={{ 
                  fontSize: 'var(--text-base)', 
                  lineHeight: 'var(--leading-relaxed)',
                  color: 'var(--foreground)',
                  fontFamily: 'var(--font-body)',
                  marginBottom: 'var(--space-6)'
                }}>
                  Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi 
                  eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus 
                  aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus 
                  tincidunt. At feugiat sapien varius id.
                </p>
                <p style={{ 
                  fontSize: 'var(--text-base)', 
                  lineHeight: 'var(--leading-relaxed)',
                  color: 'var(--foreground)',
                  fontFamily: 'var(--font-body)'
                }}>
                  Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at 
                  volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. 
                  Quis at habitant diam at. Suscipit tristique risus, at donec.
                </p>
              </section>

              {/* Callout */}
              <div className="my-12 p-8 border-l-4" style={{ 
                backgroundColor: 'var(--secondary-50)',
                borderColor: 'var(--secondary-500)',
                borderRadius: 'var(--radius-xl)'
              }}>
                <h3 style={{ 
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  marginBottom: 'var(--space-3)',
                  color: 'var(--secondary-700)'
                }}>
                  💡 Astuce Pratique
                </h3>
                <p style={{ 
                  fontSize: 'var(--text-base)',
                  lineHeight: 'var(--leading-relaxed)',
                  color: 'var(--neutral-700)',
                  fontFamily: 'var(--font-body)'
                }}>
                  Utilisez des outils de collaboration en temps réel comme Figma pour permettre 
                  à toute l'équipe de travailler ensemble sur les mêmes fichiers, peu importe 
                  leur localisation géographique.
                </p>
              </div>

              <section id="outils">
                <h2 style={{ 
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 'var(--font-weight-semibold)',
                  marginTop: 'var(--space-12)',
                  marginBottom: 'var(--space-4)'
                }}>
                  Outils & Technologies
                </h2>
                <p style={{ 
                  fontSize: 'var(--text-base)', 
                  lineHeight: 'var(--leading-relaxed)',
                  color: 'var(--foreground)',
                  fontFamily: 'var(--font-body)',
                  marginBottom: 'var(--space-6)'
                }}>
                  Pharetra morbi libero id aliquam elit massa integer tellus. Quis felis aliquam 
                  ullamcorper porttitor. Pulvinar ullamcorper sit dictumst ut eget a, elementum eu.
                </p>

                <ul className="space-y-3 mb-8" style={{ color: 'var(--foreground)' }}>
                  <li className="flex gap-3">
                    <span className="text-primary-500">•</span>
                    <span>Figma pour la conception collaborative en temps réel</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary-500">•</span>
                    <span>Miro pour les sessions de brainstorming et d'idéation</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary-500">•</span>
                    <span>Notion pour la documentation et le partage de connaissances</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary-500">•</span>
                    <span>Slack pour la communication asynchrone</span>
                  </li>
                </ul>
              </section>

              <img 
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200"
                alt="Workspace"
                className="w-full aspect-video object-cover my-12"
                style={{ borderRadius: 'var(--radius-xl)' }}
              />

              <section id="ressources">
                <h2 style={{ 
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 'var(--font-weight-semibold)',
                  marginTop: 'var(--space-12)',
                  marginBottom: 'var(--space-4)'
                }}>
                  Autres Ressources
                </h2>
                <p style={{ 
                  fontSize: 'var(--text-base)', 
                  lineHeight: 'var(--leading-relaxed)',
                  color: 'var(--foreground)',
                  fontFamily: 'var(--font-body)'
                }}>
                  Sagittis et eu at elementum, quis in. Proin praesent volutpat egestas sociis sit 
                  lorem nunc nunc sit. Eget diam curabitur mi ac. Auctor rutrum lacus malesuada 
                  massa ornare et.
                </p>
              </section>

              <section id="conclusion">
                <h2 style={{ 
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 'var(--font-weight-semibold)',
                  marginTop: 'var(--space-12)',
                  marginBottom: 'var(--space-4)'
                }}>
                  Conclusion
                </h2>
                <p style={{ 
                  fontSize: 'var(--text-base)', 
                  lineHeight: 'var(--leading-relaxed)',
                  color: 'var(--foreground)',
                  fontFamily: 'var(--font-body)',
                  marginBottom: 'var(--space-6)'
                }}>
                  La collaboration est bien plus qu'un simple mot à la mode. C'est une approche 
                  fondamentale qui transforme la façon dont nous créons, innovons et résolvons 
                  les problèmes.
                </p>
                <p style={{ 
                  fontSize: 'var(--text-base)', 
                  lineHeight: 'var(--leading-relaxed)',
                  color: 'var(--foreground)',
                  fontFamily: 'var(--font-body)'
                }}>
                  Que vous travailliez en remote ou en présentiel, les principes restent les mêmes : 
                  communication ouverte, respect mutuel, et engagement vers un objectif commun.
                </p>
              </section>
            </div>
          </article>
        </div>
      </div>

      {/* Related Articles */}
      <section className="bg-neutral-50 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-center mb-12" style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-3xl)',
            fontWeight: 'var(--font-weight-bold)'
          }}>
            Latest writings
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                style={{ borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)' }}
              >
                <img
                  src={`https://images.unsplash.com/photo-${1700000000000 + i * 1000}?w=600`}
                  alt={`Article ${i}`}
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <div className="text-sm mb-3" style={{ color: 'var(--neutral-600)' }}>
                    Author • 19 Jan 2025
                  </div>
                  <h3 className="group-hover:text-primary transition-colors" style={{ 
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-weight-semibold)'
                  }}>
                    Article Title {i}
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