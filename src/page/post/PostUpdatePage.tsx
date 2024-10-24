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
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./css/quillCustomStyles.css";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import moment from "moment";
import { createSlug } from "@/helper/commonHelper";
import MultiTagSelect from "./component/MultiTagSelect";
import { toast } from "sonner";
import {
  deleteImage,
  fetchDetailData,
  fetchImage,
  postImage,
  updateData,
} from "@/api/commonApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SpinnerLoading from "@/component_common/loading/SpinnerLoading";
import { DcmnFileObject, PostUpdateObject } from "@/type/TypeCommon";

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
const PostUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [contentInitial, setContentInitial] = useState("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [infoLoading, setInfoLoading] = useState<string>("");
  const queryClient = useQueryClient();
  const [initialValue, setInitialValue] = useState<
    PostUpdateObject & { newImage?: File | null; image?: string }
  >({
    image: "",
    newImage: null,
    COMPCODE: "",
    LCTNCODE: "",
    POSTCODE: "",
    POSTTITL: "",
    POSTSLUG: "",
    POST_TAG: "",
    DDDD: "",
    ACCERGHT: 0,
    STTESIGN: 0,
    STTENAME: "",
    KKKK0000: "",
    DCMNFILE: [],
  });

  const handleFetchPostDetail = useMutation({
    mutationFn: (body: any) => fetchDetailData(body),
    onSuccess: (value) => {
      setInitialValue({ ...value });
    },
  });

  const fetchImageThumnail = useMutation({
    mutationFn: (body: string) => fetchImage(body),
  });

  const fetchContentFile = useMutation({
    mutationFn: (body: string) => fetchImage(body),
  });
  const handlePost = useMutation({
    mutationFn: (body: { [key: string]: any }) => updateData(body),
    onSuccess: (data: any) => {
      if (queryClient.getQueryData(["posts"])) {
        queryClient.setQueryData(["posts"], (oldData: any[]) => {
          const resultData = data[0];
          return [
            resultData,
            ...oldData.filter((item) => item.POSTCODE != resultData.POSTCODE),
          ];
        });
        if (id != undefined) {
          queryClient.invalidateQueries({ queryKey: ["postDetail", id] });
        }
      } else {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "posts",
        });
      }
    },
  });

  const validationSchema = Yup.object().shape({
    POSTTITL: Yup.string().required("Không để trống tiêu đề bài viết!"),
    POSTSLUG: Yup.string().required("Không để trống slug bài viết!"),
    POST_TAG: Yup.string().required("Tag dữ liệu có ít nhất là một!"),
    image: Yup.string().required("Không để trống thumbnail bài viết!"),
  });

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

  const handlePostImage = useMutation({
    mutationFn: (body: FormData) => postImage(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contentPost", id] });
      queryClient.invalidateQueries({ queryKey: ["imageThumnail", id] });
    },
  });

  const handleRemoveFile = useMutation({
    mutationFn: (body: FormData) => deleteImage(body),
  });

  const handleChangeContent = (values: any) => {
    setValue(values);
  };

  const handleSubmit = async (
    values: PostUpdateObject & { newImage?: File | null }
  ) => {
    console.log(values);
    // return;
    if (value == "") {
      toast("Thông báo", {
        description: "Bạn chưa thêm nôi dung bài viết!",
      });
      return;
    }
    setOpenDialog(true);
    setIsLoading(true);
    setInfoLoading("Đang lưu dữ liệu...");
    const data = await handlePost.mutateAsync({
      DCMNCODE: "INPSALEPOST",
      HEADER: [
        {
          //== Nhóm chính thể hiện - Mã nhóm: 01
          POSTCODE: values.POSTCODE,
          COMPCODE: values.COMPCODE,
          LCTNCODE: values.LCTNCODE,
          KKKK0000: values.KKKK0000,
          // "POSTCODE": "<(String) POSTCODE>",
          POSTTITL: values.POSTTITL,
          POSTSLUG: values.POSTSLUG,
          POST_TAG: values.POST_TAG,
        },
      ],
    });
    if (values.newImage != null || contentInitial != value) {
      setInfoLoading("Đang thêm hình ảnh...");

      const resultData: any = data[0];
      const formData: FormData = new FormData();
      formData.append("DCMNCODE", "inpSalePost");
      formData.append("KEY_CODE", resultData?.KKKK0000);
      formData.append("FILE_SRC", "1");
      formData.append("FILE_GRP", "1");
      // formData.append("FILE_GRP", "1");s
      if (values.newImage != null) {
        const formData1: FormData = new FormData();
        const findDcmnFile = values.DCMNFILE.find(
          (item) => item.FILENAME == "thumnailPost"
        )?.FILECODE;
        formData1.append("DCMNCODE", "inpSalePost");
        formData1.append("KEY_CODE", resultData?.KKKK0000);
        formData1.append("FILECODE", findDcmnFile ? findDcmnFile : "");
        await handleRemoveFile.mutateAsync(formData1);

        const newFileThumnail = new File(
          [values.newImage],
          "thumnailPost.png",
          {
            type: values.newImage.type,
          }
        );
        formData.append("Files[0]", newFileThumnail);
      }
      if (contentInitial != value) {
        const findDcmnFile = values.DCMNFILE.find(
          (item) => item.FILENAME == "contentPost"
        )?.FILECODE;
        const formData1: FormData = new FormData();
        formData1.append("DCMNCODE", "inpSalePost");
        formData1.append("KEY_CODE", resultData?.KKKK0000);
        formData1.append("FILECODE", findDcmnFile ? findDcmnFile : "");
        await handleRemoveFile.mutateAsync(formData1);
        const blob = new Blob([value], {
          type: "text/plain",
        });
        const newContentThumnail = new File([blob], "contentPost.txt", {
          type: blob.type,
        });

        formData.append("Files[1]", newContentThumnail);
      }
      await handlePostImage.mutateAsync(formData);
    }

    setInfoLoading("Hoàn thành...");
    setIsLoading(false);
  };

  useEffect(() => {
    if (
      fetchImageThumnail.isSuccess &&
      fetchImageThumnail.data &&
      handleFetchPostDetail.data
    ) {
      setInitialValue({
        ...handleFetchPostDetail.data[0],
        image: fetchImageThumnail.data,
      });
    }
  }, [fetchImageThumnail.isSuccess]);

  useEffect(() => {
    if (fetchContentFile.isSuccess && fetchContentFile.data) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const textContent = e.target ? e.target.result : null;
        console.log(textContent); // Kết quả dưới dạng văn bảns
        setValue(textContent as string);
        setContentInitial(textContent as string);
      };
      reader.readAsText(fetchContentFile.data);
    }
  }, [fetchContentFile.isSuccess]);

  //   useEffect(() => {
  //     refetch();
  //   }, [id]);
  //   useEffect(() => {
  //     console.log(data, "Inital value ....");
  //     if (data) {
  //       console.log(data[0], "Initial value...");
  //       setInitialValue({ ...data[0] });
  //     }
  //     if (fetchContentFile.data) {
  //       const reader = new FileReader();
  //       reader.onload = function (e) {
  //         const textContent = e.target ? e.target.result : null;
  //         console.log(textContent); // Kết quả dưới dạng văn bảns
  //         setValue(textContent as string);
  //         setContentInitial(textContent as string);
  //       };
  //       reader.readAsText(fetchContentFile.data);
  //     }
  //     if (fetchImageThumnail.data) {
  //       setInitialValue({ ...initialValue, image: fetchImageThumnail.data });
  //     }
  //   }, []);
  useEffect(() => {
    const fetchData = async () => {
      const data = await handleFetchPostDetail.mutateAsync({
        DCMNCODE: "inpSalePost",
        KEY_CODE: id,
      });
      await fetchImageThumnail.mutateAsync(
        data[0].DCMNFILE.find(
          (item: DcmnFileObject) => item.FILENAME == "thumnailPost"
        ).FILE_URL
          ? data[0].DCMNFILE.find(
              (item: DcmnFileObject) => item.FILENAME == "thumnailPost"
            ).FILE_URL
          : ""
      );
      await fetchContentFile.mutateAsync(
        data[0].DCMNFILE.find(
          (item: DcmnFileObject) => item.FILENAME == "contentPost"
        ).FILE_URL
          ? data[0].DCMNFILE.find(
              (item: DcmnFileObject) => item.FILENAME == "contentPost"
            ).FILE_URL
          : ""
      );
    };
    fetchData();
  }, [id]);
  console.log(initialValue, "Initial value");
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
                  handlePost.isSuccess ? "-translate-x-1/2" : "translate-x-0"
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
                      Cập nhật thành công!
                    </span>
                  </DialogDescription>
                  <div className="flex gap-x-2 justify-end">
                    <ButtonForm
                      type="button"
                      className="!w-28 !bg-red-500"
                      label="Hủy"
                      onClick={() => {
                        handlePost.reset();
                        setOpenDialog(false);
                        handlePostImage.reset();
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
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            handleSubmit(values);
          }}
        >
          {({ setFieldValue, values, errors, touched }) => (
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
                    Cập nhật bài viết
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
                    type="submit"
                    className="bg-secondary !w-16"
                    disabled={isLoading}
                    // loading={
                    //   handlePostProduct.isPending || handlePostImage.isPending
                    // }
                    // onClick={() => {
                    //
                    // }}
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
                              __html:
                                `<h1>${
                                  values.POSTTITL
                                    ? values.POSTTITL
                                    : "Chưa có tiêu đề..."
                                }</h1>` +
                                `<h5 style='font-size:14px'><span style='color:#484848;font-weight:500'>Ngày đăng:</span> ${moment(
                                  Date.now()
                                ).format("DD/MM/yyyy HH:mm:ss")}</h5>` +
                                value,
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
                    name="POSTTITL"
                    label={"Tiêu đề bài viết"}
                    onBlur={() => {
                      setFieldValue(
                        "POSTSLUG",
                        createSlug(values.POSTTITL ? values.POSTTITL : "")
                      );
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
                      value={values.POST_TAG ? values.POST_TAG : ""}
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
                      className="w-fit cursor-pointer border-gray-400 border rounded-md"
                    >
                      <img
                        src={
                          values.newImage
                            ? URL.createObjectURL(values.newImage)
                            : fetchImageThumnail.data
                            ? URL.createObjectURL(fetchImageThumnail.data)
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
                      Nội dung <span className="text-red-400">*</span>
                    </Label>
                    <ReactQuill
                      modules={modules}
                      theme="snow"
                      value={value}
                      onChange={handleChangeContent}
                      className="h-[830px]"
                    />
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

export default PostUpdatePage;
