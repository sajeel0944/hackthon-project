"use client";

import { DoctorRegister, DoctorRegisterSchema } from "@/components/BankendApi";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  FaHeartbeat,
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
  FaInfoCircle,
  FaUserMd,
  FaGraduationCap,
  FaHospital,
  FaExclamationCircle,
  FaTimes,
} from "react-icons/fa";

type FormValues = {
  fullName: string;
  specialization: string;
  yearsOfExperience: number;
  gender: string;
  phoneNumber: string;
  userName: string;
  password: string;
  confirmPassword: string;
  consent: boolean;
};

export default function DoctorRegistration() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showMessage, setShowMessage] = useState<string>("");
  const [loading, setloading] = useState<boolean>(false);
  const [hospitalName, setHospitalName] = useState<string>("");

  useEffect(() => {
    const getAdminData = localStorage.getItem("adminData");
    if (getAdminData) {
      const admindata = JSON.parse(getAdminData);
      setHospitalName(admindata.hospitalName);
    }
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (data.password === data.confirmPassword) {
          setloading(true)
          try {
            const doctortData: DoctorRegisterSchema = {
              fullName: data.fullName,
              specialization: data.specialization,
              yearsOfExperience: Number(data.yearsOfExperience),
              hospital: hospitalName,
              gender: data.gender,
              phoneNumber: data.phoneNumber,
              userName: data.userName,
              password: data.password,
              consent: data.consent
            };

            const response = await DoctorRegister(doctortData);

            if (response.status) {
              setShowMessage(response.message);
              reset();
              setShowPassword(false);
              setShowConfirm(false);
            }else{
              setShowMessage(response.message);
            }
          } catch {
            setShowMessage("Something went wrong. Please try again later.");
          } finally{
            setloading(false)
            setTimeout(() => {
                setShowMessage("");
            }, 3500);
          }
        } else {
          setShowMessage("Passwords do not match!");
        }
  };

  const specializations = [
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "Neurology",
    "Oncology",
    "Pediatrics",
    "Psychiatry",
    "Radiology",
    "Surgery",
    "Urology",
  ];

  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-4 py-10">
      <div className="max-w-5xl w-full flex flex-col md:flex-row rounded-xl shadow-2xl overflow-hidden">
        {/* Left Panel */}
        <div className="bg-purple-600 text-white p-8 md:w-2/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center mb-8">
              <FaHeartbeat className="text-3xl mr-3" />
              <span className="text-2xl font-bold">MedAI Health</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">Doctor Registration</h1>
            <p className="text-purple-100 mb-6">
              Register doctors to access the AI-powered health monitoring system
              and manage patients.
            </p>
            <ul className="space-y-3">
              {[
                "Patient management tools",
                "Health monitoring access",
                "Appointment scheduling",
                "Analytics dashboard",
              ].map((item, i) => (
                <li className="flex items-center" key={i}>
                  <FaCheckCircle className="mr-2 text-green-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 text-purple-200 text-sm">
            <p>Secure & HIPAA Compliant</p>
            <p className="mt-1">© 2023 MedAI Health Systems</p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-white p-8 md:w-3/5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Register New Doctor
            </h2>
            <span className="bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full">
              Admin Portal
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Professional Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FaUserMd className="mr-2 text-purple-600" />
                Professional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register("fullName", {
                      required: "Full name is required",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Dr. Full Name"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Specialization */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specialization
                  </label>
                  <select
                    {...register("specialization", {
                      required: "Specialization is required",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Select Specialization</option>
                    {specializations.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                  {errors.specialization && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.specialization.message}
                    </p>
                  )}
                </div>

                {/* Years of Experience */}
                <div>
                  <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                    Years of Experience
                    <FaGraduationCap className="ml-1 text-gray-500" />
                  </label>
                  <input
                    type="number"
                    {...register("yearsOfExperience", {
                      required: "Years of experience is required",
                      min: { value: 0, message: "Cannot be negative" },
                      max: { value: 60, message: "Maximum 60 years" },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="5"
                  />
                  {errors.yearsOfExperience && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.yearsOfExperience.message}
                    </p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    {...register("gender", { required: "Gender is required" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.gender.message}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    {...register("phoneNumber", {
                      required: "Phone number is required",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="+92 XXX XXXXXX"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Security Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Security Information
              </h3>
              {/* User Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User Name
                </label>
                <input
                  type="text"
                  {...register("userName", {
                    required: "User Name is required",
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="User Name"
                />
                {errors.userName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.userName.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                          message:
                            "Must include uppercase, lowercase, and number",
                        },
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Create password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      {...register("confirmPassword", {
                        required: "Confirm your password",
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-2 text-gray-500"
                      onClick={() => setShowConfirm(!showConfirm)}
                    >
                      {showConfirm ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-2 bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600 flex items-center">
                  <FaInfoCircle className="mr-1 text-purple-600" />
                  Password must be at least 8 characters with uppercase,
                  lowercase, and number
                </p>
              </div>
            </div>

            {/* Consent */}
            <div className="flex items-start">
              <input
                type="checkbox"
                {...register("consent", { required: "Consent is required" })}
                className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded mt-1"
              />
              <label className="ml-3 text-sm text-gray-700">
                I confirm that all information provided is accurate and I have
                the authority to register this doctor in the system.
              </label>
            </div>
            {errors.consent && (
              <p className="text-red-500 text-xs mt-1">
                {errors.consent.message}
              </p>
            )}

            {/* Buttons */}
            {loading ? (
              <button
                type="button"
                className="px-6 py-3 mx-auto bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors cursor-not-allowed flex"
              >
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Registering...
              </button>
            ) : (
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setShowPassword(false);
                    setShowConfirm(false);
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors w-1/2 cursor-pointer"
                >
                  Clear Form
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors w-1/2 cursor-pointer"
                >
                  Register Doctor
                </button>
              </div>
            )}
          </form>

          {/* Additional Links */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>
              Need to register multiple doctors?{" "}
              <a
                href="#"
                className="text-purple-600 font-medium hover:underline"
              >
                Use our batch upload tool
              </a>
            </p>
          </div>
        </div>
      </div>

      {showMessage && (
        <div
          className={`fixed bottom-0 left-0 mb-4 flex items-center rounded-md px-4 py-3 text-sm font-medium shadow ${
            showMessage.includes("success")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
          role="alert"
          aria-live="assertive"
        >
          {showMessage.includes("success") ? (
            <FaCheckCircle className="mr-2" />
          ) : (
            <FaExclamationCircle className="mr-2" />
          )}
          <span>{showMessage}</span>
          <span
            onClick={() => {
              setShowMessage("");
            }}
            className="pl-2 cursor-pointer"
          >
            <FaTimes />
          </span>
        </div>
      )}
    </div>
  );
}
