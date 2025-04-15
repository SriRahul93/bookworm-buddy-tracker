
import { Book } from "@/types/book";

// Mock cover images (use random image each time)
const getRandomCover = () => {
  // Create an array of stock book cover images
  const covers = [
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2787&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2730&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=2787&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1543381945-f9527a1ec2e5?q=80&w=2729&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1495640388908-44d0e8e8c3a8?q=80&w=2787&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=2788&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2773&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=2870&auto=format&fit=crop",
    "https://plus.unsplash.com/premium_photo-1677187301933-b3cb2eea0032?q=80&w=2787&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2870&auto=format&fit=crop",
  ];
  
  return covers[Math.floor(Math.random() * covers.length)];
};

// Categories
const bookCategories = [
  "Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Romance",
  "Thriller",
  "Biography",
  "History",
  "Science",
  "Computer Science",
  "Philosophy",
  "Self-Help",
  "Business",
  "Poetry",
  "Reference",
];

// Book titles, authors pairs (fictional examples)
const bookData = [
  { title: "The Silent Echo", author: "Elena Blackwood" },
  { title: "Whispers in the Dark", author: "Marcus Sullivan" },
  { title: "The Lost City", author: "Alexandra Chen" },
  { title: "Beyond the Horizon", author: "Thomas Reid" },
  { title: "Echoes of Time", author: "Sophia Mendes" },
  { title: "The Quantum Paradox", author: "Dr. Richard Hammond" },
  { title: "Secrets of the Deep", author: "Marina Costa" },
  { title: "The Last Guardian", author: "James Thornhill" },
  { title: "Shadows of the Past", author: "Lucia Winters" },
  { title: "The Forgotten Key", author: "Daniel Gray" },
  { title: "The Algorithm of Life", author: "Dr. Sarah Chen" },
  { title: "Beneath the Surface", author: "Robert Storm" },
  { title: "The Hidden Truth", author: "Isabella Martinez" },
  { title: "Chronicles of the Stars", author: "Alexander Nova" },
  { title: "The Art of Deception", author: "Natalie Rivers" },
  { title: "Dawn of Creation", author: "Michael Dawn" },
  { title: "The Invisible Path", author: "Olivia Knight" },
  { title: "Whispers of Destiny", author: "Jonathan Blake" },
  { title: "The Memory Keeper", author: "Emily Foster" },
  { title: "Beyond Reality", author: "David Stone" },
  { title: "The Silent Observer", author: "Catherine Wells" },
  { title: "Riddles of the Universe", author: "Prof. Alan Turing" },
  { title: "The Phoenix Code", author: "Rebecca Phoenix" },
  { title: "Shades of Truth", author: "Victor Hayes" },
  { title: "The Final Chapter", author: "Amanda Roberts" },
  { title: "Design Patterns", author: "Erich Gamma, Richard Helm" },
  { title: "Clean Code", author: "Robert C. Martin" },
  { title: "The Pragmatic Programmer", author: "Andy Hunt, Dave Thomas" },
  { title: "Introduction to Algorithms", author: "Thomas H. Cormen" },
  { title: "Artificial Intelligence: A Modern Approach", author: "Stuart Russell, Peter Norvig" },
  { title: "The Mythical Man-Month", author: "Frederick P. Brooks Jr." },
  { title: "Code Complete", author: "Steve McConnell" },
  { title: "Refactoring", author: "Martin Fowler" },
  { title: "Domain-Driven Design", author: "Eric Evans" },
  { title: "Head First Design Patterns", author: "Eric Freeman, Elisabeth Robson" },
  { title: "Programming Pearls", author: "Jon Bentley" },
  { title: "Cracking the Coding Interview", author: "Gayle Laakmann McDowell" },
  { title: "Structure and Interpretation of Computer Programs", author: "Harold Abelson, Gerald Jay Sussman" },
  { title: "The C Programming Language", author: "Brian W. Kernighan, Dennis M. Ritchie" },
  { title: "Eloquent JavaScript", author: "Marijn Haverbeke" },
  { title: "You Don't Know JS", author: "Kyle Simpson" },
  { title: "JavaScript: The Good Parts", author: "Douglas Crockford" },
  { title: "Learning React", author: "Alex Banks, Eve Porcello" },
  { title: "CSS: The Definitive Guide", author: "Eric A. Meyer, Estelle Weyl" },
  { title: "HTML and CSS: Design and Build Websites", author: "Jon Duckett" },
  { title: "Don't Make Me Think", author: "Steve Krug" },
  { title: "Web Design with HTML, CSS, JavaScript and jQuery Set", author: "Jon Duckett" },
  { title: "Python Crash Course", author: "Eric Matthes" },
  { title: "Learning Python", author: "Mark Lutz" },
  { title: "Java: The Complete Reference", author: "Herbert Schildt" },
];

// Generate 50 mock books
export const generateMockBooks = (count = 50): Book[] => {
  const books: Book[] = [];
  
  // Use the book data we defined, and if we need more, start repeating with different categories
  for (let i = 0; i < count; i++) {
    const bookIndex = i % bookData.length;
    const { title, author } = bookData[bookIndex];
    
    // Randomize some aspects
    const totalCopies = Math.floor(Math.random() * 10) + 1; // 1 to 10 copies
    const availableCopies = Math.floor(Math.random() * (totalCopies + 1)); // 0 to totalCopies
    const category = bookCategories[Math.floor(Math.random() * bookCategories.length)];
    
    books.push({
      id: `book-${i + 1}`,
      title,
      author,
      description: `A fascinating book about ${title.toLowerCase()}.`,
      coverImage: getRandomCover(),
      category,
      available: availableCopies,
      total: totalCopies,
      isbn: `978-${Math.floor(Math.random() * 10000000000)}`,
      publicationYear: Math.floor(Math.random() * 30) + 1990, // 1990 to 2020
      publisher: "LibTrack Publishing",
      language: "English",
      addedDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
      pages: Math.floor(Math.random() * 500) + 100, // 100 to 600 pages
    });
  }
  
  return books;
};

// Export a set of mock books
export const mockBooks = generateMockBooks(50);
