
import React, { ReactNode } from 'react';
import { Page } from '../../types';
import { DashboardIcon, SearchIcon, ListChecksIcon, FileUpIcon, BarChartIcon, SparklesIcon } from '../ui/icons';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, isSidebarOpen, setSidebarOpen }) => {
  const navItems: { name: Page; icon: ReactNode }[] = [
    { name: 'Dashboard', icon: <DashboardIcon className="w-5 h-5" /> },
    { name: 'Scholarship Finder', icon: <SearchIcon className="w-5 h-5" /> },
    { name: 'Application Tracker', icon: <ListChecksIcon className="w-5 h-5" /> },
    { name: 'Document Center', icon: <FileUpIcon className="w-5 h-5" /> },
    { name: 'Analytics', icon: <BarChartIcon className="w-5 h-5" /> },
  ];

  const NavLink: React.FC<{ name: Page, children: ReactNode }> = ({ name, children }) => {
    const isActive = currentPage === name;
    return (
      <button
        onClick={() => {
          setCurrentPage(name);
          setSidebarOpen(false);
        }}
        className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
        }`}
      >
        {children}
      </button>
    );
  };
  
  return (
    <>
      <div className={`fixed inset-0 z-30 bg-black/50 transition-opacity md:hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)}></div>
      <aside className={`fixed top-0 left-0 z-40 flex-col h-full bg-card border-r w-64 md:relative md:translate-x-0 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center h-16 px-6 border-b">
            <SparklesIcon className="w-6 h-6 text-primary" />
            <h1 className="ml-2 text-lg font-bold">SmartScholar</h1>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <NavLink key={item.name} name={item.name}>
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </NavLink>
            ))}
          </nav>
          <div className="px-4 py-4 mt-auto border-t">
              <button
                onClick={() => {
                    setCurrentPage('AI Assistant');
                    setSidebarOpen(false);
                }}
                className={`flex items-center justify-center w-full px-4 py-3 text-sm font-bold rounded-lg transition-all
                ${currentPage === 'AI Assistant' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}
                `}
              >
                <SparklesIcon className="w-5 h-5 mr-2" />
                <span>AI Assistant</span>
              </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
