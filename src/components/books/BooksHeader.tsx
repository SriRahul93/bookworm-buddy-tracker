
import React from "react";

interface BooksHeaderProps {
  title?: string;
  description?: string;
}

const BooksHeader = ({ 
  title = "Browse Our Library", 
  description = "Discover and borrow from our extensive collection of books across various categories."
}: BooksHeaderProps) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        {title.includes("Library") ? (
          <>
            Browse Our <span className="gradient-text">Library</span>
          </>
        ) : (
          title
        )}
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default BooksHeader;
