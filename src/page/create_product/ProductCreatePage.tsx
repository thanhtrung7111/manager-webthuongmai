import { fetchCategory, postData } from "@/api/commonApi";
import BreadcrumbCustom from "@/component_common/breadcrumb/BreadcrumbCustom";
import SpinnerLoading from "@/component_common/loading/SpinnerLoading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import { useUserStore } from "@/store/userStore";
import { CategoryObject, ProductObject } from "@/type/TypeCommon";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
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
const ProductCreatePage = () => {
  const [progress, setProgress] = useState<number>(0);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [image, setImage] = useState<File | null>(null);
  const { currentUser } = useUserStore();
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
  const postProduct = useMutation({
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

  console.log(queryClient.getQueryData(["products"]));
  const formSchema = z.object({
    PRDCCODE: z.string(),
    MPRDCNME: z
      .string()
      .min(8, { message: "Tên sản phẩm ít nhất 8 kí tự!" })
      .max(400, { message: "Tên sản phẩm có nhiều nhất 400 kí tự!" }),
    QUOMCODE: z.number().min(0, { message: "Không để trống phân loại!" }),
    DCMNSBCD: z.string().min(1, { message: "Không để trống phân loại!" }),
    MQUOMNME: z.string(),
    MDCSBNME: z.string(),
    LCTNCODE: z.string(),
    BRNDCODE: z.string().min(1, { message: "Không để trống thương hiệu!" }),
    COLRCODE: z.string().min(1, { message: "Không để trống màu sắc!" }),
    MDELPRDC: z.string(),
    VAT_RATE: z.number().min(0, { message: "Không để trống thuế suất!" }),
    PRDCOPTN: z
      .number()
      .min(0, { message: "Không để trống tính chất sản phẩm!" }),
    SORTCODE: z.number().min(0, { message: "Không để trống loại hàng hóa!" }),
    GRPRCODE: z.string().min(1, { message: "Không để trống nhóm hàng!" }),
    MGRPRNME: z.string(),
    COMPCODE: z.string(),
    CLPRCODE: z.number(),
    TPPRCODE: z.string(),
    SPRDCNME: z.string(),
    PRCERATE: z.number(),
    EXCHQTTY: z.number(),
    CFICIENT: z.number(),
    PRCEQMLG: z.number(),
    CUSTCODE: z.string(),
    // DCMNCODE: z.string(),
    ISALLOWONLINESALES: z.boolean(),
    ISSERIALNUMBERTRACKING: z.number(),
    PARTNERID: z.number(),
    SET_PRDC: z.number(),
    PRDCPRCE: z
      .number()
      .min(50000, { message: "Giá bán tối thiểu là 50.000VNĐ!" }),
    CURRCODE: z.string(),
    SCTNCODE: z.string(),
    MSCTNNME: z.string(),
    BRIFNAME: z.string(),
    QUOMRPRT: z.number().min(0, { message: "Không để trống đơn vị báo cáo!" }),
    PRDCRPRT: z.string(),
    GRMFNAME: z.string(),
    DATANAME: z.string(),
    NOTETEXT: z.string(),
    MMCHNNME: z.string(),
    MNFRCOST: z.string().min(1, { message: "Không để trống loại gia công!" }),
    DESCRIPT: z.string(),
    PRDCLONG: z.number().min(1, { message: "Chiều dài tối thiểu là 1!" }),
    PRDCHORZ: z.number().min(1, { message: "Chiều rộng tối thiểu là 1!" }),
    PRDCHIGH: z.number().min(1, { message: "Chiều cao tối thiểu là 1!" }),
    PRDCWEGH: z.number().min(1, { message: "Khối lượng tối thiểu là 1!" }),
    PRDCVLUM: z.number().min(1, { message: "Thể tích tối thiểu là 1!" }),
    PRDCAREA: z.number().min(1, { message: "Diện tích tối thiểu là 1!" }),
    GRP_MNFR: z
      .string()
      .min(1, { message: "Không để trống nhóm hàng sản xuất!" }),
    MNFRTYPE: z.number().min(1, { message: "Không để trống loại sản xuất!" }),
    STDRQUOM: z
      .number()
      .min(0, { message: "Không để trống tính công sản xuẩt!" }),
    SET_MTRL: z
      .number()
      .min(0, { message: "Không để trống khai báo định mức!" }),
    PRDCPICT: z.string(),
    MIN_ODER: z
      .number()
      .min(1, { message: "Số lượng đặt hàng tối thiểu là 1!" }),
    MIN_QTTY: z
      .number()
      .min(1, { message: "Số lượng tồn kho tối thiểu là 1!" }),
    ODERERLY: z
      .number()
      .min(1, {
        message: "Nhận hàng sớm nhất tối thiểu 1 ngày!",
      })
      .max(30, { message: "Nhận hàng sớm nhất tối đa là 30 ngày!" }),
    ODERLATE: z
      .number()
      .min(1, {
        message: "Nhận hàng trễ nhất tối thiểu 1 ngày!",
      })
      .max(30, { message: "Nhận hàng trễ nhất tối đa là 30 ngày!" }),
    ASTPCODE: z.string().min(1, {
      message: "Không để trống loại tài sản!",
    }),
    SBTPCODE: z.string().min(1, {
      message: "Không để trống phân loại tài sản!",
    }),
    ATTRCODE: z.number().min(0, {
      message: "Không để trống chủng loại tài sản!",
    }),
    ATTPCODE: z.number().min(0, {
      message: "Không để trống chủng loại tài sản!",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      PRDCCODE: "",
      MPRDCNME: "", //
      QUOMCODE: -1, //
      DCMNSBCD: "", //
      MQUOMNME: "",
      MDCSBNME: "",
      LCTNCODE: currentUser?.LCTNCODE, //
      BRNDCODE: "", //
      COLRCODE: "", //
      MDELPRDC: "", //
      VAT_RATE: -1, //
      PRDCOPTN: -1,
      SORTCODE: -1, //
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
      QUOMRPRT: -1, //
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
      MNFRTYPE: -1, //
      STDRQUOM: -1, //
      SET_MTRL: -1, //
      PRDCPICT: "",
      MIN_ODER: 0, //
      MIN_QTTY: 0, //
      ODERERLY: 0, //
      ODERLATE: 0, //
      ASTPCODE: "",
      SBTPCODE: "",
      ATTRCODE: -1,
      ATTPCODE: -1,
    },
  });

  const submitCreate = async (values: z.infer<typeof formSchema>) => {
    const dataPost = await postProduct.mutateAsync({
      DCMNCODE: "inpProduct",
      HEADER: [{ ...values }],
    });
  };

  return (
    <>
      <div className="flex flex-col gap-y-2">
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

        {/* Action  */}
        <div className="flex justify-between items-center">
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
          <div className="flex gap-x-2">
            <Button className="transition-colors" size={"sm"}>
              <i className="ri-download-2-line mr-2"></i>Import Excel
            </Button>
            <Button
              className="bg-green-600 w-32 disabled:bg-slate-500 hover:bg-green-500 transition-colors"
              size={"sm"}
              onClick={form.handleSubmit(submitCreate)}
              disabled={postProduct.isPending}
            >
              {postProduct.isPending ? (
                <SpinnerLoading className="w-5 h-5 fill-primary"></SpinnerLoading>
              ) : (
                "Lưu"
              )}
            </Button>
          </div>
        </div>

        {/* table */}

        <div className="rounded-md p-5 bg-white border-gray-200 border shadow-md">
          {isFetchingLstQUOM &&
          isFetchinglstAssetAttribute &&
          isFetchinglstAssetSubType &&
          isFetchinglstAssetType &&
          isFetchinglstAsstSgAt &&
          isFetchinglstColor &&
          isFetchinglstDcmnSbCd &&
          isFetchinglstEnum_PrdcOptn &&
          isFetchinglstMnfrType_inpPrdcOdMt &&
          isFetchinglstPrdcMchn &&
          isFetchinglstPrdcSection &&
          isFetchinglstProductBrand &&
          isFetchinglstProductGroup &&
          isFetchinglstProductGroupMnfr &&
          isFetchinglstProduct_Set_Mtrl &&
          isFetchinglstSortCode &&
          isFetchinglstSpndSgDt_Tax_RaNm &&
          isFetchinglstStdrQUOM ? (
            <div>
              <SpinnerLoading className="w-5 h-5 fill-primary"></SpinnerLoading>{" "}
              Đang tải dữ liệu form...
            </div>
          ) : (
            <Form {...form}>
              <form>
                <div className="grid grid-cols-[1fr_3fr] gap-3 mb-3">
                  <div className="relative h-full">
                    <div className="grid w-full max-w-sm items-center gap-1.5 h-full">
                      <Label htmlFor="picture" className="h-full">
                        <div className="bg-slate-50 w-full h-full border border-gray-200 shadow-sm overflow-hidden">
                          <img
                            src={
                              image != null ? URL.createObjectURL(image) : ""
                            }
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
                        onChange={(e) =>
                          setImage(
                            e.target.files && e.target.files.length > 0
                              ? e.target.files[0]
                              : null
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 h-fit">
                    {/* Mã hàng hóa  */}
                    <FormField
                      control={form.control}
                      name="PRDCCODE"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">
                            Mã hàng hóa
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nhập mã hàng hóa..."
                              className="focus:!ring-0 focus:!ring-transparent text-gray-700"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs font-light" />
                        </FormItem>
                      )}
                    />
                    {/* Tên sản phẩm  */}
                    <FormField
                      control={form.control}
                      name="MPRDCNME"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">
                            Tên sản phẩm <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nhập tên sản phẩm..."
                              className="focus:!ring-0 focus:!ring-transparent text-gray-700"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs font-light" />
                        </FormItem>
                      )}
                    />
                    {/* Đơn vị tính  */}
                    <FormField
                      control={form.control}
                      name="QUOMCODE"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">
                            Đơn vị tính <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={
                              field.value == -1 ? "" : field.value.toString()
                            }
                          >
                            <FormControl>
                              <SelectTrigger className="focus:!ring-0 focus:!ring-transparent">
                                <SelectValue
                                  className=""
                                  placeholder="Chọn đơn vị tính---"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {lstQUOM &&
                                isSuccessLstQUOM &&
                                lstQUOM.map(
                                  (item: CategoryObject, index: number) => {
                                    return (
                                      <SelectItem
                                        value={item.ITEMCODE}
                                        key={item.ITEMCODE}
                                      >
                                        {item.ITEMNAME}
                                      </SelectItem>
                                    );
                                  }
                                )}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs font-light" />
                        </FormItem>
                      )}
                    />
                    {/* Phân loại  */}
                    <FormField
                      control={form.control}
                      name="DCMNSBCD"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">
                            Phân loại <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={(value) => {
                              form.setValue("DCMNSBCD", value);
                              form.setValue(
                                "MDCSBNME",
                                lstDcmnSbCd?.find(
                                  (item: CategoryObject) =>
                                    item?.ITEMCODE == value
                                ).ITEMNAME
                              );
                              form.trigger("DCMNSBCD");
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="focus:!ring-0 focus:!ring-transparent">
                                <SelectValue
                                  className=""
                                  placeholder="Chọn phân loại ---"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {lstDcmnSbCd &&
                                isSuccesslstDcmnSbCd &&
                                lstDcmnSbCd.map(
                                  (item: CategoryObject, index: number) => {
                                    return (
                                      <SelectItem
                                        value={item.ITEMCODE}
                                        key={item.ITEMCODE}
                                      >
                                        {item.ITEMNAME}
                                      </SelectItem>
                                    );
                                  }
                                )}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs font-light" />
                        </FormItem>
                      )}
                    />
                    {/* Thương hiệu  */}
                    <FormField
                      control={form.control}
                      name="BRNDCODE"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">
                            Thương hiệu <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="focus:!ring-0 focus:!ring-transparent">
                                <SelectValue
                                  className=""
                                  placeholder="Chọn thương hiệu ---"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {lstProductBrand &&
                                isSuccesslstProductBrand &&
                                lstProductBrand.map(
                                  (item: CategoryObject, index: number) => {
                                    return (
                                      <SelectItem
                                        value={item.ITEMCODE}
                                        key={item.ITEMCODE}
                                      >
                                        {item.ITEMNAME}
                                      </SelectItem>
                                    );
                                  }
                                )}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs font-light" />
                        </FormItem>
                      )}
                    />
                    {/* Màu sắc */}
                    <FormField
                      control={form.control}
                      name="COLRCODE"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">
                            Màu sắc <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="focus:!ring-0 focus:!ring-transparent">
                                <SelectValue
                                  className=""
                                  placeholder="Chọn màu sắc ---"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {lstColor &&
                                isSuccesslstColor &&
                                lstColor.map(
                                  (item: CategoryObject, index: number) => {
                                    return (
                                      <SelectItem
                                        value={item.ITEMCODE}
                                        key={item.ITEMCODE}
                                      >
                                        {item.ITEMNAME}
                                      </SelectItem>
                                    );
                                  }
                                )}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs font-light" />
                        </FormItem>
                      )}
                    />
                    {/* Model  */}
                    <FormField
                      control={form.control}
                      name="MDELPRDC"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">
                            Model sản phẩm{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nhập model..."
                              className="focus:!ring-0 focus:!ring-transparent text-gray-700"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs font-light" />
                        </FormItem>
                      )}
                    />
                    {/* Thuế suất */}
                    <FormField
                      control={form.control}
                      name="VAT_RATE"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">
                            Thuế suất <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={
                              field.value == -1 ? "" : field.value.toString()
                            }
                          >
                            <FormControl>
                              <SelectTrigger className="focus:!ring-0 focus:!ring-transparent">
                                <SelectValue
                                  className=""
                                  placeholder="Chọn thuế suất ---"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {lstSpndSgDt_Tax_RaNm &&
                                isSuccesslstSpndSgDt_Tax_RaNm &&
                                lstSpndSgDt_Tax_RaNm.map(
                                  (item: CategoryObject, index: number) => {
                                    return (
                                      <SelectItem
                                        value={item.ITEMCODE}
                                        key={item.ITEMCODE}
                                      >
                                        {item.ITEMNAME}
                                      </SelectItem>
                                    );
                                  }
                                )}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs font-light" />
                        </FormItem>
                      )}
                    />
                    {/* Tính chất sản phẩm */}
                    <FormField
                      control={form.control}
                      name="PRDCOPTN"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">
                            Tính chất sản phẩm{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={
                              field.value == -1 ? "" : field.value.toString()
                            }
                          >
                            <FormControl>
                              <SelectTrigger className="focus:!ring-0 focus:!ring-transparent">
                                <SelectValue
                                  className=""
                                  placeholder="Chọn tính chất sản phẩm ---"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {lstEnum_PrdcOptn &&
                                isSuccesslstEnum_PrdcOptn &&
                                lstEnum_PrdcOptn.map(
                                  (item: CategoryObject, index: number) => {
                                    return (
                                      <SelectItem
                                        value={item.ITEMCODE}
                                        key={item.ITEMCODE}
                                      >
                                        {item.ITEMNAME}
                                      </SelectItem>
                                    );
                                  }
                                )}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs font-light" />
                        </FormItem>
                      )}
                    />
                    {/* Loại hàng hóa */}
                    <FormField
                      control={form.control}
                      name="SORTCODE"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">
                            Loại hàng hóa{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={
                              field.value == -1 ? "" : field.value.toString()
                            }
                          >
                            <FormControl>
                              <SelectTrigger className="focus:!ring-0 focus:!ring-transparent">
                                <SelectValue
                                  className=""
                                  placeholder="Chọn loại hàng hóa ---"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {lstSortCode &&
                                isSuccesslstSortCode &&
                                lstSortCode.map(
                                  (item: CategoryObject, index: number) => {
                                    return (
                                      <SelectItem
                                        value={item.ITEMCODE}
                                        key={item.ITEMCODE}
                                      >
                                        {item.ITEMNAME}
                                      </SelectItem>
                                    );
                                  }
                                )}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs font-light" />
                        </FormItem>
                      )}
                    />
                    {/* Nhóm hàng */}
                    <FormField
                      control={form.control}
                      name="GRPRCODE"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">
                            Nhóm hàng <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="focus:!ring-0 focus:!ring-transparent">
                                <SelectValue
                                  className=""
                                  placeholder="Chọn nhóm hàng ---"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {lstProductGroup &&
                                isSuccesslstProductGroup &&
                                lstProductGroup.map(
                                  (item: CategoryObject, index: number) => {
                                    return (
                                      <SelectItem
                                        value={item.ITEMCODE}
                                        key={item.ITEMCODE}
                                      >
                                        {item.ITEMNAME}
                                      </SelectItem>
                                    );
                                  }
                                )}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs font-light" />
                        </FormItem>
                      )}
                    />
                    {/*Giá bán*/}
                    <FormField
                      control={form.control}
                      name="PRDCPRCE"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">
                            Giá bán <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Nhập giá bán..."
                              className="focus:!ring-0 focus:!ring-transparent text-gray-700"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs font-light" />
                        </FormItem>
                      )}
                    />
                    {/*Mã sản phẩm công ty*/}
                    <FormField
                      control={form.control}
                      name="CURRCODE"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">
                            Mã sản phẩm công ty
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Nhập mã sản phẩm công ty..."
                              className="focus:!ring-0 focus:!ring-transparent text-gray-700"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs font-light" />
                        </FormItem>
                      )}
                    />

                    {/* Ngành hàng*/}
                    <FormField
                      control={form.control}
                      name="SCTNCODE"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">
                            Ngành hàng <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="focus:!ring-0 focus:!ring-transparent">
                                <SelectValue
                                  className=""
                                  placeholder="Chọn ngành hàng ---"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {lstPrdcSection &&
                                isSuccesslstPrdcSection &&
                                lstPrdcSection.map(
                                  (item: CategoryObject, index: number) => {
                                    return (
                                      <SelectItem
                                        value={item.ITEMCODE}
                                        key={item.ITEMCODE}
                                      >
                                        {item.ITEMNAME}
                                      </SelectItem>
                                    );
                                  }
                                )}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs font-light" />
                        </FormItem>
                      )}
                    />

                    {/*Tên viết tắt*/}
                    <FormField
                      control={form.control}
                      name="BRIFNAME"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">
                            Tên viết tắt <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Nhập tên viết tắt..."
                              className="focus:!ring-0 focus:!ring-transparent text-gray-700"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs font-light" />
                        </FormItem>
                      )}
                    />

                    {/* Đơn vị tính báo cáo*/}
                    <FormField
                      control={form.control}
                      name="QUOMRPRT"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">
                            Đơn vị tính báo cáo{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={
                              field.value == -1 ? "" : field.value.toString()
                            }
                          >
                            <FormControl>
                              <SelectTrigger className="focus:!ring-0 focus:!ring-transparent">
                                <SelectValue
                                  className=""
                                  placeholder="Chọn đơn vị tính báo cáo ---"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {lstQUOM &&
                                isSuccessLstQUOM &&
                                lstQUOM.map(
                                  (item: CategoryObject, index: number) => {
                                    return (
                                      <SelectItem
                                        value={item.ITEMCODE}
                                        key={item.ITEMCODE}
                                      >
                                        {item.ITEMNAME}
                                      </SelectItem>
                                    );
                                  }
                                )}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs font-light" />
                        </FormItem>
                      )}
                    />

                    {/*Tên sản phẩm báo cáo*/}
                    <FormField
                      control={form.control}
                      name="PRDCRPRT"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">
                            Tên sản phẩm báo cáo{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Nhập tên sản phẩm báo cáo..."
                              className="focus:!ring-0 focus:!ring-transparent text-gray-700"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs font-light" />
                        </FormItem>
                      )}
                    />
                    {/* Lọai gia công*/}
                    <FormField
                      control={form.control}
                      name="MNFRCOST"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">
                            Loại gia công{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="focus:!ring-0 focus:!ring-transparent">
                                <SelectValue
                                  className=""
                                  placeholder="Chọn loại gia công ---"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {lstPrdcMchn &&
                                isSuccesslstPrdcMchn &&
                                lstPrdcMchn.map(
                                  (item: CategoryObject, index: number) => {
                                    return (
                                      <SelectItem
                                        value={item.ITEMCODE}
                                        key={item.ITEMCODE}
                                      >
                                        {item.ITEMNAME}
                                      </SelectItem>
                                    );
                                  }
                                )}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs font-light" />
                        </FormItem>
                      )}
                    />

                    {/*Quy cách*/}
                    <FormField
                      control={form.control}
                      name="DESCRIPT"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">
                            Quy cách
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Nhập quy cách..."
                              className="focus:!ring-0 focus:!ring-transparent text-gray-700"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs font-light" />
                        </FormItem>
                      )}
                    />
                    {/* Nhóm hàng sản xuất*/}
                    <FormField
                      control={form.control}
                      name="GRP_MNFR"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">
                            Nhóm hàng sản xuất{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="focus:!ring-0 focus:!ring-transparent">
                                <SelectValue
                                  className=""
                                  placeholder="Chọn nhóm hàng sản xuất ---"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {lstProductGroupMnfr &&
                                isSuccesslstProductGroupMnfr &&
                                lstProductGroupMnfr.map(
                                  (item: CategoryObject, index: number) => {
                                    return (
                                      <SelectItem
                                        value={item.ITEMCODE}
                                        key={item.ITEMCODE}
                                      >
                                        {item.ITEMNAME}
                                      </SelectItem>
                                    );
                                  }
                                )}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs font-light" />
                        </FormItem>
                      )}
                    />
                    {/* Loại sản xuất*/}
                    <FormField
                      control={form.control}
                      name="MNFRTYPE"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600">
                            Loại sản xuất{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={
                              field.value == -1 ? "" : field.value.toString()
                            }
                          >
                            <FormControl>
                              <SelectTrigger className="focus:!ring-0 focus:!ring-transparent">
                                <SelectValue
                                  className=""
                                  placeholder="Chọn loại sản xuất ---"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {lstMnfrType_inpPrdcOdMt &&
                                isSuccesslstMnfrType_inpPrdcOdMt &&
                                lstMnfrType_inpPrdcOdMt.map(
                                  (item: CategoryObject, index: number) => {
                                    return (
                                      <SelectItem
                                        value={item.ITEMCODE}
                                        key={item.ITEMCODE}
                                      >
                                        {item.ITEMNAME}
                                      </SelectItem>
                                    );
                                  }
                                )}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs font-light" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {/*Chiều dài*/}
                  <FormField
                    control={form.control}
                    name="PRDCLONG"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">
                          Chiều dài <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Nhập chiều dài..."
                            className="focus:!ring-0 focus:!ring-transparent text-gray-700"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-light" />
                      </FormItem>
                    )}
                  />
                  {/*Chiều rộng*/}
                  <FormField
                    control={form.control}
                    name="PRDCHORZ"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">
                          Chiều rộng <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Nhập chiều rộng..."
                            className="focus:!ring-0 focus:!ring-transparent text-gray-700"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-light" />
                      </FormItem>
                    )}
                  />
                  {/*Chiều cao*/}
                  <FormField
                    control={form.control}
                    name="PRDCHIGH"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">
                          Chiều cao <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Nhập chiều cao..."
                            className="focus:!ring-0 focus:!ring-transparent text-gray-700"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-light" />
                      </FormItem>
                    )}
                  />
                  {/*Trọng lượng*/}
                  <FormField
                    control={form.control}
                    name="PRDCWEGH"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">
                          Trọng lượng <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Nhập trọng lượng..."
                            className="focus:!ring-0 focus:!ring-transparent text-gray-700"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-light" />
                      </FormItem>
                    )}
                  />
                  {/*Thể tích*/}
                  <FormField
                    control={form.control}
                    name="PRDCVLUM"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">
                          Thể tích <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Nhập thể tích..."
                            className="focus:!ring-0 focus:!ring-transparent text-gray-700"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-light" />
                      </FormItem>
                    )}
                  />
                  {/*Diện tích*/}
                  <FormField
                    control={form.control}
                    name="PRDCAREA"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">
                          Diện tích <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Nhập diện tích..."
                            className="focus:!ring-0 focus:!ring-transparent text-gray-700"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-light" />
                      </FormItem>
                    )}
                  />

                  {/* Tính công sản xuất*/}
                  <FormField
                    control={form.control}
                    name="STDRQUOM"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">
                          Tính công sản xuất{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={
                            field.value == -1 ? "" : field.value.toString()
                          }
                        >
                          <FormControl>
                            <SelectTrigger className="focus:!ring-0 focus:!ring-transparent">
                              <SelectValue
                                className=""
                                placeholder="Chọn tính công sản xuất ---"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {lstStdrQUOM &&
                              isSuccesslstStdrQUOM &&
                              lstStdrQUOM.map(
                                (item: CategoryObject, index: number) => {
                                  return (
                                    <SelectItem
                                      value={item.ITEMCODE}
                                      key={item.ITEMCODE}
                                    >
                                      {item.ITEMNAME}
                                    </SelectItem>
                                  );
                                }
                              )}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs font-light" />
                      </FormItem>
                    )}
                  />
                  {/*Khai báo định mức*/}
                  <FormField
                    control={form.control}
                    name="SET_MTRL"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">
                          Khai báo định mức{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={
                            field.value == -1 ? "" : field.value.toString()
                          }
                        >
                          <FormControl>
                            <SelectTrigger className="focus:!ring-0 focus:!ring-transparent">
                              <SelectValue
                                className=""
                                placeholder="Chọn khai báo định mức ---"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {lstProduct_Set_Mtrl &&
                              isSuccesslstProduct_Set_Mtrl &&
                              lstProduct_Set_Mtrl.map(
                                (item: CategoryObject, index: number) => {
                                  return (
                                    <SelectItem
                                      value={item.ITEMCODE}
                                      key={item.ITEMCODE}
                                    >
                                      {item.ITEMNAME}
                                    </SelectItem>
                                  );
                                }
                              )}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs font-light" />
                      </FormItem>
                    )}
                  />

                  {/*Đặt hàng tối thiểu*/}
                  <FormField
                    control={form.control}
                    name="MIN_ODER"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">
                          Đặt tối thiểu <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Nhập số lượng..."
                            className="focus:!ring-0 focus:!ring-transparent text-gray-700"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-light" />
                      </FormItem>
                    )}
                  />
                  {/*Tồn kho tối thiểu*/}
                  <FormField
                    control={form.control}
                    name="MIN_QTTY"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">
                          Tồn kho tối thiểu{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Nhập số lượng..."
                            className="focus:!ring-0 focus:!ring-transparent text-gray-700"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-light" />
                      </FormItem>
                    )}
                  />
                  {/*Thời gian nhận hàng*/}
                  <FormField
                    control={form.control}
                    name="ODERERLY"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">
                          Thời gian nhận hàng sớm nhất(ngày){" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Nhập số ngày..."
                            className="focus:!ring-0 focus:!ring-transparent text-gray-700"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-light" />
                      </FormItem>
                    )}
                  />
                  {/*Thời gian nhận hàng trễ nhất*/}
                  <FormField
                    control={form.control}
                    name="ODERLATE"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">
                          Thời gian nhận hàng trễ nhất(ngày){" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Nhập số ngày..."
                            className="focus:!ring-0 focus:!ring-transparent text-gray-700"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-light" />
                      </FormItem>
                    )}
                  />

                  {/*Loại tài sản*/}
                  <FormField
                    control={form.control}
                    name="ASTPCODE"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">
                          Loại tài sản <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="focus:!ring-0 focus:!ring-transparent">
                              <SelectValue
                                className=""
                                placeholder="Chọn loại tài sản ---"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {lstAssetType &&
                              isSuccesslstAssetType &&
                              lstAssetType.map(
                                (item: CategoryObject, index: number) => {
                                  return (
                                    <SelectItem
                                      value={item.ITEMCODE}
                                      key={item.ITEMCODE}
                                    >
                                      {item.ITEMNAME}
                                    </SelectItem>
                                  );
                                }
                              )}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs font-light" />
                      </FormItem>
                    )}
                  />

                  {/*Phân loại tài sản*/}
                  <FormField
                    control={form.control}
                    name="SBTPCODE"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">
                          Phân loại tài sản{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="focus:!ring-0 focus:!ring-transparent">
                              <SelectValue
                                className=""
                                placeholder="Chọn phân loại tài sản ---"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {lstAssetSubType &&
                              isSuccesslstAssetSubType &&
                              lstAssetSubType.map(
                                (item: CategoryObject, index: number) => {
                                  return (
                                    <SelectItem
                                      value={item.ITEMCODE}
                                      key={item.ITEMCODE}
                                    >
                                      {item.ITEMNAME}
                                    </SelectItem>
                                  );
                                }
                              )}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs font-light" />
                      </FormItem>
                    )}
                  />
                  {/*Nhóm tài sản quản lí*/}
                  <FormField
                    control={form.control}
                    name="ATTRCODE"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">
                          Nhóm tài sản quản lí{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={
                            field.value == -1 ? "" : field.value.toString()
                          }
                        >
                          <FormControl>
                            <SelectTrigger className="focus:!ring-0 focus:!ring-transparent">
                              <SelectValue
                                className=""
                                placeholder="Chọn nhóm tài sản quản lí ---"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {lstAsstSgAt &&
                              isSuccesslstAsstSgAt &&
                              lstAsstSgAt.map(
                                (item: CategoryObject, index: number) => {
                                  return (
                                    <SelectItem
                                      value={item.ITEMCODE}
                                      key={item.ITEMCODE}
                                    >
                                      {item.ITEMNAME}
                                    </SelectItem>
                                  );
                                }
                              )}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs font-light" />
                      </FormItem>
                    )}
                  />
                  {/*Chủng loại tài sản*/}
                  <FormField
                    control={form.control}
                    name="ATTPCODE"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">
                          Chủng loại tài sản{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={
                            field.value == -1 ? "" : field.value.toString()
                          }
                        >
                          <FormControl>
                            <SelectTrigger
                              className={`focus:!ring-0 focus:!ring-transparent`}
                            >
                              <SelectValue
                                className=""
                                placeholder="Chọn chủng lọai tài sản ---"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {lstAssetAttribute &&
                              isSuccesslstAssetAttribute &&
                              lstAssetAttribute.map(
                                (item: CategoryObject, index: number) => {
                                  return (
                                    <SelectItem
                                      value={item.ITEMCODE}
                                      key={item.ITEMCODE}
                                    >
                                      {item.ITEMNAME}
                                    </SelectItem>
                                  );
                                }
                              )}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs font-light" />
                      </FormItem>
                    )}
                  />
                </div>
                {/*Ghi chú sản xuất*/}
                <FormField
                  control={form.control}
                  name="NOTETEXT"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">
                        Ghi chú sản xuất
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nhập ghi chú sản xuất..."
                          className="focus:!ring-0 focus:!ring-transparent text-gray-700"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs font-light" />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCreatePage;
