
import { useState, useMemo } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BookOpenText, 
  LibraryBig, 
  Users, 
  CircleDollarSign, 
  ArrowUpRight, 
  Search,
  Filter
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useLibrary } from "@/contexts/LibraryContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Mock data for the admin dashboard
const recentTransactions = [
  { id: 1, book: "Design Patterns", student: "John Doe", type: "issue", date: "2025-04-10" },
  { id: 2, book: "Learning React", student: "Sarah Johnson", type: "return", date: "2025-04-09" },
  { id: 3, book: "Clean Code", student: "Michael Smith", type: "issue", date: "2025-04-09" },
  { id: 4, book: "Introduction to Algorithms", student: "Emily Davis", type: "return", date: "2025-04-08" },
  { id: 5, book: "The Pragmatic Programmer", student: "David Brown", type: "issue", date: "2025-04-07" }
];

const studentData = [
  { id: "S12345", name: "John Doe", email: "john.doe@example.com", department: "Computer Science", booksIssued: 2, fines: 0 },
  { id: "S12346", name: "Sarah Johnson", email: "sarah.j@example.com", department: "Literature", booksIssued: 1, fines: 0 },
  { id: "S12347", name: "Michael Smith", email: "michael.s@example.com", department: "Engineering", booksIssued: 3, fines: 2.5 },
  { id: "S12348", name: "Emily Davis", email: "emily.d@example.com", department: "Mathematics", booksIssued: 0, fines: 0 },
  { id: "S12349", name: "David Brown", email: "david.b@example.com", department: "Physics", booksIssued: 4, fines: 5 }
];

const monthlyStats = [
  { month: "Jan", issues: 15, returns: 12, fines: 25 },
  { month: "Feb", issues: 20, returns: 18, fines: 15 },
  { month: "Mar", issues: 25, returns: 23, fines: 30 },
  { month: "Apr", issues: 18, returns: 16, fines: 20 }
];

const categoryData = [
  { name: "Programming", value: 35 },
  { name: "Literature", value: 25 },
  { name: "Science", value: 20 },
  { name: "History", value: 15 },
  { name: "Other", value: 5 }
];

// Format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Colors for the pie chart
const COLORS = ['#8B5CF6', '#6366F1', '#4F46E5', '#EC4899', '#D6BCFA'];

const AdminDashboard = () => {
  const { books } = useLibrary();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter students based on search query
  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) return studentData;
    
    const query = searchQuery.toLowerCase();
    return studentData.filter(student => 
      student.name.toLowerCase().includes(query) ||
      student.id.toLowerCase().includes(query) ||
      student.department.toLowerCase().includes(query)
    );
  }, [searchQuery]);
  
  return (
    <DashboardLayout isAdmin pageTitle="Admin Dashboard">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <BookOpenText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{books.length}</div>
            <div className="flex items-center pt-1 text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>5% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Books Issued</CardTitle>
            <LibraryBig className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-center pt-1 text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>10% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentData.length}</div>
            <div className="flex items-center pt-1 text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>2% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Fines</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45.00</div>
            <div className="flex items-center pt-1 text-xs text-red-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>8% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest book issues and returns</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.book}</TableCell>
                    <TableCell>{transaction.student}</TableCell>
                    <TableCell>
                      <Badge variant={transaction.type === 'issue' ? 'default' : 'secondary'}>
                        {transaction.type === 'issue' ? 'Issued' : 'Returned'}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Books by Category</CardTitle>
            <CardDescription>Distribution of books by category</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Monthly Stats Chart */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Monthly Statistics</CardTitle>
          <CardDescription>Book issues, returns, and fines collected over time</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="issues" fill="#8B5CF6" name="Issues" />
              <Bar yAxisId="left" dataKey="returns" fill="#6366F1" name="Returns" />
              <Bar yAxisId="right" dataKey="fines" fill="#EC4899" name="Fines ($)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Students Management */}
      <Card className="mt-6">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div>
              <CardTitle>Student Management</CardTitle>
              <CardDescription>Manage and track student library activities</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  className="pl-8 w-[200px] md:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Books Issued</TableHead>
                <TableHead>Fines ($)</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell>{student.booksIssued}</TableCell>
                  <TableCell>${student.fines.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AdminDashboard;
