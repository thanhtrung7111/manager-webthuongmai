import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
export function createSlug(text: string): string {
  // Bước 1: Chuyển chữ về chữ thường

  const newUUID = uuidv4();

  const wordArray = CryptoJS.enc.Utf8.parse(newUUID);

  const base64Convert: string = CryptoJS.enc.Base64.stringify(wordArray);
  text = text.toLowerCase();

  // Bước 2: Thay thế các ký tự đặc biệt và tiếng Việt thành ký tự tương đương
  const vietnameseChars = {
    à: "a",
    á: "a",
    ả: "a",
    ã: "a",
    ạ: "a",
    â: "a",
    ầ: "a",
    ấ: "a",
    ẩ: "a",
    ẫ: "a",
    ậ: "a",
    ä: "a",
    å: "a",
    ā: "a",
    è: "e",
    é: "e",
    ẻ: "e",
    ẽ: "e",
    ẹ: "e",
    ê: "e",
    ế: "e",
    ề: "e",
    ể: "e",
    ễ: "e",
    ệ: "e",
    ì: "i",
    í: "i",
    ỉ: "i",
    ĩ: "i",
    ị: "i",
    ò: "o",
    ó: "o",
    ỏ: "o",
    õ: "o",
    ọ: "o",
    ô: "o",
    ồ: "o",
    ố: "o",
    ổ: "o",
    ỗ: "o",
    ộ: "o",
    ơ: "o",
    ờ: "o",
    ớ: "o",
    ở: "o",
    ỡ: "o",
    ợ: "o",
    ù: "u",
    ú: "u",
    ư: "u",
    ủ: "u",
    ũ: "u",
    ụ: "u",
    û: "u",
    ü: "u",
    ų: "u",
    ỳ: "y",
    ý: "y",
    ỷ: "y",
    ỹ: "y",
    ỵ: "y",
    đ: "d",
    Đ: "d",
  };

  for (const [key, value] of Object.entries(vietnameseChars)) {
    text = text.replace(new RegExp(key, "g"), value);
  }

  // Bước 3: Xóa các ký tự không phải chữ cái, số và thay thế khoảng trắng bằng dấu '-'
  text = text
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-") // Thay thế nhiều khoảng trắng bằng một dấu '-'
    .replace(/^-+|-+$/g, ""); // Xóa dấu '-' ở đầu và cuối

  return text + "-" + base64Convert;
}
