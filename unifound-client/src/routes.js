import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import DashboardApp from './pages/DashboardApp';
import LostFounds from './pages/LostFounds';
import Blog from './pages/StudyBuddy';
import User from './pages/User';
import NotFound from './pages/Page404';
import Profile from './pages/Profile';
import LFListing from './pages/LostFoundListing';
import Chats from './pages/Chats';
import MyLostFoundListings from './pages/MyLostFoundListings';
import MyStudyListings from './pages/MyStudyListings';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'lostfound', element: <LostFounds /> },
        { path: 'viewlostfound/:id', element: <LFListing /> },
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
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
