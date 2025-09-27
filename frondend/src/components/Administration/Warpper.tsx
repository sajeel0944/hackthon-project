"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";

interface WrapperProps {
  children: React.ReactNode;
  pageName: string
}

export default function Wrapper({ children, pageName }: WrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <div className="flex min-h-screen bg-gray-50 font-poppins">
      {/* Sidebar */}
      <SideBar isSidebarOpen={isSidebarOpen} pageName={pageName} />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 w-full ${
          isSidebarOpen ? "ml-[260px]" : "ml-[70px]"
        }`}
      >
        {/* Top Navigation */}
        <Navbar toggleSidebar={toggleSidebar} />
        {children}
      </div>
    </div>
  );
}
