
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Legend as PieLegend } from 'recharts';
import { MOCK_APPLICATIONS } from '../constants';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { ApplicationStatus } from '../types';

const Analytics: React.FC = () => {

  const statusCounts = MOCK_APPLICATIONS.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<ApplicationStatus, number>);

  const pieData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
  
  const barData = [
    { name: 'Jan', Applied: 2, Awarded: 0 },
    { name: 'Feb', Applied: 1, Awarded: 1 },
    { name: 'Mar', Applied: 5, Awarded: 1 },
    { name: 'Apr', Applied: 3, Awarded: 2 },
    { name: 'May', Applied: 4, Awarded: 1 },
  ];

  const COLORS = ['#60a5fa', '#facc15', '#4ade80', '#f87171', '#9ca3af'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Visualize your financial aid journey.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Application Status Overview</CardTitle>
            <CardDescription>A breakdown of your current application statuses.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <PieLegend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Funnel (Last 5 Months)</CardTitle>
            <CardDescription>Your application activity over time.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Applied" fill="#3b82f6" />
                <Bar dataKey="Awarded" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
