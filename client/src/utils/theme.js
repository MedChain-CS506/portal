import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FF0000',
      light: '#E7F6E7',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#ffffff',
    },
  },
});

export default theme;
