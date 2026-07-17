import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { CategoryPath } from '@/components/common/CategoryPath';
import { Skeleton } from '@/components/common/Skeleton';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { useFavorites, useToggleFavorite } from '@/hooks/useFavorites';
import { useCategoriesFlat } from '@/hooks/useCategories';
import { buildCategoryBreadcrumb } from '@/lib/utils';

const FALLBACK_COVER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="110"><rect width="100%" height="100%" fill="#e5e7eb"/></svg>`
  );

export default function Favorites() {
  const { data, isLoading, isError, refetch } = useFavorites();
  const { data: categories } = useCategoriesFlat();
  const toggleFavorite = useToggleFavorite();

  return (
    <PublicLayout>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          My Favorite Books
        </Typography>
      </Box>

      {isLoading ? (
        <Stack spacing={2}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </Stack>
      ) : isError ? (
        <ErrorState message="Failed to load favorites." onRetry={refetch} />
      ) : !data || data.length === 0 ? (
        <EmptyState
          title="No favorites yet"
          description="Browse books and tap the heart icon to save them here."
        />
      ) : (
        <Paper variant="outlined">
          <Stack divider={<Divider />}>
            {data.map((favorite) => {
              const breadcrumb = buildCategoryBreadcrumb(favorite.book.categoryId, categories || []);
              return (
                <Box
                  key={favorite.favoriteId}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                  }}
                >
                  <Box
                    component="img"
                    src={favorite.book.image || FALLBACK_COVER}
                    alt={favorite.book.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_COVER;
                    }}
                    sx={{ width: 64, height: 88, objectFit: 'cover', borderRadius: 1, flexShrink: 0 }}
                  />

                  <Stack spacing={0.5} sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {favorite.book.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {favorite.book.author}
                    </Typography>
                    <CategoryPath items={breadcrumb} />
                  </Stack>

                  <Button
                    variant="outlined"
                    onClick={() => toggleFavorite.mutate({ bookId: favorite.book._id, isFavorite: true })}
                    disabled={toggleFavorite.isPending}
                  >
                    Remove
                  </Button>
                </Box>
              );
            })}
          </Stack>
        </Paper>
      )}
    </PublicLayout>
  );
}
