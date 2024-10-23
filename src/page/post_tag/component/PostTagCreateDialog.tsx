import { postData } from "@/api/commonApi";
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
import React, { useState } from "react";
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

  const handlePost = useMutation({
    mutationFn: (body: { [key: string]: any }) => postData(body),
    onSuccess: (data: any) => {
      if (queryClient.getQueryData(["postTags"])) {
        queryClient.setQueryData(["postTags"], (oldData: any[]) => {
          const resultData = data[0];
          console.log(resultData);
          return [resultData, ...oldData];
        });
      } else {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "postTags",
        });
      }
    },
  });

  const handleSubmit = async (values: any): Promise<void> => {
    await handlePost.mutateAsync({
      DCMNCODE: "INPPOSTTAG",
      HEADER: [
        {
          //== Nhóm chính thể hiện - Mã nhóm: 01
          COMPCODE: "PMC",
          LCTNCODE: "001",
          // "TAG_CODE": "<(String) Mã tag>",
          TAG_NAME: values.TAG_NAME,
        },
      ],
    });
  };
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        if (!handlePost.isPending) {
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
            handleSubmit(values);
          }}
        >
          {({
            setFieldValue,
            handleChange,
            values,
            errors,
            touched,
            resetForm,
          }) => (
            <Form id="formCreateProduct">
              <DialogHeader>
                <DialogTitle className="mb-5">
                  Thêm mới tag bài viết
                </DialogTitle>
                <div className="w-full overflow-hidden">
                  <div
                    className={`${
                      handlePost.isSuccess
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
                          disabled={handlePost.isPending}
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
                              handlePost.reset();

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
                            handlePost.reset();
                            resetForm();
                          }}
                        ></ButtonForm>
                        <ButtonForm
                          type="button"
                          className="!w-28 !bg-red-500"
                          label="Hủy"
                          onClick={() => {
                            onClose();
                            handlePost.reset();

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
