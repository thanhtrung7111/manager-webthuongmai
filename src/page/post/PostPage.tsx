import BreadcrumbCustom from "@/component_common/breadcrumb/BreadcrumbCustom";
import ButtonForm from "@/component_common/commonForm/ButtonForm";
import TableCustom from "@/component_common/table/TableCustom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductObject } from "@/type/TypeCommon";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useNavigate } from "react-router-dom";
const breadBrumb = [
  {
    itemName: "Quản lí chung",
  },
  {
    itemName: "Danh sách bài viết",
    itemLink: "/post",
  },
];
const PostPage = () => {
  const navigate = useNavigate();
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
      meta: "Tên sản phẩm",
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
      meta: "Đơn vị tính",
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
        return (
          <div className="flex gap-x-2 justify-end">
            <ButtonForm
              className="!bg-yellow-500 !w-28"
              type="button"
              icon={<i className="ri-error-warning-line"></i>}
              label="Xem chi tiết"
            ></ButtonForm>

            <ButtonForm
              className="!bg-red-500 !w-20"
              type="button"
              icon={<i className="ri-delete-bin-line"></i>}
              label="Xóa"
              onClick={() => {
                // setObjectDelete(row.original);
                // setOpentDialogDelete(true);
                // handleDelete.mutateAsync({
                //   DCMNCODE: "inpProduct",
                //   KEY_CODE: row.original.KKKK0000,
                // });
              }}
            ></ButtonForm>
          </div>
        );
      },
    },
  ];
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
          Danh sách bài viết
        </h4>
        <div className="flex gap-x-2">
          <ButtonForm
            className="!bg-primary !w-28"
            type="button"
            icon={<i className="ri-download-2-line"></i>}
            label="Xuất excel"
          ></ButtonForm>
          <ButtonForm
            className="!bg-secondary !w-28"
            type="button"
            icon={<i className="ri-file-add-line"></i>}
            onClick={() => navigate("/create_post")}
            label="Thêm mới"
          ></ButtonForm>
        </div>
      </div>

      {/* table */}
      <div className="rounded-md p-5 bg-white border-gray-200 border shadow-md">
        <TableCustom
          data={[]}
          columns={columns}
          search={[
            { key: "PRDCCODE", name: "mã sản phẩm", type: "text" },
            // { key: "PRDCNAME", name: "tên sản phẩm", type: "text" },
            // {
            //   key: "QUOMNAME",
            //   name: "đơn vị tính",
            //   type: "combobox",
            //   dataList: lstQUOM,
            //   dataKey: "ITEMNAME",
            //   dataName: "ITEMNAME",
            // },
          ]}
          //   isLoading={isFetching}
        ></TableCustom>
      </div>
    </div>
  );
};

export default PostPage;
