import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const backend_domain = import.meta.env.VITE_BACKEND_DOMAIN || 'http://localhost:3000';

// Custom hook for login
export const useLogin = (onSuccess, onError) =>
    useMutation(
        async ({ email, password }) => {
            const response = await axios.post(`${backend_domain}/api/v1/auth/login`, { email, password });
            return response.data;
        },
        { onSuccess, onError }
    );

// Custom hook for registration
export const useRegister = (onSuccess, onError) =>
    useMutation(
        async ({ name, email, password }) => {
            const response = await axios.post(`${backend_domain}/api/v1/auth/register`, { name, email, password });
            return response.data;
        },
        { onSuccess, onError }
    );
