import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AnimatedCard, AnimatedText } from "./ui/animated-card";

export function Blog() {
  const articles = [
    {
      title: "IA et Formateurs : Déléguez la correction, gardez le coaching",
      image: "https://images.unsplash.com/photo-1743677077216-00a458eff9e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHJvYm90JTIwdGVhY2hlciUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NjA3OTE5NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Formation",
    },
    {
      title: "Votre assistant virtuel pour former en toute liberté",
      image: "https://images.unsplash.com/photo-1542601425-2e2fe376fe56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwYXNzaXN0YW50JTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjA2NzEzNzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "IA & Tech",
    },
    {
      title: "IA en Formation : L'Heure des Choix Stratégiques à Sannié !",
      image: "https://images.unsplash.com/photo-1716703432455-3045789de738?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN0cmF0ZWd5JTIwbWVldGluZ3xlbnwxfHx8fDE3NjA3NjM2NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "IA Actu",
      badge: "IA READY",
    },
  ];

  return (
    <section id="blog" className="py-20 lg:py-32" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-4xl)',
            fontWeight: 'var(--font-weight-bold)',
            lineHeight: 'var(--leading-tight)',
            color: 'var(--foreground)',
            marginBottom: 'var(--space-6)'
          }}>
            Nos derniers articles
          </h2>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              style={{ 
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xl)'
              }}
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {article.badge && (
                  <Badge className="absolute top-4 right-4 bg-primary text-white">
                    {article.badge}
                  </Badge>
                )}
              </div>
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2 bg-secondary/10 text-secondary">
                  {article.category}
                </Badge>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {article.title}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}