import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // Đường dẫn API mà bạn muốn proxy
      "/api": {
        target: "https://remotesigning.viettel.vn", // Địa chỉ máy chủ đích
        changeOrigin: true, // Thay đổi origin của header
        rewrite: (path) => path.replace(/^\/api/, ""), // Viết lại đường dẫn nếu cần
      },
    },
  },
});
