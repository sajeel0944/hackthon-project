"use client";

import TopNav from "@/components/Doctor/PatientSection/TopNav";
import { useState, useEffect, useRef } from "react";

// Define TypeScript interfaces
interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
  type: "text" | "patient_data";
  data?: PatientData;
}

interface PatientData {
  name: string;
  age: number;
  gender: string;
  lastAppointment: string;
  conditions: string[];
  medications: string[];
  lastVitals: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
  };
}

const AskToAgent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample patient data for demonstration
  const samplePatientData: PatientData = {
    name: "Sarah Johnson",
    age: 42,
    gender: "Female",
    lastAppointment: "2023-10-15",
    conditions: ["Hypertension", "Type 2 Diabetes"],
    medications: ["Lisinopril 10mg daily", "Metformin 500mg twice daily"],
    lastVitals: {
      bloodPressure: "128/82 mmHg",
      heartRate: "72 bpm",
      temperature: "98.6°F"
    }
  };

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      {
        id: "1",
        text: "Hello Doctor! I'm your AI Assistant. How can I help you with patient information today?",
        sender: "agent",
        timestamp: new Date(),
        type: "text"
      }
    ]);
  }, []);

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
      type: "text"
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      let responseText = "";
      let responseData: PatientData | undefined = undefined;
      let responseType: "text" | "patient_data" = "text";

      // Simple response logic based on keywords
      if (inputText.toLowerCase().includes("patient") || 
          inputText.toLowerCase().includes("sarah") ||
          inputText.toLowerCase().includes("details")) {
        responseText = "Here are the latest details for Sarah Johnson:";
        responseData = samplePatientData;
        responseType = "patient_data";
      } else if (inputText.toLowerCase().includes("hello") || 
                 inputText.toLowerCase().includes("hi")) {
        responseText = "Hello Doctor! How can I assist you today?";
      } else if (inputText.toLowerCase().includes("medication") || 
                 inputText.toLowerCase().includes("prescription")) {
        responseText = "Sarah Johnson's current medications are Lisinopril 10mg daily and Metformin 500mg twice daily.";
      } else if (inputText.toLowerCase().includes("vital") || 
                 inputText.toLowerCase().includes("bp") ||
                 inputText.toLowerCase().includes("blood pressure")) {
        responseText = "Sarah Johnson's latest vitals: Blood Pressure 128/82 mmHg, Heart Rate 72 bpm, Temperature 98.6°F";
      } else if (inputText.toLowerCase().includes("appointment") || 
                 inputText.toLowerCase().includes("last visit")) {
        responseText = "Sarah Johnson's last appointment was on October 15, 2023.";
      } else {
        responseText = "I can help you with patient details, medication information, vitals, and appointment history. What would you like to know?";
      }

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: "agent",
        timestamp: new Date(),
        type: responseType,
        data: responseData
      };

      setMessages(prev => [...prev, agentMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Ask To Agent</h1>
          <p className="text-gray-600">Communicate with our AI assistant to get patient information and insights.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Chat Header */}
          <div className="bg-blue-600 text-white p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                <i className="fas fa-robot"></i>
              </div>
              <div>
                <h2 className="font-semibold">AI Medical Assistant</h2>
                <p className="text-sm text-blue-100">Online - Ready to help</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-[calc(100vh-280px)] overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <div key={message.id} className={`flex mb-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                {message.sender === "agent" && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
                    <i className="fas fa-robot text-blue-600"></i>
                  </div>
                )}
                
                <div className={`max-w-[75%] ${message.sender === "user" ? "bg-blue-600 text-white" : "bg-white border border-gray-200"} rounded-lg p-3 shadow-sm`}>
                  <div className="flex items-center mb-1">
                    <span className="text-sm font-medium">
                      {message.sender === "user" ? "You" : "Medical Assistant"}
                    </span>
                    <span className={`text-xs mx-2 ${message.sender === "user" ? "text-blue-200" : "text-gray-500"}`}>
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  
                  <p className={message.sender === "user" ? "text-white" : "text-gray-800"}>{message.text}</p>
                  
                  {message.type === "patient_data" && message.data && (
                    <div className="mt-3 p-3 bg-gray-50 rounded border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">Patient Summary</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Name:</span> {message.data.name}
                        </div>
                        <div>
                          <span className="text-gray-600">Age:</span> {message.data.age}
                        </div>
                        <div>
                          <span className="text-gray-600">Gender:</span> {message.data.gender}
                        </div>
                        <div>
                          <span className="text-gray-600">Last Visit:</span> {new Date(message.data.lastAppointment).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <h5 className="font-medium text-gray-800 mb-1">Conditions</h5>
                        <div className="flex flex-wrap gap-1">
                          {message.data.conditions.map((condition, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {condition}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <h5 className="font-medium text-gray-800 mb-1">Medications</h5>
                        <ul className="list-disc list-inside text-sm text-gray-700">
                          {message.data.medications.map((med, index) => (
                            <li key={index}>{med}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-3">
                        <h5 className="font-medium text-gray-800 mb-1">Latest Vitals</h5>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="bg-gray-100 p-2 rounded text-center">
                            <div className="text-gray-600">BP</div>
                            <div className="font-medium">{message.data.lastVitals.bloodPressure}</div>
                          </div>
                          <div className="bg-gray-100 p-2 rounded text-center">
                            <div className="text-gray-600">HR</div>
                            <div className="font-medium">{message.data.lastVitals.heartRate}</div>
                          </div>
                          <div className="bg-gray-100 p-2 rounded text-center">
                            <div className="text-gray-600">Temp</div>
                            <div className="font-medium">{message.data.lastVitals.temperature}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {message.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center ml-2 flex-shrink-0">
                    <i className="fas fa-user-md text-white"></i>
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex mb-4 justify-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
                  <i className="fas fa-robot text-blue-600"></i>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex items-center">
              <div className="flex-1 bg-gray-100 rounded-lg p-2">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  className="w-full bg-transparent border-none outline-none resize-none p-1 max-h-32"
                  rows={1}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={inputText.trim() === "" || isLoading}
                className="ml-3 bg-blue-600 text-white rounded-lg p-3 disabled:bg-blue-400 hover:bg-blue-700 transition-colors"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
            
            <div className="mt-3 text-xs text-gray-500">
              <p>Try asking: "Show me Sarah Johnson's details" or "What are the patient's latest vitals?"</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-4 text-center cursor-pointer hover:bg-blue-50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
              <i className="fas fa-user-injured text-blue-600"></i>
            </div>
            <p className="text-sm font-medium">Patient Details</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 text-center cursor-pointer hover:bg-blue-50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
              <i className="fas fa-heartbeat text-blue-600"></i>
            </div>
            <p className="text-sm font-medium">Vitals History</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 text-center cursor-pointer hover:bg-blue-50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
              <i className="fas fa-pills text-blue-600"></i>
            </div>
            <p className="text-sm font-medium">Medications</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 text-center cursor-pointer hover:bg-blue-50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
              <i className="fas fa-calendar-check text-blue-600"></i>
            </div>
            <p className="text-sm font-medium">Appointments</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskToAgent;