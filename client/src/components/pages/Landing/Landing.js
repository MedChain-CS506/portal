import React, { useState, useContext } from 'react';

import { Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';

import {
  makeStyles,
  Typography,
  Paper,
  InputBase,
  Divider,
  IconButton,
  Tooltip,
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddIcon from '@material-ui/icons/Add';

import PatientContext from '../../../context/patient/PatientContext';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },

  inputRoot: {
    padding: '2px 4px',
    margin: '20px 0',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },

  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },

  iconButton: {
    padding: 10,
  },

  divider: {
    height: 28,
    margin: 4,
  },
}));

const Landing = ({ signedIn = false, isPharmacist, onNewPatientClick }) => {
  const classes = useStyles();
  // const patientContext = useContext(PatientContext);

  const [send, setSend] = useState(false);
  const [aadhaar, setAadhaar] = useState('');

  const setReady = () => setSend(true);

  const redirectToPatient = () => {
    const pageID = `/profile/${aadhaar}`;
    if (send === true) return <Redirect to={pageID}></Redirect>;
  };

  if (!signedIn) {
    return (
      <div className={classes.root}>
        <FavoriteIcon color="action" />
        <Typography color="textSecondary" variant="h3">
          {process.env.REACT_APP_NAME}
        </Typography>
        <Typography
          data-testid="basic-desc"
          color="textSecondary"
          variant="subtitle1"
        >
          The simplest decentralized medical-records application
        </Typography>
      </div>
    );
  }

  return (
    <form className={classes.root} onSubmit={redirectToPatient}>
      <Typography data-testid="app-name" color="textSecondary" variant="h2">
        {process.env.REACT_APP_NAME}
      </Typography>
      <Paper
        data-testid="search-patient-form"
        component="form"
        className={classes.inputRoot}
        onSubmit={setReady}
      >
        <IconButton
          type="submit"
          className={classes.iconButton}
          onSubmit={setReady}
        >
          <SearchIcon />
        </IconButton>
        <InputBase
          data-testid="search-bar"
          className={classes.input}
          placeholder="Search Aadhaars"
          autoFocus
          type="number"
          name="aadhaar"
          value={aadhaar}
          onChange={e => setAadhaar(e.target.value)}
          onSubmit={setReady}
        />
        {isPharmacist ? null : (
          <>
            <Divider className={classes.divider} orientation="vertical" />
            <Tooltip title="New Patient">
              <IconButton
                data-testid="add-patient-button"
                color="primary"
                className={classes.iconButton}
                onClick={onNewPatientClick}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Paper>
      {redirectToPatient()}
    </form>
  );
};

Landing.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  isPharmacist: PropTypes.bool,
  onNewPatientClick: PropTypes.func.isRequired,
};

export default Landing;
