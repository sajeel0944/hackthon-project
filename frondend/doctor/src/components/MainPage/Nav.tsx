import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="bg-white shadow-md border-b border-gray-100">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-b from-blue-800 to-blue-900 p-2 rounded-lg">
              <FontAwesomeIcon icon={faHeartbeat} className="text-xl text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">MedConnect</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</Link>
            <Link href="/services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Services</Link>
            <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About Us</Link>
            <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</Link>
          </div>
          <div>
            <a href="#" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-md">
              Emergency?
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}