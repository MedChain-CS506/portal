import React, { useState } from 'react';

import PropTypes from 'prop-types';

//* MUI
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import authentication from '../../../utils/authentication';

const useStyles = makeStyles({
  noTitlePadding: {
    paddingTop: 3,
  },
});

const SignOutDialog = ({ dialogProps }) => {
  const classes = useStyles();

  const [performingAction, setPerformingAction] = useState(false);

  const signOut = () => {
    setPerformingAction(true);
    authentication.signOut().then(() => dialogProps.onClose());
    setPerformingAction(false);
  };

  return (
    <Dialog {...dialogProps}>
      <DialogTitle>Sign out?</DialogTitle>
      <DialogContent className={classes.noTitlePadding}>
        <DialogContentText>
          Confirm you would like to sign out.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={dialogProps.onClose}>
          Cancel
        </Button>
        <Button color="primary" variant="contained" onClick={signOut}>
          Sign Out
        </Button>
      </DialogActions>
      {/* {(dismissiveAction || confirmingAction || acknowledgementAction) &&
                <DialogActions>
                    {dismissiveAction}
                    {confirmingAction}
                    {acknowledgementAction}
                </DialogActions>
            } */}
    </Dialog>
  );
};

SignOutDialog.propTypes = {
  dialogProps: PropTypes.object.isRequired,
};

export default SignOutDialog;
