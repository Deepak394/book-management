import { useMemo } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useCategoryTree } from '@/hooks/useCategories';
import type { CategoryNode } from '@/types';

export interface CategoryFilterValue {
  parentId: string;
  childId: string;
  leafId: string;
}

interface BookFiltersProps {
  value: CategoryFilterValue;
  onChange: (value: CategoryFilterValue) => void;
}

export function BookFilters({ value, onChange }: BookFiltersProps) {
  const { data: tree, isLoading } = useCategoryTree();

  const parents = tree || [];
  const children = useMemo<CategoryNode[]>(
    () => parents.find((p) => p._id === value.parentId)?.children || [],
    [parents, value.parentId]
  );
  const leaves = useMemo<CategoryNode[]>(
    () => children.find((c) => c._id === value.childId)?.children || [],
    [children, value.childId]
  );

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          select
          fullWidth
          size="small"
          label="Parent Category"
          disabled={isLoading}
          value={value.parentId}
          onChange={(e) => onChange({ parentId: e.target.value, childId: '', leafId: '' })}
        >
          <MenuItem value="">All Parent Categories</MenuItem>
          {parents.map((p) => (
            <MenuItem key={p._id} value={p._id}>
              {p.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          select
          fullWidth
          size="small"
          label="Child Category"
          disabled={!value.parentId}
          value={value.childId}
          onChange={(e) => onChange({ ...value, childId: e.target.value, leafId: '' })}
        >
          <MenuItem value="">All Child Categories</MenuItem>
          {children.map((c) => (
            <MenuItem key={c._id} value={c._id}>
              {c.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          select
          fullWidth
          size="small"
          label="Leaf Category"
          disabled={!value.childId}
          value={value.leafId}
          onChange={(e) => onChange({ ...value, leafId: e.target.value })}
        >
          <MenuItem value="">All Leaf Categories</MenuItem>
          {leaves.map((l) => (
            <MenuItem key={l._id} value={l._id}>
              {l.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
}
