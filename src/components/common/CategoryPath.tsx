import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Category } from '@/types';

export function CategoryPath({ items }: { items: Category[] }) {
  if (items.length === 0) return null;

  return (
    <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', alignItems: 'center' }}>
      {items.map((item, idx) => (
        <Stack key={item._id} direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
          {idx > 0 && (
            <Typography variant="body2" color="text.disabled">
              &gt;
            </Typography>
          )}
          <Typography variant="body2" color="primary.main" sx={{ fontWeight: 500 }}>
            {item.name}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}
