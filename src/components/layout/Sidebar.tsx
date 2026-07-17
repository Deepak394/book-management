import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useAuth } from '@/context/AuthContext';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/books', label: 'Books' },
  { to: '/admin/categories', label: 'Categories' },
  { to: '/admin/reports', label: 'Reports' },
];

const navItemSx = {
  borderRadius: 2,
  mb: 0.5,
  flexGrow: 0,
  color: 'rgba(255,255,255,0.75)',
  '&.Mui-selected': {
    bgcolor: 'rgba(255,255,255,0.12)',
    color: '#fff',
  },
  '&.Mui-selected:hover': {
    bgcolor: 'rgba(255,255,255,0.16)',
  },
  '&:hover': {
    bgcolor: 'rgba(255,255,255,0.06)',
  },
};

export function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <Box
      component="aside"
      sx={{
        width: 240,
        flexShrink: 0,
        bgcolor: '#16233b',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        height: '100vh',
        py: 3,
        px: 2,
      }}
    >
      <List sx={{ py: 0 }}>
        {links.map((link) => (
          <ListItemButton
            key={link.to}
            component={RouterLink}
            to={link.to}
            selected={location.pathname.startsWith(link.to)}
            sx={navItemSx}
          >
            <ListItemText primary={link.label} />
          </ListItemButton>
        ))}
      </List>

      <ListItemButton onClick={handleLogout} sx={navItemSx}>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </Box>
  );
}
