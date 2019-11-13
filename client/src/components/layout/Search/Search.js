import React, { useState, useContext } from 'react';

import { makeStyles, Paper, InputBase, Button } from '@material-ui/core';

import PatientContext from '../../../context/patient/PatientContext'

const useStyles = makeStyles({
  input: {
    marginLeft: 5,
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

const Search = ({ contract }) => {
  const classes = useStyles();
  const patientContext = useContext(PatientContext);

  const [text, setText] = useState('')

  const onSubmit = e => {
    e.preventDefault()
    if (text === '') {
      return console.log('Please enter something') //TODO: Should be visible to user
    } else {
      console.log(text)
      patientContext.getPatient(contract, text)
      setText('')
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Paper>
          <InputBase
            type='text'
            name='text'
            className={classes.input}
            fullWidth
            placeholder="Search by Aadhar..."
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </Paper>
        <Paper className={classes.paperButton}>
          <Button
            className={classes.button}
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
