import ComponentFrameMessage from "@/component_common/message/ComponentFrameMessage";
import Navbar from "@/component_common/navbar/Navbar";
import Sidebar from "@/component_common/sidebar/Sidebar";
import { Outlet, useLocation } from "react-router-dom";

const AppCommon = () => {
  const location = useLocation();

  return (
    <div className="block h-screen">
      {location.pathname.indexOf("/messages") < 0 && (
        <ComponentFrameMessage></ComponentFrameMessage>
      )}
      <div className="flex h-full">
        <Sidebar></Sidebar>
        <div className="flex-auto h-screen overflow-y-scroll flex flex-col bg-slate-50">
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
