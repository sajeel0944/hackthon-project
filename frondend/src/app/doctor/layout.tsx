"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function DoctorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    const localStorageData = localStorage.getItem("doctorData");

    if (localStorageData) {
      try {
        const parsedData = JSON.parse(localStorageData); // Now it's an object
        if (parsedData) {
                // 
        } else {
          Cookies.set("isDoctorLoggedIn", "false");
          router.push("/doctor/doctor-login");
        }
      } catch {
        Cookies.set("isDoctorLoggedIn", "false");
        router.push("/doctor/doctor-login");
      }
    } else {
      Cookies.set("isDoctorLoggedIn", "false");
      router.push("/doctor/doctor-login");
    }
  }, []);

  return <>{children}</>;
}
