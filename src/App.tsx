import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLogin from "./template/AppLogin";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useUserStore } from "./store/userStore";
import SpinnerLoading from "./component_common/loading/SpinnerLoading";
// import ProductCreatePage from "./page/create_product/ProductCreatePage";
import { Toaster } from "sonner";
import { useGetTokenInitial } from "./api/react_query/query_auth";
import { useGetLanguage } from "./api/react_query/query_common";
import AppCommon from "./template/AppCommon";
import HomePage from "./figure/home/page/HomePage";
import DashboardProductPage from "./figure/dashboard/page/DashboardProductPage";
import DashboardRevenuePage from "./figure/dashboard/page/DashboardRevenuePage";
import ProductPage from "./figure/product/page/ProductPage";
import ProductCreatePageFormik from "./figure/product/page/ProductCreatePageFormik";
import ProductUpdatePage from "./figure/product/page/ProductUpdatePage";
import AdvertisementPage from "./figure/advertisement/page/AdvertisementPage";
import AdvertisementCreatePage from "./figure/advertisement/page/AdvertisementCreatePage";
import AdvertisementUpdatePage from "./figure/advertisement/page/AdvertisementUpdatePage";
import PostPage from "./figure/post/page/PostPage";
import PostCreatePage from "./figure/post/page/PostCreatePage";
import PostUpdatePage from "./figure/post/page/PostUpdatePage";
import PostTagPage from "./figure/post_tag/page/PostTagPage";
import MessagesPage from "./figure/message/page/MessagesPage";
import PromotionPage from "./figure/promotion/page/PromotionPage";
import NotifycationComponent from "./figure/NotifycationComponent";
import PDFSign from "./figure/pdf_sign/PDFSign";
import AuthenSignaturePage from "./figure/authen_signature/AuthenSignaturePage";
import TipTapDemo from "./figure/TipTapDemo";
import LoginPage from "./figure/login/page/LoginPage";
import { useConfigurationStore } from "./store/configurationStore";
import PDFFileSign from "./figure/pdf_sign/PDFFileSign";
import { LanguageObject } from "./type/TypeCommon";
import themes from "./helper/themes";
import { hexToHSL } from "./helper/commonHelper";

function App() {
  const { currentUser, setTokenInitial } = useUserStore();
  const { setKeyLanguages, setLanguages, keyLanguage } = useConfigurationStore(
    (state) => state.languageConfig
  );
  const { setTheme, keyTheme } = useConfigurationStore(
    (state) => state.themeConfig
  );
  const getTokenInitial = useGetTokenInitial();
  const getLanguage = useGetLanguage();
  // console.log(languageConfig);
  useEffect(() => {
    async function getConfiguation() {
      setTokenInitial(getTokenInitial.data?.TOKEN);
      if (!keyLanguage) {
        setKeyLanguages({ key: "V" });
      }
    }
    if (getTokenInitial.isSuccess && getTokenInitial.data != undefined) {
      getConfiguation();
    }
  }, [getTokenInitial.isSuccess]);

  useEffect(() => {
    async function getConfigLanguage() {
      const result: LanguageObject[] = await getLanguage.mutateAsync({
        body: {
          APP_CODE: "WER",
          LGGECODE: keyLanguage,
        },
      });
      console.log(result);
      setLanguages({ languages: result });
    }
    if (keyLanguage != null) {
      getConfigLanguage();
    }
  }, [keyLanguage]);

  useEffect(() => {
    const root = document.documentElement;
    const currentTheme: Record<string, string> =
      themes[keyTheme.toLowerCase() as keyof typeof themes];

    Object.entries(currentTheme).forEach(([key, value]: [string, string]) => {
      if (key.startsWith("--")) {
        // Chỉ cập nhật các biến CSS
        const formattedValue = value.startsWith("#") ? hexToHSL(value) : value;
        root.style.setProperty(key, formattedValue);
      }
    });
  }, [keyTheme]);

  return getTokenInitial.isFetching ? (
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
            <Route
              element={<DashboardProductPage></DashboardProductPage>}
              path="/"
            ></Route>
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
            <Route element={<PDFSign></PDFSign>} path="/sign_pdf"></Route>
            <Route
              element={<PDFFileSign></PDFFileSign>}
              path="/sign_file_pdf"
            ></Route>
            <Route
              element={<AuthenSignaturePage></AuthenSignaturePage>}
              path="/authen_signature"
            ></Route>
            <Route
              element={<TipTapDemo></TipTapDemo>}
              path="/tiptap_demo"
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
