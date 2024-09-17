import { LoginLocationObject, LoginObject } from "@/type/TypeCommon";
import axios from "axios";
import { useUserStore } from "@/store/userStore";
export const fetchInitialToken = async () => {
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

export const loginUser = async (body: LoginObject) => {
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

export const loginLocation = async (body: LoginLocationObject) => {
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
