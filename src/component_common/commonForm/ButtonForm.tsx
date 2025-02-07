import React from "react";
import SpinnerLoading from "../loading/SpinnerLoading";

const ButtonForm = ({
  type = "button",
  label,
  loading = false,
  disabled = false,
  className = "",
  icon = null,
  onClick,
}: {
  type: "button" | "submit";
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-primary rounded-md text-white disabled:bg-slate-400 h-8 shrink-0 text-xs w-full flex justify-center items-center hover:bg-opacity-90 transition-all duration-200 ${className}`}
      disabled={loading || disabled}
      type={type}
    >
      {loading ? (
        <SpinnerLoading className="!w-4 !h-4 fill-primary"></SpinnerLoading>
      ) : (
        <p className="flex gap-x-2">
          {icon && icon}
          <span>{label}</span>
        </p>
      )}
    </button>
  );
};

export default ButtonForm;
