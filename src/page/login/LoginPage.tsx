import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconCompany from "@/assets/img/iconcompany.png";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { loginLocation, loginUser } from "@/api/authApi";
import {
  CompcodeObject,
  LctnCodeObject,
  LoginLocationObject,
  LoginObject,
} from "@/type/TypeCommon";
import SpinnerLoading from "@/component_common/loading/SpinnerLoading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import InputFormikForm from "@/component_common/commonForm/InputFormikForm";
import PasswordFormikForm from "@/component_common/commonForm/PasswordFormikForm";
import ButtonForm from "@/component_common/commonForm/ButtonForm";
import SelectFormikForm from "@/component_common/commonForm/SelectFormikForm";

const formSchema = Yup.object().shape({
  username: Yup.string().min(
    6,
    "Tên đăng nhập không để trống và có ít nhất 6 kí tự!"
  ),
  password: Yup.string().min(
    6,
    "Mật khẩu không để trống và có ít nhất 6 kí tự!"
  ),
});

const formLocationSchema = Yup.object().shape({
  COMPCODE: Yup.string().min(1, "Chưa chọn công ty!"),
  LCTNCODE: Yup.string().min(1, "Chưa chọn chi nhánh!"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [lctnList, setLctnList] = useState<LctnCodeObject[]>([]);
  const {
    setTokenUser,
    setTokenLocation,
    tokenUser,
    removeTokenUser,
    setCurrentUser,
  } = useUserStore();
  const loginMutation = useMutation({
    mutationFn: (body: LoginObject) => loginUser(body),
    onSuccess: (data) => {
      setTokenUser(data?.TOKEN);
      setLctnList(data?.COMPLIST[0]?.LCTNLIST);
    },
  });

  const loginLocationMutation = useMutation({
    mutationFn: (body: LoginLocationObject) => loginLocation(body),
    onSuccess: (data) => {
      console.log(data);
      setTokenLocation(data?.TOKEN);
      setCurrentUser(data?.USERLGIN);
      navigate("/");
    },
  });

  const submitLogin = (values: Yup.AnyObject) => {
    loginMutation.mutate({
      APP_CODE: "WSB",
      USERLGIN: values.username,
      PASSWORD: values.password,
      LGINTYPE: "1",
      SYSTCHAR: "",
      INPTCHAR: "",
      PHONNAME: "",
      TKENDEVC: "",
    });
  };

  const submitLocation = (values: any) => {
    loginLocationMutation.mutate(values);
  };
  console.log(lctnList);
  console.log(loginMutation.data);
  return (
    <div className="w-[900px] h-[500px] grid grid-cols-2 justify-center border border-gray-200 shadow-lg">
      <div className="bg-gradient-to-r from-[#C7977C] to-[#09B291] h-full flex items-center justify-center">
        <div className="h-14 py-5 border border-gray-100 bg-white w-40 shadow-md flex items-center justify-center rounded-full">
          <img src={IconCompany} alt="" className="h-5" />
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <div
          className={`pt-11 grid grid-cols-2 w-[200%] ${
            loginMutation.isSuccess && !!loginMutation.data
              ? "-translate-x-1/2"
              : "translate-x-0"
          } transition-transform duration-150`}
        >
          <div className="px-10">
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={formSchema}
              onSubmit={(values) => {
                submitLogin(values);
              }}
            >
              {({}) => (
                <Form id="formLogin" className="flex flex-col gap-y-3">
                  <h5 className="text-center text-3xl mb-5 text-primary font-semibold">
                    Đăng nhập
                  </h5>
                  <InputFormikForm
                    label="Tên đăng nhập"
                    name="username"
                    disabled={loginMutation.isPending}
                    placeholder="Nhập tên đăng nhập..."
                  ></InputFormikForm>
                  <PasswordFormikForm
                    label="Mật khẩu"
                    name="password"
                    disabled={loginMutation.isPending}
                    placeholder="Nhập mật khẩu..."
                  ></PasswordFormikForm>
                  <ButtonForm
                    type="submit"
                    label="Đăng nhập"
                    loading={loginMutation.isPending}
                  ></ButtonForm>
                </Form>
              )}
            </Formik>
          </div>
          <div className="px-10">
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={formSchema}
              onSubmit={(values) => {
                submitLocation(values);
              }}
            >
              {({}) => (
                <Form id="formLogin" className="flex flex-col gap-y-3">
                  {" "}
                  <h5 className="text-center text-3xl mb-5 text-primary font-semibold">
                    Chọn chi nhánh
                  </h5>
                  <SelectFormikForm
                    options={
                      loginMutation.data && loginMutation.isSuccess
                        ? loginMutation.data?.COMPLIST
                        : []
                    }
                    itemKey={"COMPCODE"}
                    itemValue={"COMPNAME"}
                    important={true}
                    name="COMPCODE"
                    onChange={(e) => {
                      console.log(e);
                      setLctnList(
                        loginMutation.data?.COMPLIST.find(
                          (item: CompcodeObject) => item.COMPCODE == e.COMPCODE
                        )?.LCTNLIST
                      );
                    }}
                    label={"Đơn vị tính"}
                  ></SelectFormikForm>{" "}
                  <SelectFormikForm
                    options={lctnList}
                    itemKey={"LCTNCODE"}
                    itemValue={"LCTNNAME"}
                    important={true}
                    name="LCTNCODE"
                    label={"Đơn vị tính"}
                  ></SelectFormikForm>{" "}
                  <div className="grid grid-cols-2 gap-x-2 mt-2">
                    <ButtonForm
                      type="button"
                      label="Quay lại"
                      onClick={() => {
                        removeTokenUser();
                        loginMutation.reset();
                      }}
                      className=" disabled:bg-slate-600 bg-slate-600 hover:bg-slate-600"
                      disabled={loginLocationMutation.isPending}
                    ></ButtonForm>
                    <ButtonForm
                      type="submit"
                      label="Tiếp tục"
                      className=" disabled:bg-slate-60"
                      loading={loginLocationMutation.isPending}
                    ></ButtonForm>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
