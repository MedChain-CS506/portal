/* eslint-disable */
import React, { useState, useEffect } from 'react';

//* React Router
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

//* Components
import Navbar from './components/layout/Navbar';
import Loading from './components/layout/Loading';
import DialogHost from './components/layout/Dialog/DialogHost'
import AddPrescription from './components/pages/AddPrescription';

//* Pages
import Landing from './components/pages/Landing';
import Profile from './components/pages/Profile';
import PatientForm from './components/pages/PatientForm';
import NotFound from './components/pages/NotFound';

//* Context
import PatientState from './context/patient/PatientState';

//* Styles / MUI
import './index.css';
import { CssBaseline } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import readingTime from 'reading-time';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { theme, changeTheme } from './utils/theme';

//* Blockchain
import getWeb3 from './utils/getWeb3.js';
import MedChainContract from './contracts/med_chain.json';

async function docCheck(contract) {
  let result = 10;
  await contract.contract.methods.is_doctor_or_pharmacist().call({
    from: contract.accounts[0]
  }).then((res) => {
    result = res;
  })
  return result;
}

function App() {
  const [signedIn, setSignedIn] = useState(true);
  const [ready, setReady] = useState(true);
  const [contract, setContract] = useState({
    web3: null,
    accounts: null,
    contract: null,
  });

  const [isDoc, setIsDoc] = useState(false);
  const [isPharmacist, setIsPharmacist] = useState(false);

  //! New Patient Form Dialog
  const [dialog, setDialog] = useState({
    patientFormDialog: false,
    prescriptionFormDialog: false
  })

  //! Use this for confirmation feedback
  const [snackbar, setSnackbar] = useState({
    autoHideDuration: 0,
    message: '',
    open: false
  })

  const openSnackbar = (message, autoHideDuration = 2) => {
    setSnackbar({
      autoHideDuration: readingTime(message).time * autoHideDuration,
      message,
      open: true
    })
  }
    
  const closeSnackbar = (clearMessage = false) => {
    setSnackbar({ ...snackbar, message: clearMessage ? '' : snackbar.message,open: false })
  }

  useEffect(() => {
    async function connectMetamask() {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = MedChainContract.networks[networkId];
        const instance = new web3.eth.Contract(
          MedChainContract.abi,
          deployedNetwork && deployedNetwork.address
        );
        let data = {
          accounts: accounts,
          web3: web3,
          contract: instance
        };
        setContract(data);
        setSignedIn(true);
        setReady(true);
        return data;
      } catch (error) {
        setSignedIn(false);
        setReady(false);
        console.error(error);
      }
    }

    connectMetamask().then((data) => {
      docCheck(data).then((res) => {
        if(res == 0){
          setIsDoc(true);
        } else if (res == 1) {
          setIsPharmacist(true);
        } 
      })
      setInterval(async () => {
        try{
          const rn = await data.web3.eth.getAccounts();
          if (rn[0] !== data.accounts[0]) {
            setSignedIn(false);
          } else if (rn[0] === data.accounts[0]) {
            setSignedIn(true);
          }
        } catch (err) {
          
        }
      }, 100)
    });
  }, [signedIn, isDoc, isPharmacist]);

  const log = () => {
    console.log("isDoc:" +  isDoc);
    console.log("isPhar:" +  isPharmacist);
  }

  const [theme, setTheme] = useState({
    palette: {
      primary: {
        main: '#FF0000',
        // light: '#E7F6E7',
        // contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#0000FF',
      },
      type: 'light',
    }
  })

  const muiTheme = createMuiTheme(theme);

  const toggleTheme = () => {
    let newPaletteType = theme.palette.type === "light" ? "dark" : "light";
    const newPalette = { ...theme.palette, type: newPaletteType };
    setTheme({
      ...theme,
      palette: newPalette,
    });
  };

  //! Ternary to replace if statement...?
  if (isDoc) {
    return (
      <PatientState>
        <ThemeProvider theme={muiTheme}>
        <CssBaseline />

        {ready ? (
          <>
            <Router>
              <Navbar theme={muiTheme} handleToggleTheme={() => toggleTheme()} />
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={props => <Landing {...props} signedIn={signedIn} onNewPatientClick={() =>
                      setDialog({ ...dialog, patientFormDialog: true })} />}
                  />
                  <Route
                    exact
                    path="/profile/:id"
                    render={props => <Profile {...props} signedIn={signedIn} contract={contract} onNewPrescriptionClick={() =>
                      setDialog({ ...dialog, prescriptionFormDialog: true })} />}
                  />
                  <Route component={NotFound} />
                </Switch>

                <DialogHost 
                dialogs={{
                  patientFormDialog: {
                    dialogProps: {
                      open: dialog.patientFormDialog,
                      onClose: () => setDialog({ ...dialog, patientFormDialog: false }),
                    }
                  },

                  // prescriptionFormDialog: {
                  //   dialogProps: {
                  //     open: dialog.prescriptionFormDialog,
                  //     onClose: () => setDialog({ ...dialog, prescriptionFormDialog: false }),
                  //   }
                  // }
                }}
              />
            </Router>

            <Snackbar
              autoHideDuration={snackbar.autoHideDuration}
              message={snackbar.message}
              open={snackbar.open}
              onClose={() => setSnackbar({ ...snackbar, open: false })}
            />
          </>
        ) : (
          <Loading />
        )}
        </ThemeProvider>
      </PatientState>
    );
  }

  if (isPharmacist) {
    return (
      <PatientState>
      <ThemeProvider theme={muiTheme}>
      <CssBaseline />

      {ready ? (
        <Router>
          <Navbar theme={muiTheme} handleToggleTheme={() => toggleTheme()} isPharmacist={true} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => <Landing {...props} signedIn={signedIn} isPharmacist={true} />}
              />
              <Route
                exact
                path="/profile/:id"
                render={props => (
                  <Profile {...props} signedIn={signedIn} contract={contract} isPharmacist={true} />
                )}
              />
              <Route component={NotFound} />
            </Switch>
        </Router>
      ) : (
        <Loading />
      )}
      </ThemeProvider>
    </PatientState>
    )
  }

  return (
    <PatientState>
    <ThemeProvider theme={muiTheme}>
    <CssBaseline />
    {ready ? (
      <Router>
        <Navbar theme={muiTheme} handleToggleTheme={() => toggleTheme()} />
          <Switch>
            <Route component={NotFound} />
          </Switch>
      </Router>
    ) : (
      <Loading />
    )}
    </ThemeProvider>
  </PatientState>
  )
}

export default App;
