import React from 'react';

import PropTypes from 'prop-types';

import Hidden from '@material-ui/core/Hidden';

import SignUpDialog from '../SignUpDialog';
import SignInDialog from '../SignInDialog';
import SettingsDialog from '../SettingsDialog';
import SignOutDialog from '../SignOutDialog';
import DeleteAccountDialog from '../DeleteAccountDialog';

const DialogHost = ({ signedIn = false, dialogs }) => {
  const { signUpDialog } = dialogs;
  const { signInDialog } = dialogs;
  const { settingsDialog } = dialogs;
  const { signOutDialog } = dialogs;
  const { deleteAccountDialog } = dialogs;

  return (
    <>
      <Hidden xsDown>
        {signedIn && (
          <>
            <DeleteAccountDialog
              dialogProps={deleteAccountDialog.dialogProps}
              {...deleteAccountDialog.props}
            />
          </>
        )}
        {!signedIn && (
          <>
            <SignUpDialog
              dialogProps={signUpDialog.dialogProps}
              {...signUpDialog.props}
            />
            <SignInDialog
              dialogProps={signInDialog.dialogProps}
              {...signInDialog.props}
            />
          </>
        )}
      </Hidden>

      <Hidden smDown>
        {signedIn && (
          <>
            <SettingsDialog
              dialogProps={settingsDialog.dialogProps}
              {...settingsDialog.props}
            />
          </>
        )}
      </Hidden>

      <Hidden smUp>
        {signedIn && (
          <>
            <DeleteAccountDialog
              dialogProps={{
                fullScreen: true,
                ...deleteAccountDialog.dialogProps,
              }}
              {...deleteAccountDialog.props}
            />
          </>
        )}
        {!signedIn && (
          <>
            <SignUpDialog
              dialogProps={{
                fullScreen: true,
                ...signUpDialog.dialogProps,
              }}
              {...signUpDialog.props}
            />
            <SignInDialog
              dialogProps={{
                fullScreen: true,
                ...signInDialog.dialogProps,
              }}
              {...signInDialog.props}
            />
          </>
        )}
      </Hidden>

      <Hidden mdUp>
        {signedIn && (
          <>
            <SettingsDialog
              dialogProps={{
                fullScreen: true,
                ...settingsDialog.dialogProps,
              }}
              {...settingsDialog.props}
            />
          </>
        )}
      </Hidden>

      {signedIn && (
        <>
          <SignOutDialog
            dialogProps={signOutDialog.dialogProps}
            {...signOutDialog.props}
          />
        </>
      )}
    </>
  );
};

DialogHost.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  dialogs: PropTypes.object.isRequired,
};

export default DialogHost;
