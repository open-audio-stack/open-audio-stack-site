'use client';
import { createTheme } from '@mui/material/styles';

// Shared between themes, if more themes are added this will be useful
const sharedStyles = {
  borderRadius: 10,
};

const sharedFilledInputStyles = {
  borderRadius: sharedStyles.borderRadius,
  backgroundColor: 'inherit',
};

export const lightTheme = createTheme({
  cssVariables: true,
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        tag: {
          marginTop: '7px',
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          ...sharedStyles,
          backgroundColor: '#FAFAFA',
          boxShadow: 'none',
          borderBottom: 'none',
          '&:before, &:after': {
            borderBottom: 'none !important',
          },
          '&:hover': {
            backgroundColor: '#F5F5F5',
          },
          '&.Mui-focused': {
            backgroundColor: '#FAFAFA',
          },
        },
        input: sharedFilledInputStyles,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          ...sharedStyles,
          backgroundColor: '#FAFAFA',
        },
        input: sharedFilledInputStyles,
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          ...sharedStyles,
          backgroundColor: '#FAFAFA',
        },
        input: sharedFilledInputStyles,
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.label-dark': {
            color: '#fff',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          ...sharedStyles,
          backgroundColor: '#FAFAFA',
        },
        outlined: {
          ...sharedStyles,
          backgroundColor: '#FAFAFA',
        },
        filled: {
          ...sharedStyles,
          backgroundColor: '#FAFAFA',
        },
        root: {
          '&.select-dark': {
            backgroundColor: '#000',
            color: '#fff',
            '.MuiSelect-select': {
              backgroundColor: '#000',
              color: '#fff',
            },
            '& .MuiInputLabel-root': {
              color: '#fff',
            },
            '& .MuiSelect-icon': {
              color: '#fff',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#000',
          color: '#fff',
          '& .MuiChip-icon, & .MuiChip-deleteIcon, & svg': {
            color: '#fff',
            fill: '#fff',
          },
        },
        label: {
          color: '#fff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          ...sharedStyles,
          textTransform: 'none',
        },
        contained: {
          backgroundColor: '#000',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#222',
            color: '#fff',
          },
        },
        outlined: {
          borderColor: '#000',
          color: '#000',
          '&:hover': {
            backgroundColor: '#f8f8f8',
            color: '#000',
          },
        },
      },
    },
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), sans-serif',
  },
  palette: {
    mode: 'light',
    background: {
      default: '#fafafa',
      paper: '#fff',
    },
    text: {
      primary: '#000',
      secondary: '#222',
    },
  },
});

export const darkTheme = createTheme({
  cssVariables: true,
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        tag: {
          marginTop: '7px',
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          ...sharedStyles,
          backgroundColor: '#333',
          boxShadow: 'none',
          borderBottom: 'none',
          '&:before, &:after': {
            borderBottom: 'none !important',
          },
          '&:hover': {
            backgroundColor: '#444',
          },
          '&.Mui-focused': {
            backgroundColor: '#333',
          },
        },
        input: {
          ...sharedFilledInputStyles,
          color: '#fff',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          ...sharedStyles,
          backgroundColor: '#333',
        },
        input: {
          ...sharedFilledInputStyles,
          color: '#fff',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          ...sharedStyles,
          backgroundColor: '#333',
        },
        input: {
          ...sharedFilledInputStyles,
          color: '#fff',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          ...sharedStyles,
          backgroundColor: '#333',
          color: '#fff',
        },
        outlined: {
          ...sharedStyles,
          backgroundColor: '#333',
          color: '#fff',
        },
        filled: {
          ...sharedStyles,
          backgroundColor: '#333',
          color: '#fff',
        },
        root: {
          '&.select-dark': {
            backgroundColor: '#000',
            color: '#fff',
            '.MuiSelect-select': {
              backgroundColor: '#000',
              color: '#fff',
            },
            '& .MuiInputLabel-root': {
              color: '#fff',
            },
            '& .MuiSelect-icon': {
              color: '#fff',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          color: '#000',
          '& .MuiChip-icon, & .MuiChip-deleteIcon, & svg': {
            color: '#000',
            fill: '#000',
          },
        },
        label: {
          color: '#000',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          ...sharedStyles,
          textTransform: 'none',
        },
        contained: {
          backgroundColor: '#fff',
          color: '#000',
          '&:hover': {
            backgroundColor: '#eee',
            color: '#000',
          },
        },
        outlined: {
          borderColor: '#fff',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#333',
            color: '#fff',
          },
        },
      },
    },
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), sans-serif',
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#181818',
      paper: '#232323',
    },
    text: {
      primary: '#fff',
      secondary: '#eee',
    },
  },
});
