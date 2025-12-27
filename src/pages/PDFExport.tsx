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
  timeLogged?: number;
  estimatedHours?: number;
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  budget?: number;
  hourlyRate?: number;
  currencyCode?: string;
}

const PDFExport: React.FC = () => {
  const client = generateClient<Schema>();
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [exportFormat, setExportFormat] = useState<'summary' | 'detailed' | 'budget'>('summary');
  const [isExporting, setIsExporting] = useState(false);

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

  const generatePDFContent = (): string => {
    const project = projects.find(p => p.id === selectedProjectId);
    if (!project) return '';

    const statusCounts = {
      'To Do': tasks.filter(t => t.status === 'To Do').length,
      'In Progress': tasks.filter(t => t.status === 'In Progress').length,
      'In Review': tasks.filter(t => t.status === 'In Review').length,
      'Completed': tasks.filter(t => t.status === 'Completed').length,
    };

    const completedPercent = tasks.length > 0 ? Math.round((statusCounts.Completed / tasks.length) * 100) : 0;
    const totalEstimatedHours = tasks.reduce((sum, t) => sum + (t.estimatedHours || 0), 0);
    const totalTimeLogged = tasks.reduce((sum, t) => sum + (t.timeLogged || 0), 0);
    const totalCost = tasks.reduce((sum, t) => sum + ((t.timeLogged || 0) * (project.hourlyRate || 0)), 0);

    let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${project.name} Report</title>
      <style>
        body { font-family: Arial, sans-serif; color: #333; margin: 40px; }
        h1 { color: #1f2937; border-bottom: 3px solid #3b82f6; padding-bottom: 10px; }
        h2 { color: #374151; margin-top: 30px; }
        .header { margin-bottom: 30px; }
        .summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 20px 0; }
        .stat-box { background: #f3f4f6; padding: 15px; border: 1px solid #e5e7eb; }
        .stat-number { font-size: 24px; font-weight: bold; color: #1f2937; }
        .stat-label { font-size: 12px; color: #6b7280; text-transform: uppercase; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: #f3f4f6; font-weight: bold; color: #1f2937; }
        tr:hover { background: #fafafa; }
        .priority-high { color: #dc2626; font-weight: bold; }
        .priority-medium { color: #ea580c; font-weight: bold; }
        .priority-low { color: #16a34a; font-weight: bold; }
        .status-completed { color: #16a34a; }
        .status-in-progress { color: #2563eb; }
        .status-in-review { color: #ea580c; }
        .status-to-do { color: #6b7280; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
        .progress-bar { width: 100%; height: 10px; background: #e5e7eb; border-radius: 5px; overflow: hidden; }
        .progress-fill { height: 100%; background: linear-gradient(to right, #3b82f6, #60a5fa); width: ${completedPercent}%; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${project.name}</h1>
        <p>${project.description}</p>
        <p>Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
      </div>

      <h2>Project Summary</h2>
      <div class="summary">
        <div class="stat-box">
          <div class="stat-number">${tasks.length}</div>
          <div class="stat-label">Total Tasks</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">${completedPercent}%</div>
          <div class="stat-label">Completion</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">${statusCounts.Completed}</div>
          <div class="stat-label">Completed</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">${statusCounts['In Progress']}</div>
          <div class="stat-label">In Progress</div>
        </div>
      </div>

      <div class="progress-bar">
        <div class="progress-fill"></div>
      </div>

      <h2>Status Breakdown</h2>
      <table>
        <tr>
          <th>Status</th>
          <th>Count</th>
          <th>Percentage</th>
        </tr>
        <tr>
          <td class="status-to-do">To Do</td>
          <td>${statusCounts['To Do']}</td>
          <td>${tasks.length > 0 ? ((statusCounts['To Do'] / tasks.length) * 100).toFixed(1) : 0}%</td>
        </tr>
        <tr>
          <td class="status-in-progress">In Progress</td>
          <td>${statusCounts['In Progress']}</td>
          <td>${tasks.length > 0 ? ((statusCounts['In Progress'] / tasks.length) * 100).toFixed(1) : 0}%</td>
        </tr>
        <tr>
          <td class="status-in-review">In Review</td>
          <td>${statusCounts['In Review']}</td>
          <td>${tasks.length > 0 ? ((statusCounts['In Review'] / tasks.length) * 100).toFixed(1) : 0}%</td>
        </tr>
        <tr>
          <td class="status-completed">Completed</td>
          <td>${statusCounts.Completed}</td>
          <td>${tasks.length > 0 ? ((statusCounts.Completed / tasks.length) * 100).toFixed(1) : 0}%</td>
        </tr>
      </table>
    `;

    if (exportFormat === 'detailed' || exportFormat === 'budget') {
      html += `
      <h2>Task Details</h2>
      <table>
        <tr>
          <th>Title</th>
          <th>Assignee</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Due Date</th>
          ${exportFormat === 'budget' ? '<th>Est. Hours</th><th>Time Logged</th><th>Cost</th>' : ''}
        </tr>
      `;

      tasks.forEach(task => {
        html += `
        <tr>
          <td>${task.title}</td>
          <td>${task.assignee}</td>
          <td class="priority-${task.priority.toLowerCase()}">${task.priority}</td>
          <td class="status-${task.status.toLowerCase().replace(' ', '-')}">${task.status}</td>
          <td>${new Date(task.dueDate).toLocaleDateString()}</td>
          ${exportFormat === 'budget' ? `
            <td>${task.estimatedHours || 0}h</td>
            <td>${task.timeLogged || 0}h</td>
            <td>${project.currencyCode || 'USD'} ${((task.timeLogged || 0) * (project.hourlyRate || 0)).toFixed(2)}</td>
          ` : ''}
        </tr>
        `;
      });

      html += '</table>';
    }

    if (exportFormat === 'budget') {
      html += `
      <h2>Budget Summary</h2>
      <table>
        <tr>
          <th>Metric</th>
          <th>Value</th>
        </tr>
        <tr>
          <td>Total Estimated Hours</td>
          <td>${totalEstimatedHours}h</td>
        </tr>
        <tr>
          <td>Total Time Logged</td>
          <td>${totalTimeLogged}h</td>
        </tr>
        <tr>
          <td>Hourly Rate</td>
          <td>${project.currencyCode || 'USD'} ${project.hourlyRate || 0}</td>
        </tr>
        <tr>
          <td>Total Cost (Logged)</td>
          <td>${project.currencyCode || 'USD'} ${totalCost.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Project Budget</td>
          <td>${project.currencyCode || 'USD'} ${project.budget || 0}</td>
        </tr>
        <tr>
          <td>Remaining Budget</td>
          <td>${project.currencyCode || 'USD'} ${((project.budget || 0) - totalCost).toFixed(2)}</td>
        </tr>
      </table>
      `;
    }

    html += `
      <div class="footer">
        <p>This is an automated report generated from the project management system.</p>
      </div>
    </body>
    </html>
    `;

    return html;
  };

  const handleExportPDF = () => {
    setIsExporting(true);
    
    try {
      const htmlContent = generatePDFContent();
      const element = document.createElement('iframe');
      (element as any).srcdoc = htmlContent;
      element.style.display = 'none';
      document.body.appendChild(element);

      setTimeout(() => {
        element.contentWindow?.print();
        document.body.removeChild(element);
        setIsExporting(false);
      }, 500);
    } catch (err) {
      console.error('Error exporting PDF:', err);
      setIsExporting(false);
    }
  };

  const selectedProject = projects.find(p => p.id === selectedProjectId);

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
        <div className="max-w-5xl mx-auto px-6 py-8">
          <h1 className="font-display text-4xl font-medium mb-2">Export Reports</h1>
          <p className="text-gray-500 font-light">Generate and export project reports as PDF</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white border border-gray-200 p-8">
          {/* Project Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Project</label>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
            >
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          {selectedProject && (
            <>
              {/* Project Info */}
              <div className="mb-8 p-6 bg-gray-50 border border-gray-100">
                <h2 className="font-display text-lg font-medium mb-2">{selectedProject.name}</h2>
                <p className="text-gray-600 text-sm mb-4">{selectedProject.description}</p>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Tasks</span>
                    <p className="font-medium">{tasks.length}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Completed</span>
                    <p className="font-medium">{tasks.filter(t => t.status === 'Completed').length}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">In Progress</span>
                    <p className="font-medium">{tasks.filter(t => t.status === 'In Progress').length}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Budget</span>
                    <p className="font-medium">{selectedProject.currencyCode || 'USD'} {selectedProject.budget || 0}</p>
                  </div>
                </div>
              </div>

              {/* Export Format Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">Report Format</label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'summary', label: 'Summary Report', desc: 'Project overview and status' },
                    { value: 'detailed', label: 'Detailed Report', desc: 'All tasks with details' },
                    { value: 'budget', label: 'Budget Report', desc: 'Tasks with costs and hours' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setExportFormat(option.value as any)}
                      className={`p-4 border text-left transition-all ${
                        exportFormat === option.value
                          ? 'border-studio-blue bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <p className="font-medium text-gray-900">{option.label}</p>
                      <p className="text-xs text-gray-500 mt-1">{option.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="mb-8 p-6 bg-gray-50 border border-gray-100">
                <h3 className="font-medium text-gray-900 mb-3">Preview</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  {exportFormat === 'summary' && (
                    <ul className="list-disc list-inside">
                      <li>Project name and description</li>
                      <li>Task count and completion percentage</li>
                      <li>Status breakdown (To Do, In Progress, In Review, Completed)</li>
                    </ul>
                  )}
                  {exportFormat === 'detailed' && (
                    <ul className="list-disc list-inside">
                      <li>All summary information</li>
                      <li>Complete task list with assignees, priority, and status</li>
                      <li>Due dates for each task</li>
                    </ul>
                  )}
                  {exportFormat === 'budget' && (
                    <ul className="list-disc list-inside">
                      <li>All detailed information</li>
                      <li>Estimated hours and time logged per task</li>
                      <li>Cost calculations and budget summary</li>
                      <li>Remaining budget analysis</li>
                    </ul>
                  )}
                </div>
              </div>

              {/* Export Button */}
              <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="w-full px-6 py-3 bg-studio-dark text-white font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {isExporting ? 'Exporting...' : 'Export as PDF'}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                PDF will open in your browser's print dialog. You can save as PDF or print directly.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFExport;
