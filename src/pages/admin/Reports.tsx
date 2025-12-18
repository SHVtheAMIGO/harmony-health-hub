import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ProgressBar from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Heart, ArrowRight, FileText, Download, Calendar, Users, Activity } from 'lucide-react';
import { mockAppointments, mockUsers } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const steps = ['Manage Users', 'Manage Slots', 'Reports', 'Analytics', 'Complete'];

const Reports = () => {
  const navigate = useNavigate();
  const { currentStep, setCurrentStep, logout } = useAuth();
  const { toast } = useToast();
  
  const [dateRange, setDateRange] = useState('week');

  const downloadReport = (type: string) => {
    toast({
      title: 'Report Downloaded',
      description: `${type} report has been downloaded successfully`,
    });
  };

  const handleNext = () => {
    setCurrentStep(4);
    navigate('/admin/onboarding/analytics');
  };

  const handleLogout = () => {
    logout();
    navigate('/exit');
  };

  const stats = {
    totalAppointments: mockAppointments.length,
    completedAppointments: mockAppointments.filter(a => a.status === 'completed').length,
    cancelledAppointments: mockAppointments.filter(a => a.status === 'cancelled').length,
    totalUsers: mockUsers.length,
    activeUsers: mockUsers.filter(u => u.status === 'active').length,
    doctors: mockUsers.filter(u => u.role === 'doctor').length,
    patients: mockUsers.filter(u => u.role === 'patient').length,
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
            <span className="font-bold">MediCare</span>
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
              <h1 className="text-3xl font-bold">Reports</h1>
              <p className="text-muted-foreground mt-2">View and download platform reports</p>
            </div>
            <div className="flex gap-2">
              {['week', 'month', 'year'].map(range => (
                <Button
                  key={range}
                  variant={dateRange === range ? 'admin' : 'outline'}
                  size="sm"
                  onClick={() => setDateRange(range)}
                >
                  This {range.charAt(0).toUpperCase() + range.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="animate-slide-up rounded-2xl bg-admin-light p-6" style={{ animationDelay: '0.1s' }}>
              <Calendar className="h-8 w-8 text-admin mb-3" />
              <p className="text-3xl font-bold text-admin-dark">{stats.totalAppointments}</p>
              <p className="text-sm text-admin-dark/70">Total Appointments</p>
            </div>
            <div className="animate-slide-up rounded-2xl bg-patient-light p-6" style={{ animationDelay: '0.15s' }}>
              <Activity className="h-8 w-8 text-patient mb-3" />
              <p className="text-3xl font-bold text-patient-dark">{stats.completedAppointments}</p>
              <p className="text-sm text-patient-dark/70">Completed</p>
            </div>
            <div className="animate-slide-up rounded-2xl bg-doctor-light p-6" style={{ animationDelay: '0.2s' }}>
              <Users className="h-8 w-8 text-doctor mb-3" />
              <p className="text-3xl font-bold text-doctor-dark">{stats.totalUsers}</p>
              <p className="text-sm text-doctor-dark/70">Total Users</p>
            </div>
            <div className="animate-slide-up rounded-2xl bg-secondary p-6" style={{ animationDelay: '0.25s' }}>
              <Users className="h-8 w-8 text-foreground mb-3" />
              <p className="text-3xl font-bold">{stats.activeUsers}</p>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
          </div>

          {/* Report Cards */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="animate-slide-up rounded-2xl border bg-card p-6 shadow-soft" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-xl bg-admin-light p-3">
                  <Calendar className="h-6 w-6 text-admin" />
                </div>
                <div>
                  <h3 className="font-semibold">Appointment Reports</h3>
                  <p className="text-sm text-muted-foreground">Detailed appointment statistics</p>
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Appointments</span>
                  <span className="font-medium">{stats.totalAppointments}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Completed</span>
                  <span className="font-medium text-patient">{stats.completedAppointments}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Cancelled</span>
                  <span className="font-medium text-destructive">{stats.cancelledAppointments}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="admin" size="sm" className="flex-1" onClick={() => downloadReport('Appointment PDF')}>
                  <Download className="h-4 w-4 mr-1" />
                  PDF
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={() => downloadReport('Appointment CSV')}>
                  <Download className="h-4 w-4 mr-1" />
                  CSV
                </Button>
              </div>
            </div>

            <div className="animate-slide-up rounded-2xl border bg-card p-6 shadow-soft" style={{ animationDelay: '0.35s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-xl bg-doctor-light p-3">
                  <Users className="h-6 w-6 text-doctor" />
                </div>
                <div>
                  <h3 className="font-semibold">User Activity Reports</h3>
                  <p className="text-sm text-muted-foreground">User registration and activity</p>
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Users</span>
                  <span className="font-medium">{stats.totalUsers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Doctors</span>
                  <span className="font-medium text-doctor">{stats.doctors}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Patients</span>
                  <span className="font-medium text-patient">{stats.patients}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="doctor" size="sm" className="flex-1" onClick={() => downloadReport('User PDF')}>
                  <Download className="h-4 w-4 mr-1" />
                  PDF
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={() => downloadReport('User CSV')}>
                  <Download className="h-4 w-4 mr-1" />
                  CSV
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={() => { setCurrentStep(2); navigate('/admin/onboarding/slots'); }}>
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              Back
            </Button>
            <Button variant="admin" onClick={handleNext}>
              Next: Analytics
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
