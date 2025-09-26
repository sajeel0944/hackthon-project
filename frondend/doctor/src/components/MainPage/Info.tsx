// components/Info.jsx
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faClock, faComments, faShieldHalved, faRocket, faHeadset } from '@fortawesome/free-solid-svg-icons';

export default function Info() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        .info-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.6),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
        }

        .info-card::before {
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
          transition: left 0.6s ease-in-out;
        }

        .info-card:hover::before {
          left: 100%;
        }

        .info-card:hover {
          transform: translateY(-8px);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.8),
            0 0 30px rgba(14, 165, 233, 0.2);
        }

        .icon-container {
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
          box-shadow: 
            0 8px 24px rgba(14, 165, 233, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .info-card:hover .icon-container {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 
            0 12px 32px rgba(14, 165, 233, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
        }

        .icon-container.security {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          box-shadow: 
            0 8px 24px rgba(16, 185, 129, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }

        .icon-container.access {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          box-shadow: 
            0 8px 24px rgba(245, 158, 11, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }

        .icon-container.communication {
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
          box-shadow: 
            0 8px 24px rgba(139, 92, 246, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }

        .gradient-text {
          background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .dark .gradient-text {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .pulse-dot {
          animation: pulse-dot 2s infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }

        .font-inter {
          font-family: 'Inter', sans-serif;
        }

        .section-title {
          background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <div className="relative py-24 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(14,165,233,0.2)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-white/50 dark:bg-slate-800/50 px-6 py-3 rounded-full border border-slate-200 dark:border-slate-700 mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full pulse-dot"></div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300 font-inter">WHY CHOOSE US</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-inter section-title">
              Healthcare Excellence
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-inter">
              Experience the future of healthcare with our cutting-edge platform designed for security, accessibility, and seamless communication.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Security Card */}
            <div className="info-card group p-8 rounded-3xl">
              <div className="relative mb-8">
                <div className="icon-container security w-20 h-20 rounded-2xl flex items-center justify-center mx-auto">
                  <FontAwesomeIcon 
                    icon={faShieldHalved} 
                    className="text-white text-3xl" 
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 gradient-text font-inter text-center">
                Military-Grade Security
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-center mb-6 font-inter">
                Your health data is protected with end-to-end encryption, HIPAA compliance, and advanced security protocols that exceed industry standards.
              </p>
              
              <div className="flex justify-center space-x-2">
                {['HIPAA', 'SSL', 'AES-256'].map((badge) => (
                  <span 
                    key={badge}
                    className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium font-inter"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Access Card */}
            <div className="info-card group p-8 rounded-3xl">
              <div className="relative mb-8">
                <div className="icon-container access w-20 h-20 rounded-2xl flex items-center justify-center mx-auto">
                  <FontAwesomeIcon 
                    icon={faRocket} 
                    className="text-white text-3xl" 
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 gradient-text font-inter text-center">
                24/7 Global Access
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-center mb-6 font-inter">
                Access your health information anytime, anywhere from any device with our lightning-fast, responsive platform optimized for all screens.
              </p>
              
              <div className="flex justify-center space-x-2">
                {['Mobile', 'Tablet', 'Desktop'].map((device) => (
                  <span 
                    key={device}
                    className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-xs font-medium font-inter"
                  >
                    {device}
                  </span>
                ))}
              </div>
            </div>

            {/* Communication Card */}
            <div className="info-card group p-8 rounded-3xl">
              <div className="relative mb-8">
                <div className="icon-container communication w-20 h-20 rounded-2xl flex items-center justify-center mx-auto">
                  <FontAwesomeIcon 
                    icon={faHeadset} 
                    className="text-white text-3xl" 
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 gradient-text font-inter text-center">
                Instant Communication
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-center mb-6 font-inter">
                Message your healthcare providers directly through our secure, encrypted messaging system with real-time notifications and file sharing.
              </p>
              
              <div className="flex justify-center space-x-2">
                {['Encrypted', 'Real-time', 'Secure'].map((feature) => (
                  <span 
                    key={feature}
                    className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium font-inter"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl font-inter">
              Explore All Features
            </button>
          </div>
        </div>
      </div>
    </>
  );
}