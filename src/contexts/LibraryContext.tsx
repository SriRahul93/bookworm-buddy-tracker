import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

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

interface Profile {
  id: string;
  name: string;
  role: 'admin' | 'student';
  student_id?: string;
}

interface LibraryContextType {
  user: User | null;
  books: Book[];
  issuedBooks: IssuedBook[];
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: 'student' | 'admin', studentId?: string) => Promise<void>;
  logout: () => Promise<void>;
  borrowBook: (bookId: string) => Promise<void>;
  returnBook: (issueId: string) => Promise<void>;
  searchBooks: (query: string) => Book[];
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Set up auth state listener
  useEffect(() => {
    // First set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsLoading(true);
        if (session?.user) {
          try {
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (error) throw error;

            if (profile) {
              const userData: User = {
                id: session.user.id,
                name: profile.name,
                email: session.user.email || '',
                role: profile.role,
                studentId: profile.student_id
              };
              setUser(userData);
            }
          } catch (error) {
            console.error('Error fetching user profile:', error);
            toast.error('Error loading user profile');
          }
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );
    
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        // We'll use the onAuthStateChange handler to set the user
      } else {
        setIsLoading(false);
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  // Load books from Supabase
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data, error } = await supabase
          .from('books')
          .select('*');
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Transform Supabase data to match our Book interface
          const formattedBooks: Book[] = data.map(book => ({
            id: book.id,
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            category: book.category,
            available: book.available,
            total: book.total,
            coverImage: book.cover_image || 'https://images.unsplash.com/photo-1532012197267-da84d127e765',
            publishedYear: book.published_year || 2000,
            description: book.description || 'No description available'
          }));
          
          setBooks(formattedBooks);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    
    if (user) {
      fetchBooks();
    }
  }, [user]);
  
  // Load issued books from Supabase
  useEffect(() => {
    const fetchIssuedBooks = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('issued_books')
          .select(`
            *,
            book:book_id (*)
          `)
          .eq('user_id', user.id);
        
        if (error) throw error;
        
        if (data) {
          // Transform Supabase data to match our IssuedBook interface
          const formattedIssuedBooks: IssuedBook[] = data.map(issue => ({
            id: issue.id,
            bookId: issue.book_id,
            userId: issue.user_id,
            issueDate: issue.issue_date,
            dueDate: issue.due_date,
            returnDate: issue.return_date || undefined,
            fine: Number(issue.fine),
            bookDetails: {
              id: issue.book.id,
              title: issue.book.title,
              author: issue.book.author,
              isbn: issue.book.isbn,
              category: issue.book.category,
              available: issue.book.available,
              total: issue.book.total,
              coverImage: issue.book.cover_image || 'https://images.unsplash.com/photo-1532012197267-da84d127e765',
              publishedYear: issue.book.published_year || 2000,
              description: issue.book.description || 'No description available'
            }
          }));
          
          setIssuedBooks(formattedIssuedBooks);
        }
      } catch (error) {
        console.error('Error fetching issued books:', error);
      }
    };
    
    if (user) {
      fetchIssuedBooks();
    }
  }, [user]);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      toast.success("Login successful!");
    } catch (error: any) {
      toast.error(error.message || "Failed to login");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (email: string, password: string, name: string, role: 'student' | 'admin', studentId?: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
            student_id: studentId
          }
        }
      });
      
      if (error) throw error;
      
      toast.success("Registration successful! Please check your email to confirm your account.");
    } catch (error: any) {
      toast.error(error.message || "Failed to register");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to logout");
    } finally {
      setIsLoading(false);
    }
  };
  
  const borrowBook = async (bookId: string) => {
    if (!user) {
      toast.error("You need to login first!");
      return;
    }
    
    try {
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
      
      // Due date is 30 days from now
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 30);
      
      // Insert into issued_books
      const { data, error } = await supabase
        .from('issued_books')
        .insert({
          book_id: bookId,
          user_id: user.id,
          due_date: dueDate.toISOString().split('T')[0]
        })
        .select();
      
      if (error) throw error;
      
      // Update book availability
      const { error: updateError } = await supabase
        .from('books')
        .update({ available: book.available - 1 })
        .eq('id', bookId);
      
      if (updateError) throw updateError;
      
      // Update local state
      const updatedBooks = books.map((b) => {
        if (b.id === bookId) {
          return { ...b, available: b.available - 1 };
        }
        return b;
      });
      
      setBooks(updatedBooks);
      
      if (data && data.length > 0) {
        const newIssue: IssuedBook = {
          id: data[0].id,
          bookId,
          userId: user.id,
          issueDate: data[0].issue_date,
          dueDate: data[0].due_date,
          fine: 0,
          bookDetails: book
        };
        
        setIssuedBooks([...issuedBooks, newIssue]);
      }
      
      toast.success(`You have borrowed "${book.title}". Return by ${dueDate.toLocaleDateString()}.`);
    } catch (error: any) {
      toast.error(error.message || "Failed to borrow book");
    }
  };
  
  const returnBook = async (issueId: string) => {
    try {
      const issue = issuedBooks.find((i) => i.id === issueId);
      if (!issue) {
        toast.error("Issue record not found");
        return;
      }
      
      // Update issued_book with return date
      const { error } = await supabase
        .from('issued_books')
        .update({
          return_date: new Date().toISOString().split('T')[0]
        })
        .eq('id', issueId);
      
      if (error) throw error;
      
      // Update book availability
      const { error: updateError } = await supabase
        .from('books')
        .update({
          available: issue.bookDetails.available + 1
        })
        .eq('id', issue.bookId);
      
      if (updateError) throw updateError;
      
      // Update local state
      const updatedBooks = books.map((b) => {
        if (b.id === issue.bookId) {
          return { ...b, available: b.available + 1 };
        }
        return b;
      });
      
      const updatedIssues = issuedBooks.filter((i) => i.id !== issueId);
      
      setBooks(updatedBooks);
      setIssuedBooks(updatedIssues);
      
      toast.success(`You have returned "${issue.bookDetails.title}".`);
    } catch (error: any) {
      toast.error(error.message || "Failed to return book");
    }
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
    register,
    logout,
    borrowBook,
    returnBook,
    searchBooks,
    isLoading
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
