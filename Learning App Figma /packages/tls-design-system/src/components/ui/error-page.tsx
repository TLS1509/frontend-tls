import * as React from "react";
import { cn } from "./utils";
import { Home, ArrowLeft, RefreshCw, AlertTriangle, ServerCrash, Shield } from "lucide-react";

interface ErrorPageProps extends React.HTMLAttributes<HTMLDivElement> {
  code: "404" | "500" | "403";
  title?: string;
  message?: string;
  showHomeButton?: boolean;
  showBackButton?: boolean;
  showRefreshButton?: boolean;
  onHome?: () => void;
  onBack?: () => void;
  onRefresh?: () => void;
  illustration?: React.ReactNode;
}

const ErrorPage = React.forwardRef<HTMLDivElement, ErrorPageProps>(
  (
    {
      className,
      code,
      title,
      message,
      showHomeButton = true,
      showBackButton = true,
      showRefreshButton = false,
      onHome,
      onBack,
      onRefresh,
      illustration,
      ...props
    },
    ref
  ) => {
    // Default titles and messages
    const defaultContent = {
      "404": {
        title: "Page non trouvée",
        message: "Désolé, la page que vous recherchez n'existe pas ou a été déplacée.",
        icon: <AlertTriangle className="h-24 w-24 text-primary" />,
      },
      "500": {
        title: "Erreur serveur",
        message: "Oups ! Une erreur s'est produite. Nos équipes ont été notifiées et travaillent à résoudre le problème.",
        icon: <ServerCrash className="h-24 w-24 text-destructive" />,
      },
      "403": {
        title: "Accès interdit",
        message: "Vous n'avez pas les permissions nécessaires pour accéder à cette page.",
        icon: <Shield className="h-24 w-24 text-warning" />,
      },
    };

    const content = defaultContent[code];
    const displayTitle = title || content.title;
    const displayMessage = message || content.message;
    const displayIllustration = illustration || content.icon;

    return (
      <div
        ref={ref}
        className={cn(
          "flex min-h-[600px] w-full flex-col items-center justify-center px-4 py-16 text-center",
          className
        )}
        {...props}
      >
        {/* Illustration */}
        <div className="mb-8 animate-in fade-in-0 zoom-in-95 duration-500">
          {displayIllustration}
        </div>

        {/* Error code */}
        <div 
          className="mb-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <h1 
            className="text-primary mb-2"
            style={{
              fontSize: "6rem",
              lineHeight: "1",
              fontWeight: "var(--font-weight-bold)",
            }}
          >
            {code}
          </h1>
        </div>

        {/* Title */}
        <div className="mb-4 max-w-md animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-100">
          <h2 
            style={{
              fontSize: "1.75rem",
              lineHeight: "2.5rem",
              fontFamily: "var(--font-display)",
              fontWeight: "var(--font-weight-semibold)",
            }}
          >
            {displayTitle}
          </h2>
        </div>

        {/* Message */}
        <div className="mb-12 max-w-lg animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-200">
          <p 
            className="text-muted-foreground"
            style={{
              fontSize: "1rem",
              lineHeight: "1.75rem",
            }}
          >
            {displayMessage}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-300">
          {showBackButton && (
            <button
              onClick={onBack || (() => window.history.back())}
              className="flex items-center gap-2 px-6 py-3 rounded-[var(--radius-lg)] border border-border bg-background hover:bg-muted transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </button>
          )}

          {showHomeButton && (
            <button
              onClick={onHome || (() => (window.location.href = "/"))}
              className="flex items-center gap-2 px-6 py-3 rounded-[var(--radius-lg)] bg-primary text-primary-foreground hover:bg-primary-hover transition-colors font-medium shadow-[var(--shadow-md)]"
            >
              <Home className="h-4 w-4" />
              Retour à l'accueil
            </button>
          )}

          {showRefreshButton && (
            <button
              onClick={onRefresh || (() => window.location.reload())}
              className="flex items-center gap-2 px-6 py-3 rounded-[var(--radius-lg)] border border-border bg-background hover:bg-muted transition-colors font-medium"
            >
              <RefreshCw className="h-4 w-4" />
              Actualiser
            </button>
          )}
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-20 left-10 h-64 w-64 rounded-full opacity-10 blur-3xl"
            style={{ background: "var(--gradient-primary-radial)" }}
          />
          <div 
            className="absolute bottom-20 right-10 h-96 w-96 rounded-full opacity-10 blur-3xl"
            style={{ background: "var(--gradient-secondary)" }}
          />
        </div>
      </div>
    );
  }
);
ErrorPage.displayName = "ErrorPage";

// Pre-built error pages
function NotFoundPage(props: Omit<ErrorPageProps, "code">) {
  return <ErrorPage code="404" {...props} />;
}

function ServerErrorPage(props: Omit<ErrorPageProps, "code">) {
  return <ErrorPage code="500" showRefreshButton {...props} />;
}

function ForbiddenPage(props: Omit<ErrorPageProps, "code">) {
  return <ErrorPage code="403" showHomeButton showBackButton={false} {...props} />;
}

export { ErrorPage, NotFoundPage, ServerErrorPage, ForbiddenPage };
