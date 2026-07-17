import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useAuth } from '@/context/AuthContext';

export function Navbar() {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <AppBar position="sticky" color="inherit" sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg" disableGutters>
        <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
          <Typography
            component={RouterLink}
            to="/"
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: 700, color: 'text.primary', textDecoration: 'none' }}
          >
            BookStore
          </Typography>

          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button component={RouterLink} to="/" color="inherit">
              All Books
            </Button>

            {isAuthenticated && (
              <Button component={RouterLink} to="/favorites" color="inherit">
                My Favorites
              </Button>
            )}

            {isAdmin && (
              <Button component={RouterLink} to="/admin/dashboard" color="inherit">
                Admin Dashboard
              </Button>
            )}

            {isAuthenticated ? (
              <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
            ) : (
              <>
                <Button component={RouterLink} to="/login" color="inherit">
                  Login
                </Button>
                <Button component={RouterLink} to="/register" variant="contained" disableElevation>
                  Register
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
