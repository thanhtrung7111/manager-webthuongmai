import { FieldHookConfig, useField, useFormikContext } from "formik";
import React, { memo, useCallback, useEffect, useState } from "react";
import { areEqual, FixedSizeList as List } from "react-window";
import { any } from "zod";
type ObjectSelect = {
  [key: string]: any;
};

// This helper function memoizes incoming props,
// To avoid causing unnecessary re-renders pure Row components.
// This is only needed since we are passing multiple props with a wrapper object.
// If we were only passing a single, stable value (e.g. items),
// We could just pass the value directly.

const SelectFormikForm = ({
  label,
  itemKey,
  itemValue,
  important = false,
  loading = false,
  options = [],
  disabled = false,
  name,
  onChange,
  ...props
}: {
  label: string;
  itemKey: keyof ObjectSelect;
  itemValue: keyof ObjectSelect;
  important?: boolean;
  loading?: boolean;
  name: string;
  options: ObjectSelect[];
  disabled?: boolean;
  onChange?: (value: ObjectSelect) => void;
}) => {
  const [field, meta, helpers] = useField(name);
  const [dataFilter, setDataFilter] = useState(options);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<ObjectSelect>(options[0]);
  const handleSelectItem = (item: ObjectSelect) => {
    helpers.setValue(item[`${itemKey}`]);
    if (onChange) onChange(item);
    setShow(false);
  };

  const filterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected({ ...selected, [itemValue]: e.target.value });
    setDataFilter(
      options.filter(
        (item) =>
          item[itemValue].toLowerCase().indexOf(e.target.value.toLowerCase()) >=
          0
      )
    );
  };
  useEffect(() => {
    if (options.length >= 1 && !loading) {
      if (!field.value) {
        setSelected(options[0]);
        helpers.setValue(options[0][`${itemKey}`]);
      } else {
        const findItem = options.find((item: ObjectSelect) => {
          console.log(item[itemKey], name + itemKey);
          console.log(field.value, name + itemValue);
          return item[itemKey] == field.value;
        });
        console.log(findItem, name);
        setSelected(findItem ? findItem : options[0]);
        helpers.setValue(
          findItem ? findItem[itemKey] : options[0][`${itemKey}`]
        );
      }
      setDataFilter([...options]);
    } else {
      setDataFilter([]);
    }
    setShow(false);
  }, [options]);
  useEffect(() => {
    const findItem = options.find(
      (item: ObjectSelect) => item[itemKey] + "item" == field.value + "item"
    );
    console.log(findItem);
    if (findItem) setSelected(findItem);
  }, [field.value]);
  // const renderItem = useCallback(
  //   ({ index, style }: { index: number; style: any }) => {
  //     const item = dataFilter[index];
  //     const isSelected = selected[itemKey] === item[itemKey];

  //     return (
  //       <ListItem
  //         key={item[itemKey]} // Thêm key ở đây
  //         item={item}
  //         onClick={() => handleSelectItem(item)} // Gọi hàm xử lý ở đây
  //         isSelected={isSelected}
  //         itemKey={itemKey}
  //         itemValue={itemValue}
  //         style={style} // Đảm bảo sử dụng style để định vị item
  //       />
  //     );
  //   },
  //   [dataFilter, handleSelectItem, selected, itemKey, itemValue]
  // );
  return (
    <div className="flex flex-col gap-y-1 w-full">
      <label htmlFor="">
        <span className="text-gray-700 font-medium text-sm">{label} </span>{" "}
        {important && <span className="text-red-500">*</span>}
      </label>
      <div
        className={`bg-white ${
          meta.error && meta.touched ? "border-red-500" : "border-gray-200"
        } ${
          (disabled || loading) && "bg-slate-50"
        } px-3 py-2 text-sm border outline-none rounded-sm w-full flex relative`}
      >
        {loading ? (
          <div className="flex-auto">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-slate-400"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : (
          <>
            <input
              onClick={() => setShow(!show)}
              onBlur={(e) => {
                if (e.target.value == "" && options.length >= 1) {
                  setSelected(options[0]);
                  helpers.setValue(options[0][`${itemKey}`]);
                  if (onChange) onChange(options[0]);
                }
                setShow(false);
              }}
              disabled={disabled || loading}
              onChange={(e) => {
                setShow(true);
                filterChange(e);
              }}
              value={selected ? selected[`${itemValue}`] : ""}
              autoComplete="off"
              className="flex-auto outline-none disabled:bg-transparent"
            />
            <input
              autoComplete="off"
              {...props}
              {...field}
              onChange={field.onChange}
              hidden
            />
          </>
        )}
        <i
          onClick={() => setShow(!show)}
          className="ri-arrow-down-s-line cursor-pointer"
        ></i>

        <List
          height={400}
          itemCount={dataFilter.length}
          itemSize={35}
          width="100%"
          className={`${
            show ? "visible opacity-100" : "opacity-0 invisible"
          } !absolute w-full z-50 top-[90%] right-0 max-h-60 min-h-24 ${
            dataFilter.length > 5 ? "overflow-y-scroll" : ""
          } bg-white rounded-md border border-gray-300 custom-scrollbar-wider overflow-hidden transition-all duration-150`}
        >
          {/* {renderItem} */}
          {({ index, style, isScrolling }) => (
            <div style={style}>
              <div
                onMouseDown={(e) => {
                  handleSelectItem(dataFilter[index]);
                  console.log(dataFilter[index]);
                }}
                className={`px-2 py-2 ${
                  isScrolling && "animate-pulse"
                } cursor-pointer w-full h-full hover:bg-slate-100 ${
                  selected &&
                  selected[`${itemKey}`] == dataFilter[index][`${itemKey}`]
                    ? "bg-slate-100"
                    : "bg-white"
                }`}
              >
                <p
                  className=" line-clamp-1"
                  title={dataFilter[index][`${itemValue}`]}
                >
                  {dataFilter[index][`${itemValue}`]}
                </p>
              </div>
            </div>
          )}

          {/* {dataFilter.length <= 0 ? (
            <div className="text-sm px-2 py-2">
              Không có mục bạn tìm kiếm...
            </div>
          ) : (
            dataFilter.map((item, index) => {
              return (
                <div
                  onClick={() => handleSelectItem(item)}
                  className={`px-2 py-1 cursor-pointer hover:bg-slate-100 ${
                    selected[`${itemKey}`] == item[`${itemKey}`]
                      ? "bg-slate-100"
                      : "bg-white"
                  }`}
                >
                  {item[`${itemValue}`]}
                </div>
              );
            })
          )} */}
        </List>
      </div>
      {meta.error && meta.touched && (
        <span className="text-red-500 text-xs">{meta.error}</span>
      )}
    </div>
  );
};

export default SelectFormikForm;
