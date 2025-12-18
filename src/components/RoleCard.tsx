import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface RoleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  role: 'patient' | 'doctor' | 'admin';
  onClick: () => void;
}

const RoleCard = ({ title, description, icon: Icon, role, onClick }: RoleCardProps) => {
  const roleStyles = {
    patient: {
      gradient: 'gradient-patient',
      light: 'bg-patient-light',
      border: 'border-patient/20',
      iconBg: 'bg-patient/10',
      iconColor: 'text-patient',
      hoverBorder: 'hover:border-patient',
    },
    doctor: {
      gradient: 'gradient-doctor',
      light: 'bg-doctor-light',
      border: 'border-doctor/20',
      iconBg: 'bg-doctor/10',
      iconColor: 'text-doctor',
      hoverBorder: 'hover:border-doctor',
    },
    admin: {
      gradient: 'gradient-admin',
      light: 'bg-admin-light',
      border: 'border-admin/20',
      iconBg: 'bg-admin/10',
      iconColor: 'text-admin',
      hoverBorder: 'hover:border-admin',
    },
  };

  const styles = roleStyles[role];

  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden rounded-2xl border-2 bg-card p-8 transition-all duration-300',
        'hover:shadow-elevated hover:-translate-y-2 active:scale-[0.98]',
        styles.border,
        styles.hoverBorder
      )}
    >
      {/* Gradient overlay on hover */}
      <div
        className={cn(
          'absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100',
          styles.gradient
        )}
        style={{ opacity: 0 }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <div
          className={cn(
            'mb-6 inline-flex rounded-xl p-4 transition-all duration-300',
            styles.iconBg,
            'group-hover:bg-white/20'
          )}
        >
          <Icon
            className={cn(
              'h-8 w-8 transition-colors duration-300',
              styles.iconColor,
              'group-hover:text-white'
            )}
          />
        </div>
        
        <h3
          className={cn(
            'mb-2 text-xl font-bold transition-colors duration-300',
            'text-foreground group-hover:text-white'
          )}
        >
          {title}
        </h3>
        
        <p
          className={cn(
            'text-sm transition-colors duration-300',
            'text-muted-foreground group-hover:text-white/80'
          )}
        >
          {description}
        </p>
      </div>

      {/* Background gradient that appears on hover */}
      <div
        className={cn(
          'absolute inset-0 -z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100',
          styles.gradient
        )}
      />
    </button>
  );
};

export default RoleCard;
