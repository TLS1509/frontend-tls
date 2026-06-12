/**
 * Sticky Scroll Showcase
 * Test page for:
 * - Morphing SVG Visualizer
 * - Counter Animation
 * - Parallax Text Layers
 *
 * Navigate to /marketing/showcase-scroll to test before integrating into main site
 */

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '../../components/core/Button'
import { MorphingSVGVisualizer } from '../../components/marketing/motion/morphing-svg-visualizer'
import { CounterAnimation } from '../../components/marketing/motion/counter-animation'
import { ParallexTextLayers } from '../../components/marketing/motion/parallax-text-layers'

const StickyScrollShowcase: React.FC = () => {
  const [activePanel, setActivePanel] = useState(0)

  const panels = [
    {
      label: 'Learn',
      title: 'Apprendre, à votre rythme.',
      body: 'Un parcours adaptatif qui part de votre niveau réel (échelle Dreyfus) et vous fait progresser sur ce qui compte pour votre métier.',
      color: 'text-secondary-600',
    },
    {
      label: 'Do',
      title: 'Mettre en pratique, sur du concret.',
      body: 'Vous appliquez immédiatement sur vos propres projets. La compétence se construit en faisant, et se prouve sur un livrable réel.',
      color: 'text-secondary-600',
    },
    {
      label: 'Match',
      title: 'Valoriser, et faire matcher.',
      body: 'Chaque acquis enrichit un passeport de compétences vérifiable. Des preuves lisibles, prêtes à relier les bonnes compétences aux bons projets.',
      color: 'text-secondary-600',
    },
  ]

  const currentPanel = panels[activePanel]

  return (
    <div className="min-h-[100dvh] bg-white text-ink-900">
      {/* Header */}
      <section className="bg-ink-900 text-white">
        <div className="max-w-wide mx-auto px-6 py-section-lg">
          <h1 className="font-display font-extrabold text-white leading-[1.08] tracking-tight m-0 text-[clamp(2.25rem,5vw,4rem)] [text-wrap:balance]">
            Animation Effects Showcase
          </h1>
          <p className="font-body text-body-lg text-white/80 mt-stack leading-relaxed max-w-2xl m-0">
            Test 3 motion effects for the Learn → Do → Match section before integrating into the main site.
          </p>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="bg-ink-50">
        <div className="max-w-wide mx-auto px-6 py-page">
          {/* Controls */}
          <div className="mb-section-lg">
            <p className="font-body text-caption font-bold uppercase tracking-widest text-ink-500 m-0 mb-stack">
              Step Controls
            </p>
            <div className="flex items-center gap-stack-xs">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActivePanel(Math.max(0, activePanel - 1))}
                disabled={activePanel === 0}
              >
                <ChevronUp size={18} />
              </Button>
              <p className="font-body text-body font-semibold text-ink-700 m-0 min-w-[120px]">
                {activePanel + 1} / {panels.length}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActivePanel(Math.min(panels.length - 1, activePanel + 1))}
                disabled={activePanel === panels.length - 1}
              >
                <ChevronDown size={18} />
              </Button>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-section lg:gap-page">
            {/* Left: Morphing SVG + Counter */}
            <div className="flex flex-col gap-section-lg">
              <div>
                <p className="font-body text-caption font-semibold uppercase tracking-widest text-ink-500 mb-stack-lg">
                  1. Morphing SVG Visualizer
                </p>
                <div className="rounded-2xl bg-white ring-1 ring-ink-200 p-section-lg flex items-center justify-center min-h-[320px]">
                  <MorphingSVGVisualizer
                    activeIndex={activePanel}
                    size={140}
                    colorClass="text-secondary-600"
                  />
                </div>
              </div>

              <div>
                <p className="font-body text-caption font-semibold uppercase tracking-widest text-ink-500 mb-stack-lg">
                  2. Counter Animation
                </p>
                <div className="rounded-2xl bg-white ring-1 ring-ink-200 p-section-lg">
                  <CounterAnimation
                    currentStep={activePanel}
                    totalSteps={3}
                    label="Étape"
                    colorClass="text-secondary-600"
                  />
                  <p className="font-body text-body text-ink-600 mt-stack-lg m-0">
                    Number animates up/down as you change steps
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Parallax Text Layers */}
            <div>
              <p className="font-body text-caption font-semibold uppercase tracking-widest text-ink-500 mb-stack-lg">
                3. Parallax Text Layers (scroll this section ↓)
              </p>
              <div className="rounded-2xl bg-white ring-1 ring-ink-200 p-section-lg">
                <div className="overflow-hidden rounded-xl bg-gradient-to-br from-secondary-50 to-primary-50 px-section-lg py-page">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePanel}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <ParallexTextLayers
                        eyebrow={
                          <span>
                            {currentPanel.label}{' '}
                            <span className="font-body text-caption font-normal text-ink-500">
                              — Scroll to see parallax effect
                            </span>
                          </span>
                        }
                        title={currentPanel.title}
                        body={currentPanel.body}
                        eyebrowSpeed={0.2}
                        titleSpeed={0.4}
                        bodySpeed={0.6}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="bg-white">
        <div className="max-w-wide mx-auto px-6 py-section-lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-section">
            {/* Morphing SVG */}
            <div>
              <h3 className="font-display font-bold text-ink-900 text-h3 m-0 mb-stack">
                Morphing SVG
              </h3>
              <p className="font-body text-body text-ink-600 leading-relaxed m-0">
                <strong>What:</strong> SVG shape transforms from loop → circle → path as you change steps.
              </p>
              <p className="font-body text-body text-ink-600 leading-relaxed m-0 mt-2">
                <strong>Why:</strong> Adds organic, visual feedback. Perfect for Direction C (warm, hand-drawn).
              </p>
              <p className="font-body text-body text-ink-600 leading-relaxed m-0 mt-2">
                <strong>Use in:</strong> Replace static LearnDoMatchVisual with animated version
              </p>
            </div>

            {/* Counter */}
            <div>
              <h3 className="font-display font-bold text-ink-900 text-h3 m-0 mb-stack">
                Counter Animation
              </h3>
              <p className="font-body text-body text-ink-600 leading-relaxed m-0">
                <strong>What:</strong> Number slides up/down with fade transition. Shows "Step 1/3", etc.
              </p>
              <p className="font-body text-body text-ink-600 leading-relaxed m-0 mt-2">
                <strong>Why:</strong> Shows progress visually. Subtle, elegant feedback.
              </p>
              <p className="font-body text-body text-ink-600 leading-relaxed m-0 mt-2">
                <strong>Use in:</strong> Top of StickyScrollStory section
              </p>
            </div>

            {/* Parallax Text */}
            <div>
              <h3 className="font-display font-bold text-ink-900 text-h3 m-0 mb-stack">
                Parallax Text Layers
              </h3>
              <p className="font-body text-body text-ink-600 leading-relaxed m-0">
                <strong>What:</strong> Eyebrow, title, body move at different scroll speeds (depth effect).
              </p>
              <p className="font-body text-body text-ink-600 leading-relaxed m-0 mt-2">
                <strong>Why:</strong> Creates 3D cinematic feel. Text feels layered.
              </p>
              <p className="font-body text-body text-ink-600 leading-relaxed m-0 mt-2">
                <strong>Use in:</strong> Replace current text in Learn → Do → Match
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="bg-ink-50">
        <div className="max-w-wide mx-auto px-6 py-section-lg">
          <h2 className="font-display font-bold text-ink-900 text-h2 m-0 mb-section">
            How to Integrate
          </h2>

          <div className="space-y-section-lg">
            <div className="rounded-2xl bg-white ring-1 ring-ink-200 p-section-lg">
              <h3 className="font-display font-bold text-ink-900 text-h4 m-0 mb-stack">
                Step 1: Import Components
              </h3>
              <pre className="bg-ink-900 text-ink-100 p-4 rounded-lg overflow-x-auto font-mono text-body-sm m-0">
{`import { MorphingSVGVisualizer } from '@/components/marketing/morphing-svg-visualizer'
import { CounterAnimation } from '@/components/marketing/counter-animation'
import { ParallexTextLayers } from '@/components/marketing/parallax-text-layers'`}
              </pre>
            </div>

            <div className="rounded-2xl bg-white ring-1 ring-ink-200 p-section-lg">
              <h3 className="font-display font-bold text-ink-900 text-h4 m-0 mb-stack">
                Step 2: Use in StickyScrollStory
              </h3>
              <pre className="bg-ink-900 text-ink-100 p-4 rounded-lg overflow-x-auto font-mono text-body-sm m-0">
{`<StickyScrollStory
  panels={STORY}
  visual={(active) => (
    <>
      <CounterAnimation currentStep={active} totalSteps={3} />
      <MorphingSVGVisualizer activeIndex={active} size={140} />
    </>
  )}
  textComponent={(panel) => (
    <ParallexTextLayers
      eyebrow={panel.eyebrow}
      title={panel.title}
      body={panel.body}
    />
  )}
/>`}
              </pre>
            </div>

            <div className="rounded-2xl bg-white ring-1 ring-ink-200 p-section-lg">
              <h3 className="font-display font-bold text-ink-900 text-h4 m-0 mb-stack">
                Files Created
              </h3>
              <ul className="space-y-2 m-0 p-0 list-none">
                <li className="font-body text-body text-ink-700">
                  ✅ <code className="bg-ink-100 px-2 py-1 rounded">/src/components/marketing/morphing-svg-visualizer.tsx</code>
                </li>
                <li className="font-body text-body text-ink-700">
                  ✅ <code className="bg-ink-100 px-2 py-1 rounded">/src/components/marketing/counter-animation.tsx</code>
                </li>
                <li className="font-body text-body text-ink-700">
                  ✅ <code className="bg-ink-100 px-2 py-1 rounded">/src/components/marketing/parallax-text-layers.tsx</code>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testing Tips */}
      <section className="bg-white">
        <div className="max-w-wide mx-auto px-6 py-section-lg border-t border-ink-200">
          <h2 className="font-display font-bold text-ink-900 text-h3 m-0 mb-stack">
            Testing Checklist
          </h2>
          <ul className="space-y-3 m-0 p-0 list-none">
            <li className="flex items-start gap-stack-xs">
              <span className="font-body font-bold text-primary-600 shrink-0">✓</span>
              <span className="font-body text-body text-ink-700">
                Click up/down buttons → Counter number animates smoothly
              </span>
            </li>
            <li className="flex items-start gap-stack-xs">
              <span className="font-body font-bold text-primary-600 shrink-0">✓</span>
              <span className="font-body text-body text-ink-700">
                SVG morphs between 3 shapes (loop → circle → path)
              </span>
            </li>
            <li className="flex items-start gap-stack-xs">
              <span className="font-body font-bold text-primary-600 shrink-0">✓</span>
              <span className="font-body text-body text-ink-700">
                Scroll the text box → eyebrow, title, body move at different speeds
              </span>
            </li>
            <li className="flex items-start gap-stack-xs">
              <span className="font-body font-bold text-primary-600 shrink-0">✓</span>
              <span className="font-body text-body text-ink-700">
                On mobile → all animations are smooth and responsive
              </span>
            </li>
            <li className="flex items-start gap-stack-xs">
              <span className="font-body font-bold text-primary-600 shrink-0">✓</span>
              <span className="font-body text-body text-ink-700">
                With reduced motion enabled → animations are skipped (accessibility ✓)
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default StickyScrollShowcase
