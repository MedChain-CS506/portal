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
        <PatientFormDialog
          dialogProps={patientFormDialog.dialogProps}
          {...patientFormDialog.props}
        />

        <PrescriptionFormDialog
          dialogProps={prescriptionFormDialog.dialogProps}
          {...prescriptionFormDialog.props}
        />
      </Hidden>

      <Hidden smUp>
        <PatientFormDialog
          dialogProps={{
            fullScreen: true,
            ...patientFormDialog.dialogProps,
          }}
          {...patientFormDialog.props}
        />

        <PrescriptionFormDialog
          dialogProps={{
            fullScreen: true,
            ...prescriptionFormDialog.dialogProps,
          }}
          {...prescriptionFormDialog.props}
        />
      </Hidden>
    </>
  );
};

DialogHost.propTypes = {
  dialogs: PropTypes.object.isRequired,
};

export default DialogHost;
