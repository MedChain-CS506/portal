import React, { useState } from 'react';

import PropTypes from 'prop-types';

//* MUI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #F00000 30%, #DC281E 90%)',
  },
});

const Navbar = ({
  signedIn = false,
  performingAction = false,
  userData,
  onSignUpClick,
  onSignInClick,
  onSettingsClick,
  onSignOutClick,
}) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const getInitials = () => {
    console.log(userData.firstName);
    const { firstName } = userData;
    const { lastName } = userData;

    if (firstName && lastName) {
      return firstName.charAt(0) + lastName.charAt(0);
    }
    if (firstName) {
      return firstName.charAt(0);
    }
    if (lastName) {
      return lastName.charAt(0);
    }
    return 'NN';
  };

  const handleSettingsClick = () => {
    setAnchorEl(null);
    onSettingsClick();
  };

  const handleSignOutClick = () => {
    setAnchorEl(null);
    onSignOutClick();
  };

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar variant="regular">
        <Box flexGrow={1}>
          <Typography color="inherit" variant="h4">
            {process.env.REACT_APP_NAME}
          </Typography>
        </Box>

        {signedIn && (
          <>
            <IconButton
              color="inherit"
              disabled={performingAction}
              onClick={event => setAnchorEl(event.currentTarget)}
            >
              <Avatar alt="Avatar">{console.log('getInitials()')}</Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem
                disabled={performingAction}
                onClick={handleSettingsClick}
              >
                Settings
              </MenuItem>
              <MenuItem
                disabled={performingAction}
                onClick={handleSignOutClick}
              >
                Sign out
              </MenuItem>
            </Menu>
          </>
        )}

        {!signedIn && (
          <>
            <Box mr={1}>
              <Button
                color="secondary"
                disabled={performingAction}
                variant="contained"
                onClick={onSignUpClick}
              >
                Sign Up
              </Button>
            </Box>
            <Button
              color="secondary"
              disabled={performingAction}
              variant="contained"
              onClick={onSignInClick}
            >
              Sign In
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  // performingAction: PropTypes.bool.isRequired,
  signedIn: PropTypes.bool.isRequired,
  // userData: PropTypes.object,
  // onSignUpClick: PropTypes.func.isRequired,
  // onSignInClick: PropTypes.func.isRequired,
  // onSettingsClick: PropTypes.func.isRequired,
  // onSignOutClick: PropTypes.func.isRequired,
};

export default Navbar;
