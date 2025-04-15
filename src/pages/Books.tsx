
import { useState, useEffect } from "react";
import { useLibrary } from "@/contexts/LibraryContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockBooks } from "@/utils/mockBooks";
import BooksHeader from "@/components/books/BooksHeader";
import BookFilters from "@/components/books/BookFilters";
import BooksSorting from "@/components/books/BooksSorting";
import BooksList from "@/components/books/BooksList";

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
          <BooksHeader />
          
          {/* Search and Filters */}
          <BookFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            availabilityFilter={availabilityFilter}
            setAvailabilityFilter={setAvailabilityFilter}
            categories={categories}
            activeFiltersCount={activeFiltersCount}
            clearFilters={clearFilters}
          />
          
          {/* Results Summary */}
          <BooksSorting 
            totalBooks={books.length}
            filteredCount={filteredBooks.length}
          />
          
          {/* Books Grid */}
          <BooksList
            books={books}
            isLoading={isLoading}
            filteredBooks={filteredBooks}
            clearFilters={clearFilters}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Books;
