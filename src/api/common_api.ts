import axios from "axios";
import { useUserStore } from "@/store/userStore";
import moment from "moment";
import QueryString from "qs";
import { LoginLocationObject, LoginObject } from "@/type/TypeCommon";

// ====================GET INITIAL TOKEN
export const getApiSYS001 = async () => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Syst?run_Code=SYS001",
    {
      COMPCODE: "PMC",
      APP_CODE: "AER",
      SYSTCODE: 4,
    }
  );

  console.log(response);
  // Kiểm tra nếu phản hồi không hợp lệ
  if (response.status != 200) {
    throw new Error("Failed to fetch data");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// ====================LOGIN USER
export const getApiSYS005 = async (body: LoginObject) => {
  const response = await axios.post(
    "https://Api-Dev.firstems.com/Api/data/runApi_Syst?run_Code=SYS005",
    body,
    {
      headers: {
        token: useUserStore.getState().tokenInitial,
      },
    }
  );

  console.log(response);
  // Kiểm tra nếu phản hồi không hợp lệ
  if (response.status != 200) {
    throw new Error("Failed to fetch data");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// ====================LOGIN LOCATION
export const getApiSYS006 = async (body: LoginLocationObject) => {
  const response = await axios.post(
    "https://Api-Dev.firstems.com/Api/data/runApi_Syst?run_Code=SYS006",
    body,
    {
      headers: {
        token: useUserStore.getState().tokenUser,
      },
    }
  );

  console.log(response);
  // Kiểm tra nếu phản hồi không hợp lệ
  if (response.status != 200) {
    throw new Error("Failed to fetch data");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// ====================GET SESSION VIETTEL
export const getApiVtSession = async () => {
  const response = await axios.post("http://127.0.0.1:14007/getSession");
  console.log(response);
  if (response.data == "") {
    throw new Error("Lỗi hệ thống Viettel!");
  }
  return response.data;
};

// ====================GET CERTIFICATE VIETTEL
export const getApiVtCertificate = async (sessionID: string) => {
  const data = {
    sessionID: sessionID,
  };
  const response = await axios.post(
    "http://127.0.0.1:14007/getCertificate",
    QueryString.stringify(data),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  console.log(response);
  if (response.data == "") {
    throw new Error("Lỗi hệ thống Viettel!");
  }
  return response.data;
};

// =====================LẤY MÃ HASH CỦA TÀI LIỆU
export const getApiHashDocument = async ({
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
}) => {
  const formData = new FormData();
  if (formFile) formData.append("formFile", formFile ? formFile : "");
  // Giả sử formFile là file, nếu không thì không cần "append" như thế này
  if (certificate) formData.append("certificate", certificate);
  if (fileImage) formData.append("fileImage", fileImage ? fileImage : "");
  if (reason) formData.append("reason", reason);
  if (location) formData.append("location", location);
  if (numPageSign) formData.append("numPageSign", numPageSign);
  if (coordinateX)
    formData.append("coordinateX", coordinateX.toFixed().toString());
  if (coordinateY)
    formData.append("coordinateY", coordinateY.toFixed().toString());
  if (width) formData.append("width", width.toString());
  if (height) formData.append("height", height.toString());
  // formData.append("typeSignature", typeSignature ? typeSignature : "");
  // formData.append("reason", "Xác thực tài liệu");
  // formData.append("location", "TP.HCM");
  // formData.append("numPageSign", "1");
  // formData.append("coordinateX", "200");
  // formData.append("coordinateY", "150");
  // formData.append("width", "200");
  // formData.append("height", "50");
  if (typeSignature) formData.append("typeSignature", typeSignature);
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }
  console.log("fix bug 1");
  const response = await axios.post(
    "http://localhost:59225/api/createHash",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data", // Bắt buộc cho FormData
      },
    }
  );
  console.log(response);
  if (response.data == "") {
    throw new Error("Lỗi hệ thống Viettel!");
  }
  return response.data;
};

//=====================LẤY CHỮ KÍ từ viettel
export const getApiVtSignature = async (
  sessionID: string,
  hashOpt: string,
  hashVal: string
) => {
  const data = {
    sessionID: sessionID,
    HashOpt: hashOpt,
    HashVal: hashVal,
  };
  const response = await axios.post(
    "http://127.0.0.1:14007/signHash",
    QueryString.stringify(data),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  console.log(response);
  if (response.data == "") {
    throw new Error("Lỗi hệ thống Viettel!");
  }
  return response.data;
};

//=========================Thêm chữ kí vào tài liệu
export const getApiInsertDocument = async ({
  signature,
  certificate,
  keySession,
}: {
  signature: string;
  certificate: string;
  keySession: string;
}) => {
  const formData: FormData = new FormData();
  formData.append("signature", signature);
  formData.append("certificate", certificate);
  formData.append("keySession", keySession);
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }
  console.log("fix bug 1");
  const response = await axios.post(
    "http://localhost:59225/api/insert_signature",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data", // Bắt buộc cho FormData
      },
    }
  );
  console.log(response);
  if (response.data == "") {
    throw new Error("Lỗi hệ thống Viettel!");
  }
  return response.data;
};

//=======================Kiểm tra tài liệu
export const getApiVerifyDocument = async ({ file }: { file: File }) => {
  const formData = new FormData();

  if (file) formData.append("formFile", file);

  const response = await axios.post(
    "http://localhost:59225/api/verify",
    formData
  );

  console.log(response);
  if (response.status == 200) {
    return response.data;
  }
  throw new Error("Lỗi hệ thống");
};

//================================Fetch danh sách dữ liệu
export const getApiDTA004 = async (body: { [key: string]: any }) => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA004",
    body,
    {
      headers: {
        token: useUserStore.getState().tokenLocation,
      },
    }
  );

  console.log(response);
  // Kiểm tra nếu phản hồi không hợp lệ
  if (response.status != 200) {
    throw new Error("Failed to fetch data");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

//=========================fetch chi tiết sản phẩm
export const getApiDTA005 = async (body: { [key: string]: any }) => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA005",
    body,
    {
      headers: {
        token: useUserStore.getState().tokenLocation,
      },
    }
  );

  console.log(response);
  // Kiểm tra nếu phản hồi không hợp lệ
  if (response.status != 200) {
    throw new Error("Failed to fetch data");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// =========================Lấy danh mục dữ liệu
export const getApiDTA002 = async (category: string) => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA002",
    {
      LISTCODE: category,
    },
    {
      headers: {
        token: useUserStore.getState().tokenLocation,
      },
    }
  );

  console.log(response);
  // Kiểm tra nếu phản hồi không hợp lệ
  if (response.status != 200) {
    throw new Error("Failed to fetch data");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!response.data?.RETNCODE || response.data?.RETNDATA == null) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

//========================Lấy hình ảnh
export const getApiDocument = async (url: string) => {
  console.log(url);
  try {
    const response = await axios.get(url, {
      headers: {
        token: useUserStore.getState().tokenLocation,
      },
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    throw new Error("Lỗi hệ thống!");
  }
};

// ================================== Thêm mới dữ liệu
export const getApiDTA007 = async (body: { [key: string]: any }) => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA007",
    body,
    {
      headers: {
        token: useUserStore.getState().tokenLocation,
      },
    }
  );

  console.log(response);
  // Kiểm tra nếu phản hồi không hợp lệ
  if (response.status != 200) {
    throw new Error("Failed to fetch data");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// =======================Cập nhật dữ liệu
export const getApiDTA008 = async (body: { [key: string]: any }) => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA008",
    body,
    {
      headers: {
        token: useUserStore.getState().tokenLocation,
      },
    }
  );

  console.log(response);
  // Kiểm tra nếu phản hồi không hợp lệ
  if (response.status != 200) {
    throw new Error("Failed to fetch data");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

//=========================== Xóa chứng từ
export const getApiDTA009 = async (body: { [key: string]: any }) => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA009",
    body,
    {
      headers: {
        token: useUserStore.getState().tokenLocation,
      },
    }
  );

  console.log(response);
  // Kiểm tra nếu phản hồi không hợp lệ
  if (response.status != 200) {
    throw new Error("Failed to fetch data");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// Thêm mới hình ảnh
export const getApiDTA011 = async (body: FormData) => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_File?run_Code=DTA011",
    body,
    {
      headers: {
        token: useUserStore.getState().tokenLocation,
      },
    }
  );

  console.log(response);
  // Kiểm tra nếu phản hồi không hợp lệ
  if (response.status != 200) {
    throw new Error("Failed to fetch data");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// Xóa hình ảnh
export const getApiDTA012 = async (body: FormData) => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_File?run_Code=DTA012",
    body,
    {
      headers: {
        token: useUserStore.getState().tokenLocation,
      },
    }
  );

  console.log(response);
  // Kiểm tra nếu phản hồi không hợp lệ
  if (response.status != 200) {
    throw new Error("Failed to fetch data");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

export const getApiSYS002 = async (body: { [key: string]: any }) => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Syst?run_Code=SYS002",
    body,
    {
      headers: {
        token: useUserStore.getState().tokenInitial,
      },
    }
  );

  console.log(response);
  // Kiểm tra nếu phản hồi không hợp lệ
  if (response.status != 200) {
    throw new Error("Failed to fetch data");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};
