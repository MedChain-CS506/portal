import React, { useEffect, useContext } from 'react';
import PatientContext from '../../../context/patient/PatientContext';

//* MUI
import { makeStyles, Grid, Paper, Typography, Divider } from '@material-ui/core/';

import { Redirect } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  layout: {
    flexGrow: 1,
    width: 'auto',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

  basicInfo: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
    textAlign: 'center',
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },

  divider: {
    marginBottom: theme.spacing(3)
  },

  prescriptionsAndFiles: {
    marginBottom: theme.spacing(6),
    padding: theme.spacing(2),
  }
}));

const Profile = ({ signedIn = false }) => {
  const classes = useStyles();

  const patientContext = useContext(PatientContext)

  //! Now, pull out (destructure) the variables and functions we'd like to use for profile
  // const { patient, getPatient, records, getRecords, prescriptions, getPrescriptions } = patientContext

  useEffect(() => {
    //getPatient()
  }, [])

  // const { aadhar, firstName, lastName, dob, sex, weight } = patient

  //! test variables
  const firstName = "Satoshi"
  const lastName = "Nakamoto"
  const aadhar = "0000 1111 2222"
  const dob = "January 1st, 2000"
  const sex = 'Male'
  const weight = 100

  if (!signedIn) return <Redirect to='/not-found' />

  return (
    <>
      <main className={classes.layout}>
        <Grid container spacing={1} alignItems="center" justify="center">
          <Paper className={classes.basicInfo}>
            <Typography variant="h3" align='center' gutterBottom>{firstName} {lastName}</Typography>

            <Divider className={classes.divider} />

            <Grid container spacing={4}>
              <Grid id="aadhar" item xs={12}>
                <Typography variant="h5">Aadhar - {aadhar}</Typography>
              </Grid>
              <Grid id="date-of-birth" item xs={12}>
                <Typography variant="h5">Date of Birth - {dob}</Typography>
              </Grid>
              <Grid id="sex" item xs={12}>
                <Typography variant="h5">Sex - {sex}</Typography>
              </Grid>
              <Grid id="weight" item xs={12}>
                <Typography variant="h5">Weight - {weight}</Typography>
              </Grid>
              <Grid id="known-allergies" item xs={12}>
                <Typography variant="h5">Known Allergies</Typography>
              </Grid>
              <Grid id="known-diseases" item xs={12}>
                <Typography variant="h5">Known Diseases</Typography>
              </Grid>
            </Grid>
          </Paper>

          <Grid id="prescriptions" item xs={12} sm={6}>
            <Paper className={classes.prescriptionsAndFiles}>
              <Typography variant="h4">Prescriptions</Typography>
            </Paper>
          </Grid>

          <Grid id="medical-files" item xs={12} sm={6}>
            <Paper className={classes.prescriptionsAndFiles}>
              <Typography variant="h4">Medical Files</Typography>
            </Paper>
          </Grid>
        </Grid>
      </main>
    </>

  );
};

export default Profile;
