import React from 'react';

import PropTypes from 'prop-types';

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

const useStyles = makeStyles({
  docNav: {
    background: 'linear-gradient(45deg, #F00000 30%, #DC281E 90%)',
  },
  pharmaNav: {
    background: 'linear-gradient(45deg, #0575E6 30%, #021B79 90%)',
  },
});

const Navbar = ({ theme, handleToggleTheme, isPharmacist }) => {
  const classes = useStyles();
  return (
    <AppBar
      className={isPharmacist ? classes.pharmaNav : classes.docNav}
      position="static"
    >
      <Toolbar variant="regular">
        <Box data-testid="title-link" flexGrow={1}>
          <Link to="/">
            <Typography color="inherit" variant="h4">
              {process.env.REACT_APP_NAME}
            </Typography>
          </Link>
        </Box>

        <IconButton
          data-testid="theme-toggle"
          color="inherit"
          onClick={handleToggleTheme}
        >
          {theme.palette.type === 'light' ? (
            <Brightness4Icon />
          ) : (
            <Brightness7Icon />
          )}
        </IconButton>

        <IconButton
          data-testid="git-hub-link"
          color="inherit"
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

Navbar.propTypes = {
  theme: PropTypes.object,
  handleToggleTheme: PropTypes.func.isRequired,
  isPharmacist: PropTypes.bool,
};

export default Navbar;
