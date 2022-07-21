import React from "react";
import { ImSpinner2 } from "react-icons/im";

export default function SearchBar({ value, onChange, placeholder, className = "" }) {
  return (
    <div className={"w-full lg:max-w-md flex flex-col lg:flex-row items-center gap-8 " + className}>
      <input
        type="text"
        className="w-full py-3 px-4 rounded-lg "
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
