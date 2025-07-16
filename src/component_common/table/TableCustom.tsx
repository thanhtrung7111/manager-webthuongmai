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
import { SearchObject, SearchObjectProduct } from "@/type/TypeCommon";
import SpinnerLoading from "../loading/SpinnerLoading";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ComboboxCustom from "../common_form/ComboboxCustom";
import ButtonForm from "../commonForm/ButtonForm";
import { useConfigurationStore } from "@/store/configurationStore";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  search: SearchObjectProduct[];
  unit: string;
  isLoading?: boolean;
  name: string;
}

const pageSize = 10;
// const pageSize = 3;
const TableCustom = <TData, TValue>({
  columns,
  data,
  search,
  unit,
  isLoading = false,
  name,
}: DataTableProps<TData, TValue>) => {
  const { setLocationPage, lstPage } = useConfigurationStore(
    (state) => state.pageConfig
  );
  const [initialData, setInitialData] = useState<TData[]>([]);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [lstSearch, setLstSearch] = useState<SearchObject[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pageIndex, setPageIndex] = useState<number>(
    lstPage.find((item) => item.namePage == name)?.numberPage ?? 0
  );
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
    const page = lstPage.find((item) => item.namePage == name);

    if (page) {
      let lstData: TData[] = [...data];
      page.lstSearch.forEach((item) => {
        lstData = lstData.filter(
          (i) => ((i as Record<string, any>)[`${item.keySearch}`] as string).indexOf(item.value.toString()) >=0
        );
      });
      setInitialData(lstData);
      return;
    }
    setInitialData(data);
  }, [data]);

  const handleSearch = () => {
    lstSearch.forEach((item) => {
      table.getColumn(`${item.keySearch}`)?.setFilterValue(item.value);
    });
    // setLstData({
    //   lstData: table.getRowModel().rows.map((item) => item.original),
    // });
    setLocationPage({ namePage: name, numberPage: 0, lstSearch: lstSearch });
    setPageIndex(0);
  };
  // console.log(lstPage);
  console.log(initialData);
  return (
    <div className="w-full">
      <div className="flex justify-between mb-3 border p-3 rounded-sm">
        <div className="flex gap-x-2 items-center">
          <Popover open={openSearch}>
            <PopoverTrigger>
              <Button
                className="flex items-center gap-x-2 h-8 font-normal text-xs bg-clr-warning"
                variant={"outline"}
                onClick={() => setOpenSearch(!openSearch)}
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
              className="grid relative grid-cols-2 gap-2 pt-10 w-[600px]"
              align="start"
            >
              <div
                className="absolute top-1 right-3 cursor-pointer text-sm"
                onClick={() => setOpenSearch(false)}
              >
                <i className="ri-close-large-line"></i>
              </div>
              {search.map((item: SearchObjectProduct) => {
                return item.type == "text" ? (
                  <input
                    placeholder={`Nhập ${item.name} tìm kiếm...`}
                    className="outline-none rounded-md border  h-8 border-gray-300 text-xs px-3"
                    onChange={(e) => {
                      const lstNew = lstSearch;
                      let getValue: SearchObject | undefined = lstSearch.find(
                        (i) => i.keySearch == item.key
                      );
                      let index: number = lstSearch.findIndex(
                        (i) => i.keySearch == item.key
                      );
                      if (index >= 0 && getValue) {
                        getValue.value = e.target.value;
                        lstNew[index] = getValue;
                      } else {
                        lstNew.push({
                          keySearch: item.key,
                          value: e.target.value,
                        });
                      }
                      setLstSearch([...lstNew]);
                    }}
                    onKeyDown={(e) => {
                      console.log("hello");
                      if (e.key == "Enter") {
                        handleSearch();
                      }
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
                      const lstNew = lstSearch;
                      let getValue: SearchObject | undefined = lstSearch.find(
                        (i) => i.keySearch == item.key
                      );
                      let index: number = lstSearch.findIndex(
                        (i) => i.keySearch == item.key
                      );
                      if (index >= 0 && getValue) {
                        getValue.value = value;
                        lstNew[index] = getValue;
                      } else {
                        lstNew.push({
                          keySearch: item.key,
                          value: value,
                        });
                      }
                      setLstSearch([...lstNew]);
                    }}
                  ></ComboboxCustom>
                );
              })}
              <ButtonForm
                className="absolute !w-28 -bottom-5 text-xs right-0 border border-gray-300 shadow-sm !bg-gray-100 hover:!bg-opacity-100 !text-gray-500"
                icon={<i className="ri-search-line"></i>}
                label="Tìm kiếm"
                type="button"
                onClick={handleSearch}
              ></ButtonForm>
            </PopoverContent>
          </Popover>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="group flex items-center h-8 gap-x-2 text-xs font-normal bg-clr-success hover:opacity-90 hover:bg-clr-success"
                  size={"sm"}
                  onClick={() => {
                    setInitialData(data);
                    table.resetColumnFilters();
                    table.toggleAllRowsSelected(false);
                    table.resetColumnVisibility();
                    table.resetPageIndex();
                    table.resetSorting();
                    setPageIndex(0);
                    setLocationPage({
                      namePage: name,
                      numberPage: 0,
                      lstSearch: [],
                    });
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
                className="ml-auto text-gray-600 h-8 focus:!ring-0 focus:!ring-transparent text-xs"
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
                      <span className="text-xs">
                        {" "}
                        {column.columnDef.meta as string}
                      </span>
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
          </div>
        ) : (
          <TableBody>
            {table.getRowModel().rows?.length > 0 ? (
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
                  className="h-20 text-center text-clr-content"
                >
                  Không có dữ liệu.
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
              setLocationPage({
                namePage: name ?? "",
                numberPage: value - 1,
                lstSearch: lstSearch,
              });
            }}
          ></PaginationCustom>
        </div>
      )}
    </div>
  );
};

export default TableCustom;
