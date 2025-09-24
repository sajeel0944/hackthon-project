"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartbeat,
  faStethoscope,
  faPhoneAlt,
  faEnvelope,
  faMapMarkerAlt,
  faLaptopMedical,
  faVideo,
  faClipboardCheck,
  faAmbulance,
  faPills,
  faUserMd,
  faBrain,
  faXRay,
  faTeeth,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import Nav from "@/components/MainPage/Nav";
import Footer from "@/components/MainPage/Footer";
import Hero from "@/components/MainPage/Hero";

export default function ServicesPage() {
  const services = [
    {
      icon: faLaptopMedical,
      title: "AI Health Monitoring",
      description:
        "24/7 automated health tracking with intelligent alerts and personalized recommendations based on your data.",
      features: [
        "Real-time monitoring",
        "Predictive analytics",
        "Automated alerts",
      ],
    },
    {
      icon: faVideo,
      title: "Telemedicine",
      description:
        "Virtual consultations with healthcare professionals from the comfort of your home.",
      features: [
        "Video consultations",
        "Secure messaging",
        "Prescription refills",
      ],
    },
    {
      icon: faClipboardCheck,
      title: "Health Records",
      description:
        "Digital access to all your medical records, test results, and treatment history in one secure place.",
      features: ["Centralized records", "Lab results", "Treatment history"],
    },
    {
      icon: faAmbulance,
      title: "Emergency Care",
      description:
        "Immediate assistance and coordination with emergency services when you need it most.",
      features: [
        "24/7 emergency line",
        "Location tracking",
        "Hospital coordination",
      ],
    },
    {
      icon: faPills,
      title: "Pharmacy Services",
      description:
        "Prescription management with medication reminders and home delivery options.",
      features: ["Medication reminders", "Refill management", "Home delivery"],
    },
    {
      icon: faUserMd,
      title: "Specialist Access",
      description:
        "Connect with specialized healthcare providers across various medical disciplines.",
      features: [
        "Specialist directory",
        "Appointment scheduling",
        "Second opinions",
      ],
    },
    {
      icon: faBrain,
      title: "Mental Health",
      description:
        "Comprehensive mental health support with licensed therapists and psychiatrists.",
      features: ["Therapy sessions", "Crisis support", "Wellness programs"],
    },
    {
      icon: faXRay,
      title: "Diagnostic Services",
      description:
        "Access to advanced diagnostic testing with quick result delivery through our platform.",
      features: ["Lab testing", "Imaging services", "Rapid results"],
    },
    {
      icon: faTeeth,
      title: "Dental Care",
      description:
        "Complete dental health services from check-ups to specialized treatments.",
      features: [
        "Dental consultations",
        "Preventive care",
        "Treatment planning",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
      {/* Navigation */}
      <Nav />

      {/* Hero Section */}
      <Hero
        tilte="Comprehensive Healthcare Solutions"
        subTitle="Our Healthcare Services"
        discribtion="Discover our wide range of medical services designed to provide complete care through innovative technology and expert medical professionals."
      />

      {/* Services Grid */}
      <div className="container mx-auto px-4 mb-24 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="p-8 flex flex-col h-full">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6 text-blue-600">
                  <FontAwesomeIcon icon={service.icon} className="text-2xl" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  {service.title}
                </h3>
                <p className="mb-6 text-gray-600 leading-relaxed flex-grow">
                  {service.description}
                </p>
                <ul className="mb-6 space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <svg
                        className="w-4 h-4 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center mt-auto"
                >
                  Learn more
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-b from-blue-800 to-blue-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-blue-100 text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of patients and doctors who are already using
            MedConnect to transform healthcare delivery.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-md"
            >
              Create Account
            </a>
            <a
              href="#"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
