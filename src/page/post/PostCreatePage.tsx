import BreadcrumbCustom from "@/component_common/breadcrumb/BreadcrumbCustom";
import ButtonForm from "@/component_common/commonForm/ButtonForm";
import InputFormikForm from "@/component_common/commonForm/InputFormikForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Form, Formik, useFormikContext } from "formik";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./css/quillCustomStyles.css";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Quill from "quill";
import moment from "moment";
const breadBrumb = [
  {
    itemName: "Quản lí chung",
  },
  {
    itemName: "Danh sách bài viết",
    itemLink: "/product",
  },
  {
    itemName: "Tạo mới",
    itemLink: "/create_product",
  },
];
interface ReactQuillRef {
  getEditor: () => Quill;
}
const PostCreatePage = () => {
  const [value, setValue] = useState("");
  const [valueFile, setValueFile] = useState("");
  // const { values } = useFormikContext() ?? Ơ;
  const [valueChang, setValueChange] = useState("");
  const quillRef = useRef<ReactQuillRef | null>(null);
  const cursorPositionRef = useRef<number | null>(null);

  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    PRDCCODE: Yup.string(),
    MPRDCNME: Yup.string()
      .min(8, "Tên sản phẩm ít nhất 8 kí tự!")
      .max(400, "Tên sản phẩm có nhiều nhất 400 kí tự!")
      .required("Không để trống!"),
    QUOMCODE: Yup.number().required("Không để trống phân loại!"),
    DCMNSBCD: Yup.string().required("Không để trống phân loại!"),
    BRNDCODE: Yup.string().required("Không để trống thương hiệu!"),
    COLRCODE: Yup.string().required("Không để trống màu sắc!"),
  });
  const initialValue = {
    PRDCCODE: "",
    MPRDCNME: "", //
    QUOMCODE: 0, //
    DCMNSBCD: "", //
    SLUGPOST: "",
    MQUOMNME: "",
    MDCSBNME: "",
    // LCTNCODE: currentUser?.LCTNCODE,
    BRNDCODE: "", //
    COLRCODE: "", //
    MDELPRDC: "", //
    VAT_RATE: 0, //
    PRDCOPTN: 0,
  };
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      ["link", "image", "video", "formula"],
      [{ size: ["small", false, "large", "huge"] }],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"],
    ],
    history: {
      delay: 2000,
      maxStack: 500,
      userOnly: true,
    },
  };

  const addTailwindClasses = (html: any) => {
    let modifiedHtml = html;
    return modifiedHtml;
  };

  const handleChangeContent = (values: any) => {
    console.log(values);
    setValue(values);
  };
  function createSlug(text: string): string {
    // Bước 1: Chuyển chữ về chữ thường
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

    return text;
  }
  return (
    <>
      <div className="flex flex-col gap-y-2">
        {/* <Progress value={progress} className="w-[60%]" />
      <Button
        onClick={() => {
          setProgress(50);
        }}
      ></Button> */}
        <div className="mb-3">
          <BreadcrumbCustom
            linkList={breadBrumb}
            itemName={"itemName"}
            itemLink={"itemLink"}
          ></BreadcrumbCustom>
        </div>

        <Formik
          key={"formLogin"}
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            // handleSubmitProduct(values);
          }}
        >
          {({ setFieldValue, handleChange, values, errors, touched }) => (
            <Form id="formCreateProduct">
              {/* Action  */}
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-end gap-x-2">
                  <div
                    className="text-gray-500 cursor-pointer"
                    onClick={() => navigate(-1)}
                  >
                    <i className="ri-logout-box-line text-xl"></i>
                  </div>
                  <h4 className="text-xl font-medium text-gray-600">
                    Thêm bài viết mới
                  </h4>
                </div>
                <div className="flex gap-x-2 shrink-0">
                  {/* <ButtonForm
                    label="Import Excel"
                    type="submit"
                    className="bg-primary !w-36"
                    // disabled={
                    //   handlePostProduct.isPending || handlePostImage.isPending
                    // }
                    icon={<i className="ri-download-2-line"></i>}
                  ></ButtonForm>
                  <ButtonForm
                    label="File excel mẫu"
                    type="button"
                    className="!bg-yellow-500 !w-36"
                    // onClick={() => extractExcel()}
                    icon={<i className="ri-download-2-line"></i>}
                  ></ButtonForm> */}
                  <ButtonForm
                    label="Lưu"
                    type="button"
                    className="bg-secondary !w-16"
                    // loading={
                    //   handlePostProduct.isPending || handlePostImage.isPending
                    // }
                    onClick={() => {
                      const content = document.getElementById("content");
                      const blob = new Blob(
                        [content?.innerHTML ? content?.innerHTML : ""],
                        {
                          type: "text/plain",
                        }
                      );
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "file.txt"; // Tên file khi tải về
                      a.click(); // Kích hoạt sự kiện click để tải file

                      // Giải phóng bộ nhớ URL tạm
                      window.URL.revokeObjectURL(url);
                    }}
                  ></ButtonForm>
                </div>
              </div>

              {/* table */}
              <div className="gap-x-2">
                <div className="rounded-md p-5 h-fit bg-white border-gray-200 border shadow-md flex flex-col gap-y-3">
                  <div className="flex items-center justify-between pb-2 border-gray-400 border-b">
                    <div className="text-gray-600 text-xl">
                      Chỉnh sửa bài viết
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="p-3 cursor-pointer border w-8 h-8 flex items-center justify-center bg-white rounded-lg -left-2">
                          <i className="ri-eye-line text-gray-600"></i>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[1200px]">
                        <div className="relative rounded-md p-5 bg-white border-gray-200 border shadow-md flex flex-col gap-y-3 h-[850px] overflow-y-scroll custom-scrollbar-wider">
                          {/* <div className="text-gray-600 text-xl pb-2 border-gray-400 border-b">
                    Review bài viết
                  </div> */}
                          <div
                            id="content"
                            dangerouslySetInnerHTML={{
                              __html: addTailwindClasses(
                                `<h1>${
                                  values.PRDCCODE
                                    ? values.PRDCCODE
                                    : "Chưa có tiêu đề..."
                                }</h1>` +
                                  `<h5 style='font-size:14px'><span style='color:#484848;font-weight:500'>Ngày tạo:</span> ${moment(
                                    Date.now()
                                  ).format("DD/MM/yyyy HH:mm:ss")}</h5>` +
                                  `<h5 style='font-size:14px'> <span style='color:#484848;font-weight:500'>Slug bài viết:</span>  ${createSlug(
                                    values.PRDCCODE
                                  )}</h5>` +
                                  value
                              ),
                            }}
                            className="w-full ql-review"
                          ></div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <InputFormikForm
                    placeholder="Nhập tiêu đề bài viết"
                    disabled={false}
                    name="PRDCCODE"
                    label={"Tiêu đề bài viết"}
                    // disabled={isLoadingLogin}
                    important={true}
                    // placeholder="Nhập tài khoản..."
                  ></InputFormikForm>
                  {/* <InputFormikForm
                    placeholder="Slug bài viết"
                    disabled={false}
                    name="SLUGPOST"
                    label={"Slug bài viết"}
                    // disabled={isLoadingLogin}
                    important={true}
                    // placeholder="Nhập tài khoản..."
                  ></InputFormikForm> */}
                  <div className="grid w-full items-center gap-1">
                    <Label
                      htmlFor="thumbnail"
                      className="text-gray-700 font-medium text-sm"
                    >
                      Thumbnail <span className="text-red-400">*</span>
                    </Label>
                    <Label htmlFor="thumbnail" className="w-fit cursor-pointer">
                      <img
                        src=""
                        className="h-40 w-44 border border-gray-100 shadow-sm"
                        alt=""
                      />
                    </Label>
                    <Input id="thumbnail" type="file" className="hidden" />
                  </div>
                  <div className="h-96 flex flex-col gap-y-1 overflow-hidden">
                    {/* <div id="toolbar">
                      <div className="ql-formats">
                        <select className="ql-header">
                          <option value="1">Title</option>
                          <option value="2">Subheading</option>
                          <option value="3">Small Paragraph</option>
                          <option selected>Normal text</option>
                        </select>
                        <button className="ql-clean"></button>
                      </div>
                    </div> */}
                    <Label
                      htmlFor="thumbnail"
                      className="text-gray-700 font-medium text-sm"
                    >
                      Nội dung <span className="text-red-400">*</span>
                    </Label>
                    <ReactQuill
                      modules={modules}
                      theme="snow"
                      value={value}
                      onChange={handleChangeContent}
                      className="h-72"
                    />
                  </div>
                </div>
              </div>

              <input
                type="file"
                accept=".txt"
                onChange={(e) => {
                  const file = e.target.files ? e.target.files[0] : ""; // Lấy file đầu tiên trong danh sách

                  if (file) {
                    const reader = new FileReader(); // Tạo đối tượng FileReader

                    // Hàm sẽ được gọi khi file được đọc xong
                    reader.onload = (event) => {
                      const text = event.target?.result; // Nội dung của file
                      if (typeof text === "string") {
                        // Kiểm tra kiểu dữ liệu
                        setValue(text); // Cập nhật nội dung vào state
                      } // Cập nhật nội dung vào state
                    };

                    // Đọc file dưới dạng text
                    reader.readAsText(file);
                  }
                }}
              />

              {/*Mã sản phẩm */}
              {/* <InputFormikForm
                      placeholder="Nhập tên sản phẩm..."
                      disabled={false}
                      name="PRDCCODE"
                      label={"Mã sản phẩm"}
                      // disabled={isLoadingLogin}
                      important={true}
                      // placeholder="Nhập tài khoản..."
                    ></InputFormikForm>
                  
                  <NumberFormikForm
                    unit="cm"
                    placeholder="Nhập chiều dài sản phẩm..."
                    disabled={false}
                    name="PRDCLONG"
                    label={"Chiều dài"}
                    // disabled={isLoadingLogin}
                    important={true}
                  ></NumberFormikForm> */}

              {/* <SelectFormikForm
                    options={lstStdrQUOM ? lstStdrQUOM : []}
                    loading={isFetchinglstStdrQUOM}
                    itemKey={"ITEMCODE"}
                    itemValue={"ITEMNAME"}
                    important={true}
                    name="STDRQUOM"
                    // onChange={(e) => {
                    //   setFieldValue("QUOMNAME", 4242);
                    // }}
                    label={"Tính gia công sản xuất"}
                  ></SelectFormikForm> */}
            </Form>
          )}
        </Formik>
        <div
          dangerouslySetInnerHTML={{
            __html: `${value}`,
          }}
        ></div>
      </div>
    </>
  );
};

export default PostCreatePage;
