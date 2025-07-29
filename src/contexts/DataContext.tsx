import React, { createContext, useContext, useState } from 'react';
import { Intern, Mentor } from '@/types';

interface DataContextType {
  interns: Intern[];
  mentors: Mentor[];
  addIntern: (intern: Omit<Intern, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateIntern: (id: string, updates: Partial<Intern>) => void;
  assignMentor: (internId: string, mentorId: string, mentorName: string) => void;
  acceptIntern: (internId: string, project: string) => void;
  rejectIntern: (internId: string, remarks: string, alternativeMentor: string) => void;
  completeInternship: (internId: string, remarks: string, attendance: number, projectReportSubmitted: boolean) => void;
  issueCertificate: (internId: string, hrRemarks: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock data
const initialMentors: Mentor[] = [
  {
    id: '2',
    name: 'Dr. Michael Chen',
    email: 'mentor1@company.com',
    department: 'Engineering',
    specialization: 'Software Development'
  },
  {
    id: '3',
    name: 'Prof. Emma Wilson',
    email: 'mentor2@company.com',
    department: 'Design',
    specialization: 'UI/UX Design'
  },
  {
    id: '4',
    name: 'Dr. James Rodriguez',
    email: 'mentor3@company.com',
    department: 'Data Science',
    specialization: 'Machine Learning'
  }
];

const initialInterns: Intern[] = [
  {
    id: '1',
    name: 'Alex Kumar',
    age: 21,
    address: '123 Student St, College Town',
    mobile: '+1-555-0101',
    email: 'alex.kumar@student.edu',
    qualification: 'B.Tech Computer Science',
    grades: '8.5 CGPA',
    aadhaar: '1234-5678-9012',
    college: 'Tech University',
    status: 'ongoing',
    assignedMentor: 'Dr. Michael Chen',
    mentorId: '2',
    project: 'E-commerce Website Development',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '2',
    name: 'Priya Sharma',
    age: 20,
    address: '456 Campus Rd, University City',
    mobile: '+1-555-0102',
    email: 'priya.sharma@student.edu',
    qualification: 'B.Des Visual Design',
    grades: '9.0 CGPA',
    aadhaar: '2345-6789-0123',
    college: 'Design Institute',
    status: 'completed',
    assignedMentor: 'Prof. Emma Wilson',
    mentorId: '3',
    project: 'Mobile App UI Design',
    mentorRemarks: 'Excellent work on user interface design. Very creative and detail-oriented.',
    attendance: 95,
    projectReportSubmitted: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-02-28')
  },
  {
    id: '3',
    name: 'Rahul Patel',
    age: 22,
    address: '789 Academic Ave, Study City',
    mobile: '+1-555-0103',
    email: 'rahul.patel@student.edu',
    qualification: 'B.Tech Information Technology',
    grades: '8.2 CGPA',
    aadhaar: '3456-7890-1234',
    college: 'Engineering College',
    status: 'new',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [interns, setInterns] = useState<Intern[]>(initialInterns);
  const [mentors] = useState<Mentor[]>(initialMentors);

  const addIntern = (internData: Omit<Intern, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newIntern: Intern = {
      ...internData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setInterns(prev => [...prev, newIntern]);
  };

  const updateIntern = (id: string, updates: Partial<Intern>) => {
    setInterns(prev => prev.map(intern => 
      intern.id === id 
        ? { ...intern, ...updates, updatedAt: new Date() }
        : intern
    ));
  };

  const assignMentor = (internId: string, mentorId: string, mentorName: string) => {
    updateIntern(internId, {
      status: 'assigned',
      mentorId,
      assignedMentor: mentorName
    });
  };

  const acceptIntern = (internId: string, project: string) => {
    updateIntern(internId, {
      status: 'ongoing',
      project
    });
  };

  const rejectIntern = (internId: string, remarks: string, alternativeMentor: string) => {
    updateIntern(internId, {
      status: 'rejected',
      rejectionRemarks: remarks,
      alternativeMentor
    });
  };

  const completeInternship = (internId: string, remarks: string, attendance: number, projectReportSubmitted: boolean) => {
    updateIntern(internId, {
      status: 'completed',
      mentorRemarks: remarks,
      attendance,
      projectReportSubmitted
    });
  };

  const issueCertificate = (internId: string, hrRemarks: string) => {
    updateIntern(internId, {
      certificateIssued: true,
      hrRemarks
    });
  };

  return (
    <DataContext.Provider value={{
      interns,
      mentors,
      addIntern,
      updateIntern,
      assignMentor,
      acceptIntern,
      rejectIntern,
      completeInternship,
      issueCertificate
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};