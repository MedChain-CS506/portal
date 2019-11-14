import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import theme from '../../../utils/theme';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #F00000 30%, #DC281E 90%)',
  },
});

const Navbar = () => {
  const classes = useStyles();

  // const [theme, setTheme] = useState({ palette: { type: 'dark' } });

  // const toggleTheme = () => {
  //   const newPaletteType = theme.palette.type === 'light' ? 'dark' : 'light';
  //   setTheme({ palette: { type: newPaletteType } });

  //   // theme.changeTheme(type)
  //   // theme.changeTheme({ type: type })

  //   console.log(theme);
  // };

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar variant="regular">
        <Box id="title-link" flexGrow={1}>
          <Link to="/">
            <Typography color="inherit" variant="h4">
              {process.env.REACT_APP_NAME}
            </Typography>
          </Link>
        </Box>

        <IconButton
          id="theme-toggle"
          color="secondary"
          // onClick={() => toggleTheme()}
        >
          {theme.palette.type === 'light' ? (
            <Brightness4Icon />
          ) : (
            <Brightness7Icon />
          )}
        </IconButton>

        <IconButton
          id="git-hub-link"
          color="secondary"
          href="https://github.com/MedChain-CS506"
          rel="noopener noreferrer"
          target="_blank"
        >
          <GitHubIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
