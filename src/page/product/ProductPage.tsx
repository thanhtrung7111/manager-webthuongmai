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
        <h4 className="text-xl font-medium text-gray-600">
          Danh sách sản phẩm
        </h4>
        <div className="flex gap-x-2">
          <Button className="transition-colors" size={"sm"}>
            <i className="ri-download-2-line mr-2"></i>Xuất excel
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-500 transition-colors"
            size={"sm"}
          >
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
