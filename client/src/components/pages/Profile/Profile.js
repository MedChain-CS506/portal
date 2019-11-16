/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';


import EditIcon from '@material-ui/icons/Edit';
import ContactsIcon from '@material-ui/icons/Contacts';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import {
  makeStyles,
  Grid,
  Paper,
  Typography,
  Divider,
  Hidden,
  TextField,
  Tooltip,
  IconButton
} from '@material-ui/core/';

import { Redirect } from 'react-router-dom';
import PatientContext from '../../../context/patient/PatientContext';

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
}));

const Profile = ({ signedIn = false, contract, match }) => {
  const classes = useStyles();
  if (!signedIn) return <Redirect to="/not-found" />;

  // const patientContext = useContext(PatientContext);
  // const [patientData, setPatientData] = useState({
  //   aadhaar: 0,
  //   name: '',
  //   sex: '',
  //   dob: '',
  //   weight: 0,
  //   allergies: '',
  // });

  // useEffect(() => {
  //   const asyncCallToGetPatient = async () => {
  //     const data = await patientContext.getPatient(contract, match.params.id);
  //     setPatientData(data);
  //   };
  //   asyncCallToGetPatient();
  // }, [contract, match.params.id, patientContext, patientData]);

  //! This will be for the data that is coming from the contract
  const [patientData, setPatientData] = useState({
    aadhaar: '000011112222',
    name: 'Satoshi Nakamoto',
    sex: '',
    dob: '',
    weight: '',
    //allergies: '',
  });

  //! Use this varibale for setting values within the profile
  const [showingField, setShowingField] = useState('')
  const [initialAadhaar, setInitialAadhaar] = useState('')
  const [initialName, setInitialName] = useState('')
  const [initialSex, setInitialSex] = useState('')
  const [initialDob, setInitialDob] = useState('')
  const [initialWeight, setInitialWeight] = useState('')

  //* showField determines if you are currently editting the field
  const showField = (fieldId) => {
    if (!fieldId) return;
    setShowingField(fieldId)
  }

  const hideFields = (callback) => {
    setShowingField(''),
    setInitialAadhaar(''),
    setInitialName(''),
    setInitialSex(''),
    setInitialDob(''),
    setInitialWeight('')
    //! Might not need this below
    if (callback && typeof callback === 'function') {
      callback();
    }
  };

  //* change functions will change the contract state 
  //* (i.e. patient's aadhar, name, sex, dob, weight)
  const changeAadhaar = () => {
    if (initialAadhaar === patientData.aadhaar) return
    console.log(initialAadhaar)
    setPatientData({...patientData, aadhar: initialAadhaar })
    console.log(patientData.aadhaar)
  }

  const changeName = () => {
    if (initialName === patientData.name) return
    setPatientData({...patientData, name: initialName })
    console.log(patientData.name)
  }

  const changeSex = () => {
    if (initialSex === patientData.sex) return
    setPatientData({...patientData, sex: initialSex })
    console.log(patientData.sex)
  }

  const changeDob = () => {
    if (initialDob === patientData.dob) return
    setPatientData({...patientData, dob: initialDob })
    console.log(patientData.dob)
  }

  const changeWeight = () => {
    if (initialWeight === patientData.weight) return
    setPatientData({...patientData, weight: initialweight })
    console.log(patientData.weight)
  }

  //* Depending on the fieldId, changeField will call the functions above
  const changeField = (fieldId) => {
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
        return;
    }
  };







  //* handle...Change function will change the initial state
  const handleAadhaarChange = (event) => {
    if (!event) return;
    const newAadhaar = event.target.value;
    setInitialAadhaar(newAadhaar)
  }

  

  const handleKeyDown = (event, fieldId) => {
    if (!event || !fieldId) return;
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

    const key = event.key;
    if (!key) return;

    if (key === 'Escape') {
      hideFields();
    } else if (key === 'Enter') {
      changeField(fieldId);
    }
  };

  return (
    <>
      <main className={classes.layout}>
        {/* <Grid container spacing={1} alignItems="center" justify="center"> */}
          <Paper className={classes.basicInfo}>
            
            <Typography variant="h3" align="center" gutterBottom>
              {patientData.name}
            </Typography>

            <Divider className={classes.divider} />


            <List disablePadding>
              <ListItem>
                <Hidden xsDown>
                  <ListItemIcon>
                    <ContactsIcon />
                  </ListItemIcon>
                </Hidden>

                {showingField === 'aadhaar' && 
                  <TextField
                    autoComplete="given-aadhaar"
                    autoFocus
                    fullWidth
                    helperText={'Press Enter to change aadhaar'}
                    label="Aadhaar"
                    placeholder={patientData.aadhaar}
                    required
                    //type="number"
                    value={initialAadhaar}
                    variant="filled"
                    onBlur={hideFields}
                    // ^ when a user leaves the input field
                    onKeyDown={(event) => handleKeyDown(event, 'aadhaar')}
                    onChange={handleAadhaarChange}
                  />
                }

                {showingField !== 'aadhaar' && 
                <>
                  <ListItemText primary="Aadhaar" secondary={patientData.aadhaar} />
                  <ListItemSecondaryAction>
                    {patientData.aadhaar && 
                      <Tooltip title="Edit">
                        <div>
                          <IconButton onClick={() => showField('aadhaar')}>
                            <EditIcon />
                          </IconButton>
                        </div>
                      </Tooltip>
                    }
                  </ListItemSecondaryAction>
                </>
                }
              </ListItem>



            </List>

            {/* <Grid container spacing={4}>
              <Grid id="aadhaar" item xs={12}>
                <Typography variant="h5">
                  Aadhaar - {patientData.aadhaar}
                </Typography>
              </Grid>
              <Grid id="date-of-birth" item xs={12}>
                <Typography variant="h5">
                  Date of Birth - {patientData.dob}
                </Typography>
              </Grid>
              <Grid id="sex" item xs={12}>
                <Typography variant="h5">Sex - {patientData.sex}</Typography>
              </Grid>
              <Grid id="weight" item xs={12}>
                <Typography variant="h5">
                  Weight - {patientData.weight}
                </Typography>
              </Grid>
              <Grid id="known-allergies" item xs={12}>
                <Typography variant="h5">
                  Known Allergies - {patientData.allergies}
                </Typography>
              </Grid>
              <Grid id="known-diseases" item xs={12}>
                <Typography variant="h5">Known Diseases - </Typography>
              </Grid>
            </Grid> */}
          </Paper>

          {/* <Grid id="prescriptions" item xs={12} sm={6}>
            <Paper className={classes.prescriptionsAndFiles}>
              <Typography variant="h4">Prescriptions</Typography>
            </Paper>
          </Grid>

          <Grid id="medical-files" item xs={12} sm={6}>
            <Paper className={classes.prescriptionsAndFiles}>
              <Typography variant="h4">Medical Files</Typography>
            </Paper>
          </Grid> */}
        {/* </Grid> */}
      </main>
    </>
  );
};

export default Profile;
