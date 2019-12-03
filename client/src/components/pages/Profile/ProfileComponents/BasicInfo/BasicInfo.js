import React, { useState, useEffect, useContext } from 'react';

import PropTypes from 'prop-types';

import {
  makeStyles,
  Typography,
  Hidden,
  TextField,
  Tooltip,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Grid,
} from '@material-ui/core';

import ContactsIcon from '@material-ui/icons/Contacts';
import WcIcon from '@material-ui/icons/Wc';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import CreateIcon from '@material-ui/icons/Create';

import PatientContext from '../../../../../context/patient/PatientContext';

const useStyles = makeStyles({
  toolbarButtons: {
    marginLeft: 'auto',
  },
  fields: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    // overflow: "hidden",
  },
});

const BasicInfo = ({ contract, aadhaar }) => {
  const classes = useStyles();
  const patientContext = useContext(PatientContext);

  const [patientData, setPatientData] = useState({
    aadhaar: '000011112222',
    name: 'Satoshi Nakamoto',
    sex: 'Male',
    dob: '10/10/10',
    weight: '100',
    allergies: '',
  });

  const asyncCallToGetPatient = async () => {
    const data = await patientContext.getPatient(contract, aadhaar);
    setPatientData(data);
  };

  useEffect(() => {
    asyncCallToGetPatient();
  }, [asyncCallToGetPatient]);

  //! might delete these below
  const [showingField, setShowingField] = useState('');
  const [initialAadhaar, setInitialAadhaar] = useState('');
  const [initialName, setInitialName] = useState('');
  const [initialSex, setInitialSex] = useState('');
  const [initialDob, setInitialDob] = useState('');
  const [initialWeight, setInitialWeight] = useState('');

  //! NEW
  const [fields, setFields] = useState({
    name: false,
    aadhaar: false,
    sex: false,
    dob: false,
    weight: false,
  });

  const showFields = () => {
    setFields({
      name: true,
      aadhaar: true,
      sex: true,
      dob: true,
      weight: true,
    });
  };

  const hideFields = callback => {
    // setField(''),
    // setInitialAadhaar(''),
    // setInitialName(''),
    // setInitialSex(''),
    // setInitialDob(''),
    // setInitialWeight('')
    setFields({
      name: false,
      aadhaar: false,
      sex: false,
      dob: false,
      weight: false,
    });
    if (callback && typeof callback === 'function') callback();
  };

  //* change functions will change the contract state
  //* (i.e. patient's aadhaar, name, sex, dob, weight)
  const changeAadhaar = () => {
    if (initialAadhaar === patientData.aadhaar) return;
    console.log(initialAadhaar);
    setPatientData({ ...patientData, aadhaar: initialAadhaar });
  };

  const changeName = () => {
    if (initialName === patientData.name) return;
    setPatientData({ ...patientData, name: initialName });
  };

  const changeSex = () => {
    if (initialSex === patientData.sex) return;
    console.log('changed sex');
    // const asyncCallToEdit = (async () => {
    //   await patientContext.editPatient(contract, patientData.aadhaar, patientData.name, patientData.weight, initialSex, patientData.allergies);
    // });
    // asyncCallToEdit();
    // setPatientData({...patientData, sex: initialSex })
  };

  const changeDob = () => {
    if (initialDob === patientData.dob) return;
    setPatientData({ ...patientData, dob: initialDob });
  };

  const changeWeight = () => {
    if (initialWeight === patientData.weight) return;
    setPatientData({ ...patientData, weight: initialWeight });
  };

  //* Depending on the fieldId, changeField will call the functions above
  const changeField = fieldId => {
    switch (fieldId) {
      case 'aadhaar':
        changeAadhaar();
        return;
      case 'name':
        changeName();
        return;
      case 'sex':
        changeSex();
        return;
      case 'dob':
        changeDob();
        return;
      case 'weight':
        changeWeight();
        return;
      default:
        console.log('need a default');
    }
  };

  const handleKeyDown = (event, fieldId) => {
    if (!event || !fieldId) return;
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
      return;
    const { key } = event;
    if (!key) return;
    if (key === 'Escape') {
      hideFields();
    } else if (key === 'Enter') {
      changeField(fieldId);
      hideFields();
    }
  };

  const handleAadhaarChange = event => {
    if (!event) return;
    const newAadhaar = event.target.value;
    setInitialAadhaar(newAadhaar);
  };

  const handleNameChange = event => {
    if (!event) return;
    const newName = event.target.value;
    setInitialName(newName);
  };

  const handleSexChange = event => {
    if (!event) return;
    const newSex = event.target.value;
    setInitialSex(newSex);
  };

  const handleDobChange = event => {
    if (!event) return;
    const newDob = event.target.value;
    setInitialDob(newDob);
  };

  const handleWeightChange = event => {
    if (!event) return;
    const newWeight = event.target.value;
    setInitialWeight(newWeight);
  };

  return (
    <>
      <Toolbar>
        <Typography component="h2" variant="h5" color="primary" gutterBottom>
          {patientData.name}
        </Typography>
        <span className={classes.toolbarButtons}>
          <Tooltip title="Edit">
            <IconButton onClick={() => showFields()}>
              <CreateIcon />
            </IconButton>
          </Tooltip>
        </span>
      </Toolbar>

      <Grid container spacing={3} className={classes.fields}>
        <Grid item xs={6}>
          <List disablePadding>
            <ListItem>
              <Hidden xsDown>
                <ListItemIcon>
                  <ContactsIcon />
                </ListItemIcon>
              </Hidden>

              {fields.aadhaar === true && (
                <TextField
                  autoFocus
                  fullWidth
                  helperText="Change aadhaar number"
                  label="Aadhaar"
                  type="number"
                  placeholder={patientData.aadhaar}
                  value={initialAadhaar}
                  onBlur={hideFields}
                  onKeyDown={event => handleKeyDown(event, 'aadhaar')}
                  onChange={handleAadhaarChange}
                />
              )}

              {fields.aadhaar === false && (
                <ListItemText
                  primary="Aadhaar"
                  secondary={patientData.aadhaar}
                />
              )}
            </ListItem>

            <ListItem>
              <Hidden xsDown>
                <ListItemIcon>
                  <WcIcon />
                </ListItemIcon>
              </Hidden>

              {fields.sex === true && (
                <TextField
                  fullWidth
                  helperText="Change sex"
                  label="Sex"
                  type="string"
                  placeholder={patientData.sex}
                  value={initialSex}
                  // onBlur={hideFields}
                  // onKeyDown={event => handleKeyDown(event, 'sex')}
                  onChange={handleSexChange}
                />
              )}

              {fields.sex === false && (
                <ListItemText primary="Sex" secondary={patientData.sex} />
              )}
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={6}>
          <List disablePadding>
            <ListItem>
              <Hidden xsDown>
                <ListItemIcon>
                  <DateRangeIcon />
                </ListItemIcon>
              </Hidden>

              {fields.dob === true && (
                <TextField
                  fullWidth
                  helperText="Change date of birth"
                  label="Date of Birth"
                  placeholder={patientData.dob}
                  // type="number"
                  value={initialDob}
                  // onBlur={hideFields}
                  // onKeyDown={event => handleKeyDown(event, 'dob')}
                  onChange={handleDobChange}
                />
              )}

              {fields.dob === false && (
                <ListItemText
                  primary="Date of Birth"
                  secondary={patientData.dob}
                />
              )}
            </ListItem>

            <ListItem>
              <Hidden xsDown>
                <ListItemIcon>
                  <AccessibilityNewIcon />
                </ListItemIcon>
              </Hidden>

              {fields.weight === true && (
                <TextField
                  fullWidth
                  helperText="Change weight"
                  label="Weight"
                  placeholder={patientData.weight}
                  type="number"
                  value={initialWeight}
                  // onBlur={hideFields}
                  // onKeyDown={event => handleKeyDown(event, 'weight')}
                  onChange={handleWeightChange}
                />
              )}

              {fields.weight === false && (
                <ListItemText primary="Weight" secondary={patientData.weight} />
              )}
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  );
};

BasicInfo.propTypes = {
  contract: PropTypes.isRequired,
  aadhaar: PropTypes.isRequired,
};

export default BasicInfo;
