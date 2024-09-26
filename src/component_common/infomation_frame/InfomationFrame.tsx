import React from "react";

const InfomationFrame = ({
  title = "Doanh thu",
  content = "250,500,000 VNĐ",
  rate = "2,5",
  totalRate = 500000,
  statusRate = "high",
  icon = <i className="ri-dashboard-line"></i>,
  backgroundIcon = "bg-primary",
}: {
  title?: string;
  content?: string;
  rate?: string;
  totalRate?: number;
  statusRate?: "high" | "low" | "normal";
  icon?: React.ReactNode;
  backgroundIcon?: string;
}) => {
  return (
    <div className="rounded-md p-5 bg-white border-gray-200 border shadow-md">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-y-2">
          <h4 className="text-gray-400 font-normal text-sm tracking-wide">
            {title}
          </h4>
          <p className="text-slate-600 text-2xl font-bold">{content}</p>
          <div className="flex items-center gap-x-1">
            <span
              className={`${
                statusRate == "high" || statusRate == "normal"
                  ? "text-green-700"
                  : "text-red-500"
              } font-semibold`}
            >
              {statusRate == "high" && <i className="ri-arrow-up-line"></i>}
              {statusRate == "low" && <i className="ri-arrow-down-line"></i>}
              {statusRate == "normal" && <i className="ri-equal-line"></i>}
              {rate}
            </span>
            <span className="text-sm text-gray-400">
              ({statusRate == "high" || statusRate == "normal" ? "+" : "-"}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
                maximumFractionDigits: 9,
              }).format(totalRate)}
              )
            </span>
          </div>
        </div>
        <div
          className={`${backgroundIcon} w-11 h-11 flex items-center justify-center rounded-md text-base text-white`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default InfomationFrame;
