import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MessageComponent = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <div className="relative">
          <i className="ri-message-3-line text-xl"></i>
          <div className="absolute -top-2 -right-2 size-5 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-thin text-xs">1</span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72">
        <DropdownMenuLabel>Tin nhắn</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer py-2">
            <div className="flex justify-between gap-x-3">
              <div className="size-9 flex-shrink-0">
                <Avatar className="size-10">
                  <AvatarImage src="https://cdn-icons-png.flaticon.com/512/6858/6858504.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-auto line-clamp-2">
                <span className="font-medium">Đỗ Thành Trung</span>
                <p className="text-xs line-clamp-1">
                  <span>Bạn:</span> tài khoản của bạn hiện bị khóa
                </p>
              </div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer bg-slate-100 py-2">
            <div className="flex justify-between gap-x-3">
              <div className="size-9 flex-shrink-0">
                <Avatar className="size-10">
                  <AvatarImage src="https://cdn-icons-png.flaticon.com/512/147/147144.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-auto line-clamp-2">
                <span className="font-medium">Nguyễn Văn Tín</span>
                <p className="text-xs line-clamp-1">
                  Em đã chuyển khoản sao vẫn chưa có thông tin thanh toán
                </p>
              </div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MessageComponent;
