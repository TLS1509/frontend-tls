import { ArrowLeft, CheckCircle2, Calendar, Clock } from 'lucide-react';
import { BackgroundBlobs } from '../components/ui/background-blobs';
import OptimizedSidebar from '../components/ui/optimized-sidebar';

interface PreCoachingQuestionnaireResponsePageProps {
  onNavigate: (page: 'dashboard' | 'parcours' | 'coaching' | 'learning-space' | 'profile' | 'veille' | 'entreprise-dashboard' | 'journal' | 'journal-detail' | 'journal-free-entry' | 'account' | 'pre-coaching-questionnaire' | 'questionnaire-response', entryId?: number, templateType?: 'free' | 'learning' | 'coaching' | 'insight') => void;
  onLogout: () => void;
  questionnaireId?: number;
}

// Mock data - En production, ceci viendrait d'une API
const questionnaireResponses = {
  1: {
    sessionTitle: 'Introduction au Prompt Engineering',
    sessionDate: '15 décembre 2024',
    sessionTime: '14:00',
    submittedAt: '14 décembre 2024 à 18:30',
    responses: [
      {
        question: 'Quels sont vos objectifs principaux pour cette session de coaching ?',
        answer: 'Je souhaite comprendre les fondamentaux du prompt engineering et savoir comment structurer mes prompts de manière efficace. Mon objectif est de pouvoir créer des prompts performants pour mes formations.',
      },
      {
        question: 'Avez-vous des questions spécifiques ou des défis que vous aimeriez aborder ?',
        answer: 'Oui, j\'ai du mal à obtenir des réponses consistantes de l\'IA. Parfois les résultats sont excellents, parfois très décevants. J\'aimerais comprendre pourquoi et comment avoir plus de contrôle sur les outputs.',
      },
      {
        question: 'Quel est votre niveau d\'expérience actuel avec l\'IA et le prompting ?',
        answer: 'Débutant à intermédiaire. J\'utilise ChatGPT depuis 6 mois mais de manière intuitive, sans vraiment connaître les bonnes pratiques.',
      },
      {
        question: 'Y a-t-il des cas d\'usage spécifiques que vous souhaitez explorer pendant la session ?',
        answer: 'Oui, principalement : création de contenus pédagogiques, génération d\'exercices pratiques, et aide à la structuration de formations.',
      },
    ],
  },
  2: {
    sessionTitle: 'Stratégie d\'implémentation IA en formation',
    sessionDate: '8 décembre 2024',
    sessionTime: '10:00',
    submittedAt: '7 décembre 2024 à 16:45',
    responses: [
      {
        question: 'Quels sont vos objectifs principaux pour cette session de coaching ?',
        answer: 'Définir une stratégie claire pour intégrer l\'IA dans mes formations existantes sans perdre la dimension humaine.',
      },
      {
        question: 'Avez-vous des questions spécifiques ou des défis que vous aimeriez aborder ?',
        answer: 'Comment équilibrer automatisation et personnalisation ? Comment maintenir l\'engagement des apprenants avec l\'IA ?',
      },
      {
        question: 'Quel est votre niveau d\'expérience actuel avec l\'IA et le prompting ?',
        answer: 'Intermédiaire. J\'ai suivi la formation de base et je pratique régulièrement.',
      },
      {
        question: 'Y a-t-il des cas d\'usage spécifiques que vous souhaitez explorer pendant la session ?',
        answer: 'Création de parcours adaptatifs, feedback automatisé intelligent, et recommandations personnalisées de contenus.',
      },
    ],
  },
  3: {
    sessionTitle: 'Session découverte - Objectifs et plan',
    sessionDate: '1 décembre 2024',
    sessionTime: '15:00',
    submittedAt: '30 novembre 2024 à 20:15',
    responses: [
      {
        question: 'Quels sont vos objectifs principaux pour cette session de coaching ?',
        answer: 'Faire le point sur mes besoins et définir un plan d\'accompagnement personnalisé pour monter en compétence sur l\'IA.',
      },
      {
        question: 'Avez-vous des questions spécifiques ou des défis que vous aimeriez aborder ?',
        answer: 'Par où commencer ? Quelles sont les compétences essentielles à développer en priorité ?',
      },
      {
        question: 'Quel est votre niveau d\'expérience actuel avec l\'IA et le prompting ?',
        answer: 'Débutant. J\'ai testé quelques outils mais sans méthode structurée.',
      },
      {
        question: 'Y a-t-il des cas d\'usage spécifiques que vous souhaitez explorer pendant la session ?',
        answer: 'Amélioration de ma productivité au quotidien et enrichissement de mes formations.',
      },
    ],
  },
  4: {
    sessionTitle: 'Session de coaching IA',
    sessionDate: '28 janvier 2026',
    sessionTime: '14:00',
    submittedAt: '26 janvier 2026 à 10:30',
    responses: [
      {
        question: 'Quels sont vos objectifs principaux pour cette session de coaching ?',
        answer: 'Approfondir mes connaissances en prompt engineering avancé et explorer les techniques de few-shot learning.',
      },
      {
        question: 'Avez-vous des questions spécifiques ou des défis que vous aimeriez aborder ?',
        answer: 'Comment optimiser mes prompts pour des tâches complexes ? Comment maintenir la cohérence sur de longues conversations ?',
      },
      {
        question: 'Quel est votre niveau d\'expérience actuel avec l\'IA et le prompting ?',
        answer: 'Intermédiaire à avancé. Je maîtrise les bases et je cherche à aller plus loin.',
      },
      {
        question: 'Y a-t-il des cas d\'usage spécifiques que vous souhaitez explorer pendant la session ?',
        answer: 'Création de chatbots pédagogiques personnalisés et automatisation de la génération de contenus multiformat.',
      },
    ],
  },
};

export default function PreCoachingQuestionnaireResponsePage({ 
  onNavigate, 
  onLogout,
  questionnaireId = 1
}: PreCoachingQuestionnaireResponsePageProps) {
  const data = questionnaireResponses[questionnaireId as keyof typeof questionnaireResponses] || questionnaireResponses[1];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <BackgroundBlobs />

      <div className="flex h-screen">
        {/* Sidebar */}
        <OptimizedSidebar 
          currentPage="coaching"
          onNavigate={onNavigate} 
          onLogout={onLogout}
          userHasEnterpriseAccess={true}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-8">
            {/* Back Button */}
            <button
              onClick={() => onNavigate('coaching')}
              className="flex items-center gap-2 mb-6 transition-all duration-200 group"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <ArrowLeft 
                className="w-5 h-5 transition-transform group-hover:-translate-x-1" 
                style={{ color: 'var(--muted-foreground)' }}
              />
              <span 
                style={{ 
                  color: 'var(--muted-foreground)',
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                Retour au coaching
              </span>
            </button>

            {/* Header */}
            <div 
              className="mb-8 p-6 rounded-2xl"
              style={{
                background: 'var(--gradient-primary)',
                boxShadow: '0 8px 32px rgba(85, 161, 180, 0.2)',
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <CheckCircle2 className="w-6 h-6" style={{ color: 'white' }} />
                </div>
                <div className="flex-1">
                  <h1 
                    style={{ 
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'white',
                      marginBottom: 'var(--space-2)',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    Questionnaire de préparation
                  </h1>
                  <p 
                    style={{ 
                      fontSize: 'var(--text-base)',
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontFamily: 'var(--font-body)',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    {data.sessionTitle}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" style={{ color: 'rgba(255, 255, 255, 0.8)' }} />
                      <span style={{ fontSize: 'var(--text-sm)', color: 'rgba(255, 255, 255, 0.9)', fontFamily: 'var(--font-body)' }}>
                        {data.sessionDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" style={{ color: 'rgba(255, 255, 255, 0.8)' }} />
                      <span style={{ fontSize: 'var(--text-sm)', color: 'rgba(255, 255, 255, 0.9)', fontFamily: 'var(--font-body)' }}>
                        {data.sessionTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submitted Badge */}
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <CheckCircle2 className="w-4 h-4" style={{ color: 'white' }} />
                <span style={{ fontSize: 'var(--text-sm)', color: 'white', fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-medium)' }}>
                  Soumis le {data.submittedAt}
                </span>
              </div>
            </div>

            {/* Questions & Responses */}
            <div className="space-y-6">
              {data.responses.map((item, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-2xl transition-all duration-300"
                  style={{
                    background: 'white',
                    border: '1px solid var(--border)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  }}
                >
                  {/* Question Number Badge */}
                  <div 
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full mb-4"
                    style={{
                      background: 'var(--primary-50)',
                      color: 'var(--primary)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-bold)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {index + 1}
                  </div>

                  {/* Question */}
                  <h3 
                    style={{ 
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--foreground)',
                      marginBottom: 'var(--space-3)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {item.question}
                  </h3>

                  {/* Answer */}
                  <p 
                    style={{ 
                      fontSize: 'var(--text-sm)',
                      color: 'var(--muted-foreground)',
                      fontFamily: 'var(--font-body)',
                      lineHeight: 'var(--leading-relaxed)',
                    }}
                  >
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer Info */}
            <div 
              className="mt-8 p-4 rounded-xl"
              style={{
                background: 'var(--primary-50)',
                border: '1px solid var(--primary-200)',
              }}
            >
              <p 
                style={{ 
                  fontSize: 'var(--text-sm)',
                  color: 'var(--primary)',
                  fontFamily: 'var(--font-body)',
                  textAlign: 'center',
                }}
              >
                💡 Votre coach a accès à ces réponses pour personnaliser votre session
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
