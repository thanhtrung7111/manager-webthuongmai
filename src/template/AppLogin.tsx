import React from "react";
import { Outlet } from "react-router-dom";

const AppLogin = () => {
  return (
    <div className="h-full w-full flex items-center justify-center bg-slate-50 overflow-hidden">
      <Outlet />
    </div>
  );
};

export default AppLogin;
