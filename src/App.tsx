import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Pages
import Welcome from "./pages/Welcome";
import RoleSelection from "./pages/RoleSelection";
import Login from "./pages/Login";
import Exit from "./pages/Exit";
import NotFound from "./pages/NotFound";

// Patient Pages
import BookAppointment from "./pages/patient/BookAppointment";
import MedicalRecords from "./pages/patient/MedicalRecords";
import Prescriptions from "./pages/patient/Prescriptions";
import Notifications from "./pages/patient/Notifications";

// Doctor Pages
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import PatientData from "./pages/doctor/PatientData";
import DoctorPrescriptions from "./pages/doctor/DoctorPrescriptions";
import DoctorNotes from "./pages/doctor/DoctorNotes";

// Admin Pages
import ManageUsers from "./pages/admin/ManageUsers";
import ManageSlots from "./pages/admin/ManageSlots";
import Reports from "./pages/admin/Reports";
import Analytics from "./pages/admin/Analytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Welcome />} />
            <Route path="/auth/select-role" element={<RoleSelection />} />
            <Route path="/auth/login/:role" element={<Login />} />
            <Route path="/exit" element={<Exit />} />

            {/* Patient Routes */}
            <Route path="/patient/onboarding" element={<BookAppointment />} />
            <Route path="/patient/onboarding/records" element={<MedicalRecords />} />
            <Route path="/patient/onboarding/prescriptions" element={<Prescriptions />} />
            <Route path="/patient/onboarding/notifications" element={<Notifications />} />

            {/* Doctor Routes */}
            <Route path="/doctor/onboarding" element={<DoctorAppointments />} />
            <Route path="/doctor/onboarding/patients" element={<PatientData />} />
            <Route path="/doctor/onboarding/prescriptions" element={<DoctorPrescriptions />} />
            <Route path="/doctor/onboarding/notes" element={<DoctorNotes />} />

            {/* Admin Routes */}
            <Route path="/admin/onboarding" element={<ManageUsers />} />
            <Route path="/admin/onboarding/slots" element={<ManageSlots />} />
            <Route path="/admin/onboarding/reports" element={<Reports />} />
            <Route path="/admin/onboarding/analytics" element={<Analytics />} />

            {/* Catch All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
