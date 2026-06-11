import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft, Linkedin, Twitter, Globe, Quote } from "lucide-react";

export default function ArticleInterviewPage() {
  const qAndA = [
    {
      q: "Vous êtes pionnière de l'IA appliquée à la pédagogie. Comment en êtes-vous arrivée là ?",
      a: "Mon parcours est assez atypique ! J'ai commencé comme enseignante de sciences, puis je me suis passionnée pour la technologie éducative. En 2018, j'ai découvert GPT-2 et j'ai immédiatement vu le potentiel pour révolutionner la création de contenu pédagogique. Depuis, je n'ai jamais arrêté d'explorer les possibilités."
    },
    {
      q: "Quelle est selon vous l'application la plus prometteuse de l'IA en formation ?",
      a: "Sans hésiter : la personnalisation à grande échelle. Traditionnellement, adapter un parcours de formation à chaque apprenant était impossible au-delà de quelques dizaines de personnes. Avec l'IA, on peut personnaliser pour des milliers d'apprenants simultanément, en temps réel, en fonction de leur niveau, leur rythme, leurs préférences d'apprentissage."
    },
    {
      q: "Beaucoup de formateurs craignent d'être remplacés par l'IA. Que leur répondez-vous ?",
      a: "Je leur dis que l'IA ne remplace pas les formateurs, elle les augmente. Tout comme la calculatrice n'a pas remplacé les mathématiciens mais les a libérés des calculs fastidieux, l'IA libère les formateurs des tâches répétitives pour qu'ils se concentrent sur l'humain : la motivation, l'inspiration, l'accompagnement individualisé."
    },
    {
      q: "Quels conseils donneriez-vous à une organisation qui souhaite démarrer avec l'IA ?",
      a: "Trois conseils essentiels : 1) Commencez petit mais commencez maintenant. Testez un cas d'usage simple. 2) Formez vos équipes, l'adoption ne se fera que si les gens comprennent et maîtrisent les outils. 3) Gardez toujours l'apprenant au centre. L'IA est un moyen, pas une fin en soi."
    },
    {
      q: "Comment voyez-vous l'évolution de la formation dans les 5 prochaines années ?",
      a: "Je pense que nous allons vers un modèle hybride sophistiqué où l'IA gère la logistique, l'adaptation et la correction, pendant que les humains se concentrent sur le mentorat, l'inspiration et le développement de compétences comportementales. Les formations seront ultra-personnalisées, disponibles 24/7, et beaucoup plus efficaces."
    }
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
        {/* Meta */}
        <div className="mb-8">
          <Badge className="mb-4 bg-secondary-50 text-secondary-700 border-secondary-200">Interview</Badge>
          <p className="text-sm" style={{ color: 'var(--neutral-600)', fontFamily: 'var(--font-body)' }}>
            18 Janvier 2025 • 12 min de lecture
          </p>
        </div>

        {/* Title */}
        <h1 className="mb-12" style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'var(--text-5xl)',
          fontWeight: 'var(--font-weight-bold)',
          lineHeight: 'var(--leading-tight)'
        }}>
          "L'IA libère les formateurs pour qu'ils se concentrent sur l'humain"
        </h1>

        {/* Guest Card */}
        <div className="mb-16 p-8 bg-gradient-to-br from-primary-50 to-primary-100" style={{ borderRadius: 'var(--radius-2xl)', border: '2px solid var(--primary-200)' }}>
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <img 
              src="https://i.pravatar.cc/200?img=5" 
              alt="Dr. Sarah Chen"
              className="w-32 h-32 rounded-2xl object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <h2 className="mb-2" style={{ 
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-3xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--primary-900)'
              }}>
                Dr. Sarah Chen
              </h2>
              <p className="mb-4" style={{ 
                fontSize: 'var(--text-lg)',
                color: 'var(--primary-700)',
                fontFamily: 'var(--font-body)'
              }}>
                Directrice de l'Innovation Pédagogique chez EdTech Global • Docteur en Sciences Cognitives
              </p>
              <p className="mb-6 text-sm" style={{ 
                lineHeight: 'var(--leading-relaxed)',
                color: 'var(--primary-800)',
                fontFamily: 'var(--font-body)'
              }}>
                Sarah est une pionnière de l'application de l'IA à la pédagogie. Avec plus de 15 ans d'expérience, 
                elle a formé plus de 10,000 professionnels et conseille des organisations Fortune 500 sur leur 
                transformation digitale de la formation.
              </p>
              <div className="flex gap-3">
                <Button size="sm" variant="outline" className="gap-2">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Twitter className="w-4 h-4" />
                  Twitter
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Globe className="w-4 h-4" />
                  Website
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Intro */}
        <div className="mb-12">
          <p style={{ 
            fontSize: 'var(--text-lg)', 
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--neutral-700)',
            fontFamily: 'var(--font-body)',
            fontStyle: 'italic'
          }}>
            Nous avons eu la chance de nous entretenir avec le Dr. Sarah Chen, figure emblématique de l'IA 
            appliquée à la formation. Dans cet échange franc et inspirant, elle partage sa vision de l'avenir 
            de la pédagogie et ses conseils pour réussir sa transformation digitale.
          </p>
        </div>

        {/* Q&A */}
        <div className="space-y-12 mb-16">
          {qAndA.map((item, index) => (
            <div key={index}>
              {/* Question */}
              <div className="mb-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0" style={{ 
                    fontFamily: 'var(--font-display)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--primary-700)',
                    fontSize: 'var(--text-lg)'
                  }}>
                    Q
                  </div>
                  <p style={{ 
                    fontSize: 'var(--text-lg)', 
                    lineHeight: 'var(--leading-relaxed)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--foreground)',
                    paddingTop: 'var(--space-2)'
                  }}>
                    {item.q}
                  </p>
                </div>
              </div>

              {/* Answer */}
              <div className="pl-16">
                <p style={{ 
                  fontSize: 'var(--text-base)', 
                  lineHeight: 'var(--leading-relaxed)',
                  color: 'var(--neutral-600)',
                  fontFamily: 'var(--font-body)'
                }}>
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Quote */}
        <div className="my-16 p-8 relative" style={{ 
          background: 'var(--gradient-secondary-soft)',
          borderRadius: 'var(--radius-2xl)',
          border: '2px solid var(--secondary-200)'
        }}>
          <Quote className="absolute top-6 left-6 w-12 h-12 text-secondary-300" />
          <blockquote className="pl-16">
            <p style={{ 
              fontSize: 'var(--text-2xl)', 
              lineHeight: 'var(--leading-relaxed)',
              color: 'var(--secondary-900)',
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--font-weight-semibold)',
              fontStyle: 'italic'
            }}>
              "L'IA ne remplace pas les formateurs, elle les augmente. Elle les libère des tâches répétitives 
              pour qu'ils se concentrent sur l'humain : la motivation, l'inspiration, l'accompagnement."
            </p>
            <footer className="mt-4 text-sm" style={{ color: 'var(--secondary-700)', fontFamily: 'var(--font-body)' }}>
              — Dr. Sarah Chen
            </footer>
          </blockquote>
        </div>

        {/* Closing */}
        <div className="mb-12">
          <h2 className="mb-4" style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-weight-semibold)'
          }}>
            En Conclusion
          </h2>
          <p style={{ 
            fontSize: 'var(--text-base)', 
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--neutral-600)',
            fontFamily: 'var(--font-body)',
            marginBottom: 'var(--space-6)'
          }}>
            Notre conversation avec Sarah nous rappelle que la technologie, aussi puissante soit-elle, 
            reste un outil au service d'une vision humaniste de la formation. Son message est clair : 
            embrassons l'IA tout en gardant l'humain au cœur de nos préoccupations.
          </p>
          <p style={{ 
            fontSize: 'var(--text-base)', 
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--neutral-600)',
            fontFamily: 'var(--font-body)'
          }}>
            Un grand merci à Sarah pour le temps qu'elle nous a accordé et pour son éclairage inspirant 
            sur l'avenir de notre secteur.
          </p>
        </div>

        {/* CTA */}
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
            Envie de découvrir plus d'interviews ?
          </h3>
          <p className="mb-6 opacity-90" style={{ fontFamily: 'var(--font-body)' }}>
            Abonnez-vous pour ne manquer aucune interview exclusive
          </p>
          <Button className="bg-white text-primary hover:bg-white/90">
            S'abonner à la newsletter
          </Button>
        </div>
      </article>

      {/* Related Interviews */}
      <section className="bg-neutral-50 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-center mb-12" style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-4xl)',
            fontWeight: 'var(--font-weight-bold)'
          }}>
            Autres Interviews
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Marc Dubois", role: "Chief Learning Officer", company: "TechCorp" },
              { name: "Julie Martin", role: "Formatrice IA", company: "LearnLab" },
              { name: "Thomas Bernard", role: "CEO", company: "SkillsAI" }
            ].map((guest, i) => (
              <div
                key={i}
                className="bg-white overflow-hidden hover:shadow-xl transition-all cursor-pointer group p-6"
                style={{ borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)' }}
              >
                <img 
                  src={`https://i.pravatar.cc/200?img=${i + 10}`}
                  alt={guest.name}
                  className="w-24 h-24 rounded-xl object-cover mb-4"
                />
                <h3 className="mb-1 group-hover:text-primary transition-colors" style={{ 
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-weight-semibold)'
                }}>
                  {guest.name}
                </h3>
                <p className="text-sm mb-2" style={{ color: 'var(--neutral-600)', fontFamily: 'var(--font-body)' }}>
                  {guest.role}
                </p>
                <p className="text-xs" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-body)' }}>
                  {guest.company}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
