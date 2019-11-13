import React from 'react'

import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #F00000 30%, #DC281E 90%)',
  }
});

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar variant="regular">
        <Box flexGrow={1}>
          <Link to="/">
            <Typography color="inherit" variant="h4">
              {process.env.REACT_APP_NAME}
            </Typography>
          </Link>
        </Box>
        <IconButton color="secondary" href="https://github.com/MedChain-CS506" rel="noopener noreferrer" target="_blank">
          <GitHubIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar