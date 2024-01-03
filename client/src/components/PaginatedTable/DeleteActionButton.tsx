import { FC, useCallback } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

interface DeleteActionButtonProps {
  onDelete: (id: string) => void;
  id: string;
}

export const DeleteActionButton: FC<DeleteActionButtonProps> = ({
  onDelete,
  id,
}) => {
  const deleteHandler = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  return (
    <IconButton
      sx={{ borderRadius: '9px', background: '#E902021A', color: '#E90202' }}
      onClick={deleteHandler}
    >
      <DeleteIcon />
    </IconButton>
  );
};
