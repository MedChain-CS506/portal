import React, { useState } from 'react';

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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { Formik, Form, useField, Field, FieldArray } from 'formik';
import * as yup from 'yup';
import ChipInput from 'material-ui-chip-input';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const NameTextField = ({ placeholder, label, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      label={label}
      fullWidth
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
      margin="normal"
      required
    />
  );
};

const validationSchema = yup.object().shape({
  fileName: yup.string().required('File Name is required'),
});

const FileDialog = ({ dialogProps, ...props }) => {
  const [files, setFiles] = useState([]);

  return (
    <Dialog fullWidth maxWidth="md" {...dialogProps}>
      <DialogTitle>Upload File(s)</DialogTitle>

      <Formik
        validateOnChange
        initialValues={{
          fileName: '',
          tags: [],
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          console.log('fileName:', data.fileName);
          console.log('tags:', data.tags);

          setSubmitting(false);
          //* make async call
          // register(data).then(() => {
          //     setSubmitting(false);
          // });
          dialogProps.onClose();
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <DialogContent>
              <Grid container direction="column" spacing={2}>
                <Grid item xs>
                  <NameTextField
                    label="Name"
                    placeholder="MRI Scan"
                    name="fileName"
                  />
                </Grid>
                <Grid item xs>
                  <FieldArray
                    name="tags"
                    render={arrayHelpers => (
                      <Field name="tags">
                        {({ field }) => (
                          <ChipInput
                            label="Tags"
                            fullWidth
                            margin="normal"
                            value={field.value}
                            onAdd={chip => arrayHelpers.push(chip)}
                            onDelete={chip => arrayHelpers.remove(chip)}
                          />
                        )}
                      </Field>
                    )}
                  />
                </Grid>
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
              <Button color="primary" onClick={dialogProps.onClose}>
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
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

NameTextField.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
};

FileDialog.propTypes = {
  dialogProps: PropTypes.object.isRequired,
};

export default FileDialog;
