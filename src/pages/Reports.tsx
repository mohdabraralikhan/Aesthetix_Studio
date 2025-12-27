import React from 'react';

const Reports: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="font-display text-4xl font-medium mb-2">Reports</h1>
      <p className="text-gray-500 font-light mb-8">Analytics and insights</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 border border-gray-100 shadow-sm">
          <h3 className="font-display text-lg font-medium mb-4">Project Overview</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-700">Active Projects</span>
              <span className="font-medium">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Completed Projects</span>
              <span className="font-medium">5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Team Members</span>
              <span className="font-medium">8</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 border border-gray-100 shadow-sm">
          <h3 className="font-display text-lg font-medium mb-4">Task Status</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-700">To Do</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">In Progress</span>
              <span className="font-medium">8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Completed</span>
              <span className="font-medium">24</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
