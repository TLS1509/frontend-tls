import { Sparkles, Download, Save, Send, Plus } from 'lucide-react';
import { Button } from '../ui/button';

export function ButtonShowcase() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-8)',
      padding: 'var(--space-6)',
    }}>
      {/* Section: Filled Buttons */}
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--foreground)',
          marginBottom: 'var(--space-4)',
        }}>
          Filled Buttons
        </h3>
        <div style={{
          display: 'flex',
          gap: 'var(--space-3)',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
          <Button variant="default">
            <Download className="w-4 h-4" />
            Primary
          </Button>
          <Button variant="secondary">
            <Save className="w-4 h-4" />
            Secondary
          </Button>
          <Button variant="accent">
            <Sparkles className="w-4 h-4" />
            Accent
          </Button>
          <Button variant="success">
            <Plus className="w-4 h-4" />
            Success
          </Button>
          <Button variant="destructive">
            Delete
          </Button>
        </div>
      </div>

      {/* Section: Gradient Buttons */}
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--foreground)',
          marginBottom: 'var(--space-4)',
        }}>
          Gradient Buttons (Primary, Secondary, Warm, Brand)
        </h3>
        <div style={{
          display: 'flex',
          gap: 'var(--space-3)',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
          <Button variant="gradient-primary">
            <Sparkles className="w-4 h-4" />
            Primary Gradient
          </Button>
          <Button variant="gradient-secondary">
            Secondary Gradient
          </Button>
          <Button variant="gradient-warm">
            <Send className="w-4 h-4" />
            Warm Gradient
          </Button>
          <Button variant="gradient-brand">
            Brand Gradient
          </Button>
        </div>
      </div>

      {/* Section: Outline Buttons */}
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--foreground)',
          marginBottom: 'var(--space-4)',
        }}>
          Outline Buttons (TLS Colors)
        </h3>
        <div style={{
          display: 'flex',
          gap: 'var(--space-3)',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
          <Button variant="outline">
            Default Outline
          </Button>
          <Button variant="outline-primary">
            <Download className="w-4 h-4" />
            Primary
          </Button>
          <Button variant="outline-secondary">
            Secondary
          </Button>
          <Button variant="outline-accent">
            Accent
          </Button>
          <Button variant="outline-orange">
            <Sparkles className="w-4 h-4" />
            Orange
          </Button>
          <Button variant="outline-yellow">
            <Sparkles className="w-4 h-4" />
            Yellow
          </Button>
        </div>
      </div>

      {/* Section: Glass Button */}
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--foreground)',
          marginBottom: 'var(--space-4)',
        }}>
          Glass Button (Glassmorphism)
        </h3>
        <div style={{
          padding: 'var(--space-8)',
          background: 'linear-gradient(135deg, #55A1B4 0%, #ED843A 100%)',
          borderRadius: 'var(--radius-xl)',
          display: 'inline-flex',
          gap: 'var(--space-3)',
        }}>
          <Button variant="glass">
            <Sparkles className="w-4 h-4" />
            Glass Button
          </Button>
          <Button variant="glass" size="lg">
            <Download className="w-4 h-4" />
            Large Glass
          </Button>
        </div>
      </div>

      {/* Section: Ghost & Link */}
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--foreground)',
          marginBottom: 'var(--space-4)',
        }}>
          Ghost & Link Buttons
        </h3>
        <div style={{
          display: 'flex',
          gap: 'var(--space-3)',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
          <Button variant="ghost">
            Ghost Button
          </Button>
          <Button variant="ghost">
            <Save className="w-4 h-4" />
            With Icon
          </Button>
          <Button variant="link">
            Link Button
          </Button>
        </div>
      </div>

      {/* Section: Sizes */}
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--foreground)',
          marginBottom: 'var(--space-4)',
        }}>
          Button Sizes
        </h3>
        <div style={{
          display: 'flex',
          gap: 'var(--space-3)',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
      </div>

      {/* Section: Icon Buttons */}
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--foreground)',
          marginBottom: 'var(--space-4)',
        }}>
          Icon Buttons
        </h3>
        <div style={{
          display: 'flex',
          gap: 'var(--space-3)',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
          <Button size="icon-sm" variant="outline">
            <Plus className="w-4 h-4" />
          </Button>
          <Button size="icon">
            <Download className="w-5 h-5" />
          </Button>
          <Button size="icon" variant="gradient-warm">
            <Sparkles className="w-5 h-5" />
          </Button>
          <Button size="icon" variant="outline-orange">
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Section: States */}
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--foreground)',
          marginBottom: 'var(--space-4)',
        }}>
          Button States
        </h3>
        <div style={{
          display: 'flex',
          gap: 'var(--space-3)',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
          <Button variant="outline-yellow" disabled>
            Disabled Outline
          </Button>
        </div>
      </div>
    </div>
  );
}
