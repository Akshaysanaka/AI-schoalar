
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { MOCK_APPLICATIONS, STATUS_COLORS } from '../constants';
import { SparklesIcon } from './ui/icons';
import { Page } from '../types';

interface DashboardProps {
    setCurrentPage: (page: Page) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setCurrentPage }) => {
  const applicationsInProgress = MOCK_APPLICATIONS.filter(app => app.status === 'In Progress').length;
  const totalAwarded = MOCK_APPLICATIONS.filter(app => app.status === 'Awarded').reduce(() => 19500, 0); // Mocked total amount

  const upcomingDeadlines = MOCK_APPLICATIONS
    .filter(app => new Date(app.deadline) > new Date() && (app.status === 'Not Started' || app.status === 'In Progress'))
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 3);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
  };
    
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, Alex!</h1>
        <p className="text-muted-foreground">Here's your financial aid snapshot.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Aid Awarded</CardTitle>
            <span className="text-2xl text-green-500">🏆</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalAwarded)}</div>
            <p className="text-xs text-muted-foreground">Congratulations!</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Applications In Progress</CardTitle>
            <span className="text-2xl">📝</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicationsInProgress}</div>
            <p className="text-xs text-muted-foreground">Keep up the momentum.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
            <span className="text-2xl">🗓️</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingDeadlines.length}</div>
            <p className="text-xs text-muted-foreground">Don't miss these!</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Stay on top of your most urgent applications.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {upcomingDeadlines.map(app => (
                <li key={app.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{app.scholarshipTitle}</p>
                    <p className="text-sm text-muted-foreground">Due: {new Date(app.deadline).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${STATUS_COLORS[app.status]}`}>{app.status}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <div className="flex flex-col p-8 space-y-4 text-center text-white bg-blue-600 rounded-lg">
            <SparklesIcon className="w-12 h-12 mx-auto" />
            <h3 className="text-2xl font-bold">Unsure where to start?</h3>
            <p className="max-w-md mx-auto">Our AI Assistant can answer your questions, help you find scholarships, and guide you through the application process.</p>
            <button 
                onClick={() => setCurrentPage('AI Assistant')}
                className="self-center px-6 py-2 font-bold text-blue-700 bg-white rounded-full hover:bg-blue-100"
            >
                Chat with AI Assistant
            </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
