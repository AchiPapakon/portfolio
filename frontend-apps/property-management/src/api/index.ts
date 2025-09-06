import axios from 'axios';
import type { CreateApartmentDto, User } from '../types';

const api = axios.create({
    baseURL: import.meta.env.VITE_REMOTE_HOST,
    withCredentials: true,
});

export const register = async (firstName: string, lastName: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { firstName, lastName, email, password });

    // TODO: do a basic password obfuscation with base64
    return response.data;
};

export const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
};

export const logout = async () => {
    const response = await api.post('/auth/logout');
    return response.data;
};

export const checkAuth = async () => {
    const response = await api.get('/auth/check');
    return response.data;
};

export const getApartments = async () => {
    const response = await api.get('/apartments');
    return response.data;
};

interface updateUserData extends User {
    password?: string;
}

export const updateSelf = async (data: Partial<updateUserData>) => {
    const response = await api.put(`/auth/update`, data);
    return response.data;
};

export const createApartment = async (data: CreateApartmentDto) => {
    const response = await api.post('/apartments', data);
    return response.data;
};
