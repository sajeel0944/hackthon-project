// "use client";

// import Form from "@/components/From";
// import From from "@/components/From";
// import MainContent from "@/components/MainContent";
// import Navbar from "@/components/Navbar";
// import PatientRegistration from "@/components/PatientRegistration";

// export default function Home() {
//   return (
//     <>
//       {/* <PatientRegistration/> */}

//       <Navbar />

//       <MainContent />

//       {/* <main className="bg-gray-50 min-h-screen">

//     <Form/>

//         <footer className="mt-12 py-6 bg-gray-800 text-white text-center">
//           <p>© 2023 MedAI Health Monitoring System. All rights reserved.</p>
//           <p className="mt-2 text-sm text-gray-400">
//             HIPAA Compliant &amp; Secure Patient Data Management
//           </p>
//         </footer>
//       </main> */}
//     </>
//   );
// }

"use client";
import Footer from "@/components/MainPage/Footer";
import Hero from "@/components/MainPage/Hero";
import Info from "@/components/MainPage/Info";
import Nav from "@/components/MainPage/Nav";
import Options from "@/components/MainPage/Options";
import Testimonial from "@/components/MainPage/Testimonial";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useEffect } from "react";
config.autoAddCss = false;

export default function Home() {
  useEffect(() => {
    
    const localStorageData = localStorage.getItem("doctorData");

    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData); // Now it's an object
      console.log(parsedData);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#f0f9ff] via-[#e0f2fe] to-[#dbeafe]">
      <Nav />
      <Hero
        tilte="AI-Powered Healthcare Monitoring"
        subTitle="Your Health, Our Priority"
        discribtion="Experience seamless health management with our AI-powered platform that connects patients and doctors for proactive care."
      />
      <Options />
      <Info />
      <Testimonial />
      <Footer />
    </div>
  );
}
