"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

interface NavbarProps {
  pageName: string;
}

const Navbar = ({ pageName }: NavbarProps) => {
  const [patientName, setPatientName] = useState("Sarah Johnson");
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("patientData");
    // document.cookie = "Cookies.set("isPatientLoggedIn", "false");=false";
    Cookies.set("isPatientLoggedIn", "false");
    router.push("/");
  };

  return (
    <nav className="bg-white shadow-lg border-b border-blue-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Left Side - Logo and Patient Info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-xl font-bold">P</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">MedConnect</h1>
                <p className="text-sm text-blue-600">Patient Portal</p>
              </div>
            </div>
          </div>

          {/* Center - Navigation Tabs */}
          <div className="hidden md:flex space-x-1 bg-gray-100 rounded-xl p-1">
            <Link
              href={"/patient"}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                pageName === "home"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <i className="fas fa-info-circle mr-2"></i>
              Home
            </Link>
            <Link
              href={"/patient/ai-assistant"}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                pageName === "ai-assistant"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <i className="fas fa-robot mr-2"></i>
              AI Assistant
            </Link>
            <Link
              href={"/patient/health-details"}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                pageName === "details"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <i className="fas fa-chart-line mr-2"></i>
              Health Details
            </Link>
          </div>

          {/* Right Side - Patient Info and Logout */}
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="font-medium text-gray-800">Welcome back,</p>
              <p className="text-sm text-blue-600">{patientName}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center cursor-pointer"
            >
              <i className="fas fa-sign-out-alt mr-2"></i>
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-center space-x-1 bg-gray-100 rounded-xl p-1 mb-4">
          <Link
            href={"/patient"}
            className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm ${
              pageName === "home"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600"
            }`}
          >
            <i className="fas fa-info-circle mr-1"></i>
            Home
          </Link>
          <Link
            href={"/patient/ai-assistant"}
            className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm ${
              pageName === "ai-assistant"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600"
            }`}
          >
            <i className="fas fa-robot mr-1"></i>
            AI
          </Link>
          <Link
            href={""}
            className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm ${
              pageName === "details"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600"
            }`}
          >
            <i className="fas fa-chart-line mr-1"></i>
            Details
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
