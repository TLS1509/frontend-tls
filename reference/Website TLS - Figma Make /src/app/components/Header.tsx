import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { LogoHeaderBlue } from "./LogoHeaderBlue";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'academie', label: 'ACADÉMIE' },
    { id: 'agence', label: 'AGENCE' },
    { id: 'conseil', label: 'CONSEIL' },
    { id: 'tech', label: 'TECH' },
    { id: 'mag', label: "MAG'" },
    { id: 'home-v2', label: 'HOME V2', badge: 'TEST' },
  ];

  const handleNavigation = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header className="w-full bg-white" style={{ borderBottom: `1px solid var(--border)` }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={() => handleNavigation('home')}
            className="hover:opacity-80 transition-opacity"
          >
            <LogoHeaderBlue showText={true} isDark={false} />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`px-4 py-2 uppercase tracking-wide transition-colors flex items-center gap-2 ${
                  currentPage === item.id
                    ? 'text-primary'
                    : 'hover:text-primary'
                }`}
                style={{ 
                  fontFamily: 'var(--font-body)',
                  color: currentPage === item.id ? 'var(--primary)' : 'var(--neutral-700)'
                }}
              >
                {item.label}
                {item.badge && (
                  <Badge 
                    className="text-xs px-1.5 py-0.5"
                    style={{ 
                      backgroundColor: 'var(--accent)',
                      color: 'var(--accent-foreground)',
                      fontWeight: 600
                    }}
                  >
                    {item.badge}
                  </Badge>
                )}
              </button>
            ))}
            
            <Button 
              onClick={() => handleNavigation('home')}
              className="ml-2"
              style={{ 
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
              }}
            >
              Nous contacter
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:text-primary transition-colors"
            style={{ color: 'var(--neutral-700)' }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4" style={{ borderTop: `1px solid var(--border)` }}>
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`px-4 py-3 text-left uppercase tracking-wide transition-colors flex items-center gap-2 ${
                    currentPage === item.id
                      ? 'text-primary'
                      : 'hover:text-primary'
                  }`}
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    color: currentPage === item.id ? 'var(--primary)' : 'var(--neutral-700)',
                    backgroundColor: currentPage === item.id ? 'var(--primary-50)' : 'transparent'
                  }}
                >
                  {item.label}
                  {item.badge && (
                    <Badge 
                      className="text-xs px-1.5 py-0.5"
                      style={{ 
                        backgroundColor: 'var(--accent)',
                        color: 'var(--accent-foreground)',
                        fontWeight: 600
                      }}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </button>
              ))}
              <Button 
                onClick={() => handleNavigation('home')}
                className="mt-2 w-full"
                style={{ 
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                }}
              >
                Nous contacter
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}