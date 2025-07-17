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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getLabelByKey } from "@/helper/commonHelper";
import { useConfigurationStore } from "@/store/configurationStore";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useGetDocument } from "@/api/react_query/query_document";
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

const lstTheme: {
  theme: string;
  themeIcon?: React.ReactNode;
  color?: string;
}[] = [
  {
    theme: "Dark",
    themeIcon: <i className="ri-moon-fill"></i>,
  },
  {
    theme: "Light",
    themeIcon: <i className="ri-sun-fill text-yellow-400"></i>,
  },
  {
    theme: "Default",
    color: "#009578",
  },
];
const Navbar = () => {
  const [openLanguage, setOpenLanguage] = useState<boolean>(false);
  const [openTheme, setOpenTheme] = useState<boolean>(false);
  const { currentUser, logoutUser } = useUserStore();
  const getImage = useGetDocument({
    url: currentUser?.USERIMGE ?? "",
    enabled: currentUser != null && currentUser?.USERIMGE != null,
  });
  const { setKeyLanguages, setLanguages, keyLanguage } = useConfigurationStore(
    (state) => state.languageConfig
  );

  const { setTheme, keyTheme } = useConfigurationStore(
    (state) => state.themeConfig
  );
  const isMobileScreen = useMediaQuery({ query: "(max-width:1024px)" });

  return (
    <div className="sticky shrink-0 top-0 z-50 bg-clr-navbar bg-w shadow-md h-16 border-gray-200 px-7 flex justify-between items-center">
      <div className="flex items-center gap-x-2">
        {isMobileScreen && (
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="outline-none py-1 px-3 h-fit"
              >
                <i className="ri-menu-line text-clr-menu"></i>
              </Button>
            </SheetTrigger>
            <SheetContent
              side={"left"}
              className="flex flex-col justify-between px-0 bg-clr-sidebar  text-clr-menu"
            >
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

        <NavLink to={"/"} className="flex items-center">
          <div
            className={`py-2 px-2 rounded-lg bg-white flex items-center justify-center w-fit shadow-gray-500`}
          >
            <img src={IconCompany} alt="" className="w-full max-w-24" />
          </div>
        </NavLink>

        {/* <p className="text-white italic">Xin chào, {currentUser?.USERNAME}...</p> */}
      </div>
      <div className="flex gap-x-5 items-center">
        <div className="flex gap-x-5 items-center">
          <SearchComponent></SearchComponent>
          <MessageComponent></MessageComponent>
          <NotificationComponent></NotificationComponent>
        </div>

        <Popover>
          <PopoverTrigger asChild className="cursor-pointer">
            <div className="flex gap-x-3 items-center">
              <Avatar className="size-8">
                <AvatarImage
                  src={getImage.data ? URL.createObjectURL(getImage.data) : ""}
                  className="object-cover object-center"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {/* <div className="flex flex-col text-gray-600">
                <span className="font-medium text-clr-menu text-sm">
                  {currentUser?.USERNAME}
                </span>
                <span className="text-xs line-clamp-1 text-clr-menu italic">
                  {currentUser?.PSTNNAME}
                </span>
              </div> */}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0 text-sm" align="end">
            <div
              // onClick={() => logoutUser()}
              className="flex gap-x-2 text-gray-500 cursor-pointer hover:bg-gray-100 px-2 py-2 border-b border-gray-200"
            >
              <i className="ri-user-line"></i>
              Thông tin cá nhân
            </div>
            <Popover open={openLanguage}>
              <PopoverTrigger asChild>
                <div
                  onClick={() => setOpenLanguage(!openLanguage)}
                  className="flex gap-x-2 justify-between items-center text-gray-500 cursor-pointer hover:bg-gray-100 px-2 py-2 border-b border-gray-200"
                >
                  <div className="flex gap-x-2">
                    <i className="ri-global-line"></i>
                    {getLabelByKey({ key: 10000, defaultLabel: "Ngôn ngữ" })}
                  </div>
                  <div className="font-semibold flex gap-x-2 items-center text-xs">
                    {keyLanguage == "V" ? "Việt Nam" : "England"}
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-40 p-0" align="end">
                <div className="grid">
                  <div
                    onClick={() => {
                      setKeyLanguages({ key: "V" });
                      setOpenLanguage(false);
                    }}
                    className={`flex items-center gap-x-2 px-2 py-2 cursor-pointer hover:bg-gray-100`}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/255px-Flag_of_Vietnam.svg.png"
                      alt=""
                      className="h-5 w-8"
                    />
                    <span className="text-xs text-gray-500">
                      {" "}
                      {keyLanguage == "V" ? "Việt Nam" : "Vietnamese"}
                    </span>
                  </div>
                  <div
                    onClick={() => {
                      setKeyLanguages({ key: "E" });
                      setOpenLanguage(false);
                    }}
                    className="flex items-center gap-x-2 px-2 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    <img
                      src="https://cdn.britannica.com/73/4473-050-0D875725/Grand-Union-Flag-January-1-1776.jpg"
                      alt=""
                      className="h-5 w-8"
                    />
                    <span className="text-xs text-gray-500">Tiếng Anh</span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Popover open={openTheme}>
              <PopoverTrigger asChild onClick={() => setOpenTheme(!openTheme)}>
                <div
                  className="flex gap-x-2 justify-between text-gray-500 cursor-pointer hover:bg-gray-100 px-2 py-2 border-b border-gray-200"
                  // onClick={() =>
                  //   keyTheme.toLocaleLowerCase() == "dark"
                  //     ? setTheme({ theme: "Light" })
                  //     : setTheme({ theme: "Dark" })
                  // }
                >
                  <div className="flex items-center gap-x-2">
                    {
                      lstTheme.find(
                        (item) =>
                          item.theme.toLowerCase() === keyTheme.toLowerCase()
                      )?.themeIcon
                    }
                    {lstTheme.find(
                      (item) =>
                        item.theme.toLowerCase() === keyTheme.toLowerCase()
                    )?.color && (
                      <div
                        className="rounded-full size-3"
                        style={{
                          backgroundColor: lstTheme.find(
                            (item) =>
                              item.theme.toLowerCase() ===
                              keyTheme.toLowerCase()
                          )?.color,
                        }}
                      ></div>
                    )}
                    Theme
                  </div>
                  <div className="font-medium">{keyTheme}</div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-40 p-0" align="end">
                <div className="grid">
                  {lstTheme.map((item) => {
                    return (
                      <div
                        onClick={() => {
                          setTheme({ theme: item.theme });
                          setOpenTheme(false);
                        }}
                        className={`flex items-center gap-x-3 px-2 py-2 cursor-pointer  hover:bg-gray-100`}
                      >
                        {item?.themeIcon}
                        {item.color && (
                          <div
                            className="rounded-full size-4"
                            style={{
                              backgroundColor: item.color,
                            }}
                          ></div>
                        )}
                        <span className="text-xs text-clr-content font-medium">
                          {item.theme}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </PopoverContent>
            </Popover>

            <div
              onClick={() => logoutUser()}
              className="flex gap-x-2 text-gray-500 cursor-pointer hover:bg-gray-100 px-2 py-2 border-b border-gray-200"
            >
              <i className="ri-logout-box-line"></i>
              {getLabelByKey({ key: 10000, defaultLabel: "Đăng xuất" })}
            </div>
          </PopoverContent>
        </Popover>
        {/* <Popover>
          <PopoverTrigger asChild className="cursor-pointer">
            <i className="ri-global-line"></i>
            Tiếng Việt
          </PopoverTrigger>
          <PopoverContent className="w-52 p-0 text-sm" align="end">
            <div
              // onClick={() => logoutUser()}
              className="flex gap-x-2 text-gray-500 cursor-pointer hover:bg-gray-100 px-2 py-2"
            >
              <img
                src="https://media.istockphoto.com/id/1849848209/vi/vec-to/qu%E1%BB%91c-k%E1%BB%B3-vi%E1%BB%87t-nam-t%E1%BB%B7-l%E1%BB%87-khung-h%C3%ACnh-ch%C3%ADnh-x%C3%A1c-c%E1%BB%A7a-qu%E1%BB%91c-k%E1%BB%B3-m%C3%A0u-s%E1%BA%AFc-ch%C3%ADnh-th%E1%BB%A9c-vector-minh-h%E1%BB%8Da.jpg?s=612x612&w=0&k=20&c=h76ccQXC75_T_queCCQeWIgutnocGEKfgZ3mw-S1-co="
                className="h-6 w-10 object-center object-cover"
                alt=""
              />
              Tiếng việt
            </div>
            <div
              onClick={() => logoutUser()}
              className="flex gap-x-2 text-gray-500 cursor-pointer hover:bg-gray-100 px-2 py-2"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1200px-Flag_of_the_United_Kingdom_%281-2%29.svg.png"
                alt=""
                className="h-6 w-10 object-center object-cover"
              />
              Tiếng anh
            </div>
          </PopoverContent>
        </Popover> */}
      </div>
    </div>
  );
};

export default Navbar;
