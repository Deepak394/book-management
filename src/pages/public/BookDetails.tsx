import { useParams, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { CategoryPath } from '@/components/common/CategoryPath';
import { ErrorState } from '@/components/common/ErrorState';
import { useBook } from '@/hooks/useBooks';
import { useAuth } from '@/context/AuthContext';
import { useIsFavorite, useToggleFavorite } from '@/hooks/useFavorites';

const FALLBACK_COVER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400"><rect width="100%" height="100%" fill="#e5e7eb"/><text x="50%" y="50%" font-size="20" fill="#9ca3af" text-anchor="middle" dy=".3em">No Cover</text></svg>`
  );

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { data, isLoading, isError, refetch } = useBook(id);
  const isFavorite = useIsFavorite(id || '');
  const toggleFavorite = useToggleFavorite();

  if (isLoading) {
    return (
      <PublicLayout>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Skeleton variant="rounded" height={380} />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Skeleton variant="text" width="60%" height={40} />
            <Skeleton variant="text" width="30%" />
            <Skeleton variant="rounded" height={100} sx={{ mt: 2 }} />
          </Grid>
        </Grid>
      </PublicLayout>
    );
  }

  if (isError || !data) {
    return (
      <PublicLayout>
        <ErrorState message="This book could not be found." onRetry={refetch} />
      </PublicLayout>
    );
  }

  const { book, breadcrumb } = data;

  const handleToggle = () => toggleFavorite.mutate({ bookId: book._id, isFavorite });

  return (
    <PublicLayout>
      <Grid container spacing={5}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            component="img"
            src={book.image || FALLBACK_COVER}
            alt={book.title}
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_COVER;
            }}
            sx={{ width: '100%', borderRadius: 2, objectFit: 'cover', boxShadow: 1 }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {book.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {book.author}
              </Typography>
            </Box>

            <CategoryPath items={breadcrumb} />

            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              {book.description || 'No description available.'}
            </Typography>

            {isAuthenticated ? (
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center', pt: 1 }}>
                <IconButton
                  onClick={handleToggle}
                  disabled={toggleFavorite.isPending}
                  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {isFavorite ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: 'text.disabled' }} />
                  )}
                </IconButton>
                <Button variant="outlined" onClick={handleToggle} disabled={toggleFavorite.isPending}>
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
              </Stack>
            ) : (
              <Button variant="outlined" onClick={() => navigate('/login')} sx={{ width: 'fit-content' }}>
                Login to add favorites
              </Button>
            )}
          </Stack>
        </Grid>
      </Grid>
    </PublicLayout>
  );
}
