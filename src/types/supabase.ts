
export interface Profile {
  id: string;
  name: string;
  role: 'admin' | 'student';
  student_id?: string;
  created_at: string;
  updated_at: string;
}

export interface BookRecord {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  available: number;
  total: number;
  cover_image?: string;
  published_year?: number;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface IssuedBookRecord {
  id: string;
  book_id: string;
  user_id: string;
  issue_date: string;
  due_date: string;
  return_date?: string;
  fine: number;
  created_at: string;
  updated_at: string;
  book?: BookRecord;
}

// Additional types needed for the application that don't modify the generated types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  studentId?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  available: number;
  total: number;
  coverImage: string;
  publishedYear: number;
  description: string;
}

export interface IssuedBook {
  id: string;
  bookId: string;
  userId: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  fine: number;
  bookDetails: Book;
}
