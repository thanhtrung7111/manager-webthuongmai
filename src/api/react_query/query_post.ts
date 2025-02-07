import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getApiDTA004,
  getApiDTA005,
  getApiDTA007,
  getApiDTA008,
  getApiDTA009,
} from "../common_api";

export function useGetLstPost({ key }: { key: string }) {
  const result = useQuery({
    queryKey: key ? [`${key}`] : ["products"],
    queryFn: () =>
      getApiDTA004({
        DCMNCODE: "inpSalePost",
        PAGELINE: "0",
        PAGENUMB: "1",
      }),
  });
  return result;
}

export function useGetPost() {
  const result = useMutation({
    mutationFn: ({ body }: { body: any }) => getApiDTA005(body),
  });
  return result;
}

export function useUpdatePost({
  key,
  update,
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

export function useSetPost({
  key,
  update = false,
}: {
  key: string;
  update: boolean;
}) {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationFn: ({ body }: { body: any }) => getApiDTA007(body),
    onSuccess: (data: any) => {
      if (queryClient.getQueryData([`${key}`]) && update) {
        queryClient.setQueryData([`${key}`], (oldData: any[]) => {
          const resultData = data[0];
          return [resultData, ...oldData];
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

export function useDeletePost({
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
