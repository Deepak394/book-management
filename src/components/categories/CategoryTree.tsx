import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import FolderIcon from '@mui/icons-material/Folder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import type { CategoryNode } from '@/types';

interface CategoryTreeProps {
  nodes: CategoryNode[];
  onAddChild: (parent: CategoryNode) => void;
  onEdit: (node: CategoryNode) => void;
  onDelete: (node: CategoryNode) => void;
}

export function CategoryTree({ nodes, onAddChild, onEdit, onDelete }: CategoryTreeProps) {
  if (nodes.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No categories yet. Create a root category to get started.
      </Typography>
    );
  }

  return (
    <Box>
      {nodes.map((node) => (
        <CategoryTreeNode key={node._id} node={node} onAddChild={onAddChild} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </Box>
  );
}

function CategoryTreeNode({
  node,
  onAddChild,
  onEdit,
  onDelete,
}: {
  node: CategoryNode;
  onAddChild: (parent: CategoryNode) => void;
  onEdit: (node: CategoryNode) => void;
  onDelete: (node: CategoryNode) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children.length > 0;

  return (
    <Box>
      <Stack
        direction="row"
        spacing={0.5}
        sx={{
          alignItems: 'center',
          borderRadius: 1.5,
          px: 0.5,
          '&:hover': { bgcolor: 'action.hover' },
          '&:hover .cat-actions': { opacity: 1 },
        }}
      >
        <IconButton
          size="small"
          onClick={() => setExpanded((v) => !v)}
          sx={{ visibility: hasChildren ? 'visible' : 'hidden' }}
        >
          {expanded ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
        </IconButton>

        <FolderIcon fontSize="small" sx={{ color: 'primary.main', opacity: 0.85 }} />

        <Typography variant="body2" sx={{ fontWeight: 500, py: 1 }}>
          {node.name}
        </Typography>

        <Stack direction="row" className="cat-actions" sx={{ ml: 'auto', opacity: 0, transition: 'opacity 0.15s' }}>
          {node.level < 3 && (
            <IconButton size="small" onClick={() => onAddChild(node)} aria-label="Add child category">
              <AddIcon fontSize="small" />
            </IconButton>
          )}
          <IconButton size="small" onClick={() => onEdit(node)} aria-label="Edit category">
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => onDelete(node)} aria-label="Delete category">
            <DeleteOutlineIcon fontSize="small" color="error" />
          </IconButton>
        </Stack>
      </Stack>

      {hasChildren && (
        <Collapse in={expanded}>
          <Box sx={{ pl: 3, ml: 1.5, borderLeft: '1px solid', borderColor: 'divider' }}>
            <CategoryTree nodes={node.children} onAddChild={onAddChild} onEdit={onEdit} onDelete={onDelete} />
          </Box>
        </Collapse>
      )}
    </Box>
  );
}
