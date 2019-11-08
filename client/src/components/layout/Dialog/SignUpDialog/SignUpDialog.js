import React, { useState } from 'react';

import PropTypes from 'prop-types';

//* MUI
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import validate from 'validate.js';
import constraints from '../../../../utils/constraints';
import authentication from '../../../../utils/authentication';

const useStyles = makeStyles({
  dialogContent: {
    overflowY: 'hidden',
  },
});

const SignUpDialog = ({ dialogProps, ...props }) => {
  const classes = useStyles();

  const [performingAction, setPerformingAction] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState(null); // TODO: FIX THIS... MAKE THIS THE MODULAR VARIABLE FOR ERROR HANDLING...

  const signUp = () => {
    const signUpErrors = validate(
      {
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation,
      },
      {
        firstName: constraints.firstName,
        lastName: constraints.lastName,
        email: constraints.email,
        password: constraints.password,
        passwordConfirmation: constraints.passwordConfirmation,
      }
    );

    if (signUpErrors) {
      setErrors(signUpErrors);
    } else {
      setPerformingAction(true);
      setErrors(null);
      authentication
        .signUp({
          firstName,
          lastName,
          email,
          password,
        })
        .then(() => {
          dialogProps.onClose();
        })
        .catch(reason => {
          const { code } = reason;
          const { message } = reason;

          switch (code) {
            case 'auth/email-already-in-use':
            case 'auth/invalid-email':
            case 'auth/operation-not-allowed':
            case 'auth/weak-password':
              props.openSnackbar(message);
              return;

            default:
              props.openSnackbar(message);
          }
        })
        .finally(() => setPerformingAction(false));
    }
  };

  const handleKeyPress = event => {
    if (!firstName || !lastName || !email || !password || !passwordConfirmation)
      return;
    const { key } = event;
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
      return;
    if (key === 'Enter') signUp();
  };

  const handleExited = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setPasswordConfirmation('');
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      {...dialogProps}
      onKeyPress={handleKeyPress}
      onExited={handleExited}
    >
      <DialogTitle>Sign up for an account</DialogTitle>

      <Hidden smDown>
        <DialogContent className={classes.dialogContent}>
          <Grid container direction="row">
            <Grid item xs={12}>
              <Grid container spacing={4}>
                <Grid item xs>
                  <TextField
                    autoComplete="given-name"
                    disabled={performingAction}
                    // error={!!(errors && errors.firstName)}
                    fullWidth
                    // helperText={
                    //   errors && errors.firstName ? errors.firstName[0] : ''
                    // }
                    label="First name"
                    placeholder="John"
                    required
                    type="text"
                    value={firstName}
                    variant="outlined"
                    onChange={e => setFirstName(e.target.value)}
                  />
                </Grid>

                <Grid item xs>
                  <TextField
                    autoComplete="family-name"
                    disabled={performingAction}
                    // error={!!(errors && errors.lastName)}
                    fullWidth
                    // helperText={
                    //   errors && errors.lastName ? errors.lastName[0] : ''
                    // }
                    label="Last name"
                    placeholder="Doe"
                    required
                    type="text"
                    value={lastName}
                    variant="outlined"
                    onChange={e => setLastName(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={4}>
                <Grid item xs>
                  <TextField
                    autoComplete="email"
                    disabled={performingAction}
                    // error={!!(errors && errors.email)}
                    fullWidth
                    // helperText={errors && errors.email ? errors.email[0] : ''}
                    label="E-mail address"
                    placeholder="john@doe.com"
                    required
                    type="email"
                    value={email}
                    variant="outlined"
                    onChange={e => setEmail(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={4}>
                <Grid item xs>
                  <TextField
                    autoComplete="new-password"
                    disabled={performingAction}
                    // error={!!(errors && errors.password)}
                    fullWidth
                    // helperText={
                    //   errors && errors.password ? errors.password[0] : ''
                    // }
                    label="Password"
                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                    required
                    type="password"
                    value={password}
                    variant="outlined"
                    onChange={e => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={4}>
                <Grid item xs>
                  <TextField
                    autoComplete="password"
                    disabled={performingAction}
                    // error={!!(errors && errors.passwordConfirmation)}
                    fullWidth
                    // helperText={
                    //   errors && errors.passwordConfirmation
                    //     ? errors.passwordConfirmation[0]
                    //     : ''
                    // }
                    label="Password confirmation"
                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                    required
                    type="password"
                    value={passwordConfirmation}
                    variant="outlined"
                    onChange={e => setPasswordConfirmation(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Hidden>

      <Hidden mdUp>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            <Grid item xs>
              <TextField
                autoComplete="given-name"
                disabled={performingAction}
                // error={!!(errors && errors.firstName)}
                fullWidth
                // helperText={
                //   errors && errors.firstName ? errors.firstName[0] : ''
                // }
                label="First name"
                placeholder="John"
                required
                type="text"
                value={firstName}
                variant="outlined"
                onChange={e => setFirstName(e.target.value)}
              />
            </Grid>

            <Grid item xs>
              <TextField
                autoComplete="family-name"
                disabled={performingAction}
                // error={!!(errors && errors.lastName)}
                fullWidth
                // helperText={errors && errors.lastName ? errors.lastName[0] : ''}
                label="Last name"
                placeholder="Doe"
                required
                type="text"
                value={lastName}
                variant="outlined"
                onChange={e => setLastName(e.target.value)}
              />
            </Grid>

            <Grid item xs>
              <TextField
                autoComplete="email"
                disabled={performingAction}
                // error={!!(errors && errors.email)}
                fullWidth
                // helperText={errors && errors.email ? errors.email[0] : ''}
                label="E-mail address"
                placeholder="john@doe.com"
                required
                type="email"
                value={email}
                variant="outlined"
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs>
              <TextField
                autoComplete="new-password"
                disabled={performingAction}
                // error={!!(errors && errors.password)}
                fullWidth
                // helperText={errors && errors.password ? errors.password[0] : ''}
                label="Password"
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                required
                type="password"
                value={password}
                variant="outlined"
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>

            <Grid item xs>
              <TextField
                autoComplete="password"
                disabled={performingAction}
                // error={!!(errors && errors.passwordConfirmation)}
                fullWidth
                // helperText={
                //   errors && errors.passwordConfirmation
                //     ? errors.passwordConfirmation[0]
                //     : ''
                // }
                label="Password confirmation"
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                required
                type="password"
                value={passwordConfirmation}
                variant="outlined"
                onChange={e => setPasswordConfirmation(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Hidden>

      <DialogActions>
        <Button color="primary" onClick={dialogProps.onClose}>
          Cancel
        </Button>
        <Button
          name="signUp"
          color="primary"
          disabled={
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !passwordConfirmation ||
            performingAction
          }
          variant="contained"
          onClick={signUp}
        >
          Sign Up
        </Button>
      </DialogActions>
    </Dialog>
  );
};

SignUpDialog.propTypes = {
  dialogProps: PropTypes.object.isRequired,
  openSnackbar: PropTypes.func.isRequired,
};

export default SignUpDialog;
