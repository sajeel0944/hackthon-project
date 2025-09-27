"use client";

import { useState } from "react";

interface SystemSettingsData {
  systemName: string;
  timezone: string;
  dateFormat: string;
  recordsPerPage: string;
  dataAnalytics: boolean;
  autoLogout: boolean;
  showHealthTips: boolean;
}

export const SystemSettings = () => {
  const [settings, setSettings] = useState<SystemSettingsData>({
    systemName: "MedAI Healthcare System",
    timezone: "(GMT+05:00) Islamabad, Karachi",
    dateFormat: "DD/MM/YYYY",
    recordsPerPage: "10",
    dataAnalytics: true,
    autoLogout: true,
    showHealthTips: true,
  });

  const handleSaveSettings = () => {
    // Implement save logic
    console.log("Saving system settings:", settings);
  };

  return (
    <div id="system-tab" className="tab-content animate-fadeIn">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        System Settings
      </h3>
      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-md font-medium text-gray-800 mb-4">
            General Settings
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                System Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={settings.systemName}
                onChange={(e) =>
                  setSettings({ ...settings, systemName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Timezone
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={settings.timezone}
                onChange={(e) =>
                  setSettings({ ...settings, timezone: e.target.value })
                }
              >
                <option>(GMT+05:00) Islamabad, Karachi</option>
                <option>(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                <option>(GMT+00:00) Dublin, Edinburgh, Lisbon, London</option>
                <option>(GMT-05:00) Eastern Time (US & Canada)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Format
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={settings.dateFormat}
                onChange={(e) =>
                  setSettings({ ...settings, dateFormat: e.target.value })
                }
              >
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Records Per Page
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={settings.recordsPerPage}
                onChange={(e) =>
                  setSettings({ ...settings, recordsPerPage: e.target.value })
                }
              >
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-md font-medium text-gray-800 mb-4">
            Privacy Settings
          </h4>
          <div className="space-y-4">
            {[
              {
                key: "dataAnalytics",
                label: "Data Analytics",
                description:
                  "Allow anonymous usage data to help improve the system",
              },
              {
                key: "autoLogout",
                label: "Auto Logout",
                description:
                  "Automatically logout after 30 minutes of inactivity",
              },
              {
                key: "showHealthTips",
                label: "Show Health Tips",
                description:
                  "Display health tips and educational content to patients",
              },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={Boolean(
                      settings[item.key as keyof SystemSettingsData]
                    )}
                    onChange={() =>
                      setSettings({
                        ...settings,
                        [item.key]: !settings[
                          item.key as keyof SystemSettingsData
                        ] as boolean,
                      })
                    }
                  />

                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-4">
          <button
            type="button"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            onClick={handleSaveSettings}
          >
            Save System Settings
          </button>
        </div>
      </div>
    </div>
  );
};
