import axios from 'axios';
import { User, AuthResponse, Scholarship, Application } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ai-schoalar-backend-81cj.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  signup: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/signup', { name, email, password });
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },
};

// Scholarships API
export const scholarshipsAPI = {
  getAll: async (): Promise<Scholarship[]> => {
    const response = await api.get('/scholarships');
    return response.data;
  },

  getById: async (id: string): Promise<Scholarship> => {
    const response = await api.get(`/scholarships/${id}`);
    return response.data;
  },

  create: async (scholarship: Omit<Scholarship, '_id' | 'createdAt'>): Promise<Scholarship> => {
    const response = await api.post('/scholarships', scholarship);
    return response.data;
  },

  update: async (id: string, scholarship: Partial<Scholarship>): Promise<Scholarship> => {
    const response = await api.put(`/scholarships/${id}`, scholarship);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/scholarships/${id}`);
  },
};

// Applications API
export const applicationsAPI = {
  getAll: async (): Promise<Application[]> => {
    const response = await api.get('/applications');
    return response.data;
  },

  create: async (application: {
    scholarshipId: string;
    scholarshipTitle: string;
    deadline: string;
  }): Promise<Application> => {
    const response = await api.post('/applications', application);
    return response.data;
  },

  update: async (id: string, application: Partial<Application>): Promise<Application> => {
    const response = await api.put(`/applications/${id}`, application);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/applications/${id}`);
  },
};

export default api;