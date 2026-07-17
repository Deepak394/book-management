import Grid from '@mui/material/Grid';
import type { Book } from '@/types';
import { BookCard } from './BookCard';
import { BookGridSkeleton } from '@/components/common/Skeleton';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';

interface BookGridProps {
  books?: Book[];
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function BookGrid({
  books,
  isLoading,
  isError,
  onRetry,
  emptyTitle = 'No books found',
  emptyDescription = "Try adjusting your search or filters to find what you're looking for.",
}: BookGridProps) {
  if (isLoading) return <BookGridSkeleton />;
  if (isError) return <ErrorState message="Failed to load books." onRetry={onRetry} />;
  if (!books || books.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <Grid container spacing={3}>
      {books.map((book) => (
        <Grid key={book._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <BookCard book={book} />
        </Grid>
      ))}
    </Grid>
  );
}
