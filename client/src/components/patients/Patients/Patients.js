import React, { useContext } from 'react';

//* MUI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

//* Context
import { PatientContext } from '../../../context/patient/PatientContext';

//* Components
import Loading from '../../layout/Loading'

// TODO: GIVE THE LINK THE PROFILE
const columns = [
  { id: 'aadhar', label: 'Aadhar #', minWidth: 170 },
  { id: 'lastName', label: 'Last Name', minWidth: 170 },
  {
    id: 'firstName',
    label: 'First Name',
    minWidth: 170,
    format: value => value.toLocaleString(),
  },
  { id: 'button', label: 'Profile', minWidth: 170, align: 'right' },
];

function createObject(aadhar, firstName, lastName, profile) {
  return { aadhar, firstName, lastName, profile };
}

const rows = [
  createObject(499118665246, 'Muhammad', 'Muhammad', 1),
  createObject(499118665246, 'Muhammad', 'Muhammad', 2),
  createObject(499118665246, 'Muhammad', 'Muhammad', 3),
  createObject(499118665246, 'Muhammad', 'Muhammad', 4),
  createObject(499118665246, 'Muhammad', 'Muhammad', 5),
  createObject(499118665246, 'Muhammad', 'Muhammad', 6),
  createObject(499118665246, 'Muhammad', 'Muhammad', 7),
  createObject(499118665246, 'Muhammad', 'Muhammad', 8),
  createObject(499118665246, 'Muhammad', 'Muhammad', 9),
  createObject(499118665246, 'Muhammad', 'Muhammad', 10),
  createObject(499118665246, 'Muhammad', 'Muhammad', 11),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },

  tableWrapper: {
    overflow: 'auto',
  }
});

const Patients = () => {
  const classes = useStyles();

  const patientContext = useContext(PatientContext);

  const { loading, patients } = patientContext;

  if (loading) { 
    return <Loading /> 
  }
  else {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map(column => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map(column => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Paper>
        </Grid>
      </Grid>
    );
  }
};

export default Patients;
