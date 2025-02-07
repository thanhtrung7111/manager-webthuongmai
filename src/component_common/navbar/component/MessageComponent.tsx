import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const MessageComponent = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative cursor-pointer">
          <i className="ri-message-3-line text-xl text-gray-700"></i>
          <div className="absolute -top-2 -right-2 size-5 border-2 border-white bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-[10px]">1</span>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="px-3 py-2 border-b text-sm flex justify-between items-center">
          <p className="text-gray-700 font-medium">Tin nhắn</p>
          <p className="text-gray-700 text-xs cursor-pointer hover:text-primary transition-colors">Đánh dấu đã đọc</p>
        </div>
        <div className="grid">
          <div className="cursor-pointer py-3 px-3">
            <div className="flex justify-between gap-x-3">
              <div className="size-9 flex-shrink-0">
                <Avatar className="size-10">
                  <AvatarImage src="https://cdn-icons-png.flaticon.com/512/6858/6858504.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-auto line-clamp-2">
                <span className="font-medium text-sm">Đỗ Thành Trung</span>
                <p className="line-clamp-1 text-xs">
                  <span>Bạn:</span> tài khoản của bạn hiện bị khóa
                </p>
              </div>
            </div>
          </div>
          <div className="cursor-pointer bg-slate-100 py-3 px-3">
            <div className="flex justify-between gap-x-3">
              <div className="size-9 flex-shrink-0">
                <Avatar className="size-10">
                  <AvatarImage src="https://cdn-icons-png.flaticon.com/512/147/147144.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-auto line-clamp-2">
                <span className="font-medium text-sm">Nguyễn Văn Tín</span>
                <p className="text-xs line-clamp-1">
                  Em đã chuyển khoản sao vẫn chưa có thông tin thanh toán
                </p>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MessageComponent;
