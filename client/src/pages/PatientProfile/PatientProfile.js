import React from 'react';

//* MUI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  card: {
    maxWidth: 690,
    minWidth: 690,
  },
  paper: {
    m: 'auto',
  },
});

const PatientProfile = () => {
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Patient Profile
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h2">Patient Name</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">Aadhaar #</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">Age</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Sex</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Date of Birth</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Weight</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">Known Allergies</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">
                  Recent Activity - Upcoming Appointments, Medical Operations
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default PatientProfile;
