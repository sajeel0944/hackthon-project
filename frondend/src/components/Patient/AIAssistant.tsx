import { useEffect, useRef, useState } from "react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
  type?: string;
}

interface PatientHealthData {
  name: string;
  conditions: string[];
  medications: string[];
  lastBP: string;
  lastHeartRate: string;
  nextAppointment: string;
}

// AI Assistant Component
const AIAssistant: React.FC = () => {
  const [isSessionStarted, setIsSessionStarted] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample health data
  const patientHealthData: PatientHealthData = {
    name: "Sarah Johnson",
    conditions: ["Hypertension", "Type 2 Diabetes"],
    medications: ["Lisinopril 10mg", "Metformin 500mg"],
    lastBP: "128/82 mmHg",
    lastHeartRate: "72 bpm",
    nextAppointment: "2023-11-20"
  };

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startSession = (): void => {
    setIsSessionStarted(true);
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your AI Health Assistant. I'm here to help you manage your health journey. How are you feeling today?",
        sender: "agent",
        timestamp: new Date(),
        type: "welcome"
      }
    ]);
  };

  const endSession = (): void => {
    setIsSessionStarted(false);
    setMessages([]);
  };

  const handleSendMessage = (): void => {
    if (inputText.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      let responseText: string = "";
      
      if (inputText.toLowerCase().includes("blood pressure") || inputText.toLowerCase().includes("bp")) {
        responseText = `Your last recorded blood pressure was ${patientHealthData.lastBP}. This is within the target range for your condition. Remember to monitor it regularly as advised by your doctor.`;
      } else if (inputText.toLowerCase().includes("medication") || inputText.toLowerCase().includes("pill")) {
        responseText = `You're currently taking ${patientHealthData.medications.join(" and ")}. It's important to take these medications as prescribed. Do you have any concerns about your medications?`;
      } else if (inputText.toLowerCase().includes("appointment") || inputText.toLowerCase().includes("doctor")) {
        responseText = `Your next appointment is on ${new Date(patientHealthData.nextAppointment).toLocaleDateString()}. Would you like me to remind you 24 hours before the appointment?`;
      } else if (inputText.toLowerCase().includes("symptom") || inputText.toLowerCase().includes("feel")) {
        responseText = "I understand you're discussing symptoms. While I can provide general information, please remember to consult your doctor for medical advice. Can you tell me more about what you're experiencing?";
      } else if (inputText.toLowerCase().includes("hello") || inputText.toLowerCase().includes("hi")) {
        responseText = "Hello! How can I assist you with your health management today?";
      } else {
        responseText = "I'm here to help you with medication reminders, appointment scheduling, health tracking, and general health information. What would you like to know more about?";
      }

      const agentMessage: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: "agent",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, agentMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isSessionStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-robot text-3xl text-white"></i>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Health Assistant</h2>
          <p className="text-gray-600 mb-6">
            Your personal health companion is ready to help you manage medications, track symptoms, and answer health-related questions.
          </p>
          
          <button
            onClick={startSession}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
          >
            Start Conversation
          </button>
          
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-pills text-blue-600"></i>
              </div>
              <p className="text-xs text-gray-600">Medication Reminders</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-heartbeat text-green-600"></i>
              </div>
              <p className="text-xs text-gray-600">Health Tracking</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-calendar-check text-purple-600"></i>
              </div>
              <p className="text-xs text-gray-600">Appointment Support</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                <i className="fas fa-robot text-xl"></i>
              </div>
              <div>
                <h2 className="text-xl font-bold">AI Health Assistant</h2>
                <p className="text-blue-100">Online • Ready to help</p>
              </div>
            </div>
            <button
              onClick={endSession}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <i className="fas fa-times mr-2"></i>
              End Session
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-[60vh] overflow-y-auto p-6 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-6 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.sender === "agent" && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3 flex-shrink-0">
                  <i className="fas fa-robot text-white"></i>
                </div>
              )}
              
              <div className={`max-w-[80%] ${message.sender === "user" ? "order-2" : "order-1"}`}>
                <div
                  className={`rounded-2xl p-4 shadow-sm ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-none"
                      : "bg-white border border-gray-200 rounded-bl-none"
                  }`}
                >
                  <p className="leading-relaxed">{message.text}</p>
                </div>
                <div
                  className={`text-xs mt-1 ${
                    message.sender === "user" ? "text-right text-blue-600" : "text-gray-500"
                  }`}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
              
              {message.sender === "user" && (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center ml-3 flex-shrink-0 order-1">
                  <i className="fas fa-user text-gray-600"></i>
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex mb-6 justify-start">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                <i className="fas fa-robot text-white"></i>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-4 shadow-sm">
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
        <div className="border-t border-gray-200 p-6 bg-white">
          <div className="flex items-end space-x-4">
            <div className="flex-1 bg-gray-100 rounded-2xl p-3">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your health question or concern..."
                className="w-full bg-transparent border-none outline-none resize-none min-h-[60px] max-h-32 p-2"
                rows={2}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={inputText.trim() === "" || isLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-4 disabled:from-blue-300 disabled:to-purple-400 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
            >
              <i className="fas fa-paper-plane text-lg"></i>
            </button>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs text-gray-500">Quick suggestions:</span>
            <button
              onClick={() => setInputText("What's my current blood pressure?")}
              className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
            >
              Blood Pressure
            </button>
            <button
              onClick={() => setInputText("When is my next appointment?")}
              className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full hover:bg-green-100 transition-colors"
            >
              Next Appointment
            </button>
            <button
              onClick={() => setInputText("What medications am I taking?")}
              className="text-xs bg-purple-50 text-purple-600 px-3 py-1 rounded-full hover:bg-purple-100 transition-colors"
            >
              Medications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AIAssistant