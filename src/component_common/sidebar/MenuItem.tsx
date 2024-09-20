import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MenuItemObject } from "@/type/TypeCommon";
import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const MenuItem = ({
  level = 1,
  item,
  name,
  listName,
  iconName,
  linkName,
  compact,
  checkOpenChild,
}: {
  item: MenuItemObject;
  level: number;
  name: keyof MenuItemObject;
  listName: keyof MenuItemObject;
  iconName: keyof MenuItemObject;
  linkName?: keyof MenuItemObject;
  checkOpenChild?: (value: number, openChild: boolean) => void;
  compact: boolean;
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    const menuElement = menuRef.current;
    if (open) {
      if (menuElement) {
        menuElement.style.height = `${menuElement.scrollHeight}px`;
        if (checkOpenChild) {
          checkOpenChild(menuElement.scrollHeight, true);
        }
      }
    } else {
      if (menuElement) {
        menuElement.style.height = `${0}px`;
        if (checkOpenChild) {
          checkOpenChild(menuElement.offsetHeight, false);
        }
      }
    }
  }, [open]);

  const handleCheckOpen = (value: number, openChild: boolean) => {
    const menuElement = menuRef.current;
    if (openChild) {
      if (menuElement) {
        const heightValue = menuElement.scrollHeight + value;
        menuElement.style.height = `${heightValue}px`;
        console.log(level, heightValue);
        if (checkOpenChild) checkOpenChild(heightValue, false);
      }
    } else {
      if (menuElement) {
        const heightValue = menuElement.scrollHeight - value;
        menuElement.style.height = `${heightValue}px`;
        console.log("scrollheight" + level, menuElement.scrollHeight);
        if (checkOpenChild) checkOpenChild(heightValue, false);
      }
    }
  };
  return level == 1 ? (
    <div className="mb-5">
      {!compact ? (
        <p
          className={`text-primary font-bold delay-1000 text-xs uppercase ${
            !compact ? "opacity-100 visible" : "opacity-0 invisible"
          } transition-opacity mb-2`}
        >
          {item[name] as string}
        </p>
      ) : (
        <div className="flex justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>...</TooltipTrigger>
              <TooltipContent side="right">
                <p>{item[name] as string}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
      <div>
        {Array.isArray(item[listName]) &&
          (item[listName] as MenuItemObject[]).length >= 1 &&
          (item[listName] as MenuItemObject[]).map((i) => {
            return (
              <MenuItem
                linkName={linkName}
                compact={compact}
                level={level + 1}
                iconName={iconName}
                listName={listName}
                item={i}
                name={name}
              ></MenuItem>
            );
          })}
      </div>
    </div>
  ) : compact ? (
    // Thu gọn menu
    <div className={`relative flex justify-center ${"menuItem" + level}`}>
      {Array.isArray(item[listName]) ? (
        <div
          className={`group/a hover:bg-primary-foreground flex justify-between py-2 px-3 cursor-pointer text-gray-500 hover:text-primary  rounded-sm ${
            level >= 3 ? "w-64" : "w-fit"
          }`}
        >
          <span className={`flex ${level >= 3 ? "gap-x-2" : "gap-x-0"}`}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {item[iconName] as React.ReactNode}
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item[name] as string}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="text-sm">
              {level >= 3 && (item[name] as string)}
            </span>
          </span>
          {level >= 3 && Array.isArray(item[listName]) && (
            <i
              className={`group-hover/a:text-primary ri-arrow-right-s-line text-gray-800 hover:text-transparent transition-transform`}
            ></i>
          )}
        </div>
      ) : (
        <NavLink
          to={linkName ? item[linkName] : "/home"}
          className={({ isActive }) =>
            isActive
              ? `bg-primary-foreground text-primary flex justify-between py-2 px-3 cursor-pointer text-gray-500  rounded-sm ${
                  level >= 3 ? "w-64" : "w-fit"
                }`
              : `group/a hover:bg-primary-foreground flex justify-between py-2 px-3 cursor-pointer text-gray-500 hover:text-primary  rounded-sm ${
                  level >= 3 ? "w-64" : "w-fit"
                }`
          }
        >
          <span className={`flex ${level >= 3 ? "gap-x-2" : "gap-x-0"}`}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {item[iconName] as React.ReactNode}
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item[name] as string}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="text-sm">
              {level >= 3 && (item[name] as string)}
            </span>
          </span>
          {level >= 3 && Array.isArray(item[listName]) && (
            <i
              className={`group-hover/a:text-primary ri-arrow-right-s-line text-gray-800 hover:text-transparent transition-transform`}
            ></i>
          )}
        </NavLink>
      )}

      <div
        className={`opacity-0 invisible rounded-md border absolute top-0 left-full bg-white h-fit ${
          "menuItemChild" + level
        }`}
      >
        <div className={`transition-[height] !h-full`}>
          {Array.isArray(item[listName]) &&
            (item[listName] as MenuItemObject[]).length >= 1 &&
            (item[listName] as MenuItemObject[]).map((i, index) => {
              return (
                <MenuItem
                  linkName={linkName}
                  compact={compact}
                  checkOpenChild={handleCheckOpen}
                  key={level + index}
                  level={level + 1}
                  iconName={iconName}
                  listName={listName}
                  item={i}
                  name={name}
                ></MenuItem>
              );
            })}
        </div>
      </div>
    </div>
  ) : (
    // Mở rộng menu
    <div
      className={`relative ${"menuItem" + level} ${
        compact ? "invisible opacity-0" : "visible opacity-100"
      }`}
    >
      {Array.isArray(item[listName]) ? (
        <div
          onClick={() => {
            setOpen(!open);
          }}
          className={`group/a hover:bg-primary-foreground flex items-center ${
            compact ? "justify-center" : "justify-between"
          } py-2 px-3 cursor-pointer text-gray-500 hover:text-primary  rounded-sm`}
        >
          <div className="flex gap-x-2 items-center">
            {item[iconName] as React.ReactNode}
            <p
              className={`group-hover/a:text-primary text-sm transition-opacity${
                !compact ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              {!compact && (item[name] as string)}
            </p>
          </div>
          {Array.isArray(item[listName]) && (
            <i
              className={`group-hover/a:text-primary ri-arrow-up-s-line text-gray-800 hover:text-transparent transition-transform ${
                open == true ? "rotate-180" : "rotate-90"
              }`}
            ></i>
          )}
        </div>
      ) : (
        <NavLink
          to={linkName && item[linkName]}
          className={({ isActive }) => {
            console.log(isActive);
            return isActive
              ? `group/a bg-primary-foreground flex ${
                  compact ? "justify-center" : "justify-between"
                } py-2 px-3 cursor-pointer text-gray-500 text-primary  rounded-sm`
              : `group/a hover:bg-primary-foreground flex ${
                  compact ? "justify-center" : "justify-between"
                } py-2 px-3 cursor-pointer text-gray-500 hover:text-primary  rounded-sm`;
          }}
        >
          <span className="flex gap-x-2 ">
            {item[iconName] as React.ReactNode}
            <div
              className={`${
                !compact ? "opacity-100 visible" : "opacity-0 w-0 invisible"
              } transition-all`}
            >
              <span className="text-sm">
                {!compact && (item[name] as string)}
              </span>
            </div>
          </span>
          {!compact && Array.isArray(item[listName]) && (
            <i
              className={`group-hover/a:text-primary ri-arrow-up-s-line text-gray-800 hover:text-transparent transition-transform ${
                open == true ? "rotate-180" : "rotate-90"
              }`}
            ></i>
          )}
        </NavLink>
      )}
      {/* Menu con   */}
      <div
        className={`${
          open ? "w-full visible opacity-100" : "w-0 invisible opacity-0"
        } border-l border-slate-200 ml-5 pl-2 transition-opacity pr-5`}
      >
        <div
          ref={menuRef}
          className={`h-0 ${"overflow-hidden"} max-h-full transition-[height]`}
        >
          {Array.isArray(item[listName]) &&
            (item[listName] as MenuItemObject[]).length >= 1 &&
            (item[listName] as MenuItemObject[]).map((i, index) => {
              return (
                <MenuItem
                  compact={compact}
                  linkName={linkName}
                  checkOpenChild={handleCheckOpen}
                  key={level + index}
                  level={level + 1}
                  iconName={iconName}
                  listName={listName}
                  item={i}
                  name={name}
                ></MenuItem>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
