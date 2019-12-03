import React, { useState, useContext } from 'react';

import PropTypes from 'prop-types';

import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Hidden,
  Grid,
  Button,
  TextField,
  Radio,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';

import { Formik, Field, Form, useField, FieldArray } from 'formik';
import 'date-fns';
import * as yup from 'yup';
import PatientContext from '../../../../context/patient/PatientContext';

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

  dialogContent: {
    overflowY: 'hidden',
  },

  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const NameTextField = ({ placeholder, label, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      variant="outlined"
      label={label}
      fullWidth
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

//! from prescriptionpage
const MyTextField = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      fullWidth
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const AadhaarField = ({ placeholder, label, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      variant="outlined"
      label={label}
      fullWidth
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const WeightField = ({ placeholder, label, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      InputProps={{
        startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
      }}
      variant="outlined"
      label={label}
      fullWidth
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const DobField = ({ placeholder, label, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      variant="outlined"
      label={label}
      fullWidth
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

//   const SexRadio = ({ placeholder, label, ...props }) => {
//     const [field, meta] = useField(props);
//     return <FormControlLabel {...field} control={<Radio color="default" />} label={label} />;
//   };

//! from prescriptionpage
const SexRadio = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <FormControlLabel
      {...field}
      control={<Radio color="primary" />}
      label={label}
      labelPlacement="bottom"
    />
  );
};

const validationSchema = yup.object({
  aadhaar: yup
    .string()
    .matches(/^[0-9]{12}$/, 'Must be exactly 12 digits')
    .required('Aadhaar is required'),
  medicine: yup.array().of(
    yup.object({
      name: yup.string().required(),
    })
  ),
});

const PrescriptionFormDialog = ({ dialogProps, ...props }) => {
  const classes = useStyles();
  const patientContext = useContext(PatientContext);

  const onSubmit = async data => {
    console.log(data);
    let medicine = '';
    for (const med in data.medicine) {
      medicine = `${medicine}-${med}`;
      for (const values in data.medicine[med]) {
        if (values !== 'id') {
          medicine = `${medicine}-${data.medicine[med][values]}`;
        }
      }
    }

    medicine = medicine.substr(1);
    const dt = new Date();
    const utcDate = dt.toUTCString();
    try {
      patientContext
        .addPrescription(
          dialogProps.contract,
          data.d_id,
          data.aadhaar,
          data.disease,
          data.symptoms,
          medicine,
          utcDate
        )
        .then(() => {
          props.toggleSnackbar(`Prescription Successfully Prescribed`);
          dialogProps.onClose();
        });
    } catch {
      props.toggleSnackbar('Try again');
    }
  };

  return (
    <Dialog fullWidth maxWidth="md" {...dialogProps}>
      <DialogTitle>New Prescription</DialogTitle>

      <Formik
        validateOnChange
        initialValues={{
          aadhaar: '',
          d_id: '',
          symptoms: '',
          disease: '',
          sex: '',
          medicine: [{ name: '', quantity: '', id: `${Math.random()}` }],
        }}
        validationSchema={validationSchema}
        onSubmit={async (data, { setSubmitting }) => {
          console.log('inside on submit');
          setSubmitting(true);
          // make async call
          await onSubmit(data);
          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <Hidden smDown>
              <DialogContent className={classes.dialogContent}>
                <Grid container direction="row">
                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs>
                        {/* <NameTextField label="Aadhaar" placeholder="000011112222" name="aadhaar" /> */}
                        <MyTextField
                          placeholder="Aadhaar"
                          name="aadhaar"
                          type="input"
                          as={TextField}
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                      <Grid item xs>
                        {/* <AadhaarField label="Aadhaar" placeholder="000011112222" name="aadhaar" /> */}
                        <MyTextField
                          placeholder="Doctor ID"
                          name="d_id"
                          type="input"
                          as={TextField}
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                      <Grid item xs>
                        {/* <WeightField label="Weight" placeholder="50" name="weight" /> */}
                        <MyTextField
                          placeholder="Disease"
                          name="disease"
                          type="input"
                          as={TextField}
                        />
                      </Grid>
                      <Grid item xs>
                        {/* <DobField label="Date of Birth" placeholder="1/1/2000" name="dob" /> */}
                        <MyTextField
                          placeholder="Symptoms"
                          name="symptoms"
                          type="input"
                          as={TextField}
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                      <Grid item xs>
                        <FieldArray name="medicine">
                          {arrayHelpers => (
                            <>
                              <IconButton
                                color="primary"
                                onClick={() =>
                                  arrayHelpers.push({
                                    name: '',
                                    quantity: '',
                                    id: `${Math.random()}`,
                                  })
                                }
                              >
                                <AddIcon />
                              </IconButton>

                              {values.medicine.map((note, index) => (
                                <div key={note.id}>
                                  <MyTextField
                                    label="Medicine Name"
                                    placeholder="Medicine"
                                    name={`medicine.${index}.name`}
                                  />
                                  <MyTextField
                                    placeholder="Medicine Quantity"
                                    name={`medicine.${index}.quantity`}
                                  />
                                  <IconButton
                                    className={classes.button}
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <ClearIcon />
                                  </IconButton>
                                </div>
                              ))}
                            </>
                          )}
                        </FieldArray>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContent>
            </Hidden>

            <Hidden mdUp>
              <DialogContent>
                <Grid container direction="column" spacing={2}>
                  <Grid item xs>
                    {/* <NameTextField label="First Name" placeholder="Satoshi" name="firstName" /> */}
                    <MyTextField
                      placeholder="Aadhaar"
                      name="aadhaar"
                      type="input"
                      as={TextField}
                    />
                  </Grid>

                  <Grid item xs>
                    {/* <AadhaarField label="Aadhaar Confirmation" placeholder="000011112222" name="aadhaarConfirmation" /> */}
                    <MyTextField
                      placeholder="Doctor ID"
                      name="d_id"
                      type="input"
                      as={TextField}
                    />
                  </Grid>

                  <Grid item xs>
                    {/* <WeightField label="Weight" placeholder="50" name="weight" /> */}
                    <MyTextField
                      placeholder="Disease"
                      name="disease"
                      type="input"
                      as={TextField}
                    />
                  </Grid>

                  <Grid item xs>
                    {/* <DobField label="Date of Birth" placeholder="1/1/2000" name="dob" /> */}
                    <MyTextField
                      placeholder="Symptoms"
                      name="symptoms"
                      type="input"
                      as={TextField}
                    />
                  </Grid>

                  <Grid item xs>
                    <FieldArray name="medicine">
                      {arrayHelpers => (
                        <>
                          <IconButton
                            color="primary"
                            onClick={() =>
                              arrayHelpers.push({
                                name: '',
                                quantity: '',
                                id: `${Math.random()}`,
                              })
                            }
                          >
                            <AddIcon />
                          </IconButton>

                          {values.medicine.map((note, index) => (
                            <div key={note.id}>
                              <MyTextField
                                label="Medicine Name"
                                placeholder="Medicine"
                                name={`medicine.${index}.name`}
                              />
                              <MyTextField
                                placeholder="Medicine Quantity"
                                name={`medicine.${index}.quantity`}
                              />
                              <IconButton
                                className={classes.button}
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <ClearIcon />
                              </IconButton>
                            </div>
                          ))}
                        </>
                      )}
                    </FieldArray>
                  </Grid>
                </Grid>
              </DialogContent>
            </Hidden>

            <DialogActions>
              <Button color="primary" onClick={dialogProps.onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                //   disabled={} type="submit" className={classes.button} disabled={isSubmitting}
              >
                Prescribe
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

MyTextField.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
};

AadhaarField.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
};

WeightField.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
};

DobField.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
};

SexRadio.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
};

PrescriptionFormDialog.propTypes = {
  dialogProps: PropTypes.object.isRequired,
  toggleSnackbar: PropTypes.func,
};

export default PrescriptionFormDialog;
