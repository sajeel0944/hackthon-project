"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaUserInjured,
  FaUserMd,
  FaCalendarCheck,
  FaUserPlus,
} from "react-icons/fa";
import Warpper from "@/components/Administration/Warpper";

const stats = [
  {
    title: "Total Patients",
    value: "1,248",
    change: "12% from last month",
    icon: FaUserInjured,
    color: "blue",
    changeColor: "green",
  },
  {
    title: "Total Doctors",
    value: "64",
    change: "3 new this month",
    icon: FaUserMd,
    color: "purple",
    changeColor: "green",
  },
  {
    title: "Pending Appointments",
    value: "28",
    change: "5 require approval",
    icon: FaCalendarCheck,
    color: "red",
    changeColor: "red",
  },
];

export default function Home() {
  const [adminName, setAdminName] = useState<string>("");

  useEffect(() => {
    const getAdminData = localStorage.getItem("adminData");
    if (getAdminData) {
      const admindata = JSON.parse(getAdminData);
      setAdminName(admindata.adminName);
    }
  }, []);

  return (
    <>
      <Warpper pageName="Dashboard">
        <div className="p-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl p-6 mb-8">
            <h1 className="text-2xl font-bold mb-2">Welcome {adminName}</h1>
            <p className="opacity-90">
              Manage your healthcare system efficiently with the admin dashboard
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white card p-6 flex justify-between items-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300 rounded-xl"
              >
                <div>
                  <p className="text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                  <p className={`text-xs mt-1 text-${stat.changeColor}-600`}>
                    <stat.icon className="inline mr-1" /> {stat.change}
                  </p>
                </div>
                <div
                  className={`w-14 h-14 rounded-full bg-${stat.color}-100 flex items-center justify-center`}
                >
                  <stat.icon className={`text-${stat.color}-600 text-2xl`} />
                </div>
              </div>
            ))}
          </div>

          {/* Registration Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="card patient-card text-white floating bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl overflow-hidden">
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mb-6">
                  <FaUserPlus className="text-4xl" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Patient Registration
                </h3>
                <p className="mb-6">
                  Register new patients to the healthcare system. Create their
                  profiles and set up monitoring parameters.
                </p>
                <Link
                  href="/administration/patient-registration"
                  className="w-full bg-white text-blue-600 text-center py-3 px-6 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  Register New Patient
                </Link>
              </div>
            </div>
            <div
              className="card doctor-card text-white floating bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl overflow-hidden"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mb-6">
                  <FaUserMd className="text-4xl" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Doctor Registration</h3>
                <p className="mb-6">
                  Add new doctors to the system. Set their specialties,
                  availability, and access permissions.
                </p>
                <Link
                  href="/administration/doctor-registration"
                  className="w-full bg-white text-purple-700 text-center py-3 px-6 rounded-lg font-medium hover:bg-purple-50 transition-colors"
                >
                  Register New Doctor
                </Link>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .font-poppins {
            font-family: "Poppins", sans-serif;
          }
          .nav-item {
            transition: all 0.2s ease;
          }
          .nav-item:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }
          .card {
            transition: all 0.3s ease;
            border-radius: 12px;
            overflow: hidden;
          }
          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }
          .floating {
            animation: float 6s ease-in-out infinite;
          }
          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0px);
            }
          }
        `}</style>
      </Warpper>
    </>
  );
}
