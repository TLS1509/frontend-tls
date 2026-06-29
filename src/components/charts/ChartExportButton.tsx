import React, { useState } from 'react';
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

  const handleExportPng = async () => {
    try {
      setLoading('png');
      setError(null);
      await exportChartPng(chartId, filename);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed');
    } finally {
      setLoading(null);
    }
  };

  const handleExportPdf = async () => {
    try {
      setLoading('pdf');
      setError(null);
      await exportChartPdf(chartId, filename, { title, subtitle, data });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed');
    } finally {
      setLoading(null);
    }
  };

  const handleExportCsv = async () => {
    try {
      setLoading('csv');
      setError(null);
      if (!data) throw new Error('No data available for CSV export');
      exportChartCsv(data, filename);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed');
    } finally {
      setLoading(null);
    }
  };

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2">
        {showPng && (
          <button
            onClick={handleExportPng}
            disabled={loading !== null}
            className="inline-flex items-center justify-center gap-1.5 h-9 px-3 text-body-sm font-semibold rounded-pill bg-primary-50 text-primary-700 hover:bg-primary-100 active:bg-primary-200 disabled:opacity-disabled disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 transition-colors duration-200"
            title="Export as PNG"
            aria-label="Export chart as PNG"
          >
            <Download size={16} />
            {loading === 'png' ? 'Exporting...' : 'PNG'}
          </button>
        )}

        {showPdf && (
          <button
            onClick={handleExportPdf}
            disabled={loading !== null}
            className="inline-flex items-center justify-center gap-1.5 h-9 px-3 text-body-sm font-semibold rounded-pill bg-secondary-50 text-secondary-700 hover:bg-secondary-100 active:bg-secondary-200 disabled:opacity-disabled disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500 transition-colors duration-200"
            title="Export as PDF"
            aria-label="Export chart as PDF"
          >
            <DownloadCloud size={16} />
            {loading === 'pdf' ? 'Exporting...' : 'PDF'}
          </button>
        )}

        {showCsv && data && (
          <button
            onClick={handleExportCsv}
            disabled={loading !== null}
            className="inline-flex items-center justify-center gap-1.5 h-9 px-3 text-body-sm font-semibold rounded-pill bg-accent-50 text-accent-600 hover:bg-accent-100 active:bg-accent-200 disabled:opacity-disabled disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 transition-colors duration-200"
            title="Export as CSV"
            aria-label="Export data as CSV"
          >
            <FileJson size={16} />
            {loading === 'csv' ? 'Exporting...' : 'CSV'}
          </button>
        )}

        {error && <span className="text-danger-base text-caption ml-2">{error}</span>}
      </div>
    );
  }

  // Full variant with labels
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 flex-wrap">
        {showPng && (
          <button
            onClick={handleExportPng}
            disabled={loading !== null}
            className="inline-flex items-center justify-center gap-1.5 h-10 px-4 text-body-sm font-semibold rounded-pill bg-primary-600 text-white shadow-sm hover:bg-primary-700 active:bg-primary-800 disabled:opacity-disabled disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 transition-all duration-200"
            title="Export as PNG"
            aria-label="Export chart as PNG"
          >
            <Download size={18} />
            {loading === 'png' ? 'Exporting...' : 'Export PNG'}
          </button>
        )}

        {showPdf && (
          <button
            onClick={handleExportPdf}
            disabled={loading !== null}
            className="inline-flex items-center justify-center gap-1.5 h-10 px-4 text-body-sm font-semibold rounded-pill bg-secondary-600 text-white shadow-sm hover:bg-secondary-700 active:bg-secondary-800 disabled:opacity-disabled disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500 transition-all duration-200"
            title="Export as PDF"
            aria-label="Export chart as PDF"
          >
            <DownloadCloud size={18} />
            {loading === 'pdf' ? 'Exporting...' : 'Export PDF'}
          </button>
        )}

        {showCsv && data && (
          <button
            onClick={handleExportCsv}
            disabled={loading !== null}
            className="inline-flex items-center justify-center gap-1.5 h-10 px-4 text-body-sm font-semibold rounded-pill bg-accent-400 text-ink-900 shadow-sm hover:bg-accent-500 active:bg-accent-600 disabled:opacity-disabled disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 transition-all duration-200"
            title="Export as CSV"
            aria-label="Export data as CSV"
          >
            <FileJson size={18} />
            {loading === 'csv' ? 'Exporting...' : 'Export CSV'}
          </button>
        )}
      </div>

      {error && (
        <div className="text-danger-base text-caption p-2 bg-danger-bg rounded-md" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default ChartExportButton;
