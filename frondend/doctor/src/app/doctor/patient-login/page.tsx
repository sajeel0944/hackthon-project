"use client";

import { PatientSignIn } from "@/components/BankendApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaHeartbeat, FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import Cookies from "js-cookie";

type FormValues = {
  patientName: string;
  password: string;
};

type LoginFormData = {
  patientName: string;
  password: string;
};

export default function PatientLogin() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    const { patientName, password } = data;

    try {
      const response = await PatientSignIn(patientName, password);
      setMessage(response.message);
      if (response.response) {
        localStorage.setItem(
          "patientDetail",
          JSON.stringify(response.patientData)
        );

        Cookies.set("patientSharedWithDoctor", "true");

        router.push("/doctor/patient");
      }
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

   useEffect(() => {
      
      const localStorageData = localStorage.getItem("patientDetail");
  
      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData); // Now it's an object
        if (parsedData) {
          router.push("/doctor/patient");
        }
      }
    }, []);
  const handleClear = () => {
    reset();
    setShowPassword(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full flex flex-col md:flex-row rounded-xl shadow-xl overflow-hidden bg-white">
        {/* Left Panel */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 md:w-2/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center mb-8">
              <div className="animate-pulse flex items-center justify-center w-12 h-12 mr-3 rounded-full bg-white/30">
                <FaHeartbeat className="text-2xl" />
              </div>
              <h3 className="text-2xl font-bold">MedAI Health</h3>
            </div>
            <h1 className="text-3xl font-bold mb-4">Patient Login</h1>
            <p className="text-blue-100 mb-6">
              Login your patients for AI-powered health monitoring with our
              advanced system.
            </p>
            <ul className="space-y-2">
              {[
                "Continuous health monitoring",
                "Automated alerts",
                "Appointment scheduling",
                "Doctor summary reports",
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <FaCheckCircle className="mr-2 text-green-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 text-sm text-blue-200">
            <p>Secure & HIPAA Compliant</p>
            <p className="mt-1">© 2025 MedAI Health Systems</p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-white p-8 md:w-3/5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Login Patient</h2>
            <span className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full">
              Doctor Portal
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Patient Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient Name
              </label>
              <input
                type="text"
                {...register("patientName", {
                  required: "Patient name is required",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Patient's name"
              />
              {errors.patientName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.patientName.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Minimum 8 characters",
                    },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 mt-16">
              <button
                type="button"
                onClick={handleClear}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition cursor-pointer"
              >
                Clear Form
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium transition cursor-pointer"
              >
                {loading ? "Login in..." : "Login Patient"}
              </button>
            </div>
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
        </div>
      </div>
    </div>
  );
}
