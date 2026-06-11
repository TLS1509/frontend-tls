/**
 * Cookie Consent Banner - The Learning Society
 * Composant RGPD pour la gestion du consentement cookies
 */

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { X, Cookie, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CookieConsentProps {
  onAccept?: () => void;
  onDecline?: () => void;
}

export function CookieConsent({ onAccept, onDecline }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Vérifier si le consentement a déjà été donné
    const consent = localStorage.getItem('tls-cookie-consent');
    if (!consent) {
      // Attendre un peu avant d'afficher le banner
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('tls-cookie-consent', 'accepted');
    setIsVisible(false);
    onAccept?.();
  };

  const handleDecline = () => {
    localStorage.setItem('tls-cookie-consent', 'declined');
    setIsVisible(false);
    onDecline?.();
  };

  const handleCustomize = () => {
    setShowDetails(!showDetails);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
        >
          <div 
            className="max-w-6xl mx-auto backdrop-blur-xl border-2 rounded-2xl shadow-2xl overflow-hidden"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderColor: 'var(--border)',
            }}
          >
            {/* Header */}
            <div className="relative p-6 pb-4">
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" style={{ color: 'var(--neutral-600)' }} />
              </button>

              <div className="flex items-start gap-4 pr-10">
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--primary-100)' }}
                >
                  <Cookie className="w-6 h-6" style={{ color: 'var(--primary-600)' }} />
                </div>

                <div className="flex-1">
                  <h3 
                    className="mb-2"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                      lineHeight: 'var(--leading-tight)',
                    }}
                  >
                    Nous respectons votre vie privée
                  </h3>
                  <p 
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--neutral-600)',
                      lineHeight: 'var(--leading-relaxed)',
                    }}
                  >
                    Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic. 
                    En cliquant sur "Accepter", vous consentez à l'utilisation de tous les cookies.
                  </p>
                </div>
              </div>
            </div>

            {/* Details (Collapsible) */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                  style={{ borderTop: '1px solid var(--border)' }}
                >
                  <div className="p-6 pt-4 space-y-4">
                    {/* Cookies essentiels */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked
                        disabled
                        className="mt-1"
                        style={{ accentColor: 'var(--primary)' }}
                      />
                      <div className="flex-1">
                        <h4 
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--foreground)',
                            marginBottom: 'var(--space-1)',
                          }}
                        >
                          Cookies essentiels (Obligatoires)
                        </h4>
                        <p 
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-xs)',
                            color: 'var(--neutral-600)',
                          }}
                        >
                          Nécessaires au fonctionnement du site (navigation, sécurité).
                        </p>
                      </div>
                    </div>

                    {/* Cookies analytiques */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="mt-1"
                        style={{ accentColor: 'var(--primary)' }}
                      />
                      <div className="flex-1">
                        <h4 
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--foreground)',
                            marginBottom: 'var(--space-1)',
                          }}
                        >
                          Cookies analytiques
                        </h4>
                        <p 
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-xs)',
                            color: 'var(--neutral-600)',
                          }}
                        >
                          Nous aident à comprendre comment vous utilisez notre site (Google Analytics).
                        </p>
                      </div>
                    </div>

                    {/* Privacy notice */}
                    <div 
                      className="flex items-center gap-2 p-3 rounded-lg"
                      style={{ backgroundColor: 'var(--neutral-50)' }}
                    >
                      <Shield className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--primary)' }} />
                      <p 
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--neutral-700)',
                        }}
                      >
                        Vos données sont anonymisées et ne seront jamais vendues à des tiers.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div 
              className="p-6 pt-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              <button
                onClick={handleCustomize}
                className="text-left sm:text-center order-2 sm:order-1"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--primary)',
                  textDecoration: 'underline',
                }}
              >
                {showDetails ? 'Masquer les détails' : 'Personnaliser'}
              </button>

              <div className="flex gap-3 order-1 sm:order-2">
                <Button
                  variant="outline"
                  onClick={handleDecline}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                >
                  Refuser
                </Button>
                <Button
                  onClick={handleAccept}
                  style={{
                    background: 'var(--gradient-primary)',
                    color: 'var(--primary-foreground)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                  }}
                >
                  Accepter tout
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
