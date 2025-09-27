import { FC, useState } from 'react';

interface Doctor {
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

interface DoctorModalProps {
  doctor: Doctor;
  closeModal: () => void;
}

const DoctorModal: FC<DoctorModalProps> = ({ doctor, closeModal }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleModalPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">Doctor Details</h3>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <h4 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Personal Information</h4>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <p className="px-4 py-2 bg-gray-50 rounded-lg">{doctor.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <p className="px-4 py-2 bg-gray-50 rounded-lg">{doctor.phone}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <p className="px-4 py-2 bg-gray-50 rounded-lg">{doctor.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
              <p className="px-4 py-2 bg-gray-50 rounded-lg">{doctor.experience}</p>
            </div>
            <div className="md:col-span-2 mt-6">
              <h4 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Professional Information</h4>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
              <p className="px-4 py-2 bg-gray-50 rounded-lg">{doctor.specialization}</p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
              <p className="px-4 py-2 bg-gray-50 rounded-lg">{doctor.license}</p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Hospital/Clinic</label>
              <p className="px-4 py-2 bg-gray-50 rounded-lg">{doctor.hospital}</p>
            </div>
            <div className="md:col-span-2 mt-6">
              <h4 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Security Information</h4>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <p className="px-4 py-2 bg-gray-50 rounded-lg">{doctor.username}</p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="flex items-center">
                <p className="px-4 py-2 bg-gray-50 rounded-lg font-mono">
                  {showPassword ? doctor.password : '••••••••'}
                </p>
                <button onClick={toggleModalPassword} className="ml-2 text-blue-600 hover:text-blue-800">
                  <i className="fas fa-eye"></i>
                </button>
              </div>
            </div>
            <div className="md:col-span-2 mt-6">
              <h4 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Availability</h4>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <p
                className={`px-4 py-2 rounded-full text-xs inline-block ${
                  doctor.status === 'Available'
                    ? 'bg-green-100 text-green-800'
                    : doctor.status === 'On Leave'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {doctor.status}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Next Available Slot</label>
              <p className="px-4 py-2 bg-gray-50 rounded-lg">{doctor.slot}</p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Working Hours</label>
              <p className="px-4 py-2 bg-gray-50 rounded-lg">{doctor.hours}</p>
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <i className="fas fa-edit mr-2"></i> Edit Doctor
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorModal;