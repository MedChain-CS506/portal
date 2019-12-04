import React from 'react';

import PropTypes from 'prop-types';

import { makeStyles, Typography, Button } from '@material-ui/core';

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

const RequestAccess = ({ onNewDoctorClick, onNewPharmacistClick }) => {
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
          onClick={() => onNewDoctorClick()}
        >
          New Doctor
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<LocalPharmacyIcon />}
          onClick={() => onNewPharmacistClick}
        >
          New Pharmacist
        </Button>
      </div>
    </div>
  );
};

RequestAccess.propTypes = {
  onNewDoctorClick: PropTypes.func,
  onNewPharmacistClick: PropTypes.func,
};

export default RequestAccess;
