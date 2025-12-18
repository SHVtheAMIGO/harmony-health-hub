import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ProgressBar from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Heart, ArrowRight, Users, Search, MoreHorizontal, Check, X, Shield } from 'lucide-react';
import { mockUsers } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const steps = ['Manage Users', 'Manage Slots', 'Reports', 'Analytics', 'Complete'];

const ManageUsers = () => {
  const navigate = useNavigate();
  const { currentStep, setCurrentStep, logout } = useAuth();
  const { toast } = useToast();
  
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const toggleUserStatus = (id: number) => {
    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u))
    );
    toast({
      title: 'User Updated',
      description: 'User status has been updated successfully',
    });
  };

  const handleNext = () => {
    setCurrentStep(2);
    navigate('/admin/onboarding/slots');
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
            <div className="gradient-admin rounded-xl p-2">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold">MediCare</span>
            <span className="text-muted-foreground">| Admin Portal</span>
          </div>
          <Button variant="ghost" onClick={handleLogout}>Logout</Button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="container mx-auto px-4">
        <ProgressBar steps={steps} currentStep={currentStep} role="admin" />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-slide-up flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Manage Users</h1>
              <p className="text-muted-foreground mt-2">View and manage all platform users</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{filteredUsers.length} users</span>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'patient', 'doctor'].map(role => (
                <Button
                  key={role}
                  variant={filterRole === role ? 'admin' : 'outline'}
                  size="sm"
                  onClick={() => setFilterRole(role)}
                >
                  {role === 'all' ? 'All Users' : `${role.charAt(0).toUpperCase() + role.slice(1)}s`}
                </Button>
              ))}
            </div>
          </div>

          {/* Users Table */}
          <div className="mt-6 animate-slide-up rounded-2xl border bg-card shadow-soft overflow-hidden" style={{ animationDelay: '0.2s' }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="text-left p-4 font-semibold">User</th>
                    <th className="text-left p-4 font-semibold">Role</th>
                    <th className="text-left p-4 font-semibold">Status</th>
                    <th className="text-left p-4 font-semibold">Join Date</th>
                    <th className="text-right p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr
                      key={user.id}
                      className="border-t hover:bg-secondary/50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            'rounded-full p-2',
                            user.role === 'doctor' ? 'bg-doctor-light' : 'bg-patient-light'
                          )}>
                            <Users className={cn(
                              'h-4 w-4',
                              user.role === 'doctor' ? 'text-doctor' : 'text-patient'
                            )} />
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={cn(
                          'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
                          user.role === 'doctor' ? 'bg-doctor-light text-doctor' : 'bg-patient-light text-patient'
                        )}>
                          {user.role === 'doctor' ? '👨‍⚕️' : '👤'} {user.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={cn(
                          'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
                          user.status === 'active' ? 'bg-patient-light text-patient' : 'bg-destructive/10 text-destructive'
                        )}>
                          {user.status === 'active' ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          {user.status}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {new Date(user.joinDate).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <Button
                          variant={user.status === 'active' ? 'outline' : 'admin'}
                          size="sm"
                          onClick={() => toggleUserStatus(user.id)}
                        >
                          {user.status === 'active' ? 'Disable' : 'Enable'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-end">
            <Button variant="admin" onClick={handleNext}>
              Next: Manage Slots
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageUsers;
