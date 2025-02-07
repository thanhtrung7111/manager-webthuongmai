import { useMutation, useQuery } from "@tanstack/react-query";
import { getApiDTA002, getApiSYS002 } from "../common_api";

export function useGetLstQUOM() {
  const query = useQuery({
    queryKey: ["lstQUOM"],
    queryFn: () => getApiDTA002("lstQUOM"),
  });
  return query;
}

export function useGetLstDcmnSbCd() {
  const query = useQuery({
    queryKey: ["lstDcmnSbCd"],
    queryFn: () => getApiDTA002("lstDcmnSbCd"),
  });
  return query;
}

export function useGetLstProductBrand() {
  const query = useQuery({
    queryKey: ["lstProductBrand"],
    queryFn: () => getApiDTA002("lstProductBrand"),
  });
  return query;
}

export function useGetLstColor() {
  const query = useQuery({
    queryKey: ["lstColor"],
    queryFn: () => getApiDTA002("lstColor"),
  });
  return query;
}

export function useGetLstSpndSgDtTaxRaNm() {
  const query = useQuery({
    queryKey: ["lstSpndSgDt_Tax_RaNm"],
    queryFn: () => getApiDTA002("lstSpndSgDt_Tax_RaNm"),
  });
  return query;
}
export function useGetEnumPrdcOptn() {
  const query = useQuery({
    queryKey: ["Enum_PrdcOptn"],
    queryFn: () => getApiDTA002("Enum_PrdcOptn"),
  });
  return query;
}
export function useGetLstSortCode() {
  const query = useQuery({
    queryKey: ["lstSortCode"],
    queryFn: () => getApiDTA002("lstSortCode"),
  });
  return query;
}
export function useGetLstProductGroup() {
  const query = useQuery({
    queryKey: ["lstProductGroup"],
    queryFn: () => getApiDTA002("lstProductGroup"),
  });
  return query;
}
export function useGetLstPrdcSection() {
  const query = useQuery({
    queryKey: ["lstPrdcSection"],
    queryFn: () => getApiDTA002("lstPrdcSection"),
  });
  return query;
}
export function useGetLstProductGroupMnfr() {
  const query = useQuery({
    queryKey: ["lstProductGroupMnfr"],
    queryFn: () => getApiDTA002("lstProductGroupMnfr"),
  });
  return query;
}
export function useGetLstMnfrTypeInpPrdcOdMt() {
  const query = useQuery({
    queryKey: ["lstMnfrType_inpPrdcOdMt"],
    queryFn: () => getApiDTA002("lstMnfrType_inpPrdcOdMt"),
  });
  return query;
}
export function useGetLstStdrQUOM() {
  const query = useQuery({
    queryKey: ["lstStdrQUOM"],
    queryFn: () => getApiDTA002("lstStdrQUOM"),
  });
  return query;
}
export function useGetLstProductSetMtrl() {
  const query = useQuery({
    queryKey: ["lstProduct_Set_Mtrl"],
    queryFn: () => getApiDTA002("lstProduct_Set_Mtrl"),
  });
  return query;
}
export function useGetLstAssetType() {
  const query = useQuery({
    queryKey: ["lstAssetType"],
    queryFn: () => getApiDTA002("lstAssetType"),
  });
  return query;
}
export function useGetLstAssetSubType() {
  const query = useQuery({
    queryKey: ["lstAssetSubType"],
    queryFn: () => getApiDTA002("lstAssetSubType"),
  });
  return query;
}

export function useGetLstAsstSgAt() {
  const query = useQuery({
    queryKey: ["lstAsstSgAt"],
    queryFn: () => getApiDTA002("lstAsstSgAt"),
  });
  return query;
}
export function useGetLstAssetAttribute() {
  const query = useQuery({
    queryKey: ["lstAssetAttribute"],
    queryFn: () => getApiDTA002("lstAssetAttribute"),
  });
  return query;
}
export function useGetLstPrdcMchn() {
  const query = useQuery({
    queryKey: ["lstPrdcMchn"],
    queryFn: () => getApiDTA002("lstPrdcMchn"),
  });
  return query;
}

export function useGetLstBannerType() {
  const query = useQuery({
    queryKey: ["lstBannerType"],
    queryFn: () => getApiDTA002("lstBannerType"),
  });
  return query;
}
export function useGetLstBannerDataType() {
  const query = useQuery({
    queryKey: ["lstBannerDataType"],
    queryFn: () => getApiDTA002("lstBannerDataType"),
  });
  return query;
}

export function useGetLanguage() {
  const query = useMutation({
    mutationFn: ({ body }: { body: any }) => getApiSYS002(body),
  });
  return query;
}
