/*eslint-disable*/
import React, { useState } from 'react';

import PropTypes from 'prop-types';

import validate from 'validate.js';
import constraints from '../../../../utils/constaints';

//* MUI
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    dialogContent: {
        overflowY: 'hidden',
      },
  });

const PatientFormDialog = ({ dialogProps }) => {
    const classes = useStyles();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [aadhaar, setAadhaar] = useState('')
    const [aadhaarConfirmation, setAadhaarConfirmation] = useState('')
    //!^Just used for validation matching
    const [sex, setSex] = useState('')
    const [weight, setWeight] = useState('')
    const [dob, setDob] = useState('')
    const [errors, setErrors] = useState('')

    const register = () => {
      const newErrors = validate({
        firstName: firstName,
        lastName: lastName,
        // aadhaar: aadhaar,
        // aadhaarConfirmation: aadhaarConfirmation,
        // sex: sex,
        // weight: weight,
        // dob: dob
      }, {
        firstName: constraints.firstName,
        lastName: constraints.lastName,
        // aadhaar: constraints.aadhaar,
        // aadhaarConfirmation: constraints.aadhaarConfirmation,
        // sex: constraints.sex,
        // weight: constraints.weight,
        // dob: constraints.dob
      })

      if (newErrors) {
        setErrors(newErrors)
      } else {
        setErrors(null)
        //make a call to register patient here.
        .then(dialogProps.onClose())
        .catch((reason) => {
          const code = reason.code
          const message = reason.message

          switch (code) {
            case 'aadhaar-already-created':
            case 'auth/invalid-email':
            case 'auth/operation-not-allowed':
            case 'auth/weak-password':
              // openSnackbar(message);?
              return;

            default:
              //openSnackbar(message);
              return;
          }
        })
      }
    }

    const handleKeyPress = event => {
    // if (!firstName ||!lastName ||!aadhaar ||!aadhaarConfirmation ||!sex ||!weight ||!dob) return
    if (!firstName ||!lastName) return
        const { key } = event;
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
        if (key === 'Enter') console.log('register')
    };

    const handleExited = () => {
      setFirstName('');
      setLastName('');
      setAadhaar('');
      setAadhaarConfirmation('');
      setSex('');
      setWeight('');
      setDob('');
    };

    return (
        <Dialog fullWidth maxWidth="md" {...dialogProps} onKeyPress={handleKeyPress} onExited={handleExited}>
            <DialogTitle>New Entry</DialogTitle>

            <Hidden smDown>
                <DialogContent className={classes.dialogContent}>
                    <Grid container direction="row">
                        <Grid item xs={12}>
                            <Grid container spacing={4}>
                                <Grid item xs>
                                    <TextField
                                        autoComplete="given-name"
                                        error={!!(errors && errors.firstName)}
                                        fullWidth
                                        helperText={(errors && errors.firstName) ? errors.firstName[0] : ''}
                                        label="First name"
                                        placeholder="Satoshi"
                                        required
                                        type="text"
                                        value={firstName}
                                        variant="outlined"
                                        onChange={e => setFirstName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <TextField
                                        autoComplete="family-name"
                                        error={!!(errors && errors.lastName)}
                                        fullWidth
                                        helperText={(errors && errors.lastName) ? errors.lastName[0] : ''}
                                        label="Last name"
                                        placeholder="Nakamoto"
                                        required
                                        type="text"
                                        value={lastName}
                                        variant="outlined"
                                        onChange={e => setLastName(e.target.value)}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={4}>
                                <Grid item xs>
                                    <TextField
                                        autoComplete="aadhaar"
                                        // error={!!(errors && errors.emailAddress)}
                                        fullWidth
                                        // helperText={(errors && errors.emailAddress) ? errors.emailAddress[0] : ''}
                                        label="Aadhaar"
                                        placeholder="000011112222"
                                        required
                                        type="number"
                                        value={aadhaar}
                                        variant="outlined"
                                        onChange={e => setAadhaar(e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs>
                                    <TextField
                                        autoComplete="aadhaar"
                                        // error={!!(errors && errors.emailAddress)}
                                        fullWidth
                                        // helperText={(errors && errors.emailAddress) ? errors.emailAddress[0] : ''}
                                        label="Aadhaar Confirmation"
                                        placeholder="000011112222"
                                        required
                                        type="number"
                                        value={aadhaarConfirmation}
                                        variant="outlined"
                                        onChange={e => setAadhaarConfirmation(e.target.value)}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={4}>
                                <Grid item xs>
                                    <TextField
                                        autoComplete="sex"
                                        // error={!!(errors && errors.emailAddress)}
                                        fullWidth
                                        // helperText={(errors && errors.emailAddress) ? errors.emailAddress[0] : ''}
                                        label="Sex"
                                        placeholder="Male"
                                        required
                                        type="string"
                                        value={sex}
                                        variant="outlined"
                                        onChange={e => setSex(e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs>
                                    <TextField
                                        autoComplete="weight"
                                        // error={!!(errors && errors.emailAddress)}
                                        fullWidth
                                        // helperText={(errors && errors.emailAddress) ? errors.emailAddress[0] : ''}
                                        label="Weight"
                                        placeholder="22"
                                        required
                                        type="number"
                                        value={weight}
                                        variant="outlined"
                                        onChange={e => setWeight(e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs>
                                    <TextField
                                        autoComplete="dob"
                                        // error={!!(errors && errors.emailAddress)}
                                        fullWidth
                                        // helperText={(errors && errors.emailAddress) ? errors.emailAddress[0] : ''}
                                        label="Date of Birth"
                                        placeholder="1/1/2000"
                                        required
                                        type="string"
                                        value={dob}
                                        variant="outlined"
                                        onChange={e => setDob(e.target.value)}
                                    />
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
                            <TextField
                                autoComplete="given-name"
                                error={!!(errors && errors.firstName)}
                                fullWidth
                                helperText={(errors && errors.firstName) ? errors.firstName[0] : ''}
                                label="First name"
                                placeholder="Satoshi"
                                required
                                type="text"
                                value={firstName}
                                variant="outlined"
                                onChange={e => setFirstName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                autoComplete="family-name"
                                error={!!(errors && errors.lastName)}
                                fullWidth
                                helperText={(errors && errors.lastName) ? errors.lastName[0] : ''}
                                label="Last name"
                                placeholder="Nakamoto"
                                required
                                type="text"
                                value={lastName}
                                variant="outlined"
                                onChange={e => setLastName(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs>
                            <TextField
                                autoComplete="aadhaar"
                                // error={!!(errors && errors.emailAddress)}
                                fullWidth
                                // helperText={(errors && errors.emailAddress) ? errors.emailAddress[0] : ''}
                                label="Aadhaar"
                                placeholder="000011112222"
                                required
                                type="number"
                                value={aadhaar}
                                variant="outlined"
                                onChange={e => setAadhaar(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs>
                            <TextField
                                autoComplete="aadhaar"
                                // error={!!(errors && errors.emailAddress)}
                                fullWidth
                                // helperText={(errors && errors.emailAddress) ? errors.emailAddress[0] : ''}
                                label="Aadhaar Confirmation"
                                placeholder="000011112222"
                                required
                                type="number"
                                value={aadhaarConfirmation}
                                variant="outlined"
                                onChange={e => setAadhaarConfirmation(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs>
                            <TextField
                                autoComplete="sex"
                                // error={!!(errors && errors.emailAddress)}
                                fullWidth
                                // helperText={(errors && errors.emailAddress) ? errors.emailAddress[0] : ''}
                                label="Sex"
                                placeholder="Male"
                                required
                                type="string"
                                value={sex}
                                variant="outlined"
                                onChange={e => setSex(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs>
                            <TextField
                                autoComplete="weight"
                                // error={!!(errors && errors.emailAddress)}
                                fullWidth
                                // helperText={(errors && errors.emailAddress) ? errors.emailAddress[0] : ''}
                                label="Weight"
                                placeholder="22"
                                required
                                type="number"
                                value={weight}
                                variant="outlined"
                                onChange={e => setWeight(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs>
                            <TextField
                                autoComplete="dob"
                                // error={!!(errors && errors.emailAddress)}
                                fullWidth
                                // helperText={(errors && errors.emailAddress) ? errors.emailAddress[0] : ''}
                                label="Date of Birth"
                                placeholder="1/1/2000"
                                required
                                type="string"
                                value={dob}
                                variant="outlined"
                                onChange={e => setDob(e.target.value)}
                            />
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
                    variant="contained"
                    onClick={register}
                >
                    Register
                </Button>
            </DialogActions>
        </Dialog>
    )
};

PatientFormDialog.propTypes = {
  dialogProps: PropTypes.object.isRequired,
};

export default PatientFormDialog;

{
  /* <main className={classes.layout}>
  <Paper className={classes.paper}>
    <Formik
      initialValues={{
        aadhaar: '',
        firstName: '',
        lastName: '',
        sex: '',
        weight: '',
        dob: '',
        notes: [{ type: 'allergy', name: 'hay fever', id: `${Math.random()}` }],
      }}
      validationSchema={validationSchema}
      onSubmit={(data, { setSubmitting }) => {
        setSubmitting(true);

        console.log('submit: ', data);
        onSubmit(data);
        setSubmitting(false);
        // may want to reset form here
      }}
    >
      {({ values, errors, isSubmitting }) => (
        <Form id="patient-form">
          <Grid container spacing={3}>
            <Grid id="aadhaar" item xs={12}>
              <MyTextField
                placeholder="Aadhaar"
                name="aadhaar"
                type="input"
                as={TextField}
              />
            </Grid>
            <Grid id="first-name" item xs={12} sm={6}>
              <Field
                placeholder="First name"
                name="firstName"
                type="input"
                fullWidth
                as={TextField}
              />
            </Grid>
            <Grid id="last-name" item xs={12} sm={6}>
              <Field
                placeholder="Last name"
                name="lastName"
                type="input"
                fullWidth
                as={TextField}
              />
            </Grid>
            <Grid id="sex" item xs={12} md={4}>
              <FormLabel fullWidth>Sex</FormLabel>
              <FormGroup id="sex-choices" row="true">
                <SexRadio name="sex" type="radio" value="male" label="male" />
                <SexRadio
                  name="sex"
                  type="radio"
                  value="female"
                  label="female"
                />
              </FormGroup>
            </Grid>
            <Grid id="weight" item xs={12} md={4}>
              <Field
                name="weight"
                margin="normal"
                label="Weight"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Kg</InputAdornment>
                  ),
                }}
                InputLabelProps={{ shrink: true }}
                as={TextField}
              />
            </Grid>
            <Grid id="date-of-birth" item xs={12} md={4}>
              <Field
                name="dob"
                margin="normal"
                label="Birthday"
                type="date"
                defaultValue="2000-01-01"
                InputLabelProps={{ shrink: true }}
                as={TextField}
              />
            </Grid>
            <Grid id="notes" item xs={12}>
              <FieldArray name="notes">
                {arrayHelpers => (
                  <div>
                    <Button
                      onClick={() =>
                        arrayHelpers.push({
                          type: 'allergy',
                          name: '',
                          id: `${Math.random()}`,
                        })
                      }
                      variant="contained"
                    >
                      add note
                    </Button>
                    {values.notes.map((note, index) => (
                      <div key={note.id}>
                        <MyTextField
                          placeholder="New Note"
                          name={`notes.${index}.name`}
                        />
                        <Field
                          name={`notes.${index}.type`}
                          type="select"
                          as={Select}
                        >
                          <MenuItem value="allergy">Allergy</MenuItem>
                          <MenuItem value="disease">Disease</MenuItem>
                        </Field>
                        <Button
                          className={classes.button}
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          {' '}
                          x{' '}
                        </Button>
                      </div>
                    ))}
                    ); })}
                  </div>
                )}
              </FieldArray>
            </Grid>
            <>
              <Button
                className={classes.button}
                disabled={isSubmitting}
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </>
          </Grid>
          <pre>{JSON.stringify(values, null, 2)}</pre>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  </Paper>
</main>; */
}
