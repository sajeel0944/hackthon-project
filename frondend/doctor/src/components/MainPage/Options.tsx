import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserInjured, faUserMd, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function Options() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 pt-12">
      {/* Patient Login Option */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="p-8 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6 text-blue-600">
            <FontAwesomeIcon icon={faUserInjured} className="text-3xl" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Patient Portal</h3>
          <p className="mb-6 text-gray-600 leading-relaxed">Access your personal health dashboard, view records, and communicate with your care team</p>
          <Link href="/patient" className="w-full bg-blue-600 text-white text-center py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md">
            Sign In as Patient
          </Link>
        </div>
      </div>

      {/* Doctor Login Option */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="p-8 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mb-6 text-purple-600">
            <FontAwesomeIcon icon={faUserMd} className="text-3xl" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Doctor Portal</h3>
          <p className="mb-6 text-gray-600 leading-relaxed">Access professional tools to manage your patients, view reports, and provide care</p>
          <Link href="/doctor" className="w-full bg-purple-600 text-white text-center py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors shadow-md">
            Sign In as Doctor
          </Link>
        </div>
      </div>

      {/* Patient Signup Option */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="p-8 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6 text-green-600">
            <FontAwesomeIcon icon={faUserPlus} className="text-3xl" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Administration</h3>
          <p className="mb-6 text-gray-600 leading-relaxed">Create your account to access our healthcare services and manage your health online</p>
          <Link href="/administration" className="w-full bg-green-600 text-white text-center py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-md">
            Sign in as Administration
          </Link>
        </div>
      </div>
    </div>
  );
}