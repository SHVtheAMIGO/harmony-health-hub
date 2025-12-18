import React, { createContext, useContext, useState, useCallback } from 'react';

export type UserRole = 'patient' | 'doctor' | 'admin' | null;

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  setRole: (role: UserRole) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRoleState] = useState<UserRole>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const totalSteps = 5;

  const setRole = useCallback((newRole: UserRole) => {
    setRoleState(newRole);
  }, []);

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
      role,
    };
    
    setUser(mockUser);
    setCurrentStep(1);
    return true;
  }, [role]);

  const logout = useCallback(() => {
    setUser(null);
    setRoleState(null);
    setCurrentStep(1);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        setRole,
        login,
        logout,
        currentStep,
        setCurrentStep,
        totalSteps,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
