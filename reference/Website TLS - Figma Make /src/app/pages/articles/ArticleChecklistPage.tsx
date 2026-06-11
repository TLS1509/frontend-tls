import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft, Download, CheckCircle2, Circle } from "lucide-react";
import { useState, useEffect } from "react";

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

export default function ArticleChecklistPage() {
  const [phases, setPhases] = useState([
    {
      id: "phase1",
      title: "Phase 1 : Préparation & Stratégie",
      items: [
        { id: "1-1", text: "Définir les objectifs business de la transformation IA", checked: false },
        { id: "1-2", text: "Identifier les cas d'usage prioritaires", checked: false },
        { id: "1-3", text: "Constituer l'équipe projet (sponsors, champions, utilisateurs)", checked: false },
        { id: "1-4", text: "Évaluer le niveau de maturité digitale actuel", checked: false },
        { id: "1-5", text: "Budgéter le projet (outils, formation, temps)", checked: false }
      ]
    },
    {
      id: "phase2",
      title: "Phase 2 : Formation des Équipes",
      items: [
        { id: "2-1", text: "Former les formateurs aux fondamentaux de l'IA", checked: false },
        { id: "2-2", text: "Organiser des ateliers pratiques de prompt engineering", checked: false },
        { id: "2-3", text: "Créer une documentation interne et des best practices", checked: false },
        { id: "2-4", text: "Mettre en place un système de mentorat interne", checked: false },
        { id: "2-5", text: "Partager des success stories et retours d'expérience", checked: false }
      ]
    },
    {
      id: "phase3",
      title: "Phase 3 : Pilot & Expérimentation",
      items: [
        { id: "3-1", text: "Sélectionner un projet pilote à faible risque", checked: false },
        { id: "3-2", text: "Choisir et tester les outils IA adaptés", checked: false },
        { id: "3-3", text: "Créer les premiers contenus avec l'IA", checked: false },
        { id: "3-4", text: "Recueillir les feedbacks des utilisateurs pilotes", checked: false },
        { id: "3-5", text: "Mesurer les premiers KPIs (temps, qualité, engagement)", checked: false }
      ]
    },
    {
      id: "phase4",
      title: "Phase 4 : Déploiement & Scaling",
      items: [
        { id: "4-1", text: "Ajuster la stratégie selon les learnings du pilot", checked: false },
        { id: "4-2", text: "Former l'ensemble des équipes L&D", checked: false },
        { id: "4-3", text: "Déployer les outils à grande échelle", checked: false },
        { id: "4-4", text: "Créer des workflows et processus standardisés", checked: false },
        { id: "4-5", text: "Établir un système de gouvernance et de qualité", checked: false }
      ]
    },
    {
      id: "phase5",
      title: "Phase 5 : Optimisation Continue",
      items: [
        { id: "5-1", text: "Suivre les KPIs mensuellement", checked: false },
        { id: "5-2", text: "Organiser des sessions de partage régulières", checked: false },
        { id: "5-3", text: "Tester de nouveaux outils et fonctionnalités", checked: false },
        { id: "5-4", text: "Ajuster les processus selon les retours", checked: false },
        { id: "5-5", text: "Célébrer les succès et partager les résultats", checked: false }
      ]
    }
  ]);

  const handleItemToggle = (phaseId: string, itemId: string) => {
    setPhases(phases.map(phase => {
      if (phase.id === phaseId) {
        return {
          ...phase,
          items: phase.items.map(item => 
            item.id === itemId ? { ...item, checked: !item.checked } : item
          )
        };
      }
      return phase;
    }));
  };

  const totalItems = phases.reduce((sum, phase) => sum + phase.items.length, 0);
  const checkedItems = phases.reduce((sum, phase) => 
    sum + phase.items.filter(item => item.checked).length, 0
  );
  const progressPercentage = Math.round((checkedItems / totalItems) * 100);

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="border-b border-border sticky top-20 bg-white/95 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <Button variant="ghost" className="gap-2" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4" />
            Retour au Mag'
          </Button>
          <Button className="bg-primary hover:bg-primary-hover gap-2">
            <Download className="w-4 h-4" />
            Télécharger PDF
          </Button>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-8 py-16">
        {/* Meta */}
        <div className="mb-8">
          <Badge className="mb-4 bg-accent-50 text-accent-700 border-accent-200">Guide Pratique</Badge>
          <p className="text-sm" style={{ color: 'var(--neutral-600)', fontFamily: 'var(--font-body)' }}>
            Dernière mise à jour : 15 Janvier 2025
          </p>
        </div>

        {/* Title */}
        <h1 className="mb-6" style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'var(--text-5xl)',
          fontWeight: 'var(--font-weight-bold)',
          lineHeight: 'var(--leading-tight)'
        }}>
          Checklist Complète : Déployer l'IA dans Votre Organisation
        </h1>

        {/* Subtitle */}
        <p className="mb-12" style={{ 
          fontSize: 'var(--text-xl)',
          lineHeight: 'var(--leading-relaxed)',
          color: 'var(--neutral-600)',
          fontFamily: 'var(--font-body)'
        }}>
          Un guide étape par étape pour réussir votre transformation digitale de la formation. 
          Cochez les items au fur et à mesure de votre progression !
        </p>

        {/* Progress Bar */}
        <div className="mb-16 p-8" style={{ 
          background: 'var(--gradient-primary-soft)',
          borderRadius: 'var(--radius-2xl)',
          border: '2px solid var(--primary-200)'
        }}>
          <div className="flex items-center justify-between mb-4">
            <h2 style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--primary-800)'
            }}>
              Votre Progression
            </h2>
            <div className="text-4xl" style={{ 
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--primary-700)'
            }}>
              {progressPercentage}%
            </div>
          </div>
          
          <div className="h-4 bg-white rounded-full overflow-hidden mb-3">
            <div 
              className="h-full bg-primary-600 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <p className="text-sm" style={{ color: 'var(--primary-700)', fontFamily: 'var(--font-body)' }}>
            {checkedItems} sur {totalItems} items complétés
          </p>
        </div>

        {/* Intro */}
        <div className="mb-12">
          <p style={{ 
            fontSize: 'var(--text-base)', 
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--neutral-600)',
            fontFamily: 'var(--font-body)',
            marginBottom: 'var(--space-6)'
          }}>
            Cette checklist vous accompagne dans toutes les étapes de déploiement de l'IA dans votre 
            fonction formation. Suivez ces 5 phases pour maximiser vos chances de succès et éviter 
            les erreurs courantes.
          </p>
          <p style={{ 
            fontSize: 'var(--text-base)', 
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--neutral-600)',
            fontFamily: 'var(--font-body)'
          }}>
            💡 <strong>Conseil :</strong> Ne sautez pas les étapes ! Chaque phase construit sur la précédente.
          </p>
        </div>

        {/* Phases */}
        <div className="space-y-12">
          {phases.map((phase, phaseIndex) => {
            const phaseProgress = Math.round((phase.items.filter(i => i.checked).length / phase.items.length) * 100);
            const isPhaseComplete = phaseProgress === 100;
            
            return (
              <div key={phase.id}>
                <div className="flex items-start gap-4 mb-6">
                  <div 
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isPhaseComplete ? 'bg-primary-600' : 'bg-primary-100'
                    }`}
                    style={{ 
                      fontFamily: 'var(--font-display)',
                      fontWeight: 'var(--font-weight-bold)',
                      fontSize: 'var(--text-lg)',
                      color: isPhaseComplete ? 'white' : 'var(--primary-700)'
                    }}
                  >
                    {isPhaseComplete ? <CheckCircle2 className="w-6 h-6" /> : phaseIndex + 1}
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-2" style={{ 
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: isPhaseComplete ? 'var(--primary-600)' : 'var(--foreground)'
                    }}>
                      {phase.title}
                    </h2>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            isPhaseComplete ? 'bg-primary-600' : 'bg-primary-400'
                          }`}
                          style={{ width: `${phaseProgress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm" style={{ 
                        color: 'var(--neutral-500)',
                        fontFamily: 'var(--font-body)',
                        minWidth: '3rem'
                      }}>
                        {phaseProgress}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pl-16 space-y-3">
                  {phase.items.map(item => (
                    <label
                      key={item.id}
                      className={`flex items-start gap-4 p-4 cursor-pointer hover:bg-neutral-50 transition-colors group ${
                        item.checked ? 'opacity-60' : ''
                      }`}
                      style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => handleItemToggle(phase.id, item.id)}
                        className="sr-only"
                      />
                      <div className="flex-shrink-0 mt-0.5">
                        {item.checked ? (
                          <CheckCircle2 className="w-6 h-6 text-primary-600" />
                        ) : (
                          <Circle className="w-6 h-6 text-neutral-300 group-hover:text-primary-400 transition-colors" />
                        )}
                      </div>
                      <span 
                        className={item.checked ? 'line-through' : ''}
                        style={{ 
                          fontFamily: 'var(--font-body)',
                          lineHeight: 'var(--leading-relaxed)',
                          color: item.checked ? 'var(--neutral-400)' : 'var(--neutral-700)'
                        }}
                      >
                        {item.text}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion CTA */}
        {progressPercentage === 100 && (
          <div className="mt-16 p-8 text-center" style={{ 
            background: 'var(--gradient-primary)',
            borderRadius: 'var(--radius-2xl)',
            color: 'white'
          }}>
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="mb-4" style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--font-weight-bold)'
            }}>
              Félicitations !
            </h2>
            <p className="mb-6 opacity-90 text-lg" style={{ fontFamily: 'var(--font-body)' }}>
              Vous avez complété toutes les étapes de la checklist. Votre organisation est prête 
              pour tirer pleinement parti de l'IA dans la formation !
            </p>
            <Button className="bg-white text-primary hover:bg-white/90 gap-2">
              <Download className="w-5 h-5" />
              Télécharger votre certificat
            </Button>
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-16 p-8" style={{ 
          background: 'var(--gradient-accent-soft)',
          borderRadius: 'var(--radius-2xl)',
          border: '2px solid var(--accent-200)'
        }}>
          <h2 className="mb-6" style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--accent-800)'
          }}>
            💡 Conseils pour Réussir
          </h2>
          <ul className="space-y-3">
            {[
              "Impliquez les utilisateurs finaux dès le début du projet",
              "Communiquez régulièrement sur les avancées et les succès",
              "Soyez patient : la transformation prend du temps (6-12 mois minimum)",
              "Investissez dans la formation continue de vos équipes",
              "Mesurez et célébrez les petites victoires"
            ].map((tip, index) => (
              <li key={index} className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                <span style={{ fontFamily: 'var(--font-body)', color: 'var(--accent-900)' }}>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
}
