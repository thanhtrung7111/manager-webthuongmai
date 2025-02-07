import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getApiDTA004, getApiDTA007, getApiDTA009 } from "../common_api";
import { data } from "@/figure/pdf_sign/data";

export function useGetLstPostTag({ key }: { key: string }) {
  const query = useQuery({
    queryKey: [`${key}`],
    queryFn: () =>
      getApiDTA004({
        DCMNCODE: "inpPostTag",
        PAGELINE: "0",
        PAGENUMB: "1",
      }),
  });
  return query;
}

export function useDeletePostTag({
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
        DCMNCODE: "inpSalePost",
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

export function useSetPostTag({
  key,
  update = false,
}: {
  key: string;
  update: boolean;
}) {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationFn: ({ body }: { body: any }) =>
      getApiDTA007({ ...body, COMPCODE: "PMC", LCTNCODE: "001" }),
    onSuccess: (data: any[]) => {
      if (queryClient.getQueryData([`${key}`]) && update) {
        queryClient.setQueryData([`${key}`], (oldData: any[]) => {
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
