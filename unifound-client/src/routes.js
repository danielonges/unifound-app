/* eslint-disable prettier/prettier */
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register'
import DashboardApp from './pages/DashboardApp';
import LostFounds from './pages/LostFounds';
import Blog from './pages/StudyBuddy';
import NotFound from './pages/Page404';
import Profile from './pages/Profile';
import LFListing from './pages/LostFoundListing';
import Chats from './pages/Chats';
import MyLostFoundListings from './pages/MyLostFoundListings';
import MyStudyListings from './pages/MyStudyListings';
import Confessions from './pages/Confessions';
// ----------------------------------------------------------------------

export default function Router() {
  const sessionToken = localStorage.getItem('user');
  return useRoutes([
    {
      path: '/dashboard',
      element: sessionToken ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <Confessions /> },
        { path: 'lostfound', element: <LostFounds /> },
        { path: 'studybuddy', element: <Blog /> },
        { path: 'profile', element: <Profile /> },
        { path: 'chats', element: <Chats /> },
        { path: 'mystudylistings', element: <MyStudyListings /> },
        { path: 'mylostfoundlistings', element: <MyLostFoundListings /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
