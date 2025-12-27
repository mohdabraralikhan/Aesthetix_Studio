import React from 'react';

const Roadmap: React.FC = () => {
  const roadmapItems = [
    { id: '1', title: 'Q1 2025: Website Launch', status: 'In Progress', progress: 75 },
    { id: '2', title: 'Q2 2025: Mobile App Beta', status: 'Planning', progress: 25 },
    { id: '3', title: 'Q3 2025: Design System v2', status: 'Planning', progress: 10 },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="font-display text-4xl font-medium mb-2">Roadmap</h1>
      <p className="text-gray-500 font-light mb-8">Strategic planning and milestones</p>

      <div className="space-y-6">
        {roadmapItems.map((item) => (
          <div key={item.id} className="bg-white p-8 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-medium text-gray-800">{item.title}</h3>
              <span className={`text-xs font-medium uppercase px-2 py-1 border ${
                item.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50 text-gray-700 border-gray-200'
              }`}>
                {item.status}
              </span>
            </div>
            <div className="w-full h-2 bg-gray-100">
              <div className="h-2 bg-studio-blue" style={{ width: `${item.progress}%` }} />
            </div>
            <p className="text-xs text-gray-500 mt-2">{item.progress}% complete</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
