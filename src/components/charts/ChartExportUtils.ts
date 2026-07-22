import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Papa from 'papaparse';

/**
 * Export chart as PNG using html2canvas
 * @param elementId - ID of the element to capture
 * @param filename - Output filename (without extension)
 */
export async function exportChartPng(elementId: string, filename: string): Promise<void> {
  try {
    const element = document.getElementById(elementId);
    if (!element) throw new Error(`Element with ID "${elementId}" not found`);

    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2, // 2x scale for crisp quality
      logging: false,
      useCORS: true,
    });

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${filename}.png`;
    link.click();
  } catch (error) {
    console.error('PNG export failed:', error);
    throw new Error(`Failed to export PNG: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Export chart as PDF with optional title and data table
 * @param elementId - ID of the chart element to capture
 * @param filename - Output filename (without extension)
 * @param options - Optional title and data
 */
export async function exportChartPdf(
  elementId: string,
  filename: string,
  options?: {
    title?: string;
    subtitle?: string;
    data?: Array<Record<string, string | number>>;
  }
): Promise<void> {
  try {
    const element = document.getElementById(elementId);
    if (!element) throw new Error(`Element with ID "${elementId}" not found`);

    // Capture chart as PNG
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2,
      logging: false,
      useCORS: true,
    });

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - 2 * margin;

    let yPosition = margin;

    // Add title if provided
    if (options?.title) {
      pdf.setFontSize(16);
      pdf.setTextColor(31, 62, 69); // ink-900
      const titleLines = pdf.splitTextToSize(options.title, contentWidth);
      pdf.text(titleLines, margin, yPosition);
      yPosition += titleLines.length * 8 + 5;
    }

    // Add subtitle if provided
    if (options?.subtitle) {
      pdf.setFontSize(11);
      pdf.setTextColor(85, 85, 85); // ink-600
      const subtitleLines = pdf.splitTextToSize(options.subtitle, contentWidth);
      pdf.text(subtitleLines, margin, yPosition);
      yPosition += subtitleLines.length * 6 + 5;
    }

    // Add chart image
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = contentWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Check if image fits on current page
    if (yPosition + imgHeight > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.addImage(imgData, 'PNG', margin, yPosition, imgWidth, imgHeight);
    yPosition += imgHeight + 10;

    // Add data table if provided
    if (options?.data && options.data.length > 0) {
      if (yPosition + 30 > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }

      const columns = Object.keys(options.data[0]);
      const rows = options.data.map((item) => columns.map((col) => String(item[col] ?? '')));

      pdf.setFontSize(10);
      pdf.setTextColor(31, 62, 69);

      // Draw table header
      pdf.setFont('helvetica', 'bold');
      let xPosition = margin;
      const colWidth = contentWidth / columns.length;

      columns.forEach((col) => {
        pdf.text(col, xPosition, yPosition);
        xPosition += colWidth;
      });

      yPosition += 7;
      pdf.setFont('helvetica', 'normal');

      // Draw table rows
      rows.forEach((row) => {
        if (yPosition + 5 > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }

        xPosition = margin;
        row.forEach((cell) => {
          pdf.text(String(cell).substring(0, 20), xPosition, yPosition);
          xPosition += colWidth;
        });
        yPosition += 5;
      });
    }

    // Save PDF
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('PDF export failed:', error);
    throw new Error(`Failed to export PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Export data as CSV
 * @param data - Array of objects to export
 * @param filename - Output filename (without extension)
 */
export function exportChartCsv(
  data: Array<Record<string, string | number>>,
  filename: string
): void {
  try {
    if (!data || data.length === 0) {
      throw new Error('No data to export');
    }

    const csv = Papa.unparse(data);
    const link = document.createElement('a');
    link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
    link.download = `${filename}.csv`;
    link.click();
  } catch (error) {
    console.error('CSV export failed:', error);
    throw new Error(`Failed to export CSV: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Generate filename with current date
 * @param prefix - Prefix for filename
 * @returns Filename with format: prefix-YYYY-MM-DD
 */
export function generateFilename(prefix: string): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${prefix}-${year}-${month}-${day}`;
}
