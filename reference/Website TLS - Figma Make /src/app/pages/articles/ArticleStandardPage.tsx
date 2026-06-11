import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft, Facebook, Twitter, Linkedin, Link2, Calendar, Clock, User } from "lucide-react";

export default function ArticleStandardPage() {
  const shareOnSocial = (platform: string) => {
    const url = window.location.href;
    const text = "L'IA au service de la formation : révolution pédagogique";
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`
    };
    
    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Lien copié !');
  };

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

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-8 py-16">
        {/* Meta Info */}
        <div className="flex items-center gap-4 mb-8 text-sm" style={{ color: 'var(--neutral-600)' }}>
          <div className="flex items-center gap-2">
            <img 
              src="https://i.pravatar.cc/150?img=1" 
              alt="Olivia Rhye"
              className="w-10 h-10 rounded-full"
            />
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-semibold)' }}>
              Olivia Rhye
            </span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>20 Janvier 2025</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>8 min de lecture</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-6" style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'var(--text-5xl)',
          fontWeight: 'var(--font-weight-bold)',
          lineHeight: 'var(--leading-tight)',
          color: 'var(--foreground)'
        }}>
          L'IA au service de la formation : révolution pédagogique
        </h1>

        {/* Tags */}
        <div className="flex gap-2 mb-8">
          <Badge className="bg-primary-50 text-primary-700 border-primary-200">IA & Pédagogie</Badge>
          <Badge className="bg-secondary-50 text-secondary-700 border-secondary-200">Innovation</Badge>
          <Badge className="bg-accent-50 text-accent-700 border-accent-200">Formation</Badge>
        </div>

        {/* Featured Image */}
        <img 
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200"
          alt="Formation IA"
          className="w-full aspect-video object-cover mb-12"
          style={{ borderRadius: 'var(--radius-xl)' }}
        />

        {/* Article Text */}
        <div className="prose max-w-none" style={{ fontFamily: 'var(--font-body)' }}>
          <p style={{ 
            fontSize: 'var(--text-lg)', 
            lineHeight: 'var(--leading-relaxed)',
            marginBottom: 'var(--space-6)',
            color: 'var(--foreground)'
          }}>
            L'intelligence artificielle transforme profondément le monde de la formation professionnelle. 
            Les formateurs et ingénieurs pédagogiques découvrent chaque jour de nouvelles façons d'utiliser 
            ces technologies pour créer des expériences d'apprentissage plus engageantes et personnalisées.
          </p>

          <h2 style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-3xl)',
            fontWeight: 'var(--font-weight-semibold)',
            marginTop: 'var(--space-12)',
            marginBottom: 'var(--space-6)',
            color: 'var(--foreground)'
          }}>
            Un nouveau paradigme pédagogique
          </h2>

          <p style={{ 
            fontSize: 'var(--text-base)', 
            lineHeight: 'var(--leading-relaxed)',
            marginBottom: 'var(--space-6)',
            color: 'var(--foreground)'
          }}>
            Traditionnellement, la création de contenus pédagogiques demandait des semaines, voire des mois 
            de travail. L'IA permet aujourd'hui de réduire drastiquement ces délais tout en améliorant la 
            qualité et la personnalisation des contenus.
          </p>

          <p style={{ 
            fontSize: 'var(--text-base)', 
            lineHeight: 'var(--leading-relaxed)',
            marginBottom: 'var(--space-6)',
            color: 'var(--foreground)'
          }}>
            Les formateurs peuvent désormais se concentrer sur l'essentiel : l'accompagnement humain et 
            l'adaptation fine aux besoins de chaque apprenant, pendant que l'IA gère les tâches répétitives 
            et chronophages.
          </p>

          {/* Key Takeaways Box */}
          <div className="my-12 p-8 border-l-4" style={{ 
            backgroundColor: 'var(--primary-50)',
            borderColor: 'var(--primary-500)',
            borderRadius: 'var(--radius-xl)'
          }}>
            <h3 style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-weight-semibold)',
              marginBottom: 'var(--space-4)',
              color: 'var(--primary-700)'
            }}>
              💡 Points clés à retenir
            </h3>
            <ul className="space-y-3" style={{ color: 'var(--neutral-700)' }}>
              <li className="flex gap-3">
                <span className="text-primary-500">•</span>
                <span>L'IA réduit de 60-70% le temps de création de contenus pédagogiques</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary-500">•</span>
                <span>La personnalisation devient accessible à grande échelle</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary-500">•</span>
                <span>Le rôle du formateur évolue vers plus d'accompagnement humain</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary-500">•</span>
                <span>Les résultats d'apprentissage s'améliorent significativement</span>
              </li>
            </ul>
          </div>

          <h2 style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-3xl)',
            fontWeight: 'var(--font-weight-semibold)',
            marginTop: 'var(--space-12)',
            marginBottom: 'var(--space-6)',
            color: 'var(--foreground)'
          }}>
            Les applications concrètes
          </h2>

          <h3 style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-weight-medium)',
            marginTop: 'var(--space-8)',
            marginBottom: 'var(--space-4)',
            color: 'var(--foreground)'
          }}>
            1. Création de contenu assistée par IA
          </h3>

          <p style={{ 
            fontSize: 'var(--text-base)', 
            lineHeight: 'var(--leading-relaxed)',
            marginBottom: 'var(--space-6)',
            color: 'var(--foreground)'
          }}>
            Les outils comme ChatGPT, Claude ou Gemini permettent de générer rapidement des supports de 
            cours, des exercices, des quiz ou même des scénarios pédagogiques complets. Le formateur 
            conserve son rôle d'expert en validant, ajustant et enrichissant ces contenus.
          </p>

          <h3 style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-weight-medium)',
            marginTop: 'var(--space-8)',
            marginBottom: 'var(--space-4)',
            color: 'var(--foreground)'
          }}>
            2. Personnalisation des parcours
          </h3>

          <p style={{ 
            fontSize: 'var(--text-base)', 
            lineHeight: 'var(--leading-relaxed)',
            marginBottom: 'var(--space-6)',
            color: 'var(--foreground)'
          }}>
            L'IA analyse les performances et le comportement de chaque apprenant pour adapter en temps 
            réel le niveau de difficulté, proposer des ressources complémentaires pertinentes, ou 
            suggérer des parcours alternatifs.
          </p>

          <h3 style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-weight-medium)',
            marginTop: 'var(--space-8)',
            marginBottom: 'var(--space-4)',
            color: 'var(--foreground)'
          }}>
            3. Feedback instantané et personnalisé
          </h3>

          <p style={{ 
            fontSize: 'var(--text-base)', 
            lineHeight: 'var(--leading-relaxed)',
            marginBottom: 'var(--space-6)',
            color: 'var(--foreground)'
          }}>
            Fini l'attente de plusieurs jours pour obtenir un retour sur un exercice. L'IA peut corriger 
            automatiquement et fournir un feedback constructif immédiat, permettant à l'apprenant de 
            progresser plus rapidement.
          </p>

          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200"
            alt="Collaboration formation IA"
            className="w-full aspect-video object-cover my-12"
            style={{ borderRadius: 'var(--radius-xl)' }}
          />

          <h2 style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-3xl)',
            fontWeight: 'var(--font-weight-semibold)',
            marginTop: 'var(--space-12)',
            marginBottom: 'var(--space-6)',
            color: 'var(--foreground)'
          }}>
            Les défis à relever
          </h2>

          <p style={{ 
            fontSize: 'var(--text-base)', 
            lineHeight: 'var(--leading-relaxed)',
            marginBottom: 'var(--space-6)',
            color: 'var(--foreground)'
          }}>
            Malgré tous ces avantages, l'intégration de l'IA dans la formation soulève aussi des questions 
            importantes :
          </p>

          <ul className="space-y-4 mb-8" style={{ color: 'var(--foreground)' }}>
            <li className="flex gap-3">
              <span className="text-primary-500 mt-1">•</span>
              <span><strong>Éthique et biais :</strong> Comment s'assurer que l'IA ne reproduit pas ou 
              n'amplifie pas les biais existants ?</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary-500 mt-1">•</span>
              <span><strong>Protection des données :</strong> Comment garantir la confidentialité des 
              données des apprenants ?</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary-500 mt-1">•</span>
              <span><strong>Formation des formateurs :</strong> Comment accompagner les professionnels 
              dans cette transition ?</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary-500 mt-1">•</span>
              <span><strong>Équilibre humain-machine :</strong> Où placer le curseur entre automatisation 
              et accompagnement humain ?</span>
            </li>
          </ul>

          <h2 style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-3xl)',
            fontWeight: 'var(--font-weight-semibold)',
            marginTop: 'var(--space-12)',
            marginBottom: 'var(--space-6)',
            color: 'var(--foreground)'
          }}>
            Conclusion
          </h2>

          <p style={{ 
            fontSize: 'var(--text-base)', 
            lineHeight: 'var(--leading-relaxed)',
            marginBottom: 'var(--space-6)',
            color: 'var(--foreground)'
          }}>
            L'IA n'est pas là pour remplacer les formateurs, mais pour les augmenter. Elle leur permet 
            de se concentrer sur ce qu'ils font de mieux : inspirer, motiver et accompagner humainement 
            leurs apprenants vers la réussite.
          </p>

          <p style={{ 
            fontSize: 'var(--text-base)', 
            lineHeight: 'var(--leading-relaxed)',
            marginBottom: 'var(--space-6)',
            color: 'var(--foreground)'
          }}>
            Les organisations qui sauront tirer parti de cette révolution technologique tout en gardant 
            l'humain au cœur de leur approche pédagogique seront celles qui réussiront dans le monde de 
            la formation de demain.
          </p>
        </div>

        {/* Social Share */}
        <div className="mt-16 pt-8 border-t border-border">
          <h3 className="mb-4" style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-weight-semibold)'
          }}>
            Partager cet article
          </h3>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => shareOnSocial('twitter')}
              className="hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2]"
            >
              <Twitter className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => shareOnSocial('linkedin')}
              className="hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]"
            >
              <Linkedin className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => shareOnSocial('facebook')}
              className="hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]"
            >
              <Facebook className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={copyLink}
              className="hover:bg-neutral-100"
            >
              <Link2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 p-8 text-center" style={{ 
          background: 'var(--gradient-primary)',
          borderRadius: 'var(--radius-2xl)',
          color: 'white'
        }}>
          <h3 className="mb-4" style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-weight-bold)'
          }}>
            Envie de recevoir plus d'articles comme celui-ci ?
          </h3>
          <p className="mb-6 opacity-90" style={{ 
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)'
          }}>
            Abonnez-vous à notre newsletter hebdomadaire
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="votre@email.com"
              className="flex-1 px-4 py-3 rounded-lg text-foreground"
              style={{ fontFamily: 'var(--font-body)' }}
            />
            <Button className="bg-white text-primary hover:bg-white/90">
              S'abonner
            </Button>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="bg-neutral-50 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-center mb-12" style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-4xl)',
            fontWeight: 'var(--font-weight-bold)'
          }}>
            Articles Similaires
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600",
                author: "Phoenix Baker",
                date: "19 Jan 2025",
                title: "Maîtriser le Prompt Engineering"
              },
              {
                image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600",
                author: "Lana Steiner",
                date: "18 Jan 2025",
                title: "Collaboration augmentée par l'IA"
              },
              {
                image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600",
                author: "Alec Whitten",
                date: "17 Jan 2025",
                title: "Les outils IA incontournables"
              }
            ].map((article, index) => (
              <div
                key={index}
                className="bg-white overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                style={{ borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)' }}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <div className="text-sm mb-3" style={{ 
                    color: 'var(--neutral-600)',
                    fontFamily: 'var(--font-body)'
                  }}>
                    {article.author} • {article.date}
                  </div>
                  <h3 className="group-hover:text-primary transition-colors" style={{ 
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                    lineHeight: 'var(--leading-snug)'
                  }}>
                    {article.title}
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