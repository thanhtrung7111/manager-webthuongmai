import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "@/page/home/HomePage";
import AppCommon from "./template/AppCommon";
import ProductPage from "./page/product/ProductPage";
import AdvertisementPage from "./page/advertisement/AdvertisementPage";
import DashboardProductPage from "./page/dashboard_product/DashboardProductPage";
import DashboardRevenuePage from "./page/dashboard_revenue/DashboardRevenuePage";
import AppLogin from "./template/AppLogin";
import LoginPage from "./page/login/LoginPage";
import { useQuery } from "@tanstack/react-query";
import { fetchInitialToken } from "./api/authApi";
import { useUserStore } from "./store/userStore";
import SpinnerLoading from "./component_common/loading/SpinnerLoading";
import ProductCreatePage from "./page/create_product/ProductCreatePage";
import { Toaster } from "sonner";
import ProductCreatePageFormik from "./page/create_product/ProductCreatePageFormik";

function App() {
  const { currentUser, tokenInitial, setTokenInitial } = useUserStore();
  const { data, isError, isLoading, isFetching, isSuccess } = useQuery({
    queryKey: ["tokenInitial"],
    queryFn: async () => await fetchInitialToken(),
  });

  useEffect(() => {
    if (isSuccess && data != undefined) {
      setTokenInitial(data?.TOKEN);
    }
  }, [isSuccess]);

  return isFetching ? (
    <div className="h-screen w-full flex items-center justify-center gap-x-3">
      <SpinnerLoading className="w-10 h-10 fill-primary" />
      <span className="text-2xl text-gray-500 italic">Đang tải dữ liệu..</span>
    </div>
  ) : (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              !!currentUser ? (
                <AppCommon />
              ) : (
                <Navigate to={"/login"}></Navigate>
              )
            }
          >
            <Route element={<HomePage></HomePage>} path="/"></Route>
            <Route
              element={<ProductPage></ProductPage>}
              path="/product"
            ></Route>
            <Route
              element={<ProductCreatePageFormik></ProductCreatePageFormik>}
              path="/create_product"
            ></Route>

            <Route
              element={<AdvertisementPage></AdvertisementPage>}
              path="/advertisement"
            ></Route>
            <Route
              element={<DashboardProductPage></DashboardProductPage>}
              path="/dashboard_product"
            ></Route>
            <Route
              element={<DashboardRevenuePage></DashboardRevenuePage>}
              path="/dashboard_revenue"
            ></Route>
          </Route>
          <Route
            element={
              currentUser ? <Navigate to={"/"}></Navigate> : <AppLogin />
            }
          >
            <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
