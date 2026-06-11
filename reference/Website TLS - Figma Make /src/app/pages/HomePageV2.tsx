// Variante Home pour test UX/UI & messaging (v2)
// Objectif : clarifier positionnement entreprises, améliorer conversion, accessibilité
// Structure : Learn → Do → Match | Académie + Studio + Conseil

import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { GraduationCap, Briefcase, Compass, ArrowRight, Target, Zap, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { SEO, generateOrganizationSchema } from "../components/SEO";
import { useEffect, useState } from "react";

interface HomePageV2Props {
  onNavigate?: (page: string, sectionId?: string) => void;
}

export default function HomePageV2({ onNavigate }: HomePageV2Props) {
  
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Détection prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigate = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  // Logos clients (à remplacer par vos vrais logos)
  const clientLogos = [
    { name: "Client A", logo: "https://via.placeholder.com/120x60/cccccc/666666?text=Client+A" },
    { name: "Client B", logo: "https://via.placeholder.com/120x60/cccccc/666666?text=Client+B" },
    { name: "Client C", logo: "https://via.placeholder.com/120x60/cccccc/666666?text=Client+C" },
    { name: "Client D", logo: "https://via.placeholder.com/120x60/cccccc/666666?text=Client+D" },
  ];

  const solutions = [
    {
      tag: "ACADÉMIE",
      icon: GraduationCap,
      title: "Se Former",
      description: "Maîtrisez l'IA pédagogique en autonomie ou coaché.",
      timeline: "Pour devenir autonome",
      link: "academie",
      poleColor: "primary", // 🔵 Bleu foncé = Académie
      bgColor: "var(--primary-50)",
      textColor: "var(--primary-700)",
      borderColor: "var(--primary-200)"
    },
    {
      tag: "STUDIO",
      icon: Briefcase,
      title: "Produire & Former",
      description: "Upskilling d'équipe et Studio de production assisté par IA.",
      timeline: "Pour produire vite (2–4 semaines)",
      link: "agence",
      poleColor: "secondary", // 🟠 Orange = Agence
      bgColor: "var(--secondary-50)",
      textColor: "var(--secondary-700)",
      borderColor: "var(--secondary-200)"
    },
    {
      tag: "CONSEIL",
      icon: Compass,
      title: "Transformer",
      description: "Audit, Conformité Qualiopi et Stratégie de déploiement.",
      timeline: "Pour structurer (3–6 mois)",
      link: "conseil",
      poleColor: "accent", // 🟡 Jaune = Conseil
      bgColor: "var(--accent-50)",
      textColor: "var(--accent-700)",
      borderColor: "var(--accent-200)"
    }
  ];

  const results = [
    {
      icon: Target,
      title: "Un diagnostic clair",
      description: "État des lieux de votre maturité IA et opportunités identifiées."
    },
    {
      icon: Zap,
      title: "Des assets & workflows prêts",
      description: "Templates, prompts et processus opérationnels clés en main."
    },
    {
      icon: TrendingUp,
      title: "Une feuille de route mesurable",
      description: "Indicateurs d'impact, jalons et plan d'action structuré."
    }
  ];

  const blogPosts = [
    {
      image: "https://images.unsplash.com/photo-1765806464581-812b097d0687?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMHRlY2hub2xvZ3klMjBidXNpbmVzc3xlbnwxfHx8fDE3NjU5ODI0ODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      tag: "Tuto",
      title: "Maîtriser le Prompt Engineering",
      excerpt: "L'art de parler aux IA pour obtenir des résultats pédagogiques parfaitement adaptés.",
      link: "mag"
    },
    {
      image: "https://images.unsplash.com/photo-1759884247289-f9f3db44988e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFybmluZyUyMGNvbGxhYm9yYXRpb24lMjB0ZWFtfGVufDF8fHx8MTc2NTk4MjQ4M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      tag: "Réflexion",
      title: "Collaboration augmentée par l'IA",
      excerpt: "Comment les équipes L&D utilisent l'IA pour produire plus vite et mieux.",
      link: "mag"
    },
    {
      image: "https://images.unsplash.com/photo-1762329388386-22bf162a9368?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwZWR1Y2F0aW9uJTIwdG9vbHN8ZW58MXx8fHwxNzY1OTgyNDg0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      tag: "Tendance",
      title: "Les outils IA incontournables",
      excerpt: "Notre sélection des meilleurs outils d'IA pour les formateurs en 2026.",
      link: "mag"
    }
  ];

  return (
    <div className="bg-background">
      {/* SEO Meta Tags - V2 optimisé */}
      <SEO
        title="Intégrer l'IA en formation : Académie, Studio & Conseil | The Learning Society"
        description="Learn → Do → Match : montez en compétence IA, produisez plus vite, déployez à l'échelle. Formation, production et conseil pour transformer vos pratiques L&D avec l'intelligence artificielle."
        keywords="formation IA, intelligence artificielle formation, L&D transformation, studio production IA, conseil IA, Learning & Development, formateur augmenté, IA pédagogique, upskilling IA, automatisation formation"
        ogType="website"
        ogUrl="https://thelearningsociety.fr/"
        structuredData={generateOrganizationSchema()}
      />
      
      {/* 1. HERO SECTION - V2 avec CTA business prioritaire */}
      <section className="relative overflow-hidden">
        {/* Background avec gradients légers - unifié pour hero et logos */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F0F9FB] via-white to-[#FEF8F1]" />
        
        {/* Effets décoratifs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-[#55A1B4]/10 via-[#55A1B4]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-[#F8B044]/10 via-[#F8B044]/5 to-transparent rounded-full translate-y-1/2 -translate-x-1/4" />
        
        {/* Motif subtil */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEuNSIgZmlsbD0iIzU1QTFCNCIgb3BhY2l0eT0iMC4wNSIvPjwvZz48L3N2Zz4=')] opacity-30" />
        
        {/* HERO CONTENT */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* H1 refonte V2 - positionnement élargi */}
            <h1 className="mb-6" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: '1.1' }}>
              L'IA ne remplacera pas les équipes L&D. <br />
              <span className="bg-gradient-to-r from-[#55A1B4] via-[#EB7724] to-[#F8B044] bg-clip-text text-transparent">
                Celles qui la maîtrisent, oui.
              </span>
            </h1>
            
            {/* Sous-titre V2 - mécanisme + résultat */}
            <h2 className="mb-12 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-body)', color: 'var(--foreground)', fontSize: 'clamp(1.125rem, 2vw, 1.375rem)' }}>
              <strong>Learn → Do → Match</strong> : montez en compétence, produisez plus vite, déployez à l'échelle.
            </h2>
            
            {/* CTA V2 - Business first */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* CTA Primaire - Business (audit) */}
              <Button 
                size="lg"
                onClick={() => handleNavigate('conseil')}
                className="shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto group relative overflow-hidden"
                style={{ 
                  backgroundColor: 'var(--secondary)',
                  color: 'var(--secondary-foreground)',
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#D87530] via-[#ED843A] to-[#F5934A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center">
                  <Compass className="mr-2 h-5 w-5" />
                  Réserver un audit (30 min)
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
              
              {/* CTA Secondaire - Découvrir offres */}
              <Button 
                variant="outline"
                size="lg"
                onClick={() => scrollToSection('solutions')}
                className="border-2 hover:border-[#55A1B4] hover:text-[#55A1B4] hover:bg-transparent backdrop-blur-sm w-full sm:w-auto group shadow-sm transition-all duration-300"
              >
                <Briefcase className="mr-2 h-5 w-5 group-hover:text-[#55A1B4] transition-colors" />
                Voir les offres
                <ArrowRight className="ml-2 h-4 w-4 group-hover:text-[#55A1B4] group-hover:translate-x-1 transition-all" />
              </Button>
            </div>

            {/* CTA Tertiaire - Formation (moins prioritaire) */}
            <div className="mt-4">
              <button
                onClick={() => handleNavigate('academie')}
                className="text-[#55A1B4] hover:text-[#4A8FA1] underline underline-offset-4 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#55A1B4] focus:ring-offset-2 rounded px-2 py-1"
                style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem' }}
              >
                Je veux me former individuellement →
              </button>
            </div>
          </div>
        </div>

        {/* 2. LOGOS CLIENTS - V2 avec prefers-reduced-motion */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="text-center mb-12">
            <h3 className="mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
              Ils nous font confiance
            </h3>
            <p className="text-sm" style={{ fontFamily: 'var(--font-body)', color: 'var(--neutral-600)' }}>
              Partenaires & clients
            </p>
            <div className="w-20 h-0.5 bg-gradient-to-r from-[#55A1B4] to-[#F8B044] mx-auto mt-3" />
          </div>
          
          {/* Container avec animation de défilement infini ou statique selon préférence */}
          <div className="relative">
            {/* Gradient fade sur les bords */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F0F9FB] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FEF8F1] to-transparent z-10" />
            
            {/* Animation wrapper */}
            <div className="overflow-hidden">
              <div className={`flex gap-12 ${!prefersReducedMotion ? 'animate-scroll-v2' : ''}`}>
                {/* Première série de logos */}
                {clientLogos.map((client, index) => (
                  <div 
                    key={`first-${index}`}
                    className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100 cursor-pointer"
                    style={{ minWidth: '180px' }}
                  >
                    <img 
                      src={client.logo} 
                      alt={client.name}
                      className="h-16 object-contain mx-auto"
                    />
                  </div>
                ))}
                {/* Duplication pour l'effet infini */}
                {!prefersReducedMotion && clientLogos.map((client, index) => (
                  <div 
                    key={`second-${index}`}
                    className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100 cursor-pointer"
                    style={{ minWidth: '180px' }}
                  >
                    <img 
                      src={client.logo} 
                      alt={client.name}
                      className="h-16 object-contain mx-auto"
                    />
                  </div>
                ))}
                {/* Troisième duplication pour assurer la continuité */}
                {!prefersReducedMotion && clientLogos.map((client, index) => (
                  <div 
                    key={`third-${index}`}
                    className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100 cursor-pointer"
                    style={{ minWidth: '180px' }}
                  >
                    <img 
                      src={client.logo} 
                      alt={client.name}
                      className="h-16 object-contain mx-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* CSS pour l'animation V2 - durée plus longue (40s au lieu de 30s) */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scroll-v2 {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }
          
          .animate-scroll-v2 {
            animation: scroll-v2 40s linear infinite;
          }
          
          .animate-scroll-v2:hover {
            animation-play-state: paused;
          }
        `}} />
      </section>

      {/* 3. SECTION "NOS SOLUTIONS" - V2 avec timeline + accessibilité */}
      <section id="solutions" className="relative py-12 md:py-16 scroll-mt-20 overflow-hidden">
        {/* Background dégradé subtil */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F0F9FB]/30 to-white" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.1' }}>
              Un écosystème complet pour chaque besoin
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#55A1B4] via-[#EB7724] to-[#F8B044] mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Cards avec timeline et accessibilité améliorée */}
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              const gradients = [
                'from-[#55A1B4] via-[#4A9AAD] to-[#3E8FA6]',
                'from-[#EB7724] via-[#E56B1E] to-[#D95F18]',
                'from-[#F8B044] via-[#F5A535] to-[#F29A26]'
              ];
              
              return (
                <a
                  key={index}
                  href={`#${solution.link}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate(solution.link);
                  }}
                  className="group cursor-pointer relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-offset-4 focus:ring-[#55A1B4]/50 focus:-translate-y-3"
                  aria-label={`Découvrir ${solution.title} - ${solution.description}`}
                >
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-90 group-hover:opacity-100 transition-opacity`} />
                  
                  {/* Effet brillant au hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  
                  {/* Cercles décoratifs */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/2" />
                  
                  <div className="relative p-8 lg:p-10 text-white min-h-[400px] flex flex-col">
                    <div className="mb-6">
                      <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 mb-6 text-xs">
                        {solution.tag}
                      </Badge>
                      <Icon className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="text-white mb-3" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}>
                        {solution.title}
                      </h3>
                    </div>
                    
                    <p className="text-white/90 mb-4 flex-grow" style={{ fontFamily: 'var(--font-body)' }}>
                      {solution.description}
                    </p>
                    
                    {/* Timeline V2 */}
                    <p className="text-white/70 text-sm mb-6 italic" style={{ fontFamily: 'var(--font-body)' }}>
                      {solution.timeline}
                    </p>
                    
                    <div className="flex items-center text-white group-hover:gap-2 transition-all">
                      <span style={{ fontFamily: 'var(--font-body)' }}>En savoir plus</span>
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. NOUVEAU BLOC "CE QUE VOUS OBTENEZ" */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        {/* Background subtil */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FFF9EE]/30 to-white" />
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 text-xs uppercase tracking-wider" style={{ 
              backgroundColor: 'var(--accent)', 
              color: 'var(--accent-foreground)' 
            }}>
              Résultats concrets
            </Badge>
            <h2 className="mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1.1' }}>
              Ce que vous obtenez
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {results.map((result, index) => {
              const Icon = result.icon;
              return (
                <Card 
                  key={index}
                  className="border-2 hover:border-[#F8B044]/50 transition-all duration-300 hover:shadow-lg"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F8B044] to-[#EB7724] flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="mb-3" style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>
                      {result.title}
                    </h3>
                    <p className="text-sm" style={{ fontFamily: 'var(--font-body)', color: 'var(--neutral-600)' }}>
                      {result.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Button 
              size="lg"
              variant="outline"
              onClick={() => handleNavigate('conseil')}
              className="border-2 border-[#F8B044] text-[#F8B044] hover:bg-[#F8B044] hover:text-white group transition-all duration-300"
            >
              Demander un audit
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* 5. SECTION "NOTRE ADN" - V2 avec bullets concrets */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        {/* Gradient overlay principal - bleu foncé */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3E8FA6] via-[#327A8C] to-[#266572]" />
        
        {/* Cercles décoratifs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F8B044]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        
        {/* Motif subtil */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEuNSIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC4wNSIvPjwvZz48L3N2Zz4=')] opacity-30" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 mb-6 text-xs uppercase tracking-wider">
            Notre ADN
          </Badge>
          
          <h2 className="text-white mb-6" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1.2' }}>
            L'alliance de la Méthode et de la Tech
          </h2>
          
          <p className="text-white/90 max-w-2xl mx-auto mb-8" style={{ fontFamily: 'var(--font-body)', fontSize: '1.125rem' }}>
            Nous ne sommes pas juste des formateurs.
          </p>

          {/* Bullets concrets V2 */}
          <div className="max-w-2xl mx-auto space-y-4 mb-10 text-left">
            <div className="flex items-start gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="w-2 h-2 bg-[#F8B044] rounded-full mt-2 flex-shrink-0" />
              <p className="text-white/95" style={{ fontFamily: 'var(--font-body)' }}>
                <strong>Méthode :</strong> Diagnostic → Co-construction → Déploiement
              </p>
            </div>
            <div className="flex items-start gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="w-2 h-2 bg-[#F8B044] rounded-full mt-2 flex-shrink-0" />
              <p className="text-white/95" style={{ fontFamily: 'var(--font-body)' }}>
                <strong>Tech :</strong> automatisations, agents, outillage propriétaire
              </p>
            </div>
            <div className="flex items-start gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="w-2 h-2 bg-[#F8B044] rounded-full mt-2 flex-shrink-0" />
              <p className="text-white/95" style={{ fontFamily: 'var(--font-body)' }}>
                <strong>Mesure :</strong> indicateurs d'impact, qualité, conformité
              </p>
            </div>
          </div>
          
          <Button 
            size="lg"
            className="bg-white text-[#3E8FA6] hover:bg-white/90 shadow-2xl group px-8 focus:ring-4 focus:ring-white/30"
            onClick={() => handleNavigate('tech')}
          >
            Découvrir la méthode
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* 6. SECTION "LE MAG'" (BLOG) - V2 avec liens accessibles */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        {/* Background avec gradient subtil */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F0F9FB]/20 to-white" />
        
        {/* Cercles décoratifs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#55A1B4]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#F8B044]/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 text-xs uppercase tracking-wider" style={{ 
              backgroundColor: 'var(--primary)', 
              color: 'var(--primary-foreground)' 
            }}>
              Ressources
            </Badge>
            <h2 className="mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: '1.1' }}>
              Le Mag'
            </h2>
            <p className="max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)', fontSize: '1.125rem', color: 'var(--neutral-600)' }}>
              Veille, réflexions et actualités sur l'IA en formation.
            </p>
          </div>

          {/* Layout Bento asymétrique avec accessibilité */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Article Featured - Grande card à gauche */}
            <a 
              href="#mag"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('mag');
              }}
              className="md:row-span-2 group cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#55A1B4]/50 rounded-2xl"
              aria-label={`Lire l'article : ${blogPosts[0].title}`}
            >
              <Card className="overflow-hidden h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-[#55A1B4]/30">
                <div className="relative aspect-[4/3] md:aspect-auto md:h-[400px] overflow-hidden">
                  <ImageWithFallback 
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Badge flottant */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[#55A1B4] text-white border-0 shadow-lg">
                      {blogPosts[0].tag}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-8">
                  <h3 
                    className="mb-4 group-hover:text-[#55A1B4] transition-colors duration-300" 
                    style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', lineHeight: '1.2' }}
                  >
                    {blogPosts[0].title}
                  </h3>
                  <p className="mb-6" style={{ fontFamily: 'var(--font-body)', fontSize: '1.125rem', color: 'var(--foreground)' }}>
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center text-[#55A1B4] group-hover:gap-2 transition-all">
                    <span style={{ fontFamily: 'var(--font-body)' }}>Lire l'article</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </a>

            {/* Article 2 - Card horizontale */}
            <a
              href="#mag"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('mag');
              }}
              className="group cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#EB7724]/50 rounded-2xl"
              aria-label={`Lire l'article : ${blogPosts[1].title}`}
            >
              <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border hover:border-[#EB7724]/30">
                <div className="flex flex-col sm:flex-row h-full">
                  <div className="relative sm:w-2/5 aspect-video sm:aspect-auto overflow-hidden">
                    <ImageWithFallback 
                      src={blogPosts[1].image}
                      alt={blogPosts[1].title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-[#EB7724] text-white border-0 text-xs">
                        {blogPosts[1].tag}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="sm:w-3/5 p-6 flex flex-col justify-between">
                    <div>
                      <h3 
                        className="mb-3 group-hover:text-[#EB7724] transition-colors" 
                        style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 2vw, 1.5rem)', lineHeight: '1.2' }}
                      >
                        {blogPosts[1].title}
                      </h3>
                      <p className="text-sm line-clamp-2" style={{ fontFamily: 'var(--font-body)', color: 'var(--foreground)' }}>
                        {blogPosts[1].excerpt}
                      </p>
                    </div>
                    <div className="flex items-center text-[#EB7724] mt-4 group-hover:gap-1 transition-all">
                      <span className="text-sm" style={{ fontFamily: 'var(--font-body)' }}>Lire</span>
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </div>
              </Card>
            </a>

            {/* Article 3 - Card horizontale */}
            <a
              href="#mag"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('mag');
              }}
              className="group cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#F8B044]/50 rounded-2xl"
              aria-label={`Lire l'article : ${blogPosts[2].title}`}
            >
              <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border hover:border-[#F8B044]/30">
                <div className="flex flex-col sm:flex-row h-full">
                  <div className="relative sm:w-2/5 aspect-video sm:aspect-auto overflow-hidden">
                    <ImageWithFallback 
                      src={blogPosts[2].image}
                      alt={blogPosts[2].title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-[#F8B044] text-white border-0 text-xs">
                        {blogPosts[2].tag}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="sm:w-3/5 p-6 flex flex-col justify-between">
                    <div>
                      <h3 
                        className="mb-3 group-hover:text-[#F8B044] transition-colors" 
                        style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 2vw, 1.5rem)', lineHeight: '1.2' }}
                      >
                        {blogPosts[2].title}
                      </h3>
                      <p className="text-sm line-clamp-2" style={{ fontFamily: 'var(--font-body)', color: 'var(--foreground)' }}>
                        {blogPosts[2].excerpt}
                      </p>
                    </div>
                    <div className="flex items-center text-[#F8B044] mt-4 group-hover:gap-1 transition-all">
                      <span className="text-sm" style={{ fontFamily: 'var(--font-body)' }}>Lire</span>
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </div>
              </Card>
            </a>
          </div>

          <div className="text-center">
            <Button 
              variant="outline"
              size="lg"
              onClick={() => handleNavigate('mag')}
              className="border-2 hover:border-[#55A1B4] hover:text-[#55A1B4] hover:bg-[#55A1B4]/5 group transition-all duration-300 focus:ring-4 focus:ring-[#55A1B4]/30"
            >
              Voir tous les articles
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* 7. SECTION "LEAD MAGNET" (AUDIT) - V2 plus scalable */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        {/* Background gradient bleu foncé premium */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#266572] via-[#327A8C] to-[#3E8FA6]" />
        
        {/* Cercles décoratifs lumineux */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F8B044]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        
        {/* Motif de grille */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEuNSIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC4wMyIvPjwvZz48L3N2Zz4=')] opacity-40" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header centré */}
          <div className="text-center mb-10">
            <Badge className="bg-[#F8B044] text-white border-0 mb-4 text-xs uppercase tracking-wider shadow-lg">
              Session découverte
            </Badge>
            
            <h2 className="text-white mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1.1' }}>
              Vous ne savez pas par où commencer ?
            </h2>
            
            <p className="text-white/90 max-w-2xl mx-auto mb-8" style={{ fontFamily: 'var(--font-body)', fontSize: '1.125rem' }}>
              Audit de maturité IA (30 min) pour faire le point et obtenir une feuille de route claire.
            </p>
          </div>

          {/* Contenu de l'offre - Layout simple centré */}
          <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8 relative">
            <div className="text-center mb-6">
              <h3 className="text-white mb-3" style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', lineHeight: '1.2' }}>
                Audit de Maturité IA
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-[#F8B044] to-[#EB7724] rounded-full mx-auto" />
            </div>
            
            {/* Détails de l'offre */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-[#F8B044] rounded-full flex-shrink-0" />
                <span className="text-white/90" style={{ fontFamily: 'var(--font-body)' }}>
                  Session de 30 minutes en visio
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-[#F8B044] rounded-full flex-shrink-0" />
                <span className="text-white/90" style={{ fontFamily: 'var(--font-body)' }}>
                  Diagnostic sur-mesure de vos besoins
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-[#F8B044] rounded-full flex-shrink-0" />
                <span className="text-white/90" style={{ fontFamily: 'var(--font-body)' }}>
                  Recommandations actionnables
                </span>
              </div>
            </div>
            
            {/* CTA */}
            <div className="text-center">
              <Button 
                size="lg"
                className="bg-white text-[#266572] hover:bg-white/90 shadow-2xl group px-8 focus:ring-4 focus:ring-white/30"
                onClick={() => handleNavigate('conseil')}
              >
                Réserver mon Audit
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            {/* Effet de brillance */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-2xl pointer-events-none" />
          </div>
        </div>
      </section>
    </div>
  );
}
