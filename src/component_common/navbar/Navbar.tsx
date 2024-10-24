import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchComponent from "./component/SearchComponent";
import NotificationComponent from "./component/NotificationComponent";
import MessageComponent from "./component/MessageComponent";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Menu from "../sidebar/Menu";
import { useMediaQuery } from "react-responsive";
import IconCompany from "@/assets/img/iconcompany.png";
import { useUserStore } from "@/store/userStore";
const menu = [
  {
    itemName: "Dashboard",
    itemList: [
      {
        itemName: "Biểu đồ",
        itemIcon: <i className="ri-dashboard-line"></i>,
        link: "/",
        itemList: [
          {
            itemName: "Sản phẩm",
            itemIcon: <i className="ri-instance-line"></i>,
            link: "/dashboard_product",
          },
          {
            itemName: "Doanh thu",
            itemIcon: <i className="ri-advertisement-line"></i>,
            link: "/dashboard_revenue",
          },
        ],
      },
      {
        itemName: "Người dùng",
        link: "/account",
        itemIcon: <i className="ri-shape-2-line"></i>,
      },
      {
        itemName: "Loại hàng",
        link: "/account",
        itemIcon: <i className="ri-command-line"></i>,
      },
    ],
  },
  {
    itemName: "Chung",
    itemList: [
      {
        itemName: "Sản phẩm",
        itemIcon: <i className="ri-instance-line"></i>,
        link: "/product",
      },
      {
        itemName: "Quảng cáo",
        itemIcon: <i className="ri-advertisement-line"></i>,
        link: "/advertisement",
      },
    ],
  },
];

const menu2 = [
  {
    itemName: "Cài đặt",
    itemIcon: <i className="ri-settings-2-line"></i>,
    link: "/setting",
  },
  {
    itemName: "Đăng xuất",
    itemIcon: <i className="ri-logout-box-line"></i>,
    link: "/logout",
  },
];
const Navbar = () => {
  const { currentUser, logoutUser } = useUserStore();
  const isMobileScreen = useMediaQuery({ query: "(max-width:1024px)" });
  console.log(currentUser);
  return (
    <div className="sticky shrink-0 top-0 z-10 bg-white shadow-lg border-b h-20 border-gray-200 px-5 py-4 flex justify-between items-center">
      <div className="flex items-center gap-x-2">
        {isMobileScreen && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="outline-none">
                <i className="ri-menu-line"></i>
              </Button>
            </SheetTrigger>
            <SheetContent
              side={"left"}
              className="flex flex-col justify-between px-0"
            >
              <div
                className={`flex items-center justify-center px-5 bg-white w-fit rounded-full`}
              >
                <img src={IconCompany} alt="" className="w-full max-w-24" />
              </div>
              <div
                className={`flex-auto border-b w-full px-5 border-slate-100 ${"custom-scrollbar overflow-y-scroll overflow-x-hidden"}`}
              >
                <div className={`pt-5`}>
                  <Menu
                    linkName={"link"}
                    compact={false}
                    list={menu}
                    levelBegin={1}
                    iconName={"itemIcon"}
                    listName={"itemList"}
                    name={"itemName"}
                  ></Menu>
                </div>
              </div>

              <div className={`pt-1 pb-6 px-5`}>
                <Menu
                  linkName={"link"}
                  compact={false}
                  list={menu2}
                  levelBegin={2}
                  iconName={"itemIcon"}
                  listName={"itemList"}
                  name={"itemName"}
                ></Menu>
              </div>
            </SheetContent>
          </Sheet>
        )}

        <SearchComponent></SearchComponent>
      </div>
      <div className="flex gap-x-5 items-center">
        <div className="flex gap-x-5">
          <MessageComponent></MessageComponent>
          <NotificationComponent></NotificationComponent>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <div className="flex gap-x-3 items-center">
              <Avatar className="size-9">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-gray-600">
                <span className="font-medium">{currentUser?.USERNAME}</span>
                <span className="text-sm line-clamp-1">
                  {currentUser?.PSTNNAME}
                </span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" side="bottom">
            <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                Thông tin tài khoản
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Đổi mật khẩu
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Cài đặt
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => logoutUser()}
            >
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
