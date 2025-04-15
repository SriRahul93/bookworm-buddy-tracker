
import { useState } from "react";
import { Book } from "@/types/book";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookCheck } from "lucide-react";
import { useLibrary } from "@/contexts/LibraryContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import BorrowBookDialog from "./BorrowBookDialog";

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const { issuedBooks, user } = useLibrary();
  const [isHovered, setIsHovered] = useState(false);
  const [showBorrowDialog, setShowBorrowDialog] = useState(false);
  
  // Check if a book is borrowed by the current user
  const borrowed = issuedBooks.some(issue => issue.bookId === book.id);
  
  const handleBorrowClick = () => {
    if (!user) {
      return;
    }
    
    setShowBorrowDialog(true);
  };
  
  return (
    <>
      <motion.div
        className="flex flex-col bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow hover:border-gray-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative h-64 overflow-hidden">
          <img
            src={book.coverImage}
            alt={book.title}
            className={cn(
              "w-full h-full object-cover transition-transform duration-300",
              isHovered && "scale-110"
            )}
          />
          <div className="absolute top-2 right-2">
            <Badge className={cn(
              book.available > 0 
                ? "bg-green-100 text-green-800 hover:bg-green-100" 
                : "bg-red-100 text-red-800 hover:bg-red-100"
            )}>
              {book.available > 0 ? "Available" : "Unavailable"}
            </Badge>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg truncate" title={book.title}>
            {book.title}
          </h3>
          <p className="text-sm text-gray-600 truncate" title={book.author}>
            {book.author}
          </p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">
              {book.available} of {book.total} available
            </span>
            <Badge variant="outline">{book.category}</Badge>
          </div>
          <div className="mt-4">
            <Button
              className="w-full"
              disabled={book.available === 0 || borrowed || !user}
              variant={borrowed ? "outline" : "default"}
              onClick={handleBorrowClick}
            >
              {borrowed ? (
                <div className="flex items-center">
                  <BookCheck className="h-4 w-4 mr-2" />
                  Borrowed
                </div>
              ) : book.available > 0 ? (
                "Borrow Book"
              ) : (
                "Unavailable"
              )}
            </Button>
          </div>
        </div>
      </motion.div>
      
      <BorrowBookDialog 
        book={book}
        open={showBorrowDialog}
        onOpenChange={setShowBorrowDialog}
      />
    </>
  );
};

export default BookCard;
