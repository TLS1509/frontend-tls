import * as React from "react";
import { useState } from "react";
import { cn } from "./utils";
import { Button } from "./button";
import { Input } from "./input";
import { 
  ChevronDown, 
  ChevronUp, 
  ChevronsUpDown,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Checkbox } from "./checkbox";

export interface Column<T> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  accessorFn?: (row: T) => any;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  searchable?: boolean;
  width?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  selectable?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
  pagination?: boolean;
  pageSize?: number;
  className?: string;
  emptyState?: React.ReactNode;
}

type SortDirection = "asc" | "desc" | null;

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchable = false,
  searchPlaceholder = "Rechercher...",
  selectable = false,
  onSelectionChange,
  pagination = false,
  pageSize: initialPageSize = 10,
  className,
  emptyState,
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Get cell value
  const getCellValue = (row: T, column: Column<T>) => {
    if (column.accessorFn) {
      return column.accessorFn(row);
    }
    if (column.accessorKey) {
      return row[column.accessorKey];
    }
    return "";
  };

  // Filter data based on search
  const filteredData = React.useMemo(() => {
    if (!searchQuery) return data;

    const searchableColumns = columns.filter((col) => col.searchable !== false);
    
    return data.filter((row) =>
      searchableColumns.some((column) => {
        const value = getCellValue(row, column);
        return String(value).toLowerCase().includes(searchQuery.toLowerCase());
      })
    );
  }, [data, searchQuery, columns]);

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortColumn || !sortDirection) return filteredData;

    const column = columns.find((col) => col.id === sortColumn);
    if (!column) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = getCellValue(a, column);
      const bValue = getCellValue(b, column);

      if (aValue === bValue) return 0;

      const comparison = aValue < bValue ? -1 : 1;
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [filteredData, sortColumn, sortDirection, columns]);

  // Paginate data
  const paginatedData = React.useMemo(() => {
    if (!pagination) return sortedData;

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return sortedData.slice(start, end);
  }, [sortedData, currentPage, pageSize, pagination]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  // Handle sort
  const handleSort = (columnId: string) => {
    const column = columns.find((col) => col.id === columnId);
    if (!column?.sortable) return;

    if (sortColumn === columnId) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortColumn(null);
      }
    } else {
      setSortColumn(columnId);
      setSortDirection("asc");
    }
  };

  // Handle selection
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(paginatedData.map((_, idx) => idx)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (index: number, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(index);
    } else {
      newSelected.delete(index);
    }
    setSelectedRows(newSelected);
  };

  React.useEffect(() => {
    if (onSelectionChange) {
      const selected = paginatedData.filter((_, idx) => selectedRows.has(idx));
      onSelectionChange(selected);
    }
  }, [selectedRows, paginatedData, onSelectionChange]);

  // Render sort icon
  const SortIcon = ({ columnId }: { columnId: string }) => {
    if (sortColumn !== columnId) {
      return <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />;
    }
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  const allSelected = paginatedData.length > 0 && selectedRows.size === paginatedData.length;
  const someSelected = selectedRows.size > 0 && selectedRows.size < paginatedData.length;

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Search */}
      {searchable && (
        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          {selectedRows.size > 0 && (
            <div className="text-sm text-muted-foreground">
              {selectedRows.size} ligne{selectedRows.size > 1 ? "s" : ""} sélectionnée{selectedRows.size > 1 ? "s" : ""}
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="rounded-[var(--radius-lg)] border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b">
              <tr>
                {selectable && (
                  <th className="w-12 px-4 py-3 text-left">
                    <Checkbox
                      checked={allSelected}
                      indeterminate={someSelected}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.id}
                    className={cn(
                      "px-4 py-3 text-left text-sm font-medium",
                      column.sortable && "cursor-pointer select-none hover:bg-muted/80 transition-colors"
                    )}
                    style={{ width: column.width }}
                    onClick={() => column.sortable && handleSort(column.id)}
                  >
                    <div className="flex items-center gap-2">
                      <span>{column.header}</span>
                      {column.sortable && <SortIcon columnId={column.id} />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + (selectable ? 1 : 0)} className="py-12 text-center">
                    {emptyState || (
                      <div className="text-muted-foreground">
                        {searchQuery ? "Aucun résultat trouvé" : "Aucune donnée"}
                      </div>
                    )}
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={cn(
                      "hover:bg-muted/30 transition-colors",
                      selectedRows.has(rowIndex) && "bg-muted/50"
                    )}
                  >
                    {selectable && (
                      <td className="px-4 py-3">
                        <Checkbox
                          checked={selectedRows.has(rowIndex)}
                          onCheckedChange={(checked) => handleSelectRow(rowIndex, checked as boolean)}
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td key={column.id} className="px-4 py-3 text-sm">
                        {column.cell
                          ? column.cell(row)
                          : getCellValue(row, column)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} sur {totalPages} • {sortedData.length} résultat{sortedData.length > 1 ? "s" : ""}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <Button
                    key={i}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="icon-sm"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
