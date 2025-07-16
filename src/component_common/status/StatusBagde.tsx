import { StatusObject } from "@/type/TypeCommon";
import React from "react";

const StatusBagde = (value: {
  statusConfig: StatusObject[];
  item: string | number;
}) => {
  const objectFind = value.statusConfig.find((i) => i.value == value.item);
  return (
    <div
      className={`py-1.5 px-3 w-fit rounded-md text-white text-xs ${objectFind?.className}`}
    >
      {objectFind?.name}
    </div>
  );
};

export default StatusBagde;
