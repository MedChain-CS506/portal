import React, { useState } from 'react';

//* MUI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles({
  card: {
    maxWidth: 690,
    minWidth: 690,
  },
  
  button: {
    backgroundColor: 'red',
    color: 'white',
  },

  paperButton: {
    marginTop: '10px',
    marginBottom: '30px',
  },
});

export default function AddressForm() {
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [aadhar, setAadhar] = useState('');
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [weight, setWeight] = useState('');
  const [allergies, setAllergies] = useState('');
  const [diseaseHistory, setDiseaseHistory] = useState('');

  const handleOnSubmit = () => {
    const fullName = `${firstName} ${lastName}`;
    return { aadhar, age, fullName, dateOfBirth, weight, sex, allergies };
  };

  const classes = useStyles();

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Patient Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  value={aadhar}
                  onChange={e => setAadhar(e.target.value)}
                  required
                  id="Aadhar"
                  name="aadhar"
                  label="Aadhar"
                  fullWidth
                  autoComplete="aadhar"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  value={age}
                  onChange={e => setAge(e.target.value)}
                  required
                  id="Age"
                  name="age"
                  label="Age"
                  fullWidth
                  autoComplete="age"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={sex}
                  onChange={e => setSex(e.target.value)}
                  required
                  id="Sex"
                  name="sex"
                  label="Sex"
                  fullWidth
                  autoComplete="sex"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required
                  id="firstName"
                  name="firstName"
                  label="First name"
                  fullWidth
                  autoComplete="fname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputProps={{ pattern: '[a-z]' }}
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  required
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  fullWidth
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-of-birth"
                    label="Date of Birth"
                    value={dateOfBirth}
                    onChange={e => setDateOfBirth(e)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="number"
                  value={weight}
                  onChange={e => setWeight(e.target.value)}
                  required
                  id="weight"
                  name="weight"
                  label="Patient Weight"
                  fullWidth
                  autoComplete="weight"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={allergies}
                  onChange={e => setAllergies(e.target.value)}
                  required
                  id="allergies"
                  name="allergies"
                  label="Patient Allergies"
                  fullWidth
                  autoComplete="allergies"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <Button
              className={classes.button}
              onClick={handleOnSubmit}
              variant="extended"
              fullWidth
            >
              Submit
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
