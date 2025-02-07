import BreadcrumbCustom from "@/component_common/breadcrumb/BreadcrumbCustom";
import ButtonForm from "@/component_common/commonForm/ButtonForm";
import InputFormikForm from "@/component_common/commonForm/InputFormikForm";
import NumberFormikForm from "@/component_common/commonForm/NumberFormikForm";
import SelectFormikForm from "@/component_common/commonForm/SelectFormikForm";
import TextareaFormikForm from "@/component_common/commonForm/TextareaFormikForm";
import SpinnerLoading from "@/component_common/loading/SpinnerLoading";
import {
  DialogDescription,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/store/userStore";
import {
  CategoryObject,
  DataExcelPatternObject,
  ProductObject,
} from "@/type/TypeCommon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";
import Excel from "exceljs";
import { exportExcelPattern } from "@/helper/excelHelper";
import { useSetProduct } from "@/api/react_query/query_product";
import {
  useGetEnumPrdcOptn,
  useGetLstAssetAttribute,
  useGetLstAssetType,
  useGetLstAsstSgAt,
  useGetLstColor,
  useGetLstDcmnSbCd,
  useGetLstMnfrTypeInpPrdcOdMt,
  useGetLstPrdcMchn,
  useGetLstPrdcSection,
  useGetLstProductBrand,
  useGetLstProductGroup,
  useGetLstProductGroupMnfr,
  useGetLstProductSetMtrl,
  useGetLstQUOM,
  useGetLstSortCode,
  useGetLstSpndSgDtTaxRaNm,
  useGetLstStdrQUOM,
} from "@/api/react_query/query_common";
import { useSetDocument } from "@/api/react_query/query_document";

const breadBrumb = [
  {
    itemName: "Quản lí chung",
  },
  {
    itemName: "Danh sách sản phẩm",
    itemLink: "/product",
  },
  {
    itemName: "Tạo",
    itemLink: "/create_product",
  },
];
const ProductCreatePageFormik = () => {
  const [infoLoading, setInfoLoading] = useState<string>("");
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const { currentUser } = useUserStore();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  //KHAI BÁO REACT QUERY
  const getLstQUOM = useGetLstQUOM();
  const getLstDcmnSbCd = useGetLstDcmnSbCd();
  const getLstProductBrand = useGetLstProductBrand();
  const getLstColor = useGetLstColor();
  const getLstSpndSgDtTaxRaNm = useGetLstSpndSgDtTaxRaNm();
  const getEnumPrdcOptn = useGetEnumPrdcOptn();
  const getLstSortCode = useGetLstSortCode();
  const getLstProductGroup = useGetLstProductGroup();
  const getLstPrdcSection = useGetLstPrdcSection();
  const getLstProductGroupMnfr = useGetLstProductGroupMnfr();
  const getLstMnfrTypeInpPrdcOdMt = useGetLstMnfrTypeInpPrdcOdMt();
  const getLstStdrQUOM = useGetLstStdrQUOM();
  const getLstProductSetMtrl = useGetLstProductSetMtrl();
  const getLstAssetType = useGetLstAssetType();
  const getLstAssetSubType = useGetLstAssetType();
  const getLstAsstSgAt = useGetLstAsstSgAt();
  const getLstAssetAttribute = useGetLstAssetAttribute();
  const getLstPrdcMchn = useGetLstPrdcMchn();
  const setCreateImage = useSetDocument();
  const setProduct = useSetProduct({ key: "product", update: true });

  const validationSchema = Yup.object().shape({
    PRDCCODE: Yup.string(),
    MPRDCNME: Yup.string()
      .min(8, "Tên sản phẩm ít nhất 8 kí tự!")
      .max(400, "Tên sản phẩm có nhiều nhất 400 kí tự!")
      .required("Không để trống!"),
    QUOMCODE: Yup.number().required("Không để trống phân loại!"),
    DCMNSBCD: Yup.string().required("Không để trống phân loại!"),
    BRNDCODE: Yup.string().required("Không để trống thương hiệu!"),
    COLRCODE: Yup.string().required("Không để trống màu sắc!"),
    VAT_RATE: Yup.number().required("Không để trống thuế suất!"),
    PRDCOPTN: Yup.number().required("Không để trống tính chất sản phẩm!"),
    SORTCODE: Yup.number().required("Không để trống loại hàng hóa!"),
    GRPRCODE: Yup.string().required("Không để trống nhóm hàng!"),
    PRDCPICT: Yup.string().required("Không để trống hình ảnh!"),
    // DCMNCODE: Yup.string(),
    ISALLOWONLINESALES: Yup.boolean(),
    ISSERIALNUMBERTRACKING: Yup.number(),
    PRDCPRCE: Yup.number().min(50000, "Giá bán tối thiểu là 50.000VNĐ!"),
    QUOMRPRT: Yup.number().min(0, "Không để trống đơn vị báo cáo!"),
    MNFRCOST: Yup.string().required("Không để trống loại gia công!"),
    BRIFNAME: Yup.string().required("Không để trống tên viết tắt!"),
    PRDCRPRT: Yup.string().required("Không để tên sản phẩm báo cáo!"),
    PRDCLONG: Yup.number().min(1, "Chiều dài tối thiểu là 1!"),
    PRDCHORZ: Yup.number().min(1, "Chiều rộng tối thiểu là 1!"),
    PRDCHIGH: Yup.number().min(1, "Chiều cao tối thiểu là 1!"),
    PRDCWEGH: Yup.number().min(1, "Khối lượng tối thiểu là 1!"),
    PRDCVLUM: Yup.number().min(1, "Thể tích tối thiểu là 1!"),
    PRDCAREA: Yup.number().min(1, "Diện tích tối thiểu là 1!"),
    GRP_MNFR: Yup.string().required("Không để trống nhóm hàng sản xuất!"),
    MNFRTYPE: Yup.number().required("Không để trống loại sản xuất!"),
    STDRQUOM: Yup.number().required("Không để trống tính công sản xuẩt!"),
    SET_MTRL: Yup.number().required("Không để trống khai báo định mức!"),
    MIN_ODER: Yup.number().min(1, "Số lượng đặt hàng tối thiểu là 1!"),
    MIN_QTTY: Yup.number().min(1, "Số lượng tồn kho tối thiểu là 1!"),
    ODERERLY: Yup.number()
      .min(1, "Nhận hàng sớm nhất tối thiểu 1 ngày!")
      .max(30, "Nhận hàng sớm nhất tối đa là 30 ngày!"),
    ODERLATE: Yup.number()
      .min(1, "Nhận hàng trễ nhất tối thiểu 1 ngày!")
      .max(30, "Nhận hàng trễ nhất tối đa là 30 ngày!"),
    ASTPCODE: Yup.string().required("Không để trống loại tài sản!"),
    SBTPCODE: Yup.string().required("Không để trống phân loại tài sản!"),
    ATTRCODE: Yup.number().required("Không để trống chủng loại tài sản!"),
    // ATTPCODE: Yup.number().min(0, "Không để trống chủng loại tài sản!"),
  });

  const initialValue = {
    PRDCCODE: "",
    MPRDCNME: "", //
    QUOMCODE: 0, //
    DCMNSBCD: "", //
    MQUOMNME: "",
    MDCSBNME: "",
    LCTNCODE: currentUser?.LCTNCODE, //
    BRNDCODE: "", //
    COLRCODE: "", //
    MDELPRDC: "", //
    VAT_RATE: 0, //
    PRDCOPTN: 0,
    SORTCODE: 0, //
    GRPRCODE: "", //
    MGRPRNME: "",
    COMPCODE: "PMC", //
    CLPRCODE: 1, //
    TPPRCODE: "", //
    SPRDCNME: "", //
    PRCERATE: 0,
    EXCHQTTY: 1,
    CFICIENT: 1,
    PRCEQMLG: 0,
    CUSTCODE: "",
    // DCMNCODE: "",
    ISALLOWONLINESALES: false,
    ISSERIALNUMBERTRACKING: 0, //
    PARTNERID: 0,
    SET_PRDC: 0,
    PRDCPRCE: 0,
    CURRCODE: "", //
    SCTNCODE: "001", //
    MSCTNNME: "",
    BRIFNAME: "", //
    QUOMRPRT: 0, //
    PRDCRPRT: "", //
    GRMFNAME: "",
    DATANAME: "",
    NOTETEXT: "", //
    MMCHNNME: "",
    MNFRCOST: "", //
    DESCRIPT: "", //
    PRDCLONG: 0, //
    PRDCHORZ: 0, //
    PRDCHIGH: 0, //
    PRDCWEGH: 0, //
    PRDCVLUM: 0, //
    PRDCAREA: 0, //
    GRP_MNFR: "", //
    MNFRTYPE: 0, //
    STDRQUOM: 0, //
    SET_MTRL: 0, //
    PRDCPICT: "",
    MIN_ODER: 0, //
    MIN_QTTY: 0, //
    ODERERLY: 0, //
    ODERLATE: 0, //
    ASTPCODE: "",
    SBTPCODE: "",
    ATTRCODE: 0,
    ATTPCODE: 0,
  };

  const handleSubmitProduct = async (values: any) => {
    console.log(values);
    setOpenDialog(true);
    setInfoLoading("Đang tải dữ liệu...");
    const data = await setProduct.mutateAsync({
      body: {
        DCMNCODE: "inpProduct",
        HEADER: [{ ...values, PRDCPICT: "" }],
      },
    });
    setInfoLoading("Đang thêm hình ảnh...");
    const resultData: any = data[0];
    const formData: FormData = new FormData();
    formData.append("DCMNCODE", "inpProduct");
    formData.append("KEY_CODE", resultData?.KKKK0000);
    formData.append("FILE_SRC", "1");
    formData.append("FILE_GRP", "1");
    // formData.append("FILE_GRP", "1");s
    formData.append("Files[0]", image != null ? image : "");
    const imageResult = await setCreateImage.mutateAsync({
      body: {
        formData,
      },
    });
    setInfoLoading("Hoàn thành...");
    // console.log(imageResult);
  };

  const extractExcel = async () => {
    const arrayLstQUOM: string = getLstDcmnSbCd.data
      ?.map((item: CategoryObject) => `${item.ITEMNAME}`)
      .join(",");
    console.log(arrayLstQUOM);
    const dataExcelObject: DataExcelPatternObject[] = [
      {
        id: "CompCode",
        type: "single",
        dataDemo: "PMC",
        header: "Công ty",
      },
      {
        id: "LctnCode",
        type: "single",
        dataDemo: "001",
        header: "Chi nhánh",
      },
      {
        id: "PRDCNAME",
        type: "single",
        dataDemo: "",
        header: "Mã sản phẩm",
      },
      {
        id: "QUOMCODE",
        type: "list",
        data: [null, ...getLstQUOM.data],
        dataKey: "ITEMCODE",
        dataName: "ITEMNAME",
        dataDemo: getLstQUOM.data[0].ITEMNAME,
        header: "Đơn vị tính",
      },
      {
        id: "DCMNSBCD",
        type: "list",
        data: [null, ...getLstDcmnSbCd.data],
        dataKey: "ITEMCODE",
        dataName: "ITEMNAME",
        dataDemo: getLstDcmnSbCd.data[0].ITEMNAME,
        header: "Phân loại",
      },
      {
        id: "BRNDCODE",
        type: "list",
        data: [null, ...getLstProductBrand.data],
        dataKey: "ITEMCODE",
        dataName: "ITEMNAME",
        dataDemo: getLstProductBrand.data[0].ITEMNAME,
        header: "Thương hiệu",
      },
      {
        id: "COLRCODE",
        type: "list",
        data: [null, ...getLstColor.data],
        dataKey: "ITEMCODE",
        dataName: "ITEMNAME",
        dataDemo: getLstColor.data[0].ITEMNAME,
        header: "Màu sắc",
      },
      {
        id: "MDELPRDC",
        type: "single",
        dataDemo: "Trắng vàng",
        header: "Model sản phẩm",
      },
      {
        id: "VAT_RATE",
        type: "list",
        data: [null, ...getLstSpndSgDtTaxRaNm.data],
        dataKey: "ITEMCODE",
        dataName: "ITEMNAME",
        dataDemo: getLstSpndSgDtTaxRaNm.data[0].ITEMNAME,
        header: "Thuế suất(%)",
      },
      {
        id: "PRDCOPTN",
        type: "list",
        data: [null, ...getEnumPrdcOptn.data],
        dataKey: "ITEMCODE",
        dataName: "ITEMNAME",
        dataDemo: getEnumPrdcOptn.data[0].ITEMNAME,
        header: "Tính chất sản phẩm",
      },
      {
        id: "SORTCODE",
        type: "list",
        data: [null, ...getLstSortCode.data],
        dataKey: "ITEMCODE",
        dataName: "ITEMNAME",
        dataDemo: getLstSortCode.data[0].ITEMNAME,
        header: "Loại hàng hóa",
      },
      {
        id: "GRPRCODE",
        type: "list",
        data: [null, ...getLstProductGroup.data],
        dataKey: "ITEMCODE",
        dataName: "ITEMNAME",
        dataDemo: getLstProductGroup.data[0].ITEMNAME,
        header: "Nhóm hàng",
      },
      {
        id: "PRDCPRCE",
        type: "single",
        dataDemo: 500000,
        header: "Giá bán",
      },
      {
        id: "CURRCODE",
        type: "single",
        dataDemo: "Lenovo 30",
        header: "Mã sản phẩm công ty",
      },
      {
        id: "SCTNCODE",
        type: "list",
        data: [null, ...getLstPrdcSection.data],
        dataKey: "ITEMCODE",
        dataName: "ITEMNAME",
        dataDemo: getLstPrdcSection.data[0].ITEMNAME,
        header: "Ngành hàng",
      },
      {
        id: "BRIFNAME",
        type: "single",
        dataDemo: "Lenovo 30",
        header: "Tên viết tắt",
      },
      {
        id: "QUOMRPRT",
        type: "list",
        data: [null, ...getLstQUOM.data],
        dataKey: "ITEMCODE",
        dataName: "ITEMNAME",
        dataDemo: getLstQUOM.data[0].ITEMNAME,
        header: "Đơn vị báo cáo",
      },
      {
        id: "PRDCRPRT",
        type: "single",
        dataDemo: "Lenovo 30",
        header: "Tên sp báo cáo",
      },
      {
        id: "MNFRCOST",
        type: "list",
        data: [null, ...getLstPrdcMchn.data],
        dataKey: "ITEMCODE",
        dataName: "ITEMNAME",
        dataDemo: getLstPrdcMchn.data[0].ITEMNAME,
        header: "Loại gia công",
      },
      {
        id: "PRDCLONG",
        type: "single",
        dataDemo: 2,
        header: "Chiều dài",
      },
      {
        id: "PRDCHORZ",
        type: "single",
        dataDemo: 2,
        header: "Chiều rộng",
      },
      {
        id: "PRDCHIGH",
        type: "single",
        dataDemo: 2,
        header: "Chiều cao",
      },
      {
        id: "PRDCWEGH",
        type: "single",
        dataDemo: 2,
        header: "Khối lượng",
      },
      {
        id: "PRDCVLUM",
        type: "single",
        dataDemo: 8,
        header: "Thể tích",
      },
      {
        id: "PRDCAREA",
        type: "single",
        dataDemo: 4,
        header: "Diện tích",
      },
      {
        id: "GRP_MNFR",
        type: "list",
        data: [null, ...getLstProductGroupMnfr.data],
        dataKey: "ITEMCODE",
        dataName: "ITEMNAME",
        dataDemo: getLstProductGroupMnfr.data[0].ITEMNAME,
        header: "Nhóm hàng sản xuẩt",
      },
      {
        id: "MNFRTYPE",
        type: "list",
        data: [null, ...getLstMnfrTypeInpPrdcOdMt.data],
        dataKey: "ITEMCODE",
        dataName: "ITEMNAME",
        dataDemo: getLstMnfrTypeInpPrdcOdMt.data[0].ITEMNAME,
        header: "Loại sản xuất",
      },
      {
        id: "STDRQUOM",
        type: "list",
        data: [null, ...getLstStdrQUOM.data],
        dataKey: "ITEMCODE",
        dataName: "ITEMNAME",
        dataDemo: getLstStdrQUOM.data[0].ITEMNAME,
        header: "Tính gia công sản xuất",
      },
      {
        id: "SET_MTRL",
        type: "list",
        data: [null, ...getLstProductSetMtrl.data],
        dataKey: "ITEMCODE",
        dataName: "ITEMNAME",
        dataDemo: getLstProductSetMtrl.data[0].ITEMNAME,
        header: "Khai báo định mức",
      },
      {
        id: "MIN_ODER",
        type: "single",
        dataDemo: 1,
        header: "Đặt hàng tối thiểu",
      },
      {
        id: "MIN_QTTY",
        type: "single",
        dataDemo: 1000,
        header: "Tồn kho tối thiểu",
      },
      {
        id: "ODERERLY",
        type: "single",
        dataDemo: 1,
        header: "Nhận hàng sớm nhất(ngày)",
      },
      {
        id: "ODERLATE",
        type: "single",
        dataDemo: 10,
        header: "Nhận hàng trễ nhất(ngày)",
      },
      {
        id: "ASTPCODE",
        type: "list",
        data: [null, ...getLstAssetType.data],
        dataKey: "ITEMCODE",
        dataName: "ITEMNAME",
        dataDemo: getLstAssetType.data[0].ITEMNAME,
        header: "Loại tài sản",
      },
      {
        id: "SBTPCODE",
        type: "list",
        data: [null, ...getLstAssetSubType.data],
        dataKey: "ITEMCODE",
        dataName: "ITEMNAME",
        dataDemo: getLstAssetSubType.data[0].ITEMNAME,
        header: "Phân loại tài sản",
      },
      {
        id: "ATTRCODE",
        type: "list",
        data: [null, ...getLstAsstSgAt.data],
        dataKey: "ITEMCODE",
        dataName: "ITEMNAME",
        dataDemo: getLstAsstSgAt.data[0].ITEMNAME,
        header: "Nhóm tài sản quản lí",
      },
      {
        id: "ATTPCODE",
        type: "list",
        data: [null, ...getLstAssetAttribute.data],
        dataKey: "ITEMCODE",
        dataName: "ITEMNAME",
        dataDemo: getLstAssetAttribute.data[0].ITEMNAME,
        header: "Chủng loại tài sản",
      },
      {
        id: "NOTETEXT",
        type: "single",
        dataDemo: "Đang sản xuất lenov 30",
        header: "Ghi chú sản xuất",
      },
    ];

    await exportExcelPattern(dataExcelObject);
  };

  console.log(setProduct.data);
  return (
    <div className="flex flex-col gap-y-2">
      <Dialog
        open={openDialog}
        onOpenChange={() => {
          if (!setCreateImage.isPending && !setProduct.isPending) {
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
                  setCreateImage.isSuccess && setProduct.isSuccess
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
                        setProduct.reset();
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
        key={"formLogin"}
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          handleSubmitProduct(values);
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
                  Thêm sản phẩm mới
                </h4>
              </div>
              <div className="flex gap-x-2 shrink-0">
                <ButtonForm
                  label="Import Excel"
                  type="submit"
                  className="bg-primary !w-36"
                  disabled={setProduct.isPending || setCreateImage.isPending}
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
                  loading={setProduct.isPending || setCreateImage.isPending}
                ></ButtonForm>
              </div>
            </div>

            {/* table */}

            <div className="rounded-md p-5 bg-white border-gray-200 border shadow-md">
              <div className="grid grid-cols-[1fr_3fr] gap-3 mb-5">
                <div className="relative min-h-[500px] w-full overflow-hidden">
                  <div className="grid w-full items-center gap-1.5 h-full">
                    <Label htmlFor="picture" className="h-full">
                      <div className="bg-slate-50 w-full h-full border border-gray-200 shadow-sm overflow-hidden">
                        <img
                          src={image != null ? URL.createObjectURL(image) : ""}
                          alt=""
                          className="h-full w-full object-contain object-center"
                        />
                      </div>
                    </Label>
                    <Label
                      htmlFor="picture"
                      className="absolute bottom-4 right-5 flex items-center shadow-sm cursor-pointer justify-center rounded-full border border-gray-200 w-10 h-10  bg-white"
                    >
                      <i className="ri-add-line text-gray-700 text-xl"></i>
                    </Label>
                    <Input
                      id="picture"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        setFieldValue(
                          "PRDCPICT",
                          e.target.files && e.target.files.length > 0
                            ? e.target.files[0].name.toString()
                            : ""
                        );
                        setImage(
                          e.target.files && e.target.files.length > 0
                            ? e.target.files[0]
                            : null
                        );
                      }}
                    />
                  </div>
                  {errors.DESCRIPT && (
                    <span className="text-red-500 text-xs">
                      {errors.PRDCPICT}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-3 h-fit">
                  {/*Mã sản phẩm */}
                  <InputFormikForm
                    placeholder="Nhập tên sản phẩm..."
                    disabled={false}
                    name="PRDCCODE"
                    label={"Mã sản phẩm"}
                    // disabled={isLoadingLogin}
                    important={true}
                    // placeholder="Nhập tài khoản..."
                  ></InputFormikForm>
                  {/* Nhập tên sản phẩm */}
                  <InputFormikForm
                    placeholder="Nhập tên sản phẩm..."
                    disabled={false}
                    name="MPRDCNME"
                    label={"Tên sản phẩm"}
                    important={true}
                  ></InputFormikForm>
                  {/* ĐƠn vị tính  */}
                  <SelectFormikForm
                    options={getLstQUOM.data ? getLstQUOM.data : []}
                    loading={getLstQUOM.isFetching}
                    itemKey={"ITEMCODE"}
                    itemValue={"ITEMNAME"}
                    important={true}
                    name="QUOMCODE"
                    onChange={(e) => {
                      setFieldValue(
                        "MQUOMNME",
                        getLstQUOM.data.find(
                          (item: CategoryObject) => item.ITEMCODE == e.ITEMCODE
                        ).ITEMNAME
                      );
                    }}
                    label={"Đơn vị tính"}
                  ></SelectFormikForm>{" "}
                  {/* Phân loại  */}
                  <SelectFormikForm
                    options={getLstDcmnSbCd.data ? getLstDcmnSbCd.data : []}
                    loading={getLstDcmnSbCd.isFetching}
                    itemKey={"ITEMCODE"}
                    itemValue={"ITEMNAME"}
                    important={true}
                    name="DCMNSBCD"
                    onChange={(e) => {
                      setFieldValue(
                        "MDCSBNME",
                        getLstDcmnSbCd.data.find(
                          (item: CategoryObject) => item.ITEMCODE == e.ITEMCODE
                        ).ITEMNAME
                      );
                    }}
                    label={"Phân loại"}
                  ></SelectFormikForm>
                  {/* Thương hiệu  */}
                  <SelectFormikForm
                    options={
                      getLstProductBrand.data ? getLstProductBrand.data : []
                    }
                    loading={getLstProductBrand.isFetching}
                    itemKey={"ITEMCODE"}
                    itemValue={"ITEMNAME"}
                    important={true}
                    name="BRNDCODE"
                    // onChange={(e) => {
                    //   setFieldValue("QUOMNAME", 4242);
                    // }}
                    label={"Thương hiệu"}
                  ></SelectFormikForm>
                  {/* Màu sắc  */}
                  <SelectFormikForm
                    options={getLstColor.data ? getLstColor.data : []}
                    loading={getLstColor.isPending}
                    itemKey={"ITEMCODE"}
                    itemValue={"ITEMNAME"}
                    important={true}
                    name="COLRCODE"
                    // onChange={(e) => {
                    //   setFieldValue("QUOMNAME", 4242);
                    // }}
                    label={"Màu sắc"}
                  ></SelectFormikForm>
                  {/* Model sản phẩm */}
                  <InputFormikForm
                    placeholder="Nhập model sản phẩm..."
                    disabled={false}
                    name="MDELPRDC"
                    label={"Model sản phẩm"}
                    // disabled={isLoadingLogin}
                    important={true}
                    // placeholder="Nhập tài khoản..."
                  ></InputFormikForm>
                  {/* Thuế suất  */}
                  <SelectFormikForm
                    options={
                      getLstSpndSgDtTaxRaNm.data
                        ? getLstSpndSgDtTaxRaNm.data
                        : []
                    }
                    loading={getLstSpndSgDtTaxRaNm.isPending}
                    itemKey={"ITEMCODE"}
                    itemValue={"ITEMNAME"}
                    important={true}
                    name="VAT_RATE"
                    // onChange={(e) => {
                    //   setFieldValue("QUOMNAME", 4242);
                    // }}
                    label={"Thuế suất(%)"}
                  ></SelectFormikForm>
                  {/* Tính chất sản phẩm */}
                  <SelectFormikForm
                    options={getEnumPrdcOptn.data ? getEnumPrdcOptn.data : []}
                    loading={getEnumPrdcOptn.isFetching}
                    itemKey={"ITEMCODE"}
                    itemValue={"ITEMNAME"}
                    important={true}
                    name="PRDCOPTN"
                    // onChange={(e) => {
                    //   setFieldValue("QUOMNAME", 4242);
                    // }}
                    label={"Tính chất sản phẩm"}
                  ></SelectFormikForm>
                  {/* Loại hàng hóa*/}
                  <SelectFormikForm
                    options={getLstSortCode.data ? getLstSortCode.data : []}
                    loading={getLstSortCode.isFetching}
                    itemKey={"ITEMCODE"}
                    itemValue={"ITEMNAME"}
                    important={true}
                    name="SORTCODE"
                    // onChange={(e) => {
                    //   setFieldValue("QUOMNAME", 4242);
                    // }}
                    label={"Loại hàng hóa"}
                  ></SelectFormikForm>
                  {/* Nhóm hàng*/}
                  <SelectFormikForm
                    options={
                      getLstProductGroup.data ? getLstProductGroup.data : []
                    }
                    loading={getLstProductGroup.isFetching}
                    itemKey={"ITEMCODE"}
                    itemValue={"ITEMNAME"}
                    important={true}
                    name="GRPRCODE"
                    onChange={(e) => {
                      setFieldValue(
                        "MGRPRNME",
                        getLstProductGroup.data.find(
                          (item: CategoryObject) => item.ITEMCODE == e.ITEMCODE
                        ).ITEMNAME
                      );
                    }}
                    label={"Nhóm hàng"}
                  ></SelectFormikForm>
                  {/* Giá bán  */}
                  <NumberFormikForm
                    name="PRDCPRCE"
                    important={true}
                    unit="VNĐ"
                    disabled={false}
                    label="Giá bán"
                    placeholder="Nhập giá bán..."
                  ></NumberFormikForm>
                  {/* Mã sản phẩm công ty */}
                  <InputFormikForm
                    name="CURRCODE"
                    important={false}
                    disabled={false}
                    label="Mã sản phẩm công ty"
                    placeholder="Nhập mã sản phẩm công ty..."
                  ></InputFormikForm>
                  {/* Ngành hàng*/}
                  <SelectFormikForm
                    options={
                      getLstPrdcSection.data ? getLstPrdcSection.data : []
                    }
                    loading={getLstPrdcSection.isFetching}
                    itemKey={"ITEMCODE"}
                    itemValue={"ITEMNAME"}
                    important={true}
                    name="SCTNCODE"
                    onChange={(e) => {
                      setFieldValue(
                        "MSCTNNME",
                        getLstPrdcSection.data.find(
                          (item: CategoryObject) => item.ITEMCODE == e.ITEMCODE
                        ).ITEMNAME
                      );
                    }}
                    label={"Ngành hàng"}
                  ></SelectFormikForm>
                  {/* Tên viết tắt  */}
                  <InputFormikForm
                    name="BRIFNAME"
                    important={false}
                    disabled={false}
                    label="Tên viết tắt"
                    placeholder="Nhập tên viết tắt..."
                  ></InputFormikForm>
                  {/* Đơn vị báo cáo  */}
                  <SelectFormikForm
                    options={getLstQUOM.data ? getLstQUOM.data : []}
                    loading={getLstQUOM.isFetching}
                    itemKey={"ITEMCODE"}
                    itemValue={"ITEMNAME"}
                    important={true}
                    name="QUOMRPRT"
                    // onChange={(e) => {
                    //   setFieldValue("QUOMNAME", 4242);
                    // }}
                    label={"Đơn vị báo cáo"}
                  ></SelectFormikForm>
                  {/* Tên sản phẩm báo cáo  */}
                  <InputFormikForm
                    name="PRDCRPRT"
                    important={false}
                    disabled={false}
                    label="Tên sản phẩm báo cáo"
                    placeholder="Nhập tên sản phẩm báo cáo..."
                  ></InputFormikForm>
                  {/* Loại gia công  */}
                  <SelectFormikForm
                    options={getLstPrdcMchn.data ? getLstPrdcMchn.data : []}
                    loading={getLstPrdcMchn.isFetching}
                    itemKey={"ITEMCODE"}
                    itemValue={"ITEMNAME"}
                    important={true}
                    name="MNFRCOST"
                    // onChange={(e) => {
                    //   setFieldValue("QUOMNAME", 4242);
                    // }}
                    label={"Loại gia công"}
                  ></SelectFormikForm>
                  {/* Quy cách  */}
                  <InputFormikForm
                    name="DESCRIPT"
                    important={false}
                    disabled={false}
                    label="Quy cách"
                    placeholder="Nhập quay cách..."
                  ></InputFormikForm>
                  {/* Nhóm hàng sản xuất  */}
                  <SelectFormikForm
                    options={
                      getLstProductGroupMnfr.data
                        ? getLstProductGroupMnfr.data
                        : []
                    }
                    loading={getLstProductGroupMnfr.isFetching}
                    itemKey={"ITEMCODE"}
                    itemValue={"ITEMNAME"}
                    important={true}
                    name="GRP_MNFR"
                    onChange={(e) => {
                      setFieldValue(
                        "GRMFNAME",
                        getLstProductGroupMnfr.data.find(
                          (item: CategoryObject) => item.ITEMCODE == e.ITEMCODE
                        ).ITEMNAME
                      );
                    }}
                    label={"Nhóm hàng sản xuất"}
                  ></SelectFormikForm>
                  {/* Loại sản xuất  */}
                  <SelectFormikForm
                    options={
                      getLstMnfrTypeInpPrdcOdMt.data
                        ? getLstMnfrTypeInpPrdcOdMt.data
                        : []
                    }
                    loading={getLstMnfrTypeInpPrdcOdMt.isFetching}
                    itemKey={"ITEMCODE"}
                    itemValue={"ITEMNAME"}
                    important={true}
                    name="MNFRTYPE"
                    onChange={(e) => {
                      setFieldValue(
                        "DATANAME",
                        getLstMnfrTypeInpPrdcOdMt.data.find(
                          (item: CategoryObject) => item.ITEMCODE == e.ITEMCODE
                        ).ITEMNAME
                      );
                    }}
                    label={"Loại sản xuất"}
                  ></SelectFormikForm>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {/* Chiều dài */}
                <NumberFormikForm
                  unit="cm"
                  placeholder="Nhập chiều dài sản phẩm..."
                  disabled={false}
                  name="PRDCLONG"
                  label={"Chiều dài"}
                  // disabled={isLoadingLogin}
                  important={true}
                ></NumberFormikForm>
                {/* Chiều rộng */}
                <NumberFormikForm
                  unit="cm"
                  placeholder="Nhập chiều rộng sản phẩm..."
                  disabled={false}
                  name="PRDCHORZ"
                  label={"Chiều rộng"}
                  // disabled={isLoadingLogin}
                  important={true}
                ></NumberFormikForm>
                {/* Chiều rộng */}
                <NumberFormikForm
                  unit="cm"
                  placeholder="Nhập chiều cao sản phẩm..."
                  disabled={false}
                  name="PRDCHIGH"
                  label={"Chiều cao"}
                  // disabled={isLoadingLogin}
                  important={true}
                ></NumberFormikForm>
                {/* Trọng lượng */}
                <NumberFormikForm
                  unit="kg"
                  placeholder="Nhập trọng lượng sản phẩm..."
                  disabled={false}
                  name="PRDCWEGH"
                  label={"Trọng lượng"}
                  // disabled={isLoadingLogin}
                  important={true}
                ></NumberFormikForm>
                {/* Thể tích */}
                <NumberFormikForm
                  unit="cm3"
                  placeholder="Nhập thể tích sản phẩm..."
                  disabled={false}
                  name="PRDCVLUM"
                  label={"Thể tích"}
                  // disabled={isLoadingLogin}
                  important={true}
                ></NumberFormikForm>
                {/*Diện tích */}
                <NumberFormikForm
                  unit="cm3"
                  placeholder="Nhập diện tích sản phẩm..."
                  disabled={false}
                  name="PRDCAREA"
                  label={"Diện tích"}
                  // disabled={isLoadingLogin}
                  important={true}
                ></NumberFormikForm>
                {/* Tính gia công sản xuất */}
                <SelectFormikForm
                  options={getLstStdrQUOM.data ? getLstStdrQUOM.data : []}
                  loading={getLstStdrQUOM.isFetching}
                  itemKey={"ITEMCODE"}
                  itemValue={"ITEMNAME"}
                  important={true}
                  name="STDRQUOM"
                  // onChange={(e) => {
                  //   setFieldValue("QUOMNAME", 4242);
                  // }}
                  label={"Tính gia công sản xuất"}
                ></SelectFormikForm>
                {/* Khai báo định mức  */}
                <SelectFormikForm
                  options={
                    getLstProductSetMtrl.data ? getLstProductSetMtrl.data : []
                  }
                  loading={getLstProductSetMtrl.isFetching}
                  itemKey={"ITEMCODE"}
                  itemValue={"ITEMNAME"}
                  important={true}
                  name="SET_MTRL"
                  // onChange={(e) => {
                  //   setFieldValue("QUOMNAME", 4242);
                  // }}
                  label={"Tính gia công sản xuất"}
                ></SelectFormikForm>
                {/*Đặt hàng tối thiểu */}
                <NumberFormikForm
                  // unit="cái"
                  placeholder="Nhập số lượng đặt tối thiểu..."
                  disabled={false}
                  name="MIN_ODER"
                  label={"Đặt hàng tối thiểu"}
                  // disabled={isLoadingLogin}
                  important={true}
                ></NumberFormikForm>
                {/*Đặt hàng tối thiểu */}
                <NumberFormikForm
                  // unit="cái"
                  placeholder="Nhập số lượng tồn kho tối thiểu..."
                  disabled={false}
                  name="MIN_QTTY"
                  label={"Tồn kho tối thiểu"}
                  // disabled={isLoadingLogin}
                  important={true}
                ></NumberFormikForm>
                {/*Thời gian nhận hàng sớm nhất */}
                <NumberFormikForm
                  unit="ngày"
                  placeholder="Nhập số thời gian nhận hàng sớm nhất..."
                  disabled={false}
                  name="ODERERLY"
                  label={"Thời gian nhận hàng sớm nhất"}
                  // disabled={isLoadingLogin}
                  important={true}
                ></NumberFormikForm>
                {/*Thời gian nhận hàng trễ nhất */}
                <NumberFormikForm
                  unit="ngày"
                  placeholder="Nhập số thời gian nhận hàng trễ nhất..."
                  disabled={false}
                  name="ODERLATE"
                  label={"Thời gian nhận hàng trễ nhất"}
                  // disabled={isLoadingLogin}
                  important={true}
                ></NumberFormikForm>
                {/* Loại tài sản */}
                <SelectFormikForm
                  options={getLstAssetType.data ? getLstAssetType.data : []}
                  loading={getLstAssetType.isFetching}
                  itemKey={"ITEMCODE"}
                  itemValue={"ITEMNAME"}
                  important={true}
                  name="ASTPCODE"
                  // onChange={(e) => {
                  //   setFieldValue("QUOMNAME", 4242);
                  // }}
                  label={"Loại tài sản"}
                ></SelectFormikForm>
                {/* Phân loại tài sản */}
                <SelectFormikForm
                  options={
                    getLstAssetSubType.data ? getLstAssetSubType.data : []
                  }
                  loading={getLstAssetSubType.isFetching}
                  itemKey={"ITEMCODE"}
                  itemValue={"ITEMNAME"}
                  important={true}
                  name="SBTPCODE"
                  // onChange={(e) => {
                  //   setFieldValue("QUOMNAME", 4242);
                  // }}
                  label={"Phân loại tài sản"}
                ></SelectFormikForm>
                {/* Nhóm tài sản quản lí */}
                <SelectFormikForm
                  options={getLstAsstSgAt.data ? getLstAsstSgAt.data : []}
                  loading={getLstAsstSgAt.isFetching}
                  itemKey={"ITEMCODE"}
                  itemValue={"ITEMNAME"}
                  important={true}
                  name="ATTRCODE"
                  // onChange={(e) => {
                  //   setFieldValue("QUOMNAME", 4242);
                  // }}
                  label={"Nhóm tài sản quản lí"}
                ></SelectFormikForm>
                {/* Chủng loại tài sản*/}
                <SelectFormikForm
                  options={
                    getLstAssetAttribute.data ? getLstAssetAttribute.data : []
                  }
                  loading={getLstAssetAttribute.isFetching}
                  itemKey={"ITEMCODE"}
                  itemValue={"ITEMNAME"}
                  important={true}
                  name="ATTPCODE"
                  // onChange={(e) => {
                  //   setFieldValue("QUOMNAME", 4242);
                  // }}
                  label={"Chủng loại tài sản"}
                ></SelectFormikForm>
              </div>
              {/*Ghi chú sản xuất*/}
              <div className="mt-2">
                <TextareaFormikForm
                  name="NOTETEXT"
                  important={false}
                  disabled={false}
                  label="Ghi chú sản xuất"
                  row={3}
                ></TextareaFormikForm>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductCreatePageFormik;
