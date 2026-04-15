import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProjectDashboard from './pages/ProjectDashboard';
import ExploreProjects from './pages/ExploreProjects';
import ProjectDetail from './pages/ProjectDetail';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/project" element={<ProjectDashboard />} />
      <Route path="/project/explore" element={<ExploreProjects />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
      <Route path="*" element={<Navigate to="/project" replace />} />
    </Routes>
  );
};

export default App;
