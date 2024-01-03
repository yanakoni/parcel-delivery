import { FC, useCallback } from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface EditActionButtonProps {
  id: string;
  onEdit: (id: string) => void;
}

export const EditActionButton: FC<EditActionButtonProps> = ({ id, onEdit }) => {
  const editEntityHandler = useCallback(() => {
    onEdit(id);
  }, [id, onEdit]);

  return (
    <IconButton
      sx={{ borderRadius: '9px', background: '#205EEE1A', color: '#205EEE' }}
      onClick={editEntityHandler}
    >
      <EditIcon />
    </IconButton>
  );
};
