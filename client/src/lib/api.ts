import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface DocumentItem {
  _id: string;
  title: string;
  content: string;
  ownerId: string;
  sharedWith: string[];
  createdAt: string;
  updatedAt: string;
}

export const fetchDocuments = async (userId: string) => {
  const response = await api.get(`/docs?userId=${userId}`);
  return response.data.data as DocumentItem[];
};

export const getDocumentById = async (id: string) => {
  const response = await api.get(`/docs/${id}`);
  return response.data.data as DocumentItem;
};

export const createDocument = async (title: string, ownerId: string, content = '') => {
  const response = await api.post('/docs', { title, ownerId, content });
  return response.data.data as DocumentItem;
};

export const updateDocument = async (id: string, title: string, content: string) => {
  const response = await api.put(`/docs/${id}`, { title, content });
  return response.data.data as DocumentItem;
};

export const deleteDocument = async (id: string) => {
  const response = await api.delete(`/docs/${id}`);
  return response.data;
};

export const shareDocument = async (id: string, targetUserId: string) => {
  const response = await api.post(`/docs/${id}/share`, { targetUserId });
  return response.data;
};

export const uploadFile = async (file: File, ownerId: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('ownerId', ownerId);

  const response = await api.post('/docs/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data as DocumentItem;
};