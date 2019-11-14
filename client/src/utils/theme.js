import { createMuiTheme } from '@material-ui/core/styles';

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
    type: 'light',
  },
});

export const changeTheme = newPaletteType => {
  theme.palette.type = newPaletteType;
  console.log(newPaletteType);
};
