/*eslint-disable*/
import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from '@material-ui/pickers';
import * as yup from "yup";
import { Formik, Field, Form, useField, FieldAttributes, FieldArray } from "formik";

const useStyles = makeStyles({
  dialogContent: {
    overflowY: 'hidden',
  },
});

const NameTextField = ({ placeholder, label,...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return <TextField variant="outlined" label={label} fullWidth placeholder={placeholder} {...field} helperText={errorText} error={!!errorText} />
};

const AadhaarField = ({ placeholder, label,...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return <TextField variant="outlined" label={label} fullWidth placeholder={placeholder} {...field} helperText={errorText} error={!!errorText} />
};

const WeightField = ({ placeholder, label, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : ""
  return <TextField InputProps={{startAdornment: <InputAdornment position="start">Kg</InputAdornment>}} variant="outlined" label={label} fullWidth placeholder={placeholder} {...field} helperText={errorText} error={!!errorText} />
};

const DobField = ({ placeholder, label, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : ""
  return <TextField variant="outlined" label={label} fullWidth placeholder={placeholder} {...field} helperText={errorText} error={!!errorText} />
};

const SexRadio = ({ placeholder, label, ...props }) => {
  const [field, meta] = useField(props);
  return <FormControlLabel {...field} control={<Radio color="default" />} label={label} />;
};

const validationSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    aadhaar: yup.string().required().min(12).max(12),
    notes: yup.array().of(
      yup.object({
          name: yup.string().required()
      })
  )
});

const PatientFormDialog = ({ dialogProps }) => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [aadhaar, setAadhaar] = useState('')
  const [aadhaarConfirmation, setAadhaarConfirmation] = useState('')
  const [weight, setWeight] = useState('')
  const [dob, setDob] = useState('')
  const [sex, setSex] = useState('')

  const register = () => {
    console.log('call to register patient')
    //combine first and last names
    //openSnackbar here
  }

  return (
    <Dialog fullWidth maxWidth="md" {...dialogProps}>
      <DialogTitle>New Patient</DialogTitle>
      <Formik
        validateOnChange={true}
        initialValues={{
          firstName: "",
          lastName: "",
          aadhaar: "",
          aadhaarConfirmation: "",
          weight: "",
          dob: "",
          sex: "",
          notes: [{ type: "allergy", name: "", id: "" + Math.random() }]
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          // make async call
          console.log("submit: ", data);
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
                      <NameTextField label="First Name" placeholder="Satoshi" name="firstName" />
                    </Grid>
                    <Grid item xs>
                      <NameTextField label="Last Name" placeholder="Nakamoto" name="lastName" />
                    </Grid>
                  </Grid>

                  <Grid container spacing={4}>
                    <Grid item xs>
                      <AadhaarField label="Aadhaar" placeholder="000011112222" name="aadhaar" />
                    </Grid>
                    <Grid item xs>
                      <AadhaarField label="Aadhaar Confirmation" placeholder="000011112222" name="aadhaarConfirmation" />
                    </Grid>
                  </Grid>

                  <Grid container spacing={4}>
                    <Grid item xs>
                      <WeightField label="Weight" placeholder="50" name="weight" />
                    </Grid>
                    <Grid item xs>
                      <DobField label="Date of Birth" placeholder="1/1/2000" name="dob" />
                    </Grid>
                    <Grid item xs>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Sex</FormLabel>
                        <RadioGroup row>
                          <FormControlLabel value="female" label="Female" control={<Radio />} />
                          <FormControlLabel value="male" label="Male" control={<Radio />} />
                          <FormControlLabel value="other" label="Other" control={<Radio />} />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid container spacing={4}>
                    <Grid item xs>
                      <FieldArray name="notes">
                        {arrayHelpers => (
                          <>
                            <IconButton color="primary" onClick={() =>
                                arrayHelpers.push({
                                    type: "allergy",
                                    name: "",
                                    id: "" + Math.random()
                                })
                            }
                            >
                              <AddIcon />
                            </IconButton>

                            {values.notes.map((note, index) => {
                              return (
                                <div key={note.id}>
                                  <NameTextField placeholder="New Note" name={`notes.${index}.name`} />
                                  <Field name={`notes.${index}.type`} type="select" as={Select} >
                                      <MenuItem value="allergy">Allergy</MenuItem>
                                  </Field>
                                  <IconButton className={classes.button} onClick={() => arrayHelpers.remove(index)}>
                                      <ClearIcon />
                                  </IconButton>
                                </div>
                              );
                            })}
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
                  <NameTextField label="First Name" placeholder="Satoshi" name="firstName" />
                </Grid>
                <Grid item xs>
                  <NameTextField label="Last Name" placeholder="Nakamoto" name="lastName" />
                </Grid>

                <Grid item xs>
                  <AadhaarField label="Aadhaar" placeholder="000011112222" name="aadhaar" />
                </Grid>

                <Grid item xs>
                  <AadhaarField label="Aadhaar Confirmation" placeholder="000011112222" name="aadhaarConfirmation" />
                </Grid>

                <Grid item xs>
                  <WeightField label="Weight" placeholder="50" name="weight" />
                </Grid>

                <Grid item xs>
                  <DobField label="Date of Birth" placeholder="1/1/2000" name="dob" />
                </Grid>
                
                <Grid item xs>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Sex</FormLabel>
                    <RadioGroup row>
                      <FormControlLabel value="female" label="Female" control={<Radio />} />
                      <FormControlLabel value="male" label="Male" control={<Radio />} />
                      <FormControlLabel value="other" label="Other" control={<Radio />} />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs>
                  <FieldArray name="notes">
                      {arrayHelpers => (
                          <div>
                              <Button
                                  onClick={() =>
                                      arrayHelpers.push({
                                          type: "allergy",
                                          name: "",
                                          id: "" + Math.random()
                                      })
                                  }
                                  variant="contained"
                              >
                                  Add Allergy
                              </Button>
                              {values.notes.map((note, index) => {
                                  return (
                                      <div key={note.id}>
                                          <NameTextField placeholder="New Note" name={`notes.${index}.name`} />
                                          <Field name={`notes.${index}.type`} type="select" as={Select} >
                                              <MenuItem value="allergy">Allergy</MenuItem>
                                          </Field>
                                          <Button className={classes.button} onClick={() => arrayHelpers.remove(index)}> X </Button>
                                      </div>
                                  );
                              })}
                          </div>
                      )}
                  </FieldArray>

                </Grid>
              </Grid>
            </DialogContent>
          </Hidden>

          <DialogActions>
            <Button color="primary" onClick={dialogProps.onClose}>Cancel</Button>
            <Button color="primary" variant="contained" onClick={register}
              disabled={
                  !firstName ||
                  !lastName 
                  // ||
                  // !aadhaar ||
                  // !aadhaarConfirmation ||
                  // !sex ||
                  // !weight ||
                  // !dob 
              }
            >Register
            </Button>
          </DialogActions>

          <pre>{JSON.stringify(values, null, 2)}</pre>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
        </Form>
      )}
      </Formik>
    </Dialog>
  )
};

PatientFormDialog.propTypes = {
  dialogProps: PropTypes.object.isRequired,
};

export default PatientFormDialog;