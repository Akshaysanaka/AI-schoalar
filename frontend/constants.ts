
import { Scholarship, Application, ApplicationStatus } from './types';

export const MOCK_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 1,
    title: 'Future Leaders STEM Scholarship',
    provider: 'Tech Innovations Inc.',
    amount: 10000,
    deadline: '2024-12-15',
    description: 'For outstanding students pursuing degrees in Science, Technology, Engineering, or Mathematics.',
    eligibility: 'Minimum 3.5 GPA, enrolled in a STEM field, demonstrated leadership skills.'
  },
  {
    id: 2,
    title: 'Creative Minds Art Grant',
    provider: 'The Art Foundation',
    amount: 5000,
    deadline: '2024-11-30',
    description: 'Supporting talented young artists in visual and performing arts.',
    eligibility: 'Submission of a portfolio, major in an arts-related field.'
  },
  {
    id: 3,
    title: 'Community First Responders Fund',
    provider: 'National Volunteer Board',
    amount: 7500,
    deadline: '2025-01-20',
    description: 'A scholarship for students who have shown a commitment to community service and volunteerism.',
    eligibility: 'Minimum 100 hours of documented volunteer work in the last 2 years.'
  },
  {
    id: 4,
    title: 'First Generation Scholars Program',
    provider: 'Higher Education Alliance',
    amount: 8000,
    deadline: '2024-12-01',
    description: 'Financial assistance for students who are the first in their family to attend college.',
    eligibility: 'Must be a first-generation college student, financial need required.'
  },
  {
    id: 5,
    title: 'Business Excellence Award',
    provider: 'Global Commerce Group',
    amount: 12000,
    deadline: '2025-02-01',
    description: 'Awarded to ambitious students pursuing a degree in business, finance, or economics.',
    eligibility: 'Enrolled in a business-related major, minimum 3.2 GPA.'
  }
];

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 1,
    scholarshipTitle: 'Future Leaders STEM Scholarship',
    status: 'In Progress',
    deadline: '2024-12-15'
  },
  {
    id: 2,
    scholarshipTitle: 'Creative Minds Art Grant',
    status: 'Submitted',
    deadline: '2024-11-30',
    submittedDate: '2024-11-10'
  },
  {
    id: 3,
    scholarshipTitle: 'Community First Responders Fund',
    status: 'Awarded',
    deadline: '2025-01-20',
    submittedDate: '2024-10-25'
  },
  {
    id: 4,
    scholarshipTitle: 'First Generation Scholars Program',
    status: 'Not Started',
    deadline: '2024-12-01'
  }
];

export const STATUS_COLORS: { [key in ApplicationStatus]: string } = {
  'Not Started': 'bg-gray-200 text-gray-800',
  'In Progress': 'bg-blue-200 text-blue-800',
  'Submitted': 'bg-yellow-200 text-yellow-800',
  'Awarded': 'bg-green-200 text-green-800',
  'Rejected': 'bg-red-200 text-red-800'
};
