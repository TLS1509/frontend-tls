/**
 * Analytics Dashboard - The Learning Society
 * Composant de monitoring des événements (dev mode only)
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart3, X, TrendingUp, Users, MousePointer, Clock } from 'lucide-react';
import { Button } from './ui/button';

interface AnalyticsEvent {
  timestamp: Date;
  eventName: string;
  params?: Record<string, any>;
}

export function AnalyticsDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    pageViews: 0,
    clicks: 0,
    avgTimeOnPage: 0,
  });

  useEffect(() => {
    // Intercepter les événements GA4 en dev mode
    if (process.env.NODE_ENV !== 'development') return;

    const originalDataLayer = window.dataLayer || [];
    const eventsLog: AnalyticsEvent[] = [];

    // Override push pour capturer les événements
    const originalPush = originalDataLayer.push;
    originalDataLayer.push = function (...args: any[]) {
      const event = args[0];
      
      if (Array.isArray(event) && event[0] === 'event') {
        eventsLog.push({
          timestamp: new Date(),
          eventName: event[1] as string,
          params: event[2],
        });

        setEvents([...eventsLog].reverse().slice(0, 50)); // Garder les 50 derniers

        // Update stats
        setStats(prev => ({
          totalEvents: prev.totalEvents + 1,
          pageViews: event[1] === 'page_view' ? prev.pageViews + 1 : prev.pageViews,
          clicks: event[1]?.includes('click') ? prev.clicks + 1 : prev.clicks,
          avgTimeOnPage: prev.avgTimeOnPage,
        }));
      }

      return originalPush.apply(originalDataLayer, args);
    };

    return () => {
      originalDataLayer.push = originalPush;
    };
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9998] p-4 rounded-full shadow-2xl backdrop-blur-xl border-2"
        style={{
          backgroundColor: 'rgba(85, 161, 180, 0.9)',
          borderColor: 'var(--primary-300)',
          color: 'white',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Analytics Dashboard (Dev Only)"
      >
        <BarChart3 className="w-6 h-6" />
      </motion.button>

      {/* Dashboard Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md z-[9999] shadow-2xl backdrop-blur-xl border-l-2 overflow-hidden"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              borderColor: 'var(--border)',
            }}
          >
            {/* Header */}
            <div 
              className="p-6 border-b-2 flex items-center justify-between"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--primary-100)' }}
                >
                  <BarChart3 className="w-5 h-5" style={{ color: 'var(--primary-600)' }} />
                </div>
                <div>
                  <h2 
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    Analytics Dashboard
                  </h2>
                  <p 
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--neutral-500)',
                    }}
                  >
                    Dev Mode Only
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-black/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 p-6">
              <div 
                className="p-4 rounded-xl"
                style={{ backgroundColor: 'var(--primary-50)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4" style={{ color: 'var(--primary-600)' }} />
                  <span 
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--neutral-600)',
                    }}
                  >
                    Total Events
                  </span>
                </div>
                <div 
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--primary-700)',
                  }}
                >
                  {stats.totalEvents}
                </div>
              </div>

              <div 
                className="p-4 rounded-xl"
                style={{ backgroundColor: 'var(--secondary-50)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4" style={{ color: 'var(--secondary-600)' }} />
                  <span 
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--neutral-600)',
                    }}
                  >
                    Page Views
                  </span>
                </div>
                <div 
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--secondary-700)',
                  }}
                >
                  {stats.pageViews}
                </div>
              </div>

              <div 
                className="p-4 rounded-xl"
                style={{ backgroundColor: 'var(--accent-50)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <MousePointer className="w-4 h-4" style={{ color: 'var(--accent-600)' }} />
                  <span 
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--neutral-600)',
                    }}
                  >
                    Clicks
                  </span>
                </div>
                <div 
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--accent-700)',
                  }}
                >
                  {stats.clicks}
                </div>
              </div>

              <div 
                className="p-4 rounded-xl"
                style={{ backgroundColor: 'var(--neutral-50)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4" style={{ color: 'var(--neutral-600)' }} />
                  <span 
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--neutral-600)',
                    }}
                  >
                    Avg Time
                  </span>
                </div>
                <div 
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--neutral-700)',
                  }}
                >
                  {stats.avgTimeOnPage}s
                </div>
              </div>
            </div>

            {/* Events List */}
            <div className="flex-1 overflow-auto p-6 pt-0">
              <h3 
                className="mb-4"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--foreground)',
                }}
              >
                Recent Events
              </h3>

              <div className="space-y-2">
                {events.length === 0 ? (
                  <p 
                    className="text-center py-8"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--neutral-500)',
                    }}
                  >
                    No events yet. Interact with the app!
                  </p>
                ) : (
                  events.map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 rounded-lg border"
                      style={{
                        backgroundColor: 'var(--background)',
                        borderColor: 'var(--border)',
                      }}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <span 
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--foreground)',
                          }}
                        >
                          {event.eventName}
                        </span>
                        <span 
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-xs)',
                            color: 'var(--neutral-500)',
                          }}
                        >
                          {event.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      {event.params && (
                        <pre 
                          className="text-xs overflow-auto"
                          style={{
                            fontFamily: 'monospace',
                            color: 'var(--neutral-600)',
                            fontSize: 'var(--text-xs)',
                          }}
                        >
                          {JSON.stringify(event.params, null, 2)}
                        </pre>
                      )}
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Footer */}
            <div 
              className="p-4 border-t-2"
              style={{ borderColor: 'var(--border)' }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEvents([])}
                className="w-full"
              >
                Clear Events
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
