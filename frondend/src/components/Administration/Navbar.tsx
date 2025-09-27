"use client"

import { useRouter } from "next/navigation";
import { FaBars, FaBell, FaSearch } from "react-icons/fa";
import Cookies from "js-cookie";

interface NavberProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavberProps) {
  const router = useRouter()
  const Logout = () => {
    localStorage.removeItem("adminData");
    // document.cookie = "isAdministrationLoggedIn=false";
    Cookies.set("isAdministrationLoggedIn", "false");
    router.push("/");
  };
  return (
    <>
      <div className="bg-white shadow-sm p-4 flex justify-between items-center ">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 mr-4 cursor-pointer"
          >
            <FaBars className="text-xl" />
          </button>
          <h2 className="text-xl font-semibold text-gray-800">
            Admin Dashboard
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          <button 
          onClick={Logout}
          className="bg-blue-600 text-white ml-auto mb-4 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center cursor-pointer">
            <i className="fas fa-plus mr-2"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
