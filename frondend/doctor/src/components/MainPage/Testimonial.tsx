import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function Testimonial() {
  return (
    <div className="bg-gray-50 mt-24 py-16 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Patients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Hear from patients who have experienced the benefits of our AI-powered healthcare monitoring system</p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <FontAwesomeIcon icon={faUser} className="text-blue-600 text-xl" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Sarah Johnson</h4>
                <p className="text-sm text-gray-500">Patient since 2021</p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">"The AI monitoring system has completely transformed how I manage my hypertension. The timely alerts and doctor notifications give me peace of mind."</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <FontAwesomeIcon icon={faUser} className="text-purple-600 text-xl" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Michael Chen</h4>
                <p className="text-sm text-gray-500">Patient since 2020</p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">"As someone with diabetes, having 24/7 access to my health information and being able to message my care team has been life-changing. The automated appointment feature is brilliant!"</p>
          </div>
        </div>
      </div>
    </div>
  );
}