import React from 'react';

//* MUI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

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

const Search = () => {
  const classes = useStyles();
  return (
    <>
      <Paper>
        <InputBase
          className={classes.input}
          fullWidth
          placeholder="Search Patients..."
          inputProps={{ 'aria-label': 'search patients' }}
        />
      </Paper>

      <Paper className={classes.paperButton}>
        <Button className={classes.button} fullWidth>
          Search
        </Button>
      </Paper>
    </>
  );
};

export default Search;
