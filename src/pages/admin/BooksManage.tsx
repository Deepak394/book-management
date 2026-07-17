import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { SearchBar } from '@/components/books/SearchBar';
import { BookForm } from '@/components/books/BookForm';
import { Pagination } from '@/components/common/Pagination';
import { TableSkeleton } from '@/components/common/Skeleton';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { useBooks, useCreateBook, useDeleteBook, useUpdateBook } from '@/hooks/useBooks';
import { useDebounce } from '@/hooks/useDebounce';
import type { Book } from '@/types';
import type { BookFormValues } from '@/schemas/book.schema';
import { formatCurrency, formatDate } from '@/lib/utils';

const PAGE_SIZE = 20;

const FALLBACK_COVER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="80"><rect width="100%" height="100%" fill="#e5e7eb"/></svg>`
  );

export default function BooksManage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deletingBook, setDeletingBook] = useState<Book | null>(null);

  const debouncedSearch = useDebounce(search, 400);
  const { data, isLoading, isError, refetch } = useBooks({
    page,
    limit: PAGE_SIZE,
    search: debouncedSearch || undefined,
  });

  const createBook = useCreateBook();
  const updateBook = useUpdateBook();
  const deleteBook = useDeleteBook();

  const openCreateForm = () => {
    setEditingBook(null);
    setFormOpen(true);
  };

  const openEditForm = (book: Book) => {
    setEditingBook(book);
    setFormOpen(true);
  };

  const handleSubmit = (values: BookFormValues) => {
    const payload = { ...values, image: values.image as FileList | null | undefined };
    if (editingBook) {
      updateBook.mutate(
        { id: editingBook._id, payload },
        {
          onSuccess: () => {
            setFormOpen(false);
            refetch();
          },
        }
      );
    } else {
      createBook.mutate(payload, {
        onSuccess: () => {
          setFormOpen(false);
          refetch();
        },
      });
    }
  };

  const handleDeleteConfirm = () => {
    if (!deletingBook) return;
    deleteBook.mutate(deletingBook._id, {
      onSuccess: () => {
        setDeletingBook(null);
        refetch();
      },
    });
  };

  return (
    <AdminLayout title="Book Management">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full max-w-sm">
          <SearchBar
            value={search}
            onChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            placeholder="Search by title, author, or ISBN..."
          />
        </div>
        <Button onClick={openCreateForm}>+ Add Book</Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {isLoading ? (
          <div className="p-5">
            <TableSkeleton />
          </div>
        ) : isError ? (
          <div className="p-5">
            <ErrorState message="Failed to load books." onRetry={refetch} />
          </div>
        ) : !data?.items.length ? (
          <div className="p-5">
            <EmptyState
              title="No books yet"
              description="Add your first book to get started."
              action={<Button onClick={openCreateForm}>+ Add Book</Button>}
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-3">Cover</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Author</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Published</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.items.map((book) => (
                  <tr key={book._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2.5">
                      <img
                        src={book.image || FALLBACK_COVER}
                        alt={book.title}
                        className="h-14 w-10 rounded object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = FALLBACK_COVER;
                        }}
                      />
                    </td>
                    <td className="px-4 py-2.5 font-medium text-gray-800">{book.title}</td>
                    <td className="px-4 py-2.5 text-gray-600">{book.author}</td>
                    <td className="px-4 py-2.5 text-gray-600">{book.categoryId?.name || '—'}</td>
                    <td className="px-4 py-2.5 text-gray-600">{formatCurrency(book.price)}</td>
                    <td className="px-4 py-2.5 text-gray-600">{formatDate(book.publishDate)}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditForm(book)}
                          className="rounded-lg border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeletingBook(book)}
                          className="rounded-lg border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {data?.pagination && (
        <div className="mt-6">
          <Pagination page={page} totalPages={data.pagination.totalPages} onPageChange={setPage} />
        </div>
      )}

      <Modal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        title={editingBook ? 'Edit Book' : 'Add Book'}
        size="lg"
      >
        <BookForm
          initialBook={editingBook || undefined}
          onSubmit={handleSubmit}
          isSubmitting={createBook.isPending || updateBook.isPending}
          onCancel={() => setFormOpen(false)}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingBook}
        title="Delete Book"
        message={`Are you sure you want to delete "${deletingBook?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        isLoading={deleteBook.isPending}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingBook(null)}
      />
    </AdminLayout>
  );
}
