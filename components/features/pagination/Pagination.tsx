import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationItem,
  PaginationContent,
  PaginationEllipsis,
} from "@/components/ui/pagination";

type PaginationProps = {
  onPageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
};

export const PaginationTeste = ({
  onPageChange,
  currentPage,
  totalPages,
}: PaginationProps) => {
  return (
    <Pagination className="mt-10">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <Button
              variant="secondary"
              className="rounded mb-5 bg-transparent"
              onClick={() => onPageChange(currentPage - 1)}
            >
              <ChevronLeft />
            </Button>
          </PaginationItem>
        )}
        {Array.from({ length: totalPages }).map((_, index) => (
          <PaginationItem key={index}>
            <Button
              variant="secondary"
              className="rounded mb-5 bg-transparent"
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </Button>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        {totalPages !== currentPage && (
          <PaginationItem>
            <Button
              variant="secondary"
              className="rounded mb-5 bg-transparent"
              onClick={() => onPageChange(currentPage + 1)}
            >
              <ChevronRight />
            </Button>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
