import React from "react";

export default function IconContainer({ children, size = "12", bg = 'transparent', bgHover = 'black/30', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`w-${size} h-${size} flex items-center justify-center transition-all duration-300 bg-transparent hover:bg-black/20 rounded-full cursor-pointer`}
    >
      {children}
    </div>
  );
}
