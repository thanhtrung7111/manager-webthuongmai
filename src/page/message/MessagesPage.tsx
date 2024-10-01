import BreadcrumbCustom from "@/component_common/breadcrumb/BreadcrumbCustom";
import ButtonForm from "@/component_common/commonForm/ButtonForm";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";

const MessagesPage = () => {
  const [openFile, setOpenFile] = useState<boolean>(false);
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

        <div className="rounded-md h-full bg-white border-gray-200 border shadow-md flex-auto flex p-6">
          <div className="flex-auto flex flex-col">
            {/* header  */}
            <div className="flex items-center justify-between border-b pb-4 border-gray-100">
              <div className="flex items-center gap-x-3">
                <div className="relative cursor-pointer w-fit">
                  <div className="absolute -top-1 right-0 z-10 h-4 w-4 rounded-full bg-green-500 border border-white"></div>
                  <Avatar className="size-11 border border-slate-200  bg-white">
                    <AvatarImage
                      src={
                        "https://png.pngtree.com/png-clipart/20230522/original/pngtree-man-avatar-character-png-image_9168053.png"
                      }
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <span className="text-gray-600 text-lg">Nguyễn Văn Tín</span>
              </div>
              <div className="flex items-center gap-x-4">
                <div className="text-base text-gray-600 cursor-pointer">
                  <i className="ri-phone-fill"></i>
                </div>
                <div className="text-base text-gray-600 cursor-pointer">
                  <i className="ri-video-on-fill"></i>
                </div>
                <div
                  className="text-base text-gray-600 cursor-pointer"
                  onClick={() => setOpenFile(!openFile)}
                >
                  <i className="ri-menu-line"></i>
                </div>
              </div>
            </div>

            {/* body  */}
            <div className="py-4 flex-auto">
              <ScrollArea className="h-full w-full  rounded-md py-2 px-1">
                <div className="flex flex-col gap-y-1">
                  <div className="flex gap-x-2 items-start">
                    <Avatar className="size-10 border border-slate-400  bg-white">
                      <AvatarImage
                        src={
                          "https://png.pngtree.com/png-clipart/20230522/original/pngtree-man-avatar-character-png-image_9168053.png"
                        }
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="border bg-gray-50 border-gray-200 shadow-sm w-fit max-w-52 rounded-lg p-2 px-3 text-sm text-gray-700 self-start ">
                      Hello
                    </div>
                  </div>
                  <div className="border border-gray-200 shadow-sm w-fit max-w-52 rounded-lg p-2 px-3 text-sm text-gray-700 self-end bg-white">
                    Tôi cần giúp đỡ. Tôi có một đơn hàng đang chờ xử lí
                  </div>

                  <div className="flex gap-x-2 items-start">
                    <Avatar className="size-10 border border-slate-400  bg-white">
                      <AvatarImage
                        src={
                          "https://png.pngtree.com/png-clipart/20230522/original/pngtree-man-avatar-character-png-image_9168053.png"
                        }
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="border bg-gray-50 border-gray-200 shadow-sm w-fit max-w-52 rounded-lg p-2 px-3 text-sm text-gray-700 self-start ">
                      Đang có một đơn hàng đang giao tới bạn. Vui lòng chờ điện
                      thoại để ship có thể liên hệ khi đơn hàng tới nơi!
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>

            {/* footer  */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center gap-x-2">
                <div className="text-gray-500 cursor-pointer">
                  <i className="ri-image-add-line"></i>
                </div>
                <div className="text-gray-500 cursor-pointer">
                  <i className="ri-attachment-2"></i>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  className="outline-none flex-auto"
                  placeholder="Nhập tin nhắn..."
                />
                <div>
                  <ButtonForm
                    className="!bg-primary !w-16"
                    type="button"
                    label="Gửi"
                  ></ButtonForm>
                </div>
              </div>
            </div>
          </div>
          <div
            id="tabFile"
            className={`w-0 overflow-hidden ${
              openFile ? "w-72 pl-5 ml-5" : "w-0 pl-0 border-none"
            } border-l border-gray-100 transition-[width]`}
          >
            <Tabs defaultValue="image" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="image">image</TabsTrigger>
                <TabsTrigger value="file">file</TabsTrigger>
              </TabsList>
              <TabsContent value="image">
                <div className="grid grid-cols-3 gap-1">
                  <AspectRatio ratio={16 / 9} className="bg-muted">
                    <img
                      src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-dep-thien-nhien-2-1.jpg"
                      className="object-cover object-center h-16"
                    />
                  </AspectRatio>
                  <AspectRatio ratio={16 / 9} className="bg-muted">
                    <img
                      src="https://i.9mobi.vn/cf/images/2015/03/nkk/anh-dep-thien-nhien-15.jpg"
                      className="object-cover object-center h-16"
                    />
                  </AspectRatio>
                  <AspectRatio ratio={16 / 9} className="bg-muted">
                    <img
                      src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-dep-thien-nhien-2-1.jpg"
                      className="object-cover object-center h-16"
                    />
                  </AspectRatio>
                </div>
              </TabsContent>
              <TabsContent value="file" className="flex flex-col gapy">
                <div className="flex hover:bg-gray-50 cursor-pointer">
                  <div className="shrink-0">
                    <img
                      className="h-14 w-12 object-contain"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Pdf-2127829.png/600px-Pdf-2127829.png"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <span className="text-sm text-gray-600">
                      Filecongviec.xlsx
                    </span>
                    <span className="text-sm text-gray-700">5.8MB</span>
                  </div>
                </div>
                <div className="flex hover:bg-gray-50 cursor-pointer">
                  <div className="shrink-0">
                    <img
                      className="h-14 w-12 object-contain"
                      src="https://e1.pngegg.com/pngimages/1012/471/png-clipart-simply-styled-icon-set-731-icons-free-word-2013-microsoft-word-logo-thumbnail.png"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <span className="text-sm text-gray-600">
                      tiendocongviec.docx
                    </span>
                    <span className="text-sm text-gray-700">5.8MB</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
