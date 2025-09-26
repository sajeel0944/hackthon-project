"use client";

import { useEffect, useState } from "react";
import { FaHeartbeat, FaUser, FaLock, FaEye, FaEyeSlash, FaShieldAlt, FaArrowRight } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AdministrationLogin } from "@/components/BankendApi";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

type LoginFormData = {
  adminName: string;
  password: string;
};

export default function AdminLogin() {
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
    const { adminName, password } = data;

    try {
      const response = await AdministrationLogin(adminName, password);
      setMessage(response.message);
      if (response.response) {
        localStorage.setItem("adminData", JSON.stringify(response.adminDetail));
        localStorage.removeItem("patientData");
        localStorage.removeItem("doctorData");
        
        Cookies.set("isAdministrationLoggedIn", "true");
        Cookies.set("isPatientLoggedIn", "false");
        Cookies.set("isDoctorLoggedIn", "false");
        
        router.push("/administration");
      }
    } catch (error) {
      console.error("Login failed", error);
      setMessage("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const localStorageData = localStorage.getItem("adminData");
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      if (parsedData) {
        router.push("/administration");
      }
    }
  }, [router]);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 font-['Inter'] relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-indigo-400/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-300/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-md w-full relative z-10">
          {/* Card Container */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            
            {/* Header Section */}
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/5 rounded-full"></div>
              
              <div className="relative float-animation inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-sm mb-6 border border-white/20 shadow-lg">
                <FaHeartbeat className="text-4xl text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-3 tracking-tight relative">
                Admin Portal
                <div className="absolute bottom-0 left-1/4 w-1/2 h-0.5 bg-blue-300/50 rounded-full"></div>
              </h1>
              <p className="opacity-95 text-blue-100 text-sm font-medium tracking-wide">
                Secure Healthcare Management System
              </p>
            </div>

            {/* Form Section */}
            <div className="px-10 py-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Admin Name Field */}
                <div className="group">
                  <label className="block font-semibold text-gray-700 mb-3 tracking-wide uppercase text-xs">
                    Administrator Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-transform group-focus-within:scale-110">
                      {/* <FaUser className="text-gray-400 text-sm group-focus-within:text-blue-500 transition-colors" /> */}
                    </div>
                    <input
                      type="text"
                      {...register("adminName", {
                        required: "Admin name is required",
                        minLength: {
                          value: 3,
                          message: "Admin name must be at least 3 characters",
                        },
                      })}
                      className="w-full pl-3 pr-4 py-4 border border-gray-200/80 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-300 font-medium text-gray-800 placeholder-gray-400/70 shadow-sm hover:shadow-md"
                      placeholder="Enter administrator name"
                    />
                  </div>
                  {errors.adminName && (
                    <p className="text-red-500 text-sm mt-3 font-medium flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      {String(errors.adminName.message)}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="group">
                  <label className="block font-semibold text-gray-700 mb-3 tracking-wide uppercase text-xs">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-transform group-focus-within:scale-110">
                      {/* <FaLock className="text-gray-400 text-sm group-focus-within:text-blue-500 transition-colors" /> */}
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
                      className="w-full pl-3 pr-12 py-4 border border-gray-200/80 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-300 font-medium text-gray-800 placeholder-gray-400/70 shadow-sm hover:shadow-md"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-600 transition-all duration-200 hover:scale-110"
                    >
                      {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-3 font-medium flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      {String(errors.password.message)}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full group relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-5 px-4 rounded-2xl hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-500/30 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  {loading ? (
                    <span className="flex items-center justify-center relative z-10">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Authenticating...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center relative z-10">
                      
                      Access Dashboard
                      {/* <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" /> */}
                    </span>
                  )}
                </button>
              </form>

              {/* Message Display */}
              {message && (
                <div
                  className={`mt-8 p-4 rounded-2xl text-center text-sm font-semibold backdrop-blur-sm border ${
                    message.toLowerCase().includes("success")
                      ? "bg-green-50/80 text-green-800 border-green-200/50 shadow-lg"
                      : "bg-red-50/80 text-red-800 border-red-200/50 shadow-lg"
                  } transition-all duration-300`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {message.toLowerCase().includes("success") ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                    {message}
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600/80 font-medium tracking-wide">
                 🔒 Enterprise-grade healthcare administration platform
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 px-10 py-6 border-t border-gray-200/50 text-sm text-gray-600 text-center backdrop-blur-sm">
              <div className="flex items-center justify-center gap-3">
                <FaShieldAlt className="text-blue-500 text-base shrink-0" />
                <span className="font-medium tracking-wide">HIPAA Compliant • End-to-End Encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}