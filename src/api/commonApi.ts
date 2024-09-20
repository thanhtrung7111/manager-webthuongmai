import axios from "axios";
import { useUserStore } from "@/store/userStore";
import moment from "moment";
// Tải dữ liệu theo điều kiện
export const fetchDataCondition = async (body: { [key: string]: any }) => {
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

// Tải dữ liệu danh mục
export const fetchCategory = async (category: string) => {
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

// Thêm mới dữ liệu
export const postData = async (body: { [key: string]: any }) => {
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

// Thêm mới hình ảnh
export const postImage = async (body: FormData) => {
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
