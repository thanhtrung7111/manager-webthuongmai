import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getApiDTA004,
  getApiDTA005,
  getApiDTA007,
  getApiDTA008,
  getApiDTA009,
} from "../common_api";
import { CategoryObject, ProductObject } from "@/type/TypeCommon";

export function useGetLstProduct({ key }: { key: string }) {
  const result = useQuery({
    queryKey: key ? [`${key}`] : ["products"],
    queryFn: () =>
      getApiDTA004({
        DCMNCODE: "appPrdcList",
        PARACODE: "001",
        LCTNCODE: "001",
        CURRDATE: "2024-09-17",
        CUSTCODE: "%",
        SHOPCODE: "%",
        KEY_WORD: "%",
      }),
  });
  return result;
}

export function useGetProduct() {
  const query = useMutation({
    mutationFn: ({ KEY_CODE }: { KEY_CODE: string }) =>
      getApiDTA005({
        DCMNCODE: "INPPRODUCT",
        KEY_CODE: KEY_CODE,
      }),
  });
  return query;
}

export function useSetProduct({
  key,
  update = false,
}: {
  key: string;
  update: boolean;
})  {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationFn: ({ body }: { body: any }) => getApiDTA007(body),
    onSuccess: (data: ProductObject[]) => {
      if (queryClient.getQueryData([`${key}`]) && update) {
        queryClient.setQueryData([`${key}`], (oldData: ProductObject[]) => {
          const resultData = data[0];
          return [
            {
              PRDCNAME: resultData?.MPRDCNME,
              PRDCCODE: resultData?.PRDCCODE,
            },
            ...oldData,
          ];
        });
      }
    },
  });
  return result;
}

export function useUpdateProduct({
  key,
  update = false,
}: {
  key: string;
  update: boolean;
}) {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationFn: ({ body }: { body: any }) => getApiDTA008(body),
    onSuccess: (data: any) => {
      if (queryClient.getQueryData([`${key}`]) && update) {
        queryClient.setQueryData([`${key}`], (oldData: any[]) => {
          const resultData = data[0];
          return [
            resultData,
            ...oldData.filter((item) => item.POSTCODE != resultData.POSTCODE),
          ];
        });
        if (key != undefined) {
          queryClient.invalidateQueries({ queryKey: ["postDetail", key] });
        }
      } else {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === `${key}`,
        });
      }
    },
  });
  return result;
}

export function useDeleteProduct({
  key,
  update = false,
}: {
  key: string;
  update: boolean;
}) {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: ({ KEY_CODE }: { KEY_CODE: string }) =>
      getApiDTA009({
        DCMNCODE: "inpProduct",
        KEY_CODE: KEY_CODE,
      }),
    onSuccess: (data, variables) => {
      if (queryClient.getQueryData([`${key}`]) && update) {
        queryClient.setQueryData([`${key}`], (oldData: any[]) => {
          if (!oldData) return [];
          return oldData.filter((item) => item.KKKK0000 !== variables.KEY_CODE);
        });
      }
    },
  });
  return query;
}
