import { DataExcelPatternObject } from "@/type/TypeCommon";
import { dataTagSymbol } from "@tanstack/react-query";
import Excel, { Workbook, Worksheet } from "exceljs";

export const exportExcelPattern = async (
  values: DataExcelPatternObject[]
): Promise<void> => {
  const workbook = new Excel.Workbook();
  let lengtSheet = 0;
  const worksheet = workbook.addWorksheet("HEADER");
  const sheetFilter = workbook.addWorksheet("sheetFilter");

  const columns: any[] = [];

  for (let item of values) {
    columns.push({
      header: item.id,
      key: item.id,
      width: 30,
    });
  }

  worksheet.columns = columns;

  worksheet.getRow(1).eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "059669" },
    };
    cell.font = {
      bold: true, // In đậm
      color: { argb: "FFFFFFFF" }, // Màu chữ (trắng)
    };
    cell.alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    cell.border = {
      right: {
        color: {
          argb: "FAFAFA",
        },
        style: "thin",
      },
    };
  });
  worksheet.getRow(3).eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "059669" },
    };
    cell.font = {
      bold: true, // In đậm
      color: { argb: "FFFFFFFF" }, // Màu chữ (trắng)
    };
    cell.alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    cell.border = {
      right: {
        color: {
          argb: "FAFAFA",
        },
        style: "thin",
      },
    };
  });
  worksheet.getRow(1).height = 30;
  sheetFilter.getRow(1).height = 30;

  const dataDemo: any[] = [];

  values.forEach((item, index) => {
    worksheet.getCell(2, index + 1).value = "";
  });
  values.forEach((item, index) => {
    worksheet.getCell(3, index + 1).value = item.header;
  });
  worksheet.getRow(2).height = 30;
  worksheet.getRow(2).font = {
    bold: true, // In đậm
    color: { argb: "059669" }, // Màu chữ (trắng)
  };
  worksheet.getRow(2).alignment = {
    horizontal: "center",
    vertical: "middle",
  };
  worksheet.getRow(3).height = 30;
  worksheet.getRow(3).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "059669" },
  };

  worksheet.getRow(3).font = {
    bold: true, // In đậm
    color: { argb: "FFFFFFFF" }, // Màu chữ (trắng)
  };
  worksheet.getRow(3).border = {
    right: {
      color: {
        argb: "FAFAFA",
      },
      style: "thin",
    },
  };
  worksheet.getRow(3).alignment = {
    horizontal: "center",
    vertical: "middle",
  };
  values.forEach((item) => {
    dataDemo.push(item.dataDemo);
  });

  worksheet.getRow(4).values = dataDemo;
  worksheet.getRow(5).values = dataDemo;
  values.forEach((item) => {
    if (item.type == "list") {
      lengtSheet++;
      item.data?.forEach((i: string, index) => {
        if (index + 1 == 1) {
          sheetFilter.getCell(index + 1, lengtSheet).value =
            "Danh sách " + item.header.toLocaleLowerCase();
          sheetFilter.getCell(index + 1, lengtSheet).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "ef4444" },
          };
          sheetFilter.getCell(index + 1, lengtSheet).font = {
            bold: true, // In đậm
            color: { argb: "FFFFFFFF" }, // Màu chữ (trắng)
          };
          sheetFilter.getCell(index + 1, lengtSheet).border = {
            right: {
              color: {
                argb: "FAFAFA",
              },
              style: "thin",
            },
          };
          return;
        }
        sheetFilter.getCell(index + 1, lengtSheet).value = i;
      });
      sheetFilter.getColumn(lengtSheet).width = 30;
      worksheet.getColumnKey(item.id).eachCell((cell, rowNumber) => {
        if (rowNumber > 3) {
          cell.dataValidation = {
            type: "list",
            allowBlank: true,
            formulae: [
              `'sheetFilter'!${sheetFilter.getColumn(lengtSheet).letter}2:${
                sheetFilter.getColumn(lengtSheet).letter
              }${item.data?.length}`,
            ], // Danh sách các giá trị, ngăn cách bởi dấu phẩy
            showErrorMessage: true,
            errorTitle: "Lựa chọn không có giá trị",
            error: "Vui lòng chọn trong danh sách",
          };
        }
      });
    }
  });

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data.xlsx";
  document.body.appendChild(link);

  link.click();

  setTimeout(() => {
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
  }, 0);
};

export const exportExcelList = <TData extends { [key: string]: any }>(
  list: TData[],
  listProps: string[]
) => {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("data");

  console.log(list[0][listProps[0]]);
};
