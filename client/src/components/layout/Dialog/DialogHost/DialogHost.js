import React from 'react';

import PropTypes from 'prop-types';

import Hidden from '@material-ui/core/Hidden';

import PatientFormDialog from '../PatientFormDialog';

const DialogHost = ({ dialogs }) => {
  const { patientFormDialog } = dialogs;

  return (
    <>
      <Hidden xsDown>
        <PatientFormDialog dialogProps={patientFormDialog.dialogProps} />
      </Hidden>

      <Hidden smUp>
        <PatientFormDialog
          dialogProps={{
            fullScreen: true,
            ...patientFormDialog.dialogProps,
          }}
        />
      </Hidden>
    </>
  );
};

DialogHost.propTypes = {
  dialogs: PropTypes.object.isRequired,
};

export default DialogHost;
