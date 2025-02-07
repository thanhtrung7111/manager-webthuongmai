import BreadcrumbCustom from "@/component_common/breadcrumb/BreadcrumbCustom";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Document, pdfjs, Page } from "react-pdf";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import signaturePerson from "@/assets/img/signature.png";
import signature1 from "@/assets/img/signature1.png";
import signature2 from "@/assets/img/signature2.png";
import CryptoJS from "crypto-js";
import ButtonForm from "@/component_common/commonForm/ButtonForm";
import IconCompany from "@/assets/img/iconcompany.png";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import forge from "node-forge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SpinnerLoading from "@/component_common/loading/SpinnerLoading";
import { Input } from "@/components/ui/input";
import {
  useGetVtCertificate,
  useGetVtSession,
  useGetVtSignature,
} from "@/api/react_query/query_viettel";
import {
  useGetHash,
  useGetInsertSignature,
  useGetVerifyDocument,
} from "@/api/react_query/query_sign";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs`;

type PersonObject = {
  id: number;
  name: string;
  position: string;
  signature: string;
};

const PDFSign = () => {
  const [selectedSign, setSelectedSign] = useState<string>("text");
  const description = useRef<HTMLInputElement>(null);
  const [pageSign, setPageSign] = useState<string | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const [numberPages, setNumberPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [valuePage, setValuePage] = useState<number>(1);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [widthPdf, setWidthPdf] = useState<number>(0);
  const [isSign, setIsSign] = useState(false);
  const [isLoadingSign, setIsLoadingSign] = useState(false);
  const [selectedImageSign, setSelectedImageSign] = useState<File | null>(null);
  const [openDialogConfirm, setOpenDialogConfirm] = useState<boolean>(false);
  const [files, setFile] = useState<File | null>(null);
  const [content, setContent] = useState<string>("");

  // Xử lí api
  const queryClient = useQueryClient();
  const getVtSession = useGetVtSession();
  const getVtCertificate = useGetVtCertificate();
  const getHash = useGetHash();
  const getVtSignature = useGetVtSignature();
  const getInsertSignature = useGetInsertSignature();
  const getVerifyDocument = useGetVerifyDocument();

  //Sự kiện vẽ
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [startPos, setStartPos] = useState<any>(null);
  const [startPosPdf, setStartPosPdf] = useState<any>(null);
  const [rects, setRects] = useState<any | null>(null);

  const canvasRef = useRef<any>();

  // Bắt đầu vẽ
  const startDrawing = (e: any) => {
    setIsDrawing(true);
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setStartPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    if (pageRef.current) {
      const rect = pageRef.current.getBoundingClientRect();
      setStartPosPdf({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Dừng vẽ
  const stopDrawing = async (e: any) => {
    try {
      setIsDrawing(false);
      setIsLoadingSign(true);
      const rect = canvasRef.current.getBoundingClientRect();
      const pageRect = pageRef.current
        ? pageRef.current.getBoundingClientRect()
        : null;

      const viewPortWidth = pageRect?.width ? pageRect.width : 0;
      const viewPortHeight = pageRect?.height ? pageRect.height : 0;

      const pdfScale: number = pageRef.current?.dataset.scale
        ? Number.parseInt(pageRef.current?.dataset.scale)
        : 1;

      console.log(pdfScale);
      console.log(viewPortWidth);
      console.log(viewPortHeight);
      console.log(
        Number.parseInt((e.clientX - startPosPdf.x - rect.left).toFixed())
      );
      console.log(
        Number.parseInt((e.clientY - startPosPdf.y - rect.top).toFixed())
      );
      const pdfX = startPosPdf.x / pdfScale;
      const ratio: number = widthPdf / viewPortWidth;
      const pdfY: number = (viewPortHeight - startPosPdf.y) / pdfScale; // Hệ tọa độ PDF có gốc (0,0) ở góc dưới trái

      console.log(ratio);
      console.log(`Tọa độ PDF: (${pdfX * ratio}, ${pdfY * ratio})`);
      const resultSession = await getVtSession.mutateAsync();
      const resultCertificate = await getVtCertificate.mutateAsync(resultSession);
      const resultHash: {
        hashBase: string;
        keySession: string;
      } = await getHash.mutateAsync({
        formFile: files ? files : undefined,
        certificate: resultCertificate ? resultCertificate : undefined,
        coordinateX: pdfX * ratio,
        coordinateY: pdfY * ratio,
        fileImage: selectedImageSign ? selectedImageSign : undefined,
        width: Number.parseInt(
          ((e.clientX - startPosPdf.x - rect.left) * ratio).toFixed()
        ),
        height: Number.parseInt(
          ((e.clientY - startPosPdf.y - rect.top) * ratio).toFixed()
        ),
        location: "TP.HCM",
        numPageSign: pageNumber.toString(),
        reason: content,
        typeSignature: selectedSign,
      });
      const stringHexa: string = convertBase64ToHexa(resultHash.hashBase);

      const resultSignature: string = await getVtSignature.mutateAsync({
        sessionID: resultSession,
        hashOpt: "0",
        hashVal: stringHexa,
      });

      const resultInsert: { url: string } = await getInsertSignature.mutateAsync({
        signature: resultSignature,
        certificate: resultCertificate,
        keySession: resultHash.keySession,
      });

      const response = await fetch(resultInsert.url);
      if (!response.ok) {
        throw new Error(`Lỗi tải file: ${response.status}`);
      }

      const blob = await response.blob();

      const file = new File([blob], "downloaded_file", { type: blob.type });

      setFile(file);

      // setFile()
    } catch (error) {
    } finally {
      setRects(null);
      setIsSign(false);
      setIsLoadingSign(false);
    }
  };

  // Vẽ khi di chuột
  const draw = (e: any) => {
    if (!isDrawing) return;
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const endPos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      setRects({ start: startPos, end: endPos });
    }
  };

  const convertBase64ToHexa = (base64: string): string => {
    // Giải mã Base64 thành mảng byte
    const binaryString = atob(base64); // atob là hàm giải mã Base64 trong trình duyệt
    let hexString = "";

    // Duyệt qua từng ký tự trong chuỗi nhị phân và chuyển thành hex
    for (let i = 0; i < binaryString.length; i++) {
      // Lấy mã ASCII của ký tự và chuyển thành chuỗi hex 2 ký tự
      let hex = binaryString.charCodeAt(i).toString(16);
      hexString += ("00" + hex).slice(-2); // Đảm bảo luôn có 2 ký tự hex
    }

    return hexString;
  };

  const breadBrumb = [
    {
      itemName: "Trang chủ",
    },
    {
      itemName: "Kí văn bản",
      itemLink: "/sign_pdf",
    },
  ];

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      setFile(file);
      setPageNumber(1);
      setValuePage(1);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number | null }) => {
    if (numPages !== null) {
      setNumberPages(numPages);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      setFile(droppedFiles[0]);
      setPageNumber(1);
      setValuePage(1);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định
  };

  const handleConfirmPdf = async () => {
    if (files != null) {
      const result = await getVerifyDocument.mutateAsync({ file: files });
      setOpenDialogConfirm(true);
    }
  };

  return (
    <div className="flex flex-col gap-y-3">
      <Dialog
        open={isLoadingSign}
        onOpenChange={() => {
          if (!isLoadingSign) {
            setOpenDialog(false);
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px] h-44">
          <DialogHeader>
            <DialogTitle className="mb-5 text-gray-600">Thông báo</DialogTitle>
            <DialogDescription>
              <div className="flex gap-x-2 text-base items-center">
                <SpinnerLoading className="h-5 w-5 fill-red-600"></SpinnerLoading>
                Đang kí tài liệu...
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {!isLoadingSign && (
              <ButtonForm
                type="button"
                onClick={() => setOpenDialog(false)}
                className="!bg-red-500 !w-fit px-3 disabled:!bg-slate-700"
                label="Đóng"
                // disabled={handlePostSignHash.isPending}
              ></ButtonForm>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog hiển thị xác thực tài liệu  */}
      <Dialog
        open={openDialogConfirm}
        onOpenChange={() => {
          setOpenDialogConfirm(false);
        }}
      >
        <DialogContent className="sm:max-w-[500px] h-fit">
          <DialogHeader>
            <DialogTitle className="mb-5 text-gray-600">
              Thông tin xác thực
            </DialogTitle>
            <DialogDescription>
              {getVerifyDocument.isPending ? (
                <div className="flex gap-x-2 text-base items-center">
                  <SpinnerLoading className="h-5 w-5 fill-red-600"></SpinnerLoading>
                  Đang xác thực tài liệu...
                </div>
              ) : (
                <div>
                  {getVerifyDocument.data?.result
                    .split("\n")
                    .map((item: string) => {
                      return <p>{item}</p>;
                    })}
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <ButtonForm
              type="button"
              onClick={() => setOpenDialogConfirm(false)}
              className="!bg-red-500 !w-fit px-3 disabled:!bg-slate-700"
              label="Đóng"
              // disabled={handlePostSignHash.isPending}
            ></ButtonForm>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="mb-1">
        <BreadcrumbCustom
          linkList={breadBrumb}
          itemName={"itemName"}
          itemLink={"itemLink"}
        ></BreadcrumbCustom>
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-medium text-gray-600">
            Thông tin kí văn bản
          </h4>
          <div className="flex gap-x-2">
            <ButtonForm
              onClick={() => {
                setIsSign(!isSign);
              }}
              // disabled={handlePostSignHash.isPending}
              label="Kí tài liệu"
              className={`!w-fit !px-3 ${
                isSign ? "bg-gray-700" : "bg-primary"
              }`}
              type="button"
            ></ButtonForm>
            <ButtonForm
              onClick={() => {
                handleConfirmPdf();
              }}
              // disabled={handlePostSignHash.isPending}
              label="Xác thực tài liệu"
              disabled={isSign}
              className={`!w-fit !px-3 ${
                isSign ? "bg-gray-700" : "bg-secondary"
              }`}
              type="button"
            ></ButtonForm>
          </div>
        </div>
        <div className="grid grid-cols-[2fr_1fr] gap-x-2">
          <div
            id="container_pdf"
            onDrop={(e) => handleDrop(e)}
            onDragOver={(e) => handleDragOver(e)}
            className="rounded-md p-5 bg-white border-gray-200 border shadow-md relative"
          >
            {files && (
              <div
                className="absolute right-1 top-0 cursor-pointer"
                onClick={() => {
                  if (!isSign) {
                    setFile(null);
                  }
                }}
              >
                <i className="ri-close-line text-xl text-gray-700"></i>
              </div>
            )}
            {files ? (
              <>
                <div className="flex items-center gap-x-3 mt-2 justify-center mb-2">
                  <button
                    onClick={() => {
                      setPageNumber((prev) => Math.max(prev - 1, 1));
                      setValuePage((prev) => Math.max(prev - 1, 1));
                    }}
                    disabled={pageNumber <= 1}
                  >
                    Trước
                  </button>
                  <div className="border border-gray-200 px-4 py-1 flex items-center">
                    <input
                      type="number"
                      value={valuePage}
                      onChange={(e) => {
                        if (
                          e.target.value == "" ||
                          Number.parseInt(e.target.value) < 1 ||
                          Number.parseInt(e.target.value) > numberPages
                        ) {
                          return;
                        }
                        setValuePage(Number.parseInt(e.target.value));
                      }}
                      className="w-10 outline-none"
                      onBlur={(e) => {
                        if (
                          e.target.value == "" ||
                          Number.parseInt(e.target.value) < 1 ||
                          Number.parseInt(e.target.value) > numberPages
                        ) {
                          return;
                        }
                        setPageNumber(Number.parseInt(e.target.value));
                      }}
                    />{" "}
                    / <div className="w-10 text-end">{numberPages}</div>
                  </div>
                  <button
                    onClick={() => {
                      setPageNumber((prev) => Math.min(prev + 1, numberPages));
                      setValuePage((prev) => Math.min(prev + 1, numberPages));
                    }}
                    disabled={pageNumber >= numberPages}
                    className="px-2"
                  >
                    Sau
                  </button>
                </div>
                <Document
                  file={files ? files : null}
                  key={files.name}
                  onClick={(e) => {
                    console.log(e);
                  }}
                  className={"bg-gray-200 flex flex-col gap-y-2 p-3 w-full"}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  {/* {Array.from(new Array(numberPages), (el, index) => ( */}
                  <Page
                    width={
                      document.querySelector(".react-pdf__Page")?.clientWidth ||
                      1000
                    }
                    onMouseDown={(e) => {
                      if (isSign) startDrawing(e);
                    }}
                    onMouseUp={(e) => {
                      if (isSign) stopDrawing(e);
                    }}
                    onMouseMove={(e) => {
                      if (isSign) draw(e);
                    }}
                    className={`w-full ${
                      isSign ? "cursor-pointer" : "cursor-default"
                    }`}
                    inputRef={pageRef}
                    renderTextLayer={false}
                    pageNumber={pageNumber}
                    // className={"h-[700px]"}
                    renderAnnotationLayer={false}
                    onRenderSuccess={(page) => {
                      setWidthPdf(page.getViewport({ scale: 1 }).width);
                      console.log(
                        page.getViewport({ scale: 1 }).width,
                        page.getViewport({ scale: 1 }).height
                      );
                    }}
                  />
                  {/* ))} */}
                </Document>
                <canvas
                  ref={canvasRef}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    pointerEvents: "none", // Để không ngăn chặn sự kiện chuột trên PDF
                    width: "100%",
                    height: "100%",
                    zIndex: 1000,
                  }}
                />
                {rects && (
                  <div
                    className="bg-gray-400 border-gray-300 border-2 bg-opacity-10"
                    style={{
                      position: "absolute",
                      top: rects.start.y,
                      left: rects.start.x,
                      width: rects.end.x - rects.start.x,
                      height: rects.end.y - rects.start.y,
                      pointerEvents: "none",
                    }}
                  />
                )}
                <div className="flex items-center gap-x-3 mt-2 justify-center">
                  <button
                    onClick={() => {
                      setPageNumber((prev) => Math.max(prev - 1, 1));
                      setValuePage((prev) => Math.max(prev - 1, 1));
                    }}
                    disabled={pageNumber <= 1}
                  >
                    Trước
                  </button>
                  <div className="border border-gray-200 px-4 py-1 flex items-center">
                    <input
                      type="number"
                      value={valuePage}
                      onChange={(e) => {
                        if (
                          e.target.value == "" ||
                          Number.parseInt(e.target.value) < 1 ||
                          Number.parseInt(e.target.value) > numberPages
                        ) {
                          return;
                        }
                        setValuePage(Number.parseInt(e.target.value));
                      }}
                      className="w-10 outline-none"
                      onBlur={(e) => {
                        if (
                          e.target.value == "" ||
                          Number.parseInt(e.target.value) < 1 ||
                          Number.parseInt(e.target.value) > numberPages
                        ) {
                          return;
                        }
                        setPageNumber(Number.parseInt(e.target.value));
                      }}
                    />{" "}
                    / <div className="w-10 text-end">{numberPages}</div>
                  </div>
                  <button
                    onClick={() => {
                      setPageNumber((prev) => Math.min(prev + 1, numberPages));
                      setValuePage((prev) => Math.min(prev + 1, numberPages));
                    }}
                    disabled={pageNumber >= numberPages}
                    className="px-2"
                  >
                    Sau
                  </button>
                </div>
              </>
            ) : (
              <label
                htmlFor="fileConfirm"
                className="text-gray-600 cursor-pointer flex-col gap-y-3 w-full h-96 border-dashed border flex items-center justify-center"
              >
                <img
                  className="w-14"
                  src="data:image/png;base64,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"
                  alt=""
                />
                Kéo hoặc chọn nội thông tin cần xác thực kí
              </label>
            )}
          </div>
          <div className="rounded-md p-5 bg-white !h-fit border-gray-200 border shadow-md">
            <input
              type="file"
              id="fileConfirm"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => {
                console.log("Change file");
                handleFileChange(e);
              }}
            />
            {/* <input
              type="text"
              placeholder="Enter your signature"
              value={signature}
              className="hidden"
              onChange={(e) => setSignature(e.target.value)}
            /> */}
            <div className="flex flex-col gap-y-3">
              <h5 className="text-gray-800 font-medium">
                Chọn chữ kí <span className="text-sm text-red-500">*</span>
              </h5>
              <div className="flex flex-col gap-y-2">
                <Input
                  placeholder="Nhập lý do hoặc nội dung kí..."
                  onChange={(e) => setContent(e.target.value)}
                />
                <div
                  onClick={() => setSelectedSign("text")}
                  className={`border ${
                    selectedSign == "text"
                      ? "border-secondary shadow-md"
                      : "border-gray-300"
                  } rounded-md px-3 py-2 cursor-pointer`}
                >
                  <p className="text-gray-500 font-medium text-xs border-b pb-1 mb-1">
                    Chữ kí chữ
                  </p>
                  <div className="text-gray-600 text-sm">
                    <p>CONG TY TNHH GIAI PHAP TIN HOC FIRSTEMS</p>
                    <p>13/01/2025 10:17:05</p>
                    <p>{content == "" ? "Xác thực tài liệu" : content}</p>
                  </div>
                </div>
                <div
                  onClick={() => setSelectedSign("imageText")}
                  className={`border ${
                    selectedSign == "imageText"
                      ? "border-secondary shadow-md"
                      : "border-gray-300"
                  } rounded-md px-3 py-2 cursor-pointer`}
                >
                  <p className="text-gray-500 font-medium text-xs border-b border-gray-200 pb-1 mb-1">
                    Chữ kí chữ và kí hiệu
                  </p>
                  <div className="text-gray-600 text-sm relative">
                    <div className="z-50 bg-transparent">
                      <p>CONG TY TNHH GIAI PHAP TIN HOC FIRSTEMS</p>
                      <p>13/01/2025 10:17:05</p>
                      <p>{content == "" ? "Xác thực tài liệu" : content}</p>
                    </div>
                    <div className="absolute top-0 h-9 w-auto  opacity-50">
                      <img
                        className="h-full"
                        src={
                          selectedImageSign
                            ? URL.createObjectURL(selectedImageSign)
                            : IconCompany
                        }
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                {selectedSign == "imageText" && (
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <h5 className="text-gray-800 font-medium">
                      Chọn hình ảnh kí hiệu{" "}
                      <span className="text-sm text-red-500">*</span>
                    </h5>
                    <Input
                      id="picture"
                      type="file"
                      onChange={(e) => {
                        if (e.target.files && e.target.files?.length > 0) {
                          setSelectedImageSign(e.target.files[0]);
                        }
                      }}
                    />
                  </div>
                )}
              </div>
              {/* <div>
                <h5 className="text-gray-800 font-medium mb-2">
                  Trang cần kí <span className="text-sm text-red-500">*</span>
                </h5>
                <RadioGroup
                  defaultValue="comfortable"
                  onValueChange={(e) => setPageSign(e)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="first" id="r1" />
                    <Label
                      htmlFor="r1"
                      className="text-gray-600 font-normal  cursor-pointer"
                    >
                      Trang đầu
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="multi" id="r2" />
                    <Label
                      htmlFor="r2"
                      className="text-gray-600 font-normal  cursor-pointer"
                    >
                      Tất cả trang
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="last" id="r3" />
                    <Label
                      htmlFor="r3"
                      className="text-gray-600 font-normal  cursor-pointer"
                    >
                      Trang cuối
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <h5 className="text-gray-800 font-medium mb-2">
                  Mô tả tài liệu xác thực{" "}
                  <span className="text-sm text-red-500">*</span>
                </h5>
                <Input
                  type="text"
                  placeholder="Nhập mô tả tài liệu xác thực..."
                  ref={description}
                />
              </div> */}
              {/* {handlePostSignHash.error && (
                <div className="text-xs text-red-500">
                  {handlePostSignHash.error.message}
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFSign;
