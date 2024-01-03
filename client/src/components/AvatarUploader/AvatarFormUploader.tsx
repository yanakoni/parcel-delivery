import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import { Button, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import ImageUploading, {
  ImageListType,
  ImageType,
} from 'react-images-uploading';
import { styles } from './styles';
import {
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
  useFormContext,
} from 'react-hook-form';

interface AvatarUploaderProps {
  initialImage?: string | null;
  formChangeHandler: (...event: any[]) => void;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

const AvatarUploader: FC<AvatarUploaderProps> = ({
  initialImage,
  formChangeHandler,
  error,
}) => {
  const [image, setImage] = useState<ImageType>();

  useEffect(() => {
    if (!initialImage) return;

    setImage({
      dataURL: initialImage,
    });
  }, [initialImage]);

  useEffect(() => {
    if (!image) return;

    formChangeHandler(image.dataURL);
  }, [formChangeHandler, image]);

  const value = useMemo(() => {
    return image ? [image] : [];
  }, [image]);

  const onChange = useCallback((value: ImageListType) => {
    setImage(value[0]);
  }, []);

  return (
    <ImageUploading
      value={value}
      onChange={onChange}
      acceptType={['jpg', 'png', 'jpeg']}
      maxNumber={1}
    >
      {({ imageList, onImageUpload, onImageUpdate, isDragging, dragProps }) => (
        <>
          <Box sx={styles.avatarContainer}>
            <Paper elevation={3} sx={{ borderRadius: '50%', width: '200px' }}>
              <Button
                sx={{
                  ...styles.uploadAvatarButton,
                  border: (theme) =>
                    `2px dashed ${isDragging && theme.palette.primary.main}`,
                  backgroundImage: `url(${image?.dataURL})`,
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
          {error && (
            <Typography
              color="error"
              variant="h6"
              component="p"
              textAlign="center"
              mt={2}
            >
              {error.message?.toString()}
            </Typography>
          )}
        </>
      )}
    </ImageUploading>
  );
};

interface AvatarFormUploaderProps {
  initialImage?: string | null;
  name: string;
}

export const AvatarFormUploader: FC<AvatarFormUploaderProps> = ({
  initialImage,
  name,
  ...restProps
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={initialImage}
      render={({ field }) => (
        <AvatarUploader
          initialImage={initialImage}
          formChangeHandler={field.onChange}
          error={errors[name]}
          {...restProps}
        />
      )}
    />
  );
};
