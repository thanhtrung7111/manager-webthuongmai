import axios from "axios";
import { useUserStore } from "@/store/userStore";
import moment from "moment";
// Tải dữ liệu theo điều kiện
export const fetchDataCondition = async (body: { [key: string]: any }) => {
  const response = await axios.post(
    "",
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

export const fetchDetailData = async (body: { [key: string]: any }) => {
  const response = await axios.post(
    "",
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
    "",
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

export const fetchImage = async (url: string) => {
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

  // Kiểm tra nếu phản hồi không hợp lệ
  // if (response.status != 200) {
  //   throw new Error("Failed to fetch data");
  // }
};

// Thêm mới dữ liệu
export const postData = async (body: { [key: string]: any }) => {
  const response = await axios.post(
    "",
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

// Cập nhật dữ liệu
export const updateData = async (body: { [key: string]: any }) => {
  const response = await axios.post(
    "",
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

// Xóa chứng từ
export const deleteData = async (body: { [key: string]: any }) => {
  const response = await axios.post(
    "",
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
    "",
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
export const deleteImage = async (body: FormData) => {
  const response = await axios.post(
    "",
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
