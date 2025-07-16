import BreadcrumbCustom from "@/component_common/breadcrumb/BreadcrumbCustom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { error } from "console";
import TableCustom from "@/component_common/table/TableCustom";
// import { payments } from "@/component_common/data/data";
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
import {
  useDeletePostTag,
  useGetLstPostTag,
} from "@/api/react_query/query_tag";
import PostTagCreateDialog from "../component/PostTagCreateDialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getLabelByKey } from "@/helper/commonHelper";

const PostTagPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [openDialogDelete, setOpentDialogDelete] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [objectDelete, setObjectDelete] = useState<ProductObject | null>(null);

  //Khai báo query và mutation
  const getLstPostTag = useGetLstPostTag({ key: "post_tag" });
  const deletePostTag = useDeletePostTag({ key: "post_tag", update: true });

  const breadBrumb = [
    {
      itemName: "Quản lí chung",
    },
    {
      itemName: "Bài viết",
    },
    {
      itemName: "Tag bài viết",
      itemLink: "/post_tag",
    },
  ];
  const columns: ColumnDef<any>[] = [
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
      accessorKey: "TAG_CODE",
      meta: "Mã tag bài viết",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Mã tag bài viết
            {column.getIsSorted() === "asc" ? (
              <i className="ri-arrow-up-line"></i>
            ) : (
              <i className="ri-arrow-down-line"></i>
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("TAG_CODE")}</div>
      ),
      enableHiding: true,
    },
    {
      accessorKey: "TAG_NAME",
      meta: "Tên tag bài viết",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tên tag bài viết
            {column.getIsSorted() === "asc" ? (
              <i className="ri-arrow-up-line"></i>
            ) : (
              <i className="ri-arrow-down-line"></i>
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("TAG_NAME")}</div>
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
            <PopoverContent className="w-64 p-0 py-1 text-sm" align="end">
              <div
                className="flex gap-x-2 items-center text-gray-500 cursor-pointer hover:bg-gray-100 px-2 py-2"
                // onClick={() =>
                //   navigate("/update_product/" + row.original.KKKK0000)
                // }
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
  // console.log(data);
  return (
    <>
      <PostTagCreateDialog
        onClose={() => setOpenCreate(false)}
        open={openCreate}
      ></PostTagCreateDialog>
      <Dialog
        open={openDialogDelete}
        onOpenChange={() => {
          if (!deletePostTag.isPending) {
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
                  deletePostTag.isSuccess ? "-translate-x-1/2" : "translate-x-0"
                } w-[200%] grid grid-cols-2 transition-transform`}
              >
                <div className="flex flex-col">
                  <DialogDescription className="flex items-center mb-5 justify-center gap-x-2 py-6">
                    {deletePostTag.isPending ? (
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
                          deletePostTag.mutateAsync({
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
        {/* <div className="flex justify-between items-center">
          <h4 className="text-xl font-medium text-gray-600 border-l-4 pl-2 border-gray-500">
            Danh sách tag
          </h4>
          <div className="flex gap-x-2">
            <ButtonForm
              className="!bg-primary !w-28"
              type="button"
              icon={<i className="ri-download-2-line"></i>}
              label="Xuất excel"
            ></ButtonForm>ó
            <ButtonForm
              className="!bg-secondary !w-28"
              type="button"
              icon={<i className="ri-file-add-line"></i>}
              onClick={() => setOpenCreate(true)}
              label="Thêm mới"
            ></ButtonForm>
          </div>
        </div> */}

        {/* table */}
        <div className="rounded-md p-5 pt-3 bg-white border-gray-200 border shadow-md">
          <div className="flex justify-between items-center mb-5">
            <h4 className="text-xl font-medium text-gray-600 border-l-4 pl-2 border-gray-500">
              Danh mục
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
                onClick={() => setOpenCreate(true)}
                label={getLabelByKey({ key: 14, defaultLabel: "Thêm mới" })}
              ></ButtonForm>
            </div>
          </div>
          <TableCustom
            unit="tag"
            data={getLstPostTag.isSuccess ? getLstPostTag.data : []}
            columns={columns}
            search={[
              { key: "TAG_CODE", name: "mã tag bài viết", type: "text" },
              { key: "TAG_NAME", name: "tên tag bài viết", type: "text" },
              //   {
              //     key: "QUOMNAME",
              //     name: "đơn vị tính",
              //     type: "combobox",
              //     dataList: lstQUOM,
              //     dataKey: "ITEMNAME",
              //     dataName: "ITEMNAME",
              //   },
            ]}
            name="post_tag"
            isLoading={getLstPostTag.isFetching}
          ></TableCustom>
        </div>
      </div>{" "}
    </>
  );
};

export default PostTagPage;
