import React from 'react';
import clsx from 'clsx';
import FadeIn from 'react-fade-in';

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
  signedIn,
  onNewPrescriptionClick,
  onNewFileClick,
  contract,
  match,
  isPharmacist,
}) => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  console.log(match);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <FadeIn>
            <Grid container spacing={3}>
              {isPharmacist ? (
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Prescriptions
                      isPharmacist={isPharmacist}
                      aadhaar={match.params.id}
                      contract={contract}
                    />
                  </Paper>
                </Grid>
              ) : (
                <>
                  <Grid item xs={12} md={6} lg={6}>
                    <Paper className={fixedHeightPaper}>
                      <BasicInfo
                        aadhaar={match.params.id}
                        contract={contract}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Paper className={fixedHeightPaper}>
                      <Files onNewFileClick={onNewFileClick} />
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <Prescriptions
                        onNewPrescriptionClick={onNewPrescriptionClick}
                        aadhaar={match.params.id}
                        contract={contract}
                      />
                    </Paper>
                  </Grid>
                </>
              )}
            </Grid>
          </FadeIn>
        </Container>
      </main>
    </div>
  );
};

Profile.propTypes = {
  signedIn: PropTypes.bool,
  onNewPrescriptionClick: PropTypes.func.isRequired,
  onNewFileClick: PropTypes.func.isRequired,
  isPharmacist: PropTypes.bool,
};

export default Profile;
