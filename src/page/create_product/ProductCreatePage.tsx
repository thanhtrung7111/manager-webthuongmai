import {
  fetchColor,
  fetchDcmnSbCd,
  fetchEnum_PrdcOptn,
  fetchProductBrand,
  fetchProductGroup,
  fetchQUOM,
  fetchSortCode,
  fetchSpndSgDt_Tax_RaNm,
} from "@/assets/api/commonApi";
import BreadcrumbCustom from "@/component_common/breadcrumb/BreadcrumbCustom";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserStore } from "@/store/userStore";
import { CategoryObject } from "@/type/TypeCommon";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { currentUser } = useUserStore();
  const {
    data: lstQUOM,
    isFetching: isFetchingLstQUOM,
    isSuccess: isSuccessLstQUOM,
  } = useQuery({
    queryKey: ["lstQUOM"],
    queryFn: () => fetchQUOM(),
  });

  const {
    data: lstDcmnSbCd,
    isFetching: isFetchinglstDcmnSbCd,
    isSuccess: isSuccesslstDcmnSbCd,
  } = useQuery({
    queryKey: ["lstDcmnSbCd"],
    queryFn: () => fetchDcmnSbCd(),
  });
  const {
    data: lstProductBrand,
    isFetching: isFetchinglstProductBrand,
    isSuccess: isSuccesslstProductBrand,
  } = useQuery({
    queryKey: ["lstProductBrand"],
    queryFn: () => fetchProductBrand(),
  });

  const {
    data: lstColor,
    isFetching: isFetchinglstColor,
    isSuccess: isSuccesslstColor,
  } = useQuery({
    queryKey: ["lstColor"],
    queryFn: () => fetchColor(),
  });

  const {
    data: lstSpndSgDt_Tax_RaNm,
    isFetching: isFetchinglstSpndSgDt_Tax_RaNm,
    isSuccess: isSuccesslstSpndSgDt_Tax_RaNm,
  } = useQuery({
    queryKey: ["lstSpndSgDt_Tax_RaNm"],
    queryFn: () => fetchSpndSgDt_Tax_RaNm(),
  });

  const {
    data: lstEnum_PrdcOptn,
    isFetching: isFetchinglstEnum_PrdcOptn,
    isSuccess: isSuccesslstEnum_PrdcOptn,
  } = useQuery({
    queryKey: ["Enum_PrdcOptn"],
    queryFn: () => fetchEnum_PrdcOptn(),
  });
  const {
    data: lstSortCode,
    isFetching: isFetchinglstSortCode,
    isSuccess: isSuccesslstSortCode,
  } = useQuery({
    queryKey: ["lstSortCode"],
    queryFn: () => fetchSortCode(),
  });

  const {
    data: lstProductGroup,
    isFetching: isFetchinglstProductGroup,
    isSuccess: isSuccesslstProductGroup,
  } = useQuery({
    queryKey: ["lstProductGroup"],
    queryFn: () => fetchProductGroup(),
  });

  console.log(lstQUOM);
  const formSchema = z.object({
    PRDCCODE: z.string(),
    MPRDCNME: z
      .string()
      .min(8, { message: "Tên sản phẩm ít nhất 8 kí tự!" })
      .max(400, { message: "Tên sản phẩm có nhiều nhất 400 kí tự!" }),
    QUOMCODE: z.string(),
    DCMNSBCD: z.string(),
    MQUOMNME: z.string(),
    MDCSBNME: z.string(),
    LCTNCODE: z.string(),
    BRNDCODE: z.string(),
    COLRCODE: z.string(),
    MDELPRDC: z.string(),
    VAT_RATE: z.string(),
    PRDCOPTN: z.string(),
    SORTCODE: z.string(),
    GRPRCODE: z.string(),
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
    DCMNCODE: z.string(),
    ISALLOWONLINESALES: z.boolean(),
    ISSERIALNUMBERTRACKING: z.boolean(),
    ADD_DATA: z.string(),
    PARTNERID: z.number(),
    SET_PRDC: z.number(),
    PRDCPRCE: z.number(),
    CURRCODE: z.string(),
    SCTNCODE: z.string(),
    MSCTNNME: z.string(),
    BRIFNAME: z.string(),
    QUOMRPRT: z.number(),
    PRDCRPRT: z.string(),
    GRMFNAME: z.string(),
    DATANAME: z.string(),
    NOTETEXT: z.string(),
    MMCHNNME: z.string(),
    MNFRCOST: z.string(),
    DESCRIPT: z.string(),
    PRDCLONG: z.number(),
    PRDCHORZ: z.number(),
    PRDCHIGH: z.number(),
    PRDCWEGH: z.number(),
    PRDCVLUM: z.number(),
    PRDCAREA: z.number(),
    GRP_MNFR: z.string(),
    MNFRTYPE: z.number(),
    STDRQUOM: z.number(),
    SET_MTRL: z.number(),
    PRDCPICT: z.string(),
    MIN_ODER: z.number(),
    MIN_QTTY: z.number(),
    ODERERLY: z.number(),
    ODERLATE: z.number(),
    ASTPCODE: z.string(),
    SBTPCODE: z.string(),
    ATTRCODE: z.number(),
    ATTPCODE: z.number(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      PRDCCODE: "",
      MPRDCNME: "",
      QUOMCODE: "",
      DCMNSBCD: "",
      MQUOMNME: "",
      MDCSBNME: "",
      LCTNCODE: currentUser?.LCTNCODE,
      BRNDCODE: "",
      COLRCODE: "",
      MDELPRDC: "",
      VAT_RATE: "",
      PRDCOPTN: "",
      SORTCODE: "",
      GRPRCODE: "",
      MGRPRNME: "",
      COMPCODE: "",
      CLPRCODE: 1,
      TPPRCODE: "",
      SPRDCNME: "",
      PRCERATE: 0,
      EXCHQTTY: 1,
      CFICIENT: 1,
      PRCEQMLG: 0,
      CUSTCODE: "",
      DCMNCODE: "",
      ISALLOWONLINESALES: false,
      ISSERIALNUMBERTRACKING: false,
      ADD_DATA: "",
      PARTNERID: 0,
      SET_PRDC: 0,
      PRDCPRCE: 0,
      CURRCODE: "",
      SCTNCODE: "001",
      MSCTNNME: "",
      BRIFNAME: "",
      QUOMRPRT: 999,
      PRDCRPRT: "",
      GRMFNAME: "",
      DATANAME: "",
      NOTETEXT: "",
      MMCHNNME: "",
      MNFRCOST: "0",
      DESCRIPT: "",
      PRDCLONG: 0,
      PRDCHORZ: 0,
      PRDCHIGH: 0,
      PRDCWEGH: 0,
      PRDCVLUM: 0,
      PRDCAREA: 0,
      GRP_MNFR: "",
      MNFRTYPE: 0,
      STDRQUOM: 999,
      SET_MTRL: 0,
      PRDCPICT: "",
      MIN_ODER: 0,
      MIN_QTTY: 0,
      ODERERLY: 0,
      ODERLATE: 0,
      ASTPCODE: "000",
      SBTPCODE: "000",
      ATTRCODE: 0,
      ATTPCODE: 0,
    },
  });

  const submitCreate = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="flex flex-col gap-y-2">
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
            className="bg-green-600 hover:bg-green-500 transition-colors"
            size={"sm"}
          >
            Lưu
          </Button>
        </div>
      </div>

      {/* table */}
      <div className="rounded-md p-5 bg-white border-gray-200 border shadow-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitCreate)}
            className="grid grid-cols-3 gap-3"
          >
            {/* Mã hàng hóa  */}
            <FormField
              control={form.control}
              name="PRDCCODE"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600">Mã hàng hóa</FormLabel>
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
                  <FormLabel className="text-gray-600">Tên sản phẩm</FormLabel>
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
                  <FormLabel className="text-gray-600">Đơn vị tính</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="focus:!ring-0 focus:!ring-transparent">
                        <SelectValue
                          className=""
                          placeholder="Chọn đơn vị tính"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lstQUOM &&
                        isSuccessLstQUOM &&
                        lstQUOM.map((item: CategoryObject, index: number) => {
                          return (
                            <SelectItem value={item.ITEMCODE}>
                              {item.ITEMNAME}
                            </SelectItem>
                          );
                        })}
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
                  <FormLabel className="text-gray-600">Phân loại</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="focus:!ring-0 focus:!ring-transparent">
                        <SelectValue
                          className=""
                          placeholder="Chọn phân loại"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lstDcmnSbCd &&
                        isSuccesslstDcmnSbCd &&
                        lstDcmnSbCd.map(
                          (item: CategoryObject, index: number) => {
                            return (
                              <SelectItem value={item.ITEMCODE}>
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
                  <FormLabel className="text-gray-600">Thương hiệu</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="focus:!ring-0 focus:!ring-transparent">
                        <SelectValue
                          className=""
                          placeholder="Chọn thương hiệu"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lstProductBrand &&
                        isSuccesslstProductBrand &&
                        lstProductBrand.map(
                          (item: CategoryObject, index: number) => {
                            return (
                              <SelectItem value={item.ITEMCODE}>
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
                  <FormLabel className="text-gray-600">Màu sắc</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="focus:!ring-0 focus:!ring-transparent">
                        <SelectValue className="" placeholder="Chọn màu sắc" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lstColor &&
                        isSuccesslstColor &&
                        lstColor.map((item: CategoryObject, index: number) => {
                          return (
                            <SelectItem value={item.ITEMCODE}>
                              {item.ITEMNAME}
                            </SelectItem>
                          );
                        })}
                    </SelectContent>
                  </Select>
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
                  <FormLabel className="text-gray-600">Thuế suất</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="focus:!ring-0 focus:!ring-transparent">
                        <SelectValue
                          className=""
                          placeholder="Chọn thuế suất"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lstSpndSgDt_Tax_RaNm &&
                        isSuccesslstSpndSgDt_Tax_RaNm &&
                        lstSpndSgDt_Tax_RaNm.map(
                          (item: CategoryObject, index: number) => {
                            return (
                              <SelectItem value={item.ITEMCODE}>
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
                    Tính chất sản phẩm
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="focus:!ring-0 focus:!ring-transparent">
                        <SelectValue
                          className=""
                          placeholder="Chọn tính chất sản phẩm"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lstEnum_PrdcOptn &&
                        isSuccesslstEnum_PrdcOptn &&
                        lstEnum_PrdcOptn.map(
                          (item: CategoryObject, index: number) => {
                            return (
                              <SelectItem value={item.ITEMCODE}>
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
                  <FormLabel className="text-gray-600">Loại hàng hóa</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="focus:!ring-0 focus:!ring-transparent">
                        <SelectValue
                          className=""
                          placeholder="Chọn loại hàng hóa"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lstSortCode &&
                        isSuccesslstSortCode &&
                        lstSortCode.map(
                          (item: CategoryObject, index: number) => {
                            return (
                              <SelectItem value={item.ITEMCODE}>
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
                  <FormLabel className="text-gray-600">Nhóm hàng</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="focus:!ring-0 focus:!ring-transparent">
                        <SelectValue
                          className=""
                          placeholder="Chọn nhóm hàng"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lstProductGroup &&
                        isSuccesslstProductGroup &&
                        lstProductGroup.map(
                          (item: CategoryObject, index: number) => {
                            return (
                              <SelectItem value={item.ITEMCODE}>
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
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProductCreatePage;
