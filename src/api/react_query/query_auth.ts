import { useMutation, useQuery } from "@tanstack/react-query";
import { getApiSYS001, getApiSYS005, getApiSYS006 } from "../common_api";

export function useGetTokenInitial() {
  const query = useQuery({
    queryKey: ["tokenInitial"],
    queryFn: () => getApiSYS001(),
  });
  return query;
}

export function useGetTokenUser() {
  const query = useMutation({
    mutationFn: ({ body }: { body: any }) => getApiSYS005(body),
  });
  return query;
}

export function useGetTokenLocation() {
  const query = useMutation({
    mutationFn: ({ body }: { body: any }) => getApiSYS006(body),
  });
  return query;
}
