"use client";

import { useState } from "react";
import DoctorStatsOverview from "@/components/Administration/DoctorSection/DoctorStatsOverview";
import DoctorTable from "@/components/Administration/DoctorSection/DoctorTable";
import DoctorModal from "@/components/Administration/DoctorSection/DoctorModal";
import Warpper from "@/components/Administration/Warpper";

interface Doctor {
  id: number;
  name: string;
  username: string;
  password: string;
  phone: string;
  email: string;
  experience: string;
  specialization: string;
  license: string;
  hospital: string;
  status: string;
  slot: string;
  hours: string;
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Ahmed Khan",
    username: "ahmed.khan",
    password: "Doc@12345",
    phone: "+92 321 1234567",
    email: "ahmed.khan@medai.com",
    experience: "12 years",
    specialization: "Cardiology",
    license: "MED-PK-12345",
    hospital: "MedAI Central Hospital",
    status: "Available",
    slot: "Tomorrow, 10:00 AM",
    hours: "9:00 AM - 5:00 PM (Mon - Fri)",
  },
  {
    id: 2,
    name: "Dr. Sara Ahmed",
    username: "sara.ahmed",
    password: "Sara@7890",
    phone: "+92 300 9876543",
    email: "sara.ahmed@medai.com",
    experience: "8 years",
    specialization: "Pediatrics",
    license: "MED-PK-23456",
    hospital: "MedAI Central Hospital",
    status: "Available",
    slot: "Today, 3:00 PM",
    hours: "10:00 AM - 6:00 PM (Mon - Fri)",
  },
  {
    id: 3,
    name: "Dr. Ali Raza",
    username: "ali.raza",
    password: "Ali@4567",
    phone: "+92 333 4567890",
    email: "ali.raza@medai.com",
    experience: "15 years",
    specialization: "Orthopedics",
    license: "MED-PK-34567",
    hospital: "MedAI Central Hospital",
    status: "On Leave",
    slot: "Next Monday, 9:00 AM",
    hours: "8:00 AM - 4:00 PM (Mon - Fri)",
  },
  {
    id: 4,
    name: "Dr. Fatima Malik",
    username: "fatima.malik",
    password: "Fatima@2023",
    phone: "+92 301 1122334",
    email: "fatima.malik@medai.com",
    experience: "10 years",
    specialization: "Dermatology",
    license: "MED-PK-45678",
    hospital: "MedAI Central Hospital",
    status: "Available",
    slot: "Today, 11:30 AM",
    hours: "9:00 AM - 5:00 PM (Mon - Sat)",
  },
  {
    id: 5,
    name: "Dr. Usman Ali",
    username: "usman.ali",
    password: "Usman@789!",
    phone: "+92 322 5566778",
    email: "usman.ali@medai.com",
    experience: "18 years",
    specialization: "Neurology",
    license: "MED-PK-56789",
    hospital: "MedAI Central Hospital",
    status: "Busy",
    slot: "Tomorrow, 2:00 PM",
    hours: "8:00 AM - 4:00 PM (Mon - Fri)",
  },
];

export default function Doctors() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showDoctorDetails = (doctorId: number) => {
    const doctor = doctors.find((d) => d.id === doctorId);
    setSelectedDoctor(doctor || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <>
      <Warpper pageName="Doctors">
        <div className="flex min-h-screen bg-gray-50">
          <div className={`flex-1 transition-all duration-300 `}>
            <div className="p-6">
              <DoctorStatsOverview />
              <DoctorTable
                doctors={doctors}
                showDoctorDetails={showDoctorDetails}
              />
            </div>
          </div>
          {isModalOpen && selectedDoctor && (
            <DoctorModal doctor={selectedDoctor} closeModal={closeModal} />
          )}
        </div>
      </Warpper>
    </>
  );
}
