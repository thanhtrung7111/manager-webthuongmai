import { useMutation } from "@tanstack/react-query";
import { getApiHashDocument, getApiInsertDocument, getApiVerifyDocument } from "../common_api";

export function useGetInsertSignature() {
  return useMutation({
    mutationFn: ({
      signature,
      certificate,
      keySession,
    }: {
      signature: string;
      certificate: string;
      keySession: string;
    }) =>
      getApiInsertDocument({
        signature: signature,
        certificate: certificate,
        keySession: keySession,
      }),
  });
}

export function useGetVerifyDocument() {
  return useMutation({
    mutationFn: ({ file }: { file: File }) =>
      getApiVerifyDocument({ file: file }),
  });
}





export function useGetHash() {
    return useMutation({
      mutationFn: ({
        formFile,
        certificate,
        fileImage,
        reason,
        location,
        numPageSign,
        coordinateX,
        coordinateY,
        width,
        height,
        typeSignature,
      }: {
        formFile?: File;
        certificate?: string;
        fileImage?: File;
        reason?: string;
        location?: string;
        numPageSign?: string;
        coordinateX?: number;
        coordinateY?: number;
        width?: number;
        height?: number;
        typeSignature?: string;
      }) =>
        getApiHashDocument({
          formFile: formFile,
          certificate: certificate,
          fileImage: fileImage,
          reason: reason,
          location: location,
          numPageSign: numPageSign,
          coordinateX: coordinateX,
          coordinateY: coordinateY,
          width: width,
          height: height,
          typeSignature: typeSignature,
        }),
    });
  }
  
  