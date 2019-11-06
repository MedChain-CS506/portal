import React from 'react';

import PropTypes from 'prop-types';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

//* PAGES
import { makeStyles } from '@material-ui/core/styles';
import Landing from '../Landing';
import PatientForm from '../PatientForm';
import PatientProfile from '../PatientProfile';
import NotFound from '../NotFound';

const useStyles = makeStyles({
  container: {
    m: 'auto',
    overflow: 'hidden',
    padding: '1rem 2rem',
  },
});

const Routes = ({ signedIn = false }) => {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.container}>
        <Switch>
          <Route exact path="/">
            <Landing signedIn={signedIn} />
          </Route>
          <Route exact path="/patient-form">
            <PatientForm signedIn={signedIn} />
          </Route>
          <Route exact path="/profile/:id">
            <PatientProfile signedIn={signedIn} />
          </Route>
          <Route>
            <NotFound />
          </Route>
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </Router>
  );
};

Routes.propTypes = {
  signedIn: PropTypes.bool.isRequired,
};

export default Routes;
