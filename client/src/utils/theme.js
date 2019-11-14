import { createMuiTheme } from '@material-ui/core/styles';

// theme.changeTheme = (type) => {
//   console.log(type)
// }

// A custom theme for this app
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FF0000',
      light: '#E7F6E7',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFFFFF',
    },
    type: 'dark',
  },
});
