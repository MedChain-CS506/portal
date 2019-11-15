/* eslint-disable */
import React, { useState, useEffect } from 'react';

//* React Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { theme, changeTheme } from './utils/theme';

//* Components
import Navbar from './components/layout/Navbar';
import Loading from './components/layout/Loading';

//* Pages
import Landing from './components/pages/Landing';
import Profile from './components/pages/Profile';
import PatientForm from './components/pages/PatientForm';
import NotFound from './components/pages/NotFound';

//* Context
import PatientState from './context/patient/PatientState';

//* Blockchain
import getWeb3 from './utils/getWeb3.js';
import MedChainContract from './contracts/med_chain.json';

//* Styles
import './index.css';
import { CssBaseline } from '@material-ui/core';

async function docCheck(contract) {
  let result = 10;
  await contract.contract.methods.is_doctor_or_pharmacist().call({
    from: contract.accounts[0]
  }).then((res) => {
    result = res;
    console.log(res);
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
        console.log(accounts);
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
        console.log("res: " + res);
        if(res == 0){
          setIsDoc(true);
        } else if (res == 1) {
          setIsPharmacist(true);
        } 
      })
      setInterval(async () => {
        const rn = await data.web3.eth.getAccounts();
        if (rn[0] !== data.accounts[0]) {
          setSignedIn(false);
        } else if (rn[0] === data.accounts[0]) {
          setSignedIn(true);
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
        light: '#E7F6E7',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#FFFFFF',
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

  //! WHEN THE PERSON SIGNED IN IS A PHARMACIST!!!
  //! NOTE TO SELF... CAN WE DELETE {...PROPS}
  //! Need a better way then this if statement...
  if (isPharmacist) {
    return (
      <PatientState>
      <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {ready ? (
        <Router>
          <Navbar theme={muiTheme} handleToggleTheme={() => toggleTheme()} isPharmacist={true} />
          <div className="container">
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
              <Redirect to="/not-found" />
            </Switch>
          </div>
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
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                render={props => <Landing {...props} signedIn={signedIn} />}
              />
              <Route
                exact
                path="/patient-form"
                render={props => (
                  <PatientForm
                    {...props}
                    signedIn={signedIn}
                    contract={contract}
                  />
                )}
              />
              <Route
                exact
                path="/profile/:id"
                render={props => (
                  <Profile {...props} signedIn={signedIn} contract={contract} />
                )}
              />
              <Route component={NotFound} />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </Router>
      ) : (
        <Loading />
      )}
      </ThemeProvider>
    </PatientState>
  );
}

export default App;
