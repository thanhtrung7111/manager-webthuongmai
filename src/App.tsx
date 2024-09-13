import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "@/page/home/HomePage";
import AppCommon from "./template/AppCommon";
import ProductPage from "./page/product/ProductPage";
import AdvertisementPage from "./page/advertisement/AdvertisementPage";
import DashboardProductPage from "./page/dashboard_product/DashboardProductPage";
import DashboardRevenuePage from "./page/dashboard_revenue/DashboardRevenuePage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppCommon />}>
            <Route element={<HomePage></HomePage>} path="/"></Route>
            <Route
              element={<ProductPage></ProductPage>}
              path="/product"
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
