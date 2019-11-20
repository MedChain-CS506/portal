import { createMuiTheme } from '@material-ui/core/styles';

const baseTheme = {
  palette: {
    primary: {
      main: '#FF0000',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
};

export const lightTheme = createMuiTheme({
  palette: { ...baseTheme.palette, type: 'light' },
});

export const darkTheme = createMuiTheme({
  palette: { ...baseTheme.palette, type: 'dark' },
});
