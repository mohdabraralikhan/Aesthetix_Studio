import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import type { Schema } from '../../amplify/data/resource';

interface Task {
  id: string;
  title: string;
  assignee: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  description?: string;
  status: 'To Do' | 'In Progress' | 'In Review' | 'Completed';
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
}

const ClientPortal: React.FC = () => {
  const client = generateClient<Schema>();
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const result = await client.models.Project.list();
        const projectsList = (result.data || []) as Project[];
        setProjects(projectsList);
        
        if (projectsList.length > 0) {
          setSelectedProjectId(projectsList[0].id);
        }
      } catch (err) {
        console.error('Error loading projects:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadProjects();
  }, []);

  useEffect(() => {
    if (!selectedProjectId) return;

    const loadTasks = async () => {
      try {
        const result = await client.models.Task.list({
          filter: { projectId: { eq: selectedProjectId } },
        });
        
        const tasksList = (result.data || []) as Task[];
        setTasks(tasksList);
      } catch (err) {
        console.error('Error loading tasks:', err);
      }
    };

    loadTasks();
  }, [selectedProjectId]);

  const getProgressPercentage = (): number => {
    if (tasks.length === 0) return 0;
    const completedCount = tasks.filter(t => t.status === 'Completed').length;
    return Math.round((completedCount / tasks.length) * 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-50';
      case 'In Progress': return 'text-blue-600 bg-blue-50';
      case 'In Review': return 'text-yellow-600 bg-yellow-50';
      case 'To Do': return 'text-gray-500 bg-gray-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (statusFilter === 'All') return true;
    return task.status === statusFilter;
  });

  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const selectedTask = tasks.find(t => t.id === selectedTaskId);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-studio-base">
        <p className="text-gray-500">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-studio-base">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="font-display text-4xl font-medium mb-2">Project Status</h1>
          <p className="text-gray-500 font-light">View project progress and task updates</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Project Selector */}
        <div className="bg-white border border-gray-200 p-6 mb-8">
          <label className="block text-xs text-gray-500 uppercase tracking-widest mb-3">Select Project</label>
          <select
            value={selectedProjectId}
            onChange={(e) => {
              setSelectedProjectId(e.target.value);
              setSelectedTaskId(null);
            }}
            className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 mb-6"
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>

          {selectedProject && (
            <>
              <div className="pt-6 border-t border-gray-100 mb-6">
                <h3 className="font-display text-lg font-medium mb-2">{selectedProject.name}</h3>
                <p className="text-gray-600 font-light text-sm mb-4">{selectedProject.description}</p>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                  <span className="text-sm font-medium text-studio-blue">{getProgressPercentage()}%</span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-studio-blue to-blue-400 transition-all duration-500"
                    style={{ width: `${getProgressPercentage()}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mt-6">
                <div className="text-center p-4 bg-gray-50 border border-gray-100">
                  <p className="text-2xl font-display font-medium text-gray-800">{tasks.length}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Total Tasks</p>
                </div>
                <div className="text-center p-4 bg-blue-50 border border-blue-200">
                  <p className="text-2xl font-display font-medium text-blue-600">{tasks.filter(t => t.status === 'In Progress').length}</p>
                  <p className="text-xs text-blue-600 uppercase tracking-widest mt-1">In Progress</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 border border-yellow-200">
                  <p className="text-2xl font-display font-medium text-yellow-600">{tasks.filter(t => t.status === 'In Review').length}</p>
                  <p className="text-xs text-yellow-600 uppercase tracking-widest mt-1">In Review</p>
                </div>
                <div className="text-center p-4 bg-green-50 border border-green-200">
                  <p className="text-2xl font-display font-medium text-green-600">{tasks.filter(t => t.status === 'Completed').length}</p>
                  <p className="text-xs text-green-600 uppercase tracking-widest mt-1">Completed</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Status Filter */}
        <div className="mb-6 flex gap-2 flex-wrap">
          {['All', 'To Do', 'In Progress', 'In Review', 'Completed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 text-sm font-medium border transition-colors ${
                statusFilter === status
                  ? 'bg-studio-dark text-white border-studio-dark'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white border border-gray-200 p-8">
              <p className="text-gray-400 text-lg">No tasks in this status</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => setSelectedTaskId(task.id)}
                className="bg-white border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-display text-lg font-medium flex-1 text-gray-800">{task.title}</h3>
                  <span className={`text-xs font-medium uppercase px-2 py-1 ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4">{task.assignee}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                </div>

                {task.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Task Detail Modal */}
      {selectedTaskId && selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4">
          <div className="bg-white border border-gray-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="font-display text-2xl font-medium mb-3">{selectedTask.title}</h2>
                  <div className="flex gap-2 items-center">
                    <span className={`text-xs font-medium uppercase px-3 py-1 border rounded-full ${getStatusColor(selectedTask.status)}`}>
                      {selectedTask.status}
                    </span>
                    <span className={`text-xs font-medium uppercase px-3 py-1 border rounded-full border-gray-200 ${getPriorityColor(selectedTask.priority)}`}>
                      {selectedTask.priority} Priority
                    </span>
                  </div>
                </div>
                <button onClick={() => setSelectedTaskId(null)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-gray-100">
                <div>
                  <span className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Assigned To</span>
                  <p className="text-sm font-medium">{selectedTask.assignee}</p>
                </div>
                <div>
                  <span className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Due Date</span>
                  <p className="text-sm font-medium">{new Date(selectedTask.dueDate).toLocaleDateString()}</p>
                </div>
              </div>

              {selectedTask.description && (
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <h3 className="font-medium text-sm mb-2">Description</h3>
                  <p className="text-gray-600 text-sm">{selectedTask.description}</p>
                </div>
              )}

              {/* Status Timeline */}
              <div className="mb-6">
                <h3 className="font-medium text-sm mb-4">Status Progress</h3>
                <div className="space-y-3">
                  {['To Do', 'In Progress', 'In Review', 'Completed'].map((status, idx) => (
                    <div key={status} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        ['To Do', 'In Progress', 'In Review', 'Completed'].indexOf(selectedTask.status) >= idx
                          ? 'bg-studio-blue text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {idx + 1}
                      </div>
                      <span className="text-sm">{status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientPortal;
