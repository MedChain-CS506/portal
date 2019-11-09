import React from 'react';

import PropTypes from 'prop-types';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

//* PAGES
import Landing from '../Landing';
import NewPatient from '../../patients/NewPatient';
import Profile from '../../patients/Profile';
import NotFound from '../NotFound';

import { makeStyles } from '@material-ui/core/styles';

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
            <NewPatient signedIn={signedIn} />
          </Route>
          <Route exact path="/profile/:id">
            <Profile signedIn={signedIn} />
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
