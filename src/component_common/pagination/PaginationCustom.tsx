import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import React from "react";
import { usePanigation, DOTS } from "./usePagination";

const PaginationCustom = ({
  onPageChange,
  pageSize,
  pageIndex = 1,
  size,
}: {
  onPageChange: (number: number) => void;
  pageSize: number;
  pageIndex: number;
  size: number;
}) => {
  const paginationRange: any = usePanigation({
    currentPage: pageIndex,
    totalCount: size,
    // siblingCount: 2,
    pageSize: pageSize,
  });

  const onPrevious: React.MouseEventHandler<HTMLElement> = (e) => {
    if (pageIndex == 1) return;
    onPageChange(pageIndex - 1);
  };

  let lastPage: number = paginationRange[paginationRange?.length - 1];
  console.log(lastPage);
  const onNext: React.MouseEventHandler<HTMLElement> = () => {
    if (pageIndex == lastPage) return;
    onPageChange(pageIndex + 1);
  };
  console.log(pageIndex);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem onClick={() => onPageChange(1)}>
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-md border bg-slate-50 text-gray-400 cursor-pointer`}
          >
            <i className="ri-skip-left-line"></i>
          </div>
        </PaginationItem>
        <PaginationItem onClick={onPrevious}>
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-md border text-gray-400 ${
              pageIndex == 1
                ? "bg-slate-200 cursor-auto"
                : "bg-slate-50 cursor-pointer"
            }`}
          >
            <i className="ri-arrow-left-s-line"></i>
          </div>
        </PaginationItem>

        {paginationRange.map((pageNumber: number, index: number) => {
          if (pageNumber == DOTS) {
            return (
              <PaginationItem>
                <PaginationEllipsis className="text-gray-400" />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem
              className={`cursor-pointer`}
              onClick={() => onPageChange(pageNumber)}
            >
              <div
                className={`h-8 px-3 text-sm flex items-center justify-center rounded-md border ${
                  pageIndex == pageNumber
                    ? "bg-primary text-gray-100"
                    : "bg-slate-50 text-gray-500"
                }`}
              >
                {pageNumber}
              </div>
            </PaginationItem>
          );
        })}
        {/* <PaginationItem className={`cursor-pointer`}>
          <div
            className={`text-gray-100 w-8 h-8 flex items-center justify-center rounded-md border ${
              pageIndex == 1 ? "px" : ""
            } ${pageIndex == 1 ? "bg-secondary" : "bg-slate-100"}`}
          >
            1
          </div>
        </PaginationItem>
        <PaginationItem className={`cursor-pointer`}>
          <div
            className={` w-8 h-8 flex items-center justify-center rounded-md border ${
              pageIndex == 2 ? "px" : ""
            } ${
              pageIndex == 2
                ? "bg-secondary text-gray-100"
                : "bg-slate-100 text-gray-600"
            }`}
          >
            2
          </div>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}

        <PaginationItem onClick={onNext}>
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-md border  text-gray-400 ${
              pageIndex == lastPage
                ? "bg-slate-200 cursor-auto"
                : "bg-slate-50 cursor-pointer"
            }`}
          >
            <i className="ri-arrow-right-s-line"></i>
          </div>
        </PaginationItem>
        <PaginationItem onClick={() => onPageChange(lastPage)}>
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-md border bg-slate-50 text-gray-400 cursor-pointer`}
          >
            <i className="ri-skip-right-line"></i>
          </div>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationCustom;
