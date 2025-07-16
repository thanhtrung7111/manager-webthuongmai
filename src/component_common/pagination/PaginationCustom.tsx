import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import React, { useState } from "react";
import { usePanigation, DOTS } from "./usePagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  const [pageValue, setPageValue] = useState<number>(pageIndex);
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

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem onClick={() => onPageChange(1)}>
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-md border  bg-clr-surface text-clr-content ${
              pageIndex == 1 ? "opacity-50" : "opacity-100"
            } cursor-pointer`}
          >
            <i className="ri-skip-left-line"></i>
          </div>
        </PaginationItem>
        <PaginationItem onClick={onPrevious}>
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-md border  bg-clr-surface text-clr-content ${
              pageIndex == 1 ? "opacity-50" : "opacity-100"
            }`}
          >
            <i className="ri-arrow-left-s-line"></i>
          </div>
        </PaginationItem>

        {paginationRange.map((pageNumber: number, index: number) => {
          if (pageNumber == DOTS) {
            return (
              <Popover>
                <PopoverTrigger asChild className="cursor-pointer" title="Tìm trang">
                  <PaginationItem>
                    <PaginationEllipsis className="text-gray-400" />
                  </PaginationItem>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input
                      type="email"
                      className="focus:!ring-0 focus:!ring-transparent text-xs h-8"
                      placeholder="Nhập số trang..."
                      onChange={(e) =>
                        setPageValue(
                          Number(e.target.value == "" ? -1 : e.target.value)
                        )
                      }
                      onKeyDown={(e) => {
                        if (pageValue == -1) return;
                        if (e.key == "Enter") {
                          onPageChange(pageValue);
                        }
                      }}
                    />
                    <Button
                      type="button"
                      className="bg-clr-primary text-clr-content h-8 text-xs"
                      onClick={(e) => {
                        if (pageValue == -1) return;
                        onPageChange(pageValue);
                      }}
                    >
                      Đến trang
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
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
                    ? "bg-clr-surface-accent text-clr-accent"
                    : "bg-clr-surface text-clr-content"
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
            className={`w-8 h-8 flex items-center justify-center rounded-md border  bg-clr-surface text-clr-content ${
              pageIndex == lastPage ? "opacity-50" : "opacity-100"
            }`}
          >
            <i className="ri-arrow-right-s-line"></i>
          </div>
        </PaginationItem>
        <PaginationItem onClick={() => onPageChange(lastPage)}>
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-md border  bg-clr-surface text-clr-content ${
              pageIndex == lastPage ? "opacity-50" : "opacity-100"
            }`}
          >
            <i className="ri-skip-right-line"></i>
          </div>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationCustom;
