import React, { useState } from 'react';

import PropTypes from 'prop-types';

import validate from 'validate.js';
import moment from 'moment';

import DialogContent from '@material-ui/core/DialogContent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import LockIcon from '@material-ui/icons/Lock';
import EditIcon from '@material-ui/icons/Edit';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Divider from '@material-ui/core/Divider';

import constraints from '../../../../../utils/constraints';
import authentication from '../../../../../utils/authentication';

const SecurityTab = ({
  user,
  userData,
  openSnackbar,
  onDeleteAccountClick,
}) => {
  const [showingField, setShowingField] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [performingAction, setPerformingAction] = useState(false);
  const [errors, setErrors] = useState(null);

  const showField = fieldId => {
    if (!fieldId) {
      return;
    }
    setShowingField(fieldId);
  };

  const hideFields = () => {
    setShowingField('');
    setPassword('');
    setPasswordConfirmation('');
    setErrors(null);
  };

  const changeField = fieldId => {
    switch (fieldId) {
      case 'password':
        const errors = validate(
          {
            password: password,
          },
          {
            password: constraints.password,
          }
        );

        if (errors) {
          setErrors(errors);
          return;
        }
        setErrors(null);
        showField('password-confirmation');
        return;

      case 'password-confirmation':
        changePassword();
        return;

      default:
        return;
    }
  };

  const changePassword = () => {
    const errors = validate(
      {
        password,
        passwordConfirmation: passwordConfirmation,
      },
      {
        password: constraints.password,
        passwordConfirmation: constraints.passwordConfirmation,
      }
    );

    if (errors) {
      setErrors(errors);

      return;
    }

    setErrors(null);
    setPerformingAction(true);
    authentication
      .changePassword(password)
      .then(() => {
        openSnackbar('Changed password');
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

  const deleteAccount = () => {
    setPerformingAction(true);
    authentication
      .deleteAccount()
      .then(() => {
        openSnackbar('Deleted account');
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

  return (
    <DialogContent>
      <List disablePadding>
        <ListItem>
          <Hidden xsDown>
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
          </Hidden>

          {showingField === 'password' && (
            <TextField
              autoComplete="new-password"
              autoFocus
              disabled={performingAction}
              error={!!(errors && errors.password)}
              fullWidth
              helperText={
                errors && errors.password
                  ? errors.password[0]
                  : 'Press Enter to change your password'
              }
              label="Password"
              required
              type="password"
              value={password}
              variant="filled"
              onBlur={() => hideFields()}
              onKeyDown={event => handleKeyDown(event, 'password')}
              onChange={event => setPassword(event.target.value)}
            />
          )}

          {showingField === 'password-confirmation' && (
            <TextField
              autoComplete="new-password"
              autoFocus
              disabled={performingAction}
              error={!!(errors && errors.passwordConfirmation)}
              fullWidth
              helperText={
                errors && errors.passwordConfirmation
                  ? errors.passwordConfirmation[0]
                  : 'Press Enter to change your password'
              }
              label="Password confirmation"
              required
              type="password"
              value={passwordConfirmation}
              variant="filled"
              onBlur={hideFields}
              onKeyDown={event => handleKeyDown(event, 'password-confirmation')}
              onChange={event => setPasswordConfirmation(event.target.value)}
            />
          )}

          {showingField !== 'password' &&
            showingField !== 'password-confirmation' && (
              <>
                <Hidden xsDown>
                  <ListItemText
                    primary="Password"
                    secondary={
                      userData.lastPasswordChange
                        ? `Last changed ${moment(
                            userData.lastPasswordChange.toDate()
                          ).format('LL')}`
                        : 'Never changed'
                    }
                  />
                </Hidden>

                <Hidden smUp>
                  <ListItemText
                    primary="Password"
                    secondary={
                      userData.lastPasswordChange
                        ? `Last changed ${moment(
                            userData.lastPasswordChange.toDate()
                          ).format('ll')}`
                        : 'Never changed'
                    }
                  />
                </Hidden>

                <ListItemSecondaryAction>
                  <Tooltip title="Change">
                    <div>
                      <IconButton
                        disabled={performingAction}
                        onClick={() => showField('password')}
                      >
                        <EditIcon />
                      </IconButton>
                    </div>
                  </Tooltip>
                </ListItemSecondaryAction>
              </>
            )}
        </ListItem>

        <ListItem>
          <Hidden xsDown>
            <ListItemIcon>
              <AccessTimeIcon />
            </ListItemIcon>
          </Hidden>

          <Hidden xsDown>
            <ListItemText
              primary="Signed in"
              secondary={moment(user.metadata.lastSignInTime).format('LLLL')}
            />
          </Hidden>

          <Hidden smUp>
            <ListItemText
              primary="Signed in"
              secondary={moment(user.metadata.lastSignInTime).format('llll')}
            />
          </Hidden>
        </ListItem>

        <Box mt={1} mb={1}>
          <Divider light />
        </Box>

        <ListItem>
          <Hidden xsDown>
            <ListItemIcon>
              <DeleteForeverIcon />
            </ListItemIcon>
          </Hidden>

          <ListItemText
            primary="Delete account"
            secondary="Accounts can’t be recovered"
          />

          <ListItemSecondaryAction>
            <Button
              color="secondary"
              disabled={performingAction}
              variant="contained"
              onClick={onDeleteAccountClick}
            >
              Delete
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </DialogContent>
  );
};

SecurityTab.propTypes = {
  userData: PropTypes.object.isRequired,
  openSnackbar: PropTypes.func.isRequired,
  onDeleteAccountClick: PropTypes.func.isRequired,
};

export default SecurityTab;
