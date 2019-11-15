/* eslint-disable */
import React, { useState, useContext } from 'react';

import { makeStyles, Paper, InputBase, Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import PatientContext from '../../../context/patient/PatientContext'

const useStyles = makeStyles({
  inputSeparator: {
    marginBottom: '20px'
  },

  input: {
    marginLeft: 10,
  },

  docButton: {
    background: 'linear-gradient(45deg, #F00000 30%, #DC281E 90%)',
    color: 'white',
  },

  pharmacistButton: {
    background: 'linear-gradient(45deg, #0575E6 30%, #021B79 90%)',
    color: 'white',
  }

});

const Search = ({isPharmacist}) => {
  const classes = useStyles();
  const patientContext = useContext(PatientContext);

  const [text, setText] = useState('')

  const onSubmit = e => {
    e.preventDefault()
    if (text === '') {
      return console.log('Please enter something') //TODO: Should be visible to user
    } else {
      console.log(text)
      // patientContext.getPatient(contract, text)
      setText('');
      return <Redirect to="/patient-form"/>
    }
  }

  if (isPharmacist) {
    return (
      <div>
      <form onSubmit={onSubmit}>
        <Paper className={classes.inputSeparator}>
          <InputBase
            type='text'
            name='text'
            className={classes.input}
            fullWidth
            placeholder="Search by Aadhar..."
            autoFocus
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </Paper>
        <Paper>
          <Button
            className={classes.pharmacistButton}
            fullWidth
            type='submit'
          >
            Search
          </Button>
        </Paper>
      </form>
    </div>
    )
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Paper className={classes.inputSeparator}>
          <InputBase
            type='text'
            name='text'
            className={classes.input}
            fullWidth
            placeholder="Search by Aadhar..."
            autoFocus
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </Paper>
        <Paper>
          <Button
            className={classes.docButton}
            fullWidth
            type='submit'
          >
            Search
          </Button>
        </Paper>
      </form>
    </div>
  );
};

export default Search;
