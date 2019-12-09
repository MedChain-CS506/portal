import React, { useState, useContext } from 'react';

import PropTypes from 'prop-types';

//* FilePond
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

//* MUI
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { Formik, Form } from 'formik';
import PatientContext from '../../../../context/patient/PatientContext';

const ipfsClient = require('ipfs-http-client');

const ipfs = ipfsClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
});

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const FileDialog = ({ dialogProps }) => {
  const [files, setFiles] = useState([]);
  const patientContext = useContext(PatientContext);

  return (
    <Dialog fullWidth maxWidth="sm" {...dialogProps}>
      <DialogTitle>Upload File(s)</DialogTitle>

      <Formik
        validateOnChange
        initialValues={{
          file: '',
        }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(false);
          ipfs.add(data.file, (error, result) => {
            const _fileHash = result[0].hash;
            if (error) {
              console.error(error);
            }
            console.log(_fileHash);
          });
          dialogProps.onClose();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <DialogContent>
              <Grid container direction="column" spacing={2}>
                <Grid item xs>
                  <FilePond
                    files={files}
                    allowMultiple
                    maxFiles={5}
                    onupdatefiles={setFiles}
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                onClick={() => {
                  dialogProps.onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                color="primary"
                variant="contained"
              >
                Submit
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

FileDialog.propTypes = {
  dialogProps: PropTypes.object.isRequired,
};

export default FileDialog;
