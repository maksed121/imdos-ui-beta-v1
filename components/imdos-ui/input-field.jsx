import React from "react";
import clsx from "clsx";

const InputFile = ({ isInvalid, errorMessage, label, onChange }) => {
  return (
    <div className="relative">
      <p
        className={clsx(
          "absolute left-3 top-2 mb-1 text-tiny",
          isInvalid ? "text-danger" : ""
        )}
      >
        {label}
      </p>
      <input
        type="file"
        className={clsx(
          "flex h-10 w-full bg-transparent px-1 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-2 rounded-xl transition-all duration-300 min-h-14 pt-6",
          isInvalid
            ? "border-danger file:text-danger placeholder:text-danger"
            : "border-foreground-200 hover:border-foreground-400"
        )}
        onChange={onChange}
      />
      {errorMessage && (
        <p className="text-tiny text-danger mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputFile;
