'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
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
          borderRadius: 10,
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
        input: {
          borderRadius: 10,
          backgroundColor: 'inherit',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: '#FAFAFA',
        },
        input: {
          borderRadius: 10,
          backgroundColor: 'inherit',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: '#FAFAFA',
        },
        input: {
          borderRadius: 10,
          backgroundColor: 'inherit',
        },
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
          borderRadius: 10,
          backgroundColor: '#FAFAFA',
        },
        outlined: {
          borderRadius: 10,
          backgroundColor: '#FAFAFA',
        },
        filled: {
          borderRadius: 10,
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
          borderRadius: 10,
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
      },
    },
  },
  typography: {
    fontFamily: 'var(--font-geist-sans)',
  },
});

export default theme;
