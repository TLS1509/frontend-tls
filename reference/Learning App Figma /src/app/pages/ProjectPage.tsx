import { useState } from 'react';
import { 
  ChevronLeft,
  Save,
  Upload,
  X,
  CheckCircle2,
  Clock,
  Award,
  FileText,
  Image as ImageIcon,
  Send,
  AlertCircle,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { BackgroundBlobs } from '../components/ui/background-blobs';
import OptimizedSidebar from '../components/ui/optimized-sidebar';

interface ProjectPageProps {
  onNavigate: (page: 'dashboard' | 'parcours' | 'coaching' | 'learning-space' | 'profile' | 'plan' | 'veille' | 'entreprise-dashboard' | 'course-detail' | 'lesson' | 'project') => void;
  onLogout: () => void;
}

const projectSteps = [
  {
    id: 1,
    number: 1,
    title: 'Analyse de votre contexte formation',
    description: 'Décrivez le contexte dans lequel vous souhaitez déployer votre module de formation : secteur d\'activité, organisation, public visé, enjeux stratégiques et contraintes identifiées.',
    duration: '15 min',
    placeholder: 'Exemple de contenu attendu :\n\n🏢 Contexte organisationnel\n- Secteur : Formation professionnelle continue\n- Taille organisation : 50-200 collaborateurs\n- Budget formation annuel : 50K€\n\n🎯 Enjeux identifiés\n- Montée en compétences sur l\'IA générative\n- Besoin d\'autonomie des formateurs\n- Optimisation du temps de conception\n\n⚠️ Contraintes\n- Budget limité par module\n- Disponibilité formateurs : 2h/semaine\n- Nécessité de résultats mesurables sous 3 mois',
    completed: false,
  },
  {
    id: 2,
    number: 2,
    title: 'Conception de vos prompts fondamentaux',
    description: 'Créez 3 à 5 prompts clés qui vous aideront dans votre activité de formateur. Appliquez la méthode RCIF (Rôle, Contexte, Instructions, Format) que vous avez apprise.',
    duration: '20 min',
    placeholder: 'Pour chaque prompt, précisez :\n\n📌 Prompt 1 : Génération de scénarios pédagogiques\n---\n🎭 RÔLE : Tu es un concepteur pédagogique expert en andragogie...\n📚 CONTEXTE : Je conçois une formation sur [sujet] pour [public]...\n✅ INSTRUCTIONS : Crée 3 scénarios pédagogiques différents incluant...\n📊 FORMAT : Présente sous forme de tableau avec colonnes : Objectif, Activité, Durée, Matériel\n\n📌 Prompt 2 : Évaluation des acquis\n---\n[Même structure RCIF]\n\n📌 Prompt 3 : Création de supports visuels\n---\n[Même structure RCIF]',
    completed: false,
  },
  {
    id: 3,
    number: 3,
    title: 'Test et amélioration de vos prompts',
    description: 'Testez vos prompts avec ChatGPT ou Claude, analysez les résultats obtenus et documentez vos itérations d\'amélioration. Expliquez ce qui a fonctionné et ce que vous avez ajusté.',
    duration: '20 min',
    placeholder: '🧪 Tests réalisés\n\nPrompt 1 - Version initiale :\n• Résultat obtenu : [Description]\n• Points positifs : ...\n• Points d\'amélioration : ...\n\nPrompt 1 - Version améliorée :\n• Modifications apportées : ...\n• Nouveau résultat : ...\n• Impact : [meilleur/identique/moins bon]\n\n📊 Analyse comparative\n• Temps gagné : -40% sur la conception\n• Qualité : +30% de diversité pédagogique\n• Utilité : 4/5\n\n💡 Apprentissages clés\n• L\'ajout du contexte précis améliore la pertinence de 60%\n• Le format demandé doit être très explicite\n• Les exemples dans le prompt guident mieux l\'IA',
    completed: false,
  },
  {
    id: 4,
    number: 4,
    title: 'Plan de déploiement dans votre pratique',
    description: 'Décrivez concrètement comment vous allez intégrer ces prompts dans votre quotidien de formateur. Définissez les étapes, le calendrier et les indicateurs de réussite.',
    duration: '15 min',
    placeholder: '📅 Planning de déploiement\n\nSemaine 1-2 : Phase pilote\n• Test sur 1 module existant\n• Utilisation des 3 prompts principaux\n• Collecte feedback participants\n\nSemaine 3-4 : Ajustement\n• Optimisation des prompts\n• Formation équipe pédagogique\n• Création bibliothèque de prompts\n\nMois 2-3 : Généralisation\n• Déploiement sur tous les modules\n• Suivi des KPIs\n• Documentation des bonnes pratiques\n\n📊 Indicateurs de succès\n• Temps de conception : -30%\n• Satisfaction formateurs : >4/5\n• Qualité pédagogique maintenue : >90%\n• Adoption par l\'équipe : >80%',
    completed: false,
  },
  {
    id: 5,
    number: 5,
    title: 'Réflexion et perspectives d\'évolution',
    description: 'Prenez du recul sur votre parcours d\'apprentissage. Quels sont vos principaux apprentissages ? Comment pensez-vous évoluer dans votre utilisation de l\'IA ? Quelles sont vos prochaines étapes ?',
    duration: '10 min',
    placeholder: '💭 Principaux apprentissages\n\n1. Compétences techniques acquises\n• Maîtrise de la structure RCIF\n• Capacité à itérer sur un prompt\n• Compréhension des limites de l\'IA\n\n2. Evolution de ma posture de formateur\n• Passage de \"concepteur\" à \"prompt designer\"\n• Gain de temps sur les tâches à faible valeur\n• Focus accru sur l\'accompagnement humain\n\n3. Changements dans ma pratique\n• Utilisation quotidienne de l\'IA pour...\n• Collaboration renforcée avec...\n• Créativité pédagogique amplifiée\n\n🚀 Prochaines étapes\n\nCourt terme (1-3 mois)\n• Approfondir les prompts pour l\'évaluation\n• Tester d\'autres IA (Claude, Gemini)\n• Former 5 collègues\n\nMoyen terme (3-6 mois)\n• Créer une bibliothèque partagée\n• Développer des prompts spécialisés\n• Mesurer l\'impact sur la qualité\n\nLong terme (6-12 mois)\n• Devenir référent IA de mon organisation\n• Contribuer à une communauté de pratique\n• Explorer l\'IA pour la personnalisation',
    completed: false,
  },
];

export default function ProjectPage({ onNavigate, onLogout }: ProjectPageProps) {
  const [stepData, setStepData] = useState<{ [key: number]: string }>({});
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: number]: File[] }>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleTextChange = (stepId: number, value: string) => {
    setStepData(prev => ({ ...prev, [stepId]: value }));
    // Auto-save after typing
    if (saveMessage) setSaveMessage('');
  };

  const handleFileUpload = (stepId: number, files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    setUploadedFiles(prev => ({
      ...prev,
      [stepId]: [...(prev[stepId] || []), ...fileArray],
    }));
  };

  const removeFile = (stepId: number, fileIndex: number) => {
    setUploadedFiles(prev => ({
      ...prev,
      [stepId]: prev[stepId].filter((_, i) => i !== fileIndex),
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setSaveMessage('');
    // Simulate save
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage('✓ Brouillon sauvegardé');
      setTimeout(() => setSaveMessage(''), 3000);
    }, 1000);
  };

  const completedSteps = projectSteps.filter(step => 
    stepData[step.id] && stepData[step.id].trim().length > 50 // Minimum 50 chars
  ).length;

  const progressPercentage = Math.round((completedSteps / projectSteps.length) * 100);
  const totalDuration = projectSteps.reduce((sum, step) => {
    const minutes = parseInt(step.duration);
    return sum + minutes;
  }, 0);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--background)' }}>
      <BackgroundBlobs />

      <div className="flex h-screen">
        <OptimizedSidebar
          currentPage="parcours"
          onNavigate={onNavigate}
          onLogout={onLogout}
          userHasEnterpriseAccess={true}
          userName="Admin1509"
          userEmail="padennery@me.com"
          userInitials="A"
        />

        <main className="flex-1 overflow-y-auto">
          {/* ========== NAVIGATION FIXE ========== */}
          <div 
            className="sticky top-0 z-50 px-4 md:px-8 py-4"
            style={{
              background: 'white',
              borderBottom: '1px solid var(--border)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            }}
          >
            <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
              <button 
                onClick={() => onNavigate('course-detail')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:gap-3"
                style={{ 
                  background: 'var(--neutral-100)',
                  color: 'var(--foreground)',
                  fontWeight: 'var(--font-weight-medium)',
                  border: '1px solid var(--border)',
                }}
              >
                <ChevronLeft className="w-5 h-5" />
                Retour au parcours
              </button>

              <div className="flex items-center gap-4">
                {/* Progress indicator */}
                <div className="flex items-center gap-3">
                  <span 
                    style={{ 
                      fontSize: 'var(--text-sm)',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    Progression
                  </span>
                  <span 
                    style={{ 
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--primary)',
                    }}
                  >
                    {completedSteps} / {projectSteps.length}
                  </span>
                  <div 
                    className="w-32 h-2 rounded-full overflow-hidden"
                    style={{ background: 'var(--neutral-200)' }}
                  >
                    <div 
                      className="h-full transition-all duration-500"
                      style={{ 
                        width: `${progressPercentage}%`,
                        background: 'var(--primary)',
                      }}
                    />
                  </div>
                </div>

                {/* Save message */}
                {saveMessage && (
                  <span 
                    style={{ 
                      fontSize: 'var(--text-sm)',
                      color: 'var(--success)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    {saveMessage}
                  </span>
                )}

                {/* Save button */}
                <Button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="gap-2"
                  style={{ 
                    background: 'var(--primary)',
                    color: 'white',
                    fontWeight: 'var(--font-weight-semibold)',
                  }}
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
                </Button>
              </div>
            </div>
          </div>

          {/* ========== HERO SECTION ========== */}
          <div 
            className="relative pt-12 pb-16"
            style={{
              background: 'linear-gradient(135deg, var(--secondary) 0%, var(--accent) 100%)',
            }}
          >
            <div className="max-w-6xl mx-auto px-8 md:px-12 text-white">
              {/* Badge icon */}
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                <Award className="w-10 h-10" />
              </div>

              {/* Title */}
              <h1 
                className="mb-4"
                style={{ 
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-5xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  lineHeight: 'var(--leading-tight)',
                }}
              >
                Projet final : Prompt Designer
              </h1>

              {/* Description */}
              <p 
                className="mb-8 max-w-3xl"
                style={{ 
                  fontSize: 'var(--text-xl)',
                  opacity: 0.95,
                  lineHeight: 'var(--leading-relaxed)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Mettez en pratique vos apprentissages en créant votre stratégie personnelle d'intégration de l'IA dans votre activité de formateur.
              </p>

              {/* Meta */}
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span style={{ fontSize: 'var(--text-base)' }}>{totalDuration} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  <span style={{ fontSize: 'var(--text-base)' }}>{projectSteps.length} étapes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>Badge Open Badge</span>
                </div>
              </div>
            </div>
          </div>

          {/* ========== CONTENT ========== */}
          <div className="max-w-6xl mx-auto px-8 md:px-12 py-12">
            {/* Instructions - Design Amélioré */}
            <div 
              className="rounded-3xl p-10 mb-10"
              style={{
                background: 'white',
                border: '2px solid var(--border)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
              }}
            >
              <div className="flex items-start gap-6">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ 
                    background: 'var(--primary)',
                    boxShadow: '0 4px 12px rgba(85, 161, 180, 0.25)',
                  }}
                >
                  <AlertCircle className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h2 
                    className="mb-6"
                    style={{ 
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    Guide de réussite
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {[
                      { icon: '🎯', title: 'Soyez concret et précis', desc: 'Basez-vous sur votre contexte réel de formateur' },
                      { icon: '📐', title: 'Appliquez la méthode RCIF', desc: 'Rôle, Contexte, Instructions, Format' },
                      { icon: '🧪', title: 'Documentez vos tests', desc: 'Montrez vos itérations et apprentissages' },
                      { icon: '🚀', title: 'Pensez déploiement', desc: 'Comment utiliser ces prompts au quotidien ?' },
                    ].map((item, index) => (
                      <div 
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-xl"
                        style={{ background: 'var(--neutral-50)' }}
                      >
                        <span style={{ fontSize: 'var(--text-2xl)' }}>{item.icon}</span>
                        <div>
                          <p 
                            style={{ 
                              fontSize: 'var(--text-sm)',
                              fontWeight: 'var(--font-weight-semibold)',
                              color: 'var(--foreground)',
                              marginBottom: 'var(--space-1)',
                            }}
                          >
                            {item.title}
                          </p>
                          <p 
                            style={{ 
                              fontSize: 'var(--text-xs)',
                              color: 'var(--muted-foreground)',
                              lineHeight: 'var(--leading-relaxed)',
                            }}
                          >
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div 
                    className="p-4 rounded-xl flex items-center gap-3"
                    style={{ 
                      background: 'var(--secondary-50)',
                      border: '1px solid var(--secondary-300)',
                    }}
                  >
                    <span style={{ fontSize: 'var(--text-2xl)' }}>⏱️</span>
                    <p 
                      style={{ 
                        fontSize: 'var(--text-sm)',
                        color: 'var(--foreground)',
                        lineHeight: 'var(--leading-relaxed)',
                      }}
                    >
                      <strong>Temps estimé :</strong> {totalDuration} minutes • <strong>Badge délivré sous 48h</strong> après soumission avec feedback personnalisé
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-6">
              {projectSteps.map((step) => {
                const textLength = stepData[step.id]?.trim().length || 0;
                const isCompleted = textLength >= 50; // Minimum 50 characters
                const files = uploadedFiles[step.id] || [];

                return (
                  <div
                    key={step.id}
                    className="rounded-3xl overflow-hidden transition-all duration-300"
                    style={{
                      background: 'white',
                      border: `2px solid ${isCompleted ? 'var(--success)' : 'var(--border)'}`,
                      boxShadow: isCompleted 
                        ? '0 4px 16px rgba(34, 197, 94, 0.15)' 
                        : '0 2px 8px rgba(0, 0, 0, 0.04)',
                    }}
                  >
                    {/* Step Header */}
                    <div 
                      className="p-6"
                      style={{
                        background: isCompleted ? 'var(--success-50)' : 'var(--neutral-50)',
                        borderBottom: '1px solid var(--border)',
                      }}
                    >
                      <div className="flex items-start gap-4">
                        {/* Number badge */}
                        <div 
                          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                          style={{ 
                            background: isCompleted ? 'var(--success)' : 'var(--primary)',
                            boxShadow: isCompleted 
                              ? '0 4px 12px rgba(34, 197, 94, 0.25)' 
                              : '0 4px 12px rgba(85, 161, 180, 0.25)',
                          }}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-7 h-7 text-white" />
                          ) : (
                            <span 
                              className="text-white"
                              style={{ 
                                fontFamily: 'var(--font-display)',
                                fontWeight: 'var(--font-weight-bold)',
                                fontSize: 'var(--text-2xl)',
                              }}
                            >
                              {step.number}
                            </span>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 
                              style={{ 
                                fontFamily: 'var(--font-display)',
                                fontSize: 'var(--text-xl)',
                                fontWeight: 'var(--font-weight-bold)',
                                color: 'var(--foreground)',
                              }}
                            >
                              {step.title}
                            </h3>
                            <span 
                              className="px-3 py-1.5 rounded-lg flex-shrink-0 ml-4"
                              style={{
                                background: 'var(--neutral-100)',
                                color: 'var(--muted-foreground)',
                                fontSize: 'var(--text-xs)',
                                fontWeight: 'var(--font-weight-semibold)',
                              }}
                            >
                              ⏱️ {step.duration}
                            </span>
                          </div>
                          <p 
                            style={{ 
                              fontSize: 'var(--text-sm)',
                              color: 'var(--muted-foreground)',
                              lineHeight: 'var(--leading-relaxed)',
                            }}
                          >
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="p-6">
                      {/* Text Area - Design Amélioré */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <label 
                            style={{ 
                              fontSize: 'var(--text-base)',
                              fontWeight: 'var(--font-weight-semibold)',
                              color: 'var(--foreground)',
                            }}
                          >
                            📝 Votre réponse
                          </label>
                          <div className="flex items-center gap-2">
                            <span 
                              className="px-3 py-1.5 rounded-lg"
                              style={{ 
                                fontSize: 'var(--text-xs)',
                                fontWeight: 'var(--font-weight-semibold)',
                                color: textLength >= 50 ? 'var(--success)' : 'var(--muted-foreground)',
                                background: textLength >= 50 ? 'var(--success-50)' : 'var(--neutral-100)',
                              }}
                            >
                              {textLength} / 50 min.
                            </span>
                            {textLength >= 50 && (
                              <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--success)' }} />
                            )}
                          </div>
                        </div>
                        
                        {/* Guidelines collapse */}
                        <details className="mb-3">
                          <summary 
                            className="cursor-pointer px-4 py-3 rounded-xl transition-colors"
                            style={{ 
                              background: 'var(--primary-50)',
                              color: 'var(--primary)',
                              fontSize: 'var(--text-sm)',
                              fontWeight: 'var(--font-weight-semibold)',
                              listStyle: 'none',
                            }}
                          >
                            💡 Afficher les consignes détaillées
                          </summary>
                          <div 
                            className="mt-3 p-4 rounded-xl"
                            style={{ 
                              background: 'var(--neutral-50)',
                              border: '1px solid var(--border)',
                            }}
                          >
                            <pre 
                              style={{ 
                                fontSize: 'var(--text-xs)',
                                color: 'var(--muted-foreground)',
                                lineHeight: 'var(--leading-relaxed)',
                                fontFamily: 'var(--font-body)',
                                whiteSpace: 'pre-wrap',
                                margin: 0,
                              }}
                            >
                              {step.placeholder}
                            </pre>
                          </div>
                        </details>

                        <textarea
                          value={stepData[step.id] || ''}
                          onChange={(e) => handleTextChange(step.id, e.target.value)}
                          placeholder="Commencez à rédiger votre réponse ici..."
                          rows={14}
                          className="w-full p-5 rounded-xl transition-all duration-300 focus:outline-none"
                          style={{
                            background: 'white',
                            border: '2px solid var(--border)',
                            color: 'var(--foreground)',
                            fontSize: 'var(--text-base)',
                            fontFamily: 'var(--font-body)',
                            lineHeight: '1.8',
                            resize: 'vertical',
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = 'var(--primary)';
                            e.target.style.boxShadow = '0 0 0 4px rgba(85, 161, 180, 0.1)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = 'var(--border)';
                            e.target.style.boxShadow = 'none';
                          }}
                        />
                      </div>

                      {/* File Upload */}
                      <div>
                        <label 
                          style={{ 
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--foreground)',
                            display: 'block',
                            marginBottom: 'var(--space-2)',
                          }}
                        >
                          Documents complémentaires (optionnel)
                        </label>
                        
                        {/* Upload button */}
                        <label 
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-300"
                          style={{
                            background: 'var(--neutral-100)',
                            border: '2px dashed var(--border)',
                            color: 'var(--foreground)',
                            fontWeight: 'var(--font-weight-medium)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--primary)';
                            e.currentTarget.style.background = 'var(--primary-50)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border)';
                            e.currentTarget.style.background = 'var(--neutral-100)';
                          }}
                        >
                          <Upload className="w-4 h-4" />
                          Ajouter des fichiers
                          <input
                            type="file"
                            multiple
                            onChange={(e) => handleFileUpload(step.id, e.target.files)}
                            className="hidden"
                            accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
                          />
                        </label>

                        {/* Uploaded files */}
                        {files.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {files.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 rounded-lg"
                                style={{
                                  background: 'var(--neutral-50)',
                                  border: '1px solid var(--border)',
                                }}
                              >
                                <div className="flex items-center gap-3">
                                  <div 
                                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                                    style={{ background: 'var(--primary-100)' }}
                                  >
                                    {file.type.startsWith('image/') ? (
                                      <ImageIcon className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                                    ) : (
                                      <FileText className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                                    )}
                                  </div>
                                  <div>
                                    <p 
                                      style={{ 
                                        fontSize: 'var(--text-sm)',
                                        fontWeight: 'var(--font-weight-medium)',
                                        color: 'var(--foreground)',
                                      }}
                                    >
                                      {file.name}
                                    </p>
                                    <p 
                                      style={{ 
                                        fontSize: 'var(--text-xs)',
                                        color: 'var(--muted-foreground)',
                                      }}
                                    >
                                      {(file.size / 1024).toFixed(1)} KB
                                    </p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => removeFile(step.id, index)}
                                  className="p-2 rounded-lg transition-colors"
                                  style={{ 
                                    color: 'var(--muted-foreground)',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'var(--destructive-50)';
                                    e.currentTarget.style.color = 'var(--destructive)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = 'var(--muted-foreground)';
                                  }}
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Submit section */}
            <div 
              className="rounded-3xl p-10 mt-10 text-center"
              style={{
                background: 'white',
                border: '2px solid var(--border)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              }}
            >
              <div 
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ 
                  background: 'linear-gradient(135deg, var(--secondary) 0%, var(--accent) 100%)',
                }}
              >
                <Award className="w-10 h-10 text-white" />
              </div>
              
              <h3 
                className="mb-3"
                style={{ 
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}
              >
                Prêt à obtenir votre badge Prompt Designer ?
              </h3>
              
              <p 
                className="mb-8 max-w-2xl mx-auto"
                style={{ 
                  fontSize: 'var(--text-base)',
                  color: 'var(--muted-foreground)',
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >
                Votre projet sera évalué par notre équipe pédagogique sous <strong>48h</strong>. Vous recevrez votre badge <strong>Prompt Designer</strong> ainsi qu'un <strong>feedback personnalisé et constructif</strong> sur vos prompts et votre stratégie.
              </p>

              <div className="flex items-center justify-center gap-4">
                <Button 
                  onClick={handleSave}
                  className="gap-2"
                  style={{ 
                    background: 'var(--neutral-200)',
                    color: 'var(--foreground)',
                    fontWeight: 'var(--font-weight-semibold)',
                  }}
                >
                  <Save className="w-4 h-4" />
                  Sauvegarder le brouillon
                </Button>
                
                <Button 
                  disabled={completedSteps < projectSteps.length}
                  className="gap-2"
                  style={{ 
                    background: completedSteps >= projectSteps.length ? 'var(--secondary)' : 'var(--neutral-300)',
                    color: 'white',
                    fontWeight: 'var(--font-weight-semibold)',
                    cursor: completedSteps >= projectSteps.length ? 'pointer' : 'not-allowed',
                  }}
                >
                  <Send className="w-4 h-4" />
                  Soumettre mon projet
                </Button>
              </div>
              
              {completedSteps < projectSteps.length && (
                <p 
                  className="mt-4"
                  style={{ 
                    fontSize: 'var(--text-sm)',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  Il vous reste {projectSteps.length - completedSteps} étape{projectSteps.length - completedSteps > 1 ? 's' : ''} à compléter (minimum 50 caractères par étape)
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}