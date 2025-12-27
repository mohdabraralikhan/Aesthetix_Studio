import React from 'react';

const HandoffBridge: React.FC = () => {
  return (
    <div className="rounded-lg p-6 bg-gray-900 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-display">Handoff Bridge</h2>
        <div className="text-sm text-gray-400">Cross-functional workflow</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <div className="text-xs text-gray-300 uppercase mb-2">Design-to-Code Sync</div>
          <div className="text-sm text-gray-200">Link Figma frames to branches</div>
          <a className="text-studio-blue text-sm mt-2 inline-block" href="#">Open Figma ↗</a>
        </div>

        <div>
          <div className="text-xs text-gray-300 uppercase mb-2">Edge-Case Tracker</div>
          <ul className="text-sm text-gray-200 space-y-1">
            <li>404 / Empty state — 2 items</li>
            <li>Payment timeout — 1 item</li>
            <li>Long-loading list — 3 items</li>
          </ul>
        </div>

        <div>
          <div className="text-xs text-gray-300 uppercase mb-2">Definition of Done</div>
          <ul className="text-sm text-gray-200 space-y-1">
            <li>Accessibility-tested ✅</li>
            <li>CI green ✅</li>
            <li>Design tokens synced ✅</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HandoffBridge;
