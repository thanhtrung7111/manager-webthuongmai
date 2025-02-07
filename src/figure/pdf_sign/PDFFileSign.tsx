import ButtonForm from "@/component_common/commonForm/ButtonForm";
// import { hSession, initPlugin, signFile } from "@/helper/sign_file";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import qs from "qs";
import { Input } from "@/components/ui/input";
import { data, dataConvert } from "./data";
const PDFFileSign = () => {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await initPlugin();
  //   };
  //   fetchData();
  // }, []);

  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
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
  console.log(convertBase64ToHexa("QlNJwjDtvln+G0mcBdqW8W954Xg="));
  const handleConvert = () => {
    console.log(inputRef.current?.value);
    if (inputRef.current?.value) {
      setValue(convertBase64ToHexa(inputRef.current?.value).toUpperCase() );
    }
  };
  const handleDowload = ()=>{
    const byteCharacters = atob(dataConvert); // Giải mã Base64
    const byteArrays = [];

    // Tạo mảng byte
    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const byteArray = new Uint8Array(Math.min(1024, byteCharacters.length - offset));
      for (let i = 0; i < byteArray.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(offset + i);
      }
      byteArrays.push(byteArray);
    }

    // Tạo Blob với mảng byte PDF
    const blob = new Blob(byteArrays, { type: 'application/pdf' });

    // Tạo URL cho Blob
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download =  'document.pdf'; // Đặt tên mặc định cho tệp nếu không có
    link.click(); 
  }
  return (
    <div className="flex flex-col gap-y-2">
      <Input placeholder="Nhập chuỗi cần chuyển" type="text" ref={inputRef} />
      <Input placeholder="Kết quả chuyển" type="text" value={value} />
      <ButtonForm
        type="button"
        label="Browser"
        className="!bg-red-500"
        onClick={() => handleConvert()}
      ></ButtonForm>
      <ButtonForm
        type="button" 
        label="Download"
        className="!bg-red-500"
        onClick={() => handleDowload()}
      ></ButtonForm>
      {/* <ButtonForm
        type="button"
        label="Browser"
        className="!bg-red-500"
        onClick={() => handleSign()}
      ></ButtonForm>
      <ButtonForm
        type="button"
        label="Tạo chữ kí"
        className="!bg-red-500"
        onClick={() => handleGetSign()}
      ></ButtonForm>
      <ButtonForm
        type="button"
        label="Ki mã băm"
        className="!bg-red-500"
        onClick={() => handleSignHash()}
      ></ButtonForm>
      <ButtonForm
        type="button"
        label="Tạo chữ kí kí dữ liệu"
        className="!bg-red-500"
        onClick={() => handleGetCertIssuer()}
      ></ButtonForm>
      <ButtonForm
        type="button"
        label="Lấy certifi"
        className="!bg-red-500"
        onClick={() => handleGetCert2SignFile()}
      ></ButtonForm>
      <ButtonForm
        type="button"
        label="Kí pdf"
        className="!bg-red-500"
        onClick={() => handleSignPDF()}
      ></ButtonForm> */}
    </div>
  );
};

export default PDFFileSign;
