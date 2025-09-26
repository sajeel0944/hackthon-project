// components/PremiumNav.jsx
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStethoscope,
  faBars, 
  faTimes, 
  
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function PremiumNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  //const [isDarkMode, setIsDarkMode] = useState(false);
  //const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // useEffect(() => {
  //   if (isDarkMode) {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  // }, [isDarkMode]);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        .premium-nav {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(2, 132, 199, 0.1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .dark .premium-nav {
          background: rgba(15, 23, 42, 0.95);
          border-bottom: 1px solid rgba(2, 132, 199, 0.2);
        }

        .nav-glass {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(2, 132, 199, 0.15);
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }

        .dark .nav-glass {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(2, 132, 199, 0.3);
        }

        .emergency-pro {
          background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
          box-shadow: 
            0 4px 15px rgba(220, 38, 38, 0.3),
            0 0 30px rgba(220, 38, 38, 0.2);
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .emergency-pro:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 6px 25px rgba(220, 38, 38, 0.4),
            0 0 40px rgba(220, 38, 38, 0.3);
        }

        .emergency-pro::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.3), 
            transparent);
          transition: left 0.6s;
        }

        .emergency-pro:hover::before {
          left: 100%;
        }

        .nav-link-pro {
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-link-pro::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #0284c7, #0ea5e9);
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateX(-50%);
        }

        .nav-link-pro:hover::after {
          width: 100%;
        }

        .nav-link-pro.active::after {
          width: 100%;
          background: linear-gradient(90deg, #0ea5e9, #38bdf8);
        }

        .search-expand-pro {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(248, 250, 252, 0.8);
          border: 1px solid rgba(2, 132, 199, 0.2);
        }

        .dark .search-expand-pro {
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid rgba(2, 132, 199, 0.4);
        }

        .search-expand-pro.open {
          width: 300px;
        }

        .search-expand-pro.closed {
          width: 45px;
        }

        .mobile-menu-pro {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .pulse-pro {
          animation: pulse-pro 2s infinite;
        }

        @keyframes pulse-pro {
          0%, 100% {
            box-shadow: 
              0 4px 15px rgba(220, 38, 38, 0.3),
              0 0 25px rgba(220, 38, 38, 0.2);
          }
          50% {
            box-shadow: 
              0 4px 20px rgba(220, 38, 38, 0.4),
              0 0 35px rgba(220, 38, 38, 0.3);
          }
        }

        .logo-glow {
          background: linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%);
          box-shadow: 
            0 4px 20px rgba(2, 132, 199, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
        }

        .dark .logo-glow {
          background: linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%);
        }

        .font-inter {
          font-family: 'Inter', sans-serif;
        }

        .text-gradient {
          background: linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .dark .text-gradient {
          background: linear-gradient(135deg, #38bdf8 0%, #7dd3fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        * {
          transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
      `}</style>

      <nav className={`sticky top-0 z-50 premium-nav transition-all duration-300 ${
        isScrolled ? 'shadow-xl' : 'shadow-sm'
      }`}>
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            
            {/* Logo Section - Professional */}
            <div className="flex items-center space-x-4">
              <div className="logo-glow p-3 rounded-2xl">
                <FontAwesomeIcon 
                  icon={faStethoscope} 
                  className="text-2xl text-white" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gradient font-inter tracking-tight">
                  MedConnect
                </span>
                <span className="text-xs text-sky-600 dark:text-sky-400 font-medium opacity-80">
                  Premium Healthcare
                </span>
              </div>
            </div>

            {/* Center Navigation - Desktop */}
            <div className="hidden lg:flex items-center space-x-8">
              <NavLink 
                href="/" 
                label="Home" 
                isActive={activeLink === 'home'}
                onClick={() => setActiveLink('home')}
              />
              <NavLink 
                href="/services" 
                label="Services" 
                isActive={activeLink === 'services'}
                onClick={() => setActiveLink('services')}
              />
              {/* <NavLink 
                href="/doctors" 
                label="Doctors" 
                isActive={activeLink === 'doctors'}
                onClick={() => setActiveLink('doctors')}
              /> */}
              <NavLink 
                href="/about" 
                label="About" 
                isActive={activeLink === 'about'}
                onClick={() => setActiveLink('about')}
              />
              <NavLink 
                href="/contact" 
                label="Contact" 
                isActive={activeLink === 'contact'}
                onClick={() => setActiveLink('contact')}
              />
            </div>

            {/* Right Section - Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              
              {/* Search Bar */}
              {/* <div className={`search-expand-pro ${searchOpen ? 'open' : 'closed'} rounded-full`}>
                {searchOpen ? (
                  <div className="flex items-center px-4 py-2">
                    <input 
                      type="text" 
                      placeholder="Search doctors, services..." 
                      className="bg-transparent border-none outline-none w-full text-slate-700 dark:text-slate-200 placeholder-slate-500 font-inter text-sm"
                      autoFocus
                    />
                    <button 
                      onClick={() => setSearchOpen(false)}
                      className="ml-2 text-slate-500 dark:text-slate-400 hover:text-sky-600 transition-colors"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setSearchOpen(true)}
                    className="w-11 h-11 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-sky-600 transition-colors"
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                )}
              </div> */}

              {/* User Profile */}
              {/* <button className="nav-glass w-12 h-12 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-sky-600 transition-all duration-300 hover:scale-105">
                <FontAwesomeIcon icon={faUserCircle} className="text-xl" />
              </button> */}

              {/* Dark/Light Mode Toggle */}
              {/* <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="nav-glass w-12 h-12 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-sky-600 transition-all duration-300 hover:scale-105"
              >
                <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
              </button> */}

              {/* Emergency Button */}
              <button className="emergency-pro px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 pulse-pro font-inter text-sm">
                Emergency
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-3">
              {/* <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="nav-glass w-11 h-11 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
               */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="nav-glass w-11 h-11 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300"
              >
                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {/* {searchOpen && (
            <div className="lg:hidden mt-3">
              <div className="nav-glass rounded-2xl p-4">
                <input 
                  type="text" 
                  placeholder="Search doctors, services..." 
                  className="w-full bg-transparent border-none outline-none text-slate-700 dark:text-slate-200 placeholder-slate-500 font-inter px-4 py-3"
                  autoFocus
                />
              </div>
            </div>
          )} */}

          {/* Mobile Menu */}
          <div className={`lg:hidden mobile-menu-pro ${
            isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          } overflow-hidden`}>
            <div className="nav-glass rounded-2xl p-6 space-y-3">
              <MobileNavLink 
                href="/" 
                label="Home" 
                isActive={activeLink === 'home'}
                onClick={() => { setActiveLink('home'); setIsMenuOpen(false); }}
              />
              <MobileNavLink 
                href="/services" 
                label="Services" 
                isActive={activeLink === 'services'}
                onClick={() => { setActiveLink('services'); setIsMenuOpen(false); }}
              />
              {/* <MobileNavLink 
                href="/doctors" 
                label="Doctors" 
                isActive={activeLink === 'doctors'}
                onClick={() => { setActiveLink('doctors'); setIsMenuOpen(false); }}
              /> */}
              <MobileNavLink 
                href="/about" 
                label="About" 
                isActive={activeLink === 'about'}
                onClick={() => { setActiveLink('about'); setIsMenuOpen(false); }}
              />
              <MobileNavLink 
                href="/contact" 
                label="Contact" 
                isActive={activeLink === 'contact'}
                onClick={() => { setActiveLink('contact'); setIsMenuOpen(false); }}
              />
              
              <div className="pt-4 border-t border-slate-200 dark:border-slate-600 space-y-3">
                {/* <button className="w-full text-left px-4 py-3 rounded-xl font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <FontAwesomeIcon icon={faUserCircle} className="mr-3 text-sky-600" />
                  My Account
                </button> */}
                <button className="emergency-pro w-full px-6 py-4 rounded-xl text-white font-semibold font-inter">
                  Emergency Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

// Desktop NavLink Component
function NavLink({ href, label, isActive, onClick }) {
  return (
    <Link href={href} className="block">
      <button
        onClick={onClick}
        className={`nav-link-pro px-3 py-2 font-medium transition-all duration-300 font-inter ${
          isActive 
            ? 'active text-sky-600 dark:text-sky-400 font-semibold' 
            : 'text-slate-600 dark:text-slate-300 hover:text-sky-500'
        }`}
      >
        <span className="relative z-10">{label}</span>
      </button>
    </Link>
  );
}

// Mobile NavLink Component
function MobileNavLink({ href, label, isActive, onClick }) {
  return (
    <Link href={href} className="block">
      <button
        onClick={onClick}
        className={`w-full text-left px-4 py-4 rounded-xl font-medium transition-all duration-200 font-inter ${
          isActive 
            ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 border-l-4 border-sky-500' 
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
        }`}
      >
        <div className="flex items-center space-x-4">
          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
            isActive ? 'bg-sky-500 scale-125' : 'bg-slate-300 dark:bg-slate-600'
          }`}></div>
          <span className={`font-${isActive ? 'semibold' : 'medium'}`}>{label}</span>
        </div>
      </button>
    </Link>
  );
}