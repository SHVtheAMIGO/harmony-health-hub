// Mock data for the healthcare app

export const mockTimeSlots = [
  { id: 1, time: '09:00 AM', period: 'morning', available: true },
  { id: 2, time: '09:30 AM', period: 'morning', available: true },
  { id: 3, time: '10:00 AM', period: 'morning', available: false },
  { id: 4, time: '10:30 AM', period: 'morning', available: true },
  { id: 5, time: '11:00 AM', period: 'morning', available: true },
  { id: 6, time: '11:30 AM', period: 'morning', available: false },
  { id: 7, time: '02:00 PM', period: 'afternoon', available: true },
  { id: 8, time: '02:30 PM', period: 'afternoon', available: true },
  { id: 9, time: '03:00 PM', period: 'afternoon', available: true },
  { id: 10, time: '03:30 PM', period: 'afternoon', available: false },
  { id: 11, time: '04:00 PM', period: 'afternoon', available: true },
  { id: 12, time: '05:00 PM', period: 'evening', available: true },
  { id: 13, time: '05:30 PM', period: 'evening', available: true },
  { id: 14, time: '06:00 PM', period: 'evening', available: false },
  { id: 15, time: '06:30 PM', period: 'evening', available: true },
];

export const mockDoctors = [
  { id: 1, name: 'Dr. Sarah Johnson', specialty: 'General Physician', avatar: '👩‍⚕️' },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'Cardiologist', avatar: '👨‍⚕️' },
  { id: 3, name: 'Dr. Emily Williams', specialty: 'Dermatologist', avatar: '👩‍⚕️' },
  { id: 4, name: 'Dr. James Brown', specialty: 'Orthopedist', avatar: '👨‍⚕️' },
];

export const mockMedicalRecords = [
  {
    id: 1,
    date: '2024-01-15',
    doctor: 'Dr. Sarah Johnson',
    diagnosis: 'Common Cold',
    summary: 'Patient presented with mild fever, runny nose, and sore throat.',
    details: 'Vital signs: BP 120/80, Temp 99.5°F, Pulse 72. Prescribed rest and fluids. Follow-up in 1 week if symptoms persist.',
    prescriptions: [
      { medicine: 'Paracetamol', dosage: '500mg', duration: '5 days', instructions: 'Take twice daily after meals' },
      { medicine: 'Vitamin C', dosage: '1000mg', duration: '7 days', instructions: 'Take once daily' },
    ],
  },
  {
    id: 2,
    date: '2024-02-20',
    doctor: 'Dr. Michael Chen',
    diagnosis: 'Routine Checkup',
    summary: 'Annual cardiovascular health assessment.',
    details: 'ECG normal, cholesterol levels within range. Recommended continued exercise and healthy diet.',
    prescriptions: [
      { medicine: 'Omega-3', dosage: '1000mg', duration: '30 days', instructions: 'Take once daily with food' },
    ],
  },
  {
    id: 3,
    date: '2024-03-10',
    doctor: 'Dr. Emily Williams',
    diagnosis: 'Allergic Dermatitis',
    summary: 'Skin rash on forearms due to contact allergy.',
    details: 'Patch testing revealed sensitivity to nickel. Advised to avoid contact with metal jewelry.',
    prescriptions: [
      { medicine: 'Hydrocortisone Cream', dosage: '1%', duration: '14 days', instructions: 'Apply to affected area twice daily' },
      { medicine: 'Cetirizine', dosage: '10mg', duration: '7 days', instructions: 'Take once at bedtime' },
    ],
  },
];

export const mockNotifications = [
  { id: 1, type: 'appointment', message: 'Your appointment with Dr. Sarah Johnson is confirmed for tomorrow at 10:00 AM', time: '2 hours ago', read: false },
  { id: 2, type: 'prescription', message: 'Your prescription has been updated. View details in your records.', time: '5 hours ago', read: false },
  { id: 3, type: 'reminder', message: 'Remember to take your evening medication', time: '1 day ago', read: true },
  { id: 4, type: 'update', message: 'Dr. Michael Chen has added notes to your last visit', time: '2 days ago', read: true },
  { id: 5, type: 'appointment', message: 'Upcoming appointment reminder: Routine checkup on March 25th', time: '3 days ago', read: true },
];

export const mockPatients = [
  { id: 1, name: 'John Doe', age: 35, email: 'john@example.com', phone: '+1 234 567 8900', lastVisit: '2024-03-10' },
  { id: 2, name: 'Jane Smith', age: 28, email: 'jane@example.com', phone: '+1 234 567 8901', lastVisit: '2024-03-08' },
  { id: 3, name: 'Robert Wilson', age: 52, email: 'robert@example.com', phone: '+1 234 567 8902', lastVisit: '2024-03-05' },
  { id: 4, name: 'Emily Davis', age: 41, email: 'emily@example.com', phone: '+1 234 567 8903', lastVisit: '2024-03-01' },
];

export const mockAppointments = [
  { id: 1, patientId: 1, patientName: 'John Doe', time: '09:00 AM', date: '2024-03-20', status: 'upcoming', type: 'General Checkup' },
  { id: 2, patientId: 2, patientName: 'Jane Smith', time: '10:00 AM', date: '2024-03-20', status: 'upcoming', type: 'Follow-up' },
  { id: 3, patientId: 3, patientName: 'Robert Wilson', time: '11:30 AM', date: '2024-03-20', status: 'completed', type: 'Consultation' },
  { id: 4, patientId: 4, patientName: 'Emily Davis', time: '02:00 PM', date: '2024-03-20', status: 'cancelled', type: 'Routine Check' },
  { id: 5, patientId: 1, patientName: 'John Doe', time: '03:00 PM', date: '2024-03-21', status: 'upcoming', type: 'Lab Results' },
];

export const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'patient', status: 'active', joinDate: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'patient', status: 'active', joinDate: '2024-01-20' },
  { id: 3, name: 'Dr. Sarah Johnson', email: 'sarah@medicare.com', role: 'doctor', status: 'active', joinDate: '2023-06-01' },
  { id: 4, name: 'Dr. Michael Chen', email: 'michael@medicare.com', role: 'doctor', status: 'active', joinDate: '2023-07-15' },
  { id: 5, name: 'Robert Wilson', email: 'robert@example.com', role: 'patient', status: 'inactive', joinDate: '2024-02-10' },
];

export const mockAnalyticsData = {
  appointmentsPerDay: [
    { day: 'Mon', appointments: 12 },
    { day: 'Tue', appointments: 19 },
    { day: 'Wed', appointments: 15 },
    { day: 'Thu', appointments: 22 },
    { day: 'Fri', appointments: 18 },
    { day: 'Sat', appointments: 8 },
    { day: 'Sun', appointments: 5 },
  ],
  userActivity: [
    { month: 'Jan', patients: 120, doctors: 15 },
    { month: 'Feb', patients: 150, doctors: 18 },
    { month: 'Mar', patients: 180, doctors: 20 },
    { month: 'Apr', patients: 210, doctors: 22 },
    { month: 'May', patients: 250, doctors: 25 },
    { month: 'Jun', patients: 280, doctors: 28 },
  ],
  doctorWorkload: [
    { name: 'Dr. Johnson', appointments: 45 },
    { name: 'Dr. Chen', appointments: 38 },
    { name: 'Dr. Williams', appointments: 52 },
    { name: 'Dr. Brown', appointments: 41 },
  ],
};
