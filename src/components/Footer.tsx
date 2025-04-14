
import { BookOpen, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-library-purple" />
              <span className="ml-2 text-xl font-bold gradient-text">LibTrack</span>
            </div>
            <p className="text-gray-600 text-sm max-w-xs">
              Your smart library companion that helps you track books, due dates, and manage fines effortlessly.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-library-purple transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-library-purple transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-library-purple transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2zm4 8h-2V11h-1v-1h1c.55 0 1-.45 1-1V7.5c0-.28.22-.5.5-.5H16v2h-2v6z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-library-purple transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/books" className="text-gray-600 hover:text-library-purple transition-colors">Browse Books</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-library-purple transition-colors">Sign In</Link>
              </li>
              <li>
                <Link to="#faq" className="text-gray-600 hover:text-library-purple transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="#contact" className="text-gray-600 hover:text-library-purple transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-library-purple mr-2 shrink-0 mt-0.5" />
                <span className="text-gray-600">123 University Ave, Campus Library Building</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-library-purple mr-2 shrink-0" />
                <span className="text-gray-600">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-library-purple mr-2 shrink-0" />
                <a href="mailto:support@libtrack.edu" className="text-gray-600 hover:text-library-purple transition-colors">support@libtrack.edu</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <p className="text-sm text-center text-gray-500">
            &copy; {new Date().getFullYear()} LibTrack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
