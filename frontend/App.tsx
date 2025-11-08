
import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/Dashboard';
import ScholarshipFinder from './components/ScholarshipFinder';
import ApplicationTracker from './components/ApplicationTracker';
import DocumentUploader from './components/DocumentUploader';
import Analytics from './components/Analytics';
import ChatAssistant from './components/ChatAssistant';
import Login from './components/Login';
import Signup from './components/Signup';
import { Page, User } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [showSignup, setShowSignup] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing token on app load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData: User, userToken: string) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('token', userToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard setCurrentPage={setCurrentPage} />;
      case 'Scholarship Finder':
        return <ScholarshipFinder />;
      case 'Application Tracker':
        return <ApplicationTracker />;
      case 'Document Center':
        return <DocumentUploader />;
      case 'Analytics':
        return <Analytics />;
      case 'AI Assistant':
        return <ChatAssistant />;
      default:
        return <Dashboard setCurrentPage={setCurrentPage} />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return showSignup ? (
      <Signup
        onSignup={handleLogin}
        onSwitchToLogin={() => setShowSignup(false)}
      />
    ) : (
      <Login
        onLogin={handleLogin}
        onSwitchToSignup={() => setShowSignup(true)}
      />
    );
  }

  return (
    <div className="flex h-screen bg-secondary">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1 w-full">
        <Header setSidebarOpen={setSidebarOpen} onLogout={handleLogout} user={user} />
        <main className="h-full p-4 overflow-y-auto md:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
