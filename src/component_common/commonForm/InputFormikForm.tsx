import React from "react";
import { FieldHookConfig, useField } from "formik";

const InputFormikForm = ({
  label,
  important = false,
  disabled = false,
  onChange,
  onBlur,
  name,
  placeholder,
  ...props
}: {
  label: string;
  important?: boolean;
  disabled?: boolean;
  name: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [field, meta, helpers] = useField(name);
  return (
    <div className="flex flex-col gap-y-1 w-full">
      {label && (
        <label htmlFor="">
          <span className="text-gray-700 font-medium text-sm">{label} </span>{" "}
          {important && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        {...field}
        autoComplete="off"
        onChange={(e) => {
          helpers.setValue(e.target.value);
          if (onChange) onChange(e);
        }}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={`${
          meta.error && meta.touched ? "border-red-500" : "border-gray-200"
        } px-3 py-2 text-gray-700 text-sm disabled:bg-slate-50 border outline-none rounded-sm w-full`}
      />
      {meta.error && meta.touched && (
        <span className="text-red-500 text-xs">{meta.error}</span>
      )}
    </div>
  );
};

export default InputFormikForm;
