
import { useState } from "react";
import { Book } from "@/types/book";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import BookCard from "@/components/BookCard";

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

interface BooksListProps {
  books: Book[];
  isLoading: boolean;
  filteredBooks: Book[];
  clearFilters: () => void;
}

const BooksList = ({ books, isLoading, filteredBooks, clearFilters }: BooksListProps) => {
  return (
    <>
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
    </>
  );
};

export default BooksList;
