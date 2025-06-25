import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ResumeProvider } from './contexts/ResumeContext';
import AuthPage from './components/Auth/AuthPage';
import Dashboard from './components/Dashboard/Dashboard';
import ResumeBuilder from './components/ResumeBuilder/ResumeBuilder';
import TemplateSelector from './components/Templates/TemplateSelector';
import ATSAnalyzer from './components/ATS/ATSAnalyzer';
import ResumePreview from './components/Preview/ResumePreview';
import AIAssistant from './components/AI/AIAssistant';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? <>{children}</> : <Navigate to="/auth" />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  return !currentUser ? <>{children}</> : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ResumeProvider>
          <div className="App">
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
            <Routes>
              <Route 
                path="/auth" 
                element={
                  <PublicRoute>
                    <AuthPage />
                  </PublicRoute>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/templates" 
                element={
                  <ProtectedRoute>
                    <TemplateSelector />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/builder" 
                element={
                  <ProtectedRoute>
                    <ResumeBuilder />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/analyzer" 
                element={
                  <ProtectedRoute>
                    <ATSAnalyzer />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/preview" 
                element={
                  <ProtectedRoute>
                    <ResumePreview />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/ai-assistant" 
                element={
                  <ProtectedRoute>
                    <AIAssistant />
                  </ProtectedRoute>
                } 
              />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </ResumeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;