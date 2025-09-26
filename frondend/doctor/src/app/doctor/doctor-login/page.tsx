"use client";

import { useEffect, useState } from "react";
import { FaHeartbeat, FaUserMd, FaLock, FaEye, FaEyeSlash, FaShieldAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { DoctorSignIn } from "@/components/BankendApi";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

type LoginFormData = {
  doctorName: string;
  password: string;
};

export default function DoctorLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    const { doctorName, password } = data;

    try {
      const response = await DoctorSignIn(doctorName, password);
      setMessage(response.message);
      if (response.response) {
        console.log(response)
        localStorage.setItem("doctorData", JSON.stringify(response.doctorDetail));
        localStorage.removeItem("patientData");
        localStorage.removeItem("adminData");
        Cookies.set("isDoctorLoggedIn", "true");
        Cookies.set("isPatientLoggedIn", "false");
        Cookies.set("isAdministrationLoggedIn", "false");
        router.push("/doctor");
      }
    } catch (error) {
      console.error("Login failed", error);
      setMessage("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const localStorageData = localStorage.getItem("doctorData");
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      if (parsedData) {
        router.push("/doctor");
      }
    }
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        .login-container {
          background: linear-gradient(135deg, 
            rgba(14, 165, 233, 0.05) 0%, 
            rgba(99, 102, 241, 0.05) 50%, 
            rgba(139, 92, 246, 0.05) 100%);
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .login-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(14, 165, 233, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%);
          z-index: 0;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.8),
            0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        .header-gradient {
          background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #8b5cf6 100%);
          position: relative;
          overflow: hidden;
        }

        .header-gradient::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.3), 
            transparent);
          transition: left 0.6s;
        }

        .header-gradient:hover::before {
          left: 100%;
        }

        .input-field {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 
            0 4px 15px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .input-field:focus {
          border-color: #0ea5e9;
          box-shadow: 
            0 4px 20px rgba(14, 165, 233, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.8),
            0 0 0 3px rgba(14, 165, 233, 0.1);
          transform: translateY(-2px);
        }

        .login-button {
          background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
          box-shadow: 
            0 8px 25px rgba(14, 165, 233, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
        }

        .login-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.4), 
            transparent);
          transition: left 0.6s;
        }

        .login-button:hover::before {
          left: 100%;
        }

        .login-button:hover {
          transform: translateY(-3px);
          box-shadow: 
            0 12px 35px rgba(14, 165, 233, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.5);
        }

        .login-button:active {
          transform: translateY(-1px);
        }

        .icon-glow {
          animation: icon-float 3s ease-in-out infinite;
        }

        @keyframes icon-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .security-badge {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
        }

        .font-inter {
          font-family: 'Inter', sans-serif;
        }

        .text-gradient {
          background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <div className="login-container py-8 flex items-center justify-center px-4 font-inter">
        <div className="relative z-10 max-w-md w-full">
          {/* Login Card */}
          <div className="glass-card rounded-3xl overflow-hidden">
            {/* Header Section */}
            <div className="header-gradient text-white p-8 text-center relative">
              <div className="icon-glow inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm mb-4">
                <FaUserMd className="text-3xl text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2 font-inter">Doctor Portal</h1>
              <p className="opacity-90 text-blue-100 font-inter">
                Secure access to patient monitoring dashboard
              </p>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
                <FaShieldAlt className="text-white/80 text-sm" />
                <span className="text-xs text-white/80 font-inter">HIPAA Compliant</span>
              </div>
            </div>

            {/* Form Section */}
            <div className="px-8 py-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Doctor Name Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 font-inter">
                    Doctor Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaUserMd className="text-gray-400 text-lg" />
                    </div>
                    <input
                      type="text"
                      {...register("doctorName", {
                        required: "Doctor name is required",
                        minLength: {
                          value: 3,
                          message: "Doctor name must be at least 3 characters",
                        },
                      })}
                      className="input-field w-full pl-3 pr-4 py-4 rounded-xl focus:outline-none font-inter placeholder-gray-400"
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.doctorName && (
                    <p className="text-red-500 text-sm mt-3 font-medium flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      {String(errors.doctorName.message)}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 font-inter">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400 text-lg" />
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
                      className="input-field w-full pl-3 pr-12 py-4 rounded-xl focus:outline-none font-inter placeholder-gray-400"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
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
                  className="login-button w-full text-white py-4 px-6 rounded-xl font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed font-inter"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Signing In...</span>
                      </>
                    ) : (
                      <>
                        <span>Access Dashboard</span>
                      </>
                    )}
                  </span>
                </button>
              </form>

              {/* Message Display */}
              {message && (
                <div
                  className={`mt-6 p-4 rounded-xl text-center font-medium font-inter ${
                    message.toLowerCase().includes("success")
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {message}
                </div>
              )}

              {/* Additional Info */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 font-inter">
                  🔒 Secure access to patient health monitoring system
                </p>
              </div>
            </div>

            {/* Security Footer */}
            <div className="security-badge px-6 py-4 border-t border-gray-100 text-center">
               <div className="flex items-center justify-center text-sm text-gray-600">
                <FaShieldAlt className="text-blue-500 mr-2" />
                <span>HIPAA Compliant • End-to-End Encryption </span>
              </div>
            </div>
          </div>

          {/* Background Decorative Elements */}
          <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
            <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
          </div>
        </div>
      </div>
    </>
  );
}