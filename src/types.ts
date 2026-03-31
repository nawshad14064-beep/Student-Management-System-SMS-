export interface Grade {
  subject: string;
  score: number;
  weight: number;
  date: string;
}

export interface AttendanceLog {
  date: string;
  status: 'Present' | 'Absent' | 'Late';
}

export interface Invoice {
  id: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  description: string;
}

export interface ScheduleItem {
  id: string;
  day: string;
  time: string;
  subject: string;
  room: string;
  teacher: string;
  class: string;
}

export interface AdmissionApplication {
  id: string;
  name: string;
  email: string;
  course: string;
  status: 'Pending' | 'Reviewing' | 'Accepted' | 'Rejected';
  date: string;
  documents: string[];
}

export interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other' | '';
  nationality: string;
  bloodGroup: string;
  address: string;
  
  // Academic
  course: string;
  semester: string;
  section: string;
  advisor: string;
  enrollmentDate: string;
  status: 'Active' | 'Graduated' | 'On Leave' | 'Suspended' | 'Withdrawn' | 'Applicant';
  attendance: number;
  gpa: number;
  grades: Grade[];
  attendanceLogs: AttendanceLog[];
  
  // Guardian
  guardianName: string;
  guardianRelation: string;
  guardianPhone: string;
  guardianEmail: string;
  
  // Financial & Misc
  feeStatus: 'Paid' | 'Pending' | 'Overdue';
  invoices: Invoice[];
  scholarship: string;
  medicalConditions: string;
  emergencyContact: string;
  achievements: string;
  
  // Behavioral
  behavioralNotes: string[];
}

export type UserRole = 'Admin' | 'Teacher' | 'Student' | 'Parent';
export type ViewType = 'dashboard' | 'students' | 'admissions' | 'schedule' | 'finance' | 'analytics' | 'messages' | 'portal';
