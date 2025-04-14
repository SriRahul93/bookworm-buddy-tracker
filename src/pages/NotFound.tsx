
import { Link } from "react-router-dom";
import { BookX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md animate-fade-in">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-library-purple/10 mb-6">
          <BookX className="h-10 w-10 text-library-purple" />
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">404</h1>
        
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        
        <p className="text-gray-600 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button className="gradient-bg hover:opacity-90 transition-opacity">
              Return to Home
            </Button>
          </Link>
          
          <Link to="/books">
            <Button variant="outline">
              Browse Books
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
