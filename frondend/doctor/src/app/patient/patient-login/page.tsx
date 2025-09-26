"use client";

import { useEffect, useState } from "react";
import { FaHeartbeat, FaUser, FaLock, FaEye, FaEyeSlash, FaShieldAlt, FaStethoscope } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { PatientSignIn } from "@/components/BankendApi";
import Cookies from "js-cookie";

type LoginFormData = {
  patientName: string;
  password: string;
};

export default function PatientLogin() {
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
    setMessage("");
    
    try {
      const response = await PatientSignIn(data.patientName, data.password);
      setMessage(response.message);
      
      if (response.response) {
        localStorage.setItem("patientData", JSON.stringify(response.patientData));
        localStorage.removeItem("doctorData");
        localStorage.removeItem("adminData");
        
        Cookies.set("isPatientLoggedIn", "true", { expires: 7, secure: true });
        Cookies.set("isDoctorLoggedIn", "false", { expires: 7, secure: true });
        Cookies.set("isAdministrationLoggedIn", "false", { expires: 7, secure: true });
        
        router.push("/patient");
      }
    } catch (error) {
      console.error("Login failed", error);
      setMessage("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const patientData = localStorage.getItem("patientData");
    if (patientData) {
      try {
        const parsedData = JSON.parse(patientData);
        if (parsedData) {
          router.push("/patient");
        }
      } catch {
        localStorage.removeItem("patientData");
      }
    }
  }, [router]);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        .patient-login-container {
          background: linear-gradient(135deg, 
            rgba(239, 246, 255, 0.95) 0%, 
            rgba(238, 242, 255, 0.9) 50%, 
            rgba(237, 233, 254, 0.85) 100%);
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .patient-login-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
          animation: backgroundShift 10s ease-in-out infinite;
        }

        @keyframes backgroundShift {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
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
          background: linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%);
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
            rgba(255, 255, 255, 0.2), 
            transparent);
          transition: left 0.7s ease-in-out;
        }

        .header-gradient:hover::before {
          left: 100%;
        }

        .input-glass {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 
            0 4px 15px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .input-glass:focus {
          border-color: #3b82f6;
          box-shadow: 
            0 4px 20px rgba(59, 130, 246, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.8),
            0 0 0 3px rgba(59, 130, 246, 0.1);
          transform: translateY(-2px);
        }

        .login-button {
          background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
          box-shadow: 
            0 8px 25px rgba(59, 130, 246, 0.3),
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
            0 12px 35px rgba(59, 130, 246, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.5);
        }

        .login-button:active {
          transform: translateY(-1px);
        }

        .icon-glow {
          animation: iconFloat 3s ease-in-out infinite;
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
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

        .footer-glass {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(255, 255, 255, 0.4);
        }
      `}</style>

      <div className="patient-login-container min-h-screen flex items-center justify-center px-4 font-inter">
        <div className="relative z-10 max-w-md w-full">
          {/* Main Card */}
          <div className="glass-card rounded-3xl overflow-hidden">
            {/* Header Section */}
            <div className="header-gradient px-8 py-10 text-center relative">
              <div className="icon-glow inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm mb-4">
                <FaHeartbeat className="text-4xl text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
                Patient Portal
              </h1>
              <p className="text-blue-100 text-lg font-light">
                Secure access to your health dashboard
              </p>
              
              {/* Security Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
                <FaShieldAlt className="text-green-300 text-sm" />
                <span className="text-xs text-blue-100">HIPAA Compliant</span>
              </div>
            </div>

            {/* Login Form */}
            <div className="px-8 py-8 space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Patient Name Field */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Patient Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400 text-lg" />
                    </div>
                    <input
                      type="text"
                      {...register("patientName", {
                        required: "Patient name is required",
                        minLength: {
                          value: 3,
                          message: "Name must be at least 3 characters",
                        },
                      })}
                      className="input-glass w-full pl-3 pr-4 py-4 rounded-xl focus:outline-none placeholder-gray-400 font-inter"
                      placeholder="Enter your full name"
                      disabled={loading}
                    />
                  </div>
                  {errors.patientName && (
                     <p className="text-red-500 text-sm mt-3 font-medium flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      {errors.patientName.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">
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
                      className="input-glass w-full pl-3 pr-12 py-4 rounded-xl focus:outline-none placeholder-gray-400 font-inter"
                      placeholder="Enter your password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      disabled={loading}
                    >
                      {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                    </button>
                  </div>
                  {errors.password && (
                     <p className="text-red-500 text-sm mt-3 font-medium flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="login-button w-full text-white py-4 px-6 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
                        {/* <FaArrowRight className="transform transition-transform duration-300" /> */}
                      </>
                    )}
                  </span>
                </button>
              </form>

              {/* Message Display */}
              {message && (
                <div
                  className={`p-4 rounded-xl text-center font-medium ${
                    message.toLowerCase().includes("success")
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    {message.toLowerCase().includes("success") ? (
                      <FaStethoscope className="text-green-500" />
                    ) : (
                      <FaLock className="text-red-500" />
                    )}
                    <span>{message}</span>
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <div className="text-center pt-2">
                <p className="text-sm text-gray-500 font-light">
                  🔒 Your health information is protected with bank-level encryption
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="footer-glass px-8 py-4">
              <div className="flex items-center justify-center text-sm text-gray-600">
                <FaShieldAlt className="text-blue-500 mr-2" />
                <span>HIPAA Compliant • End-to-End Encryption </span>
              </div>
            </div>
          </div>

          {/* Support Info */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-400">
              Need assistance? Contact our support team at{" "}
              <a href="mailto:support@medaihealth.com" className="text-blue-500 hover:underline font-medium">
                support@medaihealth.com
              </a>
            </p>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
        </div>
      </div>
    </>
  );
}