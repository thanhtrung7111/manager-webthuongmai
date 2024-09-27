import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMessageStore } from "@/store/messageStore";
import React from "react";
type MessageObject = {
  [key: string]: any;
};

const MessageFrame = ({
  messageObject,
  name,
  id,
  image,
}: {
  messageObject: MessageObject;
  name: keyof MessageObject;
  id: keyof MessageObject;
  image: keyof MessageObject;
}) => {
  const { deleteFrameMessage, minimizeFrameMessage } = useMessageStore();
  return (
    <div>
      <div className="w-80 border border-gray-200">
        <div className="text-white bg-secondary flex items-center px-3 py-2 justify-between">
          <div className="flex items-center gap-x-2">
            <div className="relative cursor-pointer ">
              <div className="absolute top-0 -right-1 z-10 h-3 w-3 rounded-full bg-green-500 border border-white"></div>
              <Avatar className="size-7 border border-slate-200 bg-white">
                <AvatarImage src={messageObject[image]} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <span className="text-sm">{messageObject[`${name}`]}</span>
          </div>
          <div className="flex items-center gap-x-3">
            <div className="cursor-pointer">
              <i className="ri-phone-fill"></i>
            </div>
            <div className="cursor-pointer">
              <i className="ri-video-on-fill"></i>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => minimizeFrameMessage(messageObject[id])}
            >
              <i className="ri-subtract-line"></i>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => deleteFrameMessage(messageObject[id])}
            >
              <i className="ri-close-line"></i>
            </div>
          </div>
        </div>
        <ScrollArea className="h-80 w-full  rounded-md py-2 px-1 bg-gray-100">
          <div className="flex flex-col gap-y-1">
            <div className="border bg-gray-50 border-gray-200 shadow-sm w-fit max-w-52 rounded-lg p-2 px-3 text-sm text-gray-700 self-start ">
              Hello
            </div>

            <div className="border border-gray-200 shadow-sm w-fit max-w-52 rounded-lg p-2 px-3 text-sm text-gray-700 self-end bg-white">
              Tôi cần giúp đỡ. Tôi có một đơn hàng đang chờ xử lí
            </div>

            <div className="border bg-gray-50 border-gray-200 shadow-sm w-fit max-w-52 rounded-lg p-2 px-3 text-sm text-gray-700 self-start ">
              Đang có một đơn hàng đang giao tới bạn. Vui lòng chờ điện thoại để
              ship có thể liên hệ khi đơn hàng tới nơi!
            </div>
          </div>
        </ScrollArea>
        <div className="bg-white border-t border-gray-200 py-1 px-3 flex items-center gap-x-1">
          <div className="text-gray-300">
            <i className="ri-add-circle-fill text-2xl"></i>
          </div>
          <input
            type="text"
            placeholder="Nhập tin nhắn..."
            className="text-sm outline-none flex-auto text-gray-600"
          />
          <div className="text-secondary">
            <i className="ri-send-plane-fill text-xl"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageFrame;
