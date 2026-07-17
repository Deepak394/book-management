import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { FavoritesTrendChart } from '@/components/dashboard/Charts';
import { Skeleton } from '@/components/common/Skeleton';
import { ErrorState } from '@/components/common/ErrorState';
import { EmptyState } from '@/components/common/EmptyState';
import { useFavoritesReport } from '@/hooks/useReports';

export default function Reports() {
  const { data, isLoading, isError, refetch } = useFavoritesReport();

  return (
    <AdminLayout title="Reports">
      {isError && <ErrorState message="Failed to load report." onRetry={refetch} />}

      {!isError && (
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, maxWidth: 640 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.4 }}>
            Books Marked as Favorite
            <br />
            in Last Month
          </Typography>

          {isLoading || !data ? (
            <Skeleton className="mt-3 h-10 w-24" />
          ) : (
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {data.favoritesLastMonth}
              </Typography>
              <EqualizerIcon sx={{ fontSize: 40, color: '#16233b' }} />
            </Stack>
          )}

          <Box sx={{ mt: 4 }}>
            {isLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : data && data.dailySeries.length > 0 ? (
              <FavoritesTrendChart data={data.dailySeries} />
            ) : (
              <EmptyState title="No favorite activity" description="No books were favorited in this period." />
            )}
          </Box>
        </Paper>
      )}

      {!isError && (
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mt: 3, maxWidth: 640 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Most Favorited Books
          </Typography>
          <Divider sx={{ mb: 1 }} />
          {isLoading ? (
            <Skeleton className="h-40 w-full" />
          ) : data && data.topFavoritedBooks.length > 0 ? (
            <Stack divider={<Divider />}>
              {data.topFavoritedBooks.map((item, idx) => (
                <Stack
                  key={item.bookId}
                  direction="row"
                  sx={{ justifyContent: 'space-between', alignItems: 'center', py: 1.25 }}
                >
                  <Typography variant="body2" color="text.secondary">
                    <Box component="span" sx={{ mr: 1, color: 'text.disabled' }}>
                      #{idx + 1}
                    </Box>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    {item.count} favorites
                  </Typography>
                </Stack>
              ))}
            </Stack>
          ) : (
            <EmptyState title="No favorites yet" description="Favorited books will be ranked here." />
          )}
        </Paper>
      )}
    </AdminLayout>
  );
}
