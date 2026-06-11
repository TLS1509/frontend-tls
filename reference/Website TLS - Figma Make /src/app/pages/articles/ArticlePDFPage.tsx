import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft, Download, FileText, CheckCircle2, TrendingUp, Users, Target } from "lucide-react";

export default function ArticlePDFPage() {
  const keyFindings = [
    "70% des entreprises prévoient d'augmenter leurs investissements en IA pour la formation",
    "Les formations augmentées par l'IA montrent une amélioration de 45% de l'engagement",
    "Le ROI moyen est de 3:1 sur la première année",
    "85% des apprenants préfèrent les parcours personnalisés par IA"
  ];

  const tableOfContents = [
    { section: "Executive Summary", page: "2" },
    { section: "Méthodologie de l'étude", page: "5" },
    { section: "État des lieux du marché", page: "8" },
    { section: "Adoption de l'IA dans la formation", page: "14" },
    { section: "Cas d'usage et ROI", page: "22" },
    { section: "Défis et opportunités", page: "30" },
    { section: "Recommandations stratégiques", page: "38" },
    { section: "Conclusion", page: "45" }
  ];

  const stats = [
    { icon: Users, value: "500+", label: "Entreprises interrogées", color: "text-primary-600" },
    { icon: Target, value: "12", label: "Secteurs analysés", color: "text-secondary-600" },
    { icon: TrendingUp, value: "45%", label: "Croissance YoY", color: "text-accent-600" },
    { icon: FileText, value: "48", label: "Pages de contenu", color: "text-primary-600" }
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

      <article className="max-w-6xl mx-auto px-8 py-16">
        {/* Meta Info */}
        <div className="flex items-center gap-4 mb-8 text-sm" style={{ color: 'var(--neutral-600)' }}>
          <Badge className="bg-secondary-50 text-secondary-700 border-secondary-200">Rapport</Badge>
          <span>•</span>
          <span>Publié le 15 Janvier 2025</span>
          <span>•</span>
          <span>48 pages</span>
        </div>

        {/* Title */}
        <h1 className="mb-6" style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'var(--text-5xl)',
          fontWeight: 'var(--font-weight-bold)',
          lineHeight: 'var(--leading-tight)'
        }}>
          État de l'IA dans la Formation Professionnelle 2025
        </h1>

        {/* Subtitle */}
        <p className="mb-12" style={{ 
          fontSize: 'var(--text-xl)',
          lineHeight: 'var(--leading-relaxed)',
          color: 'var(--neutral-600)',
          fontFamily: 'var(--font-body)'
        }}>
          Analyse complète des tendances, adoption et ROI de l'intelligence artificielle dans le secteur de la formation professionnelle
        </p>

        {/* PDF Preview Card */}
        <div className="mb-16 grid md:grid-cols-2 gap-8">
          {/* PDF Thumbnail */}
          <div className="relative group">
            <div className="aspect-[3/4] bg-gradient-to-br from-primary-50 to-primary-100 p-8 flex flex-col justify-between" style={{ borderRadius: 'var(--radius-xl)', border: '2px solid var(--primary-200)' }}>
              <div>
                <div className="w-16 h-16 bg-primary-600 rounded-xl mb-6 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--font-weight-bold)', color: 'var(--primary-900)' }}>
                  État de l'IA dans la Formation
                </h2>
                <p className="text-sm mb-6" style={{ color: 'var(--primary-700)', fontFamily: 'var(--font-body)' }}>
                  Rapport annuel 2025
                </p>
                <div className="space-y-2 text-xs" style={{ color: 'var(--primary-600)', fontFamily: 'var(--font-body)' }}>
                  <div className="h-1 bg-primary-300 rounded w-full"></div>
                  <div className="h-1 bg-primary-300 rounded w-5/6"></div>
                  <div className="h-1 bg-primary-300 rounded w-4/6"></div>
                </div>
              </div>
              <div className="text-xs" style={{ color: 'var(--primary-600)', fontFamily: 'var(--font-body)' }}>
                The Learning Society © 2025
              </div>
            </div>
            <div className="absolute inset-0 bg-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" style={{ borderRadius: 'var(--radius-xl)' }}>
              <Download className="w-12 h-12 text-primary-600" />
            </div>
          </div>

          {/* Download CTA */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="mb-4" style={{ 
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-weight-semibold)'
              }}>
                Téléchargez le rapport complet
              </h3>
              <p className="mb-6" style={{ 
                fontSize: 'var(--text-base)', 
                lineHeight: 'var(--leading-relaxed)',
                color: 'var(--neutral-600)',
                fontFamily: 'var(--font-body)'
              }}>
                Accédez à 48 pages d'analyses détaillées, de données exclusives et de recommandations stratégiques pour transformer votre approche de la formation.
              </p>

              <div className="space-y-3 mb-8">
                {["Données de 500+ entreprises", "12 secteurs d'activité", "Cas d'usage concrets", "Projections 2025-2027"].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0" />
                    <span style={{ fontFamily: 'var(--font-body)', color: 'var(--neutral-700)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full bg-primary hover:bg-primary-hover gap-2 py-6">
                <Download className="w-5 h-5" />
                Télécharger le PDF (2.8 MB)
              </Button>
              <Button variant="outline" className="w-full">
                Recevoir par email
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-16 grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center p-6 bg-neutral-50" style={{ borderRadius: 'var(--radius-xl)' }}>
                <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-3xl mb-2" style={{ 
                  fontFamily: 'var(--font-display)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)'
                }}>
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: 'var(--neutral-600)', fontFamily: 'var(--font-body)' }}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Findings */}
        <div className="mb-16 p-8" style={{ 
          background: 'var(--gradient-secondary-soft)',
          borderRadius: 'var(--radius-2xl)',
          border: '2px solid var(--secondary-200)'
        }}>
          <h2 className="mb-6" style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-3xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--secondary-800)'
          }}>
            🔑 Résultats Clés
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {keyFindings.map((finding, index) => (
              <div key={index} className="flex gap-3 p-4 bg-white" style={{ borderRadius: 'var(--radius-lg)' }}>
                <CheckCircle2 className="w-5 h-5 text-secondary-600 flex-shrink-0 mt-0.5" />
                <p style={{ fontFamily: 'var(--font-body)', color: 'var(--neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                  {finding}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Table of Contents */}
        <div className="mb-16">
          <h2 className="mb-6" style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-3xl)',
            fontWeight: 'var(--font-weight-semibold)'
          }}>
            Table des Matières
          </h2>
          <div className="space-y-2">
            {tableOfContents.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 hover:bg-primary-50 transition-colors group cursor-pointer"
                style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-xs group-hover:bg-primary-200 transition-colors" style={{ 
                    fontFamily: 'var(--font-display)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--primary-700)'
                  }}>
                    {index + 1}
                  </div>
                  <span style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-medium)' }}>
                    {item.section}
                  </span>
                </div>
                <span className="text-sm" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-body)' }}>
                  Page {item.page}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Summary */}
        <div className="prose max-w-none">
          <h2 style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-3xl)',
            fontWeight: 'var(--font-weight-semibold)',
            marginBottom: 'var(--space-6)'
          }}>
            Executive Summary
          </h2>
          
          <p style={{ 
            fontSize: 'var(--text-base)', 
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--neutral-600)',
            fontFamily: 'var(--font-body)',
            marginBottom: 'var(--space-6)'
          }}>
            L'intelligence artificielle transforme en profondeur le secteur de la formation professionnelle. 
            Notre étude menée auprès de plus de 500 entreprises révèle une adoption massive et des résultats 
            probants qui dépassent les attentes initiales.
          </p>

          <p style={{ 
            fontSize: 'var(--text-base)', 
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--neutral-600)',
            fontFamily: 'var(--font-body)',
            marginBottom: 'var(--space-6)'
          }}>
            70% des organisations interrogées prévoient d'augmenter leurs investissements dans les technologies 
            d'IA appliquées à la formation en 2025. Cette tendance s'explique par des résultats mesurables : 
            amélioration de 45% de l'engagement des apprenants, réduction de 60% du temps de création de contenu, 
            et un ROI moyen de 3:1 sur la première année.
          </p>

          <p style={{ 
            fontSize: 'var(--text-base)', 
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--neutral-600)',
            fontFamily: 'var(--font-body)',
            marginBottom: 'var(--space-6)'
          }}>
            Les cas d'usage les plus répandus incluent la personnalisation des parcours d'apprentissage (78%), 
            la création de contenu assistée par IA (65%), et l'évaluation automatisée (52%). Les secteurs les 
            plus avancés sont la tech (89% d'adoption), la finance (76%) et la santé (71%).
          </p>

          <p style={{ 
            fontSize: 'var(--text-base)', 
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--neutral-600)',
            fontFamily: 'var(--font-body)'
          }}>
            Malgré ces résultats encourageants, des défis subsistent : formation des formateurs (cité par 68% 
            des répondants), questions éthiques et de protection des données (54%), et résistance au changement 
            organisationnel (47%). Ce rapport propose des recommandations concrètes pour surmonter ces obstacles 
            et maximiser la valeur de l'IA dans vos programmes de formation.
          </p>
        </div>
      </article>

      {/* Related Reports */}
      <section className="bg-neutral-50 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-center mb-12" style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-4xl)',
            fontWeight: 'var(--font-weight-bold)'
          }}>
            Autres Rapports
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "ROI de la Formation Digitale", year: "2024", pages: "36" },
              { title: "Tendances L&D 2025", year: "2025", pages: "42" },
              { title: "Guide Micro-Learning", year: "2024", pages: "28" }
            ].map((report, i) => (
              <div
                key={i}
                className="bg-white overflow-hidden hover:shadow-xl transition-all cursor-pointer group p-6"
                style={{ borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)' }}
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-primary-50 to-primary-100 p-6 mb-4 flex flex-col justify-between" style={{ borderRadius: 'var(--radius-lg)' }}>
                  <div>
                    <div className="w-12 h-12 bg-primary-600 rounded-lg mb-4 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="space-y-1 text-xs" style={{ color: 'var(--primary-600)' }}>
                      <div className="h-1 bg-primary-300 rounded w-full"></div>
                      <div className="h-1 bg-primary-300 rounded w-4/5"></div>
                      <div className="h-1 bg-primary-300 rounded w-3/5"></div>
                    </div>
                  </div>
                </div>
                <h3 className="mb-2 group-hover:text-primary transition-colors" style={{ 
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-weight-semibold)'
                }}>
                  {report.title}
                </h3>
                <p className="text-sm mb-4" style={{ color: 'var(--neutral-600)', fontFamily: 'var(--font-body)' }}>
                  {report.year} • {report.pages} pages
                </p>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 w-4 h-4" />
                  Télécharger
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
