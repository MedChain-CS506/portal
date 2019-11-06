import React, { useState, useEffect } from 'react';

import readingTime from 'reading-time';

//* MUI
import Snackbar from '@material-ui/core/Snackbar';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './utils/theme';
import { auth, firestore } from './firebase';

//* Components
import Navbar from './components/Navbar';
import Loading from './components/Loading';
import DialogHost from './components/Dialog/DialogHost';

//* Pages
import Routes from './pages/Routes';

//* Context
import PatientContextProvider from './context/patient/PatientContext';
import AlertContextProvider from './context/alert/AlertContext';

//* Blockchain
import getWeb3 from './utils/getWeb3.js';
import MedChainContract from './contracts/med_chain.json';

var contract_instance = {
  storageValue: 0,
  web3: null,
  accounts: null,
  contract: null,
};

//* Blockchain Functions
async function getBlock() {
  try {
    const data = {
      storageValue: 0,
      web3: null,
      accounts: null,
      contract: null,
    };
    console.log('its going');
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = MedChainContract.networks[networkId];
    const instance = new web3.eth.Contract(
      MedChainContract.abi,
      deployedNetwork && deployedNetwork.address
    );

    const cont = instance;
    data.accounts = accounts;
    data.web3 = web3;
    data.contract = instance;
    return data;
    console.log(contract_instance);
  } catch (error) {
    alert(
      `Failed to load web3, accounts, or contract. Check console for details.`
    );
    console.error(error);
  }
}

async function add_paitent(aadhaar, age, name, dob, weight, sex, allergies) {
  await contract_instance.contract.methods.add_paitent(aadhaar, age, name, dob, weight, sex, allergies).send({
    from: contract_instance.accounts[0],
  });
  console.log('Sent add_paitent to contract');
}

async function add_prescription(d_id, aadhaar, disease, symptoms, medicine, time) {
  await contract_instance.contract.methods.add_prescription(d_id, aadhaar, disease, symptoms, medicine, time).send({
    from: contract_instance.accounts[0],
  });
  console.log('Sent add_prescription to contract');
}

async function lookup_paitent(aadhaar) {
  const paitent_page_data = {};

  await contract_instance.contract.methods
    .lookup_paitent(aadhaar)
    .call()
    .then(function(res) {
      paitent_page_data.aadhaar = res[0];
      paitent_page_data.age = res[1];
      paitent_page_data.name = res[2];
      paitent_page_data.sex = res[3];
      paitent_page_data.dob = res[4];
      paitent_page_data.weight = res[5];
      paitent_page_data.allergies = res[6];
    });

  await contract_instance.contract.methods
    .doctor_last_prescription(aadhaar)
    .call()
    .then(function(res) {
      paitent_page_data.last_pres_id = res[0];
      paitent_page_data.last_pres_medicine = res[1];
      paitent_page_data.last_pres_doc_id = res[2];
      paitent_page_data.last_pres_symptoms = res[3];
      paitent_page_data.last_pres_timestamp = res[4];
    });

  return paitent_page_data;
}

async function medical_history(aadhaar) {
  function get_string(str) {
    const newStr = str.split('-');
    newStr.splice(0, 2);
    return newStr;
  }

  const medical_hist = {}; // eslint-disable-line

  await contract_instance.contract.methods
    .medical_history_details(aadhaar)
    .call()
    .then(function(res) {
      medical_hist.pres_ids = get_string(res[0]).map(Number);
      medical_hist.doctor_ids = get_string(res[1]).map(Number);
      medical_hist.symptoms = get_string(res[2]);
    });

  await contract_instance.contract.methods
    .medical_history(aadhaar)
    .call()
    .then(function(res) {
      medical_hist.disease = get_string(res[0]);
      medical_hist.medicine = get_string(res[1]);
      medical_hist.timestamp = get_string(res[2]);
    });

  return medical_hist; // eslint-disable-line
}

//* App
function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [signedIn, setSignedIn] = useState(false);
  const [ready, setReady] = useState(false);
  const [performingAction, setPerformingAction] = useState(false);
  const [dialog, setDialog] = useState({
    signUpDialog: false,
    signInDialog: false,
    settingsDialog: false,
    signOutDialog: false,
    deleteAccountDialog: false,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    autoHideDuration: 0,
    message: '',
  });

  useEffect(() => {
    
    // getBlock().then(function (data) {
    //   contract_instance = data;
    //   console.log(contract_instance);
    // });
    
    const removeAuthStateChangedObserver = auth.onAuthStateChanged(user => { // eslint-disable-line
      //* if there is no user...
      if (!user) {
        setUser(null);
        setUserData(null);
        setSignedIn(false);
        setReady(true);
        return;
      }

      const { uid } = user;

      //* if there is no uid...
      if (!uid) {
        setUser(null);
        setUserData(null);
        setSignedIn(false);
        setReady(true);
        return;
      }

      const reference = firestore.collection('users').doc(uid);

      //* if there is no reference...
      if (!reference) {
        setUser(null);
        setUserData(null);
        setSignedIn(false);
        setReady(true);
        return;
      }

      const removeReferenceListener = reference.onSnapshot(snapshot => {
        if (!snapshot.exists) {
          if (removeReferenceListener) {
            removeReferenceListener();
          }
          setUser(null);
          setUserData(null);
          setSignedIn(false);
          setReady(true);
          return;
        }

        const data = snapshot.data();

        if (!data) {
          if (removeReferenceListener) {
            removeReferenceListener();
          }

          setUser(null);
          setUserData(null);
          setSignedIn(false);
          setReady(true);
          return;
        }

        setUser(user);
        setUserData(data);
        setSignedIn(true);
        setReady(true);
      });
    });

    return () => {
      if (removeAuthStateChangedObserver) {
        removeAuthStateChangedObserver();
      }
    };
  }, []);

  const openSnackbar = (message, autoHideDuration = 2) => {
    setSnackbar({
      open: true,
      message,
      autoHideDuration: readingTime(message).time * autoHideDuration,
    });
  };

  return (
    <PatientContextProvider>
      <AlertContextProvider>
        <ThemeProvider theme={theme}>
          {' '}
          {!ready && <Loading />}{' '}
          {ready && (
            <>
              <Navbar
                signedIn={signedIn}
                performingAction={performingAction}
                user={user}
                userData={userData}
                onSignUpClick={() =>
                  setDialog({
                    ...dialog,
                    signUpDialog: true,
                  })
                }
                onSignInClick={() =>
                  setDialog({
                    ...dialog,
                    signInDialog: true,
                  })
                }
                onSettingsClick={() =>
                  setDialog({
                    ...dialog,
                    settingsDialog: true,
                  })
                }
                onSignOutClick={() =>
                  setDialog({
                    ...dialog,
                    signOutDialog: true,
                  })
                }
              />
              <Routes signedIn={signedIn} />
              <DialogHost
                signedIn={signedIn}
                dialogs={{
                  signUpDialog: {
                    dialogProps: {
                      open: dialog.signUpDialog,
                      onClose: () =>
                        setDialog({
                          ...dialog,
                          signUpDialog: false,
                        }),
                    },

                    props: {
                      performingAction,
                      openSnackbar: message => openSnackbar(message),
                    },
                  },

                  signInDialog: {
                    dialogProps: {
                      open: dialog.signInDialog,
                      onClose: () =>
                        setDialog({
                          ...dialog,
                          signInDialog: false,
                        }),
                    },

                    props: {
                      performingAction,
                      openSnackbar: message => openSnackbar(message),
                    },
                  },

                  settingsDialog: {
                    dialogProps: {
                      open: dialog.settingsDialog,
                      onClose: () =>
                        setDialog({
                          ...dialog,
                          settingsDialog: false,
                        }),
                    },

                    props: {
                      user,
                userData: userData, // eslint-disable-line
                      theme,
                      openSnackbar: message => openSnackbar(message),
                      onDeleteAccountClick: () =>
                        setDialog({
                          ...dialog,
                          deleteAccountDialog: false,
                        }),
                    },
                  },

                  deleteAccountDialog: {
                    dialogProps: {
                      open: dialog.deleteAccountDialog,
                      onClose: () =>
                        setDialog({
                          ...dialog,
                          deleteAccountDialog: false,
                        }),
                    },

                    props: {
                      performingAction,
                userData: userData, // eslint-disable-line
                      openSnackbar: message => openSnackbar(message),
                    },
                  },

                  signOutDialog: {
                    dialogProps: {
                      open: dialog.signOutDialog,
                      onClose: () =>
                        setDialog({
                          ...dialog,
                          signOutDialog: false,
                        }),
                    },

                    props: {
                      performingAction,
                    },
                  },
                }}
              />
              <Snackbar
                open={snackbar.open}
                autoHideDuration={snackbar.autoHideDuration}
                message={snackbar.message}
                onClose={() =>
                  setSnackbar({
                    open: false,
                  })
                }
              />{' '}
            </>
          )}{' '}
        </ThemeProvider>
      </AlertContextProvider>
    </PatientContextProvider>
  );
}

export default App;
