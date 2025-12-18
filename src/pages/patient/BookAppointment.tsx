import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ProgressBar from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Heart, ArrowRight, ArrowLeft, Clock, Sun, Sunset, Moon, Check } from 'lucide-react';
import { mockTimeSlots, mockDoctors } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const steps = ['Book Appointment', 'Medical Records', 'Prescriptions', 'Notifications', 'Complete'];

const BookAppointment = () => {
  const navigate = useNavigate();
  const { currentStep, setCurrentStep, logout } = useAuth();
  const { toast } = useToast();
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [periodFilter, setPeriodFilter] = useState<string>('all');

  const filteredSlots = periodFilter === 'all' 
    ? mockTimeSlots 
    : mockTimeSlots.filter(slot => slot.period === periodFilter);

  const handleConfirm = () => {
    if (!selectedDate || !selectedDoctor || !selectedSlot) {
      toast({
        title: 'Incomplete Selection',
        description: 'Please select a date, doctor, and time slot',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Appointment Booked!',
      description: `Your appointment is confirmed for ${format(selectedDate, 'PPP')}`,
    });
    setCurrentStep(2);
    navigate('/patient/onboarding/records');
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
            <div className="gradient-patient rounded-xl p-2">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold">MediSlot 360</span>
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
        <div className="max-w-6xl mx-auto">
          <div className="animate-slide-up">
            <h1 className="text-3xl font-bold">Book an Appointment</h1>
            <p className="text-muted-foreground mt-2">Select your preferred date, doctor, and time slot</p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Calendar */}
            <div className="animate-slide-up rounded-2xl border bg-card p-6 shadow-soft" style={{ animationDelay: '0.1s' }}>
              <h3 className="font-semibold mb-4">Select Date</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md pointer-events-auto"
                disabled={(date) => date < new Date()}
              />
            </div>

            {/* Doctor Selection */}
            <div className="animate-slide-up rounded-2xl border bg-card p-6 shadow-soft" style={{ animationDelay: '0.2s' }}>
              <h3 className="font-semibold mb-4">Select Doctor</h3>
              <div className="space-y-3">
                {mockDoctors.map((doctor) => (
                  <button
                    key={doctor.id}
                    onClick={() => setSelectedDoctor(doctor.id)}
                    className={cn(
                      'w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200',
                      selectedDoctor === doctor.id
                        ? 'border-patient bg-patient-light'
                        : 'border-transparent bg-secondary hover:bg-secondary/80'
                    )}
                  >
                    <span className="text-3xl">{doctor.avatar}</span>
                    <div className="text-left">
                      <p className="font-medium">{doctor.name}</p>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    </div>
                    {selectedDoctor === doctor.id && (
                      <Check className="ml-auto h-5 w-5 text-patient" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div className="animate-slide-up rounded-2xl border bg-card p-6 shadow-soft" style={{ animationDelay: '0.3s' }}>
              <h3 className="font-semibold mb-4">Select Time Slot</h3>
              
              {/* Period Filter */}
              <div className="flex gap-2 mb-4">
                {[
                  { id: 'all', label: 'All', icon: Clock },
                  { id: 'morning', label: 'Morning', icon: Sun },
                  { id: 'afternoon', label: 'Afternoon', icon: Sunset },
                  { id: 'evening', label: 'Evening', icon: Moon },
                ].map((period) => (
                  <button
                    key={period.id}
                    onClick={() => setPeriodFilter(period.id)}
                    className={cn(
                      'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                      periodFilter === period.id
                        ? 'bg-patient text-white'
                        : 'bg-secondary hover:bg-secondary/80'
                    )}
                  >
                    <period.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{period.label}</span>
                  </button>
                ))}
              </div>

              {/* Slots Grid */}
              <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                {filteredSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => slot.available && setSelectedSlot(slot.id)}
                    disabled={!slot.available}
                    className={cn(
                      'p-3 rounded-lg text-sm font-medium transition-all duration-200',
                      !slot.available && 'opacity-40 cursor-not-allowed bg-secondary line-through',
                      slot.available && selectedSlot === slot.id && 'bg-patient text-white',
                      slot.available && selectedSlot !== slot.id && 'bg-secondary hover:bg-patient/10'
                    )}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Summary & Confirm */}
          <div className="mt-8 animate-slide-up rounded-2xl border bg-card p-6 shadow-soft" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h3 className="font-semibold">Appointment Summary</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedDate && selectedDoctor && selectedSlot ? (
                    <>
                      {format(selectedDate, 'PPPP')} at{' '}
                      {mockTimeSlots.find(s => s.id === selectedSlot)?.time} with{' '}
                      {mockDoctors.find(d => d.id === selectedDoctor)?.name}
                    </>
                  ) : (
                    'Please complete your selection above'
                  )}
                </p>
              </div>
              <Button 
                variant="patient" 
                size="lg" 
                onClick={handleConfirm}
                disabled={!selectedDate || !selectedDoctor || !selectedSlot}
              >
                Confirm Appointment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookAppointment;
