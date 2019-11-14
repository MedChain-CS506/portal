import React, { useState, useEffect, useContext } from 'react';

import PatientContext from '../../../context/patient/PatientContext';

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

const Profile = ({ signedIn = false, contract, match }) => {
  const classes = useStyles();

  const patientContext = useContext(PatientContext)
  const [patientData, setPatientData] = useState({
    aadhaar: 0,
    name: "",
    sex: "",
    dob: "",
    weight: 0,
    allergies: "",
  });

  useEffect(() => {
    let asyncCallToGetPatient = async () => {
      let data = await patientContext.getPatient(contract, match.params.id);
      setPatientData(data);
    };
    asyncCallToGetPatient();
  }, [patientData])


  if (!signedIn) return <Redirect to='/not-found' />

  return (
    <>
      <main className={classes.layout}>
        <Grid container spacing={1} alignItems="center" justify="center">
          <Paper className={classes.basicInfo}>
            <Typography variant="h3" align='center' gutterBottom>{patientData.name}</Typography>

            <Divider className={classes.divider} />

            <Grid container spacing={4}>
              <Grid id="aadhar" item xs={12}>
                <Typography variant="h5">Aadhar - {patientData.aadhaar}</Typography>
              </Grid>
              <Grid id="date-of-birth" item xs={12}>
                <Typography variant="h5">Date of Birth - {patientData.dob}</Typography>
              </Grid>
              <Grid id="sex" item xs={12}>
                <Typography variant="h5">Sex - {patientData.sex}</Typography>
              </Grid>
              <Grid id="weight" item xs={12}>
                <Typography variant="h5">Weight - {patientData.weight}</Typography>
              </Grid>
              <Grid id="known-allergies" item xs={12}>
                <Typography variant="h5">Known Allergies - {patientData.allergies}</Typography>
              </Grid>
              <Grid id="known-diseases" item xs={12}>
                <Typography variant="h5">Known Diseases - </Typography>
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
