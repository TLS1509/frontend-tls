import { useState } from 'react';
import { 
  ArrowLeft, 
  Download, 
  Copy, 
  CheckCircle2, 
  FileJson,
  Palette,
  Type,
  Ruler,
  Sparkles,
  Zap,
} from 'lucide-react';

interface DesignTokensExportPageProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function DesignTokensExportPage({ onNavigate, onLogout }: DesignTokensExportPageProps) {
  const [copied, setCopied] = useState(false);
  const [exportFormat, setExportFormat] = useState<'tokens-studio' | 'figma-variables'>('tokens-studio');

  // Generate Tokens Studio compatible JSON
  const generateTokensStudioJSON = () => {
    return {
      "$schema": "https://schemas.tokens.studio/1.0.0/tokens.json",
      "$metadata": {
        "tokenSetOrder": [
          "colors",
          "typography",
          "spacing",
          "radius",
          "gradients",
          "effects",
          "motion"
        ]
      },
      "colors": {
        "brand": {
          "primary": {
            "50": { "value": "#E8F4F7", "type": "color", "description": "Primary lightest" },
            "100": { "value": "#DCEBEF", "type": "color", "description": "Primary lighter" },
            "200": { "value": "#B9D7DF", "type": "color", "description": "Primary light" },
            "300": { "value": "#96C3CF", "type": "color", "description": "Primary light-medium" },
            "400": { "value": "#73AFBF", "type": "color", "description": "Primary medium" },
            "500": { "value": "#55A1B4", "type": "color", "description": "Primary DEFAULT - Brand main color" },
            "600": { "value": "#4A8FA1", "type": "color", "description": "Primary dark" },
            "700": { "value": "#3D7786", "type": "color", "description": "Primary darker" },
            "800": { "value": "#2F5F6A", "type": "color", "description": "Primary darkest" },
            "900": { "value": "#1F3E45", "type": "color", "description": "Primary ultra dark" },
            "foreground": { "value": "#FFFFFF", "type": "color", "description": "Text on primary" },
            "hover": { "value": "#4A8FA1", "type": "color", "description": "Primary hover state" },
            "light": { "value": "#7BC4D4", "type": "color", "description": "Primary light version" },
            "lighter": { "value": "#E8F4F7", "type": "color", "description": "Primary ultra light" }
          },
          "secondary": {
            "50": { "value": "#FFF3EB", "type": "color", "description": "Secondary lightest" },
            "100": { "value": "#FDDCC7", "type": "color", "description": "Secondary lighter" },
            "200": { "value": "#FCBB93", "type": "color", "description": "Secondary light" },
            "300": { "value": "#F59A5F", "type": "color", "description": "Secondary light-medium" },
            "400": { "value": "#F18A4C", "type": "color", "description": "Secondary medium" },
            "500": { "value": "#ED843A", "type": "color", "description": "Secondary DEFAULT - Accent color" },
            "600": { "value": "#C06920", "type": "color", "description": "Secondary dark" },
            "700": { "value": "#8F5017", "type": "color", "description": "Secondary darker" },
            "800": { "value": "#5E3710", "type": "color", "description": "Secondary darkest" },
            "900": { "value": "#3B2109", "type": "color", "description": "Secondary ultra dark" },
            "foreground": { "value": "#FFFFFF", "type": "color", "description": "Text on secondary" },
            "hover": { "value": "#C06920", "type": "color", "description": "Secondary hover state" },
            "light": { "value": "#F5A868", "type": "color", "description": "Secondary light version" },
            "lighter": { "value": "#FFF4E6", "type": "color", "description": "Secondary ultra light" }
          },
          "accent": {
            "50": { "value": "#FFF9EE", "type": "color", "description": "Accent lightest" },
            "100": { "value": "#FFECC8", "type": "color", "description": "Accent lighter" },
            "200": { "value": "#FFD791", "type": "color", "description": "Accent light" },
            "300": { "value": "#FFC15A", "type": "color", "description": "Accent light-medium" },
            "400": { "value": "#F8B044", "type": "color", "description": "Accent DEFAULT - Highlight color" },
            "500": { "value": "#F8A733", "type": "color", "description": "Accent medium" },
            "600": { "value": "#D69020", "type": "color", "description": "Accent dark" },
            "700": { "value": "#9B6818", "type": "color", "description": "Accent darker" },
            "800": { "value": "#664410", "type": "color", "description": "Accent darkest" },
            "900": { "value": "#3D2909", "type": "color", "description": "Accent ultra dark" },
            "foreground": { "value": "#1A1A1A", "type": "color", "description": "Text on accent" },
            "hover": { "value": "#D69020", "type": "color", "description": "Accent hover state" },
            "light": { "value": "#FFC977", "type": "color", "description": "Accent light version" },
            "lighter": { "value": "#FFF9EE", "type": "color", "description": "Accent ultra light" }
          }
        },
        "neutral": {
          "50": { "value": "#F5F8F8", "type": "color", "description": "Neutral lightest" },
          "100": { "value": "#EEF6F8", "type": "color", "description": "Neutral lighter" },
          "200": { "value": "#E0E8EA", "type": "color", "description": "Neutral light" },
          "300": { "value": "#C8D4D7", "type": "color", "description": "Neutral light-medium" },
          "400": { "value": "#9AABB0", "type": "color", "description": "Neutral medium" },
          "500": { "value": "#6B7D82", "type": "color", "description": "Neutral dark-medium" },
          "600": { "value": "#5F8F8F", "type": "color", "description": "Neutral dark" },
          "700": { "value": "#3A474B", "type": "color", "description": "Neutral darker" },
          "800": { "value": "#2A3538", "type": "color", "description": "Neutral darkest" },
          "900": { "value": "#252B37", "type": "color", "description": "Neutral ultra dark" }
        },
        "semantic": {
          "success": {
            "50": { "value": "#ECFDF5", "type": "color" },
            "100": { "value": "#D1FAE5", "type": "color" },
            "500": { "value": "#10B981", "type": "color", "description": "Success DEFAULT" },
            "600": { "value": "#059669", "type": "color" },
            "foreground": { "value": "#FFFFFF", "type": "color" }
          },
          "destructive": {
            "50": { "value": "#FEF2F2", "type": "color" },
            "100": { "value": "#FEE2E2", "type": "color" },
            "500": { "value": "#D4183D", "type": "color", "description": "Destructive DEFAULT" },
            "600": { "value": "#B91C1C", "type": "color" },
            "foreground": { "value": "#FFFFFF", "type": "color" }
          },
          "warning": {
            "50": { "value": "#FFFBEB", "type": "color" },
            "100": { "value": "#FEF3C7", "type": "color" },
            "500": { "value": "#F59E0B", "type": "color", "description": "Warning DEFAULT" },
            "600": { "value": "#D97706", "type": "color" },
            "foreground": { "value": "#1A1A1A", "type": "color" }
          },
          "info": {
            "50": { "value": "#EFF6FF", "type": "color" },
            "100": { "value": "#DBEAFE", "type": "color" },
            "500": { "value": "#3B82F6", "type": "color", "description": "Info DEFAULT" },
            "600": { "value": "#2563EB", "type": "color" },
            "foreground": { "value": "#FFFFFF", "type": "color" }
          }
        },
        "base": {
          "background": { "value": "#FFFFFF", "type": "color", "description": "App background" },
          "foreground": { "value": "#252B37", "type": "color", "description": "Main text color" },
          "surface": { "value": "#FFFFFF", "type": "color", "description": "Surface color" },
          "border": { "value": "rgba(0, 0, 0, 0.1)", "type": "color", "description": "Border color" },
          "muted": { "value": "#F5F5F5", "type": "color", "description": "Muted background" },
          "muted-foreground": { "value": "#6B7280", "type": "color", "description": "Muted text" }
        },
        "glass": {
          "white": { "value": "rgba(255, 255, 255, 0.7)", "type": "color", "description": "Glass effect background" },
          "white-light": { "value": "rgba(255, 255, 255, 0.5)", "type": "color", "description": "Glass light" },
          "white-strong": { "value": "rgba(255, 255, 255, 0.9)", "type": "color", "description": "Glass strong" },
          "border": { "value": "rgba(255, 255, 255, 0.3)", "type": "color", "description": "Glass border" }
        }
      },
      "typography": {
        "fontFamilies": {
          "sans": { "value": "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif", "type": "fontFamilies", "description": "System fonts base" },
          "display": { "value": "'League Spartan', -apple-system, 'Helvetica Neue', Arial, sans-serif", "type": "fontFamilies", "description": "Display font - Headings (géométrique et solide)" },
          "body": { "value": "'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif", "type": "fontFamilies", "description": "Body font - Text (arrondie et lisible)" }
        },
        "fontSizes": {
          "xs": { "value": "12px", "type": "fontSizes", "description": "0.75rem" },
          "sm": { "value": "14px", "type": "fontSizes", "description": "0.875rem" },
          "base": { "value": "16px", "type": "fontSizes", "description": "1rem - Default" },
          "lg": { "value": "18px", "type": "fontSizes", "description": "1.125rem" },
          "xl": { "value": "20px", "type": "fontSizes", "description": "1.25rem" },
          "2xl": { "value": "24px", "type": "fontSizes", "description": "1.5rem" },
          "3xl": { "value": "30px", "type": "fontSizes", "description": "1.875rem" },
          "4xl": { "value": "36px", "type": "fontSizes", "description": "2.25rem" },
          "5xl": { "value": "48px", "type": "fontSizes", "description": "3rem" },
          "6xl": { "value": "60px", "type": "fontSizes", "description": "3.75rem" }
        },
        "fontWeights": {
          "light": { "value": "300", "type": "fontWeights" },
          "normal": { "value": "400", "type": "fontWeights", "description": "Default body" },
          "medium": { "value": "500", "type": "fontWeights" },
          "semibold": { "value": "600", "type": "fontWeights", "description": "Default headings" },
          "bold": { "value": "700", "type": "fontWeights" }
        },
        "lineHeights": {
          "none": { "value": "1", "type": "lineHeights" },
          "tight": { "value": "1.25", "type": "lineHeights", "description": "Headings" },
          "snug": { "value": "1.375", "type": "lineHeights" },
          "normal": { "value": "1.5", "type": "lineHeights", "description": "Default body" },
          "relaxed": { "value": "1.625", "type": "lineHeights" },
          "loose": { "value": "2", "type": "lineHeights" }
        },
        "letterSpacing": {
          "tighter": { "value": "-0.05em", "type": "letterSpacing" },
          "tight": { "value": "-0.025em", "type": "letterSpacing" },
          "normal": { "value": "0em", "type": "letterSpacing", "description": "Default" },
          "wide": { "value": "0.025em", "type": "letterSpacing" },
          "wider": { "value": "0.05em", "type": "letterSpacing" },
          "widest": { "value": "0.1em", "type": "letterSpacing" }
        }
      },
      "spacing": {
        "0": { "value": "0px", "type": "spacing" },
        "1": { "value": "4px", "type": "spacing", "description": "0.25rem" },
        "2": { "value": "8px", "type": "spacing", "description": "0.5rem" },
        "3": { "value": "12px", "type": "spacing", "description": "0.75rem" },
        "4": { "value": "16px", "type": "spacing", "description": "1rem - Default" },
        "5": { "value": "20px", "type": "spacing", "description": "1.25rem" },
        "6": { "value": "24px", "type": "spacing", "description": "1.5rem" },
        "8": { "value": "32px", "type": "spacing", "description": "2rem" },
        "10": { "value": "40px", "type": "spacing", "description": "2.5rem" },
        "12": { "value": "48px", "type": "spacing", "description": "3rem" },
        "16": { "value": "64px", "type": "spacing", "description": "4rem" },
        "20": { "value": "80px", "type": "spacing", "description": "5rem" },
        "24": { "value": "96px", "type": "spacing", "description": "6rem" },
        "32": { "value": "128px", "type": "spacing", "description": "8rem" }
      },
      "radius": {
        "none": { "value": "0px", "type": "borderRadius" },
        "sm": { "value": "6px", "type": "borderRadius", "description": "0.375rem" },
        "md": { "value": "8px", "type": "borderRadius", "description": "0.5rem" },
        "base": { "value": "10px", "type": "borderRadius", "description": "0.625rem - Default TLS" },
        "lg": { "value": "10px", "type": "borderRadius", "description": "0.625rem" },
        "xl": { "value": "16px", "type": "borderRadius", "description": "1rem" },
        "2xl": { "value": "24px", "type": "borderRadius", "description": "1.5rem" },
        "full": { "value": "9999px", "type": "borderRadius", "description": "Circles" }
      },
      "borderWidth": {
        "default": { "value": "1px", "type": "borderWidth" },
        "2": { "value": "2px", "type": "borderWidth" },
        "4": { "value": "4px", "type": "borderWidth" }
      },
      "gradients": {
        "primary": {
          "value": {
            "type": "linear-gradient",
            "direction": "to right",
            "stops": [
              { "position": "0%", "color": "#55A1B4" },
              { "position": "100%", "color": "#4A8FA1" }
            ]
          },
          "type": "gradient",
          "description": "Primary gradient"
        }
      },
      "effects": {
        "shadow": {
          "xs": { "value": { "x": "0", "y": "1", "blur": "2", "spread": "0", "color": "rgba(0, 0, 0, 0.05)" }, "type": "boxShadow" },
          "sm": { "value": [{ "x": "0", "y": "1", "blur": "3", "spread": "0", "color": "rgba(0, 0, 0, 0.1)" }], "type": "boxShadow" },
          "md": { "value": [{ "x": "0", "y": "4", "blur": "6", "spread": "-1", "color": "rgba(0, 0, 0, 0.1)" }], "type": "boxShadow" },
          "lg": { "value": [{ "x": "0", "y": "10", "blur": "15", "spread": "-3", "color": "rgba(0, 0, 0, 0.1)" }], "type": "boxShadow" },
          "xl": { "value": [{ "x": "0", "y": "20", "blur": "25", "spread": "-5", "color": "rgba(0, 0, 0, 0.1)" }], "type": "boxShadow" },
          "2xl": { "value": { "x": "0", "y": "25", "blur": "50", "spread": "-12", "color": "rgba(0, 0, 0, 0.25)" }, "type": "boxShadow" }
        },
        "blur": {
          "xs": { "value": "4px", "type": "blur" },
          "sm": { "value": "8px", "type": "blur" },
          "md": { "value": "12px", "type": "blur", "description": "Glass default" },
          "lg": { "value": "16px", "type": "blur" },
          "xl": { "value": "20px", "type": "blur" },
          "2xl": { "value": "24px", "type": "blur" }
        }
      },
      "motion": {
        "duration": {
          "fast": { "value": "150ms", "type": "duration" },
          "base": { "value": "200ms", "type": "duration", "description": "Default" },
          "slow": { "value": "300ms", "type": "duration" },
          "slower": { "value": "500ms", "type": "duration" }
        },
        "easing": {
          "in": { "value": "cubic-bezier(0.4, 0, 1, 1)", "type": "cubicBezier" },
          "out": { "value": "cubic-bezier(0, 0, 0.2, 1)", "type": "cubicBezier", "description": "Default" },
          "inOut": { "value": "cubic-bezier(0.4, 0, 0.2, 1)", "type": "cubicBezier" },
          "bounce": { "value": "cubic-bezier(0.68, -0.55, 0.265, 1.55)", "type": "cubicBezier" }
        }
      }
    };
  };

  // Generate Figma Variables compatible JSON
  const generateFigmaVariablesJSON = () => {
    return {
      "name": "TLS Design System",
      "description": "The Learning Society design system tokens",
      "version": "1.0.0",
      "collections": {
        "colors": {
          "name": "Colors",
          "modes": ["light"],
          "variables": {
            "primary-500": { "value": "#55A1B4", "scopes": ["ALL_SCOPES"] },
            "secondary-500": { "value": "#ED843A", "scopes": ["ALL_SCOPES"] },
            "accent-400": { "value": "#F8B044", "scopes": ["ALL_SCOPES"] }
            // ... more variables
          }
        }
      }
    };
  };

  const handleExport = () => {
    const jsonData = exportFormat === 'tokens-studio' 
      ? generateTokensStudioJSON() 
      : generateFigmaVariablesJSON();
    
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = exportFormat === 'tokens-studio' 
      ? 'tls-tokens-studio.json' 
      : 'tls-figma-variables.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyToClipboard = () => {
    const jsonData = exportFormat === 'tokens-studio' 
      ? generateTokensStudioJSON() 
      : generateFigmaVariablesJSON();
    
    navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tokensCount = {
    colors: 85,
    typography: 32,
    spacing: 14,
    radius: 8,
    gradients: 42,
    effects: 12,
    motion: 8
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ 
        background: 'var(--background)',
      }}
    >
      {/* Header */}
      <div 
        className="sticky top-0 z-30 border-b"
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          borderColor: 'var(--border)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('dashboard')}
                className="p-2 rounded-lg transition-all duration-200 hover:scale-105"
                style={{
                  background: 'var(--glass-white)',
                  border: '1px solid var(--border)',
                }}
              >
                <ArrowLeft className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
              </button>
              
              <div>
                <h1 
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                  }}
                >
                  Design Tokens Export
                </h1>
                <p 
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  Export TLS design tokens pour Figma
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
        
        {/* Format Selection */}
        <div className="mb-8">
          <h2 
            className="mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)',
            }}
          >
            Format d'export
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setExportFormat('tokens-studio')}
              className="p-6 rounded-2xl text-left transition-all duration-300 hover:-translate-y-1"
              style={{
                background: exportFormat === 'tokens-studio' 
                  ? 'var(--gradient-primary)' 
                  : 'var(--glass-white)',
                border: exportFormat === 'tokens-studio' 
                  ? '2px solid var(--primary)' 
                  : '1px solid var(--border)',
                color: exportFormat === 'tokens-studio' ? 'white' : 'var(--foreground)',
                boxShadow: exportFormat === 'tokens-studio' 
                  ? '0 8px 24px rgba(85, 161, 180, 0.3)' 
                  : '0 2px 8px rgba(0, 0, 0, 0.05)',
              }}
            >
              <FileJson 
                className="w-8 h-8 mb-3" 
                style={{ 
                  color: exportFormat === 'tokens-studio' ? 'white' : 'var(--primary)' 
                }} 
              />
              <h3 
                className="mb-2"
                style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                Tokens Studio
              </h3>
              <p 
                style={{
                  fontSize: 'var(--text-sm)',
                  opacity: exportFormat === 'tokens-studio' ? 0.95 : 0.7,
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >
                Format compatible avec le plugin Tokens Studio pour Figma (recommandé)
              </p>
              {exportFormat === 'tokens-studio' && (
                <div 
                  className="mt-3 flex items-center gap-2"
                  style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Sélectionné
                </div>
              )}
            </button>

            <button
              onClick={() => setExportFormat('figma-variables')}
              className="p-6 rounded-2xl text-left transition-all duration-300 hover:-translate-y-1"
              style={{
                background: exportFormat === 'figma-variables' 
                  ? 'var(--gradient-primary)' 
                  : 'var(--glass-white)',
                border: exportFormat === 'figma-variables' 
                  ? '2px solid var(--primary)' 
                  : '1px solid var(--border)',
                color: exportFormat === 'figma-variables' ? 'white' : 'var(--foreground)',
                boxShadow: exportFormat === 'figma-variables' 
                  ? '0 8px 24px rgba(85, 161, 180, 0.3)' 
                  : '0 2px 8px rgba(0, 0, 0, 0.05)',
              }}
            >
              <Sparkles 
                className="w-8 h-8 mb-3" 
                style={{ 
                  color: exportFormat === 'figma-variables' ? 'white' : 'var(--secondary)' 
                }} 
              />
              <h3 
                className="mb-2"
                style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                Figma Variables
              </h3>
              <p 
                style={{
                  fontSize: 'var(--text-sm)',
                  opacity: exportFormat === 'figma-variables' ? 0.95 : 0.7,
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >
                Format natif Figma Variables (expérimental)
              </p>
              {exportFormat === 'figma-variables' && (
                <div 
                  className="mt-3 flex items-center gap-2"
                  style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Sélectionné
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8">
          <h2 
            className="mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)',
            }}
          >
            Contenu de l'export
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div 
              className="p-4 rounded-xl text-center"
              style={{
                background: 'var(--glass-white)',
                border: '1px solid var(--border)',
              }}
            >
              <Palette className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--primary)' }} />
              <div 
                style={{
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}
              >
                {tokensCount.colors}
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                Colors
              </div>
            </div>

            <div 
              className="p-4 rounded-xl text-center"
              style={{
                background: 'var(--glass-white)',
                border: '1px solid var(--border)',
              }}
            >
              <Sparkles className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--accent)' }} />
              <div 
                style={{
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}
              >
                {tokensCount.gradients}
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                Gradients
              </div>
            </div>

            <div 
              className="p-4 rounded-xl text-center"
              style={{
                background: 'var(--glass-white)',
                border: '1px solid var(--border)',
              }}
            >
              <Type className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--secondary)' }} />
              <div 
                style={{
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}
              >
                {tokensCount.typography}
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                Typography
              </div>
            </div>

            <div 
              className="p-4 rounded-xl text-center"
              style={{
                background: 'var(--glass-white)',
                border: '1px solid var(--border)',
              }}
            >
              <Ruler className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--accent)' }} />
              <div 
                style={{
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}
              >
                {tokensCount.spacing}
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                Spacing
              </div>
            </div>

            <div 
              className="p-4 rounded-xl text-center"
              style={{
                background: 'var(--glass-white)',
                border: '1px solid var(--border)',
              }}
            >
              <Sparkles className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--primary)' }} />
              <div 
                style={{
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}
              >
                {tokensCount.radius}
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                Radius
              </div>
            </div>

            <div 
              className="p-4 rounded-xl text-center"
              style={{
                background: 'var(--glass-white)',
                border: '1px solid var(--border)',
              }}
            >
              <Zap className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--secondary)' }} />
              <div 
                style={{
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}
              >
                {tokensCount.effects}
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                Effects
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleExport}
            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: 'var(--gradient-primary)',
              boxShadow: '0 8px 24px rgba(85, 161, 180, 0.3)',
            }}
          >
            <Download className="w-5 h-5 text-white" />
            <span
              style={{
                color: 'white',
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-semibold)',
              }}
            >
              Télécharger JSON
            </span>
          </button>

          <button
            onClick={handleCopyToClipboard}
            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: copied ? 'var(--gradient-accent)' : 'var(--glass-white)',
              border: '1px solid var(--border)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-5 h-5" style={{ color: 'white' }} />
                <span
                  style={{
                    color: 'white',
                    fontSize: 'var(--text-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                  }}
                >
                  Copié !
                </span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
                <span
                  style={{
                    color: 'var(--foreground)',
                    fontSize: 'var(--text-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                  }}
                >
                  Copier JSON
                </span>
              </>
            )}
          </button>
        </div>

        {/* Instructions */}
        <div 
          className="mt-8 p-6 rounded-2xl"
          style={{
            background: 'var(--glass-white)',
            border: '1px solid var(--border)',
          }}
        >
          <h3 
            className="mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)',
            }}
          >
            📋 Comment importer dans Figma
          </h3>

          <ol 
            className="space-y-3"
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--foreground)',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            <li>
              <strong style={{ fontWeight: 'var(--font-weight-semibold)' }}>1. Installer le plugin</strong>
              <br />
              <span style={{ color: 'var(--muted-foreground)' }}>
                Ouvrir Figma → Resources → Plugins → Chercher "Tokens Studio" → Installer
              </span>
            </li>
            <li>
              <strong style={{ fontWeight: 'var(--font-weight-semibold)' }}>2. Ouvrir le plugin</strong>
              <br />
              <span style={{ color: 'var(--muted-foreground)' }}>
                Dans votre fichier Figma → Plugins → Tokens Studio for Figma
              </span>
            </li>
            <li>
              <strong style={{ fontWeight: 'var(--font-weight-semibold)' }}>3. Importer les tokens</strong>
              <br />
              <span style={{ color: 'var(--muted-foreground)' }}>
                Settings (⚙️) → Load from → JSON → Coller ou charger le fichier téléchargé
              </span>
            </li>
            <li>
              <strong style={{ fontWeight: 'var(--font-weight-semibold)' }}>4. Appliquer les styles</strong>
              <br />
              <span style={{ color: 'var(--muted-foreground)' }}>
                Tools → Create Styles → Sélectionner toutes les collections → Create
              </span>
            </li>
          </ol>
        </div>

        {/* Preview Sample */}
        <div 
          className="mt-6 p-6 rounded-2xl"
          style={{
            background: 'var(--neutral-900)',
            border: '1px solid var(--border)',
          }}
        >
          <h3 
            className="mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'white',
            }}
          >
            👁️ Aperçu JSON (extrait)
          </h3>
          <pre 
            className="overflow-x-auto"
            style={{
              fontSize: 'var(--text-xs)',
              color: '#A0AEC0',
              lineHeight: 'var(--leading-relaxed)',
              fontFamily: 'monospace',
            }}
          >
{`{
  "colors": {
    "brand": {
      "primary": {
        "500": {
          "value": "#55A1B4",
          "type": "color",
          "description": "Primary DEFAULT - Brand main color"
        }
      }
    }
  },
  "typography": {
    "fontFamilies": {
      "display": {
        "value": "League Spartan",
        "type": "fontFamilies"
      }
    }
  }
}`}
          </pre>
        </div>

      </div>
    </div>
  );
}