import { useMutation } from "@tanstack/react-query";
import { getApiInsertDocument, getApiVtCertificate, getApiVtSession, getApiVtSignature } from "../common_api";

//=============================== HỆ THỐNG KÍ
export function useGetVtSession() {
  return useMutation({
    mutationFn: () => getApiVtSession(),
  });
}

export function useGetVtCertificate() {
  return useMutation({
    mutationFn: (sessionID: string) => getApiVtCertificate(sessionID),
  });
}


export function useGetVtSignature() {
    return useMutation({
      mutationFn: ({
        sessionID,
        hashOpt,
        hashVal,
      }: {
        sessionID: string;
        hashOpt: string;
        hashVal: string;
      }) => getApiVtSignature(sessionID, hashOpt, hashVal),
    });
  }
