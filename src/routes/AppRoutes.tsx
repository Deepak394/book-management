import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import BooksList from '@/pages/public/BooksList';
import BookDetails from '@/pages/public/BookDetails';
import Favorites from '@/pages/user/Favorites';
import Dashboard from '@/pages/admin/Dashboard';
import BooksManage from '@/pages/admin/BooksManage';
import CategoriesManage from '@/pages/admin/CategoriesManage';
import Reports from '@/pages/admin/Reports';
import NotFound from '@/pages/NotFound';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BooksList />} />
      <Route path="/books/:id" element={<BookDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/favorites"
        element={
          <ProtectedRoute roles={['user', 'admin']}>
            <Favorites />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute roles={['admin']}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/books"
        element={
          <ProtectedRoute roles={['admin']}>
            <BooksManage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/categories"
        element={
          <ProtectedRoute roles={['admin']}>
            <CategoriesManage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute roles={['admin']}>
            <Reports />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
