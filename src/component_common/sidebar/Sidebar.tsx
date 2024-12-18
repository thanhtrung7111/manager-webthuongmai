import { useState } from "react";
import Menu from "./Menu";
import IconCompany from "@/assets/img/iconcompany.png";
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
          {
            itemName: "Tạo mới",
            itemIcon: <i className="ri-file-add-line"></i>,
            link: "/create_product",
          },
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
        itemName: "Yêu cầu xác thực",
        itemIcon: <i className="ri-file-list-3-line"></i>,
        link: "/sign_pdf",
      },
      {
        itemName: "Kí văn bản",
        itemIcon: <i className="ri-sketching"></i>,
        link: "/authen_signature",
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
const Sidebar = () => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div
      className={`hidden shrink-0 lg:flex ${
        !open ? "w-20" : "w-64"
      } border-r bg-white  flex-col justify-between border-gray-100 h-screen sticky top-0 transition-[width] duration-300 z-[20]`}
    >
      {/* <div
        className={`absolute w-8 h-8 top-32 -translate-y-1/2 -translate-x-1/2 -right-6   border border-gray-300 rounded-sm flex items-center justify-center z-10 bg-white cursor-pointer`}
        onClick={() => setOpen(!open)}
      >
        <i
          className={`ri-arrow-right-s-line ${
            open ? "-rotate-180" : "rotate-0"
          } transition-transform duration-300`}
        ></i>
      </div> */}

      <div className="flex flex-col flex-auto">
        <div
          className={`${
            !open && "px-1"
          } h-20 bg-gradient-to-r from-[#C7977C] to-[#09B291] flex justify-center`}
        >
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center ${
                open ? "p-2 px-5" : "p-2"
              } bg-white w-fit border-gray-500 rounded-full shadow-custom-sm shadow-gray-500`}
            >
              <img src={IconCompany} alt="" className="w-full max-w-20" />
            </div>
          </div>
        </div>
        <div
          className={`flex-auto h-96 border-b border-slate-100 ${
            open && "custom-scrollbar overflow-y-scroll"
          }`}
        >
          <div className={`${open ? "px-5" : "px-2"} pt-5`}>
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
      <div className={`${open ? "px-5" : "px-2"} pt-10 pb-6`}>
        <Menu
          linkName={"link"}
          compact={!open}
          list={menu2}
          levelBegin={2}
          iconName={"itemIcon"}
          listName={"itemList"}
          name={"itemName"}
        ></Menu>
      </div>
    </div>
  );
};

export default Sidebar;
