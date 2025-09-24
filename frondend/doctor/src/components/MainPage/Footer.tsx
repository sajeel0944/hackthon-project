import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat, faPhoneAlt, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-blue-600 p-2 rounded-lg">
                <FontAwesomeIcon icon={faHeartbeat} className="text-xl" />
              </div>
              <span className="text-xl font-bold">MedConnect</span>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">Providing intelligent healthcare solutions through AI-powered monitoring and seamless patient-doctor connectivity.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Find a Doctor</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Patient Resources</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-400">
                <FontAwesomeIcon icon={faPhoneAlt} className="mr-3 text-blue-400" />
                (800) 123-4567
              </li>
              <li className="flex items-center text-gray-400">
                <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-blue-400" />
                support@medconnect.com
              </li>
              <li className="flex items-center text-gray-400">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-3 text-blue-400" />
                123 Health Ave, Medical Center
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-400 transition-colors">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-purple-600 transition-colors">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-700 transition-colors">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
          <p>© 2023 MedConnect. All rights reserved. | <a href="#" className="hover:text-white transition-colors">Privacy Policy</a> | <a href="#" className="hover:text-white transition-colors">Terms of Service</a></p>
        </div>
      </div>
    </footer>
  );
}