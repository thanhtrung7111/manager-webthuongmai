import {
  useDeleteAdvertisement,
  useGetAdvertisement,
  useUpdateAdvertisement,
} from "@/api/react_query/query_advertisement";
import {
  useGetLstBannerDataType,
  useGetLstBannerType,
} from "@/api/react_query/query_common";
import {
  useDeleteDocument,
  useGetDocument,
  useSetDocument,
} from "@/api/react_query/query_document";
import { useGetLstProduct } from "@/api/react_query/query_product";
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
import {
  AdvertisementObject,
  AdvertisementUpdateObject,
  CategoryObject,
  DataExcelPatternObject,
} from "@/type/TypeCommon";
import { Label } from "@radix-ui/react-label";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    itemName: "Cập nhật",
    itemLink: "/create_advertisement",
  },
];

const AdvertisementUpdatePage = () => {
  const { id } = useParams();
  const { tokenLocation } = useUserStore();
  console.log(tokenLocation);
  console.log(id);
  const [infoLoading, setInfoLoading] = useState<string>("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [image, setImage] = useState<File | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false);

  //Khai bao query va mutation
  const getAdvertisement = useGetAdvertisement();
  const getLstProduct = useGetLstProduct({ key: "products" });
  const getLstBannerDataType = useGetLstBannerDataType();
  const getLstBannerType = useGetLstBannerType();
  const updateAdvertisement = useUpdateAdvertisement({
    key: "advertisements",
    update: true,
  });
  const deleteBanner = useDeleteAdvertisement({
    key: "advertisements",
    update: true,
  });
  const getImage = useGetDocument();
  const setCreateImage = useSetDocument();
  const deleteImage = useDeleteDocument();
  const getBanner = useGetAdvertisement();

  const validationSchema = Yup.object().shape({
    COMPCODE: Yup.string(),
    LCTNCODE: Yup.string(),
    BANRNAME: Yup.string().required("Không để tên quảng cáo!"),
    BANRTYPE: Yup.string().required("Không để trống loại quảng cáo!"),
    OBJCTYPE: Yup.string().required("Không để trống loại đối tượng quảng cáo!"),
    BANR_RUN: Yup.number().required("Không để trống trạng thái quảng cáo!"),
    OBJCCODE: Yup.string().required("Không để trống đối tượng quảng cáo!"),
    IMAGE_BANR: Yup.string().required("Không để trống hình ảnh!"),
  });

  const [initialValue, setInitialValue] = useState<AdvertisementUpdateObject>({
    COMPCODE: "",
    KKKK0000: "",
    LCTNCODE: "",
    BANRCODE: "",
    BANRNAME: "",
    BANRTYPE: "",
    OBJCTYPE: "",
    OBJCCODE: "",
    BANR_RUN: 0,
    IMAGE_BANR: "",
  });

  const extractExcel = async () => {
    const dataExcelObject: DataExcelPatternObject[] = [];

    await exportExcelPattern(dataExcelObject);
  };

  const dataStatus: any[] = [
    { itemCode: 0, itemName: "Ngừng chạy" },
    { itemCode: 1, itemName: "Đang chạy" },
  ];

  const handleSubmitBanner = async (values: any) => {
    console.log(values);
    setOpenDialog(true);
    setInfoLoading("Đang cập nhật dữ liệu...");
    const data = await updateAdvertisement.mutateAsync({
      body: {
        DCMNCODE: "inpBanner",
        HEADER: [{ ...values }],
      },
    });
    if (image != null) {
      setInfoLoading("Đang thêm hình ảnh...");
      if (
        getAdvertisement.data &&
        getAdvertisement.data[0].DCMNFILE[0].FILECODE
      ) {
        const formDataDelete: FormData = new FormData();
        formDataDelete.append("DCMNCODE", "inpBanner");
        formDataDelete.append("KEY_CODE", values.KKKK0000);
        formDataDelete.append(
          "FILECODE",
          getAdvertisement.data[0].DCMNFILE[0].FILECODE
        );
        await deleteImage.mutateAsync({ body: formDataDelete });
      }

      const formData: FormData = new FormData();
      formData.append("DCMNCODE", "inpBanner");
      formData.append("KEY_CODE", values.KKKK0000);
      formData.append("FILE_SRC", "1");
      formData.append("FILE_GRP", "1");
      // formData.append("FILE_GRP", "1");s
      formData.append("Files[0]", image != null ? image : "");
      const imageResult = await setCreateImage.mutateAsync({ body: formData });
    }
    setInfoLoading("Hoàn thành...");
  };

  useEffect(() => {
    const handleFetchDetailBanner = async () => {
      console.log(id, "205 detail");
      const resultData = await getAdvertisement.mutateAsync({
        KEY_CODE: id ? id : "",
      });
      console.log(resultData);
      await getImage.mutateAsync({
        URL:
          resultData[0].DCMNFILE?.length > 0 &&
          resultData[0].DCMNFILE[0].FILE_URL
            ? resultData[0].DCMNFILE[0].FILE_URL
            : "",
      });
      setInitialValue({
        COMPCODE: resultData[0].COMPCODE,
        KKKK0000: resultData[0].KKKK0000,
        LCTNCODE: resultData[0].LCTNCODE,
        BANRCODE: resultData[0].BANRCODE,
        BANRNAME: resultData[0].BANRNAME,
        BANRTYPE: resultData[0].BANRTYPE,
        OBJCTYPE: resultData[0].OBJCTYPE,
        OBJCCODE: resultData[0].OBJCCODE,
        BANR_RUN: resultData[0].BANR_RUN,
        IMAGE_BANR:
          resultData[0].DCMNFILE?.length > 0 &&
          resultData[0].DCMNFILE[0].FILENAME
            ? resultData[0].DCMNFILE[0].FILENAME
            : "",
      });
    };
    if (id != null && id != "") {
      handleFetchDetailBanner();
    }
    console.log("advertisement page");
  }, [id]);

  // useEffect(() => {
  //   getAdvertisement.reset();
  //   const handleFetchDetailBanner = async () => {
  //     console.log(id, "205 detail");
  //     await getAdvertisement.mutateAsync({
  //       KEY_CODE: id ? id : "",
  //     });
  //   };
  //   if (id != null && id != "") {
  //     handleFetchDetailBanner();
  //   }
  // }, [deleteBanner.isSuccess]);
  console.log(initialValue);
  return (
    <div className="flex flex-col gap-y-2">
      {/* Thông báo xóa  */}

      <Dialog
        open={openDialogDelete}
        onOpenChange={() => {
          if (!deleteImage.isSuccess && !deleteImage.isPending) {
            setOpenDialogDelete(false);
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Thông báo</DialogTitle>
            <div className="w-full overflow-hidden">
              <div
                className={`${
                  deleteImage.isSuccess ? "-translate-x-1/2" : "translate-x-0"
                } w-[200%] grid grid-cols-2 transition-transform`}
              >
                <div className="flex flex-col">
                  <DialogDescription className="flex items-center mb-5 justify-center gap-x-2 py-6">
                    {deleteImage.isPending ? (
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
                          Bạn có muốn xóa quảng cáo này!
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
                        if (getAdvertisement.data)
                          deleteBanner.mutateAsync({
                            KEY_CODE: getAdvertisement.data[0].KKKK0000,
                          });
                      }}
                    ></ButtonForm>
                    <ButtonForm
                      type="button"
                      className="!w-28 !bg-red-500"
                      label="Đóng"
                      onClick={() => {
                        setOpenDialogDelete(false);
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

      {/* Thông báo cập nhật  */}

      <Dialog
        open={openDialog}
        onOpenChange={() => {
          if (!setCreateImage.isPending && !updateAdvertisement.isPending) {
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
                  updateAdvertisement.isSuccess
                    ? "-translate-x-1/2"
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
                      Cập nhật thành công!
                    </span>
                  </DialogDescription>
                  <div className="flex gap-x-2 justify-end">
                    <ButtonForm
                      type="button"
                      className="!w-28 !bg-red-500"
                      label="Đóng"
                      onClick={() => {
                        setOpenDialog(false);
                        updateAdvertisement.reset();
                        setCreateImage.reset();
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
        key={"formUpdateBanner"}
        initialValues={initialValue}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          handleSubmitBanner(values);
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
                  Cập nhật quảng cáo
                </h4>
              </div>
              <div className="flex gap-x-2 shrink-0">
                <ButtonForm
                  label="Cập nhật"
                  type="submit"
                  className="bg-secondary !w-fit px-3"
                  icon={<i className="ri-save-3-line"></i>}
                  loading={updateAdvertisement.isPending}
                ></ButtonForm>
                <ButtonForm
                  label="Xóa"
                  type="button"
                  className="bg-red-500 !w-20"
                  onClick={() => setOpenDialogDelete(true)}
                  disabled={updateAdvertisement.isPending}
                  icon={<i className="ri-delete-bin-line"></i>}
                ></ButtonForm>
              </div>
            </div>

            <div className="rounded-md p-5 min-h-[500px] bg-white border-gray-200 border shadow-md">
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="relative w-full overflow-hidden border border-gray-200 rounded-md p-3">
                  <div className="flex flex-col gap-y-2 px-20">
                    <div className="bg-slate-200 h-7"></div>
                    <div className="grid grid-cols-[3fr_1fr] gap-2">
                      {(values.BANRTYPE == "001" && image != null) ||
                      (values.BANRTYPE == "001" &&
                        getImage.data != null &&
                        getAdvertisement.isSuccess) ? (
                        <img
                          className="h-72 w-full border shadow-md object-top object-cover"
                          src={
                            image == null
                              ? URL.createObjectURL(getImage.data)
                              : URL.createObjectURL(image)
                          }
                          alt=""
                        />
                      ) : (
                        <div className="h-72 flex-auto bg-slate-200 flex items-center justify-center">
                          {getAdvertisement.isPending && (
                            <SpinnerLoading className="w-6 h-6 fill-slate-500"></SpinnerLoading>
                          )}
                        </div>
                      )}
                      <div className="grid grid-rows-3 h-72 gap-y-2">
                        {(values.BANRTYPE == "004" && image != null) ||
                        (values.BANRTYPE == "004" &&
                          getImage.data != null &&
                          getAdvertisement.isSuccess) ? (
                          <div>
                            <img
                              className="w-52 h-full border shadow-md object-top object-cover"
                              src={
                                image == null
                                  ? URL.createObjectURL(getImage.data)
                                  : URL.createObjectURL(image)
                              }
                              alt=""
                            />
                          </div>
                        ) : (
                          <div className="w-52 bg-slate-200 flex items-center justify-center">
                            {getAdvertisement.isPending && (
                              <SpinnerLoading className="w-6 h-6 fill-slate-500"></SpinnerLoading>
                            )}
                          </div>
                        )}
                        <div className="w-52 bg-slate-200"></div>
                        <div className="w-52 bg-slate-200"></div>
                      </div>
                    </div>
                    {(values.BANRTYPE == "002" && image != null) ||
                    (values.BANRTYPE == "002" &&
                      getImage.data != null &&
                      getAdvertisement.isSuccess) ? (
                      <img
                        className="h-44 w-full border shadow-md object-top object-cover"
                        src={
                          image == null
                            ? URL.createObjectURL(getImage.data)
                            : URL.createObjectURL(image)
                        }
                        alt=""
                      />
                    ) : (
                      <div className="h-44 flex-auto bg-slate-200 flex items-center justify-center">
                        {" "}
                        {getAdvertisement.isPending && (
                          <SpinnerLoading className="w-6 h-6 fill-slate-500"></SpinnerLoading>
                        )}
                      </div>
                    )}
                    {(values.BANRTYPE == "003" && image != null) ||
                    (values.BANRTYPE == "003" &&
                      getImage.data != null &&
                      getAdvertisement.isSuccess) ? (
                      <img
                        className="h-72 w-full border shadow-md object-top object-cover"
                        src={
                          image == null
                            ? URL.createObjectURL(getImage.data)
                            : URL.createObjectURL(image)
                        }
                        alt=""
                      />
                    ) : (
                      <div className="h-72 flex-auto bg-slate-200 flex items-center justify-center">
                        {getAdvertisement.isPending && (
                          <SpinnerLoading className="w-6 h-6 fill-slate-500"></SpinnerLoading>
                        )}
                      </div>
                    )}
                    <div className="bg-slate-200 h-7 flex-auto"></div>
                  </div>
                </div>
                <div className="flex flex-col gap-y-3 h-fit">
                  {/* Nhập tên sản phẩm */}
                  <InputFormikForm
                    placeholder="Nhập tên quảng cáo..."
                    disabled={false}
                    name="BANRNAME"
                    label={"Tên quảng cáo"}
                    // disabled={isLoadingLogin}

                    important={true}
                    // placeholder="Nhập tài khoản..."
                  ></InputFormikForm>
                  <div className="flex flex-col">
                    <Label
                      htmlFor="picture"
                      className="text-gray-700 text-sm font-medium mb-2"
                    >
                      Chọn ảnh cập nhật
                    </Label>
                    <Input
                      id="picture"
                      onChange={(e) => {
                        setImage(
                          e.target.files && e.target.files?.length > 0
                            ? e.target.files[0]
                            : null
                        );
                        setFieldValue(
                          "IMAGE_BANR",
                          e.target.files && e.target.files.length > 0
                            ? e.target.files[0].name
                            : ""
                        );
                      }}
                      type="file"
                      className={`w-full mb-1 ${
                        errors.IMAGE_BANR &&
                        touched.IMAGE_BANR &&
                        "border border-red-500"
                      }`}
                    />
                    {errors.IMAGE_BANR && touched.IMAGE_BANR && (
                      <span className="text-red-500 text-xs">
                        Không để trống hình ảnh
                      </span>
                    )}
                  </div>
                  {/* Loại quảng cáo  */}
                  <SelectFormikForm
                    options={
                      getLstBannerType.isSuccess && getLstBannerType.data
                        ? getLstBannerType.data
                        : []
                    }
                    loading={getLstBannerType.isFetching}
                    itemKey={"ITEMCODE"}
                    itemValue={"ITEMNAME"}
                    important={true}
                    name="BANRTYPE"
                    // onChange={(e) => {
                    //   setFieldValue(
                    //     "BANRTYPE",
                    //     getLstBannerType.data.find(
                    //       (item: CategoryObject) => item.ITEMCODE == e.ITEMCODE
                    //     ).ITEMNAME
                    //   );
                    // }}
                    label={"Vị trí đặt quảng cáo"}
                  ></SelectFormikForm>

                  {/* Loại đối tượng quản cáo  */}
                  <SelectFormikForm
                    options={
                      getLstBannerDataType.data ? getLstBannerDataType.data : []
                    }
                    loading={getLstBannerDataType.isFetching}
                    itemKey={"ITEMCODE"}
                    itemValue={"ITEMNAME"}
                    important={true}
                    name="OBJCTYPE"
                    // onChange={(e) => {
                    //   setFieldValue(
                    //     "BANRTYPE",
                    //     getLstBannerDataType.data.find(
                    //       (item: CategoryObject) => item.ITEMCODE == e.ITEMCODE
                    //     ).ITEMNAME
                    //   );
                    // }}
                    label={"Loại đối tượng quảng cáo"}
                  ></SelectFormikForm>

                  {/* Loại quảng cáo  */}
                  <SelectFormikForm
                    options={getLstProduct.data ? getLstProduct.data : []}
                    loading={
                      getLstProduct.isFetching || getAdvertisement.isPending
                    }
                    itemKey={"PRDCCODE"}
                    itemValue={"PRDCNAME"}
                    important={true}
                    name="OBJCCODE"
                    // onChange={(e) => {
                    //   setFieldValue(
                    //     "MQUOMNME",
                    //     getLstBannerType.data.find(
                    //       (item: CategoryObject) => item.ITEMCODE == e.ITEMCODE
                    //     ).ITEMNAME
                    //   );
                    // }}
                    label={"Đối tượng quảng cáo"}
                  ></SelectFormikForm>

                  {/* Trạng thái của quảng cáo  */}
                  <SelectFormikForm
                    options={dataStatus ? dataStatus : []}
                    // loading={}
                    itemKey={"itemCode"}
                    itemValue={"itemName"}
                    important={true}
                    name="BANR_RUN"
                    // onChange={(e) => {
                    //   setFieldValue(
                    //     "ss",
                    //     getLstBannerType.data.find(
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

export default AdvertisementUpdatePage;
