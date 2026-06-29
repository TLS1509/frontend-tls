import React from 'react';
import { ChartExportButton } from './ChartExportButton';

interface ChartWithExportProps {
  /** Chart element ID for exports */
  chartId: string;
  /** Export filename prefix */
  filename?: string;
  /** The chart component to render */
  children: React.ReactNode;
  /** Data for CSV export (optional) */
  data?: Array<Record<string, string | number>>;
  /** Chart title for PDF export */
  title?: string;
  /** Chart subtitle for PDF export */
  subtitle?: string;
  /** Export button variant */
  exportVariant?: 'compact' | 'full';
  /** Additional wrapper CSS */
  className?: string;
}

/**
 * ChartWithExport — Wrapper component for charts with built-in export functionality
 * Handles: PNG (html2canvas), PDF (jsPDF), CSV (papaparse)
 * Usage: wrap any chart with <ChartWithExport><YourChart /></ChartWithExport>
 */
export const ChartWithExport: React.FC<ChartWithExportProps> = ({
  chartId,
  filename = 'chart',
  children,
  data,
  title,
  subtitle,
  exportVariant = 'compact',
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Export button */}
      <div className="flex justify-end">
        <ChartExportButton
          chartId={chartId}
          filename={filename}
          data={data}
          title={title}
          subtitle={subtitle}
          variant={exportVariant}
          showPdf={!!title}
          showCsv={!!data}
        />
      </div>

      {/* Chart */}
      <div id={chartId}>
        {children}
      </div>
    </div>
  );
};

export default ChartWithExport;
