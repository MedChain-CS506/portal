import React from 'react';

import { makeStyles, Typography, Button, Icon } from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
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

const RequestAccess = () => {
  const classes = useStyles();

  return (
    <div className={classes.center}>
      <FavoriteIcon className={classes.FavoriteIcon} color="action" />
      <Typography
        data-testid="error-message"
        color="textSecondary"
        variant="h3"
      >
        Request Access
      </Typography>
      <Typography
        data-testid="error-desc"
        color="textSecondary"
        variant="subtitle1"
      >
        Sign up to access a new means of patient record keeping
      </Typography>
      <div className={classes.root}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<LocalHospitalIcon />}
        >
          New Doctor
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<LocalPharmacyIcon />}
        >
          New Pharmacist
        </Button>
      </div>
    </div>
  );
};

export default RequestAccess;
