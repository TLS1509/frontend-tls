import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { FileText, Video, FileCheck, Mail, Mic, CheckSquare, Download, ExternalLink } from "lucide-react";

interface TemplatesGalleryPageProps {
  onNavigate?: (page: string) => void;
}

const templates = [
  {
    id: "article-v1",
    name: "Article Standard (v1)",
    description: "Article de blog classique avec hero, contenu rich text, social share et related articles",
    icon: FileText,
    color: "bg-blue-50 text-blue-600 border-blue-200",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800",
    route: "article-standard",
    features: ["Hero avec meta", "Contenu rich text", "Key Takeaways Box", "Social Share", "Related Articles"]
  },
  {
    id: "article-v2",
    name: "Article avec Sidebar (v2)",
    description: "Layout 2 colonnes avec sidebar, table des matières cliquable et navigation rapide",
    icon: FileText,
    color: "bg-purple-50 text-purple-600 border-purple-200",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800",
    route: "article-sidebar",
    features: ["Sidebar sticky", "Sommaire cliquable", "Social share", "Callout boxes"]
  },
  {
    id: "video",
    name: "Article Vidéo",
    description: "Template pour tutoriels vidéo avec player intégrable et chapitres cliquables",
    icon: Video,
    color: "bg-red-50 text-red-600 border-red-200",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800",
    route: "article-video",
    features: ["Player YouTube/Vimeo", "Timestamps cliquables", "Ressources téléchargeables", "Stats"]
  },
  {
    id: "pdf",
    name: "Rapport & PDF",
    description: "Présentation professionnelle pour livres blancs, études de cas et rapports",
    icon: FileCheck,
    color: "bg-green-50 text-green-600 border-green-200",
    image: "https://images.unsplash.com/photo-1586953208270-de7a5c375e85?w=800",
    route: "article-pdf",
    features: ["PDF thumbnail", "Stats grid", "Table des matières", "Key Findings", "CTA téléchargement"]
  },
  {
    id: "newsletter",
    name: "Newsletter Archive",
    description: "Format web pour archiver vos newsletters avec sections thématiques",
    icon: Mail,
    color: "bg-yellow-50 text-yellow-600 border-yellow-200",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800",
    route: "article-newsletter",
    features: ["Édition numérotée", "Highlight boxes", "Resources list", "Archive éditions"]
  },
  {
    id: "interview",
    name: "Interview Expert",
    description: "Format Q&A élégant avec carte invité et citations mises en avant",
    icon: Mic,
    color: "bg-pink-50 text-pink-600 border-pink-200",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800",
    route: "article-interview",
    features: ["Guest card", "Format Q&A", "Highlight quotes", "Social links"]
  },
  {
    id: "checklist",
    name: "Checklist & Guide",
    description: "Checklist interactive avec items cochables et barre de progression",
    icon: CheckSquare,
    color: "bg-indigo-50 text-indigo-600 border-indigo-200",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800",
    route: "article-checklist",
    features: ["Items cochables", "Barre de progression", "Phases numérotées", "Download PDF"]
  }
];

export default function TemplatesGalleryPage({ onNavigate }: TemplatesGalleryPageProps) {
  const handlePreview = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    }
  };

  const handleDownload = (file: string) => {
    alert('Cette fonctionnalité sera disponible prochainement. Pour l\'instant, utilisez le bouton "Prévisualiser" pour voir le template en action.');
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-primary overflow-hidden pb-24 pt-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 mb-6 text-xs uppercase tracking-wider">
              Templates
            </Badge>
            <h1 className="text-5xl md:text-6xl mb-6 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Galerie des Templates
            </h1>
            <p className="text-lg text-white/90 mb-8" style={{ fontFamily: 'var(--font-body)' }}>
              7 templates HTML professionnels pour créer tous types de contenus pour votre magazine. 
              Chaque template est standalone avec CSS et JavaScript intégrés.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => window.open('/downloads/GUIDE-UTILISATION-TEMPLATES.md', '_blank')}
              >
                <FileText className="mr-2 h-5 w-5" />
                Guide d'utilisation
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10"
                onClick={() => window.open('/downloads/MAG-TEMPLATES-README.md', '_blank')}
              >
                <FileCheck className="mr-2 h-5 w-5" />
                Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="max-w-7xl mx-auto px-8 -mt-12 mb-24">
        <div className="grid md:grid-cols-2 gap-8">
          {templates.map((template) => {
            const Icon = template.icon;
            return (
              <Card key={template.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                {/* Template Image */}
                <div className="aspect-video overflow-hidden relative group" style={{ backgroundColor: 'var(--neutral-100)' }}>
                  <img 
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      <Button 
                        size="sm"
                        className="bg-white text-primary hover:bg-white/90 flex-1"
                        onClick={() => handlePreview(template.route)}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Prévisualiser
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
                        onClick={() => handleDownload(template.file)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${template.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                        {template.name}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'var(--neutral-600)' }}>
                        {template.description}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {template.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm" style={{ color: 'var(--neutral-600)' }}>
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span style={{ fontFamily: 'var(--font-body)' }}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={() => handlePreview(template.route)}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Voir le template
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleDownload(template.file)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Usage Section */}
      <section className="py-20" style={{ backgroundColor: 'var(--neutral-50)' }}>
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Comment utiliser ces templates
          </h2>
          <p className="text-lg mb-12 leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'var(--neutral-600)' }}>
            Chaque template est un fichier HTML standalone complet avec CSS et JavaScript intégrés. 
            Dupliquez, personnalisez le contenu et déployez !
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl" style={{ fontFamily: 'var(--font-display)' }}>1</span>
              </div>
              <h3 className="text-lg mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                Télécharger
              </h3>
              <p className="text-sm" style={{ fontFamily: 'var(--font-body)', color: 'var(--neutral-600)' }}>
                Cliquez sur "Télécharger" pour récupérer le fichier HTML du template choisi
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl" style={{ fontFamily: 'var(--font-display)' }}>2</span>
              </div>
              <h3 className="text-lg mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                Personnaliser
              </h3>
              <p className="text-sm" style={{ fontFamily: 'var(--font-body)', color: 'var(--neutral-600)' }}>
                Ouvrez dans votre éditeur et modifiez le contenu (titre, textes, images)
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl" style={{ fontFamily: 'var(--font-display)' }}>3</span>
              </div>
              <h3 className="text-lg mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                Déployer
              </h3>
              <p className="text-sm" style={{ fontFamily: 'var(--font-body)', color: 'var(--neutral-600)' }}>
                Uploadez sur votre serveur ou intégrez dans votre CMS
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-8 py-20 text-center">
        <h2 className="text-4xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>
          Besoin d'aide ?
        </h2>
        <p className="text-lg mb-8" style={{ fontFamily: 'var(--font-body)', color: 'var(--neutral-600)' }}>
          Consultez notre documentation complète ou contactez-nous pour un accompagnement personnalisé
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90"
            onClick={() => window.open('/downloads/GUIDE-UTILISATION-TEMPLATES.md', '_blank')}
          >
            <FileText className="mr-2 h-5 w-5" />
            Guide complet
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={() => window.open('mailto:contact@thelearningsociety.fr')}
          >
            Nous contacter
          </Button>
        </div>
      </section>
    </div>
  );
}