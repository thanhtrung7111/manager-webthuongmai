import {
  deleteData,
  deleteImage,
  fetchCategory,
  fetchDataCondition,
  fetchDetailData,
  fetchImage,
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
  console.log(id);
  const [infoLoading, setInfoLoading] = useState<string>("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [image, setImage] = useState<File | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false);
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

  const handleUpdateBanner = useMutation({
    mutationFn: (body: { [key: string]: any }) => updateData(body),
    onSuccess: (data: AdvertisementObject[]) => {
      if (queryClient.getQueryData(["advertisements"])) {
        queryClient.setQueryData(
          ["advertisements"],
          (oldData: AdvertisementObject[]) => {
            const resultData = data[0];
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

  console.log(handleUpdateBanner.data);

  const handleDelete = useMutation({
    mutationFn: (body: { [key: string]: any }) => deleteData(body),
    onSuccess: async (data: AdvertisementObject[], body) => {
      if (queryClient.getQueryData(["advertisements"])) {
        queryClient.setQueryData(
          ["advertisements"],
          (oldData: AdvertisementObject[]) => {
            if (!oldData) return [];
            const resultData = data[0];
            console.log(body);
            console.log(
              oldData.filter((item) => item.KKKK0000 !== resultData.KKKK0000)
            );
            return oldData.filter((item) => item.KKKK0000 !== body.KEY_CODE);
          }
        );
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const fetchDetailBanner = useMutation({
    mutationFn: (body: { [key: string]: any }) => fetchDetailData(body),
    onSuccess: (data: AdvertisementObject[], variables) => {
      const resultData = data[0];
      console.log(resultData.BANR_RUN, "Fetch banner");
      console.log(variables);
      setInitialValue({
        COMPCODE: resultData.COMPCODE,
        KKKK0000: resultData.KKKK0000,
        LCTNCODE: resultData.LCTNCODE,
        BANRCODE: resultData.BANRCODE,
        BANRNAME: resultData.BANRNAME,
        BANRTYPE: resultData.BANRTYPE,
        OBJCTYPE: resultData.OBJCTYPE,
        OBJCCODE: resultData.OBJCCODE,
        BANR_RUN: resultData.BANR_RUN,
        IMAGE_BANR: resultData.DCMNFILE[0].FILENAME,
      });
    },
  });

  const fetchImagebanner = useQuery({
    queryKey: ["imageBanner" + id],
    queryFn: () =>
      fetchImage(
        fetchDetailBanner.data
          ? fetchDetailBanner.data[0].DCMNFILE[0].FILE_URL
          : ""
      ),
    enabled: fetchDetailBanner.isSuccess,
  });

  console.log(fetchDetailBanner.data);
  useEffect(() => {
    if (fetchDetailBanner.isSuccess) {
      fetchImagebanner.refetch();
    }
  }, [fetchDetailBanner.isSuccess]);

  const handlePostImage = useMutation({
    mutationFn: (body: FormData) => postImage(body),
    onSuccess: (data, variables) => {
      console.log(data);
    },
  });

  const deleteBannerImage = useMutation({
    mutationFn: (body: FormData) => deleteImage(body),
  });

  console.log(fetchImagebanner.data);

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
    const data = await handleUpdateBanner.mutateAsync({
      DCMNCODE: "inpBanner",
      HEADER: [{ ...values }],
    });
    if (image != null) {
      setInfoLoading("Đang thêm hình ảnh...");
      if (
        fetchDetailBanner.data &&
        fetchDetailBanner.data[0].DCMNFILE[0].FILECODE
      ) {
        const formDataDelete: FormData = new FormData();
        formDataDelete.append("DCMNCODE", "inpBanner");
        formDataDelete.append("KEY_CODE", values.KKKK0000);
        formDataDelete.append(
          "FILECODE",
          fetchDetailBanner.data[0].DCMNFILE[0].FILECODE
        );
        await deleteBannerImage.mutateAsync(formDataDelete);
      }

      const formData: FormData = new FormData();
      formData.append("DCMNCODE", "inpBanner");
      formData.append("KEY_CODE", values.KKKK0000);
      formData.append("FILE_SRC", "1");
      formData.append("FILE_GRP", "1");
      // formData.append("FILE_GRP", "1");s
      formData.append("Files[0]", image != null ? image : "");
      const imageResult = await handlePostImage.mutateAsync(formData);
    }
    setInfoLoading("Hoàn thành...");
  };

  useEffect(() => {
    const handleFetchDetailBanner = async () => {
      console.log(id, "205 detail");
      await fetchDetailBanner.mutateAsync({
        DCMNCODE: "inpBanner",
        KEY_CODE: id,
      });
    };
    if (id != null && id != "") {
      handleFetchDetailBanner();
    }
  }, [id]);

  useEffect(() => {
    fetchDetailBanner.reset();
    const handleFetchDetailBanner = async () => {
      console.log(id, "205 detail");
      await fetchDetailBanner.mutateAsync({
        DCMNCODE: "inpBanner",
        KEY_CODE: id,
      });
    };
    if (id != null && id != "") {
      handleFetchDetailBanner();
    }
  }, [handleDelete.isSuccess]);
  return (
    <div className="flex flex-col gap-y-2">
      {/* Thông báo xóa  */}

      <Dialog
        open={openDialogDelete}
        onOpenChange={() => {
          if (!handleDelete.isSuccess && !handleDelete.isPending) {
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
                        if (fetchDetailBanner.data)
                          handleDelete.mutateAsync({
                            DCMNCODE: "inpBanner",
                            KEY_CODE: fetchDetailBanner.data[0].KKKK0000,
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
          if (!handlePostImage.isPending && !handleUpdateBanner.isPending) {
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
                  handleUpdateBanner.isSuccess
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
                        handleUpdateBanner.reset();
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
                  loading={handleUpdateBanner.isPending}
                ></ButtonForm>
                <ButtonForm
                  label="Xóa"
                  type="button"
                  className="bg-red-500 !w-20"
                  onClick={() => setOpenDialogDelete(true)}
                  disabled={handleUpdateBanner.isPending}
                  icon={<i className="ri-delete-bin-line"></i>}
                ></ButtonForm>
              </div>
            </div>

            {/* table */}

            <div className="rounded-md p-5 bg-white border-gray-200 border shadow-md">
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="relative w-full overflow-hidden border border-gray-200 rounded-md p-3">
                  <div className="flex flex-col gap-y-2 px-20">
                    <div className="bg-slate-200 h-7"></div>
                    <div className="grid grid-cols-[3fr_1fr] gap-2">
                      {(values.BANRTYPE == "001" && image != null) ||
                      (values.BANRTYPE == "001" &&
                        fetchImagebanner.data != null &&
                        fetchDetailBanner.isSuccess) ? (
                        <img
                          className="h-72 w-full border shadow-md object-top object-cover"
                          src={
                            image == null
                              ? URL.createObjectURL(fetchImagebanner.data)
                              : URL.createObjectURL(image)
                          }
                          alt=""
                        />
                      ) : (
                        <div className="h-72 flex-auto bg-slate-200 flex items-center justify-center">
                          {fetchDetailBanner.isPending && (
                            <SpinnerLoading className="w-6 h-6 fill-slate-500"></SpinnerLoading>
                          )}
                        </div>
                      )}
                      <div className="grid grid-rows-3 h-72 gap-y-2">
                        {(values.BANRTYPE == "004" && image != null) ||
                        (values.BANRTYPE == "004" &&
                          fetchImagebanner.data != null &&
                          fetchDetailBanner.isSuccess) ? (
                          <div>
                            <img
                              className="w-52 h-full border shadow-md object-top object-cover"
                              src={
                                image == null
                                  ? URL.createObjectURL(fetchImagebanner.data)
                                  : URL.createObjectURL(image)
                              }
                              alt=""
                            />
                          </div>
                        ) : (
                          <div className="w-52 bg-slate-200 flex items-center justify-center">
                            {fetchDetailBanner.isPending && (
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
                      fetchImagebanner.data != null &&
                      fetchDetailBanner.isSuccess) ? (
                      <img
                        className="h-44 w-full border shadow-md object-top object-cover"
                        src={
                          image == null
                            ? URL.createObjectURL(fetchImagebanner.data)
                            : URL.createObjectURL(image)
                        }
                        alt=""
                      />
                    ) : (
                      <div className="h-44 flex-auto bg-slate-200 flex items-center justify-center">
                        {" "}
                        {fetchDetailBanner.isPending && (
                          <SpinnerLoading className="w-6 h-6 fill-slate-500"></SpinnerLoading>
                        )}
                      </div>
                    )}
                    {(values.BANRTYPE == "003" && image != null) ||
                    (values.BANRTYPE == "003" &&
                      fetchImagebanner.data != null &&
                      fetchDetailBanner.isSuccess) ? (
                      <img
                        className="h-72 w-full border shadow-md object-top object-cover"
                        src={
                          image == null
                            ? URL.createObjectURL(fetchImagebanner.data)
                            : URL.createObjectURL(image)
                        }
                        alt=""
                      />
                    ) : (
                      <div className="h-72 flex-auto bg-slate-200 flex items-center justify-center">
                        {fetchDetailBanner.isPending && (
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
                    options={dataBannerType ? dataBannerType : []}
                    loading={
                      isFetchingBannerType || fetchDetailBanner.isPending
                    }
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
                    loading={
                      isFetchingBannerDataType || fetchDetailBanner.isPending
                    }
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
                    loading={isFetchingProducts || fetchDetailBanner.isPending}
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
                    options={dataStatus ? dataStatus : []}
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

export default AdvertisementUpdatePage;