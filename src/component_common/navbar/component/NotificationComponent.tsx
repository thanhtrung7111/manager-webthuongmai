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

const NotificationComponent = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative cursor-pointer">
          <i className="ri-notification-line text-xl text-gray-700"></i>
          <div className="absolute -top-2 -right-2 size-5 bg-orange-500 border-2 border-white rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-[10px]">1</span>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="px-3 py-2 border-b text-sm flex justify-between items-center">
          <p className="text-gray-700 font-medium">Thông báo</p>
          <p className="text-gray-700 text-xs cursor-pointer hover:text-primary transition-colors">
            Đánh dấu đã đọc
          </p>
        </div>
        <div className="grid text-xs">
          <div className="cursor-pointer py-2">
            <div className="flex justify-between gap-x-1 px-3">
              <div className="size-9 flex-shrink-0">
                <img
                  className="w-full h-full"
                  src="https://png.pngtree.com/png-vector/20190725/ourlarge/pngtree-invoice-icon-design-vector-png-image_1586820.jpg"
                  alt=""
                />
              </div>
              <p className="flex-auto line-clamp-2">
                Người dùng <span className="font-semibold">Đỗ Thành Trung</span>{" "}
                vừa đặt hàng thành công!
              </p>
            </div>
          </div>
          <div className="cursor-pointer py-2">
            <div className="flex justify-between gap-x-1 px-3">
              <div className="size-9 flex-shrink-0">
                <img
                  className="w-full h-full"
                  src="https://png.pngtree.com/png-vector/20190725/ourlarge/pngtree-invoice-icon-design-vector-png-image_1586820.jpg"
                  alt=""
                />
              </div>
              <p className="flex-auto  line-clamp-2">
                Người dùng
                <span className="font-semibold"> Nguyễn Văn Thanh</span> vừa đặt
                hàng thành công!
              </p>
            </div>
          </div>
          <div className="cursor-pointer bg-slate-100 py-2">
            <div className="flex justify-between gap-x-1 px-3">
              <div className="size-9 flex-shrink-0">
                <img
                  className="w-full h-full"
                  src="https://png.pngtree.com/png-vector/20190725/ourlarge/pngtree-invoice-icon-design-vector-png-image_1586820.jpg"
                  alt=""
                />
              </div>
              <p className="flex-auto  line-clamp-2">
                Người dùng
                <span className="font-semibold"> Dinh Văn Định</span> vừa đặt
                hàng thành công!
              </p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationComponent;
