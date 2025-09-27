"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

const TopNav = () => {
  const [doctorName, setDoctorName] = useState<string>("")
      const [specialization, setSpecialization] = useState<string>("")
    
      useEffect(() => {
      const localStorageData = localStorage.getItem("doctorData");
    
      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData); // Now it's an object
        setDoctorName(parsedData.fullName); // Accessing doctorName safely
        setSpecialization(parsedData.specialization)
      }
    }, []);
    
  const router = useRouter();
  const Logout = () => {
    localStorage.removeItem("doctorData");
    // document.cookie = "isDoctorLoggedIn=false";
    Cookies.set("isDoctorLoggedIn", "false");

    router.push("/");
  };

  return (
    <div className="bg-white shadow-sm py-4 px-7 flex justify-between items-center w-full ">
      <div className="">
        <div className="flex items-center space-x-3  rounded-lg transition-all duration-200 hover:bg-white/10">
          <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-[24px] cursor-none">
          <span className="pb-1">👨🏻‍⚕️</span>
          </div>
            <div >
              <p className="text-sm font-medium">Dr. {doctorName}</p>
              <p className="text-xs text-blue-500">{specialization}</p>
            </div>
        </div>
      </div>

      <div className="hidden md:flex space-x-8">
            <Link href="/doctor" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</Link>
            <Link href="/doctor" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Services</Link>
            <Link href="/doctor" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About Us</Link>
            <Link href="/doctor/patient" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Patient</Link>
          </div>


        <div className="flex items-center space-x-3">
          <button
            onClick={Logout}
            className="px-2 py-2 rounded-lg bg-blue-600 cursor-pointer text-white font-medium hover:bg-blue-700 transition-all duration-200"
          >
            Logout
          </button>
      </div>
    </div>
  );
};

export default TopNav;
