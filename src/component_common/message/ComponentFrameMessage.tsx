import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import MessageFrame from "./component/MessageFrame";
import { MessageObject, useMessageStore } from "@/store/messageStore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const data: MessageObject[] = [
  {
    id: "1",
    name: "Thành Trung",
    minimizeFrame: true,
    image:
      "https://png.pngtree.com/png-clipart/20230522/original/pngtree-man-avatar-character-png-image_9168053.png",
  },
  {
    id: "2",
    name: "Trương Thanh Quân",
    minimizeFrame: false,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkH3G1mRTQuNbynLaRPHQAh6g_KGbWhr9h-w&s",
  },
  {
    id: "3",
    name: "Nguyễn Văn Bảy",
    minimizeFrame: false,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkH3G1mRTQuNbynLaRPHQAh6g_KGbWhr9h-w&s",
  },
  {
    id: "4",
    name: "Trần Thái Quý",
    minimizeFrame: false,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkH3G1mRTQuNbynLaRPHQAh6g_KGbWhr9h-w&s",
  },
  {
    id: "5",
    name: "Phan Công Khá",
    minimizeFrame: false,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkH3G1mRTQuNbynLaRPHQAh6g_KGbWhr9h-w&s",
  },
];

const ComponentFrameMessage = () => {
  const { addFrameMessage, messages, openFrameMessage } = useMessageStore(
    (state) => state
  );
  const addFrame = (id: string): void => {
    const findItem = data.find((item) => item.id == id);
    if (findItem) {
      addFrameMessage(findItem);
    }
  };
  console.log(messages);
  return (
    <div className="fixed bottom-0 right-0 z-20 flex items-end">
      <div className="flex gap-x-2 items-end">
        {messages
          .filter((item) => item.minimizeFrame == true)
          .map((item: MessageObject) => {
            return (
              <MessageFrame
                key={item.id}
                name={"name"}
                id={"id"}
                messageObject={item}
                image={"image"}
              ></MessageFrame>
            );
          })}
      </div>
      <div className="px-8 pb-10 flex flex-col gap-y-3 h-fit">
        {messages
          .filter((item) => !item.minimizeFrame)
          .map((item: MessageObject) => {
            return (
              <div
                className="relative cursor-pointer group:"
                onClick={() => openFrameMessage(item.id)}
              >
                {/* <div className="absolute -top-1 right-0 z-20 border border-white">
                  <i className="ri-close-line text-gray-600"></i>
                </div> */}
                <div className="absolute -top-1 right-0 z-10 h-4 w-4 rounded-full bg-green-500 border border-white"></div>
                <Avatar className="size-12 border border-slate-400 bg-white">
                  <AvatarImage src={item.image} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            );
          })}

        <Popover>
          <PopoverTrigger asChild>
            <div className="relative cursor-pointer">
              <div className="size-12 flex items-center justify-center shadow-md bg-gray-500 rounded-full">
                <i className="ri-message-3-fill text-gray-100"></i>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80 flex flex-col mr-10">
            <h5 className="text-gray-600 mb-2">Danh sách nhắn tin</h5>
            {data.map((item: MessageObject) => {
              return (
                <div
                  className="flex cursor-pointer gap-x-1 p-3 hover:bg-gray-100 rounded-md"
                  onClick={() => addFrame(item.id)}
                >
                  <div className="relative cursor-pointer  w-fit">
                    <div className="absolute -top-1 right-0 z-10 h-4 w-4 rounded-full bg-green-500 border border-white"></div>
                    <Avatar className="size-10 border border-slate-400  bg-white">
                      <AvatarImage src={item.image} alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <span className="text-gray-600">{item.name}</span>
                </div>
              );
            })}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default ComponentFrameMessage;
