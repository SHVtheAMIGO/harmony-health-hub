import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ProgressBar from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Heart, ArrowRight, FileText, User, Save, Clock } from 'lucide-react';
import { mockPatients } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const steps = ['View Appointments', 'Patient Data', 'Prescriptions', 'Notes', 'Complete'];

const DoctorNotes = () => {
  const navigate = useNavigate();
  const { currentStep, setCurrentStep, logout } = useAuth();
  const { toast } = useToast();
  
  const [selectedPatient, setSelectedPatient] = useState<number>(1);
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState<{ patientId: number; note: string; time: Date }[]>([]);

  const handleSave = () => {
    if (!notes.trim()) {
      toast({
        title: 'Empty Note',
        description: 'Please write some notes before saving',
        variant: 'destructive',
      });
      return;
    }

    setSavedNotes(prev => [
      ...prev,
      { patientId: selectedPatient, note: notes, time: new Date() }
    ]);
    setNotes('');
    toast({
      title: 'Notes Saved',
      description: 'Your notes have been added to the patient record',
    });
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

  const patient = mockPatients.find(p => p.id === selectedPatient);
  const patientNotes = savedNotes.filter(n => n.patientId === selectedPatient);

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
        <div className="max-w-4xl mx-auto">
          <div className="animate-slide-up">
            <h1 className="text-3xl font-bold">Clinical Notes</h1>
            <p className="text-muted-foreground mt-2">Add notes and observations for patient visits</p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Patient Selection */}
            <div className="animate-slide-up rounded-2xl border bg-card p-6 shadow-soft" style={{ animationDelay: '0.1s' }}>
              <h3 className="font-semibold mb-4">Select Patient</h3>
              <div className="space-y-2">
                {mockPatients.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPatient(p.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                      selectedPatient === p.id
                        ? 'bg-doctor text-white'
                        : 'bg-secondary hover:bg-doctor/10'
                    }`}
                  >
                    <User className="h-4 w-4" />
                    <span className="font-medium">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes Editor */}
            <div className="lg:col-span-2 space-y-6">
              <div className="animate-slide-up rounded-2xl border bg-card p-6 shadow-soft" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-lg bg-doctor-light p-2">
                    <FileText className="h-5 w-5 text-doctor" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Notes for {patient?.name}</h3>
                    <p className="text-sm text-muted-foreground">Today's visit notes</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="notes">Clinical Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Enter your clinical observations, diagnosis notes, treatment plan, follow-up recommendations..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="min-h-[200px] resize-none"
                    />
                  </div>

                  <Button variant="doctor" onClick={handleSave} className="w-full sm:w-auto">
                    <Save className="mr-2 h-4 w-4" />
                    Save Notes
                  </Button>
                </div>
              </div>

              {/* Previous Notes */}
              {patientNotes.length > 0 && (
                <div className="animate-slide-up rounded-2xl border bg-card p-6 shadow-soft" style={{ animationDelay: '0.3s' }}>
                  <h3 className="font-semibold mb-4">Previous Notes</h3>
                  <div className="space-y-4">
                    {patientNotes.map((note, index) => (
                      <div key={index} className="rounded-xl bg-secondary p-4">
                        <p className="text-sm whitespace-pre-wrap">{note.note}</p>
                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {note.time.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={() => { setCurrentStep(3); navigate('/doctor/onboarding/prescriptions'); }}>
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              Back
            </Button>
            <Button variant="doctor" onClick={handleComplete}>
              Complete & Logout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorNotes;
