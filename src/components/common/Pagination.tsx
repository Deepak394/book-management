import Stack from '@mui/material/Stack';
import MuiPagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  total?: number;
  pageSize?: number;
}

export function Pagination({ page, totalPages, onPageChange, total, pageSize }: PaginationProps) {
  if (totalPages <= 1) return null;

  const rangeStart = pageSize ? (page - 1) * pageSize + 1 : undefined;
  const rangeEnd = pageSize && total ? Math.min(page * pageSize, total) : undefined;

  return (
    <Stack spacing={1} sx={{ alignItems: 'center' }}>
      <MuiPagination
        page={page}
        count={totalPages}
        onChange={(_, value) => onPageChange(value)}
        color="primary"
        shape="rounded"
      />
      {typeof total === 'number' && rangeStart !== undefined && rangeEnd !== undefined && (
        <Typography variant="body2" color="text.secondary">
          Showing {rangeStart} to {rangeEnd} of {total} books
        </Typography>
      )}
    </Stack>
  );
}
