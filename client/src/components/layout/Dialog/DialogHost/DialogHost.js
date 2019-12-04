import React from 'react';

import PropTypes from 'prop-types';

import Hidden from '@material-ui/core/Hidden';

import PatientFormDialog from '../PatientFormDialog';
import PrescriptionFormDialog from '../PrescriptionFormDialog';
import FileDialog from '../FileDialog';
import DocRequestDialog from '../DocRequestDialog';
import PharmRequestDialog from '../PharmRequestDialog';

const DialogHost = ({ dialogs }) => {
  const { patientFormDialog } = dialogs;
  const { prescriptionFormDialog } = dialogs;
  const { fileDialog } = dialogs;
  const { docRequestDialog } = dialogs;
  const { pharmRequestDialog } = dialogs;

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

        <FileDialog
          dialogProps={fileDialog.dialogProps}
          {...fileDialog.props}
        />

        {/* <DocRequestDialog
          dialogProps={docRequestDialog.dialogProps}
          {...docRequestDialog.props}
        />

        <PharmRequestDialog
          dialogProps={pharmRequestDialog.dialogProps}
          {...pharmRequestDialog.props}
        /> */}
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

        <FileDialog
          dialogProps={{
            fullScreen: true,
            ...fileDialog.dialogProps,
          }}
          {...fileDialog.props}
        />

        {/* <DocRequestDialog
          dialogProps={{
            fullScreen: true,
            ...docRequestDialog.dialogProps,
          }}
          {...docRequestDialog.props}
        />

        <PharmRequestDialog
          dialogProps={{
            fullScreen: true,
            ...pharmRequestDialog.dialogProps,
          }}
          {...pharmRequestDialog.props}
        /> */}
      </Hidden>
    </>
  );
};

DialogHost.propTypes = {
  dialogs: PropTypes.object,
};

export default DialogHost;
