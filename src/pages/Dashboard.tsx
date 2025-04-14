
import { useEffect, useState } from "react";
import { useLibrary } from "@/contexts/LibraryContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpenText, Clock, CircleDollarSign, LibraryBig, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

// Helper to calculate days left
const calculateDaysLeft = (dueDate: string) => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Helper to format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const Dashboard = () => {
  const { user, issuedBooks, returnBook } = useLibrary();
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    if (issuedBooks.length > 0) {
      // Generate sample chart data based on issued books
      const data = [
        { month: 'Jan', books: 3, fines: 0 },
        { month: 'Feb', books: 2, fines: 0 },
        { month: 'Mar', books: 4, fines: 2.50 },
        { month: 'Apr', books: issuedBooks.length, fines: 0 },
      ];
      setChartData(data);
    }
  }, [issuedBooks]);

  if (!user) return null;

  // Calculate summary statistics
  const totalCurrentBooks = issuedBooks.length;
  const booksOverdue = issuedBooks.filter(book => calculateDaysLeft(book.dueDate) < 0).length;
  const totalFines = issuedBooks.reduce((sum, book) => sum + book.fine, 0);
  
  return (
    <DashboardLayout pageTitle="Student Dashboard">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Books</CardTitle>
            <BookOpenText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCurrentBooks}</div>
            <p className="text-xs text-muted-foreground">
              {totalCurrentBooks === 1 ? 'Book' : 'Books'} currently borrowed
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Books Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{booksOverdue}</div>
            <p className="text-xs text-muted-foreground">
              {booksOverdue === 1 ? 'Book is' : 'Books are'} past due date
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Fines</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalFines.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Current accumulated fines
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Reading Status</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <p className="text-xs text-muted-foreground mb-2">
              Average completion
            </p>
            <Progress value={75} className="h-2" />
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content Tabs */}
      <Tabs defaultValue="current" className="space-y-6">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="current">Current Books</TabsTrigger>
          <TabsTrigger value="history">Borrowing History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        {/* Current Books Tab */}
        <TabsContent value="current" className="space-y-6 animate-fade-in">
          <h2 className="text-xl font-semibold">Currently Borrowed Books</h2>
          
          {issuedBooks.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <LibraryBig className="h-12 w-12 mx-auto text-gray-400 mb-2" />
              <h3 className="text-lg font-medium">No books currently borrowed</h3>
              <p className="text-sm text-gray-500 mt-1">Visit the library to borrow books.</p>
              <Button variant="outline" className="mt-4" onClick={() => window.location.href = '/books'}>
                Browse Books
              </Button>
            </div>
          ) : (
            <div className="grid gap-6">
              {issuedBooks.map((issue) => {
                const daysLeft = calculateDaysLeft(issue.dueDate);
                let statusColor = "bg-green-100 text-green-800";
                let status = "On Time";
                
                if (daysLeft < 0) {
                  statusColor = "bg-red-100 text-red-800";
                  status = `Overdue by ${Math.abs(daysLeft)} ${Math.abs(daysLeft) === 1 ? 'day' : 'days'}`;
                } else if (daysLeft <= 3) {
                  statusColor = "bg-amber-100 text-amber-800";
                  status = `Due in ${daysLeft} ${daysLeft === 1 ? 'day' : 'days'}`;
                }
                
                return (
                  <Card key={issue.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4">
                        <img 
                          src={issue.bookDetails.coverImage} 
                          alt={issue.bookDetails.title}
                          className="h-full w-full object-cover aspect-[3/4]" 
                        />
                      </div>
                      <div className="md:w-3/4 p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{issue.bookDetails.title}</h3>
                            <p className="text-sm text-gray-600">by {issue.bookDetails.author}</p>
                          </div>
                          <Badge className={cn(statusColor, "font-normal")}>{status}</Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div>
                            <p className="text-xs text-gray-500">Issue Date</p>
                            <p className="text-sm">{formatDate(issue.issueDate)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Due Date</p>
                            <p className="text-sm">{formatDate(issue.dueDate)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Fine</p>
                            <p className="text-sm">${issue.fine.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Category</p>
                            <p className="text-sm">{issue.bookDetails.category}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex">
                          <Button 
                            size="sm" 
                            onClick={() => returnBook(issue.id)}
                          >
                            Return Book
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
        
        {/* Borrowing History Tab */}
        <TabsContent value="history" className="animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">Borrowing History</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Books</CardTitle>
              <CardDescription>History of your past borrowings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border-b">
                  <div>
                    <p className="font-medium">Introduction to Algorithms</p>
                    <p className="text-sm text-gray-500">Borrowed: Feb 15, 2025 - Mar 15, 2025</p>
                  </div>
                  <Badge variant="secondary">Returned</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border-b">
                  <div>
                    <p className="font-medium">Clean Architecture</p>
                    <p className="text-sm text-gray-500">Borrowed: Jan 10, 2025 - Feb 10, 2025</p>
                  </div>
                  <Badge variant="secondary">Returned</Badge>
                </div>
                <div className="flex items-center justify-between p-3">
                  <div>
                    <p className="font-medium">The Pragmatic Programmer</p>
                    <p className="text-sm text-gray-500">Borrowed: Dec 5, 2024 - Jan 5, 2025</p>
                  </div>
                  <Badge variant="secondary">Returned</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Analytics Tab */}
        <TabsContent value="analytics" className="animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">Your Library Analytics</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Books Borrowed</CardTitle>
                <CardDescription>Monthly borrowing trend</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="books" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Fines Incurred</CardTitle>
                <CardDescription>Monthly fines overview</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="fines" fill="#EC4899" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Dashboard;
