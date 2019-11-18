import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';

import PropTypes from 'prop-types';

// TODO: ADD AND EDIT PRESCRIPTIONS
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';

// Generate Prescription Data
function createPrescription(id, date, name, dosage, quantity, status) {
  return { id, date, name, dosage, quantity, status };
}

const rows = [
  createPrescription(
    0,
    'Jan 1, 2020',
    'Vicodin',
    '300 mg',
    '30 pills',
    'Complete'
  ),
  createPrescription(
    1,
    'Jan 1, 2020',
    'Simvastatin',
    '300 mg',
    '30 pills',
    'Complete'
  ),
  createPrescription(
    2,
    'Jan 1, 2020',
    'Azithromycin',
    '300 mg',
    '30 pills',
    'Complete'
  ),
  createPrescription(
    3,
    'Jan 1, 2020',
    'Lipitor',
    '300 mg',
    '30 pills',
    'Pending'
  ),
  createPrescription(
    4,
    'Jan 1, 2020',
    'Amlodipine',
    '300 mg',
    '30 pills',
    'Pending'
  ),
];

const useStyles = makeStyles(theme => ({
  toolbarButtons: {
    marginLeft: 'auto',
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Prescriptions({ onNewPrescriptionClick }) {
  const classes = useStyles();
  return (
    <>
      <Toolbar>
        <Typography component="h2" variant="h5" color="primary" gutterBottom>
          Prescriptions
        </Typography>
        <span className={classes.toolbarButtons}>
          <IconButton color="primary">
            <AddIcon onClick={onNewPrescriptionClick} />
          </IconButton>
          <IconButton color="primary">
            <CreateIcon />
          </IconButton>
        </span>
      </Toolbar>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Dosage</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.dosage}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#">
          See more
        </Link>
      </div>
    </>
  );
}

Prescriptions.propTypes = {
  // signedIn: PropTypes.bool.isRequired,
  onNewPrescriptionClick: PropTypes.func.isRequired,
};
