import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';

import GoogleCallback from './services/GoogleCallback';
import AuthProvider from './context/AuthContext';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import ContactUs from './pages/ContactUs/ContactUs';
import About from './pages/About/About';
import Login from './pages/Login/LoginPage'
import Register from './pages/Register/RegisterPage'
import './App.css'
import './index.css'
import NotFound from './pages/NotFound/NotFound';
import AccountPage from './pages/AccountPage/AccountPage';
const Loader = () => {
  return <div className="loader">Loading...</div>;
};


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className='app-container'>
                      {/* <div id="background"></div>
            <div id="midground"></div>
            <div id="foreground"></div> */}
          <Header />
          <Navbar />
          <Outlet />
          <Footer />
        </div>
      ),
      children: [
        {
          index: true,
          // path:'/home',
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact-us",
          element: <ContactUs />,
        },
        {
          path: "/account",
          element: <AccountPage/>
        },

        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: '/google/callback',
      element: <GoogleCallback />
    }
  ]);

  return (
    <AuthProvider>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  );
};

export default App;
