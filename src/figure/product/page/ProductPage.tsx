import BreadcrumbCustom from "@/component_common/breadcrumb/BreadcrumbCustom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TableCustom from "@/component_common/table/TableCustom";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductObject } from "@/type/TypeCommon";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import ButtonForm from "@/component_common/commonForm/ButtonForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SpinnerLoading from "@/component_common/loading/SpinnerLoading";
import { useGetLstQUOM } from "@/api/react_query/query_common";
import {
  useDeleteProduct,
  useGetLstProduct,
} from "@/api/react_query/query_product";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getLabelByKey } from "@/helper/commonHelper";
import { useConfigurationStore } from "@/store/configurationStore";

const ProductPage = () => {
  const { setLocationPage } = useConfigurationStore(
    (state) => state.pageConfig
  );

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [openDialogDelete, setOpentDialogDelete] = useState(false);
  const [objectDelete, setObjectDelete] = useState<ProductObject | null>(null);

  //Khai báo query và mutation
  const getLstProduct = useGetLstProduct({ key: "products" });
  const getLstQUOM = useGetLstQUOM();
  const deleteProduct = useDeleteProduct({ key: "products", update: true });

  const breadBrumb = [
    {
      itemName: "Quản lí chung",
    },
    {
      itemName: "Sản phẩm",
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
          className={`${
            table.getIsAllPageRowsSelected() &&
            "bg-clr-surface-accent text-clr-accent"
          }`}
          onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          className={`${
            row.getIsSelected() && "bg-clr-surface-accent text-clr-accent"
          }`}
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
        return (
          <Popover>
            <PopoverTrigger
              asChild
              className="cursor-pointer block h-6 text-end pr-5"
            >
              <i className="ri-more-2-fill"></i>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0 text-sm py-1" align="end">
              <div
                // onClick={() => logoutUser()}
                className="flex gap-x-2 items-center text-gray-500 cursor-pointer hover:bg-gray-100 px-2 py-2"
                onClick={() => {
                  navigate("/update_product/" + row.original.KKKK0000);
                }}
              >
                <i className="ri-error-warning-line"></i>
                Xem chi tiết
              </div>
              <div
                className="flex gap-x-2 items-center text-gray-500 cursor-pointer hover:bg-gray-100 px-2 py-2"
                onClick={() => {
                  setObjectDelete(row.original);
                  setOpentDialogDelete(true);
                  // deleteProduct.mutateAsync({
                  //   DCMNCODE: "inpProduct",
                  //   KEY_CODE: row.original.KKKK0000,
                  // });
                }}
              >
                <i className="ri-delete-bin-line"></i>
                Xóa
              </div>
            </PopoverContent>
          </Popover>
        );
      },
    },
  ];

  return (
    <>
      <Dialog
        open={openDialogDelete}
        onOpenChange={() => {
          if (!deleteProduct.isPending) {
            setOpentDialogDelete(false);
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Thông báo</DialogTitle>
            <div className="w-full overflow-hidden">
              <div
                className={`${
                  deleteProduct.isSuccess ? "-translate-x-1/2" : "translate-x-0"
                } w-[200%] grid grid-cols-2 transition-transform`}
              >
                <div className="flex flex-col">
                  <DialogDescription className="flex items-center mb-5 justify-center gap-x-2 py-6">
                    {deleteProduct.isPending ? (
                      <>
                        <SpinnerLoading className="w-6 h-6 fill-primary"></SpinnerLoading>
                        <span className="text-gray-700 text-base">
                          Đang xóa sản phẩm...
                        </span>
                      </>
                    ) : (
                      <>
                        <i className="ri-delete-bin-line text-gray-700 text-xl"></i>
                        <span className="text-gray-700 text-base">
                          Bạn có muốn xóa tag
                          <b className="text-gray-500">
                            {" "}
                            {objectDelete?.TAG_NAME}
                          </b>{" "}
                          ?
                        </span>
                      </>
                    )}
                  </DialogDescription>
                  <div className="flex gap-x-2 justify-end">
                    <ButtonForm
                      type="button"
                      className="!w-28 !bg-secondary"
                      label="Xác nhận"
                      onClick={async () => {
                        if (objectDelete != null)
                          deleteProduct.mutateAsync({
                            KEY_CODE: objectDelete?.KKKK0000,
                          });
                      }}
                    ></ButtonForm>
                    <ButtonForm
                      type="button"
                      className="!w-28 !bg-red-500"
                      label="Đóng"
                      onClick={() => {
                        setOpentDialogDelete(false);
                      }}
                    ></ButtonForm>
                  </div>
                </div>
                <div className="flex flex-col">
                  <DialogDescription className="flex items-center mb-5 justify-center gap-x-2 py-6">
                    <i className="ri-checkbox-line text-gray-700 text-xl"></i>{" "}
                    <span className="text-gray-700 text-base">
                      Xóa thành công!
                    </span>
                  </DialogDescription>
                  <div className="flex gap-x-2 justify-end">
                    <ButtonForm
                      type="button"
                      className="!w-28 !bg-secondary"
                      label="Thêm mới"
                      onClick={() => {
                        navigate("/create_product");
                      }}
                    ></ButtonForm>
                    <ButtonForm
                      type="button"
                      className="!w-28 !bg-red-500"
                      label="Đóng"
                      onClick={() => {
                        setOpentDialogDelete(false);
                      }}
                    ></ButtonForm>
                  </div>
                </div>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col gap-y-2">
        <div className="mb-1">
          <BreadcrumbCustom
            linkList={breadBrumb}
            itemName={"itemName"}
            itemLink={"itemLink"}
          ></BreadcrumbCustom>
        </div>

        {/* Action  */}

        {/* table */}
        <div className="grid grid-cols-[3fr_1fr] gap-x-3">
          <div className="rounded-sm p-5 pt-3 bg-clr-sidebar border border-clr-sidebar shadow-md">
            <div className="flex justify-between items-center mb-5">
              <h4 className="text-xl font-medium text-clr-content border-l-4 pl-2 border-clr-content">
                Danh mục
              </h4>
              <div className="flex gap-x-2">
                <ButtonForm
                  className="bg-clr-warning !w-28"
                  type="button"
                  icon={<i className="ri-download-2-line"></i>}
                  label="Xuất excel"
                ></ButtonForm>
                <ButtonForm
                  className="bg-clr-success !w-28"
                  type="button"
                  icon={<i className="ri-file-add-line"></i>}
                  onClick={() => navigate("/create_product")}
                  label={getLabelByKey({ key: 14, defaultLabel: "Thêm mới" })}
                ></ButtonForm>
              </div>
            </div>
            <TableCustom
              data={getLstProduct.data ? getLstProduct.data : []}
              columns={columns}
              unit="sản phẩm"
              search={[
                { key: "PRDCCODE", name: "mã sản phẩm", type: "text" },
                { key: "PRDCNAME", name: "tên sản phẩm", type: "text" },
                {
                  key: "QUOMNAME",
                  name: "đơn vị tính",
                  type: "combobox",
                  dataList: getLstQUOM.data,
                  dataKey: "ITEMNAME",
                  dataName: "ITEMNAME",
                },
              ]}
              isLoading={getLstProduct.isFetching}
              name="product"
            ></TableCustom>
          </div>

          <div className="rounded-sm p-5 pt-3 bg-clr-sidebar border border-clr-sidebar shadow-md h-96">
            <div className="flex justify-between items-center mb-5">
              <h4 className="text-xl font-medium text-clr-content border-l-4 pl-2 border-clr-content">
                Sản phẩm vừa xem
              </h4>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default ProductPage;
