
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BookFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string | null;
  setCategoryFilter: (category: string | null) => void;
  availabilityFilter: string | null;
  setAvailabilityFilter: (availability: string | null) => void;
  categories: string[];
  activeFiltersCount: number;
  clearFilters: () => void;
}

const BookFilters = ({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  availabilityFilter,
  setAvailabilityFilter,
  categories,
  activeFiltersCount,
  clearFilters,
}: BookFiltersProps) => {
  return (
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
  );
};

export default BookFilters;
