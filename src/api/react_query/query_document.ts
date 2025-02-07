import { useMutation } from "@tanstack/react-query";
import { getApiDocument, getApiDTA011, getApiDTA012 } from "../common_api";

export function useGetDocument() {
    const result = useMutation({
      mutationFn: ({ URL }: { URL: string }) => getApiDocument(URL),
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
  