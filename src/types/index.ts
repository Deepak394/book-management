export type Role = 'admin' | 'user';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
}

export interface Category {
  _id: string;
  name: string;
  parentId: string | null;
  level: 1 | 2 | 3;
  isLeaf?: boolean;
  createdAt?: string;
}

export interface CategoryNode extends Category {
  children: CategoryNode[];
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  isbn: string;
  price: number;
  image: string;
  categoryId: Category;
  publishDate: string;
  createdAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Favorite {
  favoriteId: string;
  createdAt: string;
  book: Book;
}

export interface DashboardStats {
  totalBooks: number;
  totalUsers: number;
  favoriteCount: number;
  booksAddedThisMonth: number;
  totalLeafCategories: number;
  topFavoritedBooks: { bookId: string; title: string; count: number }[];
  booksByCategory: { categoryId: string; name: string; count: number }[];
}

export interface FavoritesReport {
  rangeStart: string;
  rangeEnd: string;
  favoritesLastMonth: number;
  dailySeries: { _id: string; count: number }[];
  topFavoritedBooks: { bookId: string; title: string; count: number }[];
}

export interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: Pagination;
}

export interface ApiErrorShape {
  success: false;
  statusCode: number;
  message: string;
  details?: { path: string; message: string }[];
}
