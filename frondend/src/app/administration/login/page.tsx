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
        
        * {
          box-sizing: border-box;
        }
        
        body, html {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: hidden;
          width: 100%;
        }
        
        #__next {
          height: 100%;
          overflow: hidden;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        .admin-login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e0e7ff 100%);
          padding: 1rem;
          position: relative;
          overflow: hidden;
          width: 100%;
        }
        
        .admin-login-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.05) 0%, transparent 50%);
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 1.5rem;
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          width: 100%;
          max-width: 400px;
          max-height: 95vh;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 10;
          overflow: hidden;
        }
        
        .header-gradient {
          background: linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%);
          padding: 1.5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
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
        
        .compact-icon {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .compact-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
        }
        
        .compact-subtitle {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
        }
        
        .form-content {
          padding: 1.5rem;
          flex: 1;
          overflow-y: auto;
          max-height: calc(95vh - 200px);
        }
        
        .form-content::-webkit-scrollbar {
          width: 4px;
        }
        
        .form-content::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        
        .form-content::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 10px;
        }
        
        .compact-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .input-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #374151;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .input-container {
          position: relative;
          width: 100%;
        }
        
        .input-field {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          background: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .input-field:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          transform: translateY(-1px);
        }
        
        .input-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          font-size: 0.9rem;
        }
        
        .password-toggle {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 0.25rem;
          transition: color 0.2s ease;
        }
        
        .password-toggle:hover {
          color: #4b5563;
        }
        
        .error-message {
          color: #ef4444;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          margin-top: 0.25rem;
        }
        
        .login-button {
          width: 100%;
          padding: 0.75rem;
          background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
          color: white;
          border: none;
          border-radius: 0.75rem;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          margin-top: 0.5rem;
        }
        
        .login-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
        }
        
        .login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
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
            rgba(255, 255, 255, 0.3), 
            transparent);
          transition: left 0.6s;
        }
        
        .login-button:hover::before {
          left: 100%;
        }
        
        .message-container {
          padding: 0.75rem;
          border-radius: 0.75rem;
          text-align: center;
          font-size: 0.8rem;
          font-weight: 600;
          margin-top: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        
        .message-success {
          background: rgba(34, 197, 94, 0.1);
          color: #16a34a;
          border: 1px solid rgba(34, 197, 94, 0.2);
        }
        
        .message-error {
          background: rgba(239, 68, 68, 0.1);
          color: #dc2626;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }
        
        .security-notice {
          text-align: center;
          font-size: 0.75rem;
          color: #6b7280;
          margin-top: 1rem;
        }
        
        .footer {
          padding: 1rem 1.5rem;
          border-top: 1px solid #f3f4f6;
          background: rgba(249, 250, 251, 0.8);
          flex-shrink: 0;
        }
        
        .footer-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: #4b5563;
          font-weight: 500;
        }
        
        .support-info {
          text-align: center;
          margin-top: 1rem;
          font-size: 0.7rem;
          color: #9ca3af;
        }
        
        .support-link {
          color: #3b82f6;
          text-decoration: none;
        }
        
        .support-link:hover {
          text-decoration: underline;
        }
        
        .background-elements {
          position: absolute;
          inset: 0;
          z-index: 1;
          overflow: hidden;
        }
        
        .bg-circle {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.1;
        }
        
        .bg-circle-1 {
          width: 200px;
          height: 200px;
          background: #3b82f6;
          top: 10%;
          left: 10%;
          animation: float 8s ease-in-out infinite;
        }
        
        .bg-circle-2 {
          width: 300px;
          height: 300px;
          background: #8b5cf6;
          bottom: 10%;
          right: 10%;
          animation: float 10s ease-in-out infinite reverse;
        }
        
        .bg-circle-3 {
          width: 150px;
          height: 150px;
          background: #06b6d4;
          top: 50%;
          left: 80%;
          animation: float 12s ease-in-out infinite;
        }
        
        @media (max-height: 700px) {
          .glass-card {
            max-height: 98vh;
          }
          
          .form-content {
            max-height: calc(98vh - 180px);
            padding: 1rem;
          }
          
          .header-gradient {
            padding: 1rem;
          }
        }
        
        @media (max-height: 600px) {
          .form-content {
            max-height: calc(98vh - 160px);
            padding: 0.75rem;
          }
          
          .compact-form {
            gap: 0.75rem;
          }
        }
      `}</style>

      <div className="admin-login-container">
        <div className="background-elements">
          <div className="bg-circle bg-circle-1"></div>
          <div className="bg-circle bg-circle-2"></div>
          <div className="bg-circle bg-circle-3"></div>
        </div>
        
        <div className="glass-card">
          {/* Header Section */}
          <div className="header-gradient">
            <div className="compact-icon">
              <FaHeartbeat className="text-xl text-white" />
            </div>
            <h1 className="compact-title">Admin Portal</h1>
            <p className="compact-subtitle">Secure Healthcare Management System</p>
          </div>

          {/* Form Section */}
          <div className="form-content">
            <form onSubmit={handleSubmit(onSubmit)} className="compact-form">
              {/* Admin Name Field */}
              <div className="input-group">
                <label className="input-label">Administrator Name</label>
                <div className="input-container">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    {...register("adminName", {
                      required: "Admin name is required",
                      minLength: {
                        value: 3,
                        message: "Admin name must be at least 3 characters",
                      },
                    })}
                    className="input-field"
                    placeholder="Enter administrator name"
                    disabled={loading}
                  />
                </div>
                {errors.adminName && (
                  <p className="error-message">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {String(errors.adminName.message)}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="input-group">
                <label className="input-label">Password</label>
                <div className="input-container">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className="input-field"
                    placeholder="Enter your password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                    disabled={loading}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="error-message">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
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
                className="login-button"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Access Dashboard
                    <FaArrowRight className="ml-2" />
                  </span>
                )}
              </button>
            </form>

            {/* Message Display */}
            {message && (
              <div className={`message-container ${message.toLowerCase().includes("success") ? "message-success" : "message-error"}`}>
                {message.toLowerCase().includes("success") ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
                {message}
              </div>
            )}

            {/* Security Notice */}
            <div className="security-notice">
              🔒 Enterprise-grade healthcare administration platform
            </div>
          </div>

          {/* Footer */}
          <div className="footer">
            <div className="footer-content">
              <FaShieldAlt className="text-blue-500" />
              <span>HIPAA Compliant • End-to-End Encryption</span>
            </div>
            <div className="support-info">
              Need assistance? Contact{" "}
              <a href="mailto:support@medaihealth.com" className="support-link">
                support@medaihealth.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}