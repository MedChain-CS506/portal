import React from 'react';

import { BrowserRouter as Router, Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import FindIcon from '@material-ui/icons/FindInPage';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles(theme => ({
  center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },

  emptyStateIcon: {
    fontSize: theme.spacing(12),
  },

  button: {
    marginTop: theme.spacing(1),
  },

  buttonIcon: {
    marginRight: theme.spacing(1),
  },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.center}>
      <FindIcon className={classes.emptyStateIcon} color="action" />
      <Typography color="textSecondary" variant="h4">
        Content Not Found
      </Typography>
      <Typography color="textSecondary" variant="subtitle1">
        The requested URL was not found on this server
      </Typography>
      <Router>
        <Fab
          className={classes.button}
          color="secondary"
          component={Link}
          to="/"
          variant="extended"
        >
          <HomeIcon className={classes.buttonIcon} /> Go Home
        </Fab>
      </Router>
    </div>
  );
};

export default NotFound;
