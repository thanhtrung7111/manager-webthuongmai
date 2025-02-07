/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URL: "https://api-dev.firstems.com/";
  readonly VITE_APP_NAME: string;
  // Thêm các biến khác nếu cần
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
