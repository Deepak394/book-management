import { Link as RouterLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import type { Book } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { useIsFavorite, useToggleFavorite } from '@/hooks/useFavorites';

const FALLBACK_COVER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400"><rect width="100%" height="100%" fill="#e5e7eb"/><text x="50%" y="50%" font-size="20" fill="#9ca3af" text-anchor="middle" dy=".3em">No Cover</text></svg>`
  );

export function BookCard({ book }: { book: Book }) {
  const { isAuthenticated } = useAuth();
  const isFavorite = useIsFavorite(book._id);
  const toggleFavorite = useToggleFavorite();

  const handleToggle = () => {
    if (!isAuthenticated) return;
    toggleFavorite.mutate({ bookId: book._id, isFavorite });
  };

  return (
    <Card
      variant="outlined"
      sx={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.2s ease',
        '&:hover': { boxShadow: 3 },
      }}
    >
      <CardActionArea component={RouterLink} to={`/books/${book._id}`} sx={{ flexGrow: 1, alignItems: 'stretch' }}>
        <CardMedia
          component="img"
          image={book.image || FALLBACK_COVER}
          alt={book.title}
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_COVER;
          }}
          sx={{ height: 220, objectFit: 'cover', bgcolor: 'grey.100' }}
        />
        <CardContent>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {book.author}
          </Typography>
        </CardContent>
      </CardActionArea>

      {isAuthenticated && (
        <Box sx={{ position: 'absolute', top: 6, right: 6 }}>
          <IconButton
            size="small"
            onClick={handleToggle}
            disabled={toggleFavorite.isPending}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            sx={{
              bgcolor: 'background.paper',
              boxShadow: 1,
              '&:hover': { bgcolor: 'background.paper' },
            }}
          >
            {isFavorite ? (
              <FavoriteIcon fontSize="small" color="error" />
            ) : (
              <FavoriteBorderIcon fontSize="small" sx={{ color: 'text.disabled' }} />
            )}
          </IconButton>
        </Box>
      )}
    </Card>
  );
}
