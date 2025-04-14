
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpenText, CalendarCheck2, BookCheck, CircleDollarSign, BookUser, LibraryBig, BellRing, BookMarked } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { motion } from 'framer-motion';

const MotionDiv = motion.div;

const Home = () => {
  const [email, setEmail] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert(`Thank you for subscribing with ${email}`);
    setEmail("");
  };
  
  const features = [
    {
      title: "Personal Dashboard",
      description: "Track all your books, due dates, and fines in one place",
      icon: BookOpenText,
      color: "bg-purple-100 text-library-purple"
    },
    {
      title: "Return Date Tracking",
      description: "Get notified about upcoming return dates to avoid late fees",
      icon: CalendarCheck2,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Fine Calculator",
      description: "Automatically calculates fines for overdue books",
      icon: CircleDollarSign,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Book Search",
      description: "Find and borrow books from the library catalog",
      icon: BookUser,
      color: "bg-amber-100 text-amber-600"
    },
  ];
  
  const stats = [
    { value: "10,000+", label: "Books Available" },
    { value: "5,000+", label: "Active Students" },
    { value: "98%", label: "On-time Returns" },
    { value: "24/7", label: "Digital Access" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-library-purple/10 to-library-blue/5 z-0" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <MotionDiv
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Smart Library <span className="gradient-text">Tracking</span> for Students
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                Never miss a return date again. LibTrack helps you manage your borrowed books, track due dates, and avoid library fines.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/login">
                  <Button size="lg" className="gradient-bg hover:opacity-90 transition-opacity">
                    Get Started
                  </Button>
                </Link>
                <Link to="/books">
                  <Button size="lg" variant="outline">
                    Browse Books
                  </Button>
                </Link>
              </div>
            </MotionDiv>
            
            <MotionDiv
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-library-purple/20 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-library-blue/20 rounded-full filter blur-3xl"></div>
                <div className="relative glass-card rounded-2xl overflow-hidden shadow-xl border border-white/20">
                  <img 
                    src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                    alt="Student using LibTrack" 
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold">Student Dashboard</h3>
                        <span className="bg-library-purple text-white text-xs px-2 py-1 rounded-full">Due Soon</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Clean Code</span>
                          <span className="text-sm font-medium text-red-500">Due in 2 days</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Design Patterns</span>
                          <span className="text-sm font-medium text-amber-500">Due in 8 days</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Features that <span className="gradient-text">simplify</span> library management
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              LibTrack offers a comprehensive set of tools designed to help students manage their library experience efficiently.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <MotionDiv
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="hover-scale"
              >
                <Card className="h-full border-none shadow-md">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-bg">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <MotionDiv
                key={stat.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="space-y-2"
              >
                <p className="text-4xl font-bold">{stat.value}</p>
                <p className="text-white/80">{stat.label}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How <span className="gradient-text">LibTrack</span> Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A simple process designed to make your library experience seamless.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-library-purple/20 flex items-center justify-center mx-auto">
                <BookMarked className="h-8 w-8 text-library-purple" />
              </div>
              <h3 className="text-xl font-semibold">Browse & Borrow</h3>
              <p className="text-gray-600">
                Browse the library catalog and borrow books with a simple click.
              </p>
            </MotionDiv>
            
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-library-blue/20 flex items-center justify-center mx-auto">
                <BellRing className="h-8 w-8 text-library-blue" />
              </div>
              <h3 className="text-xl font-semibold">Get Reminders</h3>
              <p className="text-gray-600">
                Receive timely notifications about upcoming due dates.
              </p>
            </MotionDiv>
            
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <BookCheck className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Return On Time</h3>
              <p className="text-gray-600">
                Return books on time and avoid accumulating library fines.
              </p>
            </MotionDiv>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12 space-y-6">
                <h2 className="text-3xl font-bold">
                  Ready to manage your library borrowings effectively?
                </h2>
                <p className="text-gray-600">
                  Join thousands of students who use LibTrack to stay organized, avoid fines, and make the most of their university library resources.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/login">
                    <Button size="lg" className="gradient-bg hover:opacity-90 transition-opacity">
                      Get Started Now
                    </Button>
                  </Link>
                  <Link to="/books">
                    <Button size="lg" variant="outline">
                      Explore Books
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-64 lg:h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1228&q=80" 
                  alt="Library books" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-library-purple/80 to-library-blue/80 flex items-center justify-center">
                  <LibraryBig className="h-24 w-24 text-white/90" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            Subscribe to our Newsletter
          </h2>
          <p className="text-gray-600 mb-6">
            Stay up to date with our latest features and library resources
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;
