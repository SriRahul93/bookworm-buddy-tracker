
import { useEffect, useState } from "react";
import { 
  BookOpenText, 
  Home, 
  LayoutDashboard, 
  LibraryBig, 
  LogOut, 
  Menu, 
  Settings, 
  User, 
  CircleDollarSign, 
  Clock, 
  Users,
  BookPlus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useLibrary } from "@/contexts/LibraryContext";

interface SidebarProps {
  isAdmin?: boolean;
}

const DashboardSidebar = ({ isAdmin = false }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { logout } = useLibrary();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const studentLinks = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Browse Books", icon: LibraryBig, path: "/books" },
    { name: "My Books", icon: BookOpenText, path: "/dashboard/books" },
    { name: "My Fines", icon: CircleDollarSign, path: "/dashboard/fines" },
    { name: "History", icon: Clock, path: "/dashboard/history" },
    { name: "Profile", icon: User, path: "/dashboard/profile" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  const adminLinks = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "Books", icon: LibraryBig, path: "/admin/books" },
    { name: "Add Book", icon: BookPlus, path: "/admin/add-book" },
    { name: "Students", icon: Users, path: "/admin/students" },
    { name: "Issue/Return", icon: BookOpenText, path: "/admin/transactions" },
    { name: "Fines", icon: CircleDollarSign, path: "/admin/fines" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  const links = isAdmin ? adminLinks : studentLinks;

  return (
    <>
      {/* Mobile overlay */}
      {!collapsed && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      <aside
        className={cn(
          "h-screen fixed top-0 left-0 z-30 bg-white shadow-lg flex flex-col transition-all duration-300",
          collapsed 
            ? "w-[70px]" 
            : "w-64",
          isMobile && collapsed && "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          {!collapsed && (
            <Link to="/" className="flex items-center">
              <BookOpenText className="h-6 w-6 text-library-purple" />
              <span className="ml-2 font-bold text-lg gradient-text">LibTrack</span>
            </Link>
          )}
          <button 
            onClick={toggleSidebar}
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-2">
            <li>
              <Link to="/" className={cn(
                "flex items-center py-2 px-3 rounded-md transition-colors",
                collapsed ? "justify-center" : "justify-start",
                "hover:bg-secondary text-gray-700 hover:text-library-purple"
              )}>
                <Home className="h-5 w-5" />
                {!collapsed && <span className="ml-3">Home</span>}
              </Link>
            </li>
            
            {links.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path}
                  className={cn(
                    "flex items-center py-2 px-3 rounded-md transition-colors",
                    collapsed ? "justify-center" : "justify-start",
                    location.pathname === link.path 
                      ? "bg-secondary text-library-purple font-medium" 
                      : "hover:bg-secondary text-gray-700 hover:text-library-purple"
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  {!collapsed && <span className="ml-3">{link.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="py-4 px-3 border-t">
          <button 
            onClick={logout}
            className={cn(
              "flex items-center py-2 px-3 rounded-md transition-colors w-full",
              collapsed ? "justify-center" : "justify-start",
              "hover:bg-secondary text-gray-700 hover:text-red-500"
            )}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </aside>
      
      {/* Mobile toggle button */}
      {collapsed && isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed bottom-4 left-4 lg:hidden z-20 p-3 rounded-full bg-library-purple text-white shadow-lg hover:bg-opacity-90 transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
      )}
    </>
  );
};

export default DashboardSidebar;
