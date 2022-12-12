import React from "react";
import Sidebar from "./SideBar";
import Header from "./Header";
import BottomPlayBar from "./ui/BottomPlayBar";

export default function Layout({ children, absolute }) {
  return (
    <div className="flex items-stretch w-full min-w-screen max-w-screen h-full max-h-screen bg-slate-100 overflow-hidden">
      <Sidebar />
      <div className="relative min-w-[0] flex-1 max-w-screen h-full max-h-screen flex flex-col">
        <Header absolute={absolute} />
        <main className="w-full min-h-[0] flex-1 p-0 overflow-y-scroll scrollbar-hide">
          {children}
          <div className="h-20"></div>
        </main>
      </div>
      <BottomPlayBar />
    </div>
  );
}
