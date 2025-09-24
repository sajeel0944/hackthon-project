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
    const localStorageData = localStorage.getItem("patientDetail");

    if (localStorageData) {
      try {
        const parsedData = JSON.parse(localStorageData); // Now it's an object
        if (parsedData) {
                // 
        } else {
          Cookies.set("patientSharedWithDoctor", "false");
          router.push("/doctor/patient-login");
        }
      } catch {
        Cookies.set("patientSharedWithDoctor", "false");
        router.push("/doctor/patient-login");
      }
    } else {
      Cookies.set("patientSharedWithDoctor", "false");
      router.push("/doctor/patient-login");
    }
  }, []);

  return <>{children}</>;
}
