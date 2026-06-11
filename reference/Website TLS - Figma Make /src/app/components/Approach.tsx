import { UserCircle, Users, Lightbulb } from "lucide-react";

export function Approach() {
  const approaches = [
    {
      icon: UserCircle,
      title: "Parcours Personnalisés",
      description: "Exploitez le potentiel de l'IA pour concevoir des formations et des stratégies de développement parfaitement adaptées à vos besoins.",
      color: "var(--primary-500)",
      bgColor: "var(--primary-50)",
    },
    {
      icon: Users,
      title: "Section d'Experts",
      description: "Bénéficiez du savoir-faire de nos formateurs et consultants pour une mise en œuvre fluide et efficace.",
      color: "var(--secondary-500)",
      bgColor: "var(--secondary-50)",
    },
    {
      icon: Lightbulb,
      title: "Savoir-faire et Innovation",
      description: "Accédez à une expertise de pointe et à des contenus pertinents pour rester à l'avant-garde de la formation.",
      color: "var(--accent-500)",
      bgColor: "var(--accent-50)",
    },
  ];

  return (
    <section id="approach" className="py-20 lg:py-32" style={{ backgroundColor: 'var(--background)' }}>
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
            Un accompagnement qui combine l'IA et l'humain.
          </h2>
        </div>

        {/* Approaches Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {approaches.map((approach, index) => (
            <div 
              key={index} 
              className="text-center space-y-4 group"
            >
              {/* Icon Container with Glassmorphism */}
              <div 
                className="w-16 h-16 mx-auto flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                style={{ 
                  backgroundColor: approach.bgColor,
                  borderRadius: 'var(--radius-2xl)',
                  border: `2px solid ${approach.color}20`,
                }}
              >
                <approach.icon 
                  size={32} 
                  style={{ color: approach.color }}
                  className="transition-transform duration-300 group-hover:rotate-6"
                />
              </div>

              {/* Title */}
              <h3 style={{ 
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)',
                lineHeight: 'var(--leading-snug)'
              }}>
                {approach.title}
              </h3>

              {/* Description */}
              <p style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                lineHeight: 'var(--leading-relaxed)',
                color: 'var(--foreground)'
              }}>
                {approach.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}