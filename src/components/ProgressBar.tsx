import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { UserRole } from '@/contexts/AuthContext';

interface ProgressBarProps {
  steps: string[];
  currentStep: number;
  role: UserRole;
}

const ProgressBar = ({ steps, currentStep, role }: ProgressBarProps) => {
  const roleColors = {
    patient: {
      active: 'bg-patient',
      inactive: 'bg-patient/20',
      text: 'text-patient',
    },
    doctor: {
      active: 'bg-doctor',
      inactive: 'bg-doctor/20',
      text: 'text-doctor',
    },
    admin: {
      active: 'bg-admin',
      inactive: 'bg-admin/20',
      text: 'text-admin',
    },
  };

  const colors = role ? roleColors[role] : roleColors.patient;

  return (
    <div className="w-full px-4 py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div key={step} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
              <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300',
                    isCompleted && `${colors.active} text-white`,
                    isActive && `${colors.active} text-white ring-4 ring-offset-2 ring-current/20`,
                    !isCompleted && !isActive && `${colors.inactive} ${colors.text}`
                  )}
                >
                  {isCompleted ? <Check className="h-5 w-5" /> : stepNumber}
                </div>
                <span
                  className={cn(
                    'mt-2 text-xs font-medium transition-colors duration-300 text-center max-w-[80px]',
                    isActive ? colors.text : 'text-muted-foreground'
                  )}
                >
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'mx-2 h-1 flex-1 rounded-full transition-all duration-500',
                    stepNumber < currentStep ? colors.active : colors.inactive
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
