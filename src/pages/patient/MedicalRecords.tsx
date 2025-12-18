import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ProgressBar from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Heart, ArrowRight, Search, FileText, Calendar, User, ChevronDown, ChevronUp } from 'lucide-react';
import { mockMedicalRecords } from '@/data/mockData';

const steps = ['Book Appointment', 'Medical Records', 'Prescriptions', 'Notifications', 'Complete'];

const MedicalRecords = () => {
  const navigate = useNavigate();
  const { currentStep, setCurrentStep, logout } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRecord, setExpandedRecord] = useState<number | null>(null);
  const [filterDoctor, setFilterDoctor] = useState<string>('all');

  const doctors = ['all', ...new Set(mockMedicalRecords.map(r => r.doctor))];

  const filteredRecords = mockMedicalRecords.filter(record => {
    const matchesSearch = 
      record.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDoctor = filterDoctor === 'all' || record.doctor === filterDoctor;
    return matchesSearch && matchesDoctor;
  });

  const handleNext = () => {
    setCurrentStep(3);
    navigate('/patient/onboarding/prescriptions');
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
        <div className="max-w-4xl mx-auto">
          <div className="animate-slide-up">
            <h1 className="text-3xl font-bold">Medical Records</h1>
            <p className="text-muted-foreground mt-2">View and search your complete medical history</p>
          </div>

          {/* Search & Filter */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by diagnosis, doctor, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterDoctor}
              onChange={(e) => setFilterDoctor(e.target.value)}
              className="h-10 px-4 rounded-lg border bg-background text-sm"
            >
              {doctors.map(doctor => (
                <option key={doctor} value={doctor}>
                  {doctor === 'all' ? 'All Doctors' : doctor}
                </option>
              ))}
            </select>
          </div>

          {/* Records List */}
          <div className="mt-6 space-y-4">
            {filteredRecords.map((record, index) => (
              <div
                key={record.id}
                className="animate-slide-up rounded-2xl border bg-card shadow-soft overflow-hidden transition-all duration-300 hover:shadow-card"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <button
                  onClick={() => setExpandedRecord(expandedRecord === record.id ? null : record.id)}
                  className="w-full p-6 text-left"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="rounded-xl bg-patient-light p-3">
                        <FileText className="h-6 w-6 text-patient" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{record.diagnosis}</h3>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
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
                        <p className="mt-3 text-muted-foreground">{record.summary}</p>
                      </div>
                    </div>
                    {expandedRecord === record.id ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                </button>

                {/* Expanded Details */}
                {expandedRecord === record.id && (
                  <div className="px-6 pb-6 animate-slide-up">
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-2">Detailed Notes</h4>
                      <p className="text-muted-foreground">{record.details}</p>
                      
                      <h4 className="font-semibold mt-4 mb-2">Prescriptions</h4>
                      <div className="space-y-2">
                        {record.prescriptions.map((rx, i) => (
                          <div key={i} className="rounded-lg bg-secondary p-3">
                            <div className="flex justify-between">
                              <span className="font-medium">{rx.medicine}</span>
                              <span className="text-sm text-muted-foreground">{rx.dosage}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {rx.duration} - {rx.instructions}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {filteredRecords.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No records found matching your search</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={() => { setCurrentStep(1); navigate('/patient/onboarding'); }}>
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              Back
            </Button>
            <Button variant="patient" onClick={handleNext}>
              Next: Prescriptions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MedicalRecords;
