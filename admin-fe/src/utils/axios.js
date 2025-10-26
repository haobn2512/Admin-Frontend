// src/utils/axios.js
import axios from "axios";
import { message } from "antd";

// ================================
// ⚙️ 1️⃣ CẤU HÌNH CƠ BẢN
// ================================
const api = axios.create({
  baseURL: "http://localhost:5000/api", // 👉 Thay bằng URL API thật của bạn (vd: https://api.stylewear.vn/api)
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ================================
// 🔑 2️⃣ INTERCEPTOR REQUEST
// ================================
api.interceptors.request.use(
  (config) => {
    // Lấy token JWT từ localStorage (được BE .NET cấp khi đăng nhập)
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ================================
// 🚨 3️⃣ INTERCEPTOR RESPONSE
// ================================
api.interceptors.response.use(
  (response) => {
    // ✅ Trả về dữ liệu chuẩn
    return response;
  },
  (error) => {
    const status = error.response?.status;

    // 401: Unauthorized → hết hạn token hoặc chưa đăng nhập
    if (status === 401) {
      message.warning("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      localStorage.removeItem("token");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }

    // 400: Bad Request → thường là lỗi validation (ModelState)
    else if (status === 400) {
      const errors = error.response?.data?.errors;
      if (errors) {
        // .NET gửi lỗi dạng { "Field": [ "Error message" ] }
        const firstError = Object.values(errors)[0][0];
        message.error(firstError);
      } else {
        message.error(error.response?.data?.message || "Dữ liệu không hợp lệ");
      }
    }

    // 403: Forbidden → không đủ quyền
    else if (status === 403) {
      message.error("Bạn không có quyền thực hiện hành động này.");
    }

    // 404: Not Found
    else if (status === 404) {
      message.error("Không tìm thấy tài nguyên yêu cầu.");
    }

    // 500+: Lỗi server
    else if (status >= 500) {
      message.error("Lỗi hệ thống. Vui lòng thử lại sau.");
    }

    return Promise.reject(error);
  }
);

// ================================
// 📦 4️⃣ EXPORT
// ================================
export default api;
