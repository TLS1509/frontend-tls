import * as React from "react";
import { cn } from "./utils";
import { Button } from "./button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";

interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  disabled?: boolean;
}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      className,
      currentPage,
      totalPages,
      onPageChange,
      siblingCount = 1,
      showFirstLast = true,
      showPrevNext = true,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const range = (start: number, end: number) => {
      const length = end - start + 1;
      return Array.from({ length }, (_, idx) => idx + start);
    };

    const paginationRange = React.useMemo(() => {
      const totalPageNumbers = siblingCount + 5;

      if (totalPageNumbers >= totalPages) {
        return range(1, totalPages);
      }

      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

      const firstPageIndex = 1;
      const lastPageIndex = totalPages;

      if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = 3 + 2 * siblingCount;
        const leftRange = range(1, leftItemCount);
        return [...leftRange, "dots", totalPages];
      }

      if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightItemCount = 3 + 2 * siblingCount;
        const rightRange = range(totalPages - rightItemCount + 1, totalPages);
        return [firstPageIndex, "dots", ...rightRange];
      }

      if (shouldShowLeftDots && shouldShowRightDots) {
        const middleRange = range(leftSiblingIndex, rightSiblingIndex);
        return [firstPageIndex, "dots", ...middleRange, "dots", lastPageIndex];
      }

      return [];
    }, [totalPages, currentPage, siblingCount]);

    const handlePageChange = (page: number) => {
      if (page < 1 || page > totalPages || disabled) return;
      onPageChange(page);
    };

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Pagination"
        className={cn("flex items-center justify-center gap-1", className)}
        {...props}
      >
        {/* First page */}
        {showFirstLast && (
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1 || disabled}
            aria-label="Première page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
        )}

        {/* Previous page */}
        {showPrevNext && (
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || disabled}
            aria-label="Page précédente"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}

        {/* Page numbers */}
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === "dots") {
            return (
              <Button
                key={`dots-${index}`}
                variant="ghost"
                size="icon-sm"
                disabled
                aria-label="Plus de pages"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            );
          }

          return (
            <Button
              key={pageNumber}
              variant={currentPage === pageNumber ? "default" : "outline"}
              size="icon-sm"
              onClick={() => handlePageChange(pageNumber as number)}
              disabled={disabled}
              aria-label={`Page ${pageNumber}`}
              aria-current={currentPage === pageNumber ? "page" : undefined}
            >
              {pageNumber}
            </Button>
          );
        })}

        {/* Next page */}
        {showPrevNext && (
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || disabled}
            aria-label="Page suivante"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}

        {/* Last page */}
        {showFirstLast && (
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages || disabled}
            aria-label="Dernière page"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        )}
      </nav>
    );
  }
);
Pagination.displayName = "Pagination";

// Info component pour afficher "Page X sur Y"
interface PaginationInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsPerPage?: number;
}

function PaginationInfo({
  className,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  ...props
}: PaginationInfoProps) {
  const startItem = totalItems && itemsPerPage ? (currentPage - 1) * itemsPerPage + 1 : null;
  const endItem =
    totalItems && itemsPerPage
      ? Math.min(currentPage * itemsPerPage, totalItems)
      : null;

  return (
    <div
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    >
      {totalItems && startItem && endItem ? (
        <span>
          Affichage de {startItem} à {endItem} sur {totalItems} résultats
        </span>
      ) : (
        <span>
          Page {currentPage} sur {totalPages}
        </span>
      )}
    </div>
  );
}

export { Pagination, PaginationInfo };
