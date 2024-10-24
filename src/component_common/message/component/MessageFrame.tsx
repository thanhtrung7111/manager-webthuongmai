import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMessageStore } from "@/store/messageStore";
import { useState } from "react";
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
  const [fileItem, setFileItem] = useState<File[]>([]);
  const { deleteFrameMessage, minimizeFrameMessage } = useMessageStore();
  return (
    <div>
      <div className="w-96 h-[400px] border border-gray-200 flex flex-col">
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
        <ScrollArea className="flex-auto w-full  rounded-md py-2 px-1 bg-gray-100">
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
            <div className="border bg-gray-50 border-gray-200 shadow-sm w-fit max-w-52 rounded-lg p-2 px-3 text-sm text-gray-700 self-start ">
              Đang có một đơn hàng đang giao tới bạn. Vui lòng chờ điện thoại để
              ship có thể liên hệ khi đơn hàng tới nơi!
            </div>
            <div className="border bg-gray-50 border-gray-200 shadow-sm w-fit max-w-52 rounded-lg p-2 px-3 text-sm text-gray-700 self-start ">
              Đang có một đơn hàng đang giao tới bạn. Vui lòng chờ điện thoại để
              ship có thể liên hệ khi đơn hàng tới nơi!
            </div>
            <div className="border bg-gray-50 border-gray-200 shadow-sm w-fit max-w-52 rounded-lg p-2 px-3 text-sm text-gray-700 self-start ">
              Đang có một đơn hàng đang giao tới bạn. Vui lòng chờ điện thoại để
              ship có thể liên hệ khi đơn hàng tới nơi!
            </div>
            <div className="border bg-gray-50 border-gray-200 shadow-sm w-fit max-w-52 rounded-lg p-2 px-3 text-sm text-gray-700 self-start ">
              Đang có một đơn hàng đang giao tới bạn. Vui lòng chờ điện thoại để
              ship có thể liên hệ khi đơn hàng tới nơi!
            </div>
          </div>
        </ScrollArea>
        <div className="bg-white border-t border-gray-200 py-1 px-3 flex-col items-center gap-y-10 shrink-0">
          {fileItem.length >= 1 && (
            <div className="flex gap-x-2 overflow-x-scroll custom-scrollbar-wider-x py-2">
              {fileItem.map((item: File, index: number) => {
                console.log(item);
                if (item.type.indexOf("image") >= 0) {
                  return (
                    <div
                      key={index}
                      className="p-2 bg-gray-100 relative group w-fit rounded-lg shrink-0"
                    >
                      <div
                        onClick={() =>
                          setFileItem([
                            ...fileItem.filter((i) => i.name != item.name),
                          ])
                        }
                        className="invisible opacity-0 group-hover:visible  group-hover:opacity-100 transition-[opacity_visibility] cursor-pointer absolute -top-2 -right-2 z-10 text-gray-800  hover:text-gray-700"
                      >
                        <i className="ri-close-circle-line text-lg"></i>
                      </div>
                      <img
                        className="w-20 h-11 object-cover object-center"
                        src={URL.createObjectURL(item)}
                        alt=""
                      />
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={index}
                      className="p-2 shrink-0 bg-gray-100 relative group w-fit flex gap-x-1  rounded-lg"
                    >
                      <div
                        onClick={() =>
                          setFileItem([
                            ...fileItem.filter((i) => i.name != item.name),
                          ])
                        }
                        className="invisible opacity-0 group-hover:visible  group-hover:opacity-100 transition-[opacity_visibility] cursor-pointer absolute -top-2 -right-2 z-10 text-gray-800  hover:text-gray-700"
                      >
                        <i className="ri-close-circle-line text-lg"></i>
                      </div>
                      <img
                        className="w-10 h-11 object-cover object-center"
                        src="https://static.vecteezy.com/system/resources/thumbnails/006/432/936/small/file-icon-design-vector.jpg"
                        alt=""
                      />
                      <div
                        className="w-24 break-words text-sm"
                        title="Quanlycongviec.docx"
                      >
                        {item.name}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          )}

          <div className="flex items-center gap-1">
            <div className="text-gray-500">
              <input
                type="file"
                id={messageObject[id] + "files"}
                hidden
                onChange={(e) => {
                  if (e.target.files && e.target.files?.length > 0) {
                    setFileItem([...fileItem, e.target.files[0]]);
                  }
                }}
              />
              <label
                htmlFor={messageObject[id] + "files"}
                className="cursor-pointer"
              >
                <i className="ri-add-circle-fill text-2xl"></i>
              </label>
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
    </div>
  );
};

export default MessageFrame;
