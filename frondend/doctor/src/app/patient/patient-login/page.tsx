"use client";

import { useEffect, useState } from "react";
import { FaHeartbeat } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { PatientSignIn } from "@/components/BankendApi";
import Cookies from "js-cookie";

type LoginFormData = {
  patientName: string;
  password: string;
};

export default function DoctorLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    const { patientName, password } = data;

    try {
      const response = await PatientSignIn(patientName, password);
      setMessage(response.message);
      if (response.response) {
        localStorage.setItem("patientData", JSON.stringify(response.patientData));
        localStorage.removeItem("doctorData");
        localStorage.removeItem("adminData");
        // document.cookie = "isPatientLoggedIn=true";
        // document.cookie = "isDoctorLoggedIn=false";
        // document.cookie = "isAdministrationLoggedIn=false"
        Cookies.set("isPatientLoggedIn", "true");
        Cookies.set("isDoctorLoggedIn", "false");
        Cookies.set("isAdministrationLoggedIn", "false");
        router.push("/patient");
      }
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      const localStorageData = localStorage.getItem("patientData");
  
      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData); // Now it's an object
        if (parsedData) {
          router.push("/patient");
        }
      }
    }, []);

  return (
    <>
      <div className="min-h-screen py-6 flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 font-[Poppins] px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 text-center">
              <div className="animate-pulse inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/40 mb-4">
                <i className="fas fa-user-md text-3xl">
                  <FaHeartbeat />
                </i>
              </div>
              <h1 className="text-2xl font-bold mb-2">Patient Login Portal</h1>
              <p className="opacity-90">Access your monitoring dashboard</p>
            </div>

            {/* Form */}
            <div className="px-8 py-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Doctor Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Patient Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-user text-gray-400"></i>
                    </div>
                    <input
                      type="text"
                      {...register("patientName", {
                        required: "Doctor name is required",
                        minLength: {
                          value: 3,
                          message: "Patient name must be at least 3 characters",
                        },
                      })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your name"
                    />
                  </div>
                  {errors.patientName && (
                    <p className="text-red-500 text-sm mt-1">
                      {String(errors.patientName.message)}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-lock text-gray-400"></i>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      <i
                        className={`fas ${
                          showPassword ? "fa-eye-slash" : "fa-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {String(errors.password.message)}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium transition cursor-pointer"
                >
                  {loading ? "Signing in..." : "Sign In to Dashboard"}
                </button>
              </form>

              {message ? (
                <div
                  className={`mt-4 text-center text-sm font-medium ${
                    message.toLowerCase().includes("success")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {message}
                </div>
              ) : (
                ""
              )}

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Secure access to your health monitoring system
                </p>
              </div>
            </div>

            <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 text-sm text-gray-600 text-center">
              <i className="fas fa-shield-alt text-blue-500 mr-2"></i>
              HIPAA Compliant • Encrypted Connection
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
