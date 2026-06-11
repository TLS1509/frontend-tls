/**
 * Design System Showcase - The Learning Society
 * Page interactive pour visualiser tous les composants du design system
 */

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Palette, 
  Type, 
  Layout, 
  Sparkles, 
  Copy,
  Check,
  ArrowRight 
} from 'lucide-react';

export default function DesignSystemShowcase() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const colors = {
    primary: [
      { name: 'primary-50', value: '#E8F4F7' },
      { name: 'primary-100', value: '#DCEBEF' },
      { name: 'primary-500', value: '#55A1B4' },
      { name: 'primary-700', value: '#3D7786' },
      { name: 'primary-900', value: '#1F3E45' },
    ],
    secondary: [
      { name: 'secondary-50', value: '#FFF3EB' },
      { name: 'secondary-500', value: '#ED843A' },
      { name: 'secondary-700', value: '#8F5017' },
    ],
    accent: [
      { name: 'accent-50', value: '#FFF9EE' },
      { name: 'accent-400', value: '#F8B044' },
      { name: 'accent-700', value: '#9B6818' },
    ],
  };

  const fontSizes = [
    { name: 'text-xs', size: '0.75rem', example: '12px' },
    { name: 'text-sm', size: '0.875rem', example: '14px' },
    { name: 'text-base', size: '1rem', example: '16px' },
    { name: 'text-lg', size: '1.125rem', example: '18px' },
    { name: 'text-xl', size: '1.25rem', example: '20px' },
    { name: 'text-2xl', size: '1.5rem', example: '24px' },
    { name: 'text-3xl', size: '1.875rem', example: '30px' },
    { name: 'text-4xl', size: '2.25rem', example: '36px' },
  ];

  const spacings = [
    { name: 'space-1', value: '4px' },
    { name: 'space-2', value: '8px' },
    { name: 'space-4', value: '16px' },
    { name: 'space-6', value: '24px' },
    { name: 'space-8', value: '32px' },
    { name: 'space-12', value: '48px' },
  ];

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh', padding: 'var(--space-8)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div className="mb-12 text-center">
          <Badge 
            className="mb-4"
            style={{ 
              background: 'var(--gradient-primary)',
              color: 'var(--primary-foreground)',
            }}
          >
            <Sparkles className="w-4 h-4 mr-2 inline" />
            DESIGN SYSTEM
          </Badge>
          <h1 
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
              marginBottom: 'var(--space-4)',
            }}
          >
            The Learning Society
          </h1>
          <p 
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-lg)',
              color: 'var(--neutral-600)',
            }}
          >
            Design System Complet - v1.0.0
          </p>
        </div>

        {/* Couleurs */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Palette style={{ color: 'var(--primary)' }} className="w-6 h-6" />
            <h2 
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-3xl)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)',
              }}
            >
              Couleurs
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(colors).map(([category, shades]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle style={{ textTransform: 'capitalize' }}>{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {shades.map((color) => (
                      <div 
                        key={color.name}
                        className="flex items-center justify-between group cursor-pointer"
                        onClick={() => copyToClipboard(`var(--${color.name})`, color.name)}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            style={{ 
                              width: '40px', 
                              height: '40px', 
                              backgroundColor: color.value,
                              borderRadius: 'var(--radius-md)',
                              border: '1px solid var(--border)',
                            }}
                          />
                          <div>
                            <div 
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--text-sm)',
                                fontWeight: 'var(--font-weight-medium)',
                                color: 'var(--foreground)',
                              }}
                            >
                              {color.name}
                            </div>
                            <div 
                              style={{
                                fontFamily: 'monospace',
                                fontSize: 'var(--text-xs)',
                                color: 'var(--neutral-500)',
                              }}
                            >
                              {color.value}
                            </div>
                          </div>
                        </div>
                        {copiedCode === color.name ? (
                          <Check className="w-4 h-4" style={{ color: 'var(--success)' }} />
                        ) : (
                          <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--neutral-500)' }} />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Type style={{ color: 'var(--secondary)' }} className="w-6 h-6" />
            <h2 
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-3xl)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)',
              }}
            >
              Typographie
            </h2>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Font Sizes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fontSizes.map((font) => (
                  <div 
                    key={font.name}
                    className="flex items-center justify-between py-3 border-b group cursor-pointer"
                    style={{ borderColor: 'var(--border)' }}
                    onClick={() => copyToClipboard(`var(--${font.name})`, font.name)}
                  >
                    <div className="flex items-center gap-8">
                      <code 
                        style={{
                          fontFamily: 'monospace',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--neutral-600)',
                          minWidth: '100px',
                        }}
                      >
                        {font.name}
                      </code>
                      <span 
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: font.size,
                          color: 'var(--foreground)',
                        }}
                      >
                        The quick brown fox jumps
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span 
                        style={{
                          fontFamily: 'monospace',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--neutral-500)',
                        }}
                      >
                        {font.example}
                      </span>
                      {copiedCode === font.name ? (
                        <Check className="w-4 h-4" style={{ color: 'var(--success)' }} />
                      ) : (
                        <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--neutral-500)' }} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Spacing */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Layout style={{ color: 'var(--accent)' }} className="w-6 h-6" />
            <h2 
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-3xl)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)',
              }}
            >
              Espacements
            </h2>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Spacing Scale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {spacings.map((spacing) => (
                  <div 
                    key={spacing.name}
                    className="flex items-center justify-between group cursor-pointer"
                    onClick={() => copyToClipboard(`var(--${spacing.name})`, spacing.name)}
                  >
                    <div className="flex items-center gap-8">
                      <code 
                        style={{
                          fontFamily: 'monospace',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--neutral-600)',
                          minWidth: '100px',
                        }}
                      >
                        {spacing.name}
                      </code>
                      <div 
                        style={{ 
                          height: '24px',
                          width: spacing.value,
                          backgroundColor: 'var(--primary-200)',
                          borderRadius: 'var(--radius-sm)',
                        }}
                      />
                      <span 
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--neutral-600)',
                        }}
                      >
                        {spacing.value}
                      </span>
                    </div>
                    {copiedCode === spacing.name ? (
                      <Check className="w-4 h-4" style={{ color: 'var(--success)' }} />
                    ) : (
                      <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--neutral-500)' }} />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Buttons */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles style={{ color: 'var(--primary)' }} className="w-6 h-6" />
            <h2 
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-3xl)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)',
              }}
            >
              Composants
            </h2>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--neutral-600)', marginBottom: 'var(--space-3)' }}>
                    Default
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button>Primary Button</Button>
                    <Button variant="secondary">Secondary Button</Button>
                    <Button variant="outline">Outline Button</Button>
                    <Button variant="ghost">Ghost Button</Button>
                  </div>
                </div>

                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--neutral-600)', marginBottom: 'var(--space-3)' }}>
                    Sizes
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>

                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--neutral-600)', marginBottom: 'var(--space-3)' }}>
                    With Icons
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button>
                      En savoir plus
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Découvrir
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <div className="text-center py-8">
          <p 
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--neutral-500)',
            }}
          >
            The Learning Society © 2024 - Design System v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}
