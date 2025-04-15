
import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { BookOpen, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLibrary } from "@/contexts/LibraryContext";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const { user } = useLibrary();

  // If user is already logged in, redirect to appropriate dashboard
  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Return to page button */}
      <div className="absolute top-4 left-4">
        <Link 
          to="/" 
          className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Return to Home
        </Link>
      </div>
      
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <div className="flex justify-center">
              <BookOpen className="h-12 w-12 text-primary" />
            </div>
            <h2 className="mt-3 text-3xl font-bold text-primary">
              Welcome to LibTrack
            </h2>
            <p className="mt-2 text-gray-600">
              {isRegistering 
                ? "Create an account to start managing your library books."
                : "Sign in to manage your library books and fines."}
            </p>
          </div>

          <Card className="shadow-lg border-none">
            {isRegistering ? (
              <RegisterForm onBackToLogin={() => setIsRegistering(false)} />
            ) : (
              <LoginForm onCreateAccount={() => setIsRegistering(true)} />
            )}
          </Card>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} LibTrack • All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
