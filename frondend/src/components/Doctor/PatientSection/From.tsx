"use client";

import {
  AddPatientDetails,
  AddPatientDetailsSchema,
} from "@/components/BankendApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheckCircle, FaExclamationCircle, FaSpinner } from "react-icons/fa";

interface FromSchema {
  diagnosis?: string;
  allergies?: string;
  bloodType?: string;
  diastolicBP?: string;
  glucoseMax?: string;
  medications?: string;
  monitoringInstructions: string;
  prescribedMedication: string;
  systolicBP?: string;
}

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FromSchema>();

  const [loading, setloading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const onSubmit = async (data: FromSchema) => {
    try {
      setloading(true);

      const localStorageData1 = localStorage.getItem("doctorData");
      const localStorageData2 = localStorage.getItem("patientDetail");

      if (localStorageData1 && localStorageData2) {
        const doctor_data = JSON.parse(localStorageData1);
        const patient_data = JSON.parse(localStorageData2);

        const doctor_detail: AddPatientDetailsSchema = {
          hospital: doctor_data.hospital,
          doctorfullName: doctor_data.fullName,
          doctorUserName: doctor_data.userName,
          doctorSpecialization: doctor_data.specialization,
          patientUserName: patient_data.userName,
          primaryDiagnosis: data.diagnosis,
          bloodType: data.bloodType,
          currentMedications: data.medications,
          allergies: data.allergies,
          prescribedMedication: data.prescribedMedication,
          monitoringInstructions: data.monitoringInstructions,
          systolicBP_Max: data.systolicBP,
          diastolicBP_Max: data.diastolicBP,
          GlucoseMax: data.glucoseMax,
        };

        const result = await AddPatientDetails(doctor_detail);
        if (result.status) {
          reset();
        }
        setMessage(result.response);
      }
    } catch {
      setMessage(
        "Something went wrong while updating the patient details. Please try again later or contact support."
      );
    } finally {
      setloading(false);
      setTimeout(() => {
        setMessage("");
      }, 7000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Add Patient Detail
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* --- All Optional Fields Below --- */}

          <div className="md:col-span-2 mt-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
              Medical Information
            </h2>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Primary Diagnosis
            </label>
            <select
              {...register("diagnosis")}
              className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Select Condition</option>
              <option>Hypertension (High BP)</option>
              <option>Diabetes Type 2</option>
              <option>Heart Disease</option>
              <option>Asthma</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blood Type
            </label>
            <select
              {...register("bloodType")}
              className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Select Blood Type</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>O+</option>
              <option>O-</option>
              <option>AB+</option>
              <option>AB-</option>
            </select>
          </div>

          <div className="md:col-span-2 text-gray-700">
            <label className="block text-sm font-medium mb-1">
              Current Medications
            </label>
            <textarea
              {...register("medications")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={2}
            ></textarea>
          </div>

          <div className="md:col-span-2 text-gray-700">
            <label className="block text-sm font-medium mb-1">Allergies</label>
            <textarea
              {...register("allergies")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={2}
            ></textarea>
          </div>

          <div className="md:col-span-2 mt-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
              Treatment Plan
            </h2>
          </div>

          <div className="md:col-span-2 text-gray-700">
            <label className="block text-sm font-medium mb-1">
              Prescribed Medication
            </label>
            <textarea
              {...register("prescribedMedication", {
                required: "Prescribed medication is required",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Medication name, dosage, frequency..."
            ></textarea>
            {errors.prescribedMedication && (
              <p className="text-red-500 text-sm mt-1">
                {errors.prescribedMedication.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2 text-gray-700">
            <label className="block text-sm font-medium mb-1">
              Monitoring Instructions for AI Agent
            </label>
            <textarea
              {...register("monitoringInstructions", {
                required: "Monitoring instructions are required",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="e.g., 'Monitor BP twice daily', 'Check glucose levels after meals'"
            ></textarea>
            {errors.monitoringInstructions && (
              <p className="text-red-500 text-sm mt-1">
                {errors.monitoringInstructions.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2 text-gray-700">
            <label className="block text-sm font-medium mb-1">
              Alert Thresholds
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Systolic BP (Max)
                </label>
                <input
                  {...register("systolicBP")}
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., 140"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Diastolic BP (Max)
                </label>
                <input
                  {...register("diastolicBP")}
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., 90"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Glucose (Max)
                </label>
                <input
                  {...register("glucoseMax")}
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., 180"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-end mt-8">
            <button
              type="button"
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg mr-4 font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              className={`px-5 py-3 cursor-pointer bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold uppercase rounded-lg shadow-lg transform transition-all duration-300 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <FaSpinner className="animate-spin" />
                  <span>Saving...</span>
                </div>
              ) : (
                <span>Save Details</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Message / Alert */}
      {message && (
        <div
          className={`
      fixed top-1 left-1/2 transform -translate-x-1/2 flex items-center gap-3 px-6 py-3 rounded-lg
      ${
        message.toLowerCase().includes("thank")
          ? "bg-green-50 border border-green-400 text-green-800"
          : ""
      }
      ${
        message.toLowerCase().includes("wrong")
          ? "bg-red-50 border border-red-400 text-red-800"
          : ""
      }
      ${
        message.toLowerCase().includes("no")
          ? "bg-blue-50 border border-blue-400 text-blue-800"
          : ""
      }
      shadow-sm max-w-md w-full z-50
    `}
          role="alert"
        >
          {message.toLowerCase().includes("thank") && (
            <FaCheckCircle className="text-green-600 w-5 h-5" />
          )}
          {message.toLowerCase().includes("wrong") && (
            <FaExclamationCircle className="text-red-600 w-5 h-5" />
          )}
          {message.toLowerCase().includes("no") && (
            <FaExclamationCircle className="text-blue-600 w-5 h-5" />
          )}

          <span className="flex-1 text-sm">{message}</span>

          <button
            onClick={() => setMessage("")}
            className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
            aria-label="Close message"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
