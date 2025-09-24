"use client"

import Navbar from "@/components/Patient/Navbar";
import { useEffect, useState } from "react";

// Define interfaces for type safety
interface SessionSummary {
  sessionId: string;
  date: string;
  duration: string;
  agentName: string;
  mainTopics: string[];
  keyInsights: string[];
  actionItems: string[];
  sentiment: string;
  urgencyLevel: string;
}

interface VitalReading {
  date: string;
  systolic?: number;
  diastolic?: number;
  value?: number;
  fasting?: number;
  postPrandial?: number;
}

interface HealthMetrics {
  patientInfo: {
    name: string;
    age: number;
    gender: string;
    conditions: string[];
    primaryDoctor: string;
  };
  vitalTrends: {
    bloodPressure: VitalReading[];
    heartRate: VitalReading[];
    bloodSugar: VitalReading[];
  };
  medicationAdherence: {
    overall: number;
    medications: Array<{
      name: string;
      adherence: number;
      lastTaken: string;
    }>;
  };
  appointments: Array<{
    date: string;
    doctor: string;
    type: string;
    status: string;
  }>;
}
// Main Health Details Component
const HealthDetails: React.FC = () => {
  const [sessionSummary, setSessionSummary] = useState<SessionSummary | null>(null);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics | null>(null);
  const [activeView, setActiveView] = useState<string>("summary");

  // Mock data - In real app, this would come from API
  useEffect(() => {
    const mockSessionSummary: SessionSummary = {
      sessionId: "SES-20231115-001",
      date: "2023-11-15",
      duration: "15 minutes",
      agentName: "HealthBot AI",
      mainTopics: ["Blood Pressure Management", "Medication Adherence", "Dietary Recommendations"],
      keyInsights: [
        "Blood pressure trending towards target range",
        "Good medication adherence reported",
        "Recommended dietary adjustments for better glucose control"
      ],
      actionItems: [
        "Monitor BP twice daily for next week",
        "Schedule follow-up with Dr. Smith",
        "Implement suggested dietary changes"
      ],
      sentiment: "positive",
      urgencyLevel: "low"
    };

    const mockHealthMetrics: HealthMetrics = {
      patientInfo: {
        name: "Sarah Johnson",
        age: 42,
        gender: "Female",
        conditions: ["Hypertension", "Type 2 Diabetes"],
        primaryDoctor: "Dr. Michael Smith"
      },
      vitalTrends: {
        bloodPressure: [
          { date: "2023-11-01", systolic: 135, diastolic: 88 },
          { date: "2023-11-08", systolic: 130, diastolic: 85 },
          { date: "2023-11-15", systolic: 128, diastolic: 82 }
        ],
        heartRate: [
          { date: "2023-11-01", value: 78 },
          { date: "2023-11-08", value: 75 },
          { date: "2023-11-15", value: 72 }
        ],
        bloodSugar: [
          { date: "2023-11-01", fasting: 125, postPrandial: 180 },
          { date: "2023-11-08", fasting: 118, postPrandial: 165 },
          { date: "2023-11-15", fasting: 110, postPrandial: 155 }
        ]
      },
      medicationAdherence: {
        overall: 95,
        medications: [
          { name: "Lisinopril", adherence: 98, lastTaken: "2023-11-15" },
          { name: "Metformin", adherence: 92, lastTaken: "2023-11-15" }
        ]
      },
      appointments: [
        { date: "2023-11-20", doctor: "Dr. Michael Smith", type: "Follow-up", status: "Scheduled" },
        { date: "2023-12-15", doctor: "Dr. Emily Chen", type: "Cardiology", status: "Confirmed" }
      ]
    };

    setSessionSummary(mockSessionSummary);
    setHealthMetrics(mockHealthMetrics);
  }, []);

  if (!sessionSummary || !healthMetrics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your health details...</p>
        </div>
      </div>
    );
  }

  const getSentimentColor = (sentiment: string): string => {
    switch (sentiment) {
      case "positive": return "text-green-600 bg-green-50";
      case "neutral": return "text-yellow-600 bg-yellow-50";
      case "negative": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getUrgencyBadge = (urgency: string): { color: string; text: string } => {
    switch (urgency) {
      case "high": return { color: "bg-red-100 text-red-800", text: "High Priority" };
      case "medium": return { color: "bg-yellow-100 text-yellow-800", text: "Medium Priority" };
      case "low": return { color: "bg-green-100 text-green-800", text: "Low Priority" };
      default: return { color: "bg-gray-100 text-gray-800", text: "Normal" };
    }
  };

  const urgency = getUrgencyBadge(sessionSummary.urgencyLevel);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar pageName="details"/>
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Health Analytics Dashboard</h1>
              <p className="text-gray-600">Comprehensive overview of your health journey and AI session insights</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${urgency.color}`}>
                {urgency.text}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(sessionSummary.sentiment)}`}>
                {sessionSummary.sentiment.charAt(0).toUpperCase() + sessionSummary.sentiment.slice(1)} Outlook
              </span>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 w-fit">
            <button
              onClick={() => setActiveView("summary")}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeView === "summary" 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Session Summary
            </button>
            <button
              onClick={() => setActiveView("analytics")}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeView === "analytics" 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Health Analytics
            </button>
            <button
              onClick={() => setActiveView("trends")}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeView === "trends" 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Trends
            </button>
          </div>
        </div>

        {/* Main Content */}
        {activeView === "summary" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Session Overview */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <i className="fas fa-robot text-blue-500 mr-2"></i>
                  AI Session Summary
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm text-blue-600 font-medium">Session Date</p>
                    <p className="text-lg font-semibold">{new Date(sessionSummary.date).toLocaleDateString()}</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <p className="text-sm text-green-600 font-medium">Duration</p>
                    <p className="text-lg font-semibold">{sessionSummary.duration}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Discussion Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {sessionSummary.mainTopics.map((topic, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Key Insights</h3>
                  <div className="space-y-2">
                    {sessionSummary.keyInsights.map((insight, index) => (
                      <div key={index} className="flex items-start">
                        <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                        <p className="text-gray-700">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Recommended Actions</h3>
                  <div className="space-y-2">
                    {sessionSummary.actionItems.map((action, index) => (
                      <div key={index} className="flex items-center bg-yellow-50 rounded-lg p-3">
                        <i className="fas fa-bell text-yellow-600 mr-3"></i>
                        <p className="text-gray-700">{action}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Patient Overview</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-semibold">{healthMetrics.patientInfo.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Age & Gender</p>
                    <p className="font-semibold">{healthMetrics.patientInfo.age} years, {healthMetrics.patientInfo.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Primary Doctor</p>
                    <p className="font-semibold">{healthMetrics.patientInfo.primaryDoctor}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Health Conditions</h3>
                <div className="space-y-2">
                  {healthMetrics.patientInfo.conditions.map((condition, index) => (
                    <div key={index} className="flex items-center">
                      <i className="fas fa-heartbeat text-red-500 mr-2"></i>
                      <span className="text-gray-700">{condition}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Medication Adherence</h3>
                <div className="text-center">
                  <div className="relative inline-block">
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle cx="40" cy="40" r="35" stroke="#e5e7eb" strokeWidth="8" fill="none"/>
                      <circle cx="40" cy="40" r="35" stroke="#10b981" strokeWidth="8" fill="none"
                        strokeDasharray="219.8" 
                        strokeDashoffset={219.8 - (219.8 * healthMetrics.medicationAdherence.overall) / 100}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-green-600">
                      {healthMetrics.medicationAdherence.overall}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Overall Adherence Rate</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === "analytics" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vital Signs */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Vital Signs Monitoring</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <i className="fas fa-tint text-blue-500 text-2xl mb-2"></i>
                  <p className="text-sm text-blue-600">Blood Pressure</p>
                  <p className="text-xl font-bold">{healthMetrics.vitalTrends.bloodPressure[2].systolic}/{healthMetrics.vitalTrends.bloodPressure[2].diastolic}</p>
                  <p className="text-xs text-green-600">Improving</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <i className="fas fa-heartbeat text-green-500 text-2xl mb-2"></i>
                  <p className="text-sm text-green-600">Heart Rate</p>
                  <p className="text-xl font-bold">{healthMetrics.vitalTrends.heartRate[2].value} bpm</p>
                  <p className="text-xs text-green-600">Normal</p>
                </div>
              </div>
            </div>

            {/* Medication Details */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Medication Details</h2>
              <div className="space-y-4">
                {healthMetrics.medicationAdherence.medications.map((med, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold">{med.name}</p>
                      <p className="text-sm text-gray-600">Last taken: {new Date(med.lastTaken).toLocaleDateString()}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {med.adherence}% adherence
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-2xl shadow-xl p-6 lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Appointments</h2>
              <div className="space-y-3">
                {healthMetrics.appointments.map((appt, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <i className="fas fa-calendar-check text-blue-500"></i>
                      </div>
                      <div>
                        <p className="font-semibold">{appt.doctor}</p>
                        <p className="text-sm text-gray-600">{appt.type} • {new Date(appt.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {appt.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeView === "trends" && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Health Trends & Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Blood Pressure Trend */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                <h3 className="font-semibold text-blue-800 mb-3">Blood Pressure Trend</h3>
                <div className="space-y-2">
                  {healthMetrics.vitalTrends.bloodPressure.map((reading, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-blue-600">{new Date(reading.date).toLocaleDateString()}</span>
                      <span className="font-semibold">{reading.systolic}/{reading.diastolic}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 p-2 bg-blue-200 rounded">
                  <p className="text-xs text-blue-800 text-center">Trending towards target range</p>
                </div>
              </div>

              {/* Heart Rate Trend */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                <h3 className="font-semibold text-green-800 mb-3">Heart Rate Trend</h3>
                <div className="space-y-2">
                  {healthMetrics.vitalTrends.heartRate.map((reading, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-green-600">{new Date(reading.date).toLocaleDateString()}</span>
                      <span className="font-semibold">{reading.value} bpm</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 p-2 bg-green-200 rounded">
                  <p className="text-xs text-green-800 text-center">Within normal range</p>
                </div>
              </div>

              {/* Blood Sugar Trend */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                <h3 className="font-semibold text-purple-800 mb-3">Blood Sugar Trend</h3>
                <div className="space-y-2">
                  {healthMetrics.vitalTrends.bloodSugar.map((reading, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-purple-600">{new Date(reading.date).toLocaleDateString()}</span>
                      <div className="text-right">
                        <div>Fasting: {reading.fasting}</div>
                        <div>Post-meal: {reading.postPrandial}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 p-2 bg-purple-200 rounded">
                  <p className="text-xs text-purple-800 text-center">Improving control</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center">
            <i className="fas fa-download mr-2"></i>
            Download Report
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center">
            <i className="fas fa-share mr-2"></i>
            Share with Doctor
          </button>
          <button 
            onClick={() => window.location.href = '/patient/ai-assistant'}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
          >
            <i className="fas fa-robot mr-2"></i>
            New AI Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthDetails;