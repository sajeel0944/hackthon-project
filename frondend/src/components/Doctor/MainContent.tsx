"use client";

import { useState, useMemo, useEffect } from "react";
import PatientRow from "./PatientRow";

const patientsData = [
  {
    name: "Fatima Ahmed",
    phone: "+92 321 1234567",
    age: 52,
    gender: "Female",
    status: "Critical",
    statusColor: "red",
  },
  {
    name: "Ali Raza",
    phone: "+92 300 9876543",
    age: 45,
    gender: "Male",
    status: "Warning",
    statusColor: "yellow",
  },
  {
    name: "Zainab Khan",
    phone: "+92 333 4567890",
    age: 28,
    gender: "Female",
    status: "Stable",
    statusColor: "green",
  },
  {
    name: "Usman Ali",
    phone: "+92 301 1122334",
    age: 61,
    gender: "Male",
    status: "Stable",
    statusColor: "green",
  },
  {
    name: "Ayesha Malik",
    phone: "+92 322 5566778",
    age: 35,
    gender: "Female",
    status: "Warning",
    statusColor: "yellow",
  },
  // Add more patients if you want for testing pagination
];

const PATIENTS_PER_PAGE = 5;

export default function MainContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorName, setDoctorName] = useState<string>("")

  useEffect(() => {
  const localStorageData = localStorage.getItem("doctorData");

  if (localStorageData) {
    const parsedData = JSON.parse(localStorageData); // Now it's an object
    setDoctorName(parsedData.fullName); // Accessing doctorName safely
  }
}, []);

  // Filter patients based on search term
  const filteredPatients = useMemo(() => {
    if (!searchTerm) return patientsData;
    return patientsData.filter((patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredPatients.length / PATIENTS_PER_PAGE);
  const paginatedPatients = useMemo(() => {
    const startIndex = (currentPage - 1) * PATIENTS_PER_PAGE;
    return filteredPatients.slice(startIndex, startIndex + PATIENTS_PER_PAGE);
  }, [filteredPatients, currentPage]);

  // Handlers
  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset page when search changes
  };

  const handlePageChange = (page: any) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="w-full p-6 ">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl shadow-md p-6 mb-6 ">
        <h1 className="text-2xl font-bold mb-2">Good Morning, Dr. {doctorName}</h1>
        <p className="opacity-90">
          You have 12 patients to monitor today. 3 need immediate attention.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Total Patients */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-600">Total Patients</h3>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <i className="fas fa-users text-primary text-xl"></i>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800 mt-3">42</p>
          <p className="text-xs text-green-600 mt-1">
            <i className="fas fa-arrow-up"></i> 5 new this month
          </p>
        </div>

        {/* Today's Appointments */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-600">Today's Appointments</h3>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <i className="fas fa-calendar-check text-green-600 text-xl"></i>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800 mt-3">8</p>
          <p className="text-xs text-gray-600 mt-1">Next: Ali Raza at 11:30 AM</p>
        </div>

        {/* Critical Alerts */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-600">Critical Alerts</h3>
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800 mt-3">3</p>
          <p className="text-xs text-red-600 mt-1">Require immediate attention</p>
        </div>
      </div>

      {/* Patient List Section */}
      <div className="bg-white rounded-xl shadow-md p-6 ">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Patient Records</h2>
          <div className="flex space-x-3">
            <div className="relative ">
              <input
                type="text"
                placeholder="Search patients..."
                className="pl-10 pr-4 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                id="patient-search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
            <button className="bg-primary  px-4 py-2 rounded-lg hover:bg-dark transition-colors">
              <i className="fas fa-filter mr-2"></i> Filter
            </button>
          </div>
        </div>

        {/* Patient Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-700">Patient Name</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Phone Number</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Age</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Gender</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Password</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y">
              {paginatedPatients.length > 0 ? (
                paginatedPatients.map((patient, idx) => (
                  <PatientRow key={idx} {...patient} />
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-600">
            Showing {paginatedPatients.length > 0 ? (currentPage - 1) * PATIENTS_PER_PAGE + 1 : 0} to{" "}
            {(currentPage - 1) * PATIENTS_PER_PAGE + paginatedPatients.length} of{" "}
            {filteredPatients.length} patients
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <i className="fas fa-chevron-left"></i>
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1 border rounded-lg ${
                    pageNum === currentPage
                      ? "border-primary bg-primary text-white"
                      : "border-gray-300 text-gray-600 hover:bg-gray-100"
                  }`}
                  aria-current={pageNum === currentPage ? "page" : undefined}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
              disabled={currentPage === totalPages || totalPages === 0}
              aria-label="Next page"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}