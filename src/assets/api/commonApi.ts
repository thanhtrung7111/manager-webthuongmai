import axios from "axios";
import { useUserStore } from "@/store/userStore";
import moment from "moment";
export const fetchProduct = async (body: { date: Date }) => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA004",
    {
      DCMNCODE: "appPrdcList",
      PARACODE: "001",
      LCTNCODE: "001",
      CURRDATE: "2024-09-17",
      CUSTCODE: "%",
      SHOPCODE: "%",
      KEY_WORD: "%",
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
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// Danh sách đơn vị tính
// export const fetchQUOM = async () => {
//   const response = await axios.post(
//     "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA002",
//     {
//       LISTCODE: "lstQUOM",
//     },
//     {
//       headers: {
//         token: useUserStore.getState().tokenLocation,
//       },
//     }
//   );

//   console.log(response);

//   if (response.status != 200) {
//     throw new Error("Failed to fetch data");
//   }

//   if (!response.data?.RETNCODE) {
//     throw new Error("No data found");
//   }
//   return response.data?.RETNDATA;
// };
// Danh sách phân loại
export const fetchDcmnSbCd = async () => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA002",
    {
      LISTCODE: "lstDcmnSbCd",
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
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// Danh sách thương hiệu
export const fetchProductBrand = async () => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA002",
    {
      LISTCODE: "lstProductBrand",
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
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// Danh sách màu sắc
export const fetchColor = async () => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA002",
    {
      LISTCODE: "lstColor",
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
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// Danh sách thuế suất
export const fetchSpndSgDt_Tax_RaNm = async () => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA002",
    {
      LISTCODE: "lstSpndSgDt_Tax_RaNm",
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
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// Danh sách tính chất sản phẩm
export const fetchEnum_PrdcOptn = async () => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA002",
    {
      LISTCODE: "Enum_PrdcOptn",
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
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// Danh sách loại hàng hóa
export const fetchSortCode = async () => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA002",
    {
      LISTCODE: "lstSortCode",
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
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// Danh sách nhóm hàng
export const fetchProductGroup = async () => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA002",
    {
      LISTCODE: "lstProductGroup",
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
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// Danh sách phân loại hàng hóa
export const fetchProductClass = async () => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA002",
    {
      LISTCODE: "lstProductClass",
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
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// Danh sách thuộc tính CPS
export const fetchProduct_Set_Prdc = async () => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA002",
    {
      LISTCODE: "lstProduct_Set_Prdc",
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
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// Danh sách ngành hàng
export const fetchPrdcSection = async () => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA002",
    {
      LISTCODE: "lstPrdcSection",
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
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// Danh sách đơn vị báo cáo
export const fetchQUOM = async () => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA002",
    {
      LISTCODE: "lstQUOM",
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
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// Danh sách loại gia công
export const fetchPrdcMchn = async () => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA002",
    {
      LISTCODE: "lstPrdcMchn",
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
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// Danh sách nhóm hàng sản xuất
export const fetchProductGroupMnfr = async () => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA002",
    {
      LISTCODE: "lstProductGroupMnfr",
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
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// Danh sách loại sản xuất
export const fetchMnfrType_inpPrdcOdMt = async () => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA002",
    {
      LISTCODE: "lstMnfrType_inpPrdcOdMt",
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
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// Danh sách tính công sản xuát
export const fetchStdrQUOM = async () => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA002",
    {
      LISTCODE: "lstStdrQUOM",
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
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// Danh sách tính công sản xuát
export const fetchProduct_Set_Mtrl = async () => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA002",
    {
      LISTCODE: "lstProduct_Set_Mtrl",
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
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// Danh sách loại tài sản
export const fetchAssetType = async () => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA002",
    {
      LISTCODE: "lstAssetType",
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
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// Danh sách phân loại tài sản
export const fetchAssetSubType = async () => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA002",
    {
      LISTCODE: "lstAssetSubType",
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
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// Danh sách nhóm tài sản quản lí
export const fetchAsstSgAt = async () => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA002",
    {
      LISTCODE: "lstAsstSgAt",
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
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// Danh sách chủng loại tài sản
export const fetchAssetAttribute = async () => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA002",
    {
      LISTCODE: "lstAssetAttribute",
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
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};
