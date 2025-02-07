import BreadcrumbCustom from "@/component_common/breadcrumb/BreadcrumbCustom";
import ButtonForm from "@/component_common/commonForm/ButtonForm";
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
import { AdvertisementObject, CategoryObject } from "@/type/TypeCommon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpinnerLoading from "@/component_common/loading/SpinnerLoading";
import {
  useDeleteAdvertisement,
  useGetLstAdvertisement,
} from "@/api/react_query/query_advertisement";
import {
  useGetLstBannerDataType,
  useGetLstBannerType,
} from "@/api/react_query/query_common";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getLabelByKey } from "@/helper/commonHelper";

const AdvertisementPage = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const breadBrumb = [
    {
      itemName: "Quản lí chung",
    },
    {
      itemName: "Danh sách quảng cáo",
      itemLink: "/advertisement",
    },
  ];

  const [bodyDelete] = useState<string>("");
  const [openDialogDelete, setOpentDialogDelete] = useState(false);
  const [advertisementDelete, setAdvertisementDelete] =
    useState<AdvertisementObject | null>(null);

  const dataListStatus: any[] = [
    { ITEMCODE: 0, ITEMNAME: "Ngừng hoạt động" },
    { ITEMCODE: 1, ITEMNAME: "Đang chạy" },
  ];

  //Khai bao query vaf mutation
  const getLstAdvertisement = useGetLstAdvertisement({ key: "advertisements" });
  const getLstBannerDataType = useGetLstBannerDataType();
  const getLstBannerType = useGetLstBannerType();
  const deleteBanner = useDeleteAdvertisement({
    key: "advertisements",
    update: true,
  });

  const columns: ColumnDef<AdvertisementObject>[] = [
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
      accessorKey: "BANRCODE",
      meta: "Mã quảng cáo",
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
        <div className="capitalize">{row.getValue("BANRCODE")}</div>
      ),
      enableHiding: true,
    },
    {
      accessorKey: "BANRNAME",
      meta: "Tên quảng cáo",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tên quảng cáo
            {column.getIsSorted() === "asc" ? (
              <i className="ri-arrow-up-line"></i>
            ) : (
              <i className="ri-arrow-down-line"></i>
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("BANRNAME")}</div>
      ),
      enableHiding: true,
    },
    {
      accessorKey: "BANRTYPE",
      meta: "Loại quảng cáo",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Loại quảng cáo
            {column.getIsSorted() === "asc" ? (
              <i className="ri-arrow-up-line"></i>
            ) : (
              <i className="ri-arrow-down-line"></i>
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">
          {getLstBannerType.data
            ? getLstBannerType.data.find(
                (item: CategoryObject) =>
                  item.ITEMCODE == row.getValue("BANRTYPE")
              )?.ITEMNAME
            : ""}
        </div>
      ),
      enableHiding: true,
    },
    {
      accessorKey: "OBJCCODE",
      meta: "Mã đối tượng quảng cáo",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Mã đối tượng quảng cáo
            {column.getIsSorted() === "asc" ? (
              <i className="ri-arrow-up-line"></i>
            ) : (
              <i className="ri-arrow-down-line"></i>
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("OBJCCODE")}</div>
      ),
      enableHiding: true,
    },
    {
      accessorKey: "OBJCTYPE",
      meta: "Loại đối tượng",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Loại đối tượng
            {column.getIsSorted() === "asc" ? (
              <i className="ri-arrow-up-line"></i>
            ) : (
              <i className="ri-arrow-down-line"></i>
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">
          {getLstBannerDataType.data
            ? getLstBannerDataType.data.find(
                (item: CategoryObject) =>
                  item.ITEMCODE == row.getValue("OBJCTYPE")
              )?.ITEMNAME
            : ""}
        </div>
      ),
      enableHiding: true,
    },
    {
      accessorKey: "BANR_RUN",
      meta: "Trạng thái",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Trạng thái
            {column.getIsSorted() === "asc" ? (
              <i className="ri-arrow-up-line"></i>
            ) : (
              <i className="ri-arrow-down-line"></i>
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("BANR_RUN") == 1 ? (
            <div className="text-sm text-green-500 px-3 w-fit py-2 rounded-md flex items-center justify-center">
              Đang chạy
            </div>
          ) : (
            <div className="text-sm text-red-500 px-3 w-fit py-2 rounded-md flex items-center justify-center">
              Không hoạt động
            </div>
          )}
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
            <PopoverContent className="w-64 p-0 py-1 text-sm" align="end">
              <div
                className="flex gap-x-2 items-center text-gray-500 cursor-pointer hover:bg-gray-100 px-2 py-2"
                onClick={() => {
                  console.log(row.original.KKKK0000, "Payment");
                  navigate("/update_advertisement/" + row.original.KKKK0000);
                }}
              >
                <i className="ri-error-warning-line"></i>
                Xem chi tiết
              </div>
              <div
                className="flex gap-x-2 items-center text-gray-500 cursor-pointer hover:bg-gray-100 px-2 py-2"
                onClick={async () => {
                  setAdvertisementDelete(row.original);
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

  return (
    <>
      <Dialog
        open={openDialogDelete}
        onOpenChange={() => {
          if (!deleteBanner.isSuccess && !deleteBanner.isPending) {
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
                  deleteBanner.isSuccess ? "-translate-x-1/2" : "translate-x-0"
                } w-[200%] grid grid-cols-2 transition-transform`}
              >
                <div className="flex flex-col">
                  <DialogDescription className="flex items-center mb-5 justify-center gap-x-2 py-6">
                    {deleteBanner.isPending ? (
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
                          Bạn có muốn xóa quảng cáo{" "}
                          <b className="text-gray-500">
                            {" "}
                            {advertisementDelete?.BANRNAME}
                          </b>{" "}
                          ?
                        </span>
                      </>
                    )}
                  </DialogDescription>
                  <div className="flex gap-x-2 justify-end">
                    <ButtonForm
                      type="button"
                      className="!w-28 !bg-primary"
                      label="Xác nhận"
                      onClick={async () => {
                        if (advertisementDelete != null)
                          deleteBanner.mutateAsync({
                            KEY_CODE: advertisementDelete?.KKKK0000,
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
                      className="!w-28 !bg-slate-500"
                      label="Danh sách"
                      onClick={() => {
                        navigate("/advertisement");
                      }}
                    ></ButtonForm>
                    <ButtonForm
                      type="button"
                      className="!w-28 !bg-red-500"
                      label="Thêm mới"
                      onClick={() => {
                        navigate("/create_advertisement");
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
        <div className="mb-1 ">
          <BreadcrumbCustom
            linkList={breadBrumb}
            itemName={"itemName"}
            itemLink={"itemLink"}
          ></BreadcrumbCustom>
        </div>

        {/* Action  */}
        {/* <div className="flex justify-between items-center">
          <h4 className="text-xl font-medium text-gray-600 border-l-4 pl-2 border-gray-500">
            Danh sách quảng cáo
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
              onClick={() => navigate("/create_advertisement")}
              label="Thêm mới"
            ></ButtonForm>
          </div>
        </div> */}

        {/* table */}
        <div className="rounded-md p-5 bg-white border-gray-200 border shadow-md">
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
                onClick={() => navigate("/create_advertisement")}
                label={getLabelByKey({ key: 14, defaultLabel: "Thêm mới" })}
              ></ButtonForm>
            </div>
          </div>
          <TableCustom
            unit="bài viết"
            data={getLstAdvertisement.isSuccess ? getLstAdvertisement.data : []}
            columns={columns}
            search={[
              { key: "BANRCODE", name: "mã quảng cáo", type: "text" },
              { key: "BANRNAME", name: "tên quảng cáo", type: "text" },
              {
                key: "BANRTYPE",
                name: "Loại quảng cáo",
                type: "combobox",
                dataKey: "ITEMCODE",
                dataName: "ITEMNAME",
                dataList: getLstBannerType.data,
              },
              {
                key: "OBJCTYPE",
                name: "Loại đối tượng",
                type: "combobox",
                dataKey: "ITEMCODE",
                dataName: "ITEMNAME",
                dataList: getLstBannerDataType.data,
              },
              {
                key: "BANR_RUN",
                name: "Trạng thái",
                type: "combobox",
                dataKey: "ITEMCODE",
                dataName: "ITEMNAME",
                dataList: dataListStatus,
              },
            ]}
            isLoading={getLstAdvertisement.isFetching}
          ></TableCustom>
        </div>
      </div>{" "}
    </>
  );
};

export default AdvertisementPage;
