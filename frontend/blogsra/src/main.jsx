import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import './index.css';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import React from 'react';

// Conditionally enable 'whyDidYouRender' for development environment

const queryClient = new QueryClient();
const clientId = import.meta.env.VITE_CLIENT_ID; // Ensure this is set in your .env

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={clientId}>
        <App />
      </GoogleOAuthProvider>
      <ToastContainer />
    </QueryClientProvider>
  </StrictMode>
);
