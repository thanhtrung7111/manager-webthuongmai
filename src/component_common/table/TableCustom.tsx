import { useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationCustom from "../pagination/PaginationCustom";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { SearchObjectProduct } from "@/type/TypeCommon";
import SpinnerLoading from "../loading/SpinnerLoading";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ComboboxCustom from "../common_form/ComboboxCustom";
import ButtonForm from "../commonForm/ButtonForm";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  search: SearchObjectProduct[];
  unit: string;
  isLoading?: boolean;
}
const pageSize = 20;
const TableCustom = <TData, TValue>({
  columns,
  data,
  search,
  unit,
  isLoading = false,
}: DataTableProps<TData, TValue>) => {
  const [initialData, setInitialData] = useState<TData[]>(data);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pageIndex, setPageIndex] = useState<number>(0);
  const table = useReactTable({
    data: initialData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      pagination: {
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLTableRowElement>,
    index: number
  ) => {
    event.preventDefault();
    setHoverIndex(index);
  };

  const handleDrop = (index: number) => {
    console.log(index);
    console.log(draggedIndex);
    if (draggedIndex === null || draggedIndex === index) {
      setDraggedIndex(null);
      setHoverIndex(null);
      return;
    }
    // Hoán đổi vị trí hai phần tử
    const newData = [...initialData];
    [
      newData[draggedIndex + pageIndex * pageSize],
      newData[index + pageIndex * pageSize],
    ] = [
      newData[index + pageIndex * pageSize],
      newData[draggedIndex + pageIndex * pageSize],
    ];

    setInitialData([...newData]);
    setDraggedIndex(null);
    setHoverIndex(null);
  };
  useEffect(() => {
    setInitialData(data);
  }, [data]);
  return (
    <div className="w-full">
      <div className="flex justify-between mb-3 border p-3 rounded-sm">
        <div className="flex gap-x-2 items-center">
          <Popover>
            <PopoverTrigger>
              <Button
                className="flex items-center gap-x-2 bg-clr-warning"
                variant={"outline"}
                type="submit"
                size={"sm"}
              >
                <span className="text-white">Lọc</span>
                <div className="rotate-0 transition-transform duration-500 cursor-pointer">
                  <i className="ri-filter-line text-white"></i>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="grid relative grid-cols-2 gap-2 w-[600px]"
              align="start"
            >
              {search.map((item: SearchObjectProduct) => {
                return item.type == "text" ? (
                  <input
                    placeholder={`Nhập ${item.name} tìm kiếm...`}
                    className="outline-none rounded-md border border-gray-300 text-sm py-2 px-3"
                    onBlur={(e) => {
                      table
                        .getColumn(`${item.key}`)
                        ?.setFilterValue(e.target.value);

                      setPageIndex(0);
                    }}
                  ></input>
                ) : (
                  <ComboboxCustom
                    dataList={
                      item.dataList && item.dataList?.length > 1
                        ? item.dataList
                        : []
                    }
                    dataKey={item.dataKey ? item.dataKey : ""}
                    dataName={item.dataName ? item.dataName : ""}
                    placeholder={item.name}
                    onChange={(value) => {
                      table.getColumn(`${item.key}`)?.setFilterValue(value);
                      setPageIndex(0);
                    }}
                  ></ComboboxCustom>
                );
              })}
              <ButtonForm
                className="absolute !w-28 -bottom-5 right-0 border border-gray-300 shadow-sm !bg-gray-100 hover:!bg-opacity-100 !text-gray-500"
                icon={<i className="ri-search-line"></i>}
                label="Tìm kiếm"
                type="submit"
              ></ButtonForm>
            </PopoverContent>
          </Popover>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="group flex items-center gap-x-2 bg-clr-success hover:opacity-90 hover:bg-clr-success"
                  size={"sm"}
                  onClick={() => {
                    table.resetColumnFilters();
                    table.toggleAllRowsSelected(false);
                    table.resetColumnVisibility();
                    table.resetPageIndex();
                    table.resetSorting();
                    setPageIndex(0);
                  }}
                  variant={"outline"}
                >
                  <span className="text-white">Làm mới</span>
                  <div className="rotate-0 group-hover:rotate-90 transition-transform duration-500 cursor-pointer">
                    <i className="ri-refresh-line text-xl text-white"></i>
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex gap-x-2 items-center">
          <div className="flex-1 text-sm text-clr-content">
            <span className="font-semibold">
              ({pageIndex * pageSize} -{" "}
              {pageIndex * pageSize + pageSize >=
              table.getCoreRowModel().rows.length
                ? table.getCoreRowModel().rows.length.toLocaleString("en-US")
                : (pageIndex * pageSize + pageSize).toLocaleString("en-US")}
              )
            </span>{" "}
            trên{" "}
            <span className="font-semibold">
              {table.getCoreRowModel().rows.length.toLocaleString("en-US")}{" "}
              {unit.toLowerCase()}
            </span>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto text-gray-600 focus:!ring-0 focus:!ring-transparent text-xs"
                size={"sm"}
              >
                Hiển thị cột <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0 py-1" align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <div
                      key={column.id}
                      className="capitalize cursor-pointer flex text-gray-800 gap-x-2 text-sm px-3 py-1 hover:bg-slate-100"
                      onClick={(value) =>
                        column.toggleVisibility(!column.getIsVisible())
                      }
                    >
                      {/* { && ( */}
                      <i
                        className={`${
                          column.getIsVisible() ? "visible" : "invisible"
                        } ri-check-line`}
                      ></i>
                      {/* )} */}
                      {column.columnDef.meta as string}
                    </div>
                  );
                })}
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Table id="table" className="bg-transparent relative z-0">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="p-2 text-clr-content">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        {isLoading ? (
          <div className="py-5 flex items-center gap-x-3">
            <SpinnerLoading className="w-6 h-6 fill-primary"></SpinnerLoading>
            <span className="text-gray-500">Đang tải dữ liệu...</span>
          </div>
        ) : (
          <TableBody>
            {table.getRowModel().rows?.length || data.length != 0 ? (
              table.getRowModel().rows.map((row, index: number) => (
                <TableRow
                  className={`cursor-pointer ${
                    index % 2 === 0 ? "bg-transparent" : "bg-"
                  } ${
                    hoverIndex == index &&
                    "border-2 border-dashed border-clr-warning"
                    // : "border-r-0 border-l-0 border-solid"
                  } ${
                    draggedIndex == index &&
                    "!border-cyan-600 !border-2 border-dashed"
                  }`}
                  key={row.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={() => handleDrop(index)}
                  // data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-clr-content !p-2 !w-fit"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-20 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}{" "}
          </TableBody>
        )}
      </Table>
      {table.getFilteredRowModel().rows.length > pageSize && (
        <div className="flex items-center justify-center space-x-2 py-4 mt-5">
          <PaginationCustom
            size={table.getFilteredRowModel().rows.length}
            pageIndex={pageIndex + 1}
            pageSize={pageSize}
            onPageChange={(value) => {
              setPageIndex(value - 1);
              // window.scrollTo("table");
            }}
          ></PaginationCustom>
        </div>
      )}
    </div>
  );
};

export default TableCustom;
