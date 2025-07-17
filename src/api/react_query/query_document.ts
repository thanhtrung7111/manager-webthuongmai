import { useMutation, useQuery } from "@tanstack/react-query";
import { getApiDocument, getApiDTA011, getApiDTA012 } from "../common_api";

export function useGetDocument({
  url = "",
  enabled = true,
}: {
  url: string;
  enabled: boolean;
}) {
  const result = useQuery({
    queryKey: [`${url}`],
    queryFn: () => getApiDocument(url),
    enabled: url != null && url != undefined && url != "" && enabled,
  });
  return result;
}

export function useSetDocument() {
  const result = useMutation({
    mutationFn: ({ body }: { body: any }) => getApiDTA011(body),
  });
  return result;
}

export function useDeleteDocument() {
  const result = useMutation({
    mutationFn: ({ body }: { body: any }) => getApiDTA012(body),
  });
  return result;
}
