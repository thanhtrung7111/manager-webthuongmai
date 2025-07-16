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
      {!compact && (
        <p
          className={`text-clr-menu font-semibold tracking-widest text-xs italic uppercase  mb-2 whitespace-nowrap`}
        >
          {item[name] as string}
        </p>
      )}
      <div className="flex flex-col gap-y-1">
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
    <div
      className={`relative flex justify-center ${"menuItem" + level}  ${
        compact ? "visible" : "invisible"
      }`}
    >
      {Array.isArray(item[listName]) ? (
        <div
          className={`group/a mb-1 hover:bg-primary-foreground flex justify-between py-2 px-3 cursor-pointer text-clr-menu hover:text-primary  rounded-sm ${
            level >= 3 ? "w-64" : "w-fit"
          }`}
        >
          <span
            className={`flex ${
              level >= 3 ? "gap-x-2" : "gap-x-0"
            } whitespace-nowrap`}
          >
            <TooltipProvider delayDuration={10}>
              <Tooltip>
                <TooltipTrigger>
                  {item[iconName] as React.ReactNode}
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p className="whitespace-nowrap text-clr-content">{item[name] as string}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="text-xs whitespace-nowrap">
              {level >= 3 && (item[name] as string)}
            </span>
          </span>
          {level >= 3 && Array.isArray(item[listName]) && (
            <i
              className={`group-hover/a:text-primary ri-arrow-right-s-line text-clr-menu hover:text-transparent transition-transform`}
            ></i>
          )}
        </div>
      ) : (
        <NavLink
          to={linkName ? item[linkName] : "/home"}
          className={({ isActive }) =>
            isActive
              ? `bg-primary-foreground text-primary flex justify-between py-2 px-3 cursor-pointer text-clr-menu  rounded-sm ${
                  level >= 3 ? "w-64" : "w-fit"
                }`
              : `group/a hover:bg-primary-foreground flex justify-between py-2 px-3 cursor-pointer text-clr-menu hover:text-primary  rounded-sm ${
                  level >= 3 ? "w-64" : "w-fit"
                }`
          }
        >
          <span
            className={`flex ${
              level >= 3 ? "gap-x-2" : "gap-x-0"
            } whitespace-nowrap`}
          >
            <TooltipProvider delayDuration={10}>
              <Tooltip>
                <TooltipTrigger>
                  {item[iconName] as React.ReactNode}
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p className="whitespace-nowrap text-clr-content">{item[name] as string}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="text-xs whitespace-nowrap">
              {level >= 3 && (item[name] as string)}
            </span>
          </span>
          {level >= 3 && Array.isArray(item[listName]) && (
            <i
              className={`group-hover/a:text-primary ri-arrow-right-s-line text-clr-menu hover:text-transparent transition-transform`}
            ></i>
          )}
        </NavLink>
      )}

      {item[listName] && (
        <div
          className={`opacity-0 invisible rounded-md border absolute top-0 left-full bg-clr-navbar h-fit ${
            "menuItemChild" + level
          }`}
        >
          <div className={`!h-full flex flex-col gap-y-1 relative py-2 px-2`}>
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
      )}
    </div>
  ) : (
    // Mở rộng menu
    <div
      className={`relative ${"menuItem" + level} ${compact ? "w-0" : "w-full"}`}
    >
      {Array.isArray(item[listName]) ? (
        <div
          onClick={() => {
            setOpen(!open);
          }}
          className={`group/a hover:bg-primary-foreground flex items-center ${
            compact ? "justify-center" : "justify-between"
          } py-2 px-3 cursor-pointer text-clr-menu hover:text-primary  rounded-sm`}
        >
          <div className="flex gap-x-2 items-center">
            {item[iconName] as React.ReactNode}
            <p className={`group-hover/a:text-primary text-xs whitespace-nowrap`}>
              {!compact && (item[name] as string)}
            </p>
          </div>
          {Array.isArray(item[listName]) && (
            <i
              className={`group-hover/a:text-primary ri-arrow-up-s-line text-clr-menu hover:text-transparent transition-transform ${
                open == true ? "rotate-180" : "rotate-90"
              }`}
            ></i>
          )}
        </div>
      ) : (
        <NavLink
          to={linkName && item[linkName]}
          className={({ isActive }) => {
            return isActive
              ? `group/a bg-clr-surface-accent-light flex ${
                  compact ? "justify-center" : "justify-between"
                } py-2 px-3 cursor-pointer text-white  rounded-sm transition-transform`
              : `group/a hover:bg-primary-foreground flex ${
                  compact ? "justify-center" : "justify-between"
                } py-2 px-3 cursor-pointer text-clr-menu hover:text-primary rounded-sm transition-transform`;
          }}
        >
          <span className="flex gap-x-2 whitespace-nowrap">
            {item[iconName] as React.ReactNode}
            <div className={`transition-all`}>
              <span className="text-xs whitespace-nowrap">
                {!compact && (item[name] as string)}
              </span>
            </div>
          </span>
          {!compact && Array.isArray(item[listName]) && (
            <i
              className={`group-hover/a:text-primary ri-arrow-up-s-line text-clr-menu hover:text-transparent transition-transform ${
                open == true ? "rotate-180" : "rotate-90"
              }`}
            ></i>
          )}
        </NavLink>
      )}
      {/* Menu con   */}
      {Array.isArray(item[listName]) &&
        (item[listName] as MenuItemObject[]).length >= 1 && (
          <div className={`border-l border-slate-200 ml-5 pl-2 w-full pr-5`}>
            <div
              ref={menuRef}
              className={`h-0 flex gap-y-1 flex-col overflow-hidden max-h-full transition-[height] duration-300`}
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
        )}
    </div>
  );
};

export default MenuItem;
