import React from 'react';

const Backlog: React.FC = () => {
  const backlogItems = [
    { id: '1', title: 'Implement dark mode', project: 'Website Redesign', priority: 'High' },
    { id: '2', title: 'Add user analytics', project: 'Mobile App', priority: 'Medium' },
    { id: '3', title: 'Create icon library', project: 'Design System', priority: 'High' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="font-display text-4xl font-medium mb-2">Backlog</h1>
      <p className="text-gray-500 font-light mb-8">Upcoming features and improvements</p>

      <div className="space-y-4">
        {backlogItems.map((item) => (
          <div key={item.id} className="bg-white p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{item.project}</p>
              </div>
              <span className={`text-xs font-medium uppercase px-2 py-1 border ${
                item.priority === 'High' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'
              }`}>
                {item.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Backlog;
