import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ProgressBar from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Heart, ArrowRight, Pill, ChevronDown, ChevronUp, Calendar, User } from 'lucide-react';
import { mockMedicalRecords } from '@/data/mockData';

const steps = ['Book Appointment', 'Medical Records', 'Prescriptions', 'Notifications', 'Complete'];

const Prescriptions = () => {
  const navigate = useNavigate();
  const { currentStep, setCurrentStep, logout } = useAuth();
  
  const [expandedVisit, setExpandedVisit] = useState<number | null>(null);

  const handleNext = () => {
    setCurrentStep(4);
    navigate('/patient/onboarding/notifications');
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
        <div className="max-w-4xl mx-auto">
          <div className="animate-slide-up">
            <h1 className="text-3xl font-bold">Prescriptions</h1>
            <p className="text-muted-foreground mt-2">View all prescriptions from your medical visits</p>
          </div>

          {/* Prescriptions by Visit */}
          <div className="mt-8 space-y-6">
            {mockMedicalRecords.map((record, index) => (
              <div
                key={record.id}
                className="animate-slide-up rounded-2xl border bg-card shadow-soft overflow-hidden"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                {/* Visit Header */}
                <button
                  onClick={() => setExpandedVisit(expandedVisit === record.id ? null : record.id)}
                  className="w-full p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-xl bg-patient-light p-3">
                        <Pill className="h-6 w-6 text-patient" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{record.diagnosis}</h3>
                        <div className="flex flex-wrap gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(record.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {record.doctor}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {record.prescriptions.length} medication{record.prescriptions.length !== 1 ? 's' : ''}
                      </span>
                      {expandedVisit === record.id ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Expanded Prescriptions */}
                {expandedVisit === record.id && (
                  <div className="px-6 pb-6 animate-slide-up">
                    <div className="border-t pt-4 grid gap-4 sm:grid-cols-2">
                      {record.prescriptions.map((rx, i) => (
                        <div
                          key={i}
                          className="rounded-xl border-2 border-patient/20 bg-patient-light/50 p-4 hover:border-patient/40 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-patient/10 p-2">
                              <Pill className="h-5 w-5 text-patient" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-patient-dark">{rx.medicine}</h4>
                              <div className="mt-2 space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Dosage:</span>
                                  <span className="font-medium">{rx.dosage}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Duration:</span>
                                  <span className="font-medium">{rx.duration}</span>
                                </div>
                              </div>
                              <p className="mt-3 text-sm text-muted-foreground bg-white/50 rounded-lg p-2">
                                📋 {rx.instructions}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={() => { setCurrentStep(2); navigate('/patient/onboarding/records'); }}>
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              Back
            </Button>
            <Button variant="patient" onClick={handleNext}>
              Next: Notifications
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Prescriptions;
