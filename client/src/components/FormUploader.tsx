import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import ImageUploading, {
  ImageListType,
  ImageType,
} from 'react-images-uploading';
import {
  useFormContext,
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from 'react-hook-form';
import { Box, Button, Typography } from '@mui/material';
import { MAX_DOC_IMAGE_SIZE_BYTES } from '../consts';
import { styles } from './styles';

interface UploaderProps {
  initialImage?: string;
  formChangeHandler: (...event: any[]) => void;
  maxFileSize?: number;
  textComponent?: ReactNode;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

const Uploader: FC<UploaderProps> = ({
  initialImage,
  formChangeHandler,
  maxFileSize = MAX_DOC_IMAGE_SIZE_BYTES,
  textComponent,
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
      maxFileSize={maxFileSize}
      maxNumber={1}
    >
      {({ imageList, onImageUpload, onImageUpdate, dragProps }) => (
        <>
          <Button
            sx={{
              ...styles.imageDropZone,
              backgroundImage: `url(${imageList[0]?.dataURL || initialImage})`,
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
          {error && (
            <Typography
              color="error"
              variant="h6"
              component="p"
              textAlign="center"
              mt={2}
            >
              {error?.message?.toString()}
            </Typography>
          )}
        </>
      )}
    </ImageUploading>
  );
};

interface FormUploaderProps {
  initialImage?: string;
  name: string;
  maxFileSize?: number;
  textComponent?: ReactNode;
}

export const FormUploader: FC<FormUploaderProps> = ({
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
        <Uploader
          initialImage={initialImage}
          formChangeHandler={field.onChange}
          error={errors[name]}
          {...restProps}
        />
      )}
    />
  );
};
