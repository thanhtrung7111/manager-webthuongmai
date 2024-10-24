import { fetchDataCondition } from "@/api/commonApi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const MultiTagSelect = ({
  onChange,
  value,
}: {
  onChange: (list: string) => void;
  value: string;
}) => {
  const { data, isSuccess } = useQuery({
    queryKey: ["postTags"],
    queryFn: () =>
      fetchDataCondition({
        DCMNCODE: "inpPostTag",
        PAGELINE: "0",
        PAGENUMB: "1",
        // "CONDFLTR": "POST_TAG COLLATE Latin1_General_CI_AI LIKE '%tin tuc%'"
      }),
  });
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (data && isSuccess) {
      setOptions(data.map((item: any) => item.TAG_NAME));
    }
  }, [isSuccess]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[600px] max-w-full justify-between"
        >
          <div className="flex flex-wrap gap-x-3 h-fit text-gray-600">
            {value != ""
              ? value.split(",").map((tag) => (
                  <div className="relative">
                    <Badge className="bg-secondary">{tag}</Badge>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        onChange(
                          value
                            .split(",")
                            .filter((i) => i != tag)
                            .join(",")
                        );
                      }}
                      className="absolute -top-1 -right-2 w-4 h-4 border border-gray-300 flex items-center justify-center rounded-full bg-white"
                    >
                      <i className="ri-close-line text-xs text-gray-600"></i>
                    </div>
                  </div>
                ))
              : "Chưa có tag bài viết..."}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[600px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {options.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={(currentValue: string) => {
                    if (value.split(",").indexOf(currentValue) >= 0) {
                      onChange(
                        value
                          .split(",")
                          .filter((i) => i != currentValue)
                          .join(",")
                      );
                    } else {
                      if (value.split(",").length == 4) {
                        toast("Thông báo", {
                          description: "Số lượng tag đã đạt giới hạn!",
                        });
                        return;
                      }
                      if (value == "") {
                        onChange(currentValue);
                      } else {
                        onChange([...value.split(","), currentValue].join(","));
                      }
                    }

                    // setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.split(",").indexOf(item) >= 0
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultiTagSelect;
