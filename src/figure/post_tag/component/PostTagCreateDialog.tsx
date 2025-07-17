import { usePostUpdate } from "@/api/react_query/query_common";
import ButtonForm from "@/component_common/commonForm/ButtonForm";
import InputFormikForm from "@/component_common/commonForm/InputFormikForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const PostTagCreateDialog = ({
  open = false,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const validationSchema = Yup.object().shape({
    TAG_NAME: Yup.string().required("Không để trống tên tag bài viết!"),
  });

  const setPostTag = usePostUpdate();

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        if (!setPostTag.isPending) {
          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <Formik
          key={"formCreateProvince"}
          initialValues={{ TAG_NAME: "" }}
          validationSchema={validationSchema}
          onSubmit={(values: any) => {
            console.log("Hello");
            setPostTag.mutateAsync({ body: values });
          }}
        >
          {({ resetForm }) => (
            <Form id="formCreateProduct">
              <DialogHeader>
                <DialogTitle className="mb-5">
                  Thêm mới tag bài viết
                </DialogTitle>
                <div className="w-full overflow-hidden">
                  <div
                    className={`${
                      setPostTag.isSuccess
                        ? "-translate-x-1/2"
                        : "translate-x-0"
                    } w-[200%] grid grid-cols-2 transition-transform`}
                  >
                    <div className="flex flex-col gap-y-4 px-1">
                      <DialogDescription>
                        <InputFormikForm
                          label="Tên tag bài viết"
                          name="TAG_NAME"
                          important={true}
                          disabled={setPostTag.isPending}
                        ></InputFormikForm>
                      </DialogDescription>
                      <DialogFooter>
                        <div className="flex gap-x-2 justify-end">
                          <ButtonForm
                            type="submit"
                            className="!w-28 !bg-primary"
                            label="Thêm mới"
                            // disabled={false}
                          ></ButtonForm>
                          <ButtonForm
                            type="button"
                            className="!w-28 !bg-red-500"
                            label="Hủy"
                            onClick={() => {
                              onClose();
                              setPostTag.reset();

                              resetForm();
                            }}
                          ></ButtonForm>
                        </div>
                      </DialogFooter>
                    </div>
                    <div className="flex flex-col px-1">
                      <DialogDescription className="flex items-center mb-5 justify-center gap-x-2 py-6">
                        <i className="ri-checkbox-line text-gray-700 text-xl"></i>{" "}
                        <span className="text-gray-700 text-base">
                          Thêm thành công
                        </span>
                      </DialogDescription>
                      <div className="flex gap-x-2 justify-end">
                        <ButtonForm
                          type="button"
                          className="!w-28 !bg-primary"
                          label="Thêm mới"
                          onClick={() => {
                            setPostTag.reset();
                            resetForm();
                          }}
                        ></ButtonForm>
                        <ButtonForm
                          type="button"
                          className="!w-28 !bg-red-500"
                          label="Hủy"
                          onClick={() => {
                            onClose();
                            setPostTag.reset();

                            resetForm();
                          }}
                        ></ButtonForm>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogHeader>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default PostTagCreateDialog;
