
export type Page = 'Dashboard' | 'Scholarship Finder' | 'Application Tracker' | 'Document Center' | 'Analytics' | 'AI Assistant';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Scholarship {
  _id?: string;
  id?: number;
  title: string;
  provider: string;
  amount: number;
  deadline: string;
  description: string;
  eligibility: string;
  createdAt?: string;
}

export type ApplicationStatus = 'Not Started' | 'In Progress' | 'Submitted' | 'Awarded' | 'Rejected';

export interface Application {
  _id?: string;
  id?: number;
  userId?: string;
  scholarshipId?: string;
  scholarshipTitle: string;
  status: ApplicationStatus;
  deadline: string;
  submittedDate?: string;
  createdAt?: string;
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}
