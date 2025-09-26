import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faClock, faComments } from '@fortawesome/free-solid-svg-icons';

export default function Info() {
  return (
    <div className="max-w-6xl mx-auto mt-24 px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FontAwesomeIcon icon={faLock} className="text-blue-600 w-8 h-8" />
        </div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Secure & Private</h3>
        <p className="text-gray-600 leading-relaxed">Your health data is protected with industry-leading security measures and HIPAA compliance</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FontAwesomeIcon icon={faClock} className="text-purple-600 w-8 h-8" />
        </div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">24/7 Access</h3>
        <p className="text-gray-600 leading-relaxed">Access your health information anytime, anywhere from any device with our responsive platform</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FontAwesomeIcon icon={faComments} className="text-green-600 w-8 h-8" />
        </div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Direct Communication</h3>
        <p className="text-gray-600 leading-relaxed">Message your healthcare providers directly through our secure, encrypted messaging system</p>
      </div>
    </div>
  );
}