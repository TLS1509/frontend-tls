import { Linkedin, Mail, MapPin } from "lucide-react";
import { LogoHeaderBlue } from "./LogoHeaderBlue";

interface FooterProps {
  onNavigate: (page: string, sectionId?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (page: string, sectionId?: string) => {
    onNavigate(page, sectionId);
    // Scroll after navigation
    setTimeout(() => {
      const element = document.getElementById(page);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const handleNavigate = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ backgroundColor: 'var(--neutral-900)', color: 'var(--neutral-300)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Colonne 1 - Logo & Tagline */}
          <div>
            <div className="mb-3">
              <button 
                onClick={() => handleNavigate('home')}
                className="hover:opacity-80 transition-opacity inline-block"
              >
                <LogoHeaderBlue showText={true} isDark={true} />
              </button>
            </div>
            <p style={{ color: 'var(--neutral-400)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-body)' }}>
              Formation augmentée par l'IA
            </p>
          </div>

          {/* Colonne 2 - Navigation Principale */}
          <div>
            <h4 className="mb-3" style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('academie')}
                  className="hover:text-white transition-colors text-left"
                  style={{ color: 'var(--neutral-400)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-body)' }}
                >
                  Académie
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('agence')}
                  className="hover:text-white transition-colors text-left"
                  style={{ color: 'var(--neutral-400)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-body)' }}
                >
                  Agence
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('conseil')}
                  className="hover:text-white transition-colors text-left"
                  style={{ color: 'var(--neutral-400)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-body)' }}
                >
                  Conseil
                </button>
              </li>
            </ul>
          </div>

          {/* Colonne 3 - Ressources */}
          <div>
            <h4 className="mb-3" style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
              Ressources
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('tech')}
                  className="hover:text-white transition-colors text-left"
                  style={{ color: 'var(--neutral-400)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-body)' }}
                >
                  Tech
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('mag')}
                  className="hover:text-white transition-colors text-left"
                  style={{ color: 'var(--neutral-400)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-body)' }}
                >
                  Le Mag'
                </button>
              </li>
            </ul>
          </div>

          {/* Colonne 4 - Contact */}
          <div>
            <h4 className="mb-3" style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
              Contact
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:contact@thelearningsociety.fr" 
                  className="flex items-start gap-2 hover:text-white transition-colors group"
                  style={{ color: 'var(--neutral-400)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-body)' }}
                >
                  <Mail className="flex-shrink-0 mt-0.5" size={14} />
                  <span>contact@thelearningsociety.fr</span>
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2" style={{ color: 'var(--neutral-400)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-body)' }}>
                  <MapPin className="flex-shrink-0 mt-0.5" size={14} />
                  <span>Paris, France</span>
                </span>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/company/thelearningsociety"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 hover:text-white transition-colors group"
                  style={{ color: 'var(--neutral-400)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-body)' }}
                >
                  <Linkedin className="flex-shrink-0 mt-0.5" size={14} />
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-4 flex flex-col md:flex-row justify-between items-center gap-3" style={{ borderTop: `1px solid var(--neutral-800)`, fontSize: '0.625rem' }}>
          <p style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-body)' }}>
            © {currentYear} The Learning Society. Tous droits réservés.
          </p>
          <div className="flex gap-3">
            <button className="hover:text-white transition-colors" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-body)' }}>
              Mentions légales
            </button>
            <button className="hover:text-white transition-colors" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-body)' }}>
              CGV
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}