'use client';

import { useState } from 'react';

interface NotificationPreferences {
  systemUpdates: boolean;
  securityAlerts: boolean;
  newPatients: boolean;
  appointmentReminders: boolean;
  criticalAlerts: boolean;
  newMessages: boolean;
}

export const NotificationSettings = () => {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    systemUpdates: true,
    securityAlerts: true,
    newPatients: true,
    appointmentReminders: false,
    criticalAlerts: true,
    newMessages: false,
  });

  const handleSavePreferences = () => {
    // Implement save logic
    console.log('Saving notification preferences:', preferences);
  };

  return (
    <div id="notifications-tab" className="tab-content animate-fadeIn">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Notification Preferences</h3>
      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-md font-medium text-gray-800 mb-4">Email Notifications</h4>
          <div className="space-y-4">
            {[
              {
                key: 'systemUpdates',
                label: 'System Updates',
                description: 'Important system notifications and updates',
              },
              {
                key: 'securityAlerts',
                label: 'Security Alerts',
                description: 'Critical security alerts and notifications',
              },
              {
                key: 'newPatients',
                label: 'New Patient Registrations',
                description: 'Notifications when new patients register',
              },
              {
                key: 'appointmentReminders',
                label: 'Appointment Reminders',
                description: 'Daily appointment summaries',
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
                    checked={preferences[item.key as keyof NotificationPreferences]}
                    onChange={() =>
                      setPreferences({
                        ...preferences,
                        [item.key]: !preferences[item.key as keyof NotificationPreferences],
                      })
                    }
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-md font-medium text-gray-800 mb-4">Push Notifications</h4>
          <div className="space-y-4">
            {[
              {
                key: 'criticalAlerts',
                label: 'Critical Alerts',
                description: 'Immediate push notifications for critical events',
              },
              {
                key: 'newMessages',
                label: 'New Messages',
                description: 'Notifications when you receive new messages',
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
                    checked={preferences[item.key as keyof NotificationPreferences]}
                    onChange={() =>
                      setPreferences({
                        ...preferences,
                        [item.key]: !preferences[item.key as keyof NotificationPreferences],
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
            onClick={handleSavePreferences}
          >
            Save Notification Preferences
          </button>
        </div>
      </div>
    </div>
  );
};