import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Shield, Users, Calendar, FileText, Bell } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Calendar, title: 'Easy Scheduling', description: 'Book appointments with just a few clicks' },
    { icon: FileText, title: 'Medical Records', description: 'Access your complete health history' },
    { icon: Bell, title: 'Smart Notifications', description: 'Stay updated on your healthcare journey' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-doctor/10 blur-3xl" />
          <div className="absolute top-20 -left-40 h-96 w-96 rounded-full bg-patient/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-admin/10 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="gradient-hero rounded-xl p-2">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">MediSlot 360</span>
            </div>
            <Button variant="ghost" onClick={() => navigate('/auth/select-role')}>
              Sign In
            </Button>
          </header>

          {/* Hero Content */}
          <div className="mt-20 flex flex-col items-center text-center lg:mt-32">
            <div className="animate-fade-in">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium">
                <Shield className="h-4 w-4 text-doctor" />
                <span>Trusted by 10,000+ patients</span>
              </div>
            </div>

            <h1 className="animate-slide-up max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Your Health Journey,{' '}
              <span className="bg-gradient-to-r from-doctor via-admin to-patient bg-clip-text text-transparent">
                Simplified
              </span>
            </h1>

            <p className="animate-slide-up mt-6 max-w-2xl text-lg text-muted-foreground" style={{ animationDelay: '0.1s' }}>
              Experience seamless healthcare management with our comprehensive platform. 
              Book appointments, access records, and stay connected with your healthcare team.
            </p>

            <div className="animate-slide-up mt-10 flex flex-col gap-4 sm:flex-row" style={{ animationDelay: '0.2s' }}>
              <Button variant="hero" size="xl" onClick={() => navigate('/auth/select-role')}>
                Get Started
              </Button>
              <Button variant="outline" size="xl" onClick={() => navigate('/auth/select-role')}>
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="animate-slide-up mt-16 grid grid-cols-3 gap-8 sm:gap-16" style={{ animationDelay: '0.3s' }}>
              <div className="text-center">
                <div className="text-3xl font-bold text-patient">10K+</div>
                <div className="text-sm text-muted-foreground">Patients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-doctor">500+</div>
                <div className="text-sm text-muted-foreground">Doctors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-admin">50K+</div>
                <div className="text-sm text-muted-foreground">Appointments</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Everything You Need</h2>
          <p className="mt-4 text-muted-foreground">
            Comprehensive features designed for modern healthcare
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="animate-slide-up rounded-2xl border bg-card p-8 shadow-soft transition-all duration-300 hover:shadow-card hover:-translate-y-1"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="mb-4 inline-flex rounded-xl bg-secondary p-3">
                <feature.icon className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roles Preview */}
      <section className="bg-secondary/50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Designed for Everyone</h2>
            <p className="mt-4 text-muted-foreground">
              Tailored experiences for patients, doctors, and administrators
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-patient-light p-8 transition-transform hover:scale-105">
              <Users className="mb-4 h-10 w-10 text-patient" />
              <h3 className="text-xl font-bold text-patient-dark">For Patients</h3>
              <p className="mt-2 text-sm text-patient-dark/70">
                Book appointments, view records, and manage prescriptions
              </p>
            </div>
            <div className="rounded-2xl bg-doctor-light p-8 transition-transform hover:scale-105">
              <Heart className="mb-4 h-10 w-10 text-doctor" />
              <h3 className="text-xl font-bold text-doctor-dark">For Doctors</h3>
              <p className="mt-2 text-sm text-doctor-dark/70">
                Manage appointments, patient data, and write prescriptions
              </p>
            </div>
            <div className="rounded-2xl bg-admin-light p-8 transition-transform hover:scale-105">
              <Shield className="mb-4 h-10 w-10 text-admin" />
              <h3 className="text-xl font-bold text-admin-dark">For Admins</h3>
              <p className="mt-2 text-sm text-admin-dark/70">
                Oversee operations, manage users, and view analytics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="rounded-3xl gradient-hero p-12 text-center text-white">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mt-4 text-white/80">
            Join thousands of users who trust MediSlot 360 for their healthcare needs
          </p>
          <Button
            variant="secondary"
            size="xl"
            className="mt-8 bg-white text-foreground hover:bg-white/90"
            onClick={() => navigate('/auth/select-role')}
          >
            Create Your Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 MediSlot 360. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
