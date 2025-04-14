
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "sonner";

// Types
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

interface LibraryContextType {
  user: User | null;
  books: Book[];
  issuedBooks: IssuedBook[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  borrowBook: (bookId: string) => Promise<void>;
  returnBook: (issueId: string) => Promise<void>;
  searchBooks: (query: string) => Book[];
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

// Sample data
const sampleBooks: Book[] = [
  {
    id: "1",
    title: "Design Patterns",
    author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
    isbn: "978-0201633610",
    category: "Programming",
    available: 3,
    total: 5,
    publishedYear: 1994,
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    description: "Capturing a wealth of experience about the design of object-oriented software, four top-notch designers present a catalog of simple and succinct solutions to commonly occurring design problems."
  },
  {
    id: "2",
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "978-0132350884",
    category: "Programming",
    available: 2,
    total: 4,
    publishedYear: 2008,
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    description: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. This book is packed with practical advice on how to improve your coding habits."
  },
  {
    id: "3",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    isbn: "978-0201616224",
    category: "Programming",
    available: 5,
    total: 5,
    publishedYear: 1999,
    coverImage: "https://images.unsplash.com/photo-1517148815978-75f6acaaf32c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    description: "The Pragmatic Programmer cuts through the increasing specialization and technicalities of modern software development to examine the core process."
  },
  {
    id: "4",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
    isbn: "978-0262033848",
    category: "Computer Science",
    available: 1,
    total: 3,
    publishedYear: 2009,
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    description: "A comprehensive introduction to the modern study of computer algorithms that covers a broad range of algorithms in depth."
  },
  {
    id: "5",
    title: "Learning React",
    author: "Alex Banks, Eve Porcello",
    isbn: "978-1492051718",
    category: "Web Development",
    available: 0,
    total: 2,
    publishedYear: 2020,
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    description: "If you want to learn how to build efficient React applications, this is your book. Fully updated for React 17, this edition helps you get started quickly with React by teaching you how to build real applications."
  },
  {
    id: "6",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0061120084",
    category: "Fiction",
    available: 3,
    total: 5,
    publishedYear: 1960,
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    description: "A novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature."
  }
];

const sampleIssuedBooks: IssuedBook[] = [
  {
    id: "1",
    bookId: "5",
    userId: "student1",
    issueDate: "2025-03-20",
    dueDate: "2025-04-20",
    fine: 0,
    bookDetails: sampleBooks.find(book => book.id === "5")!
  },
  {
    id: "2",
    bookId: "1",
    userId: "student1",
    issueDate: "2025-03-25",
    dueDate: "2025-04-25",
    fine: 0,
    bookDetails: sampleBooks.find(book => book.id === "1")!
  }
];

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [books, setBooks] = useState<Book[]>(sampleBooks);
  const [issuedBooks, setIssuedBooks] = useState<IssuedBook[]>(sampleIssuedBooks);
  
  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('libtrack_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  const login = async (email: string, password: string) => {
    // Simulate API call
    if (email === "student@example.com" && password === "password") {
      const studentUser: User = {
        id: "student1",
        name: "John Doe",
        email: "student@example.com",
        role: "student",
        studentId: "S12345",
      };
      
      setUser(studentUser);
      localStorage.setItem('libtrack_user', JSON.stringify(studentUser));
      toast.success("Login successful!");
      return;
    } else if (email === "admin@example.com" && password === "password") {
      const adminUser: User = {
        id: "admin1",
        name: "Admin User",
        email: "admin@example.com",
        role: "admin",
      };
      
      setUser(adminUser);
      localStorage.setItem('libtrack_user', JSON.stringify(adminUser));
      toast.success("Admin login successful!");
      return;
    } else {
      throw new Error("Invalid email or password");
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('libtrack_user');
    toast.success("Logged out successfully");
  };
  
  const borrowBook = async (bookId: string) => {
    if (!user) {
      toast.error("You need to login first!");
      return;
    }
    
    // Find the book
    const book = books.find((b) => b.id === bookId);
    if (!book) {
      toast.error("Book not found");
      return;
    }
    
    // Check if book is available
    if (book.available <= 0) {
      toast.error("This book is currently unavailable");
      return;
    }
    
    // Update book availability
    const updatedBooks = books.map((b) => {
      if (b.id === bookId) {
        return { ...b, available: b.available - 1 };
      }
      return b;
    });
    
    // Create a new issue record
    const issueDate = new Date().toISOString().split('T')[0];
    // Due date is 30 days from now
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);
    
    const newIssue: IssuedBook = {
      id: `issue_${Date.now()}`,
      bookId,
      userId: user.id,
      issueDate,
      dueDate: dueDate.toISOString().split('T')[0],
      fine: 0,
      bookDetails: book
    };
    
    setBooks(updatedBooks);
    setIssuedBooks([...issuedBooks, newIssue]);
    
    toast.success(`You have borrowed "${book.title}". Return by ${dueDate.toLocaleDateString()}.`);
  };
  
  const returnBook = async (issueId: string) => {
    const issue = issuedBooks.find((i) => i.id === issueId);
    if (!issue) {
      toast.error("Issue record not found");
      return;
    }
    
    // Update book availability
    const updatedBooks = books.map((b) => {
      if (b.id === issue.bookId) {
        return { ...b, available: b.available + 1 };
      }
      return b;
    });
    
    // Update issue record with return date
    const updatedIssues = issuedBooks.filter((i) => i.id !== issueId);
    
    setBooks(updatedBooks);
    setIssuedBooks(updatedIssues);
    
    toast.success(`You have returned "${issue.bookDetails.title}".`);
  };
  
  const searchBooks = (query: string): Book[] => {
    if (!query.trim()) return books;
    
    const lowerCaseQuery = query.toLowerCase();
    return books.filter((book) => 
      book.title.toLowerCase().includes(lowerCaseQuery) || 
      book.author.toLowerCase().includes(lowerCaseQuery) ||
      book.category.toLowerCase().includes(lowerCaseQuery)
    );
  };
  
  const value = {
    user,
    books,
    issuedBooks,
    login,
    logout,
    borrowBook,
    returnBook,
    searchBooks
  };
  
  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error("useLibrary must be used within a LibraryProvider");
  }
  return context;
};
