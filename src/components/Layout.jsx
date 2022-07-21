import React from "react";
import Sidebar from "./SideBar";
import NavBar from "./NavBar";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      {/* <NavBar /> */}
      <main className="px-8 flex-1 bg-slate-100 overflow-y-scroll">
        {children}
      </main>
    </div>
  );
}
