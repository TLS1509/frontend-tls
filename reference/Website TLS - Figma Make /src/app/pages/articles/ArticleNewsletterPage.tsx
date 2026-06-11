import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft, Mail, ExternalLink, Calendar } from "lucide-react";
import { useState } from "react";

export default function ArticleNewsletterPage() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Merci pour votre inscription !");
    setEmail("");
  };

  const resources = [
    { title: "Checklist : Déployer l'IA en formation", type: "PDF", link: "#" },
    { title: "Template de prompts pédagogiques", type: "DOCX", link: "#" },
    { title: "Webinar : IA & Pédagogie (replay)", type: "VIDEO", link: "#" }
  ];

  const previousEditions = [
    { number: "#23", date: "8 Jan 2025", title: "L'année de l'IA responsable" },
    { number: "#22", date: "18 Déc 2024", title: "Rétrospective 2024" },
    { number: "#21", date: "4 Déc 2024", title: "Micro-learning nouvelle génération" }
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

      <article className="max-w-4xl mx-auto px-8 py-16">
        {/* Newsletter Header */}
        <div className="text-center mb-12 pb-12 border-b border-border">
          <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-primary-600" />
          </div>
          <Badge className="mb-4 bg-primary-50 text-primary-700 border-primary-200">Newsletter #24</Badge>
          <h1 className="mb-4" style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'var(--text-5xl)',
            fontWeight: 'var(--font-weight-bold)',
            lineHeight: 'var(--leading-tight)'
          }}>
            TLS Insights — Janvier 2025
          </h1>
          <p className="text-lg mb-6" style={{ 
            color: 'var(--neutral-600)',
            fontFamily: 'var(--font-body)'
          }}>
            Les dernières actualités, tendances et outils pour les professionnels de la formation
          </p>
          <div className="flex items-center justify-center gap-4 text-sm" style={{ color: 'var(--neutral-600)' }}>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>15 Janvier 2025</span>
            </div>
            <span>•</span>
            <span>Édition #24</span>
            <span>•</span>
            <span>5 min de lecture</span>
          </div>
        </div>

        {/* Intro */}
        <div className="mb-12">
          <p style={{ 
            fontSize: 'var(--text-lg)', 
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--neutral-700)',
            fontFamily: 'var(--font-body)',
            marginBottom: 'var(--space-6)'
          }}>
            👋 Bonjour à tous,
          </p>
          <p style={{ 
            fontSize: 'var(--text-base)', 
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--neutral-600)',
            fontFamily: 'var(--font-body)'
          }}>
            Bienvenue dans cette nouvelle édition de TLS Insights ! Ce mois-ci, nous explorons les tendances 
            qui vont marquer 2025, partageons nos meilleurs outils et vous proposons des ressources 
            exclusives pour booster vos projets de formation.
          </p>
        </div>

        {/* Section 1 */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center text-primary-700" style={{ 
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--font-weight-bold)'
            }}>
              1
            </div>
            <h2 style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--font-weight-semibold)'
            }}>
              🎯 À la Une
            </h2>
          </div>
          
          <div className="p-6 mb-6" style={{ 
            background: 'var(--gradient-primary-soft)',
            borderRadius: 'var(--radius-xl)',
            border: '2px solid var(--primary-200)'
          }}>
            <h3 className="mb-3" style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--primary-800)'
            }}>
              Notre rapport annuel 2025 est disponible !
            </h3>
            <p className="mb-4" style={{ 
              fontSize: 'var(--text-base)', 
              lineHeight: 'var(--leading-relaxed)',
              color: 'var(--primary-700)',
              fontFamily: 'var(--font-body)'
            }}>
              48 pages d'analyses exclusives sur l'état de l'IA dans la formation professionnelle, 
              avec des données de 500+ entreprises et des projections pour les 3 prochaines années.
            </p>
            <Button className="bg-primary hover:bg-primary-hover">
              Télécharger le rapport
              <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <p style={{ 
            fontSize: 'var(--text-base)', 
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--neutral-600)',
            fontFamily: 'var(--font-body)'
          }}>
            Les résultats sont clairs : 70% des organisations prévoient d'augmenter leurs investissements 
            en IA pour la formation cette année. Les cas d'usage se multiplient et les ROI sont au rendez-vous.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-secondary-100 flex items-center justify-center text-secondary-700" style={{ 
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--font-weight-bold)'
            }}>
              2
            </div>
            <h2 style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--font-weight-semibold)'
            }}>
              🚀 Nouveautés & Tendances
            </h2>
          </div>

          <ul className="space-y-4">
            {[
              {
                title: "GPT-4 Turbo amélioré",
                desc: "OpenAI a déployé une mise à jour majeure qui réduit les hallucinations de 40%. Parfait pour la génération de contenu pédagogique !"
              },
              {
                title: "Boom du micro-learning",
                desc: "Les capsules de formation de 3-5 minutes génèrent 2x plus d'engagement que les modules longs. L'IA facilite leur création."
              },
              {
                title: "Personnalisation à grande échelle",
                desc: "De nouveaux outils permettent d'adapter automatiquement le contenu au niveau et au rythme de chaque apprenant."
              }
            ].map((item, index) => (
              <li key={index} className="flex gap-4 p-4 hover:bg-neutral-50 transition-colors" style={{ borderRadius: 'var(--radius-lg)' }}>
                <span className="text-2xl flex-shrink-0">•</span>
                <div>
                  <h3 className="mb-1" style={{ 
                    fontFamily: 'var(--font-body)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--foreground)'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{ 
                    fontSize: 'var(--text-sm)', 
                    lineHeight: 'var(--leading-relaxed)',
                    color: 'var(--neutral-600)',
                    fontFamily: 'var(--font-body)'
                  }}>
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 3 - Resources */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center text-accent-700" style={{ 
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--font-weight-bold)'
            }}>
              3
            </div>
            <h2 style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--font-weight-semibold)'
            }}>
              📚 Ressources du Mois
            </h2>
          </div>

          <div className="space-y-3">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors group cursor-pointer"
                style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center text-xs" style={{ 
                    fontFamily: 'var(--font-display)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--accent-700)'
                  }}>
                    {resource.type}
                  </div>
                  <span style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-medium)' }}>
                    {resource.title}
                  </span>
                </div>
                <ExternalLink className="w-5 h-5 text-neutral-400 group-hover:text-primary transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Section 4 - Quick Tips */}
        <div className="mb-12 p-8" style={{ 
          background: 'var(--gradient-accent-soft)',
          borderRadius: 'var(--radius-2xl)',
          border: '2px solid var(--accent-200)'
        }}>
          <h2 className="mb-4" style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--accent-800)'
          }}>
            💡 Conseil de la Semaine
          </h2>
          <p style={{ 
            fontSize: 'var(--text-base)', 
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--accent-900)',
            fontFamily: 'var(--font-body)'
          }}>
            <strong>Testez la technique du "few-shot prompting"</strong> : au lieu de donner une seule instruction, 
            montrez 2-3 exemples à l'IA avant de lui demander de générer du contenu. Les résultats sont beaucoup 
            plus cohérents et alignés avec vos attentes !
          </p>
        </div>

        {/* Closing */}
        <div className="mb-12">
          <p style={{ 
            fontSize: 'var(--text-base)', 
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--neutral-600)',
            fontFamily: 'var(--font-body)',
            marginBottom: 'var(--space-4)'
          }}>
            C'est tout pour cette édition ! N'hésitez pas à nous faire part de vos retours et suggestions 
            pour les prochaines newsletters.
          </p>
          <p style={{ 
            fontSize: 'var(--text-base)', 
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--neutral-600)',
            fontFamily: 'var(--font-body)'
          }}>
            À très bientôt,<br />
            <strong>L'équipe The Learning Society</strong>
          </p>
        </div>

        {/* Subscribe CTA */}
        <div className="p-8 text-center" style={{ 
          background: 'var(--gradient-primary)',
          borderRadius: 'var(--radius-2xl)',
          color: 'white'
        }}>
          <h3 className="mb-4" style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-weight-bold)'
          }}>
            Pas encore abonné(e) ?
          </h3>
          <p className="mb-6 opacity-90" style={{ fontFamily: 'var(--font-body)' }}>
            Recevez TLS Insights directement dans votre boîte mail tous les 15 jours
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              className="flex-1 px-4 py-3 rounded-lg text-foreground"
              style={{ fontFamily: 'var(--font-body)' }}
            />
            <Button type="submit" className="bg-white text-primary hover:bg-white/90">
              S'abonner
            </Button>
          </form>
        </div>
      </article>

      {/* Previous Editions */}
      <section className="bg-neutral-50 py-20">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-center mb-12" style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-4xl)',
            fontWeight: 'var(--font-weight-bold)'
          }}>
            Éditions Précédentes
          </h2>
          <div className="space-y-4">
            {previousEditions.map((edition, index) => (
              <div
                key={index}
                className="bg-white p-6 flex items-center justify-between hover:shadow-lg transition-all cursor-pointer group"
                style={{ borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center" style={{ 
                    fontFamily: 'var(--font-display)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--primary-700)'
                  }}>
                    {edition.number}
                  </div>
                  <div>
                    <h3 className="mb-1 group-hover:text-primary transition-colors" style={{ 
                      fontFamily: 'var(--font-display)',
                      fontWeight: 'var(--font-weight-semibold)'
                    }}>
                      {edition.title}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-body)' }}>
                      {edition.date}
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-neutral-400 group-hover:text-primary transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
