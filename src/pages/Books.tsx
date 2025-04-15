
import { useState, useEffect } from "react";
import { useLibrary } from "@/contexts/LibraryContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BookCard from "@/components/BookCard";
import { mockBooks } from "@/utils/mockBooks";

// Animation variants for the book cards
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Books = () => {
  const { user } = useLibrary();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [availabilityFilter, setAvailabilityFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState(mockBooks);
  
  // Get unique categories from books
  const categories = [...new Set(books.map(book => book.category))];
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filtered books based on search query and filters
  const filteredBooks = books.filter(book => {
    // Search filter
    const matchesSearch = 
      !searchQuery.trim() ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = 
      !categoryFilter || categoryFilter === "all_categories" ||
      book.category === categoryFilter;
    
    // Availability filter
    const matchesAvailability = 
      !availabilityFilter || availabilityFilter === "all_books" ||
      (availabilityFilter === 'available' && book.available > 0) || 
      (availabilityFilter === 'unavailable' && book.available === 0);
    
    return matchesSearch && matchesCategory && matchesAvailability;
  });
  
  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter(null);
    setAvailabilityFilter(null);
  };
  
  // Count active filters
  const activeFiltersCount = [
    searchQuery.trim() ? 1 : 0,
    categoryFilter ? 1 : 0,
    availabilityFilter ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Browse Our <span className="gradient-text">Library</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover and borrow from our extensive collection of books across various categories.
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search books by title, author..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 flex-wrap md:flex-nowrap">
              <Select
                value={categoryFilter || ""}
                onValueChange={(value) => setCategoryFilter(value || null)}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_categories">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select
                value={availabilityFilter || ""}
                onValueChange={(value) => setAvailabilityFilter(value || null)}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_books">All Books</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="unavailable">Not Available</SelectItem>
                </SelectContent>
              </Select>
              
              {activeFiltersCount > 0 && (
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  className="flex items-center space-x-1"
                >
                  <X className="h-4 w-4" />
                  <span>Clear {activeFiltersCount > 1 ? `(${activeFiltersCount})` : ""}</span>
                </Button>
              )}
            </div>
          </div>
          
          {/* Results Summary */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {filteredBooks.length} of {books.length} books
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Title: A-Z</DropdownMenuItem>
                <DropdownMenuItem>Title: Z-A</DropdownMenuItem>
                <DropdownMenuItem>Author: A-Z</DropdownMenuItem>
                <DropdownMenuItem>Recently Added</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Books Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="flex flex-col border rounded-lg overflow-hidden">
                  <Skeleton className="h-64 w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex space-x-2 pt-2">
                      <Skeleton className="h-8 w-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-700">No books found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
              <Button onClick={clearFilters} variant="outline" className="mt-4">
                Clear all filters
              </Button>
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Books;
