import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import { Button, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import ImageUploading, {
  ImageListType,
  ImageType,
} from 'react-images-uploading';
import { MAX_IMAGE_SIZE_BYTES } from '../../consts';
import { styles } from './styles';

interface AvatarUploaderProps {
  initialImage: string | null;
  onChange: (image: ImageType, name: string) => void;
  name: string;
  error?: string;
}

export const AvatarUploader: FC<AvatarUploaderProps> = ({
  initialImage,
  onChange: onChangeHandler,
  name,
  error,
}) => {
  const { t } = useTranslation();
  const [image, setImage] = useState<ImageType>();

  useEffect(() => {
    if (!initialImage) return;

    setImage({
      dataURL: initialImage,
    });
  }, [initialImage]);

  const value = useMemo(() => {
    return image ? [image] : [];
  }, [image]);

  const onChange = useCallback(
    (imageList: ImageListType) => {
      setImage(imageList[0]);

      onChangeHandler(imageList[0], name);
    },
    [name, onChangeHandler],
  );

  return (
    <ImageUploading
      value={value}
      onChange={onChange}
      acceptType={['jpg', 'png', 'jpeg']}
      maxFileSize={MAX_IMAGE_SIZE_BYTES}
      maxNumber={1}
    >
      {({
        imageList,
        onImageUpload,
        onImageUpdate,
        isDragging,
        dragProps,
        errors,
      }) => (
        <>
          <Box sx={styles.avatarContainer}>
            <Paper elevation={3} sx={{ borderRadius: '50%', width: '200px' }}>
              <Button
                sx={{
                  ...styles.uploadAvatarButton,
                  border: (theme) =>
                    `2px dashed ${isDragging && theme.palette.primary.main}`,
                  backgroundImage: `url(${
                    imageList[0]?.dataUrl || initialImage
                  })`,
                }}
                onClick={imageList[0] ? () => onImageUpdate(0) : onImageUpload}
                fullWidth
                {...dragProps}
              >
                <Box sx={styles.editIconContainer}>
                  <ModeOutlinedIcon
                    width={30}
                    height={30}
                    sx={{ fill: '#FFF' }}
                  />
                </Box>
              </Button>
            </Paper>
          </Box>
          {errors && (
            <div>
              {error && (
                <Typography
                  color="error"
                  variant="h6"
                  component="p"
                  textAlign="center"
                  mt={2}
                >
                  {t(error)}
                </Typography>
              )}
              {errors.acceptType && (
                <Typography
                  color="error"
                  variant="h6"
                  component="p"
                  textAlign="center"
                  mt={2}
                >
                  Your selected file type is not allow
                </Typography>
              )}
              {errors.maxFileSize && (
                <Typography
                  color="error"
                  variant="h6"
                  component="p"
                  textAlign="center"
                  mt={2}
                >
                  {t('clientKyc.fileExceedsMaxSizeError')}
                </Typography>
              )}
              {errors.resolution && (
                <Typography
                  color="error"
                  variant="h6"
                  component="p"
                  textAlign="center"
                  mt={2}
                >
                  Selected file is not match your desired resolution
                </Typography>
              )}
            </div>
          )}
        </>
      )}
    </ImageUploading>
  );
};
