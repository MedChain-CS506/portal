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
  FormControlLabel,
  Radio,
  InputAdornment,
  IconButton,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';

import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import {
  Formik,
  // Field,
  Form,
  useField,
  // FieldAttributes,
  FieldArray,
} from 'formik';

import * as yup from 'yup';
import PatientContext from '../../../../context/patient/PatientContext';

const useStyles = makeStyles({
  dialogContent: {
    overflowY: 'hidden',
  },
});

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

// const DobField = ({ placeholder, label, ...props }) => {
//   const [field, meta] = useField(props);
//   const errorText = meta.error && meta.touched ? meta.error : '';
//   return (
//     <TextField
//       variant="outlined"
//       label={label}
//       fullWidth
//       placeholder={placeholder}
//       {...field}
//       helperText={errorText}
//       error={!!errorText}
//     />
//   );
// };

const SexRadio = ({ placeholder, label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormControlLabel
      {...field}
      control={<Radio color="primary" />}
      label={label}
    />
  );
};

//! Added .shape({})
const validationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  aadhaar: yup
    .string()
    .matches(/^[0-9]{12}$/, 'Must be exactly 12 digits')
    .required('Aadhaar is required'),
  aadhaarConfirmation: yup
    .string()
    .matches(/^[0-9]{12}$/, 'Must be exactly 12 digits')
    .required('Aadhaar Confirmation is required')
    .test('aadhaar-match', 'Aadhaars must match', function(value) {
      return this.parent.aadhaar === value;
    }),
  weight: yup
    .number('Weight must be a number')
    .positive('Weight must be postitive')
    .required('Weight is required'),
  // sex: yup.boolean(),
  notes: yup.array().of(
    yup.object({
      name: yup.string().required(),
    })
  ),
});

const PatientFormDialog = ({ dialogProps, ...props }) => {
  const classes = useStyles();
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [aadhaar, setAadhaar] = useState('');
  // const [aadhaarConfirmation, setAadhaarConfirmation] = useState('');
  // const [weight, setWeight] = useState('');
  // const [dob, setDob] = useState('');
  // const [sex, setSex] = useState('');
  //! NEW!!!!!!!!!!!!!!!!!!!!
  const [selectedDate, handleDateChange] = useState(new Date());

  const patientContext = useContext(PatientContext);
  const register = async data => {
    console.log('call to register patient');
    // combine first and last names
    const fullName = `${data.firstName} ${data.lastName}`;
    let allergies = '';
    for (const allergy in data.notes) {
      allergies = `${allergies} - ${data.notes[allergy].name}`;
    }
    console.log(allergies);
    // do some sort of check (i.e. all data is correct, aadhaar doesn't currently exist)
    patientContext
      .addPatient(
        dialogProps.contract,
        data.aadhaar,
        fullName,
        data.dob,
        data.weight,
        data.sex,
        allergies
      )
      .then(() => {
        props.toggleSnackbar(`Patient Successfully Created`);
        dialogProps.onClose();
      });
  };

  return (
    <Dialog fullWidth maxWidth="md" {...dialogProps}>
      <DialogTitle>New Patient</DialogTitle>
      <Formik
        validateOnChange
        initialValues={{
          firstName: '',
          lastName: '',
          aadhaar: '',
          aadhaarConfirmation: '',
          weight: '',
          dob: '',
          sex: '',
          notes: [{ name: '', id: `${Math.random()}` }],
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          console.log('inside on submit');
          setSubmitting(true);
          console.log('submit: ', data);
          //* make async call
          register(data).then(() => {
            setSubmitting(false);
          });
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Form>
              <Hidden smDown>
                <DialogContent className={classes.dialogContent}>
                  <Grid container direction="row">
                    <Grid item xs={12}>
                      <Grid container spacing={4}>
                        <Grid item xs>
                          <NameTextField
                            label="First Name"
                            placeholder="Satoshi"
                            name="firstName"
                          />
                        </Grid>
                        <Grid item xs>
                          <NameTextField
                            label="Last Name"
                            placeholder="Nakamoto"
                            name="lastName"
                          />
                        </Grid>
                      </Grid>

                      <Grid container spacing={4}>
                        <Grid item xs>
                          <AadhaarField
                            label="Aadhaar"
                            placeholder="000011112222"
                            name="aadhaar"
                          />
                        </Grid>
                        <Grid item xs>
                          <AadhaarField
                            label="Aadhaar Confirmation"
                            placeholder="000011112222"
                            name="aadhaarConfirmation"
                          />
                        </Grid>
                      </Grid>

                      <Grid container spacing={4}>
                        <Grid item xs>
                          <WeightField
                            label="Weight"
                            placeholder="50"
                            name="weight"
                          />
                        </Grid>
                        <Grid item xs>
                          {/* <DobField
                          label="Date of Birth"
                          placeholder="1/1/2000"
                          name="dob"
                        /> */}
                          <DatePicker
                            disableFuture
                            openTo="year"
                            fullWidth
                            format="MM/dd/yyyy"
                            label="Date of birth"
                            views={['year', 'month', 'date']}
                            value={selectedDate}
                            onChange={handleDateChange}
                          />
                        </Grid>

                        <Grid item xs>
                          <SexRadio
                            name="sex"
                            type="radio"
                            value="male"
                            label="Male"
                          />
                          <SexRadio
                            name="sex"
                            type="radio"
                            value="female"
                            label="Female"
                          />
                          <SexRadio
                            name="sex"
                            type="radio"
                            value="other"
                            label="Other"
                          />
                        </Grid>
                      </Grid>

                      <Grid container spacing={4}>
                        <Grid item xs>
                          <FieldArray name="notes">
                            {arrayHelpers => (
                              <>
                                <IconButton
                                  color="primary"
                                  onClick={() =>
                                    arrayHelpers.push({
                                      name: '',
                                      id: `${Math.random()}`,
                                    })
                                  }
                                >
                                  <AddIcon />
                                </IconButton>

                                {values.notes.map((note, index) => (
                                  <div key={note.id}>
                                    <NameTextField
                                      label="New Allergy"
                                      placeholder="Allergy"
                                      name={`notes.${index}.name`}
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
                      <NameTextField
                        label="First Name"
                        placeholder="Satoshi"
                        name="firstName"
                      />
                    </Grid>
                    <Grid item xs>
                      <NameTextField
                        label="Last Name"
                        placeholder="Nakamoto"
                        name="lastName"
                      />
                    </Grid>

                    <Grid item xs>
                      <AadhaarField
                        label="Aadhaar"
                        placeholder="000011112222"
                        name="aadhaar"
                      />
                    </Grid>

                    <Grid item xs>
                      <AadhaarField
                        label="Aadhaar Confirmation"
                        placeholder="000011112222"
                        name="aadhaarConfirmation"
                      />
                    </Grid>

                    <Grid item xs>
                      <WeightField
                        label="Weight"
                        placeholder="50"
                        name="weight"
                      />
                    </Grid>

                    <Grid item xs>
                      {/* <DobField
                      label="Date of Birth"
                      placeholder="1/1/2000"
                      name="dob"
                    /> */}
                      <DatePicker
                        disableFuture
                        openTo="year"
                        fullWidth
                        format="MM/dd/yyyy"
                        label="Date of birth"
                        views={['year', 'month', 'date']}
                        value={selectedDate}
                        onChange={handleDateChange}
                      />
                    </Grid>

                    <Grid item xs>
                      <SexRadio
                        name="sex"
                        type="radio"
                        value="male"
                        label="Male"
                      />
                      <SexRadio
                        name="sex"
                        type="radio"
                        value="female"
                        label="Female"
                      />
                      <SexRadio
                        name="sex"
                        type="radio"
                        value="other"
                        label="Other"
                      />
                    </Grid>

                    <Grid item xs>
                      <FieldArray name="notes">
                        {arrayHelpers => (
                          <div>
                            <IconButton
                              color="primary"
                              onClick={() =>
                                arrayHelpers.push({
                                  name: '',
                                  id: `${Math.random()}`,
                                })
                              }
                            >
                              <AddIcon />
                            </IconButton>
                            <span>
                              <br />
                            </span>
                            {values.notes.map((note, index) => (
                              <div key={note.id}>
                                <NameTextField
                                  label="New Allergy"
                                  placeholder="Allergy"
                                  name={`notes.${index}.name`}
                                />
                                <IconButton
                                  className={classes.button}
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  <ClearIcon />
                                </IconButton>
                              </div>
                            ))}
                          </div>
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
                  // disabled={
                  //   !firstName ||
                  //   !lastName ||
                  //   !aadhaar ||
                  //   !aadhaarConfirmation
                  //   // !sex ||
                  //   // !weight ||
                  //   // !dob
                  // }
                >
                  Register
                </Button>
              </DialogActions>

              <pre>{JSON.stringify(values, null, 2)}</pre>
              <pre>{JSON.stringify(errors, null, 2)}</pre>
            </Form>
          </MuiPickersUtilsProvider>
        )}
      </Formik>
    </Dialog>
  );
};

NameTextField.propTypes = {
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

SexRadio.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
};

PatientFormDialog.propTypes = {
  dialogProps: PropTypes.object.isRequired,
  toggleSnackbar: PropTypes.func.isRequired,
};

export default PatientFormDialog;
