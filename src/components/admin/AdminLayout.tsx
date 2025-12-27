import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import { Menu, X } from '../Icons';

const AdminLayout: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const Sidebar = (
    <Authenticator>
      {({ signOut }) => (
        <aside className="hidden lg:flex lg:flex-col fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 p-6">
          <div className="mb-8">
            <h2 className="font-display text-xl">Admin</h2>
            <p className="text-sm text-gray-500">Manage projects & messages</p>
          </div>
          <nav className="flex flex-col gap-2">
            <NavLink to="/admin/dashboard" className={({isActive})=> `px-3 py-2 text-sm ${isActive ? 'text-studio-blue font-medium' : 'text-gray-700 hover:text-studio-blue hover:bg-gray-50'}`}>
              Dashboard
            </NavLink>
            <NavLink to="/admin/projects" className={({isActive})=> `px-3 py-2 text-sm ${isActive ? 'text-studio-blue font-medium' : 'text-gray-700 hover:text-studio-blue hover:bg-gray-50'}`}>
              Projects
            </NavLink>
            <NavLink to="/admin/team" className={({isActive})=> `px-3 py-2 text-sm ${isActive ? 'text-studio-blue font-medium' : 'text-gray-700 hover:text-studio-blue hover:bg-gray-50'}`}>
              Team
            </NavLink>
            <NavLink to="/admin/my-tasks" className={({isActive})=> `px-3 py-2 text-sm ${isActive ? 'text-studio-blue font-medium' : 'text-gray-700 hover:text-studio-blue hover:bg-gray-50'}`}>
              My Tasks
            </NavLink>
            <NavLink to="/admin/activities" className={({isActive})=> `px-3 py-2 text-sm ${isActive ? 'text-studio-blue font-medium' : 'text-gray-700 hover:text-studio-blue hover:bg-gray-50'}`}>
              Activities
            </NavLink>
            <NavLink to="/admin/backlog" className={({isActive})=> `px-3 py-2 text-sm ${isActive ? 'text-studio-blue font-medium' : 'text-gray-700 hover:text-studio-blue hover:bg-gray-50'}`}>
              Backlog
            </NavLink>
            <NavLink to="/admin/roadmap" className={({isActive})=> `px-3 py-2 text-sm ${isActive ? 'text-studio-blue font-medium' : 'text-gray-700 hover:text-studio-blue hover:bg-gray-50'}`}>
              Roadmap
            </NavLink>
            <NavLink to="/admin/reports" className={({isActive})=> `px-3 py-2 text-sm ${isActive ? 'text-studio-blue font-medium' : 'text-gray-700 hover:text-studio-blue hover:bg-gray-50'}`}>
              Reports
            </NavLink>
            <NavLink to="/admin/messages" className={({isActive})=> `px-3 py-2 text-sm ${isActive ? 'text-studio-blue font-medium' : 'text-gray-700 hover:text-studio-blue hover:bg-gray-50'}`}>
              Messages
            </NavLink>
          </nav>
          <div className="mt-auto pt-6 border-t border-gray-200 flex flex-col gap-2">
            <button
              onClick={signOut}
              className="w-full px-3 py-2 text-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-left"
            >
              Sign Out
            </button>
          </div>
        </aside>
      )}
    </Authenticator>
  );

  return (
    <Authenticator>
      {({ signOut }) => (
      <div className="min-h-screen bg-studio-base flex flex-col">
        {/* Mobile top bar with hamburger */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="font-display text-lg">Admin</div>
            <button onClick={() => setIsOpen(v => !v)} aria-label="Toggle admin menu">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile overlay menu */}
        <div className={`lg:hidden fixed inset-0 z-40 bg-white transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 pt-24">
            <nav className="flex flex-col gap-4">
              <NavLink to="/admin/dashboard" onClick={() => setIsOpen(false)} className={({isActive})=> `text-xl ${isActive ? 'text-studio-blue' : 'text-gray-800'}`}>
                Dashboard
              </NavLink>
              <NavLink to="/admin/projects" onClick={() => setIsOpen(false)} className={({isActive})=> `text-xl ${isActive ? 'text-studio-blue' : 'text-gray-800'}`}>
                Projects
              </NavLink>
              <NavLink to="/admin/team" onClick={() => setIsOpen(false)} className={({isActive})=> `text-xl ${isActive ? 'text-studio-blue' : 'text-gray-800'}`}>
                Team
              </NavLink>
              <NavLink to="/admin/my-tasks" onClick={() => setIsOpen(false)} className={({isActive})=> `text-xl ${isActive ? 'text-studio-blue' : 'text-gray-800'}`}>
                My Tasks
              </NavLink>
              <NavLink to="/admin/activities" onClick={() => setIsOpen(false)} className={({isActive})=> `text-xl ${isActive ? 'text-studio-blue' : 'text-gray-800'}`}>
                Activities
              </NavLink>
              <NavLink to="/admin/backlog" onClick={() => setIsOpen(false)} className={({isActive})=> `text-xl ${isActive ? 'text-studio-blue' : 'text-gray-800'}`}>
                Backlog
              </NavLink>
              <NavLink to="/admin/roadmap" onClick={() => setIsOpen(false)} className={({isActive})=> `text-xl ${isActive ? 'text-studio-blue' : 'text-gray-800'}`}>
                Roadmap
              </NavLink>
              <NavLink to="/admin/reports" onClick={() => setIsOpen(false)} className={({isActive})=> `text-xl ${isActive ? 'text-studio-blue' : 'text-gray-800'}`}>
                Reports
              </NavLink>
              <NavLink to="/admin/messages" onClick={() => setIsOpen(false)} className={({isActive})=> `text-xl ${isActive ? 'text-studio-blue' : 'text-gray-800'}`}>
                Messages
              </NavLink>
            </nav>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <button
                onClick={() => {
                  setIsOpen(false);
                  signOut();
                }}
                className="w-full px-3 py-2 text-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-left"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {Sidebar}

        <div className="lg:ml-64 pt-16 lg:pt-12 p-6 flex-1">
          <Outlet />
        </div>
      </div>
      )}
    </Authenticator>
  );
};

export default AdminLayout;
