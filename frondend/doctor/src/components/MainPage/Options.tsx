// components/Options.jsx
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserInjured, faUserMd, faUserPlus, faArrowRight, faShield, faChartLine, faCogs } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useState } from 'react';

export default function Options() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        .portal-card {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.9) 0%, 
            rgba(255, 255, 255, 0.7) 100%);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.8),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
        }

        .portal-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.6), 
            transparent);
          transition: left 0.7s ease-in-out;
        }

        .portal-card:hover::before {
          left: 100%;
        }

        .portal-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.9),
            0 0 40px rgba(14, 165, 233, 0.2);
        }

        .icon-wrapper {
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
          box-shadow: 
            0 10px 30px rgba(14, 165, 233, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }

        .portal-card:hover .icon-wrapper {
          transform: scale(1.15) rotate(5deg);
        }

        .icon-wrapper.patient {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          box-shadow: 
            0 10px 30px rgba(59, 130, 246, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }

        .icon-wrapper.doctor {
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
          box-shadow: 
            0 10px 30px rgba(139, 92, 246, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }

        .icon-wrapper.admin {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          box-shadow: 
            0 10px 30px rgba(16, 185, 129, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }

        .btn-gradient {
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
          box-shadow: 
            0 4px 15px rgba(14, 165, 233, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
        }

        .btn-gradient::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.4), 
            transparent);
          transition: left 0.6s;
        }

        .btn-gradient:hover::before {
          left: 100%;
        }

        .btn-gradient:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 8px 25px rgba(14, 165, 233, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.5);
        }

        .btn-patient {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          box-shadow: 
            0 4px 15px rgba(59, 130, 246, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .btn-patient:hover {
          box-shadow: 
            0 8px 25px rgba(59, 130, 246, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.5);
        }

        .btn-doctor {
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
          box-shadow: 
            0 4px 15px rgba(139, 92, 246, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .btn-doctor:hover {
          box-shadow: 
            0 8px 25px rgba(139, 92, 246, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.5);
        }

        .btn-admin {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          box-shadow: 
            0 4px 15px rgba(16, 185, 129, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .btn-admin:hover {
          box-shadow: 
            0 8px 25px rgba(16, 185, 129, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.5);
        }

        .gradient-text {
          background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .font-inter {
          font-family: 'Inter', sans-serif;
        }

        .section-bg {
          background: linear-gradient(135deg, 
            rgba(248, 250, 252, 0.9) 0%, 
            rgba(241, 245, 249, 0.8) 100%);
        }

        .feature-badge {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }
      `}</style>

      <div className="relative py-24 section-bg">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(14,165,233,0.1)_1px,transparent_0)] bg-[length:40px_40px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 feature-badge px-6 py-3 rounded-full mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-slate-700 font-inter uppercase tracking-wide">ACCESS PORTALS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-inter gradient-text">
              Choose Your Portal
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-inter">
              Select your role to access the appropriate healthcare portal with specialized tools and features designed for your needs.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Patient Portal Card */}
            <div 
              className="portal-card group p-8 rounded-3xl"
              onMouseEnter={() => setHoveredCard('patient')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative mb-8">
                <div className="icon-wrapper patient w-24 h-24 rounded-2xl flex items-center justify-center mx-auto">
                  <FontAwesomeIcon 
                    icon={faUserInjured} 
                    className="text-white text-4xl" 
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faShield} className="text-white text-xs" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 gradient-text font-inter text-center">
                Patient Portal
              </h3>
              <p className="text-slate-600 leading-relaxed text-center mb-6 font-inter text-lg">
                Access your personal health dashboard, view medical records, schedule appointments, and communicate securely with your healthcare team.
              </p>

              {/* Features List */}
              <div className="space-y-2 mb-8">
                {['Medical Records', 'Appointment Scheduling', 'Secure Messaging', 'Prescription Refills'].map((feature) => (
                  <div key={feature} className="flex items-center space-x-3 text-slate-600">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-sm font-medium font-inter">{feature}</span>
                  </div>
                ))}
              </div>

              <Link 
                href="/patient" 
                className="btn-gradient btn-patient w-full text-white text-center py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Sign In as Patient</span>
                <FontAwesomeIcon icon={faArrowRight} className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Doctor Portal Card */}
            <div 
              className="portal-card group p-8 rounded-3xl"
              onMouseEnter={() => setHoveredCard('doctor')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative mb-8">
                <div className="icon-wrapper doctor w-24 h-24 rounded-2xl flex items-center justify-center mx-auto">
                  <FontAwesomeIcon 
                    icon={faUserMd} 
                    className="text-white text-4xl" 
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faChartLine} className="text-white text-xs" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 gradient-text font-inter text-center">
                Doctor Portal
              </h3>
              <p className="text-slate-600 leading-relaxed text-center mb-6 font-inter text-lg">
                Access professional medical tools to manage patient care, view electronic health records, and collaborate with your healthcare team.
              </p>

              {/* Features List */}
              <div className="space-y-2 mb-8">
                {['Patient Management', 'EHR Access', 'Clinical Tools', 'Team Collaboration'].map((feature) => (
                  <div key={feature} className="flex items-center space-x-3 text-slate-600">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-sm font-medium font-inter">{feature}</span>
                  </div>
                ))}
              </div>

              <Link 
                href="/doctor" 
                className="btn-gradient btn-doctor w-full text-white text-center py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Sign In as Doctor</span>
                <FontAwesomeIcon icon={faArrowRight} className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Administration Portal Card */}
            <div 
              className="portal-card group p-8 rounded-3xl"
              onMouseEnter={() => setHoveredCard('admin')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative mb-8">
                <div className="icon-wrapper admin w-24 h-24 rounded-2xl flex items-center justify-center mx-auto">
                  <FontAwesomeIcon 
                    icon={faUserPlus} 
                    className="text-white text-4xl" 
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faCogs} className="text-white text-xs" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 gradient-text font-inter text-center">
                Administration
              </h3>
              <p className="text-slate-600 leading-relaxed text-center mb-6 font-inter text-lg">
                Manage healthcare services, user accounts, system settings, and oversee the operational aspects of the healthcare platform.
              </p>

              {/* Features List */}
              <div className="space-y-2 mb-8">
                {['User Management', 'System Settings', 'Analytics Dashboard', 'Service Management'].map((feature) => (
                  <div key={feature} className="flex items-center space-x-3 text-slate-600">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm font-medium font-inter">{feature}</span>
                  </div>
                ))}
              </div>

              <Link 
                href="/administration" 
                className="btn-gradient btn-admin w-full text-white text-center py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Sign In as Admin</span>
                <FontAwesomeIcon icon={faArrowRight} className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bottom Help Text */}
          <div className="text-center mt-12">
            <p className="text-slate-500 font-inter text-sm">
              Need help choosing? <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Contact our support team</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}