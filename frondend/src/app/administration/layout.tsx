"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function administrationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    const localStorageData = localStorage.getItem("adminData");

    if (localStorageData) {
      try {
        const parsedData = JSON.parse(localStorageData); // Now it's an object
        if (parsedData) {
                // 
        } else {
          Cookies.set("isAdministrationLoggedIn", "false");
          router.push("/administration/login");
        }
      } catch {
        Cookies.set("isAdministrationLoggedIn", "false");
        router.push("/administration/login");
      }
    } else {
      Cookies.set("isAdministrationLoggedIn", "false");
      router.push("/administration/login");
    }
  }, []);

  return <>{children}</>;
}
