import React from 'react';
import clsx from 'clsx';

import PropTypes from 'prop-types';

import {
  makeStyles,
  CssBaseline,
  Container,
  Grid,
  Paper,
} from '@material-ui/core';

import BasicInfo from './ProfileComponents/BasicInfo';
import Files from './ProfileComponents/Files';
import Prescriptions from './ProfileComponents/Prescriptions';
import NewPrescriptionsTable from './ProfileComponents/NewPrescriptionsTable';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const Profile = ({
  // signedIn = false,
  onNewPrescriptionClick,
  contract,
  match,
  isPharmacist,
}) => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  if (isPharmacist) {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Prescriptions
                    onNewPrescriptionClick={() => onNewPrescriptionClick}
                    isPharmacist={isPharmacist}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={8}>
              <Paper className={fixedHeightPaper}>
                <BasicInfo aadhaar={match.params.id} contract={contract}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>
                <Files />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              {/* <Paper className={classes.paper}> */}
              {/* <Prescriptions
                  onNewPrescriptionClick={onNewPrescriptionClick}
                /> */}
              <NewPrescriptionsTable />
              {/* </Paper> */}
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

Profile.propTypes = {
  // signedIn: PropTypes.bool.isRequired,
  onNewPrescriptionClick: PropTypes.func.isRequired,
  isPharmacist: PropTypes.bool,
};

export default Profile;
