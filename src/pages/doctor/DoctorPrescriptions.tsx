import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ProgressBar from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Heart, ArrowRight, Pill, Plus, Trash2, User } from 'lucide-react';
import { mockPatients } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const steps = ['View Appointments', 'Patient Data', 'Prescriptions', 'Notes', 'Complete'];

interface Medication {
  id: number;
  medicine: string;
  dosage: string;
  duration: string;
  instructions: string;
}

const DoctorPrescriptions = () => {
  const navigate = useNavigate();
  const { currentStep, setCurrentStep, logout } = useAuth();
  const { toast } = useToast();
  
  const [selectedPatient, setSelectedPatient] = useState<number>(1);
  const [medications, setMedications] = useState<Medication[]>([
    { id: 1, medicine: '', dosage: '', duration: '', instructions: '' }
  ]);

  const addMedication = () => {
    setMedications(prev => [
      ...prev,
      { id: Date.now(), medicine: '', dosage: '', duration: '', instructions: '' }
    ]);
  };

  const removeMedication = (id: number) => {
    if (medications.length > 1) {
      setMedications(prev => prev.filter(m => m.id !== id));
    }
  };

  const updateMedication = (id: number, field: keyof Medication, value: string) => {
    setMedications(prev =>
      prev.map(m => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleSubmit = () => {
    const hasEmpty = medications.some(m => !m.medicine || !m.dosage || !m.duration);
    if (hasEmpty) {
      toast({
        title: 'Incomplete Form',
        description: 'Please fill in all required medication fields',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Prescription Saved',
      description: 'The prescription has been attached to the patient record',
    });
    setCurrentStep(4);
    navigate('/doctor/onboarding/notes');
  };

  const handleLogout = () => {
    logout();
    navigate('/exit');
  };

  const patient = mockPatients.find(p => p.id === selectedPatient);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="gradient-doctor rounded-xl p-2">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold">MediCare</span>
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
        <div className="max-w-4xl mx-auto">
          <div className="animate-slide-up">
            <h1 className="text-3xl font-bold">Write Prescription</h1>
            <p className="text-muted-foreground mt-2">Create and attach prescriptions to patient records</p>
          </div>

          {/* Patient Selection */}
          <div className="mt-8 animate-slide-up rounded-2xl border bg-card p-6 shadow-soft" style={{ animationDelay: '0.1s' }}>
            <Label className="text-base font-semibold mb-4 block">Select Patient</Label>
            <div className="flex flex-wrap gap-2">
              {mockPatients.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPatient(p.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    selectedPatient === p.id
                      ? 'bg-doctor text-white'
                      : 'bg-secondary hover:bg-doctor/10'
                  }`}
                >
                  <User className="h-4 w-4" />
                  {p.name}
                </button>
              ))}
            </div>
            {patient && (
              <p className="mt-4 text-sm text-muted-foreground">
                Writing prescription for <span className="font-medium text-foreground">{patient.name}</span> ({patient.age} years old)
              </p>
            )}
          </div>

          {/* Medications Form */}
          <div className="mt-6 space-y-4">
            {medications.map((med, index) => (
              <div
                key={med.id}
                className="animate-slide-up rounded-2xl border bg-card p-6 shadow-soft"
                style={{ animationDelay: `${0.1 * (index + 2)}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-doctor-light p-2">
                      <Pill className="h-5 w-5 text-doctor" />
                    </div>
                    <h3 className="font-semibold">Medication {index + 1}</h3>
                  </div>
                  {medications.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMedication(med.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`medicine-${med.id}`}>Medicine Name *</Label>
                    <Input
                      id={`medicine-${med.id}`}
                      placeholder="e.g., Amoxicillin"
                      value={med.medicine}
                      onChange={(e) => updateMedication(med.id, 'medicine', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`dosage-${med.id}`}>Dosage *</Label>
                    <Input
                      id={`dosage-${med.id}`}
                      placeholder="e.g., 500mg"
                      value={med.dosage}
                      onChange={(e) => updateMedication(med.id, 'dosage', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`duration-${med.id}`}>Duration *</Label>
                    <Input
                      id={`duration-${med.id}`}
                      placeholder="e.g., 7 days"
                      value={med.duration}
                      onChange={(e) => updateMedication(med.id, 'duration', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`instructions-${med.id}`}>Instructions</Label>
                    <Input
                      id={`instructions-${med.id}`}
                      placeholder="e.g., Take after meals"
                      value={med.instructions}
                      onChange={(e) => updateMedication(med.id, 'instructions', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add More */}
          <Button
            variant="outline"
            className="mt-4 w-full border-dashed"
            onClick={addMedication}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Another Medication
          </Button>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={() => { setCurrentStep(2); navigate('/doctor/onboarding/patients'); }}>
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              Back
            </Button>
            <Button variant="doctor" onClick={handleSubmit}>
              Save & Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorPrescriptions;
