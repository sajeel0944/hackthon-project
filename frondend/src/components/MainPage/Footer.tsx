// components/Footer.jsx
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope, faMapMarkerAlt, faArrowRight, faStethoscope, } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        .footer-gradient {
          background: linear-gradient(135deg, 
            #0f172a 0%, 
            #1e293b 50%, 
            #334155 100%);
          position: relative;
          overflow: hidden;
        }

        .footer-gradient::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(14, 165, 233, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.05) 0%, transparent 50%);
        }

        .footer-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .footer-card:hover {
          transform: translateY(-5px);
          border-color: rgba(14, 165, 233, 0.3);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            0 0 30px rgba(14, 165, 233, 0.1);
        }

        .logo-glow {
          background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);
          box-shadow: 
            0 8px 32px rgba(14, 165, 233, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .social-icon {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .social-icon:hover {
          transform: translateY(-3px) scale(1.1);
          background: rgba(255, 255, 255, 0.2);
        }

        .social-icon.facebook:hover {
          background: linear-gradient(135deg, #1877f2, #0e5abd);
        }

        .social-icon.twitter:hover {
          background: linear-gradient(135deg, #1da1f2, #0c85d0);
        }

        .social-icon.instagram:hover {
          background: linear-gradient(135deg, #e4405f, #c13584);
        }

        .social-icon.linkedin:hover {
          background: linear-gradient(135deg, #0a66c2, #084a8e);
        }

        .social-icon.github:hover {
          background: linear-gradient(135deg, #333, #000);
        }

        .contact-item {
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
        }

        .contact-item:hover {
          border-left-color: #0ea5e9;
          background: rgba(14, 165, 233, 0.05);
          transform: translateX(5px);
        }

        .link-hover {
          position: relative;
          transition: all 0.3s ease;
        }

        .link-hover::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #0ea5e9, #8b5cf6);
          transition: width 0.3s ease;
        }

        .link-hover:hover::after {
          width: 100%;
        }

        .newsletter-input {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .newsletter-input:focus {
          border-color: #0ea5e9;
          box-shadow: 0 0 20px rgba(14, 165, 233, 0.2);
        }

        .newsletter-btn {
          background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);
          transition: all 0.3s ease;
        }

        .newsletter-btn:hover {
          transform: translateX(5px);
          box-shadow: 0 5px 20px rgba(14, 165, 233, 0.4);
        }

        .font-inter {
          font-family: 'Inter', sans-serif;
        }

        .gradient-text {
          background: linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <footer className="footer-gradient relative pt-20 pb-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:40px_40px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-4 mb-6">
                <div className="logo-glow p-3 rounded-2xl">
                  {/* <FontAwesomeIcon icon={faHeartbeat} className="text-white text-2xl" /> */}
                   <FontAwesomeIcon icon={faStethoscope} className="text-2xl text-white" 
                                  />
                </div>
                <span className="text-2xl font-bold gradient-text font-inter">MedConnect</span>
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed font-inter text-lg">
                Revolutionizing healthcare through AI-powered monitoring, seamless connectivity, and personalized patient care solutions for the modern world.
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                {['HIPAA Compliant', 'SSL Encrypted', '24/7 Support'].map((badge) => (
                  <span 
                    key={badge}
                    className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-medium font-inter border border-green-500/30"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-card p-6 rounded-2xl">
              <h3 className="text-lg font-semibold mb-6 text-white font-inter border-b border-slate-600 pb-3">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { name: 'Services', href: '/services' },
                  { name: 'Find a Doctor', href: '/doctors' },
                  { name: 'Patient Portal', href: '/patient' },
                  { name: 'Doctor Portal', href: '/doctor' },
                  { name: 'Resources', href: '/resources' },
                  { name: 'FAQs', href: '/faqs' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="link-hover text-slate-300 hover:text-white font-inter flex items-center group">
                      <FontAwesomeIcon icon={faArrowRight} className="mr-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div className="footer-card p-6 rounded-2xl">
              <h3 className="text-lg font-semibold mb-6 text-white font-inter border-b border-slate-600 pb-3">
                Contact Info
              </h3>
              <ul className="space-y-4">
                <li className="contact-item p-3 rounded-lg">
                  <div className="flex items-center text-slate-300">
                    <FontAwesomeIcon icon={faPhoneAlt} className="mr-4 text-blue-400 text-lg" />
                    <div>
                      <div className="font-medium font-inter">(800) 123-4567</div>
                      <div className="text-sm text-slate-400">24/7 Support Line</div>
                    </div>
                  </div>
                </li>
                <li className="contact-item p-3 rounded-lg">
                  <div className="flex items-center text-slate-300">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-4 text-green-400 text-lg" />
                    <div>
                      <div className="font-medium font-inter">support@medconnect.com</div>
                      <div className="text-sm text-slate-400">Email Support</div>
                    </div>
                  </div>
                </li>
                <li className="contact-item p-3 rounded-lg">
                  <div className="flex items-center text-slate-300">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-4 text-purple-400 text-lg" />
                    <div>
                      <div className="font-medium font-inter">123 Health Avenue</div>
                      <div className="text-sm text-slate-400">Medical Center, CA 90210</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Newsletter & Social */}
            <div className="footer-card p-6 rounded-2xl">
              <h3 className="text-lg font-semibold mb-6 text-white font-inter border-b border-slate-600 pb-3">
                Stay Updated
              </h3>
              
              {/* Newsletter */}
              <div className="mb-6">
                <p className="text-slate-300 mb-4 font-inter">Subscribe to our newsletter for updates</p>
                <div className="flex space-x-2">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="newsletter-input flex-1 px-4 py-3 rounded-lg text-white placeholder-slate-400 outline-none font-inter"
                  />
                  <button className="newsletter-btn px-4 py-3 rounded-lg text-white font-inter font-medium">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-slate-300 mb-4 font-inter">Follow us on social media</p>
                <div className="flex space-x-3">
                  {[
                    { icon: faFacebookF, className: 'facebook', label: 'Facebook' },
                    { icon: faTwitter, className: 'twitter', label: 'Twitter' },
                    { icon: faInstagram, className: 'instagram', label: 'Instagram' },
                    { icon: faLinkedinIn, className: 'linkedin', label: 'LinkedIn' },
                    { icon: faGithub, className: 'github', label: 'GitHub' }
                  ].map((social) => (
                    <a 
                      key={social.label}
                      href="#" 
                      className={`social-icon ${social.className} w-12 h-12 rounded-xl flex items-center justify-center text-white`}
                      aria-label={social.label}
                    >
                      <FontAwesomeIcon icon={social.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-slate-400 text-sm font-inter">
                © 2024 MedConnect Pro. All rights reserved. 
                <span className="mx-2">•</span>
                <span className="text-slate-300">AI-Powered Healthcare Solutions</span>
              </div>
              
              <div className="flex space-x-6">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                  <a 
                    key={link}
                    href="#" 
                    className="link-hover text-slate-400 hover:text-white text-sm font-inter"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}