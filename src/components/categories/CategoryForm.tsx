import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormRow } from '@/components/common/FormRow';
import type { CategoryNode } from '@/types';

interface ParentOption {
  id: string;
  label: string;
  level: 1 | 2 | 3;
}

function flattenEligibleParents(nodes: CategoryNode[], depth = 0): ParentOption[] {
  const result: ParentOption[] = [];
  for (const node of nodes) {
    if (node.level < 3) {
      result.push({ id: node._id, label: `${'— '.repeat(depth)}${node.name}`, level: node.level });
      result.push(...flattenEligibleParents(node.children, depth + 1));
    }
  }
  return result;
}

export type CategoryFormMode =
  | { type: 'create'; parent: CategoryNode | null }
  | { type: 'edit'; node: CategoryNode };

interface CategoryFormProps {
  tree: CategoryNode[];
  mode: CategoryFormMode;
  onSubmit: (values: { name: string; parentId: string | null }) => void;
  isSubmitting?: boolean;
}

interface FormValues {
  name: string;
  parentId: string;
}

export function CategoryForm({ tree, mode, onSubmit, isSubmitting }: CategoryFormProps) {
  const parentOptions = useMemo(() => flattenEligibleParents(tree), [tree]);

  const initialValues: FormValues =
    mode.type === 'edit'
      ? { name: mode.node.name, parentId: mode.node.parentId || '' }
      : { name: '', parentId: mode.parent?._id || '' };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: initialValues });

  useEffect(() => {
    reset(initialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const parentId = watch('parentId');
  const level = parentId ? (parentOptions.find((p) => p.id === parentId)?.level ?? 0) + 1 : 1;

  const submit = handleSubmit((values) => {
    onSubmit({ name: values.name, parentId: values.parentId || null });
  });

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5 }}>
        {mode.type === 'edit' ? 'Edit Category' : 'Add Category'}
      </Typography>

      <Box component="form" onSubmit={submit}>
        <Stack spacing={2.5}>
          <FormRow label="Parent Category">
            <TextField select fullWidth size="small" slotProps={{ select: { native: true } }} {...register('parentId')}>
              <option value="">{'—'} None (Root Category) {'—'}</option>
              {parentOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </TextField>
          </FormRow>

          <FormRow label="Category Name">
            <TextField
              fullWidth
              size="small"
              placeholder="e.g. Fiction, Romance, Classic"
              error={!!errors.name}
              helperText={errors.name?.message}
              autoFocus
              {...register('name', { required: 'Category name is required' })}
            />
          </FormRow>

          <FormRow label="Level">
            <TextField fullWidth size="small" value={level} disabled />
          </FormRow>

          <Stack direction="row" sx={{ pt: 1 }}>
            <Button type="submit" variant="contained" disableElevation disabled={isSubmitting}>
              Save
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}
