import { deleteData, fetchDataCondition } from "@/api/commonApi";
import BreadcrumbCustom from "@/component_common/breadcrumb/BreadcrumbCustom";
import ButtonForm from "@/component_common/commonForm/ButtonForm";
import SpinnerLoading from "@/component_common/loading/SpinnerLoading";
import TableCustom from "@/component_common/table/TableCustom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PostUpdateObject, ProductObject } from "@/type/TypeCommon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "lucide-react";
import React, { useState } from "react";
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
  const [openDialogDelete, setOpentDialogDelete] = useState(false);
  const queryClient = useQueryClient();
  const [objectDelete, setObjectDelete] = useState<PostUpdateObject | null>(
    null
  );

  const { data, isLoading, isFetching, error, isSuccess } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      fetchDataCondition({
        DCMNCODE: "inpSalePost",
        PAGELINE: "0",
        PAGENUMB: "1",
      }),
  });
  const handleDelete = useMutation({
    mutationFn: (body: { [key: string]: any }) => deleteData(body),
    onSuccess: async (data: PostUpdateObject[], body) => {
      if (queryClient.getQueryData(["posts"])) {
        queryClient.setQueryData(["posts"], (oldData: PostUpdateObject[]) => {
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
  const columns: ColumnDef<PostUpdateObject>[] = [
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
      accessorKey: "POSTCODE",
      meta: "Mã bài viết",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Mã bài viết
            {column.getIsSorted() === "asc" ? (
              <i className="ri-arrow-up-line"></i>
            ) : (
              <i className="ri-arrow-down-line"></i>
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("POSTCODE")}</div>
      ),
      enableHiding: true,
    },
    {
      accessorKey: "POSTTITL",
      meta: "Tiêu đề",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tiêu đề
            {column.getIsSorted() === "asc" ? (
              <i className="ri-arrow-up-line"></i>
            ) : (
              <i className="ri-arrow-down-line"></i>
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("POSTTITL")}</div>
      ),
      enableHiding: true,
    },
    {
      accessorKey: "POST_TAG",
      meta: "Tag bài viết",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tag bài viết
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
          {row.getValue("POST_TAG") as string}
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
              onClick={() => {
                navigate("/update_post/" + row.original.KKKK0000);
              }}
            ></ButtonForm>

            <ButtonForm
              className="!bg-red-500 !w-20"
              type="button"
              icon={<i className="ri-delete-bin-line"></i>}
              label="Xóa"
              onClick={() => {
                setObjectDelete(row.original);
                setOpentDialogDelete(true);
              }}
            ></ButtonForm>
          </div>
        );
      },
    },
  ];
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
                            {objectDelete?.POSTTITL}
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
                            DCMNCODE: "inpSalePost",
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
                        navigate("/create_post");
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
            data={data ? data : []}
            columns={columns}
            search={[
              { key: "POSTCODE", name: "mã bài viết", type: "text" },
              { key: "POSTTITL", name: "tiêu đề", type: "text" },
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
    </>
  );
};

export default PostPage;
