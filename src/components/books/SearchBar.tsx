import type { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);

  return (
    <TextField
      fullWidth
      size="small"
      value={value}
      onChange={handleChange}
      placeholder={placeholder || 'Search by title, author, or ISBN...'}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" color="disabled" />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
