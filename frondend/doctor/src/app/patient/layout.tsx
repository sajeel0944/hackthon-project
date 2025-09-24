"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function PatientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    const localStorageData = localStorage.getItem("patientData");

    if (localStorageData) {
      try {
        const parsedData = JSON.parse(localStorageData); // Now it's an object
        if (parsedData) {
                // 
        } else {
          Cookies.set("isPatientLoggedIn", "false");
          router.push("/patient/patient-login");
        }
      } catch {
        Cookies.set("isPatientLoggedIn", "false");
        router.push("/patient/patient-login");
      }
    } else {
      Cookies.set("isPatientLoggedIn", "false");
      router.push("/patient/patient-login");
    }
  }, []);

  return <>{children}</>;
}
