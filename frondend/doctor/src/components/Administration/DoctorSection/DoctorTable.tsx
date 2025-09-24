import { FC, useState } from 'react';

interface Doctor {
  id: number;
  name: string;
  username: string;
  password: string;
  specialization: string;
  phone: string;
  experience: string;
  status: string;
}

interface DoctorTableProps {
  doctors: Doctor[];
  showDoctorDetails: (id: number) => void;
}

const DoctorTable: FC<DoctorTableProps> = ({ doctors, showDoctorDetails }) => {
  const [visiblePasswords, setVisiblePasswords] = useState<{ [key: string]: boolean }>({});

  const togglePassword = (id: string) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">All Doctors</h3>
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
        <table className="w-full border-collapse doctor-table">
          <thead>
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-100 rounded-tl-lg">Doctor Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-100">Username</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-100">Password</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-100">Specialization</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-100">Phone Number</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-100">Experience</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-100">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-100 rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id} className="border-t border-gray-200 hover:bg-gray-100 transition-all">
                <td className="py-4 px-4">{doctor.name}</td>
                <td className="py-4 px-4">{doctor.username}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <span className="font-mono">{visiblePasswords[doctor.id] ? doctor.password : '••••••••'}</span>
                    <button
                      onClick={() => togglePassword(doctor.id.toString())}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                  </div>
                </td>
                <td className="py-4 px-4">{doctor.specialization}</td>
                <td className="py-4 px-4">{doctor.phone}</td>
                <td className="py-4 px-4">{doctor.experience}</td>
                <td className="py-4 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      doctor.status === 'Available'
                        ? 'bg-green-100 text-green-800'
                        : doctor.status === 'On Leave'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {doctor.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => showDoctorDetails(doctor.id)}
                    className="text-blue-600 hover:text-blue-800 mr-2"
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
        <p className="text-sm text-gray-600">Showing 1 to 5 of 24 doctors</p>
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

export default DoctorTable;