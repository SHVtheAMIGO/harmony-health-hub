import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ProgressBar from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Heart, ArrowRight, BarChart3, TrendingUp, Users, Calendar } from 'lucide-react';
import { mockAnalyticsData } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const steps = ['Manage Users', 'Manage Slots', 'Reports', 'Analytics', 'Complete'];

const COLORS = ['hsl(152, 69%, 41%)', 'hsl(217, 91%, 60%)', 'hsl(270, 67%, 58%)', 'hsl(30, 100%, 50%)'];

const Analytics = () => {
  const navigate = useNavigate();
  const { currentStep, setCurrentStep, logout } = useAuth();
  
  const [dateFilter, setDateFilter] = useState('week');

  const handleComplete = () => {
    setCurrentStep(5);
    logout();
    navigate('/exit');
  };

  const handleLogout = () => {
    logout();
    navigate('/exit');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="gradient-admin rounded-xl p-2">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold">MediSlot 360</span>
            <span className="text-muted-foreground">| Admin Portal</span>
          </div>
          <Button variant="ghost" onClick={handleLogout}>Logout</Button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="container mx-auto px-4">
        <ProgressBar steps={steps} currentStep={currentStep} role="admin" />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-slide-up flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
              <p className="text-muted-foreground mt-2">Interactive charts and platform insights</p>
            </div>
            <div className="flex gap-2">
              {['week', 'month', 'quarter'].map(filter => (
                <Button
                  key={filter}
                  variant={dateFilter === filter ? 'admin' : 'outline'}
                  size="sm"
                  onClick={() => setDateFilter(filter)}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Charts Grid */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Appointments per Day */}
            <div className="animate-slide-up rounded-2xl border bg-card p-6 shadow-soft" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-lg bg-admin-light p-2">
                  <Calendar className="h-5 w-5 text-admin" />
                </div>
                <h3 className="font-semibold">Appointments per Day</h3>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockAnalyticsData.appointmentsPerDay}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="appointments" fill="hsl(270, 67%, 58%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* User Activity Trends */}
            <div className="animate-slide-up rounded-2xl border bg-card p-6 shadow-soft" style={{ animationDelay: '0.15s' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-lg bg-doctor-light p-2">
                  <TrendingUp className="h-5 w-5 text-doctor" />
                </div>
                <h3 className="font-semibold">User Growth</h3>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockAnalyticsData.userActivity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Line type="monotone" dataKey="patients" stroke="hsl(152, 69%, 41%)" strokeWidth={2} dot={{ fill: 'hsl(152, 69%, 41%)' }} />
                    <Line type="monotone" dataKey="doctors" stroke="hsl(217, 91%, 60%)" strokeWidth={2} dot={{ fill: 'hsl(217, 91%, 60%)' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-6 mt-4 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-patient" />
                  <span className="text-sm text-muted-foreground">Patients</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-doctor" />
                  <span className="text-sm text-muted-foreground">Doctors</span>
                </div>
              </div>
            </div>

            {/* Doctor Workload */}
            <div className="animate-slide-up rounded-2xl border bg-card p-6 shadow-soft lg:col-span-2" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-lg bg-patient-light p-2">
                  <Users className="h-5 w-5 text-patient" />
                </div>
                <h3 className="font-semibold">Doctor Workload Distribution</h3>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mockAnalyticsData.doctorWorkload}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="appointments"
                        label={({ name, percent }) => `${name.split(' ')[1]} ${(percent * 100).toFixed(0)}%`}
                      >
                        {mockAnalyticsData.doctorWorkload.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  {mockAnalyticsData.doctorWorkload.map((doctor, index) => (
                    <div key={doctor.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="font-medium">{doctor.name}</span>
                      </div>
                      <span className="text-muted-foreground">{doctor.appointments} appointments</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={() => { setCurrentStep(3); navigate('/admin/onboarding/reports'); }}>
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              Back
            </Button>
            <Button variant="admin" onClick={handleComplete}>
              Complete & Logout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
