import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FolderIcon from '@mui/icons-material/Folder';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { CategoryTree } from '@/components/categories/CategoryTree';
import { CategoryForm, type CategoryFormMode } from '@/components/categories/CategoryForm';
import { Skeleton } from '@/components/common/Skeleton';
import { ErrorState } from '@/components/common/ErrorState';
import {
  useCategoryTree,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from '@/hooks/useCategories';
import type { CategoryNode } from '@/types';

export default function CategoriesManage() {
  const { data: tree, isLoading, isError, refetch } = useCategoryTree();
  const [formMode, setFormMode] = useState<CategoryFormMode>({ type: 'create', parent: null });
  const [deletingNode, setDeletingNode] = useState<CategoryNode | null>(null);

  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const handleSubmit = (values: { name: string; parentId: string | null }) => {
    if (formMode.type === 'create') {
      createCategory.mutate(
        { name: values.name, parentId: values.parentId },
        {
          onSuccess: () => {
            setFormMode({ type: 'create', parent: null });
            refetch();
          },
        }
      );
    } else {
      updateCategory.mutate(
        { id: formMode.node._id, payload: { name: values.name, parentId: values.parentId } },
        {
          onSuccess: () => {
            setFormMode({ type: 'create', parent: null });
            refetch();
          },
        }
      );
    }
  };

  const handleDeleteConfirm = () => {
    if (!deletingNode) return;
    deleteCategory.mutate(deletingNode._id, {
      onSuccess: () => {
        setDeletingNode(null);
        setFormMode({ type: 'create', parent: null });
        refetch();
      },
    });
  };

  return (
    <AdminLayout title="Category Management">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Categories
              </Typography>
              <Button
                variant="contained"
                disableElevation
                size="small"
                onClick={() => setFormMode({ type: 'create', parent: null })}
              >
                + Add Root Category
              </Button>
            </Stack>

            {isLoading ? (
              <Stack spacing={1.5}>
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-6 w-1/4" />
              </Stack>
            ) : isError ? (
              <ErrorState message="Failed to load categories." onRetry={refetch} />
            ) : (
              <>
                <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', px: 0.5, mb: 0.5 }}>
                  <FolderIcon fontSize="small" sx={{ color: 'text.disabled' }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', py: 1 }}>
                    All Books
                  </Typography>
                </Stack>
                <Box sx={{ pl: 3, ml: 1.5, borderLeft: '1px solid', borderColor: 'divider' }}>
                  <CategoryTree
                    nodes={tree || []}
                    onAddChild={(parent) => setFormMode({ type: 'create', parent })}
                    onEdit={(node) => setFormMode({ type: 'edit', node })}
                    onDelete={(node) => setDeletingNode(node)}
                  />
                </Box>
              </>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CategoryForm
            tree={tree || []}
            mode={formMode}
            onSubmit={handleSubmit}
            isSubmitting={createCategory.isPending || updateCategory.isPending}
          />
        </Grid>
      </Grid>

      <ConfirmDialog
        isOpen={!!deletingNode}
        title="Delete Category"
        message={`Are you sure you want to delete "${deletingNode?.name}"? Categories with child categories or assigned books cannot be deleted.`}
        confirmLabel="Delete"
        isLoading={deleteCategory.isPending}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingNode(null)}
      />
    </AdminLayout>
  );
}
