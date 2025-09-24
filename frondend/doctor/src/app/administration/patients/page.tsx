"use client";

import { useState } from "react";
import PatientTable from "@/components/Administration/PatientSection/PatientTable";
import StatsOverview from "@/components/Administration/PatientSection/StatsOverview";
import PatientModal from "@/components/Administration/PatientSection/PatientModal";
import Warpper from "@/components/Administration/Warpper";

interface Patient {
  id: number;
  name: string;
  username: string;
  password: string;
  phone: string;
  age: string;
  gender: string;
  status: string;
  lastCheck: string;
  conditions: string;
  medications: string;
}

const patients: Patient[] = [
  {
    id: 1,
    name: "Fatima Ahmed",
    username: "fatima.ahmed",
    password: "P@ssw0rd123",
    phone: "+92 321 1234567",
    age: "52",
    gender: "Female",
    status: "Critical",
    lastCheck: "2023-10-15",
    conditions: "Hypertension, Diabetes Type 2",
    medications: "Lisinopril 10mg, Metformin 500mg",
  },
  {
    id: 2,
    name: "Ali Raza",
    username: "ali.raza",
    password: "SecurePass789",
    phone: "+92 300 9876543",
    age: "45",
    gender: "Male",
    status: "Warning",
    lastCheck: "2023-10-18",
    conditions: "Asthma",
    medications: "Albuterol Inhaler",
  },
  {
    id: 3,
    name: "Zainab Khan",
    username: "zainab.khan",
    password: "Z@inab2023",
    phone: "+92 333 4567890",
    age: "28",
    gender: "Female",
    status: "Stable",
    lastCheck: "2023-10-20",
    conditions: "None",
    medications: "None",
  },
  {
    id: 4,
    name: "Usman Ali",
    username: "usman.ali",
    password: "Usman@123",
    phone: "+92 301 1122334",
    age: "61",
    gender: "Male",
    status: "Stable",
    lastCheck: "2023-10-17",
    conditions: "Arthritis",
    medications: "Ibuprofen 400mg",
  },
  {
    id: 5,
    name: "Ayesha Malik",
    username: "ayesha.malik",
    password: "Ayesh@789!",
    phone: "+92 322 5566778",
    age: "35",
    gender: "Female",
    status: "Warning",
    lastCheck: "2023-10-19",
    conditions: "Migraine",
    medications: "Sumatriptan 50mg",
  },
];

export default function patient() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const showPatientDetails = (patientId: number) => {
    const patient = patients.find((p) => p.id === patientId);
    setSelectedPatient(patient || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  return (
    <>
      <Warpper pageName="Patients">
        <div className="flex  bg-gray-50">
          {/* <Sidebar /> */}
          <div className={`transition-all duration-300 w-full`}>
            <div className="p-6">
              <StatsOverview />
              <button className="bg-blue-600 text-white ml-auto mb-4 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center cursor-pointer">
                <i className="fas fa-plus mr-2"></i>
                <span>New Patient</span>
              </button>
              <PatientTable
                patients={patients}
                showPatientDetails={showPatientDetails}
              />
            </div>
          </div>
          {isModalOpen && selectedPatient && (
            <PatientModal patient={selectedPatient} closeModal={closeModal} />
          )}
        </div>
      </Warpper>
    </>
  );
}
