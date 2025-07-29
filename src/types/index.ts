export interface User {
  id: string;
  name: string;
  email: string;
  role: 'hr_admin' | 'mentor';
}

export interface Intern {
  id: string;
  name: string;
  age: number;
  address: string;
  mobile: string;
  email: string;
  qualification: string;
  grades: string;
  aadhaar: string;
  photo?: string;
  college: string;
  status: 'new' | 'assigned' | 'accepted' | 'rejected' | 'ongoing' | 'completed';
  assignedMentor?: string;
  mentorId?: string;
  project?: string;
  rejectionRemarks?: string;
  alternativeMentor?: string;
  hrRemarks?: string;
  mentorRemarks?: string;
  attendance?: number;
  projectReportSubmitted?: boolean;
  certificateIssued?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Mentor {
  id: string;
  name: string;
  email: string;
  department: string;
  specialization: string;
}

export interface Certificate {
  id: string;
  internId: string;
  issueDate: Date;
  hrRemarks: string;
  status: 'issued' | 'cancelled';
}