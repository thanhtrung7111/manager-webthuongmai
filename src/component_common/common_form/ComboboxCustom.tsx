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
import { CommonObject } from "@/type/TypeCommon";
import { Check, ChevronsUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
const ComboboxCustom = ({
  onChange,
  onBlur,
  dataList = [],
  dataKey,
  dataName,
  placeholder,
}: {
  onChange?: (item: any) => void;
  onBlur?: (item: any) => void;
  dataList: CommonObject[];
  dataKey: keyof CommonObject;
  dataName: keyof CommonObject;
  placeholder?: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<any>("");
  const [valueDisplay, setValueDisplay] = useState("");
  useEffect(() => {
    if (value != "" && value != null) {
      if (onChange) onChange(value);

      if (dataList.length >= 0) {
        const findItem = dataList.find((item: any) => item[dataKey] == value);
        if (findItem && dataName) {
          setValueDisplay(findItem[dataName]);
        }
      }
    }
  }, [value]);
  console.log(dataList);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between text-xs h-8 font-normal text-gray-600"
        >
          {!!value && valueDisplay ? valueDisplay : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0 w">
        <Command>
          <CommandInput className="text-xs" placeholder="Nhập tìm kiếm..." />
          <CommandList>
            <CommandEmpty>Không có danh sách.</CommandEmpty>
            <CommandGroup>
              {(dataList.length > 0 ? dataList : []).map((item) => (
                <CommandItem
                  key={item[dataKey]}
                  value={item[dataKey]}
                  className="text-xs"
                  onSelect={(currentValue) => {
                    setValue(currentValue == value ? "" : currentValue);
                    console.log(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item[dataKey] ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item[dataName]}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboboxCustom;
