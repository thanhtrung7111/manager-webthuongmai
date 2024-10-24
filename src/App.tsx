import { useEffect } from "react";
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
// import ProductCreatePage from "./page/create_product/ProductCreatePage";
import { Toaster } from "sonner";
import ProductCreatePageFormik from "./page/create_product/ProductCreatePageFormik";
import MessagesPage from "./page/message/MessagesPage";
import PromotionPage from "./page/promotion/PromotionPage";
import NotifycationComponent from "./page/NotifycationComponent";
import AdvertisementCreatePage from "./page/advertisement/AdvertisementCreatePage";
import AdvertisementUpdatePage from "./page/advertisement/AdvertisementUpdatePage";
import PostPage from "./page/post/PostPage";
import PostCreatePage from "./page/post/PostCreatePage";
import PostTagPage from "./page/post_tag/PostTagPage";
import PostUpdatePage from "./page/post/PostUpdatePage";
import ProductUpdatePage from "./page/product/component/ProductUpdatePage";

function App() {
  const { currentUser, setTokenInitial } = useUserStore();
  const { data, isFetching, isSuccess } = useQuery({
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
              element={<DashboardProductPage></DashboardProductPage>}
              path="/dashboard_product"
            ></Route>
            <Route
              element={<DashboardRevenuePage></DashboardRevenuePage>}
              path="/dashboard_revenue"
            ></Route>
            <Route
              element={<ProductPage></ProductPage>}
              path="/product"
            ></Route>
            <Route
              element={<ProductCreatePageFormik></ProductCreatePageFormik>}
              path="/create_product"
            ></Route>
            <Route
              element={<ProductUpdatePage></ProductUpdatePage>}
              path="/update_product/:id"
            ></Route>
            <Route
              element={<AdvertisementPage></AdvertisementPage>}
              path="/advertisement"
            ></Route>
            <Route
              element={<AdvertisementCreatePage></AdvertisementCreatePage>}
              path="/create_advertisement"
            ></Route>
            <Route
              element={<AdvertisementUpdatePage></AdvertisementUpdatePage>}
              path="/update_advertisement/:id"
            ></Route>
            <Route element={<PostPage></PostPage>} path="/post"></Route>
            <Route
              element={<PostCreatePage></PostCreatePage>}
              path="/create_post"
            ></Route>
            <Route
              element={<PostUpdatePage></PostUpdatePage>}
              path="/update_post/:id"
            ></Route>
            <Route
              element={<PostTagPage></PostTagPage>}
              path="/post_tag"
            ></Route>
            <Route
              element={<MessagesPage></MessagesPage>}
              path="/messages"
            ></Route>
            <Route
              element={<PromotionPage></PromotionPage>}
              path="/promotion"
            ></Route>
            <Route
              element={<NotifycationComponent></NotifycationComponent>}
              path="/notify"
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
