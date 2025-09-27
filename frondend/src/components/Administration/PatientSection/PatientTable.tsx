import { FC, useState } from 'react';

interface Patient {
  id: number;
  name: string;
  username: string;
  password: string;
  phone: string;
  age: string;
  gender: string;
  status: string;
}

interface PatientTableProps {
  patients: Patient[];
  showPatientDetails: (id: number) => void;
}

const PatientTable: FC<PatientTableProps> = ({ patients, showPatientDetails }) => {
  const [visiblePasswords, setVisiblePasswords] = useState<{ [key: string]: boolean }>({});

  const togglePassword = (id: string) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">All Patients</h3>
        <div className="flex space-x-2">
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm">
            <i className="fas fa-filter mr-1"></i> Filter
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm">
            <i className="fas fa-sort mr-1"></i> Sort
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm">
            <i className="fas fa-download mr-1"></i> Export
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-100 rounded-tl-lg">Patient Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-100">Username</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-100">Password</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-100">Phone Number</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-100">Age</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-100">Gender</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-100">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-100 rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="border-t border-gray-200 hover:bg-gray-100 transition-all">
                <td className="py-4 px-4">{patient.name}</td>
                <td className="py-4 px-4">{patient.username}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <span className="font-mono">{visiblePasswords[patient.id] ? patient.password : '••••••••'}</span>
                    <button
                      onClick={() => togglePassword(patient.id.toString())}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                  </div>
                </td>
                <td className="py-4 px-4">{patient.phone}</td>
                <td className="py-4 px-4">{patient.age}</td>
                <td className="py-4 px-4">{patient.gender}</td>
                <td className="py-4 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      patient.status === 'Critical'
                        ? 'bg-red-100 text-red-800'
                        : patient.status === 'Warning'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {patient.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => showPatientDetails(patient.id)}
                    className="text-blue-600 hover:text-blue-800 mr-2 cursor-pointer"
                  >

                    <i className="fas fa-eye">click</i>
                  </button>
                  <button className="text-green-600 hover:text-green-800 mr-2">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-600">Showing 1 to 5 of 42 patients</p>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="px-3 py-1 border border-blue-500 bg-blue-500 text-white rounded-lg">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">2</button>
          <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">3</button>
          <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientTable;