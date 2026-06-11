import React, { Component, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div 
          className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
          style={{
            backgroundColor: 'var(--neutral-50)',
            borderRadius: 'var(--radius-2xl)',
            border: '1px solid var(--border)'
          }}
        >
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{ 
              backgroundColor: 'var(--destructive-foreground)',
              color: 'var(--destructive)'
            }}
          >
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
              marginBottom: 'var(--space-4)'
            }}
          >
            Oups ! Quelque chose s'est mal passé
          </h2>
          <p 
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              color: 'var(--neutral-600)',
              marginBottom: 'var(--space-6)',
              maxWidth: '500px'
            }}
          >
            Une erreur inattendue s'est produite. Veuillez rafraîchir la page ou réessayer plus tard.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-semibold)',
              backgroundColor: 'var(--primary-500)',
              color: 'var(--primary-foreground)',
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-lg)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--primary-600)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--primary-500)';
            }}
          >
            Rafraîchir la page
          </button>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-8 text-left w-full max-w-2xl">
              <summary 
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--neutral-600)',
                  cursor: 'pointer',
                  marginBottom: 'var(--space-2)'
                }}
              >
                Détails de l'erreur (dev mode)
              </summary>
              <pre 
                style={{
                  fontFamily: 'monospace',
                  fontSize: 'var(--text-xs)',
                  backgroundColor: 'var(--neutral-100)',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'auto',
                  color: 'var(--foreground)'
                }}
              >
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
