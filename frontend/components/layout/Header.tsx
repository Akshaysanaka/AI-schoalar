
import React from 'react';
import { MenuIcon, UserIcon } from '../ui/icons';
import { User } from '../../types';

interface HeaderProps {
    setSidebarOpen: (isOpen: boolean) => void;
    onLogout: () => void;
    user: User | null;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen, onLogout, user }) => {
  return (
    <header className="flex items-center justify-between h-16 px-4 bg-card border-b shrink-0 md:justify-end">
        <button
            className="p-2 -ml-2 rounded-md md:hidden text-muted-foreground hover:bg-accent"
            onClick={() => setSidebarOpen(true)}
        >
            <MenuIcon className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-4">
            <div className="text-right">
                <p className="text-sm font-medium">{user?.name || 'User'}</p>
                <p className="text-xs text-muted-foreground">Student</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onLogout}
                className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
              >
                Logout
              </button>
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>
        </div>
    </header>
  );
};

export default Header;
