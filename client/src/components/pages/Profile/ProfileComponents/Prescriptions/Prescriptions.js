/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
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
  Checkbox,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';
import PatientContext from '../../../../../context/patient/PatientContext';

const useStyles = makeStyles(theme => ({
  toolbarButtons: {
    marginLeft: 'auto',
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const Prescriptions = ({
  onNewPrescriptionClick,
  isPharmacist,
  aadhaar,
  contract,
}) => {
  const classes = useStyles();
  const patientContext = useContext(PatientContext);

  const [prescriptionData, setPrescriptiontData] = useState({
    id: '1',
    medicine: 'adderall',
    doc_id: '1',
    quantity: '1000000000',
    symptoms: 'need to work',
    timestamp: '10/10/10',
    marked: false,
  });

  const [noPres, setNoPres] = useState(false);

  const getString = str => {
    const newStr = str.split('-');
    return newStr;
  };

  // TODO: Move into useEffect?
  const asyncCallToGetPrescriptions = async () => {
    const data = await patientContext.lastPrescription(contract, aadhaar);
    const medicine = getString(data.last_pres_medicine);

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

  // TODO: Move into useEffect?
  const asyncCallToGetPharmacyPrescriptions = async () => {
    const data = await patientContext.phatmacistLastPrescription(
      contract,
      aadhaar
    );
    const medicine = getString(data.medicine);

    setPrescriptiontData({
      ...prescriptionData,
      medicine: medicine[1],
      quantity: medicine[2],
      doc_id: data.d_id,
      timestamp: data.timestamp,
      marked: false,
    });
  };

  const mark = name => async event => {
    const dt = new Date();
    const utcDate = dt.toUTCString();
    await patientContext
      .markPrescription(contract, aadhaar, utcDate)
      .then(() => {
        setPrescriptiontData({ ...prescriptionData, marked: true });
        console.log(prescriptionData.marked);
      });
  };

  useEffect(() => {
    if (isPharmacist) asyncCallToGetPharmacyPrescriptions();

    if (!isPharmacist) asyncCallToGetPrescriptions();
  }, [
    asyncCallToGetPharmacyPrescriptions,
    asyncCallToGetPrescriptions,
    isPharmacist,
    noPres,
  ]);

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
              <TableCell>Doctor ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prescriptionData.doc_id === 0 ? (
              <>
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No Previous Prescriptions Available
                  </TableCell>
                </TableRow>
              </>
            ) : (
              <>
                <TableRow key={prescriptionData.id}>
                  <TableCell>{prescriptionData.timestamp}</TableCell>
                  <TableCell>{prescriptionData.medicine}</TableCell>
                  <TableCell>{prescriptionData.quantity}</TableCell>
                  <TableCell>{prescriptionData.doc_id}</TableCell>
                </TableRow>
              </>
            )}
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
          <Typography component="h2" variant="h5" color="initial" gutterBottom>
            {aadhaar}
          </Typography>
        </Toolbar>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Doctor ID</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prescriptionData.doc_id === 0 ? (
              <>
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No Unmarmed Prescriptions Available
                  </TableCell>
                </TableRow>
              </>
            ) : (
              <>
                <TableRow>
                  <TableCell>{prescriptionData.timestamp}</TableCell>
                  <TableCell>{prescriptionData.medicine}</TableCell>
                  <TableCell>{prescriptionData.quantity}</TableCell>
                  <TableCell>{prescriptionData.doc_id}</TableCell>
                  <TableCell>"Unmarked"</TableCell>
                  <Checkbox
                    checked={patientContext.marked}
                    onChange={mark('marked')}
                    value="marked"
                    color="primary"
                    inputProps={{
                      'aria-label': 'primary checkbox',
                    }}
                  />
                </TableRow>
              </>
            )}
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
};

Prescriptions.propTypes = {
  onNewPrescriptionClick: PropTypes.func.isRequired,
  isPharmacist: PropTypes.bool,
  aadhaar: PropTypes.isRequired,
};

export default Prescriptions;
