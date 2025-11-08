
import React, { useState, useEffect } from 'react';
import { STATUS_COLORS } from '../constants';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { ApplicationStatus, Application } from '../types';
import { applicationsAPI } from '../services/api';

const ApplicationTracker: React.FC = () => {
  const statuses: ApplicationStatus[] = ['Not Started', 'In Progress', 'Submitted', 'Awarded', 'Rejected'];
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await applicationsAPI.getAll();
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Application Tracker</h1>
          <p className="text-muted-foreground">Loading your applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Application Tracker</h1>
        <p className="text-muted-foreground">Manage your scholarship and financial aid applications in one place.</p>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-grid w-full grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5 min-w-max">
            {statuses.map(status => (
                <div key={status} className="flex flex-col">
                    <div className="flex items-center gap-2 p-2 mb-4">
                        <span className={`w-3 h-3 rounded-full ${STATUS_COLORS[status].split(' ')[0]}`}></span>
                        <h2 className="font-semibold text-md">{status}</h2>
                        <span className="text-sm font-medium text-gray-500">
                           ({applications.filter(app => app.status === status).length})
                        </span>
                    </div>
                    <div className="flex-1 space-y-4">
                        {applications
                            .filter(app => app.status === status)
                            .map(app => (
                                <Card key={app._id || app.id}>
                                    <CardContent className="p-4">
                                        <p className="font-semibold">{app.scholarshipTitle}</p>
                                        <p className="mt-2 text-sm text-muted-foreground">Deadline: {new Date(app.deadline).toLocaleDateString()}</p>
                                        {app.submittedDate && <p className="text-sm text-muted-foreground">Submitted: {new Date(app.submittedDate).toLocaleDateString()}</p>}
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationTracker;
