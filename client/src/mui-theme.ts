import { createTheme } from '@mui/material';

const fontFamily = 'Roboto';
const primaryColor = '#205EEE';
const warningColor = '#E8820A';
const secondaryTextColor = '#9C9C9C';
const grey600 = '#5A5A5A';

const muiTheme = createTheme({
  palette: {
    primary: {
      light: '#E6EDFD',
      main: primaryColor,
    },
    secondary: {
      main: secondaryTextColor,
    },
    text: {
      secondary: secondaryTextColor,
    },
    grey: {
      200: '#E6E6E6',
      600: grey600,
    },
    error: { [500]: '#F50000' },
    warning: { main: warningColor },
  },
  typography: {
    fontFamily,
    button: {
      fontSize: '22px',
      fontWeight: 500,
      lineHeight: '26px',
      textTransform: 'capitalize',
      borderRadius: '10px',
      padding: '8px 22px',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&.noHover:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '&.langSelect': {
            color: primaryColor,
            div: {
              padding: '6px 12px',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: primaryColor,
            },
            '& .MuiSvgIcon-root': {
              color: primaryColor,
            },
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: 0,
          },

          '& .MuiTableHead-root .MuiTableRow-root .MuiTableCell-head': {
            resize: 'horizontal',
            overflowX: 'overlay',
            overflowY: 'hidden',
          },

          '& .MuiDataGrid-root.dashboardColumn': {
            borderWidth: 0,
            minHeight: '80%',

            '& .MuiDataGrid-overlayWrapper': {
              height: '100%',
            },

            '& .MuiDataGrid-overlayWrapperInner': {
              height: '100% !important',
              paddingTop: 20,
            },

            '& .MuiDataGrid-footerContainer': {
              borderTop: 'none',
            },

            '& .MuiDataGrid-columnHeaderTitleContainer': {
              fontSize: 23,
              fontWeight: 500,
            },

            '& .MuiDataGrid-cell': {
              fontSize: 20,
              fontWeight: 400,

              '&.negative': {
                color: '#E90202',
              },

              '&.positive': {
                color: '#007611',
              },
            },
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          marginBottom: '12px',

          '&.Mui-selected': {
            background: 'rgba(32, 94, 238, 0.05)',

            '& .MuiTypography-root': {
              fontWeight: 500,
            },
          },

          '& .MuiTypography-root': {
            fontSize: '22px',
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        text: {
          fontSize: '16px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: 'white',
        },
        root: {
          height: '112px',
        },
      },
    },
  },
});

// typography
muiTheme.typography.body1 = {
  fontSize: '16px',
  lineHeight: 1.2,
};
muiTheme.typography.body2 = {
  fontSize: '14px',
  lineHeight: 1.2,
};
muiTheme.typography.h1 = {
  fontSize: '49px',
  fontWeight: 500,
  lineHeight: 'normal',
};
muiTheme.typography.h2 = {
  fontSize: '42px',
  fontWeight: 500,
  lineHeight: '123%',
};
muiTheme.typography.h3 = {
  fontSize: '34px',
  fontWeight: 600,
  lineHeight: 'normal',
};
muiTheme.typography.h4 = {
  fontSize: '27px',
  fontWeight: 400,
  lineHeight: 'normal',
};
muiTheme.typography.h5 = {
  fontSize: '24px',
  fontWeight: 400,
  lineHeight: '133%',
};
muiTheme.typography.h6 = {
  fontSize: '18px',
  lineHeight: 1.2,
};
muiTheme.typography.subtitle1 = {
  fontSize: '20px',
  lineHeight: 1.1,
};

export default muiTheme;
