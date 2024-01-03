import { BaseVariant, enqueueSnackbar, SnackbarOrigin } from 'notistack';

const showNotification = (
  msg: string,
  variant: BaseVariant = 'success',
  autoHideDuration = 6000,
  anchorOrigin: SnackbarOrigin = { vertical: 'top', horizontal: 'right' },
) =>
  enqueueSnackbar(msg, {
    variant,
    autoHideDuration,
    anchorOrigin,
  });

export { showNotification };
