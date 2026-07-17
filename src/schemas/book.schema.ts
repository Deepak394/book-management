import { z } from 'zod';

export const bookSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  author: z.string().min(1, 'Author is required').max(150),
  description: z.string().max(5000).optional(),
  isbn: z.string().min(1, 'ISBN is required'),
  price: z.coerce.number({ invalid_type_error: 'Price must be a number' }).min(0, 'Price must be positive'),
  categoryId: z.string().min(1, 'Category is required'),
  publishDate: z.string().min(1, 'Published date is required'),
  image: z.any().optional(),
});

export type BookFormValues = z.infer<typeof bookSchema>;
