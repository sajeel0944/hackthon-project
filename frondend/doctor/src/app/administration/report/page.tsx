"use client";

import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCalendar,
  faCalendarCheck,
  faChartLine,
  faChevronLeft,
  faChevronRight,
  faCog,
  faDollarSign,
  faDownload,
  faEye,
  faHeart,
  faHome,
  faPlus,
  faStar,
  faTrash,
  faUser,
  faUserInjured,
  faUserMd,
} from "@fortawesome/free-solid-svg-icons";
import Warpper from "@/components/Administration/Warpper";

const ReportsPage: NextPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const patientGrowthChartRef = useRef<HTMLCanvasElement>(null);
  const appointmentTypeChartRef = useRef<HTMLCanvasElement>(null);
  const revenueChartRef = useRef<HTMLCanvasElement>(null);
  const conditionChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const charts: Chart[] = [];

    if (patientGrowthChartRef.current) {
      const chart = new Chart(patientGrowthChartRef.current, {
        type: "line",
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
          ],
          datasets: [
            {
              label: "New Patients",
              data: [65, 79, 90, 81, 96, 105, 112, 108, 120, 135],
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              fill: true,
              tension: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, border: { display: false } },
            x: { grid: { display: false } },
          },
        },
      });
      charts.push(chart);
    }

    if (appointmentTypeChartRef.current) {
      const chart = new Chart(appointmentTypeChartRef.current, {
        type: "doughnut",
        data: {
          labels: [
            "General Checkup",
            "Follow-up",
            "Consultation",
            "Emergency",
            "Vaccination",
          ],
          datasets: [
            {
              data: [35, 25, 20, 15, 5],
              backgroundColor: [
                "#3b82f6",
                "#10b981",
                "#8b5cf6",
                "#ef4444",
                "#f59e0b",
              ],
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: "right" } },
        },
      });
      charts.push(chart);
    }

    if (revenueChartRef.current) {
      const chart = new Chart(revenueChartRef.current, {
        type: "bar",
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
          ],
          datasets: [
            {
              label: "Revenue ($)",
              data: [
                18500, 19200, 20100, 21500, 22300, 23100, 21800, 23400, 24200,
                25800,
              ],
              backgroundColor: "#8b5cf6",
              borderRadius: 5,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, border: { display: false } },
            x: { grid: { display: false } },
          },
        },
      });
      charts.push(chart);
    }

    if (conditionChartRef.current) {
      const chart = new Chart(conditionChartRef.current, {
        type: "polarArea",
        data: {
          labels: [
            "Hypertension",
            "Diabetes",
            "Asthma",
            "Arthritis",
            "Heart Disease",
          ],
          datasets: [
            {
              data: [35, 28, 15, 12, 10],
              backgroundColor: [
                "#3b82f6",
                "#10b981",
                "#8b5cf6",
                "#f59e0b",
                "#ef4444",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: "right" } },
        },
      });
      charts.push(chart);
    }

    // Cleanup function to destroy all charts
    return () => {
      charts.forEach((chart) => chart.destroy());
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Warpper pageName="Reports">
      <Head>
        <title>MedAdmin - Reports & Analytics</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          
          body {
            font-family: 'Poppins', sans-serif;
            background: #f8fafc;
          }
          
          .sidebar {
            background: linear-gradient(180deg, #1e40af 0%, #1e3a8a 100%);
            width: ${isSidebarOpen ? "260px" : "70px"};
            transition: all 0.3s ease;
          }
          
          .main-content {
            transition: all 0.3s ease;
            width: calc(100% - ${isSidebarOpen ? "260px" : "70px"});
          }
          
          .nav-item {
            transition: all 0.2s ease;
          }
          
          .nav-item:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }
          
          .card {
            transition: all 0.3s ease;
            border-radius: 12px;
            overflow: hidden;
          }
          
          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }
          
          .chart-container {
            position: relative;
            height: 300px;
          }
          
          @media (min-width: 768px) {
            .sidebar { width: 260px; }
            .main-content { width: calc(100% - 260px); }
          }
        `}</style>
      </Head>

      <div className="flex">
        {/* Main Content */}
        <div className="main-content w-full">
          {/* Top Navigation */}
          <div className="bg-white shadow-sm p-4 flex justify-between items-center mt-10">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="md:hidden text-gray-600 mr-4"
              >
                <FontAwesomeIcon
                  icon={faBars as IconProp}
                  className="text-xl"
                />
              </button>
              <h2 className="text-xl font-semibold text-gray-800">
                Reports & Analytics
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm">
                  <FontAwesomeIcon
                    icon={faCalendar as IconProp}
                    className="mr-1"
                  />{" "}
                  Last 30 Days
                </button>
                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">
                  <FontAwesomeIcon
                    icon={faDownload as IconProp}
                    className="mr-1"
                  />{" "}
                  Export Report
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="pb-6 pt-[0.5px]">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {[
                {
                  title: "Total Patients",
                  value: "1,248",
                  change: "12% from last month",
                  icon: faUserInjured,
                  iconColor: "text-blue-600",
                  bgColor: "bg-blue-100",
                  changeIcon: faChevronRight,
                }, // Note: Original had faArrowUp, but using faStar as placeholder since error mentioned star
                {
                  title: "Appointments",
                  value: "328",
                  change: "8% from last month",
                  icon: faCalendarCheck,
                  iconColor: "text-green-600",
                  bgColor: "bg-green-100",
                  changeIcon: faChevronRight,
                },
                {
                  title: "Revenue",
                  value: "$24,582",
                  change: "15% from last month",
                  icon: faDollarSign,
                  iconColor: "text-purple-600",
                  bgColor: "bg-purple-100",
                  changeIcon: faChevronRight,
                },
                {
                  title: "Avg. Patient Rating",
                  value: "4.7/5",
                  change: "Based on 328 reviews",
                  icon: faStar,
                  iconColor: "text-yellow-600",
                  bgColor: "bg-yellow-100",
                  changeIcon: null,
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white card p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="text-gray-600 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {stat.value}
                    </p>
                    <p
                      className={`text-xs ${
                        stat.title === "Avg. Patient Rating"
                          ? "text-gray-600"
                          : "text-green-600"
                      } mt-1`}
                    >
                      {stat.changeIcon && (
                        <FontAwesomeIcon icon={stat.changeIcon as IconProp} />
                      )}{" "}
                      {stat.change}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center`}
                  >
                    <FontAwesomeIcon
                      icon={stat.icon as IconProp}
                      className={stat.iconColor}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white card p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Patient Growth
                </h3>
                <div className="chart-container">
                  <canvas ref={patientGrowthChartRef}></canvas>
                </div>
              </div>

              <div className="bg-white card p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Appointment Types
                </h3>
                <div className="chart-container">
                  <canvas ref={appointmentTypeChartRef}></canvas>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white card p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Monthly Revenue
                </h3>
                <div className="chart-container">
                  <canvas ref={revenueChartRef}></canvas>
                </div>
              </div>

              <div className="bg-white card p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Patient Conditions
                </h3>
                <div className="chart-container">
                  <canvas ref={conditionChartRef}></canvas>
                </div>
              </div>
            </div>

            {/* Reports List */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Generated Reports
                </h3>
                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">
                  <FontAwesomeIcon icon={faPlus as IconProp} className="mr-1" />{" "}
                  Generate New Report
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-3 px-4 font-semibold text-gray-700">
                        Report Name
                      </th>
                      <th className="py-3 px-4 font-semibold text-gray-700">
                        Date Range
                      </th>
                      <th className="py-3 px-4 font-semibold text-gray-700">
                        Generated On
                      </th>
                      <th className="py-3 px-4 font-semibold text-gray-700">
                        Type
                      </th>
                      <th className="py-3 px-4 font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {[
                      {
                        name: "Monthly Patient Summary",
                        range: "Oct 1 - Oct 31, 2023",
                        generated: "Nov 1, 2023",
                        type: "Summary",
                        typeColor: "bg-blue-100 text-blue-800",
                      },
                      {
                        name: "Q3 Financial Report",
                        range: "Jul 1 - Sep 30, 2023",
                        generated: "Oct 5, 2023",
                        type: "Financial",
                        typeColor: "bg-green-100 text-green-800",
                      },
                      {
                        name: "Doctor Performance Analysis",
                        range: "Jan 1 - Oct 31, 2023",
                        generated: "Nov 3, 2023",
                        type: "Performance",
                        typeColor: "bg-purple-100 text-purple-800",
                      },
                      {
                        name: "Patient Satisfaction Survey",
                        range: "Sep 1 - Sep 30, 2023",
                        generated: "Oct 10, 2023",
                        type: "Feedback",
                        typeColor: "bg-yellow-100 text-yellow-800",
                      },
                      {
                        name: "Medication Compliance Report",
                        range: "Aug 1 - Oct 31, 2023",
                        generated: "Nov 2, 2023",
                        type: "Health",
                        typeColor: "bg-red-100 text-red-800",
                      },
                    ].map((report, index) => (
                      <tr key={index}>
                        <td className="py-4 px-4 font-medium">{report.name}</td>
                        <td className="py-4 px-4">{report.range}</td>
                        <td className="py-4 px-4">{report.generated}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2 py-1 ${report.typeColor} rounded-full text-xs`}
                          >
                            {report.type}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <FontAwesomeIcon icon={faEye as IconProp} />
                            </button>
                            <button className="text-green-600 hover:text-green-800">
                              <FontAwesomeIcon icon={faDownload as IconProp} />
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                              <FontAwesomeIcon icon={faTrash as IconProp} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center mt-6">
                <p className="text-sm text-gray-600">
                  Showing 1 to 5 of 23 reports
                </p>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">
                    <FontAwesomeIcon icon={faChevronLeft as IconProp} />
                  </button>
                  <button className="px-3 py-1 border border-blue-500 bg-blue-500 text-white rounded-lg">
                    1
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">
                    2
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">
                    3
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">
                    <FontAwesomeIcon icon={faChevronRight as IconProp} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Warpper>
  );
};

export default ReportsPage;
