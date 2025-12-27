import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import type { Schema } from '../../amplify/data/resource';

const TASK_STATUSES = {
  TODO: 'ToDo',
  IN_PROGRESS: 'InProgress',
  IN_REVIEW: 'InReview',
  COMPLETED: 'Completed',
} as const;

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  ownerId: string;
  teamMembers?: string[];
  budget?: number;
  hourlyRate?: number;
  currencyCode?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Task {
  id: string;
  projectId: string;
  title: string;
  assignee: string;
  status: typeof TASK_STATUSES[keyof typeof TASK_STATUSES];
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  description?: string;
  estimatedHours?: number;
  hourlyRate?: number;
  timeLogged?: number;
}

const Dashboard: React.FC = () => {
  const client = generateClient<Schema>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data from Amplify
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load projects and tasks in parallel
        const [projectsResult, tasksResult] = await Promise.all([
          client.models.Project.list(),
          client.models.Task.list()
        ]);
        
        setProjects(projectsResult.data as Project[]);
        setTasks(tasksResult.data as Task[]);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard data loading error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Calculate dashboard stats
  const stats = {
    activeProjects: projects.length,
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === TASK_STATUSES.COMPLETED).length,
    teamMembers: new Set(tasks.map(t => t.assignee)).size,
    completionRate: tasks.length > 0 ? Math.round((tasks.filter(t => t.status === TASK_STATUSES.COMPLETED).length / tasks.length) * 100) : 0
  };

  // Task distribution
  const taskDistribution = {
    [TASK_STATUSES.TODO]: tasks.filter(t => t.status === TASK_STATUSES.TODO).length,
    [TASK_STATUSES.IN_PROGRESS]: tasks.filter(t => t.status === TASK_STATUSES.IN_PROGRESS).length,
    [TASK_STATUSES.IN_REVIEW]: tasks.filter(t => t.status === TASK_STATUSES.IN_REVIEW).length,
    [TASK_STATUSES.COMPLETED]: tasks.filter(t => t.status === TASK_STATUSES.COMPLETED).length,
  };

  // Project progress calculation
  const getProjectProgress = (projectId: string) => {
    const projectTasks = tasks.filter(t => t.projectId === projectId);
    if (projectTasks.length === 0) return 0;
    const completedTasks = projectTasks.filter(t => t.status === TASK_STATUSES.COMPLETED).length;
    return Math.round((completedTasks / projectTasks.length) * 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case TASK_STATUSES.COMPLETED:
      case 'Completed':
        return 'text-green-600';
      case TASK_STATUSES.IN_PROGRESS:
      case 'InProgress':
        return 'text-studio-blue';
      case TASK_STATUSES.IN_REVIEW:
      case 'InReview':
        return 'text-yellow-600';
      case TASK_STATUSES.TODO:
      case 'Planning':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace(/([A-Z])/g, ' $1').trim();
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

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
          <p className="text-3xl font-display font-medium">{stats.activeProjects}</p>
          <p className="text-xs text-gray-400 mt-2">Total projects</p>
        </div>
        <div className="bg-white p-6 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Total Tasks</p>
          <p className="text-3xl font-display font-medium">{stats.totalTasks}</p>
          <p className="text-xs text-gray-400 mt-2">{stats.completedTasks} completed</p>
        </div>
        <div className="bg-white p-6 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Team Members</p>
          <p className="text-3xl font-display font-medium">{stats.teamMembers}</p>
          <p className="text-xs text-gray-400 mt-2">Active assignees</p>
        </div>
        <div className="bg-white p-6 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Completion Rate</p>
          <p className="text-3xl font-display font-medium">{stats.completionRate}%</p>
          <p className="text-xs text-gray-400 mt-2">Overall progress</p>
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
                <span className="text-sm font-medium">{taskDistribution[TASK_STATUSES.TODO]}</span>
              </div>
              <div className="w-full h-2 bg-gray-100">
                <div className="h-2 bg-red-500" style={{ width: `${stats.totalTasks > 0 ? (taskDistribution[TASK_STATUSES.TODO] / stats.totalTasks) * 100 : 0}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-700">In Progress</span>
                <span className="text-sm font-medium">{taskDistribution[TASK_STATUSES.IN_PROGRESS]}</span>
              </div>
              <div className="w-full h-2 bg-gray-100">
                <div className="h-2 bg-yellow-500" style={{ width: `${stats.totalTasks > 0 ? (taskDistribution[TASK_STATUSES.IN_PROGRESS] / stats.totalTasks) * 100 : 0}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-700">In Review</span>
                <span className="text-sm font-medium">{taskDistribution[TASK_STATUSES.IN_REVIEW]}</span>
              </div>
              <div className="w-full h-2 bg-gray-100">
                <div className="h-2 bg-blue-500" style={{ width: `${stats.totalTasks > 0 ? (taskDistribution[TASK_STATUSES.IN_REVIEW] / stats.totalTasks) * 100 : 0}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-700">Completed</span>
                <span className="text-sm font-medium">{taskDistribution[TASK_STATUSES.COMPLETED]}</span>
              </div>
              <div className="w-full h-2 bg-gray-100">
                <div className="h-2 bg-green-500" style={{ width: `${stats.totalTasks > 0 ? (taskDistribution[TASK_STATUSES.COMPLETED] / stats.totalTasks) * 100 : 0}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Project Progress */}
        <div className="bg-white p-8 border border-gray-100 shadow-sm">
          <h3 className="font-display font-medium mb-6">Project Progress</h3>
          <div className="space-y-6">
            {projects.slice(0, 3).map((project) => {
              const progress = getProjectProgress(project.id);
              return (
                <div key={project.id}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-700">{project.name}</span>
                    <span className="text-sm font-medium">{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100">
                    <div className="h-2 bg-studio-blue" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              );
            })}
            {projects.length === 0 && (
              <p className="text-gray-500 text-sm">No projects available</p>
            )}
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
          {projects.map((project) => {
            const progress = getProjectProgress(project.id);
            const projectTasks = tasks.filter(t => t.projectId === project.id);
            return (
              <div key={project.id} className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-medium mb-2">{project.name}</h3>
                    <p className="text-gray-500 text-sm font-light">{project.description}</p>
                  </div>
                  <span className={`text-xs font-medium uppercase tracking-widest ${getStatusColor(project.status)}`}>
                    {formatStatus(project.status)}
                  </span>
                </div>

                <div className="space-y-6">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-xs text-gray-500 uppercase tracking-widest">Progress</span>
                      <span className="text-xs font-medium text-gray-700">{progress}%</span>
                    </div>
                    <div className="w-full h-1 bg-gray-100">
                      <div
                        className="h-1 bg-studio-blue transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Team</span>
                      <span className="text-sm text-gray-700">{project.teamMembers?.join(', ') || 'No team assigned'}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Tasks</span>
                      <span className="text-sm text-gray-700">{projectTasks.length} total</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Budget</span>
                      <span className="text-sm text-gray-700">{project.currencyCode || 'USD'} {project.budget?.toFixed(2) || '0.00'}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {projects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No projects available</p>
            </div>
          )}
        </div>
      </div>

      {/* Tasks Section */}
      <div>
        <div className="mb-8">
          <span className="block font-mono text-gray-400 text-xs mb-4 uppercase tracking-widest">Active Tasks</span>
          <h2 className="font-display text-2xl font-medium">Current Work</h2>
        </div>

        <div className="grid gap-4">
          {tasks.slice(0, 10).map((task) => (
            <div key={task.id} className="bg-white p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between gap-6">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 mb-2">{task.title}</h4>
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>Assigned to: {task.assignee}</span>
                    <span>Due: {new Date(task.dueDate + 'T00:00:00').toLocaleDateString()}</span>
                    {task.estimatedHours && <span>Est: {task.estimatedHours}h</span>}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className={`text-xs font-medium uppercase tracking-widest px-2 py-1 border ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className={`text-xs font-medium uppercase tracking-widest ${getStatusColor(task.status)}`}>
                    {formatStatus(task.status)}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {tasks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No tasks available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
