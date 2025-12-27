import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Work from './pages/Work';
import Services from './pages/Services';
import Process from './pages/Process';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import TeamManagement from './pages/TeamManagement';
import Projects from './pages/Projects';
import AdminMessages from './pages/AdminMessages';
import Activities from './pages/Activities';
import Backlog from './pages/Backlog';
import MyTasks from './pages/MyTasks';
import Reports from './pages/Reports';
import Roadmap from './pages/Roadmap';
import ClientPortal from './pages/ClientPortal';
import PDFExport from './pages/PDFExport';
import NotFound from './pages/NotFound';
import AdminLayout from './components/admin/AdminLayout';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="work" element={<Work />} />
            <Route path="services" element={<Services />} />
            <Route path="process" element={<Process />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="client-portal" element={<ClientPortal />} />
            <Route path="export-reports" element={<PDFExport />} />
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="team" element={<TeamManagement />} />
              <Route path="projects" element={<Projects />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="activities" element={<Activities />} />
              <Route path="backlog" element={<Backlog />} />
              <Route path="my-tasks" element={<MyTasks />} />
              <Route path="reports" element={<Reports />} />
              <Route path="roadmap" element={<Roadmap />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
