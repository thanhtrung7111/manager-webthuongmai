import React, { useState } from "react";
import IconCompany from "@/assets/img/iconcompany.png";
import { CompcodeObject, LctnCodeObject } from "@/type/TypeCommon";
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
import {
  useGetTokenLocation,
  useGetTokenUser,
} from "@/api/react_query/query_auth";

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

  //KHai báo query và mutation
  const getTokenUser = useGetTokenUser();
  const getTokenLocation = useGetTokenLocation();

  const submitLogin = async (values: any) => {
    const data = await getTokenUser.mutateAsync({
      body: {
        APP_CODE: "WSB",
        USERLGIN: values.username,
        PASSWORD: values.password,
        LGINTYPE: "1",
        SYSTCHAR: "",
        INPTCHAR: "",
        PHONNAME: "",
        TKENDEVC: "",
      },
    });
    setTokenUser(data?.TOKEN);
    setLctnList(data?.COMPLIST[0]?.LCTNLIST);
  };

  const submitLocation = async (values: any) => {
    const data = await getTokenLocation.mutateAsync({
      body: values,
    });
    setTokenLocation(data?.TOKEN);
    setCurrentUser(data?.USERLGIN);
    navigate("/");
  };

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
            getTokenUser.isSuccess && !!getTokenUser.data
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
                    disabled={getTokenUser.isPending}
                    placeholder="Nhập tên đăng nhập..."
                  ></InputFormikForm>
                  <PasswordFormikForm
                    label="Mật khẩu"
                    name="password"
                    disabled={getTokenUser.isPending}
                    placeholder="Nhập mật khẩu..."
                  ></PasswordFormikForm>
                  <ButtonForm
                    type="submit"
                    label="Đăng nhập"
                    loading={getTokenUser.isPending}
                  ></ButtonForm>
                </Form>
              )}
            </Formik>
          </div>
          <div className="px-10">
            <Formik
              initialValues={{ COMPCODE: "", LCTNCODE: "" }}
              validationSchema={formLocationSchema}
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
                      getTokenUser.data && getTokenUser.isSuccess
                        ? getTokenUser.data?.COMPLIST
                        : []
                    }
                    itemKey={"COMPCODE"}
                    itemValue={"COMPNAME"}
                    important={true}
                    name="COMPCODE"
                    onChange={(e) => {
                      console.log(e);
                      setLctnList(
                        getTokenUser.data?.COMPLIST.find(
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
                        getTokenUser.reset();
                      }}
                      className=" disabled:bg-slate-600 bg-slate-600 hover:bg-slate-600"
                      disabled={getTokenLocation.isPending}
                    ></ButtonForm>
                    <ButtonForm
                      type="submit"
                      label="Tiếp tục"
                      className=" disabled:bg-slate-60"
                      loading={getTokenLocation.isPending}
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
