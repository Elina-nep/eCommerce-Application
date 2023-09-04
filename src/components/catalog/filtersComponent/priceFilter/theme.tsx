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
        root: {
          width: '90%',
          '@media (max-width: 850px)': {
            width: '70%',
            margin: '1rem',
          },
        },
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
