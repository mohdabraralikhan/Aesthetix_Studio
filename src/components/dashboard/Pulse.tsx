import React from 'react';

const StatCard: React.FC<{title:string, subtitle:string, value:string, color?:string}> = ({title, subtitle, value, color='bg-gray-800'}) => (
  <div className={`rounded-lg p-4 ${color} border border-gray-700`}> 
    <div className="text-xs text-gray-300 uppercase tracking-widest">{title}</div>
    <div className="mt-2 flex items-baseline justify-between">
      <div>
        <div className="text-2xl font-display">{value}</div>
        <div className="text-sm text-gray-400">{subtitle}</div>
      </div>
      <div className="w-32 h-2 bg-gray-700 rounded overflow-hidden">
        <div className="h-2 bg-studio-blue" style={{width: '65%'}} />
      </div>
    </div>
  </div>
);

const Pulse: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <StatCard title="Design Thinking" subtitle="Prototype Fidelity" value="Fidelity 3/5" color="bg-gray-900" />
      <StatCard title="Agile Health" subtitle="Sprint Burndown" value="Velocity ↑" color="bg-gray-900" />
      <StatCard title="DevOps" subtitle="Last Deploy" value="Success" color="bg-gray-900" />

      <div className="lg:col-span-3 mt-2 text-sm text-gray-400">
        <div className="rounded-lg p-4 bg-gray-900 border border-gray-700">
          <div className="font-medium mb-2">Hybrid Status Gauge</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-gray-300">Empathy Map</div>
              <div className="text-sm">80% completed</div>
            </div>
            <div>
              <div className="text-xs text-gray-300">Sprint Burndown</div>
              <div className="text-sm">2 days left</div>
            </div>
            <div>
              <div className="text-xs text-gray-300">Build Status</div>
              <div className="text-sm">Green • 4 deploys/day</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pulse;
