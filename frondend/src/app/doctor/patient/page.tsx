"use client";

import TopNav from "@/components/Doctor/PatientSection/TopNav";
import { useState, useEffect } from "react";

interface VitalSigns {
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  weight: string;
}

interface Consultation {
  id: string;
  date: string;
  doctor: string;
  specialization: string;
  reason: string;
  diagnosis: string;
  notes: string;
  prescription: string;
  vitalSigns: VitalSigns;
}

interface PatientData {
  fullName: string;
  age: number;
  gender: string;
  phoneNumber: string;
  userName: string
}

const mockConsultationHistory: Consultation[] = [
  {
    id: "CON-001",
    date: "2023-10-15",
    doctor: "Dr. Emily Chen",
    specialization: "Cardiology",
    reason: "Routine checkup for hypertension",
    diagnosis: "Hypertension under control",
    notes: "Patient reported consistent medication use. Blood pressure readings improved. Recommended continuing current medication and lifestyle changes.",
    prescription: "Continue Lisinopril 10mg daily",
    vitalSigns: {
      bloodPressure: "128/82",
      heartRate: "72 bpm",
      temperature: "98.6°F",
      weight: "68 kg"
    }
  },
  {
    id: "CON-002",
    date: "2023-08-22",
    doctor: "Dr. Robert Williams",
    specialization: "Endocrinology",
    reason: "Diabetes management",
    diagnosis: "Type 2 Diabetes - stable",
    notes: "Patient's glucose levels have improved with current medication. Recommended dietary adjustments and regular exercise.",
    prescription: "Continue Metformin 500mg twice daily",
    vitalSigns: {
      bloodPressure: "130/84",
      heartRate: "76 bpm",
      temperature: "98.4°F",
      weight: "69 kg"
    }
  },
  {
    id: "CON-003",
    date: "2023-06-10",
    doctor: "Dr. Amanda Lee",
    specialization: "General Medicine",
    reason: "Annual physical examination",
    diagnosis: "Generally healthy",
    notes: "Routine blood work within normal ranges. Discussed preventive care measures.",
    prescription: "None",
    vitalSigns: {
      bloodPressure: "125/80",
      heartRate: "70 bpm",
      temperature: "98.2°F",
      weight: "70 kg"
    }
  }
];

const PatientDetails = () => {
  const [patientData, setPatientData] = useState<PatientData>();
  const [consultationHistory, setConsultationHistory] = useState<Consultation[]>(mockConsultationHistory);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation>(mockConsultationHistory[0]);
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Fixed date formatting function with proper TypeScript types
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // In a real application, you would fetch this data based on the patient ID
  useEffect(() => {
    const localStorageData = localStorage.getItem("patientDetail")
    if (localStorageData){
      const patient_data = JSON.parse(localStorageData);
      setPatientData(patient_data)
    }
    // Fetch patient data and consultation history from API
    // setPatientData(fetchedData);
    // setConsultationHistory(fetchedHistory);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      
      <div className="container mx-auto px-4 py-6">
        {/* Patient Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">
                <i className="fas fa-user-injured"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{patientData?.fullName}</h1>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-600 font-medium">Active Patient</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="flex border-b">
            <button
              className={`px-6 py-4 font-medium ${activeTab === "overview" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`px-6 py-4 font-medium ${activeTab === "history" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("history")}
            >
              Consultation History
            </button>
            <button
              className={`px-6 py-4 font-medium ${activeTab === "medications" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("medications")}
            >
              Medications
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Patient Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-medium">{patientData?.age} years</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium capitalize">{patientData?.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="font-medium">{patientData?.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">User Name</p>
                  <p className="font-medium">{patientData?.userName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content based on active tab */}
          <div className="lg:col-span-2">
            {activeTab === "overview" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Patient Overview</h2>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Latest Consultation</h3>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold">{selectedConsultation.doctor}</p>
                        <p className="text-sm text-gray-600">{selectedConsultation.specialization}</p>
                      </div>
                      <span className="text-sm text-gray-500">{formatDate(selectedConsultation.date)}</span>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm text-gray-500">Reason for visit</p>
                      <p className="font-medium">{selectedConsultation.reason}</p>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm text-gray-500">Diagnosis</p>
                      <p className="font-medium">{selectedConsultation.diagnosis}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Notes</p>
                      <p className="text-gray-800">{selectedConsultation.notes}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Vital Signs Trends</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-2">Blood Pressure</p>
                      <p className="text-xl font-semibold">{selectedConsultation.vitalSigns.bloodPressure} mmHg</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-2">Heart Rate</p>
                      <p className="text-xl font-semibold">{selectedConsultation.vitalSigns.heartRate}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-2">Temperature</p>
                      <p className="text-xl font-semibold">{selectedConsultation.vitalSigns.temperature}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-2">Weight</p>
                      <p className="text-xl font-semibold">{selectedConsultation.vitalSigns.weight}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "history" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Consultation History</h2>
                
                <div className="space-y-4">
                  {consultationHistory.map((consultation) => (
                    <div key={consultation.id} className="border rounded-lg p-4 hover:bg-blue-50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold">{consultation.doctor}</p>
                          <p className="text-sm text-gray-600">{consultation.specialization}</p>
                        </div>
                        <span className="text-sm text-gray-500">{formatDate(consultation.date)}</span>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm text-gray-500">Reason for visit</p>
                        <p className="font-medium">{consultation.reason}</p>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm text-gray-500">Diagnosis</p>
                        <p className="font-medium">{consultation.diagnosis}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <button 
                          className="text-blue-600 text-sm font-medium"
                          onClick={() => setSelectedConsultation(consultation)}
                        >
                          View Details
                        </button>
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                          {consultation.id}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "medications" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Current Medications</h2>

                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Prescription History</h3>
                  <div className="space-y-3">
                    {consultationHistory.map((consultation) => (
                      consultation.prescription !== "None" && (
                        <div key={consultation.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <p className="font-medium">{formatDate(consultation.date)}</p>
                            <p className="text-sm text-gray-600">{consultation.doctor}</p>
                          </div>
                          <p className="text-gray-800">{consultation.prescription}</p>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;