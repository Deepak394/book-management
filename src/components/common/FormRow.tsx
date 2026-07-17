import type { ReactNode } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export function FormRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
      <Typography sx={{ width: 140, flexShrink: 0, pt: 1.25, fontSize: 14, color: 'text.secondary' }}>
        {label}
      </Typography>
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>{children}</Box>
    </Stack>
  );
}
