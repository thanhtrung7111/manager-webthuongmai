import { fetchCategory, postData, postImage } from "@/api/commonApi";
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
  DataExcelObject,
  ProductObject,
} from "@/type/TypeCommon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";
import Excel from "exceljs";
import { exportExcel } from "@/helper/excelHelper";

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
  const [progress, setProgress] = useState<number>(0);
  const [infoLoading, setInfoLoading] = useState<string>("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [image, setImage] = useState<File | null>(null);
  const { currentUser } = useUserStore();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const {
    data: lstQUOM,
    isFetching: isFetchingLstQUOM,
    isSuccess: isSuccessLstQUOM,
  } = useQuery({
    queryKey: ["lstQUOM"],
    queryFn: () => fetchCategory("lstQUOM"),
  });

  const {
    data: lstDcmnSbCd,
    isFetching: isFetchinglstDcmnSbCd,
    isSuccess: isSuccesslstDcmnSbCd,
  } = useQuery({
    queryKey: ["lstDcmnSbCd"],
    queryFn: () => fetchCategory("lstDcmnSbCd"),
  });
  const {
    data: lstProductBrand,
    isFetching: isFetchinglstProductBrand,
    isSuccess: isSuccesslstProductBrand,
  } = useQuery({
    queryKey: ["lstProductBrand"],
    queryFn: () => fetchCategory("lstProductBrand"),
  });

  const {
    data: lstColor,
    isFetching: isFetchinglstColor,
    isSuccess: isSuccesslstColor,
  } = useQuery({
    queryKey: ["lstColor"],
    queryFn: () => fetchCategory("lstColor"),
  });

  const {
    data: lstSpndSgDt_Tax_RaNm,
    isFetching: isFetchinglstSpndSgDt_Tax_RaNm,
    isSuccess: isSuccesslstSpndSgDt_Tax_RaNm,
  } = useQuery({
    queryKey: ["lstSpndSgDt_Tax_RaNm"],
    queryFn: () => fetchCategory("lstSpndSgDt_Tax_RaNm"),
  });

  const {
    data: lstEnum_PrdcOptn,
    isFetching: isFetchinglstEnum_PrdcOptn,
    isSuccess: isSuccesslstEnum_PrdcOptn,
  } = useQuery({
    queryKey: ["Enum_PrdcOptn"],
    queryFn: () => fetchCategory("Enum_PrdcOptn"),
  });
  const {
    data: lstSortCode,
    isFetching: isFetchinglstSortCode,
    isSuccess: isSuccesslstSortCode,
  } = useQuery({
    queryKey: ["lstSortCode"],
    queryFn: () => fetchCategory("lstSortCode"),
  });

  const {
    data: lstProductGroup,
    isFetching: isFetchinglstProductGroup,
    isSuccess: isSuccesslstProductGroup,
  } = useQuery({
    queryKey: ["lstProductGroup"],
    queryFn: () => fetchCategory("lstProductGroup"),
  });
  const {
    data: lstPrdcSection,
    isFetching: isFetchinglstPrdcSection,
    isSuccess: isSuccesslstPrdcSection,
  } = useQuery({
    queryKey: ["lstPrdcSection"],
    queryFn: () => fetchCategory("lstPrdcSection"),
  });

  const {
    data: lstProductGroupMnfr,
    isFetching: isFetchinglstProductGroupMnfr,
    isSuccess: isSuccesslstProductGroupMnfr,
  } = useQuery({
    queryKey: ["lstProductGroupMnfr"],
    queryFn: () => fetchCategory("lstProductGroupMnfr"),
  });
  const {
    data: lstMnfrType_inpPrdcOdMt,
    isFetching: isFetchinglstMnfrType_inpPrdcOdMt,
    isSuccess: isSuccesslstMnfrType_inpPrdcOdMt,
  } = useQuery({
    queryKey: ["lstMnfrType_inpPrdcOdMt"],
    queryFn: () => fetchCategory("lstMnfrType_inpPrdcOdMt"),
  });

  const {
    data: lstStdrQUOM,
    isFetching: isFetchinglstStdrQUOM,
    isSuccess: isSuccesslstStdrQUOM,
  } = useQuery({
    queryKey: ["lstStdrQUOM"],
    queryFn: () => fetchCategory("lstStdrQUOM"),
  });
  const {
    data: lstProduct_Set_Mtrl,
    isFetching: isFetchinglstProduct_Set_Mtrl,
    isSuccess: isSuccesslstProduct_Set_Mtrl,
  } = useQuery({
    queryKey: ["lstProduct_Set_Mtrl"],
    queryFn: () => fetchCategory("lstProduct_Set_Mtrl"),
  });
  const {
    data: lstAssetType,
    isFetching: isFetchinglstAssetType,
    isSuccess: isSuccesslstAssetType,
  } = useQuery({
    queryKey: ["lstAssetType"],
    queryFn: () => fetchCategory("lstAssetType"),
  });
  const {
    data: lstAssetSubType,
    isFetching: isFetchinglstAssetSubType,
    isSuccess: isSuccesslstAssetSubType,
  } = useQuery({
    queryKey: ["lstAssetSubType"],
    queryFn: () => fetchCategory("lstAssetSubType"),
  });
  const {
    data: lstAsstSgAt,
    isFetching: isFetchinglstAsstSgAt,
    isSuccess: isSuccesslstAsstSgAt,
  } = useQuery({
    queryKey: ["lstAsstSgAt"],
    queryFn: () => fetchCategory("lstAsstSgAt"),
  });

  const {
    data: lstAssetAttribute,
    isFetching: isFetchinglstAssetAttribute,
    isSuccess: isSuccesslstAssetAttribute,
  } = useQuery({
    queryKey: ["lstAssetAttribute"],
    queryFn: () => fetchCategory("lstAssetAttribute"),
  });
  const {
    data: lstPrdcMchn,
    isFetching: isFetchinglstPrdcMchn,
    isSuccess: isSuccesslstPrdcMchn,
  } = useQuery({
    queryKey: ["lstPrdcMchn"],
    queryFn: () => fetchCategory("lstPrdcMchn"),
  });
  const handlePostProduct = useMutation({
    mutationFn: (body: { [key: string]: any }) => postData(body),
    onSuccess: (data: ProductObject[]) => {
      if (queryClient.getQueryData(["products"])) {
        queryClient.setQueryData(["products"], (oldData: ProductObject[]) => {
          const resultData = data[0];
          return [
            {
              PRDCNAME: resultData?.MPRDCNME,
              QUOMNAME: lstQUOM.find(
                (item: CategoryObject) =>
                  item.ITEMCODE == resultData?.QUOMCODE.toString()
              ).ITEMNAME,
              PRDCCODE: resultData?.PRDCCODE,
            },
            ...oldData,
          ];
        });
      }
    },
  });

  const handlePostImage = useMutation({
    mutationFn: (body: FormData) => postImage(body),
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
    const data = await handlePostProduct.mutateAsync({
      DCMNCODE: "inpProduct",
      HEADER: [{ ...values, PRDCPICT: "" }],
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
    const imageResult = await handlePostImage.mutateAsync(formData);
    setInfoLoading("Hoàn thành...");
    // console.log(imageResult);
  };

  const extractExcel = async () => {
    const arrayLstQUOM: string = lstDcmnSbCd
      ?.map((item: CategoryObject) => `${item.ITEMNAME}`)
      .join(",");
    console.log(arrayLstQUOM);
    const dataExcelObject: DataExcelObject[] = [
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
        data: [
          "",

          ...lstQUOM.map((item: CategoryObject) => `${item.ITEMCODE}`),
        ],
        dataDemo: lstQUOM[0].ITEMCODE,
        header: "Đơn vị tính",
      },
      {
        id: "DCMNSBCD",
        type: "list",
        data: [
          "",
          ...lstDcmnSbCd.map((item: CategoryObject) => `${item.ITEMCODE}`),
        ],
        dataDemo: lstDcmnSbCd[0].ITEMCODE,
        header: "Phân loại",
      },
      {
        id: "BRNDCODE",
        type: "list",
        data: [
          "",

          ...lstProductBrand.map((item: CategoryObject) => `${item.ITEMCODE}`),
        ],
        dataDemo: lstProductBrand[0].ITEMCODE,
        header: "Thương hiệu",
      },
      {
        id: "COLRCODE",
        type: "list",
        data: [
          "",

          ...lstColor.map((item: CategoryObject) => `${item.ITEMCODE}`),
        ],
        dataDemo: lstColor[0].ITEMCODE,
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
        data: [
          "",

          ...lstSpndSgDt_Tax_RaNm.map(
            (item: CategoryObject) => `${item.ITEMCODE}`
          ),
        ],
        dataDemo: lstSpndSgDt_Tax_RaNm[0].ITEMCODE,
        header: "Thuế suất(%)",
      },
      {
        id: "PRDCOPTN",
        type: "list",
        data: [
          "",

          ...lstEnum_PrdcOptn.map((item: CategoryObject) => `${item.ITEMCODE}`),
        ],
        dataDemo: lstEnum_PrdcOptn[0].ITEMCODE,
        header: "Tính chất sản phẩm",
      },
      {
        id: "SORTCODE",
        type: "list",
        data: [
          "",

          ...lstSortCode.map((item: CategoryObject) => `${item.ITEMCODE}`),
        ],
        dataDemo: lstSortCode[0].ITEMCODE,
        header: "Loại hàng hóa",
      },
      {
        id: "GRPRCODE",
        type: "list",
        data: [
          "",

          ...lstProductGroup.map((item: CategoryObject) => `${item.ITEMCODE}`),
        ],
        dataDemo: lstProductGroup[0].ITEMCODE,
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
        data: [
          "",

          ...lstPrdcSection.map((item: CategoryObject) => `${item.ITEMCODE}`),
        ],
        dataDemo: lstPrdcSection[0].ITEMCODE,
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
        data: [
          "",

          ...lstQUOM.map((item: CategoryObject) => `${item.ITEMCODE}`),
        ],
        dataDemo: lstQUOM[0].ITEMCODE,
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
        data: [
          "",

          ...lstPrdcMchn.map((item: CategoryObject) => `${item.ITEMCODE}`),
        ],
        dataDemo: lstPrdcMchn[0].ITEMCODE,
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
        data: [
          "",

          ...lstProductGroupMnfr.map(
            (item: CategoryObject) => `${item.ITEMCODE}`
          ),
        ],
        dataDemo: lstProductGroupMnfr[0].ITEMCODE,
        header: "Nhóm hàng sản xuẩt",
      },
      {
        id: "MNFRTYPE",
        type: "list",
        data: [
          "",

          ...lstMnfrType_inpPrdcOdMt.map(
            (item: CategoryObject) => `${item.ITEMCODE}`
          ),
        ],
        dataDemo: lstMnfrType_inpPrdcOdMt[0].ITEMCODE,
        header: "Loại sản xuất",
      },
      {
        id: "STDRQUOM",
        type: "list",
        data: [
          "",

          ...lstStdrQUOM.map((item: CategoryObject) => `${item.ITEMCODE}`),
        ],
        dataDemo: lstStdrQUOM[0].ITEMCODE,
        header: "Tính gia công sản xuất",
      },
      {
        id: "SET_MTRL",
        type: "list",
        data: [
          "",

          ...lstProduct_Set_Mtrl.map(
            (item: CategoryObject) => `${item.ITEMCODE}`
          ),
        ],
        dataDemo: lstProduct_Set_Mtrl[0].ITEMCODE,
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
        data: [
          "",

          ...lstAssetType.map((item: CategoryObject) => `${item.ITEMCODE}`),
        ],
        dataDemo: lstAssetType[0].ITEMCODE,
        header: "Loại tài sản",
      },
      {
        id: "SBTPCODE",
        type: "list",
        data: [
          "",

          ...lstAssetSubType.map((item: CategoryObject) => `${item.ITEMCODE}`),
        ],
        dataDemo: lstAssetSubType[0].ITEMCODE,
        header: "Phân loại tài sản",
      },
      {
        id: "ATTRCODE",
        type: "list",
        data: [
          "",

          ...lstAsstSgAt.map((item: CategoryObject) => `${item.ITEMCODE}`),
        ],
        dataDemo: lstAsstSgAt[0].ITEMCODE,
        header: "Nhóm tài sản quản lí",
      },
      {
        id: "ATTPCODE",
        type: "list",
        data: [
          "",

          ...lstAssetAttribute.map(
            (item: CategoryObject) => `${item.ITEMCODE}`
          ),
        ],
        dataDemo: lstAssetAttribute[0].ITEMCODE,
        header: "Chủng loại tài sản",
      },
      {
        id: "NOTETEXT",
        type: "single",
        dataDemo: "Đang sản xuất lenov 30",
        header: "Ghi chú sản xuất",
      },
    ];

    await exportExcel(dataExcelObject);
  };

  console.log(handlePostProduct.data);
  return (
    <div className="flex flex-col gap-y-2">
      <Dialog
        open={openDialog}
        onOpenChange={() => {
          if (!handlePostImage.isPending && !handlePostProduct.isPending) {
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
                  handlePostImage.isSuccess && handlePostProduct.isSuccess
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
                        handlePostProduct.reset();
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
                  disabled={
                    handlePostProduct.isPending || handlePostImage.isPending
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
                    handlePostProduct.isPending || handlePostImage.isPending
                  }
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
                    // disabled={isLoadingLogin}
                    important={true}
                    // placeholder="Nhập tài khoản..."
                  ></InputFormikForm>
                  {/* ĐƠn vị tính  */}
                  <SelectFormikForm
                    options={lstQUOM ? lstQUOM : []}
                    loading={isFetchingLstQUOM}
                    itemKey={"ITEMCODE"}
                    itemValue={"ITEMNAME"}
                    important={true}
                    name="QUOMCODE"
                    onChange={(e) => {
                      setFieldValue(
                        "MQUOMNME",
                        lstQUOM.find(
                          (item: CategoryObject) => item.ITEMCODE == e.ITEMCODE
                        ).ITEMNAME
                      );
                    }}
                    label={"Đơn vị tính"}
                  ></SelectFormikForm>{" "}
                  {/* Phân loại  */}
                  <SelectFormikForm
                    options={lstDcmnSbCd ? lstDcmnSbCd : []}
                    loading={isFetchinglstDcmnSbCd}
                    itemKey={"ITEMCODE"}
                    itemValue={"ITEMNAME"}
                    important={true}
                    name="DCMNSBCD"
                    onChange={(e) => {
                      setFieldValue(
                        "MDCSBNME",
                        lstDcmnSbCd.find(
                          (item: CategoryObject) => item.ITEMCODE == e.ITEMCODE
                        ).ITEMNAME
                      );
                    }}
                    label={"Phân loại"}
                  ></SelectFormikForm>
                  {/* Thương hiệu  */}
                  <SelectFormikForm
                    options={lstProductBrand ? lstProductBrand : []}
                    loading={isFetchinglstProductBrand}
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
                    options={lstColor ? lstColor : []}
                    loading={isFetchinglstColor}
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
                    options={lstSpndSgDt_Tax_RaNm ? lstSpndSgDt_Tax_RaNm : []}
                    loading={isFetchinglstSpndSgDt_Tax_RaNm}
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
                    options={lstEnum_PrdcOptn ? lstEnum_PrdcOptn : []}
                    loading={isFetchinglstEnum_PrdcOptn}
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
                    options={lstSortCode ? lstSortCode : []}
                    loading={isFetchinglstSortCode}
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
                    options={lstProductGroup ? lstProductGroup : []}
                    loading={isFetchinglstProductGroup}
                    itemKey={"ITEMCODE"}
                    itemValue={"ITEMNAME"}
                    important={true}
                    name="GRPRCODE"
                    onChange={(e) => {
                      setFieldValue(
                        "MGRPRNME",
                        lstProductGroup.find(
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
                    options={lstPrdcSection ? lstPrdcSection : []}
                    loading={isFetchinglstPrdcSection}
                    itemKey={"ITEMCODE"}
                    itemValue={"ITEMNAME"}
                    important={true}
                    name="SCTNCODE"
                    onChange={(e) => {
                      setFieldValue(
                        "MSCTNNME",
                        lstPrdcSection.find(
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
                    options={lstQUOM ? lstQUOM : []}
                    loading={isFetchingLstQUOM}
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
                    options={lstPrdcMchn ? lstPrdcMchn : []}
                    loading={isFetchinglstPrdcMchn}
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
                    options={lstProductGroupMnfr ? lstProductGroupMnfr : []}
                    loading={isFetchinglstProductGroupMnfr}
                    itemKey={"ITEMCODE"}
                    itemValue={"ITEMNAME"}
                    important={true}
                    name="GRP_MNFR"
                    onChange={(e) => {
                      setFieldValue(
                        "GRMFNAME",
                        lstProductGroupMnfr.find(
                          (item: CategoryObject) => item.ITEMCODE == e.ITEMCODE
                        ).ITEMNAME
                      );
                    }}
                    label={"Nhóm hàng sản xuất"}
                  ></SelectFormikForm>
                  {/* Loại sản xuất  */}
                  <SelectFormikForm
                    options={
                      lstMnfrType_inpPrdcOdMt ? lstMnfrType_inpPrdcOdMt : []
                    }
                    loading={isFetchinglstMnfrType_inpPrdcOdMt}
                    itemKey={"ITEMCODE"}
                    itemValue={"ITEMNAME"}
                    important={true}
                    name="MNFRTYPE"
                    onChange={(e) => {
                      setFieldValue(
                        "DATANAME",
                        lstMnfrType_inpPrdcOdMt.find(
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
                  options={lstStdrQUOM ? lstStdrQUOM : []}
                  loading={isFetchinglstStdrQUOM}
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
                  options={lstProduct_Set_Mtrl ? lstProduct_Set_Mtrl : []}
                  loading={isFetchinglstProduct_Set_Mtrl}
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
                  options={lstAssetType ? lstAssetType : []}
                  loading={isFetchinglstAssetType}
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
                  options={lstAssetSubType ? lstAssetSubType : []}
                  loading={isFetchinglstAssetSubType}
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
                  options={lstAsstSgAt ? lstAsstSgAt : []}
                  loading={isFetchinglstAsstSgAt}
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
                  options={lstAssetAttribute ? lstAssetAttribute : []}
                  loading={isFetchinglstAssetAttribute}
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
