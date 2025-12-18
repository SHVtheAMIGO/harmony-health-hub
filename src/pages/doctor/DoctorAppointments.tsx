import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ProgressBar from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Heart, ArrowRight, Calendar as CalendarIcon, User, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { mockAppointments } from '@/data/mockData';

const steps = ['View Appointments', 'Patient Data', 'Prescriptions', 'Notes', 'Complete'];

const DoctorAppointments = () => {
  const navigate = useNavigate();
  const { currentStep, setCurrentStep, logout } = useAuth();
  
  const [selectedDate, setSelectedDate] = useState('2024-03-20');
  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('daily');

  const filteredAppointments = mockAppointments.filter(apt => apt.date === selectedDate);

  const statusConfig = {
    upcoming: { icon: Clock, color: 'text-doctor', bg: 'bg-doctor-light' },
    completed: { icon: CheckCircle, color: 'text-patient', bg: 'bg-patient-light' },
    cancelled: { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10' },
  };

  const handleNext = () => {
    setCurrentStep(2);
    navigate('/doctor/onboarding/patients');
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
            <div className="gradient-doctor rounded-xl p-2">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold">MediSlot 360</span>
            <span className="text-muted-foreground">| Doctor Portal</span>
          </div>
          <Button variant="ghost" onClick={handleLogout}>Logout</Button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="container mx-auto px-4">
        <ProgressBar steps={steps} currentStep={currentStep} role="doctor" />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="animate-slide-up flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Appointments</h1>
              <p className="text-muted-foreground mt-2">Manage your daily schedule</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'daily' ? 'doctor' : 'outline'}
                size="sm"
                onClick={() => setViewMode('daily')}
              >
                Daily
              </Button>
              <Button
                variant={viewMode === 'weekly' ? 'doctor' : 'outline'}
                size="sm"
                onClick={() => setViewMode('weekly')}
              >
                Weekly
              </Button>
            </div>
          </div>

          {/* Date Selection */}
          <div className="mt-6 animate-slide-up flex gap-2 overflow-x-auto pb-2" style={{ animationDelay: '0.1s' }}>
            {['2024-03-18', '2024-03-19', '2024-03-20', '2024-03-21', '2024-03-22'].map(date => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={cn(
                  'px-6 py-3 rounded-xl text-sm font-medium transition-all flex-shrink-0',
                  selectedDate === date
                    ? 'bg-doctor text-white'
                    : 'bg-secondary hover:bg-doctor/10'
                )}
              >
                {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </button>
            ))}
          </div>

          {/* Appointments List */}
          <div className="mt-6 grid gap-4">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((apt, index) => {
                const status = statusConfig[apt.status as keyof typeof statusConfig];
                const StatusIcon = status.icon;

                return (
                  <div
                    key={apt.id}
                    className="animate-slide-up rounded-2xl border bg-card p-6 shadow-soft hover:shadow-card transition-all"
                    style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="rounded-xl bg-doctor-light p-3">
                          <User className="h-6 w-6 text-doctor" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{apt.patientName}</h3>
                          <p className="text-sm text-muted-foreground">{apt.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-lg font-medium">
                          <Clock className="h-5 w-5 text-muted-foreground" />
                          {apt.time}
                        </div>
                        <div className={cn('flex items-center gap-1 text-sm mt-1', status.color)}>
                          <StatusIcon className="h-4 w-4" />
                          <span className="capitalize">{apt.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-muted-foreground animate-fade-in">
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No appointments scheduled for this date</p>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="rounded-xl bg-doctor-light p-4 text-center">
              <div className="text-2xl font-bold text-doctor">
                {mockAppointments.filter(a => a.status === 'upcoming').length}
              </div>
              <div className="text-sm text-doctor-dark/70">Upcoming</div>
            </div>
            <div className="rounded-xl bg-patient-light p-4 text-center">
              <div className="text-2xl font-bold text-patient">
                {mockAppointments.filter(a => a.status === 'completed').length}
              </div>
              <div className="text-sm text-patient-dark/70">Completed</div>
            </div>
            <div className="rounded-xl bg-destructive/10 p-4 text-center">
              <div className="text-2xl font-bold text-destructive">
                {mockAppointments.filter(a => a.status === 'cancelled').length}
              </div>
              <div className="text-sm text-destructive/70">Cancelled</div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-end">
            <Button variant="doctor" onClick={handleNext}>
              Next: Patient Data
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorAppointments;
