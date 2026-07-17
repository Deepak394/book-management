import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Sidebar } from './Sidebar';

export function AdminLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 4 } }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>
          {title}
        </Typography>
        {children}
      </Box>
    </Box>
  );
}
