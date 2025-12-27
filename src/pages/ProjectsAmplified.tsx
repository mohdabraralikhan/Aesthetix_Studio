import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import type { Schema } from '../../amplify/data/resource';

const TASK_STATUSES = {
  TODO: 'ToDo',
  IN_PROGRESS: 'InProgress',
  IN_REVIEW: 'InReview',
  COMPLETED: 'Completed',
} as const;


// Extend interfaces with file attachments and role-based features
interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

interface Attachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadedBy: string;
  createdAt: string;
}

interface Task {
  id: string;
  title: string;
  assignee: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  description?: string;
  comments?: Comment[];
  attachments?: Attachment[];
  timeLogged?: number;
  estimatedHours?: number;
  hourlyRate?: number;
  costAllocated?: number;
  dependencies?: string[];
  phase?: string;
  status: typeof TASK_STATUSES[keyof typeof TASK_STATUSES];
}

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
}

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface User {
  email: string;
  userId: string;
  role: 'Lead' | 'Designer' | 'Developer';
}

const ProjectsAmplified: React.FC = () => {
  const client = generateClient<Schema>();
  
  // State management
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [tasks, setTasks] = useState<Record<string, Record<string, Task[]>>>({});
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());
  const [draggedTask, setDraggedTask] = useState<{task: Task; fromStatus: string} | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCalendarView, setShowCalendarView] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showBudgetPanel, setShowBudgetPanel] = useState(false);
  const [newTaskData, setNewTaskData] = useState({
    title: '',
    description: '',
    assignee: '',
    priority: 'Medium' as const,
    dueDate: '',
    estimatedHours: 0,
    hourlyRate: 0,
  });
  const [projectBudgetData, setProjectBudgetData] = useState({
    budget: 0,
    hourlyRate: 0,
    currencyCode: 'USD',
  });

  // Load current user and check role
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser({
          email: user.signInDetails?.loginId || user.username,
          userId: user.userId,
          role: 'Lead', // Default role; in production, fetch from user attributes
        });
      } catch {
        setCurrentUser({ email: 'guest', userId: 'guest', role: 'Designer' });
      }
    };
    loadUser();
  }, []);

  // Load projects from Amplify
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const result = await client.models.Project.list();
        const projectsList = result.data || [];
        setProjects(projectsList as Project[]);
        
        if (projectsList.length > 0) {
          setSelectedProjectId(projectsList[0].id);
        }
      } catch (err) {
        setError('Failed to load projects');
        addNotification('Error loading projects', 'error');
      } finally {
        setLoading(false);
      }
    };
    
    loadProjects();
  }, []);

  // Load tasks for selected project
  useEffect(() => {
    if (!selectedProjectId) return;

    const loadTasks = async () => {
      try {
        const result = await client.models.Task.list({
          filter: { projectId: { eq: selectedProjectId } },
        });
        
        const tasksList = result.data || [];
        const grouped: Record<string, Task[]> = {
          [TASK_STATUSES.TODO]: [],
          [TASK_STATUSES.IN_PROGRESS]: [],
          [TASK_STATUSES.IN_REVIEW]: [],
          [TASK_STATUSES.COMPLETED]: [],
        };

        tasksList.forEach(task => {
          const status = task.status as keyof typeof grouped;
          grouped[status]?.push(task as unknown as Task);
        });

        setTasks(prev => ({
          ...prev,
          [selectedProjectId]: grouped,
        }));
      } catch (err) {
        addNotification('Error loading tasks', 'error');
      }
    };

    loadTasks();
  }, [selectedProjectId]);

  const addNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const handleDragStart = (task: Task, status: string) => {
    if (currentUser?.role === 'Lead') {
      setDraggedTask({ task, fromStatus: status });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (toStatus: typeof TASK_STATUSES[keyof typeof TASK_STATUSES]) => {
    if (!draggedTask || currentUser?.role !== 'Lead') return;
    const { task, fromStatus } = draggedTask;

    if (fromStatus === toStatus) {
      setDraggedTask(null);
      return;
    }

    try {
      // Update in Amplify
      await client.models.Task.update({
        id: task.id,
        status: toStatus as any,
      });

      // Update local state
      setTasks(prev => ({
        ...prev,
        [selectedProjectId]: {
          ...prev[selectedProjectId],
          [fromStatus]: prev[selectedProjectId][fromStatus].filter(t => t.id !== task.id),
          [toStatus]: [...prev[selectedProjectId][toStatus], { ...task, status: toStatus }],
        },
      }));

      addNotification(`Task moved to ${toStatus}`, 'success');
    } catch {
      addNotification('Failed to update task', 'error');
    }

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

  const handleBulkDelete = async () => {
    if (selectedTasks.size === 0 || (typeof window !== 'undefined' && !window.confirm(`Delete ${selectedTasks.size} task(s)?`))) return;
    
    if (currentUser?.role !== 'Lead') {
      addNotification('Only Leads can delete tasks', 'error');
      return;
    }

    try {
      for (const taskId of selectedTasks) {
        await client.models.Task.delete({ id: taskId });
      }

      setTasks(prev => ({
        ...prev,
        [selectedProjectId]: Object.fromEntries(
          Object.entries(prev[selectedProjectId] || {}).map(([status, statusTasks]) => [
            status,
            (statusTasks as Task[]).filter(t => !selectedTasks.has(t.id)),
          ])
        ),
      }));

      setSelectedTasks(new Set());
      addNotification(`${selectedTasks.size} task(s) deleted`, 'success');
    } catch {
      addNotification('Failed to delete tasks', 'error');
    }
  };

  const handleAddComment = async () => {
    if (!selectedTaskId || !newComment.trim() || !currentUser) return;

    try {
      const commentId = Date.now().toString();
      const newCommentObj: Comment = {
        id: commentId,
        author: currentUser.email,
        text: newComment,
        timestamp: new Date().toISOString(),
      };

      // In production, save to Amplify Comment model
      setTasks(prev => ({
        ...prev,
        [selectedProjectId]: Object.fromEntries(
          Object.entries(prev[selectedProjectId] || {}).map(([status, statusTasks]) => [
            status,
            (statusTasks as Task[]).map(t => {
              if (t.id === selectedTaskId) {
                return {
                  ...t,
                  comments: [...(t.comments || []), newCommentObj],
                };
              }
              return t;
            }),
          ])
        ),
      }));

      setNewComment('');
      addNotification('Comment added', 'success');
    } catch {
      addNotification('Failed to add comment', 'error');
    }
  };

  const handleAddTask = async () => {
    if (!newTaskData.title || !newTaskData.dueDate || !selectedProjectId) {
      addNotification('Please fill in all required fields', 'error');
      return;
    }

    try {
      const task = await client.models.Task.create({
        title: newTaskData.title,
        description: newTaskData.description || undefined,
        assignee: newTaskData.assignee,
        priority: newTaskData.priority,
        status: 'ToDo' as any,
        dueDate: newTaskData.dueDate,
        estimatedHours: newTaskData.estimatedHours,
        hourlyRate: newTaskData.hourlyRate,
        projectId: selectedProjectId,
      });

      const newTask: Task = {
        id: task.data?.id || '',
        title: task.data?.title || '',
        description: task.data?.description || '',
        assignee: task.data?.assignee || '',
        priority: (task.data?.priority as 'Low' | 'Medium' | 'High') || 'Medium',
        status: TASK_STATUSES.TODO,
        dueDate: task.data?.dueDate || '',
        comments: [],
        attachments: [],
      };

      setTasks(prev => ({
        ...prev,
        [selectedProjectId]: {
          ...prev[selectedProjectId],
          [TASK_STATUSES.TODO]: [...(prev[selectedProjectId][TASK_STATUSES.TODO] || []), newTask],
        },
      }));

      setShowAddTaskModal(false);
      setNewTaskData({
        title: '',
        description: '',
        assignee: '',
        priority: 'Medium',
        dueDate: '',
      });
      addNotification('Task created successfully', 'success');
    } catch {
      addNotification('Failed to create task', 'error');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, taskId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In production, upload to S3 via Amplify Storage
    const attachment: Attachment = {
      id: Date.now().toString(),
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
      fileSize: file.size,
      uploadedBy: currentUser?.email || 'unknown',
      createdAt: new Date().toISOString(),
    };

    setTasks(prev => ({
      ...prev,
      [selectedProjectId]: Object.fromEntries(
        Object.entries(prev[selectedProjectId] || {}).map(([status, statusTasks]) => [
          status,
          (statusTasks as Task[]).map(t => {
            if (t.id === taskId) {
              return {
                ...t,
                attachments: [...(t.attachments || []), attachment],
              };
            }
            return t;
          }),
        ])
      ),
    }));

    addNotification('File attached successfully', 'success');
  };

  const calculateTaskCost = (task: Task): number => {
    return (task.timeLogged || 0) * (task.hourlyRate || projects.find(p => p.id === selectedProjectId)?.hourlyRate || 0);
  };

  const calculateProjectCostSpent = (): number => {
    return (Object.values(tasks[selectedProjectId] || {}) as Task[][])
      .flat()
      .reduce((sum, task) => sum + calculateTaskCost(task), 0);
  };

  const calculateProjectCostEstimated = (): number => {
    return (Object.values(tasks[selectedProjectId] || {}) as Task[][])
      .flat()
      .reduce((sum, task) => sum + ((task.estimatedHours || 0) * (task.hourlyRate || projects.find(p => p.id === selectedProjectId)?.hourlyRate || 0)), 0);
  };

  const getBudgetStatus = (): { status: 'safe' | 'warning' | 'danger', percentage: number } => {
    const project = projects.find(p => p.id === selectedProjectId);
    const spent = calculateProjectCostSpent();
    const budget = project?.budget || 0;
    
    if (budget === 0) return { status: 'safe', percentage: 0 };
    
    const percentage = (spent / budget) * 100;
    if (percentage >= 90) return { status: 'danger', percentage };
    if (percentage >= 70) return { status: 'warning', percentage };
    return { status: 'safe', percentage };
  };

  const formatStatus = (status: Task['status']) =>
    status.replace(/([A-Z])/g, ' $1').trim();

  const isOverdue = (dueDate: string) => new Date(dueDate + 'T00:00:00') < new Date();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

 const getStatusColor = (status: Task['status']) => {
  switch (status) {
    case 'Completed': return 'text-green-600';
    case 'InProgress': return 'text-blue-600';
    case 'InReview': return 'text-yellow-600';
    case 'ToDo': return 'text-gray-500';
  }
};


  const filteredTasks = (status: string): Task[] => {
    const statusTasks = (tasks[selectedProjectId]?.[status] as Task[]) || [];
    return statusTasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    });
  };

  // Calendar view component
  const CalendarView = () => {
    const allTasks = (Object.values(tasks[selectedProjectId] || {}) as Task[][]).flat();
    const tasksByDate: Record<string, Task[]> = {};
    
    allTasks.forEach(task => {
      const dateStr = new Date(task.dueDate).toLocaleDateString();
      if (!tasksByDate[dateStr]) tasksByDate[dateStr] = [];
      tasksByDate[dateStr].push(task);
    });

    return (
      <div className="bg-white border border-gray-200 p-6">
        <h2 className="font-display text-2xl font-medium mb-6">Calendar View</h2>
        <div className="space-y-4">
          {Object.entries(tasksByDate).map(([date, dateTasks]) => (
            <div key={date} className="pb-4 border-b border-gray-100 last:border-b-0">
              <h3 className="font-medium text-gray-700 mb-3">{date}</h3>
              <div className="space-y-2">
                {dateTasks.map(task => (
                  <div 
                    key={task.id} 
                    onClick={() => setSelectedTaskId(task.id)}
                    className="flex items-center gap-4 p-3 bg-gray-50 border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <span className={`text-xs font-medium uppercase px-2 py-1 border ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{task.title}</p>
                      <p className="text-xs text-gray-500">{task.assignee}</p>
                    </div>
                    <span className={`text-xs font-medium ${getStatusColor(task.status)}`}>{task.status}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const projectTasks = tasks[selectedProjectId] || { 
    ToDo: [],
    InProgress: [],
    InReview: [],
    Completed: [],
  };
  const selectedTask = (Object.values(projectTasks) as Task[][])
    .flat()
    .find(t => t.id === selectedTaskId) as Task | undefined;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading projects...</p>
      </div>
    );
  }

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
          <p className="text-gray-500 font-light">Role: <span className="font-medium">{currentUser?.role}</span> | {Object.values(projectTasks).flat().length} tasks | Budget: <span className="font-medium">{projects.find(p => p.id === selectedProjectId)?.currencyCode || 'USD'} {calculateProjectCostSpent().toFixed(2)} / {projects.find(p => p.id === selectedProjectId)?.budget?.toFixed(2) || '0.00'}</span></p>
        </div>

        {/* Project Selector & Budget */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white border border-gray-200 p-6">
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

          {/* Budget Panel */}
          <div className="bg-white border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display font-medium text-lg">Budget</h3>
              <button
                onClick={() => setShowBudgetPanel(!showBudgetPanel)}
                className="text-xs text-gray-500 hover:text-gray-700 font-medium"
              >
                {showBudgetPanel ? 'Hide' : 'Edit'}
              </button>
            </div>
            
            {selectedProject && (
              <>
                <div className="mb-4">
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-gray-600">Spent</span>
                    <span className="font-medium">{selectedProject.currencyCode || 'USD'} {calculateProjectCostSpent().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-3 text-sm">
                    <span className="text-gray-600">Budget</span>
                    <span className="font-medium">{selectedProject.currencyCode || 'USD'} {selectedProject.budget?.toFixed(2) || '0.00'}</span>
                  </div>
                  
                  {/* Progress Bar */}
                  {selectedProject.budget && selectedProject.budget > 0 && (
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          getBudgetStatus().status === 'danger' ? 'bg-red-500' :
                          getBudgetStatus().status === 'warning' ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(getBudgetStatus().percentage, 100)}%` }}
                      />
                    </div>
                  )}
                  <div className="text-xs text-gray-500 mt-2">
                    {getBudgetStatus().percentage.toFixed(1)}% of budget used
                  </div>
                </div>

                {showBudgetPanel && (
                  <div className="pt-4 border-t border-gray-100 space-y-3">
                    <input
                      type="number"
                      value={projectBudgetData.budget}
                      onChange={(e) => setProjectBudgetData({ ...projectBudgetData, budget: parseFloat(e.target.value) || 0 })}
                      placeholder="Total budget"
                      className="w-full px-2 py-1 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                    />
                    <input
                      type="number"
                      value={projectBudgetData.hourlyRate}
                      onChange={(e) => setProjectBudgetData({ ...projectBudgetData, hourlyRate: parseFloat(e.target.value) || 0 })}
                      placeholder="Hourly rate"
                      className="w-full px-2 py-1 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                    />
                    <select
                      value={projectBudgetData.currencyCode}
                      onChange={(e) => setProjectBudgetData({ ...projectBudgetData, currencyCode: e.target.value })}
                      className="w-full px-2 py-1 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="CAD">CAD</option>
                      <option value="AUD">AUD</option>
                    </select>
                    <button
                      onClick={() => {
                        addNotification('Budget updated', 'success');
                        setShowBudgetPanel(false);
                      }}
                      className="w-full px-3 py-1 bg-studio-dark text-white text-sm hover:bg-gray-800 transition-colors"
                    >
                      Save
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Search & Filter & View Toggle */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search tasks..."
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
          <button
            onClick={() => setShowCalendarView(!showCalendarView)}
            className={`px-4 py-2 border text-sm transition-colors ${
              showCalendarView 
                ? 'bg-studio-dark text-white border-studio-dark' 
                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {showCalendarView ? 'Kanban' : 'Calendar'}
          </button>
          {selectedTasks.size > 0 && (
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 text-sm hover:bg-red-100 transition-colors"
            >
              Delete {selectedTasks.size}
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 lg:px-20 pb-12">
        {showCalendarView ? (
          <CalendarView />
        ) : (
          <>
            {selectedProject ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-6">
                {Object.values(TASK_STATUSES).map((status) => (
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
                      onClick={() => setShowAddTaskModal(true)}
                      className="w-full mb-4 px-3 py-2 text-xs text-gray-600 border border-dashed border-gray-300 hover:border-gray-400 transition-colors"
                    >
                      + Add Task
                    </button>

                    <div className="space-y-3">
                      {filteredTasks(status).length === 0 ? (
                        <div className="text-center py-8 text-gray-400 text-xs">No tasks yet</div>
                      ) : (
                        filteredTasks(status).map((task) => (
                          <div
                            key={task.id}
                            draggable={currentUser?.role === 'Lead'}
                            onDragStart={() => handleDragStart(task, status)}
                            onClick={() => setSelectedTaskId(task.id)}
                            className={`bg-white p-3 border shadow-sm hover:shadow-md transition-shadow ${
                              currentUser?.role === 'Lead' ? 'cursor-move' : 'cursor-default'
                            } ${
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
                            <div className="space-y-1 text-xs">
                              <div className="text-gray-500">{task.assignee}</div>
                              <div className="flex gap-2">
                                <span className={`font-medium uppercase px-2 py-0.5 border ${getPriorityColor(task.priority)}`}>
                                  {task.priority}
                                </span>
                              </div>
                              {task.attachments && task.attachments.length > 0 && (
                                <div className="text-gray-400">📎 {task.attachments.length} file(s)</div>
                              )}
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
                <p className="text-gray-400">No projects found</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Task Details Modal */}
      {selectedTaskId && selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4">
          <div className="bg-white border border-gray-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="font-display text-2xl font-medium mb-2">{selectedTask.title}</h2>
                  <span className={`inline-block text-xs font-medium uppercase px-2 py-1 border ${getPriorityColor(selectedTask.priority)}`}>
                    {selectedTask.priority} Priority
                  </span>
                </div>
                <button onClick={() => setSelectedTaskId(null)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
              </div>

              {selectedTask.description && (
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <h3 className="font-medium text-sm mb-2">Description</h3>
                  <p className="text-gray-600 text-sm">{selectedTask.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-gray-100">
                <div>
                  <span className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Assignee</span>
                  <p className="text-sm font-medium">{selectedTask.assignee}</p>
                </div>
                <div>
                  <span className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Due Date</span>
                  <p className={`text-sm font-medium ${isOverdue(selectedTask.dueDate) ? 'text-red-600' : 'text-gray-700'}`}>
                    {new Date(selectedTask.dueDate).toLocaleDateString()}
                  </p>
                </div>
                {selectedTask.timeLogged && (
                  <div>
                    <span className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Time Logged</span>
                    <p className="text-sm font-medium">{selectedTask.timeLogged}h</p>
                  </div>
                )}
                {selectedTask.estimatedHours && (
                  <div>
                    <span className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Estimated Hours</span>
                    <p className="text-sm font-medium">{selectedTask.estimatedHours}h</p>
                  </div>
                )}
                {selectedTask.phase && (
                  <div>
                    <span className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Phase</span>
                    <p className="text-sm font-medium">{selectedTask.phase}</p>
                  </div>
                )}
                {selectedTask.hourlyRate && (
                  <div>
                    <span className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Hourly Rate</span>
                    <p className="text-sm font-medium">{projects.find(p => p.id === selectedProjectId)?.currencyCode || 'USD'} {selectedTask.hourlyRate.toFixed(2)}</p>
                  </div>
                )}
              </div>

              {/* Cost Summary */}
              <div className="mb-6 pb-6 border-b border-gray-100 bg-gray-50 p-4">
                <h3 className="font-medium text-sm mb-3">Cost Summary</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Cost Spent</span>
                    <p className="font-medium text-lg">{projects.find(p => p.id === selectedProjectId)?.currencyCode || 'USD'} {calculateTaskCost(selectedTask).toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Cost Estimated</span>
                    <p className="font-medium text-lg">{projects.find(p => p.id === selectedProjectId)?.currencyCode || 'USD'} {((selectedTask.estimatedHours || 0) * (selectedTask.hourlyRate || projects.find(p => p.id === selectedProjectId)?.hourlyRate || 0)).toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Variance</span>
                    <p className="font-medium text-lg">{projects.find(p => p.id === selectedProjectId)?.currencyCode || 'USD'} {(((selectedTask.estimatedHours || 0) * (selectedTask.hourlyRate || projects.find(p => p.id === selectedProjectId)?.hourlyRate || 0)) - calculateTaskCost(selectedTask)).toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* File Attachments */}
              {selectedTask.attachments && selectedTask.attachments.length > 0 && (
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <h3 className="font-medium text-sm mb-3">Attachments</h3>
                  <div className="space-y-2">
                    {selectedTask.attachments.map(file => (
                      <a
                        key={file.id}
                        href={file.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors text-sm text-blue-600"
                      >
                        📎 {file.fileName} ({(file.fileSize / 1024).toFixed(2)}KB)
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* File Upload */}
              <div className="mb-6 pb-6 border-b border-gray-100">
                <label className="block text-sm font-medium mb-2">Add Attachment</label>
                <input
                  type="file"
                  onChange={(e) => handleFileUpload(e, selectedTaskId)}
                  className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                />
              </div>

              {/* Comments */}
              <div>
                <h3 className="font-medium text-sm mb-4">Comments ({selectedTask.comments?.length || 0})</h3>
                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                  {selectedTask.comments?.map(comment => (
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

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4">
          <div className="bg-white border border-gray-200 w-full max-w-md">
            <div className="p-8">
              <h2 className="font-display text-2xl font-medium mb-6">Add New Task</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Title</label>
                  <input
                    type="text"
                    value={newTaskData.title}
                    onChange={(e) => setNewTaskData({ ...newTaskData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                    placeholder="Task title"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Description</label>
                  <textarea
                    value={newTaskData.description}
                    onChange={(e) => setNewTaskData({ ...newTaskData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                    placeholder="Task description"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Assignee</label>
                  <input
                    type="text"
                    value={newTaskData.assignee}
                    onChange={(e) => setNewTaskData({ ...newTaskData, assignee: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                    placeholder="Team member name"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Priority</label>
                  <select
                    value={newTaskData.priority}
                    onChange={(e) => setNewTaskData({ ...newTaskData, priority: e.target.value as 'Low' | 'Medium' | 'High' })}
                    className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Due Date</label>
                  <input
                    type="date"
                    value={newTaskData.dueDate}
                    onChange={(e) => setNewTaskData({ ...newTaskData, dueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Estimated Hours</label>
                    <input
                      type="number"
                      value={newTaskData.estimatedHours}
                      onChange={(e) => setNewTaskData({ ...newTaskData, estimatedHours: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                      placeholder="Hours"
                      step="0.5"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Hourly Rate</label>
                    <input
                      type="number"
                      value={newTaskData.hourlyRate}
                      onChange={(e) => setNewTaskData({ ...newTaskData, hourlyRate: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                      placeholder="Rate"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleAddTask}
                    className="flex-1 px-4 py-2 bg-studio-dark text-white text-sm hover:bg-gray-800 transition-colors"
                  >
                    Create Task
                  </button>
                  <button
                    onClick={() => setShowAddTaskModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 text-sm hover:bg-gray-50 transition-colors"
                  >
                    Cancel
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

export default ProjectsAmplified;
