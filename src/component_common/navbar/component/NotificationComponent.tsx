import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NotificationComponent = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <div className="relative">
          <i className="ri-notification-line text-xl"></i>
          <div className="absolute -top-2 -right-2 size-5 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-thin text-xs">1</span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72">
        <DropdownMenuLabel>Thông báo</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer py-2">
            <div className="flex justify-between gap-x-1">
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
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer py-2">
            <div className="flex justify-between gap-x-1">
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
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer bg-slate-100 py-2">
            <div className="flex justify-between gap-x-1">
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
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationComponent;
