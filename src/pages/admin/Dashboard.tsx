import { AdminLayout } from '@/components/layout/AdminLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { BooksByCategoryChart, TopFavoritedBooksChart } from '@/components/dashboard/Charts';
import { StatCardSkeleton, Skeleton } from '@/components/common/Skeleton';
import { ErrorState } from '@/components/common/ErrorState';
import { EmptyState } from '@/components/common/EmptyState';
import { useDashboardStats } from '@/hooks/useReports';

export default function Dashboard() {
  const { data, isLoading, isError, refetch } = useDashboardStats();

  return (
    <AdminLayout title="Dashboard">
      {isError && <ErrorState message="Failed to load dashboard stats." onRetry={refetch} />}

      {!isError && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {isLoading || !data ? (
              Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
            ) : (
              <>
                <StatCard label="Total Books" value={data.totalBooks} icon="📚" />
                <StatCard
                  label="Total Users"
                  value={data.totalUsers}
                  icon="👥"
                  accent="bg-emerald-50 text-emerald-700"
                />
                <StatCard
                  label="Favorite Count"
                  value={data.favoriteCount}
                  icon="♥"
                  accent="bg-red-50 text-red-600"
                />
                <StatCard
                  label="Books Added This Month"
                  value={data.booksAddedThisMonth}
                  icon="🆕"
                  accent="bg-amber-50 text-amber-700"
                />
              </>
            )}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold text-gray-800">Books by Category</h2>
              {isLoading ? (
                <Skeleton className="h-72 w-full" />
              ) : data && data.booksByCategory.length > 0 ? (
                <BooksByCategoryChart data={data.booksByCategory} />
              ) : (
                <EmptyState title="No category data" description="Add books to see category breakdown." />
              )}
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold text-gray-800">Top Favorited Books</h2>
              {isLoading ? (
                <Skeleton className="h-72 w-full" />
              ) : data && data.topFavoritedBooks.length > 0 ? (
                <TopFavoritedBooksChart data={data.topFavoritedBooks} />
              ) : (
                <EmptyState title="No favorites yet" description="Favorites will appear here once users add them." />
              )}
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
