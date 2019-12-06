import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core';

import GitHubIcon from '@material-ui/icons/GitHub';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles({
  docNav: {
    background: 'linear-gradient(45deg, #F00000 30%, #DC281E 90%)',
  },
  pharmaNav: {
    background: 'linear-gradient(45deg, #0575E6 30%, #021B79 90%)',
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const Navbar = ({ theme, handleToggleTheme, isPharmacist }) => {
  const classes = useStyles();
  const [notificationsDrawer, setNotificationsDrawer] = useState(false);

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setNotificationsDrawer(open);
  };

  const notificationList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="John Doe" secondary="Join Request" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Charlie Smith" secondary="Join Request" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Dave Johnson" secondary="Join Request" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <AppBar
      className={isPharmacist ? classes.pharmaNav : classes.docNav}
      position="static"
    >
      <Toolbar variant="regular">
        <Box flexGrow={1}>
          <Link to="/">
            <Typography data-testid="title-link" color="inherit" variant="h4">
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

        <>
          <IconButton color="inherit" onClick={toggleDrawer(true)}>
            <Badge variant="dot" color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Drawer
            anchor="right"
            open={notificationsDrawer}
            onClose={toggleDrawer(false)}
          >
            {notificationList()}
          </Drawer>
        </>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  theme: PropTypes.object,
  handleToggleTheme: PropTypes.func,
  isPharmacist: PropTypes.bool,
};

export default Navbar;
