import Link from "next/link";
import {
  FaCalendarCheck,
  FaChartLine,
  FaCog,
  FaHeartbeat,
  FaHome,
  FaUser,
  FaUserInjured,
  FaUserMd,
} from "react-icons/fa";

interface SideBarProps {
  isSidebarOpen: boolean;
  pageName: string
}

const navItems = [
  { icon: FaHome, label: "Dashboard", href: "/administration" },
  { icon: FaUserInjured, label: "Patients", href: "/administration/patients" },
  { icon: FaUserMd, label: "Doctors", href: "/administration/doctors" },
  { icon: FaChartLine, label: "Reports", href: "/administration/report" },
  { icon: FaCog, label: "Settings", href: "/administration/settings" },
];

export default function SideBar({ isSidebarOpen, pageName }: SideBarProps) {
  return (
    <>
      <div
        className={`fixed min-h-screen text-white bg-gradient-to-b from-blue-800 to-blue-900 transition-all duration-300 ${
          isSidebarOpen ? "w-[260px]" : "w-[70px]"
        }`}
      >
        <div className="p-5">
          <div className="flex items-center space-x-3 mb-8">
            <FaHeartbeat className="text-2xl" />
            <h1
              className={`text-xl font-bold ${
                isSidebarOpen ? "block" : "hidden"
              }`}
            >
              MedAdmin
            </h1>
          </div>
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li
                key={index}
                className={`nav-item p-3 rounded-lg ${
                  pageName === item.label ? "bg-blue-700" : "hover:bg-white/10"
                }`}
              >
                <Link href={item.href} className="flex items-center space-x-3">
                  <item.icon />
                  <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="absolute bottom-0 w-full p-5">
          <div className="flex items-center space-x-3 nav-item p-3 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <FaUser />
            </div>
            <div className={`${isSidebarOpen ? "block" : "hidden"}`}>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-blue-200">Super Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
