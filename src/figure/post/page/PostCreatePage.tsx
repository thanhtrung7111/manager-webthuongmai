import BreadcrumbCustom from "@/component_common/breadcrumb/BreadcrumbCustom";
import ButtonForm from "@/component_common/commonForm/ButtonForm";
import InputFormikForm from "@/component_common/commonForm/InputFormikForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Form, Formik, useFormikContext } from "formik";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Quill from "quill";
import moment from "moment";
import { createSlug } from "@/helper/commonHelper";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SpinnerLoading from "@/component_common/loading/SpinnerLoading";
import { useSetDocument } from "@/api/react_query/query_document";
import MultiTagSelect from "../component/MultiTagSelect";
import TipTapCustom from "@/component_common/tiptap/TipTapCustom";
import { usePostNew } from "@/api/react_query/query_common";
// import { Editor, EditorState } from "react-draft-wysiwyg";
const breadBrumb = [
  {
    itemName: "Quản lí chung",
  },
  {
    itemName: "Bài viết",
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
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [infoLoading, setInfoLoading] = useState<string>("");
  const queryClient = useQueryClient();
  const [valueFile, setValueFile] = useState("");
  // const { values } = useFormikContext() ?? Ơ;
  const [valueChang, setValueChange] = useState("");
  const quillRef = useRef<ReactQuillRef | null>(null);
  const cursorPositionRef = useRef<number | null>(null);

  //Dùng draft-js

  const setPost = usePostNew();
  const setImage = useSetDocument();

  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    POSTTITL: Yup.string().required("Không để trống tiêu đề bài viết!"),
    POSTSLUG: Yup.string().required("Không để trống slug bài viết!"),
    POST_TAG: Yup.string().required("Tag dữ liệu có ít nhất là một!"),
    image: Yup.string().required("Không để trống thumbnail bài viết!"),
  });
  const [initialValue, setInitialState] = useState({
    COMPCODE: "PMC",
    LCTNCODE: "001",
    image: "",
    newImage: null,
    content: "",
    newContent: "",
    // POSTCODE: "",
    POSTTITL: "",
    POSTSLUG: "",
    POST_TAG: "",
  });

  const addTailwindClasses = (html: any) => {
    let modifiedHtml = html;
    return modifiedHtml;
  };

  const handleChangeContent = (values: any) => {
    setValue(values);
  };

  const handleSubmit = async (values: any) => {
    if (value == "") {
      toast("Thông báo", {
        description: "Bạn chưa thêm nôi dung bài viết!",
      });
      return;
    }
    setOpenDialog(true);
    setIsLoading(true);
    setInfoLoading("Đang lưu dữ liệu...");
    const data = await setPost.mutateAsync({
      body: {
        DCMNCODE: "INPSALEPOST",
        HEADER: [
          {
            //== Nhóm chính thể hiện - Mã nhóm: 01
            COMPCODE: values.COMPCODE,
            LCTNCODE: values.LCTNCODE,
            // "POSTCODE": "<(String) POSTCODE>",
            POSTTITL: values.POSTTITL,
            POSTSLUG: values.POSTSLUG,
            POST_TAG: values.POST_TAG,
          },
        ],
      },
    });
    if (values.newImage != null && value != "") {
      setInfoLoading("Đang thêm hình ảnh...");
      const newFileThumnail = new File([values.newImage], "thumnailPost.png", {
        type: values.newImage.type,
      });
      const blob = new Blob([value], {
        type: "text/plain",
      });
      const newContentThumnail = new File([blob], "contentPost.txt", {
        type: blob.type,
      });

      const resultData: any = data[0];
      const formData: FormData = new FormData();
      formData.append("DCMNCODE", "inpSalePost");
      formData.append("KEY_CODE", resultData?.KKKK0000);
      formData.append("FILE_SRC", "1");
      formData.append("FILE_GRP", "1");
      // formData.append("FILE_GRP", "1");s
      formData.append("Files[0]", newFileThumnail);
      formData.append("Files[1]", newContentThumnail);
      await setImage.mutateAsync({ body: formData });
    }

    setInfoLoading("Hoàn thành...");
    setIsLoading(false);
  };

  return (
    <>
      <Dialog
        open={openDialog}
        onOpenChange={() => {
          if (!isLoading) {
            setOpenDialog(false);
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Thông báo</DialogTitle>
            <div className="w-full overflow-hidden">
              <div
                className={`${
                  setImage.isSuccess && setPost.isSuccess
                    ? "-translate-x-1/2"
                    : "translate-x-0"
                } w-[200%] grid grid-cols-2 transition-transform`}
              >
                <div className="flex flex-col">
                  <DialogDescription className="flex flex-auto items-center mb-5 justify-center gap-x-2 py-6">
                    <SpinnerLoading className="w-6 h-6 fill-primary"></SpinnerLoading>
                    <span className="text-gray-700 text-base">
                      {infoLoading}
                    </span>
                  </DialogDescription>
                </div>
                <div className="flex flex-col">
                  <DialogDescription className="flex items-center mb-5 justify-center gap-x-2 py-6">
                    <i className="ri-checkbox-line text-gray-700 text-xl"></i>{" "}
                    <span className="text-gray-700 text-base">
                      Thêm quảng bài viết thành công!
                    </span>
                  </DialogDescription>
                  <div className="flex gap-x-2 justify-end">
                    <ButtonForm
                      type="button"
                      className="!w-32 bg-secondary"
                      label="Xem danh sách"
                      onClick={() => navigate("/post")}
                    ></ButtonForm>

                    <ButtonForm
                      type="button"
                      className="!w-28"
                      label="Thêm mới"
                      onClick={() => {
                        setPost.reset();
                        setOpenDialog(false);
                        setImage.reset();
                        setInitialState({
                          COMPCODE: "PMC",
                          LCTNCODE: "001",
                          image: "",
                          newImage: null,
                          content: "",
                          newContent: "",
                          // POSTCODE: "",
                          POSTTITL: "",
                          POSTSLUG: "",
                          POST_TAG: "",
                        });
                      }}
                    ></ButtonForm>
                  </div>
                </div>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col gap-y-2 h-fit">
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
            handleSubmit(values);
          }}
        >
          {({ setFieldValue, handleChange, values, errors, touched }) => (
            <Form id="formCreateProduct">
              {/* Action  */}

              {/* table */}
              <div className="gap-x-2">
                <div className="rounded-md p-5 pt-3 h-fit bg-white border-gray-200 border shadow-md flex flex-col gap-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-end gap-x-2">
                      {/* <div
                        className="text-gray-500 cursor-pointer"
                        onClick={() => navigate(-1)}
                      >
                        <i className="ri-logout-box-line text-xl"></i>
                      </div> */}
                      <h4 className="text-xl font-medium text-gray-600 border-l-4 pl-2 border-gray-500">
                        Thông tin bài viết
                      </h4>
                    </div>
                    <div className="flex gap-x-2 shrink-0">
                      {/* <ButtonForm
                    label="Import Excel"
                    type="submit"
                    className="bg-primary !w-36"
                    // disabled={
                    //   handlePostProduct.isPending || setImage.isPending
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
                                    values.POSTTITL
                                      ? values.POSTTITL
                                      : "Chưa có tiêu đề..."
                                  }</h1>` +
                                    `<h5 style='font-size:14px'><span style='color:#484848;font-weight:500'>Ngày đăng:</span> ${moment(
                                      Date.now()
                                    ).format(
                                      "DD/MM/yyyy HH:mm:ss"
                                    )}</h5>${value}`
                                ),
                              }}
                              className="w-full ql-review"
                            ></div>
                            {/* <div
                            className="preview"
                            dangerouslySetInnerHTML={createMarkup(
                              convertedContent
                            )}
                          ></div> */}
                          </div>
                        </DialogContent>
                      </Dialog>
                      <ButtonForm
                        label="Lưu"
                        type="submit"
                        className="!bg-clr-secondary !w-16"
                        disabled={isLoading}
                        // loading={
                        //   handlePostProduct.isPending || setImage.isPending
                        // }
                        // onClick={() => {
                        //
                        // }}
                      ></ButtonForm>
                      <ButtonForm
                        label="Hủy"
                        type="button"
                        className="bg-red-500 !w-14"
                        disabled={isLoading}
                        // loading={
                        //   handlePostProduct.isPending || setImage.isPending
                        // }
                        // onClick={() => {
                        //
                        // }}
                        onClick={() => console.log(value)}
                      ></ButtonForm>
                    </div>
                  </div>

                  <InputFormikForm
                    placeholder="Nhập tiêu đề bài viết"
                    disabled={false}
                    name="POSTTITL"
                    label={"Tiêu đề bài viết"}
                    onBlur={() => {
                      setFieldValue("POSTSLUG", createSlug(values.POSTTITL));
                    }}
                    important={true}
                    // placeholder="Nhập tài khoản..."
                  ></InputFormikForm>
                  <InputFormikForm
                    placeholder="Slug bài viết tự tạo..."
                    disabled={true}
                    name="POSTSLUG"
                    label={"Slug bài viết"}
                    important={true}
                    // placeholder="Nhập tài khoản..."
                  ></InputFormikForm>
                  <div className="flex flex-col gap-y-1">
                    <Label
                      htmlFor="thumbnail"
                      className="text-gray-700 font-medium text-sm"
                    >
                      Tag bài viết <span className="text-red-400">*</span>
                    </Label>
                    <MultiTagSelect
                      value={values.POST_TAG}
                      onChange={(value) => setFieldValue("POST_TAG", value)}
                    ></MultiTagSelect>
                  </div>
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
                      className="text-gray-700 font-medium text-sm w-fit"
                    >
                      Thumbnail <span className="text-red-400">*</span>
                    </Label>
                    <Label
                      htmlFor="thumbnail"
                      className="w-fit cursor-pointer  border border-gray-700 rounded-md overflow-hidden"
                    >
                      <img
                        src={
                          values.newImage
                            ? URL.createObjectURL(values.newImage)
                            : "https://media.istockphoto.com/id/1472933890/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=Rdn-lecwAj8ciQEccm0Ep2RX50FCuUJOaEM8qQjiLL0="
                        }
                        className="h-40 w-44 object-cover object-center border border-gray-100 shadow-sm"
                        alt=""
                      />
                    </Label>
                    <Input
                      id="thumbnail"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        setFieldValue(
                          "image",
                          e.target.files ? e.target.files[0].name : ""
                        );
                        setFieldValue(
                          "newImage",
                          e.target.files ? e.target.files[0] : ""
                        );
                      }}
                    />
                    {errors.image && touched.image && (
                      <span className="text-red-500 text-xs">
                        Không để trống thumbnail!
                      </span>
                    )}
                  </div>
                  <div className="h-[900px] flex flex-col gap-y-1 overflow-hidden">
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
                      Nội dung <span className="text-red-400 ">*</span>
                    </Label>
                    <TipTapCustom
                      content={value}
                      onContentChange={(value) => setValue(value)}
                    ></TipTapCustom>

                    {/* {value == "" && <span className="text-xs text-red-500">Không để trống nội dung</span>} */}
                  </div>
                </div>
              </div>

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
      </div>
    </>
  );
};

export default PostCreatePage;
