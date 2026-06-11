import { Button } from "./ui/button";

export function CTA() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 lg:py-32" style={{ backgroundColor: 'var(--neutral-50)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-4xl)',
            fontWeight: 'var(--font-weight-bold)',
            lineHeight: 'var(--leading-tight)',
            color: 'var(--foreground)'
          }}>
            Prêt à transformer votre approche de la formation et de l'apprentissage ?
          </h2>
          
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button size="lg" onClick={() => scrollToSection('contact')}>
              Réserver un RDV
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection('contact')}>
              Nous contacter
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}