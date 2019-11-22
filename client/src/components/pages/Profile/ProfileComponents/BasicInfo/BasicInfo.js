/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';

// import { Link, Redirect } from 'react-router-dom'

import PropTypes from 'prop-types';

import {
  makeStyles,
  Grid,
  Paper,
  Typography,
  Divider,
  Hidden,
  TextField,
  Tooltip,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Toolbar,
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import ContactsIcon from '@material-ui/icons/Contacts';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import WcIcon from '@material-ui/icons/Wc';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CreateIcon from '@material-ui/icons/Create';

import PatientContext from '../../../../../context/patient/PatientContext';

const useStyles = makeStyles(theme => ({
  layout: {
    flexGrow: 1,
    width: 'auto',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

  basicInfo: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
    textAlign: 'center',
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },

  divider: {
    marginBottom: theme.spacing(3),
  },

  prescriptionsAndFiles: {
    marginBottom: theme.spacing(6),
    padding: theme.spacing(2),
  },

  button: {
    marginTop: theme.spacing(1),
  },

  buttonIcon: {
    marginRight: theme.spacing(1),
  },

  patientFormIcon: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    background: 'red',
    color: 'white',
  },

  margin: {
    margin: theme.spacing(1),
  },
  toolbarButtons: {
    marginLeft: 'auto',
  },
}));

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
    console.log(data);
    // setPatientData(data);
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

      default:
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
              helperText="Change patient's aadhaar number"
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
            <ListItemText primary="Aadhaar" secondary={patientData.aadhaar} />
          )}
        </ListItem>

        <ListItem>
          <Hidden xsDown>
            <ListItemIcon>
              <WcIcon />
            </ListItemIcon>
          </Hidden>

          {fields.sex === true &&
            <TextField
              fullWidth
              helperText="Change patient's sex"
              label="Sex"
              type="string"
              placeholder={patientData.sex}
              value={initialSex}
              // onBlur={hideFields}
              // onKeyDown={event => handleKeyDown(event, 'sex')}
              onChange={handleSexChange}
            />
          }
          {fields.sex === false && (
            <ListItemText primary="Sex" secondary={patientData.sex} />
          )}
        </ListItem>

        <ListItem>
          <Hidden xsDown>
            <ListItemIcon>
              <DateRangeIcon />
            </ListItemIcon>
          </Hidden>

          {fields.dob === true && (
            <TextField
              fullWidth
              helperText="Press Enter to change date of birth"
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
            <ListItemText primary="Date of Birth" secondary={patientData.dob} />
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
              helperText="Press Enter to change weight"
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
    </>
  );
};

BasicInfo.propTypes = {
  contract: PropTypes.isRequired,
  aadhaar: PropTypes.isRequired,
};

export default BasicInfo;
