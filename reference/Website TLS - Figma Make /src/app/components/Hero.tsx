import { Button } from "./ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[80vh] flex items-center pt-20 overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, var(--neutral-50) 0%, var(--background) 100%)'
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2355A1B4' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Blobs for Glassmorphism */}
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-20 animate-blob" style={{ backgroundColor: 'var(--primary-300)' }} />
      <div className="absolute top-40 right-20 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 animate-blob animation-delay-2000" style={{ backgroundColor: 'var(--secondary-300)' }} />
      <div className="absolute bottom-20 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-10 animate-blob animation-delay-4000" style={{ backgroundColor: 'var(--accent-300)' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-xl border rounded-full animate-fade-in" style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderColor: 'var(--border)'
          }}>
            <Sparkles style={{ color: 'var(--primary-500)' }} className="w-4 h-4" />
            <span style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)',
              letterSpacing: '0.05em'
            }}>
              FORMATION AUGMENTÉE PAR L'IA
            </span>
          </div>

          {/* Main Heading */}
          <h1 
            className="animate-fade-in-up"
            style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              lineHeight: 'var(--leading-tight)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
              animationDelay: '0.1s'
            }}
          >
            La formation augmentée par l'IA.
          </h1>
          
          {/* Subheading with Gradient */}
          <p 
            className="max-w-3xl mx-auto animate-fade-in-up"
            style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
              lineHeight: 'var(--leading-relaxed)',
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animationDelay: '0.2s'
            }}
          >
            Transformez vos formations en combinant l'intelligence artificielle et l'expertise humaine.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center pt-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Button 
              size="lg" 
              onClick={() => scrollToSection('contact')}
              className="group shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              style={{ 
                background: 'var(--gradient-primary)',
                color: 'var(--primary-foreground)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-weight-semibold)'
              }}
            >
              Réserver un RDV
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => scrollToSection('contact')}
              className="backdrop-blur-xl hover:shadow-lg transition-all duration-300"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                borderColor: 'var(--border)',
                color: 'var(--foreground)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              Nous contacter
            </Button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div style={{ 
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-3xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--primary-500)',
                marginBottom: 'var(--space-2)'
              }}>
                500+
              </div>
              <div style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--neutral-600)'
              }}>
                Formateurs
              </div>
            </div>
            <div className="text-center">
              <div style={{ 
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-3xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--primary-500)',
                marginBottom: 'var(--space-2)'
              }}>
                40h+
              </div>
              <div style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--neutral-600)'
              }}>
                De contenu
              </div>
            </div>
            <div className="text-center">
              <div style={{ 
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-3xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--primary-500)',
                marginBottom: 'var(--space-2)'
              }}>
                8
              </div>
              <div style={{ 
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--neutral-600)'
              }}>
                Parcours
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}