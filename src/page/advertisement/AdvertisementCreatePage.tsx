import { fetchCategory, postImage } from "@/api/commonApi";
import BreadcrumbCustom from "@/component_common/breadcrumb/BreadcrumbCustom";
import ButtonForm from "@/component_common/commonForm/ButtonForm";
import InputFormikForm from "@/component_common/commonForm/InputFormikForm";
import SelectFormikForm from "@/component_common/commonForm/SelectFormikForm";
import SpinnerLoading from "@/component_common/loading/SpinnerLoading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { exportExcelPattern } from "@/helper/excelHelper";
import { useUserStore } from "@/store/userStore";
import { CategoryObject, DataExcelPatternObject } from "@/type/TypeCommon";
import { Label } from "@radix-ui/react-label";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const breadBrumb = [
  {
    itemName: "Quản lí chung",
  },
  {
    itemName: "Danh sách quảng cáo",
    itemLink: "/advertisement",
  },
  {
    itemName: "Tạo mới",
    itemLink: "/create_advertisement",
  },
];
const AdvertisementCreatePage = () => {
  const [progress, setProgress] = useState<number>(0);
  const [infoLoading, setInfoLoading] = useState<string>("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [image, setImage] = useState<File | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const {
    data: dataBannerType,
    isFetching: isFetchingBannerType,
    isError: isErrorBannerType,
    isSuccess: isSuccessBannerType,
  } = useQuery({
    queryKey: ["lstBannerType"],
    queryFn: () => fetchCategory("lstBannerType"),
  });

  const {
    data: dataBannerDataType,
    isFetching: isFetchingBannerDataType,
    isError: isErrorBannerDataType,
    isSuccess: isSuccessBannerDataType,
  } = useQuery({
    queryKey: ["lstBannerDataType"],
    queryFn: () => fetchCategory("lstBannerDataType"),
  });
  const validationSchema = Yup.object().shape({
    PRDCCODE: Yup.string(),
    MPRDCNME: Yup.string()
      .min(8, "Tên sản phẩm ít nhất 8 kí tự!")
      .max(400, "Tên sản phẩm có nhiều nhất 400 kí tự!")
      .required("Không để trống!"),
    QUOMCODE: Yup.number().required("Không để trống phân loại!"),
    DCMNSBCD: Yup.string().required("Không để trống phân loại!"),
    BRNDCODE: Yup.string().required("Không để trống thương hiệu!"),
  });

  const initialValue = {
    PRDCCODE: "",
    MPRDCNME: "", //
    QUOMCODE: 0, //
    DCMNSBCD: "", //
    MQUOMNME: "",
    MDCSBNME: "",
    // LCTNCODE: currentUser?.LCTNCODE, //
    BRNDCODE: "", //
    COLRCODE: "", //
    MDELPRDC: "", //
    VAT_RATE: 0, //
  };

  const extractExcel = async () => {
    const dataExcelObject: DataExcelPatternObject[] = [];

    await exportExcelPattern(dataExcelObject);
  };

  const handlePostImage = useMutation({
    mutationFn: (body: FormData) => postImage(body),
  });

  const dataStatus: any[] = [
    { itemCode: 1, itemName: "Đang chạy" },
    { itemCode: 0, itemName: "Ngừng chạy" },
  ];
  return (
    <div className="flex flex-col gap-y-2">
      <Dialog
        open={openDialog}
        onOpenChange={() => {
          if (
            !handlePostImage.isPending
            // && !handlePostProduct.isPending
          ) {
            setOpenDialog(false);
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Thông báo</DialogTitle>
            <div className="w-full overflow-hidden">
              <div
                className={`${
                  handlePostImage.isSuccess
                    ? // && handlePostProduct.isSuccess
                      "-translate-x-1/2"
                    : "translate-x-0"
                } w-[200%] grid grid-cols-2 transition-transform`}
              >
                <div className="flex flex-col">
                  <DialogDescription className="flex flex-auto items-center mb-5 justify-center gap-x-2 py-6">
                    <SpinnerLoading className="w-6 h-6 fill-primary"></SpinnerLoading>
                    <span className="text-gray-700 text-base">
                      {infoLoading}
                    </span>
                  </DialogDescription>
                </div>
                <div className="flex flex-col">
                  <DialogDescription className="flex items-center mb-5 justify-center gap-x-2 py-6">
                    <i className="ri-checkbox-line text-gray-700 text-xl"></i>{" "}
                    <span className="text-gray-700 text-base">
                      Thêm sản phẩm thành công!
                    </span>
                  </DialogDescription>
                  <div className="flex gap-x-2 justify-end">
                    <ButtonForm
                      type="button"
                      className="!w-32 bg-secondary"
                      label="Xem danh sách"
                      onClick={() => navigate("/product")}
                    ></ButtonForm>

                    <ButtonForm
                      type="button"
                      className="!w-28"
                      label="Thêm mới"
                      onClick={() => {
                        setOpenDialog(false);
                        // handlePostProduct.reset();
                        handlePostImage.reset();
                      }}
                    ></ButtonForm>
                  </div>
                </div>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {/* <Progress value={progress} className="w-[60%]" />
    <Button
      onClick={() => {
        setProgress(50);
      }}
    ></Button> */}
      <div className="mb-3">
        <BreadcrumbCustom
          linkList={breadBrumb}
          itemName={"itemName"}
          itemLink={"itemLink"}
        ></BreadcrumbCustom>
      </div>

      <Formik
        key={"formLogin"}
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          // handleSubmitProduct(values);
        }}
      >
        {({ setFieldValue, handleChange, values, errors, touched }) => (
          <Form id="formCreateProduct">
            {/* Action  */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-end gap-x-2">
                <div
                  className="text-gray-500 cursor-pointer"
                  onClick={() => navigate(-1)}
                >
                  <i className="ri-logout-box-line text-xl"></i>
                </div>
                <h4 className="text-xl font-medium text-gray-600">
                  Thêm quảng cáo
                </h4>
              </div>
              <div className="flex gap-x-2 shrink-0">
                <ButtonForm
                  label="Import Excel"
                  type="submit"
                  className="bg-primary !w-36"
                  disabled={
                    // handlePostProduct.isPending ||
                    handlePostImage.isPending
                  }
                  icon={<i className="ri-download-2-line"></i>}
                ></ButtonForm>
                <ButtonForm
                  label="File excel mẫu"
                  type="button"
                  className="!bg-yellow-500 !w-36"
                  onClick={() => extractExcel()}
                  icon={<i className="ri-download-2-line"></i>}
                ></ButtonForm>
                <ButtonForm
                  label="Lưu"
                  type="submit"
                  className="bg-secondary !w-16"
                  loading={
                    // handlePostProduct.isPending ||
                    handlePostImage.isPending
                  }
                ></ButtonForm>
              </div>
            </div>

            {/* table */}

            <div className="rounded-md p-5 bg-white border-gray-200 border shadow-md">
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="relative w-full overflow-hidden border border-gray-200 rounded-md p-3">
                  <div className="flex flex-col gap-y-2">
                    <div className="bg-slate-400 h-7"></div>
                    <div className="flex gap-x-2">
                      <div className="bg-slate-400 h-40 flex-auto"></div>
                      <div className="flex flex-col gap-y-2">
                        <div className="w-52 flex-auto bg-slate-400"></div>
                        <div className="w-52 flex-auto bg-slate-400"></div>
                      </div>
                    </div>
                    <div className="bg-slate-400 h-40 flex-auto"></div>
                    <div className="bg-slate-400 h-32 flex-auto"></div>
                    <div className="bg-slate-400 h-20 flex-auto"></div>
                  </div>
                </div>
                <div className="flex flex-col gap-y-3 h-fit">
                  {/* Nhập tên sản phẩm */}
                  <InputFormikForm
                    placeholder="Nhập tên quảng cáo..."
                    disabled={false}
                    name="MPRDCNME"
                    label={"Tên quảng cáo"}
                    // disabled={isLoadingLogin}
                    important={true}
                    // placeholder="Nhập tài khoản..."
                  ></InputFormikForm>
                  <div className="grid w-full items-center gap-1.5">
                    <Label
                      htmlFor="picture"
                      className="text-gray-700 text-sm font-medium"
                    >
                      Hình ảnh
                    </Label>
                    <Input id="picture" type="file" className="w-full" />
                  </div>
                  {/* ĐƠn vị tính  */}
                  <SelectFormikForm
                    options={dataBannerType ? dataBannerType : []}
                    loading={isFetchingBannerType}
                    itemKey={"ITEMCODE"}
                    itemValue={"ITEMNAME"}
                    important={true}
                    name="adasd"
                    // onChange={(e) => {
                    //   setFieldValue(
                    //     "MQUOMNME",
                    //     dataBannerType.find(
                    //       (item: CategoryObject) => item.ITEMCODE == e.ITEMCODE
                    //     ).ITEMNAME
                    //   );
                    // }}
                    label={"Loại quảng cáo"}
                  ></SelectFormikForm>

                  <SelectFormikForm
                    options={dataBannerDataType ? dataBannerDataType : []}
                    loading={isFetchingBannerDataType}
                    itemKey={"ITEMCODE"}
                    itemValue={"ITEMNAME"}
                    important={true}
                    name="aa"
                    // onChange={(e) => {
                    //   setFieldValue(
                    //     "MQUOMNME",
                    //     dataBannerType.find(
                    //       (item: CategoryObject) => item.ITEMCODE == e.ITEMCODE
                    //     ).ITEMNAME
                    //   );
                    // }}
                    label={"Loại đối tượng quảng cáo"}
                  ></SelectFormikForm>
                  <SelectFormikForm
                    options={dataBannerDataType ? dataBannerDataType : []}
                    loading={isFetchingBannerDataType}
                    itemKey={"ITEMCODE"}
                    itemValue={"ITEMNAME"}
                    important={true}
                    name="ss"
                    // onChange={(e) => {
                    //   setFieldValue(
                    //     "MQUOMNME",
                    //     dataBannerType.find(
                    //       (item: CategoryObject) => item.ITEMCODE == e.ITEMCODE
                    //     ).ITEMNAME
                    //   );
                    // }}
                    label={"Đối tượng quảng cáo"}
                  ></SelectFormikForm>
                  <SelectFormikForm
                    options={dataStatus}
                    // loading={}
                    itemKey={"itemCode"}
                    itemValue={"itemName"}
                    important={true}
                    name="a"
                    // onChange={(e) => {
                    //   setFieldValue(
                    //     "ss",
                    //     dataBannerType.find(
                    //       (item: CategoryObject) => item.ITEMCODE == e.ITEMCODE
                    //     ).ITEMNAME
                    //   );
                    // }}
                    label={"Trạng thái"}
                  ></SelectFormikForm>
                  {/* Phân loại  */}
                </div>
              </div>

              {/* Chiều dài */}
              {/* <NumberFormikForm
                  unit="cm"
                  placeholder="Nhập chiều dài sản phẩm..."
                  disabled={false}
                  name="PRDCLONG"
                  label={"Chiều dài"}
                  // disabled={isLoadingLogin}
                  important={true}
                ></NumberFormikForm> */}
              {/* Chiều rộng */}

              {/*Ghi chú sản xuất*/}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdvertisementCreatePage;
