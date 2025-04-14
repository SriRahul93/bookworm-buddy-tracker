
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
