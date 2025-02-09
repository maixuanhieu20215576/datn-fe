// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from './locales/en.json';
import vi from './locales/vi.json';

// Khởi tạo i18next
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en
    },
    vi: {
      translation: vi
    },
  },
  lng: "en", // Ngôn ngữ mặc định
  fallbackLng: "en", // Nếu không tìm thấy bản dịch, sẽ sử dụng ngôn ngữ fallback
  interpolation: {
    escapeValue: false, // React tự động escape các ký tự đặc biệt, không cần escape ở đây
  },
});

export default i18n;
