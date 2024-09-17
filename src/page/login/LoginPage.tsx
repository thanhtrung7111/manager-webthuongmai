import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import IconCompany from "@/assets/img/iconcompany.png";
import {
  Form,
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
import { loginLocation, loginUser } from "@/assets/api/authApi";
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

const formSchema = z.object({
  username: z.string().min(6, {
    message: "Tên đăng nhập không để trống và có ít nhất 6 kí tự!",
  }),
  password: z.string().min(6, {
    message: "Mật khẩu không để trống và có ít nhất 6 kí tự!",
  }),
});

const formLocationSchema = z.object({
  COMPCODE: z.string().min(1, {
    message: "Chưa chọn công ty!",
  }),
  LCTNCODE: z.string().min(1, {
    message: "Chưa chọn chi nhánh!",
  }),
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const formLocation = useForm<z.infer<typeof formLocationSchema>>({
    resolver: zodResolver(formLocationSchema),
    defaultValues: {
      COMPCODE: "",
      LCTNCODE: "",
    },
  });

  const submitLogin = (values: z.infer<typeof formSchema>) => {
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

  const submitLocation = (values: z.infer<typeof formLocationSchema>) => {
    loginLocationMutation.mutate(values);
  };
  console.log(lctnList);
  console.log(loginLocationMutation.data);
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(submitLogin)}
                className="flex flex-col gap-y-3"
              >
                <h5 className="text-center text-3xl mb-5 text-primary font-semibold">
                  Đăng nhập
                </h5>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">
                        Tên đăng nhập{" "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập tên đăng nhập..."
                          disabled={loginMutation.isPending}
                          className="focus:!ring-0 focus:!ring-transparent text-gray-700"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs font-light" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Mật khẩu</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Nhập mật khẩu..."
                          disabled={loginMutation.isPending}
                          {...field}
                          className="focus:!ring-0 focus:!ring-transparent text-gray-700"
                        />
                      </FormControl>
                      <FormMessage className="text-xs font-light" />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={loginMutation.isPending}
                  type="submit"
                  className="w-full disabled:bg-slate-600 mt-2"
                >
                  {loginMutation.isPending ? (
                    <SpinnerLoading className="w-4 h-4 fill-primary"></SpinnerLoading>
                  ) : (
                    "Đăng nhập"
                  )}
                </Button>
              </form>
            </Form>
          </div>
          <div className="px-10">
            <Form {...formLocation}>
              <form
                onSubmit={formLocation.handleSubmit(submitLocation)}
                className="flex flex-col gap-y-3"
              >
                <h5 className="text-center text-3xl mb-5 text-primary font-semibold">
                  Chọn chi nhánh
                </h5>
                <FormField
                  control={formLocation.control}
                  name="COMPCODE"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">
                        Chọn công ty
                      </FormLabel>
                      <Select
                        onValueChange={(value: string) => {
                          setLctnList(
                            loginMutation.data?.COMPLIST.find(
                              (item: CompcodeObject) => item.COMPCODE == value
                            )?.LCTNLIST
                          );
                          formLocation.setValue("COMPCODE", value);
                          formLocation.setValue("LCTNCODE", "");
                        }}
                        defaultValue={field.value}
                        disabled={loginLocationMutation.isPending}
                      >
                        <FormControl>
                          <SelectTrigger className="focus:!ring-0 focus:!ring-transparent">
                            <SelectValue className="" placeholder="Công ty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {loginMutation.data &&
                            loginMutation.isSuccess &&
                            loginMutation.data?.COMPLIST.map(
                              (item: CompcodeObject, index: number) => {
                                return (
                                  <SelectItem value={item.COMPCODE}>
                                    {item.COMPNAME}
                                  </SelectItem>
                                );
                              }
                            )}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs font-light" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formLocation.control}
                  name="LCTNCODE"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">
                        Chọn chi nhánh
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={loginLocationMutation.isPending}
                      >
                        <FormControl>
                          <SelectTrigger className="focus:!ring-0 focus:!ring-transparent">
                            <SelectValue placeholder="Chi nhánh" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {lctnList.map(
                            (item: LctnCodeObject, index: number) => {
                              return (
                                <SelectItem value={item.LCTNCODE}>
                                  {item.LCTNNAME}
                                </SelectItem>
                              );
                            }
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs font-light" />
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-x-2 mt-2">
                  <Button
                    disabled={loginLocationMutation.isPending}
                    type="button"
                    onClick={() => {
                      removeTokenUser();
                      formLocation.resetField("COMPCODE");
                      formLocation.resetField("LCTNCODE");
                      loginMutation.reset();
                    }}
                    className="w-full disabled:bg-slate-600 bg-slate-600 hover:bg-slate-600"
                  >
                    Quay lại
                  </Button>
                  <Button
                    disabled={loginLocationMutation.isPending}
                    type="submit"
                    className="w-full disabled:bg-slate-600"
                  >
                    {loginLocationMutation.isPending ? (
                      <SpinnerLoading className="w-4 h-4 fill-primary"></SpinnerLoading>
                    ) : (
                      "Tiếp tục"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
