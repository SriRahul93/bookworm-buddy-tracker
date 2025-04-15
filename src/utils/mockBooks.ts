import { Book } from "@/types/book";

// Book cover image map that matches titles to relevant cover images
const bookCovers: Record<string, string> = {
  // Programming books
  "Design Patterns": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop",
  "Clean Code": "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?q=80&w=2071&auto=format&fit=crop",
  "The Pragmatic Programmer": "https://images.unsplash.com/photo-1517148815978-75f6acaaf32c?q=80&w=2070&auto=format&fit=crop",
  "Introduction to Algorithms": "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?q=80&w=2070&auto=format&fit=crop",
  "Learning React": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
  "You Don't Know JS": "https://images.unsplash.com/photo-1613490900233-141c5560d75d?q=80&w=2071&auto=format&fit=crop",
  "JavaScript: The Good Parts": "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=2070&auto=format&fit=crop",
  "Refactoring": "https://images.unsplash.com/photo-1623479322729-28b25c16b011?q=80&w=2070&auto=format&fit=crop",
  
  // Fiction
  "To Kill a Mockingbird": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop",
  "The Silent Echo": "https://images.unsplash.com/photo-1474932430478-367dbb6a45dip=80&w=2070&auto=format&fit=crop",
  "Whispers in the Dark": "https://images.unsplash.com/photo-1610882648335-eda2a5454180?q=80&w=1974&auto=format&fit=crop",
  "The Lost City": "https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1974&auto=format&fit=crop",
  "Beyond the Horizon": "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?q=80&w=2070&auto=format&fit=crop",
  "Echoes of Time": "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=2070&auto=format&fit=crop",
  "The Quantum Paradox": "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=2069&auto=format&fit=crop",
  "Secrets of the Deep": "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1932&auto=format&fit=crop",
  "The Last Guardian": "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=2076&auto=format&fit=crop",
  "Shadows of the Past": "https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?q=80&w=2070&auto=format&fit=crop",
  
  // Science & Philosophy
  "The Forgotten Key": "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=2070&auto=format&fit=crop",
  "The Algorithm of Life": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
  "Beneath the Surface": "https://images.unsplash.com/photo-1576872381149-7847515ce5d8?q=80&w=2076&auto=format&fit=crop",
  "The Hidden Truth": "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=2074&auto=format&fit=crop",
  "Artificial Intelligence: A Modern Approach": "https://images.unsplash.com/photo-1677442135136-760c813029fb?q=80&w=2070&auto=format&fit=crop"
};

// Fallback cover images for books without specific covers
const fallbackCovers = [
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1543381945-f9527a1ec2e5?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1495640388908-44d0e8e8c3a8?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=2070&auto=format&fit=crop"
];

// Get a cover image for a title, or use a themed fallback
const getCoverImage = (title: string, category: string): string => {
  // If we have a specific cover for this title, use it
  if (bookCovers[title]) {
    return bookCovers[title];
  }
  
  // Otherwise, choose a fallback based on the hash of the title
  const titleHash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return fallbackCovers[titleHash % fallbackCovers.length];
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

// Generate mock books
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
      coverImage: getCoverImage(title, category),
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
