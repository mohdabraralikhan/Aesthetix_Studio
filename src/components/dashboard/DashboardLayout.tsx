import React from 'react';
import Pulse from './Pulse';
import HandoffBridge from './HandoffBridge';
import FocusMode from './FocusMode';

const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen p-6 bg-studio-base text-white">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-display">Nexus — Project Dashboard</h1>
        <div className="text-sm text-gray-300">Dark mode</div>
      </header>

      <main className="space-y-12">
        <section aria-label="Pulse (High-Level Health)">
          <Pulse />
        </section>

        <section aria-label="Handoff Bridge (Cross-Functional View)">
          <HandoffBridge />
        </section>

        <section aria-label="Focus Mode (Individual)">
          <FocusMode />
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
