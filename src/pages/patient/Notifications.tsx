import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ProgressBar from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Heart, ArrowRight, Bell, Calendar, Pill, FileText, CheckCircle, Circle } from 'lucide-react';
import { mockNotifications } from '@/data/mockData';

const steps = ['Book Appointment', 'Medical Records', 'Prescriptions', 'Notifications', 'Complete'];

const Notifications = () => {
  const navigate = useNavigate();
  const { currentStep, setCurrentStep, logout } = useAuth();
  
  const [notifications, setNotifications] = useState(mockNotifications);

  const toggleRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleComplete = () => {
    setCurrentStep(5);
    logout();
    navigate('/exit');
  };

  const handleLogout = () => {
    logout();
    navigate('/exit');
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="h-5 w-5" />;
      case 'prescription':
        return <Pill className="h-5 w-5" />;
      case 'update':
        return <FileText className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="gradient-patient rounded-xl p-2">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold">MediCare</span>
            <span className="text-muted-foreground">| Patient Portal</span>
          </div>
          <Button variant="ghost" onClick={handleLogout}>Logout</Button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="container mx-auto px-4">
        <ProgressBar steps={steps} currentStep={currentStep} role="patient" />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="animate-slide-up flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Notifications</h1>
              <p className="text-muted-foreground mt-2">
                Stay updated with your healthcare activities
              </p>
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllRead}>
                Mark all as read
              </Button>
            )}
          </div>

          {/* Unread Badge */}
          {unreadCount > 0 && (
            <div className="mt-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-patient-light text-patient font-medium">
                <Bell className="h-4 w-4" />
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </div>
            </div>
          )}

          {/* Notifications List */}
          <div className="mt-6 space-y-3">
            {notifications.map((notification, index) => (
              <div
                key={notification.id}
                onClick={() => toggleRead(notification.id)}
                className={cn(
                  'animate-slide-up rounded-xl border p-4 cursor-pointer transition-all duration-200',
                  notification.read
                    ? 'bg-card hover:bg-secondary/50'
                    : 'bg-patient-light/50 border-patient/20 hover:bg-patient-light'
                )}
                style={{ animationDelay: `${0.05 * (index + 1)}s` }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      'rounded-lg p-2',
                      notification.read ? 'bg-secondary' : 'bg-patient/10 text-patient'
                    )}
                  >
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn('text-sm', !notification.read && 'font-medium')}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleRead(notification.id);
                    }}
                    className="flex-shrink-0"
                  >
                    {notification.read ? (
                      <Circle className="h-5 w-5 text-muted-foreground/50" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-patient" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={() => { setCurrentStep(3); navigate('/patient/onboarding/prescriptions'); }}>
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              Back
            </Button>
            <Button variant="patient" onClick={handleComplete}>
              Complete & Logout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notifications;
