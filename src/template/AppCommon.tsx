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
      <div className="h-full">
        <div className="h-full flex flex-col bg-clr-surface">
          <Navbar></Navbar>
          <div className="flex flex-auto min-h-0">
            {/* <div className="block"> */}
            <Sidebar></Sidebar>
            {/* </div> */}
            <div className="flex-auto p-5 max-h-full overflow-auto custom-scrollbar-wider relative transition-[width]">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppCommon;
