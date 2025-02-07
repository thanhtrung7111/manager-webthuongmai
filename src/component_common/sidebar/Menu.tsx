import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { MenuItemObject } from "@/type/TypeCommon";

const Menu = ({
  list,
  levelBegin,
  name,
  listName,
  iconName,
  linkName,
  compact,
}: {
  list?: any[];
  name: keyof MenuItemObject;
  levelBegin: number;
  listName: keyof MenuItemObject;
  iconName: keyof MenuItemObject;
  linkName?: keyof MenuItemObject;
  compact: boolean;
}) => {
  
  return (
    <>
    
        {(list as MenuItemObject[]).map((i) => {
          return (
            <MenuItem
              compact={compact}
              linkName={linkName}
              level={levelBegin}
              item={i}
              name={name}
              iconName={iconName}
              listName={listName}
            ></MenuItem>
          );
        })}
     
    </>
  );
};

export default Menu;
