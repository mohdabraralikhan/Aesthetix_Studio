import React from 'react';

const FocusMode: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 rounded-lg p-6 bg-gray-900 border border-gray-700">
        <h3 className="text-lg font-display mb-4">My Up Next</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-800 rounded">
            <div className="font-medium">Implement responsive header</div>
            <div className="text-sm text-gray-400">Due: Today • Est. 2h</div>
          </div>
          <div className="p-4 bg-gray-800 rounded">
            <div className="font-medium">Fix payment timeout edge case</div>
            <div className="text-sm text-gray-400">Due: Tomorrow • Est. 3h</div>
          </div>
        </div>
      </div>

      <aside className="rounded-lg p-6 bg-gray-900 border border-gray-700">
        <h3 className="text-lg font-display mb-4">My Blockers</h3>
        <ul className="text-sm text-gray-200 space-y-3">
          <li>
            <div className="font-medium">Waiting on client logo approval</div>
            <div className="text-gray-400">Owner: Product • 2 days</div>
          </li>
          <li>
            <div className="font-medium">Design tokens mismatch</div>
            <div className="text-gray-400">Owner: Design • 1 day</div>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default FocusMode;
