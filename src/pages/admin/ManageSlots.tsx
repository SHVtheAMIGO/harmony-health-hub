import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ProgressBar from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Heart, ArrowRight, Calendar, Clock, Plus, X, User } from 'lucide-react';
import { mockDoctors } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const steps = ['Manage Users', 'Manage Slots', 'Reports', 'Analytics', 'Complete'];

interface Slot {
  id: number;
  time: string;
  available: boolean;
}

const ManageSlots = () => {
  const navigate = useNavigate();
  const { currentStep, setCurrentStep, logout } = useAuth();
  const { toast } = useToast();
  
  const [selectedDoctor, setSelectedDoctor] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState('2024-03-20');
  const [slots, setSlots] = useState<Slot[]>([
    { id: 1, time: '09:00 AM', available: true },
    { id: 2, time: '10:00 AM', available: true },
    { id: 3, time: '11:00 AM', available: false },
    { id: 4, time: '02:00 PM', available: true },
    { id: 5, time: '03:00 PM', available: true },
    { id: 6, time: '04:00 PM', available: false },
  ]);

  const toggleSlot = (id: number) => {
    setSlots(prev =>
      prev.map(s => (s.id === id ? { ...s, available: !s.available } : s))
    );
    toast({
      title: 'Slot Updated',
      description: 'Availability has been changed',
    });
  };

  const addSlot = () => {
    const newId = Math.max(...slots.map(s => s.id)) + 1;
    setSlots(prev => [...prev, { id: newId, time: '05:00 PM', available: true }]);
    toast({
      title: 'Slot Added',
      description: 'New time slot has been created',
    });
  };

  const removeSlot = (id: number) => {
    setSlots(prev => prev.filter(s => s.id !== id));
    toast({
      title: 'Slot Removed',
      description: 'Time slot has been deleted',
    });
  };

  const handleNext = () => {
    setCurrentStep(3);
    navigate('/admin/onboarding/reports');
  };

  const handleLogout = () => {
    logout();
    navigate('/exit');
  };

  const doctor = mockDoctors.find(d => d.id === selectedDoctor);

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
        <div className="max-w-5xl mx-auto">
          <div className="animate-slide-up">
            <h1 className="text-3xl font-bold">Manage Slots</h1>
            <p className="text-muted-foreground mt-2">Create and manage doctor availability</p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Doctor Selection */}
            <div className="animate-slide-up rounded-2xl border bg-card p-6 shadow-soft" style={{ animationDelay: '0.1s' }}>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-admin" />
                Select Doctor
              </h3>
              <div className="space-y-2">
                {mockDoctors.map(d => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDoctor(d.id)}
                    className={cn(
                      'w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left',
                      selectedDoctor === d.id
                        ? 'bg-admin text-white'
                        : 'bg-secondary hover:bg-admin/10'
                    )}
                  >
                    <span className="text-2xl">{d.avatar}</span>
                    <div>
                      <p className="font-medium">{d.name}</p>
                      <p className={cn('text-xs', selectedDoctor === d.id ? 'text-white/70' : 'text-muted-foreground')}>
                        {d.specialty}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Slots */}
            <div className="lg:col-span-2 space-y-6">
              {/* Date Selection */}
              <div className="animate-slide-up rounded-2xl border bg-card p-6 shadow-soft" style={{ animationDelay: '0.2s' }}>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-admin" />
                  Select Date
                </h3>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {['2024-03-18', '2024-03-19', '2024-03-20', '2024-03-21', '2024-03-22'].map(date => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm font-medium transition-all flex-shrink-0',
                        selectedDate === date
                          ? 'bg-admin text-white'
                          : 'bg-secondary hover:bg-admin/10'
                      )}
                    >
                      {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slots Management */}
              <div className="animate-slide-up rounded-2xl border bg-card p-6 shadow-soft" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Clock className="h-5 w-5 text-admin" />
                    Time Slots for {doctor?.name}
                  </h3>
                  <Button variant="admin" size="sm" onClick={addSlot}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Slot
                  </Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {slots.map(slot => (
                    <div
                      key={slot.id}
                      className={cn(
                        'relative rounded-xl p-4 transition-all',
                        slot.available ? 'bg-patient-light' : 'bg-destructive/10'
                      )}
                    >
                      <button
                        onClick={() => removeSlot(slot.id)}
                        className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <p className="font-semibold">{slot.time}</p>
                      <button
                        onClick={() => toggleSlot(slot.id)}
                        className={cn(
                          'mt-2 text-xs px-2 py-1 rounded-full transition-all',
                          slot.available
                            ? 'bg-patient text-white'
                            : 'bg-destructive text-white'
                        )}
                      >
                        {slot.available ? 'Available' : 'Blocked'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={() => { setCurrentStep(1); navigate('/admin/onboarding'); }}>
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              Back
            </Button>
            <Button variant="admin" onClick={handleNext}>
              Next: Reports
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageSlots;
