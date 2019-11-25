import React, { useState, useEffect, useContext } from 'react';
import PatientContext from '../../../../../context/patient/PatientContext';
import PropTypes from 'prop-types';

import {
  makeStyles,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Toolbar,
  Tooltip,
} from '@material-ui/core';

// TODO: ADD AND EDIT PRESCRIPTIONS
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  toolbarButtons: {
    marginLeft: 'auto',
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const Prescriptions = ({ onNewPrescriptionClick, isPharmacist, aadhaar, contract}) => {
  const classes = useStyles();
  const patientContext = useContext(PatientContext);

  const [prescriptionData, setPrescriptiontData] = useState({
    id: '1',
    medicine: 'adderall',
    doc_id: '1',
    quantity: '1000000000',
    symptoms: 'need to work',
    timestamp: '10/10/10',
  });

  const get_string = (str) => {
    let newStr = str.split('-');
    return newStr;
  }

  const asyncCallToGetPrescriptions = async () => {
    const data = await patientContext.lastPrescription(contract, aadhaar);
    
    let medicine = get_string(data.last_pres_medicine);
    console.log(medicine);

    setPrescriptiontData({
      ...prescriptionData, 
      id: data.last_pres_id,
      medicine: medicine[1],
      quantity: medicine[2],
      doc_id: data.last_pres_doc_id,
      symptoms: data.last_pres_symptoms, 
      timestamp: data.last_pres_timestamp,  
    });
  };

  useEffect(() => {
    asyncCallToGetPrescriptions();
  }, []);

  if (!isPharmacist) {
    return (
      <>
        <Toolbar>
          <Typography component="h2" variant="h5" color="primary" gutterBottom>
            Prescriptions
          </Typography>
          <span className={classes.toolbarButtons}>
            <Tooltip title="Edit">
              <IconButton>
                <CreateIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add">
              <IconButton onClick={onNewPrescriptionClick}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </span>
        </Toolbar>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow key={prescriptionData.id}>
                <TableCell>{prescriptionData.timestamp}</TableCell>
                <TableCell>{prescriptionData.medicine}</TableCell>
                <TableCell>{prescriptionData.quantity}</TableCell>
                <TableCell>"Filled"</TableCell>
              </TableRow>
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

  if (isPharmacist) {
    return (
      <>
        <Toolbar>
          <Typography
            component="h2"
            variant="h5"
            color="secondary"
            gutterBottom
          >
            Prescriptions
          </Typography>
        </Toolbar>

        <Table size="small">
        <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow key={prescriptionData.id}>
                <TableCell>{prescriptionData.timestamp}</TableCell>
                <TableCell>{prescriptionData.medicine}</TableCell>
                <TableCell>{prescriptionData.quantity}</TableCell>
                <TableCell>"Filled"</TableCell>
              </TableRow>
          </TableBody>
        </Table>
        <div className={classes.seeMore}>
          <Link color="secondary" href="#">
            See more
          </Link>
        </div>
      </>
    );
  }
}

Prescriptions.propTypes = {
  // signedIn: PropTypes.bool.isRequired,
  onNewPrescriptionClick: PropTypes.func.isRequired,
  isPharmacist: PropTypes.bool,
  aadhaar: PropTypes.isRequired,
};

export default Prescriptions;