import BreadcrumbCustom from "@/component_common/breadcrumb/BreadcrumbCustom";
import { Button } from "@/components/ui/button";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDataCondition } from "@/assets/api/commonApi";
import { error } from "console";
import TableCustom from "@/component_common/table/TableCustom";
import { payments } from "@/component_common/data/data";
import { Checkbox } from "@/components/ui/checkbox";
import { Payment, ProductObject } from "@/type/TypeCommon";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isFetching, error, isSuccess } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetchDataCondition({
        DCMNCODE: "appPrdcList",
        PARACODE: "001",
        LCTNCODE: "001",
        CURRDATE: "2024-09-17",
        CUSTCODE: "%",
        SHOPCODE: "%",
        KEY_WORD: "%",
      }),
  });
  const breadBrumb = [
    {
      itemName: "Quản lí chung",
    },
    {
      itemName: "Danh sách sản phẩm",
      itemLink: "/product",
    },
  ];
  const columns: ColumnDef<ProductObject>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "PRDCCODE",
      meta: "Mã sản phẩm",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Mã sản phẩm
            {column.getIsSorted() === "asc" ? (
              <i className="ri-arrow-up-line"></i>
            ) : (
              <i className="ri-arrow-down-line"></i>
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("PRDCCODE")}</div>
      ),
      enableHiding: true,
    },
    {
      accessorKey: "PRDCNAME",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tên sản phẩm
            {column.getIsSorted() === "asc" ? (
              <i className="ri-arrow-up-line"></i>
            ) : (
              <i className="ri-arrow-down-line"></i>
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("PRDCNAME")}</div>
      ),
      enableHiding: true,
    },
    {
      accessorKey: "QUOMNAME",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Đơn vị tính
            {column.getIsSorted() === "asc" ? (
              <i className="ri-arrow-up-line"></i>
            ) : (
              <i className="ri-arrow-down-line"></i>
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className="capitalize"
          onClick={() => row.toggleSelected(!row?.getIsSelected())}
        >
          {row.getValue("QUOMNAME")}
        </div>
      ),
      enableHiding: true,
    },
    {
      id: "actions",
      header: () => {
        return <div className="flex justify-end">Tác vụ</div>;
      },
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;
        console.log(payment);
        return (
          <div className="flex gap-x-2 justify-end">
            <Button className="bg-yellow-500 hover:bg-yellow-400" size={"sm"}>
              <i className="ri-error-warning-line"></i>{" "}
              <span className="ml-2">Xem chi tiết</span>
            </Button>
            <Button className="bg-red-600 hover:bg-red-500" size={"sm"}>
              <i className="ri-delete-bin-line"></i>{" "}
              <span className="text-sm ml-2">Xóa</span>
            </Button>
          </div>
        );
      },
    },
  ];
  console.log(data);
  return (
    <div className="flex flex-col gap-y-2">
      <div className="mb-3">
        <BreadcrumbCustom
          linkList={breadBrumb}
          itemName={"itemName"}
          itemLink={"itemLink"}
        ></BreadcrumbCustom>
      </div>

      {/* Action  */}
      <div className="flex justify-between items-center">
        <h4 className="text-xl font-medium text-gray-600">
          Danh sách sản phẩm
        </h4>
        <div className="flex gap-x-2">
          <Button className="transition-colors" size={"sm"}>
            <i className="ri-download-2-line mr-2"></i>Xuất excel
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-500 transition-colors"
            size={"sm"}
            onClick={() => navigate("/create_product")}
          >
            Thêm mới
          </Button>
        </div>
      </div>

      {/* table */}
      <div className="rounded-md p-5 bg-white border-gray-200 border shadow-md">
        <TableCustom
          data={isSuccess ? data : []}
          columns={columns}
          search={[
            { key: "PRDCCODE", name: "mã sản phẩm" },
            { key: "PRDCNAME", name: "tên sản phẩm" },
          ]}
          isLoading={isFetching}
        ></TableCustom>
      </div>
    </div>
  );
};

export default ProductPage;
