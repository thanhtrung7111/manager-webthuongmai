import { useDeletePost, useGetLstPost } from "@/api/react_query/query_post";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getLabelByKey } from "@/helper/commonHelper";
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
    itemName: "Bài viết",
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

  const getLstPost = useGetLstPost({ key: "posts" });
  const deletePost = useDeletePost({ key: "posts", update: true });

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
                  navigate("/update_post/" + row.original.KKKK0000);
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
  // console.log(in)
  return (
    <>
      <Dialog
        open={openDialogDelete}
        onOpenChange={() => {
          if (!deletePost.isPending) {
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
                  deletePost.isSuccess ? "-translate-x-1/2" : "translate-x-0"
                } w-[200%] grid grid-cols-2 transition-transform`}
              >
                <div className="flex flex-col">
                  <DialogDescription className="flex items-center mb-5 justify-center gap-x-2 py-6">
                    {deletePost.isPending ? (
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
                          deletePost.mutateAsync({
                            KEY_CODE: objectDelete?.KKKK0000
                              ? objectDelete?.KKKK0000
                              : "",
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
        <div className="mb-1">
          <BreadcrumbCustom
            linkList={breadBrumb}
            itemName={"itemName"}
            itemLink={"itemLink"}
          ></BreadcrumbCustom>
        </div>

        {/* Action  */}

        {/* table */}
        <div className="rounded-md p-5 pt-3 bg-white border-gray-200 border shadow-md">
          <div className="flex justify-between items-center mb-5">
            <h4 className="text-xl font-medium text-gray-600 border-l-4 pl-2 border-gray-500">
              Danh mục
            </h4>
            <div className="flex gap-x-2">
              <ButtonForm
                className="!bg-yellow-500 !w-28"
                type="button"
                icon={<i className="ri-download-2-line"></i>}
                label="Xuất excel"
              ></ButtonForm>
              <ButtonForm
                className="!bg-green-500 !w-28"
                type="button"
                icon={<i className="ri-file-add-line"></i>}
                onClick={() => navigate("/create_post")}
                label={getLabelByKey({ key: 14, defaultLabel: "Thêm mới" })}
              ></ButtonForm>
            </div>
          </div>
          <TableCustom
            unit="bài viết"
            data={getLstPost.data ? getLstPost.data : []}
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
            name="post"
            isLoading={getLstPost.isFetching}
          ></TableCustom>
        </div>
      </div>
    </>
  );
};

export default PostPage;
