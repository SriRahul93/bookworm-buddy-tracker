
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BooksSortingProps {
  totalBooks: number;
  filteredCount: number;
}

const BooksSorting = ({ totalBooks, filteredCount }: BooksSortingProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <p className="text-gray-600">
        Showing {filteredCount} of {totalBooks} books
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
  );
};

export default BooksSorting;
