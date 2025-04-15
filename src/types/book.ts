
export interface Book {
  id: string;
  title: string;
  author: string;
  description?: string;
  coverImage: string;
  category: string;
  available: number;
  total: number;
  isbn?: string;
  publicationYear?: number;
  publisher?: string;
  language?: string;
  addedDate?: string;
  pages?: number;
  department?: string; // Added for department-specific books
  course?: string; // Added for course-specific books
}
