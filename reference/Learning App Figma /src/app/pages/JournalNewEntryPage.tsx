import { useState } from 'react';
import { 
  ArrowLeft,
  Plus,
  X,
  Sparkles,
  BookMarked
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { BackgroundBlobs } from '../components/ui/background-blobs';
import OptimizedSidebar from '../components/ui/optimized-sidebar';

interface JournalNewEntryPageProps {
  onNavigate: (page: 'dashboard' | 'parcours' | 'coaching' | 'learning-space' | 'profile' | 'veille' | 'entreprise-dashboard' | 'journal' | 'journal-new-entry' | 'journal-detail' | 'account') => void;
  onLogout: () => void;
}

export default function JournalNewEntryPage({ onNavigate, onLogout }: JournalNewEntryPageProps) {
  const [linkedExercise, setLinkedExercise] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showFast, setShowFast] = useState(false);
  const [fastData, setFastData] = useState({
    faits: '',
    analyse: '',
    sentiments: '',
    transfert: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('⚠️ Veuillez remplir le titre de votre réflexion');
      return;
    }

    const formData = {
      linkedExercise,
      title,
      description,
      fast: showFast ? fastData : null,
      createdAt: new Date().toISOString(),
      status: 'published',
    };

    console.log('✅ Entry published:', formData);
    alert(`✅ Entrée publiée avec succès !\n\nTitre: ${title}\n\nVotre réflexion a été enregistrée dans votre journal de bord.`);
    
    // Navigate back to journal
    onNavigate('journal');
  };

  const handleSaveDraft = () => {
    const formData = {
      linkedExercise,
      title,
      description,
      fast: showFast ? fastData : null,
      createdAt: new Date().toISOString(),
      status: 'draft',
    };

    console.log('💾 Draft saved:', formData);
    alert('💾 Brouillon enregistré !\n\nVous pourrez continuer à travailler sur cette entrée plus tard.');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <BackgroundBlobs />

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <OptimizedSidebar
          currentPage="journal"
          onNavigate={onNavigate}
          onLogout={onLogout}
          userHasEnterpriseAccess={true}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-8">
            {/* Header */}
            <div className="mb-8">
              <Button
                variant="outline"
                className="mb-6 gap-2"
                onClick={() => onNavigate('journal')}
              >
                <ArrowLeft className="w-4 h-4" />
                Retour au journal
              </Button>

              <h1 
                className="text-4xl mb-2"
                style={{ color: 'var(--foreground)' }}
              >
                Nouvelle entrée de journal
              </h1>
              <p style={{ color: 'var(--muted-foreground)' }}>
                Documentez vos réflexions et apprentissages
              </p>
            </div>

            {/* Form */}
            <div
              className="rounded-3xl p-8"
              style={{
                background: 'white',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              }}
            >
              <form onSubmit={handleSubmit}>
                {/* Linked Exercise */}
                <div className="mb-8">
                  <label 
                    htmlFor="linkedExercise"
                    className="block text-base mb-3"
                    style={{ color: 'var(--foreground)' }}
                  >
                    Lier à un exercice (optionnel)
                  </label>
                  <select
                    id="linkedExercise"
                    value={linkedExercise}
                    onChange={(e) => setLinkedExercise(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300"
                    style={{
                      background: 'white',
                      borderColor: 'rgba(0, 0, 0, 0.1)',
                      color: 'var(--foreground)',
                    }}
                  >
                    <option value="">-- Nouvelle entrée libre --</option>
                    <option value="prompt-basics">Étape 1 - La méthode simple pour bien prompter</option>
                    <option value="prompt-mastery">Étape 2 - Enjeux de la maîtrise du prompt</option>
                    <option value="ai-ethics">Étape 3 - IA et éthique dans la formation</option>
                    <option value="pedagogical-ai">Étape 4 - IA pédagogique avancée</option>
                  </select>
                  <p 
                    className="text-sm mt-2"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    Associez cette entrée à une leçon spécifique pour faciliter le suivi
                  </p>
                </div>

                {/* Title */}
                <div className="mb-8">
                  <label 
                    htmlFor="title"
                    className="block text-base mb-3"
                    style={{ color: 'var(--foreground)' }}
                  >
                    Titre de votre réflexion <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Mes premiers tests de prompts avec ChatGPT"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300"
                    style={{
                      background: 'white',
                      borderColor: 'rgba(0, 0, 0, 0.1)',
                      color: 'var(--foreground)',
                    }}
                  />
                  <p 
                    className="text-sm mt-2"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    Donnez un titre clair et descriptif à votre entrée
                  </p>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <label 
                    htmlFor="description"
                    className="block text-base mb-3"
                    style={{ color: 'var(--foreground)' }}
                  >
                    Description de votre action
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Décrivez ce que vous avez appris, testé ou découvert...

• Quels concepts avez-vous compris ?
• Quelles expérimentations avez-vous réalisées ?
• Quelles difficultés avez-vous rencontrées ?
• Quelles sont vos prochaines étapes ?"
                    rows={10}
                    className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 resize-vertical"
                    style={{
                      background: 'white',
                      borderColor: 'rgba(0, 0, 0, 0.1)',
                      color: 'var(--foreground)',
                      lineHeight: '1.6',
                    }}
                  />
                  <p 
                    className="text-sm mt-2"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    Partagez vos insights, questions et réflexions de manière libre
                  </p>
                </div>

                {/* FAST Analysis Section */}
                <div 
                  className="mb-8 pt-8 border-t-2"
                  style={{ borderColor: 'rgba(0, 0, 0, 0.05)' }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 
                      className="text-xl"
                      style={{ color: 'var(--foreground)' }}
                    >
                      Analyse réflexive (Modèle FAST)
                    </h3>
                    <Button
                      type="button"
                      variant="outline"
                      className="gap-2"
                      onClick={() => setShowFast(!showFast)}
                      style={{
                        background: showFast ? 'rgba(85, 161, 180, 0.1)' : 'transparent',
                        borderColor: 'rgba(85, 161, 180, 0.2)',
                        color: 'var(--primary)',
                      }}
                    >
                      {showFast ? (
                        <>
                          <X className="w-4 h-4" />
                          Masquer
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          Ajouter
                        </>
                      )}
                    </Button>
                  </div>

                  {showFast && (
                    <div className="space-y-6">
                      {/* F - Faits */}
                      <div 
                        className="p-6 rounded-2xl border"
                        style={{
                          background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.03), rgba(85, 161, 180, 0.08))',
                          borderColor: 'rgba(85, 161, 180, 0.15)',
                        }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg"
                            style={{
                              background: 'var(--gradient-primary)',
                              boxShadow: '0 4px 12px rgba(85, 161, 180, 0.3)',
                            }}
                          >
                            F
                          </div>
                          <div>
                            <h4 
                              className="text-lg"
                              style={{ color: 'var(--foreground)' }}
                            >
                              Faits
                            </h4>
                            <p 
                              className="text-sm"
                              style={{ color: 'var(--muted-foreground)' }}
                            >
                              Qu'est-ce qui s'est passé ?
                            </p>
                          </div>
                        </div>
                        <textarea
                          value={fastData.faits}
                          onChange={(e) => setFastData({ ...fastData, faits: e.target.value })}
                          placeholder="Décrivez objectivement la situation, les événements, ce que vous avez fait..."
                          rows={6}
                          className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 resize-vertical"
                          style={{
                            background: 'white',
                            borderColor: 'rgba(0, 0, 0, 0.1)',
                            color: 'var(--foreground)',
                          }}
                        />
                      </div>

                      {/* A - Analyse */}
                      <div 
                        className="p-6 rounded-2xl border"
                        style={{
                          background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.03), rgba(85, 161, 180, 0.08))',
                          borderColor: 'rgba(85, 161, 180, 0.15)',
                        }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg"
                            style={{
                              background: 'var(--gradient-primary)',
                              boxShadow: '0 4px 12px rgba(85, 161, 180, 0.3)',
                            }}
                          >
                            A
                          </div>
                          <div>
                            <h4 
                              className="text-lg"
                              style={{ color: 'var(--foreground)' }}
                            >
                              Analyse
                            </h4>
                            <p 
                              className="text-sm"
                              style={{ color: 'var(--muted-foreground)' }}
                            >
                              Pourquoi cela s'est-il passé ainsi ?
                            </p>
                          </div>
                        </div>
                        <textarea
                          value={fastData.analyse}
                          onChange={(e) => setFastData({ ...fastData, analyse: e.target.value })}
                          placeholder="Analysez les causes, les raisons, les facteurs qui ont influencé la situation..."
                          rows={6}
                          className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 resize-vertical"
                          style={{
                            background: 'white',
                            borderColor: 'rgba(0, 0, 0, 0.1)',
                            color: 'var(--foreground)',
                          }}
                        />
                      </div>

                      {/* S - Sentiments */}
                      <div 
                        className="p-6 rounded-2xl border"
                        style={{
                          background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.03), rgba(85, 161, 180, 0.08))',
                          borderColor: 'rgba(85, 161, 180, 0.15)',
                        }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg"
                            style={{
                              background: 'var(--gradient-primary)',
                              boxShadow: '0 4px 12px rgba(85, 161, 180, 0.3)',
                            }}
                          >
                            S
                          </div>
                          <div>
                            <h4 
                              className="text-lg"
                              style={{ color: 'var(--foreground)' }}
                            >
                              Sentiments
                            </h4>
                            <p 
                              className="text-sm"
                              style={{ color: 'var(--muted-foreground)' }}
                            >
                              Qu'avez-vous ressenti ?
                            </p>
                          </div>
                        </div>
                        <textarea
                          value={fastData.sentiments}
                          onChange={(e) => setFastData({ ...fastData, sentiments: e.target.value })}
                          placeholder="Exprimez vos émotions, vos ressentis, vos impressions pendant et après l'expérience..."
                          rows={6}
                          className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 resize-vertical"
                          style={{
                            background: 'white',
                            borderColor: 'rgba(0, 0, 0, 0.1)',
                            color: 'var(--foreground)',
                          }}
                        />
                      </div>

                      {/* T - Transfert */}
                      <div 
                        className="p-6 rounded-2xl border"
                        style={{
                          background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.03), rgba(85, 161, 180, 0.08))',
                          borderColor: 'rgba(85, 161, 180, 0.15)',
                        }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg"
                            style={{
                              background: 'var(--gradient-primary)',
                              boxShadow: '0 4px 12px rgba(85, 161, 180, 0.3)',
                            }}
                          >
                            T
                          </div>
                          <div>
                            <h4 
                              className="text-lg"
                              style={{ color: 'var(--foreground)' }}
                            >
                              Transfert
                            </h4>
                            <p 
                              className="text-sm"
                              style={{ color: 'var(--muted-foreground)' }}
                            >
                              Comment allez-vous utiliser cet apprentissage ?
                            </p>
                          </div>
                        </div>
                        <textarea
                          value={fastData.transfert}
                          onChange={(e) => setFastData({ ...fastData, transfert: e.target.value })}
                          placeholder="Décrivez comment vous allez réutiliser ces apprentissages dans votre pratique professionnelle..."
                          rows={6}
                          className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 resize-vertical"
                          style={{
                            background: 'white',
                            borderColor: 'rgba(0, 0, 0, 0.1)',
                            color: 'var(--foreground)',
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Form Actions */}
                <div 
                  className="flex gap-4 pt-8 border-t-2"
                  style={{ borderColor: 'rgba(0, 0, 0, 0.05)' }}
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSaveDraft}
                    className="flex-none"
                  >
                    Enregistrer comme brouillon
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    style={{
                      background: 'var(--primary)',
                      color: 'white',
                      boxShadow: '0 4px 12px rgba(85, 161, 180, 0.3)',
                    }}
                  >
                    Publier l'entrée
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}