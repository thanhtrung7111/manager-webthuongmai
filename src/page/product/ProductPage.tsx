import BreadcrumbCustom from "@/component_common/breadcrumb/BreadcrumbCustom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import TableProduct from "./component/TableProduct";

const ProductPage = () => {
  const breadBrumb = [
    {
      itemName: "Quản lí chung",
    },
    {
      itemName: "Danh sách sản phẩm",
      itemLink: "/product",
    },
  ];
  return (
    <div className="flex flex-col gap-y-2">
      <div className="mb-3">
        <BreadcrumbCustom
          linkList={breadBrumb}
          itemName={"itemName"}
          itemLink={"itemLink"}
        ></BreadcrumbCustom>
      </div>

      {/* Action  */}
      <div className="flex justify-between items-center">
        <div className="flex gap-x-2">
          <Input
            placeholder="Nhập sản phẩm tìm kiếm"
            className="!ring-0 !ring-transparent bg-white w-[500px]"
          ></Input>
          <Button className="bg-white text-gray-600" variant={"outline"}>
            <i className="ri-search-line"></i>
          </Button>
        </div>
        <div className="flex gap-x-2">
          <Button className="transition-colors">
            <i className="ri-download-2-line mr-2"></i>Xuất excel
          </Button>
          <Button className="bg-green-600 hover:bg-green-500 transition-colors">
            Thêm mới
          </Button>
        </div>
      </div>

      {/* table */}
      <div>
        <TableProduct></TableProduct>
      </div>
    </div>
  );
};

export default ProductPage;
