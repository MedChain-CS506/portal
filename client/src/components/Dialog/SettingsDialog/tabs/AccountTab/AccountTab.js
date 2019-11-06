import React, { useState } from 'react';

import PropTypes from 'prop-types';

import validate from 'validate.js';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import EmailIcon from '@material-ui/icons/Email';
import WarningIcon from '@material-ui/icons/Warning';
import CheckIcon from '@material-ui/icons/Check';

import constraints from '../../../../../utils/constraints';
import authentication from '../../../../../utils/authentication';

const useStyles = makeStyles(theme => ({
  dialogContent: {
    paddingTop: theme.spacing(2),
  },
}));

const AccountTab = ({ user, userData, openSnackbar }) => {
  const [showingField, setShowingField] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [performingAction, setPerformingAction] = useState(false);
  const [errors, setErrors] = useState(null);

  const classes = useStyles();

  const showField = fieldId => {
    if (!fieldId) {
      return;
    }
    setShowingField(fieldId);
  };

  const hideFields = () => {
    setShowingField('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setErrors(null);
  };

  const changeFirstName = () => {
    const errors = validate(
      {
        firstName: firstName,
      },
      {
        firstName: constraints.firstName,
      }
    );

    if (errors) {
      setErrors(errors);

      return;
    }

    setErrors(null);

    if (firstName === userData.firstName) {
      return;
    }

    setPerformingAction(true);

    authentication
      .changeFirstName(firstName)
      .then(() => {
        hideFields();
        openSnackbar('Changed first name');
      })
      .catch(reason => {
        const {code} = reason;
        const {message} = reason;

        switch (code) {
          default:
            openSnackbar(message);
            return;
        }
      })
      .finally(() => {
        setPerformingAction(false);
      });
  };

  const changeLastName = () => {
    const errors = validate(
      {
        lastName: lastName,
      },
      {
        lastName: constraints.lastName,
      }
    );

    if (errors) {
      setErrors(errors);

      return;
    }

    setErrors(null);

    if (lastName === userData.lastName) {
      return;
    }

    setPerformingAction(true);

    authentication
      .changeLastName(lastName)
      .then(() => {
        hideFields();
        openSnackbar('Changed last name');
      })
      .catch(reason => {
        const {code} = reason;
        const {message} = reason;

        switch (code) {
          default:
            openSnackbar(message);
            return;
        }
      })
      .finally(() => {
        setPerformingAction(false);
      });
  };

  const changeEmail = () => {
    const errors = validate(
      {
        email: email,
      },
      {
        email: constraints.email,
      }
    );

    if (errors) {
      setErrors(errors);

      return;
    }

    setErrors(null);

    if (email === userData.email) {
      return;
    }

    setPerformingAction(true);

    authentication
      .changeEmail(email)
      .then(() => {
        openSnackbar('Changed email address');
        hideFields();
      })
      .catch(reason => {
        const {code} = reason;
        const {message} = reason;

        switch (code) {
          default:
            openSnackbar(message);
            return;
        }
      })
      .finally(() => {
        setPerformingAction(false);
      });
  };

  const changeField = fieldId => {
    switch (fieldId) {
      case 'first-name':
        changeFirstName();
        return;

      case 'last-name':
        changeLastName();
        return;

      case 'email':
        changeEmail();
        return;

      default:
        return;
    }
  };

  const handleKeyDown = (event, fieldId) => {
    if (!event || !fieldId) {
      return;
    }

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    const {key} = event;

    if (!key) {
      return;
    }

    if (key === 'Escape') {
      hideFields();
    } else if (key === 'Enter') {
      changeField(fieldId);
    }
  };

  return (
    <DialogContent classes={{ root: classes.dialogContent }}>
      <List disablePadding>
        <ListItem>
          <Hidden xsDown>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
          </Hidden>

          {!userData.firstName && (
            <ListItemIcon>
              <Tooltip title="No first name">
                <WarningIcon color="error" />
              </Tooltip>
            </ListItemIcon>
          )}

          {showingField === 'first-name' && (
            <TextField
              autoComplete="given-name"
              autoFocus
              disabled={performingAction}
              error={!!(errors && errors.firstName)}
              fullWidth
              helperText={
                errors && errors.firstName
                  ? errors.firstName[0]
                  : 'Press Enter to change your first name'
              }
              label="First name"
              placeholder={userData.firstName}
              required
              type="text"
              value={firstName}
              variant="filled"
              onBlur={() => hideFields()}
              onKeyDown={event => handleKeyDown(event, 'first-name')}
              onChange={event => setFirstName(event.target.value)}
            />
          )}

          {showingField !== 'first-name' && (
            <>
              <ListItemText
                primary="First name"
                secondary={
                  userData.firstName
                    ? userData.firstName
                    : 'You don’t have a first name'
                }
              />

              <ListItemSecondaryAction>
                {userData.firstName && (
                  <Tooltip title="Change">
                    <div>
                      <IconButton
                        disabled={performingAction}
                        onClick={() => showField('first-name')}
                      >
                        <EditIcon />
                      </IconButton>
                    </div>
                  </Tooltip>
                )}

                {!userData.firstName && (
                  <Button
                    color="primary"
                    disabled={performingAction}
                    variant="contained"
                    onClick={() => showField('first-name')}
                  >
                    Add
                  </Button>
                )}
              </ListItemSecondaryAction>
            </>
          )}
        </ListItem>

        <ListItem>
          <Hidden xsDown>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
          </Hidden>

          {!userData.lastName && (
            <ListItemIcon>
              <Tooltip title="No last name">
                <WarningIcon color="error" />
              </Tooltip>
            </ListItemIcon>
          )}

          {showingField === 'last-name' && (
            <TextField
              autoComplete="family-name"
              autoFocus
              disabled={performingAction}
              error={!!(errors && errors.lastName)}
              fullWidth
              helperText={
                errors && errors.lastName
                  ? errors.lastName[0]
                  : 'Press Enter to change your last name'
              }
              label="Last name"
              placeholder={userData.lastName}
              required
              type="text"
              value={lastName}
              variant="filled"
              onBlur={() => hideFields()}
              onKeyDown={event => handleKeyDown(event, 'last-name')}
              onChange={event => setLastName(event.target.value)}
            />
          )}

          {showingField !== 'last-name' && (
            <>
              <ListItemText
                primary="Last name"
                secondary={
                  userData.lastName
                    ? userData.lastName
                    : 'You don’t have a last name'
                }
              />

              <ListItemSecondaryAction>
                {userData.lastName && (
                  <Tooltip title="Change">
                    <div>
                      <IconButton
                        disabled={performingAction}
                        onClick={() => showField('last-name')}
                      >
                        <EditIcon />
                      </IconButton>
                    </div>
                  </Tooltip>
                )}

                {!userData.lastName && (
                  <Button
                    color="primary"
                    disabled={performingAction}
                    variant="contained"
                    onClick={() => showField('last-name')}
                  >
                    Add
                  </Button>
                )}
              </ListItemSecondaryAction>
            </>
          )}
        </ListItem>

        <ListItem>
          <Hidden xsDown>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
          </Hidden>

          {!user.email && (
            <ListItemIcon>
              <Tooltip title="No e-mail address">
                <WarningIcon color="error" />
              </Tooltip>
            </ListItemIcon>
          )}

          {showingField === 'email' && (
            <TextField
              autoComplete="email"
              autoFocus
              disabled={performingAction}
              error={!!(errors && errors.emailAddress)}
              fullWidth
              helperText={
                errors && errors.emailAddress
                  ? errors.emailAddress[0]
                  : 'Press Enter to change your e-mail address'
              }
              label="E-mail address"
              placeholder={user.email}
              required
              type="email"
              value={email}
              variant="filled"
              onBlur={() => hideFields()}
              onKeyDown={event => handleKeyDown(event, 'email')}
              onChange={event => setEmail(event.target.value)}
            />
          )}

          {showingField !== 'email' && (
            <>
              <ListItemText
                primary="E-mail address"
                secondary={
                  user.email ? user.email : 'You don’t have an e-mail address'
                }
              />

              {user.email && (
                <Box clone mr={7}>
                  <ListItemSecondaryAction>
                    <Tooltip title="Verify">
                      <div>
                        <IconButton
                          color="secondary"
                          disabled={performingAction}
                          onClick={console.log('verifyEmailAddress')}
                        >
                          <CheckIcon />
                        </IconButton>
                      </div>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </Box>
              )}

              <ListItemSecondaryAction>
                {user.email && (
                  <Tooltip title="Change">
                    <div>
                      <IconButton
                        disabled={performingAction}
                        onClick={() => showField('email')}
                      >
                        <EditIcon />
                      </IconButton>
                    </div>
                  </Tooltip>
                )}

                {!user.email && (
                  <Button
                    color="primary"
                    disabled={performingAction}
                    variant="contained"
                    onClick={() => showField('email')}
                  >
                    Add
                  </Button>
                )}
              </ListItemSecondaryAction>
            </>
          )}
        </ListItem>
      </List>
    </DialogContent>
  );
};

AccountTab.propTypes = {
  user: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  openSnackbar: PropTypes.func.isRequired,
};

export default AccountTab;
