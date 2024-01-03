import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const styles: {
  [key: string]: SxProps<Theme>;
} = {
  imageDropZone: {
    p: 4,
    width: '100%',
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
    color: 'text.secondary',
    cursor: 'pointer',
    '&:hover': {
      bgcolor: (theme) => theme.palette.action.hover,
    },
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
  },
  imageDropZoneIconContainer: {
    borderRadius: '100px',
    background: (theme) => theme.palette.primary.light,
    padding: '20px',
    gap: '10px',
  },
  imageDropZoneIcon: { width: 50, height: 50 },
  imagePreview: {
    width: '100%',
    maxHeight: '250px',
    objectFit: 'fill',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 2,
    background: (theme) => theme.palette.primary.main,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
