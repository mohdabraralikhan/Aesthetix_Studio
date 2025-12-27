import React from 'react';

const MyTasks: React.FC = () => {
  const myTasks = [
    { id: '1', title: 'Design homepage layouts', project: 'Website Redesign', dueDate: '2025-01-25', status: 'In Progress' },
    { id: '2', title: 'Create component mockups', project: 'Design System', dueDate: '2025-01-30', status: 'To Do' },
    { id: '3', title: 'Review design specs', project: 'Mobile App', dueDate: '2025-01-22', status: 'In Progress' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="font-display text-4xl font-medium mb-2">My Tasks</h1>
      <p className="text-gray-500 font-light mb-8">Your assigned work</p>

      <div className="space-y-4">
        {myTasks.map((task) => (
          <div key={task.id} className="bg-white p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-800">{task.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{task.project}</p>
                <p className="text-xs text-gray-400 mt-1">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              </div>
              <span className={`text-xs font-medium uppercase px-2 py-1 border ${
                task.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50 text-gray-700 border-gray-200'
              }`}>
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTasks;
