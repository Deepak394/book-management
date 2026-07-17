import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { bookSchema, type BookFormValues } from '@/schemas/book.schema';
import { FormRow } from '@/components/common/FormRow';
import { useCategoryTree } from '@/hooks/useCategories';
import type { Book } from '@/types';
import { toDateInputValue, flattenLeafCategoryPaths } from '@/lib/utils';

interface BookFormProps {
  initialBook?: Book;
  onSubmit: (values: BookFormValues) => void;
  isSubmitting?: boolean;
  onCancel: () => void;
}

export function BookForm({ initialBook, onSubmit, isSubmitting, onCancel }: BookFormProps) {
  const { data: tree } = useCategoryTree();
  const leafOptions = useMemo(() => flattenLeafCategoryPaths(tree || []), [tree]);
  const [fileName, setFileName] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: initialBook?.title || '',
      author: initialBook?.author || '',
      description: initialBook?.description || '',
      isbn: initialBook?.isbn || '',
      price: initialBook?.price ?? 0,
      categoryId: initialBook?.categoryId?._id || '',
      publishDate: initialBook ? toDateInputValue(initialBook.publishDate) : '',
    },
  });

  const imageFiles = watch('image') as FileList | undefined;
  useEffect(() => {
    if (imageFiles && imageFiles.length > 0) {
      setFileName(imageFiles[0].name);
    }
  }, [imageFiles]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        <FormRow label="Title">
          <TextField
            fullWidth
            size="small"
            placeholder="Book title"
            error={!!errors.title}
            helperText={errors.title?.message}
            {...register('title')}
          />
        </FormRow>

        <FormRow label="Author">
          <TextField
            fullWidth
            size="small"
            placeholder="Author name"
            error={!!errors.author}
            helperText={errors.author?.message}
            {...register('author')}
          />
        </FormRow>

        <FormRow label="Description">
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Short description of the book"
            error={!!errors.description}
            helperText={errors.description?.message}
            {...register('description')}
          />
        </FormRow>

        <FormRow label="ISBN">
          <TextField
            fullWidth
            size="small"
            placeholder="978-..."
            error={!!errors.isbn}
            helperText={errors.isbn?.message}
            {...register('isbn')}
          />
        </FormRow>

        <FormRow label="Price ($)">
          <TextField
            fullWidth
            size="small"
            type="number"
            slotProps={{ htmlInput: { step: '0.01', min: 0 } }}
            error={!!errors.price}
            helperText={errors.price?.message}
            {...register('price')}
          />
        </FormRow>

        <FormRow label="Published Date">
          <TextField
            fullWidth
            size="small"
            type="date"
            error={!!errors.publishDate}
            helperText={errors.publishDate?.message}
            {...register('publishDate')}
          />
        </FormRow>

        <FormRow label="Category (Leaf Level)">
          <TextField
            select
            fullWidth
            size="small"
            slotProps={{ select: { native: true } }}
            error={!!errors.categoryId}
            helperText={errors.categoryId?.message}
            {...register('categoryId')}
          >
            <option value="">Select category</option>
            {leafOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.path}
              </option>
            ))}
          </TextField>
        </FormRow>

        <FormRow label="Book Cover">
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Button variant="outlined" component="label">
              Choose File
              <input type="file" accept="image/*" hidden {...register('image')} />
            </Button>
            <Typography variant="body2" color="text.secondary" noWrap>
              {fileName || (initialBook?.image ? 'Current image kept' : 'No file chosen')}
            </Typography>
          </Stack>
        </FormRow>

        <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end', pt: 1 }}>
          <Button variant="outlined" onClick={onCancel} type="button">
            Cancel
          </Button>
          <Button variant="contained" disableElevation type="submit" disabled={isSubmitting}>
            {initialBook ? 'Update Book' : 'Save Book'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
