import React from "react";
import Sidebar from "./SideBar";
import Header from "./Header";
import BottomPlayBar from "./ui/BottomPlayBar";

export default function Layout({ children, absolute }) {
  return (
    <div className="flex w-full min-w-screen max-w-screen h-full max-h-screen bg-slate-100 overflow-hidden">
      <Sidebar />
      <div className="relative flex-1 max-w-screen h-full max-h-screen overflow-y-scroll flex flex-col">
        <Header absolute={absolute} />
        <main className="min-h-screen overflow-y-scroll">
          {children}
          <div className="h-20"></div>
        </main>
      </div>
      <BottomPlayBar />
    </div>
  );
}
