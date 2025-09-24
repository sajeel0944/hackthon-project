'use client';

import { BackupRestore } from '@/components/Administration/SettingsSection/BackupRestore';
import { NotificationSettings } from '@/components/Administration/SettingsSection/NotificationSettings';
import { ProfileSettings } from '@/components/Administration/SettingsSection/ProfileSettings';
import { SecuritySettings } from '@/components/Administration/SettingsSection/SecuritySettings';
import { SystemSettings } from '@/components/Administration/SettingsSection/SystemSettings';
import Warpper from '@/components/Administration/Warpper';
import { useState } from 'react';

interface Tab {
  id: string;
  icon: string;
  label: string;
}

const tabs: Tab[] = [
  { id: 'profile', icon: 'fas fa-user-circle', label: 'Profile' },
  { id: 'security', icon: 'fas fa-shield-alt', label: 'Security' },
  { id: 'notifications', icon: 'fas fa-bell', label: 'Notifications' },
  { id: 'system', icon: 'fas fa-cog', label: 'System Settings' },
  { id: 'backup', icon: 'fas fa-database', label: 'Backup & Restore' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <Warpper pageName='Settings'>
    <div>
      

      <div className="p-6">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-wrap border-b border-gray-200 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button py-3 px-6 font-medium text-gray-600 rounded-t-lg transition-all ${
                  activeTab === tab.id ? 'bg-blue-500 text-white' : ''
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <i className={`${tab.icon} mr-2`}></i> {tab.label}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {activeTab === 'profile' && <ProfileSettings />}
            {activeTab === 'security' && <SecuritySettings />}
            {activeTab === 'notifications' && <NotificationSettings />}
            {activeTab === 'system' && <SystemSettings />}
            {activeTab === 'backup' && <BackupRestore />}
          </div>
        </div>
      </div>
    </div>
    </Warpper>
  );
}