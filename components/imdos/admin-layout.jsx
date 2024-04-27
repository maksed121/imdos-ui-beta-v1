import React from "react";
import TopBar from "./top-bar";
import Sidebar from "./sidebar";
import { sidebarItem } from "@/lib/static";

const AdminLayout = ({ children }) => {
  return (
    <>
      <div className="flex">
        <TopBar />
        <Sidebar links={sidebarItem} />
      </div>
      <div className="md:ml-[300px] mt-[80px] flex-1 p-3 min-h-[calc(100vh-80px)]">
        {children}
      </div>
    </>
  );
};

export default AdminLayout;
