import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-gray-50 px-4 text-center">
      <div className="text-5xl">📖</div>
      <h1 className="text-3xl font-bold text-gray-900">404 — Page Not Found</h1>
      <p className="text-sm text-gray-500">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="mt-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
        Back to Books
      </Link>
    </div>
  );
}
