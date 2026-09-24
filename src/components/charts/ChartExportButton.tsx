import React, { useState } from 'react';
import { Button } from '../core/Button';
import { Download, DownloadCloud, FileJson } from 'lucide-react';
import { exportChartPng, exportChartPdf, exportChartCsv, generateFilename } from './ChartExportUtils';

interface ChartExportButtonProps {
  chartId: string;
  filename?: string;
  data?: Array<Record<string, string | number>>;
  showPdf?: boolean;
  showPng?: boolean;
  showCsv?: boolean;
  title?: string;
  subtitle?: string;
  variant?: 'compact' | 'full';
}

/**
 * Reusable export button component for charts
 * Provides PNG, PDF, and CSV export options
 */
export const ChartExportButton: React.FC<ChartExportButtonProps> = ({
  chartId,
  filename: customFilename,
  data,
  showPdf = true,
  showPng = true,
  showCsv = data ? true : false,
  title,
  subtitle,
  variant = 'compact',
}) => {
  const [loading, setLoading] = useState<'png' | 'pdf' | 'csv' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filename = customFilename || generateFilename('chart');

  /* L'erreur affichée est une phrase, en français, qui dit quel export a
     échoué (2026-09-24). Elle recopiait `err.message` — le message technique,
     en anglais, de ChartExportUtils (« Failed to export PNG: … ») — ou
     « Export failed ». Le détail reste dans la console, où les utilitaires
     l'écrivent déjà. */
  const handleExportPng = async () => {
    try {
      setLoading('png');
      setError(null);
      await exportChartPng(chartId, filename);
    } catch {
      setError("L'export PNG a échoué.");
    } finally {
      setLoading(null);
    }
  };

  const handleExportPdf = async () => {
    try {
      setLoading('pdf');
      setError(null);
      await exportChartPdf(chartId, filename, { title, subtitle, data });
    } catch {
      setError("L'export PDF a échoué.");
    } finally {
      setLoading(null);
    }
  };

  const handleExportCsv = async () => {
    try {
      setLoading('csv');
      setError(null);
      if (!data) throw new Error('Aucune donnée à exporter');
      exportChartCsv(data, filename);
    } catch {
      setError("L'export CSV a échoué : aucune donnée à exporter.");
    } finally {
      setLoading(null);
    }
  };

  /* Les six boutons d'export passent par <Button> depuis le 2026-09-10.

     Ils réimplémentaient à la main ce que le composant expose déjà : un
     remplissage doux en variante `compact` (fond teinté, label foncé), un
     remplissage plein en variante complète, et trois tons. C'est exactement
     l'API `emphasis` × `tone`.

     Ce que la migration leur apporte, et qu'ils n'avaient pas : la graisse 700
     et le filet des variantes douces décidés le 09 et le 10, la cible tactile
     de 44 px sur la variante complète — ils étaient à 40 — et l'état de
     chargement, qui était bricolé en changeant le libellé.

     Les trois tons portent un sens : PNG est l'image, PDF le document, CSV la
     donnée. On les garde.

     Libellés en français depuis le 2026-09-24 (« Export as PNG »…). Le nom
     accessible reprend le libellé visible de la variante `full` et contient
     celui de la variante `compact` (WCAG 2.5.3, le libellé dans le nom) ; l'info-
     bulle dit ce qu'on exporte, le graphique ou ses données.

     Niveau — arbitrage n°19 : exporter est un OUTIL, jamais l'action
     principale d'un écran. `compact`, posé dans l'en-tête d'un graphique, est
     en `ghost` (il était en `soft` : six boutons colorés sur le Passeport pour
     deux graphiques) ; `full`, un bloc d'export autonome, garde un contour en
     `soft`. La variante `full` alignait TROIS `solid`. */
  const boutons = [
    { actif: showPng, cle: 'png' as const, tone: 'brand' as const,
      Icone: Download,     court: 'PNG', long: 'Exporter en PNG', action: handleExportPng,
      titre: 'Exporter le graphique en PNG' },
    { actif: showPdf, cle: 'pdf' as const, tone: 'warm' as const,
      Icone: DownloadCloud, court: 'PDF', long: 'Exporter en PDF', action: handleExportPdf,
      titre: 'Exporter le graphique en PDF' },
    { actif: showCsv && Boolean(data), cle: 'csv' as const, tone: 'sun' as const,
      Icone: FileJson,     court: 'CSV', long: 'Exporter en CSV', action: handleExportCsv,
      titre: 'Exporter les données en CSV' },
  ];

  const compact = variant === 'compact';

  const rendu = boutons
    .filter((b) => b.actif)
    .map((b) => (
      <Button
        key={b.cle}
        size={compact ? 'sm' : 'md'}
        emphasis={compact ? 'ghost' : 'soft'}
        tone={b.tone}
        onClick={b.action}
        disabled={loading !== null}
        loading={loading === b.cle}
        leadingIcon={<b.Icone />}
        title={b.titre}
        aria-label={b.long}
      >
        {compact ? b.court : b.long}
      </Button>
    ));

  if (compact) {
    return (
      <div className="flex items-center gap-stack-xs">
        {rendu}
        {error && <span className="text-danger-fg text-caption ml-2">{error}</span>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-stack-xs">
      <div className="flex items-center gap-stack-xs flex-wrap">{rendu}</div>
      {error && (
        <div className="text-danger-fg text-caption p-2 bg-danger-bg rounded-md" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default ChartExportButton;
