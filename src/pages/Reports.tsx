import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import type { Schema } from '../../amplify/data/resource';

const TASK_STATUSES = {
  TODO: 'ToDo',
  IN_PROGRESS: 'InProgress',
  IN_REVIEW: 'InReview',
  COMPLETED: 'Completed',
} as const;

const Reports: React.FC = () => {
  const client = generateClient<Schema>();
  const [stats, setStats] = useState({
    activeProjects: 0,
    completedProjects: 0,
    teamMembers: 0,
    todoTasks: 0,
    inProgressTasks: 0,
    completedTasks: 0,
    totalBudget: 0,
    totalSpent: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReportData();
  }, []);

  const loadReportData = async () => {
    try {
      setLoading(true);
      const [projectsResult, tasksResult] = await Promise.all([
        client.models.Project.list(),
        client.models.Task.list()
      ]);
      
      const projects = projectsResult.data || [];
      const tasks = tasksResult.data || [];
      
      // Calculate stats
      const activeProjects = projects.filter((p: any) => p.status !== 'Completed').length;
      const completedProjects = projects.filter((p: any) => p.status === 'Completed').length;
      const teamMembers = new Set(tasks.map((t: any) => t.assignee).filter(Boolean)).size;
      
      const todoTasks = tasks.filter((t: any) => t.status === TASK_STATUSES.TODO).length;
      const inProgressTasks = tasks.filter((t: any) => t.status === TASK_STATUSES.IN_PROGRESS).length;
      const completedTasks = tasks.filter((t: any) => t.status === TASK_STATUSES.COMPLETED).length;
      
      const totalBudget = projects.reduce((sum: number, p: any) => sum + (p.budget || 0), 0);
      const totalSpent = tasks.reduce((sum: number, t: any) => {
        return sum + ((t.timeLogged || 0) * (t.hourlyRate || 0));
      }, 0);
      
      setStats({
        activeProjects,
        completedProjects,
        teamMembers,
        todoTasks,
        inProgressTasks,
        completedTasks,
        totalBudget,
        totalSpent
      });
    } catch (err) {
      console.error('Error loading report data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-gray-500">Loading reports...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="font-display text-4xl font-medium mb-2">Reports</h1>
      <p className="text-gray-500 font-light mb-8">Analytics and insights</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-8 border border-gray-100 shadow-sm">
          <h3 className="font-display text-lg font-medium mb-4">Project Overview</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-700">Active Projects</span>
              <span className="font-medium">{stats.activeProjects}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Completed Projects</span>
              <span className="font-medium">{stats.completedProjects}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Team Members</span>
              <span className="font-medium">{stats.teamMembers}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 border border-gray-100 shadow-sm">
          <h3 className="font-display text-lg font-medium mb-4">Task Status</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-700">To Do</span>
              <span className="font-medium">{stats.todoTasks}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">In Progress</span>
              <span className="font-medium">{stats.inProgressTasks}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Completed</span>
              <span className="font-medium">{stats.completedTasks}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 border border-gray-100 shadow-sm">
          <h3 className="font-display text-lg font-medium mb-4">Budget Overview</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-700">Total Budget</span>
              <span className="font-medium">USD {stats.totalBudget.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Total Spent</span>
              <span className="font-medium">USD {stats.totalSpent.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Remaining</span>
              <span className="font-medium">USD {(stats.totalBudget - stats.totalSpent).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
