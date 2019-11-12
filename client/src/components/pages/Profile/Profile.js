import React, { useEffect, useContext } from 'react';
import PatientContext from '../../../context/patient/PatientContext';

//* MUI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

import { Redirect } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  paper: {
    m: 'auto',
    padding: theme.spacing(3, 2),
  },
}));

const Profile = ({ signedIn = false }) => {
  const classes = useStyles();

  const patientContext = useContext(PatientContext)

  useEffect(() => {
    //getPatient()
  }, [])

  //! test variables
  const firstName = "Satoshi"
  const lastName = "Nakamoto"
  const aadhar = "000011112222"
  const dob = 1 / 1 / 2000
  const sex = 'Male'
  const weight = 100

  if (!signedIn) return <Redirect to='/not-found' />

  return (
    <>
      <Grid container spacing={0} direction="column" alignItems="center" justify="center">
        <Paper className={classes.paper}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h2">{firstName} {lastName}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">Aadhaar - {aadhar}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">Date of Birth - {dob}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Sex - {sex}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Weight - {weight}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">Known Allergies</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">Known Diseases</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default Profile;
