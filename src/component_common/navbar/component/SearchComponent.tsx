import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "react-responsive";

const SearchComponent = () => {
  const isMobileScreen: boolean = useMediaQuery({ query: "(max-width:767px)" });
  return isMobileScreen ? (
    <Dialog>
      <DialogTrigger className="w-fit">
        <div className="rounded-full border border-gray-200 w-16 h-9 flex items-center justify-center">
          <i className="ri-search-line text-sm"></i>
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
    <div className="relative w-96 bg-white h-fit">
      <div className="w-full flex  border border-slate-300 items-center pl-2 gap-x-2 rounded-sm overflow-hidden">
        <i className="ri-search-line text-xs flex-shrink-0"></i>
        <input
          type="text"
          className="flex-auto outline-none bg-transparent text-xs py-2 text-slate-700"
          placeholder="Tìm kiếm..."
        />
      </div>
    </div>
  );
};
export default SearchComponent;
