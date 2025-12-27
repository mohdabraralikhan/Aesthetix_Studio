import React from 'react';

const Activities: React.FC = () => {
  const activities = [
    { id: '1', user: 'Alex', action: 'created', target: 'Website Redesign project', time: '2 hours ago' },
    { id: '2', user: 'Sarah', action: 'completed', target: 'Header component task', time: '4 hours ago' },
    { id: '3', user: 'Emma', action: 'assigned', target: 'Design System to Mike', time: '1 day ago' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="font-display text-4xl font-medium mb-2">Activities</h1>
      <p className="text-gray-500 font-light mb-8">Track team activity and changes</p>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-white p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-studio-blue rounded-full" />
              <div>
                <p className="text-gray-800">
                  <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;
