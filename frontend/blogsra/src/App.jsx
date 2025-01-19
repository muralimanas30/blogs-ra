import React, { Suspense } from 'react';
import { createHashRouter,  Outlet, RouterProvider } from 'react-router-dom';

import GoogleCallback from './services/GoogleCallback';

import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import ContactUs from './pages/ContactUs/ContactUs';
import About from './pages/About/About';
import Login from './pages/Login/LoginPage';
import Register from './pages/Register/RegisterPage';
import './App.css';
import './index.css';
import NotFound from './pages/NotFound/NotFound';
import AccountPage from './pages/AccountPage/AccountPage';
import PublicProfile from './pages/PublicProfile/PublicProfile';
import Loader from './components/Loader/Loader';
import CustomError from './pages/CustomError/CustomError';
import SearchBox from './components/SearchBox/SearchBox';
import SearchUser from './pages/SearchUser/SearchUser';



const App = () => {

  const router = createHashRouter([
    {
      path: "/",
      element: (
        <div className="app-container">
          <Header />
          <Navbar />
          <Outlet />
          <Footer />
        </div>
      ),
      children: [
        {
          index: true,
          path:'/',
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
          element: <AccountPage />,
        },
        {
          path:"/user/:userId",
          element:<PublicProfile/>
        },
        {
          path:'/search',
          element:<SearchUser/>
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
      errorElement : <CustomError/>
    },
    {
      path: "/login",
      element: <Login />,
      errorElement : <CustomError/>
    },
    {
      path: "/register",
      element: <Register />,
      errorElement : <CustomError/>
    },
    {
      path: "/google/callback",
      element: <GoogleCallback />,
      errorElement : <CustomError/>
    },
    {
      path :"/ce",
      element:<CustomError/>
    },

    {
      path :"*",
      element:<NotFound/>
    }
  ]);



  
  return (
    
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
  );
};

export default App;
