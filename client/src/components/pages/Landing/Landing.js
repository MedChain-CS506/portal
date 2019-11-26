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

//! NEW
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Container from '@material-ui/core/Container';

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

  //! NEW
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary,
  },

  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Landing = ({
  signedIn = false,
  isPharmacist,
  onNewPatientClick,
  isDoctor,
}) => {
  const classes = useStyles();
  // const patientContext = useContext(PatientContext);

  const [send, setSend] = useState(false);

  const [aadhaar, setAadhaar] = useState('');

  const setReady = () => {
    setSend(true);
  };
  const redirectToPatient = () => {
    const pageID = `/profile/${aadhaar}`;
    if (send === true) {
      return <Redirect to={pageID}></Redirect>;
    }
  };

  if (isPharmacist) {
    return (
      <form className={classes.root} onSubmit={redirectToPatient}>
        <Typography color="textSecondary" variant="h2">
          {process.env.REACT_APP_NAME}
        </Typography>
        <Paper
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
            className={classes.input}
            placeholder="Search Aadhaars"
            autoFocus
            type="number"
            name="aadhaar"
            value={aadhaar}
            onChange={e => setAadhaar(e.target.value)}
            onSubmit={setReady}
          />
        </Paper>
        {redirectToPatient()}
      </form>
    );
  }
  if (isDoctor) {
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
          <IconButton type="submit" className={classes.iconButton}>
            <SearchIcon type="submit" onSubmit={setReady} />
          </IconButton>
          <InputBase
            data-testid="search-bar"
            className={classes.input}
            placeholder="Enter Aadhaar Number"
            autoFocus
            type="number"
            name="aadhaar"
            value={aadhaar}
            onChange={e => setAadhaar(e.target.value)}
            onSubmit={setReady}
          />
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
        </Paper>
        {redirectToPatient()}
      </form>
    );
  }
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <GroupAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Join Request
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="aadhaar"
                label="Aadhaar"
                type="number"
                id="aadhaar"
                autoComplete="current-aadhaar"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="doctorId"
                label="Doctor ID"
                name="doctorId"
                autoComplete="doctor-id"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="notificationEmail" color="primary" />}
                label="I want to be notified when my request has been reviewed and resolved by the network."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Request Access
          </Button>
        </form>
      </div>
    </Container>
  );
};

Landing.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  isPharmacist: PropTypes.bool,
  onNewPatientClick: PropTypes.func.isRequired,
  isDoctor: PropTypes.bool,
};

export default Landing;
