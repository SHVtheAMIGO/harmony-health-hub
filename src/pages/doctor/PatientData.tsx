import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ProgressBar from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Heart, ArrowRight, User, FileText, Calendar, Mail, Phone, ChevronRight } from 'lucide-react';
import { mockPatients, mockMedicalRecords } from '@/data/mockData';

const steps = ['View Appointments', 'Patient Data', 'Prescriptions', 'Notes', 'Complete'];

const PatientData = () => {
  const navigate = useNavigate();
  const { currentStep, setCurrentStep, logout } = useAuth();
  
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);

  const patient = mockPatients.find(p => p.id === selectedPatient);

  const handleNext = () => {
    setCurrentStep(3);
    navigate('/doctor/onboarding/prescriptions');
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
        <div className="max-w-6xl mx-auto">
          <div className="animate-slide-up">
            <h1 className="text-3xl font-bold">Patient Data</h1>
            <p className="text-muted-foreground mt-2">View detailed patient information and history</p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Patient List */}
            <div className="animate-slide-up rounded-2xl border bg-card p-6 shadow-soft" style={{ animationDelay: '0.1s' }}>
              <h3 className="font-semibold mb-4">Select Patient</h3>
              <div className="space-y-2">
                {mockPatients.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPatient(p.id)}
                    className={cn(
                      'w-full flex items-center justify-between p-4 rounded-xl transition-all',
                      selectedPatient === p.id
                        ? 'bg-doctor text-white'
                        : 'bg-secondary hover:bg-doctor/10'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'rounded-full p-2',
                        selectedPatient === p.id ? 'bg-white/20' : 'bg-doctor/10'
                      )}>
                        <User className={cn('h-4 w-4', selectedPatient === p.id ? 'text-white' : 'text-doctor')} />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{p.name}</p>
                        <p className={cn('text-xs', selectedPatient === p.id ? 'text-white/70' : 'text-muted-foreground')}>
                          Age: {p.age}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={cn('h-4 w-4', selectedPatient === p.id ? 'text-white' : 'text-muted-foreground')} />
                  </button>
                ))}
              </div>
            </div>

            {/* Patient Details */}
            <div className="lg:col-span-2 space-y-6">
              {patient ? (
                <>
                  {/* Patient Info Card */}
                  <div className="animate-slide-up rounded-2xl border bg-card p-6 shadow-soft" style={{ animationDelay: '0.2s' }}>
                    <div className="flex items-center gap-4">
                      <div className="rounded-xl bg-doctor-light p-4">
                        <User className="h-8 w-8 text-doctor" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{patient.name}</h2>
                        <p className="text-muted-foreground">{patient.age} years old</p>
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{patient.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{patient.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm col-span-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Last Visit: {new Date(patient.lastVisit).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>

                  {/* Medical History */}
                  <div className="animate-slide-up rounded-2xl border bg-card p-6 shadow-soft" style={{ animationDelay: '0.3s' }}>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-doctor" />
                      Medical History
                    </h3>
                    <div className="space-y-4">
                      {mockMedicalRecords.map(record => (
                        <div key={record.id} className="rounded-xl bg-secondary p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{record.diagnosis}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{record.summary}</p>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(record.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="animate-fade-in rounded-2xl border bg-card p-12 text-center shadow-soft">
                  <User className="h-16 w-16 mx-auto text-muted-foreground/30" />
                  <p className="mt-4 text-muted-foreground">Select a patient to view their details</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={() => { setCurrentStep(1); navigate('/doctor/onboarding'); }}>
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              Back
            </Button>
            <Button variant="doctor" onClick={handleNext}>
              Next: Write Prescription
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientData;
