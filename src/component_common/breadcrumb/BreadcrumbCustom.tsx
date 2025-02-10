import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BreadcrumbItemObject } from "@/type/TypeCommon";
import { NavLink } from "react-router-dom";
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
              <BreadcrumbItem className="text-clr-caption hover:opacity-80">
                <NavLink
                  to={item[itemLink]}
                  className={"hover:text-clr-caption transition-colors"}
                >
                  {item[itemName] as string}
                </NavLink>
              </BreadcrumbItem>
              {index + 1 != linkList.length && <BreadcrumbSeparator />}
            </>
          ) : (
            <BreadcrumbItem className="text-clr-caption">
              <BreadcrumbPage className="text-clr-caption">
                {item[itemName] as string}
              </BreadcrumbPage>
              {index + 1 != linkList.length && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbCustom;
