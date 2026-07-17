import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { SearchBar } from '@/components/books/SearchBar';
import { BookFilters, type CategoryFilterValue } from '@/components/books/BookFilters';
import { BookGrid } from '@/components/books/BookGrid';
import { Pagination } from '@/components/common/Pagination';
import { useBooks } from '@/hooks/useBooks';
import { useDebounce } from '@/hooks/useDebounce';

const PAGE_SIZE = 20;

export default function BooksList() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilterValue>({
    parentId: '',
    childId: '',
    leafId: '',
  });

  const debouncedSearch = useDebounce(search, 400);
  const effectiveCategoryId = categoryFilter.leafId || categoryFilter.childId || categoryFilter.parentId;

  const { data, isLoading, isError, refetch } = useBooks({
    page,
    limit: PAGE_SIZE,
    search: debouncedSearch || undefined,
    categoryId: effectiveCategoryId || undefined,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleFilterChange = (value: CategoryFilterValue) => {
    setCategoryFilter(value);
    setPage(1);
  };

  return (
    <PublicLayout>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          All Books
        </Typography>
      </Box>

      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <Box sx={{ mb: 2 }}>
          <SearchBar value={search} onChange={handleSearchChange} />
        </Box>
        <BookFilters value={categoryFilter} onChange={handleFilterChange} />
      </Paper>

      <BookGrid books={data?.items} isLoading={isLoading} isError={isError} onRetry={refetch} />

      {data?.pagination && (
        <Box sx={{ mt: 5 }}>
          <Pagination
            page={page}
            totalPages={data.pagination.totalPages}
            onPageChange={setPage}
            total={data.pagination.total}
            pageSize={PAGE_SIZE}
          />
        </Box>
      )}
    </PublicLayout>
  );
}
