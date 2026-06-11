import { useState } from 'react';
import { ChevronLeft, Target, Lightbulb, Compass, Send } from 'lucide-react';
import { BackgroundBlobs } from '../components/ui/background-blobs';
import OptimizedSidebar from '../components/ui/optimized-sidebar';
import { useToast, ToastContainer } from '../components/ui/notification-toast';

interface PreCoachingQuestionnairePageProps {
  onNavigate: (page: 'dashboard' | 'parcours' | 'coaching' | 'learning-space' | 'profile' | 'veille' | 'entreprise-dashboard' | 'journal' | 'journal-detail' | 'journal-free-entry' | 'account' | 'pre-coaching-questionnaire' | 'questionnaire-response', entryId?: number, templateType?: 'free' | 'learning' | 'coaching' | 'insight') => void;
  onLogout: () => void;
  sessionDate?: string;
  sessionTime?: string;
}

const questions = [
  {
    id: 1,
    step: 'Étape 1 • Vos objectifs',
    icon: Target,
    question: 'Quels sont vos objectifs principaux pour cette session de coaching ?',
    placeholder: 'Décrivez en détail vos attentes et ce que vous souhaitez accomplir...',
  },
  {
    id: 2,
    step: 'Étape 2 • Vos défis',
    icon: Lightbulb,
    question: 'Quels défis ou obstacles rencontrez-vous actuellement ?',
    placeholder: 'Partagez les difficultés que vous rencontrez dans votre parcours...',
  },
  {
    id: 3,
    step: 'Étape 3 • Sujets prioritaires',
    icon: Compass,
    question: 'Y a-t-il des sujets spécifiques que vous aimeriez aborder ?',
    placeholder: 'Listez les thématiques prioritaires que vous souhaitez traiter...',
  },
];

export default function PreCoachingQuestionnairePage({
  onNavigate,
  onLogout,
  sessionDate,
  sessionTime,
}: PreCoachingQuestionnairePageProps) {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({
    1: '',
    2: '',
    3: '',
  });

  const { toasts, success, removeToast } = useToast();

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const allAnswersFilled = Object.values(answers).every((answer) => answer.trim().length > 0);

  const handleSubmit = () => {
    if (allAnswersFilled) {
      success(
        'Réponses envoyées !',
        'Votre coach a bien reçu vos réponses. Vous êtes maintenant prêt(e) pour votre session.'
      );
      setTimeout(() => {
        onNavigate('coaching');
      }, 2000);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--background)' }}>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <BackgroundBlobs />

      {/* Sidebar */}
      <OptimizedSidebar
        currentPage="coaching"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Content Area with scroll */}
        <div className="flex-1 overflow-y-auto">
          <div className="min-h-full px-6 py-8 md:px-12 md:py-12 max-w-5xl mx-auto">
            {/* Back Button */}
            <button
              onClick={() => onNavigate('coaching')}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-xl transition-all duration-200"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
                color: 'var(--foreground)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                fontFamily: 'var(--font-body)',
              }}
            >
              <ChevronLeft className="w-4 h-4" />
              Retour
            </button>

            {/* Header */}
            <div className="text-center mb-12">
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-4xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                Préparez votre session
              </h1>
              <p
                style={{
                  fontSize: 'var(--text-lg)',
                  color: 'var(--muted-foreground)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Répondez à ces 3 questions pour une session sur-mesure
              </p>
            </div>

            {/* Questions */}
            <div className="space-y-6 mb-8">
              {questions.map((q, index) => {
                const QuestionIcon = q.icon;
                return (
                  <div key={q.id} className="relative">
                    {/* Icon Badge */}
                    <div
                      className="absolute -left-8 top-0 w-16 h-16 rounded-3xl flex items-center justify-center"
                      style={{
                        background: 'white',
                        border: '3px solid rgba(0, 0, 0, 0.1)',
                        boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <QuestionIcon className="w-7 h-7" style={{ color: 'var(--muted-foreground)' }} />
                    </div>

                    {/* Question Card */}
                    <div
                      className="ml-12 p-6 rounded-2xl"
                      style={{
                        background: 'white',
                        border: '2px solid rgba(0, 0, 0, 0.1)',
                        boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      {/* Step Label */}
                      <p
                        style={{
                          fontSize: 'var(--text-xs)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'var(--primary)',
                          fontFamily: 'var(--font-body)',
                          letterSpacing: '1.2px',
                          textTransform: 'uppercase',
                          marginBottom: 'var(--space-2)',
                        }}
                      >
                        {q.step}
                      </p>

                      {/* Question */}
                      <h3
                        style={{
                          fontSize: 'var(--text-xl)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'var(--foreground)',
                          fontFamily: 'var(--font-display)',
                          marginBottom: 'var(--space-4)',
                          lineHeight: 'var(--leading-snug)',
                        }}
                      >
                        {q.question}
                      </h3>

                      {/* Text Area */}
                      <textarea
                        value={answers[q.id]}
                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                        placeholder={q.placeholder}
                        rows={6}
                        className="w-full p-4 rounded-xl resize-none focus:outline-none transition-all duration-200"
                        style={{
                          background: 'var(--muted)',
                          border: '2px solid rgba(0, 0, 0, 0.1)',
                          fontSize: 'var(--text-base)',
                          fontFamily: 'var(--font-body)',
                          color: 'var(--foreground)',
                          lineHeight: 'var(--leading-relaxed)',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={!allAnswersFilled}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl transition-all duration-300"
                style={{
                  background: allAnswersFilled
                    ? 'var(--primary)'
                    : 'rgba(85, 161, 180, 0.5)',
                  color: 'white',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontFamily: 'var(--font-body)',
                  boxShadow: allAnswersFilled
                    ? '0 6px 20px 0 rgba(85, 161, 180, 0.4)'
                    : 'none',
                  border: 'none',
                  cursor: allAnswersFilled ? 'pointer' : 'not-allowed',
                  opacity: allAnswersFilled ? 1 : 0.5,
                }}
              >
                <Send className="w-5 h-5" />
                Envoyer mes réponses
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
