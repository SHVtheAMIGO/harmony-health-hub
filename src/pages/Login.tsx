import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, ArrowLeft, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { role } = useParams<{ role: string }>();
  const { login, setRole } = useAuth();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const currentRole = role as UserRole;

  const roleConfig = {
    patient: {
      title: 'Patient Portal',
      gradient: 'gradient-patient',
      buttonVariant: 'patient' as const,
      bgLight: 'bg-patient-light',
      text: 'text-patient',
    },
    doctor: {
      title: 'Doctor Portal',
      gradient: 'gradient-doctor',
      buttonVariant: 'doctor' as const,
      bgLight: 'bg-doctor-light',
      text: 'text-doctor',
    },
    admin: {
      title: 'Admin Portal',
      gradient: 'gradient-admin',
      buttonVariant: 'admin' as const,
      bgLight: 'bg-admin-light',
      text: 'text-admin',
    },
  };

  const config = roleConfig[currentRole as keyof typeof roleConfig] || roleConfig.patient;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      setRole(currentRole);
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: 'Welcome!',
          description: `Successfully signed in as ${currentRole}`,
        });
        navigate(`/${currentRole}/onboarding`);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24">
        <div className="w-full max-w-md mx-auto">
          <Button 
            variant="ghost" 
            className="mb-8 -ml-4"
            onClick={() => navigate('/auth/select-role')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to role selection
          </Button>

          <div className="animate-slide-up">
            <div className="flex items-center gap-2 mb-2">
              <div className={cn('rounded-xl p-2', config.gradient)}>
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold">MediSlot 360</span>
            </div>
            
            <h1 className="text-3xl font-bold mt-6">{config.title}</h1>
            <p className="text-muted-foreground mt-2">
              {isSignUp ? 'Create your account to get started' : 'Sign in to access your dashboard'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant={config.buttonVariant}
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isSignUp ? 'Creating account...' : 'Signing in...'}
                </>
              ) : (
                isSignUp ? 'Create Account' : 'Sign In'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className={cn('text-sm hover:underline', config.text)}
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>

      {/* Right side - Decoration */}
      <div className={cn('hidden lg:flex flex-1 items-center justify-center', config.gradient)}>
        <div className="text-center text-white p-12 max-w-md">
          <div className="animate-float">
            <Heart className="h-24 w-24 mx-auto opacity-90" />
          </div>
          <h2 className="mt-8 text-3xl font-bold">Welcome to MediSlot 360</h2>
          <p className="mt-4 text-white/80">
            Your trusted partner in healthcare management. Access your {currentRole} dashboard and manage your healthcare journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
