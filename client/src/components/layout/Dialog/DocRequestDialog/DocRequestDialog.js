import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(0.5),
  },

  divider: {
    margin: 'auto',
  },

  grid: {
    marginBottom: theme.spacing(2),
  },
}));

const DocRequestDialog = ({ dialogProps, ...props }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [id, setId] = useState('');
  const classes = useStyles();

  const handleKeyPress = event => {
    console.log(event);
    //     if (!email || !password) return;
    //     const { key } = event;
    //     if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
    //       return;
    //     // if (key === 'Enter') signIn();
  };

  const handleExited = () => {
    setEmail('');
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      {...dialogProps}
      onKeyPress={handleKeyPress}
      onExited={handleExited}
    >
      <DialogTitle>Sign up for a new doctor account</DialogTitle>

      <Hidden xsDown>
        <DialogContent>
          <Grid container direction="row">
            <Grid item xs={4}></Grid>

            <Grid item xs={1}>
              <Divider className={classes.divider} orientation="vertical" />
            </Grid>

            <Grid item xs={7}>
              <Grid container direction="column" spacing={2}>
                <Grid item xs>
                  <TextField
                    autoFocus
                    autoComplete="first name"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    placeholder="Jon"
                    type="text"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                  />
                </Grid>

                <Grid item xs>
                  <TextField
                    autoFocus
                    autoComplete="fname"
                    name="lastName"
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    placeholder="Doe"
                    type="text"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                  />
                </Grid>

                <Grid item xs>
                  <TextField
                    autoFocus
                    autoComplete="email"
                    name="lastNaemailme"
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    placeholder="jondoe@gmail.com"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </Grid>

                <Grid item xs>
                  <TextField
                    autoFocus
                    autoComplete="aadhaar"
                    name="aadhaar"
                    variant="outlined"
                    required
                    fullWidth
                    id="aadhaar"
                    label="Aadhaar"
                    placeholder="000011112222"
                    type="number"
                    value={aadhaar}
                    onChange={e => setAadhaar(e.target.value)}
                  />
                </Grid>

                <Grid item xs>
                  <TextField
                    autoFocus
                    autoComplete="id"
                    name="id"
                    variant="outlined"
                    required
                    fullWidth
                    id="id"
                    label="Doctor ID"
                    placeholder="1234"
                    type="number"
                    value={id}
                    onChange={e => setId(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Hidden>

      <Hidden smUp>
        <DialogContent>
          <h1>Icon</h1>

          <Grid container direction="column" spacing={2}>
            <Grid item xs>
              <TextField
                autoFocus
                autoComplete="first name"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                placeholder="Jon"
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </Grid>

            <Grid item xs>
              <TextField
                autoFocus
                autoComplete="fname"
                name="lastName"
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                placeholder="Doe"
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </Grid>

            <Grid item xs>
              <TextField
                autoFocus
                autoComplete="email"
                name="lastNaemailme"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                placeholder="jondoe@gmail.com"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs>
              <TextField
                autoFocus
                autoComplete="aadhaar"
                name="aadhaar"
                variant="outlined"
                required
                fullWidth
                id="aadhaar"
                label="Aadhaar"
                placeholder="000011112222"
                type="number"
                value={aadhaar}
                onChange={e => setAadhaar(e.target.value)}
              />
            </Grid>

            <Grid item xs>
              <TextField
                autoFocus
                autoComplete="id"
                name="id"
                variant="outlined"
                required
                fullWidth
                id="id"
                label="Doctor ID"
                placeholder="1234"
                type="number"
                value={id}
                onChange={e => setId(e.target.value)}
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
          color="primary"
          // disabled={
          //   !emailAddress ||
          //   !emailAddressConfirmation ||
          //   !password ||
          //   !passwordConfirmation ||
          //   performingAction
          // }
          variant="contained"
          // onClick={signUp}
        >
          Sign up
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DocRequestDialog.propTypes = {
  dialogProps: PropTypes.object,
};

export default DocRequestDialog;
