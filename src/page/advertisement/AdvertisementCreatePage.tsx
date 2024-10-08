import {
  fetchCategory,
  fetchDataCondition,
  postData,
  postImage,
  updateData,
} from "@/api/commonApi";
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
  CategoryObject,
  DataExcelPatternObject,
} from "@/type/TypeCommon";
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
const AdvertisementCreatePage = ({
  statusPage = "new",
}: {
  statusPage?: string;
}) => {
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

  const {
    data: dataProducts,
    isLoading: isLoadingProducts,
    isFetching: isFetchingProducts,
    isError: isErrorProducts,
    isSuccess: isSuccessProducts,
  } = useQuery({
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

  const handlePostBanner = useMutation({
    mutationFn: (body: { [key: string]: any }) => postData(body),
    onSuccess: (data: AdvertisementObject[]) => {
      if (queryClient.getQueryData(["advertisements"])) {
        queryClient.setQueryData(
          ["advertisements"],
          (oldData: AdvertisementObject[]) => {
            const resultData = data[0];
            console.log(resultData);
            return [resultData, ...oldData];
          }
        );
      } else {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "advertisements",
        });
      }
    },
  });

  const handleUpdateBanner = useMutation({
    mutationFn: (body: { [key: string]: any }) => updateData(body),
    onSuccess: (data: AdvertisementObject[]) => {
      if (queryClient.getQueryData(["advertisements"])) {
        queryClient.setQueryData(
          ["advertisements"],
          (oldData: AdvertisementObject[]) => {
            const resultData = data[0];
            console.log(resultData);
            return [
              resultData,
              ...oldData.filter((item) => item.KKKK0000 != resultData.KKKK0000),
            ];
          }
        );
      } else {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "advertisements",
        });
      }
    },
  });

  const handlePostImage = useMutation({
    mutationFn: (body: FormData) => postImage(body),
  });
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

  const [initialValue, setInitialValue] = useState({
    COMPCODE: "PMC",
    LCTNCODE: "001", //
    BANRNAME: "", //
    BANRTYPE: "", //
    OBJCTYPE: "",
    BANR_RUN: "",
    IMAGE_BANR: "",
    // KKKK0000: "",
    // DCMNFILE: null,
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
    setInfoLoading("Đang lưu dữ liệu...");
    const data = await handlePostBanner.mutateAsync({
      DCMNCODE: "inpBanner",
      HEADER: [{ ...values, PRDCPICT: "" }],
    });
    setInfoLoading("Đang thêm hình ảnh...");
    const resultData: any = data[0];
    const formData: FormData = new FormData();
    formData.append("DCMNCODE", "inpBanner");
    formData.append("KEY_CODE", resultData?.KKKK0000);
    formData.append("FILE_SRC", "1");
    formData.append("FILE_GRP", "1");
    // formData.append("FILE_GRP", "1");s
    formData.append("Files[0]", image != null ? image : "");
    const imageResult = await handlePostImage.mutateAsync(formData);
    setInfoLoading("Hoàn thành...");
    console.log(imageResult);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <Dialog
        open={openDialog}
        onOpenChange={() => {
          if (!handlePostImage.isPending && !handlePostBanner.isPending) {
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
                  handlePostImage.isSuccess && handlePostBanner.isSuccess
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
                      Thêm quảng cáo thành công!
                    </span>
                  </DialogDescription>
                  <div className="flex gap-x-2 justify-end">
                    <ButtonForm
                      type="button"
                      className="!w-32 bg-secondary"
                      label="Xem danh sách"
                      onClick={() => navigate("/advertisement")}
                    ></ButtonForm>

                    <ButtonForm
                      type="button"
                      className="!w-28"
                      label="Thêm mới"
                      onClick={() => {
                        handlePostBanner.reset();
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
                  onClick={() => navigate("/advertisement")}
                >
                  <i className="ri-logout-box-line text-xl"></i>
                </div>
                <h4 className="text-xl font-medium text-gray-600">
                  Thêm quảng cáo
                </h4>
              </div>
              <div className="flex gap-x-2 shrink-0">
                <ButtonForm
                  label="Lưu"
                  type="submit"
                  className="bg-secondary !w-16"
                  loading={
                    handlePostBanner.isPending || handlePostImage.isPending
                  }
                ></ButtonForm>
              </div>
            </div>

            {/* table */}

            <div className="rounded-md p-5 bg-white border-gray-200 border shadow-md">
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="relative w-full overflow-hidden border border-gray-200 rounded-md p-3">
                  <div className="flex flex-col gap-y-2 px-20">
                    <div className="bg-slate-400 h-7 "></div>
                    <div className="grid grid-cols-[3fr_1fr] gap-2">
                      {values.BANRTYPE == "001" && image != null ? (
                        <img
                          className="h-72 w-full border shadow-md object-top object-cover"
                          src={URL.createObjectURL(image)}
                          alt=""
                        />
                      ) : (
                        <div className="h-72 flex-auto bg-slate-400"></div>
                      )}
                      <div className="grid grid-rows-3 h-72 gap-y-2">
                        {values.BANRTYPE == "004" && image != null ? (
                          <div>
                            <img
                              className="h-full w-52 border shadow-md object-top object-cover"
                              src={URL.createObjectURL(image)}
                              alt=""
                            />
                          </div>
                        ) : (
                          <div className="w-52 bg-slate-400"></div>
                        )}
                        <div className="w-52 bg-slate-400"></div>
                        <div className="w-52 bg-slate-400"></div>
                      </div>
                    </div>
                    {values.BANRTYPE == "002" && image != null ? (
                      <img
                        className="h-44 w-full border shadow-md object-top object-cover"
                        src={URL.createObjectURL(image)}
                        alt=""
                      />
                    ) : (
                      <div className="h-44 flex-auto bg-slate-400"></div>
                    )}
                    {values.BANRTYPE == "003" && image != null ? (
                      <img
                        className="h-72 w-full border shadow-md object-center object-cover"
                        src={URL.createObjectURL(image)}
                        alt=""
                      />
                    ) : (
                      <div className="h-72 flex-auto bg-slate-400"></div>
                    )}
                    <div className="bg-slate-400 h-7 flex-auto"></div>
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
                      Hình ảnh
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
                    options={dataBannerType ? dataBannerType : []}
                    loading={isFetchingBannerType}
                    itemKey={"ITEMCODE"}
                    itemValue={"ITEMNAME"}
                    important={true}
                    name="BANRTYPE"
                    // onChange={(e) => {
                    //   setFieldValue(
                    //     "BANRTYPE",
                    //     dataBannerType.find(
                    //       (item: CategoryObject) => item.ITEMCODE == e.ITEMCODE
                    //     ).ITEMNAME
                    //   );
                    // }}
                    label={"Vị trí đặt quảng cáo"}
                  ></SelectFormikForm>

                  {/* Loại đối tượng quản cáo  */}
                  <SelectFormikForm
                    options={dataBannerDataType ? dataBannerDataType : []}
                    loading={isFetchingBannerDataType}
                    itemKey={"ITEMCODE"}
                    itemValue={"ITEMNAME"}
                    important={true}
                    name="OBJCTYPE"
                    // onChange={(e) => {
                    //   setFieldValue(
                    //     "BANRTYPE",
                    //     dataBannerDataType.find(
                    //       (item: CategoryObject) => item.ITEMCODE == e.ITEMCODE
                    //     ).ITEMNAME
                    //   );
                    // }}
                    label={"Loại đối tượng quảng cáo"}
                  ></SelectFormikForm>

                  {/* Loại quảng cáo  */}
                  <SelectFormikForm
                    options={dataProducts ? dataProducts : []}
                    loading={isFetchingProducts}
                    itemKey={"PRDCCODE"}
                    itemValue={"PRDCNAME"}
                    important={true}
                    name="OBJCCODE"
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

                  {/* Trạng thái của quảng cáo  */}
                  <SelectFormikForm
                    options={dataStatus}
                    // loading={}
                    itemKey={"itemCode"}
                    itemValue={"itemName"}
                    important={true}
                    name="BANR_RUN"
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
