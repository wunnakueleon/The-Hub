import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "./components/layout/AppLayout";
import { AdminLayout } from "./components/layout/AdminLayout";
import { AuthLayout } from "./components/layout/AuthLayout";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";

import DashboardPage from "./pages/admin/DashboardPage";
import ManageEventsPage from "./pages/admin/ManageEventsPage";
import RegistrationsPage from "./pages/admin/RegistrationsPage";
import UsersPage from "./pages/admin/UsersPage";

export const router = createBrowserRouter([
  {
    // Public site (Nav + Footer)
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/events", element: <EventsPage /> },
      { path: "/events/:id", element: <EventDetailPage /> },
      { path: "/my-bookings", element: <MyBookingsPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    // Auth (split-screen, no site chrome)
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
    ],
  },
  {
    // Admin (sidebar shell)
    element: <AdminLayout />,
    children: [
      { path: "/admin", element: <DashboardPage /> },
      { path: "/admin/events", element: <ManageEventsPage /> },
      { path: "/admin/events/:id", element: <RegistrationsPage /> },
      { path: "/admin/users", element: <UsersPage /> },
    ],
  },
]);
