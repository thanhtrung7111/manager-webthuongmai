import Navbar from "@/component_common/navbar/Navbar";
import Sidebar from "@/component_common/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const AppCommon = () => {
  return (
    <div className="h-full block">
      <div className="flex">
        <Sidebar></Sidebar>
        <div className="flex-auto flex flex-col bg-slate-50">
          <Navbar></Navbar>
          <div className="flex-auto p-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppCommon;
