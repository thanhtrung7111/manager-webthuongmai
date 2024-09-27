import BreadcrumbCustom from "@/component_common/breadcrumb/BreadcrumbCustom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const MessagesPage = () => {
  const breadBrumb = [
    {
      itemName: "Quản lí chung",
    },
    {
      itemName: "Tin nhắn",
      itemLink: "/messages",
    },
  ];
  return (
    <div className="flex flex-col gap-y-3 h-full">
      <div>
        <BreadcrumbCustom
          linkList={breadBrumb}
          itemName={"itemName"}
          itemLink={"itemLink"}
        ></BreadcrumbCustom>
      </div>
      <div className="flex items-start gap-x-3 flex-auto">
        <div className="rounded-md p-6 bg-white border-gray-200 border shadow-md w-80 shrink-0 h-full">
          <div className="mb-5">
            <input
              type="text"
              className="border outline-none shadow-md border-gray-300 text-sm w-full px-2 py-2 rounded-md"
              placeholder="Nhập tên tìm kiếm..."
            />
          </div>
          <div className="flex flex-col">
            <div className="flex gap-x-2 px-3 py-3 border-b border-gray-100 hover:bg-slate-50 cursor-pointer">
              <div className="relative cursor-pointer w-fit">
                <div className="absolute -top-1 right-0 z-10 h-4 w-4 rounded-full bg-green-500 border border-white"></div>
                <Avatar className="size-10 border border-slate-400  bg-white">
                  <AvatarImage
                    src={
                      "https://png.pngtree.com/png-clipart/20230522/original/pngtree-man-avatar-character-png-image_9168053.png"
                    }
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col justify-between">
                <span className="text-gray-500 text-sm font-medium">
                  Thành Trung
                </span>
                <p className="text-xs text-gray-400 line-clamp-1">
                  Hỗ trợ khách hàng xử lí yêu cầu về tài khoản ngân hang
                </p>
              </div>
            </div>
            <div className="flex gap-x-2 px-3 py-3 border-b border-gray-100 hover:bg-slate-50 cursor-pointer">
              <div className="relative cursor-pointer w-fit">
                <div className="absolute -top-1 right-0 z-10 h-4 w-4 rounded-full bg-green-500 border border-white"></div>
                <Avatar className="size-10 border border-slate-400  bg-white">
                  <AvatarImage
                    src={
                      "https://png.pngtree.com/png-clipart/20230522/original/pngtree-man-avatar-character-png-image_9168053.png"
                    }
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col justify-between">
                <span className="text-gray-500 text-sm font-medium">
                  Thành Trung
                </span>
                <p className="text-xs text-gray-400 line-clamp-1">
                  Hỗ trợ khách hàng xử lí yêu cầu về tài khoản ngân hang
                </p>
              </div>
            </div>
            <div className="flex gap-x-2 px-3 py-3 border-b border-gray-100 hover:bg-slate-50 cursor-pointer">
              <div className="relative cursor-pointer w-fit">
                <div className="absolute -top-1 right-0 z-10 h-4 w-4 rounded-full bg-green-500 border border-white"></div>
                <Avatar className="size-10 border border-slate-400  bg-white">
                  <AvatarImage
                    src={
                      "https://png.pngtree.com/png-clipart/20230522/original/pngtree-man-avatar-character-png-image_9168053.png"
                    }
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col justify-between">
                <span className="text-gray-500 text-sm font-medium">
                  Thành Trung
                </span>
                <p className="text-xs text-gray-400 line-clamp-1">
                  Hỗ trợ khách hàng xử lí yêu cầu về tài khoản ngân hang
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-md p-6 bg-white border-gray-200 border shadow-md flex-auto"></div>
      </div>
    </div>
  );
};

export default MessagesPage;
