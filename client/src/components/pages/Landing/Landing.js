import React from 'react';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { makeStyles, Fab, Typography } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Search from '../../layout/Search';

const useStyles = makeStyles(theme => ({
  center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },

  button: {
    marginTop: theme.spacing(1),
  },

  buttonIcon: {
    marginRight: theme.spacing(1),
  },

  patientFormIcon: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    background: 'red',
    color: 'white',
  },
}));

const Landing = ({ signedIn = false, isPharmacist }) => {
  const classes = useStyles();

  if (signedIn && !isPharmacist) {
    return (
      <>
        <Link to="/patient-form">
          <Fab className={classes.patientFormIcon} variant="extended">
            <AddCircleIcon className={classes.buttonIcon} /> New Patient Form
          </Fab>
        </Link>
        <Search isPharmacist={isPharmacist} />
      </>
    );
  }

  if (isPharmacist) {
    return <Search isPharmacist={isPharmacist} />;
  }

  return (
    <div className={classes.center}>
      <FavoriteIcon color="action" />
      <Typography color="textSecondary" variant="h3">
        {process.env.REACT_APP_NAME}
      </Typography>
      <Typography color="textSecondary" variant="subtitle1">
        The simplest decentralized medical-records application
      </Typography>
      <Fab
        className={classes.button}
        color="secondary"
        href="https://github.com/MedChain-CS506"
        rel="noopener noreferrer"
        target="_blank"
        variant="extended"
      >
        <GitHubIcon className={classes.buttonIcon} /> Repo
      </Fab>
    </div>
  );
};

Landing.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  isPharmacist: PropTypes.bool,
};

export default Landing;
