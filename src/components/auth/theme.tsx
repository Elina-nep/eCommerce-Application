import { createTheme } from '@mui/material/styles';

export const loginTheme = createTheme({
  typography: {
    fontFamily: ['Iceland', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: '#fff',
    },
    error: {
      main: '#000',
    },
  },
});

export const registerTheme = createTheme({
  typography: {
    fontSize: 18,
    fontFamily: ['Iceland', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: '#50a294',
    },
    error: {
      main: '#FE4004',
    },
  },
});
