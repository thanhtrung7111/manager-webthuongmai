import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BreadcrumbItemObject } from "@/type/TypeCommon";
const BreadcrumbCustom = ({
  linkList,
  itemLink,
  itemName,
}: {
  linkList: BreadcrumbItemObject[];
  itemLink: keyof BreadcrumbItemObject;
  itemName: keyof BreadcrumbItemObject;
}) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {linkList.map((item, index) => {
          return item[itemLink] && item[itemLink] != "" ? (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href={item[itemLink]}>
                  {item[itemName] as string}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index + 1 != linkList.length && <BreadcrumbSeparator />}
            </>
          ) : (
            <BreadcrumbItem>
              <BreadcrumbPage> {item[itemName] as string}</BreadcrumbPage>
              {index + 1 != linkList.length && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbCustom;
