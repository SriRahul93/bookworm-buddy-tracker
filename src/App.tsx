
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Books from "./pages/Books";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { LibraryProvider, useLibrary } from "./contexts/LibraryContext";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'student';
}) => {
  const { user, isLoading } = useLibrary();

  // If authentication is still loading, show nothing
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If a specific role is required and user doesn't have it
  if (requiredRole && user.role !== requiredRole) {
    // Redirect students to student dashboard and admins to admin dashboard
    return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const { user, isLoading } = useLibrary();

  // Redirect based on user role
  const redirectPath = user ? (user.role === 'admin' ? '/admin' : '/dashboard') : '/login';

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/books" element={<Books />} />
      
      {/* Protected student routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute requiredRole="student">
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/profile" 
        element={
          <ProtectedRoute requiredRole="student">
            <ProfilePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/settings" 
        element={
          <ProtectedRoute requiredRole="student">
            <SettingsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/books" 
        element={
          <ProtectedRoute requiredRole="student">
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/fines" 
        element={
          <ProtectedRoute requiredRole="student">
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/history" 
        element={
          <ProtectedRoute requiredRole="student">
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Protected admin routes */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/profile" 
        element={
          <ProtectedRoute requiredRole="admin">
            <ProfilePage isAdmin={true} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/settings" 
        element={
          <ProtectedRoute requiredRole="admin">
            <SettingsPage isAdmin={true} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/books" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/add-book" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/students" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/transactions" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/fines" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Catch-all and 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LibraryProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </LibraryProvider>
  </QueryClientProvider>
);

export default App;
