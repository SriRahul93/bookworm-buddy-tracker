
import { ReactNode } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { useLibrary } from "@/contexts/LibraryContext";
import { Navigate } from "react-router-dom";
import { Bell, User } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
  isAdmin?: boolean;
  pageTitle?: string;
}

const DashboardLayout = ({ children, isAdmin = false, pageTitle = "Dashboard" }: DashboardLayoutProps) => {
  const { user, logout } = useLibrary();
  
  // If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  // If user is not admin but trying to access admin pages
  if (isAdmin && user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }
  
  // If admin is trying to access student pages
  if (!isAdmin && user.role === 'admin') {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar isAdmin={isAdmin} />
      
      <main className={cn("pt-6 px-4 sm:px-6 lg:pl-[70px] xl:pl-64")}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold gradient-text">{pageTitle}</h1>
            
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      2
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-[300px] overflow-y-auto">
                    <DropdownMenuItem className="py-3 cursor-pointer">
                      <div>
                        <p className="text-sm font-medium">Book due in 2 days</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          "Design Patterns" is due on April 16, 2025
                        </p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="py-3 cursor-pointer">
                      <div>
                        <p className="text-sm font-medium">Fine accumulated</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          You have a $2.50 fine on "Learning React"
                        </p>
                      </div>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
