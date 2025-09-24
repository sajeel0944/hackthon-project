import { FC } from 'react';

const DoctorStatsOverview: FC = () => {
  const stats = [
    { title: 'Total Doctors', value: 24, icon: 'fa-user-md', bg: 'bg-blue-100', color: 'text-blue-600' },
    { title: 'Active Today', value: 18, icon: 'fa-stethoscope', bg: 'bg-green-100', color: 'text-green-600' },
    { title: 'On Leave', value: 3, icon: 'fa-bed', bg: 'bg-yellow-100', color: 'text-yellow-600' },
    { title: 'Available Slots', value: 142, icon: 'fa-calendar', bg: 'bg-purple-100', color: 'text-purple-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
          <div>
            <p className="text-gray-600 text-sm">{stat.title}</p>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
          <div className={`w-12 h-12 rounded-full ${stat.bg} flex items-center justify-center`}>
            <i className={`fas ${stat.icon} ${stat.color}`}></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorStatsOverview;