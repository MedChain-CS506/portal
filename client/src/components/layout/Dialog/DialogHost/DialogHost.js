import React from 'react';

import PropTypes from 'prop-types';

import Hidden from '@material-ui/core/Hidden';

import PatientFormDialog from '../PatientFormDialog';
import PrescriptionFormDialog from '../PrescriptionFormDialog';

const DialogHost = ({ dialogs }) => {
  const { patientFormDialog } = dialogs;
  const { prescriptionFormDialog } = dialogs;

  return (
    <>
      <Hidden xsDown>
        <PatientFormDialog dialogProps={patientFormDialog.dialogProps} />

        <PrescriptionFormDialog
          dialogProps={prescriptionFormDialog.dialogProps}
        />
      </Hidden>

      <Hidden smUp>
        <PatientFormDialog
          dialogProps={{
            fullScreen: true,
            ...patientFormDialog.dialogProps,
          }}
        />

        <PrescriptionFormDialog
          dialogProps={{
            fullScreen: true,
            ...prescriptionFormDialog.dialogProps,
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
