import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { ArrowRight, ArrowLeft, Mail, FileText } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";

interface MagPageProps {
  onNavigate?: (page: string) => void;
}

export default function MagPage({ onNavigate }: MagPageProps) {
  const [email, setEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleNavigate = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const featuredPost = {
    image: "https://images.unsplash.com/photo-1758657209734-6b21300103dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFpbmluZyUyMHByb2Zlc3Npb25hbCUyMHdvbWFufGVufDF8fHx8MTc2NTk4MjQ4M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    author: "Olivia Rhye",
    date: "20 Jan 2025",
    title: "Ne formez plus à l'IA, formez avec l'IA : réinventer vos cœurs de métier",
    excerpt: "Il y a encore quelques mois, la tendance était à la création de modules spécifiques sur l'IA. Aujourd'hui, l'enjeu n'est plus de former à l'IA, mais de former avec l'IA pour transformer vos métiers en profondeur.",
    tags: ["Non classé", "Transformation"],
    route: "article-standard"
  };

  const blogPosts = [
    {
      image: "https://images.unsplash.com/photo-1765806464581-812b097d0687?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMHRlY2hub2xvZ3klMjBidXNpbmVzc3xlbnwxfHx8fDE3NjU5ODI0ODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      author: "Phoenix Baker",
      date: "19 Jan 2025",
      title: "IA en formation : Pourquoi et comment l'intégrer concrètement dans vos parcours ?",
      excerpt: "Imaginez l'un de vos formateurs experts - que ce soit en management, en techniques de vente ou en accompagnement au changement - capable de créer un parcours complet en quelques heures au lieu de plusieurs semaines.",
      tags: ["Guide", "IA"],
      route: "article-sidebar"
    },
    {
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800",
      author: "Lana Steiner",
      date: "18 Jan 2025",
      title: "Les 3 compétences essentielles pour les acteurs de la formation professionnelle",
      excerpt: "Le monde de la formation professionnelle est à un carrefour historique. L'arrivée massive des technologies – de l'Intelligence Artificielle au micro-learning – transforme radicalement nos métiers.",
      tags: ["Interview", "Compétences"],
      route: "article-interview"
    },
    {
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
      author: "Alec Whitten",
      date: "17 Jan 2025",
      title: "L'IA révolutionne l'apprentissage adaptatif",
      excerpt: "Chaque apprenant est unique, et l'Intelligence Artificielle (IA) permet enfin de le prendre en compte à grande échelle. Grâce à l'apprentissage adaptatif, les parcours de formation s'ajustent en temps réel.",
      tags: ["Vidéo", "Adaptatif"],
      route: "article-video"
    },
    {
      image: "https://images.unsplash.com/photo-1707301280380-56f7e7a00aef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN0cmF0ZWd5JTIwbWVldGluZ3xlbnwxfHx8fDE3NjU5NzMwMTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      author: "Demi Wilkinson",
      date: "16 Jan 2025",
      title: "Mieux former vos formateurs : L'IA pour mesurer le ROI d'une formation efficacement",
      excerpt: "Dans toutes les entreprises, il y a ce moment classique : un expert doit former ses collègues. N'étant pas pédagogue de formation, il peine à structurer et transmettre son expertise.",
      tags: ["ROI", "Mesure"],
      route: "article-pdf"
    },
    {
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800",
      author: "Candice Wu",
      date: "15 Jan 2025",
      title: "L'IA, le nouvel allié du formateur créateur",
      excerpt: "Le secteur de la formation professionnelle fait face à une double injonction : produire des contenus toujours plus engageants et personnalisés, tout en réduisant les délais et les coûts.",
      tags: ["Créativité", "Productivité"],
      route: "article-newsletter"
    },
    {
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
      author: "Natali Craig",
      date: "14 Jan 2025",
      title: "IA et évaluation : Déléguez la correction, gardez le coaching",
      excerpt: "L'évaluation des compétences est souvent fastidieuse, un vrai gouffre à temps. Heureusement, l'Intelligence Artificielle (IA) peut grandement la faciliter en automatisant les tâches répétitives.",
      tags: ["Évaluation", "Coaching"],
      route: "article-standard"
    },
    {
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
      author: "Drew Cano",
      date: "13 Jan 2025",
      title: "Comment intégrer l'IA à votre système Qualiopi ?",
      excerpt: "L'ère de la paperasse et des systèmes de gestion Qualiopi fragmentés touche à sa fin. La véritable transformation IA pour votre organisme de formation commence ici.",
      tags: ["Qualiopi", "Conformité"],
      route: "article-checklist"
    },
    {
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
      author: "Orlando Diggs",
      date: "12 Jan 2025",
      title: "Votre assistant virtuel pour former en toute liberté",
      excerpt: "En tant que formateur, vous le savez : la passion d'accompagner se heurte souvent à la charge administrative. L'automatisation intelligente change la donne et vous libère du temps.",
      tags: ["Assistant IA", "Automatisation"],
      route: "article-sidebar"
    }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Merci pour votre inscription !");
    setEmail("");
  };

  const tagColors: { [key: string]: string } = {
    "IA & Pédagogie": "bg-[#f9f5ff] text-[#6941c6] border-[#e9d7fe]",
    "Innovation": "bg-[#fdf2fa] text-[#c11574] border-[#fcceee]",
    "Formation": "bg-[#eef4ff] text-[#3538cd] border-[#c7d7fe]",
    "Tuto": "bg-[#f0f9ff] text-[#026aa2] border-[#b9e6fe]",
    "IA": "bg-[#f9f5ff] text-[#6941c6] border-[#e9d7fe]",
    "Prompts": "bg-[#fdf2fa] text-[#c11574] border-[#fcceee]",
    "Productivité": "bg-[#ecfdf3] text-[#067647] border-[#abefc6]",
    "Équipe": "bg-[#eef4ff] text-[#3538cd] border-[#c7d7fe]",
    "Outils": "bg-[#f0f9ff] text-[#026aa2] border-[#b9e6fe]",
    "Tech": "bg-[#f9f5ff] text-[#6941c6] border-[#e9d7fe]",
    "Stratégie": "bg-[#f8f9fc] text-[#363f72] border-[#d5d9eb]",
    "Déploiement": "bg-[#fef6ee] text-[#b93815] border-[#f9dbaf]",
    "Tendance": "bg-[#ecfdf3] text-[#067647] border-[#abefc6]",
    "Micro-learning": "bg-[#eef4ff] text-[#3538cd] border-[#c7d7fe]",
    "ROI": "bg-[#f0f9ff] text-[#026aa2] border-[#b9e6fe]",
    "Analyse": "bg-[#f8f9fc] text-[#363f72] border-[#d5d9eb]",
    "Non classé": "bg-[#f0f9ff] text-[#026aa2] border-[#b9e6fe]",
    "Transformation": "bg-[#f8f9fc] text-[#363f72] border-[#d5d9eb]",
    "Guide": "bg-[#f0f9ff] text-[#026aa2] border-[#b9e6fe]",
    "Interview": "bg-[#f0f9ff] text-[#026aa2] border-[#b9e6fe]",
    "Vidéo": "bg-[#f0f9ff] text-[#026aa2] border-[#b9e6fe]",
    "Mesure": "bg-[#f0f9ff] text-[#026aa2] border-[#b9e6fe]",
    "Créativité": "bg-[#f0f9ff] text-[#026aa2] border-[#b9e6fe]",
    "Compétences": "bg-[#f0f9ff] text-[#026aa2] border-[#b9e6fe]",
    "Évaluation": "bg-[#f0f9ff] text-[#026aa2] border-[#b9e6fe]",
    "Coaching": "bg-[#f0f9ff] text-[#026aa2] border-[#b9e6fe]",
    "Qualiopi": "bg-[#f0f9ff] text-[#026aa2] border-[#b9e6fe]",
    "Conformité": "bg-[#f0f9ff] text-[#026aa2] border-[#b9e6fe]",
    "Assistant IA": "bg-[#f0f9ff] text-[#026aa2] border-[#b9e6fe]",
    "Automatisation": "bg-[#f0f9ff] text-[#026aa2] border-[#b9e6fe]"
  };

  const Badge = ({ text }: { text: string }) => {
    const colorClass = tagColors[text] || "bg-muted text-muted-foreground border-border";
    return (
      <span className={`inline-flex items-center px-[10px] py-[2px] rounded-full text-sm border ${colorClass}`}>
        {text}
      </span>
    );
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-primary overflow-hidden pb-[160px] pt-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <p className="text-accent uppercase tracking-wider mb-3">Blog</p>
            <h1 className="text-5xl md:text-6xl mb-6 tracking-tight">
              Bibliothèque de Ressources
            </h1>
            <p className="text-lg text-white/90 mb-12">
              Abonnez-vous pour découvrir les nouvelles fonctionnalités des produits, les dernières technologies, solutions et mises à jour
            </p>
            
            {/* Newsletter Form */}
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto mb-8">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Entrez votre email"
                    required
                    className="bg-white pl-12"
                    style={{ fontFamily: 'var(--font-body)', borderColor: 'var(--neutral-300)' }}
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--neutral-400)' }} />
                </div>
                <Button 
                  type="submit"
                  className="bg-white text-primary hover:bg-white/90 px-6"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-semibold)' }}
                >
                  S'abonner
                </Button>
              </div>
              <p className="text-white/80 text-xs mt-3" style={{ fontFamily: 'var(--font-body)' }}>
                Recevez nos derniers articles, tendances et outils directement dans votre boîte mail 📬
              </p>
            </form>

            {/* Templates CTA */}
            <div className="mt-8">
              <Button 
                variant="outline"
                className="border-2 border-secondary bg-secondary text-white hover:bg-secondary-hover backdrop-blur-sm"
                onClick={() => handleNavigate('templates')}
              >
                <FileText className="mr-2 h-5 w-5" />
                Voir les templates de contenu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-8 -mt-24 mb-24">
        {/* Featured Post */}
        <Card 
          className="mb-16 overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => handleNavigate(featuredPost.route)}
        >
          <div className="aspect-video w-full overflow-hidden">
            <ImageWithFallback 
              src={featuredPost.image}
              alt={featuredPost.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-8">
            <p className="text-primary text-sm mb-2">
              {featuredPost.author} • {featuredPost.date}
            </p>
            <div className="flex items-start gap-4 mb-4">
              <h2 className="text-3xl flex-1">
                {featuredPost.title}
              </h2>
              <button className="flex-shrink-0 w-6 h-6 hover:text-primary transition-colors" style={{ color: 'var(--neutral-400)' }}>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
            <p className="text-lg mb-6" style={{ color: 'var(--foreground)' }}>
              {featuredPost.excerpt}
            </p>
            <div className="flex flex-wrap gap-2">
              {featuredPost.tags.map((tag, index) => (
                <Badge key={index} text={tag} />
              ))}
            </div>
          </div>
        </Card>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post, index) => (
            <Card 
              key={index} 
              className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 duration-300 group cursor-pointer"
              onClick={() => handleNavigate(post.route)}
            >
              <div className="aspect-video overflow-hidden">
                <ImageWithFallback 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <p className="text-primary text-sm mb-2">
                  {post.author} • {post.date}
                </p>
                <div className="flex items-start gap-3 mb-3">
                  <h3 className="text-lg flex-1 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <button className="flex-shrink-0 w-5 h-5 group-hover:text-primary transition-colors" style={{ color: 'var(--neutral-400)' }}>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm mb-6 line-clamp-2" style={{ color: 'var(--foreground)' }}>
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} text={tag} />
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-5 pt-8" style={{ borderTop: `1px solid var(--border)` }}>
          <button 
            className="flex items-center gap-2 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
            disabled={currentPage === 1}
            style={{ color: 'var(--neutral-600)' }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Précédent</span>
          </button>
          
          <div className="flex gap-1">
            {[1, 2, 3, "...", 8, 9, 10].map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  currentPage === page
                    ? 'bg-muted text-foreground'
                    : 'hover:bg-muted/50'
                }`}
                style={{ color: currentPage === page ? 'var(--foreground)' : 'var(--neutral-500)' }}
                disabled={typeof page !== 'number'}
              >
                {page}
              </button>
            ))}
          </div>

          <button 
            className="flex items-center gap-2 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ color: 'var(--neutral-600)' }}
          >
            <span>Suivant</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}