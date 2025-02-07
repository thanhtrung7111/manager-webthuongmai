import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

const SearchComponent = () => {
  const [focusInput, setFocusInput] = useState<boolean>(false);
  const isMobileScreen: boolean = useMediaQuery({ query: "(max-width:767px)" });
  return isMobileScreen ? (
    <Dialog>
      <DialogTrigger className="w-fit">
        <div className="flex items-center justify-center">
          <i className="ri-search-line text-2xl"></i>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary">Tìm kiếm</DialogTitle>
          <DialogDescription>
            <Input
              type="text"
              className="!outline-none focus:!outline-none focus:!ring-0 focus:!ring-transparent"
              placeholder="Email"
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ) : (
    <div className={`relative ${focusInput ? "w-96" : "w-80"} transition-[width] duration-300 bg-white h-fit`}>
      <div className="w-full flex  rounded-full border border-slate-300 items-center px-4 gap-x-2 overflow-hidden">
        <input
          type="text"
          onFocus={() => setFocusInput(true)}
          onBlur={()=>setFocusInput(false)}
          className="flex-auto outline-none bg-transparent text-xs py-2 text-slate-700"
          placeholder="Tìm kiếm..."
        />
        <i className="ri-search-line text-xs flex-shrink-0"></i>
      </div>
    </div>
  );
};
export default SearchComponent;
