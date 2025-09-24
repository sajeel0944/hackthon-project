'use client';

import { useState } from 'react';

interface BackupOptions {
  patientData: boolean;
  doctorData: boolean;
  appointmentHistory: boolean;
  systemSettings: boolean;
}

interface RestoreOption {
  value: string;
  label: string;
}

export const BackupRestore = () => {
  const [backupOptions, setBackupOptions] = useState<BackupOptions>({
    patientData: true,
    doctorData: true,
    appointmentHistory: true,
    systemSettings: false,
  });
  const [restoreOption, setRestoreOption] = useState('complete');

  const handleCreateBackup = () => {
    // Implement backup logic
    console.log('Creating backup with options:', backupOptions);
  };

  const handleRestore = () => {
    // Implement restore logic
    console.log('Restoring with option:', restoreOption);
  };

  return (
    <div id="backup-tab" className="tab-content animate-fadeIn">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Backup & Restore</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-md font-medium text-gray-800 mb-4">Create Backup</h4>
          <p className="text-sm text-gray-600 mb-4">
            Create a complete backup of your system data, including patients, doctors, and appointments.
          </p>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Backup Options</label>
            <div className="space-y-2">
              {[
                { key: 'patientData', label: 'Patient Data' },
                { key: 'doctorData', label: 'Doctor Data' },
                { key: 'appointmentHistory', label: 'Appointment History' },
                { key: 'systemSettings', label: 'System Settings' },
              ].map((item) => (
                <div key={item.key} className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded text-blue-600 focus:ring-blue-500"
                    checked={backupOptions[item.key as keyof BackupOptions]}
                    onChange={() =>
                      setBackupOptions({
                        ...backupOptions,
                        [item.key]: !backupOptions[item.key as keyof BackupOptions],
                      })
                    }
                  />
                  <label className="ml-2 text-sm text-gray-700">{item.label}</label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <button
              type="button"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              onClick={handleCreateBackup}
            >
              <i className="fas fa-download mr-2"></i> Create Backup Now
            </button>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-2">Last Backup</p>
            <p className="text-sm text-gray-600">October 28, 2023 at 2:30 AM</p>
          </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-md font-medium text-gray-800 mb-4">Restore Data</h4>
          <p className="text-sm text-gray-600 mb-4">
            Restore your system from a previous backup file.
          </p>
          <div className="mb-4 p-4 border border-dashed border-gray-300 rounded-lg text-center">
            <i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
            <p className="text-sm text-gray-600">Drag and drop backup file here or</p>
            <label className="text-blue-600 hover:text-blue-800 cursor-pointer">
              <input type="file" className="hidden" />
              <span>browse files</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Restore Options</label>
            <div className="space-y-2">
              {[
                { value: 'complete', label: 'Complete restore' },
                { value: 'selective', label: 'Selective restore' },
              ].map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="restoreOption"
                    className="text-blue-600 focus:ring-blue-500"
                    checked={restoreOption === option.value}
                    onChange={() => setRestoreOption(option.value)}
                  />
                  <label className="ml-2 text-sm text-gray-700">{option.label}</label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <button
              type="button"
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              onClick={handleRestore}
            >
              <i className="fas fa-upload mr-2"></i> Restore from Backup
            </button>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-red-600">
              <i className="fas fa-exclamation-triangle mr-1"></i> Warning: Restoring will overwrite current data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};