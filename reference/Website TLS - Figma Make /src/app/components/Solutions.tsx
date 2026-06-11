import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { GraduationCap, Target } from "lucide-react";
import { AnimatedCard, AnimatedText, AnimatedIcon } from "./ui/animated-card";

export function Solutions() {
  const solutions = [
    {
      icon: GraduationCap,
      category: "Formation Formateur Augmenté",
      title: "Notre Parcours.",
      description: "Maîtrisez l'intégration de l'IA dans vos pratiques pédagogiques avec notre programme structuré.",
      buttonText: "Découvrir la formation",
      color: "primary",
    },
    {
      icon: Target,
      category: "Accompagnement sur Mesure",
      title: "Stratégie & Conception",
      description: "Des experts pour co-construire vos solutions de formation personnalisées, adaptées à vos enjeux.",
      buttonText: "Découvrir nos offres",
      color: "secondary",
    },
  ];

  return (
    <section id="solutions" className="py-20 lg:py-32" style={{ backgroundColor: 'var(--neutral-50)' }}>
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
            Nos solutions
          </h2>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {solutions.map((solution, index) => (
            <AnimatedCard 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300"
              style={{ 
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xl)'
              }}
            >
              <CardHeader className="space-y-4">
                <Badge 
                  variant="secondary" 
                  className={`w-fit ${index === 0 ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'bg-secondary/10 text-secondary hover:bg-secondary/20'}`}
                >
                  {solution.category}
                </Badge>
                <CardTitle className="text-3xl">{solution.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {solution.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className={`w-full ${index === 1 ? 'bg-secondary hover:bg-secondary/90' : ''}`}
                >
                  {solution.buttonText}
                </Button>
              </CardContent>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}