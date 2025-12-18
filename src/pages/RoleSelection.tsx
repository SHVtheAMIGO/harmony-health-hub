import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import RoleCard from '@/components/RoleCard';
import { User, Stethoscope, Shield, Heart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RoleSelection = () => {
  const navigate = useNavigate();
  const { setRole } = useAuth();

  const handleRoleSelect = (role: UserRole) => {
    setRole(role);
    navigate(`/auth/login/${role}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-doctor/5 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-patient/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-admin/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <div className="gradient-hero rounded-xl p-2">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">MediSlot 360</span>
          </div>
        </header>

        {/* Content */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="text-center animate-fade-in">
            <h1 className="text-3xl font-bold sm:text-4xl">Select Your Role</h1>
            <p className="mt-4 text-muted-foreground">
              Choose how you'd like to use MediSlot 360 today
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <RoleCard
                title="Patient"
                description="Book appointments, view medical records, and manage prescriptions"
                icon={User}
                role="patient"
                onClick={() => handleRoleSelect('patient')}
              />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <RoleCard
                title="Doctor"
                description="Manage appointments, patient data, and write prescriptions"
                icon={Stethoscope}
                role="doctor"
                onClick={() => handleRoleSelect('doctor')}
              />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <RoleCard
                title="Admin"
                description="Oversee platform operations, manage users, and view analytics"
                icon={Shield}
                role="admin"
                onClick={() => handleRoleSelect('admin')}
              />
            </div>
          </div>

          <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-sm text-muted-foreground">
              Need help choosing? <span className="text-doctor cursor-pointer hover:underline">Contact support</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
