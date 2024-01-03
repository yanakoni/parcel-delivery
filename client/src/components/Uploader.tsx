import {
  CSSProperties,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import { useTranslation } from 'react-i18next';
import ImageUploading, {
  ImageListType,
  ImageType,
} from 'react-images-uploading';
import {
  Box,
  Button,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
} from '@mui/material';
import { MAX_DOC_IMAGE_SIZE_BYTES } from '../consts';
import { styles } from './styles';

interface UploaderProps {
  initialImage: string | null;
  onChange: (image: ImageType, name: string) => void;
  name: string;
  maxNumber?: number;
  maxFileSize?: number;
  textComponent?: ReactNode;
  error?: string;
}

export const Uploader: FC<UploaderProps> = ({
  initialImage,
  onChange: onChangeHandler,
  name,
  maxNumber = 1,
  maxFileSize = MAX_DOC_IMAGE_SIZE_BYTES,
  textComponent,
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
      maxFileSize={maxFileSize}
      maxNumber={maxNumber}
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
        errors,
      }) => (
        <>
          {maxNumber === 1 && (
            <>
              <Button
                sx={{
                  ...styles.imageDropZone,
                  backgroundImage: `url(${
                    imageList[0]?.dataURL || initialImage
                  })`,
                  border: (theme) =>
                    `2px dashed ${
                      error ? theme.palette.error.main : theme.palette.grey[200]
                    }`,
                }}
                onClick={imageList[0] ? () => onImageUpdate(0) : onImageUpload}
                {...dragProps}
              >
                {!imageList[0] && (
                  <>
                    <Box sx={styles.imageDropZoneIconContainer}>
                      <UploadFileOutlinedIcon
                        sx={styles.imageDropZoneIcon}
                        color="primary"
                      />
                    </Box>
                    {textComponent}
                  </>
                )}
                {imageList[0] && (
                  <Box sx={styles.editIconContainer}>
                    <ModeOutlinedIcon
                      width={30}
                      height={30}
                      sx={{ fill: '#FFF' }}
                    />
                  </Box>
                )}
              </Button>
            </>
          )}
          {maxNumber > 1 && (
            <>
              <Button
                sx={{
                  ...styles.imageDropZone,
                  border: (theme) =>
                    `2px dashed ${
                      error ? theme.palette.error.main : theme.palette.grey[200]
                    }`,
                  bgcolor: (theme) =>
                    isDragging
                      ? theme.palette.action.hover
                      : theme.palette.background.paper,
                }}
                onClick={onImageUpload}
                {...dragProps}
              >
                <Box sx={styles.imageDropZoneIconContainer}>
                  <UploadFileOutlinedIcon
                    sx={styles.imageDropZoneIcon}
                    color="primary"
                  />
                </Box>
                {textComponent}
              </Button>
              {!!imageList.length && (
                <Grid container mt={3}>
                  {maxNumber > 1 && (
                    <Grid item xs={12} display="flex" justifyContent="center">
                      <Button
                        onClick={onImageRemoveAll}
                        variant="contained"
                        color="error"
                      >
                        {t('general.removeAllImages')}
                      </Button>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <ImageList cols={2} rowHeight={350}>
                      {imageList.map((image, index) => (
                        <ImageListItem key={index}>
                          <img
                            src={image.dataURL}
                            alt=""
                            style={styles.imagePreview as CSSProperties}
                          />
                          <Grid container spacing={2} mt={2} mb={2}>
                            <Grid item xs={6}>
                              <Button
                                onClick={() => onImageUpdate(index)}
                                variant="outlined"
                                color="info"
                                fullWidth
                              >
                                {t('general.update')}
                              </Button>
                            </Grid>
                            <Grid item xs={6}>
                              <Button
                                onClick={() => onImageRemove(index)}
                                variant="outlined"
                                color="error"
                                fullWidth
                              >
                                {t('general.remove')}
                              </Button>
                            </Grid>
                          </Grid>
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Grid>
                </Grid>
              )}
            </>
          )}
          {!!error && (
            <Typography
              color="error"
              variant="h6"
              component="p"
              textAlign="center"
              mt={2}
            >
              {error}
            </Typography>
          )}
          {errors && (
            <Box>
              {errors.maxNumber && (
                <Typography
                  color="error"
                  variant="h6"
                  component="p"
                  textAlign="center"
                  mt={2}
                >
                  {t('general.maxFilesExceedError')}
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
                  {t('general.incompatibleFileAcceptTypeError')}
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
                  {t('general.fileExceedsMaxSizeError')}
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
                  {t('general.fileResolutionError')}
                </Typography>
              )}
            </Box>
          )}
        </>
      )}
    </ImageUploading>
  );
};
