import React, { useState } from 'react';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'Planning' | 'In Progress' | 'In Review' | 'Completed';
  team: string[];
  dueDate: string;
  progress: number;
}

interface Task {
  id: string;
  projectId: string;
  title: string;
  assignee: string;
  status: 'To Do' | 'In Progress' | 'Review' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
}

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Website Redesign',
      description: 'Complete redesign of the main website',
      status: 'In Progress',
      team: ['Alex', 'Sarah'],
      dueDate: '2025-02-15',
      progress: 65
    },
    {
      id: '2',
      name: 'Mobile App Development',
      description: 'Native mobile application for iOS and Android',
      status: 'Planning',
      team: ['John', 'Mike', 'Lisa'],
      dueDate: '2025-03-30',
      progress: 20
    },
    {
      id: '3',
      name: 'Design System',
      description: 'Comprehensive design tokens and components',
      status: 'In Review',
      team: ['Emma'],
      dueDate: '2025-01-31',
      progress: 90
    }
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      projectId: '1',
      title: 'Design homepage layouts',
      assignee: 'Alex',
      status: 'Done',
      priority: 'High',
      dueDate: '2025-01-15'
    },
    {
      id: '2',
      projectId: '1',
      title: 'Implement navigation component',
      assignee: 'Sarah',
      status: 'In Progress',
      priority: 'High',
      dueDate: '2025-01-20'
    },
    {
      id: '3',
      projectId: '2',
      title: 'Define app architecture',
      assignee: 'John',
      status: 'To Do',
      priority: 'High',
      dueDate: '2025-01-25'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
      case 'Done':
        return 'text-green-600';
      case 'In Progress':
        return 'text-studio-blue';
      case 'In Review':
      case 'Review':
        return 'text-yellow-600';
      case 'Planning':
      case 'To Do':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Low':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="font-display text-4xl font-medium mb-2">Project Dashboard</h1>
        <p className="text-gray-500 font-light">Track all projects and tasks in one place</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        <div className="bg-white p-6 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Active Projects</p>
          <p className="text-3xl font-display font-medium">3</p>
          <p className="text-xs text-gray-400 mt-2">+1 this month</p>
        </div>
        <div className="bg-white p-6 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Total Tasks</p>
          <p className="text-3xl font-display font-medium">47</p>
          <p className="text-xs text-gray-400 mt-2">12 completed</p>
        </div>
        <div className="bg-white p-6 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Team Members</p>
          <p className="text-3xl font-display font-medium">8</p>
          <p className="text-xs text-gray-400 mt-2">All active</p>
        </div>
        <div className="bg-white p-6 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Completion Rate</p>
          <p className="text-3xl font-display font-medium">78%</p>
          <p className="text-xs text-gray-400 mt-2">This quarter</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {/* Tasks Distribution */}
        <div className="bg-white p-8 border border-gray-100 shadow-sm">
          <h3 className="font-display font-medium mb-6">Task Distribution</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-700">To Do</span>
                <span className="text-sm font-medium">12</span>
              </div>
              <div className="w-full h-2 bg-gray-100">
                <div className="h-2 bg-red-500" style={{ width: '25%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-700">In Progress</span>
                <span className="text-sm font-medium">18</span>
              </div>
              <div className="w-full h-2 bg-gray-100">
                <div className="h-2 bg-yellow-500" style={{ width: '38%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-700">In Review</span>
                <span className="text-sm font-medium">9</span>
              </div>
              <div className="w-full h-2 bg-gray-100">
                <div className="h-2 bg-blue-500" style={{ width: '19%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-700">Completed</span>
                <span className="text-sm font-medium">8</span>
              </div>
              <div className="w-full h-2 bg-gray-100">
                <div className="h-2 bg-green-500" style={{ width: '17%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Project Progress */}
        <div className="bg-white p-8 border border-gray-100 shadow-sm">
          <h3 className="font-display font-medium mb-6">Project Progress</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-700">Website Redesign</span>
                <span className="text-sm font-medium">65%</span>
              </div>
              <div className="w-full h-2 bg-gray-100">
                <div className="h-2 bg-studio-blue" style={{ width: '65%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-700">Mobile App</span>
                <span className="text-sm font-medium">20%</span>
              </div>
              <div className="w-full h-2 bg-gray-100">
                <div className="h-2 bg-studio-blue" style={{ width: '20%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-700">Design System</span>
                <span className="text-sm font-medium">90%</span>
              </div>
              <div className="w-full h-2 bg-gray-100">
                <div className="h-2 bg-studio-blue" style={{ width: '90%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="mb-16">
        <div className="mb-8">
          <span className="block font-mono text-gray-400 text-xs mb-4 uppercase tracking-widest">Projects</span>
          <h2 className="font-display text-2xl font-medium">Active Projects</h2>
        </div>

        <div className="grid gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-medium mb-2">{project.name}</h3>
                  <p className="text-gray-500 text-sm font-light">{project.description}</p>
                </div>
                <span className={`text-xs font-medium uppercase tracking-widest ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>

              <div className="space-y-6">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-gray-500 uppercase tracking-widest">Progress</span>
                    <span className="text-xs font-medium text-gray-700">{project.progress}%</span>
                  </div>
                  <div className="w-full h-1 bg-gray-100">
                    <div
                      className="h-1 bg-studio-blue transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Meta Info */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Team</span>
                    <span className="text-sm text-gray-700">{project.team.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Due Date</span>
                    <span className="text-sm text-gray-700">{new Date(project.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tasks Section */}
      <div>
        <div className="mb-8">
          <span className="block font-mono text-gray-400 text-xs mb-4 uppercase tracking-widest">Active Tasks</span>
          <h2 className="font-display text-2xl font-medium">Current Work</h2>
        </div>

        <div className="grid gap-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between gap-6">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 mb-2">{task.title}</h4>
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>Assigned to: {task.assignee}</span>
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className={`text-xs font-medium uppercase tracking-widest px-2 py-1 border ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className={`text-xs font-medium uppercase tracking-widest ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
