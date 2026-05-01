import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bug, X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface NavigationDebuggerProps {
  currentPage: string;
  onNavigateTest?: (page: string) => void;
}

export default function NavigationDebugger({ currentPage, onNavigateTest }: NavigationDebuggerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [navigationHistory, setNavigationHistory] = useState<Array<{ page: string; timestamp: string }>>([]);

  useEffect(() => {
    const timestamp = new Date().toLocaleTimeString();
    setNavigationHistory(prev => [...prev.slice(-9), { page: currentPage, timestamp }]);
  }, [currentPage]);

  const testPages = [
    'dashboard',
    'veille',
    'newsletter',
    'article',
    'coaching',
    'learning-space',
    'profile',
  ];

  const handleTestNavigate = (page: string) => {
    if (onNavigateTest) {
      console.log('🧪 Test navigation vers:', page);
      onNavigateTest(page);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9999] p-4 rounded-full shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #FF6B6B 0%, #EE5A6F 100%)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Bug className="w-6 h-6 text-white" />
      </motion.button>

      {/* Debug Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed top-0 right-0 bottom-0 w-[400px] z-[9998] shadow-2xl overflow-y-auto"
            style={{
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              borderLeft: '1px solid rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Header */}
            <div
              className="sticky top-0 z-10 px-6 py-4 flex items-center justify-between"
              style={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #EE5A6F 100%)',
                color: 'white',
              }}
            >
              <div className="flex items-center gap-3">
                <Bug className="w-5 h-5" />
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--font-weight-bold)', fontSize: '1.125rem', margin: 0 }}>
                  Debug Navigation
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Current Page */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                  <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--font-weight-semibold)', fontSize: '0.875rem', margin: 0 }}>
                    Page actuelle
                  </h4>
                </div>
                <div
                  className="px-4 py-3 rounded-xl"
                  style={{
                    background: 'rgba(85, 161, 180, 0.1)',
                    border: '1px solid rgba(85, 161, 180, 0.3)',
                  }}
                >
                  <p style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-bold)', fontSize: '1rem', color: 'var(--primary)', margin: 0 }}>
                    {currentPage}
                  </p>
                </div>
              </div>

              {/* Navigation History */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-4 h-4" style={{ color: '#10b981' }} />
                  <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--font-weight-semibold)', fontSize: '0.875rem', margin: 0 }}>
                    Historique
                  </h4>
                </div>
                <div className="space-y-2">
                  {navigationHistory.length === 0 ? (
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--muted-foreground)', fontStyle: 'italic' }}>
                      Aucune navigation encore
                    </p>
                  ) : (
                    navigationHistory.map((item, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 rounded-lg flex items-center justify-between"
                        style={{
                          background: 'rgba(0, 0, 0, 0.03)',
                          border: '1px solid rgba(0, 0, 0, 0.05)',
                        }}
                      >
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 'var(--font-weight-medium)' }}>
                          {item.page}
                        </span>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
                          {item.timestamp}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Test Navigation */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4" style={{ color: '#f59e0b' }} />
                  <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--font-weight-semibold)', fontSize: '0.875rem', margin: 0 }}>
                    Test de navigation
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {testPages.map(page => (
                    <motion.button
                      key={page}
                      onClick={() => handleTestNavigate(page)}
                      className="px-4 py-2 rounded-lg text-left transition-all"
                      style={{
                        background: currentPage === page ? 'var(--primary)' : 'rgba(0, 0, 0, 0.05)',
                        color: currentPage === page ? 'white' : 'var(--foreground)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8125rem',
                        fontWeight: 'var(--font-weight-medium)',
                        border: currentPage === page ? 'none' : '1px solid rgba(0, 0, 0, 0.1)',
                      }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {page}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Newsletter Test */}
              <div
                className="px-4 py-4 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.1) 0%, rgba(237, 132, 58, 0.1) 100%)',
                  border: '2px solid var(--primary)',
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                  <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--font-weight-semibold)', fontSize: '0.875rem', margin: 0 }}>
                    Test Newsletter
                  </h4>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--muted-foreground)', marginBottom: '12px' }}>
                  Cliquez pour tester la navigation vers "Actus de la semaine"
                </p>
                <motion.button
                  onClick={() => handleTestNavigate('newsletter')}
                  className="w-full px-4 py-3 rounded-xl flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, var(--primary) 0%, rgba(85, 161, 180, 0.85) 100%)',
                    color: 'white',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    fontWeight: 'var(--font-weight-semibold)',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(85, 161, 180, 0.3)',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Bug className="w-4 h-4" />
                  Tester Newsletter
                </motion.button>
                {currentPage === 'newsletter' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 px-3 py-2 rounded-lg flex items-center gap-2"
                    style={{
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                    }}
                  >
                    <CheckCircle className="w-4 h-4" style={{ color: '#10b981' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#10b981', fontWeight: 'var(--font-weight-medium)' }}>
                      NewsletterPage active !
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Instructions */}
              <div
                className="px-4 py-3 rounded-xl"
                style={{
                  background: 'rgba(248, 176, 68, 0.1)',
                  border: '1px solid rgba(248, 176, 68, 0.3)',
                }}
              >
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--muted-foreground)', margin: 0, lineHeight: '1.5' }}>
                  💡 <strong>Astuce:</strong> Utilisez ce panneau pour tester la navigation et vérifier que NewsletterPage s'affiche correctement.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
