import React, { useState } from 'react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Designer' | 'Developer' | 'Project Manager' | 'Lead';
  assignedProjects: string[];
  assignedTasks: string[];
  joinDate: string;
}

const TeamManagement: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex@studio.com',
      role: 'Designer',
      assignedProjects: ['Website Redesign', 'Design System'],
      assignedTasks: ['Design homepage layouts', 'Create component library'],
      joinDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Sarah Chen',
      email: 'sarah@studio.com',
      role: 'Developer',
      assignedProjects: ['Website Redesign'],
      assignedTasks: ['Implement navigation component', 'Setup build pipeline'],
      joinDate: '2024-02-01'
    },
    {
      id: '3',
      name: 'John Smith',
      email: 'john@studio.com',
      role: 'Developer',
      assignedProjects: ['Mobile App Development'],
      assignedTasks: ['Define app architecture'],
      joinDate: '2024-01-20'
    },
    {
      id: '4',
      name: 'Emma Davis',
      email: 'emma@studio.com',
      role: 'Project Manager',
      assignedProjects: ['Design System'],
      assignedTasks: [],
      joinDate: '2023-12-10'
    },
    {
      id: '5',
      name: 'Mike Wilson',
      email: 'mike@studio.com',
      role: 'Developer',
      assignedProjects: ['Mobile App Development'],
      assignedTasks: ['API integration', 'Database design'],
      joinDate: '2024-03-01'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Developer' as const
  });

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      const newMember: TeamMember = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        assignedProjects: [],
        assignedTasks: [],
        joinDate: new Date().toISOString().split('T')[0]
      };
      setMembers([...members, newMember]);
      setFormData({ name: '', email: '', role: 'Developer' });
      setShowAddForm(false);
    }
  };

  const handleRemoveMember = (id: string) => {
    if (confirm('Are you sure you want to remove this member?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Lead':
        return 'text-studio-blue';
      case 'Project Manager':
        return 'text-gray-700';
      case 'Designer':
        return 'text-purple-600';
      case 'Developer':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12 flex justify-between items-start">
        <div>
          <h1 className="font-display text-4xl font-medium mb-2">Team Members</h1>
          <p className="text-gray-500 font-light">Manage your team, assign roles, tasks, and projects</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-6 py-2 border border-gray-200 text-sm hover:bg-gray-50 transition-colors"
        >
          {showAddForm ? 'Cancel' : 'Add Member'}
        </button>
      </div>

      {/* Add Member Form */}
      {showAddForm && (
        <div className="bg-white p-8 border border-gray-100 mb-8 shadow-sm">
          <h3 className="font-display text-lg mb-6">Add New Team Member</h3>
          <form onSubmit={handleAddMember} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-2 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="px-4 py-2 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                required
              />
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                className="px-4 py-2 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
              >
                <option value="Designer">Designer</option>
                <option value="Developer">Developer</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Lead">Lead</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="submit"
                className="px-6 py-2 bg-studio-dark text-white text-sm hover:bg-gray-800 transition-colors"
              >
                Add Member
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Members Grid */}
      <div className="grid gap-6">
        {members.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-100">
            <p className="text-gray-400">No team members yet. Add one to get started.</p>
          </div>
        ) : (
          members.map((member) => (
            <div key={member.id} className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{member.email}</p>
                  <span className={`inline-block text-xs font-medium uppercase tracking-widest ${getRoleColor(member.role)}`}>
                    {member.role}
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveMember(member.id)}
                  className="text-red-500 hover:text-red-700 transition-colors text-xs uppercase tracking-widest font-mono"
                >
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-100">
                {/* Assigned Projects */}
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-widest block mb-3">Assigned Projects</span>
                  {member.assignedProjects.length > 0 ? (
                    <div className="space-y-2">
                      {member.assignedProjects.map((project, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">{project}</span>
                          <button className="text-xs text-red-500 hover:text-red-700">✕</button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">No projects assigned</p>
                  )}
                  <button className="mt-3 text-xs text-studio-blue hover:underline font-medium">+ Add Project</button>
                </div>

                {/* Assigned Tasks */}
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-widest block mb-3">Assigned Tasks</span>
                  {member.assignedTasks.length > 0 ? (
                    <div className="space-y-2">
                      {member.assignedTasks.map((task, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">{task}</span>
                          <button className="text-xs text-red-500 hover:text-red-700">✕</button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">No tasks assigned</p>
                  )}
                  <button className="mt-3 text-xs text-studio-blue hover:underline font-medium">+ Add Task</button>
                </div>
              </div>

              {/* Meta */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <span className="text-xs text-gray-400">Joined {new Date(member.joinDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TeamManagement;
