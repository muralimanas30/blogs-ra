import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import './index.css';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthProvider from './context/AuthContext';
import AccountProvider from './context/AccountContext.jsx';
import React from 'react';



const queryClient = new QueryClient();
const clientId = import.meta.env.VITE_CLIENT_ID; // Ensure this is set in your .env

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <AuthProvider>
      <AccountProvider>
        <QueryClientProvider client={queryClient}>
          <GoogleOAuthProvider clientId={clientId}>
            <App />
            {/* <ReactQueryDevtools /> */}
          </GoogleOAuthProvider>
          <ToastContainer />
        </QueryClientProvider>
      </AccountProvider>
    </AuthProvider>
  </StrictMode>
);
