import BreadcrumbCustom from "@/component_common/breadcrumb/BreadcrumbCustom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteData, fetchCategory, fetchDataCondition } from "@/api/commonApi";
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

const ProductPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [openDialogDelete, setOpentDialogDelete] = useState(false);
  const [objectDelete, setObjectDelete] = useState<ProductObject | null>(null);
  const { data, isFetching, isSuccess } = useQuery({
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
  const {
    data: lstQUOM,
    isFetching: isFetchingLstQUOM,
    isSuccess: isSuccessLstQUOM,
  } = useQuery({
    queryKey: ["lstQUOM"],
    queryFn: () => fetchCategory("lstQUOM"),
  });

  const handleDelete = useMutation({
    mutationFn: (body: { [key: string]: any }) => deleteData(body),
    onSuccess: async (data: ProductObject[], body) => {
      if (queryClient.getQueryData(["products"])) {
        queryClient.setQueryData(["products"], (oldData: ProductObject[]) => {
          if (!oldData) return [];
          console.log(data);
          console.log(body);
          return oldData.filter((item) => item.KKKK0000 !== body.KEY_CODE);
        });
      }
    },
    onError: (error) => {
      console.log(error);
    },
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
          <div className="flex gap-x-2 justify-end">
            <ButtonForm
              className="!bg-yellow-500 !w-28"
              type="button"
              icon={<i className="ri-error-warning-line"></i>}
              label="Xem chi tiết"
              onClick={() =>
                navigate("/update_product/" + row.original.KKKK0000)
              }
            ></ButtonForm>

            <ButtonForm
              className="!bg-red-500 !w-20"
              type="button"
              icon={<i className="ri-delete-bin-line"></i>}
              label="Xóa"
              onClick={() => {
                setObjectDelete(row.original);
                setOpentDialogDelete(true);
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
  console.log(data);
  return (
    <>
      <Dialog
        open={openDialogDelete}
        onOpenChange={() => {
          if (!handleDelete.isPending) {
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
                  handleDelete.isSuccess ? "-translate-x-1/2" : "translate-x-0"
                } w-[200%] grid grid-cols-2 transition-transform`}
              >
                <div className="flex flex-col">
                  <DialogDescription className="flex items-center mb-5 justify-center gap-x-2 py-6">
                    {handleDelete.isPending ? (
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
                          handleDelete.mutateAsync({
                            DCMNCODE: "inpProduct",
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
              onClick={() => navigate("/create_product")}
              label="Thêm mới"
            ></ButtonForm>
          </div>
        </div>

        {/* table */}
        <div className="rounded-md p-5 bg-white border-gray-200 border shadow-md">
          <TableCustom
            data={isSuccess ? data : []}
            columns={columns}
            search={[
              { key: "PRDCCODE", name: "mã sản phẩm", type: "text" },
              { key: "PRDCNAME", name: "tên sản phẩm", type: "text" },
              {
                key: "QUOMNAME",
                name: "đơn vị tính",
                type: "combobox",
                dataList: lstQUOM,
                dataKey: "ITEMNAME",
                dataName: "ITEMNAME",
              },
            ]}
            isLoading={isFetching}
          ></TableCustom>
        </div>
      </div>{" "}
    </>
  );
};

export default ProductPage;
