import BarChartCustom from "@/component_common/bar_chart/BarChartCustom";
import BreadcrumbCustom from "@/component_common/breadcrumb/BreadcrumbCustom";
import ButtonForm from "@/component_common/commonForm/ButtonForm";
import InfomationFrame from "@/component_common/infomation_frame/InfomationFrame";
import LineChartCustom from "@/component_common/line_chart/LineChartCustom";
import PieChartCustom from "@/component_common/pie_chart/PieChartCustom";
import TableCustom from "@/component_common/table/TableCustom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductObject } from "@/type/TypeCommon";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

const DashboardProductPage = () => {
  const breadBrumb = [
    {
      itemName: "Biểu đồ",
    },
    {
      itemName: "Sản phẩm",
      itemLink: "/dashboard_product",
    },
  ];
  const columns: ColumnDef<ProductObject>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "PRDCCODE",
      meta: "Mã sản phẩm",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Mã sản phẩm
            {column.getIsSorted() === "asc" ? (
              <i className="ri-arrow-up-line"></i>
            ) : (
              <i className="ri-arrow-down-line"></i>
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("PRDCCODE")}</div>
      ),
      enableHiding: true,
    },
    {
      accessorKey: "PRDCNAME",
      meta: "Tên sản phẩm",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tên sản phẩm
            {column.getIsSorted() === "asc" ? (
              <i className="ri-arrow-up-line"></i>
            ) : (
              <i className="ri-arrow-down-line"></i>
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("PRDCNAME")}</div>
      ),
      enableHiding: true,
    },
    {
      accessorKey: "QUOMNAME",
      meta: "Đơn vị tính",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Đơn vị tính
            {column.getIsSorted() === "asc" ? (
              <i className="ri-arrow-up-line"></i>
            ) : (
              <i className="ri-arrow-down-line"></i>
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className="capitalize"
          onClick={() => row.toggleSelected(!row?.getIsSelected())}
        >
          {row.getValue("QUOMNAME")}
        </div>
      ),
      enableHiding: true,
    },
    {
      id: "actions",
      header: () => {
        return <div className="flex justify-end">Tác vụ</div>;
      },
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;
        return (
          <div className="flex gap-x-2 justify-end">
            <ButtonForm
              className="!bg-yellow-500 !w-28"
              type="button"
              icon={<i className="ri-error-warning-line"></i>}
              label="Xem chi tiết"
            ></ButtonForm>

            <ButtonForm
              className="!bg-red-500 !w-20"
              type="button"
              icon={<i className="ri-delete-bin-line"></i>}
              label="Xóa"
            ></ButtonForm>
          </div>
        );
      },
    },
  ];
  return (
    <div className="flex flex-col gap-y-3">
      <div className="mb-1">
        <BreadcrumbCustom
          linkList={breadBrumb}
          itemName={"itemName"}
          itemLink={"itemLink"}
        ></BreadcrumbCustom>
      </div>

      {/* Action  */}
      {/* <div className="flex justify-between items-center">
        <h4 className="text-xl font-medium text-gray-600">
          Danh sách quảng cáo
        </h4>
        <div className="flex gap-x-2">
          <ButtonForm
            className="!bg-primary !w-28"
            type="button"
            icon={<i className="ri-download-2-line"></i>}
            label="Xuất excel"
          ></ButtonForm>
          <ButtonForm
            className="!bg-secondary !w-28"
            type="button"
            icon={<i className="ri-file-add-line"></i>}
            onClick={() => navigate("/create_advertisement")}
            label="Thêm mới"
          ></ButtonForm>
        </div>
      </div> */}

      {/* table */}
      {/* <div className="rounded-md p-5 bg-white border-gray-200 border shadow-md">
        <TableCustom
          data={[]}
          columns={columns}
          search={[
            { key: "PRDCCODE", name: "mã sản phẩm" },
            { key: "PRDCNAME", name: "tên sản phẩm" },
          ]}
          // isLoading={isFetching}
        ></TableCustom>
      </div> */}

      <div className="grid grid-cols-4 gap-x-3">
        <InfomationFrame
          backgroundIcon="bg-red-700"
          title="Doanh thu theo năm"
          icon={<i className="ri-calendar-check-line"></i>}
          content={new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 9,
          }).format(80000000)}
          rate="3,2"
          totalRate={700000}
          statusRate="low"
        ></InfomationFrame>
        <InfomationFrame
          backgroundIcon="bg-blue-900"
          title="Doanh thu theo tháng"
          icon={<i className="ri-calendar-check-line"></i>}
          content={new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 9,
          }).format(80000000)}
          rate="3,5"
          totalRate={700000}
          statusRate="high"
        ></InfomationFrame>
        <InfomationFrame
          backgroundIcon="bg-green-900"
          title="Doanh thu theo tuần"
          icon={<i className="ri-calendar-schedule-line"></i>}
          content={new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 9,
          }).format(80000000)}
          rate="3,5"
          totalRate={700000}
          statusRate="high"
        ></InfomationFrame>
        <InfomationFrame
          backgroundIcon="bg-orange-800"
          title="Tổng doanh thu"
          icon={<i className="ri-calendar-schedule-fill"></i>}
          content={new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 9,
          }).format(80000000)}
          rate="3,5"
          totalRate={700000}
          statusRate="high"
        ></InfomationFrame>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-md p-6 bg-white border-gray-200 border shadow-md">
          <BarChartCustom></BarChartCustom>
        </div>
        <div className="rounded-md p-6 bg-white border-gray-200 border shadow-md">
          <LineChartCustom />
        </div>
        <div className="rounded-md p-6 bg-white border-gray-200 border shadow-md">
          <PieChartCustom />
        </div>
      </div>
      <div className="rounded-md p-5 bg-white border-gray-200 border shadow-md">
        <TableCustom
          data={[]}
          columns={columns}
          search={
            [
              // { key: "PRDCCODE", name: "mã sản phẩm" },
              // { key: "PRDCNAME", name: "tên sản phẩm" },
              // { key: "QUOMNAME", name: "đơn vị tính" },
            ]
          }
          // isLoading={isFetching}
        ></TableCustom>
      </div>
    </div>
  );
};

export default DashboardProductPage;
