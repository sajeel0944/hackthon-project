"use client"

import AIAssistant from "@/components/Patient/AIAssistant";
import Navbar from "@/components/Patient/Navbar";
import { useState } from "react";

// Main Patient Page Component
const AiAssistant = () => {
  // const [activeSection, setActiveSection] = useState<string>("about");

  // const renderSection = () => {
  //   switch (activeSection) {
  //     case "ai-assistant":
  //       return <AIAssistant />;
  //     case "details":
  //       return (
  //         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
  //           <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
  //             <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
  //               <i className="fas fa-chart-line text-3xl text-green-600"></i>
  //             </div>
  //             <h2 className="text-2xl font-bold text-gray-800 mb-4">Health Details</h2>
  //             <p className="text-gray-600 mb-6">
  //               Your detailed health analytics and progress tracking will be available here.
  //             </p>
  //             <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
  //               View Health Dashboard
  //             </button>
  //           </div>
  //         </div>
  //       );
  //     case "about":
  //       return (
  //         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
  //           <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
  //             <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-6">
  //               <i className="fas fa-info-circle text-3xl text-purple-600"></i>
  //             </div>
  //             <h2 className="text-2xl font-bold text-gray-800 mb-4">About Patient Portal</h2>
  //             <p className="text-gray-600 mb-6">
  //               This portal helps you manage your health journey with AI assistance, tracking, and doctor communication.
  //             </p>
  //             <button className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors">
  //               Learn More
  //             </button>
  //           </div>
  //         </div>
  //       );
  //     default:
  //       return <AIAssistant />;
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar pageName="ai-assistant"/>
      <AIAssistant />
    </div>
  );
};

export default AiAssistant;