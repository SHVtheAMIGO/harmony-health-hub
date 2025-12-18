import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, CheckCircle } from 'lucide-react';

const Exit = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center animate-fade-in">
        {/* Success Animation */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="absolute inset-0 animate-ping rounded-full bg-patient/20" style={{ animationDuration: '2s' }} />
          <div className="relative gradient-hero rounded-full p-6">
            <CheckCircle className="h-16 w-16 text-white" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-bold mb-4">Thanks for using MediCare!</h1>
        <p className="text-muted-foreground mb-8">
          Your session has ended successfully. We hope to see you again soon.
        </p>

        {/* Loading Animation */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-2 w-2 rounded-full bg-doctor animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="h-2 w-2 rounded-full bg-admin animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="h-2 w-2 rounded-full bg-patient animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>

        {/* Countdown */}
        <p className="text-sm text-muted-foreground">
          Redirecting to home in <span className="font-semibold text-foreground">{countdown}</span> seconds...
        </p>

        {/* Logo */}
        <div className="mt-12 flex items-center justify-center gap-2 text-muted-foreground">
          <Heart className="h-5 w-5" />
          <span className="font-semibold">MediCare</span>
        </div>
      </div>
    </div>
  );
};

export default Exit;
