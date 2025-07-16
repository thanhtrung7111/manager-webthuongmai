import { useEffect, useState } from "react";
import Menu from "./Menu";
import IconCompany from "@/assets/img/iconcompany.png";
import { useConfigurationStore } from "@/store/configurationStore";
import { useUserStore } from "@/store/userStore";
const menu: any[] = [
  {
    itemName: "Dashboard",
    // itemList: [
    //   {
    //     itemName: "Biểu đồ",
    //     itemIcon: <i className="ri-dashboard-line"></i>,
    //     link: "/",
    //     itemList: [
    //       {
    //         itemName: "Sản phẩm",
    //         itemIcon: <i className="ri-instance-line"></i>,
    //         link: "/dashboard_product",
    //       },
    //       {
    //         itemName: "Doanh thu",
    //         itemIcon: <i className="ri-advertisement-line"></i>,
    //         link: "/dashboard_revenue",
    //       },
    //     ],
    //   },
    //   {
    //     itemName: "Người dùng",
    //     itemIcon: <i className="ri-shape-2-line"></i>,
    //     itemList: [
    //       {
    //         itemName: "Danh sách sản phẩm",
    //         itemIcon: <i className="ri-instance-line"></i>,
    //       },
    //       {
    //         itemName: "Tạo mới",
    //         itemIcon: <i className="ri-file-add-line"></i>,
    //         link: "/create_product",
    //       },
    //     ],
    //   },
    //   {
    //     itemName: "Loại hàng",
    //     link: "/account",
    //     itemIcon: <i className="ri-command-line"></i>,
    //   },
    // ],
  },
  {
    itemName: "Quản lí chung",
    itemList: [
      {
        itemName: "Sản phẩm",
        itemIcon: <i className="ri-instance-line"></i>,
        itemList: [
          {
            itemName: "Danh sách sản phẩm",
            itemIcon: <i className="ri-instance-line"></i>,
            link: "/product",
          },
          // {
          //   itemName: "Tạo mới",
          //   itemIcon: <i className="ri-file-add-line"></i>,
          //   link: "/create_product",
          // },
        ],
      },
      {
        itemName: "Bài viết",
        itemIcon: <i className="ri-instance-line"></i>,
        itemList: [
          {
            itemName: "Bài viết",
            itemIcon: <i className="ri-instance-line"></i>,
            link: "/post",
          },

          {
            itemName: "Tag bài viết",
            itemIcon: <i className="ri-file-add-line"></i>,
            link: "/post_tag",
          },
        ],
      },
      {
        itemName: "Quảng cáo",
        itemIcon: <i className="ri-advertisement-line"></i>,
        link: "/advertisement",
      },

      {
        itemName: "Khuyến mãi",
        itemIcon: <i className="ri-ticket-2-line"></i>,
        link: "/promotion",
      },
      {
        itemName: "Tin nhắn",
        itemIcon: <i className="ri-advertisement-line"></i>,
        link: "/messages",
      },
      {
        itemName: "Kí tài liệu",
        itemIcon: <i className="ri-file-list-3-line"></i>,
        link: "/sign_pdf",
      },
      // {
      //   itemName: "Kí văn bản",
      //   itemIcon: <i className="ri-sketching"></i>,
      //   link: "/authen_signature",
      // },
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
const Sidebar = () => {
  const [open, setOpen] = useState<boolean>(true);
  const { currentUser, logoutUser } = useUserStore();
  const [delayOpen, setDelayOpen] = useState<boolean>(false);
  const { keyTheme } = useConfigurationStore((state) => state.themeConfig);
  useEffect(() => {
    setDelayOpen(true);
    setTimeout(() => {
      setDelayOpen(false);
    }, 500);
  }, [open]);
  return (
    <div
      className={`hidden shrink-0 shadow-lg  lg:flex ${
        !open ? "w-20" : "w-64"
      } bg-clr-sidebar  flex-col justify-between sticky top-0 transition-[width] duration-500 z-[20]`}
    >
      <div className="border-b py-5 px-6 flex gap-x-3 items-center">
        <div
          className={`rounded-md flex-shrink-0 size-9 overflow-hidden`}
        >
          <img
            className="object-center object-cover h-full w-full"
            src="https://plus.unsplash.com/premium_photo-1689708721750-8a0e6dc14cee?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWFuJTIwYXZhdGFyfGVufDB8fDB8fHww"
            alt=""
          />
        </div>

        <div className={`flex flex-auto flex-col ${open ? "h-full" : "h-0"} overflow-hidden`}>
          <h5 className="text-clr-content whitespace-nowrap text-sm">{currentUser?.USERNAME}</h5>
          <span className="text-xs text-clr-content whitespace-nowrap">
            {currentUser?.JOB_NAME}
          </span>
        </div>
      </div>

      <div
        className={`absolute w-8 h-8 top-7 -translate-y-1/2 bg-clr-navbar -translate-x-1/2 -right-6 border border-clr-content-light  rounded-sm flex items-center justify-center z-10 cursor-pointer`}
        onClick={() => setOpen(!open)}
      >
        <i
          className={`ri-arrow-right-s-line ${
            open ? "-rotate-180" : "rotate-0"
          } transition-transform duration-300 text-clr-menu`}
        ></i>
      </div>

      <div className="flex flex-col flex-auto">
        {/* <div
          // className={`${!open && "px-1"} h-20
          // bg-gradient-to-r from-[#fdcca8] to-[#007c63]
          //  flex justify-center
          // `}
          className={`${!open && "px-1"} h-16
          bg-secondary
           flex justify-center
           shadow-sm
          `}
        >
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center ${
                open ? "p-2 px-6" : "p-2"
              }  w-fit border-gray-500 bg-white rounded-full shadow-custom-sm shadow-gray-500`}
            >
              <img src={IconCompany} alt="" className="w-full max-w-16" />
            </div>
          </div>
        </div> */}
        <div
          className={`flex-auto h-96 ${
            open && "custom-scrollbar overflow-y-scroll"
          }`}
        >
          <div
            className={`px-5 pt-5`}
          >
            <Menu
              linkName={"link"}
              compact={!open}
              list={menu}
              levelBegin={1}
              iconName={"itemIcon"}
              listName={"itemList"}
              name={"itemName"}
            ></Menu>
          </div>
        </div>
      </div>
      {/* <div
        className={`${open ? "px-5" : "px-2"} ${
          delayOpen ? "invisible" : "visible"
        } pt-10 pb-6`}
      >
        <Menu
          linkName={"link"}
          compact={!open}
          list={menu2}
          levelBegin={2}
          iconName={"itemIcon"}
          listName={"itemList"}
          name={"itemName"}
        ></Menu>
      </div> */}
    </div>
  );
};

export default Sidebar;
