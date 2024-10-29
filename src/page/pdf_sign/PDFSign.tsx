import BreadcrumbCustom from "@/component_common/breadcrumb/BreadcrumbCustom";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Document, pdfjs, Page } from "react-pdf";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import signaturePerson from "@/assets/img/signature.png";
import signature1 from "@/assets/img/signature1.png";
import signature2 from "@/assets/img/signature2.png";
import CryptoJS from "crypto-js";
import ButtonForm from "@/component_common/commonForm/ButtonForm";
import { useMutation, useQuery } from "@tanstack/react-query";
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
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs`;

type PersonObject = {
  id: number;
  name: string;
  position: string;
  signature: string;
};

const data: PersonObject[] = [
  {
    id: 1,
    name: "Lê Hiệp Phúc",
    position: "Trưởng phòng",
    signature: signature1,
  },
  {
    id: 2,
    name: "Lê Minh Lộc",
    position: "Kế toán",
    signature: signature2,
  },
];
const PDFSign = () => {
  const [selectedSign, setSelectedSign] = useState<PersonObject | null>(null);
  const description = useRef<HTMLInputElement>(null);
  const [pageSign, setPageSign] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<any | null>(null);
  const [signature, setSignature] = useState("/");
  const [numberPages, setNumberPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [valuePage, setValuePage] = useState<number>(1);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const fetchLogin = useQuery({
    queryKey: ["loginMySign"],
    queryFn: () =>
      axios.post("/api/vtss/service/ras/v1/login", {
        client_id: "Test_Demo_Mysign",
        client_secret: "860c5746f30d705ef9b16e0adbd7b5f6d8c4a4ee",
        profile_id: "adss:ras:profile:001",
        user_id: "045064009498",
      }),
    retry: 1,
    retryOnMount: false,
    refetchOnWindowFocus: false,
  });
  const [file, setFile] = useState<File | null>(null);

  const fetchCertificates = useMutation({
    mutationFn: () =>
      axios.post(
        "/api/vtss/service/certificates/info",
        {
          client_id: "Test_Demo_Mysign",
          client_secret: "860c5746f30d705ef9b16e0adbd7b5f6d8c4a4ee",
          profile_id: "adss:ras:profile:001",
          user_id: "045064009498",
          certificates: "chain",
          certInfo: true,
          authInfo: true,
        },
        {
          headers: {
            Authorization: "Bearer " + fetchLogin.data?.data?.access_token,
          },
        }
      ),
  });

  const handlePostSignHash = useMutation({
    mutationFn: (body: any) =>
      axios.post("/api/vtss/service/signHash", body, {
        headers: {
          Authorization: "Bearer " + fetchLogin.data?.data?.access_token,
        },
      }),
  });

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
      setPdfFile(URL.createObjectURL(file));
      setFile(file);
      setPageNumber(1);
      setValuePage(1);
    }
  };
  console.log(pdfFile);
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number | null }) => {
    if (numPages !== null) {
      setNumberPages(numPages);
    }
  };

  const handleSignPdf = async () => {
    if (!pdfFile || !selectedSign) {
      alert("Vui lòng chọn người xác thực kí!");
      return;
    }

    if (!pageSign) {
      alert("Chọn trang để kí!");
      return;
    }

    setTimeout(() => {
      setOpenDialog(true);
    }, 200);

    let descriptionContent: string =
      description && description.current && description.current.value != ""
        ? CryptoJS.enc.Base64.stringify(
            CryptoJS.enc.Utf8.parse(description.current.value)
          )
        : CryptoJS.enc.Base64.stringify(
            CryptoJS.enc.Utf8.parse("Xác thực tài liệu")
          );

    if (file) {
      const value = await fileToSHA256Base64(file);
      await handlePostSignHash.mutateAsync({
        credentialID: fetchCertificates.data?.data[0]?.credential_id,
        client_id: "Test_Demo_Mysign",
        client_secret: "860c5746f30d705ef9b16e0adbd7b5f6d8c4a4ee",
        numSignatures: 2,
        description: descriptionContent,
        documents: [
          {
            document_id: 123,
            document_name: CryptoJS.enc.Base64.stringify(
              CryptoJS.enc.Utf8.parse(file ? file?.name : "")
            ),
          },
        ],
        hash: [value],
        hashAlgo: "2.16.840.1.101.3.4.2.1",
        signAlgo: fetchCertificates.data?.data[0]?.key.algo[0],
        async: 0,
      });
    }
  };

  function fileToSHA256Base64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result && typeof reader.result !== "string") {
          const fileContent = CryptoJS.lib.WordArray.create(reader.result);
          const hash = CryptoJS.SHA256(fileContent);
          const hashBase64 = CryptoJS.enc.Base64.stringify(hash);
          resolve(hashBase64);
        } else {
          reject(new Error("File read error: result is null"));
        }
      };
      reader.onerror = (error) => reject(error);
      return reader.readAsArrayBuffer(file); // Đọc tệp dưới dạng ArrayBuffer
    });
  }
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      setPdfFile(URL.createObjectURL(droppedFiles[0]));
      setPageNumber(1);
      setValuePage(1);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định
  };

  useEffect(() => {
    if (fetchLogin.isSuccess && fetchLogin.data && fetchLogin.data.data) {
      fetchCertificates.mutateAsync();
    }
  }, [fetchLogin.isSuccess]);
  console.log(fetchCertificates.data?.data);

  useEffect(() => {
    // Tạo một PDFDocument từ dữ liệu PDF đã tải lên
    const hanldeSign = async () => {
      if (selectedSign == null) {
        return;
      }
      const pdfDoc = await PDFDocument.load(
        await fetch(pdfFile).then((res) => res.arrayBuffer())
      );
      pdfDoc.registerFontkit(fontkit);
      const fontBytes = await fetch("/font/Roboto-Light.ttf").then((res) =>
        res.arrayBuffer()
      );
      const customeFont = await pdfDoc.embedFont(fontBytes);
      const imageBytes = await fetch(selectedSign.signature).then((res) =>
        res.arrayBuffer()
      );
      const image = await pdfDoc.embedPng(imageBytes);
      const pages = pdfDoc.getPages();
      // const lastPage = pages[pages.length - 1];

      // Thêm chữ ký ở cuối trang
      switch (pageSign) {
        case "first":
          const firstPage = pages[0];
          firstPage.drawImage(image, {
            x: 50,
            y: 20, // Điều chỉnh vị trí tùy ý
            width: 70,
            height: 40,
          });
          firstPage.drawText(selectedSign.name, {
            x: 60,
            y: 18, // Điều chỉnh vị trí tùy ý
            size: 8,
            font: customeFont,
            color: rgb(0, 0, 0),
          });
          break;
        case "last":
          const lastPage = pages[pages.length - 1];
          lastPage.drawImage(image, {
            x: 50,
            y: 20, // Điều chỉnh vị trí tùy ý
            width: 80,
            height: 40,
          });
          lastPage.drawText(selectedSign.name, {
            x: 60,
            y: 18, // Điều chỉnh vị trí tùy ý
            size: 8,
            font: customeFont,
            color: rgb(0, 0, 0),
          });
          break;
        default:
          pages.forEach((item) => {
            item.drawImage(image, {
              x: 50,
              y: 20, // Điều chỉnh vị trí tùy ý
              width: 70,
              height: 40,
            });
            item.drawText(selectedSign.name, {
              x: 60,
              y: 18, // Điều chỉnh vị trí tùy ý
              size: 8,
              font: customeFont,
              color: rgb(0, 0, 0),
            });
          });
          break;
      }

      // Xuất PDF đã chỉnh sửa
      const pdfBytes = await pdfDoc.save();

      // Tải xuống file PDF
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfFile(url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "signed_document.pdf";
      a.click();
    };
    if (handlePostSignHash.isSuccess && handlePostSignHash.data) {
      hanldeSign();
    }
  }, [handlePostSignHash.isSuccess]);

  return (
    <div className="flex flex-col gap-y-3">
      <Dialog
        open={openDialog}
        onOpenChange={() => {
          if (!handlePostSignHash.isPending) {
            setOpenDialog(false);
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px] h-44">
          <DialogHeader>
            <DialogTitle className="mb-5 text-gray-600">Thông báo</DialogTitle>
            <DialogDescription>
              {handlePostSignHash.isPending ? (
                <div className="flex gap-x-2 text-base items-center">
                  <SpinnerLoading className="h-5 w-5 fill-red-600"></SpinnerLoading>
                  Đang xác thực tài liệu...
                </div>
              ) : (
                <div className="flex gap-x-2 text-base items-center">
                  Xác thực thành công!
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <ButtonForm
              type="button"
              onClick={() => setOpenDialog(false)}
              className="!bg-red-500 !w-fit px-3 disabled:!bg-slate-700"
              label="Đóng"
              disabled={handlePostSignHash.isPending}
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
          <ButtonForm
            onClick={handleSignPdf}
            disabled={handlePostSignHash.isPending}
            label="Xác thực kí"
            className="!w-fit !px-3 disabled:!bg-slate-500"
            type="button"
          ></ButtonForm>
        </div>
        <div className="grid grid-cols-[3fr_1fr] gap-x-2">
          <div
            onDrop={(e) => handleDrop(e)}
            onDragOver={(e) => handleDragOver(e)}
            className="rounded-md p-5 bg-white border-gray-200 border shadow-md relative"
          >
            {pdfFile && (
              <div
                className="absolute right-1 top-0 cursor-pointer"
                onClick={() => setPdfFile(null)}
              >
                <i className="ri-close-line text-xl text-gray-700"></i>
              </div>
            )}
            {pdfFile ? (
              <>
                <Document
                  file={pdfFile}
                  className={"bg-gray-200 flex flex-col gap-y-2 p-3"}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  {/* {Array.from(new Array(numberPages), (el, index) => ( */}
                  <Page
                    width={
                      document.querySelector(".react-pdf__Page")?.clientWidth ||
                      1000
                    }
                    renderTextLayer={false}
                    pageNumber={pageNumber}
                    // className={"h-[700px]"}
                    renderAnnotationLayer={false}
                  />
                  {/* ))} */}
                </Document>
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
          <div className="rounded-md p-5 bg-white border-gray-200 border shadow-md">
            <input
              type="file"
              id="fileConfirm"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
            <input
              type="text"
              placeholder="Enter your signature"
              value={signature}
              className="hidden"
              onChange={(e) => setSignature(e.target.value)}
            />
            <div className="flex flex-col gap-y-3">
              <h5 className="text-gray-800 font-medium">
                Chọn người xác thực tài liệu{" "}
                <span className="text-sm text-red-500">*</span>
              </h5>
              <div className="flex flex-col gap-y-2">
                {data.map((item) => {
                  return (
                    <div
                      onClick={() => setSelectedSign(item)}
                      className={`border ${
                        item.id == selectedSign?.id
                          ? "border-gray-400 shadow-md"
                          : "border-gray-200"
                      } rounded-md px-3 py-2 cursor-pointer`}
                    >
                      <p className="text-gray-700 font-medium">{item.name}</p>
                      <span className="text-xs italic text-gray-500 ml-2">
                        {item.position}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div>
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
              </div>
              {handlePostSignHash.error && (
                <div className="text-xs text-red-500">
                  {handlePostSignHash.error.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFSign;
