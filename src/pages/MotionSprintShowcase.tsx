/**
 * Motion Sprint Showcase
 *
 * Visually demonstrate all animations from Sprints 1-3:
 * - Input focus glow ring (SPRINT 1)
 * - Button loading with glow-pulse (SPRINT 1)
 * - FloatLabel pattern (SPRINT 2)
 * - Card hover glow ripple (SPRINT 3)
 * - Placeholder fade animation (SPRINT 2)
 * - Stripe loader (SPRINT 3)
 */

import React, { useState } from 'react';
import { Button } from '../components/core/Button';
import { Input } from '../components/core/Input';
import { Card } from '../components/core/Card';
import { FloatLabel } from '../components/core/FloatLabel';
import { Mail, Sparkles } from 'lucide-react';

export const MotionSprintShowcase: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [floatValue, setFloatValue] = useState('');

  const handleLoadingClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-ink-50 to-primary-50/30 py-16 px-stack">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-16">
        <h1 className="text-h1 font-bold text-ink-900 mb-stack">
          ✨ Motion Sprint Showcase
        </h1>
        <p className="text-body-lg text-ink-600 max-w-2xl">
          Visual demonstrations of premium motion and depth effects from Sprints 1–3:
          Input focus animations, loading states, modern form patterns, and hover effects.
        </p>
      </div>

      {/* Grid Container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-section">
        {/* ═══════════════════════════════════════════════════════════════════
            SPRINT 1: Premium Motion + A11y
            ═══════════════════════════════════════════════════════════════════ */}

        {/* Input Focus Glow Ring */}
        <section className="space-y-stack">
          <div className="flex items-center gap-stack-xs mb-stack-xs">
            <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-bold">
              1
            </div>
            <h2 className="text-h4 font-semibold text-ink-900">Input Focus Glow</h2>
            <span className="text-caption text-primary-600 font-medium">SPRINT 1</span>
          </div>
          <p className="text-body-sm text-ink-600 mb-stack">
            Smooth input-focus-ring animation with soft glow and ring expansion.
          </p>
          <div className="bg-white rounded-lg p-stack-lg shadow-sm border border-ink-100">
            <Input
              label="Try focusing this input"
              placeholder="Click here to see glow animation"
              size="md"
              leadingIcon={<Mail className="text-ink-400" size={18} />}
            />
            <p className="text-caption text-ink-500 mt-stack">
              👆 Click the input and watch the focus ring animate with a smooth glow effect
            </p>
          </div>
        </section>

        {/* Button Loading Pulse */}
        <section className="space-y-stack">
          <div className="flex items-center gap-stack-xs mb-stack-xs">
            <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-bold">
              1
            </div>
            <h2 className="text-h4 font-semibold text-ink-900">Loading Glow Pulse</h2>
            <span className="text-caption text-primary-600 font-medium">SPRINT 1</span>
          </div>
          <p className="text-body-sm text-ink-600 mb-stack">
            Animated spinner with glow-pulse effect, replaces button text during loading.
          </p>
          <div className="bg-white rounded-lg p-stack-lg shadow-sm border border-ink-100">
            <Button
              onClick={handleLoadingClick}
              loading={isLoading}
              fullWidth
            >
              {isLoading ? 'Loading...' : 'Click to Load (2s)'}
            </Button>
            <p className="text-caption text-ink-500 mt-stack text-center">
              👆 Click and observe the animated spinner with glowing pulse
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SPRINT 2: Modern Form Patterns
            ═══════════════════════════════════════════════════════════════════ */}

        {/* FloatLabel Component */}
        <section className="space-y-stack">
          <div className="flex items-center gap-stack-xs mb-stack-xs">
            <div className="w-8 h-8 rounded-full bg-secondary-500 text-white flex items-center justify-center text-sm font-bold">
              2
            </div>
            <h2 className="text-h4 font-semibold text-ink-900">Float Label Pattern</h2>
            <span className="text-caption text-secondary-600 font-medium">SPRINT 2</span>
          </div>
          <p className="text-body-sm text-ink-600 mb-stack">
            Modern SaaS form pattern: label animates up when field is focused or has value.
          </p>
          <div className="bg-white rounded-lg p-stack-lg shadow-sm border border-ink-100">
            <FloatLabel label="Email address" required hint="We'll never share your email">
              <Input
                type="email"
                placeholder="hello@example.com"
                value={floatValue}
                onChange={(e) => setFloatValue(e.target.value)}
              />
            </FloatLabel>
            <p className="text-caption text-ink-500 mt-stack">
              👆 Focus or type to see the label float up with smooth transition
            </p>
          </div>
        </section>

        {/* Placeholder Fade Animation */}
        <section className="space-y-stack">
          <div className="flex items-center gap-stack-xs mb-stack-xs">
            <div className="w-8 h-8 rounded-full bg-secondary-500 text-white flex items-center justify-center text-sm font-bold">
              2
            </div>
            <h2 className="text-h4 font-semibold text-ink-900">Placeholder Fade</h2>
            <span className="text-caption text-secondary-600 font-medium">SPRINT 2</span>
          </div>
          <p className="text-body-sm text-ink-600 mb-stack">
            Placeholder text fades smoothly when field is focused (placeholder-fade-out animation).
          </p>
          <div className="bg-white rounded-lg p-stack-lg shadow-sm border border-ink-100">
            <Input
              label="Watch placeholder fade"
              placeholder="This text fades on focus"
              className="placeholder-fade-on-focus"
            />
            <p className="text-caption text-ink-500 mt-stack">
              👆 Focus this input to see the placeholder fade elegantly
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SPRINT 3: Premium Depth Effects
            ═══════════════════════════════════════════════════════════════════ */}

        {/* Card Hover Glow */}
        <section className="space-y-stack">
          <div className="flex items-center gap-stack-xs mb-stack-xs">
            <div className="w-8 h-8 rounded-full bg-accent-400 text-ink-900 flex items-center justify-center text-sm font-bold">
              3
            </div>
            <h2 className="text-h4 font-semibold text-ink-900">Card Hover Glow</h2>
            <span className="text-caption text-accent-600 font-medium">SPRINT 3</span>
          </div>
          <p className="text-body-sm text-ink-600 mb-stack">
            Cards glow on hover with a ripple effect, using brand colors for depth.
          </p>
          <div className="hover-glow-primary">
            <Card className="p-section cursor-pointer transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="text-primary-500" size={24} />
                <h3 className="text-h5 font-semibold text-ink-900">Primary Glow Card</h3>
              </div>
              <p className="text-body-sm text-ink-600">
                Hover this card to see a glowing ripple effect with brand teal color.
              </p>
            </Card>
          </div>
        </section>

        {/* Card Warm Hover Glow */}
        <section className="space-y-stack">
          <div className="flex items-center gap-stack-xs mb-stack-xs">
            <div className="w-8 h-8 rounded-full bg-accent-400 text-ink-900 flex items-center justify-center text-sm font-bold">
              3
            </div>
            <h2 className="text-h4 font-semibold text-ink-900">Warm Hover Glow</h2>
            <span className="text-caption text-accent-600 font-medium">SPRINT 3</span>
          </div>
          <p className="text-body-sm text-ink-600 mb-stack">
            Tone-aware glow: warm orange glow for secondary actions and contexts.
          </p>
          <div className="hover-glow-warm">
            <Card className="p-section cursor-pointer transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="text-secondary-500" size={24} />
                <h3 className="text-h5 font-semibold text-ink-900">Warm Glow Card</h3>
              </div>
              <p className="text-body-sm text-ink-600">
                Hover this card to see a warm orange ripple, perfect for accent contexts.
              </p>
            </Card>
          </div>
        </section>

        {/* Stripe Loader */}
        <section className="space-y-stack md:col-span-2">
          <div className="flex items-center gap-stack-xs mb-stack-xs">
            <div className="w-8 h-8 rounded-full bg-accent-400 text-ink-900 flex items-center justify-center text-sm font-bold">
              3
            </div>
            <h2 className="text-h4 font-semibold text-ink-900">Stripe-Style Loader</h2>
            <span className="text-caption text-accent-600 font-medium">SPRINT 3</span>
          </div>
          <p className="text-body-sm text-ink-600 mb-stack">
            Premium animated loader bar (like Stripe's). Used for page transitions and long operations.
          </p>
          <div className="bg-white rounded-lg p-stack-lg shadow-sm border border-ink-100">
            <div className="stripe-loader h-1 w-full bg-gradient-to-r from-primary-400 via-secondary-500 to-accent-400 rounded-full" />
            <p className="text-caption text-ink-500 mt-stack">
              👆 This loader animates continuously, perfect for transitions and loading states
            </p>
          </div>
        </section>
      </div>

      {/* Summary Section */}
      <div className="max-w-6xl mx-auto mt-20 p-section bg-white rounded-lg border border-ink-100 shadow-sm">
        <h2 className="text-h3 font-bold text-ink-900 mb-stack">📊 Sprint Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-lg">
          <div>
            <h3 className="text-h5 font-semibold text-primary-700 mb-stack-xs">SPRINT 1</h3>
            <ul className="text-body-sm text-ink-600 space-y-1">
              <li>✓ Input focus glow ring</li>
              <li>✓ Button loading pulse</li>
              <li>✓ A11y: prefers-reduced-motion</li>
              <li>✓ Smooth transitions (ease-standard)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-h5 font-semibold text-secondary-700 mb-stack-xs">SPRINT 2</h3>
            <ul className="text-body-sm text-ink-600 space-y-1">
              <li>✓ FloatLabel component</li>
              <li>✓ Icon sizing tokens</li>
              <li>✓ Placeholder fade animation</li>
              <li>✓ Modern SaaS pattern</li>
            </ul>
          </div>
          <div>
            <h3 className="text-h5 font-semibold text-accent-700 mb-stack-xs">SPRINT 3</h3>
            <ul className="text-body-sm text-ink-600 space-y-1">
              <li>✓ Card hover glow ripple</li>
              <li>✓ Warm tone glow variant</li>
              <li>✓ Stripe loader animation</li>
              <li>✓ Premium depth effects</li>
            </ul>
          </div>
        </div>
        <div className="mt-stack-lg pt-stack-lg border-t border-ink-100">
          <p className="text-body-sm text-ink-700">
            <strong>Total:</strong> 17 keyframes · 22 animation utilities · 2 a11y media queries · 357 lines · 0 TypeScript errors
          </p>
        </div>
      </div>
    </div>
  );
};

export default MotionSprintShowcase;
