
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Menu, X } from "lucide-react";
import { useLibrary } from "@/contexts/LibraryContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useLibrary();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <BookOpen className="h-8 w-8 text-library-purple" />
              <span className="ml-2 text-xl font-bold gradient-text">LibTrack</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 text-sm font-medium hover:text-library-purple transition-colors">
              Home
            </Link>
            <Link to="/books" className="px-3 py-2 text-sm font-medium hover:text-library-purple transition-colors">
              Browse Books
            </Link>
            {!user ? (
              <Link to="/login">
                <Button variant="default" size="sm">
                  Sign In
                </Button>
              </Link>
            ) : (
              <>
                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'}>
                  <Button variant="outline" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Logout
                </Button>
              </>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-library-purple focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/books" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
              onClick={toggleMenu}
            >
              Browse Books
            </Link>
            {!user ? (
              <Link 
                to="/login" 
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-library-purple hover:bg-opacity-90"
                onClick={toggleMenu}
              >
                Sign In
              </Link>
            ) : (
              <>
                <Link 
                  to={user.role === 'admin' ? '/admin' : '/dashboard'} 
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
