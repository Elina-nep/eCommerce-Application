import { createTheme } from '@mui/material/styles';

export const priceTheme = createTheme({
  typography: {
    fontFamily: ['Iceland', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: '#50a294',
    },
  },
  components: {
    MuiSlider: {
      styleOverrides: {
        thumb: {
          '&:hover': {
            '& .MuiSlider-valueLabel': {
              backgroundColor: '#ff814e',
            },
          },
        },
        valueLabel: {
          color: 'ffffff',
          backgroundColor: '#50a294',
        },
      },
    },
  },
});
