import React, { useState, useCallback } from 'react';

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

interface Task {
  id: string;
  title: string;
  assignee: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  description?: string;
  comments?: Comment[];
  timeLogged?: number;
  dependencies?: string[];
  phase?: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
}

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

const ProjectsV2: React.FC = () => {
  const [projects] = useState<Project[]>([
    { id: '1', name: 'Website Redesign', description: 'Complete redesign of the main website', status: 'In Progress' },
    { id: '2', name: 'Mobile App', description: 'Native mobile application', status: 'Planning' },
    { id: '3', name: 'Design System', description: 'Component library and design tokens', status: 'In Review' }
  ]);

  const [selectedProjectId, setSelectedProjectId] = useState('1');
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());
  const [draggedTask, setDraggedTask] = useState<{task: Task; fromStatus: string} | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');

  const [tasks, setTasks] = useState<Record<string, Record<string, Task[]>>>({
    '1': {
      'To Do': [
        { id: '1', title: 'Setup Figma', assignee: 'Alex', priority: 'High', dueDate: '2025-01-25', description: 'Create Figma workspace and setup libraries', comments: [] },
        { id: '5', title: 'Create wireframes', assignee: 'Sarah', priority: 'High', dueDate: '2025-01-30', description: 'Low-fidelity wireframes for all pages', comments: [], phase: 'Discovery' }
      ],
      'In Progress': [
        { id: '2', title: 'Design hero section', assignee: 'Alex', priority: 'High', dueDate: '2025-01-20', description: 'Hero section design and animations', comments: [], timeLogged: 4 }
      ],
      'In Review': [
        { id: '3', title: 'Header component', assignee: 'Sarah', priority: 'Medium', dueDate: '2025-01-22', description: 'Responsive header component', comments: [], dependencies: ['1'] }
      ],
      'Completed': [
        { id: '4', title: 'Project kickoff', assignee: 'Emma', priority: 'High', dueDate: '2025-01-15', description: 'Initial project meeting and planning', comments: [] }
      ]
    },
    '2': { 'To Do': [], 'In Progress': [], 'In Review': [], 'Completed': [] },
    '3': { 'To Do': [], 'In Progress': [], 'In Review': [], 'Completed': [] }
  });

  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const projectTasks = tasks[selectedProjectId] || { 'To Do': [], 'In Progress': [], 'In Review': [], 'Completed': [] };
  const selectedTask = (Object.values(projectTasks) as Task[][])
    .flat()
    .find(t => t.id === selectedTaskId) as Task | undefined;

  const addNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const handleDragStart = (task: Task, status: string) => {
    setDraggedTask({ task, fromStatus: status });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (toStatus: string) => {
    if (!draggedTask) return;
    const { task, fromStatus } = draggedTask;

    if (fromStatus === toStatus) {
      setDraggedTask(null);
      return;
    }

    setTasks(prev => ({
      ...prev,
      [selectedProjectId]: {
        ...prev[selectedProjectId],
        [fromStatus]: prev[selectedProjectId][fromStatus].filter(t => t.id !== task.id),
        [toStatus]: [...prev[selectedProjectId][toStatus], task]
      }
    }));

    addNotification(`Task moved to ${toStatus}`, 'success');
    setDraggedTask(null);
  };

  const handleTaskSelect = (taskId: string) => {
    setSelectedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const handleBulkDelete = () => {
    if (selectedTasks.size === 0 || !confirm(`Delete ${selectedTasks.size} task(s)?`)) return;
    
    setTasks(prev => ({
      ...prev,
      [selectedProjectId]: Object.fromEntries(
        Object.entries(prev[selectedProjectId] || {}).map(([status, statusTasks]) => [
          status,
          (statusTasks as Task[]).filter(t => !selectedTasks.has(t.id))
        ])
      )
    }));

    setSelectedTasks(new Set());
    addNotification(`${selectedTasks.size} task(s) deleted`, 'success');
  };

  const handleAddComment = () => {
    if (!selectedTask || !newComment.trim()) return;

    setTasks(prev => ({
      ...prev,
      [selectedProjectId]: Object.fromEntries(
        Object.entries(prev[selectedProjectId] || {}).map(([status, statusTasks]) => [
          status,
          (statusTasks as Task[]).map(t => {
            if (t.id === selectedTask!.id) {
              return {
                ...t,
                comments: [
                  ...(t.comments || []),
                  {
                    id: Date.now().toString(),
                    author: 'You',
                    text: newComment,
                    timestamp: new Date().toISOString()
                  }
                ]
              };
            }
            return t;
          })
        ])
      )
    }));

    setNewComment('');
    addNotification('Comment added', 'success');
  };

  const isOverdue = (dueDate: string) => new Date(dueDate) < new Date();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600';
      case 'In Progress': return 'text-blue-600';
      case 'In Review': return 'text-yellow-600';
      case 'To Do': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const filteredTasks = (status: string) => {
    return (projectTasks[status as keyof typeof projectTasks] || []).filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    });
  };

  return (
    <div className="min-h-screen">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notif => (
          <div key={notif.id} className={`px-6 py-3 border shadow-lg text-sm font-medium ${
            notif.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' :
            notif.type === 'error' ? 'bg-red-50 text-red-700 border-red-200' :
            'bg-blue-50 text-blue-700 border-blue-200'
          }`}>
            {notif.message}
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="mb-8">
          <h1 className="font-display text-4xl font-medium mb-2">Projects</h1>
          <p className="text-gray-500 font-light">Manage your projects and tasks</p>
        </div>

        {/* Project Selector */}
        <div className="bg-white border border-gray-200 p-6 mb-6">
          <label className="block text-xs text-gray-500 uppercase tracking-widest mb-3">Select Project</label>
          <select
            value={selectedProjectId}
            onChange={(e) => {
              setSelectedProjectId(e.target.value);
              setSelectedTasks(new Set());
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
            <div className="pt-6 border-t border-gray-100">
              <h3 className="font-display text-lg font-medium mb-2">{selectedProject.name}</h3>
              <p className="text-gray-600 font-light text-sm">{selectedProject.description}</p>
            </div>
          )}
        </div>

        {/* Search & Filter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search tasks by name or assignee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
          />
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          {selectedTasks.size > 0 && (
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 text-sm hover:bg-red-100 transition-colors"
            >
              Delete {selectedTasks.size} Task(s)
            </button>
          )}
        </div>
      </div>

      {/* Kanban Board */}
      <div className="px-6 lg:px-20 pb-12">
        {selectedProject ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-6">
            {['To Do', 'In Progress', 'In Review', 'Completed'].map((status) => (
              <div
                key={status}
                className="bg-gray-50 p-4 border border-gray-200 min-h-[600px]"
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(status)}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`font-display font-medium ${getStatusColor(status)}`}>{status}</h3>
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 border border-gray-200">
                    {filteredTasks(status).length}
                  </span>
                </div>

                <button
                  onClick={() => {/* TODO: add task modal */}}
                  className="w-full mb-4 px-3 py-2 text-xs text-gray-600 border border-dashed border-gray-300 hover:border-gray-400 transition-colors"
                >
                  + Add Task
                </button>

                <div className="space-y-3">
                  {filteredTasks(status).length === 0 ? (
                    <div className="text-center py-8 text-gray-400 text-xs">
                      No tasks yet
                    </div>
                  ) : (
                    filteredTasks(status).map((task) => (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={() => handleDragStart(task, status)}
                        onClick={() => setSelectedTaskId(task.id)}
                        className={`bg-white p-3 border shadow-sm hover:shadow-md transition-shadow cursor-move ${
                          selectedTasks.has(task.id) ? 'border-blue-400 bg-blue-50' :
                          isOverdue(task.dueDate) && status !== 'Completed' ? 'border-red-200' :
                          'border-gray-200'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedTasks.has(task.id)}
                          onChange={() => handleTaskSelect(task.id)}
                          className="mr-2"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <p className="text-sm font-medium text-gray-800 mb-2">{task.title}</p>
                        <div className="space-y-1">
                          <div className="text-xs text-gray-500">{task.assignee}</div>
                          <div className="flex gap-2 items-center">
                            <span className={`text-xs font-medium uppercase px-2 py-0.5 border ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                            {isOverdue(task.dueDate) && status !== 'Completed' && (
                              <span className="text-xs text-red-600 font-medium">Overdue</span>
                            )}
                          </div>
                          <div className="text-xs text-gray-400">
                            {new Date(task.dueDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400">Select a project to view tasks</p>
          </div>
        )}
      </div>

      {/* Task Details Modal */}
      {selectedTaskId && selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4">
          <div className="bg-white border border-gray-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="font-display text-2xl font-medium mb-2">{selectedTask!.title}</h2>
                  <span className={`inline-block text-xs font-medium uppercase px-2 py-1 border ${getPriorityColor(selectedTask!.priority)}`}>
                    {selectedTask!.priority} Priority
                  </span>
                </div>
                <button onClick={() => setSelectedTaskId(null)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
              </div>

              {selectedTask!.description && (
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <h3 className="font-medium text-sm mb-2">Description</h3>
                  <p className="text-gray-600 text-sm">{selectedTask!.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-gray-100">
                <div>
                  <span className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Assignee</span>
                  <p className="text-sm font-medium">{selectedTask!.assignee}</p>
                </div>
                <div>
                  <span className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Due Date</span>
                  <p className={`text-sm font-medium ${isOverdue(selectedTask!.dueDate) ? 'text-red-600' : 'text-gray-700'}`}>
                    {new Date(selectedTask!.dueDate).toLocaleDateString()}
                  </p>
                </div>
                {selectedTask!.timeLogged && (
                  <div>
                    <span className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Time Logged</span>
                    <p className="text-sm font-medium">{selectedTask!.timeLogged}h</p>
                  </div>
                )}
                {selectedTask!.phase && (
                  <div>
                    <span className="block text-xs text-gray-500 uppercase tracking-widest mb-2\">Phase</span>
                    <p className="text-sm font-medium">{selectedTask!.phase}</p>
                  </div>
                )}
              </div>

              {/* Comments */}
              <div>
                <h3 className="font-medium text-sm mb-4">Comments ({selectedTask!.comments?.length || 0})</h3>
                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                  {selectedTask!.comments?.map(comment => (
                    <div key={comment.id} className="bg-gray-50 p-3 border border-gray-100">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-medium text-gray-800">{comment.author}</span>
                        <span className="text-xs text-gray-400">{new Date(comment.timestamp).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-gray-600">{comment.text}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                    className="flex-1 px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                  />
                  <button
                    onClick={handleAddComment}
                    className="px-4 py-2 bg-studio-dark text-white text-sm hover:bg-gray-800 transition-colors"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsV2;
